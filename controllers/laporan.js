import Pegawai from "../models/Pegawai.js"
import Attendence from "../models/Attendence.js"

export const getLaporan = async (req, res) => {
	try {
		const idCard = req.params.id
		const getAttendence = await Attendence.findOne({idPegawai: idCard})

		if(!getAttendence) {
			res.status(404).json({
				status: 404,
				message: "ID Card tidak ditemukan"
			})
		}

		const getPegawai = await Pegawai.findOne({idCard: idCard})

		const allData = {
			pegawai: getPegawai,
			attendence: getAttendence
		}
		
		const perMonth = {
			cuti: allData.attendence.cuti,
			noCuti: allData.attendence.noCuti,
			izin: allData.attendence.izin,
			noIzin: allData.attendence.noIzin,
			telat: allData.attendence.telat
		}

		const resData = {
			namaPegawai: allData.pegawai.name,
			hadir: allData.attendence.hadir,
			izin: allData.attendence.izin,
			noIzin: allData.attendence.noIzin,
			cuti: allData.attendence.cuti,
			noCuti: allData.attendence.noCuti,
			telat: allData.attendence.telat,
			perMonth
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
