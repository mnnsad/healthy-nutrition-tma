const { Telegraf } = require('telegraf');

//токен бота
const bot = new Telegraf ('7221421152:AAGQlFoIZ9abt5vjxKkOlS0Ju2-Zdt8uD6k');

const WEB_APP_URL = 'https://healthy-nutrition-tma.vercel.app';

// команды старта бота
bot.start((ctx) => {
    ctx.reply('Добро пожаловать в HEALTHY_EAT:', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Открыть приложение', web_app: { url: WEB_APP_URL }}]
            ]
        }
    });
});

bot.launch().then(() => {
    console.log('Бот запущен');
    console.log('Ожидаю сообщений...');
}).catch((error) => {
    console.error('Ошибка запуска', error);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));