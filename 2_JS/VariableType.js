var fullName = "Jerick Royce Cumayas"
console.log(fullName);
console.log(`The variable ${fullName} is of type ${typeof fullName}.\n`);

var studentID = 2017010570;
console.log(studentID);
console.log(`The variable ${studentID} is of type ${typeof studentID}.\n`);

var numbers = [1, 2, 3, 4, 5];
console.log(numbers);
console.log(`The variale ${numbers} is of type ${typeof numbers}.\n`);

var birthMonth = "August";
var January = "January";
var August = "August";
console.log(`Birthmonth: ${birthMonth}`);
console.log(`January: ${January}`);
console.log(`August: ${August}`);
console.log(`Is January equal to my birthmonth? ${January==birthMonth}.`);
console.log(`Is August equal to my birthmonth? ${birthMonth==August}.\n`);

var projectIdea;
console.log(projectIdea);
console.log(`The variable projectIdea is ${typeof projectIdea}.\n`);

var nextNode = null;
console.log(nextNode);
console.log(`The variable nextNode has the value ${nextNode}.\n`);

var randomObjects = { one: "pencil", "two": "notebook", three: [5] };
console.log(randomObjects);
randomObjects.four = "Helooo";
console.log(randomObjects);
randomObjects["Wow"] = 1;
console.log(randomObjects);
console.log(`The variable ${randomObjects.one} is of type ${typeof randomObjects.one}.`);