var dict = {
  "爱": "любить (к-л или ч-н), любовь, нравится ч-л",
  "八": "8, восемь",
  "爸爸": "папа (счетное слово 个 ge или 位 wèi)",
  "杯子": "стакан, чашка (счетное слово 个 ge)",
  "北京": "Пекин",
  "本": "(счетное слово для книг, журналов и пр.)",
  "不客气": "пожалуйста, не стоит благодарности (когда вас благодарят)",
  "不": "нет, не",
  "菜": "блюдо (счетное слово 道 dào), овощи, кухня",
  "茶": "чай (счетное слово, например, 杯 bēi чашка)",
  "吃": "кушать, есть",
  "出租车": "такси (букв. сдавать в аренду + машина)",
  "打电话": "звонить по телефону (букв. бить + электрический + речь)",
  "大": "большой, старший",
  "的": "притяжательная частица; частица, указывающая на определение",
};

//список значений
var valuelist = Object.values(dict);
//список иероглифов
var keylist = Object.keys(dict);
//define variables from page for manipulating them later:
// - label,
// - value(options),
// - valueDefault - "Выберите правильный ответ"
const labelIerg = document.querySelector('#quiz01');
const valueIerg = document.querySelector('.custom-select').options;
const valueDefault = document.querySelector('#inputGroupSelect01');
//define new Array for pushing there hierogliph items: [[key][value],...] - 2 dimension array
let newArr = [];
//define function for shuffling array
function shuffle(arra1) {
    let ctr = arra1.length;
    let temp;
    let index;
    // While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}
//define function for reseting quiz and start play again
function newRound() {
  let anyIerg = 0;
  for (j = 0; j < 5; j++) {
    //define random number in the interval: {0 - dict.length}
    anyIerg = Math.round(Math.random()*(keylist.length-1));
    labelIerg.innerText = keylist[anyIerg];
    //define 2 dimension array
    newArr[j] = [];
    //put keys and values to this array
    newArr[j][0] = keylist[anyIerg];
    newArr[j][1] = valuelist[anyIerg];
  }
  //call func shuffle to shuffle our newArr
  shuffle(newArr);
  //insert values from our array to option sections of "select" element
  for (let i = 1; i < 6; i++) {
    valueIerg[i].innerText = newArr[i-1][1];
  }
  //define default value for our select element "Выберите правильный вариант..."
  valueDefault.selectedIndex = 0;
};

//call the func newRound() for setting aor array, shuffle and etc.
newRound();
console.table(newArr);
//define variables for button "Проверить" - id = check
const butCheck = document.querySelector('#check');
//define variable index - for getting index when user choose the option from "select" element

let ind = 0;
//define func for getting index of selected option from "select" element
function getInd() {
  ind = document.querySelector('.custom-select').selectedIndex;
  console.log(ind);
};

//define variable for button "Снова" - id = again
const buttonAgain = document.querySelector('#again');
//define event listener for action "click" on button "Снова"
//call the func newRound() - reset quiz
//and set text element in info block (id=check-info) to " " eliminate any text
buttonAgain.addEventListener('click', () => {
  newRound();
  console.table(newArr);
  document.getElementById('check-info').innerHTML = "";
});

//define variable for hierogliph which is in label of "select" element
let macthIerg = '';
//add event listener for action "click" on button "Проверить"
butCheck.addEventListener('click', () => {
  //get the hierogliph from label in "select" element
  matchIerg = document.querySelector('#quiz01').innerText;
  //check matching hierogliph from label (matchIerg) with hierogliph from newArr[][]
  if(matchIerg === newArr[ind-1][0]) {
    // console.log("Right");
    //if match show "You are right..."
    document.getElementById('check-info').innerHTML = "<h3>You are right. Well done! Try next one! :)</h3>";
    document.getElementById('check-info').style.color = 'blue';
  } else {
    //console.log("Wrong");
    //if doesn't match show "You are wrong..."
    document.getElementById('check-info').innerHTML = "<h3>You are wrong. Try one more time! :)</h3>";
    document.getElementById('check-info').style.color = 'red';
  }
});
//add event listener for action "change" on "select" element -
//when user select option from list
//when select option call func getInd() - getting index of option and
//transfer this index to event Listener section on button "Проверить"
valueDefault.addEventListener('change', () => getInd()) ;


//заготовка для рандомного списка значений в quiz-е
// var randvaluelist = Object.values(dict);

// //длина словаря
// var x = keylist.length;

// //рандомное числ

// function myFuncnum() {
// 	var y = Math.floor(Math.random() * x);
// 	return y;
// };

// var randnum = myFuncnum();

// function quiz1() {

// //рандомный иероглиф из списка иероглифов
// var randkey = keylist[randnum];
// let anyItem = dict[randnum];

// var quiz001 =
// document.getElementById("quiz01");
// quiz001.innerHTML = randkey;


// //мешаю здесь значения иероглифов в отдельный список из 5 значений
// function shuffle(arra1) {
//     var ctr = arra1.length, temp, index;

// // While there are elements in the array
//     while (ctr > 0) {
// // Pick a random index
//         index = Math.floor(Math.random() * ctr);
// // Decrease ctr by 1
//         ctr--;
// // And swap the last element with it
//         temp = arra1[ctr];
//         arra1[ctr] = arra1[index];
//         arra1[index] = temp;
//     }
//     return arra1;
// };

// // перемешанные значения иероглифов
// shuffle(randvaluelist);

// // рандомный список ответов
// var options = randvaluelist.slice(0, 5);


// //проверяю есть ли ответ внутри списка ответов, если нет - добавляю и перемешиваю
// if (options.includes(valuelist[randnum]) == false ) {
// 	options.pop();
// 	options.push(valuelist[randnum]);
// 	options = shuffle(options);
// };

// // показываю список ответов
// 	optarr =
// 	document.getElementsByClassName("options01");
// 	for (var y = 0; y < 5; y++) {
// 	optarr[y].innerHTML = options[y];
// 	};

// };


// select = document.getElementById("inputGroupSelect01");
// select.onchange = function() {
// var myoptions = this.getElementsByTagName("option");
//     optionHTML = myoptions[this.selectedIndex].innerHTML;

// };


// quiz1();

// //****************

// function quiz2() {

// //рандомный иероглиф из списка иероглифов
// var randkey = keylist[randnum1];

// var quiz001 =
// document.getElementById("quiz02");
// quiz001.innerHTML = randkey;


// //мешаю здесь значения иероглифов в отдельный список из 5 значений
// function shuffle(arra1) {
//     var ctr = arra1.length, temp, index;

// // While there are elements in the array
//     while (ctr > 0) {
// // Pick a random index
//         index = Math.floor(Math.random() * ctr);
// // Decrease ctr by 1
//         ctr--;
// // And swap the last element with it
//         temp = arra1[ctr];
//         arra1[ctr] = arra1[index];
//         arra1[index] = temp;
//     }
//     return arra1;
// };

// // перемешанные значения иероглифов
// shuffle(randvaluelist);

// // рандомный список ответов
// var options = randvaluelist.slice(0, 5);


// //проверяю есть ли ответ внутри списка ответов, если нет - добавляю и перемешиваю
// if (options.includes(valuelist[randnum1]) == false ) {
// 	options.pop();
// 	options.push(valuelist[randnum1]);
// 	options = shuffle(options);
// };

// // показываю список ответов
// 	optarr =
// 	document.getElementsByClassName("options02");
// 	for (var y = 0; y < 5; y++) {
// 	optarr[y].innerHTML = options[y];
// 	};

// };


// select = document.getElementById("inputGroupSelect02");
// select.onchange = function() {
// var myoptions = this.getElementsByTagName("option");
//     optionHTML1 = myoptions[this.selectedIndex].innerHTML;

// };



// function checkIt() {
// var correctanswers = 0;
// 	if ( optionHTML == valuelist[randnum]) {
// 	document.getElementById("quiz01").style.backgroundColor = "green"
// 	document.getElementById("quiz01").style.color = "white"
// 	correctanswers += 1;
// 	} else {
// 	document.getElementById("quiz01").style.backgroundColor = "red"
// 	document.getElementById("quiz01").style.color = "white"
// 		};

// 	if ( optionHTML1 == valuelist[randnum1]) {
// 	document.getElementById("quiz02").style.backgroundColor = "green"
// 	document.getElementById("quiz02").style.color = "white"
// 	correctanswers += 1;
// 	} else {
// 	document.getElementById("quiz02").style.backgroundColor = "red"
// 	document.getElementById("quiz02").style.color = "white"
// 		};

// 	var answers =
// 	document.getElementById("uranswers");
// 	answers.innerHTML = "Верно " + correctanswers + " из 2";
// };

// //рандомное числ
// var randnum1 = Math.floor(Math.random() * x);

// quiz2();


