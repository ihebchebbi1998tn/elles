import { useEffect, useRef } from "react";
import { Canvas, Rect, Image as FabricImage } from "fabric";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { productZoneConfigs } from "./config/zoneConfig";
import { productSidesConfigs } from "./config/productSidesConfig";
import ProductSideSelector from "./ProductSideSelector";
import { toast } from "sonner";
import { productSideImages } from "./config/productSideImagesConfig";

interface CanvasContainerProps {
  canvas: Canvas | null;
  setCanvas: (canvas: Canvas | null) => void;
  isMobile: boolean;
  text: string;
  selectedFont: string;
  onObjectDelete: () => void;
  selectedCategory: string;
  selectedSide: string;
  onSideSelect: (sideId: string) => void;
}

const CanvasContainer = ({
  canvas,
  setCanvas,
  isMobile,
  text,
  selectedFont,
  onObjectDelete,
  selectedCategory,
  selectedSide,
  onSideSelect,
}: CanvasContainerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const productConfig = productSidesConfigs.find((config) => config.id === selectedCategory);
  const zoneConfig = productZoneConfigs.find((config) => config.id === selectedCategory);
  const productImages = productSideImages.find(p => p.productId === selectedCategory)?.sides || [];
  const currentSideImage = productImages.find(img => img.sideId === selectedSide);
  const currentZone = zoneConfig?.faces.find(face => face.sideId === selectedSide)?.zone;

  useEffect(() => {
    if (!canvasRef.current) return;

    // Clean up existing canvas
    if (canvas) {
      canvas.dispose();
      setCanvas(null);
    }

    const newCanvas = new Canvas(canvasRef.current, {
      width: isMobile ? 350 : 500,
      height: isMobile ? 350 : 500,
      backgroundColor: "#ffffff",
      preserveObjectStacking: true,
    });

    // Add background image if available
    if (currentSideImage?.imageUrl) {
      FabricImage.fromURL(currentSideImage.imageUrl, {
        crossOrigin: 'anonymous'
      }).then((img) => {
        img.scaleToWidth(newCanvas.width!);
        img.scaleToHeight(newCanvas.height!);
        img.set({
          selectable: false,
          evented: false,
        });
        newCanvas.backgroundImage = img;
        
        // Add customization zone after background image is loaded
        if (currentZone) {
          const zone = new Rect({
            left: currentZone.left,
            top: currentZone.top,
            width: currentZone.width,
            height: currentZone.height,
            fill: currentZone.backgroundColor,
            stroke: currentZone.borderColor,
            strokeWidth: currentZone.borderWidth,
            strokeDashArray: [6, 6],
            selectable: false,
            evented: false,
          });
          newCanvas.add(zone);
          newCanvas.renderAll();
        }
      });
    } else {
      // If no background image, just add the zone
      if (currentZone) {
        const zone = new Rect({
          left: currentZone.left,
          top: currentZone.top,
          width: currentZone.width,
          height: currentZone.height,
          fill: currentZone.backgroundColor,
          stroke: currentZone.borderColor,
          strokeWidth: currentZone.borderWidth,
          strokeDashArray: [6, 6],
          selectable: false,
          evented: false,
        });
        newCanvas.add(zone);
        newCanvas.renderAll();
      }
    }

    setCanvas(newCanvas);
    toast.success("Zone de personnalisation prête !");

    return () => {
      newCanvas.dispose();
    };
  }, [selectedCategory, selectedSide, isMobile]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      onObjectDelete();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onObjectDelete]);

  return (
    <div className="space-y-4">
      <ProductSideSelector
        sides={productConfig?.sides || []}
        activeSide={selectedSide}
        onSideSelect={onSideSelect}
        selectedCategory={selectedCategory}
      />
      <Card className="p-4 relative">
        <div className="flex justify-center">
          <canvas ref={canvasRef} className="border border-gray-200 rounded-lg" />
        </div>
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-4 right-4"
          onClick={onObjectDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </Card>
    </div>
  );
};

export default CanvasContainer;