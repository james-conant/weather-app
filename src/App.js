import React, { useEffect, useState } from "react";
import Weather from "./components/weather";
import { Dimmer, Loader } from "semantic-ui-react";

export default function App() {
  const [lat, setLat] = useState([]);

  const [long, setLong] = useState([]);

  const [data, setData] = useState([]);

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    };

    const fetchData = () => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=47bfde434af370452924722c768e3fc2`
      )
        .then((res) => res.json())
        .then((result) => {
          setData(result);
        });
    };
    getLocation();
    fetchData();
  }, [lat, long]);

  console.log(data);

  return (
    <div className="App">
      {typeof data.main != "undefined" ? (
        <Weather weatherData={data} />
      ) : (
        <Dimmer active>
          <Loader>Loading...</Loader>
        </Dimmer>
      )}
    </div>
  );
}
