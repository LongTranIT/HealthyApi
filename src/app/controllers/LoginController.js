const NguoiDung = require("../models/NguoiDung");
class LoginController {
	// [POST] /login
	login(req, res) {
		const account=req.body;
		NguoiDung.find({})			
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
