const NhomCo = require("../models/NhomCo");
class NhomCoController {
	// [GET] /NhomCo
	show(req, res) {
		NhomCo.find({})
			.populate('bai_tap')
			.lean()
			.then((NhomCos) => res.json(NhomCos))
			.catch((err) => {
				message: err;
			});
	}

	// [GET] /NhomCo/:id
	detail(req, res) {
		NhomCo.findById(req.params.id)
			.populate('bai_tap')
			.lean()
			.then((NhomCo) => res.json(NhomCo))
			.catch((err) => {
				message: err;
			});
	}

	// [POST] /NhomCo
	create(req, res) {
		const newData = new NhomCo(req.body);
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

	// [PUT] /NhomCo/:id
	update(req, res) {
		NhomCo.findByIdAndUpdate(req.params.id, req.body)
			.lean()
			.then((tk) => res.json(tk))
			.catch((err) => {
				res.json({
					message: err,
				});
			});
	}

	// [DELETE] /NhomCo/:id
	delete(req, res) {
		NhomCo.findByIdAndDelete(req.params.id)
			.lean()
			.then((dataDelete) => res.json(dataDelete))
			.catch((err) => {
				res.json({
					message: err,
				});
			});
	}
}

module.exports = new NhomCoController();
