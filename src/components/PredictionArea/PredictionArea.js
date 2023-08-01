import "./pa.css";
//import { MetroAreas } from "../MetroAreas/MetroAreas";
import { useEffect, useState } from "react";

export const PredictionArea = ({
  metroArea,
  setMetroArea,
  usState,
  setUsState,
  metroAreas,
  result,
  setResult,
}) => {
  const optionClick = (e) => {
    let index = e.target.selectedIndex;
    let el = e.target.childNodes[index];
    let optionState = el.getAttribute("state");
    console.log("test", optionState);
    setMetroArea(e.target.value);
    setUsState(optionState);
  };

  const currInfo = [
    { interest: "4", vacancy: "4", price: "100000", value: "120000" },
  ];

  const [form, setForm] = useState({
    interest: currInfo[0].interest,
    vacancy: currInfo[0].vacancy,
    price: currInfo[0].price,
    value: currInfo[0].value,
  });

  //const [result, setResult] = useState("");

  const handlePredict = (e) => {
    e.preventDefault();
    console.log("form submitted");

    //these are the forms we will do
    const form_data = new FormData();
    form_data.append("interest", form.interest);
    form_data.append("vacancy", form.vacancy);
    form_data.append("price", form.price);
    form_data.append("value", form.value);

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
  const onChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setForm({ ...form, [inputName]: inputValue });
  };

  return (
    <div className="wrapper glass">
      <div className="outer-box glass__form__input">
        <form onSubmit={handlePredict}>
          <div className="title">
            <label for="MetroArea">Region</label>
          </div>
          <div
            className="subtitle"
            style={{ display: usState === "" ? "none" : "" }}
          >
            <label for="MetroArea">{usState}</label>
          </div>
          <select
            id="MetroArea"
            name="MetroArea"
            //value={metroArea}
            onChange={(e) => optionClick(e)}
            style={{
              display: usState === "" || metroAreas.length < 1 ? "none" : "",
            }}
          >
            {metroAreas.map((mArea) => (
              <option
                name={mArea.name}
                city={mArea.city}
                state={mArea.state}
                value={mArea.name}
                //onClick={setUsState(mArea.state)}
              >
                {mArea.name}
              </option>
            ))}
          </select>
          <div className="input-div">
            <label>
              Interest Rate:{" "}
              <input
                name="interest"
                className="small"
                placeholder={currInfo[0].interest}
                onChange={onChange}
              />
            </label>
            <label>
              Vacancy Rate:{" "}
              <input
                name="vacancy"
                className="small"
                placeholder={currInfo[0].vacancy}
                onChange={onChange}
              />
            </label>
            <label>
              House Price:{" "}
              <input
                name="price"
                className="large"
                placeholder={currInfo[0].price}
                onChange={onChange}
              />
            </label>
            <label>
              House Value:{" "}
              <input
                name="value"
                className="large"
                placeholder={currInfo[0].value}
                onChange={onChange}
              />
            </label>
          </div>
          <button>Predict</button>
          <div className="result-container">
            <p className="result-line">
              Housing prices will go:
              <span>{result}</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
