const ThongKe = require("../models/ThongKe");
const ThucDon = require("../models/ThucDon");
const NguoiDung = require("../models/NguoiDung");
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
			.then((nd) => {
				const tks = nd.thong_ke;
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
					const caloInStatictis = tkFilter.map(
						(item) => item.calo_nap
					);
					const caloOutStatictis = tkFilter.map(
						(item) => item.calo_tieu
					);
					res.json({
						calo_in_total: caloInStatictis,
						calo_out_total: caloOutStatictis,
					});
				}
				//Get all
				else {
					res.json(tks);
				}
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

	// [POST] /ThongKe
	create(req, res) {
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
				tkUpdate.calo_nap += td?.calo || 0;

				ThongKe.findByIdAndUpdate(tkUpdate["_id"], {$set:{thuc_don:tkUpdate.thuc_don}},{new:true}).then(
					(result) => {
						res.json(result)
					}
				);
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
		// const newData = new ThongKe(req.body);
		// newData
		// 	.save()
		// 	.then((data) => {
		// 		res.json(data);
		// 	})
		// 	.catch((err) => {
		// 		res.json({
		// 			message: err,
		// 		});
		// 	});
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
