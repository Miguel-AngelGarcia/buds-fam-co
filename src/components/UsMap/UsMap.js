import { useState, useEffect } from "react";
import "./map.css";
import React from "react";
import { States } from "../States/States";

export const UsMap = ({ usState, setUsState, marketTrend }) => {
  //moved to parent (App.js)
  //const [usState, setUsState] = useState([{}]);
  const [element, setElement] = useState(null);

  useEffect(() => {
    if (element !== null) {
      //console.log(element);
      element.style.transform = "scale(0.999)";
      element.style.stroke = "#000000";
      element.style.strokeWidth = "1.5";
    }
  }, [element]);

  return (
    <div className="map-div">
      <link rel="stylesheet" type="text/css" href="main.css" />
      <div id="info-box"></div>
      <div className="map">
        <svg
          xmlnsCc="http://creativecommons.org/ns#"
          xmlnsDc="http://purl.org/dc/elements/1.1/"
          xmlnsRdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
          xmlnsInkscape="http://www.inkscape.org/namespaces/inkscape"
          xmlnsSodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
          xmlnsSvg="http://www.w3.org/2000/svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="us-map"
          preserveAspectRatio="xMinYMin meet"
          sodipodiDocname="Republican_Party_presidential_primaries_results,_2016.svg"
          inkscapeVersion="0.91 r13725"
          x="0px"
          y="0px"
          width="959px"
          height="593px"
          viewBox="174 100 959 593"
          enable-background="new 174 100 959 593"
          xmlSpace="preserve"
          className={marketTrend}
        >
          <sodipodiNamedview
            bordercolor="#666666"
            objecttolerance="10"
            pagecolor="#ffffff"
            borderopacity="1"
            gridtolerance="10"
            guidetolerance="10"
            inkscapeCx="509.19152"
            inkscapeCy="282.2353"
            inkscapeZoom="1.2137643"
            showgrid="false"
            id="namedview71"
            inkscapeCurrent-layer="g5"
            inkscapeWindow-maximized="1"
            inkscapeWindow-y="-8"
            inkscapeWindow-x="-8"
            inkscapePageopacity="0"
            inkscapeWindow-height="1017"
            inkscapeWindow-width="1920"
            inkscapePageshadow="2"
          ></sodipodiNamedview>
          <g
            id="g5"
            style={{
              filter: "drop-shadow(1px 1px 1px rgba(153, 137, 178, 0.2))",
            }}
          >
            {States.map((state) => (
              <path
                name={state.name}
                capital={state.capital}
                d={state.d}
                //onClick={(e) => stateUsStateClick(state.name)}
                onClick={(e) => setUsState(state.name)}
                style={{
                  zIndex: usState === state.name ? "1" : "0",
                  fill: usState === state.name ? "rgb(153, 137, 178)" : "",
                  transform: usState === state.name ? "scale(0.999)" : "",
                  stroke: usState === state.name ? "#7E699E" : "#F5F5F5",
                  strokeWidth: usState === state.name ? "2" : "1.75",
                }}
              ></path>
            ))}
            <g id="DC">
              <path
                id="path58"
                d="M975.8,353.8l-1.1-1.6l-1-0.8l1.1-1.6l2.2,1.5L975.8,353.8z"
              />
              <circle
                name="Washington DC"
                capital="Washington DC"
                stroke="#FFFFFF"
                stroke-width="1.5"
                cx="975.3"
                cy="351.8"
                r="5"
                //onClick={(e) => stateUsStateClick("Washington DC")}
                onClick={(e) => setUsState("Washington DC")}
                style={{
                  zIndex: usState === "Washington DC" ? "1" : "0",
                  fill: usState === "Washington DC" ? "rgb(153, 137, 178)" : "",
                  transform: usState === "Washington DC" ? "scale(0.999)" : "",
                  stroke: usState === "Washington DC" ? "#7E699E" : "",
                  strokeWidth: usState === "Washington DC" ? "2" : "",
                }}
              />
            </g>
          </g>
        </svg>
      </div>
      <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
      <script src="main.js"></script>
    </div>
  );
};

//<link rel="stylesheet" type="text/css" href="main.css" />
//<?xml version="1.0" encoding="utf-8"?>
