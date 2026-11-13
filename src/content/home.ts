import type { Locale } from '../i18n/config.ts';

const en = {
  meta: {
    title: 'Clario Cleaning — Commercial Cleaning Concept for Belgium',
    description: 'Clario Cleaning is a fictional commercial cleaning brand for offices, shops and hospitality across Belgium — a multilingual portfolio demo by Mahmoud Anwari.',
  },
  hero: {
    eyebrow: 'Commercial cleaning · Belgium',
    titleA: 'Clean spaces.',
    titleB: 'Clear standards.',
    lede: 'Considered cleaning for offices, shops and hospitality spaces — planned in detail, carried out with care and explained in plain language.',
    caption: 'Offices · Retail · Hospitality',
  },
  intro: {
    eyebrow: 'The Clario approach',
    title: 'We believe a well-kept workplace should feel <em>effortless</em> to the people inside it.',
    body: [
      'Clario is a concept for an established Belgian cleaning company with multiple teams serving offices, shops, restaurants and other small and medium-sized businesses.',
      'Our idea is simple: agree clear standards, write them down, and meet them every visit. No vague promises — just careful work, responsible products and people you can reach.',
    ],
    signature: 'Fictional brand positioning — not a real company.',
  },
  services: {
    eyebrow: 'What we do',
    title: 'Four services, <em>one standard</em>',
    lede: 'Each service starts from a written plan and can be combined into a single, coherent routine for your site.',
  },
  why: {
    eyebrow: 'Why Clario',
    title: 'Care you can <em>see</em>. Standards you can <em>read</em>.',
    items: [
      { title: 'Written standards', text: 'Every site gets a zone-by-zone cleaning plan you can read, question and adjust.' },
      { title: 'Familiar teams', text: 'Where possible, the same people return to your site and learn how it works.' },
      { title: 'Responsible products', text: 'Concentrates, refillable bottles and reusable microfibre chosen with care.' },
      { title: 'Clear communication', text: 'One point of contact, in Dutch, French or English, who answers properly.' },
    ],
  },
  beforeAfter: {
    eyebrow: 'The difference',
    title: 'Same room. <em>Same angle.</em> A different morning.',
    lede: 'Drag the divider — or use the arrow keys — to compare a meeting room at the end of a long day with the same room after an evening visit.',
  },
  sustainability: {
    eyebrow: 'Sustainability',
    title: 'Responsible cleaning is mostly about <em>better habits</em>',
    lede: 'No grand claims. Just practical choices that reduce waste, use water carefully and keep workspaces pleasant to breathe in.',
    points: [
      { title: 'Concentrates & refills', text: 'Measured dosing into reusable bottles instead of single-use plastic.' },
      { title: 'Reusable microfibre', text: 'Washable, colour-coded cloths that replace disposable wipes.' },
      { title: 'Careful water use', text: 'Pre-moistened flat mops instead of full buckets where suitable.' },
    ],
  },
  process: {
    eyebrow: 'How it works',
    title: 'From first walk-through to <em>steady routine</em>',
    steps: [
      { title: 'Get in touch', text: 'Tell us about your space using the quote wizard or book an on-site assessment.' },
      { title: 'Site assessment', text: 'A team lead walks the site, noting floors, glass, access and how each zone is used.' },
      { title: 'Written plan', text: 'You receive a clear plan with tasks, frequencies and an indicative price.' },
      { title: 'Routine & review', text: 'A familiar team starts the routine, with regular check-ins to keep it right.' },
    ],
  },
  pricing: {
    eyebrow: 'Indicative pricing',
    title: 'Transparent starting points',
    lede: 'Starting rates make budgets easier to discuss. Every real quotation would follow a site visit.',
  },
  areas: {
    eyebrow: 'Service area',
    title: 'Across Belgium’s <em>major cities</em>',
    lede: 'The Clario concept imagines teams serving businesses in and around these cities. This is fictional coverage for demonstration — not a list of real branches.',
  },
  testimonials: {
    eyebrow: 'Sample testimonials',
    title: 'What clients <em>might</em> say',
    note: 'These quotes are fictional sample content written for this demo. They are not real reviews.',
    items: [
      { quote: 'The written plan made the difference. For the first time we knew exactly what was cleaned, and when.', role: 'Office manager', org: 'Sample: design studio, Ghent' },
      { quote: 'Our shopfront is clear before we open every Tuesday and Friday. Customers notice, even if they don’t say it.', role: 'Store owner', org: 'Sample: interiors shop, Antwerp' },
      { quote: 'They work around our evening service without getting in the way, and the kitchen is ready for the morning crew.', role: 'Restaurant manager', org: 'Sample: bistro, Brussels' },
    ],
  },
  stats: {
    note: 'Demonstration data describing this website — not company performance figures.',
    items: [
      { value: '4', label: 'core services in the concept' },
      { value: '3', label: 'languages: NL · FR · EN' },
      { value: '9', label: 'Belgian cities in the fictional coverage' },
      { value: '0', label: 'trackers or cookies on this site' },
    ],
  },
  faq: {
    eyebrow: 'Questions',
    items: [
      { q: 'Is Clario Cleaning a real company?', a: 'No. Clario Cleaning is a fictional brand created for a web design portfolio. No cleaning services are offered and no requests are received through this website.' },
      { q: 'What kinds of businesses does the concept serve?', a: 'Offices and corporate workplaces, retail stores and showrooms, restaurants and hospitality businesses, and other small and medium-sized commercial spaces.' },
      { q: 'How are the prices on this site calculated?', a: 'They are illustrative demo figures per square metre, held in one configuration file. Real commercial cleaning prices depend on site conditions, frequency, scope and access.' },
      { q: 'Can I book an assessment through this site?', a: 'You can try the booking calendar, but it is a simulation. No appointment is created and nothing you enter leaves your browser.' },
      { q: 'Which languages does Clario work in?', a: 'The concept serves clients in Dutch, French and English — as does this website.' },
    ],
  },
  final: {
    eyebrow: 'Start a conversation',
    title: 'Let’s make your space <em>feel ready</em>.',
    lede: 'Get an illustrative estimate in a few steps, or explore how an on-site assessment would be scheduled.',
  },
};

export type HomeCopy = typeof en;

const nl: HomeCopy = {
  meta: {
    title: 'Clario Cleaning — Concept voor bedrijfsschoonmaak in België',
    description: 'Clario Cleaning is een fictief merk voor bedrijfsschoonmaak voor kantoren, winkels en horeca in heel België — een meertalige portfoliodemo van Mahmoud Anwari.',
  },
  hero: {
    eyebrow: 'Bedrijfsschoonmaak · België',
    titleA: 'Schone ruimtes.',
    titleB: 'Heldere normen.',
    lede: 'Doordachte schoonmaak voor kantoren, winkels en horeca — tot in detail gepland, met zorg uitgevoerd en in duidelijke taal uitgelegd.',
    caption: 'Kantoren · Retail · Horeca',
  },
  intro: {
    eyebrow: 'De aanpak van Clario',
    title: 'Een goed onderhouden werkplek moet voor wie er werkt <em>vanzelfsprekend</em> aanvoelen.',
    body: [
      'Clario is het concept van een gevestigd Belgisch schoonmaakbedrijf met meerdere teams voor kantoren, winkels, restaurants en andere kmo’s.',
      'Ons idee is eenvoudig: duidelijke normen afspreken, ze op papier zetten en ze bij elke beurt waarmaken. Geen vage beloftes — wel zorgvuldig werk, verantwoorde producten en mensen die bereikbaar zijn.',
    ],
    signature: 'Fictieve merkpositionering — geen echt bedrijf.',
  },
  services: {
    eyebrow: 'Wat we doen',
    title: 'Vier diensten, <em>één norm</em>',
    lede: 'Elke dienst vertrekt van een schriftelijk plan en kan gecombineerd worden tot één samenhangende routine voor uw locatie.',
  },
  why: {
    eyebrow: 'Waarom Clario',
    title: 'Zorg die u <em>ziet</em>. Normen die u kunt <em>lezen</em>.',
    items: [
      { title: 'Schriftelijke normen', text: 'Elke locatie krijgt een schoonmaakplan per zone dat u kunt lezen, bevragen en bijsturen.' },
      { title: 'Vertrouwde teams', text: 'Waar mogelijk komen dezelfde mensen terug en leren ze uw locatie kennen.' },
      { title: 'Verantwoorde producten', text: 'Concentraten, hervulbare flessen en herbruikbare microvezel, met zorg gekozen.' },
      { title: 'Heldere communicatie', text: 'Eén aanspreekpunt, in het Nederlands, Frans of Engels, dat echt antwoordt.' },
    ],
  },
  beforeAfter: {
    eyebrow: 'Het verschil',
    title: 'Dezelfde ruimte. <em>Dezelfde hoek.</em> Een andere ochtend.',
    lede: 'Sleep de scheidingslijn — of gebruik de pijltjestoetsen — om een vergaderzaal na een lange dag te vergelijken met dezelfde zaal na een avondbeurt.',
  },
  sustainability: {
    eyebrow: 'Duurzaamheid',
    title: 'Verantwoord poetsen draait vooral om <em>betere gewoontes</em>',
    lede: 'Geen grote beweringen. Wel praktische keuzes die afval beperken, zuinig omgaan met water en werkplekken aangenaam houden.',
    points: [
      { title: 'Concentraten & navullingen', text: 'Afgemeten dosering in herbruikbare flessen in plaats van wegwerpplastic.' },
      { title: 'Herbruikbare microvezel', text: 'Wasbare, kleurgecodeerde doeken in plaats van wegwerpdoekjes.' },
      { title: 'Zuinig met water', text: 'Waar het kan, voorbevochtigde vlakmoppen in plaats van volle emmers.' },
    ],
  },
  process: {
    eyebrow: 'Zo werkt het',
    title: 'Van eerste rondgang tot <em>vaste routine</em>',
    steps: [
      { title: 'Neem contact op', text: 'Vertel ons over uw ruimte via de offertewizard of plan een plaatsbezoek.' },
      { title: 'Plaatsbezoek', text: 'Een teamleider loopt de locatie rond en noteert vloeren, glas, toegang en het gebruik van elke zone.' },
      { title: 'Schriftelijk plan', text: 'U krijgt een duidelijk plan met taken, frequenties en een indicatieve prijs.' },
      { title: 'Routine & opvolging', text: 'Een vertrouwd team start de routine, met regelmatige opvolging om alles op punt te houden.' },
    ],
  },
  pricing: {
    eyebrow: 'Indicatieve prijzen',
    title: 'Transparante vertrekpunten',
    lede: 'Vanafprijzen maken het makkelijker om over budget te praten. Een echte offerte volgt altijd na een plaatsbezoek.',
  },
  areas: {
    eyebrow: 'Werkgebied',
    title: 'In de <em>grote steden</em> van België',
    lede: 'Het Clario-concept gaat uit van teams die bedrijven in en rond deze steden bedienen. Dit is fictieve dekking ter demonstratie — geen lijst van echte vestigingen.',
  },
  testimonials: {
    eyebrow: 'Voorbeeldgetuigenissen',
    title: 'Wat klanten <em>zouden kunnen</em> zeggen',
    note: 'Deze citaten zijn fictieve voorbeeldinhoud, geschreven voor deze demo. Het zijn geen echte beoordelingen.',
    items: [
      { quote: 'Het schriftelijke plan maakte het verschil. Voor het eerst wisten we precies wat er gepoetst werd, en wanneer.', role: 'Officemanager', org: 'Voorbeeld: ontwerpstudio, Gent' },
      { quote: 'Onze etalage is elke dinsdag en vrijdag helder vóór we opengaan. Klanten merken het, ook al zeggen ze het niet.', role: 'Zaakvoerder', org: 'Voorbeeld: interieurzaak, Antwerpen' },
      { quote: 'Ze werken rond onze avondservice zonder in de weg te lopen, en de keuken staat klaar voor de ochtendploeg.', role: 'Restaurantmanager', org: 'Voorbeeld: bistro, Brussel' },
    ],
  },
  stats: {
    note: 'Demonstratiegegevens over deze website — geen bedrijfsresultaten.',
    items: [
      { value: '4', label: 'kerndiensten in het concept' },
      { value: '3', label: 'talen: NL · FR · EN' },
      { value: '9', label: 'Belgische steden in de fictieve dekking' },
      { value: '0', label: 'trackers of cookies op deze site' },
    ],
  },
  faq: {
    eyebrow: 'Vragen',
    items: [
      { q: 'Is Clario Cleaning een echt bedrijf?', a: 'Nee. Clario Cleaning is een fictief merk, gemaakt voor een webdesignportfolio. Er worden geen schoonmaakdiensten aangeboden en via deze website komen geen aanvragen binnen.' },
      { q: 'Voor welke bedrijven is het concept bedoeld?', a: 'Kantoren en bedrijfsgebouwen, winkels en showrooms, restaurants en horeca, en andere kleine en middelgrote bedrijfsruimtes.' },
      { q: 'Hoe worden de prijzen op deze site berekend?', a: 'Het zijn illustratieve demobedragen per vierkante meter, bewaard in één configuratiebestand. Werkelijke prijzen hangen af van de situatie ter plaatse, de frequentie, de omvang en de toegankelijkheid.' },
      { q: 'Kan ik via deze site een plaatsbezoek boeken?', a: 'U kunt de boekingskalender uitproberen, maar het is een simulatie. Er wordt geen afspraak gemaakt en niets wat u invult, verlaat uw browser.' },
      { q: 'In welke talen werkt Clario?', a: 'Het concept bedient klanten in het Nederlands, Frans en Engels — net als deze website.' },
    ],
  },
  final: {
    eyebrow: 'Begin het gesprek',
    title: 'Laten we uw ruimte <em>klaar</em> maken.',
    lede: 'Krijg in enkele stappen een illustratieve raming, of ontdek hoe een plaatsbezoek ingepland zou worden.',
  },
};

const fr: HomeCopy = {
  meta: {
    title: 'Clario Cleaning — Concept de nettoyage professionnel en Belgique',
    description: 'Clario Cleaning est une marque fictive de nettoyage professionnel pour bureaux, commerces et horeca en Belgique — une démo de portfolio multilingue par Mahmoud Anwari.',
  },
  hero: {
    eyebrow: 'Nettoyage professionnel · Belgique',
    titleA: 'Espaces nets.',
    titleB: 'Standards clairs.',
    lede: 'Un nettoyage réfléchi pour bureaux, commerces et établissements horeca — planifié dans le détail, réalisé avec soin et expliqué simplement.',
    caption: 'Bureaux · Commerces · Horeca',
  },
  intro: {
    eyebrow: 'L’approche Clario',
    title: 'Un lieu de travail bien tenu devrait sembler <em>naturel</em> à ceux qui l’occupent.',
    body: [
      'Clario est le concept d’une entreprise de nettoyage belge établie, avec plusieurs équipes au service de bureaux, commerces, restaurants et autres PME.',
      'Notre idée est simple : convenir de standards clairs, les mettre par écrit et les respecter à chaque passage. Pas de promesses vagues — un travail soigné, des produits responsables et des interlocuteurs joignables.',
    ],
    signature: 'Positionnement de marque fictif — pas une entreprise réelle.',
  },
  services: {
    eyebrow: 'Nos services',
    title: 'Quatre services, <em>un seul standard</em>',
    lede: 'Chaque service part d’un plan écrit et peut se combiner aux autres en une routine cohérente pour votre site.',
  },
  why: {
    eyebrow: 'Pourquoi Clario',
    title: 'Un soin qui se <em>voit</em>. Des standards qui se <em>lisent</em>.',
    items: [
      { title: 'Des standards écrits', text: 'Chaque site reçoit un plan de nettoyage par zone, que vous pouvez lire, questionner et ajuster.' },
      { title: 'Des équipes familières', text: 'Dans la mesure du possible, les mêmes personnes reviennent et apprennent à connaître votre site.' },
      { title: 'Des produits responsables', text: 'Concentrés, flacons rechargeables et microfibres réutilisables, choisis avec soin.' },
      { title: 'Une communication claire', text: 'Un interlocuteur unique, en français, néerlandais ou anglais, qui répond vraiment.' },
    ],
  },
  beforeAfter: {
    eyebrow: 'La différence',
    title: 'Même pièce. <em>Même angle.</em> Un autre matin.',
    lede: 'Faites glisser le séparateur — ou utilisez les flèches — pour comparer une salle de réunion après une longue journée et la même salle après un passage en soirée.',
  },
  sustainability: {
    eyebrow: 'Durabilité',
    title: 'Nettoyer de manière responsable, c’est surtout une question de <em>bonnes habitudes</em>',
    lede: 'Pas de grandes promesses. Des choix concrets qui réduisent les déchets, économisent l’eau et rendent les espaces de travail plus agréables.',
    points: [
      { title: 'Concentrés & recharges', text: 'Un dosage mesuré dans des flacons réutilisables plutôt que du plastique jetable.' },
      { title: 'Microfibres réutilisables', text: 'Des chiffons lavables à code couleur qui remplacent les lingettes jetables.' },
      { title: 'Une eau utilisée avec soin', text: 'Des franges pré-humidifiées plutôt que des seaux pleins, quand c’est adapté.' },
    ],
  },
  process: {
    eyebrow: 'Comment ça marche',
    title: 'De la première visite à une <em>routine stable</em>',
    steps: [
      { title: 'Prenez contact', text: 'Décrivez votre espace via l’assistant de devis ou planifiez une visite sur place.' },
      { title: 'Visite du site', text: 'Un chef d’équipe parcourt les lieux et note revêtements, vitrages, accès et usage de chaque zone.' },
      { title: 'Plan écrit', text: 'Vous recevez un plan clair avec tâches, fréquences et prix indicatif.' },
      { title: 'Routine & suivi', text: 'Une équipe familière lance la routine, avec des points réguliers pour l’ajuster.' },
    ],
  },
  pricing: {
    eyebrow: 'Tarifs indicatifs',
    title: 'Des points de départ transparents',
    lede: 'Des prix de départ facilitent la discussion budgétaire. Tout devis réel suivrait une visite sur place.',
  },
  areas: {
    eyebrow: 'Zone d’intervention',
    title: 'Dans les <em>grandes villes</em> de Belgique',
    lede: 'Le concept Clario imagine des équipes au service des entreprises dans et autour de ces villes. Il s’agit d’une couverture fictive à titre de démonstration — pas d’une liste d’implantations réelles.',
  },
  testimonials: {
    eyebrow: 'Témoignages d’exemple',
    title: 'Ce que des clients <em>pourraient</em> dire',
    note: 'Ces citations sont des contenus fictifs rédigés pour cette démo. Il ne s’agit pas de vrais avis.',
    items: [
      { quote: 'Le plan écrit a tout changé. Pour la première fois, nous savions exactement ce qui était nettoyé, et quand.', role: 'Office manager', org: 'Exemple : studio de design, Gand' },
      { quote: 'Notre vitrine est impeccable avant l’ouverture chaque mardi et vendredi. Les clients le remarquent, même sans le dire.', role: 'Gérante de boutique', org: 'Exemple : magasin de décoration, Anvers' },
      { quote: 'Ils travaillent autour de notre service du soir sans gêner, et la cuisine est prête pour l’équipe du matin.', role: 'Responsable de restaurant', org: 'Exemple : bistrot, Bruxelles' },
    ],
  },
  stats: {
    note: 'Données de démonstration décrivant ce site — pas des résultats d’entreprise.',
    items: [
      { value: '4', label: 'services clés dans le concept' },
      { value: '3', label: 'langues : FR · NL · EN' },
      { value: '9', label: 'villes belges dans la couverture fictive' },
      { value: '0', label: 'traceur ou cookie sur ce site' },
    ],
  },
  faq: {
    eyebrow: 'Questions',
    items: [
      { q: 'Clario Cleaning est-elle une vraie entreprise ?', a: 'Non. Clario Cleaning est une marque fictive créée pour un portfolio de webdesign. Aucun service de nettoyage n’est proposé et aucune demande n’est reçue via ce site.' },
      { q: 'À quels types d’entreprises s’adresse le concept ?', a: 'Bureaux et sièges d’entreprise, commerces et showrooms, restaurants et établissements horeca, ainsi que d’autres espaces professionnels de petite et moyenne taille.' },
      { q: 'Comment les prix de ce site sont-ils calculés ?', a: 'Ce sont des montants de démonstration au mètre carré, regroupés dans un seul fichier de configuration. Les prix réels dépendent de l’état des lieux, de la fréquence, du périmètre et des accès.' },
      { q: 'Puis-je réserver une visite via ce site ?', a: 'Vous pouvez essayer le calendrier, mais il s’agit d’une simulation. Aucun rendez-vous n’est créé et rien de ce que vous saisissez ne quitte votre navigateur.' },
      { q: 'Dans quelles langues Clario travaille-t-elle ?', a: 'Le concept accompagne ses clients en français, néerlandais et anglais — tout comme ce site.' },
    ],
  },
  final: {
    eyebrow: 'Engageons la conversation',
    title: 'Rendons votre espace <em>prêt à vivre</em>.',
    lede: 'Obtenez une estimation illustrative en quelques étapes, ou découvrez comment une visite sur place serait planifiée.',
  },
};

export const home: Record<Locale, HomeCopy> = { en, nl, fr };
