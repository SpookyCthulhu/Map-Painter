import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMousePointer } from '@fortawesome/free-solid-svg-icons';

const ColorPicker = ({ setColor }) => {
  return (
    <div className="fixed bottom-4 right-8 bg-white bg-opacity-40 shadow-lg p-4 rounded-lg w-80 h-16 flex items-center">
      {/* Left: FontAwesome cursor icon to deselect */}
      <div className="cursor-pointer" onClick={() => setColor(null)}>
            <FontAwesomeIcon icon={faMousePointer} className="size-8"/>
        </div>
      
      {/* Middle: Five colored squares */}
      <div className="flex-1 flex justify-center items-center space-x-2">
        <div className="w-8 h-8 bg-red-500 cursor-pointer" onClick={() => setColor('red')}></div>
        <div className="w-8 h-8 bg-blue-500 cursor-pointer" onClick={() => setColor('blue')}></div>
        <div className="w-8 h-8 bg-green-500 cursor-pointer" onClick={() => setColor('green')}></div>
        <div className="w-8 h-8 bg-yellow-500 cursor-pointer" onClick={() => setColor('yellow')}></div>
        <div className="w-8 h-8 bg-purple-500 cursor-pointer" onClick={() => setColor('purple')}></div>
      </div>
      
      {/* Right: Custom color picker */}
      <div className="size-8">
        <input
          type="color"
          onChange={(e) => setColor(e.target.value)}
          className="w-8 h-8 p-0 border-0 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
