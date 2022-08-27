const BaiTap = require("../models/BaiTap");
class BaiTapController {
	// [GET] /BaiTap
	show(req, res) {
		BaiTap.find({})
			.populate({
				path: "chi_tiet_bai_tap",
				populate: {
					path: "dong_tac",
				},
			})
			.lean()
			.then((BaiTaps) => res.json(BaiTaps))
			.catch((err) => {
				message: err;
			});
	}

	// [GET] /BaiTap/:id
	detail(req, res) {
		BaiTap.findById(req.params.id)
			.populate({
				path: "chi_tiet_bai_tap",
				populate: {
					path: "dong_tac",
				},
			})
			.lean()
			.then((BaiTap) => res.json(BaiTap))
			.catch((err) => {
				message: err;
			});
	}

	// [POST] /BaiTap
	create(req, res) {
		const newData = new BaiTap(req.body);
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

	// [PUT] /BaiTap/:id
	update(req, res) {
		BaiTap.findByIdAndUpdate(req.params.id, req.body)
			.lean()
			.then((tk) => res.json(tk))
			.catch((err) => {
				res.json({
					message: err,
				});
			});
	}

	// [DELETE] /BaiTap/:id
	delete(req, res) {
		BaiTap.findByIdAndDelete(req.params.id)
			.lean()
			.then((dataDelete) => res.json(dataDelete))
			.catch((err) => {
				res.json({
					message: err,
				});
			});
	}
}

module.exports = new BaiTapController();
