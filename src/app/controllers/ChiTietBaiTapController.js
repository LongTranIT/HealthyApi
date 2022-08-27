const ChiTietBaiTap = require("../models/ChiTietBaiTap");
class ChiTietBaiTapController {
	// [GET] /ChiTietBaiTap
	show(req, res) {
		ChiTietBaiTap.find({})
			.lean()
			.then((ChiTietBaiTaps) => res.json(ChiTietBaiTaps))
			.catch((err) => {
				message: err;
			});
	}

	// [GET] /ChiTietBaiTap/:id
	detail(req, res) {
		ChiTietBaiTap.findById(req.params.id)
			.lean()
			.then((ChiTietBaiTap) => res.json(ChiTietBaiTap))
			.catch((err) => {
				message: err;
			});
	}

	// [POST] /ChiTietBaiTap
	create(req, res) {
		const newData = new ChiTietBaiTap(req.body);
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

	// [PUT] /ChiTietBaiTap/:id
	update(req, res) {
		ChiTietBaiTap.findByIdAndUpdate(req.params.id, req.body)
			.lean()
			.then((tk) => res.json(tk))
			.catch((err) => {
				res.json({
					message: err,
				});
			});
	}

	// [DELETE] /ChiTietBaiTap/:id
	delete(req, res) {
		ChiTietBaiTap.findByIdAndDelete(req.params.id)
			.lean()
			.then((dataDelete) => res.json(dataDelete))
			.catch((err) => {
				res.json({
					message: err,
				});
			});
	}
}

module.exports = new ChiTietBaiTapController();
