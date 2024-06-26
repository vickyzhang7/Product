import React from 'react'; 
import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import './Recipe.css'


export default function Recipe() {
  const { id } = useParams()
  const {data: recipe, isPending, error}= useFetch('http://localhost:5001/recipes/' + id)
  return (
    <div>
    {isPending && <p className="loading">Loading...</p>}
    {error && <p className="error">{error}</p>}
    {recipe && 
      <div className="recipe">
        <h2>{recipe.title}</h2>
        <p>{recipe.cookingTime} to make.</p>
        <ul>
          {recipe.ingredients.map(ingredient => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
        <p>{recipe.method}</p>
      </div>}
    </div>
  )
}
