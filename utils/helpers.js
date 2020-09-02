
const format_date = (date) => {
  // console.log("checking the date");
  // console.log(date);
  return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
};

//this is only used for the word comment to make it plural but...
// this is th english language we're talking about here... LOL
// pluralizing anything has exceptions everywhere...these are just a few.
const format_plural = (word, amount) => {
  if (word === 'cactus' && amount >= 2 || word === 'cactus' && amount <= 1) {
    return 'cacti';
  } 
  if (word === 'deer' && amount >= 2 || word === 'deer' && amount <= 1) {
    return 'deer';
  }
  if (word === 'octopus' && amount >= 2 || word === 'octopus' && amount <= 1) {
    return 'octopuses'
  }
  if (amount >= 2 || amount === 0) {
    return `${word}s`;
  } else if (amount === 1) {
    return word;
  }
};

const format_url = url => {
  return url
  .replace('http://', '')
  .replace('https://', '')
  .replace('www.', '')
  .split('/')[0]
  .split('?')[0];
};


module.exports = {
  format_date,
  format_plural,
  format_url
}