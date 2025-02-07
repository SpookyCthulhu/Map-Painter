"use client";
import { useEffect } from "react";
import { setupMapInteractions } from "./utils/mapInteractions"; // Adjust path if needed
import Image from "next/image";
import Map from "./components/Map.js";

export default function Home() {
  useEffect(() => {
    setupMapInteractions(); // Call the function when component mounts
  }, []);
  return (
    <>
    <Map></Map>
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

    <div className="zoom-controls">
      <button className="zoom-in">+</button>
      <button className="zoom-out">-</button>
      <p className="zoom-value">100%</p>
    </div>
    </>
  );
}
