const LoaiThucDon = require("../models/LoaiThucDon");
const mongoose = require('mongoose');
class LoaiThucDonController {
	// [GET] /LoaiThucDon
	show(req, res) {
		LoaiThucDon.find({$or:[{nguoi_xem: req.query.idNguoiDung},{nguoi_xem: 'all'}]})
			.populate("thuc_don")
			.lean()
			.then((LoaiThucDons) => res.json(LoaiThucDons))
			.catch((err) => {
				message: err;
			});
	}

	// [GET] /LoaiThucDon/:id
	detail(req, res) {
		LoaiThucDon.findById(req.params.id)
			.populate("thuc_don")
			.lean()
			.then((LoaiThucDon) => res.json(LoaiThucDon))
			.catch((err) => {
				message: err;
			});
	}

	// [POST] /LoaiThucDon
	create(req, res) {
		const newData = new LoaiThucDon(req.body);
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
	}

	// [PUT] /LoaiThucDon/:id
	update(req, res) {
		const { idThucDon, idNguoiDung } = req.body;
		LoaiThucDon.findOne({nguoi_xem: idNguoiDung}).then((loaiThucDons) => {
			loaiThucDons.thuc_don.push(idThucDon);
			LoaiThucDon.findOneAndUpdate({nguoi_xem: idNguoiDung}, loaiThucDons)
				.lean()
				.then((tk) => res.json(tk))
				.catch((err) => {
					res.json({
						message: err,
					});
				});
		});
	}

	// [DELETE] /LoaiThucDon/:id
	delete(req, res) {
		LoaiThucDon.findByIdAndDelete(req.params.id)
			.lean()
			.then((dataDelete) => res.json(dataDelete))
			.catch((err) => {
				res.json({
					message: err,
				});
			});
	}
}

module.exports = new LoaiThucDonController();
