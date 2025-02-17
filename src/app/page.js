"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Map from "./components/Map";
import MapViewer from "./components/MapViewer";
import Sidebar from "./components/Sidebar";
import ColorPicker from "./components/ColorPicker";
import SettingsMenu from "./components/SettingsMenu";

const Home = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const countries = document.querySelectorAll(".Country");

    countries.forEach(country => {
        // Generate escaped class selector for the country
        const classes = [...country.classList].map(c => CSS.escape(c)).join('.');
        const selector = `${classes.split(".")[1]}`;
        console.log(selector);
        
        // Generate ONE random color per country
        const randomColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
        console.log(randomColor);
        // Apply color to all matching elements
        document.querySelectorAll("."+selector).forEach(el => {
            console.log("visiting " + selector)
            el.style.fill = randomColor;
        });
      });
  }, );

  const handleCountryClick = async (countryName) => {

    let paths = document.getElementsByClassName(countryName.replace(/\s/g, "_"));
    console.log(paths)

    if (selectedColor) {
      [...paths].forEach(path => {path.style.fill = selectedColor;});
    }

    try {
      setLoading(true);
      setSidebarOpen(true);
      
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
      );
      
      if (!response.ok) throw new Error("Country not found");
      
      const data = await response.json();
      setCountryData(data[0]);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setCountryData({ error: "No data available" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen">
      <MapViewer>
        <Map onCountryClick={handleCountryClick} />
      </MapViewer>
      <ColorPicker setColor={setSelectedColor} />
      <Sidebar
        isOpen={sidebarOpen}
        countryData={countryData}
        onClose={() => setSidebarOpen(false)}
      />
      <SettingsMenu></SettingsMenu>
    </div>
  );
};

export default Home;