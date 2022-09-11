const ThucDon = require("../models/ThucDon");
const ChiTietThucDon = require("../models/ChiTietThucDon");
class ThucDonController {
	// [GET] /ThucDon
	show(req, res) {
		ThucDon.find({})
			.populate({
				path: "thanh_phan",
				populate: {
					path: "thuc_pham",
				},
			})
			.lean()
			.then((ThucDons) => {
				res.json(ThucDons);
			})
			.catch((err) => {
				message: err;
			});
	}

	// [GET] /ThucDon/:id
	detail(req, res) {
		ThucDon.findById(req.params.id)
			.populate({
				path: "thanh_phan",
				populate: {
					path: "thuc_pham",
				},
			})
			.lean()
			.then((ThucDon) => {
				res.json(ThucDon);
			})
			.catch((err) => {
				message: err;
			});
	}

	// [POST] /ThucDon
	create(req, res) {
		const newData = new ThucDon(req.body);
		let promises = newData.thanh_phan.map((ThucDonDetail) => {
			return ChiTietThucDon.findById(ThucDonDetail)
				.populate({
					path: "thuc_pham",
				})
				.lean();
		});
		Promise.all(promises).then((ChiTietThucDons) => {
			let caloTotal = 0;
			ChiTietThucDons.forEach((item) => {
				let caloThucPham = (item.so_luong / 100) * item.thuc_pham.calo;
				caloTotal += caloThucPham;
			});
			newData.calo = caloTotal;
			newData
				.save()
				.then((data) => {
					res.json(data);
				})
				.catch((err) => {
					res.json({
						message: err,
					});
				});
		});
	}

	// [PUT] /ThucDon/:id
	update(req, res) {
		ThucDon.findByIdAndUpdate(req.params.id, req.body)
			.lean()
			.then((tk) => res.json(tk))
			.catch((err) => {
				res.json({
					message: err,
				});
			});
	}

	// [DELETE] /ThucDon/:id
	delete(req, res) {
		ThucDon.findByIdAndDelete(req.params.id)
			.lean()
			.then((dataDelete) => res.json(dataDelete))
			.catch((err) => {
				res.json({
					message: err,
				});
			});
	}
}

module.exports = new ThucDonController();
