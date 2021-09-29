import React from 'react';
import logo from "../../imgaes/logo.png";

export default function Onload() {
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column'
			}}
		>
			<>
				<h3>Выберите ингредиенты которые у вас есть и </h3>
				<img
					className="firstScreenLogo"
					src={logo}
					alt="logo"
					style={{width: '235px', margin: '10px auto 0'}}
				/>
				<h3>посмотрите что из них можно приготовить &#10155;</h3>
			</>
		</div>
	);
}
