const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const LoaiThucDon=new Schema({
    ten:String,
    mo_ta:String,
    thuc_don:[{ type: Schema.Types.ObjectId, ref: 'thuc_don' }]
},{
    timestamps:true
});

module.exports=mongoose.model('loai_thuc_don',LoaiThucDon);

