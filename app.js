const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors');

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api/recipe", require("./routes/recipe.route"));
app.use("/api/tags", require("./routes/tags.route"));
app.use("/api/search", require("./routes/search.router"));

console.log('process.env.NODE_ENV', process.env.NODE_ENV)
if (process.env.NODE_ENV.includes('prod')) {
	app.use("/", express.static(path.join(__dirname, "client", "build")));
	
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 5000

async function start() {
	try {
		await mongoose.connect(config.get("mongoUri"), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});
		app.listen(PORT, () =>
			console.log(`app has been started on ${PORT} port...`)
		);
	} catch (e) {
		console.log("Server error:", e.message);
		process.exit(1);
	}
}

start();
