import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, ShoppingCart, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../cart/CartProvider";
import { CartItem } from "@/types/cart";

interface DesignValidationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  designData: {
    productName: string;
    productType: string;
    canvasImage: string;
    textElements: Array<{
      content: string;
      font: string;
      color: string;
    }>;
    uploadedImages: Array<{
      name: string;
      url: string;
    }>;
  };
}

const DesignValidationDialog = ({
  open,
  onOpenChange,
  designData,
}: DesignValidationDialogProps) => {
  const navigate = useNavigate();
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: Date.now().toString(),
      quantity: 1,
      product_id: 1,
      itemgroup_product: designData.productName,
      personalization: JSON.stringify(designData)
    };
    
    addItem(cartItem);
    navigate('/cart');
  };

  const handleRequestQuote = () => {
    navigate('/devis');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <CheckCircle className="h-6 w-6 text-green-500" />
            Validation de votre design
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] px-1">
          <div className="space-y-6">
            <div className="aspect-video w-full relative rounded-lg overflow-hidden border">
              <img 
                src={designData.canvasImage} 
                alt="Design Preview"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Produit</h3>
                  <p className="text-sm text-gray-600">{designData.productName}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Type</h3>
                  <p className="text-sm text-gray-600">{designData.productType}</p>
                </div>
              </div>

              {designData.textElements.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Textes</h3>
                  <div className="space-y-2">
                    {designData.textElements.map((text, index) => (
                      <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: text.color }}
                        />
                        <span>{text.content}</span>
                        <span className="text-gray-400">({text.font})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {designData.uploadedImages.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Images</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {designData.uploadedImages.map((image, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        {image.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        <div className="flex gap-4 mt-6">
          <Button
            onClick={handleAddToCart}
            className="flex-1 bg-green-500 hover:bg-green-600"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Ajouter au panier
          </Button>
          <Button
            onClick={handleRequestQuote}
            variant="outline"
            className="flex-1"
          >
            <FileText className="mr-2 h-4 w-4" />
            Demander un devis
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DesignValidationDialog;