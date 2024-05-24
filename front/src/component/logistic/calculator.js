import React, {useCallback, useMemo, useState} from 'react';
import { Account } from '../../helpers/Account';
import translation from '../../assets/data/translation';
import { Loader as GoogleMapsLoader } from '@googlemaps/js-api-loader';
import axios from "axios";

const language = Account.getLanguage();

const options = {
  apiKey: 'AIzaSyB2c0GKrKxmnzJKy9xsxkFi-f-fjDW9bFE',
  version: 'weekly',
  libraries: ['places'],
};

const googleMapsLoader = new GoogleMapsLoader(options);
// const Api_Key = "8t4cHcX9";
const Api_Key = "SUyPXe9aW5rb81GXjyU8vg==nXgSXc4KU6J0PozK";

function Calculator() {
  const [city1, setCity1] = useState('');
  const [city2, setCity2] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [cities1, setCities1] = useState([]);
  const [cities2, setCities2] = useState([]);

  const calculateDistance = useCallback(async (e) => {
    try {
      e.preventDefault();
      const google = await googleMapsLoader.load();
      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [city1],
          destinations: [city2],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false,
        },
        (response, status) => {
          try{
            if (status === 'OK') {
                const distance = response.rows[0].elements[0].distance.text;
                setResult(distance);
                setError("")
              } else {  
                setResult('');
                console.error('Error calculating distance:', status);
              }
          }
          catch(e){
            console.log(e)
            setError("the city name is incorrect")
            setResult('')
          }
        }
      );
    } catch (error) {
      console.error('Error loading Google Maps API:', error);
      setResult('Ошибка загрузки API');
    }
  }, [city1, city2]);

  const handleChange1 = useCallback( async (e) => {
    try{
      setCity1(e.target.value)
      const {data} = await axios.post("https://api.api-ninjas.com/v1/city",
          {params: {name: e.target.value}, headers: {"X-Api-Key": Api_Key}})
      setCities1(data)
      console.log(data)
    }catch (e) {
      console.log(e)
      setCities1([])
    }
  }, [Api_Key])

  const handleChange2 = useCallback( async (e) => {
    try{
      setCity2(e.target.value)
      const {data} = await axios.get("https://api.api-ninjas.com/v1/city",
          {params: {name: e.target.value}, headers: {"X-Api-Key": Api_Key}})
      setCities2(data)
      console.log(data)
    }catch (e) {
      console.log(e)
      setCities2([])
    }
  }, [Api_Key])

  return (
    <div className="calculator-area">
      <div className="calculator-form">
        <h4>{translation.calculator[language]}</h4>
        <form onSubmit={calculateDistance}>
          <div className="label-area">
            <label>{translation.fromWhatCity[language]}</label>
            <br />
            <input type="text" value={city1} onChange={handleChange1} />
            {cities1 && cities1.map(c => (
                <p>{c.name}</p>
            ))}
          </div>
          <div className="label-area">
            <label>{translation.toWhichCity[language]}</label>
            <br />
            <input type="text" value={city2} onChange={handleChange2} />
            {cities2 && cities2.map(c => (
                <p>{c.name}</p>
            ))}
          </div>
          <div className="label-area">
            <label>{translation.selectProduct[language]}</label>
            <br />
            <input type="text" />
            <br />
            <input type="submit" value={translation.result[language]} className="submit-button" />
          </div>
        </form>

        <div className="logistic-price">
          <p>{result && translation.transportationWillCost[language]} {result}</p>
          <p style={{color:"red"}}>{error && error}</p>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
