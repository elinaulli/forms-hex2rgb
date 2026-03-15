import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [hexColor, setHexColor] = useState('#34495e');
  const [rgbColor, setRgbColor] = useState('rgb(52, 73, 94)');
  const [error, setError] = useState('');

  const hexToRgb = (hex: string) => {
    const cleanHex = hex.replace('#', '');

    if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
      return null;
    }

    const r = parseInt(cleanHex.substring(0,2), 16);
    const g = parseInt(cleanHex.substring(2,4), 16);
    const b = parseInt(cleanHex.substring(4,6), 16);

    return {r, g, b};
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexColor(value);

    const hexWithHash = value.startsWith('#') ? value : `#${value}`;

    const rgb = hexToRgb(hexWithHash);

    if(rgb) {
      setRgbColor(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
      setError('');
      document.body.style.backgroundColor = hexWithHash;
    } else {
      setError('Ошибка! Некорректный HEX-код')
    }
  }

  useEffect(() => {
    document.body.style.backgroundColor = hexColor;
    document.body.style.transition = 'background-color 0.3s ease';
  }, [])

  return (
    <>
      <div className='app'>
          <div className='container'>
            <div className='converter'>
              <label htmlFor='hexInput'>HEX цвет:</label>
              <input 
                type='text'
                id='hexInput'
                value={hexColor}
                onChange={handleColorChange}
                placeholder='#3495e'
                className={error ? 'error' : ''}
              />
            </div>
          
          <div className="result">
            <label>RGB представление:</label>
            <div className="rgb-value">
              {error ? <span className="error-message">{error}</span> : rgbColor}
            </div>
          </div>
          </div>
      </div>
    </>
  )
}

export default App
