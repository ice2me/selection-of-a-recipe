import React from 'react';
import './App.css';
import InputEnter from "../components/InputEnter";
import logo from '../imgaes/logo.png'

function App() {
	if (navigator.serviceWorker) {
		try {
			const reg = navigator.serviceWorker.register('../../sw.js')
			console.log('SW register success', reg)
		} catch (e) {
			console.log('SW register fail')
		}
		
	}
	return (
		<div className='App'>
			<h1>
				<span><img src={logo} alt="logo" style={{width: '35px', margin: '0 10px 0 0'}}/></span>
				Рецепты
				<span><img src={logo} alt="logo" style={{width: '35px', margin: '0 0 0 10px'}}/></span>
			</h1>
			<InputEnter/>
			<p className='pt-3 copyright'>copyright © 2021 version 0.1</p>
		</div>
	);
}

export default App;