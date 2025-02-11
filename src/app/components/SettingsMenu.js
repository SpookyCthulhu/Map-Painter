import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function SettingsMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [borders, setBorders] = useState(false);

  const addBorderToCountry = () => {
    const countryElement = document.querySelectorAll('.Country');
    console.log(countryElement);
    countryElement.forEach(country => {
        if (borders) {
            country.style.strokeWidth = '0px';
            setBorders(false);
        } else {
            country.style.strokeWidth = '1px';
            setBorders(true);
        }
    });
  };
  const changeFillOfCountry = () => {
    const newColor = prompt("Enter the new fill color for Country elements (e.g., 'red' or '#ff0000'):");
    if (newColor) {
      const countryElements = document.querySelectorAll('.Country');
      countryElements.forEach(el => {
        el.style.fill = newColor;
      });
    }
  };

  // Button 3: Change the background color of the document body
  const changeBackgroundColor = () => {
    const newColor = prompt("Enter the new background color (e.g., 'blue' or '#0000ff'):");
    if (newColor) {
      document.body.style.backgroundColor = newColor;
    }
  };

  return (
    <>
      {/* Cog Icon: only visible when menu is closed */}
      {!menuOpen && (
        <div
          className="fixed top-4 right-4 cursor-pointer text-gray-600 hover:text-gray-800"
          onClick={() => setMenuOpen(true)}
        >
          <FontAwesomeIcon icon={faCog} size="lg" />
        </div>
      )}

      {/* Side Menu: appears when menuOpen is true */}
      {menuOpen && (
        <div className="fixed top-0 right-0 h-full w-64 bg-black bg-opacity-75 p-4">
          {/* Close Button */}
          <div className="flex justify-end">
            <button onClick={() => setMenuOpen(false)}>
              <FontAwesomeIcon icon={faTimes} size="lg" className="text-white" />
            </button>
          </div>
          {/* Demonstration Buttons */}
          <div className="mt-8 space-y-4">
            <button 
              className="w-full py-2 bg-white text-black rounded hover:bg-gray-200"
              onClick={addBorderToCountry}
            >
              Button 1
            </button>
            <button 
              className="w-full py-2 bg-white text-black rounded hover:bg-gray-200"
              onClick={changeFillOfCountry}
            >
              Button 2
            </button>
            <button 
              className="w-full py-2 bg-white text-black rounded hover:bg-gray-200"
              onClick={changeBackgroundColor}
            >
              Button 3
            </button>
          </div>
        </div>
      )}
    </>
  );
}
