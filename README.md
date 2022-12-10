# CHRISS

CHRISS is a computerised, humanoid, real-time & intelligent support system with a couple cool features like analysing sentences, simulating human emotions, and much more!

# Installing

npm install chriss

# Setting up a basic bot

const { Bot } = require("chriss");

const responses = {
	0: [
		{
			input: ["hello", "hello chriss", "hi", "hi chriss", "hey", "hey chriss", "yo", "yo chriss", "oi", "oi chriss", "ay", "ay chriss", "greetings", "greetings chriss", "howdy", "howdy chriss"],
			output: ["Hello there.", "Hello.", "Greetings.", "Hi.", "Howdy."],
			end: true,
		},
	]
}

const bot = new Bot("Saturn", responses);

console.log(bot.getResponse("hello"));