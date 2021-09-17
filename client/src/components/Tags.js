import {useState, useRef} from 'react';
import ReactTags from 'react-tag-autocomplete'
import './Tags.css'

function Tags({optionList}) {
	const [tags, setTags] = useState([
		{ id: 1, name: "Apples" },
		{ id: 2, name: "Pears" }
	])
	const [suggestions, setSuggestions] = useState([
		{ id: 3, name: "Bananas" },
		{ id: 4, name: "Mangos" },
		{ id: 5, name: "Lemons" },
		{ id: 6, name: "Apricots" }
	])
	const reactTags = useRef()



	const onDelete = (i) => {
		const tagsNew = tags.slice(0)
		tagsNew.splice(i, 1)
		setTags(tagsNew)
	}
	const onAddition = (tag) => {
		console.log(tag)
		const tagsNew = tags.concat(tag)
		setTags( tagsNew )
	}

	console.log(optionList)
	return (
		<>
			<ReactTags className='datalist'
				ref={reactTags}
				tags={tags}
				suggestions={suggestions}
				onDelete={onDelete}
				onAddition={onAddition}
				minQueryLength={1}
				placeholderText='Введите ингредиенты'
			/>
		</>
	);
}

export default Tags;
