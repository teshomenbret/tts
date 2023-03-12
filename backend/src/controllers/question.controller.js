import extend from 'lodash/extend.js'
import errorHandler from '../helpers/dbErrorHandler.js'
import QuizQuestions from '../models/question.model.js'
import userCtr from './user.controller.js'

const create = async (req, res) => {
    try {     
        const question = new QuizQuestions(req.body) 
        console.log(req.body)
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
        let questions = await QuizQuestions.find({}).limit(5).exec();
        res.json(questions)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const questionByID = async (req, res, next, id) => {
    try {
        let question = await QuizQuestions.findById(id)
        if (!question)
            return res.status(400).json({
                    error: "question not found"
                })

        req.question = question
        next()
    } catch (err) {
            return res.status(400).json({
                error: "Could not retrieve question"
            })
    }
}

const read = (req, res) => {
    return res.json(req.question)
}

const update = async (req, res) => {
    try {
        let question = req.question
        question = extend(question, req.body)
        await question.save()
        res.json(question)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async (req, res) => {
    try {
        let question = req.question
        let dquestion = await category.remove()
        res.json(dquestion)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}


export default { create,update, read, list, remove,questionByID }
