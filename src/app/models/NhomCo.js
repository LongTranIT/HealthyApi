const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const NhomCo=new Schema({
    ten:String,
    bai_tap:[{ type: Schema.Types.ObjectId, ref: 'bai_tap' }],
},{
    timestamps:true
});

module.exports=mongoose.model('nhom_co',NhomCo);

