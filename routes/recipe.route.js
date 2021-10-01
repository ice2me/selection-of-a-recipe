const {Router} = require("express");
const Recipe = require("../models/Recipe")


const router = Router();

router.post(
	"/dish",
	async (req, res) => {
		try {
			const {name, photo, ingredients, steps} = req.body;
			const dishRecipe = new Recipe({name, photo, ingredients, steps});
			await dishRecipe.save()
			res.status(201).json("Recipe has been added")
		} catch (e) {
			console.log(e.message)
			res.status(500).json("Server error occurred")
		}
	}
)
router.get(
	// endpoint
	"/dish",
	async (req, res) => {
		try {
			const result = await Recipe.find();
			res.status(200).json(result)
		} catch (e) {
			console.log(e.message)
			res.status(500).json("Server error occurred")
		}
	}
)


module.exports = router