import React from 'react';

function ShowPartlyVariant({
							   productReciept,
							   deleteRecipeHandlerPartly,
							   inpValue
						   }) {
	return (
		<>
			<h1 className="prodName">Частичное совпадение </h1>
			<p><span>Рецептов найдено: {productReciept.length}</span></p>
			<p className="pt-1">
				<span>ингредиенты в большенстве блюд рассчитаны на 4 порчии</span>
			</p>
			{productReciept.map((prod) => (
				<div
					className="cardHover flex-column"
					key={prod._id}
				>
					<div className="cardBlock">
						<div className="blockName">
							<h2 className="mb-3">
								<span>{prod.name.toUpperCase()}</span>
							</h2>
							<p className="mb-3">
								<span> Время приготовления: {prod.time}</span>
							</p>
							<div className="imageShow">
								<img
									src={prod.photo}
									alt={`recipe ${prod.name}`}
								/>
							</div>
						</div>
						<div className="blockIng">
							<h3>Ингридиенты</h3>
							<ul>
								{prod.ingredients.map((item, index) => (
									<li key={index + item.name}>
										<ul className="d-flex align-items-center justify-content-between fw-bold border-bottom">
											<li className="d-flex align-items-center justify-content-start">
												<p
													className={
														inpValue &&
														inpValue.some((inp) => {
															return (
																inp.toLowerCase() ===
																item.name.toLowerCase()
															);
														})
															? 'activeIngridients'
															: ''
													}
												>
													&#10004;
												</p>
												{item.name.toLowerCase()}
											</li>
											<li>{item.quantity}</li>
										</ul>
									</li>
								))}
							</ul>
						</div>
					</div>
					<ul className="textBlok">
						<h3>
							Как приготовить {prod.name.toUpperCase()} &#11015;
						</h3>
						{prod.steps.map((step, index) => <li
								key={step._id + index}
								className="d-flex align-items-center justify-content-start"
							>
								<div>
									<i>Шаг {index + 1}</i>
									<p className="p-2">{step.recipeDescription}</p>
								</div>
							</li>
						)}
					</ul>
					
					<button
						type="submit"
						onClick={(e) => deleteRecipeHandlerPartly(e, prod._id)}
						className="p-2 btnClose"
						title="Закрыть рецепт"
					>
						&#10008;
					</button>
				</div>
			))}
		</>
	);
}

export default ShowPartlyVariant;
