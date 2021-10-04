import React, {useState} from 'react';
import {Button} from "react-bootstrap";

const AddBlokcTextarea = ({
							  id,
							  descriptions,
							  descriptionChangeHandler,
							  addNewTextarea,
							  deleteTextarea,
							  isAddVisibleTextarea,
							  isDeleteTextarea
						  }) => {
	const [description = '', setDescription] = useState()
	const [disabled, setDisabled] = useState(false)
	
	const onTextareaChangeHandler = (content, value) => {
		const ser = setDescription({...description, ...{[content]: value}})
	}
	
	const disabledTextarea = () => {
		const currentTextarea = descriptions.find(obj => obj.testId === id)
		if (currentTextarea.recipeDescription !== '') {
			addNewTextarea()
			setDisabled(true)
		}
	}
	
	return (
		<div className="description">
			<>
			<textarea
				id={id}
				name="recipeDescription"
				cols="30"
				rows="10"
				className="textareaName"
				placeholder={`Шаг №${descriptions.length}`}
				title={'Напишите описание рецепта'}
				onChange={e => {
					descriptionChangeHandler(id, e.target.name, e.target.value)
					onTextareaChangeHandler(e.target.name, e.target.value)
				}}
				onKeyPress={e => {
					if (e.key === 'Enter') {
						addNewTextarea()
					}
				}}
				disabled={disabled}
			/>
			</>
			<div className="descriptionBtn">
				{
					isAddVisibleTextarea &&
					<Button
						style={{backgroundColor: 'rgba(233,79,8, 1)', border: 'none'}}
						type="button"
						className="ml-3"
						onClick={disabledTextarea}
						disabled={(description === '')}
					>
						+
					</Button>
				}
				{
					isDeleteTextarea &&
					<Button
						
						style={{backgroundColor: 'rgba(233,79,8, 1)', border: 'none'}}
						type="button"
						className="ml-3 descriptionBtnMinus"
						onClick={() => deleteTextarea(id)}
					>
						-
					</Button>
				}
			</div>
		</div>
	);
};

export default AddBlokcTextarea;