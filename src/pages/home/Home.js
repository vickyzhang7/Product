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
    const unsub = projectFirestore.collection('recipes').onSnapshot((snap) => {
      let documents = []
      snap.forEach(doc => {
        documents.push({...doc.data(), id: doc.id})
      })
      setData(documents)
      setIsPending(false)
    }, (error) => {
      setError(error.message)
      setIsPending(false)
    })
    return () => unsub()
  },[])
  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}

    </div>
  )
}


