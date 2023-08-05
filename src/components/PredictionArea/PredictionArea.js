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
}) => {
  console.log(
    usState,
    "predict allowed: ",
    predictAllowed,
    "dropdown",
    dropdownAllowed,
    "REGION ID: ",
    regionId
  );

  const optionClick = (e) => {
    let index = e.target.selectedIndex;
    let el = e.target.childNodes[index];
    let optionState = el.getAttribute("state");
    console.log("test", optionState);
    let toUseRegionId = String(el.getAttribute("regionId"));
    console.log("CURRENT REGION ID", toUseRegionId);

    setMetroArea(e.target.value, toUseRegionId);
    setUsState(optionState);

    setRegionId(toUseRegionId);

    console.log(e.target.value);
    console.log(metroArea);
    setSelectValue(e.target.value);
    setPredictAllowed(true);

    setForm({ ...form, regionId: toUseRegionId });
  };

  const currInfo = [
    {
      interest: "4",
      vacancy: "4",
      price: "100000",
      value: "120000",
      regionId: regionId,
    },
  ];

  const [selectValue, setSelectValue] = useState({ defaultSelect });

  const [regionIdToUse, setRegionIdToUse] = "102001"; //U.S.A. region ID

  //look into why this worked
  //https://stackoverflow.com/questions/53715465/can-i-set-state-inside-a-useeffect-hook
  useEffect(() => {
    setForm((form) => ({ ...form, regionId: regionId }));
  }, [regionId]);

  const [form, setForm] = useState({
    interest: currInfo[0].interest,
    vacancy: currInfo[0].vacancy,
    price: currInfo[0].price,
    value: currInfo[0].value,
    regionId: currInfo[0].regionId,
  });

  const [interestDigits, setInterestDigits] = useState(true);

  //const [result, setResult] = useState("");

  const handlePredict = (e) => {
    e.preventDefault();

    //let toUseRegionId = regionId;
    //setForm({ ...form, regionId: toUseRegionId });
    //console.log("in predict ", toUseRegionId);

    //these are the forms we will do
    const form_data = new FormData();
    form_data.append("interest", form.interest);
    form_data.append("vacancy", form.vacancy);
    form_data.append("price", form.price);
    form_data.append("value", form.value);
    form_data.append("regionId", regionId);

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
    console.log(inputValue, inputValue.toString().length);
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
