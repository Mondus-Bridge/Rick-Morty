import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Cards from "./components/cards/Cards";
import Filter from "./components/filters/Filter";
import Pagination from './components/pagination/Pagination';
import Search from './components/search/Search';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Episodes from './Pages/Episodes';
import Location from './Pages/Location';
import CardDetetails from './components/cards/CardDetetails';


function App () {
  return (
    <Router> 
      <div className="App">
        <Navbar/>
      </div>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:id" element={<CardDetetails/>}/>
        <Route path="/episodes" element={<Episodes/>}/>
        <Route path="/episodes/:id" element={<CardDetetails/>}/>
        <Route path="/location" element={<Location/>}/>
        <Route path="/location/:id" element={<CardDetetails/>}/>
      </Routes>
    </Router>
  )
}

const Home = () => {
  let [pageNumber, setPageNumber] = useState(1);
  let [search, setSearch] = useState("")
  let [fetchedData, updateFetchedData] = useState([]);
  let {info, results} = fetchedData;
  let [status, setStatus] = useState("");
  let [gender, setGender] = useState("");
  let [species, setSpecies] = useState("");


 
  let api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${status}&gender=${gender}&species=${species}`;

  useEffect(()=>{
    (async function(){
      let data = await fetch(api).then((res)=>res.json());
      updateFetchedData(data)
    })();
  },[api])

  return (
    <div className="App">
      <h1 className="text-center mb-4">Characters</h1>
      <Search setPageNumber={setPageNumber} setSearch={setSearch}/>

      <div className="container"> 
      <div className="row">
        <Filter 
            setStatus={setStatus} 
            setGender={setGender}
            setSpecies= {setSpecies}
            setPageNumber={setPageNumber}/>
        <div className="col-lg-8 col-12">
            <div className="row">
              <Cards page="/" results={results} />
            </div>
          </div>
      </div>
      
      </div>
      <Pagination 
          info={info}
          pageNumber={pageNumber} 
          setPageNumber={setPageNumber}/>
    </div>
  );
}

export default App;
