import "./App.css";
import { useState, useEffect } from "react";
import { UsMap } from "./components/UsMap/UsMap";
import { Navbar } from "./components/Navbar/Navbar";
import { PredictionArea } from "./components/PredictionArea/PredictionArea";
import { MetroAreas } from "./components/MetroAreas/MetroAreas";
import { Footer } from "./components/Footer/Footer";
import { CurveShape } from "./components/CurveShape/CurveShape";
import { Modal } from "./components/Modal/Modal";

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

  const [predictionTrends, setPredictionTrends] = useState([{}]);

  const [accuracyInfo, setAccuracyInfo] = useState([{}]);
  const [accuracy, setAccuracy] = useState("");

  const [metroAreaPrice, setMetroAreaPrice] = useState("");
  const [metroAreaValue, setMetroAreaValue] = useState("");

  const [modalState, setModalState] = useState(false);

  function changeMetroInfo(givenArray, toFind) {
    for (const item in givenArray) {
      if (givenArray[item].regionId === Number(toFind)) {
        setMetroAreaPrice(givenArray[item].price);
        setMetroAreaValue(Math.round(givenArray[item].value));
      }
    }
  }

  function changeAccuracyInfo(givenArray, toFind) {
    for (const item in givenArray) {
      if (givenArray[item].regionId === Number(toFind)) {
        let rounded = Math.round(givenArray[item].accuracy * 100);
        setAccuracy(rounded);
      }
    }
  }

  function changeState(givenState) {
    setUsState(givenState);
    //console.log(givenState, regionId);
    //setMetroArea(defaultMetroArea);
    changeMetroAreaOptions(givenState);

    setRegionId(defaultRegionId);

    changeMetroInfo(metroInfo, defaultRegionId);
    changeAccuracyInfo(accuracyInfo, defaultRegionId);
  }

  function changeMetroArea(givenMetroArea, givenRegionId) {
    setMetroArea(givenMetroArea);
    setRegionId(givenRegionId);

    changePredictAllowed(givenRegionId);
    changeMetroInfo(metroInfo, givenRegionId);
    changeAccuracyInfo(accuracyInfo, givenRegionId);
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

  function changeModalState(boolean) {
    setModalState(!modalState);
  }

  //after a state or metro area changes, will reset background
  useEffect(() => {
    setResult("");
  }, [usState, metroArea]);

  //gets rates: interest, vacancy, cpi
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

  //gets number of predicted markets going up and # going down
  useEffect(() => {
    /*async we need to wait for a promise to come back
    ALSO make sure you just pop after selecting number once */
    const fetchTrendInfo = async () => {
      //const ratesInfo = "https://budsfamco-0d4d5b3cb466.herokuapp.com/trends";
      const trendInfo = "https://budsfamco-0d4d5b3cb466.herokuapp.com/trends";
      const trendResponse = await fetch(trendInfo);
      if (!trendResponse.ok) {
        throw new Error("something went wrong!");
      }
      const trendResponseJSON = await trendResponse.json();

      setPredictionTrends(trendResponseJSON);
    };

    fetchTrendInfo().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  useEffect(() => {
    /*async we need to wait for a promise to come back
    ALSO make sure you just pop after selecting number once */
    const fetchAccurcyInfo = async () => {
      const accuracyInfo =
        "https://budsfamco-0d4d5b3cb466.herokuapp.com/accuracy";
      const accuracyResponse = await fetch(accuracyInfo);
      if (!accuracyResponse.ok) {
        throw new Error("something went wrong!");
      }
      const accuracyResponseJSON = await accuracyResponse.json();

      const loadedAccuracyInfo = [];

      for (const key in accuracyResponseJSON) {
        loadedAccuracyInfo.push({
          regionId: accuracyResponseJSON[key].regionId,
          accuracy: accuracyResponseJSON[key].accuracy,
        });
      }

      setAccuracyInfo(loadedAccuracyInfo);
      changeAccuracyInfo(loadedAccuracyInfo, defaultRegionId);
    };

    fetchAccurcyInfo().catch((error) => {
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

  //console.log("REGION ID IN APP: ", regionId);
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
                modalState={modalState}
                setModalState={changeModalState}
              />
            </div>
          </div>
        </div>
        <Modal
          modalState={modalState}
          setModalState={changeModalState}
          regionId={regionId}
          usState={usState}
          accuracy={accuracy}
          predictionTrends={predictionTrends}
          metroArea={metroArea}
        />
        <CurveShape />
        <Footer />
      </div>
    </div>
  );
}

export default App;
