const {Router} = require("express");
const Recipe = require("../models/Recipe")


const router = Router();

router.get(
	// endpoint
	"/",
	async (req, res) => {
		try {
			const result = await Recipe.find({}, 'ingredients.name');
			const resultIngredientsList = [].concat(...result.map(recipe => recipe.ingredients.map(item => item.name.toLowerCase().trim())))
			const resultIngredientsListSort = [...new Set(resultIngredientsList.sort())]
			res.status(200).json(resultIngredientsListSort)
		} catch (e) {
			console.log(e.message)
			res.status(500).json("Server error occurred")
		}
	}
)


module.exports = router