const express=require('express');
const router=express.Router();

const DongTacController=require('../app/controllers/DongTacController');

router.get('/',DongTacController.show);
router.get('/:id',DongTacController.detail);
router.post('/',DongTacController.create);
router.put('/:id',DongTacController.update);
router.delete('/:id',DongTacController.delete);

module.exports=router;