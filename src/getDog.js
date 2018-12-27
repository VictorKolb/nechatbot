import response from "response";

const dogUrls = {
  corgi: "https://dog.ceo/api/breed/corgi/cardigan/images/random",
  toy: "https://dog.ceo/api/breed/terrier/toy/images/random",
  husky: "https://dog.ceo/api/breed/husky/images/random",
  pug: "https://dog.ceo/api/breed/pug/images/random",
  shiba: "http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=false",
  randomDog: "https://dog.ceo/api/breeds/image/random",
};

export async function getDog(type) {
  console.log(type);
  const data = await response(dogUrls[type]);
  if (type === "shiba") {
    return data[0];
  } else {
    return data.message.replace(/\\/g, "");
  }
}
