import { useState } from 'react';
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

    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    return { r, g, b };
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexColor(value);

    const hexPattern = /^#?[0-9A-Fa-f]{6}$/;
    const hexWithHash = value.startsWith('#') ? value : `#${value}`;
    
    if (hexPattern.test(hexWithHash)) {
      const rgb = hexToRgb(hexWithHash);
      if (rgb) {
        setRgbColor(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
        setError('');
      }
    } else {
      if (value.length > 0 && value.length < 7) {
        setError('Неполный HEX-код');
      } else if (value.length >= 7) {
        setError('Некорректный HEX-код');
      } else {
        setError('');
      }
    }
  }

  return (
    <div 
      className="app"
      style={{ 
        backgroundColor: hexColor,
        transition: 'background-color 0.3s ease'
      }}
    >
      <div className="container">
        
        <div className="converter">
          <label htmlFor="hexInput">
            HEX цвет:
          </label>
          <input 
            type="text"
            id="hexInput"
            value={hexColor}
            onChange={handleColorChange}
            placeholder="#34495e"
            maxLength={7}
            className={error ? 'error' : ''}
          />
          {error && <div className="error-hint">{error}</div>}
        </div>
      
        <div className="result">
          <label>RGB представление:</label>
          <div className="rgb-value">
            {error ? '—' : rgbColor}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App