// looks like fineshed
import extend from 'lodash/extend.js'
import errorHandler from '../helpers/dbErrorHandler.js'
import QuizQuestions from '../models/question.model.js'

const create = async (req, res) => {
    try {     
        const question = new QuizQuestions(req.body) 
        await question.save()
        return res.status(200).json({
            question
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const list = async (req, res) => {
    try {
        let questions = await QuizQuestions.find()
        res.json(questions)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

// const categoryByID = async (req, res, next, id) => {
//     try {
//         let category = await Category.findById(id)
//         if (!category)
//             return res.status(400).json({
//                     error: "category not found"
//                 })

//         req.category = category
//         next()
//     } catch (err) {
//             return res.status(400).json({
//                 error: "Could not retrieve category"
//             })
//     }
// }

const read = (req, res) => {
    return res.json(req.category)
}

const update = async (req, res) => {
    try {
        let category = req.category
        category = extend(category, req.body)
        await category.save()
        res.json(category)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async (req, res) => {
    try {
        let category = req.category
        let deletedCategory = await category.remove()
        res.json(deletedCategory)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}


export default { create,update, read, list, remove }
