const express=require('express');
const router=express.Router();

const NguoiDungController=require('../app/controllers/NguoiDungController');

router.get('/',NguoiDungController.show);
router.get('/:id',NguoiDungController.detail);
router.post('/',NguoiDungController.create);
router.put('/:id',NguoiDungController.update);
router.delete('/:id',NguoiDungController.delete);

module.exports=router;