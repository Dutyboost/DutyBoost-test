// Additional airport coverage — Europe, Asia & the Americas
// Mid-size and secondary airports with duty-free / retail operations.
// Traffic figures are rounded 2024-2025 annual passenger volumes.

export const ADDITIONAL_AIRPORTS = [
  // ══════════════════════════════════════════════════════════
  // EUROPE
  // ══════════════════════════════════════════════════════════
  // Spain
  // France
  { name: "Rennes Saint-Jacques Airport", code: "RNS", city: "Rennes", country: "France", annual_pax: 900000 },
  { name: "Deauville Normandie Airport", code: "DOL", city: "Deauville", country: "France", annual_pax: 200000 },
  { name: "Figari Sud-Corse Airport", code: "FSC", city: "Figari", country: "France", annual_pax: 800000 },
  { name: "Metz-Nancy-Lorraine Airport", code: "ETZ", city: "Metz", country: "France", annual_pax: 300000 },
  { name: "Lorient Bretagne Sud Airport", code: "LRT", city: "Lorient", country: "France", annual_pax: 150000 },
  { name: "Nîmes Alès Camargue Cévennes Airport", code: "FNI", city: "Nîmes", country: "France", annual_pax: 200000 },
  { name: "Béziers Cap d'Agde Airport", code: "BZR", city: "Béziers", country: "France", annual_pax: 300000 },
  { name: "Poitiers-Biard Airport", code: "PIS", city: "Poitiers", country: "France", annual_pax: 130000 },
  { name: "La Rochelle Île de Ré Airport", code: "LRH", city: "La Rochelle", country: "France", annual_pax: 250000 },
  // Germany
  { name: "Weeze Airport Niederrhein", code: "NRN", city: "Weeze", country: "Germany", annual_pax: 1200000 },
  { name: "Frankfurt-Hahn Airport", code: "HHN", city: "Hahn", country: "Germany", annual_pax: 1500000 },
  // United Kingdom & Crown Dependencies
  { name: "Southampton Airport", code: "SOU", city: "Southampton", country: "United Kingdom", annual_pax: 800000 },
  { name: "Norwich Airport", code: "NWI", city: "Norwich", country: "United Kingdom", annual_pax: 500000 },
  { name: "Humberside Airport", code: "HUY", city: "Kirmington", country: "United Kingdom", annual_pax: 200000 },
  { name: "Cornwall Airport Newquay", code: "NQY", city: "Newquay", country: "United Kingdom", annual_pax: 500000 },
  { name: "Teesside International Airport", code: "MME", city: "Darlington", country: "United Kingdom", annual_pax: 200000 },
  { name: "Jersey Airport", code: "JER", city: "Saint Peter", country: "Jersey", annual_pax: 1600000 },
  { name: "Guernsey Airport", code: "GCI", city: "Saint Peter Port", country: "Guernsey", annual_pax: 900000 },
  { name: "Isle of Man Airport", code: "IOM", city: "Castletown", country: "Isle of Man", annual_pax: 700000 },
  // Ireland
  { name: "Ireland West Airport Knock", code: "NOC", city: "Charlestown", country: "Ireland", annual_pax: 800000 },
  { name: "Kerry Airport", code: "KIR", city: "Farranfore", country: "Ireland", annual_pax: 400000 },
  // Italy
  { name: "Reggio Calabria Airport", code: "REG", city: "Reggio Calabria", country: "Italy", annual_pax: 500000 },
  { name: "Lamezia Terme International Airport", code: "SUF", city: "Lamezia Terme", country: "Italy", annual_pax: 3000000 },
  { name: "Brescia Montichiari Airport", code: "VBS", city: "Brescia", country: "Italy", annual_pax: 300000 },
  // Sweden
  { name: "Visby Airport", code: "VBY", city: "Visby", country: "Sweden", annual_pax: 400000 },
  { name: "Kiruna Airport", code: "KRN", city: "Kiruna", country: "Sweden", annual_pax: 300000 },
  { name: "Stockholm Skavsta Airport", code: "NYO", city: "Nyköping", country: "Sweden", annual_pax: 800000 },
  { name: "Stockholm Västerås Airport", code: "VST", city: "Västerås", country: "Sweden", annual_pax: 300000 },
  { name: "Sundsvall-Timrå Airport", code: "SDL", city: "Sundsvall", country: "Sweden", annual_pax: 300000 },
  // Norway
  { name: "Bodø Airport", code: "BOO", city: "Bodø", country: "Norway", annual_pax: 2000000 },
  { name: "Harstad/Narvik Airport Evenes", code: "EVE", city: "Evenes", country: "Norway", annual_pax: 800000 },
  { name: "Alta Airport", code: "ALF", city: "Alta", country: "Norway", annual_pax: 400000 },
  { name: "Kristiansand Airport Kjevik", code: "KRS", city: "Kristiansand", country: "Norway", annual_pax: 1000000 },
  { name: "Haugesund Airport", code: "HAU", city: "Haugesund", country: "Norway", annual_pax: 700000 },
  { name: "Molde Airport", code: "MOL", city: "Molde", country: "Norway", annual_pax: 500000 },
  // Denmark
  { name: "Aarhus Airport", code: "AAR", city: "Aarhus", country: "Denmark", annual_pax: 500000 },
  { name: "Bornholm Airport", code: "RNN", city: "Rønne", country: "Denmark", annual_pax: 250000 },
  // Finland
  { name: "Kuopio Airport", code: "KUO", city: "Kuopio", country: "Finland", annual_pax: 300000 },
  { name: "Kittilä Airport", code: "KTT", city: "Kittilä", country: "Finland", annual_pax: 400000 },
  { name: "Ivalo Airport", code: "IVL", city: "Ivalo", country: "Finland", annual_pax: 250000 },
  { name: "Vaasa Airport", code: "VAA", city: "Vaasa", country: "Finland", annual_pax: 300000 },
  // Iceland
  { name: "Akureyri Airport", code: "AEY", city: "Akureyri", country: "Iceland", annual_pax: 300000 },
  // Netherlands & Belgium
  { name: "Ostend-Bruges International Airport", code: "OST", city: "Ostend", country: "Belgium", annual_pax: 200000 },
  // Portugal
  { name: "João Paulo II Airport", code: "PDL", city: "Ponta Delgada", country: "Portugal", annual_pax: 2000000 },
  { name: "Lajes Airport", code: "TER", city: "Praia da Vitória", country: "Portugal", annual_pax: 700000 },
  // Greece
  { name: "Zakynthos International Airport", code: "ZTH", city: "Zakynthos", country: "Greece", annual_pax: 1800000 },
  { name: "Kefalonia International Airport", code: "EFL", city: "Kefalonia", country: "Greece", annual_pax: 800000 },
  { name: "Aktion National Airport", code: "PVK", city: "Preveza", country: "Greece", annual_pax: 700000 },
  { name: "Kalamata International Airport", code: "KLX", city: "Kalamata", country: "Greece", annual_pax: 400000 },
  { name: "Mytilene International Airport", code: "MJT", city: "Mytilene", country: "Greece", annual_pax: 500000 },
  { name: "Samos International Airport", code: "SMI", city: "Samos", country: "Greece", annual_pax: 400000 },
  { name: "Skiathos International Airport", code: "JSI", city: "Skiathos", country: "Greece", annual_pax: 400000 },
  { name: "Alexandroupoli Airport", code: "AXD", city: "Alexandroupoli", country: "Greece", annual_pax: 300000 },
  // Turkey
  { name: "Trabzon Airport", code: "TZX", city: "Trabzon", country: "Turkey", annual_pax: 4000000 },
  { name: "Adana Şakirpaşa Airport", code: "ADA", city: "Adana", country: "Turkey", annual_pax: 3000000 },
  { name: "Kayseri Erkilet Airport", code: "ASR", city: "Kayseri", country: "Turkey", annual_pax: 2000000 },
  { name: "Gaziantep Oğuzeli Airport", code: "GZT", city: "Gaziantep", country: "Turkey", annual_pax: 2000000 },
  { name: "Konya Airport", code: "KYA", city: "Konya", country: "Turkey", annual_pax: 1000000 },
  // Poland
  { name: "Lublin Airport", code: "LUZ", city: "Lublin", country: "Poland", annual_pax: 500000 },
  { name: "Warsaw Radom Airport", code: "RDO", city: "Radom", country: "Poland", annual_pax: 300000 },
  // Baltics
  { name: "Kaunas Airport", code: "KUN", city: "Kaunas", country: "Lithuania", annual_pax: 1200000 },
  { name: "Palanga International Airport", code: "PLQ", city: "Palanga", country: "Lithuania", annual_pax: 300000 },
  // Romania
  { name: "Suceava Ștefan cel Mare International Airport", code: "SCV", city: "Suceava", country: "Romania", annual_pax: 700000 },
  { name: "Oradea International Airport", code: "OMR", city: "Oradea", country: "Romania", annual_pax: 300000 },
  // Switzerland
  { name: "Bern Airport", code: "BRN", city: "Bern", country: "Switzerland", annual_pax: 200000 },

  // ══════════════════════════════════════════════════════════
  // ASIA (incl. Middle East & Central Asia)
  // ══════════════════════════════════════════════════════════
  // China
  { name: "Guilin Liangjiang International Airport", code: "KWL", city: "Guilin", country: "China", annual_pax: 10000000 },
  { name: "Changzhou Benniu International Airport", code: "CZX", city: "Changzhou", country: "China", annual_pax: 4000000 },
  { name: "Yangzhou Taizhou International Airport", code: "YTY", city: "Yangzhou", country: "China", annual_pax: 3000000 },
  { name: "Nantong Xingdong International Airport", code: "NTG", city: "Nantong", country: "China", annual_pax: 3500000 },
  { name: "Lianyungang Huaguoshan International Airport", code: "LYG", city: "Lianyungang", country: "China", annual_pax: 2500000 },
  { name: "Xuzhou Guanyin International Airport", code: "XUZ", city: "Xuzhou", country: "China", annual_pax: 3000000 },
  { name: "Taizhou Luqiao Airport", code: "HYN", city: "Taizhou", country: "China", annual_pax: 2000000 },
  { name: "Zhanjiang Wuchuan International Airport", code: "ZHA", city: "Zhanjiang", country: "China", annual_pax: 3000000 },
  { name: "Yiwu Airport", code: "YIW", city: "Yiwu", country: "China", annual_pax: 3000000 },
  // India
  { name: "Kushok Bakula Rimpochee Airport", code: "IXL", city: "Leh", country: "India", annual_pax: 1000000 },
  { name: "Rajkot International Airport", code: "RAJ", city: "Rajkot", country: "India", annual_pax: 1500000 },
  { name: "Jabalpur Airport", code: "JLR", city: "Jabalpur", country: "India", annual_pax: 700000 },
  { name: "Gwalior Airport", code: "GWL", city: "Gwalior", country: "India", annual_pax: 500000 },
  { name: "Prayagraj Airport", code: "IXD", city: "Prayagraj", country: "India", annual_pax: 900000 },
  { name: "Hubli Airport", code: "HBX", city: "Hubli", country: "India", annual_pax: 500000 },
  { name: "Tirupati Airport", code: "TIR", city: "Tirupati", country: "India", annual_pax: 800000 },
  { name: "Silchar Airport", code: "IXS", city: "Silchar", country: "India", annual_pax: 500000 },
  { name: "Dimapur Airport", code: "DMU", city: "Dimapur", country: "India", annual_pax: 400000 },
  { name: "Rajahmundry Airport", code: "RJA", city: "Rajahmundry", country: "India", annual_pax: 400000 },
  // Japan
  { name: "New Ishigaki Airport", code: "ISG", city: "Ishigaki", country: "Japan", annual_pax: 2000000 },
  { name: "Miyako Airport", code: "MMY", city: "Miyakojima", country: "Japan", annual_pax: 1000000 },
  { name: "Tottori Sand Dunes Conan Airport", code: "TTJ", city: "Tottori", country: "Japan", annual_pax: 500000 },
  { name: "Hanamaki Airport", code: "HNA", city: "Hanamaki", country: "Japan", annual_pax: 400000 },
  { name: "Fukushima Airport", code: "FKS", city: "Fukushima", country: "Japan", annual_pax: 400000 },
  { name: "Wakkanai Airport", code: "WKJ", city: "Wakkanai", country: "Japan", annual_pax: 200000 },
  { name: "Memanbetsu Airport", code: "MMB", city: "Ozora", country: "Japan", annual_pax: 300000 },
  // South Korea
  { name: "Yangyang International Airport", code: "YNY", city: "Yangyang", country: "South Korea", annual_pax: 300000 },
  { name: "Pohang Gyeongju Airport", code: "KPO", city: "Pohang", country: "South Korea", annual_pax: 300000 },
  { name: "Sacheon Airport", code: "HIN", city: "Sacheon", country: "South Korea", annual_pax: 200000 },
  // Indonesia
  { name: "Sultan Mahmud Badaruddin II International Airport", code: "PLM", city: "Palembang", country: "Indonesia", annual_pax: 4000000 },
  { name: "Sultan Syarif Kasim II International Airport", code: "PKU", city: "Pekanbaru", country: "Indonesia", annual_pax: 4000000 },
  { name: "Hang Nadim International Airport", code: "BTH", city: "Batam", country: "Indonesia", annual_pax: 4000000 },
  { name: "Sam Ratulangi International Airport", code: "MDC", city: "Manado", country: "Indonesia", annual_pax: 2500000 },
  { name: "Sentani International Airport", code: "DJJ", city: "Jayapura", country: "Indonesia", annual_pax: 1500000 },
  { name: "Adi Soemarmo International Airport", code: "SOC", city: "Surakarta", country: "Indonesia", annual_pax: 2000000 },
  { name: "Adisutjipto International Airport", code: "JOG", city: "Yogyakarta", country: "Indonesia", annual_pax: 2000000 },
  // Philippines
  { name: "Bacolod-Silay Airport", code: "BCD", city: "Bacolod", country: "Philippines", annual_pax: 2000000 },
  { name: "Daniel Z. Romualdez Airport", code: "TAC", city: "Tacloban", country: "Philippines", annual_pax: 1500000 },
  { name: "Godofredo P. Ramos Airport", code: "MPH", city: "Caticlan", country: "Philippines", annual_pax: 2000000 },
  { name: "Zamboanga International Airport", code: "ZAM", city: "Zamboanga", country: "Philippines", annual_pax: 1000000 },
  { name: "Sibulan Airport", code: "DGT", city: "Dumaguete", country: "Philippines", annual_pax: 700000 },
  { name: "Francisco B. Reyes Airport", code: "USU", city: "Busuanga", country: "Philippines", annual_pax: 500000 },
  // Vietnam
  { name: "Pleiku Airport", code: "PXU", city: "Pleiku", country: "Vietnam", annual_pax: 700000 },
  { name: "Phu Cat Airport", code: "UIH", city: "Quy Nhon", country: "Vietnam", annual_pax: 1500000 },
  { name: "Dong Tac Airport", code: "TBB", city: "Tuy Hoa", country: "Vietnam", annual_pax: 800000 },
  { name: "Dong Hoi Airport", code: "VDH", city: "Dong Hoi", country: "Vietnam", annual_pax: 500000 },
  { name: "Dien Bien Phu Airport", code: "DIN", city: "Dien Bien Phu", country: "Vietnam", annual_pax: 300000 },
  // Thailand
  { name: "Ubon Ratchathani Airport", code: "UBP", city: "Ubon Ratchathani", country: "Thailand", annual_pax: 800000 },
  { name: "Khon Kaen Airport", code: "KKC", city: "Khon Kaen", country: "Thailand", annual_pax: 1500000 },
  { name: "Surat Thani International Airport", code: "URT", city: "Surat Thani", country: "Thailand", annual_pax: 1500000 },
  { name: "Nakhon Si Thammarat Airport", code: "NST", city: "Nakhon Si Thammarat", country: "Thailand", annual_pax: 800000 },
  // Malaysia
  { name: "Senai International Airport", code: "JHB", city: "Johor Bahru", country: "Malaysia", annual_pax: 4000000 },
  { name: "Langkawi International Airport", code: "LGK", city: "Langkawi", country: "Malaysia", annual_pax: 2500000 },
  { name: "Sultan Abdul Aziz Shah Airport", code: "SZB", city: "Subang", country: "Malaysia", annual_pax: 1500000 },
  { name: "Malacca International Airport", code: "MKZ", city: "Malacca", country: "Malaysia", annual_pax: 500000 },
  { name: "Tawau Airport", code: "TWU", city: "Tawau", country: "Malaysia", annual_pax: 1000000 },
  { name: "Sandakan Airport", code: "SDK", city: "Sandakan", country: "Malaysia", annual_pax: 700000 },
  // Bangladesh & Pakistan
  { name: "Shah Amanat International Airport", code: "CGP", city: "Chittagong", country: "Bangladesh", annual_pax: 2500000 },
  { name: "Osmani International Airport", code: "ZYL", city: "Sylhet", country: "Bangladesh", annual_pax: 1000000 },
  { name: "Bacha Khan International Airport", code: "PEW", city: "Peshawar", country: "Pakistan", annual_pax: 1500000 },
  { name: "Multan International Airport", code: "MUX", city: "Multan", country: "Pakistan", annual_pax: 1000000 },
  { name: "Sialkot International Airport", code: "SKT", city: "Sialkot", country: "Pakistan", annual_pax: 1500000 },
  { name: "Faisalabad International Airport", code: "LYP", city: "Faisalabad", country: "Pakistan", annual_pax: 700000 },
  // Nepal & Sri Lanka
  { name: "Pokhara International Airport", code: "PKR", city: "Pokhara", country: "Nepal", annual_pax: 500000 },
  { name: "Mattala Rajapaksa International Airport", code: "HRI", city: "Hambantota", country: "Sri Lanka", annual_pax: 100000 },
  // Middle East
  { name: "Baghdad International Airport", code: "BGW", city: "Baghdad", country: "Iraq", annual_pax: 5000000 },
  { name: "Erbil International Airport", code: "EBL", city: "Erbil", country: "Iraq", annual_pax: 2000000 },
  { name: "Basra International Airport", code: "BSR", city: "Basra", country: "Iraq", annual_pax: 1500000 },
  { name: "Al Najaf International Airport", code: "NJF", city: "Najaf", country: "Iraq", annual_pax: 1500000 },
  { name: "Sohar Airport", code: "OHS", city: "Sohar", country: "Oman", annual_pax: 500000 },
  // Caucasus & Central Asia
  { name: "Tbilisi International Airport", code: "TBS", city: "Tbilisi", country: "Georgia", annual_pax: 4000000 },
  { name: "Zvartnots International Airport", code: "EVN", city: "Yerevan", country: "Armenia", annual_pax: 3500000 },
  { name: "Heydar Aliyev International Airport", code: "GYD", city: "Baku", country: "Azerbaijan", annual_pax: 5000000 },
  { name: "Shymkent International Airport", code: "CIT", city: "Shymkent", country: "Kazakhstan", annual_pax: 2000000 },
  { name: "Samarkand International Airport", code: "SKD", city: "Samarkand", country: "Uzbekistan", annual_pax: 1000000 },
  { name: "Bukhara International Airport", code: "BHK", city: "Bukhara", country: "Uzbekistan", annual_pax: 500000 },
  { name: "Manas International Airport", code: "FRU", city: "Bishkek", country: "Kyrgyzstan", annual_pax: 1500000 },
  { name: "Ashgabat International Airport", code: "ASB", city: "Ashgabat", country: "Turkmenistan", annual_pax: 1500000 },
  { name: "Dushanbe International Airport", code: "DYU", city: "Dushanbe", country: "Tajikistan", annual_pax: 1000000 },

  // ══════════════════════════════════════════════════════════
  // AMERICAS
  // ══════════════════════════════════════════════════════════
  // United States
  { name: "San Antonio International Airport", code: "SAT", city: "San Antonio", country: "United States", annual_pax: 10000000 },
  { name: "Will Rogers World Airport", code: "OKC", city: "Oklahoma City", country: "United States", annual_pax: 4500000 },
  { name: "Northwest Arkansas National Airport", code: "XNA", city: "Bentonville", country: "United States", annual_pax: 2000000 },
  { name: "Greater Rochester International Airport", code: "ROC", city: "Rochester", country: "United States", annual_pax: 2500000 },
  { name: "Portland International Jetport", code: "PWM", city: "Portland", country: "United States", annual_pax: 2000000 },
  { name: "Manchester-Boston Regional Airport", code: "MHT", city: "Manchester", country: "United States", annual_pax: 1500000 },
  { name: "Burlington International Airport", code: "BTV", city: "Burlington", country: "United States", annual_pax: 1200000 },
  { name: "Piedmont Triad International Airport", code: "GSO", city: "Greensboro", country: "United States", annual_pax: 2000000 },
  { name: "Huntsville International Airport", code: "HSV", city: "Huntsville", country: "United States", annual_pax: 1500000 },
  { name: "Harrisburg International Airport", code: "MDT", city: "Middletown", country: "United States", annual_pax: 1500000 },
  { name: "Baton Rouge Metropolitan Airport", code: "BTR", city: "Baton Rouge", country: "United States", annual_pax: 1000000 },
  { name: "Jackson-Medgar Wiley Evers International Airport", code: "JAN", city: "Jackson", country: "United States", annual_pax: 1000000 },
  { name: "Dayton International Airport", code: "DAY", city: "Dayton", country: "United States", annual_pax: 1500000 },
  { name: "Green Bay Austin Straubel International Airport", code: "GRB", city: "Green Bay", country: "United States", annual_pax: 1000000 },
  { name: "The Eastern Iowa Airport", code: "CID", city: "Cedar Rapids", country: "United States", annual_pax: 1300000 },
  { name: "Blue Grass Airport", code: "LEX", city: "Lexington", country: "United States", annual_pax: 1300000 },
  { name: "Wichita Dwight D. Eisenhower National Airport", code: "ICT", city: "Wichita", country: "United States", annual_pax: 1500000 },
  { name: "Lubbock Preston Smith International Airport", code: "LBB", city: "Lubbock", country: "United States", annual_pax: 1000000 },
  { name: "Bozeman Yellowstone International Airport", code: "BZN", city: "Bozeman", country: "United States", annual_pax: 1500000 },
  { name: "Eugene Airport", code: "EUG", city: "Eugene", country: "United States", annual_pax: 1000000 },
  { name: "Palm Springs International Airport", code: "PSP", city: "Palm Springs", country: "United States", annual_pax: 2500000 },
  { name: "Santa Barbara Airport", code: "SBA", city: "Santa Barbara", country: "United States", annual_pax: 1000000 },
  { name: "Corpus Christi International Airport", code: "CRP", city: "Corpus Christi", country: "United States", annual_pax: 800000 },
  { name: "Valley International Airport", code: "HRL", city: "Harlingen", country: "United States", annual_pax: 800000 },
  { name: "McAllen Miller International Airport", code: "MFE", city: "McAllen", country: "United States", annual_pax: 800000 },
  { name: "Akron-Canton Airport", code: "CAK", city: "Akron", country: "United States", annual_pax: 1500000 },
  { name: "Bishop International Airport", code: "FNT", city: "Flint", country: "United States", annual_pax: 800000 },
  { name: "Eugene F. Kranz Toledo Express Airport", code: "TOL", city: "Toledo", country: "United States", annual_pax: 500000 },
  { name: "Springfield-Branson National Airport", code: "SGF", city: "Springfield", country: "United States", annual_pax: 1000000 },
  { name: "Rick Husband Amarillo International Airport", code: "AMA", city: "Amarillo", country: "United States", annual_pax: 800000 },
  { name: "Midland International Air and Space Port", code: "MAF", city: "Midland", country: "United States", annual_pax: 700000 },
  { name: "Monterey Regional Airport", code: "MRY", city: "Monterey", country: "United States", annual_pax: 500000 },
  { name: "San Luis Obispo County Regional Airport", code: "SBP", city: "San Luis Obispo", country: "United States", annual_pax: 600000 },
  // Canada
  { name: "Victoria International Airport", code: "YYJ", city: "Victoria", country: "Canada", annual_pax: 1800000 },
  { name: "Kelowna International Airport", code: "YLW", city: "Kelowna", country: "Canada", annual_pax: 2000000 },
  { name: "Regina International Airport", code: "YQR", city: "Regina", country: "Canada", annual_pax: 1200000 },
  { name: "Saskatoon John G. Diefenbaker International Airport", code: "YXE", city: "Saskatoon", country: "Canada", annual_pax: 1400000 },
  { name: "Abbotsford International Airport", code: "YXX", city: "Abbotsford", country: "Canada", annual_pax: 1000000 },
  { name: "St. John's International Airport", code: "YYT", city: "St. John's", country: "Canada", annual_pax: 1500000 },
  { name: "Greater Moncton Roméo LeBlanc International Airport", code: "YQM", city: "Moncton", country: "Canada", annual_pax: 700000 },
  { name: "Erik Nielsen Whitehorse International Airport", code: "YXY", city: "Whitehorse", country: "Canada", annual_pax: 300000 },
  { name: "Yellowknife Airport", code: "YZF", city: "Yellowknife", country: "Canada", annual_pax: 400000 },
  { name: "Fredericton International Airport", code: "YFC", city: "Fredericton", country: "Canada", annual_pax: 400000 },
  { name: "Saint John Airport", code: "YSJ", city: "Saint John", country: "Canada", annual_pax: 300000 },
  { name: "Kamloops Airport", code: "YKA", city: "Kamloops", country: "Canada", annual_pax: 300000 },
  // Mexico
  { name: "Toluca International Airport", code: "TLC", city: "Toluca", country: "Mexico", annual_pax: 1500000 },
  { name: "Querétaro Intercontinental Airport", code: "QRO", city: "Querétaro", country: "Mexico", annual_pax: 2000000 },
  { name: "Oaxaca International Airport", code: "OAX", city: "Oaxaca", country: "Mexico", annual_pax: 1500000 },
  { name: "Bahías de Huatulco International Airport", code: "HUX", city: "Huatulco", country: "Mexico", annual_pax: 700000 },
  { name: "Veracruz International Airport", code: "VER", city: "Veracruz", country: "Mexico", annual_pax: 1200000 },
  { name: "Ángel Albino Corzo International Airport", code: "TGZ", city: "Tuxtla Gutiérrez", country: "Mexico", annual_pax: 1200000 },
  { name: "Felipe Ángeles International Airport", code: "NLU", city: "Mexico City", country: "Mexico", annual_pax: 3000000 },
  { name: "Manuel Márquez de León International Airport", code: "LAP", city: "La Paz", country: "Mexico", annual_pax: 1000000 },
  { name: "Abraham González International Airport", code: "CJS", city: "Ciudad Juárez", country: "Mexico", annual_pax: 1500000 },
  { name: "Ponciano Arriaga International Airport", code: "SLP", city: "San Luis Potosí", country: "Mexico", annual_pax: 700000 },
  { name: "Jesús Terán Peredo International Airport", code: "AGU", city: "Aguascalientes", country: "Mexico", annual_pax: 700000 },
  { name: "General Leobardo C. Ruiz International Airport", code: "ZCL", city: "Zacatecas", country: "Mexico", annual_pax: 500000 },
  { name: "Carlos Rovirosa Pérez International Airport", code: "VSA", city: "Villahermosa", country: "Mexico", annual_pax: 1000000 },
  { name: "Hermanos Serdán International Airport", code: "PBC", city: "Puebla", country: "Mexico", annual_pax: 700000 },
  { name: "Francisco Sarabia International Airport", code: "TRC", city: "Torreón", country: "Mexico", annual_pax: 700000 },
  { name: "General Francisco Javier Mina International Airport", code: "TAM", city: "Tampico", country: "Mexico", annual_pax: 500000 },
  { name: "Guadalupe Victoria International Airport", code: "DGO", city: "Durango", country: "Mexico", annual_pax: 400000 },
  { name: "Ixtapa-Zihuatanejo International Airport", code: "ZIH", city: "Zihuatanejo", country: "Mexico", annual_pax: 600000 },
  // Brazil
  { name: "Foz do Iguaçu International Airport", code: "IGU", city: "Foz do Iguaçu", country: "Brazil", annual_pax: 2000000 },
  { name: "Ministro Victor Konder International Airport", code: "NVT", city: "Navegantes", country: "Brazil", annual_pax: 2000000 },
  { name: "Marechal Cunha Machado International Airport", code: "SLZ", city: "São Luís", country: "Brazil", annual_pax: 2000000 },
  { name: "Senador Petrônio Portella Airport", code: "THE", city: "Teresina", country: "Brazil", annual_pax: 1500000 },
  { name: "Brigadeiro Lysias Rodrigues Airport", code: "PMW", city: "Palmas", country: "Brazil", annual_pax: 1000000 },
  { name: "Santa Maria Airport", code: "AJU", city: "Aracaju", country: "Brazil", annual_pax: 1500000 },
  { name: "Macapá International Airport", code: "MCP", city: "Macapá", country: "Brazil", annual_pax: 1000000 },
  { name: "Maestro Wilson Fonseca Airport", code: "STM", city: "Santarém", country: "Brazil", annual_pax: 700000 },
  { name: "Governador Jorge Teixeira de Oliveira International Airport", code: "PVH", city: "Porto Velho", country: "Brazil", annual_pax: 1000000 },
  { name: "Porto Seguro Airport", code: "BPS", city: "Porto Seguro", country: "Brazil", annual_pax: 1200000 },
  { name: "Bahia-Jorge Amado Airport", code: "IOS", city: "Ilhéus", country: "Brazil", annual_pax: 700000 },
  { name: "Orlando Bezerra de Menezes Airport", code: "JDO", city: "Juazeiro do Norte", country: "Brazil", annual_pax: 600000 },
  { name: "Senador Nilo Coelho Airport", code: "PNZ", city: "Petrolina", country: "Brazil", annual_pax: 500000 },
  { name: "Rio Branco International Airport", code: "RBR", city: "Rio Branco", country: "Brazil", annual_pax: 500000 },
  { name: "Atlas Brasil Cantanhede International Airport", code: "BVB", city: "Boa Vista", country: "Brazil", annual_pax: 400000 },
  // Peru
  { name: "Capitán FAP Guillermo Concha Iberico International Airport", code: "PIU", city: "Piura", country: "Peru", annual_pax: 1000000 },
  { name: "Capitán FAP Carlos Martínez de Pinillos International Airport", code: "TRU", city: "Trujillo", country: "Peru", annual_pax: 900000 },
  { name: "Coronel FAP Francisco Secada Vignetta International Airport", code: "IQT", city: "Iquitos", country: "Peru", annual_pax: 900000 },
  { name: "Mayor General FAP Armando Revoredo Iglesias Airport", code: "CJA", city: "Cajamarca", country: "Peru", annual_pax: 400000 },
  { name: "Coronel FAP Carlos Ciriani Santa Rosa International Airport", code: "TCQ", city: "Tacna", country: "Peru", annual_pax: 500000 },
  { name: "Padre Aldamiz International Airport", code: "PEM", city: "Puerto Maldonado", country: "Peru", annual_pax: 400000 },
  // Chile
  { name: "Diego Aracena International Airport", code: "IQQ", city: "Iquique", country: "Chile", annual_pax: 1800000 },
  { name: "Presidente Carlos Ibáñez del Campo International Airport", code: "PUQ", city: "Punta Arenas", country: "Chile", annual_pax: 800000 },
  { name: "El Tepual Airport", code: "PMC", city: "Puerto Montt", country: "Chile", annual_pax: 1500000 },
  { name: "La Florida Airport", code: "LSC", city: "La Serena", country: "Chile", annual_pax: 700000 },
  { name: "El Loa Airport", code: "CJC", city: "Calama", country: "Chile", annual_pax: 1500000 },
  { name: "La Araucanía Airport", code: "ZCO", city: "Temuco", country: "Chile", annual_pax: 700000 },
  // Argentina
  { name: "Teniente Benjamín Matienzo International Airport", code: "TUC", city: "Tucumán", country: "Argentina", annual_pax: 1000000 },
  { name: "Presidente Perón International Airport", code: "NQN", city: "Neuquén", country: "Argentina", annual_pax: 800000 },
  { name: "Piloto Civil Norberto Fernández International Airport", code: "RGL", city: "Río Gallegos", country: "Argentina", annual_pax: 400000 },
  // Colombia
  { name: "Los Garzones Airport", code: "MTR", city: "Montería", country: "Colombia", annual_pax: 1000000 },
  { name: "El Edén International Airport", code: "AXM", city: "Armenia", country: "Colombia", annual_pax: 700000 },
  { name: "Alfonso López Pumarejo Airport", code: "VUP", city: "Valledupar", country: "Colombia", annual_pax: 500000 },
  { name: "Antonio Nariño Airport", code: "PSO", city: "Pasto", country: "Colombia", annual_pax: 400000 },
  // Ecuador & Bolivia
  { name: "Eloy Alfaro International Airport", code: "MEC", city: "Manta", country: "Ecuador", annual_pax: 700000 },
  { name: "Capitán Oriel Lea Plaza Airport", code: "TJA", city: "Tarija", country: "Bolivia", annual_pax: 400000 },
  { name: "Joya Andina Airport", code: "UYU", city: "Uyuni", country: "Bolivia", annual_pax: 300000 },
  // Central America & Caribbean
  { name: "Guanacaste Airport", code: "LIR", city: "Liberia", country: "Costa Rica", annual_pax: 1200000 },
  { name: "Ramón Villeda Morales International Airport", code: "SAP", city: "San Pedro Sula", country: "Honduras", annual_pax: 1500000 },
  { name: "Juan Manuel Gálvez International Airport", code: "RTB", city: "Roatán", country: "Honduras", annual_pax: 700000 },
  { name: "Palmerola International Airport", code: "XPL", city: "Comayagua", country: "Honduras", annual_pax: 700000 },
  { name: "V.C. Bird International Airport", code: "ANU", city: "Saint John's", country: "Antigua and Barbuda", annual_pax: 1500000 },
  { name: "Owen Roberts International Airport", code: "GCM", city: "George Town", country: "Cayman Islands", annual_pax: 1200000 },
];

const EUROPE_COUNTRIES = new Set([
  "Spain", "France", "Germany", "United Kingdom", "Jersey", "Guernsey", "Isle of Man",
  "Ireland", "Italy", "Sweden", "Norway", "Denmark", "Finland", "Iceland", "Netherlands",
  "Belgium", "Portugal", "Greece", "Turkey", "Poland", "Lithuania", "Romania", "Switzerland",
]);

const AMERICAS_COUNTRIES = new Set([
  "United States", "Canada", "Mexico", "Brazil", "Peru", "Chile", "Argentina", "Colombia",
  "Ecuador", "Bolivia", "Costa Rica", "Honduras", "Dominican Republic",
  "Antigua and Barbuda", "Cayman Islands",
]);

ADDITIONAL_AIRPORTS.forEach(a => {
  a.daily_pax = Math.round(a.annual_pax / 365);
  a.region = EUROPE_COUNTRIES.has(a.country)
    ? "Europe"
    : AMERICAS_COUNTRIES.has(a.country)
      ? "Americas"
      : "Asia";
});

export default ADDITIONAL_AIRPORTS;