// @flow
import TelegramBot from "node-telegram-bot-api";
import Agent from "socks5-https-client/lib/Agent";
import config from "config";
import { triggers, net } from "constants.js";

process.env["NTBA_FIX_319"] = "1";
const { token, socksHost, socksPort, socksUsername, socksPassword } = config;

const bot = new TelegramBot(token, {
  polling: true,
  request: {
    agentClass: Agent,
    agentOptions: {
      socksHost,
      socksPort,
      socksUsername,
      socksPassword,
    },
  },
});

export function getRandomNumber(max: number, min: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

bot.on("message", async msg => {
  // bot.sendMessage(168224148, JSON.stringify(msg));
  const { message_id, chat, text, new_chat_member } = msg;
  const { id: chatId } = chat;

  if (new_chat_member) {
    bot.sendSticker(chatId, "CAADAgADTgUAAsiuFQMWhq_Msw3cOgI", {
      reply_to_message_id: message_id,
    });
  }

  if (text) {
    const string = text.replace(/[^\s\wа-я]+/gi, "").toLowerCase();

    function sendMessage(text: string) {
      bot.sendMessage(chatId, text, { reply_to_message_id: message_id });
    }

    if (string.includes("ето не чат")) {
      bot.setChatTitle(chatId, text);
    }

    if (string.slice(-3) === "нет") {
      sendMessage(net[getRandomNumber(0, net.length)]);
    }

    for (const [variants, func] of triggers) {
      if (new RegExp(variants.join("|")).test(string)) {
        sendMessage(await func());
        return;
      }
    }

    //да — английская А
    if (
      chatId !== -1001365498540 &&
      (string.slice(-2) === "да" || string.slice(-2) === "дa")
    ) {
      sendMessage("пизда");
    }
  }
});

bot.sendMessage(168224148, "nechatbot запущен успешно");
