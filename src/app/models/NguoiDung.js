const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const DuKhach=new Schema({
    ho_ten: String,
    sdt:String,
},{
    timestamps:true
})

module.exports=mongoose.model('du_khach',DuKhach);

