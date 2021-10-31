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
				flexDirection: 'column',
				padding: '0 15px',
				textAlign: 'center'
			}}
		>
			<>
				<h3>Выберите ингредиенты которые у вас есть и </h3>
				<img
					className="firstScreenLogo rotatinAnimationLoad"
					src={logo}
					alt="logo"
				/>
				<h3>посмотрите что из них можно приготовить
					<svg
						width="38"
						height="18"
						viewBox="0 0 48 28"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M3.47861 24.5679L19.2775 10.6097L26.8577 18.5743L44.3318 3.54004L43.7854 12.5346L44.3318 3.54004H34.3447"
							stroke="white"
							strokeWidth="5.36316"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				
				</h3>
			</>
		</div>
	);
}
