const {Router} = require("express");
const Recipe = require("../models/Recipe")
const {compareArrays} = require("../utility/compareArrays");

const router = Router();

router.post(
	// endpoint
	"/",
	async (req, res) => {
		try {
			const result = await Recipe.find();
			const criteria = req.body
			console.log(criteria)
			let objIdList = [];
			let partialObjList = [];
			result.forEach((product) => {
					const ingredientFlatList = product.ingredients.map((ingredient) =>
						ingredient.name.toLowerCase()
					);
					if (compareArrays(ingredientFlatList, criteria)) {
						objIdList.push(product);
					} else if (
						criteria.every((r) => ingredientFlatList.includes(r))
					) {
						partialObjList.push(product);
					}
				}
			)
			
			res.status(200).json({partial: partialObjList, full: objIdList})
		} catch
			(e) {
			console.log(e.message)
			res.status(500).json("Server error occurred")
		}
	}
)
module.exports = router