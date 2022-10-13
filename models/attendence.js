import mongoose from "mongoose";
const { Schema } = mongoose;


const KehadiranSchema = new mongoose.Schema({
	namePegawai: {
		type: String,
		required: true
	}
	hadir: {
		type: String,
		required: true
	},
	izin: {
		type: String,
		required: true
	},
	cuti: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	}

})

export default mongoose.model("Kehadiran", KehadiranSchema)
