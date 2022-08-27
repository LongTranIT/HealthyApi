const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ThongKe = new Schema(
	{
		ngay: Date,
		calo_nap: Number,
		calo_tieu: Number,
		thuc_don: [{ type: Schema.Types.ObjectId, ref: "thuc_don" }],
		bai_tap: [{ type: Schema.Types.ObjectId, ref: "bai_tap" }],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("thong_ke", ThongKe);
