const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const ThucDon=new Schema({
    ten: String,
    thanh_phan:String,
    bua_an:String,
    loai_thuc_don:{ type: Schema.Types.ObjectId, ref: 'loai_thuc_don' },
},{
    timestamps:true
});

module.exports=mongoose.model('thuc_don',ThucDon);

