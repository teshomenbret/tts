require('dotenv').config()
fetch = require('node-fetch')


const getQuestions = async () =>{
    const url = `${process.env.BASE_URL}/questions`
    const response = await fetch(url, 
                                  {
                                  method: 'GET',
                                  headers: {'Content-Type': 'application/json'}
                                  }
                              );  
    return await response.json()
}

module.exports = {getQuestions}