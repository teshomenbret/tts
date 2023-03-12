const { response } = require('express');

// require('dotenv').config()
fetch = require('node-fetch')


const getQuestions = async () =>{
    const url = "http://localhost:5050/api/questions"
    const response = await fetch(url, 
                                  {
                                  method: 'GET',
                                  headers: {
                                    'Accept': 'application/json'
                                }
                                  }
                              );  
    return await response.json()
}

const regester = async (user) =>{
    const url = "http://localhost:5050/api/users"
    try {
    fetch(url, 
            {
                method: 'POST',
                headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                
                body: JSON.stringify(user)
            }
    ).then(response=>response.json())
    .then(response =>{
        console.log(response)
        
            return true
    })
    } catch(err) {
        return true
    }
}

const familarize = async (point) =>{
    const url = "http://localhost:5050/api/users/familirize"
    try {
    fetch(url, 
            {
                method: 'POST',
                headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                
                body: JSON.stringify(point)
            }
    ).then(response=>response.json())
    .then(response =>{
        console.log(response)
        
            return true
    })
    } catch(err) {
        return true
    }
}

const getCoupon = async (id) =>{
    const url = "http://localhost:5050/api/users/coupon"
    try {
        const response = await fetch(url, 
                    {
                        method: 'POST',
                        headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                                },
                        
                        body: JSON.stringify({id:id})
                    }
                );  
    return await response.json()
    } catch(err) {
        return false
    }
}

const order = async () =>{
    const url = "http://localhost:5050/api/users"
    const response = await fetch(url, 
                                  {
                                  method: 'GET',
                                  headers: {
                                    'Accept': 'application/json'
                                }
                                  }
                              );  
    return await response.json()
}

const referal = async (guest_id,referral_id) =>{
    const url = "http://localhost:5050/api/users/referal"
    try {
        const response = await fetch(url, 
                    {
                        method: 'POST',
                        headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                                },
                        
                        body: JSON.stringify({guest_id:guest_id,referral_id:referral_id})
                    }
                );  
    return await response.json()
    } catch(err) {
        return false
    }
}




module.exports = {getQuestions, regester, familarize, getCoupon , order, referal}