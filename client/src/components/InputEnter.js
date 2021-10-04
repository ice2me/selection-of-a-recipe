import React, {useEffect, useState} from 'react';
import {Button, InputGroup} from 'react-bootstrap';
import {useHttp} from "../Hooks/http.hook";
import ShowFullVariant from "./ShowFullVariant";
import ShowPartlyVariant from "./ShowPartlyVariant";
import Tags from './Tags';
import AddRecipe from "./AddRecipe/AddRecipe";
import Spinner from "./Spinner/Spinner";
import logo from "../imgaes/logo.png";

function InputEnter() {
	const [inpIngredient, setInpIngredient] = useState([])
	const [optionList, setOptionList] = useState([]);
	const [dishFull, setDishFull] = useState([]);
	const [dishPartly, setDishPartly] = useState([]);
	const [addRecipeModal, setAddRecipeModal] = useState(false)
	const {request, loading} = useHttp()
	
	const setInpIngredientList = (item) => {
		setInpIngredient(item)
	}
//Todo submit-----------------------------------------------------
	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const fetched = await request("https://selection-recipe.herokuapp.com/api/search", "POST", inpIngredient);
			setDishPartly(fetched.partial)
			setDishFull(fetched.full);
		} catch (e) {
			throw e;
		}
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
	const tags = async () => {
		try {
			const fetched = await request("https://selection-recipe.herokuapp.com/api/tags/",);
			setOptionList(fetched);
		} catch (e) {
			throw e;
		}
	}
	
	useEffect(tags
		, []
	)


//Todo -----------------------JSX-------------------------------
	return (
		<div className="form">
			<InputGroup>
				<Tags
					className="inputGroup position-relative"
					optionList={optionList}
					setInpIngredientList={setInpIngredientList}
					submitHandler={submitHandler}
					dishPartly={dishPartly}
					dishFull={dishFull}
				/>
				<Button
					style={{backgroundColor: 'rgba(237,174,1, 1)', border: 'none'}}
					type="submit"
					onClick={submitHandler}
					disabled={inpIngredient.length === 0 || inpIngredient[0] === ''}
				>
					<svg
						width="19"
						height="18"
						viewBox="0 0 19 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M8.5 15C12.6421 15 16 11.866 16 8C16 4.13401 12.6421 1 8.5 1C4.35786 1 1 4.13401 1 8C1 11.866 4.35786 15 8.5 15Z"
							stroke="#214e51"
							strokeWidth="1.99583"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M17.4888 17L13.9873 13.1331"
							stroke="#214e51"
							strokeWidth="1.99583"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</Button>
			</InputGroup>
			{
				addRecipeModal && <AddRecipe closeAddRecipeModal={closeAddRecipeModal} />
			}
			{
				!(inpIngredient.length > 5 || dishFull.length > 0 || dishPartly.length > 0)
					?
					<div className="enterIngredients">
						<h2 className="text-center mt-5">
							Введите ингредиенты &#11014;
						</h2>
						<img
							className="firstScreenLogo"
							src={logo}
							alt="logo"
							style={{width: '235px', margin: '10px auto 0'}}
						/>
					</div>
					:
					<h2 className="text-center mt-5"></h2>
			}
			{
				loading ?
					<Spinner />
					:
					<>
						<>
							{dishFull.length > 0 && (
								<ShowFullVariant
									productReciept={dishFull}
									deleteRecipeHandlerFull={deleteRecipeHandlerFull}
									inpValue={inpIngredient}
								/>
							)}
						</>
						<>
							{dishPartly.length > 0 && (
								<ShowPartlyVariant
									productReciept={dishPartly}
									deleteRecipeHandlerPartly={deleteRecipeHandlerPartly}
									inpValue={inpIngredient}
								/>
							)}
						</>
					</>
			}
			{/*<div className="buttonAddPosition">*/}
			{/*	<Button*/}
			{/*		style={{backgroundColor: 'rgba(237,174,1, 1)', border: 'none'}}*/}
			{/*		type="submit"*/}
			{/*		onClick={openAddRecipeModal}*/}
			{/*	>*/}
			{/*		Добавить рецепт*/}
			{/*	</Button>*/}
			{/*</div>*/}
			{
				(dishPartly.length > 0 || dishFull.length > 0)
				&&
				(<div className="buttonCleanPosition">
					<Button
						style={{backgroundColor: 'rgba(237,174,1, 1)', border: 'none'}}
						type="submit"
						onClick={cleanDish}
					>
						Скрыть рецепты
					</Button>
				</div>)
			}
		</div>
	)
	
}

export default InputEnter;
