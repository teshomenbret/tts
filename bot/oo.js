require('dotenv').config()
const {Telegraf} = require('telegraf')
// const Extra = require('telegraf/extra')
// const Markup = require('telegraf/markup')

const {getQuestions} = require('./src/api')
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('start', ({ reply }) => {
  return reply('Welcome to the quize bot\n what you want to do', Markup
    .keyboard([
      ['Take quize', 'dodo'], // Row1 with 2 buttons
      ['☸ Setting', '📞 Feedback'], // Row2 with 2 buttons
      ['📢 Ads', 'Rate us', '👥 Share'] // Row3 with 3 buttons
    ])
    .oneTime()
    .resize()
    .extra()
  )
})


bot.hears('Take quize', ctx => {
  getQuestions()
  .then(response => {
    console.log("responce", response)

    ctx.replyWithPoll(response[0].question, response[0].options, {
      is_anonymous: false,
      allows_multiple_answers: false,
      type:'quiz',
      correct_option_id	: 1,
      open_period:response[0].open_period
    });

  })
""
  

})



// bot.command('quiz', (ctx) => {

//   const question = quizQuestions[0];
//   console.log(ctx)
//   ctx.replyWithPoll(question.question, question.answers, {
//     is_anonymous: false,
//     allows_multiple_answers: false,
//     type:'quiz',
//     correct_option_id	: question.correctAnswerIndex,
//     open_period:10
//   });
// });

// bot.on('poll_answer', (ctx) => {
//   console.log("ctx",ctx.update)
//   const question = quizQuestions[0];  

//   if (ctx.update.poll_answer.option_ids[0] === question.correctAnswerIndex) {
//       // ctx.reply('Correct!');
//       console.log('correct')
//     } else {
//       // ctx.reply('Incorrect. The correct answer was: ' + question.answers[question.correctAnswerIndex]);
//       console.log('in correct')

//     }

// });






















bot.hears('🔍 Search', ctx => ctx.reply('Yay!'))
bot.hears('dodo', ctx => ctx.reply('dont dodo dodo dodo'))
bot.hears('☸ Setting', ctx => ctx.reply('does you need setting'))
bot.hears('📞 Feedback', ctx => ctx.reply('I dont need it write now'))
bot.hears('📢 Ads', ctx => ctx.reply('add is comming soon'))
bot.hears('Rate us', ctx => ctx.reply('comming reate us'))
bot.hears('👥 Share', ctx => ctx.reply('share this dood'))



// bot.command('special', (ctx) => {
//   return ctx.reply('Special buttons keyboard', Extra.markup((markup) => {
//     return markup.resize()
//       .keyboard([
//         markup.contactRequestButton('Send contact'),
//         markup.locationRequestButton('Send location')
//       ])
//   }))
// })

// bot.command('pyramid', (ctx) => {
//   return ctx.reply('Keyboard wrap', Extra.markup(
//     Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
//       wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
//     })
//   ))
// })

// bot.command('simple', (ctx) => {
//   return ctx.replyWithHTML('<b>Coke</b> or <i>Pepsi?</i>', Extra.markup(
//     Markup.keyboard(['Coke', 'Pepsi'])
//   ))
// })

// bot.command('inline', (ctx) => {
//   return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', Extra.HTML().markup((m) =>
//     m.inlineKeyboard([
//       m.callbackButton('Coke', 'Coke'),
//       m.callbackButton('Pepsi', 'Pepsi')
//     ])))
// })

// bot.command('random', (ctx) => {
//   return ctx.reply('random example',
//     Markup.inlineKeyboard([
//       Markup.callbackButton('Coke', 'Coke'),
//       Markup.callbackButton('Dr Pepper', 'Dr Pepper', Math.random() > 0.5),
//       Markup.callbackButton('Pepsi', 'Pepsi')
//     ]).extra()
//   )
// })

// bot.command('caption', (ctx) => {
//   return ctx.replyWithPhoto({ url: 'https://picsum.photos/200/300/?random' },
//     Extra.load({ caption: 'Caption' })
//       .markdown()
//       .markup((m) =>
//         m.inlineKeyboard([
//           m.callbackButton('Plain', 'plain'),
//           m.callbackButton('Italic', 'italic')
//         ])
//       )
//   )
// })

// bot.hears(/\/wrap (\d+)/, (ctx) => {
//   return ctx.reply('Keyboard wrap', Extra.markup(
//     Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
//       columns: parseInt(ctx.match[1])
//     })
//   ))
// })

// bot.action('Dr Pepper', (ctx, next) => {
//   return ctx.reply('👍').then(() => next())
// })

// bot.action('plain', async (ctx) => {
//   await ctx.answerCbQuery()
//   await ctx.editMessageCaption('Caption', Markup.inlineKeyboard([
//     Markup.callbackButton('Plain', 'plain'),
//     Markup.callbackButton('Italic', 'italic')
//   ]))
// })

// bot.action('italic', async (ctx) => {
//   await ctx.answerCbQuery()
//   await ctx.editMessageCaption('_Caption_', Extra.markdown().markup(Markup.inlineKeyboard([
//     Markup.callbackButton('Plain', 'plain'),
//     Markup.callbackButton('* Italic *', 'italic')
//   ])))
// })

// bot.action(/.+/, (ctx) => {
//   return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`)
// })

bot.launch()





