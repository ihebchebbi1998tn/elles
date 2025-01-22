import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Coffee, Shirt, Briefcase, Newspaper, Book, ShoppingBag } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { ProductCategory, UploadedImage, fonts } from "@/components/personalization/types";
import ProductSelector from "@/components/personalization/ProductSelector";
import CanvasContainer from "@/components/personalization/CanvasContainer";
import DesignTools from "@/components/personalization/DesignTools";
import ImageUploader from "@/components/personalization/ImageUploader";
import UploadedImagesList from "@/components/personalization/UploadedImagesList";
import ContentSection from "@/components/personalization/ContentSection";
import { Canvas, Text } from "fabric";

interface ContentItem {
  id: string;
  type: 'text' | 'image';
  content: string;
}

const productCategories: ProductCategory[] = [
  { id: 'mugs', name: 'Tasses', icon: Coffee },
  { id: 'tshirts', name: 'T-shirts', icon: Shirt },
  { id: 'blouses', name: 'Blouses de travail', icon: Briefcase },
  { id: 'flyers', name: 'Flyers', icon: Newspaper },
  { id: 'notebooks', name: 'Carnets', icon: Book },
  { id: 'bags', name: 'Sacs', icon: ShoppingBag },
];

const Personalization = () => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [text, setText] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [selectedFont, setSelectedFont] = useState("Montserrat");
  const [activeText, setActiveText] = useState<Text | null>(null);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [contentItems, setContentItems] = useState<ContentItem[]>(() => {
    const cached = localStorage.getItem('personalization-content');
    return cached ? JSON.parse(cached) : [];
  });
  const isMobile = useIsMobile();

  useEffect(() => {
    localStorage.setItem('personalization-content', JSON.stringify(contentItems));
  }, [contentItems]);

  const handleAddText = (newText: string) => {
    const newItem: ContentItem = {
      id: Date.now().toString(),
      type: 'text',
      content: newText
    };
    setContentItems(prev => [...prev, newItem]);
  };

  const handleAddImage = (image: UploadedImage) => {
    const newItem: ContentItem = {
      id: image.id,
      type: 'image',
      content: image.name
    };
    setContentItems(prev => [...prev, newItem]);
  };

  const handleDeleteItem = (id: string) => {
    setContentItems(prev => prev.filter(item => item.id !== id));
    handleDeleteActiveObject();
  };

  const handleSelectItem = (id: string) => {
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
  };

  const handleDeleteActiveObject = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.renderAll();
      
      if (activeObject.type === 'image') {
        const imageUrl = (activeObject as any)._element?.src;
        setUploadedImages(prev => prev.filter(img => img.url !== imageUrl));
      }
      
      if (activeObject.type === 'text') {
        setText('');
        setActiveText(null);
      }
      
      toast.success("Élément supprimé !");
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 lg:py-12 max-w-[100vw] overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-2">Personnalisation</h1>
          <p className="text-gray-600">Créez votre design unique en quelques clics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
          {/* Product Selection Sidebar */}
          <div className="lg:col-span-3 order-first">
            <ProductSelector
              categories={productCategories}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
            <div className="mt-4">
              <ContentSection
                items={contentItems}
                onDeleteItem={handleDeleteItem}
                onSelectItem={handleSelectItem}
              />
            </div>
          </div>

          {/* Canvas Area */}
          <div className="lg:col-span-6">
            <CanvasContainer
              canvas={canvas}
              setCanvas={setCanvas}
              isMobile={isMobile}
              text={text}
              selectedFont={selectedFont}
              onObjectDelete={handleDeleteActiveObject}
              selectedCategory={selectedCategory}
            />
          </div>

          {/* Design Tools */}
          <div className="lg:col-span-3">
            <Card className="p-4 lg:p-6 space-y-6">
              <div>
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
                />
              </div>

              <div className="pt-6 border-t border-gray-100">
                <div className="space-y-4">
                  <ImageUploader
                    canvas={canvas}
                    onImageUpload={(image) => {
                      handleAddImage(image);
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
                        obj => obj.type === 'image' && (obj as any)._element?.src === image.url
                      );
                      if (obj) {
                        canvas.setActiveObject(obj);
                        canvas.renderAll();
                      }
                    }}
                    onOpacityChange={(image, opacity) => {
                      if (!canvas) return;
                      const obj = canvas.getObjects().find(
                        obj => obj.type === 'image' && (obj as any)._element?.src === image.url
                      );
                      if (obj) {
                        obj.set('opacity', opacity);
                        canvas.renderAll();
                      }
                    }}
                    onDeleteImage={handleDeleteActiveObject}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personalization;
