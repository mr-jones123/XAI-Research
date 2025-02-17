import { createGoogleGenerativeAI} from '@ai-sdk/google';
import { streamText} from 'ai';
import axios from 'axios';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY
})
export async function POST(req:Response) {
    const { messages } = await req.json();
    const response = await streamText   ({
        model: google('gemini-1.5-flash'),
        messages
    });
    const limePrediction = await axios.post('http://localhost:5000/lime-prediction',{
        prediction : response
    })

    return response.toDataStreamResponse();
}