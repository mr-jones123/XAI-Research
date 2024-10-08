# Basics

JavaScript is one of the most important language you will learn as a developer. Almost all of the apps you use are made out of JavaScript. 

To understand frameworks like React, Angular.js, and Next.js, you must know the fundamentals of JavaScript. **You don't have to necessarily master ALL concepts, you just got to learn rudimentary stuff.**

And by basics concepts, I meant these: 
1. Scope
2. IIFE (Immediately Invoked Function Expression)
3. Hoisting
4. Closures
5. Callbacks
6. Promises
7. Async and Await

Check out more concepts below:

[Geeks4Geeks](https://www.geeksforgeeks.org/7-javascript-concepts-that-every-developer-must-know/)
[Dev.to](https://dev.to/vidova/33-javascript-concepts-every-beginner-should-know-with-tutorials-4kao)

# Why JavaScript?

To build websites, you must learn JavaScript first. This will be the start of your journey on becoming a Full-Stack Development, as learning JavaScript is beneficial (and a requirement) for both Front-end and Back-end developers.

## Front-end 
Here is a snippet of a web page `page.tsx`:
```typescript
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export const metadata = {
	
	title: "Omni.",
	
	description: "A chatbot that boosts productivity",

};

export default function Home() {

	return (

	<>

		<div className="min-h-[80dvh] flex justify-center items-center">
		
			<Card className="bg-white px-8">
		
				<CardHeader>
		
					<CardTitle className="text-7xl">Get Started with Omni.</CardTitle>
		
					<CardDescription className="text-3xl text-center">
		
				A chatbot that boosts your productivity.
		
					</CardDescription>
		
				</CardHeader>
		
			<CardContent className="flex justify-center">
		
				<Button>Get Started</Button>
		
			</CardContent>
		
		</Card>
		
		</div>

	</>

	);
}
```

This is a combined code of React and Typescript. Both are JavaScript Frameworks.

## Back-End

```javascript
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import express from "express";
import cors from "cors";
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Listening to Port: ${port}`);
});

app.post("/chat", async (req, res) => {
  try {
    const token = process.env["GITHUB_TOKEN"];
    const endpoint = "https://models.inference.ai.azure.com";
    const modelName = "meta-llama-3.1-70b-instruct";

    const client = new ModelClient(endpoint, new AzureKeyCredential(token));

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          {
            role: "system",
            content: "Use your knowledge base to help the user",
          },
          { role: "user", content: req.body.content },
        ],
        temperature: 1.0,
        top_p: 1.0,
        max_tokens: 1000,
        model: modelName,
      },
    });
    res.send(response);
    

  } catch (error) {
    console.error(error);
  }
});
```

This code uses `express.js` to handle POST request from the front-end, and then sends a response. 

Now these codes are not meant to intimidate you, but to give you a glanceT on what you can build with JavaScript. Soon, you will learn how these codes work.
# Now, start your own path
This file is just a heads-up for your path on learning the basics of JavaScript. It is way better to self-study. My advice to you while studying JavaScript is:
1. Be patient, as the syntax can get tricky at first.
2. Build what the tutorials you watch are building.
3. Stick to 1 or 2 resources only to save time.
4. No shame in using AI, just don't be a Copy and Paste pirate. [See this guide on how to use AI as a learning tool](learn..md).

Here are two resources you can use to start learning JS and earn a certificate:

[Full-stack JavaScript by the Odin Project](https://www.theodinproject.com/paths/full-stack-javascript)

[JavaScript Algorithms and Data Structures](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/)

