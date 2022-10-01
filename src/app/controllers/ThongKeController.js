const ThongKe = require("../models/ThongKe");
const ThucDon = require("../models/ThucDon");
const NguoiDung = require("../models/NguoiDung");
const BaiTap =require("../models/BaiTap");
class ThongKeController {
	// [GET] /ThongKe
	show(req, res) {
		NguoiDung.findById(req.query.idNguoiDung)
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
					},
				],
			})
			.lean()
			.then((nd) => {
				let tks = nd.thong_ke;
				tks = tks.map((tk) => {
					tk.calo_nap = 0;
					tk.thuc_don.forEach((item) => {
						tk.calo_nap += item.calo;
					});
					return tk;
				});
				//Thống kê theo ngày
				if (req.query.ngay) {
					const tkNeed = tks.find((item) => {
						return (
							+new Date(item.ngay) == +new Date(req.query.ngay)
						);
					});
					if (tkNeed) {
						res.status(200).json(tkNeed);
					} else {
						res.status(404).json({ message: "Không tìm thấy!" });
					}
				}
				//Thống kê theo vùng lựa chọn
				else if (req.query.startDate && req.query.endDate) {
					const tkFilter = tks.filter(
						(item) =>
							+new Date(item.ngay) >=
								+new Date(req.query.startDate) &&
							+new Date(item.ngay) <= +new Date(req.query.endDate)
					);
					const caloInStatictis = tkFilter.map((item) => {
						item.calo_nap;
					});
					const caloOutStatictis = tkFilter.map(
						(item) => item.calo_tieu
					);
					res.json(tkFilter);
				}
				//Get all
				else {
					res.json(tks);
				}
			});
	}

	// [GET] /ThongKe/date
	getDates(req, res) {
		NguoiDung.findById(req.query.idNguoiDung)
			.populate("thong_ke")
			.then((result) => {
				const dates = result.thong_ke.map((item) => item.ngay);
				res.json(dates);
			})
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
			.then((ThongKe) => {
				let caloGetTotal = 0;
				ThongKe.thuc_don.forEach((item) => {
					caloGetTotal += item.calo;
				});
				ThongKe.calo_nap = caloGetTotal;
				res.json(ThongKe);
			})
			.catch((err) => {
				message: err;
			});
	}

	// [POST] /ThongKe/thucdon
	addMenu(req, res) {
		const { ngay, idThucDon, idNguoiDung } = req.body;
		Promise.all([
			NguoiDung.findById(idNguoiDung).populate("thong_ke"),
			ThucDon.findById(idThucDon),
		]).then(([nguoiDungData, td]) => {
			const tks = nguoiDungData.thong_ke;
			const tkUpdate = tks.find((item) => {
				return +new Date(item.ngay) == +new Date(ngay);
			});
			if (tkUpdate) {
				tkUpdate.thuc_don.push(idThucDon);
				tkUpdate.calo_nap += td.calo;

				ThongKe.findByIdAndUpdate(
					tkUpdate["_id"],
					{
						$set: {
							thuc_don: tkUpdate.thuc_don,
							calo_nap: tkUpdate.calo_nap,
						},
					},
					{ new: true }
				).then((result) => {
					res.json(result);
				});
			} else {
				const newTk = new ThongKe({
					ngay,
					thuc_don: [idThucDon],
					bai_tap: [],
					calo_nap: td?.calo,
					calo_tieu: 0,
				});
				newTk.save().then((data) => {
					NguoiDung.findById(idNguoiDung).then((nd) => {
						nd.thong_ke.push(data["_id"]);
						NguoiDung.findByIdAndUpdate(idNguoiDung, nd)
							.lean()
							.then((tk) => res.json(data))
							.catch((err) => {
								res.json({
									message: err,
								});
							});
					});
				});
			}
		});
	}
	// [POST] /ThongKe/baitap
	addBaiTap(req, res) {
		const { ngay, idBaiTap, idNguoiDung } = req.body;
		Promise.all([
			NguoiDung.findById(idNguoiDung).populate("thong_ke"),
			BaiTap.findById(idBaiTap),
		]).then(([nguoiDungData, bt]) => {
			const tks = nguoiDungData.thong_ke;
			const tkUpdate = tks.find((item) => {
				return +new Date(item.ngay) == +new Date(ngay);
			});
			if (tkUpdate) {
				tkUpdate.bai_tap.push(idBaiTap);
				tkUpdate.calo_tieu += bt.calo;

				ThongKe.findByIdAndUpdate(
					tkUpdate["_id"],
					{
						$set: {
							bai_tap: tkUpdate.bai_tap,
							calo_tieu: tkUpdate.calo_tieu,
						},
					},
					{ new: true }
				).then((result) => {
					res.json(result);
				});
			} else {
				const newTk = new ThongKe({
					ngay,
					bai_tap: [idBaiTap],
					thuc_don: [],
					calo_tieu: bt?.calo,
					calo_nap: 0,
				});
				newTk.save().then((data) => {
					NguoiDung.findById(idNguoiDung).then((nd) => {
						nd.thong_ke.push(data["_id"]);
						NguoiDung.findByIdAndUpdate(idNguoiDung, nd)
							.lean()
							.then((tk) => res.json(data))
							.catch((err) => {
								res.json({
									message: err,
								});
							});
					});
				});
			}
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

	// [Patch] /NguoiDung/:id
	updatePatch(req, res) {
		const updateObject = req.body;
		ThongKe.findByIdAndUpdate(
			req.params.id,
			{ $set: updateObject },
			{ new: true }
		)
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
	// [POST] /ThongKe/deletemenu/:id
	deleteMenu(req, res) {
		ThongKe.findById(req.params.id)
			.populate("thuc_don")
			.lean()
			.then((data) => {
				const caloMenuRemoved = data.thuc_don.find(
					(item) => item["_id"] == req.body.idMenu
				).calo;
				data.thuc_don = data.thuc_don.filter(
					(item) => item["_id"] != req.body.idMenu
				);
				data.calo_nap -= caloMenuRemoved;
				ThongKe.findByIdAndUpdate(
					req.params.id,
					{ $set: {
						thuc_don: data.thuc_don,
						calo_nap: data.calo_nap
					} },
					{ new: true }
				)
					.lean()
					.then((tk) => res.json(tk))
					.catch((err) => {
						res.json({
							message: err,
						});
					});
			})
			.catch((err) => {
				res.json({
					message: err,
				});
			});
	}
}

module.exports = new ThongKeController();
