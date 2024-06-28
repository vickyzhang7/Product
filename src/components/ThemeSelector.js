import React from 'react'
import { useTheme } from '../hooks/useTheme'
import './ThemeSelector.css'

const themes = ['#58249c', '#249c6b', '#b70233']

export default function ThemeSelector() {
    const {changeColor} = useTheme()

  return (
    <div>
        <div className="theme-selector">
            <div className='theme-buttons'>
                {themes.map((color) => (
                    <div key={color} onClick={() => changeColor(color)} style={{background: color}}></div>
                ))}
            </div>
        </div>
    </div>
  )
}