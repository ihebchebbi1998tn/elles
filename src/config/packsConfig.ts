
import { menuItems } from "./menuConfig";

export interface PackItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price?: string;
  isPersonalizable?: boolean;
}

export interface PackConfig {
  id: string;
  title: string;
  description: string;
  image: string;
  items: PackItem[];
  totalPrice?: string;
  discount?: string;
  availability?: "in-stock" | "limited" | "out-of-stock";
}

// Extract pack data from menuItems for consistency
const extractPacksFromMenu = (): PackConfig[] => {
  const packsMenuItem = menuItems.find(item => item.title === "Nos packs Complet");
  
  if (!packsMenuItem || !packsMenuItem.subItems) {
    return [];
  }
  
  return packsMenuItem.subItems.map(subItem => {
    const pathSegments = subItem.path.split('/');
    const id = pathSegments[pathSegments.length - 1];
    
    return {
      id,
      title: subItem.title,
      description: subItem.description,
      image: subItem.image,
      items: getPackItemsById(id),
      totalPrice: getPackTotalPrice(id),
      discount: "15%",
      availability: "in-stock"
    };
  });
};

// Calculate total price for a pack
const getPackTotalPrice = (packId: string): string => {
  const items = getPackItemsById(packId);
  // In a real application, you would sum the actual prices
  // Here we're just using placeholder prices based on the pack
  switch (packId) {
    case "restaurant":
      return "399.99";
    case "cafe":
      return "299.99";
    case "hotel":
      return "459.99";
    case "medecin":
      return "349.99";
    default:
      return "0.00";
  }
};

// Pack items configuration with enhanced details
const getPackItemsById = (packId: string): PackItem[] => {
  switch (packId) {
    case "restaurant":
      return [
        { 
          id: "veste-cuisine-1", 
          name: "Veste de Chef", 
          description: "Veste professionnelle pour cuisine avec finitions premium", 
          image: "/VetementDeCuisine/VesteDeChef.jpg",
          price: "129.99",
          isPersonalizable: true
        },
        { 
          id: "tablier-cuisine-1", 
          name: "Tablier Professionnel", 
          description: "Protection robuste pour la cuisine avec poches multiples", 
          image: "/VetementDeCuisine/TablierDeChef.jpg",
          price: "79.99",
          isPersonalizable: true
        },
        { 
          id: "pantalon-cuisine-1", 
          name: "Pantalon de Cuisine", 
          description: "Confort et durabilité pour un usage intensif", 
          image: "/VetementDeCuisine/PontalonDeChef.jpg",
          price: "99.99",
          isPersonalizable: false
        },
        { 
          id: "chaussures-cuisine-1", 
          name: "Chaussures de Sécurité", 
          description: "Antidérapantes et résistantes pour la sécurité en cuisine", 
          image: "/ChausureDeTravail/ChaussureDeCuisine.jpg",
          price: "129.99",
          isPersonalizable: false
        },
      ];
    case "cafe":
      return [
        { 
          id: "tablier-cuisine-1", 
          name: "Tablier Barista", 
          description: "Protection élégante avec espace pour accessoires", 
          image: "/VetementDeCuisine/TablierDeChef.jpg",
          price: "89.99",
          isPersonalizable: true
        },
        { 
          id: "veste-hotel-1", 
          name: "Uniforme de Service", 
          description: "Tenue professionnelle élégante pour service en salle", 
          image: "/VetementServiceHotellerie/UniformeDeService.jpg",
          price: "119.99",
          isPersonalizable: true
        },
        { 
          id: "chaussures-cuisine-1", 
          name: "Chaussures Confort", 
          description: "Pour le service de longue durée, confort maximal", 
          image: "/ChausureDeTravail/ChaussureDeCuisine.jpg",
          price: "109.99",
          isPersonalizable: false
        },
      ];
    case "hotel":
      return [
        { 
          id: "tenue-accueil-1", 
          name: "Tenue d'Accueil", 
          description: "Première impression impeccable avec finitions de qualité", 
          image: "/VetementServiceHotellerie/TenueDacceuilHotelBanner.jpg",
          price: "159.99",
          isPersonalizable: true
        },
        { 
          id: "veste-hotel-1", 
          name: "Uniforme Chambre", 
          description: "Pour le personnel d'entretien, pratique et durable", 
          image: "/VetementServiceHotellerie/UniformeDeService.jpg",
          price: "129.99",
          isPersonalizable: true
        },
        { 
          id: "veste-cuisine-1", 
          name: "Vêtements Restaurant", 
          description: "Pour le restaurant d'hôtel, style et confort", 
          image: "/VetementDeCuisine/VesteDeChef.jpg",
          price: "139.99",
          isPersonalizable: true
        },
      ];
    case "medecin":
      return [
        { 
          id: "blouse-medicale-1", 
          name: "Blouse Médicale", 
          description: "Pour les médecins, qualité supérieure antimicrobienne", 
          image: "/VetementDeTravail/BlouseMedical.jpg",
          price: "149.99",
          isPersonalizable: true
        },
        { 
          id: "tunique-medicale-1", 
          name: "Tunique Médicale", 
          description: "Pour les infirmiers, confort et praticité", 
          image: "/VetementDeTravail/TuniqueMedical.png",
          price: "119.99",
          isPersonalizable: true
        },
        { 
          id: "pantalon-medical-1", 
          name: "Pantalon Médical", 
          description: "Confort toute la journée avec poches multiples", 
          image: "/VetementDeTravail/CombinaionDeTravail.jpg",
          price: "99.99",
          isPersonalizable: false
        },
      ];
    default:
      return [];
  }
};

export const packsConfig = extractPacksFromMenu();

export const getPackById = (packId: string | undefined): PackConfig | undefined => {
  if (!packId) return undefined;
  
  // First try to find the pack from the extracted configs
  const packFromConfig = packsConfig.find(pack => pack.id === packId);
  if (packFromConfig) return packFromConfig;
  
  // If not found in the extracted config, create it directly from menu and items
  const packsMenuItem = menuItems.find(item => item.title === "Nos packs Complet");
  if (!packsMenuItem || !packsMenuItem.subItems) return undefined;
  
  const subItem = packsMenuItem.subItems.find(item => {
    const pathSegments = item.path.split('/');
    const id = pathSegments[pathSegments.length - 1];
    return id === packId;
  });
  
  if (!subItem) return undefined;
  
  return {
    id: packId,
    title: subItem.title,
    description: subItem.description,
    image: subItem.image,
    items: getPackItemsById(packId),
    totalPrice: getPackTotalPrice(packId),
    discount: "15%",
    availability: "in-stock"
  };
};

