const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const NguoiDung = new Schema(
	{
		ho_ten: String,
		can_nang: Number,
		chieu_cao: Number,
		van_dong: Number,
		calo_muc_tieu: Number,
		can_nang_muc_tieu: Number,
		tuoi: Number,
		gioi_tinh: String,
		tai_khoan: { type: Schema.Types.ObjectId, ref: 'tai_khoan' },
		thong_ke: [{ type: Schema.Types.ObjectId, ref: 'thong_ke' }],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("nguoi_dung", NguoiDung);
