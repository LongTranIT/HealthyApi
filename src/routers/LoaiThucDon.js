const express=require('express');
const router=express.Router();

const LoaiThucDonController=require('../app/controllers/LoaiThucDonController');

router.get('/',LoaiThucDonController.show);
router.get('/:id',LoaiThucDonController.detail);
router.post('/',LoaiThucDonController.create);
router.put('/:id',LoaiThucDonController.update);
router.delete('/:id',LoaiThucDonController.delete);

module.exports=router;