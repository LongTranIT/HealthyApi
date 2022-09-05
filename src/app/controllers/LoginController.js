const NguoiDung = require("../models/NguoiDung");
class LoginController {
	// [POST] /login
	login(req, res) {
		const account=req.body;
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
			.then((NguoiDungs) =>{
				const result=NguoiDungs.find(item=>
					item.tai_khoan.username===account.username 
					&&
					item.tai_khoan.password===account.password
				)
				res.json(result||{message: 'Invalid account'})
			})
			.catch((err) => {
				message: err;
			});
	}


}

module.exports = new LoginController();
