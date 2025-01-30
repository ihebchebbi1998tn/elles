import { Plus, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Canvas, Text } from "fabric";
import { toast } from "sonner";
import TextStyleControls from "./text-tools/TextStyleControls";
import TextSizeControls from "./text-tools/TextSizeControls";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DesignToolsProps {
  text: string;
  setText: (text: string) => void;
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  activeText: Text | null;
  canvas: Canvas | null;
  fonts: Array<{ name: string; value: string }>;
  onAddText: (text: string) => void;
  selectedCategory: string | null;
}

const DesignTools = ({
  text,
  setText,
  selectedFont,
  setSelectedFont,
  textColor,
  setTextColor,
  activeText,
  canvas,
  fonts,
  onAddText,
  selectedCategory,
}: DesignToolsProps) => {
  const updateTextStyle = (property: string, value: any) => {
    if (!canvas) return;
    
    if (activeText) {
      // Update existing text on canvas
      activeText.set(property, value);
      canvas.renderAll();
    }
    
    // Update corresponding state
    switch(property) {
      case 'fontFamily':
        setSelectedFont(value);
        break;
      case 'fill':
        setTextColor(value);
        break;
      case 'text':
        setText(value);
        break;
    }

    toast.success("Style mis à jour !");
  };

  const handleFontChange = (value: string) => {
    updateTextStyle('fontFamily', value);
  };

  const handleColorChange = (color: string) => {
    updateTextStyle('fill', color);
  };

  const adjustTextSize = (increase: boolean) => {
    if (!canvas || !activeText) return;
    const currentSize = activeText.get('fontSize') || 16;
    const newSize = increase ? currentSize + 2 : currentSize - 2;
    if (newSize >= 8 && newSize <= 72) {
      updateTextStyle('fontSize', newSize);
    }
  };

  const handleTextInput = (value: string) => {
    if (value.length <= 30) {
      setText(value);
      if (activeText) {
        updateTextStyle('text', value);
      }
    }
  };

  const handleAddOrUpdateText = () => {
    if (!selectedCategory) {
      toast.error("Veuillez sélectionner un produit d'abord");
      return;
    }

    if (text.trim()) {
      if (activeText) {
        updateTextStyle('text', text);
        setText('');
        toast.success("Texte mis à jour avec succès !");
      } else {
        const newText = text;
        onAddText(newText);
        setText('');
        toast.success("Texte ajouté avec succès !");
      }
    } else {
      toast.error("Veuillez entrer du texte avant d'ajouter");
    }
  };

  return (
    <div className="space-y-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-medium text-gray-700">Texte</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Info className="h-4 w-4 text-gray-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent 
                className="bg-white border border-gray-200 shadow-lg p-4 rounded-lg max-w-[300px] z-50"
                sideOffset={5}
              >
                <div className="space-y-2 text-gray-700">
                  <p className="font-medium">Comment utiliser le texte :</p>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Tapez votre texte (max 30 caractères)</li>
                    <li>Personnalisez le style avant d'ajouter</li>
                    <li>Cliquez sur + pour ajouter</li>
                    <li>Cliquez sur un texte existant pour le modifier</li>
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex gap-2">
          <Input
            value={text}
            onChange={(e) => handleTextInput(e.target.value)}
            placeholder={text ? undefined : "Tapez votre texte... (max 30 caractères)"}
            className="flex-1 h-9 text-sm"
            maxLength={30}
            disabled={!selectedCategory}
          />
          <Button
            onClick={handleAddOrUpdateText}
            variant="outline"
            size="icon"
            className="h-9 w-9 shrink-0"
            disabled={!selectedCategory}
          >
            {activeText ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-700">Police</Label>
            <Select value={selectedFont} onValueChange={handleFontChange}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Choisir une police" />
              </SelectTrigger>
              <SelectContent>
                {fonts.map((font) => (
                  <SelectItem 
                    key={font.value} 
                    value={font.value}
                    style={{ fontFamily: font.value }}
                    className="text-sm"
                  >
                    {font.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-700">Couleur</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={textColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-full h-9 p-1 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">Style du Texte</Label>
          <TextStyleControls 
            activeText={activeText}
            onStyleUpdate={updateTextStyle}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">Taille du Texte</Label>
          <TextSizeControls 
            activeText={activeText}
            onSizeUpdate={adjustTextSize}
          />
        </div>
      </div>
    </div>
  );
};

export default DesignTools;