const express=require('express');
const router=express.Router();

const ChiTietThucDonController=require('../app/controllers/ChiTietThucDonController');

router.get('/',ChiTietThucDonController.show);
router.get('/:id',ChiTietThucDonController.detail);
router.post('/',ChiTietThucDonController.create);
router.put('/:id',ChiTietThucDonController.update);
router.delete('/:id',ChiTietThucDonController.delete);

module.exports=router;