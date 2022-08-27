const express=require('express');
const router=express.Router();

const BaiTapController=require('../app/controllers/BaiTapController');

router.get('/',BaiTapController.show);
router.get('/:id',BaiTapController.detail);
router.post('/',BaiTapController.create);
router.put('/:id',BaiTapController.update);
router.delete('/:id',BaiTapController.delete);

module.exports=router;

