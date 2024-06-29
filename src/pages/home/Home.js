import React, { useEffect } from 'react';
import { projectFirestore } from '../../firebase/config';
//import { useFetch } from '../../hooks/useFetch'
import RecipeList from '../../components/RecipeList'
import { useState } from 'react';
import './Home.css'

export default function Home() {
  //const {data, isPending, error}= useFetch('http://localhost:5001/recipes')
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    setIsPending(true)
    projectFirestore.collection('recipes').get().then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        setIsPending(false)
      }else{
        let recipes = []
        snapshot.forEach(doc => {
          recipes.push({...doc.data(), id: doc.id})
        });
        setData(recipes)
        setIsPending(false)
      }
    }).catch((error) => {
      setError(error.message)
      setIsPending(false)
    })

  },[])
  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}

    </div>
  )
}


