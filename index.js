import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

const app = express()
dotenv.config()

const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO)
		console.log("database konek")
	} catch(error) {
		throw error
	}
};

mongoose.connection.on("disconnect", () => {
	console.log("MongoDB disconnected!")
})


app.listen(8000, () => {
	connect()
	console.log("Backend konek!")
})
