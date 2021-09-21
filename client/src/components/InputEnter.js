import {useEffect, useState} from 'react';
import {Button, InputGroup} from 'react-bootstrap';
import ShowFullVariant from "./ShowFullVariant";
import ShowPartlyVariant from "./ShowPartlyVariant";
import Tags from './Tags'
import AddRecipe from "./AddRecipe/AddRecipe";
import axios from "axios";
import Onload from "../components/Onload/Onload";


function InputEnter() {
	const [inpIngredient, setInpIngredient] = useState([])
	const [optionList, setOptionList] = useState([]);
	const [dishFull, setDishFull] = useState([]);
	const [dishPartly, setDishPartly] = useState([]);
	const [products, setProducts] = useState([])
	const [addRecipeModal, setAddRecipeModal] = useState(false)
	const [loading, setLoading] = useState(true)
	
	// 	// const productsResponse = await axios.get('https://selection-recipe.herokuapp.com/api/recipe/dish')
	// 	const productsResponse = await axios.get('http://localhost:5000/api/recipe/dish')
	
	const setInpIngredientList = (item) => {
		setInpIngredient(item)
	}
//Todo submit-----------------------------------------------------
	const submitHandler = (e) => {
		let objIdList = [];
		let partialObjList = [];
		e.preventDefault();
		setInpIngredient(inpIngredient)
		
		products.forEach((product) => {
			const ingredientFlatList = product.ingredients.map((ingredient) =>
				ingredient.name.toLowerCase()
			);
			if (compareArrays(ingredientFlatList, inpIngredient)) {
				objIdList.push(product);
			} else if (
				inpIngredient.every((r) => ingredientFlatList.includes(r))
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
	const deleteRecipeHandlerFull = (e, id) => {
		e.preventDefault();
		setDishFull(dishFull.filter((item) => item._id !== id));
	};
//Todo Delete function -------------
	const deleteRecipeHandlerPartly = (e, id) => {
		e.preventDefault();
		setDishPartly(dishPartly.filter((item) => item._id !== id));
	};
	
	const cleanDish = () => {
		setDishFull([])
		setDishPartly([]);
	}
	
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
		axios.get('http://localhost:5000/api/recipe/dish').then(res => {
			setProducts(res.data)
		})
		setLoading(false)
	}, [])
	
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
	}, [inpIngredient]);
	
	if (loading) return <Onload/>

//Todo -----------------------JSX-------------------------------
	return (
		<div className='form'>
			<InputGroup className='inputGroup'>
				<Tags
					optionList={optionList}
					setInpIngredientList={setInpIngredientList}
					submitHandler={submitHandler}
					dishPartly={dishPartly}
					dishFull={dishFull}
				/>
				<Button
					className='mt-1 w-100'
					style={{backgroundColor: 'rgba(237,174,1, 1)', border: 'none'}}
					type='submit'
					onClick={submitHandler}
					disabled={inpIngredient.length === 0 || inpIngredient[0] === ''}
				>
					Поиск &#8634;
				</Button>
			</InputGroup>
			
			{addRecipeModal && <AddRecipe closeAddRecipeModal={closeAddRecipeModal}/>}
			{
				!(dishFull.length > 0 || dishPartly.length > 0 || inpIngredient.length > 0) &&
				<h1 className='text-center mt-5'>Вы не ввели ни одного ингредиента</h1>
			}
			<>
				{dishFull.length > 0 && (
					<ShowFullVariant
						productReciept={dishFull}
						deleteRecipeHandlerFull={deleteRecipeHandlerFull}
						inpValue={inpIngredient}
					/>
				)
				}
			</>
			<>
				{dishPartly.length > 0 && (
					<ShowPartlyVariant
						productReciept={dishPartly}
						deleteRecipeHandlerPartly={deleteRecipeHandlerPartly}
						inpValue={inpIngredient}
					/>
				)
				}
			</>
			{/*<div className='buttonAddPosition'>*/}
			{/*	<Button*/}
			{/*		style={{backgroundColor: 'rgba(237,174,1, 1)', border: 'none'}}*/}
			{/*		type='submit'*/}
			{/*		onClick={openAddRecipeModal}*/}
			{/*	>*/}
			{/*		Добавить рецепт*/}
			{/*	</Button>*/}
			{/*</div>*/}
			<div className='buttonCleanPosition'>
				<Button
					style={{backgroundColor: 'rgba(237,174,1, 1)', border: 'none'}}
					type='submit'
					onClick={cleanDish}
				>
					Очистить рецепты
				</Button>
			</div>
		</div>
	)
	
}

export default InputEnter;
