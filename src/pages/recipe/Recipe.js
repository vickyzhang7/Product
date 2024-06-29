import React, { useEffect } from 'react'; 
import { useState } from 'react';
import { useParams } from 'react-router-dom'
// import { useFetch } from '../../hooks/useFetch'
import { projectFirestore } from '../../firebase/config';
import { useTheme } from '../../hooks/useTheme'
import './Recipe.css'

export default function Recipe() {
  const { id } = useParams()
  // const {data: recipe, isPending, error}= useFetch('http://localhost:5001/recipes/' + id)
  const {mode} = useTheme()
  const [recipe, setRecipe] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    setIsPending(true)
    projectFirestore.collection('recipes').doc(id).get().then((doc) => {
      if (doc.exists) {
        setRecipe({...doc.data(), id: doc.id})
        setIsPending(false)
      } else {
        setError('No such document!')
        setIsPending(false)
      }
    }).catch((error) => {
      setError(error.message)
      setIsPending(false)
    }
    )
  }, [id])
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
