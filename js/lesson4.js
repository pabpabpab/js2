'use strict';

//=======================================<Задание 1>=====================================
let str = "Язык 'JavaScript' называется так из-за популярности языка 'Java'";
let regExp = /'/g;
console.log(str.replace(regExp, '"'));
//=======================================</Задание 1>=====================================

//=======================================<Задание 2>======================================
let str2 = `One: 'Hi Mary.' Two: 'Oh, hi.'
One: 'How are you doing?'
Two: 'I'm doing alright. How about you?'
One: 'Not too bad. The weather is great isn't it?'
Two: 'Yes. It's absolutely beautiful today.'
One: 'I wish it was like this more frequently.'
Two: 'Me too.'
One: 'So where are you going now?'
Two: 'I'm going to meet a friend of mine at the department store'
One: 'Going to do a little shopping?'
Two: 'Yeah, I have to buy some presents for my parents.'
One: 'What's the occasion?'
Two: 'It's their anniversary.'
One: 'That's great. Well, you better get going. You don't want to be late.'
Two: 'I'll see you next time.'
One: 'Sure.' Bye.'`;

let regExp2 = /(?<=:\s+)'|'(?=\s*$)|'(?=\s+Two:)|'(?=\s+One:)/gm;
console.log(str2.replace(regExp2, '"'));


//тут еще попытки, которые для первой строки текста не работают
//let regExp3 = /:\s+'(.+)'(\s*)$/gm;
//let regExp3 = /:\s+'(.+)'(\s*)$|:\s+'(.+)'(\s+Two:)/gm;
//console.log(str2.replace(regExp3, ': "$1"$2'));
//=======================================</Задание 2>======================================