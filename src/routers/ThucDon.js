const express=require('express');
const router=express.Router();

const ThucDonController=require('../app/controllers/ThucDonController');

router.get('/',ThucDonController.show);
router.get('/:id',ThucDonController.detail);
router.post('/',ThucDonController.create);
router.put('/:id',ThucDonController.update);
router.delete('/:id',ThucDonController.delete);

module.exports=router;