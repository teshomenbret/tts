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
                default: 0,
            },
            total_correct:{
                type:Number,
                default: 0,
            },
            avarege_score :{
                type:Number,
                default: 0,
            },

            couponKey:{
                type:String
            },
            couponPercent:{
                type:Number
            },
            referral_number :{
                type:Number
            },
                  
    },
);


export default mongoose.model('User',UserSchema)


