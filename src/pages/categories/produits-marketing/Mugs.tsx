
import React from 'react';
import { products } from '@/config/products';
import CategoryTemplate from '@/components/categories/CategoryTemplate';

const Mugs = () => {
  const mugProducts = products.filter(
    product => product.type === 'accessoires' && product.name.toLowerCase().includes('mug')
  );

  const categoryData = {
    title: "Mugs Personnalisés",
    description: "Découvrez notre collection de mugs personnalisables pour votre entreprise",
    bannerImage: "/ProductImages/MarketingBanner.png",
    features: [
      {
        title: "Qualité Premium",
        description: "Matériaux durables et confortables pour un usage professionnel intensif"
      },
      {
        title: "Livraison Rapide",
        description: "Expédition sous 24/48h pour toute la France métropolitaine"
      },
      {
        title: "Satisfaction Garantie",
        description: "Service client disponible 6j/7 pour vous accompagner"
      }
    ],
    products: mugProducts.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.startingPrice),
      image: product.image || '/placeholder.png'
    }))
  };

  return (
    <CategoryTemplate 
      data={categoryData}
      parentPath="/produits-marketing"
      parentName="produits marketing"
    />
  );
};

export default Mugs;
