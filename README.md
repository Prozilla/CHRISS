# CHRISS

CHRISS is a computerised, humanoid, real-time & intelligent support system that has been expanded into a multipurpose chatbot system, made by Prozilla.

Using CHRISS you can create your own intuitive chatbot for your website, Discord bot or anything else that can import npm packages!

Some of its most outstanding features are: advanced sentence analysis that can understand gramatically incorrect sentences, the simulation of human emotions to make chatting more fun, high customizability that lets you change everything about the bot, ranging from a simple name to an entire vocabulary of words.

## Installing

```BASH
npm install chriss
```

## Setting up a basic bot

Follow this small step by step guide to create a simple bot that can greet users:

1. Create bot.js and write the following code inside:

```JS
// bot.js
import { Bot } from "chriss";

const name = "Example bot";
const responses = {
	// The key of the objects in this dictionary refer to the context value, this will be explained in detail later on
    0: [
        {
            input: ["hello"], // User input (case-insensitive)
            output: ["Hello."], // Bot ouput
            end: true, // This indicates the end of a conversation
        },
    ]
};

export const bot = new Bot(name, responses);
```

2. Create index.js and write the following code inside:

```JS
// index.js
import { bot } from "bot.js";

// In a real bot, the following code would run every time the user sends a message,
// where input refers to the user's input and response to the bot's output, which is then sent back to the user
const input = "hello";
const response = bot.getResponse(input); 

// Log the response to the output
console.log(response);
```

3. To test your brand new bot, run the following command:

```bash
node index.js
```

4. You will see the following output logged to the console:

```js
{
	output: "Hi.",
	input: {
		content: "hello",
		analysis: Sentence {
			isSentence: false,
			isNegative: false,
			isQuestion: false,
			questionWord: undefined,
			verb: undefined,
			subject: undefined,
			directObject: undefined,
			keyWord: "hello"
		}
	},
	mood: { happy: 100, sad: 0, angry: 0, scared: 0 },
	context: 0
}
```