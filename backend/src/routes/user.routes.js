import express from 'express'
import userCtrl from '../controllers/user.controller.js'

const router = express.Router()

router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create)

router.route('/api/users/familirize')
  .post(userCtrl.familarize)

router.route('/api/users/coupon')
  .post(userCtrl.coupon)

router.route('/api/users/referal')
  .post(userCtrl.referal)



export default router