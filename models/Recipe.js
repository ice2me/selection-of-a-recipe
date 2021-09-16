const {Schema, model} = require("mongoose");

const schema = new Schema({
	name: {type: String, required: true},
	photo: {type: String, required: false},
	ingredients: [
		{
			name: {type: String, required: true},
			quantity: {type: String, required: true},
		}
	],
	recipe: {type: String, required: true},

});

module.exports = model("Recipe", schema);