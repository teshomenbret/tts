// looks like fineshed
import User from '../models/user.model.js'
import extend from 'lodash/extend.js'
import errorHandler from '../helpers/dbErrorHandler.js'

const create = async (req, res) => {
    try {     
        const user = new User(req.body) 
        await user.save()
        return res.status(200).json({
            message: "ok"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const list = async (req, res) => {
    try {
        let users = await User.find()
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}


const  familarize =  async (req, res) => {
    try {
        console.log(req.body)
        let user = await User.findOne({ id:req.body.id })
        if (!user)
            return res.status(400).json({
                    error: "User not found"
                })

        user.no_play +=1
        user.total_correct =+req.body.correct
        const useAvaerge =  user.avarege_score 
        user.avarege_score  = (req.body.correct+useAvaerge)/user.no_play
        await user.save()
        return res.status(200).json({
            message: "ok"
        })
        
    } catch (err) {
            return res.status(400).json({
                error: "Could not retrieve user"
            })
    }
}

const  coupon =  async (req, res) => {
    try {
        const user = await User.findOne({ id:req.body.id })
        if (!user)
            return res.status(400).json({
                    error: "User not found"
                })

        const couponPercent = (user.total_correct /(user.no_play - user.total_correct))*user.avarege_score
        const couponKey = `${couponPercent}:${user._id}`
        user.couponPercent = couponPercent
        user.couponKey  =couponKey
        await user.save()
        return res.status(200).json({
            couponKey:couponKey,
            couponPercent:couponPercent
        })
        
    } catch (err) {
            return res.status(400).json({
                error: "some thing goose wrong"
            })
    }
}

const  referal =  async (req, res) => {
    try {
        
        const guest = await User.findOne({ id:req.body.guest_id })
        if (!guest){
            const user = await User.findOne({ id:req.body.referral_id })
            user.referral_number += 1
            const num = user.referral_number 
            await user.save()
            return res.status(200).json({
                result: "ok",
                number:num
            })
        }
        else{
            return res.status(200).json({
                result: "no"
            })
        }
            
    } catch (err) {
            return res.status(400).json({
                error: "no"
            })
    }
}


const remove = async (req, res) => {
    try {
        let user = req.profile
        let deletedUser = await user.remove()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}


export default { create, list, remove, familarize, coupon, referal}
