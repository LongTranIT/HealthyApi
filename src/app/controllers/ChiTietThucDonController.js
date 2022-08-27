const ChiTietThucDon = require("../models/ChiTietThucDon");
class ChiTietThucDonController {
	// [GET] /ChiTietThucDon
	show(req, res) {
		ChiTietThucDon.find({})
			.lean()
			.then((ChiTietThucDons) => res.json(ChiTietThucDons))
			.catch((err) => {
				message: err;
			});
	}

	// [GET] /ChiTietThucDon/:id
	detail(req, res) {
		ChiTietThucDon.findById(req.params.id)
			.lean()
			.then((ChiTietThucDon) => res.json(ChiTietThucDon))
			.catch((err) => {
				message: err;
			});
	}

	// [POST] /ChiTietThucDon
	create(req, res) {
		const newData = new ChiTietThucDon(req.body);
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

	// [PUT] /ChiTietThucDon/:id
	update(req, res) {
		ChiTietThucDon.findByIdAndUpdate(req.params.id, req.body)
			.lean()
			.then((tk) => res.json(tk))
			.catch((err) => {
				res.json({
					message: err,
				});
			});
	}

	// [DELETE] /ChiTietThucDon/:id
	delete(req, res) {
		ChiTietThucDon.findByIdAndDelete(req.params.id)
			.lean()
			.then((dataDelete) => res.json(dataDelete))
			.catch((err) => {
				res.json({
					message: err,
				});
			});
	}
}

module.exports = new ChiTietThucDonController();
