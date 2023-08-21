const { Telegraf } = require('telegraf');

const { BOT_TOKEN } = process.env;

const bot = new Telegraf(BOT_TOKEN);

async function sendMessageToUser(userId, message) {
  try {
    const chat = await bot.telegram.getChat(userId);
    const chatId = chat.id;
    bot.telegram.sendMessage(chatId, message);
  } catch (error) {
    console.error('ОШИБКА ПРИ ОТПРАВКЕ СООБЩЕНИЯ БОТОМ', error);
  }
}

bot.start((ctx) =>
  ctx.reply(
    'Привет, менеджер Cape&Coat! Буду помогать с инфой об оформленных заказах!',
  ),
);

bot.command('send', async (ctx) => {
  const username = ctx.message.text.split(' ')[1];
  const message = 'This message is only for you';
  await sendMessageToUser(username, message);
});

bot
  .launch()
  .then(() => console.log('Bot is running'))
  .catch((err) => console.error(err));

module.exports = {
  bot,
  sendMessageToUser,
};
