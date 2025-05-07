import { Card, CardContent } from "./ui/card";

interface ExplanationPanelProps {
  aiDetails: {
    AIResponse: string;
    rawPredictions: number[];
    LIMEOutput: string;
  } | null;
}

export default function ExplanationPanel({ aiDetails }: ExplanationPanelProps) {
  if (!aiDetails) return null;

  return (
    <Card className="p-4">
      <CardContent>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold">AI Response</h2>
            <p>{aiDetails.AIResponse}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold">Prediction Output</h2>
            <p>{aiDetails.rawPredictions.map(prediction => prediction.toFixed(2)).join(", ")}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold">LIME Output</h2>
            <p>{aiDetails.LIMEOutput}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
