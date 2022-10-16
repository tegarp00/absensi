import Pegawai from "../models/Pegawai.js"
//import Attendence from "../models/Attendence.js"

export const getLaporan = async (req, res) => {
	try {
		const cekId = req.params.id
		const getPegawai = await Pegawai.findOne({idCard: cekId})
		if(!getPegawai) {
			res.status(404).json({
				status: 404,
				message: "IdCard tidak ditemukan"
			})
		}

		const filterPegawai = await Pegawai.aggregate([
			{
			   $lookup:
				 {
				   from: "kehadirans",
				   localField: "idCard",
				   foreignField: "idPegawai",
				   as: "kehadiran",
				 }
			},
				{$project: {__v: 0}}
			]);
		
		const filobj = filterPegawai.filter(idcard=> idcard.idCard == cekId)
		const pegawaiFilter = filobj[0]

		let perMonth = pegawaiFilter.kehadiran[0]
		if(!perMonth) {
			perMonth = []
		}

		const perMonths = {
				cuti: perMonth.cuti,
				noCuti: perMonth.noCuti,
				izin: perMonth.izin,
				noIzin: perMonth.noIzin
			}

		const resData = {
			pegawai: pegawaiFilter,
			perMonth: perMonths
		}
		
		res.status(200).json({
			status: 200,
			message: "Berhasil mendapatkan Data pegawai",
			data: resData
		})
	}catch(error) {
		console.log(error)
	}
}


export const getAllLaporan = async (req, res) => {
	const getAllLaporan = await Pegawai.find()
	if(!getAllLaporan) {
		res.status(404).json({
			status: 404,
			message: "data laporan pegawai tidak ada"
		})
	}

	
		const filterPegawai = await Pegawai.aggregate([
			{
			   $lookup:
				 {
				   from: "kehadirans",
				   localField: "idCard",
				   foreignField: "idPegawai",
				   as: "kehadiran",
				 }
			},
				{$project: {__v: 0}}
			]);
		

		let perMonth = filterPegawai[0].kehadiran[0]
		if(!perMonth) {
			perMonth = []
		}

		const perMonths = {
				cuti: perMonth.cuti,
				noCuti: perMonth.noCuti,
				izin: perMonth.izin,
				noIzin: perMonth.noIzin
			}

		const allDat = []
		const lopp = filterPegawai
		for(let l of lopp) {
			allDat.push(l)
			let month = l.kehadiran
			allDat.push({perMonth: month})
		}

	/**
		const resData = {
			name: allDat[0].name,
			idCard: allDat[0].idCard,
			job: allDat[0].job,
			role: allDat[0].role,
			kehadiran: {
				cuti: allDat[0].kehadiran[0].cuti,
				noCuti: allDat[0].kehadiran[0].noCuti,
				izin: allDat[0].kehadiran[0].izin,
				noIzin: allDat[0].kehadiran[0].noIzin,
				telat: allDat[0].kehadiran[0].telat,
				hadir: allDat[0].kehadiran[0].hadir,
				description: allDat[0].kehadiran[0].description
			}

		} */

		res.status(200).json({
		status: 200,
		message: "Berhasil mendapatkan semua data laporan pegawai",
		data: allDat
	})
}
