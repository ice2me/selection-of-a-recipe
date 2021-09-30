import React, {useState} from 'react';
import './App.css';
import logo from '../imgaes/logo.png'
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
							<span>
								<img
									src={logo}
									alt="logo"
									style={{width: '35px', margin: '0 10px 0 0'}}
								/>
							</span>
							Рецепты
							<span>
								<img
									src={logo}
									alt="logo"
									style={{width: '35px', margin: '0 0 0 10px'}}
								/>
							</span>
						</h1>
						<InputEnter />
						<p className="pt-3 copyright">copyright © 2021 version 0.1.2</p>
					</>
			}
		</div>
	)
}

export default App;