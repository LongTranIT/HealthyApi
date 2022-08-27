const express=require('express');
const router=express.Router();

const ChatDinhDuongController=require('../app/controllers/ChatDinhDuongController');

router.get('/',ChatDinhDuongController.show);
router.get('/:id',ChatDinhDuongController.detail);
router.post('/',ChatDinhDuongController.create);
router.put('/:id',ChatDinhDuongController.update);
router.delete('/:id',ChatDinhDuongController.delete);

module.exports=router;