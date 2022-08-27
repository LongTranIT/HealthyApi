const ChatDinhDuong = require("../models/ChatDinhDuong");
class ChatDinhDuongController {
	// [GET] /ChatDinhDuong
	show(req, res) {
		ChatDinhDuong.find({})
			.lean()
			.then((ChatDinhDuongs) => res.json(ChatDinhDuongs))
			.catch((err) => {
				message: err;
			});
	}

	// [GET] /ChatDinhDuong/:id
	detail(req, res) {
		ChatDinhDuong.findById(req.params.id)
			.lean()
			.then((ChatDinhDuong) => res.json(ChatDinhDuong))
			.catch((err) => {
				message: err;
			});
	}

	// [POST] /ChatDinhDuong
	create(req, res) {
		const newData = new ChatDinhDuong(req.body);
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

	// [PUT] /ChatDinhDuong/:id
	update(req, res) {
		ChatDinhDuong.findByIdAndUpdate(req.params.id, req.body)
			.lean()
			.then((tk) => res.json(tk))
			.catch((err) => {
				res.json({
					message: err,
				});
			});
	}

	// [DELETE] /ChatDinhDuong/:id
	delete(req, res) {
		ChatDinhDuong.findByIdAndDelete(req.params.id)
			.lean()
			.then((dataDelete) => res.json(dataDelete))
			.catch((err) => {
				res.json({
					message: err,
				});
			});
	}
}

module.exports = new ChatDinhDuongController();
