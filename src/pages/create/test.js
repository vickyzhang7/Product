import React, { useEffect, useState, useRef } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import './Create.css';

export default function Create() {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  const navigate = useNavigate();
  const { postData, data } = useFetch('http://localhost:5001/recipes', 'POST');

  const handleSubmit = (e) => {
    e.preventDefault();
    postData({ title, ingredients, method, cookingTime: cookingTime + ' minutes' });
  };

  const AddIngredient = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();
    if (ing && !ingredients.includes(ing)) {
      setIngredients([...ingredients, ing]);
    }
    setNewIngredient('');
    ingredientInput.current.focus();
  };

  useEffect(() => {
    if (data) {
      navigate('/');
    }
  }, [data, navigate]);

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
            onChange={(e) => setTitle(e.target.value)}
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
            <button onClick={AddIngredient} className="btn">Add</button>
          </div>
        </label>
        <p>Current ingredients: {ingredients.map((ingredient, index) => <em key={index}>{ingredient}, </em>)}</p>
        <label>
          <span>Method:</span>
          <textarea
            required
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />
        </label>
        <label>
          <span>Cooking Time:</span>
          <input
            type='number'
            required
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
          />
        </label>
        <button className='btn'>Submit</button>
      </form>
    </div>
  );
}
