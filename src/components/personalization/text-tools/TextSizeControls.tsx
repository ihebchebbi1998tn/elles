import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Text } from "fabric";

interface TextSizeControlsProps {
  activeText: Text | null;
  onSizeUpdate: (increase: boolean) => void;
}

const TextSizeControls = ({ activeText, onSizeUpdate }: TextSizeControlsProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        onClick={() => onSizeUpdate(false)} 
        size="icon" 
        variant="outline"
        className="h-8 w-8"
      >
        <ArrowDown className="h-4 w-4" />
      </Button>
      <Button 
        onClick={() => onSizeUpdate(true)} 
        size="icon" 
        variant="outline"
        className="h-8 w-8"
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TextSizeControls;