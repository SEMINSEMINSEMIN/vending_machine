const main = document.querySelector('main');
const left = main.querySelector('.left');
const right = main.querySelector('.right');

// 음료 메뉴
const drinkData = [{
    "drinkName": "Original_Cola",
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
let moneyNowNum = parseInt(moneyNow
    .textContent.replace(',',''), 10);

// https://hianna.tistory.com/441
// 천단위마다 콤마
function thousandComma(num){
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

// 입금액
const moneyInp = left.querySelector("#inputDeposit");
const inpBtn = left.querySelector(".btn-deposit");
const leftOver = left.querySelector('.left-over .num-only');
let leftOverNum = parseInt(leftOver.textContent.replace(',', ''), 10);

function moneyInput(){
    if (moneyInp.value > moneyNowNum){
        window.alert('소지금보다 입금액이 더 클 수 없습니다.');
    } else {
        moneyNowNum = moneyNowNum - moneyInp.value;
        moneyNow.textContent = thousandComma(moneyNowNum);

        leftOverNum += parseInt(moneyInp.value, 10);
        leftOver.textContent = thousandComma(leftOverNum);
    }
    moneyInp.value = '';
}

inpBtn.addEventListener('click', moneyInput);

// 거스름돈 반환
const leftReturnBtn = left.querySelector(".btn-left-over");

function leftReturnFun(){
    moneyNowNum += leftOverNum;
    leftOverNum = 0;
    moneyNow.textContent = thousandComma(moneyNowNum);
    leftOver.textContent = '0';
}

leftReturnBtn.addEventListener('click', leftReturnFun);

// 음료 클릭시
const orderCheck = left.querySelector('.order-check');

class OrderItem {
    constructor(name, img, leftNum){
        this.name = name;
        this.img = img;
        this.leftNum = leftNum;
    }

    reduceNum(event){
        if (this.leftNum > 1){
            return this.leftNum--;
        } else if (this.leftNum === 1){
            event.currentTarget.classList.add("sold-out");
            event.currentTarget.setAttribute('disabled', '');
            return this.leftNum--;
        }
    }
}

let items = {
    // 'Original_Cola': undefined,
    // 'Violet_Cola': undefined,
    // 'Yellow_Cola': undefined,
    // 'Cool_Cola': undefined,
    // 'Green_Cola': undefined,
    // 'Orange_Cola': undefined,
};

let priceSum = 0;

function onceSelected(event){
    const clickedItem = event.currentTarget;

    const clickedImg = clickedItem
    .querySelector("img");

    const clickedPrice = parseInt(clickedItem
    .querySelector(".item-price")
    .textContent
    .slice(0, -1), 10);

    const clickedName = clickedItem
    .querySelector(".item-name")
    .textContent;

    const orderCheckItems = orderCheck.querySelectorAll("li");

    const orderListNames = [];
    for (const i of orderCheckItems){
        orderListNames.push(i.children[1].textContent);
    }

    const sameNameLi = orderCheckItems[orderListNames.indexOf(clickedName)];

    if (leftOverNum >= clickedPrice){
        if (!orderListNames.includes(clickedName)){
            leftOverNum -= clickedPrice;
            leftOver.textContent = thousandComma(leftOverNum);

            const li = document.createElement('li');
            li.setAttribute('class', 'order-check-wrapper');

            items[clickedName] = new OrderItem(
                clickedName, 
                [clickedImg.getAttribute('src'), clickedImg.getAttribute('alt')],
                drinkData
                    .find(e => e['drinkName'] === clickedName)
                    .num
            );

            const img = document.createElement('img');
            img.setAttribute("src", items[clickedName].img[0]);
            img.setAttribute("alt", items[clickedName].img[0]);
            img.setAttribute("class", "small-cola-img");

            const p = document.createElement('p');
            p.textContent = clickedName;
            p.setAttribute("class", "small-cola-name");
            
            items[clickedName].reduceNum(event);
            // reduceNum(clickedName, event);
            // console.log('--');
            // console.log(items);

            const div = document.createElement('div');
            const hiddenSpan = document.createElement('span');
            hiddenSpan.setAttribute('class', 'txt-hide');
            div.appendChild(hiddenSpan);
            div.textContent = 1;
            div.setAttribute("class", "num-select");

            li.appendChild(img);
            li.appendChild(p);
            li.appendChild(div);
    
            orderCheck.append(li);

            priceSum += clickedPrice;
            console.log(priceSum);
        } else {
            items[clickedName].reduceNum(event);
            // console.log(items);
            // console.log('--');
            leftOverNum -= clickedPrice;
            leftOver.textContent = thousandComma(leftOverNum);
            sameNameLi.children[2].textContent = parseInt(sameNameLi.children[2].textContent, 10) + 1;
            // reduceNum(clickedName, event);
            priceSum += clickedPrice;
            console.log(priceSum);
        }
    } else {
        window.alert("잔액이 부족합니다.");
    }
}

drinkList.querySelectorAll('li button')
    .forEach(e => {
        e.addEventListener("click", onceSelected);
    });

