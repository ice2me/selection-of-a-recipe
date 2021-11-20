import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import InputEnter from '../components/InputEnter';
import Onload from '../components/Onload/Onload';
import { useHttp } from '../Hooks/http.hook';

function App() {
	const [recipeLength, setRecipeLength] = useState([]);
	const { request, loading } = useHttp();

	const allRecipes = useMemo(() => {
		try {
			request(
				'https://selection-recipe.herokuapp.com/api/recipe/dish'
			).then((res) => {
				setRecipeLength(res.length);
			});
		} catch (e) {
			throw e;
		}
	}, [request]);
	return (
		<div className='App' onLoadStart={allRecipes}>
			{loading ? (
				<Onload />
			) : (
				<>
					<h1>Рецепты по ингредиентам</h1>
					<p style={{ paddingBottom: 10 }}>
						(в базе {recipeLength} рецепта)
					</p>
					<InputEnter />
					<p className='pt-3 copyright'>
						copyright © 2021 version 1.4.10
					</p>
				</>
			)}
		</div>
	);
}

export default App;
