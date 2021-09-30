import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import './AddResipe.css'
import AddBlockInput from "./AddBloksInput/AddBloksInput";
import axios from "axios";
import Resizer from 'react-image-file-resizer'


function AddRecipe({closeAddRecipeModal}) {
	const [ingredients, setIngredients] = useState([])
	const [recipeName, setRecipeName] = useState('')
	const [description, setDescription] = useState('')
	const [recipePhoto, setRecipePhoto] = useState(null)


//Todo add new block ingredients-------------------
	const
		addRecipeHandler = (e) => {
			e.preventDefault()
			setIngredients(ingredients.concat())
		}
	
	const ingredientsChangeHandler = (id, name, value) => {
		const listIngredients = ingredients.map(item => {
			if (item.testId === id) {
				const updated = item
				updated[name] = value
				return updated
			}
			return item
		})
		setIngredients(listIngredients)
		
	}
	
	const addNewIngredientsHandler = () => {
		setIngredients(ingredients.concat([{testId: Date.now(), name: '', quantity: ''}]))
	}
	
	
	const deleteHandler = (id) => {
		setIngredients(ingredients.filter(ingredient => ingredient.testId !== id))
	}
	
	useEffect(() => {
		setIngredients(ingredients.concat([{testId: Date.now(), name: '', quantity: ''}]))
	}, [setIngredients])
//todo---------------------------------------------------
	
	const submitHandler = async (e) => {
		e.preventDefault()
		const payload = {
			name: recipeName,
			photo: recipePhoto,
			ingredients: ingredients.filter(ingr => ingr.name !== '' && delete (ingr.testId)),
			recipe: description
		}
		try {
			await axios.post('https://selection-recipe.herokuapp.com/api/recipe/dish', payload);
		} catch (e) {
			console.error(e.message)
		}
		closeAddRecipeModal()
	}

//Todo value inputs ---------------------------------------
	const addNameValue = (e) => {
		e.preventDefault();
		setRecipeName(e.target.value);
	}
	
	const addRecipeDescriptionValue = (e) => {
		e.preventDefault();
		setDescription(e.target.value);
	}
	
	const resizeFile = (file) => {
		Resizer.imageFileResizer(
			file,
			250,
			200,
			"JPEG",
			80,
			0,
			(uri) => {
				setRecipePhoto(uri)
			},
			"base64",
			250,
			200
		)
	}
	
	
	const addRecipePhoto = (e) => {
		e.preventDefault()
		const file = e.target.files[0]
		resizeFile(file)
	}

//todo----------------------------------------------------
	useEffect(() => {
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				closeAddRecipeModal()
			}
		})
	}, [closeAddRecipeModal])
	
	return (
		<div className="add-recipe">
			<h1>
				Добавить рецепт
			</h1>
			<Button
				variant="secondary"
				type="submit"
				className="closeButtonModal"
				onClick={closeAddRecipeModal}
			>
				Закрыть &#10008;
			</Button>
			<form autoComplete="new-password">
				<label htmlFor="name-recipe">Название рецепта *
					<input
						type="text"
						placeholder="Название рецепта"
						className="inputName"
						name="name"
						id="name-recipe"
						value={recipeName}
						onChange={addNameValue}
						title={'Введите название рецепта'}
						autoFocus
					/>
				
				</label>
				{!recipePhoto
					?
					<label
						htmlFor="name-recipe"
					>
						Добавить фото *
						<input
							type="file"
							className="blockInp ml-1"
							name="nameFile"
							id="name-file"
							onChange={addRecipePhoto}
							title={'Добавить фото рецепта'}
						/>
					</label>
					:
					<>
						{
							recipePhoto &&
							<img
								src={recipePhoto}
								alt="recipe"
								style={{width: '220px', marginLeft: '15px'}}
							/>
						}
					</>
				}
				
				{ingredients.map((ingredient, index) => <AddBlockInput
					key={ingredient.testId}
					id={ingredient.testId}
					onDeleteHandler={deleteHandler}
					onAddNewIngredient={addNewIngredientsHandler}
					valueIngridients={ingredients}
					onChangeHandler={ingredientsChangeHandler}
					addRecipeHandler={addRecipeHandler}
					isAddVisible={ingredients.length - 1 === index}
					isDelete={ingredients.length > 1}
				/>)}
				<label
					htmlFor="steps"
					className="mt-3"
				>пошаговое приготовление
					<textarea
						id="steps"
						name="recipeDescription"
						cols="30"
						rows="10"
						className="textareaName"
						placeholder="Шаг №1"
						value={description}
						onChange={addRecipeDescriptionValue}
						title={'Напишите описание рецепта'}
					/>
					<Button
						style={{backgroundColor: 'rgba(237,174,1, 1)', border: 'none'}}
						type="button"
						onClick={submitHandler}
						title={'Отправить рецепт'}
					>
						Отправить &#10004;
					</Button>
				</label>
				<p className="pb-2">
					* обязательное поле для заполнения
				</p>
				{
					(recipeName && recipePhoto && ingredients && description) ?
						<Button
							style={{backgroundColor: 'rgba(237,174,1, 1)', border: 'none'}}
							type="button"
							onClick={submitHandler}
							title={'Отправить рецепт'}
						>
							Отправить &#10004;
						</Button>
						:
						<Button
							style={{backgroundColor: 'rgba(142,104,89, 1)', border: 'none'}}
							type="button"
							disabled={true}
							title={'Заполните все поля перед отправкой'}
						>
							Отправить &#10008;
						</Button>
				}
			
			</form>
		</div>
	)
}

export default AddRecipe;