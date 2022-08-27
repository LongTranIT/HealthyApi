const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const BaiTap=new Schema({
    ten: String,
    chi_tiet_bai_tap:{ type: Schema.Types.ObjectId, ref: 'chi_tiet_bai_tap' },
},{
    timestamps:true
});

module.exports=mongoose.model('bai_tap',BaiTap);

