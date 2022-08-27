const DongTac = require("../models/DongTac");
class DongTacController {
	// [GET] /DongTac
	show(req, res) {
		DongTac.find({})
			.lean()
			.then((DongTacs) => res.json(DongTacs))
			.catch((err) => {
				message: err;
			});
	}

	// [GET] /DongTac/:id
	detail(req, res) {
		DongTac.findById(req.params.id)
			.lean()
			.then((DongTac) => res.json(DongTac))
			.catch((err) => {
				message: err;
			});
	}

	// [POST] /DongTac
	create(req, res) {
		const newData = new DongTac(req.body);
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

	// [PUT] /DongTac/:id
	update(req, res) {
		DongTac.findByIdAndUpdate(req.params.id, req.body)
			.lean()
			.then((tk) => res.json(tk))
			.catch((err) => {
				res.json({
					message: err,
				});
			});
	}

	// [DELETE] /DongTac/:id
	delete(req, res) {
		DongTac.findByIdAndDelete(req.params.id)
			.lean()
			.then((dataDelete) => res.json(dataDelete))
			.catch((err) => {
				res.json({
					message: err,
				});
			});
	}
}

module.exports = new DongTacController();
