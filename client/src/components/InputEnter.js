import React, {useCallback, useEffect, useState} from 'react';
import {Button, InputGroup} from 'react-bootstrap';
import ShowFullVariant from "./ShowFullVariant";
import ShowPartlyVariant from "./ShowPartlyVariant";
import AddRecipe from "./AddRecipe/AddRecipe";
import axios from "axios";

function InputEnter() {
	const [inputValue, setInputValue] = useState([]);
	const [validationInput, setValidationInput] = useState([]);
	const [optionList, setOptionList] = useState([]);
	const [dishFull, setDishFull] = useState([]);
	const [dishPartly, setDishPartly] = useState([]);
	const [products, setProducts] = useState([])
	const [addRecipeModal, setAddRecipeModal] = useState(false)

	const fetchRecipes = useCallback(async () => {
		const productsResponse = await axios.get('https://selection-recipe.herokuapp.com/api/recipe/dish')
		// const productsResponse = await axios.get('http://localhost:5000/api/recipe/dish')
		setProducts(productsResponse.data)
	}, [])

//TODO input-----------------------------------------------------
	const inputHandler = (e) => {
		e.preventDefault();
		setInputValue(e.target.value)
	};

//Todo submit-----------------------------------------------------
	const submitHandler = (e) => {
		let objIdList = [];
		let partialObjList = [];
		e.preventDefault();
// validation after inputs value-----------------------------
		const words = inputValue.split(',').map((item) => item.trim());

		const validationList = words.map((word) => word.toLowerCase())
		setValidationInput(validationList)
		console.log(
			validationList
		)

		products.forEach((product) => {
			const ingredientFlatList = product.ingredients.map((ingredient) =>
				ingredient.name.toLowerCase()
			);

			console.log(ingredientFlatList)
			if (compareArrays(ingredientFlatList, validationList)) {
				objIdList.push(product);
			} else if (
				validationList.every((r) => ingredientFlatList.includes(r))
			) {
				partialObjList.push(product);
			}
		});

		setDishFull(objIdList);
		setDishPartly(partialObjList);

	};


//todo Function compare arrays ---------------------------------
	const compareArrays = (array1, array2) => {
		array1 = array1.sort()
		array2 = array2.sort()
		
		return (
			array1.length === array2.length &&
			array1.every((value, index) => value === array2[index])
		);
	};

//Todo Delete function -------------
	const deleteRecieptHandlerFull = (e, id) => {
		e.preventDefault();
		if (dishPartly.length < 2) {
			setInputValue([]);
		}
		setDishFull(dishFull.filter((item) => item._id !== id));
	};
//Todo Delete function -------------
	const deleteRecieptHandlerPartly = (e, id) => {
		e.preventDefault();
		if (dishPartly.length < 2) {
			setInputValue([]);
		}
		setDishPartly(dishPartly.filter((item) => item._id !== id));
	};

	//Todo open and close AddRecipe modal window ---------------------
	const openAddRecipeModal = (e) => {
		e.preventDefault()
		setAddRecipeModal(true)
	}
	const closeAddRecipeModal = () => {
		setAddRecipeModal(false)
	}


//TODO useEffects-----------------------------------------------
	useEffect(() => {
		fetchRecipes().then(res => console.warn(res))
	}, [fetchRecipes])

	useEffect(() => {
		const result = [];
		products.forEach((product) => {
			product.ingredients.map((ingredient) => {
				if (!ingredient.name) return ingredient.name;
				return result.push(
					ingredient.name[0].toUpperCase() + ingredient.name.slice(1)
				);
			});
		});
		setOptionList([...new Set(result.sort())]);
	}, [products]);

	useEffect(() => {
	}, [inputValue]);

	useEffect(() => {
	}, [validationInput]);
	//! -----------------------JSX-------------------------------
	return (
		<div className='form'>
			<InputGroup className='inputGroup'>
				<p className='p-2'>
					Название продуктов нужно вводить через " , " для корректного
					работы проложения
				</p>
				<input
					placeholder='Картошка, лук, ...'
					value={inputValue}
					list='variant'
					className='inputName'
					onChange={inputHandler}
					autoFocus
					onKeyPress={e => {
						if (e.key === 'Enter') {
							submitHandler(e)
							e.target.blur()
						}
					}}
				/>
				<datalist id='variant' className='datalist'>
					{optionList.map((item, index) => (
						<option value={item} key={index + item}>
							{item}
						</option>
					))}
				</datalist>

				<Button
					className='mt-3 w-100'
					variant='success'
					type='submit'
					onClick={submitHandler}
					disabled={inputValue.length === 0 || inputValue[0] === ''}>
					Поиск &#8634;
				</Button>
			</InputGroup>
			<div className='w-100 d-flex justify-content-end'>
				<Button
					className='mb-5'
					variant='success'
					type='submit'
					onClick={openAddRecipeModal}
				>
					Добавить рецепт
				</Button>
			</div>
			{addRecipeModal && <AddRecipe closeAddRecipeModal={closeAddRecipeModal}/>}
			{
				!(dishFull.length > 0 || dishPartly.length > 0) &&
				<h1 className='text-center mt-5'>Вы не ввели ни одного ингредиента</h1>
			}
			<>
				{dishFull.length > 0 && (
					<ShowFullVariant
						productReciept={dishFull}
						deleteRecieptHandlerFull={deleteRecieptHandlerFull}
						inpValue={validationInput}
					/>
				)
				}
			</>
			<>
				{dishPartly.length > 0 && (
					<ShowPartlyVariant
						productReciept={dishPartly}
						deleteRecieptHandlerPartly={deleteRecieptHandlerPartly}
						inpValue={validationInput}
					/>
				)
				}
			</>

		</div>
	)

}

export default InputEnter;
