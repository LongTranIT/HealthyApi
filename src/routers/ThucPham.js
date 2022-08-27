const express=require('express');
const router=express.Router();

const ThucPhamController=require('../app/controllers/ThucPhamController');

router.get('/',ThucPhamController.show);
router.get('/:id',ThucPhamController.detail);
router.post('/',ThucPhamController.create);
router.put('/:id',ThucPhamController.update);
router.delete('/:id',ThucPhamController.delete);

module.exports=router;