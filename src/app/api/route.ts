import { NextRequest, NextResponse } from "next/server";
import Exa from "exa-js"

export async function POST(request: NextRequest){
    const { query } = await request.json();
    const exa = new Exa(process.env.EXASEARCH_API_KEY as string)
    const instructions = "Search the web for the most relevant news article to the query:"
    const data = await exa.searchAndContents(instructions + query,   {
        type: "keyword",
        numResults: 3,
      }
)

    const urls = data.results.map(result => result.url)
    return NextResponse.json(urls)
} 
