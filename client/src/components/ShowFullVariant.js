import React from 'react';

function ShowFullVariant({
							 productReciept,
							 deleteRecieptHandlerFull,
							 inpValue
						 }) {
	return (
		<>
			<h1 className='prodName'>Полное совпадение</h1>
			{productReciept.map((prod) => (
				<div className='cardHover flex-column' key={prod._id}>
					<div className='cardBlock'>
						<div className='blockName pr-5'>
							<h2 className='mb-5'>
								<span>{prod.name}</span>
							</h2>
							<div className='imageShow'>
								<img src={prod.photo} alt={`recipe ${prod.name}`}/>
							</div>

						</div>
						<div className='blockIng'>
							<h3>Ингридиенты</h3>
							<ul>
								{prod.ingredients.map((item, index) => (
									<li key={index + item.name}>
										<ul className='d-flex align-items-center justify-content-between fw-bold border-bottom'>
											<li
												className={
													inpValue.some((inp) => {
														return (
															inp.toLowerCase() ===
															item.name.toLowerCase()
														);
													})
														? 'activeIngridients'
														: ''
												}>
												&#10004;
											</li>
											<li>{item.name}</li>
											<li>{item.quantity}</li>
										</ul>
									</li>
								))}
							</ul>
						</div>
					</div>
					<p>
						{prod.recipe
							.split(' ')
							.map((item, index) =>
								inpValue.join('').toLowerCase() ===
								item.toLowerCase() ? (
									<i key={index}>{item} </i>
								) : (
									<b key={index} className='fw-light'>{item} </b>
								)
							)}
					</p>
					<button
						type='submit'
						onClick={(e) => deleteRecieptHandlerFull(e, prod._id)}
						className='h-25 p-2 rounded btnClose mt-3'
						title='Закрыть рецепт'
					>
						&#10008;
					</button>
				</div>
			))}
		</>
	);
}

export default ShowFullVariant;
