import React from 'react'
import { useTheme } from '../hooks/useTheme'
import modeIcon from '../assets/mode-icon.svg'
import './ThemeSelector.css'

const themes = ['#58249c', '#249c6b', '#b70233']

export default function ThemeSelector() {
    const { changeColor, changeMode, mode } = useTheme()
    const toggle = () => {
        changeMode(mode === 'dark' ? 'light' : 'dark')
    }
    console.log(mode)

  return (
    <div>
        <div className="theme-selector">
        <div className='mode-toggle'>
            <img 
            src={modeIcon} 
            alt='mode icon' 
            onClick={toggle}
            style={{filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)'}}
            />
        </div>
        <div className='theme-buttons'>
            {themes.map((color) => (
                <div key={color} onClick={() => changeColor(color)} style={{background: color}}></div>
            ))}
         </div>
        
        </div>
    </div>
  )
}