
import { Card } from "@/components/ui/card";

interface ResponseDisplayProps {
  question: string;
  response: string;
  isLoading: boolean;
}

const ResponseDisplay = ({ question, response, isLoading }: ResponseDisplayProps) => {
  if (!question && !response) return null;

  return (
    <div className="w-full transition-all duration-300 ease-in-out fade-in">
      <Card className="p-6 bg-white shadow-sm border border-border overflow-hidden">
        {question && (
          <div className="mb-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-2">
              Tavo užklausa
            </div>
            <p className="text-foreground font-medium">{question}</p>
          </div>
        )}
        
        {isLoading ? (
          <div className="mt-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-2">
              Atsakymas
            </div>
            <div className="h-6 bg-secondary rounded animate-pulse-subtle"></div>
            <div className="h-6 bg-secondary rounded animate-pulse-subtle mt-2 w-4/5"></div>
            <div className="h-6 bg-secondary rounded animate-pulse-subtle mt-2 w-5/6"></div>
          </div>
        ) : response ? (
          <div className="mt-4 slide-up">
            <div className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-2">
            Atsakymas
            </div>
            <div className="prose prose-sm max-w-none">
              {response.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-3">{paragraph}</p>
              ))}
            </div>
          </div>
        ) : null}
      </Card>
    </div>
  );
};

export default ResponseDisplay;
