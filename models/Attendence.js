import mongoose from "mongoose";
const { Schema } = mongoose;


const KehadiranSchema = new mongoose.Schema({
	idPegawai: {
		type: String,
		required: true
	},
	hadir: {
		type: String
	},
	izin: {
		type: String
	},
	cuti: {
		type: String
	},
	description: {
		type: String
	}

})

export default mongoose.model("Kehadiran", KehadiranSchema)
