const main = document.querySelector('main');
const left = main.querySelector('.left');
const right = main.querySelector('.right');
const moneyNow = right.querySelector('.money-now .text-right');
const moneyNowNum = parseInt(moneyNow
    .textContent
    .replace(',', '')
    .slice(0, -2), 10);
console.log(moneyNowNum);