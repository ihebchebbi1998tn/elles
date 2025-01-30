import { useState, useEffect } from "react";
import { Canvas, Text } from "fabric";
import { toast } from "sonner";
import { ProductCategory, UploadedImage } from "@/components/personalization/types";
import ProductCarousel from "@/components/personalization/ProductCarousel";
import MinimizedProductCarousel from "@/components/personalization/MinimizedProductCarousel";
import PersonalizationHero from "@/components/personalization/PersonalizationHero";
import LoadingScreen from "@/components/LoadingScreen";
import { useIsMobile } from "@/hooks/use-mobile";
import { products } from "@/config/products";
import PersonalizationHeader from "@/components/personalization/PersonalizationHeader";
import DesignWorkspace from "@/components/personalization/DesignWorkspace";

// Convert products config to ProductCategory type
const productCategories: ProductCategory[] = products.map(product => ({
  id: product.id,
  name: product.name,
  description: product.description,
  startingPrice: product.startingPrice
}));

const Personalization = () => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [text, setText] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [selectedFont, setSelectedFont] = useState("Montserrat");
  const [activeText, setActiveText] = useState<Text | null>(null);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [contentItems, setContentItems] = useState<any[]>(() => {
    const cached = localStorage.getItem('personalization-content');
    return cached ? JSON.parse(cached) : [];
  });
  const [selectedSide, setSelectedSide] = useState<string>('front');
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    localStorage.setItem('personalization-content', JSON.stringify(contentItems));
  }, [contentItems]);

  const handleCategorySelect = (categoryId: string) => {
    setIsLoading(true);
    setSelectedCategory(categoryId);
    
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setContentItems([]);
    setUploadedImages([]);
    setText("");
    setActiveText(null);
    if (canvas) {
      canvas.clear();
      canvas.renderAll();
    }
  };

  return (
    <div className="max-w-[100vw] overflow-x-hidden">
      {!selectedCategory && <PersonalizationHero />}
      
      <div className="container mx-auto py-6 px-4 lg:py-12">
        <div className="max-w-[1600px] mx-auto">
          {!selectedCategory ? (
            <ProductCarousel
              categories={productCategories}
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />
          ) : (
            <>
              {isLoading ? (
                <div className="min-h-[60vh] flex flex-col items-center justify-center">
                  <LoadingScreen />
                </div>
              ) : (
                <>
                  <PersonalizationHeader 
                    selectedCategory={selectedCategory}
                    onBack={handleBack}
                  />
                  
                  <MinimizedProductCarousel
                    products={products}
                    selectedProduct={selectedCategory}
                    onProductSelect={setSelectedCategory}
                  />

                  <DesignWorkspace
                    canvas={canvas}
                    setCanvas={setCanvas}
                    text={text}
                    setText={setText}
                    selectedFont={selectedFont}
                    setSelectedFont={setSelectedFont}
                    textColor={textColor}
                    setTextColor={setTextColor}
                    activeText={activeText}
                    setActiveText={setActiveText}
                    uploadedImages={uploadedImages}
                    setUploadedImages={setUploadedImages}
                    contentItems={contentItems}
                    setContentItems={setContentItems}
                    selectedCategory={selectedCategory}
                    selectedSide={selectedSide}
                    setSelectedSide={setSelectedSide}
                    isMobile={isMobile}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Personalization;