import React from 'react'; 
import { useFetch } from '../../hooks/useFetch'
import './Search.css'
import RecipeList from '../../components/RecipeList';


export default function Search() {
  const searchquery = window.location.search
  const urlParams = new URLSearchParams(searchquery)
  const search = urlParams.get('q')
  const url = `http://localhost:5001/recipes?q=${search}`
  const {data, isPending, error}= useFetch(url)
  return (
    <div>
    <h2 className='page-title'>Search Results "{search}"</h2>
    {isPending && <p className="loading">Loading...</p>}
    {error && <p className="error">{error}</p>}
    {data && <RecipeList recipes={data} />}
    </div>
  )
}