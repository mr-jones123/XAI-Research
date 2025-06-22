"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

export default function BibTEX() {
  const [copied, setCopied] = useState(false)

  const bibtex = `@mastersthesis{Abong2025LIME,
  title={Assessing the Impact of LIME Algorithm on User Trust in an AI System through Explainable AI Visualizations},
  author={Abong, John Aiverson P. and Justiano, Janna Andrea G. and Lacap, Xynil Jhed and Mercado, Raphael Andre C.},
  school={FEU Institute of Technology},
  year={2025},
  note = {Bachelor's Thesis}
}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(bibtex)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">BibTeX Citation</CardTitle>
        <Button variant="outline" size="sm" onClick={copyToClipboard} className="h-8 px-2">
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-1" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed">
            <code className="font-mono">
              <span className="text-blue-400">@mastersthesis</span>
              <span className="text-slate-300">{"{"}</span>
              <span className="text-green-400">yourlastname2025clime</span>
              <span className="text-slate-300">,</span>
              {"\n  "}
              <span className="text-yellow-400">title</span>
              <span className="text-slate-300">=</span>
              <span className="text-slate-300">{"{"}</span>
              <span className="text-red-300">
                Assessing the Impact of LIME Algorithm on User Trust in an AI System through Explainable AI
                Visualizations
              </span>
              <span className="text-slate-300">{"}"}</span>
              <span className="text-slate-300">,</span>
              {"\n  "}
              <span className="text-yellow-400">author</span>
              <span className="text-slate-300">=</span>
              <span className="text-slate-300">{"{"}</span>
              <span className="text-red-300">
                Abong, John Aiverson P. and Justiano, Janna Andrea G. and Lacap, Xyril Jhed and Mercado, Raphael Andre
                C.
              </span>
              <span className="text-slate-300">{"}"}</span>
              <span className="text-slate-300">,</span>
              {"\n  "}
              <span className="text-yellow-400">school</span>
              <span className="text-slate-300">=</span>
              <span className="text-slate-300">{"{"}</span>
              <span className="text-red-300">IEEE Institute of Technology</span>
              <span className="text-slate-300">{"}"}</span>
              <span className="text-slate-300">,</span>
              {"\n  "}
              <span className="text-yellow-400">year</span>
              <span className="text-slate-300">=</span>
              <span className="text-slate-300">{"{"}</span>
              <span className="text-purple-400">2025</span>
              <span className="text-slate-300">{"}"}</span>
              {"\n"}
              <span className="text-slate-300">{"}"}</span>
            </code>
          </pre>
        </div>
      </CardContent>
    </Card>
  )
}
