const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const ThucPham=new Schema({
    ten: String,
    calo:Number,
},{
    timestamps:true
});

module.exports=mongoose.model('thuc_pham',ThucPham);

