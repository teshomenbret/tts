import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
        {
            password:{
                type:String
            },

            username: {
                type: String,
                unique: true,
                required: true
            },

            id:{
                type:Number,
                unique: true,
            },  

            first_name:{
                type:String,
                required:true
            },

            last_name:{
                type:String,
            },
            no_play:{
                type:Number,
            },
            total_correct:{
                type:Number,
            },
            avarege_score :{
                type:Number,
            }         
    },
);


export default mongoose.model('User',UserSchema)


