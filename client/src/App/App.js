import React, {useState} from 'react';
import './App.css';
import InputEnter from "../components/InputEnter";
import Onload from "../components/Onload/Onload";


function App() {

	const [onload, setOnload] = useState(true);
	setTimeout(() => setOnload(false), 500);


	return (
		<div className='App'>
			<h1>
				Рецепты <span style={{color: 'red'}}>*demo</span>
			</h1>
			{onload ? <Onload/> : <InputEnter/>}
			<p className='pt-3'>copyright © 2021 version 0.1</p>
		</div>
	);
}

export default App;