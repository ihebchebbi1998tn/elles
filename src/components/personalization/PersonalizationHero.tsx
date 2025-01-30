import { Award, Clock, DollarSign, Gift, Heart, MessageSquare, Rocket, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const PersonalizationHero = () => {
  return (
    <div className="relative">
      {/* Hero Image */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <img
          src="/lovable-uploads/a8994e1f-ed0e-4817-a205-aee661515beb.png"
          alt="Personnalisation de vêtement de travail"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 animate-fade-in">
            Créez Votre Design Unique
          </h1>
          <p className="text-xl md:text-2xl text-center mb-8 max-w-3xl mx-auto animate-fade-in-delayed">
            DONNEZ DE LA VISIBILITÉ À VOTRE ENTREPRISE ET DÉMARQUEZ-VOUS !
          </p>
          <Button 
            size="lg" 
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg animate-fade-in-delayed"
          >
            Commencer votre design
          </Button>
        </div>
      </div>

      {/* Steps Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Demande de devis en 3 étapes simples
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow animate-fade-in">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Choix des vêtements</h3>
            <p className="text-gray-600">Sélectionnez parmi notre large gamme de produits personnalisables</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow animate-fade-in-delayed">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Choix du marquage</h3>
            <p className="text-gray-600">Personnalisez votre design avec notre outil intuitif</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow animate-fade-in-delayed">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Votre devis sous 48h</h3>
            <p className="text-gray-600">Recevez rapidement votre devis personnalisé</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
            <Clock className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Devis gratuit sous 48h</h3>
            <p className="text-sm text-gray-600">Réponse rapide garantie</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
            <DollarSign className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Prix dégressifs</h3>
            <p className="text-sm text-gray-600">Tarifs adaptés à vos besoins</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
            <MessageSquare className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Conseils sur-mesure</h3>
            <p className="text-sm text-gray-600">Expertise personnalisée</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
            <Truck className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Suivi & SAV</h3>
            <p className="text-sm text-gray-600">Support client dédié</p>
          </div>
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
            <Award className="w-8 h-8 text-primary mr-4 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Qualité Premium</h4>
              <p className="text-sm text-gray-600">Matériaux et finitions haut de gamme</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
            <Shield className="w-8 h-8 text-primary mr-4 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Garantie Satisfaction</h4>
              <p className="text-sm text-gray-600">Service client réactif</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
            <Rocket className="w-8 h-8 text-primary mr-4 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Livraison Rapide</h4>
              <p className="text-sm text-gray-600">Délais optimisés</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-gray-700 leading-relaxed">
            Depuis plus de 10 ans, MODYF PLUS, le département Marquage de Würth MODYF, accompagne ses clients dans la création de vêtements personnalisés. Notre but est de vous aider à vous démarquer en donnant de la visibilité à votre entreprise au quotidien.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Pour répondre aux besoins de nos clients aussi bien professionnels que particuliers, nous disposons d'une gamme large et variée de vêtements de travail et accessoires. Nous avons défini un nouveau standard en matière d'habillement professionnel et de qualité de service.
          </p>
          <div className="flex items-center justify-center gap-2 text-xl font-semibold text-primary">
            <Heart className="w-6 h-6" />
            <p>N'attendez plus et démarquez-vous !</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizationHero;