import express from 'express'
import questionCtrl from '../controllers/question.controller.js'
import authController from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/api/questions')
  .get(questionCtrl.list)
  .post(authController.requireSignin, questionCtrl.create)

router.route('/api/questions/:questionId')
  .get(questionCtrl.read)
  .put(questionCtrl.update)
  .delete(questionCtrl.remove)
  
router.param('questionId', questionCtrl.questionByID)

export default router