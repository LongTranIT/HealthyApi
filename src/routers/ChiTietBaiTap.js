const express=require('express');
const router=express.Router();

const ChiTietBaiTapController=require('../app/controllers/ChiTietBaiTapController');

router.get('/',ChiTietBaiTapController.show);
router.get('/:id',ChiTietBaiTapController.detail);
router.post('/',ChiTietBaiTapController.create);
router.put('/:id',ChiTietBaiTapController.update);
router.delete('/:id',ChiTietBaiTapController.delete);

module.exports=router;