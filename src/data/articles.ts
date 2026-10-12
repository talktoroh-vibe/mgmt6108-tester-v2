import { Article, LiveDispatch } from '../types';

export const LIVE_DISPATCHES: LiveDispatch[] = [
  {
    time: '18:45',
    title: 'French Prime Minister opens bilateral budget talks with parliamentary leaders',
    category: 'France',
    readTime: '3 min read',
    isImportant: true
  },
  {
    time: '17:30',
    title: 'European Commission approves €3.2bn cross-border clean hydrogen grid',
    category: 'Economy',
    readTime: '4 min read'
  },
  {
    time: '16:15',
    title: 'UN Climate Council issues emergency alert on Mediterranean surface temperatures',
    category: 'Environment',
    readTime: '5 min read',
    isImportant: true
  },
  {
    time: '15:20',
    title: 'Louvre Abu Dhabi unveils masterworks exchange program with Musée d’Orsay',
    category: 'Culture',
    readTime: '2 min read'
  },
  {
    time: '14:05',
    title: 'Franco-German defense ministers finalize joint radar surveillance procurement',
    category: 'International',
    readTime: '4 min read'
  },
  {
    time: '12:50',
    title: 'Bordeaux wine harvest reports resilience amid targeted agro-ecological adaptation',
    category: 'Society',
    readTime: '6 min read'
  }
];

export const ARTICLES: Article[] = [
  // --- LEAD STORY (COL 1 TOP) ---
  {
    id: 'elysee-european-security-summit',
    title: 'Behind Closed Doors at the Élysée, European Leaders Forge Unified Stance on Long-Term Security Guarantees',
    deck: 'President Emmanuel Macron convened EU counterparts and allied defense ministers in Paris to counter strategic fractures and formulate an autonomous continental defense architecture.',
    kicker: 'ANALYSIS',
    kickerHighlight: false,
    readTime: '7 min read',
    byline: 'Philippe Ricard and Virginie Malingre',
    authorRole: 'European Affairs Correspondents',
    category: 'International',
    subCategory: 'Geopolitics',
    city: 'Paris',
    publishDate: 'October 12, 2026',
    commentsCount: 94,
    isLive: true,
    isSubscriberOnly: true,
    imageUrl: '/src/assets/images/lemonde_lead_diplomacy_1791786195153.jpg',
    imageAlt: 'European leaders and diplomats meeting at the Élysée Palace in Paris',
    imageCredit: 'Jean-Claude Coutausse / Le Monde',
    frenchExcerpt: 'Réunis à huis clos au palais de l’Élysée, les chefs d’État et de gouvernement européens tentent de surmonter leurs divergences pour bâtir les fondations d’une sécurité collective autonome face aux incertitudes géopolitiques mondiales.',
    relatedLinks: [
      { title: 'Graphic Analysis: Mapping European defense expenditures and sovereign capabilities' },
      { title: 'Analysis: Why the Franco-German engine remains indispensable despite friction' }
    ],
    paragraphs: [
      'PARIS — In the gilded salon of the Élysée Palace, conversations that for years were dismissed as theoretical French rhetoric have transformed into urgent matters of continental survival.',
      'Gathering a dozen European heads of state alongside defense chiefs and NATO observers, President Emmanuel Macron pressed the assembled leadership to establish concrete mechanisms for collective deterrence that would endure regardless of shifts in Washington electoral cycles.',
      'According to high-level diplomats present at the closed-door working session, discussions centered on joint defense procurement, sovereign missile defense umbrella technologies, and co-financing instruments modeled on the pandemic recovery bonds.',
      'While northern and eastern European delegations expressed cautious optimism regarding Paris’s strategic framework, debates persisted over industrial offsets and the speed of integration. "Europe can no longer be a geopolitical vegetarian in a world of carnivores," one senior French official remarked following the deliberations.',
      'The leaders concluded the four-hour summit by agreeing to present a consolidated white paper at the upcoming European Council session in Brussels, signalling a decisive departure from decades of defense fragmentation.'
    ],
    pullQuote: 'The question before Europe today is not whether strategic autonomy is desirable, but whether we possess the collective will to implement it before events decide for us.',
    pullQuoteAuthor: 'Emmanuel Macron, President of the French Republic'
  },

  // --- STORY 2: FRENCH POLITICS & ASSEMBLY ---
  {
    id: 'french-national-assembly-budget',
    title: 'National Assembly Braces for High-Stakes Battle Over Public Deficit and Welfare Reform',
    deck: 'With no absolute majority in the Palais Bourbon, prime ministerial negotiations reveal the deep political fault lines and fiscal dilemmas of contemporary France.',
    kicker: 'FRENCH POLITICS',
    readTime: '6 min read',
    byline: 'Claire Gatinois',
    authorRole: 'Chief Political Correspondent',
    category: 'France',
    subCategory: 'Politics',
    city: 'Paris',
    publishDate: 'October 12, 2026',
    commentsCount: 142,
    isSubscriberOnly: true,
    imageUrl: '/src/assets/images/lemonde_paris_assembly_1791786206945.jpg',
    imageAlt: 'The Palais Bourbon French National Assembly in Paris with French flag',
    imageCredit: 'Laurence Geai / Le Monde',
    frenchExcerpt: 'Privé de majorité absolue au Palais-Bourbon, le gouvernement engage un bras de fer budgétaire décisif sur fond de pressions bruxelloises pour réduire le déficit public.',
    paragraphs: [
      'PARIS — Across the corridors of the Palais Bourbon, parliamentary whips and committee chairs are counting every single vote ahead of this week’s contentious budget hearings.',
      'Caught between European Commission scrutiny over the national budget deficit and fierce opposition from both the left coalition and the far right, the government faces a precarious tightrope walk.',
      'Proposals to rein in public spending while preserving healthcare subsidies and ecological investments have generated intense backlash across municipal councils and labor confederations.',
      'Should negotiations stall, the executive may once again consider resorting to Article 49.3 of the Constitution—a constitutional mechanism that allows legislation to pass without a vote but exposes the government to a vote of no confidence.'
    ]
  },

  // --- STORY 3: ENVIRONMENT & ALPS GLACIERS ---
  {
    id: 'chamonix-glaciers-climate-emergency',
    title: 'In Chamonix, Alpine Glaciologists Race Against the Unprecedented Melting of the Mer de Glace',
    deck: 'Record summer temperatures across the Haute-Savoie massif force climate researchers to rethink water security models for the entire Rhône basin.',
    kicker: 'CLIMATE CRISIS',
    kickerHighlight: true,
    readTime: '8 min read',
    byline: 'Stéphane Mandard',
    authorRole: 'Environment Editor',
    category: 'Environment',
    subCategory: 'Climate Emergency',
    city: 'Chamonix-Mont-Blanc',
    publishDate: 'October 12, 2026',
    commentsCount: 67,
    isSubscriberOnly: false,
    imageUrl: '/src/assets/images/lemonde_alps_environment_1791786219084.jpg',
    imageAlt: 'Glaciologists measuring ice crevices at Chamonix Mont-Blanc in the French Alps',
    imageCredit: 'Cyril Zannettacci / Le Monde',
    frenchExcerpt: 'Au pied du mont Blanc, les chercheurs constatent la fonte accélérée de la Mer de Glace, baromètre impitoyable du dérèglement climatique en haute montagne.',
    paragraphs: [
      'CHAMONIX — Standing on the receding ice shelf of the Mer de Glace, glaciologist Luc Moreau hammers a measurement stake into granite-strewn moraine where twenty meters of solid ice stood just five summers ago.',
      'The data collected by the CNRS research team confirms an accelerating trend: the iconic glacier has lost more than one-third of its volume since the turn of the century.',
      'Beyond the dramatic visual retreat of alpine vistas, the implications for regional ecosystems are profound. The glacial runoff feeds major hydro-electric dams and irrigates agricultural basins throughout south-eastern France.',
      '"What we are witnessing in the Mont-Blanc massif is an ecological early warning system," warns Moreau. "The mountains are sending us an unambiguous signal that our water equilibrium has fundamentally shifted."'
    ]
  },

  // --- STORY 4: CANNES & FRENCH CINEMA ---
  {
    id: 'cannes-french-cinema-auteur-tradition',
    title: 'From the Croisette to Global Screens: How French Cinema Reinvents the Auteur Tradition',
    deck: 'Between state subsidies, a vibrant new generation of directors, and global streaming giants, France’s cinematic exceptionalism is experiencing a creative renaissance.',
    kicker: 'LE MONDE CULTURE',
    readTime: '6 min read',
    byline: 'Clarisse Fabre and Thomas Sotinel',
    authorRole: 'Film Critics',
    category: 'Culture',
    subCategory: 'Cinema',
    city: 'Cannes',
    publishDate: 'October 12, 2026',
    commentsCount: 51,
    isSubscriberOnly: true,
    imageUrl: '/src/assets/images/lemonde_french_cinema_1791786228832.jpg',
    imageAlt: 'Filmmakers and festival-goers on the Croisette terrace at the Cannes Film Festival',
    imageCredit: 'Thibault Camus / Associated Press for Le Monde',
    frenchExcerpt: 'Entre le soutien du CNC et l’émergence d’une nouvelle vague de cinéastes audacieux, l’exception culturelle française prouve une nouvelle fois sa singulière vitalité.',
    paragraphs: [
      'CANNES — On the sun-drenched terraces overlooking the Bay of Cannes, film producers and festival programmers are celebrating an unexpected surge in global distribution for French independent cinema.',
      'Rather than succumbing to homogenized international algorithm formulas, young French filmmakers are doubling down on distinctive aesthetic visions—embracing intimate social realism, surrealist comedy, and speculative docu-fiction.',
      'France’s historic cultural exception model, which reinvests box office revenues and streaming levies into independent production via the CNC, continues to serve as an envy for creators across Europe.',
      '"French cinema has never been a museum piece," observes festival director Thierry Frémaux. "It is a living laboratory where narrative risk is protected and nurtured."'
    ]
  },

  // --- STORY 5: GRANDES ENQUÊTES / INVESTIGATION ---
  {
    id: 'investigation-european-luxury-supply-chains',
    title: 'Grandes Enquêtes: How European Luxury Conglomerates Navigate Global Supply Chain Scrutiny',
    deck: 'From historic leather ateliers in the Tuscan hills to perfume laboratories in Grasse, a six-month investigation examines transparency and craftsmanship.',
    kicker: 'INVESTIGATION',
    kickerHighlight: false,
    readTime: '12 min read',
    byline: 'Anne Michel and Laura Motet',
    authorRole: 'Investigative Reporters',
    category: 'Economy',
    subCategory: 'Luxury Industry',
    city: 'Paris & Florence',
    publishDate: 'October 12, 2026',
    commentsCount: 88,
    isSubscriberOnly: true,
    frenchExcerpt: 'Une enquête de six mois sur les coulisses de la maroquinerie et des manufactures d’art révèle les tensions entre impératifs de rentabilité et préservation du geste artisanal.',
    paragraphs: [
      'PARIS & FLORENCE — Behind the dazzling shop windows of the Place Vendôme and Avenue Montaigne lies a sprawling network of specialized subcontractors and family-owned artisanal workshops.',
      'Le Monde’s investigative unit reviewed hundreds of supplier disclosures, customs manifests, and labor audit records across France, Italy, and Portugal.',
      'The findings reveal a growing divide between heritage brands that invest directly in safeguarding heirloom artisan skills and suppliers under relentless pressure to meet fast-rising output demands from emerging luxury markets.',
      'As the European Union prepares mandatory corporate sustainability due diligence regulations, top luxury conglomerates are scrambling to bring critical manufacturing steps back in-house.'
    ]
  },

  // --- STORY 6: OPINION - ALAIN FRACHON ---
  {
    id: 'opinion-alain-frachon-strategic-autonomy',
    title: 'Alain Frachon: ‘Why Europe Cannot Afford to Outsource Its Geopolitical Destiny’',
    deck: 'The transatlantic partnership remains an anchor, but European strategic autonomy is no longer a French philosophical luxury; it has become an existential imperative.',
    kicker: 'COLUMN',
    readTime: '5 min read',
    byline: 'Alain Frachon',
    authorRole: 'Foreign Affairs Columnist',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    category: 'Opinion',
    subCategory: 'Geopolitics',
    publishDate: 'October 12, 2026',
    commentsCount: 165,
    isSubscriberOnly: true,
    frenchExcerpt: 'Le confort du parapluie protecteur américain a vécu. Si les Européens ne prennent pas en main leur propre défense, d’autres puissances décideront de leur avenir.',
    paragraphs: [
      'For decades, European defense debates were paralyzed by an artificial theological dispute: NATO fidelity versus European independence. Today, that debate has been rendered obsolete by the brutality of international realpolitik.',
      'Whether one looks to the shifting strategic priorities of Washington or the revisionist ambitions of authoritarian powers on our eastern and southern peripheries, the conclusion is inescapable.',
      'Building European sovereign defense is not an act of disloyalty toward our allies; it is the prerequisite for remaining a credible, respected partner rather than a fragile geopolitical protectorate.',
      'The time for comfortable illusions has passed. Europe must produce its own equipment, secure its own borders, and formulate its own voice in world affairs.'
    ]
  },

  // --- STORY 7: OPINION - SYLVIE KAUFFMANN ---
  {
    id: 'opinion-sylvie-kauffmann-eastern-europe-pivot',
    title: 'Sylvie Kauffmann: ‘The Moral and Strategic Center of Europe Has Shifted East’',
    deck: 'From Warsaw to Tallinn, frontline states have gained analytical credibility and leadership that Western European capitals can no longer afford to disregard.',
    kicker: 'ANALYSIS',
    readTime: '6 min read',
    byline: 'Sylvie Kauffmann',
    authorRole: 'Editorial Director & Columnist',
    category: 'Opinion',
    subCategory: 'European Union',
    publishDate: 'October 12, 2026',
    commentsCount: 119,
    isSubscriberOnly: true,
    paragraphs: [
      'For many years, the conventional wisdom in Paris and Berlin dictated that our partners in Central and Eastern Europe were needlessly alarmist about imperial revanchism.',
      'Recent history has demonstrated, with cruel clarity, that they were right all along. Their strategic instincts, forged through decades of subjugation, proved far more accurate than our economic complacency.',
      'Today, a new European equilibrium is taking shape. No lasting strategic consensus in Brussels or Paris can be forged without equal deference to the voices of Warsaw, Prague, and the Baltic capitals.',
      'This recalibration is not a sign of European weakness, but the beginning of genuine continental maturity.'
    ]
  },

  // --- STORY 8: SOCIETY & NOTRE-DAME HERITAGE ---
  {
    id: 'notre-dame-cathedral-living-heritage',
    title: 'The Living Legacy of Notre-Dame: How Master Carpenters Revived Centuries of Guild Mastery',
    deck: 'Two years after welcoming the world back beneath its soaring nave, Paris’s cathedral stands as a triumphant testament to human hands, collective will, and ancestral woodwork.',
    kicker: 'HERITAGE',
    readTime: '9 min read',
    byline: 'Michel Guerrin',
    authorRole: 'Culture & Heritage Editor',
    category: 'Society',
    subCategory: 'Heritage',
    city: 'Paris',
    publishDate: 'October 12, 2026',
    commentsCount: 78,
    isSubscriberOnly: false,
    paragraphs: [
      'PARIS — High up in the oak framework known for centuries as "the forest," the scent of freshly hewn French timber still mingles with the ancient stone of the cathedral walls.',
      'The restoration of Notre-Dame de Paris did far more than reconstruct a fallen spire. It reignited ancient compagnonnage guilds across the French territory, bringing hundreds of young apprentices into communion with medieval tools.',
      'Using replica broadaxes forged by historical ironworkers, craftsmen shaped thousands of oak trunks sourced from sustainable French forests with precision measured down to the millimeter.',
      '"We didn’t just rebuild a roof," remarks master carpenter Rémi Fromont. "We reconnected a modern society with the patience, humility, and eternity of stone and wood."'
    ]
  },

  // --- STORY 9: ECONOMY & EUROPEAN CENTRAL BANK ---
  {
    id: 'ecb-frankfurt-growth-monetary-policy',
    title: 'European Central Bank Confronts Inflation Inertia and Green Re-Industrialization Costs',
    deck: 'In Frankfurt, Christine Lagarde and eurozone governors balance interest rate calibrations against massive capital demands for continental decarbonization.',
    kicker: 'ECONOMY',
    readTime: '5 min read',
    byline: 'Eric Albert',
    authorRole: 'Economics Correspondent',
    category: 'Economy',
    subCategory: 'Monetary Policy',
    city: 'Frankfurt',
    publishDate: 'October 12, 2026',
    commentsCount: 42,
    isSubscriberOnly: true,
    paragraphs: [
      'FRANKFURT — The Governing Council of the European Central Bank faces one of its most intricate dilemmas since the introduction of the single currency.',
      'While headline consumer price indices across the 20-nation bloc have cooled from past spikes, persistent wage growth in the service sector and energy grid transition bottlenecks have kept core inflation resilient.',
      'Industrial leaders in Germany and France caution that premature tightening could choke capital investment in battery gigafactories and sovereign microchip foundries.',
      '"Central banks cannot solve structural productivity issues with interest rates alone," notes an ECB senior economist. "Europe must match fiscal coordination with monetary prudence."'
    ]
  },

  // --- STORY 10: SPORTS & LIGUE 1 ---
  {
    id: 'sports-french-football-academies-future',
    title: 'The French Football Factory: Why European Giants Still Rely on Parisian Suburbs for Next-Gen Talent',
    deck: 'From Bondy to Clairefontaine, the Ile-de-France talent cradle continues to generate world-class prodigies at an unmatched rate.',
    kicker: 'SPORT',
    readTime: '7 min read',
    byline: 'Clément Martel',
    authorRole: 'Sports Editor',
    category: 'Sports',
    subCategory: 'Football',
    city: 'Paris',
    publishDate: 'October 12, 2026',
    commentsCount: 39,
    isSubscriberOnly: false,
    paragraphs: [
      'PARIS — On synthetic community pitches bordered by regional train tracks across the Seine-Saint-Denis department, dozens of talent scouts from London, Madrid, and Munich take careful notes.',
      'The Île-de-France region, with its dense population, thriving amateur club network, and rich multicultural football culture, remains without question the single most productive talent crucible in world sports.',
      'French academies have mastered the synthesis of exceptional raw technical agility with strict tactical intelligence and physical durability.',
      'Even as club balance sheets face media rights volatility, France’s developmental pipeline guarantees its preeminence on international tournament stages for years to come.'
    ]
  }
];
