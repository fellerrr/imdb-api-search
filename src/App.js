import Spinner from 'react-bootstrap/Spinner';
import './App.css';
import Movie from "./Components/Movie";
import {useEffect, useState} from "react";
import NotFound from "./Components/NotFound";
const movieAPI = "https://imdb-api.com/en/API/SearchMovie/k_sj2i3z6z/"
const movieTop = 'https://imdb-api.com/en/API/Top250Movies/k_sj2i3z6z'

function App() {
  const onHandleTerm = (e)=> {
      setTerm(e.target.value)
  }

  const [movie, setMovie] = useState([])
  const [term, setTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)


  useEffect(()=>{
      fetch(movieTop)
          .then(res=> res.json())
          .then(res => {
              setMovie(res.items)
              setLoading(false)
          })
  },[])

  const onHandleSearch = (e)=> {
      e.preventDefault()
      setLoading(true)
      fetch(movieAPI + term)
          .then(res=> res.json())
          .then(res => {
              res.results.length !== 0
                  ? setMovie(res.results)
                  : setError(true)
              setLoading(false)
          })
      setTerm('')
  }

    const onNotFound = ()=> {
        setLoading(true)
        fetch(movieTop)
            .then(res=> res.json())
            .then(res => {
                setMovie(res.items)
                setError(false)
                setLoading(false)
            })
    }

  return (
      <>
          <header>
              <form onSubmit={onHandleSearch}>
                  <input type="text" placeholder='Search...' value={term} onChange={onHandleTerm}/>
              </form>
          </header>
          <div className="movies">
              {error
                  ? <NotFound onNotFound={onNotFound}/>
                  : (loading
                    ? <Spinner animation="border" variant="light" style={{width:'5rem', height:'5rem',
                      position:'absolute', top:'50%', left:'50%'}}/>
                    : movie.map(item=><Movie key={item.id} {...item}/>))

              }
          </div>
      </>
  );
}

export default App;
