
import { useState, KeyboardEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
}

const QuestionInput = ({ onSubmit, isLoading }: QuestionInputProps) => {
  const [question, setQuestion] = useState("");

  const handleSubmit = () => {
    if (question.trim() && !isLoading) {
      onSubmit(question);
      setQuestion("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="relative">
        <Textarea
          value={question}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          className="pr-14 min-h-[100px] text-base resize-none bg-white border border-border focus:ring-1 focus:ring-primary/20 transition-all duration-200"
          disabled={isLoading}
        />
        <Button
          onClick={handleSubmit}
          disabled={isLoading || !question.trim()}
          className="absolute bottom-3 right-3 h-9 w-9 p-0 rounded-full"
          aria-label="Send message"
        >
          <Send size={18} className="text-primary-foreground" />
        </Button>
      </div>
      <div className="text-xs text-muted-foreground text-right">
        Press Enter to submit, Shift+Enter for new line
      </div>
    </div>
  );
};

export default QuestionInput;
