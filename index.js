const TelegramBot = require("node-telegram-bot-api");

const token = "7021830954:AAEoknWH6xuzUzNDYIvdVdOW5PYqmT684dY";

const bot = new TelegramBot(token, { polling: true });

const options = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: "Maxsulotlar", callback_data: "/categories" }]],
  }),
};

const sendPhotos = async (chatID) => {
  await bot.sendMediaGroup(chatID, [
    {
      type: "photo",
      media:
        "https://ufa.vsevdom.info/media/original/10/107ac950416b7309c0ee339d4c3bab446ce1c0f0.png",
    },
    {
      type: "photo",
      media:
        "https://berezovskii.tehnos24.ru/upload/iblock/058/5yr640j2gcbjpx44c75p3y80utpv2490.jpg",
    },
    {
      type: "photo",
      media: "https://bestc.kz/templates/BestC/images/slider/slide_2_new.jpg",
    },
    {
      type: "photo",
      media:
        "https://wintal.ru/upload/iblock/fa8/cc4c76c1041412c3fb6dec5b1f99f933.jpg",
    },
  ]);
};

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Botni ishga tushirish" },
    { command: "/categories", description: "Kategoriyalar" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      await bot.sendPhoto(
        chatId,
        "https://abada.ru/upload/delight.webpconverter/upload/medialibrary/c2c/2yx62rbf8w92j8piqo4toc8gzj9d0og4.jpg.webp?171889045454348"
      );
      await bot.sendMessage(
        chatId,
        `NPotolki telegram botiga xush kelibsiz.

Biz chust shaxrida sifatli, zamonaviy va hamyonbob natyajnoy potoloklar yasab o'rnatamiz. Maxsulotlarimiz bilan tanishish uchun Maxsulotlar tugmasini bosing.`,
        options
      );
    }
    if (text === "/categories") {
      return sendPhotos(chatId);
    }
  });

  bot.on("callback_query", async (qry) => {
    const data = qry.data;
    const chatId = qry.message.chat.id;

    if (data === "/categories") {
      return sendPhotos(chatId);
    }
  });
};

start();
