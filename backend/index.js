import mongoose from 'mongoose'
dev.config()
import config from './src/configs/config.js';
import app from './src/express.js';
import dev from 'dotenv'



mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri); 

mongoose.connection.on('error', () => {
    console.log(config.mongoUri)
 throw new Error(`unable to connect to database: ${config.mongoUri}`)
})


app.listen(process.env.PORT, (err) => {
 if (err) {
 console.log(err)
 }
 console.info('Server started on port %s.', process.env.PORT)
})