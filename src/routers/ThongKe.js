const express=require('express');
const router=express.Router();

const ThongKeController=require('../app/controllers/ThongKeController');

router.get('/',ThongKeController.show);
router.get('/:id',ThongKeController.detail);
router.post('/',ThongKeController.create);
router.put('/:id',ThongKeController.update);
router.delete('/:id',ThongKeController.delete);

module.exports=router;