function randomFromArray(array) {
	if (array == null) {
		return;
	} else {
		return array[Math.floor(Math.random() * array.length)];
	}
}

class Sentence {
	/**
	 * @param {Boolean} isSentence 
	 * @param {Boolean} isNegative 
	 * @param {Boolean} questionWord 
	 * @param {String} isQuestion 
	 * @param {String} verb 
	 * @param {String} subject 
	 * @param {String} directObject 
	 * @param {String} keyWord 
	 */
	constructor(isSentence, isNegative, questionWord, isQuestion, verb, subject, directObject, keyWord) {
		this.isSentence = isSentence;
		this.isNegative = isNegative;
		this.isQuestion = isQuestion;
		this.questionWord = questionWord;
		this.verb = verb;
		this.subject = subject;
		this.directObject = directObject;
		this.keyWord = keyWord;
	}
}

export class Input {
	constructor(isSentence, isNegative, isQuestion, questionWord, verbs, subjects, directObjects) {
		this.isSentence = isSentence;      // Bool
		this.isNegative = isNegative;      // Bool
		this.isQuestion = isQuestion;      // Bool
		this.questionWord = questionWord;  // String
		this.verbs = verbs;                // List
		this.subjects = subjects;          // List
		this.directObjects = directObjects;// List
	}
}

export class Preferences {
	/**
	 * @param {Array} likes 
	 * @param {Array} dislikes 
	 */
	constructor(likes, dislikes) {
		this.likes = likes;
		this.dislikes = dislikes;
	}
}

export class Vocabulary {
	default() {
		this.questionWords = ["what", "when", "which", "who", "where", "why", "how", "whose"],
		this.verbs = {
			"to be": ["am", "are", "is", "was", "were", "being", "been"],
			"to do": ["do", "does", "did", "doing", "done"],
			"to have": ["have", "has", "had", "having"],
			"to tell": ["tell", "tells", "told", "telling"],
			"to mean": ["mean", "means", "meant", "meaning"],
			"to love": ["love", "loves", "loved", "loving"], 
			"to like": ["like", "likes", "liked", "liking"], 
			"to adore": ["adore", "adores", "adored", "adoring"], 
			"to admire": ["admire", "admires", "admired", "admiring"],
			"to make": ["make", "makes", "made", "making"],
			"to create": ["create", "creates", "created", "creating"],
			"to work": ["work", "works", "worked", "working",],
			"to hate": ["hate", "hates", "hated", "hating",],
			"to dislike": ["dislike", "dislikes", "disliked", "disliking",],
			"to let": ["let", "lets", "letting"],
			"to play": ["play", "plays", "played", "playing"],
			"to take": ["take", "takes", "taking", "taken"],
			"to know": ["know", "knows", "knowing", "known"]
		}
		this.subjects = ["i", "you", "it", "us", "that", "she", "he"]
		this.directObjects = ["me", "you", "them", "him", "her"]
		this.possessivePronouns = ["my", "your", "its", "their", "his", "her"]
		this.articles = ["a", "an", "the", "any", "some"]
		this.negations = ["not"]
		this.keyWords = {
			"yes": ["yes", "yes i am", "hell yeah", "yeah", "positive", "100%", "of course", "by all means", "sure", "certainly", "absolutely", "affirmative"],
			"no": ["no", "no i am not", "hell no", "not really", "i guess not", "negative", "of course not", "most certainly not", "certainly not", "absolutely not", "by no means", "never"],
			"insults": ["fat", "ugly", "stupid", "dumb", "slow"],
			"compliments": ["good", "beautiful", "smart", "clever", "intelligent", "fast", "pretty", "cool", "nice", "amazing", "wonderful", "impressive"],
			"ready": ["ready", "done", "set"],
		}
		this.prepositions = ["to", "in", "into", "on", "onto", "at", "unto"]
		this.adjectives = ["crumbling"]
		this.abbreviations = {
			"wtf": "what the fuck",
			"wdym": "what do you mean",
			"wym": "what do you mean",
			"wth": "what the heck",
			"hry": "how are you",
			"hru": "how are you",
			"tf": "the fuck",
			"ig": "i guess",
			"idk": "i do not know",
			"ur": "you are"
		}

		return this;
	}

	addQuestionWord(questionWord) {
		this.questionWords.push(questionWord);
		return this;
	}
	addSubject(subject) {
		this.subjects.push(subject);
		return this;
	}
	addDirectObject(directObject) {
		this.directObjects.push(directObject);
		return this;
	}
	addPossessivePronoun(possessivePronoun) {
		this.possessivePronouns.push(possessivePronoun);
		return this;
	}
	addArticle(article) {
		this.articles.push(article);
		return this;
	}
	addNegation(negation) {
		this.negations.push(negation);
		return this;
	}
	addKeyWord(keyWord) {
		this.keyWords.push(keyWord);
		return this;
	}
	addPrepositions(preposition) {
		this.prepositions.push(preposition);
		return this;
	}
	addAdjective(adjective) {
		this.adjectives.push(adjective);
		return this;
	}
	addAbbreviation(abbreviation) {
		this.abbreviations.push(abbreviation);
		return this;
	}
}

export class Bot {
	constructor(name, responses) {
		this.name = name;
		this.responses = responses;

		this.preferences = new Preferences();
		this.vocabulary = new Vocabulary().default();

		this.setNoResponseMessages([
			"Sorry, I didn't understand your message. Try reformatting it.",
			"Try reformatting your message.",
			"Sorry, I didn't understand your message.",
			"I don't know how to respond to that message.",
			"What do you mean?"
		]);

		this.setNoQuestionReponseMessages([
			"Sorry, I don't have an answer to that question.",
			"Sorry, I don't know the answer to that question.",
			"I don't know.",
			"I don't know how to answer that."
		]);

		this.setErrorMessages([
			"Oh no! An error occured!",
			"Oh no! I have encountered an error!"
		]);

		this.context = 0;

		this.currentMood = "happy";
		this.moods = {
			"happy": 100,
			"sad": 0,
			"angry": 0,
			"scared": 0,
		};
	}

	setName(name) {
		this.name = name;
		return this;
	}

	setNoResponseMessages(messages) {
		this.noResponseMessages = messages;
		return this;
	}

	setNoQuestionReponseMessages(messages) {
		this.noQuestionResponseMessages = messages;
		return this;
	}

	setErrorMessages(messages) {
		this.errorMessages = messages;
		return this;
	}

	affectMood(mood, amount) {
		// TO DO: Percentages should be calculated to form a total of 100%
		Object.keys(this.moods).forEach((key) => {
			if (key != mood)
			{
				this.moods[key] -= amount;

				if (this.moods[key] < 0)
					this.moods[key] = 0;
			} else {
				this.moods[key] += amount;

				if (this.moods[key] > 100)
					this.moods[key] = 100;
			}
		});

		let maxKey, maxValue = 0;
		for (const [key, value] of Object.entries(this.moods)) {
			if (value > maxValue) {
				maxValue = value;
				maxKey = key;
			}
		}

		// Check if mood has changed
		if (maxKey != this.currentMood)
			this.currentMood = maxKey;
	}

	findResponse(candidateResponses, input, analysedInput) {
		let response = null;
	
		candidateResponses.forEach(element => {
			let inputs = element.input;
	
			// Dynamic input
			switch (inputs) {
				case "{positive}":
					inputs = this.vocabulary.keyWords.yes;
					break;
				case "{negative}":
					inputs = this.vocabulary.keyWords.no;
					break;
			}
	
			// Check if response input is equal to user input
			inputs.forEach(inputSentence => {
				let rightResponse = true;
	
				if (inputSentence.keyWords != null)
					switch (inputSentence.keyWords) {
						case "{compliment}":
							inputSentence.keyWords = this.vocabulary.keyWords.compliments;
							break;
						case "{insult}":
							inputSentence.keyWords = this.vocabulary.keyWords.insults;
							break;
						case "{ready}":
							inputSentence.keyWords = this.vocabulary.keyWords.ready;
							break;
					}
	
				// Handle new input system
				if ((inputSentence.isSentence != null && inputSentence.isSentence != analysedInput.isSentence) ||
					(inputSentence.isNegative != null && inputSentence.isNegative != analysedInput.isNegative) ||
					(inputSentence.questionWord != null && inputSentence.questionWord != analysedInput.questionWord) ||
					(inputSentence.isQuestion != null && inputSentence.isQuestion != analysedInput.isQuestion) ||
					(inputSentence.verbs != null && !inputSentence.verbs.includes(analysedInput.verb)) ||
					(inputSentence.subjects != null && !inputSentence.subjects.includes(analysedInput.subject)) ||
					(inputSentence.directObjects != null && !inputSentence.directObjects.includes(analysedInput.directObject)) ||
					(inputSentence.keyWords != null && !inputSentence.keyWords.includes(analysedInput.keyWord)))
				{
					rightResponse = false;
				}
	
				// Handle old input system
				if (inputSentence.isQuestion == null && inputSentence.isSentence == null && inputSentence.verbs == null && 
					inputSentence.subject == null && inputSentence.keyWord == null)
				{
					rightResponse = false;
					if (inputs.length > 0 && inputs.includes(input) || inputs == input)
						response = element;
				}
	
				if (rightResponse)
					response = element;
			});
		});;
	
		return response;
	}

	analyseSentence(input) {
		let sentence = new Sentence();
		const words = input.replace("?", "").split(" ").filter(word => !this.vocabulary.articles.includes(word));
	
		// Check if sentence is a full sentence
		sentence.isSentence = words.length > 2 ? true : false;
		sentence.isNegative = false;
		// Check if sentence is a question 
		sentence.isQuestion = input.includes("?") ? true : false;
	
		// Word after to be in non-question is keyWord
	
		for (let i = 0; i < words.length; i++) {
			// Get question word
			if (sentence.questionWord == null && this.vocabulary.questionWords.includes(words[i])) {
				sentence.questionWord = words[i];
				sentence.isQuestion = true;
				continue;
			}
	
			// Get subject
			if (sentence.subject == null)
				if (this.vocabulary.subjects.includes(words[i])) {
					sentence.subject = words[i];
					continue;
				} else if (this.vocabulary.possessivePronouns.includes(words[i])) {
					sentence.subject = words[i] + " " + words[i + 1]; // Ex.: Your name
					i++;
					continue;
				} else if (this.vocabulary.prepositions.includes(words[i])) {
					sentence.subject = words[i] + " " + words[i + 1]; // Ex.: To the home page
					i++;
					continue;
				}
			
			// Get verb
			let isVerb = false;
			for (const [key, value] of Object.entries(this.vocabulary.verbs)) {
				if (value.includes(words[i])) {
					sentence.verb = key;
					isVerb = true;
					continue;
				}
			};
	
			// Get direct object
			if (sentence.directObject == null && (this.vocabulary.directObjects.includes(words[i]) || 
				(i == 1 && sentence.questionWord != null) || 
				(sentence.isQuestion && this.vocabulary.verbs["to have"].includes(words[i - 1])))) 
			{
				sentence.directObject = words[i];
				continue;
			}
	
			// Get key word
			if (sentence.keyWord == null && !sentence.isQuestion && this.vocabulary.verbs["to be"].includes(words[i - 1])) {
				sentence.keyWord = words[i];
				continue;
			}
	
			// Check if sentence is negative
			if (this.vocabulary.negations.includes(words[i])) {
				sentence.isNegative = true;
				continue;		
			}
	
			if (!isVerb && sentence.subject == words[i - 1]) {
				sentence.keyWord = words[i];
				continue;
			}
		};
	
		return sentence;
	}

	getResponse(input) {
		// Clean input string
		let cleanInput = input.toLowerCase()
			.split("!").join("")
			.split(".").join("")
			.split(",").join("")
			.split("/[\u2018\u2019]/g").join("'")
			.split("let's").join("let us")
			.split("'s").join(" is")
			.split("'re").join(" are")
			.split("'m").join(" am")
			.split("n't").join(" not")
			.trim();

		// Remove abbreviations
		cleanInput = cleanInput.split(" ").map((word) => {
			if (Object.keys(this.vocabulary.abbreviations).includes(word)) {
				return this.vocabulary.abbreviations[word];
			} else {
				return word;
			}
		}).join(" ");

		const analysedInput = this.analyseSentence(cleanInput);
	
		let output;

		try {
			let candidateResponses = [];
			if (this.responses[this.context] != null)
				candidateResponses = this.responses[this.context];
	
			// Add responses from no context
			if (this.context != 0)
				this.responses[0].forEach(element => {
					candidateResponses.push(element);
				});
	
			// Get response
			let response = this.findResponse(candidateResponses, cleanInput, analysedInput);
	
			if (response == null) {
				// Handle questions without a question mark
				const alteredAnalysedInput = new Sentence(true, analysedInput.isNegative, analysedInput.questionWord, true, analysedInput.verb, analysedInput.subject, analysedInput.directObject, analysedInput.keyWord);
				response = this.findResponse(candidateResponses, cleanInput, alteredAnalysedInput);
	
				if (response == null) {
					// Handle sentences where the verb "to be" is left out
					alteredAnalysedInput.verb = "to be";
					response = this.findResponse(candidateResponses, cleanInput, alteredAnalysedInput);
				}
			}
	
			// Check if there are no responses found
			if (response == null) {
				if (analysedInput.isSentence) {
					if (!analysedInput.isQuestion) {
						output = randomFromArray(this.noResponseMessages);
					} else {
						output = randomFromArray(this.noQuestionResponseMessages);
					}
				}
			} else {
				// Update context
				if (response == null || response.end) {
					this.context = 0;
				} else if (response.id != null) {
					this.context = response.id;
				}
		
				// Update mood
				if (response.mood != null) {
					this.affectMood(response.mood, 100);
				} else if (!response.dontAffectMood) {
					this.affectMood("happy", 10);
				}
		
				// Get ouput
				output = randomFromArray(this.noResponseMessages);
		
				if (analysedInput.isQuestion) {
					output = randomFromArray(this.noQuestionResponseMessages);
				}
		
				if (response != null) {
					if (this.currentMood != "happy" && response.moodyOutput != null && response.moodyOutput[this.currentMood] != null)
					{
						output = response.moodyOutput[this.currentMood];
					} else {
						output = response.output;
					}
		
					if (Array.isArray(output))
						output = randomFromArray(output);
				}
		
				if (response.function != null)
					response.function.call();
			}
		} catch (error) {
			console.log(error);

			// Reset
			this.context = 0;
	
			this.moods["happy"] = 100;
			this.moods["sad"] = 0;
			this.moods["angry"] = 0;
			this.moods["scared"] = 0;
	
			output = randomFromArray(this.errorMessages);
		}

		return { output, input: { content: cleanInput, analysis: analysedInput }, mood: this.moods, context: this.context };
	}
}