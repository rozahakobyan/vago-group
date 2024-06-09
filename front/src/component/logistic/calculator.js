import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { Account } from '../../helpers/Account';
import translation from '../../assets/data/translation';
import { Loader as GoogleMapsLoader } from '@googlemaps/js-api-loader';
import axios from "axios";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { productsListRequest } from "../../store/actions/products";
import { minimalPricesListRequest } from "../../store/actions/minimalPrices";
import Button from '../Button';

const language = Account.getLanguage();

const options = {
  apiKey: 'AIzaSyB2c0GKrKxmnzJKy9xsxkFi-f-fjDW9bFE',
  version: 'weekly',
  libraries: ['places'],
};

const googleMapsLoader = new GoogleMapsLoader(options);

function Calculator() {
  const dispatch = useDispatch();
  const [city1, setCity1] = useState('');
  const [city2, setCity2] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [cities1, setCities1] = useState([]);
  const [cities2, setCities2] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedCity1, setSelectedCity1] = useState(null);
  const [selectedCity2, setSelectedCity2] = useState(null);
  const [loading, setLoading] = useState(false);

  const products = useSelector(state => state.products.productsList);
  const minimalPrices = useSelector(state => state.minimalPrices.pricesList);

  useEffect(() => {
    dispatch(productsListRequest())
    dispatch(minimalPricesListRequest({active: true}))
  }, []);

  useEffect(() => {
    (async () => {
      if (city1 === "") {
        try {
          const { data } = await axios.get("https://api.thecompaniesapi.com/v1/locations/cities",
            { params: { search: "a" } })
          setCities1(data.cities)
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          const { data } = await axios.get("https://api.thecompaniesapi.com/v1/locations/cities",
            { params: { search: city1 } })
          setCities1(data.cities)
        } catch (e) {
          console.log(e)
        }
      }
      if (city2 === "") {
        try {
          const { data } = await axios.get("https://api.thecompaniesapi.com/v1/locations/cities",
            { params: { search: "a" } })
          setCities2(data.cities)
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          const { data } = await axios.get("https://api.thecompaniesapi.com/v1/locations/cities",
            { params: { search: city2 } })
          setCities2(data.cities)
        } catch (e) {
          console.log(e)
        }
      }
    })()
  }, [city1, city2]);

  const productsList = useMemo(() => {
    return products.map(p => {
      return {
        value: p.name,
        label: p.name,
        price: p.price,
        currency: p.currency
      }
    })
  }, [products]);

  const cities1List = useMemo(() => {
    return cities1.map(c => {
      return {
        value: c.name,
        label: c.name,
      }
    })
  }, [cities1]);

  const cities2List = useMemo(() => {
    return cities2.map(c => {
      return {
        value: c.name,
        label: c.name,
      }
    })
  }, [cities2]);

  const handleSelectChange = useCallback((selectedOption) => {
    setSelected(selectedOption)
  }, [])

  const handleSelectChangeCity1 = useCallback((selectedOption) => {
    setSelectedCity1(selectedOption)
    setCity1(selectedOption.value)
  }, [])

  const handleSelectChangeCity2 = useCallback((selectedOption) => {
    setSelectedCity2(selectedOption)
    setCity2(selectedOption.value)
  }, [])

  const calculateDistance = useCallback(async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
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
          try {
            if (status === 'OK') {
              setLoading(false)
              if (!selected) {
                setError("select the product")
              } else {
                const currency = selected.currency;
                const distance = response.rows[0].elements[0].distance.text;
                const price = minimalPrices[0][currency];
                const productPrice = selected.price;

                if(price){
                  setResult(`${((parseInt(distance) * price) + productPrice) + ' ' + currency} + ${translation.additional_expenses[language]}`);
                  setError("")
                }else{
                  console.error("Not minimal price !!!")
                }
              }

            } else {
              setResult('');
              console.error('Error calculating distance:', status);
            }
          }
          catch (e) {
            console.log(e)
            setError("the city name is incorrect")
            setResult('')
            setLoading(false)
          }
        }
      );
    } catch (error) {
      console.error('Error loading Google Maps API:', error);
      setResult('Ошибка загрузки API');
      setLoading(false)
    }
  }, [city1, city2, selected, minimalPrices]);
  
  return (
    <div className="calculator-area">
      <div className="calculator-form">
        <h4>{translation.calculator[language]}</h4>
        <form>
          <div className="label-area">
            <label>{translation.fromWhatCity[language]}</label>
            <br />
            {cities1List && <Select value={selectedCity1}
                                    options={cities1List}
                                    onKeyDown={(e) => {
                                      setSelectedCity1({value: e.target.value, label: e.target.value})
                                      setCity1(e.target.value)
                                    }}
                                    onChange={handleSelectChangeCity1}
                                    placeholder={<div>City...</div>}
                                    className="react-select-containers"
                                    classNamePrefix="react-selects"
                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                    styles={{
                                      menuPortal: (provided) => ({
                                        ...provided,
                                        zIndex: 9999,
                                      }),
                                      menu: (provided) => ({
                                        ...provided,
                                        zIndex: 9999,
                                        bottom: 'auto',
                                      })
                                    }}
                          />}
          </div>
          <div className="label-area">
            <label>{translation.toWhichCity[language]}</label>
            <br />
            {cities2List && <Select value={selectedCity2}
                                    options={cities2List}
                                    onKeyDown={(e) => {
                                      setSelectedCity2({value: e.target.value, label: e.target.value})
                                      setCity2(e.target.value)
                                    }}
                                    onChange={handleSelectChangeCity2}
                                    placeholder={<div>City...</div>}
                                    className="react-select-containers"
                                    classNamePrefix="react-selects"
                                    menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                    styles={{
                                      menuPortal: (provided) => ({
                                        ...provided,
                                        zIndex: 9999,
                                      }),
                                      menu: (provided) => ({
                                        ...provided,
                                        zIndex: 9999,
                                        bottom: 'auto',
                                      })
                                    }}
                            />}
          </div>
          <div className="label-area">
            <label>{translation.selectProduct[language]}</label>
            <br />
            {productsList && <Select value={selected}
                                      options={productsList}
                                      onChange={handleSelectChange}
                                      placeholder={<div>Products...</div>}
                                      className="react-select-containers"
                                      classNamePrefix="react-selects"
                                      menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                      styles={{
                                        menuPortal: (provided) => ({
                                          ...provided,
                                          zIndex: 9999,
                                        }),
                                        menu: (provided) => ({
                                          ...provided,
                                          zIndex: 9999,
                                          bottom: 'auto',
                                        })
                                      }}

                            />}
            <br />
            
            <Button onClick={calculateDistance} loading={loading} className="submit-button" title={translation.result[language]} />
          </div>
        </form>

        <div className="logistic-price">
          <p>{result && translation.transportationWillCost[language]} {result}</p>
          <p style={{ color: "red" }}>{error && error}</p>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
