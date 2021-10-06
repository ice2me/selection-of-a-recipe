import React, {useEffect, useRef, useState} from 'react';
import ReactTags from 'react-tag-autocomplete'
import './Tags.css'

function Tags({
				  optionList,
				  setInpIngredientList,
				  rebutTags
			  }) {
	const [tags, setTags] = useState([])
	const [suggestions, setSuggestions] = useState([])
	const reactTags = useRef()
	
	const onDelete = (i) => {
		const tagsNew = tags.slice(0)
		tagsNew.splice(i, 1)
		setTags(tagsNew)
	}
	const onAddition = (tag) => {
		const tagsNew = tags.concat(tag)
		setTags(tagsNew)
	}
	
	useEffect(() => {
		if (optionList && optionList.length > 0) {
			setSuggestions(
				optionList.map(item => {
					return {id: Date.now(), name: item}
				})
			)
		}
	}, [optionList])
	
	useEffect(() => {
		setInpIngredientList(tags.map(it => it.name.toLowerCase()))
	}, [tags])
	
	useEffect(() => {
		rebutTags = setTags([])
	}, [rebutTags])
	
	return (
		<>
			<ReactTags
				className="datalist"
				ref={reactTags}
				tags={tags}
				suggestions={suggestions}
				onDelete={onDelete}
				onAddition={onAddition}
				minQueryLength={1}
				placeholderText="Введите ингредиенты"
			/>
		</>
	);
}

export default Tags;
