const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const ThucPham=new Schema({
    ten: String,
    calo:Number,
    hinh:String,
    chat_dinh_duong:{ type: Schema.Types.ObjectId, ref: 'chat_dinh_duong' },
},{
    timestamps:true
});

module.exports=mongoose.model('thuc_pham',ThucPham);

