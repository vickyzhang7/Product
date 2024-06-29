import React from 'react';
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import trashcan from '../assets/trashcan.svg'
// styles
import './RecipeList.css'
import { projectFirestore } from '../firebase/config';

export default function RecipeList({ recipes }) {
  const {mode} = useTheme()
  const handleclick = (id) => {
    const confirm = window.confirm('Are you sure you want to delete this recipe?')
    if (confirm) {
      projectFirestore.collection('recipes').doc(id).delete().then(() => {
        console.log('Document successfully deleted!')
      }).catch((error) => {
        console.error('Error removing document: ', error)
      })
    }
  }
  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          <img src={trashcan} className='delete' onClick={() => handleclick(recipe.id)} alt='delete'/>
        </div>
      ))}
    </div>
  )
}