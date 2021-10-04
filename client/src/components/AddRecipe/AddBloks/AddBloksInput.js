import React, {useState} from 'react';
import {Button} from "react-bootstrap";

function AddBlockInput({
						   onDeleteHandler,
						   id,
						   valueIngridients,
						   onChangeHandler,
						   onAddNewIngredient,
						   isAddVisible,
						   isDelete
					   }) {
	
	const [disabled, setDisabled] = useState(false)
	const [ingredient, setIngredient] = useState({name: '', quantity: ''})
	
	const onInputChangeHandler = (name, value) => {
		setIngredient({...ingredient, ...{[name]: value}})
	}
	const disabledInput = () => {
		const currentRecipe = valueIngridients.find(obj => obj.testId === id)
		if (currentRecipe.name !== '' && currentRecipe.quantity !== '') {
			onAddNewIngredient()
			setDisabled(true)
		}
	}
	
	return (
		<div className="blockInp">
			<div>
				<label htmlFor="name-ingridient">название ингредиента
					<input
						type="text"
						autoFocus
						placeholder="название ингредиента"
						autoComplete="false"
						className="inputName"
						name="name"
						id="name-ingridient"
						value={valueIngridients.name}
						onChange={(e) => {
							onInputChangeHandler(e.target.name, e.target.value)
							onChangeHandler(id, e.target.name, e.target.value)
						}}
						disabled={disabled}
						onKeyPress={e => {
							if (e.key === 'Enter') {
								disabledInput()
							}
						}}
					/>
				</label>
				<label htmlFor="name-quantity">грамовки
					<input
						type="text"
						placeholder="грамовка ингредиента"
						autoComplete="false"
						className="inputName"
						name="quantity"
						id="name-quantity"
						value={valueIngridients.quantity}
						onChange={
							(e) => {
								onChangeHandler(id, e.target.name, e.target.value)
								onInputChangeHandler(e.target.name, e.target.value)
							}}
						disabled={disabled}
						onKeyPress={e => {
							if (e.key === 'Enter') {
								disabledInput()
							}
						}}
					/>
				</label>
			</div>
			{isAddVisible &&
			<Button
				style={{backgroundColor: 'rgba(233,79,8, 1)', border: 'none'}}
				type="button"
				className="ml-3"
				disabled={(ingredient.name === '' || ingredient.quantity === '')}
				onClick={disabledInput}
			>
				+
			</Button>
			}
			{
				isDelete && <Button
					style={{backgroundColor: 'rgba(233,79,8, 1)', border: 'none'}}
					type="button"
					className="ml-3"
					onClick={() => onDeleteHandler(id)}
				>
					-
				</Button>
			}
		</div>
	)
}

export default AddBlockInput;