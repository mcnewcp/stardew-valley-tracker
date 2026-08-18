const SP='spring', SU='summer', FA='fall', WI='winter', ALL=['spring','summer','fall','winter'];

const ZONES = [
  { id:'ocean', name:'The Beach — Ocean', note:'Saltwater. Willy\u2019s dock and the pier east of Elliott\u2019s cabin.', fish:[
    {n:'Pufferfish',      s:[SU],           t:'12pm – 4pm',  w:'sun',  b:'Specialty', where:'Ocean · also Ginger Island, any season'},
    {n:'Anchovy',         s:[SP,FA],        t:'any time',    w:'any',  where:'Ocean'},
    {n:'Tuna',            s:[SU,WI],        t:'6am – 7pm',   w:'any',  b:'Ocean', where:'Ocean · also Ginger Island, any season'},
    {n:'Sardine',         s:[SP,FA,WI],     t:'6am – 7pm',   w:'any',  b:'Ocean', where:'Ocean'},
    {n:'Red Mullet',      s:[SU,WI],        t:'6am – 7pm',   w:'any',  where:'Ocean'},
    {n:'Herring',         s:[SP,WI],        t:'any time',    w:'any',  where:'Ocean'},
    {n:'Eel',             s:[SP,FA],        t:'4pm – 2am',   w:'rain', b:'Night', where:'Ocean'},
    {n:'Octopus',         s:[SU],           t:'6am – 1pm',   w:'any',  where:'Ocean · hardest non-legendary catch'},
    {n:'Red Snapper',     s:[SU,FA],        t:'6am – 7pm',   w:'rain', b:'Ocean', where:'Ocean · Winter works with a Rain Totem'},
    {n:'Squid',           s:[WI],           t:'6pm – 2am',   w:'any',  where:'Ocean'},
    {n:'Sea Cucumber',    s:[FA,WI],        t:'6pm – 2am',   w:'any',  where:'Ocean'},
    {n:'Super Cucumber',  s:[SU,FA],        t:'6pm – 2am',   w:'any',  where:'Ocean · also Ginger Island, any season'},
    {n:'Tilapia',         s:[SU,FA],        t:'6am – 2pm',   w:'any',  b:'Ocean', where:'Ocean · also Ginger Island fresh water'},
    {n:'Albacore',        s:[FA,WI],        t:'6–11am, 6pm–2am', w:'any', where:'Ocean'},
    {n:'Halibut',         s:[SP,SU,WI],     t:'6–11am, 7pm–2am', w:'any', where:'Ocean'},
    {n:'Flounder',        s:[SP,SU],        t:'6am – 8pm',   w:'any',  where:'Ocean · also Ginger Island, any season'},
    {n:'Seaweed',         s:ALL,            t:'any time',    w:'any',  where:'Ocean · counts as a fish in your collection'},
    {n:'Sea Jelly',       s:ALL,            t:'any time',    w:'any',  where:'Ocean, Night Market sub, Ginger Island · rare, luck buffs help'}
  ]},

  { id:'river', name:'Rivers & Cindersap Forest', note:'Pelican Town river, forest river, forest pond, waterfalls.', fish:[
    {n:'Sunfish',         s:[SP,SU],        t:'6am – 7pm',   w:'sun',  b:'River', where:'Rivers · sunny or windy, never rain'},
    {n:'Catfish',         s:[SP,FA],        t:'6am – 12am',  w:'rain', b:'River', where:'Rivers, Secret Woods, Witch\u2019s Swamp · Summer in the woods/swamp'},
    {n:'Shad',            s:[SP,SU,FA],     t:'9am – 2am',   w:'rain', b:'River', where:'Rivers'},
    {n:'Bream',           s:ALL,            t:'6pm – 2am',   w:'any',  b:'Night', where:'Rivers'},
    {n:'Smallmouth Bass', s:[SP,FA],        t:'any time',    w:'any',  where:'Town river, forest pond'},
    {n:'Rainbow Trout',   s:[SU],           t:'6am – 7pm',   w:'sun',  where:'Rivers, mountain lake'},
    {n:'Salmon',          s:[FA],           t:'6am – 7pm',   w:'any',  where:'Rivers, forest waterfalls'},
    {n:'Walleye',         s:[FA],           t:'12pm – 2am',  w:'rain', b:'Night', where:'Rivers, forest pond, mountain lake · Winter with a Rain Totem'},
    {n:'Perch',           s:[WI],           t:'any time',    w:'any',  where:'Rivers, forest pond, mountain lake'},
    {n:'Pike',            s:[SU,WI],        t:'any time',    w:'any',  where:'Rivers, forest pond'},
    {n:'Tiger Trout',     s:[FA,WI],        t:'6am – 7pm',   w:'any',  b:'River', where:'Rivers'},
    {n:'Lingcod',         s:[WI],           t:'any time',    w:'any',  where:'Rivers, mountain lake'},
    {n:'Chub',            s:ALL,            t:'any time',    w:'any',  b:'Field', where:'Forest river, mountain lake'},
    {n:'Dorado',          s:[SU],           t:'6am – 7pm',   w:'any',  where:'Cindersap Forest river only'},
    {n:'Goby',            s:ALL,            t:'any time',    w:'any',  where:'Cindersap Forest waterfalls only'},
    {n:'River Jelly',     s:ALL,            t:'any time',    w:'any',  where:'Any fresh water · rare, luck buffs help'},
    {n:'Green Algae',     s:ALL,            t:'any time',    w:'any',  where:'Almost any fresh water · counts as a fish'}
  ]},

  { id:'lake', name:'Mountain Lake', note:'Outside the mine entrance. Everything here ignores weather.', fish:[
    {n:'Largemouth Bass', s:ALL,            t:'6am – 7pm',   w:'any',  b:'Lake', where:'Mountain lake'},
    {n:'Carp',            s:ALL,            t:'any time',    w:'any',  b:'Lake', where:'Mountain lake (not Winter), Secret Woods, Sewers, Bug Lair'},
    {n:'Bullhead',        s:ALL,            t:'any time',    w:'any',  b:'Lake', where:'Mountain lake'},
    {n:'Sturgeon',        s:[SU,WI],        t:'6am – 7pm',   w:'any',  b:'Lake', where:'Mountain lake'},
    {n:'Midnight Carp',   s:[FA,WI],        t:'10pm – 2am',  w:'any',  where:'Mountain lake, forest pond · Ginger Island any season'}
  ]},

  { id:'mines', name:'The Mines', note:'Fishing pools on floors 20, 60 and 100. No season or weather rules.', fish:[
    {n:'Ghostfish',       s:ALL,            t:'any time',    w:'any',  b:'Specialty', where:'Floors 20 and 60 · a Ghost drop does not count'},
    {n:'Stonefish',       s:ALL,            t:'any time',    w:'any',  where:'Floor 20'},
    {n:'Ice Pip',         s:ALL,            t:'any time',    w:'any',  where:'Floor 60'},
    {n:'Lava Eel',        s:ALL,            t:'any time',    w:'any',  where:'Floor 100, and the Caldera on Ginger Island'},
    {n:'Cave Jelly',      s:ALL,            t:'any time',    w:'any',  where:'Floors 20, 60, 100 · rare, luck buffs help'},
    {n:'White Algae',     s:ALL,            t:'any time',    w:'any',  where:'Mines, Sewers, Bug Lair, Witch\u2019s Swamp · counts as a fish'}
  ]},

  { id:'desert', name:'Calico Desert', note:'The little pond south of Skull Cavern. Bus needs the Vault bundles.', fish:[
    {n:'Sandfish',        s:ALL,            t:'6am – 8pm',   w:'any',  b:'Specialty', where:'Desert pond'},
    {n:'Scorpion Carp',   s:ALL,            t:'6am – 8pm',   w:'any',  where:'Desert pond'}
  ]},

  { id:'odd', name:'Swamp, Sewers & Bug Lair', note:'Sewers need the Rusty Key. The swamp opens after the Dark Talisman quest.', fish:[
    {n:'Void Salmon',     s:ALL,            t:'any time',    w:'any',  where:'Witch\u2019s Swamp'},
    {n:'Slimejack',       s:ALL,            t:'any time',    w:'any',  where:'Mutant Bug Lair, under the Sewers'}
  ]},

  { id:'woods', name:'Secret Woods', note:'Through the log north-west of the forest — needs a steel axe.', fish:[
    {n:'Woodskip',        s:ALL,            t:'any time',    w:'any',  b:'Specialty', where:'Secret Woods pond, and Forest Farm ponds'}
  ]},

  { id:'market', name:'Night Market', note:'Winter 15–17 only. Ride Willy\u2019s submarine — three days a year, then wait.', fish:[
    {n:'Midnight Squid',  s:[WI],           t:'5pm – 2am',   w:'any',  where:'Submarine, Winter 15–17'},
    {n:'Spook Fish',      s:[WI],           t:'5pm – 2am',   w:'any',  where:'Submarine, Winter 15–17'},
    {n:'Blobfish',        s:[WI],           t:'5pm – 2am',   w:'any',  where:'Submarine, Winter 15–17'}
  ]},

  { id:'island', name:'Ginger Island', note:'Needs Willy\u2019s boat repaired. Always the same season here.', fish:[
    {n:'Stingray',        s:ALL,            t:'any time',    w:'any',  where:'Pirate Cove'},
    {n:'Lionfish',        s:ALL,            t:'any time',    w:'any',  where:'Island ocean — south, south-east, west'},
    {n:'Blue Discus',     s:ALL,            t:'any time',    w:'any',  where:'Island fresh water — north and west'}
  ]},

  { id:'pots', name:'Crab Pots', note:'Only what a pot pulls up counts — beach foraging does not.', fish:[
    {n:'Lobster',         s:ALL, t:'—', w:'any', b:'CrabPot', where:'Ocean pot'},
    {n:'Crab',            s:ALL, t:'—', w:'any', b:'CrabPot', where:'Ocean pot'},
    {n:'Cockle',          s:ALL, t:'—', w:'any', b:'CrabPot', where:'Ocean pot'},
    {n:'Mussel',          s:ALL, t:'—', w:'any', b:'CrabPot', where:'Ocean pot'},
    {n:'Shrimp',          s:ALL, t:'—', w:'any', b:'CrabPot', where:'Ocean pot'},
    {n:'Oyster',          s:ALL, t:'—', w:'any', b:'CrabPot', where:'Ocean pot'},
    {n:'Clam',            s:ALL, t:'—', w:'any', b:'CrabPot', where:'Ocean pot'},
    {n:'Crayfish',        s:ALL, t:'—', w:'any', b:'CrabPot', where:'Fresh water pot'},
    {n:'Snail',           s:ALL, t:'—', w:'any', b:'CrabPot', where:'Fresh water pot'},
    {n:'Periwinkle',      s:ALL, t:'—', w:'any', b:'CrabPot', where:'Fresh water pot'}
  ]},

  { id:'legend', name:'Legendary', note:'One shot each per save. Iridium rod, trap bobber, and a fishing meal.', fish:[
    {n:'Crimsonfish',  s:[SU], t:'6am – 8pm',  w:'any',  lv:'Lv 5',  where:'Beach, east pier past the repaired bridge · cast far out'},
    {n:'Angler',       s:[FA], t:'6am – 11pm', w:'any',  lv:'Lv 3',  where:'Pelican Town, plank bridge north of JojaMart'},
    {n:'Legend',       s:[SP], t:'6am – 11pm', w:'rain', lv:'Lv 10', where:'Mountain lake · cast 5+ tiles from any land'},
    {n:'Glacierfish',  s:[WI], t:'6am – 8pm',  w:'any',  lv:'Lv 6',  where:'Cindersap Forest, south tip of Arrowhead Island'},
    {n:'Mutant Carp',  s:ALL,  t:'any time',   w:'any',  lv:'Key',   where:'The Sewers · Rusty Key from 60 museum donations'}
  ]}
];

const BUNDLES = [
  { key:'River',     title:'River Fish',      need:4, room:'Fish Tank',      items:['Sunfish','Catfish','Shad','Tiger Trout'] },
  { key:'Lake',      title:'Lake Fish',       need:4, room:'Fish Tank',      items:['Largemouth Bass','Carp','Bullhead','Sturgeon'] },
  { key:'Ocean',     title:'Ocean Fish',      need:4, room:'Fish Tank',      items:['Sardine','Tuna','Red Snapper','Tilapia'] },
  { key:'Night',     title:'Night Fishing',   need:3, room:'Fish Tank',      items:['Walleye','Bream','Eel'] },
  { key:'CrabPot',   title:'Crab Pot',        need:5, room:'Fish Tank',      items:['Lobster','Crayfish','Crab','Cockle','Mussel','Shrimp','Snail','Periwinkle','Oyster','Clam'] },
  { key:'Specialty', title:'Specialty Fish',  need:4, room:'Fish Tank',      items:['Pufferfish','Ghostfish','Sandfish','Woodskip'] },
  { key:'Field',     title:'Field Research',  need:1, room:'Bulletin Board', items:['Chub'] }
];
