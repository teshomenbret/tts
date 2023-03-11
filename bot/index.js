// import dv from 'dotenv'
require('dotenv').config()

// const { Telegraf } = require('telegraf');

// const bot = new Telegraf(process.env.BOT_TOKEN);


const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const options = {
  polling: true
};
const bot = new TelegramBot("6048190062:AAGM6960ADC5aRsBmOjcqz6_lCMkOl2gXUM", options);

bot.onText(/\/start/, (msg) => {

  bot.sendMessage(msg.chat.id, "Welcome", {
  "reply_markup": {
      "keyboard": [["/quiz", "Your gerade"],   
                    ["📞 Feedback"], ["👥 Share"]]
      }
  });
  
  });


  bot.onText(/\/quiz/, (msg) => {

    const q = {
      question: 'What is the capital of France?',
      answers: ['Paris', 'Berlin', 'London', 'Madrid'],
      correctAnswerIndex: 1
    }

    bot.sendPoll(
      msg.chat.id,
      q.question,
      q.answers,
      // options={
        // type:'quiz',
        // correct_option_id:1,
        // explanation:"ya it is france what is the matter",
        // open_period:10
      // }
    ).then(message =>{
      console.log(message)
    })
    });