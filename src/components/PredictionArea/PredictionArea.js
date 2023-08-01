import "./pa.css";
//import { MetroAreas } from "../MetroAreas/MetroAreas";
import { useEffect } from "react";

export const PredictionArea = ({
  metroArea,
  setMetroArea,
  usState,
  setUsState,
  metroAreas,
}) => {
  const optionClick = (e) => {
    let index = e.target.selectedIndex;
    let el = e.target.childNodes[index];
    let optionState = el.getAttribute("state");
    console.log("test", optionState);
    setMetroArea(e.target.value);
    setUsState(optionState);
  };

  console.log(metroAreas);
  return (
    <div className="wrapper glass">
      <div className="outer-box glass__form__input">
        <form>
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
              Interest Rate: <input name="interest" className="small"/>
            </label>
            <label>
              Vacancy Rate: <input name="vacancy" className="small" />
            </label>
            <label>
              House Price: <input name="price" className="large"/>
            </label>
            <label>
              House Value: <input name="value" className="large"/>
            </label>
          </div>
          <div className="result">
            <button>Predict</button>
            <p>Housing prices will:</p>
            <div className="output">
              <output>GO UP</output>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
