import React from 'react'; 
import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { useTheme } from '../../hooks/useTheme'
import './Recipe.css'


export default function Recipe() {
  const { id } = useParams()
  const {data: recipe, isPending, error}= useFetch('http://localhost:5001/recipes/' + id)
  const {mode} = useTheme()
  return (
    <div className={`recipe ${mode}`}>
    {isPending && <p className="loading">Loading...</p>}
    {error && <p className="error">{error}</p>}
    {recipe && 
      <>
        <h2>{recipe.title}</h2>
        <p>{recipe.cookingTime} to make.</p>
        <ul>
          {recipe.ingredients.map(ingredient => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
        <p>{recipe.method}</p>
      </>}
    </div>
  )
}
