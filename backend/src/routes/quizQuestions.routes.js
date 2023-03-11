import express from 'express'
import questionCtrl from '../controllers/question.controller.js'

const router = express.Router()

router.route('/api/questions')
  .get(questionCtrl.list)
  .post(questionCtrl.create)

router.route('/api/questions/:bookId')
  .get(questionCtrl.read)
  .put(questionCtrl.update)
  .delete(questionCtrl.remove)
  
// router.route('/api/questions/photo/:bookId')
//   .get(questionCtrl.photo)


// router.param('bookId', questionCtrl.bookByID)

export default router