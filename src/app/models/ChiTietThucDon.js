const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const ChiTietThucDon=new Schema({
    thuc_pham:{ type: Schema.Types.ObjectId, ref: 'thuc_pham' },
    so_luong: Number,
},{
    timestamps:true
});

module.exports=mongoose.model('chi_tiet_thuc_don',ChiTietThucDon);

