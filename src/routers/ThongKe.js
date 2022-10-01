const express=require('express');
const router=express.Router();

const ThongKeController=require('../app/controllers/ThongKeController');

router.get('/',ThongKeController.show);
router.get('/date',ThongKeController.getDates);
router.get('/:id',ThongKeController.detail);
router.post('/thucdon',ThongKeController.addMenu);
router.post('/baitap',ThongKeController.addBaiTap);
router.put('/:id',ThongKeController.update);
router.patch('/:id',ThongKeController.updatePatch);
router.delete('/:id',ThongKeController.delete);
router.post('/deletemenu/:id',ThongKeController.deleteMenu);

module.exports=router;