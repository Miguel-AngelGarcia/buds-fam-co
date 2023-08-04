import "./App.css";
import { useState, useEffect } from "react";
import { UsMap } from "./components/UsMap/UsMap";
import { Navbar } from "./components/Navbar/Navbar";
import { PredictionArea } from "./components/PredictionArea/PredictionArea";
import { MetroAreas } from "./components/MetroAreas/MetroAreas";

function App() {
  const defaultMetroArea = "United States of America";
  const defaultRegionId = "102001";

  //parent-usState
  const [usState, setUsState] = useState("");

  const [metroArea, setMetroArea] = useState(defaultMetroArea);

  const [metroOptions, setMetroOptions] = useState([{}]);

  const [marketTrend, setMarketTrend] = useState("");

  const [regionId, setRegionId] = useState(defaultRegionId);

  const [result, setResult] = useState("");

  const [dropdownAllowed, setDropdownAllowed] = useState(false);
  const [predictAllowed, setPredictAllowed] = useState(true);

  function changeState(givenState) {
    setUsState(givenState);
    console.log(givenState, regionId);
    //setMetroArea(defaultMetroArea);
    changeMetroAreaOptions(givenState);
    console.log("IN changeState() ", regionId);
    setRegionId(defaultRegionId);
  }

  function changeMetroArea(givenMetroArea, givenRegionId) {
    setMetroArea(givenMetroArea);
    setRegionId(givenRegionId);
    console.log("in changeMetrArea() ", givenRegionId);
    //console.log(givenMetroArea, givenRegionId);

    changePredictAllowed(givenRegionId);
  }

  function changeRegionId(givenRegionId) {
    setRegionId(givenRegionId);
    console.log("in changeMetrArea() ", givenRegionId);
  }

  function changeMetroAreaOptions(givenState) {
    let optionsForState = MetroAreas.filter(function (el) {
      return el.state === givenState;
    });

    setMetroOptions(optionsForState);
    changeDropdownAllowed(givenState, optionsForState);
  }

  function changeResult(givenResult) {
    setResult(givenResult);
    //console.log("result is", givenResult);
  }

  function changeDropdownAllowed(state, mAs) {
    const decision = state !== "" && mAs.length > 0;
    //if state === ""         === if state !== ""
    //OR mAs.length === 0          & mAs.length > 0
    //FALSE
    setDropdownAllowed(decision);

    if (decision === true) {
      console.log(
        "in if stament. type ",
        typeof predictAllowed,
        typeof decision
      );
      setPredictAllowed(false);
    } else {
      setPredictAllowed(true);
    }
  }

  function changePredictAllowed(boolean) {
    setPredictAllowed(true);
  }

  console.log("REGION ID IN APP: ", regionId);
  return (
    <div className="App">
      <div className="app-wrap">
        <div className={`background ${result} market-${result}`} />
        <Navbar />
        <div className="grid-wrapper">
          <div className="map-item">
            <UsMap
              usState={usState}
              setUsState={changeState}
              marketTrend={marketTrend}
            />
          </div>
          <div className="form-item">
            <PredictionArea
              metroArea={metroArea}
              setMetroArea={changeMetroArea}
              setUsState={changeState}
              usState={usState}
              metroAreas={metroOptions}
              result={result}
              setResult={changeResult}
              dropdownAllowed={dropdownAllowed}
              //setPredictAllowed={changePredictAllowed}
              predictAllowed={predictAllowed}
              setPredictAllowed={changePredictAllowed}
              regionId={regionId}
              setRegionId={changeRegionId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
