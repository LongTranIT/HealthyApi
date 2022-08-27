const ThucDon = require("../models/ThucDon");
class ThucDonController {
	// [GET] /ThucDon
	show(req, res) {
		ThucDon.find({})
			.lean()
			.then((ThucDons) => res.json(ThucDons))
			.catch((err) => {
				message: err;
			});
	}

	// [GET] /ThucDon/:id
	detail(req, res) {
		ThucDon.findById(req.params.id)
			.lean()
			.then((ThucDon) => res.json(ThucDon))
			.catch((err) => {
				message: err;
			});
	}

	// [POST] /ThucDon
	create(req, res) {
		const newData = new ThucDon(req.body);
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
