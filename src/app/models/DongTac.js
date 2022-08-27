const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const DongTac=new Schema({
    ten: String,
    mo_ta:String,
    hinh:String,
},{
    timestamps:true
});

module.exports=mongoose.model('dong_tac',DongTac);

