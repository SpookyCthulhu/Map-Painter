const FixedColorPicker = ({ setColor }) => {
    return (
      <div className="fixed bottom-4 right-8 bg-white bg-opacity-40 shadow-lg p-4 rounded-lg w-64 h-16 flex justify-between items-center">
        <div className="w-8 h-8 bg-red-500 cursor-pointer" onClick={() => setColor('red')}></div>
        <div className="w-8 h-8 bg-blue-500 cursor-pointer" onClick={() => setColor('blue')}></div>
        <div className="w-8 h-8 bg-green-500 cursor-pointer" onClick={() => setColor('green')}></div>
        <div className="w-8 h-8 bg-yellow-500 cursor-pointer" onClick={() => setColor('yellow')}></div>
        <div className="w-8 h-8 bg-purple-500 cursor-pointer" onClick={() => setColor('purple')}></div>
      </div>
    );
  };
  
  export default FixedColorPicker;
  