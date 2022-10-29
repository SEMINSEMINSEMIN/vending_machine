const main = document.querySelector('main');
const left = main.querySelector('.left');
const right = main.querySelector('.right');

// 음료 메뉴
const drinkData = [{
    'drinkName': "Original_Cola",
    "price": 1000,
    "num": 5,
    'img': ["images/Original_Cola.png", "Original Cola"],
    "isSelected": false,
    "isSoldout": false
}, {
    'drinkName': "Violet_Cola",
    "price": 1000,
    "num": 5,
    'img': ["images/Violet_Cola.png", "Violet Cola"],
    "isSelected": false,
    "isSoldout": false
}, {
    'drinkName': "Yellow_Cola",
    "price": 1000,
    "num": 5,
    'img': ["images/Yellow_Cola.png", "Yellow Cola"],
    "isSelected": false,
    "isSoldout": false
}, {
    'drinkName': "Cool_Cola",
    "price": 1000,
    "num": 5,
    'img': ["images/Cool_Cola.png", "Cool Cola"],
    "isSelected": false,
    "isSoldout": false
}, {
    'drinkName': "Green_Cola",
    "price": 1000,
    "num": 5,
    'img': ["images/Green_Cola.png", "Green Cola"],
    "isSelected": false,
    "isSoldout": false
}, {
    'drinkName': "Orange_Cola",
    "price": 1000,
    "num": 5,
    'img': ["images/Orange_Cola.png", "Orange Cola"],
    "isSelected": false,
    "isSoldout": false
}];

const drinkList = left.querySelector(".drink-list");

for (let i = 0; i < drinkData.length; i++){
    const li = document.createElement('li');
    li.setAttribute('class', 'drink-item');

    const btn = document.createElement('button');

    const img = document.createElement('img');
    img.setAttribute('src', drinkData[i].img[0]);
    img.setAttribute('alt', drinkData[i].img[1]);

    const nameSpan = document.createElement('span');
    nameSpan.setAttribute('class', 'item-name');
    nameSpan.textContent = drinkData[i].drinkName;

    const priceSpan = document.createElement('span');
    priceSpan.setAttribute('class', 'item-price');
    priceSpan.textContent = `${drinkData[i].price}원`;
    
    btn.appendChild(img);
    btn.appendChild(nameSpan);
    btn.appendChild(priceSpan);

    li.appendChild(btn);

    drinkList.appendChild(li);
}

// 소지금
const moneyNow = right.querySelector('.money-now .text-right .num-only');
const moneyNowNum = parseInt(moneyNow
    .textContent.replace(',',''), 10);

// 입금액
const moneyInp = left.querySelector("#inputDeposit");
const inpBtn = left.querySelector(".btn-deposit");

function moneyInput(){
    if (moneyInp.value > moneyNowNum){
        window.alert('소지금보다 입금액이 더 클 수 없습니다.');
    }
}

inpBtn.addEventListener('click', moneyInput);
