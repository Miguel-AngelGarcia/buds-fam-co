import React from "react";
import { BarChart } from "../BarChart/BarChart";
import { TimeGraph } from "../TimeGraph/TimeGraph";
import { GaugeChart } from "../GaugeChart/GaugeChart";

//setModalState is the changeModalState Function
export const Modal = ({ modalState, setModalState, regionId, usState }) => {
  //if modeState is not true (not open), do not render
  if (!modalState) return null;

  return (
    <>
      <div className="overlay-styles"></div>
      <div className="modal-styles" title={"Modal"}>
        <div className="modal-wrapper">
          <div className="modal-container">
            <div className="modal-title-container">
              <div className="modal-title-div">TITLE</div>
            </div>
            <div className="graph-wrapper">
              <div className="graph-container">
                <div className="graph-top">
                  <TimeGraph regionId={regionId} />
                </div>
                <div className="graph-bottom">
                  <BarChart />
                  <GaugeChart />
                </div>
              </div>
            </div>
            <div className="button">
              <button onClick={() => setModalState(!modalState)}>
                Close Modal
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
