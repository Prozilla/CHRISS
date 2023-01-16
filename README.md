# CHRISS

CHRISS is an advanced chatbot system with cool features like analysing sentences, simulating human emotions, and much more!

## Installing
```bash
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
Output:
```js
{
  output: 'Hi.',
  input: {
    content: 'hello',
    analysis: Sentence {
      isSentence: false,
      isNegative: false,
      isQuestion: false,
      questionWord: undefined,
      verb: undefined,
      subject: undefined,
      directObject: undefined,
      keyWord: 'hello'
    }
  },
  mood: { happy: 100, sad: 0, angry: 0, scared: 0 },
  context: 0
}
```
