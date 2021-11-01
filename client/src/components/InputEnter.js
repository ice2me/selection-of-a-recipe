import React, {useEffect, useState} from 'react';
import {Button, InputGroup} from 'react-bootstrap';
import {useHttp} from "../Hooks/http.hook";
import ShowFullVariant from "./ShowFullVariant";
import ShowPartlyVariant from "./ShowPartlyVariant";
import Tags from './Tags';
import AddRecipe from "./AddRecipe/AddRecipe";
import Spinner from "./Spinner/Spinner";
import logo from '../imgaes/logo.png'

function InputEnter() {
	const [inpIngredient, setInpIngredient] = useState([])
	const [optionList, setOptionList] = useState([]);
	
	const [dishFull, setDishFull] = useState([]);
	const [dishPartly, setDishPartly] = useState([]);
	const [addRecipeModal, setAddRecipeModal] = useState(false)
	const [tags, setTags] = useState([])
	const [pushButton, setPushButton] = useState(false)
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
		setPushButton(true)
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
		setDishPartly([])
		setTags([])
		setPushButton(false)
	}

//Todo open and close AddRecipe modal window ---------------------
	const openAddRecipeModal = (e) => {
		e.preventDefault()
		setAddRecipeModal(true)
	}
	const closeAddRecipeModal = () => {
		setAddRecipeModal(false)
	}

//TODO useEffect-----------------------------------------------
	useEffect(() => {
		try {
			request("https://selection-recipe.herokuapp.com/api/tags/").then(res => {
				setOptionList(res)
			})
		} catch (e) {
			throw e;
		}
	}, [request])



//Todo -----------------------JSX-------------------------------
	return (
		<div className="form">
			<InputGroup>
				<Tags
					className="inputGroup position-relative"
					optionList={optionList}
					setInpIngredientList={setInpIngredientList}
					submitHandler={submitHandler}
					rebutTags={tags}
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
				((dishPartly.length > 0 || dishFull.length > 0) || inpIngredient.length >= 1)
					?
					((dishPartly.length < 1 && dishFull.length < 1) && inpIngredient.length > 0)
						?
						((dishPartly.length === 0 || dishFull.length === 0) && inpIngredient.length > 0 && pushButton === true)
							?
							<div
								style={{
									width: '100%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexDirection: 'column',
								}}
							>
								<h2 className="text-center mt-5">
									Совпадений не найдено, повторите попытку
								</h2>
								<Button
									style={{backgroundColor: 'rgba(237,174,1, 1)', border: 'none'}}
									type="submit"
									onClick={cleanDish}
								>
									Повторить &#8617;
								</Button>
							</div>
							:
							<h2 className="text-center mt-5"></h2>
						:
						<h2 className="text-center mt-5"></h2>
					:
					<div className="enterIngredients">
						<h2 className="text-center mt-5">
							Введите ингредиенты...
							<svg
								width="28"
								height="28"
								viewBox="0 0 18 18"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M3.31499 15.4342C3.10461 15.4339 2.90405 15.3452 2.76225 15.1897C2.61783 15.0356 2.54607 14.8271 2.565 14.6167L2.74875 12.5962L11.2372 4.11074L13.89 6.76274L5.40374 15.2475L3.38325 15.4312C3.36 15.4335 3.33674 15.4342 3.31499 15.4342ZM14.4195 6.23249L11.7675 3.58049L13.3582 1.98974C13.4989 1.84891 13.6898 1.76978 13.8889 1.76978C14.0879 1.76978 14.2788 1.84891 14.4195 1.98974L16.0102 3.58049C16.1511 3.72117 16.2302 3.91206 16.2302 4.11112C16.2302 4.31017 16.1511 4.50106 16.0102 4.64174L14.4202 6.23174L14.4195 6.23249Z"
									fill="#ffffff"
								/>
							</svg>
						</h2>
						<img
							className="firstScreenLogo"
							src={logo}
							alt="logo"
						/>
					</div>
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
			{/* <div className="buttonAddPosition">
				<Button
					style={{backgroundColor: 'rgba(237,174,1, 1)', border: 'none'}}
					type="submit"
					onClick={openAddRecipeModal}
				>
					Добавить рецепт
				</Button>
			</div> */}
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
