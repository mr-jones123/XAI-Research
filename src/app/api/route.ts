import { NextRequest, NextResponse } from "next/server";
import Exa from "exa-js"

export async function POST(request: NextRequest){
    const { query } = await request.json();
    const exa = new Exa(process.env.EXASEARCH_API_KEY as string)
    const instructions = "Search the web for the most relevant news article to the query:"
    const data = await exa.searchAndContents(instructions + query, {
        text: true,
        summary: true,
        numResults: 3
    })

    const results = data.results.map(result => ({
        title: result.title || "No title available",
        url: result.url,
        summary: result.summary || "No summary available"
    }))

    return NextResponse.json(results)
} 
