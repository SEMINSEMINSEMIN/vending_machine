const main = document.querySelector('main');
const left = main.querySelector('.left');
const right = main.querySelector('.right');
const drinkList = left.querySelector(".drink-list");

let drinkData;

async function getData(){
    const response = await fetch('https://gist.githubusercontent.com/SEMINSEMINSEMIN/4467beb708c54221f8e853ce815cdd99/raw/69a651ec9523816cff18b4c563ed4b655d84c1b9/vending_machine');

    drinkData = await response.json();

    renderData(drinkData, drinkList);

    drinkList.querySelectorAll('li button')
    .forEach(e => {
        e.addEventListener("click", onceSelected);
    });
}

// 데이터 받아온 뒤 렌더링
function renderData(data, cont){
    for (let i in data){
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

        cont.appendChild(li);
    }
}

getData();

// 소지금
const moneyNow = right.querySelector('.money-now .text-right .num-only');
let moneyNowNum = parseInt(moneyNow
    .textContent.replace(',',''), 10);

// https://hianna.tistory.com/441
// 천단위마다 콤마
function thousandComma(num){
    const arr = num.toString().split('');
    for (let i = 0; i > -arr.length; i--){
        if ((-i - 3) % 4 === 0){
            arr.splice(i, 0, ',');
        }
    }
    return arr.join('');
}

// 입금액
const moneyInp = left.querySelector("#inputDeposit");
const inpBtn = left.querySelector(".btn-deposit");
const leftOver = left.querySelector('.left-over .num-only');
let leftOverNum = parseInt(leftOver.textContent.replace(',', ''), 10);

function moneyInput(){
    if (moneyInp.value > moneyNowNum){
        window.alert('소지금보다 입금액이 더 클 수 없습니다.');
    } else if (moneyInp.value === ''){
        window.alert('입금액을 입력하세요!')
    } else {
        moneyNowNum = moneyNowNum - parseInt(moneyInp.value, 10);
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
    constructor(name, img, leftNum, count){
        this.name = name;
        this.img = img;
        this.leftNum = leftNum;
        this.count = 0;
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

    addCount(){
        this.count++;
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
            items[clickedName].addCount();

            const div = document.createElement('div');
            const hiddenSpan = document.createElement('span');
            hiddenSpan.setAttribute('class', 'txt-hide');
            div.appendChild(hiddenSpan);
            div.textContent = items[clickedName].count;
            div.setAttribute("class", "num-select");

            li.appendChild(img);
            li.appendChild(p);
            li.appendChild(div);
    
            orderCheck.append(li);

            priceSum += clickedPrice;
        } else {
            items[clickedName].reduceNum(event);
            items[clickedName].addCount();
            // console.log(items);
            // console.log('--');
            leftOverNum -= clickedPrice;
            leftOver.textContent = thousandComma(leftOverNum);
            // sameNameLi.children[2].textContent = parseInt(sameNameLi.children[2].textContent, 10) + 1;
            sameNameLi.children[2].textContent = items[clickedName].count;
            // reduceNum(clickedName, event);
            priceSum += clickedPrice;
        }
    } else {
        window.alert("잔액이 부족합니다.");
    }
}

drinkList.querySelectorAll('li button')
    // .forEach(e => {
    //     e.addEventListener("click", onceSelected);
    // });

// 획득 버튼 클릭시
const getBtn = left.querySelector(".btn-get");
const receiptCont = right.querySelector(".receipt ul");

const totalSum = right.querySelector(".total-amount .num-only");
function getClickedFun(){
    // 값 누적
    totalSum.textContent = thousandComma(priceSum);
    for (const e of Object.entries(items)){
        // 데이터 맞춰주기
        drinkData.find(i => {
            return i["drinkName"] === e[1].name;
        })["num"] = e[1].leftNum;

        // 렌더링
        const li = document.createElement('li');
        li.setAttribute('class', 'order-check-wrapper');

        const img = document.createElement('img');
        img.setAttribute('class', 'small-cola-img');
        img.setAttribute('src', e[1].img[0]);
        img.setAttribute('alt', e[1].img[1]);

        const p = document.createElement('p');
        p.setAttribute('class', 'small-cola-name');
        p.textContent = e[1].name;

        const div = document.createElement('div');
        div.setAttribute('class', 'num-select');
        div.textContent = e[1].count;

        li.appendChild(img);
        li.appendChild(p);
        li.appendChild(div);

        receiptCont.appendChild(li);
    }
}

getBtn.addEventListener("click", getClickedFun);