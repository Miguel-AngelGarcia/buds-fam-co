import "./pa.css";
//import { MetroAreas } from "../MetroAreas/MetroAreas";
import { useEffect, useState, useRef } from "react";
import { NumericFormat, PatternFormat } from "react-number-format";

export const PredictionArea = ({
  metroArea,
  setMetroArea,
  usState,
  setUsState,
  metroAreas,
  result,
  setResult,
  defaultSelect,
  dropdownAllowed,
  predictAllowed,
  setPredictAllowed,
  regionId,
  setRegionId,
  currentRates,
  metroAreaPrice,
  test,
  metroAreaValue,
}) => {
  const optionClick = (e) => {
    let index = e.target.selectedIndex;
    let el = e.target.childNodes[index];
    let optionState = el.getAttribute("state");

    let toUseRegionId = String(el.getAttribute("regionId"));
    //console.log("CURRENT REGION ID", toUseRegionId);

    setUsState(optionState);
    setMetroArea(e.target.value, toUseRegionId);

    setRegionId(toUseRegionId);

    setSelectValue(e.target.value);
    setPredictAllowed(true);

    setForm({ ...form, regionId: toUseRegionId });
  };

  const currInfo = [
    {
      interest: currentRates.interest,
      vacancy: currentRates.vacancy,
      price: parseInt(metroAreaPrice).toFixed(0),
      value: metroAreaValue,
      regionId: regionId,
    },
  ];

  const [selectValue, setSelectValue] = useState({ defaultSelect });

  //look into why this worked
  //https://stackoverflow.com/questions/53715465/can-i-set-state-inside-a-useeffect-hook
  useEffect(() => {
    setForm((form) => ({ ...form, regionId: regionId }));
  }, [regionId]);

  useEffect(() => {
    setForm((form) => ({ ...form, interest: currentRates.interest }));
    setForm((form) => ({ ...form, vacancy: currentRates.vacancy }));
    setForm((form) => ({ ...form, cpi: currentRates.cpi }));
  }, [currentRates.interest, currentRates.vacancy, currentRates.cpi]);

  useEffect(() => {
    setForm((form) => ({ ...form, price: metroAreaPrice }));
    setForm((form) => ({ ...form, value: metroAreaValue }));
  }, [metroAreaPrice, metroAreaValue]);

  const [form, setForm] = useState({
    interest: currInfo[0].interest,
    vacancy: currInfo[0].vacancy,
    price: currInfo[0].price,
    value: currInfo[0].value,
    regionId: currInfo[0].regionId,
    cpi: "",
  });

  const [interestDigits, setInterestDigits] = useState(true);

  //const [result, setResult] = useState("");

  const handlePredict = (e) => {
    e.preventDefault();

    //these are the forms we will do
    const form_data = new FormData();
    form_data.append("interest", form.interest);
    form_data.append("vacancy", form.vacancy);
    form_data.append("price", form.price);
    form_data.append("value", form.value);
    form_data.append("regionId", regionId);
    form_data.append("cpi", form.cpi);

    console.log(form);
    fetch("https://budsfamco-0d4d5b3cb466.herokuapp.com/predict", {
      method: "POST",
      body: form_data,
    })
      .then((response) => response.text())
      .then((html) => {
        setResult(html);
      });
  };

  //this will change numbers in currInfo
  const onChangePercent = (e) => {
    const inputName = e.target.name;
    const inputValue = parseFloat(e.target.value);

    let char = inputValue.toString().length;
    if (inputName === "interest" && char < 4) {
      setInterestDigits(true);
    }

    setForm({ ...form, [inputName]: String(inputValue) });
  };

  const onChangeNumber = (e) => {
    const inputName = e.target.name;
    let inputValue = String(e.target.value);

    inputValue = inputValue.replace("$", "").replace(/,/g, "");

    console.log(inputValue);

    setForm({ ...form, [inputName]: inputValue });
  };

  return (
    <div className="wrapper glass">
      <div className="outer-box glass__form__input">
        <div className="title">
          <label for="MetroArea">Region</label>
        </div>
        <form onSubmit={handlePredict}>
          <div className="form-div">
            <div className="subtitle-select">
              <div className="subtitle-area">
                <div
                  className="subtitle"
                  style={{ display: usState === "" ? "none" : "" }}
                >
                  <label for="MetroArea">{usState}</label>
                </div>
              </div>

              <div className="selection-area">
                <select
                  id="MetroArea"
                  name="MetroArea"
                  //value={metroArea}
                  onChange={optionClick} //(e) => optionClick(e)
                  style={{
                    //display: usState === "" || metroAreas.length < 1 ? "none" : "",
                    display: dropdownAllowed === false ? "none" : "",
                  }}
                  className="select-box"
                >
                  <option defaultValue={true}>Select From List</option>
                  {metroAreas.map((mArea) => (
                    <option
                      name={mArea.name}
                      city={mArea.city}
                      state={mArea.state}
                      value={mArea.name}
                      regionId={mArea.regionId}
                      key={mArea.regionId} //added key to select resets to "Select From Option"
                      //onClick={setUsState(mArea.state)}
                    >
                      {mArea.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="input-button-result">
              <label>
                Interest Rate:{" "}
                <PatternFormat
                  name="interest"
                  className="small"
                  placeholder={`${currInfo[0].interest}%`}
                  format="##.#%"
                  onChange={onChangePercent}
                  maxLength={6}
                />
              </label>
              <label>
                Vacancy Rate:{" "}
                <PatternFormat
                  name="vacancy"
                  className="small"
                  placeholder={`${currInfo[0].vacancy}%`}
                  format="##.#%"
                  onChange={onChangePercent}
                  maxLength={6}
                />
              </label>
              <label>
                House Price:{" "}
                <NumericFormat
                  thousandSeparator={true}
                  prefix={"$"}
                  decimalScale={2}
                  placeholder={`$${currInfo[0].price}`}
                  name="price"
                  className="large"
                  onChange={onChangeNumber}
                />
              </label>
              <label>
                House Value:{" "}
                <NumericFormat
                  thousandSeparator={true}
                  prefix={"$"}
                  decimalScale={2}
                  placeholder={`$${currInfo[0].value}`}
                  name="value"
                  className="large"
                  onChange={onChangeNumber}
                />
              </label>
              <div className="button">
                <button
                  disabled={!predictAllowed}
                  className={predictAllowed ? "" : "not-allowed"}
                >
                  Predict
                </button>
              </div>

              <div className="result-container">
                <p className="result-line">Housing prices will go: {result}</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
