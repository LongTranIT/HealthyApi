const express=require('express');
const router=express.Router();

const TaiKhoanController=require('../app/controllers/TaiKhoanController');

router.get('/',TaiKhoanController.show);
router.get('/:username',TaiKhoanController.detail);
router.post('/',TaiKhoanController.create);
router.put('/:id',TaiKhoanController.update);
router.delete('/:id',TaiKhoanController.delete);

module.exports=router;