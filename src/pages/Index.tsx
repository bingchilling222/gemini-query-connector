
import { useState } from "react";
import QuestionInput from "@/components/QuestionInput";
import ResponseDisplay from "@/components/ResponseDisplay";
import ShopTable from "@/components/ShopTable";
import { generateGeminiResponse } from "@/lib/gemini";
import { toast } from "sonner";

const Index = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (newQuestion: string) => {
    setQuestion(newQuestion);
    setIsLoading(true);
    
    try {
      const answer = await generateGeminiResponse(newQuestion);
      setResponse(answer);
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to generate response"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30 flex flex-col items-center">
      <header className="w-full bg-white border-b border-border p-6 mb-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-medium text-center">Virtualus asistentas parduotuvių paieškai</h1>
        </div>
      </header>
      
      <main className="w-full max-w-3xl mx-auto px-4 pb-16 flex-1 flex flex-col">
        <div className="grid grid-cols-1 gap-8">
          <ShopTable />
          
          <div className="space-y-6">
            <ResponseDisplay 
              question={question} 
              response={response} 
              isLoading={isLoading} 
            />
            
            <QuestionInput onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
