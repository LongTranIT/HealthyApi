const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const ChiTietBaiTap=new Schema({
    dong_tac:{ type: Schema.Types.ObjectId, ref: 'dong_tac' },
    so_lan_tap: Number,
    thoi_gian: Number,
},{
    timestamps:true
});

module.exports=mongoose.model('chi_tiet_bai_tap',ChiTietBaiTap);

