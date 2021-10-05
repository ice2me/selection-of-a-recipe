import React, {useState} from 'react';
import './App.css';
import InputEnter from "../components/InputEnter";
import Onload from "../components/Onload/Onload";

function App() {
	const [screenSaver, setScreenSaver] = useState(true)
	setTimeout(() => {
		setScreenSaver(false)
	}, 2000)
	return (
		<div className="App">
			{
				screenSaver ?
					<Onload />
					:
					<>
						<h1>
							Рецепты по ингредиентам
						</h1>
						<InputEnter />
						<p className="pt-3 copyright">copyright PepperNode © 2021 version 0.5</p>
					</>
			}
		</div>
	)
}

export default App;