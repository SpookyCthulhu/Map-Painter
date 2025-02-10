// components/Sidebar.js
import { useState, useEffect } from "react";

const Sidebar = ({ isOpen, countryData, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 h-full w-80 bg-black shadow-lg p-4 transform transition-transform duration-300 ease-in-out translate-x-0">
      <button 
        onClick={onClose}
        className="absolute bg-blue-800 top-0 right-0 size-[4rem] hover:bg-blue-600"
      >
        <i className="fas fa-times"></i>
      </button>

      {isLoading ? (
        <div className="animate-pulse">Loading...</div>
      ) : (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold p-4">{countryData?.name?.common}</h1>
          
          {countryData?.flags?.png && (
            <img 
              src={countryData.flags.png} 
              alt="Country flag" 
              className="m-4 w-auto h-32 object-contain"
              onLoad={() => setIsLoading(false)}
            />
          )}

          <div className="space-y-2">
            <p className="p-4"><strong>Capital:</strong> {countryData?.capital?.[0]}</p>
            <p className="p-4">
              <strong>Area:</strong>{" "}
              {countryData?.area?.toLocaleString('de-DE')} km²
            </p>
            
            <div className="p-4">
              <strong>Currencies:</strong>
              <ul className="list-disc pl-4">
                {countryData?.currencies && Object.values(countryData.currencies).map((curr, i) => (
                  <li key={i}>{curr.name}</li>
                ))}
              </ul>
            </div>

            <div className="p-4">
              <strong>Languages:</strong>
              <ul className="list-disc pl-4">
                {countryData?.languages && Object.values(countryData.languages).map((lang, i) => (
                  <li key={i}>{lang}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;