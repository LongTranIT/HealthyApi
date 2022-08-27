const ThongKe = require("../models/ThongKe");
class ThongKeController {
	// [GET] /ThongKe
	show(req, res) {
		ThongKe.find({})
			.populate([
				{
					path: "thuc_don",
					populate: {
						path: "thanh_phan",
						populate: {
							path: "thuc_pham",
						},
					},
				},
				{
					path: "bai_tap",
					populate: {
						path: "chi_tiet_bai_tap",
						populate: {
							path: "dong_tac",
						},
					},
				},
			])
			.lean()
			.then((ThongKes) => res.json(ThongKes))
			.catch((err) => {
				message: err;
			});
	}

	// [GET] /ThongKe/:id
	detail(req, res) {
		ThongKe.findById(req.params.id)
			.populate([
				{
					path: "thuc_don",
					populate: {
						path: "thanh_phan",
						populate: {
							path: "thuc_pham",
						},
					},
				},
				{
					path: "bai_tap",
					populate: {
						path: "chi_tiet_bai_tap",
						populate: {
							path: "dong_tac",
						},
					},
				},
			])
			.lean()
			.then((ThongKe) => res.json(ThongKe))
			.catch((err) => {
				message: err;
			});
	}

	// [POST] /ThongKe
	create(req, res) {
		const newData = new ThongKe(req.body);
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

	// [PUT] /ThongKe/:id
	update(req, res) {
		ThongKe.findByIdAndUpdate(req.params.id, req.body)
			.lean()
			.then((tk) => res.json(tk))
			.catch((err) => {
				res.json({
					message: err,
				});
			});
	}

	// [DELETE] /ThongKe/:id
	delete(req, res) {
		ThongKe.findByIdAndDelete(req.params.id)
			.lean()
			.then((dataDelete) => res.json(dataDelete))
			.catch((err) => {
				res.json({
					message: err,
				});
			});
	}
}

module.exports = new ThongKeController();
