import React, { useEffect, useState } from "react";
import axios from "axios";
import Recipe from "./Recipe";
import Fade from "react-reveal/Fade";
import "./App.scss";
// import { TransitionGroup } from "react-transition-group";

const App = () => {
  const APP_ID = "1d6bbdf6";
  const APP_KEY = "01cf6d66689bbfc5b6dc19d2aab56a17";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(" ");
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const res = await axios(
          `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=12`
        );
        setRecipes(res.data.hits);
        setCount(res.data.count);
        console.log(res.data.hits);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };
    fetchData();
  }, [query]);

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <p className="siteTitle">Food Recipe Finder</p>
      <div className="searchbox">
        <form className="search-form" onSubmit={getSearch}>
          <input
            type="text"
            placeholder="Find a recipe"
            className="search-bar"
            value={search}
            onChange={updateSearch}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
      </div>
      {isError && (
        <div style={{ textAlign: "center" }}>
          <h1>Something went wrong...</h1>
        </div>
      )}
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <h3>Searching for {`${query}`} recipes. </h3>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h3>
            Found {count.toLocaleString("en")} {`${query}`} {"  "}recipes.
          </h3>
        </div>
      )}
      <div className="recipes">
        {recipes.map(recipe => (
          <Fade bottom key={recipe.recipe.image}>
            <Recipe
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              source={recipe.recipe.source}
              healthLabels={recipe.recipe.healthLabels}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          </Fade>
        ))}
      </div>
    </div>
  );
};

export default App;
