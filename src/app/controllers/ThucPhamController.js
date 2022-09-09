const ThucPham = require("../models/ThucPham");
class ThucPhamController {
	// [GET] /ThucPham
	show(req, res) {
		ThucPham.find({})
			.lean()
			.then((ThucPhams) => res.json(ThucPhams))
			.catch((err) => {
				message: err;
			});
	}

	// [GET] /ThucPham/:id
	detail(req, res) {
		ThucPham.findById(req.params.id)
			.lean()
			.then((ThucPham) => res.json(ThucPham))
			.catch((err) => {
				message: err;
			});
	}

	// [POST] /ThucPham
	create(req, res) {
		const newData = new ThucPham(req.body);
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

	// [PUT] /ThucPham/:id
	update(req, res) {
		ThucPham.findByIdAndUpdate(req.params.id, req.body)
			.lean()
			.then((tk) => res.json(tk))
			.catch((err) => {
				res.json({
					message: err,
				});
			});
	}

	// [DELETE] /ThucPham/:id
	delete(req, res) {
		ThucPham.findByIdAndDelete(req.params.id)
			.lean()
			.then((dataDelete) => res.json(dataDelete))
			.catch((err) => {
				res.json({
					message: err,
				});
			});
	}
}

module.exports = new ThucPhamController();
