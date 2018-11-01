import response from "response";

const dogUrls = {
  corgi: "https://dog.ceo/api/breed/corgi/cardigan/images/random",
  toy: "https://dog.ceo/api/breed/terrier/toy/images/random",
  pug: "https://dog.ceo/api/breed/pug/images/random",
  shiba: "https://dog.ceo/api/breed/shiba/images/random",
};

export async function getDog(type) {
  console.log(type);
  const data = await response(dogUrls[type]);
  return data.message.replace(/\\/g, "");
}
