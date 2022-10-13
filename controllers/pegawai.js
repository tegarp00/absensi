import Pegawai from "../models/Pegawai.js"

export const createPegawai = async (req, res) => {

	const newPegawai = new Pegawai(req.body)
	try {
		const savePegawai = await newPegawai.save()
		const data = savePegawai;
		res.status(200).json({
			status: 200,
			message: "Berhasil menambahkan data pegawai",
			data: savePegawai 
		});
	}catch(error) {
		console.log(error)
	}
}

export const updatePegawai = async (req, res) => {
	try {
		const updatedPegawai = await Pegawai.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true }
		)
		res.status(200).json({
			status: 200,
			message: "Data pegawai Berhasil diperbaharui",
			data: updatedPegawai
		})
	}catch(error){
		console.log(error)
	}
}


export const deletePegawai = async (req, res) => {
	try {
		const cekId = await Pegawai.findByIdAndDelete(req.params.id)
		if(!cekId) {
			res.status(400).json({
				status: 400,
				message: "Data mungkin tidak ada / sudah dihapus"
			})
		}

		await Pegawai.findByIdAndDelete(req.params.id)
		res.status(200).json({
			status: 200,
			message: "Data pegawai Berhasil di hapus"
		})
	}catch(error) {
		console.log(error)
	}
}

export const getPegawai = async (req, res) => {
	try {
		const idCard = req.params.id
		const getPegawai = await Pegawai.findOne({idCard: idCard})

		res.status(200).json({
			status: 200,
			message: "Berhasil mendapatkan Data pegawai",
			data: getPegawai
		})
	}catch(error) {
		console.log(error)
	}
}


export const getAllPegawai = async (req, res) => {
	try {
		const allPegawai = await Pegawai.find();
		res.status(200).json({
			status: 200,
			message: "Berhasil mendapatkan Data-data Pegawai",
			data: allPegawai
		})
	}catch(error) {
		console.log(error)
	}
}
