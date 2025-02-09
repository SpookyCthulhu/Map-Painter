"use client";
import { useEffect, useState } from "react";
import { setupMapInteractions } from "./utils/mapInteractions"; // Adjust path if needed
import Image from "next/image";
import Map from "./components/Map.js";
import MapViewer from "./components/MapViewer.js";
import ColorPicker from "./components/ColorPicker.js";

export default function Home() {
  useEffect(() => {
    setupMapInteractions(); // Call the function when component mounts
  }, []);

  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    console.log(selectedColor);
  }, [selectedColor]);

  return (
    <>
    <MapViewer>
    <Map></Map>
    </MapViewer>
    <ColorPicker setColor={setSelectedColor}></ColorPicker>
    <div className="side-panel">
      <div className='container'>
        <h1 className="country-name">Germany</h1>
        <img src=".flag.png" className="country-flag"/>
        <ul>
          <li>
            <strong>Capital City:</strong>
            <span className="city"></span>
          </li>
          <li>
            <strong>Area:</strong>
            <span className='area'></span>
          </li>
          <li>
            <strong>Currencies:</strong>
            <ul className="currency"></ul>
          </li>
          <li>
            <strong>Languages:</strong>
            <ul className="languages"></ul>
          </li>
        </ul>
      </div>
      <button className="close-btn">
        <i className="fas fa-times"></i>
      </button>
      <h2 className="loading">Loading...</h2>
    </div>
    
    </>
  );
}
