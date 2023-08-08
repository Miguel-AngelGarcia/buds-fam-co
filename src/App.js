import "./App.css";
import { useState, useEffect } from "react";
import { UsMap } from "./components/UsMap/UsMap";
import { Navbar } from "./components/Navbar/Navbar";
import { PredictionArea } from "./components/PredictionArea/PredictionArea";
import { MetroAreas } from "./components/MetroAreas/MetroAreas";
import { Footer } from "./components/Footer/Footer";
import { CurveShape } from "./components/CurveShape/CurveShape";

function App() {
  const defaultMetroArea = "United States of America";
  const defaultRegionId = "102001";

  //parent-usState
  const [usState, setUsState] = useState("");

  const [metroArea, setMetroArea] = useState(defaultMetroArea);

  const [metroInfo, setMetroInfo] = useState({ defaultRegionId: [] });

  const [metroOptions, setMetroOptions] = useState([{}]);

  const [marketTrend, setMarketTrend] = useState("");

  const [regionId, setRegionId] = useState(defaultRegionId);

  const [result, setResult] = useState("");

  const [dropdownAllowed, setDropdownAllowed] = useState(false);
  const [predictAllowed, setPredictAllowed] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [currentRates, setCurrentRates] = useState([{}]);
  const [metroAreaPrice, setMetroAreaPrice] = useState("");
  const [metroAreaValue, setMetroAreaValue] = useState("");
  const [umm, setUmm] = useState(100);

  function changeMetroInfo(givenArray, toFind) {
    for (const item in givenArray) {
      if (givenArray[item].regionId === Number(toFind)) {
        setMetroAreaPrice(givenArray[item].price);
        setMetroAreaValue(Math.round(givenArray[item].value));
      }
    }
  }

  function changeState(givenState) {
    setUsState(givenState);
    console.log(givenState, regionId);
    //setMetroArea(defaultMetroArea);
    changeMetroAreaOptions(givenState);

    setRegionId(defaultRegionId);

    changeMetroInfo(metroInfo, defaultRegionId);
  }

  function changeMetroArea(givenMetroArea, givenRegionId) {
    setMetroArea(givenMetroArea);
    setRegionId(givenRegionId);

    changePredictAllowed(givenRegionId);
    changeMetroInfo(metroInfo, givenRegionId);
  }

  function changeRegionId(givenRegionId) {
    setRegionId(givenRegionId);
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
      setPredictAllowed(false);
    } else {
      setPredictAllowed(true);
    }
  }

  function changePredictAllowed(boolean) {
    setPredictAllowed(true);
  }

  //after a state or metro area changes, will reset background
  useEffect(() => {
    setResult("");
  }, [usState, metroArea]);

  useEffect(() => {
    /*async we need to wait for a promise to come back
    ALSO make sure you just pop after selecting number once */
    const fetchInfo = async () => {
      //const ratesInfo = "https://budsfamco-0d4d5b3cb466.herokuapp.com/rates";
      const ratesInfo = "https://budsfamco-0d4d5b3cb466.herokuapp.com/rates";
      const idResponse = await fetch(ratesInfo);
      if (!idResponse.ok) {
        throw new Error("something went wrong!");
      }
      const idResponseJSON = await idResponse.json();
      //console.log("JSON", idResponseJSON);

      setCurrentRates(idResponseJSON);
    };

    fetchInfo().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  useEffect(() => {
    const fetchMetroInfo = async () => {
      //const ratesInfo = "https://budsfamco-0d4d5b3cb466.herokuapp.com/info";
      const metroInfoLink = "https://budsfamco-0d4d5b3cb466.herokuapp.com/info";
      const metroAreaResponse = await fetch(metroInfoLink);
      if (!metroAreaResponse.ok) {
        throw new Error("something went wrong!");
      }
      const maResponseJSON = await metroAreaResponse.json();

      const loadedMetroAreas = [];

      for (const key in maResponseJSON) {
        loadedMetroAreas.push({
          regionId: maResponseJSON[key].regionId,
          price: maResponseJSON[key].price,
          value: maResponseJSON[key].value,
        });
      }

      setMetroInfo(loadedMetroAreas);

      changeMetroInfo(loadedMetroAreas, defaultRegionId);

      //setMetroAreaPrice(maResponseJSON[defaultRegionId][0]);
      //setMetroAreaValue(maResponseJSON[defaultRegionId][1]);
    };
    fetchMetroInfo().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  console.log("REGION ID IN APP: ", regionId);
  return (
    <div className="App">
      <div className="app-wrap">
        <div className={`background ${result} market-${result}`} />
        <Navbar />
        <div className="grid-container">
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
                currentRates={currentRates}
                metroInfo={metroInfo}
                metroAreaPrice={metroAreaPrice}
                metroAreaValue={metroAreaValue}
                test={umm}
              />
            </div>
          </div>
        </div>
        <CurveShape />
        <Footer />
      </div>
    </div>
  );
}

export default App;
