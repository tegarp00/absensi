import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import pegawaiRoute from "./routes/pegawai.js"

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

app.use(express.json())


app.use("/api/absensi",pegawaiRoute)


app.listen(process.env.PORT, () => {
	connect()
	console.log("Backend konek!")
})
