# CHRISS

CHRISS is a computerised, humanoid, real-time & intelligent support system with a couple cool features like analysing sentences, simulating human emotions, and much more!

## Installing
```
npm install chriss
```
## Setting up a basic bot

Here is how you create a bot that can reply to "Hello!":

```js
const { Bot } = require("chriss");

const name = "Test";
const responses = {
    0: [
        {
            input: ["hello"],
            output: ["Hello."],
            end: true,
        },
    ]
};

const bot = new Bot(name, responses);

console.log(bot.getResponse("hello"));
```
