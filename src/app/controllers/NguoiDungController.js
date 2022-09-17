const NguoiDung = require("../models/NguoiDung");
class NguoiDungController {
	// [GET] /NguoiDung
	show(req, res) {
		NguoiDung.find({})
			.populate("tai_khoan")
			.populate({
				path: "thong_ke",
				populate: [
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
				],
			})
			.lean()
			.then((NguoiDungs) => res.json(NguoiDungs))
			.catch((err) => {
				message: err;
			});
	}

	// [GET] /NguoiDung/:id
	detail(req, res) {
		NguoiDung.findById(req.params.id)
			.populate("tai_khoan")
			.populate({
				path: "thong_ke",
				populate: [
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
				],
			})
			.lean()
			.then((NguoiDung) => res.json(NguoiDung))
			.catch((err) => {
				message: err;
			});
	}

	// [POST] /NguoiDung
	create(req, res) {
		const newData = new NguoiDung(req.body);
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

	// [PUT] /NguoiDung/:id
	update(req, res) {
		const { idThongKe } = req.body;
		NguoiDung.findById(req.params.id).then((nd)=>{
			nd.thong_ke.push(idThongKe);
			NguoiDung.findByIdAndUpdate(req.params.id, nd)
			.lean()
			.then((tk) => res.json(tk))
			.catch((err) => {
				res.json({
					message: err,
				});
			});
		})
	}
	// [Patch] /NguoiDung/:id
	updatePatch(req, res) {
		const updateObject=req.body
		NguoiDung.findByIdAndUpdate(req.params.id,  { $set: updateObject })
			.lean()
			.then((tk) => res.json(tk))
			.catch((err) => {
				res.json({
					message: err,
				});
			});
	}

	// [DELETE] /NguoiDung/:id
	delete(req, res) {
		NguoiDung.findByIdAndDelete(req.params.id)
			.lean()
			.then((dataDelete) => res.json(dataDelete))
			.catch((err) => {
				res.json({
					message: err,
				});
			});
	}
}

module.exports = new NguoiDungController();
