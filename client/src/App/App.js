import React, {useState} from 'react';
import './App.css';
import logo from '../imgaes/logo.png'
import InputEnter from "../components/InputEnter";


function App() {
	const [screenSaver, setScreenSaver] = useState(true)
	setTimeout(() => {
		setScreenSaver(false)
	}, 2500)
	return (
		<div className='App'>
			{
				screenSaver ?
					<div
						style={{
							width: '100%',
							height: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							flexDirection: 'column'
						}}>
						<>
							<h3>Выберите ингредиенты которые у вас есть и </h3>
							< img className='firstScreenLogo' src={logo} alt="logo"
								  style={{width: '235px', margin: '10px auto 0'}}/>
							<h3>посмотрите что из них можно приготовить &#10155;</h3>
						</>
					</div>
					:
					<>
						<h1>
							<span><img src={logo} alt="logo" style={{width: '35px', margin: '0 10px 0 0'}}/></span>
							Рецепты
							<span><img src={logo} alt="logo" style={{width: '35px', margin: '0 0 0 10px'}}/></span>
						</h1>
						<InputEnter/>
						<p className='pt-3 copyright'>copyright © 2021 version 0.1</p>
					</>
				
			}
		</div>
	)
}

export default App;