const NguoiDung = require("../models/NguoiDung");
class LoginController {
	// [POST] /login
	login(req, res) {
		const account=req.body;
		NguoiDung.find({})	
			.populate('tai_khoan')		
			.lean()
			.then((NguoiDungs) =>{
				const result=NguoiDungs.find(item=>
					item.tai_khoan.username===account.username 
					&&
					item.tai_khoan.password===account.password
				)
				delete result?.tai_khoan
				res.json(result||{message: 'Thông tin đăng nhập không đúng'})
			})
			.catch((err) => {
				message: err;
			});
	}


}

module.exports = new LoginController();
