import React from 'react'; 
import { useState } from 'react'
import './Create.css'



export default function Create() {
  const [title, setTitle] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [method, setMethod] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  // const [ingredients, setIngredients] = useState(['']) will have , in default value
  const [ingredients, setIngredients] = useState([])
  
  const AddIngredient = () => {
    if ( newIngredient && !ingredients.includes(newIngredient)){
      setIngredients([...ingredients, newIngredient])
      setNewIngredient('')
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const recipe = { title, cookingTime, method }
    console.log(recipe)
  }

  return (
    <div className='create'>
      <h2 className='page-title'>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
      <label>     
        <span>Recipe Title:</span>
          <input 
          type='text'
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}>
          </input>
      </label> 
      <label>
        <span>Ingredients:</span>
        <div className='ingredients'>
          <input 
          type='text'
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}/>
          <button onClick={AddIngredient} className="btn">Add</button>
        </div> 
      </label>
      <p>Current ingredients: {
          ingredients.map((ingredient, index) => (
            <em key={index}>{ingredient},</em>
          ))
        }</p>
      <label> 
      <span>Method:</span>
        <textarea
        required
        value={method}
        onChange={(e) => setMethod(e.target.value)}>
        </textarea>
      </label>
      <label> 
        <span>Cooking Time:</span>
        <input 
        type='text'
        required
        value={cookingTime}
        onChange={(e) => setCookingTime(e.target.value)}/>
      </label>
        <button className='btn'>Submit</button>
      </form>
    </div>
  )
}
