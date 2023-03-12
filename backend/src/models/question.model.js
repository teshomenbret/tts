import mongoose from 'mongoose'

const QuizQuestionsSchema = new mongoose.Schema(
        {
            question:{
                type:String,
                required:true
            },

            options:{
                type:[String],
                required:true
            },

            answers:{
                type:Number,
                required:true
            },
            open_period:{
                type:Number,
            },         
    },
);


export default mongoose.model('QuizQuestions',QuizQuestionsSchema)


