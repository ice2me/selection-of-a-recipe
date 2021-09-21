import React from 'react';
import './App.css';
import InputEnter from "../components/InputEnter";

function App() {
	return (
		<div className='App'>
			<h1>
				Рецепты <span style={{color: 'red'}}>*demo</span>
			</h1>
			<InputEnter/>
			<p className='pt-3 copyright'>copyright © 2021 version 0.1</p>
		</div>
	);
}

export default App;