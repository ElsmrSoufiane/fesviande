export const brand = {
  name: 'VIANDE FES',
  shortName: 'VF',
  tagline: 'Excellence en viande premium',
}

export const heroSlides = [
  {
    "id": 1,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&h=600&fit=crop",
    "title": "fesviande",
    "subtitle": "fesviande",
    "description": "Découvrez le summum du persillage et de la saveur avec nos sélections Wagyu premium."
  },
  {
    "id": 2,
    "image": "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&h=600&fit=crop",
    "title": "RIB-EYE VIEILLI",
    "subtitle": "28 Jours de Perfection",
    "description": "Steaks découpés à la main, vieillis dans notre cave climatique pour une tendresse exceptionnelle."
  },
  {
    "id": 3,
    "image": "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=1200&h=600&fit=crop",
    "title": "COLLECTION AGNEAU",
    "subtitle": "Excellence Élevée en Pâturage",
    "description": "Carrés et coupes premium issus d'agnneaux élevés en pâturage et nourris à l'herbe."
  },
  {
    "id": 4,
    "image": "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=1200&h=600&fit=crop",
    "title": "VOLAILLE BIO",
    "subtitle": "Plein Air & Naturel",
    "description": "Poulet sans antibiotique élevé avec soin dans des fermes familiales."
  }
]

export const categories = [
  {
    "id": "all",
    "name": "Tous les Produits"
  },
  {
    "id": "beef",
    "name": "Bœuf Wagyu"
  },
  {
    "id": "poultry",
    "name": "Volaille Bio"
  },
  {
    "id": "lamb",
    "name": "Agneau"
  }
]

export const features = [
  {
    icon: 'Check',
    title: 'Qualité Garantie',
    description: 'Viandes sélectionnées avec soin pour une qualité exceptionnelle',
  },
  {
    icon: 'ChefHat',
    title: 'Préparation Artisanale',
    description: 'Découpes faites par nos bouchers experts',
  },
  {
    icon: 'Clock',
    title: 'Livraison Rapide',
    description: 'Expédition fraîcheur sous 24h',
  },
  {
    icon: 'Flame',
    title: 'Frais et Surgelé',
    description: 'Options fraîches et surgelées disponibles',
  },
]

export const products = [
  {
    "id": 1,
    "name": "Rib-Eye Vieilli",
    "price": {
      "250": 42,
      "500": 80,
      "1000": 150
    },
    "description": "Steak découpé à la main, vieilli 28 jours dans notre cave climatique.",
    "fullDescription": "Notre Rib-Eye vieilli est une œuvre d'art culinaire. Sélectionné à la main parmi les meilleurs bœufs, chaque pièce subit un vieillissement sec de 28 jours dans nos caves climatiques contrôlées en température et humidité. Ce processus concentrate les saveurs et crée une tendresse exceptionnelle.",
    "origin": "Sud-Ouest de la France",
    "weight": "250g, 500g, 1kg",
    "images": [
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1558030006-450675393462?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=500&h=500&fit=crop"
    ],
    "galleryImages": [
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1558030006-450675393462?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=800&h=800&fit=crop"
    ],
    "processImages": [
      {
        "image": "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop",
        "title": "Sélection",
        "description": "Choix minutieux des meilleurs bœufs élevés en pâturage"
      },
      {
        "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
        "title": "Découpe",
        "description": "Découpe artisanale par nos maîtres bouchers"
      },
      {
        "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop",
        "title": "Vieillissement",
        "description": "28 jours de maturation dans nos caves climatiques"
      },
      {
        "image": "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&h=400&fit=crop",
        "title": "Finition",
        "description": "Préparation et conditionnement optimal"
      }
    ],
    "nutrition": {
      "calories": 271,
      "protein": 26,
      "fat": 18,
      "carbs": 0
    },
    "isBestseller": true,
    "category": "beef"
  },
  {
    "id": 2,
    "name": "Carré d'Agneau",
    "price": {
      "400": 38.5,
      "800": 72,
      "1200": 100
    },
    "description": "Carré de 8 côtes désossé, élevé en pâturage et parfaitement persillé.",
    "fullDescription": "Notre Carré d'Agneau est issu d'agneaux élevés en pâturage dans les montagnes françaises. Chaque pièce est désossée et parée avec précision pour garantir une cuisson uniforme et une présentation élégante.",
    "origin": "Massif Central, France",
    "weight": "400g, 800g, 1.2kg",
    "images": [
      "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&h=500&fit=crop"
    ],
    "galleryImages": [
      "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=800&fit=crop"
    ],
    "processImages": [
      {
        "image": "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop",
        "title": "Élevage",
        "description": "Agneaux élevés en plein air dans les montagnes"
      },
      {
        "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
        "title": "Abattage",
        "description": "Processus humain et respectueux"
      },
      {
        "image": "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=600&h=400&fit=crop",
        "title": "Préparation",
        "description": "Désossage et parage artisanaux"
      },
      {
        "image": "https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=600&h=400&fit=crop",
        "title": "Conditionnement",
        "description": "Emballage sous vide protecteur"
      }
    ],
    "nutrition": {
      "calories": 217,
      "protein": 25,
      "fat": 13,
      "carbs": 0
    },
    "isBestseller": false,
    "category": "lamb"
  },
  {
    "id": 3,
    "name": "Filet de Wagyu",
    "price": {
      "200": 89,
      "400": 170,
      "600": 240
    },
    "description": "Wagyu japonais A5, persillage exceptionnel et texture beurrée.",
    "fullDescription": "Le summum de l'excellence bovine. Notre Wagyu A5 japonais offre un persillage incomparable qui fond en bouche, libérant des arômes riches et complexes. Une expérience gustative unique.",
    "origin": "Japon (Kobe/Kagoshima)",
    "weight": "200g, 400g, 600g",
    "images": [
      "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=500&fit=crop"
    ],
    "galleryImages": [
      "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=800&fit=crop"
    ],
    "processImages": [
      {
        "image": "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop",
        "title": "Élevage Traditionnel",
        "description": "Méthodes ancestrales japonaises"
      },
      {
        "image": "https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=400&fit=crop",
        "title": "Alimentation",
        "description": "Régime spécial riche en céréales"
      },
      {
        "image": "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=600&h=400&fit=crop",
        "title": "Classification",
        "description": "Évaluation A5 par des experts"
      },
      {
        "image": "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&h=400&fit=crop",
        "title": "Import",
        "description": "Transport sous contrôle de température"
      }
    ],
    "nutrition": {
      "calories": 291,
      "protein": 24,
      "fat": 21,
      "carbs": 0
    },
    "isBestseller": true,
    "category": "beef"
  },
  {
    "id": 4,
    "name": "Blanc de Poulet Bio",
    "price": {
      "300": 18,
      "500": 28,
      "1000": 50
    },
    "description": "Poulet de plein air sans antibiotique au goût exceptionnel.",
    "fullDescription": "Nos poulets bio sont élevés en plein air dans des fermes certifiées. Sans antibiotiques ni hormones de croissance, ils développent une chair ferme et un goût authentique.",
    "origin": "Bretagne, France",
    "weight": "300g, 500g, 1kg",
    "images": [
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=500&h=500&fit=crop"
    ],
    "galleryImages": [
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=800&h=800&fit=crop"
    ],
    "processImages": [
      {
        "image": "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop",
        "title": "Poussins",
        "description": "Élevage en liberté dès le premier jour"
      },
      {
        "image": "https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=400&fit=crop",
        "title": "Plein Air",
        "description": "Accès permanent à l'extérieur"
      },
      {
        "image": "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&h=400&fit=crop",
        "title": "Alimentation",
        "description": "Céréales bio 100% françaises"
      },
      {
        "image": "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&h=400&fit=crop",
        "title": "Abattage",
        "description": "Processus certifié bio"
      }
    ],
    "nutrition": {
      "calories": 165,
      "protein": 31,
      "fat": 3.6,
      "carbs": 0
    },
    "isBestseller": false,
    "category": "poultry"
  },
  {
    "id": 5,
    "name": "Canard Entier",
    "price": {
      "1500": 34,
      "2000": 45,
      "2500": 55
    },
    "description": "Canard de Pekin élevé en ferme, parfait pour le rôtissage.",
    "fullDescription": "Notre Canard de Pekin offre une chair juteuse et parfumée, idéale pour les roasted et les confits. Élevé en ferme traditionnelle, il développe des saveurs incomparables.",
    "origin": "Alsace, France",
    "weight": "1.5kg, 2kg, 2.5kg",
    "images": [
      "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&h=500&fit=crop"
    ],
    "galleryImages": [
      "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&h=800&fit=crop"
    ],
    "processImages": [
      {
        "image": "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop",
        "title": "Élevage",
        "description": "Canards élevés en liberté"
      },
      {
        "image": "https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=400&fit=crop",
        "title": "Gavage",
        "description": "Méthode traditionnelle alsacienne"
      },
      {
        "image": "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=600&h=400&fit=crop",
        "title": "Plumaison",
        "description": "Nettoyage artisanal complet"
      },
      {
        "image": "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=600&h=400&fit=crop",
        "title": "Finition",
        "description": "Conditionnement soigné"
      }
    ],
    "nutrition": {
      "calories": 337,
      "protein": 19,
      "fat": 28,
      "carbs": 0
    },
    "isBestseller": false,
    "category": "poultry"
  },
  {
    "id": 6,
    "name": "Gigot d'Agneau",
    "price": {
      "1000": 45,
      "1500": 65,
      "2000": 80
    },
    "description": "Gigot désossé avec os, élevé à l'herbe et parfait pour les réunions.",
    "fullDescription": "Notre Gigot d'Agneau est issu d'agneaux de lait élevés principalement à l'herbe. Sa chair rosée et tendre fond dans la bouche, parfaite pour les grandes tablées.",
    "origin": "Provence, France",
    "weight": "1kg, 1.5kg, 2kg",
    "images": [
      "https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=500&h=500&fit=crop"
    ],
    "galleryImages": [
      "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800&h=800&fit=crop"
    ],
    "processImages": [
      {
        "image": "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop",
        "title": "Pâturage",
        "description": "Agneaux paissant dans les garrigues"
      },
      {
        "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
        "title": "Abattage",
        "description": "Abattoir de proximité"
      },
      {
        "image": "https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&h=400&fit=crop",
        "title": "Désossage",
        "description": "Parage pour une présentation élégante"
      },
      {
        "image": "https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=600&h=400&fit=crop",
        "title": "Livraison",
        "description": "Transport réfrigéré"
      }
    ],
    "nutrition": {
      "calories": 243,
      "protein": 28,
      "fat": 14,
      "carbs": 0
    },
    "isBestseller": false,
    "category": "lamb"
  },
  {
    "id": 7,
    "name": "Poitrine de Bœuf Prime",
    "price": {
      "500": 56,
      "1000": 105,
      "2000": 190
    },
    "description": "Grade USDA Prime, idéal pour le fumage lent ou le braisage.",
    "fullDescription": "Notre Poitrine de Bœuf Prime est le choix des maîtres du BBQ. Avec son persillage généreux, elle devient fondante après une longue cuisson, idéale pour le fumage ou le braisage.",
    "origin": "Nebraska, USA",
    "weight": "500g, 1kg, 2kg",
    "images": [
      "https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=500&h=500&fit=crop"
    ],
    "galleryImages": [
      "https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=800&h=800&fit=crop"
    ],
    "processImages": [
      {
        "image": "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop",
        "title": "Élevage",
        "description": "Bœuf grain-fed pendant 150 jours"
      },
      {
        "image": "https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=400&fit=crop",
        "title": "Classification",
        "description": "Grade USDA Prime garanti"
      },
      {
        "image": "https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=600&h=400&fit=crop",
        "title": "Découpe",
        "description": "Découpe professionnelle"
      },
      {
        "image": "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&h=400&fit=crop",
        "title": "Transport",
        "description": "Chaîne du froid respectée"
      }
    ],
    "nutrition": {
      "calories": 331,
      "protein": 26,
      "fat": 25,
      "carbs": 0
    },
    "isBestseller": true,
    "category": "beef"
  },
  {
    "id": 8,
    "name": "Cuisses de Poulet",
    "price": {
      "400": 14,
      "800": 26,
      "1200": 38
    },
    "description": "Cuisses avec os et peau de poulets bio de plein air.",
    "fullDescription": "Nos Cuisses de Poulet offrent une chair juteuse et pleine de saveur. La peau croustillante et la viande tendre en font un délice pour la cuisson au four ou à la poêle.",
    "origin": "Bretagne, France",
    "weight": "400g, 800g, 1.2kg",
    "images": [
      "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=500&h=500&fit=crop"
    ],
    "galleryImages": [
      "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=800&h=800&fit=crop"
    ],
    "processImages": [
      {
        "image": "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop",
        "title": "Élevage",
        "description": "Poulets bio en plein air"
      },
      {
        "image": "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&h=400&fit=crop",
        "title": "Alimentation",
        "description": "Céréales bio françaises"
      },
      {
        "image": "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&h=400&fit=crop",
        "title": "Découpe",
        "description": "Cuisses séparées avec peau"
      },
      {
        "image": "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=600&h=400&fit=crop",
        "title": "Emballage",
        "description": "Conditionnement fraîcheur"
      }
    ],
    "nutrition": {
      "calories": 209,
      "protein": 26,
      "fat": 11,
      "carbs": 0
    },
    "isBestseller": false,
    "category": "poultry"
  },
  {
    "id": 9,
    "name": "Côtelettes d'Agneau",
    "price": {
      "300": 32,
      "600": 60,
      "900": 85
    },
    "description": "Côtelettes d'agneau premium, tendres et savoureuses.",
    "fullDescription": "Nos Côtelettes d'Agneau sont découpées avec précision pour une cuisson parfaite. Tendres et parfumées, elles sont idéales grillées ou poêlées à feu vif.",
    "origin": "Massif Central, France",
    "weight": "300g, 600g, 900g",
    "images": [
      "https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&h=500&fit=crop"
    ],
    "galleryImages": [
      "https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=800&fit=crop"
    ],
    "processImages": [
      {
        "image": "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop",
        "title": "Sélection",
        "description": "Choix des meilleurs morceaux"
      },
      {
        "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
        "title": "Découpe",
        "description": "Côtelettes d'épaisseur uniforme"
      },
      {
        "image": "https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=600&h=400&fit=crop",
        "title": "Parage",
        "description": "Nettoyage minutieux"
      },
      {
        "image": "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=600&h=400&fit=crop",
        "title": "Finition",
        "description": "Prêtes à cuire"
      }
    ],
    "nutrition": {
      "calories": 294,
      "protein": 27,
      "fat": 20,
      "carbs": 0
    },
    "isBestseller": true,
    "category": "lamb"
  }
]

export const aboutData = {
  hero: {
    title: 'De Nos Ferme',
    highlightedWord: 'Fermes',
    description1: 'Nous travaillons en étroite collaboration avec des fermes locales certifiées, garantissant que chaque morceau de viande que nous proposons répond aux normes les plus élevées de qualité et de durabilité.',
    description2: 'De la ferme à votre table, nous veillons à ce que le processus soit transparent, éthique et responsable.',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30',
    imageAlt: 'Ferme locale avec bétail',
  },
  stats: [
    { value: '15+', label: 'Années d\'expérience' },
    { value: '50+', label: 'Fermes partenaires' },
    { value: '10K+', label: 'Clients satisfaits' },
    { value: '100%', label: 'Qualité garantie' },
  ],
  values: [
    { icon: 'Leaf', title: 'Durabilité', description: 'Nous privilégions les pratiques agricoles responsables et le bien-être animal.' },
    { icon: 'Award', title: 'Excellence', description: 'Chaque produit est inspecté pour garantir une qualité supérieure.' },
    { icon: 'Heart', title: 'Passion', description: 'Notre amour pour la bonne viande se retrouve dans chaque détail.' },
    { icon: 'MapPin', title: 'Local', description: 'Nous soutenons les producteurs locaux et réduisons l\'empreinte carbone.' },
  ],
  certificates: [
    { title: 'Certification Bio', issuer: 'ECOCERT', year: '2024', description: 'Engagement envers l\'agriculture biologique et les pratiques durables.' },
    { title: 'Bien-être Animal', issuer: 'Label Rouge', year: '2024', description: 'Normes strictes pour le bien-être et la santé animale.' },
    { title: 'Traçabilité Complète', issuer: 'IFS Food', year: '2023', description: 'Piste de traçabilité du ferme jusqu\'à votre assiette.' },
  ],
  cta: {
    title: 'Découvrez Nos Produits Premium',
    description: 'Partez à la découverte de notre sélection de viandes d\'exception, préparées avec passion et savoir-faire.',
    buttonText: 'VOIR NOS PRODUITS',
  },
}

export const footerData = {
  links: [
    { href: '/', label: 'Accueil' },
    { href: '/about', label: 'À propos' },
    { href: '/', label: 'Contact' },
  ],
  contact: 'contact@viandefes.com',
  copyright: '© 2024 VIANDE FES. Tous droits réservés.',
}

export const metaData = {
  title: 'VIANDE FES - Viande Premium Maroc',
  description: 'Boutique en ligne de viande premium au Maroc. Viandes fraîches et surgelées de qualité supérieure.',
  lang: 'fr',
}

export const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/about', label: 'À propos' },
]
