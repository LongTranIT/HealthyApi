const express=require('express');
const router=express.Router();

const NhomCoController=require('../app/controllers/NhomCoController');

router.get('/',NhomCoController.show);
router.get('/:id',NhomCoController.detail);
router.post('/',NhomCoController.create);
router.put('/:id',NhomCoController.update);
router.delete('/:id',NhomCoController.delete);

module.exports=router;

