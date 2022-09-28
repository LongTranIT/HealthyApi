const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const BaiTap = new Schema(
	{
		ten: String,
		hinh: String,
		dong_tac: [{ type: Schema.Types.ObjectId, ref: "dong_tac" }],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("bai_tap", BaiTap);
