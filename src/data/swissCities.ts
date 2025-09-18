// Swiss cities database for property search
export const swissCities = [
  // Major cities
  'Zurich', 'Geneva', 'Basel', 'Lausanne', 'Bern', 'Winterthur', 'Lucerne', 'St. Gallen', 'Lugano', 'Biel/Bienne',
  
  // Canton capitals and important cities
  'Aarau', 'Appenzell', 'Bellinzona', 'Chur', 'Delémont', 'Frauenfeld', 'Fribourg', 'Glarus', 'Herisau', 'Liestal',
  'Neuchâtel', 'Sarnen', 'Schaffhausen', 'Schwyz', 'Sion', 'Solothurn', 'Stans', 'Altdorf', 'Zug',
  
  // Lake Geneva region
  'Montreux', 'Vevey', 'Nyon', 'Morges', 'Yverdon-les-Bains', 'Gland', 'Rolle', 'Coppet', 'Aubonne',
  
  // Zurich region
  'Uster', 'Dübendorf', 'Kloten', 'Wetzikon', 'Horgen', 'Meilen', 'Zollikon', 'Küsnacht', 'Thalwil', 'Adliswil',
  
  // Basel region
  'Liestal', 'Muttenz', 'Pratteln', 'Birsfelden', 'Allschwil', 'Reinach', 'Binningen',
  
  // Bern region
  'Thun', 'Köniz', 'Ostermundigen', 'Burgdorf', 'Münsingen', 'Langenthal', 'Steffisburg',
  
  // Central Switzerland
  'Zug', 'Cham', 'Baar', 'Rotkreuz', 'Lachen', 'Einsiedeln', 'Küssnacht', 'Brunnen',
  
  // Eastern Switzerland
  'Rapperswil-Jona', 'Wil', 'Uzwil', 'Gossau', 'Flawil', 'Wattwil', 'Buchs', 'Sargans',
  
  // Ticino
  'Locarno', 'Mendrisio', 'Chiasso', 'Bellinzona', 'Ascona', 'Biasca', 'Airolo',
  
  // Valais
  'Martigny', 'Monthey', 'Sierre', 'Brig-Glis', 'Visp', 'Zermatt', 'Saas-Fee', 'Verbier', 'Crans-Montana',
  
  // Grisons
  'Davos', 'St. Moritz', 'Arosa', 'Klosters', 'Flims', 'Lenzerheide', 'Pontresina',
  
  // Other important cities
  'Baden', 'Wettingen', 'Dietikon', 'Schlieren', 'Spreitenbach', 'Oftringen', 'Olten', 'Grenchen',
  'La Chaux-de-Fonds', 'Le Locle', 'Meyrin', 'Vernier', 'Lancy', 'Onex', 'Carouge', 'Thônex',
  'Emmen', 'Kriens', 'Horw', 'Meggen', 'Weggis', 'Vitznau', 'Buochs', 'Stansstad'
];

// Function to filter cities based on input
export const filterCities = (input: string): string[] => {
  if (!input || input.length < 2) return [];
  
  const searchTerm = input.toLowerCase();
  return swissCities
    .filter(city => city.toLowerCase().includes(searchTerm))
    .slice(0, 10); // Limit to 10 suggestions
};
