import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import './Search.css';
import RecipeList from '../../components/RecipeList';

export default function Search() {
  const location = useLocation();
  const [searchUrl, setSearchUrl] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const search = urlParams.get('q');
    setSearchTerm(search ? search : '');
    setSearchUrl(`http://localhost:5001/recipes`);
  }, [location.search]);

  const { data, isPending, error } = useFetch(searchUrl);

  useEffect(() => {
    if (data && searchTerm) {
      const search = searchTerm.toLowerCase();
      const filtered = data.filter(recipe =>
        recipe.title.toLowerCase().includes(search)
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes([]);
    }
  }, [data, searchTerm]);

  return (
    <div>
      <h2 className='page-title'>Search Results "{searchTerm}"</h2>
      {isPending && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!isPending && !error && searchTerm && filteredRecipes.length === 0 && <p className='page-title'>No results found</p>}
      {!searchTerm && <p className='page-title'>Please enter a search term to find recipes.</p>}
      {filteredRecipes.length > 0 && <RecipeList recipes={filteredRecipes} />}
    </div>
  );
}
