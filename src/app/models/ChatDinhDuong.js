const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const ChatDinhDuong=new Schema({
    ten:String,
    mo_ta:String,
},{
    timestamps:true
});

module.exports=mongoose.model('chat_dinh_duong',ChatDinhDuong);

