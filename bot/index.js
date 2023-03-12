// import dv from 'dotenv'
require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');
const {getQuestions, regester, familarize, order,getCoupon, referal} = require('./src/api')
const {level} = require('./src/helper')
const bot = new TelegramBot('6048190062:AAGM6960ADC5aRsBmOjcqz6_lCMkOl2gXUM', { polling: true });
const quizStates = new Map();
const starting = async() => {
  return {
   currentQuestionIndex:0,
   score:0,
   questionSet:await getQuestions(),
 }
 }
 

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const replyMarkup = {
    keyboard: [["TakeQuiz", "👥 Share"] , ["GetCoupon" ,"SeeLevel"]],
    one_time_keyboard: true,
    resize_keyboard: true,
  };
  bot.sendMessage(chatId, 'Welcome to the quiz!\n What you went to do', { reply_markup: replyMarkup })
  regester(msg.from)
});

bot.on('poll_answer', (msg) => {
  console.log(msg)
  const chatId = msg.user.id;
  if (quizStates.get(chatId)){
    send(msg)
  }
  else{
    // if (!msg.text in ['/startquiz','/start'])
    bot.sendMessage(chatId, 'Why not you use the keybord')
  }
});
bot.onText(/TakeQuiz/gi, async(msg) => {
  const chatId = msg.chat.id;
  if (!quizStates.get(chatId)){
    quizStates.set(chatId , await starting())
  }
  bot.sendMessage(chatId, 'Welcome to the quiz!')
  .then(()=>{
    const currentQuestionIndex = quizStates.get(chatId).currentQuestionIndex
    const questionSet = quizStates.get(chatId).questionSet  
    askQuestion(chatId, questionSet, currentQuestionIndex) 

  })
});

bot.onText(/👥 Share/gi, async(msg) => {
  const chatId = msg.chat.id;
  if (!msg.from.is_bot) {
  const referralLink = `https://t.me/two_group_bot?start=${chatId}`;
    bot.sendMessage(chatId, `Use this link to invite your friends: ${referralLink}`);
  }
});

bot.onText(/\/start (.+)|\/start/i, async(msg, match) =>{
  const chatId = msg.chat.id;
  var referral_code = match[1];
  if (referral_code != undefined)
      console.log("Referral code: " + referral_code);
      const ref = await referal(chatId, referral_code) 
      console.log(ref)
      if (ref.result === "ok")
        bot.sendMessage(referral_code, `A new user user your referal code\n NOo referd pople${ref.number}`);
});

const askQuestion = (chatId, questionSet, index) => {
  const quiz = questionSet[index];
  const pollOptions = quiz.options
  const options = {
    is_anonymous: false,
    type: 'quiz',
    correct_option_id: quiz.answers,
    // open_period:15,
  };
  bot.sendPoll(chatId, quiz.question,pollOptions,options )
}

bot.onText(/SeeLevel/gi, async(msg) => {
  const chatId = msg.chat.id;
  const ordered =  await order()
  if(ordered){
      bot.sendMessage(chatId, `your level is ${level(ordered, chatId)} out of ${ordered.length}\n`)
  }
  else
    bot.sendMessage(chatId, "some ploplem hapen to us be pathiont")
});

bot.onText(/GetCoupon/gi, async(msg) => {
  const chatId = msg.chat.id;
  const coupon =  await getCoupon(chatId)
  if(coupon)
    bot.sendMessage(chatId, `Here is your discount coupon \n take it secritily\n ${coupon.couponKey}\n`)
  else
    bot.sendMessage(chatId, "some ploplem hapen to us be pathiont")
});


const send = function(msg){        
          const chatId = msg.user.id;
          const userAnswer = msg.option_ids[0];
          const currentQuestionIndex = quizStates.get(chatId).currentQuestionIndex
          const questionSet = quizStates.get(chatId).questionSet
          const quiz = questionSet[currentQuestionIndex];
          const correctAnswer = quiz.answers;
          if (userAnswer === correctAnswer) {
            quizStates.set(chatId , {
              currentQuestionIndex:quizStates.get(chatId).currentQuestionIndex,
              score: quizStates.get(chatId).score + 1,
              questionSet:quizStates.get(chatId).questionSet
            })
            console.log("dsvlhjgkhj")

              const currentQuestionIndex = quizStates.get(chatId).currentQuestionIndex
              const score = quizStates.get(chatId).score
              const questionSet = quizStates.get(chatId).questionSet
              if (currentQuestionIndex < questionSet.length - 1) {
                quizStates.set(chatId , {
                  currentQuestionIndex:currentQuestionIndex + 1,
                  score:score,
                  questionSet:questionSet
                })
                askQuestion(chatId, questionSet, currentQuestionIndex+1);
              } else {
                bot.sendMessage(chatId, `You scored ${score} out of ${questionSet.length}!`);
                quizStates.delete(chatId)
                const point = {    
                  id: chatId,
                  correct:score
              }
                familarize(point)
                
              }
            
          } else {
              const currentQuestionIndex = quizStates.get(chatId).currentQuestionIndex
              const score = quizStates.get(chatId).score
              const questionSet = quizStates.get(chatId).questionSet

              if (currentQuestionIndex < questionSet.length - 1) {
                quizStates.set(chatId , {
                  currentQuestionIndex:currentQuestionIndex + 1,
                  score:score,
                  questionSet:questionSet
                })

                askQuestion(chatId, questionSet, currentQuestionIndex + 1);
              } 
              else {
                bot.sendMessage(chatId, `You scored ${score} out of ${questionSet.length}!`)
                const replyMarkup = {
                  keyboard: [["/startquiz"]],
                  one_time_keyboard: true,
                  resize_keyboard: true,
                };
                bot.sendMessage(chatId, `You scored ${score} out of ${questionSet.length}!`, { reply_markup: replyMarkup })
                quizStates.delete(chatId)
                const point = {    
                  id: chatId,
                  correct:score
              }
                familarize(point)
              }
          }
}
