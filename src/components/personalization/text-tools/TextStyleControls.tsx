import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Text } from "fabric";

interface TextStyleControlsProps {
  activeText: Text | null;
  onStyleUpdate: (property: string, value: any) => void;
}

const TextStyleControls = ({ activeText, onStyleUpdate }: TextStyleControlsProps) => {
  return (
    <div className="flex gap-2">
      <ToggleGroup type="multiple" className="justify-start bg-gray-50 p-1 rounded-md">
        <ToggleGroupItem 
          value="bold" 
          aria-label="Toggle bold"
          onClick={() => onStyleUpdate('fontWeight', activeText?.get('fontWeight') === 'bold' ? 'normal' : 'bold')}
          className="h-8 w-8 p-0 data-[state=on]:bg-white data-[state=on]:text-primary"
          data-state={activeText?.get('fontWeight') === 'bold' ? 'on' : 'off'}
        >
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="italic" 
          aria-label="Toggle italic"
          onClick={() => onStyleUpdate('fontStyle', activeText?.get('fontStyle') === 'italic' ? 'normal' : 'italic')}
          className="h-8 w-8 p-0 data-[state=on]:bg-white data-[state=on]:text-primary"
          data-state={activeText?.get('fontStyle') === 'italic' ? 'on' : 'off'}
        >
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="underline" 
          aria-label="Toggle underline"
          onClick={() => onStyleUpdate('underline', !activeText?.get('underline'))}
          className="h-8 w-8 p-0 data-[state=on]:bg-white data-[state=on]:text-primary"
          data-state={activeText?.get('underline') ? 'on' : 'off'}
        >
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup 
        type="single" 
        className="justify-start bg-gray-50 p-1 rounded-md"
        value={activeText?.get('textAlign') || 'left'}
        onValueChange={(value) => value && onStyleUpdate('textAlign', value)}
      >
        <ToggleGroupItem 
          value="left" 
          aria-label="Align left"
          className="h-8 w-8 p-0 data-[state=on]:bg-white data-[state=on]:text-primary"
        >
          <AlignLeft className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="center" 
          aria-label="Align center"
          className="h-8 w-8 p-0 data-[state=on]:bg-white data-[state=on]:text-primary"
        >
          <AlignCenter className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="right" 
          aria-label="Align right"
          className="h-8 w-8 p-0 data-[state=on]:bg-white data-[state=on]:text-primary"
        >
          <AlignRight className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default TextStyleControls;