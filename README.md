# CHRISS

CHRISS is a computerised, humanoid, real-time & intelligent support system with a couple cool features like analysing sentences, simulating human emotions, and much more!

## Installing
```
npm install chriss
```
## Setting up a basic bot

```js
const { Bot } = require("chriss");

const name = "Test";
const responses = {
	0: [
		{
			input: ["hello", "hi", "hey", "greetings"],
			output: ["Hello there.", "Hello.", "Greetings.", "Hi."],
			end: true,
		},
	]
};

const bot = new Bot(name, responses);

console.log(bot.getResponse("hello"));
```
