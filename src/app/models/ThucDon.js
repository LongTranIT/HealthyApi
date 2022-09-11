const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const ThucDon=new Schema({
    ten: String,
    thanh_phan:[{ type: Schema.Types.ObjectId, ref: 'chi_tiet_thuc_don' }],
    bua_an:String,
    hinh:String,
    mo_ta:String,
    calo: Number
},{
    timestamps:true
});

module.exports=mongoose.model('thuc_don',ThucDon);

