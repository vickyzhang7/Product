import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';
import './Search.css';
import RecipeList from '../../components/RecipeList';

export default function Search() {
  const location = useLocation();
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const search = urlParams.get('q');
    setSearchTerm(search ? search : '');

    if (search) {
      projectFirestore.collection('recipes').get()
        .then(snapshot => {
          if (snapshot.empty) {
            setError('No recipes found');
            setIsPending(false);
          } else {
            const results = [];
            snapshot.docs.forEach(doc => {
              results.push({ id: doc.id, ...doc.data() });
            });
            const searchLower = search.toLowerCase();
            const filtered = results.filter(recipe =>
              recipe.title.toLowerCase().includes(searchLower)
            );
            setFilteredRecipes(filtered);
            setIsPending(false);
          }
        })
        .catch(err => {
          setError(err.message);
          setIsPending(false);
        });
    } else {
      setFilteredRecipes([]);
      setIsPending(false);
    }
  }, [location.search]);

  

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
