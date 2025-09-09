import { Property } from '@/components/PropertyCard';
import propertyImage from '@/assets/property-hero.jpg';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Appartement 4.5 pièces - Lausanne Centre',
    description: 'Magnifique appartement rénové avec vue sur le lac Léman. Cuisine équipée, balcon sud, proche des commodités.',
    city: 'Lausanne',
    neighborhood: 'Centre-ville',
    rooms: 4.5,
    surface: 120,
    status: 'available',
    price: 'CHF 2\'800\'000',
    images: [propertyImage],
    features: ['Vue lac', 'Balcon', 'Cave', 'Place de parc'],
    contactInfo: {
      name: 'Marie Dubois',
      phone: '+41 79 123 45 67',
      email: 'marie.dubois@example.ch'
    }
  },
  {
    id: '2',
    title: 'Villa individuelle - Cologny',
    description: 'Splendide villa avec jardin paysager et piscine. Quartier résidentiel prestigieux, calme absolu.',
    city: 'Cologny',
    neighborhood: 'Résidentiel',
    rooms: 7,
    surface: 300,
    status: 'available',
    price: 'Sur demande',
    images: [propertyImage],
    features: ['Piscine', 'Jardin', 'Garage 2 places', 'Cheminée'],
    contactInfo: {
      name: 'Pierre Martin',
      phone: '+41 78 987 65 43',
      email: 'pierre.martin@example.ch'
    }
  },
  {
    id: '3',
    title: 'Loft moderne - Genève',
    description: 'Loft de caractère dans ancien entrepôt rénové. Hauteur sous plafond exceptionnelle, design contemporain.',
    city: 'Genève',
    neighborhood: 'Eaux-Vives',
    rooms: 3.5,
    surface: 180,
    status: 'rented',
    price: 'CHF 1\'950\'000',
    images: [propertyImage],
    features: ['Design', 'Terrasse', 'Ascenseur', 'Concierge'],
    contactInfo: {
      name: 'Sophie Laurent',
      phone: '+41 76 555 44 33',
      email: 'sophie.laurent@example.ch'
    }
  },
  {
    id: '4',
    title: 'Penthouse - Montreux',
    description: 'Penthouse exceptionnel avec terrasse panoramique sur le lac et les Alpes. Finitions haut de gamme.',
    city: 'Montreux',
    neighborhood: 'Lac',
    rooms: 6,
    surface: 250,
    status: 'available',
    price: 'CHF 3\'200\'000',
    images: [propertyImage],
    features: ['Terrasse 150m²', 'Vue panoramique', 'Jacuzzi', 'Parking privé'],
    contactInfo: {
      name: 'Jean-Claude Favre',
      phone: '+41 79 444 33 22',
      email: 'jc.favre@example.ch'
    }
  },
  {
    id: '5',
    title: 'Château rénové - Vaud',
    description: 'Château du 18ème siècle entièrement rénové. Parc de 2 hectares, piscine chauffée, écuries.',
    city: 'Rolle',
    neighborhood: 'Campagne',
    rooms: 12,
    surface: 800,
    status: 'sold',
    price: 'CHF 8\'500\'000',
    images: [propertyImage],
    features: ['Parc 2 ha', 'Piscine chauffée', 'Écuries', 'Cave à vin'],
    contactInfo: {
      name: 'Isabelle Mercier',
      phone: '+41 77 111 22 33',
      email: 'isabelle.mercier@example.ch'
    }
  },
  {
    id: '6',
    title: 'Appartement neuf - Nyon',
    description: 'Appartement dans résidence neuve avec services. Finitions premium, balcon avec vue dégagée.',
    city: 'Nyon',
    neighborhood: 'Centre',
    rooms: 5.5,
    surface: 165,
    status: 'available',
    price: 'CHF 2\'100\'000',
    images: [propertyImage],
    features: ['Neuf', 'Conciergerie', 'Spa', 'Cave'],
    contactInfo: {
      name: 'David Roux',
      phone: '+41 78 666 55 44',
      email: 'david.roux@example.ch'
    }
  }
];

// Featured properties (subset of all properties)
export const featuredProperties = mockProperties.slice(0, 3);