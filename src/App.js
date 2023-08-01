import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { UsMap } from "./components/UsMap/UsMap";
import { Navbar } from "./components/Navbar/Navbar";
import { PredictionArea } from "./components/PredictionArea/PredictionArea";
import { MetroAreas } from "./components/MetroAreas/MetroAreas";

function App() {
  const [data, setData] = useState([{}]);

  const defaultMetroArea = "United States of America";

  //parent-usState
  const [usState, setUsState] = useState("");

  const [metroArea, setMetroArea] = useState(defaultMetroArea);

  const [metroOptions, setMetroOptions] = useState([{}]);

  const [marketTrend, setMarketTrend] = useState("");

  function changeState(givenState) {
    setUsState(givenState);
    //setMetroArea(defaultMetroArea);
    changeMetroAreaOptions(givenState);
  }

  function changeMetroArea(givenMetroArea) {
    setMetroArea(givenMetroArea);
    console.log(givenMetroArea);
  }

  function changeMetroAreaOptions(givenState) {
    let optionsForState = MetroAreas.filter(function (el) {
      return el.state === givenState;
    });

    setMetroOptions(optionsForState);

    console.log(metroOptions);
  }
  /*
  useEffect(() => {
    fetch("/members")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data, "hi");
      });
  }, []);
  */

  return (
    <div className="App">
      <div className="background market"/>
      <Navbar />
      <UsMap
        usState={usState}
        setUsState={changeState}
        marketTrend={marketTrend}
      />
      <PredictionArea
        metroArea={metroArea}
        setMetroArea={changeMetroArea}
        setUsState={changeState}
        usState={usState}
        metroAreas={metroOptions}
      />
      <div>{usState}</div>
      <div>{metroArea}</div></div>
    
  );
}

export default App;
