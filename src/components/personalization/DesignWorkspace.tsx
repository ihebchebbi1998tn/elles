import { Canvas, Text } from "fabric";
import CanvasContainer from "./CanvasContainer";
import DesignTools from "./DesignTools";
import ImageUploader from "./ImageUploader";
import UploadedImagesList from "./UploadedImagesList";
import ContentSection from "./ContentSection";
import DesignValidationDialog from "./DesignValidationDialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { UploadedImage } from "./types";
import { fonts } from "./types";
import { productZoneConfigs } from "./config/zoneConfig";
import { ContentItem } from "./types/contentItem";
import { useState } from "react";
import { products } from "@/config/productConfig"; // Add this import

interface DesignWorkspaceProps {
  canvas: Canvas | null;
  setCanvas: (canvas: Canvas | null) => void;
  text: string;
  setText: (text: string) => void;
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  activeText: Text | null;
  setActiveText: (text: Text | null) => void;
  uploadedImages: UploadedImage[];
  setUploadedImages: (images: UploadedImage[]) => void;
  contentItems: ContentItem[];
  setContentItems: (items: ContentItem[]) => void;
  selectedCategory: string | null;
  selectedSide: string;
  setSelectedSide: (side: string) => void;
  isMobile: boolean;
}

const DesignWorkspace = ({
  canvas,
  setCanvas,
  text,
  setText,
  selectedFont,
  setSelectedFont,
  textColor,
  setTextColor,
  activeText,
  setActiveText,
  uploadedImages,
  setUploadedImages,
  contentItems,
  setContentItems,
  selectedCategory,
  selectedSide,
  setSelectedSide,
  isMobile,
}: DesignWorkspaceProps) => {
  const [isValidationOpen, setIsValidationOpen] = useState(false);
  
  const handleDeleteActiveObject = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.renderAll();
      
      // Remove from uploadedImages if it's an image
      if (activeObject.type === 'image') {
        const imageUrl = (activeObject as any)._element?.src;
        const updatedImages = uploadedImages.filter(img => img.url !== imageUrl);
        setUploadedImages(updatedImages);
        
        // Remove from contentItems
        const updatedContentItems = contentItems.filter(item => 
          !(item.type === 'image' && item.content === imageUrl)
        );
        setContentItems(updatedContentItems);
      }
      
      // Remove from contentItems if it's text
      if (activeObject.type === 'text') {
        const textContent = (activeObject as Text).text;
        const updatedContentItems = contentItems.filter(item => 
          !(item.type === 'text' && item.content === textContent)
        );
        setContentItems(updatedContentItems);
        setText('');
        setActiveText(null);
      }
      
      toast.success("Élément supprimé !");
    }
  };

  const handleAddText = (newText: string) => {
    if (!canvas || !selectedCategory) return;

    const productZone = productZoneConfigs.find(zone => zone.id === selectedCategory);
    if (!productZone?.faces?.[0]?.zone) return;

    const zone = productZone.faces[0].zone;

    const fabricText = new Text(newText, {
      left: zone.left + zone.width / 2,
      top: zone.top + zone.height / 2,
      fontSize: 16,
      fill: "#000000",
      fontFamily: selectedFont,
      originX: 'center',
      originY: 'center',
      hasControls: true,
      hasBorders: true,
      lockUniScaling: false,
      transparentCorners: false,
      cornerColor: 'rgba(102,153,255,0.5)',
      cornerSize: 12,
      padding: 5
    });

    canvas.add(fabricText);
    canvas.setActiveObject(fabricText);
    canvas.renderAll();

    const newItem: ContentItem = {
      id: Date.now().toString(),
      type: 'text',
      content: newText
    };
    setContentItems([...contentItems, newItem]);
    setText('');
  };

  const handleValidateDesign = () => {
    if (!canvas || !selectedCategory) {
      toast.error("Veuillez d'abord créer un design");
      return;
    }

    const product = products.find(p => p.id === selectedCategory);
    if (!product) return;

    const textElements = canvas.getObjects('text').map((obj: Text) => ({
      content: obj.text || '',
      font: obj.fontFamily || '',
      color: obj.fill?.toString() || ''
    }));

    const designData = {
      productName: product.name,
      productType: product.description,
      canvasImage: canvas.toDataURL(),
      textElements,
      uploadedImages: uploadedImages.map(img => ({
        name: img.name,
        url: img.url
      }))
    };

    setIsValidationOpen(true);
    
    // Save to localStorage
    const designKey = `design-${Date.now()}`;
    localStorage.setItem(designKey, JSON.stringify(designData));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
      <div className="lg:col-span-3 space-y-4">
        <Card className="p-4 lg:p-6">
          <DesignTools
            text={text}
            setText={setText}
            selectedFont={selectedFont}
            setSelectedFont={setSelectedFont}
            textColor={textColor}
            setTextColor={setTextColor}
            activeText={activeText}
            canvas={canvas}
            fonts={fonts}
            onAddText={handleAddText}
            selectedCategory={selectedCategory}
          />

          <div className="pt-6 border-t border-gray-100 mt-6">
            <div className="space-y-4">
              <ImageUploader
                canvas={canvas}
                onImageUpload={(image) => {
                  const newItem: ContentItem = {
                    id: image.id,
                    type: 'image',
                    content: image.name
                  };
                  setContentItems([...contentItems, newItem]);
                  toast.success("Image ajoutée avec succès !");
                }}
                selectedCategory={selectedCategory}
              />
              <UploadedImagesList
                images={uploadedImages}
                canvas={canvas}
                onImageClick={(image) => {
                  if (!canvas) return;
                  const obj = canvas.getObjects().find(
                    (obj) => obj.type === "image" && (obj as any)._element?.src === image.url
                  );
                  if (obj) {
                    canvas.setActiveObject(obj);
                    canvas.renderAll();
                  }
                }}
                onOpacityChange={(image, opacity) => {
                  if (!canvas) return;
                  const obj = canvas.getObjects().find(
                    (obj) => obj.type === "image" && (obj as any)._element?.src === image.url
                  );
                  if (obj) {
                    obj.set("opacity", opacity);
                    canvas.renderAll();
                  }
                }}
                onDeleteImage={handleDeleteActiveObject}
              />
            </div>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-6">
        <CanvasContainer
          canvas={canvas}
          setCanvas={setCanvas}
          isMobile={isMobile}
          text={text}
          selectedFont={selectedFont}
          onObjectDelete={handleDeleteActiveObject}
          selectedCategory={selectedCategory}
          selectedSide={selectedSide}
          onSideSelect={setSelectedSide}
        />
        
        <div className="mt-6">
          <Button
            onClick={handleValidateDesign}
            className="w-full bg-green-500 hover:bg-green-600"
            size="lg"
          >
            <CheckCircle className="mr-2 h-5 w-5" />
            Valider mon design
          </Button>
        </div>
      </div>

      <div className="lg:col-span-3">
        <ContentSection
          items={contentItems}
          onDeleteItem={(id) => {
            const itemToDelete = contentItems.find(item => item.id === id);
            if (itemToDelete) {
              if (!canvas) return;
              
              const objectToDelete = canvas.getObjects().find(obj => {
                if (itemToDelete.type === 'text') {
                  return obj.type === 'text' && (obj as Text).text === itemToDelete.content;
                } else {
                  return obj.type === 'image' && (obj as any)._element?.src.includes(itemToDelete.content);
                }
              });

              if (objectToDelete) {
                canvas.setActiveObject(objectToDelete);
                canvas.renderAll();
                handleDeleteActiveObject();
              }
              
              setContentItems(contentItems.filter(item => item.id !== id));
            }
          }}
          onSelectItem={(id) => {
            if (!canvas) return;
            const item = contentItems.find(i => i.id === id);
            if (!item) return;

            const fabricObject = canvas.getObjects().find(obj => {
              if (item.type === 'text') {
                return obj.type === 'text' && (obj as Text).text === item.content;
              } else {
                return obj.type === 'image' && (obj as any)._element?.src.includes(item.content);
              }
            });

            if (fabricObject) {
              canvas.setActiveObject(fabricObject);
              canvas.renderAll();
            }
          }}
        />
      </div>

      <DesignValidationDialog
        open={isValidationOpen}
        onOpenChange={setIsValidationOpen}
        designData={canvas ? {
          productName: products.find(p => p.id === selectedCategory)?.name || '',
          productType: products.find(p => p.id === selectedCategory)?.description || '',
          canvasImage: canvas.toDataURL(),
          textElements: canvas.getObjects('text').map((obj: Text) => ({
            content: obj.text || '',
            font: obj.fontFamily || '',
            color: obj.fill?.toString() || ''
          })),
          uploadedImages: uploadedImages.map(img => ({
            name: img.name,
            url: img.url
          }))
        } : {
          productName: '',
          productType: '',
          canvasImage: '',
          textElements: [],
          uploadedImages: []
        }}
      />
    </div>
  );
};

export default DesignWorkspace;
