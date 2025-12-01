export interface Lullaby {
  id: string;
  title: string;
  titleEnglish: string;
  description: string;
  spotifyUrl: string;
  lyrics: {
    swedish: string;
    english: string;
  }[];
  notes?: string;
}

export const lullabies: Lullaby[] = [
  {
    id: 'byssan-lansen',
    title: 'Byssan Lansen',
    titleEnglish: 'Hush Little One',
    description:
      'One of the most beloved Swedish lullabies, often sung at bedtime. The melody is gentle and soothing.',
    spotifyUrl: 'https://open.spotify.com/search/byssan%20lull%20vaggvisa',
    lyrics: [
      {
        swedish: 'Byssan lansen lansen lotansen,',
        english: 'Hush little one, little one so dear,',
      },
      {
        swedish: 'Här voro tre barnungahjärtan,',
        english: "Here were three young children's hearts,",
      },
      {
        swedish: 'Den ena var vit som en lilja,',
        english: 'One was white as a lily,',
      },
      {
        swedish: 'Den andra var röd som en ros.',
        english: 'The other was red as a rose.',
      },
      {
        swedish: 'Den tredje var blek som döden.',
        english: 'The third was pale as death.',
      },
      {
        swedish: 'Byssan lansen lansen lotansen.',
        english: 'Hush little one, little one so dear.',
      },
    ],
    notes:
      'This traditional Swedish lullaby has been sung for generations. The imagery is poetic and calming despite the melancholic final verse.',
  },
  {
    id: 'trollmors-vaggsang',
    title: 'Trollmors vaggsång',
    titleEnglish: "The Troll Mother's Lullaby",
    description:
      'A whimsical lullaby about a troll mother singing to her 11 troll children. Very popular in Sweden.',
    spotifyUrl: 'https://open.spotify.com/search/trollmors%20vaggs%C3%A5ng',
    lyrics: [
      {
        swedish: 'Trollmors vaggsång klingar,',
        english: "The troll mother's lullaby rings,",
      },
      {
        swedish: 'vinden bär den fram.',
        english: 'the wind carries it along.',
      },
      {
        swedish: 'Hör hur ljuvligt sången',
        english: 'Hear how sweetly the song',
      },
      {
        swedish: 'klingar, dingeli, dam.',
        english: 'rings, dingeli, dam.',
      },
      {
        swedish: 'Trollmor hade elva ungar,',
        english: 'The troll mother had eleven children,',
      },
      {
        swedish: 'i en klase lågo de vid hennes arm,',
        english: 'in a bunch they lay by her arm,',
      },
      {
        swedish: 'och hon bjöd dom söttmjölksgröt,',
        english: 'and she offered them sweet milk porridge,',
      },
      {
        swedish: 'den var god och varm.',
        english: 'it was good and warm.',
      },
      {
        swedish: 'Vov, vov, vov, sade trollmor då,',
        english: 'Woo, woo, woo, said the troll mother then,',
      },
      {
        swedish: 'nu ska alla barnen sova så.',
        english: 'now all the children shall sleep.',
      },
      {
        swedish: 'Vyss, vyss, vyss i det höga blå,',
        english: 'Hush, hush, hush in the high blue,',
      },
      {
        swedish: 'sjöng hon för de elva som lågo där så små.',
        english: 'she sang for the eleven who lay there so small.',
      },
    ],
    notes:
      'This charming lullaby by Margit Holmberg (1927) is sung in preschools across Sweden. Children love the counting and the cozy troll family imagery.',
  },
  {
    id: 'imse-vimse-spindel',
    title: 'Imse Vimse Spindel',
    titleEnglish: 'Itsy Bitsy Spider',
    description:
      'The Swedish version of Itsy Bitsy Spider! Complete with hand motions, this is a favorite for babies and toddlers.',
    spotifyUrl: 'https://open.spotify.com/search/imse%20vimse%20spindel',
    lyrics: [
      {
        swedish: 'Imse vimse spindel klättra upp på tråån,',
        english: 'Itsy bitsy spider climbed up the water spout,',
      },
      {
        swedish: 'Ner faller regnet, spola spindeln boort,',
        english: 'Down came the rain and washed the spider out,',
      },
      {
        swedish: 'Upp stiger solen, torkar bort allt regn,',
        english: 'Out came the sun and dried up all the rain,',
      },
      {
        swedish: 'Imse vimse spindel klättra upp igen.',
        english: 'And the itsy bitsy spider climbed up the spout again.',
      },
    ],
    notes:
      'Do the hand motions! Make your fingers climb up for the spider, wiggle fingers down for rain, make a circle for the sun, and climb again!',
  },
  {
    id: 'byssan-lansen-kort',
    title: 'Byssan Lull',
    titleEnglish: 'Hush-a-bye',
    description:
      'A shorter, simpler version of Byssan Lansen, perfect for sleepy babies.',
    spotifyUrl: 'https://open.spotify.com/search/byssan%20lull',
    lyrics: [
      {
        swedish: 'Byssan lull, byssan lansen,',
        english: 'Hush-a-bye, hush little one,',
      },
      {
        swedish: 'byssan lansen, byssan lansen.',
        english: 'hush little one, hush little one.',
      },
      {
        swedish: 'Sov nu sött, lilla vansen,',
        english: 'Sleep sweetly now, little one,',
      },
      {
        swedish: 'sov nu tills i morgon.',
        english: 'sleep now until tomorrow.',
      },
      {
        swedish: 'Byssan lull, byssan lansen,',
        english: 'Hush-a-bye, hush little one,',
      },
      {
        swedish: 'lull till lilla vansen.',
        english: 'lullaby to the little one.',
      },
    ],
    notes:
      'The words "byssan" and "lull" are old Swedish words meaning to soothe or lull to sleep.',
  },
  {
    id: 'sma-grodorna',
    title: 'Små grodorna',
    titleEnglish: 'The Little Frogs',
    description:
      'THE essential Midsummer song! Swedes dance around the maypole pretending to be frogs with this silly, beloved song.',
    spotifyUrl: 'https://open.spotify.com/search/sm%C3%A5%20grodorna',
    lyrics: [
      {
        swedish: 'Små grodorna, små grodorna',
        english: 'The little frogs, the little frogs',
      },
      {
        swedish: 'är lustiga att se.',
        english: 'are funny to see.',
      },
      {
        swedish: 'Små grodorna, små grodorna',
        english: 'The little frogs, the little frogs',
      },
      {
        swedish: 'är lustiga att se.',
        english: 'are funny to see.',
      },
      {
        swedish: 'Ej öron, ej öron,',
        english: 'No ears, no ears,',
      },
      {
        swedish: 'ej svansar hava de.',
        english: 'no tails have they.',
      },
      {
        swedish: 'Ej öron, ej öron,',
        english: 'No ears, no ears,',
      },
      {
        swedish: 'ej svansar hava de.',
        english: 'no tails have they.',
      },
      {
        swedish: 'Kou ack ack ack,',
        english: 'Ribbit ribbit ribbit,',
      },
      {
        swedish: 'kou ack ack ack,',
        english: 'ribbit ribbit ribbit,',
      },
      {
        swedish: 'kou ack ack ack ack kaa.',
        english: 'ribbit ribbit ribbit ribbit riiiibbit.',
      },
    ],
    notes:
      'At midsummer, everyone dances in a ring around the maypole, putting their hands behind their heads for "no ears" and wiggling their bottoms for "no tails." Pure joy!',
  },
  {
    id: 'blinka-lansen',
    title: 'Blinka lilla stjärna',
    titleEnglish: 'Twinkle Little Star',
    description: 'The Swedish version of Twinkle Twinkle Little Star.',
    spotifyUrl: 'https://open.spotify.com/search/blinka%20lilla%20stj%C3%A4rna',
    lyrics: [
      {
        swedish: 'Blinka lilla stjärna där,',
        english: 'Twinkle little star up there,',
      },
      {
        swedish: 'hur jag undrar var du är.',
        english: 'how I wonder where you are.',
      },
      {
        swedish: 'Högt uppå den sky så blå,',
        english: 'High up in the sky so blue,',
      },
      {
        swedish: 'som en diamant att se på.',
        english: 'like a diamond to look at.',
      },
      {
        swedish: 'Blinka lilla stjärna där,',
        english: 'Twinkle little star up there,',
      },
      {
        swedish: 'hur jag undrar var du är.',
        english: 'how I wonder where you are.',
      },
    ],
    notes:
      'Same melody as the English version! A gentle bedtime favorite that works beautifully in Swedish.',
  },
  {
    id: 'mors-lansen',
    title: 'Mors lilla Olle',
    titleEnglish: "Mother's Little Olle",
    description:
      'A story-song about a little boy who gets lost in the blueberry forest and is protected by a bear. A Swedish classic!',
    spotifyUrl: 'https://open.spotify.com/search/mors%20lilla%20olle',
    lyrics: [
      {
        swedish: 'Mors lilla Olle i skogen gick,',
        english: "Mother's little Olle went into the forest,",
      },
      {
        swedish: 'rosor på kinden och sol i blick.',
        english: 'roses on his cheeks and sunshine in his eyes.',
      },
      {
        swedish: 'Så kom han till skogen där blåbären gro,',
        english: 'He came to the forest where blueberries grow,',
      },
      {
        swedish: 'där lingonen lysa och granen står stolt.',
        english: 'where lingonberries shine and pines stand proud.',
      },
      {
        swedish: 'Och där mötte han björnen, den lurvig och stor,',
        english: 'And there he met the bear, all furry and big,',
      },
      {
        swedish: '"God dag, god dag," sa Olle och log.',
        english: '"Good day, good day," said Olle and smiled.',
      },
      {
        swedish: 'Och björnen sa ingenting, men lansen Olle följde med,',
        english: 'And the bear said nothing, but followed little Olle,',
      },
      {
        swedish: 'tills lansen Olle kom hem igen.',
        english: 'until little Olle came home again.',
      },
    ],
    notes:
      'This song by Alice Tegnér (1895) is about trust and the protective magic of the Swedish forest. The bear becomes Olle\'s gentle guardian.',
  },
];

export function getLullabyById(id: string): Lullaby | undefined {
  return lullabies.find((l) => l.id === id);
}
