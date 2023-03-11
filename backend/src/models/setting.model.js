import mongoose from 'mongoose'

const SettingSchema = new mongoose.Schema(
        {
            terms:{
                type:String,
                required:true
            },

            options:{
                type:[String],
                required:true
            },

            answers:{
                type:String,
                required:true
            },
            open_period:{
                type:Number,
            },         
    },
);


export default mongoose.model('Setting',SettingSchema)


