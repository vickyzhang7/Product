import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Searchbar.css'

export default function Searchbar() {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        // navigate(`/search/${search}`)
        navigate(`/search?q=${search}`)
    }

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <input
        id='search' 
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}


