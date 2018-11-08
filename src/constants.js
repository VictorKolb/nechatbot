import { getDog } from "getDog";
import { getRandomNumber } from "index";

const hateSpeech = ["пидор", "пидр", "нигер", "нигга"];
const shiba = ["сиба", "сибу", "шиба", "сибушка", "шибушка", "шибой"];
const corgi = ["корги", "коржик"];
const randomDog = [
  "песель",
  "пёсель",
  "собака",
  "пёс",
  "пёса",
  "догич",
  "догислав",
  "дог",
  "собак",
  "собакен",
  "собакич",
  "догислав",
  "собакевич",
  "пепс",
  "догос",
  "доггос",
  "доггер",
  "догич",
];
export const net = [
  "минет",
  "омлет",
  "паштет",
  "паштет",
  "менталитет",
  "авиабилет",
  "интернет",
  "бронежилет",
  "банкет",
  "суверенитет",
  "туалет",
  "портрет",
  "фальцет",
  "жакет",
  "прокурор въебал пять лет",
  "ПИДОРА ОТВЕТ",
  "ПИДОРА ОТВЕТ",
  "ПИДОРА ОТВЕТ",
  "ПИДОРА ОТВЕТ",
  "ПИДОРА ОТВЕТ",
  "ПИДОРА ОТВЕТ",
  "хуй зажало в турникет",
];

const trista = [
  "хуйни в ссылку декабриста",
  "благодарите программиста",
  "абстрагируйся от суеты, достигнув с космосом единства",
  "метни бутылку в альпиниста",
];

export const triggers = [
  [["слава украине"], () => "ГЕРОЯМ СЛАВА! 🇺🇦"],
  [["пизда"], () => "а давайте не материться"],
  [["че лыбишься", "чо лыбишсо"], () => "весело же"],
  [hateSpeech, () => "это хейтспич приятель"],
  [corgi, async () => await getDog("corgi")],
  [shiba, async () => await getDog("shiba")],
  [randomDog, async () => await getDog("randomDog")],
  [["той терьер"], async () => await getDog("toy")],
  [["мопс"], async () => await getDog("pug")],
  [["триста"], () => trista[getRandomNumber(0, trista.length)]],
];
