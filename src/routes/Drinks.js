import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { drinksEndpoints, RECIPES_LIMIT } from '../components/helpers/endpoints';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PrincipalRecipeCard from '../components/PrincipalRecipeCard';
import Categories from '../components/Categories';
import './Drink.css';

function Drinks() {
  const { endpoint, setEndpoint } = useContext(RecipesContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEndpoint(drinksEndpoints.random);
  }, [setEndpoint]);

  useEffect(() => {
    const getData = async () => {
      if (endpoint !== '') {
        setLoading(true);
        try {
          const response = await fetch(endpoint);
          const results = await response.json();
          if (!results.drinks) {
            global.alert('Sorry, we haven\'t found any recipes for these filters.');
          } else {
            setData(results.drinks);
          }
          setLoading(false);
        } catch (error) {
          global.alert('Sorry, we haven\'t found any recipes for these filters.');
          setData([]);
          setLoading(false);
        }
      }
    };
    getData();
  }, [endpoint]);

  if (data.length === 1) {
    const [recipe] = data;
    return <Redirect to={ `/drinks/${recipe.idDrink}` } />;
  }

  return (
    <section className="drink-div">
      <div className="drink-header">
        <Header title="Drinks" searchIcon page="drinks" />
      </div>
      <div className="drink-categories">
        <Categories type="drinks" />
      </div>
      <div className="drink-cards">
        { loading && <p>Carregando...</p> }
        { !loading && data.length > 1 && (
          data.slice(0, RECIPES_LIMIT).map((recipe, index) => (
            <PrincipalRecipeCard
              key={ recipe.idDrink }
              type="Drink"
              recipe={ recipe }
              index={ index }
            />
          ))
        )}
      </div>
      <Footer />
    </section>
  );
}

export default Drinks;
