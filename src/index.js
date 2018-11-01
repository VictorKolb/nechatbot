// @flow

import fetch from "node-fetch";
import TelegramBot from "node-telegram-bot-api";
import Agent from "socks5-https-client/lib/Agent";
import net from "netVariants";
import trista from "tristaVariants";
import config from "config";

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

function getRandomNumber(max: number, min: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

bot.on("message", msg => {
  // bot.sendMessage(168224148, JSON.stringify(msg));
  const { message_id, chat, text } = msg;
  const string = text.replace(/[^\wа-я]+/gi, "").toLowerCase();
  const { id: chatId } = chat;

  function sendMessage(text: string) {
    bot.sendMessage(chatId, text, { reply_to_message_id: message_id });
  }

  if (string.includes("етонечат")) {
    bot.setChatTitle(chatId, text);
  }

  if (string.includes("славаукраине")) {
    sendMessage("ГЕРОЯМ СЛАВА! 🇺🇦");
  }

  if (string.includes("корги")) {
    fetch("https://dog.ceo/api/breed/corgi/cardigan/images/random")
      .then(data => data.json())
      .then(data => sendMessage(data.message.replace(`\/`, "")))
      .catch(e => console.error(e));
  }

  if (
    string.includes("сиба") ||
    string.includes("сибу") ||
    string.includes("шиба") ||
    string.includes("сибушка") ||
    string.includes("шибушка")
  ) {
    fetch("http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=false")
      .then(data => data.json())
      .then(data => sendMessage(data[0]))
      .catch(e => console.error(e));
  }

  if (
    string.includes("пидор") ||
    string.includes("пидр") ||
    string.includes("нигер") ||
    string.includes("нигга")
  ) {
    sendMessage("это хейтспич приятель");
  }

  if (string.includes("челыбишься") || string.includes("чолыбишсо")) {
    sendMessage("весело же");
  }

  if (string.includes("триста")) {
    sendMessage(trista[getRandomNumber(0, trista.length)]);
  }

  if (string.includes("пизда")) {
    sendMessage("а давайте не материться");
    return;
  }

  //да — английская А
  if (string.slice(-2) === "да" || string.slice(-2) === "дa") {
    sendMessage("пизда");
  }

  if (string.slice(-3) === "нет") {
    sendMessage(net[getRandomNumber(0, net.length)]);
  }
});

bot.sendMessage(168224148, "nechatbot запущен успешно");
