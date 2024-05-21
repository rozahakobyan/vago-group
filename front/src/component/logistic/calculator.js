import React, { useCallback, useState } from 'react';
import { Account } from '../../helpers/Account';
import translation from '../../assets/data/translation';
import { Loader as GoogleMapsLoader } from '@googlemaps/js-api-loader';

const language = Account.getLanguage();

const options = {
  apiKey: 'AIzaSyB2c0GKrKxmnzJKy9xsxkFi-f-fjDW9bFE',
  version: 'weekly',
  libraries: ['places'],
};

const googleMapsLoader = new GoogleMapsLoader(options);

function Calculator() {
  const [city1, setCity1] = useState('');
  const [city2, setCity2] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const calculateDistance = useCallback(async () => {
    try {
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

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    calculateDistance();
  }, []);

  return (
    <div className="calculator-area">
      <div className="calculator-form">
        <h4>{translation.calculator[language]}</h4>
        <form onSubmit={handleSubmit}>
          <div className="label-area">
            <label>{translation.fromWhatCity[language]}</label>
            <br />
            <input type="text" value={city1} onChange={(e) => setCity1(e.target.value)} />
          </div>
          <div className="label-area">
            <label>{translation.toWhichCity[language]}</label>
            <br />
            <input type="text" value={city2} onChange={(e) => setCity2(e.target.value)} />
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
