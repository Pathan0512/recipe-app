import React, {useEffect, useState} from 'react'
import './App.css';
import Recipe from './recipe';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

const App = () => {
  const APP_ID= "f41fb91f";
  const APP_KEY = "57ee8ec16d2486c126d1488f80aa808b";
  const [recipes,setRecipes]=useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("paneer");

  useEffect(() => {
  getRecipes();
  } , [query])

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data=await response.json();
    console.log(data)
    setRecipes(data.hits);
  };

  //search button and form thing
  const updateSearch =  e => {
    setSearch(e.target.value);
  };
  const getSearch = e => 
  {
    e.preventDefault(); //loads same page..prevents from opening new or blank page
    setQuery(search);
    setSearch("");
  }

  console.log(recipes);

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" value={search} //search bar
        onChange={updateSearch}/>
        <button className="search-button" type="submit"> 
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe =>(
          <Recipe
             key={recipe.recipe.label}
             title={recipe.recipe.label}
             calories={recipe.recipe.calories}
             image={recipe.recipe.image}
             ingredients={recipe.recipe.ingredients}
             />
        )
          )}
      </div>
    </div>
  );
}

export default App;