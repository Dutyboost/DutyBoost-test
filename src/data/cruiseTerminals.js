// Cruise ship terminals by country, used by the cruise partner calculator so a
// retailer can pick their country (or island) first and then choose the
// terminal they sit in from a filtered list.
//
// Keys match the country names in src/data/unCountries.js exactly.

export const COUNTRY_TERMINALS = {
  // ── Mediterranean & Southern Europe ──
  Spain: [
    "Barcelona (Moll Adossat)", "Palma de Mallorca", "Valencia", "Málaga",
    "Cádiz", "Cartagena", "Alicante", "Ibiza", "Bilbao", "A Coruña", "Vigo",
    "Las Palmas (Gran Canaria)", "Santa Cruz de Tenerife", "Arrecife (Lanzarote)",
    "Puerto del Rosario (Fuerteventura)", "San Sebastián de la Gomera",
  ],
  Portugal: [
    "Lisbon (Santa Apolónia)", "Leixões (Porto)", "Funchal (Madeira)",
    "Ponta Delgada (Azores)", "Setúbal", "Portimão", "Horta (Azores)",
  ],
  France: [
    "Marseille (Joliette)", "Le Havre", "Villefranche (Nice)", "Cannes",
    "Toulon", "Sète", "Le Verdon (Bordeaux)", "La Rochelle", "Cherbourg",
    "Saint-Malo", "Ajaccio (Corsica)", "Bastia", "Le Port (Réunion)",
  ],
  Italy: [
    "Civitavecchia (Rome)", "Naples", "Genoa", "Livorno (Florence / Pisa)",
    "Venice (Marghera)", "Bari", "Palermo", "Messina", "Catania", "Cagliari",
    "Savona", "Trieste", "Ravenna", "La Spezia", "Salerno", "Ancona",
    "Taranto", "Olbia", "Brindisi", "Trapani",
  ],
  Malta: ["Valletta Waterfront", "Marsaxlokk"],
  Greece: [
    "Piraeus (Athens)", "Heraklion", "Santorini (Fira)", "Mykonos", "Corfu",
    "Rhodes", "Katakolon (Olympia)", "Volos", "Thessaloniki", "Chania (Souda)",
    "Argostoli (Kefalonia)", "Kos", "Zakynthos", "Skiathos", "Nafplion",
    "Mytilene (Lesbos)", "Patras", "Kavala",
  ],
  Croatia: [
    "Dubrovnik (Gruž)", "Split", "Zadar", "Šibenik", "Rijeka", "Korčula",
    "Hvar", "Pula", "Ploče", "Rovinj",
  ],
  Montenegro: ["Kotor", "Bar"],
  Slovenia: ["Koper"],
  Albania: ["Durrës", "Sarandë"],
  "Türkiye": [
    "Istanbul (Galataport)", "Kuşadası", "Bodrum", "Izmir", "Antalya",
    "Marmaris", "Çeşme", "Alanya", "Trabzon",
  ],
  Cyprus: ["Limassol", "Larnaca"],
  Monaco: ["Port Hercule"],
  Gibraltar: ["Gibraltar (North Mole)"],
  Ukraine: ["Odesa"],
  Georgia: ["Batumi"],
  Bulgaria: ["Varna", "Burgas"],
  Romania: ["Constanța"],

  // ── Northern Europe & Baltic ──
  Norway: [
    "Oslo", "Bergen", "Geiranger", "Ålesund", "Stavanger", "Tromsø",
    "Honningsvåg (North Cape)", "Flåm", "Kristiansand", "Trondheim", "Molde",
    "Olden", "Skjolden", "Eidfjord", "Nordfjordeid", "Leknes (Lofoten)",
    "Longyearbyen (Svalbard)", "Hammerfest", "Åndalsnes", "Haugesund",
  ],
  Denmark: ["Copenhagen (Oceankaj)", "Aarhus", "Skagen", "Rønne (Bornholm)", "Fredericia"],
  Sweden: ["Stockholm (Stadsgården)", "Gothenburg", "Visby", "Helsingborg", "Nynäshamn"],
  Finland: ["Helsinki (Hernesaari)", "Turku", "Kotka", "Mariehamn"],
  Estonia: ["Tallinn (Old City Harbour)", "Saaremaa"],
  Latvia: ["Riga"],
  Lithuania: ["Klaipėda"],
  Poland: ["Gdańsk (Westerplatte)", "Gdynia", "Szczecin"],
  Germany: [
    "Hamburg (Steinwerder)", "Warnemünde (Rostock)", "Kiel", "Bremerhaven",
    "Travemünde", "Wismar", "Sassnitz",
  ],
  Netherlands: ["Amsterdam (Passenger Terminal)", "Rotterdam (Wiltonhaven)", "IJmuiden"],
  Belgium: ["Zeebrugge", "Antwerp"],
  Ireland: [
    "Dublin (Alexandra Basin)", "Cobh (Cork)", "Galway", "Waterford",
    "Dún Laoghaire", "Bantry",
  ],
  "United Kingdom": [
    "Southampton", "Dover", "Portsmouth", "Liverpool", "Newcastle", "Harwich",
    "Tilbury (London)", "Hull", "Leith (Edinburgh)", "Newhaven", "Greenock (Glasgow)",
    "Belfast", "Falmouth", "Plymouth", "Portland", "Invergordon",
    "Kirkwall (Orkney)", "Lerwick (Shetland)", "Stornoway", "Scrabster",
    "Portree (Isle of Skye)",
  ],
  Iceland: [
    "Reykjavík (Skarfabakki)", "Akureyri", "Ísafjörður", "Seyðisfjörður",
    "Grundarfjörður", "Djúpivogur",
  ],
  Greenland: ["Nuuk", "Ilulissat", "Qaqortoq", "Sisimiut", "Nanortalik"],
  "Faroe Islands": ["Tórshavn", "Klaksvík"],
  "Isle of Man": ["Douglas"],
  Guernsey: ["St Peter Port"],
  Jersey: ["St Helier"],

  // ── Caribbean & Bermuda ──
  Bahamas: [
    "Nassau (Prince George Wharf)", "Freeport (Lucaya)", "Half Moon Cay",
    "CocoCay", "Great Stirrup Cay", "Princess Cays",
  ],
  Jamaica: ["Ocho Rios", "Montego Bay", "Falmouth", "Kingston", "Port Antonio"],
  "Cayman Islands": ["George Town (Grand Cayman)", "Spot Bay (Cayman Brac)", "Little Cayman"],
  Cuba: ["Havana", "Cienfuegos", "Santiago de Cuba", "Matanzas"],
  "Dominican Republic": [
    "Santo Domingo (Don Diego)", "Puerto Plata (Amber Cove)", "La Romana",
    "Samaná", "Catalina Island", "Casa de Campo",
  ],
  Haiti: ["Labadee", "Port-au-Prince"],
  "Puerto Rico": ["San Juan (Pan American Pier)", "Ponce", "Vieques", "Culebra"],
  "US Virgin Islands": [
    "Charlotte Amalie (St Thomas)", "Frederiksted (St Croix)", "Cruz Bay (St John)",
  ],
  "British Virgin Islands": ["Road Town (Tortola)", "Virgin Gorda", "Jost Van Dyke"],
  Anguilla: ["Road Bay"],
  "Antigua and Barbuda": ["St John's (Heritage Quay)", "Falmouth Harbour", "Barbuda"],
  "Saint Kitts and Nevis": ["Basseterre (Port Zante)", "Charlestown (Nevis)"],
  Montserrat: ["Little Bay"],
  Guadeloupe: ["Pointe-à-Pitre", "Basse-Terre", "Marie-Galante"],
  Dominica: ["Roseau (Woodbridge Bay)", "Cabrits (Portsmouth)"],
  Martinique: ["Fort-de-France (Pointe Simon)"],
  "Saint Lucia": ["Castries", "Soufrière", "Rodney Bay", "Vieux Fort"],
  "Saint Vincent and the Grenadines": [
    "Kingstown", "Bequia (Port Elizabeth)", "Union Island", "Canouan",
  ],
  Grenada: ["St George's (Carenage)", "Carriacou"],
  Barbados: ["Bridgetown (Deep Water Harbour)", "Port Charles"],
  "Trinidad and Tobago": ["Port of Spain", "Scarborough (Tobago)"],
  Aruba: ["Oranjestad (Cruise Terminal)", "Barcadera"],
  "Curaçao": ["Willemstad (Mega Pier)", "Willemstad (Mathey Wharf)"],
  Bonaire: ["Kralendijk"],
  "Sint Maarten": ["Philipsburg (Dr A.C. Wathey Cruise & Cargo Facility)", "Great Bay"],
  Saba: ["Fort Bay"],
  "Sint Eustatius": ["Oranjestad (St Eustatius)"],
  "Turks and Caicos Islands": ["Grand Turk (Cockburn Town)", "Providenciales"],
  Bermuda: ["Royal Naval Dockyard (King's Wharf)", "Hamilton", "St George's"],
  "Saint Barthélemy": ["Gustavia"],
  "Saint Martin": ["Marigot"],
  Belize: ["Belize City (Fort Street)", "Harvest Caye", "Ambergris Caye"],
  Honduras: ["Roatán (Coxen Hole)", "Mahogany Bay", "Puerto Cortés"],
  Guatemala: ["Puerto Quetzal", "Santo Tomás de Castilla"],

  // ── North America ──
  "United States": [
    "Miami (PortMiami)", "Fort Lauderdale (Port Everglades)", "Port Canaveral",
    "Tampa", "New Orleans", "Galveston", "Houston (Bayport)", "San Diego",
    "Los Angeles (San Pedro)", "Long Beach", "San Francisco", "Seattle",
    "Boston", "New York (Manhattan)", "New York (Brooklyn)", "Baltimore",
    "Charleston", "Jacksonville", "Norfolk", "Key West", "Honolulu",
    "Juneau", "Ketchikan", "Skagway", "Seward", "Whittier", "Sitka",
    "Haines", "Icy Strait Point", "Homer", "Valdez", "Kodiak",
  ],
  Canada: [
    "Vancouver", "Victoria", "Halifax", "Québec City", "Montreal",
    "Saint John (New Brunswick)", "Sydney (Nova Scotia)", "Charlottetown",
    "St John's (Newfoundland)", "Prince Rupert", "Sept-Îles",
  ],
  Mexico: [
    "Cozumel", "Costa Maya (Mahahual)", "Progreso", "Puerto Vallarta",
    "Cabo San Lucas", "Mazatlán", "Ensenada", "Acapulco", "Manzanillo",
    "Huatulco", "Puerto Chiapas",
  ],
  "Saint Pierre and Miquelon": ["Saint-Pierre"],

  // ── Central & South America ──
  Panama: ["Colón 2000", "Fuerte Amador (Panama City)", "Bocas del Toro"],
  "Costa Rica": ["Puerto Limón", "Puntarenas", "Puerto Caldera"],
  Nicaragua: ["San Juan del Sur", "Corinto"],
  Colombia: ["Cartagena", "Santa Marta", "Buenaventura"],
  Venezuela: ["La Guaira", "Porlamar (Isla Margarita)"],
  Ecuador: ["Puerto Ayora (Galápagos)", "Guayaquil", "Manta", "Puerto Baquerizo Moreno"],
  Peru: ["Callao (Lima)", "Salaverry", "Pisco (General San Martín)"],
  Chile: [
    "Valparaíso", "San Antonio", "Puerto Montt", "Punta Arenas",
    "Chacabuco", "Coquimbo", "Iquique", "Castro (Chiloé)",
  ],
  Argentina: ["Buenos Aires", "Ushuaia", "Puerto Madryn", "Puerto Deseado"],
  Uruguay: ["Montevideo", "Punta del Este"],
  Brazil: [
    "Santos (São Paulo)", "Rio de Janeiro", "Salvador", "Recife", "Fortaleza",
    "Búzios", "Ilhabela", "Manaus", "Belém", "Vitória", "Maceió",
  ],
  Suriname: ["Paramaribo"],
  Guyana: ["Georgetown"],
  "Falkland Islands": ["Stanley"],

  // ── Middle East & Red Sea ──
  "United Arab Emirates": [
    "Dubai (Port Rashid)", "Abu Dhabi (Zayed Port)", "Sir Bani Yas Island",
    "Sharjah (Khor Fakkan)", "Ras Al Khaimah",
  ],
  Oman: ["Muscat (Port Sultan Qaboos)", "Salalah", "Khasab", "Duqm"],
  Qatar: ["Doha (Old Port)"],
  Bahrain: ["Khalifa Bin Salman Port", "Manama"],
  "Saudi Arabia": ["Jeddah (Islamic Port)", "Yanbu", "Dammam"],
  Jordan: ["Aqaba"],
  Israel: ["Haifa", "Ashdod", "Eilat"],
  Egypt: [
    "Alexandria", "Port Said", "Safaga", "Sharm El Sheikh", "Suez",
    "Hurghada", "Marsa Alam",
  ],

  // ── Africa & Indian Ocean ──
  Morocco: ["Casablanca", "Tangier (Tanger Med)", "Agadir", "Ceuta"],
  Tunisia: ["Tunis (La Goulette)", "Sousse", "Sfax"],
  Algeria: ["Algiers", "Oran", "Bejaia"],
  Senegal: ["Dakar"],
  Gambia: ["Banjul"],
  Ghana: ["Tema", "Takoradi"],
  Nigeria: ["Lagos (Apapa)"],
  "Côte d'Ivoire": ["Abidjan"],
  Benin: ["Cotonou"],
  Togo: ["Lomé"],
  Cameroon: ["Douala", "Kribi"],
  Gabon: ["Libreville (Owendo)"],
  Angola: ["Luanda", "Namibe"],
  Namibia: ["Walvis Bay", "Lüderitz"],
  "South Africa": [
    "Cape Town", "Durban", "Port Elizabeth (Gqeberha)", "Mossel Bay",
    "Richards Bay", "East London",
  ],
  Mozambique: ["Maputo", "Ilha de Moçambique"],
  "United Republic of Tanzania": ["Zanzibar", "Dar es Salaam"],
  Kenya: ["Mombasa"],
  Seychelles: ["Victoria (Mahé)", "Praslin", "La Digue"],
  Mauritius: ["Port Louis"],
  Madagascar: ["Antsiranana (Diego Suarez)", "Nosy Be", "Toamasina", "Fort Dauphin"],
  Comoros: ["Moroni"],
  "Cabo Verde": ["Praia", "Mindelo (São Vicente)", "Sal"],
  "Sao Tome and Principe": ["Neves"],
  Djibouti: ["Djibouti"],
  Sudan: ["Port Sudan"],
  Eritrea: ["Massawa"],
  "Equatorial Guinea": ["Malabo"],

  // ── South & Southeast Asia ──
  India: [
    "Mumbai (Ballard Pier)", "Cochin (Kochi)", "Chennai", "Mormugao (Goa)",
    "New Mangalore", "Visakhapatnam", "Porbandar", "Kolkata (Haldia)",
  ],
  "Sri Lanka": ["Colombo", "Galle", "Trincomalee"],
  Maldives: ["Malé", "Hulhumalé", "Addu City"],
  Bangladesh: ["Chittagong"],
  Myanmar: ["Yangon (Thilawa)"],
  Thailand: [
    "Laem Chabang (Bangkok)", "Phuket (Ao Makham)", "Koh Samui (Nathon)",
    "Krabi", "Pattaya",
  ],
  Malaysia: [
    "Port Klang (Kuala Lumpur)", "Penang (Swettenham Pier)", "Langkawi",
    "Kota Kinabalu", "Kuching", "Malacca", "Kuantan",
  ],
  Singapore: ["Singapore (Marina Bay Cruise Centre)", "Singapore (HarbourFront Centre)"],
  Indonesia: [
    "Benoa (Bali)", "Komodo (Labuan Bajo)", "Jakarta (Tanjung Priok)",
    "Surabaya", "Semarang", "Probolinggo", "Ambon", "Makassar", "Bitung",
    "Padang", "Belawan (Medan)", "Bima (Sumbawa)",
  ],
  Vietnam: [
    "Ho Chi Minh City (Phu My)", "Ha Long Bay (Cai Lan)", "Da Nang (Tien Sa)",
    "Nha Trang", "Hue (Chan May)", "Quy Nhon",
  ],
  Cambodia: ["Sihanoukville"],
  Philippines: [
    "Manila", "Boracay (Caticlan)", "Puerto Princesa", "Cebu", "Bohol",
    "Coron", "Subic", "Legazpi",
  ],
  "Timor-Leste": ["Dili"],

  // ── East Asia ──
  China: [
    "Shanghai (Wusongkou)", "Tianjin (Beijing)", "Xiamen", "Guangzhou (Nansha)",
    "Shenzhen", "Sanya", "Qingdao", "Dalian", "Ningbo",
  ],
  "Hong Kong SAR": ["Ocean Terminal (Kowloon)", "Kai Tak Cruise Terminal"],
  "Macao SAR": ["Macao (Outer Harbour)"],
  Taiwan: ["Keelung (Taipei)", "Kaohsiung", "Taichung", "Hualien"],
  Japan: [
    "Yokohama", "Kobe", "Osaka", "Nagasaki", "Fukuoka (Hakata)", "Kagoshima",
    "Naha (Okinawa)", "Aomori", "Hakodate", "Otaru", "Shimizu", "Tokyo (Harumi)",
    "Ishigaki", "Miyakojima", "Kochi", "Kanazawa", "Sakaiminato", "Hiroshima",
    "Nagoya", "Tokushima", "Sakata", "Aburatsu (Miyazaki)",
  ],
  "Republic of Korea": ["Busan", "Incheon", "Jeju", "Sokcho", "Yeosu"],

  // ── Oceania & Pacific ──
  Australia: [
    "Sydney (Overseas Passenger Terminal)", "Sydney (White Bay)", "Melbourne (Station Pier)",
    "Brisbane", "Cairns", "Fremantle (Perth)", "Adelaide (Outer Harbor)",
    "Hobart", "Darwin", "Newcastle", "Eden", "Airlie Beach", "Port Douglas",
    "Broome", "Albany", "Burnie", "Geraldton", "Exmouth", "Townsville", "Gladstone",
  ],
  "New Zealand": [
    "Auckland", "Tauranga", "Wellington", "Lyttelton (Christchurch)",
    "Dunedin (Port Chalmers)", "Napier", "Picton", "Gisborne", "Timaru",
    "Bluff (Invercargill)", "Russell (Bay of Islands)",
  ],
  "French Polynesia": [
    "Papeete", "Bora Bora", "Moorea", "Raiatea", "Nuku Hiva", "Rangiroa", "Huahine",
  ],
  "New Caledonia": ["Nouméa", "Lifou", "Isle of Pines", "Maré"],
  Fiji: ["Suva", "Lautoka", "Denarau", "Savusavu"],
  Vanuatu: ["Port Vila", "Luganville", "Mystery Island"],
  Samoa: ["Apia"],
  "American Samoa": ["Pago Pago"],
  Tonga: ["Nuku'alofa", "Vava'u (Neiafu)"],
  "Cook Islands": ["Rarotonga (Avatiu)", "Aitutaki"],
  "Papua New Guinea": ["Port Moresby", "Alotau", "Rabaul", "Madang", "Kiriwina"],
  "Solomon Islands": ["Honiara", "Gizo", "Noro"],
  Palau: ["Koror (Malakal)"],
  Guam: ["Apra Harbor"],
  "Northern Mariana Islands": ["Saipan", "Tinian"],
  "Norfolk Island": ["Kingston"],
  "Marshall Islands": ["Majuro"],
  Micronesia: ["Pohnpei (Kolonia)", "Yap", "Chuuk"],
  Kiribati: ["Tarawa"],
  Tuvalu: ["Funafuti"],
  Niue: ["Alofi"],
  "Wallis and Futuna": ["Mata-Utu"],
  "Pitcairn Islands": ["Adamstown"],
  Nauru: ["Aiwo"],
  "Åland Islands": ["Mariehamn"],
};

// Terminals for one country, as ready-made selector options.
export const terminalsForCountry = (country) =>
  (COUNTRY_TERMINALS[(country || "").trim()] || []).map((name) => ({ key: name, label: name }));