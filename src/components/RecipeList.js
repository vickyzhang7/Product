import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import trashcan from '../assets/trashcan.svg';
// styles
import './RecipeList.css';
import { projectFirestore } from '../firebase/config';

export default function RecipeList({ recipes }) {
  const { mode } = useTheme();
  const [editing, setEditing] = useState(null);
  const [updatedRecipe, setUpdatedRecipe] = useState({ title: '', cookingTime: '', method: '', ingredients: [] });
  const [newIngredient, setNewIngredient] = useState('');
  const [deleting, setDeleting] = useState(null); // State for tracking which recipe is being deleted
  const ingredientInput = useRef(null);

  const handleDelete = (id) => {
    projectFirestore.collection('recipes').doc(id).delete().then(() => {
      console.log('Document successfully deleted!');
      setDeleting(null);
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });
  };

  const handleEdit = (recipe) => {
    setEditing(recipe.id);
    setUpdatedRecipe({ 
      title: recipe.title, 
      cookingTime: recipe.cookingTime.replace(' minutes', ''), 
      method: recipe.method,
      ingredients: recipe.ingredients 
    });
  };

  const handleUpdate = (id) => {
    projectFirestore.collection('recipes').doc(id).update({
      ...updatedRecipe,
      cookingTime: updatedRecipe.cookingTime + ' minutes'
    }).then(() => {
      console.log('Document successfully updated!');
      setEditing(null);
    }).catch((error) => {
      console.error('Error updating document: ', error);
    });
  };

  const addIngredient = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();
    if (ing && !updatedRecipe.ingredients.includes(ing)) {
      setUpdatedRecipe({ 
        ...updatedRecipe, 
        ingredients: [...updatedRecipe.ingredients, ing] 
      });
    }
    setNewIngredient('');
    ingredientInput.current.focus();
  };

  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          <img src={trashcan} className='delete' onClick={() => setDeleting(recipe.id)} alt='delete' />
          <button onClick={() => handleEdit(recipe)} className="btn">Edit</button>
        </div>
      ))}

      {editing && (
        <div className={`modal ${mode}`}>
          <div className="modal-content">
            <label>
              <span>Recipe Title:</span>
              <input 
                type="text" 
                value={updatedRecipe.title} 
                onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, title: e.target.value })} 
                placeholder="Title"
              />
            </label>
            <label>
              <span>Ingredients:</span>
              <div className='ingredients'>
                <input 
                  type='text'
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  ref={ingredientInput}
                />
                <button onClick={addIngredient} className="btn">Add</button>
              </div>
            </label>
            <p className='current-ingredients'>
              Current ingredients: {
                updatedRecipe.ingredients.map((ingredient, index) => (
                  <em key={index}>{ingredient},</em>
                ))
              }
            </p>
            <label>
              <span>Method:</span>
              <textarea
                value={updatedRecipe.method} 
                onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, method: e.target.value })} 
                placeholder="Method"
              />
            </label>
            <label>
              <span>Cooking Time:</span>
              <input 
                type="number" 
                value={updatedRecipe.cookingTime} 
                onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, cookingTime: e.target.value })} 
                placeholder="Cooking Time"
              />
            </label>
            <div className='btn-group'>
            <button onClick={() => handleUpdate(editing)} >Save</button>
            <button onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {deleting && (
        <div className={`modal ${mode}`}>
          <div className="modal-content">
            <p>Are you sure you want to delete this recipe?</p>
            <button onClick={() => handleDelete(deleting)} className="btn">Yes, Delete</button>
            <button onClick={() => setDeleting(null)} className="btn">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
