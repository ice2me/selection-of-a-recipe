import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import './AddResipe.css'
import AddBlockInput from "./AddBloks/AddBloksInput";
import Resizer from 'react-image-file-resizer'
import AddBlokcTextarea from "./AddBloks/addBlokcTextarea";
import {useHttp} from "../../Hooks/http.hook";
import Spinner from "../Spinner/Spinner";


function AddRecipe({closeAddRecipeModal}) {
	const [ingredients, setIngredients] = useState([])
	const [recipeName, setRecipeName] = useState('')
	const [recipeTimeNumber, setRecipeTimeNumber] = useState('')
	const [descriptions, setDescriptions] = useState([])
	const [recipePhoto, setRecipePhoto] = useState(null)
	const {request, loading} = useHttp()


//Todo add new block ingredients-------------------
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
			time: `${recipeTimeNumber} мин`,
			photo: recipePhoto,
			ingredients: ingredients.filter(ingr => ingr.name !== '' && delete (ingr.testId)),
			steps: descriptions.filter(des => des.recipeDescription !== '' && delete (des.testId))
		}
		try {
			await request("http://localhost:5000/api/recipe/dish", "POST", payload);
		} catch (e) {
			throw e;
		}
		closeAddRecipeModal()
	}

//Todo Descriptions textarea---------------------------------------
	const descriptionChangeHandler = (id, name, value) => {
		const listIngredients = descriptions.map(item => {
			if (item.testId === id) {
				const updated = item
				updated[name] = value
				return updated
			}
			return item
		})
		setDescriptions(listIngredients)
	}
	const addNewTextarea = () => {
		setDescriptions(descriptions.concat([{testId: Date.now(), recipeDescription: ''}]))
	}
	const deleteTextarea = (id) => {
		setDescriptions(descriptions.filter(item => item.testId !== id))
	}
	useEffect(() => {
		setDescriptions(descriptions.concat([{testId: Date.now(), recipeDescription: ''}]))
	}, [setDescriptions])
//Todo value inputs ---------------------------------------
	const addNameValue = (e) => {
		e.preventDefault();
		setRecipeName(e.target.value);
	}
	const addTimeNumberValue = (e) => {
		e.preventDefault();
		setRecipeTimeNumber(e.target.value);
	}
	const addRecipePhoto = (e) => {
		e.preventDefault()
		const file = e.target.files[0]
		resizeFile(file)
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


//todo-------------useEffects---------------------------------------
	
	useEffect(() => {
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				closeAddRecipeModal()
			}
		})
	}, [closeAddRecipeModal])
//todo-------------Return---------------------------------------
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
			{loading ? <Spinner /> :
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
					<label htmlFor="time-recipe"> Время приготовления: *
						<input
							type="number"
							placeholder="Время приготовления:"
							className="inputName"
							name="time"
							id="time-recipe"
							value={recipeTimeNumber}
							onChange={addTimeNumberValue}
							title={'Время приготовления рецепта в минутах'}
							min="5"
							max="180"
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
						key={ingredient.testId || index}
						id={ingredient.testId || index}
						onDeleteHandler={deleteHandler}
						onAddNewIngredient={addNewIngredientsHandler}
						valueIngridients={ingredients}
						onChangeHandler={ingredientsChangeHandler}
						isAddVisible={ingredients.length - 1 === index}
						isDelete={ingredients.length > 1}
					/>)}
					<label
						htmlFor="steps"
						className="mt-3"
					>
						пошаговое приготовление
						{descriptions.map((des, index) => <AddBlokcTextarea
							key={des.testId || index}
							id={des.testId || index}
							descriptions={descriptions}
							descriptionChangeHandler={descriptionChangeHandler}
							addNewTextarea={addNewTextarea}
							deleteTextarea={deleteTextarea}
							isAddVisibleTextarea={descriptions.length - 1 === index}
							isDeleteTextarea={descriptions.length > 1}
						/>)}
					</label>
					<p className="pb-2">
						* обязательное поле для заполнения
					</p>
					{
						(recipeName && recipePhoto && ingredients && descriptions) ?
							<Button
								style={{backgroundColor: 'rgba(237,174,1, 1)', border: 'none'}}
								type="button"
								onClick={submitHandler}
								title={'Отправить рецепт'}
								className="sendButton"
							>
								Отправить &#10004;
							</Button>
							:
							<Button
								style={{backgroundColor: 'rgba(142,104,89, 1)', border: 'none'}}
								type="button"
								disabled={true}
								title={'Заполните все поля перед отправкой'}
								className="sendButton"
							>
								Отправить &#10008;
							</Button>
					}
				</form>
			}
		</div>
	)
}

export default AddRecipe;