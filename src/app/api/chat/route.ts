import { createGoogleGenerativeAI} from '@ai-sdk/google';
import { generateText} from 'ai';
import axios from 'axios';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY
})
export async function POST(req:Response) {
    const { messages } = await req.json();
    const response = await generateText({
        model: google('gemini-1.5-flash'),
        messages
    });
    const limePrediction = await axios.post('http://localhost:5000/lime-prediction',{
        prediction : response
    })
    console.log(JSON.stringify(limePrediction.data));
    return new Response(JSON.stringify(limePrediction.data), {
        headers: { 'Content-Type': 'application/json' },
    });
}