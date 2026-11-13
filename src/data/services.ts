import type { Locale, RouteKey } from '../i18n/config.ts';
import type { ServiceId } from './pricing.ts';
import type { ImageFile } from './images.ts';

export interface Item { title: string; text: string }
export interface ServiceCopy {
  name: string;
  short: string;
  eyebrow: string;
  heroTitle: string;
  heroLede: string;
  introTitle: string;
  intro: string[];
  includesTitle: string;
  includes: Item[];
  benefitsTitle: string;
  benefits: Item[];
  process: Item[];
  faqs: { q: string; a: string }[];
  meta: { title: string; description: string };
}

export interface Service {
  id: ServiceId;
  route: RouteKey;
  number: string;
  hero: ImageFile;
  detail: ImageFile;
  related: ServiceId[];
  copy: Record<Locale, ServiceCopy>;
}

export const services: Service[] = [
  // ======================================================================
  {
    id: 'office',
    route: 'office',
    number: '01',
    hero: 'service-office-hero',
    detail: 'service-office-detail-kitchen',
    related: ['deep', 'sanitation'],
    copy: {
      en: {
        name: 'Office Cleaning',
        short: 'Routine care for workstations, meeting rooms, kitchens and restrooms — scheduled around your working day.',
        eyebrow: 'Service 01 — Office Cleaning',
        heroTitle: 'Workplaces that feel <em>ready</em> every morning',
        heroLede: 'Consistent, unobtrusive cleaning for offices of every size, planned around how your team actually uses the space.',
        introTitle: 'The quiet routine behind a good workday',
        intro: [
          'A well-kept office rarely gets noticed — and that is exactly the point. Our office cleaning plans focus on the places people touch, share and return to every day, so your team can start work without thinking about it.',
          'Each site receives a written cleaning plan that lists every zone, its frequency and the materials used. When something changes — a new floor, a growing team, a different schedule — the plan changes with it.',
        ],
        includesTitle: 'What a typical visit includes',
        includes: [
          { title: 'Workstations', text: 'Clear desk surfaces wiped, keyboards and phones dusted with care, bins emptied and liners replaced.' },
          { title: 'Shared spaces', text: 'Lounges, corridors and reception areas vacuumed or mopped, soft furnishings tidied, glass doors spot-cleaned.' },
          { title: 'Meeting rooms', text: 'Tables and whiteboards cleaned, chairs reset and remote controls wiped so the next meeting starts fresh.' },
          { title: 'Kitchens & break areas', text: 'Worktops, sinks, appliance fronts and tables cleaned; dishwashers loaded or emptied on request.' },
          { title: 'Restrooms', text: 'Sanitary fixtures, mirrors and floors cleaned; consumables checked and topped up.' },
          { title: 'Flexible scheduling', text: 'Early-morning, evening or daytime visits, from daily to fortnightly, adjusted to your occupancy.' },
        ],
        benefitsTitle: 'Why teams choose a routine plan',
        benefits: [
          { title: 'Predictable standards', text: 'The same checklist, the same team where possible, and a clear point of contact.' },
          { title: 'Minimal disruption', text: 'Visits are timed and routed to stay out of your team’s way.' },
          { title: 'Transparent scope', text: 'You always know which tasks are included and how often they happen.' },
        ],
        process: [
          { title: 'Walkthrough', text: 'We look at floor types, traffic and how each zone is used.' },
          { title: 'Written plan', text: 'A zone-by-zone plan with frequencies you can review and adjust.' },
          { title: 'Steady routine', text: 'A familiar team follows the plan visit after visit.' },
          { title: 'Regular check-ins', text: 'Short quality reviews keep the plan aligned with your needs.' },
        ],
        faqs: [
          { q: 'Can cleaning happen during working hours?', a: 'Yes. In this concept, daytime visits focus on quieter tasks such as kitchens, restrooms and touch points, while noisier work is scheduled outside office hours.' },
          { q: 'Do we need to provide products or equipment?', a: 'No. The concept assumes Clario teams bring their own equipment and refillable products, chosen according to the site.' },
          { q: 'How is the illustrative price calculated?', a: 'The demo estimate multiplies the approximate floor area by a sample rate per visit. A real quotation would always follow a site visit.' },
        ],
        meta: {
          title: 'Office Cleaning',
          description: 'Routine office cleaning concept for Belgian workplaces: workstations, meeting rooms, kitchens and restrooms. Fictional portfolio demo with illustrative pricing.',
        },
      },
      nl: {
        name: 'Kantoorschoonmaak',
        short: 'Regelmatige zorg voor werkplekken, vergaderzalen, keukens en sanitair — afgestemd op uw werkdag.',
        eyebrow: 'Dienst 01 — Kantoorschoonmaak',
        heroTitle: 'Werkplekken die elke ochtend <em>klaarstaan</em>',
        heroLede: 'Consequente, discrete schoonmaak voor kantoren van elke omvang, gepland rond hoe uw team de ruimte echt gebruikt.',
        introTitle: 'De stille routine achter een goede werkdag',
        intro: [
          'Een goed onderhouden kantoor valt zelden op — en dat is net de bedoeling. Onze kantoorplannen richten zich op de plekken die mensen elke dag aanraken, delen en gebruiken, zodat uw team zonder zorgen aan de slag kan.',
          'Elke locatie krijgt een schriftelijk schoonmaakplan met alle zones, hun frequentie en de gebruikte middelen. Verandert er iets — een nieuwe vloer, een groeiend team, een ander uurrooster — dan verandert het plan mee.',
        ],
        includesTitle: 'Wat een gewone beurt omvat',
        includes: [
          { title: 'Werkplekken', text: 'Lege bureaubladen afgenomen, toetsenborden en telefoons zorgvuldig afgestoft, vuilbakken geleegd en zakjes vervangen.' },
          { title: 'Gedeelde ruimtes', text: 'Lounges, gangen en onthaal gestofzuigd of gedweild, zitmeubilair opgeruimd, glazen deuren bijgewerkt.' },
          { title: 'Vergaderzalen', text: 'Tafels en whiteboards gereinigd, stoelen rechtgezet en afstandsbedieningen afgenomen voor een frisse start.' },
          { title: 'Keukens & pauzeruimtes', text: 'Werkbladen, spoelbakken, toestellen en tafels gereinigd; vaatwasser op verzoek in- of uitgeladen.' },
          { title: 'Sanitair', text: 'Toiletten, lavabo’s, spiegels en vloeren gereinigd; verbruiksgoederen nagekeken en aangevuld.' },
          { title: 'Flexibele planning', text: 'Vroeg in de ochtend, ’s avonds of overdag, van dagelijks tot tweewekelijks, aangepast aan uw bezetting.' },
        ],
        benefitsTitle: 'Waarom teams kiezen voor een vast plan',
        benefits: [
          { title: 'Voorspelbare kwaliteit', text: 'Dezelfde checklist, waar mogelijk hetzelfde team en één duidelijk aanspreekpunt.' },
          { title: 'Minimale hinder', text: 'Beurten worden zo gepland dat uw team er weinig van merkt.' },
          { title: 'Duidelijke afspraken', text: 'U weet altijd welke taken inbegrepen zijn en hoe vaak ze gebeuren.' },
        ],
        process: [
          { title: 'Rondgang', text: 'We bekijken vloertypes, drukte en het gebruik van elke zone.' },
          { title: 'Schriftelijk plan', text: 'Een plan per zone met frequenties die u kunt nalezen en bijsturen.' },
          { title: 'Vaste routine', text: 'Een vertrouwd team volgt het plan, beurt na beurt.' },
          { title: 'Regelmatige opvolging', text: 'Korte kwaliteitscontroles houden het plan in lijn met uw noden.' },
        ],
        faqs: [
          { q: 'Kan er tijdens de kantooruren gepoetst worden?', a: 'Ja. In dit concept richten beurten overdag zich op stillere taken zoals keukens, sanitair en contactpunten; luidruchtiger werk gebeurt buiten de kantooruren.' },
          { q: 'Moeten wij producten of materiaal voorzien?', a: 'Nee. Het concept gaat ervan uit dat de Clario-teams hun eigen materiaal en hervulbare producten meebrengen, gekozen in functie van de locatie.' },
          { q: 'Hoe wordt de illustratieve prijs berekend?', a: 'De demoraming vermenigvuldigt de geschatte vloeroppervlakte met een voorbeeldtarief per beurt. Een echte offerte volgt altijd na een plaatsbezoek.' },
        ],
        meta: {
          title: 'Kantoorschoonmaak',
          description: 'Concept voor regelmatige kantoorschoonmaak in Belgische werkplekken: werkplekken, vergaderzalen, keukens en sanitair. Fictieve portfoliodemo met illustratieve prijzen.',
        },
      },
      fr: {
        name: 'Nettoyage de bureaux',
        short: 'Un entretien régulier des postes de travail, salles de réunion, cuisines et sanitaires — organisé autour de votre journée.',
        eyebrow: 'Service 01 — Nettoyage de bureaux',
        heroTitle: 'Des espaces de travail <em>prêts</em> chaque matin',
        heroLede: 'Un nettoyage régulier et discret pour les bureaux de toute taille, planifié selon l’usage réel de vos espaces.',
        introTitle: 'La routine discrète d’une bonne journée de travail',
        intro: [
          'Un bureau bien entretenu se remarque rarement — et c’est bien le but. Nos plans d’entretien se concentrent sur les lieux que chacun touche, partage et retrouve chaque jour, pour que votre équipe commence sa journée l’esprit libre.',
          'Chaque site reçoit un plan de nettoyage écrit précisant chaque zone, sa fréquence et les produits utilisés. Quand quelque chose change — un nouveau revêtement, une équipe qui grandit, d’autres horaires — le plan évolue aussi.',
        ],
        includesTitle: 'Ce que comprend un passage type',
        includes: [
          { title: 'Postes de travail', text: 'Bureaux dégagés essuyés, claviers et téléphones dépoussiérés avec soin, poubelles vidées et sacs remplacés.' },
          { title: 'Espaces partagés', text: 'Salons, couloirs et accueil aspirés ou lavés, mobilier rangé, portes vitrées détachées.' },
          { title: 'Salles de réunion', text: 'Tables et tableaux blancs nettoyés, chaises replacées et télécommandes essuyées pour un nouveau départ.' },
          { title: 'Cuisines & espaces de pause', text: 'Plans de travail, éviers, façades d’appareils et tables nettoyés ; lave-vaisselle rempli ou vidé sur demande.' },
          { title: 'Sanitaires', text: 'Appareils sanitaires, miroirs et sols nettoyés ; consommables vérifiés et réapprovisionnés.' },
          { title: 'Horaires flexibles', text: 'Tôt le matin, le soir ou en journée, de quotidien à toutes les deux semaines, selon votre occupation.' },
        ],
        benefitsTitle: 'Pourquoi choisir un plan régulier',
        benefits: [
          { title: 'Une qualité prévisible', text: 'La même liste de contrôle, si possible la même équipe, et un interlocuteur clair.' },
          { title: 'Un minimum de gêne', text: 'Les passages sont organisés pour ne pas déranger votre équipe.' },
          { title: 'Un périmètre transparent', text: 'Vous savez toujours quelles tâches sont prévues et à quelle fréquence.' },
        ],
        process: [
          { title: 'Visite des lieux', text: 'Nous observons les revêtements, la fréquentation et l’usage de chaque zone.' },
          { title: 'Plan écrit', text: 'Un plan par zone, avec des fréquences que vous pouvez relire et ajuster.' },
          { title: 'Routine stable', text: 'Une équipe familière suit le plan, passage après passage.' },
          { title: 'Suivi régulier', text: 'De courts contrôles qualité maintiennent le plan en phase avec vos besoins.' },
        ],
        faqs: [
          { q: 'Le nettoyage peut-il avoir lieu pendant les heures de bureau ?', a: 'Oui. Dans ce concept, les passages en journée portent sur des tâches plus discrètes — cuisines, sanitaires, points de contact — tandis que les travaux bruyants ont lieu hors des heures de bureau.' },
          { q: 'Devons-nous fournir les produits ou le matériel ?', a: 'Non. Le concept prévoit que les équipes Clario apportent leur matériel et leurs produits rechargeables, choisis selon le site.' },
          { q: 'Comment le prix illustratif est-il calculé ?', a: 'L’estimation de démonstration multiplie la surface au sol approximative par un tarif d’exemple par passage. Un vrai devis suivrait toujours une visite sur place.' },
        ],
        meta: {
          title: 'Nettoyage de bureaux',
          description: 'Concept de nettoyage régulier de bureaux en Belgique : postes de travail, salles de réunion, cuisines et sanitaires. Démo de portfolio fictive avec tarifs illustratifs.',
        },
      },
    },
  },
  // ======================================================================
  {
    id: 'deep',
    route: 'deep',
    number: '02',
    hero: 'service-deep-hero',
    detail: 'service-deep-detail-highreach',
    related: ['office', 'window'],
    copy: {
      en: {
        name: 'Deep Cleaning',
        short: 'Intensive, periodic cleaning for the places routine visits can’t reach — seasonal resets and specialised plans.',
        eyebrow: 'Service 02 — Deep Cleaning',
        heroTitle: 'A thorough <em>reset</em>, down to the details',
        heroLede: 'Periodic, intensive cleaning that restores surfaces, reaches hidden corners and gives busy spaces a fresh baseline.',
        introTitle: 'For the corners a routine never quite reaches',
        intro: [
          'Even well-maintained spaces collect what daily cleaning can’t address: dust on high ledges, build-up along skirting boards, marks on chair bases and grout lines. A deep clean resets the baseline.',
          'Deep cleaning is planned as a project. We agree the zones, the sequence and the time window in advance — often a weekend, a quiet season or the days before a reopening.',
        ],
        includesTitle: 'What a deep clean can cover',
        includes: [
          { title: 'Intensive surface cleaning', text: 'Floors, skirting, doors, frames and furniture cleaned thoroughly, including bases and undersides.' },
          { title: 'Hard-to-reach areas', text: 'High ledges, light fittings, vents and behind-furniture areas reached safely from the floor with extendable tools.' },
          { title: 'High-touch areas', text: 'Handles, switches, rails and shared equipment given focused, detailed attention.' },
          { title: 'Periodic maintenance', text: 'Quarterly or monthly deep cleans that complement your routine plan.' },
          { title: 'Seasonal cleaning', text: 'Resets after busy seasons, holidays, moves or refurbishments.' },
          { title: 'Specialised plans', text: 'Tailored scopes for kitchens, showrooms or hospitality spaces, agreed zone by zone.' },
        ],
        benefitsTitle: 'What a reset brings',
        benefits: [
          { title: 'A fresh baseline', text: 'Routine cleaning becomes easier and more effective afterwards.' },
          { title: 'Planned around you', text: 'Work happens in agreed windows, outside opening hours where needed.' },
          { title: 'Clear scope', text: 'A written zone list means no surprises on the day.' },
        ],
        process: [
          { title: 'Survey', text: 'We map zones, surfaces and access before agreeing a scope.' },
          { title: 'Sequence', text: 'Top-to-bottom, zone-by-zone planning that avoids re-soiling.' },
          { title: 'Intensive clean', text: 'A focused team works through the agreed list.' },
          { title: 'Joint walkthrough', text: 'We review the result together before signing off.' },
        ],
        faqs: [
          { q: 'How often should a deep clean happen?', a: 'It depends on traffic and use. In this concept, busy hospitality spaces might plan monthly, while offices often choose quarterly or seasonal resets.' },
          { q: 'Do you work at height?', a: 'No. The Clario concept is limited to areas that can be reached safely from the floor with extendable tools. Work requiring ladders, lifts or rope access is outside its scope.' },
        ],
        meta: {
          title: 'Deep Cleaning',
          description: 'Periodic deep cleaning concept for Belgian offices, shops and hospitality spaces: intensive surface care, hard-to-reach areas and seasonal resets. Fictional demo.',
        },
      },
      nl: {
        name: 'Dieptereiniging',
        short: 'Grondige, periodieke reiniging voor plekken die een gewone beurt niet bereikt — seizoensresets en plannen op maat.',
        eyebrow: 'Dienst 02 — Dieptereiniging',
        heroTitle: 'Een grondige <em>frisse start</em>, tot in de details',
        heroLede: 'Periodieke, intensieve reiniging die oppervlakken herstelt, verborgen hoeken bereikt en drukke ruimtes een nieuwe basis geeft.',
        introTitle: 'Voor de hoeken die een routine net niet bereikt',
        intro: [
          'Zelfs goed onderhouden ruimtes verzamelen wat de dagelijkse schoonmaak niet aanpakt: stof op hoge randen, aanslag langs plinten, vlekken op stoelpoten en voegen. Een dieptereiniging zet alles weer op nul.',
          'Een dieptereiniging plannen we als een project. Zones, volgorde en tijdvenster spreken we vooraf af — vaak een weekend, een rustig seizoen of de dagen voor een heropening.',
        ],
        includesTitle: 'Wat een dieptereiniging kan omvatten',
        includes: [
          { title: 'Intensieve reiniging van oppervlakken', text: 'Vloeren, plinten, deuren, kozijnen en meubilair grondig gereinigd, ook onderkanten en poten.' },
          { title: 'Moeilijk bereikbare plekken', text: 'Hoge randen, verlichting, roosters en plekken achter meubels veilig vanaf de vloer bereikt met telescopisch materiaal.' },
          { title: 'Veelgebruikte contactpunten', text: 'Klinken, schakelaars, leuningen en gedeeld materiaal krijgen gerichte, gedetailleerde aandacht.' },
          { title: 'Periodiek onderhoud', text: 'Driemaandelijkse of maandelijkse beurten als aanvulling op uw vaste plan.' },
          { title: 'Seizoensschoonmaak', text: 'Een frisse start na drukke periodes, vakanties, verhuizingen of verbouwingen.' },
          { title: 'Plannen op maat', text: 'Afgestemde opdrachten voor keukens, showrooms of horeca, zone per zone afgesproken.' },
        ],
        benefitsTitle: 'Wat een frisse start oplevert',
        benefits: [
          { title: 'Een nieuwe basis', text: 'De dagelijkse schoonmaak verloopt daarna vlotter en doeltreffender.' },
          { title: 'Rond uw planning', text: 'Het werk gebeurt binnen afgesproken tijdvensters, zo nodig buiten de openingsuren.' },
          { title: 'Duidelijke afspraken', text: 'Een schriftelijke zonelijst betekent geen verrassingen op de dag zelf.' },
        ],
        process: [
          { title: 'Verkenning', text: 'We brengen zones, oppervlakken en toegang in kaart vóór we de opdracht vastleggen.' },
          { title: 'Volgorde', text: 'Van boven naar beneden, zone per zone, zodat niets opnieuw vuil wordt.' },
          { title: 'Intensieve reiniging', text: 'Een gericht team werkt de afgesproken lijst af.' },
          { title: 'Gezamenlijke rondgang', text: 'We bekijken het resultaat samen vóór de afronding.' },
        ],
        faqs: [
          { q: 'Hoe vaak is een dieptereiniging nodig?', a: 'Dat hangt af van de drukte en het gebruik. In dit concept plannen drukke horecazaken bijvoorbeeld maandelijks, terwijl kantoren vaak kiezen voor een driemaandelijkse of seizoensgebonden beurt.' },
          { q: 'Werken jullie op hoogte?', a: 'Nee. Het Clario-concept beperkt zich tot plekken die veilig vanaf de vloer bereikbaar zijn met telescopisch materiaal. Werk met ladders, hoogwerkers of touwtoegang valt erbuiten.' },
        ],
        meta: {
          title: 'Dieptereiniging',
          description: 'Concept voor periodieke dieptereiniging van Belgische kantoren, winkels en horeca: intensieve reiniging, moeilijk bereikbare plekken en seizoensresets. Fictieve demo.',
        },
      },
      fr: {
        name: 'Nettoyage en profondeur',
        short: 'Un nettoyage intensif et périodique pour les zones hors de portée de l’entretien courant — remises à neuf saisonnières et plans sur mesure.',
        eyebrow: 'Service 02 — Nettoyage en profondeur',
        heroTitle: 'Une <em>remise à neuf</em> complète, jusque dans les détails',
        heroLede: 'Un nettoyage périodique et intensif qui ravive les surfaces, atteint les recoins cachés et offre un nouveau point de départ aux espaces très fréquentés.',
        introTitle: 'Pour les recoins que la routine n’atteint jamais tout à fait',
        intro: [
          'Même les espaces bien entretenus accumulent ce que le nettoyage quotidien ne traite pas : poussière sur les rebords hauts, dépôts le long des plinthes, traces sur les pieds de chaises et les joints. Un nettoyage en profondeur remet les compteurs à zéro.',
          'Il se planifie comme un projet. Zones, ordre d’intervention et créneau sont convenus à l’avance — souvent un week-end, une saison calme ou les jours précédant une réouverture.',
        ],
        includesTitle: 'Ce que peut couvrir un nettoyage en profondeur',
        includes: [
          { title: 'Nettoyage intensif des surfaces', text: 'Sols, plinthes, portes, encadrements et mobilier nettoyés en profondeur, y compris dessous et piètements.' },
          { title: 'Zones difficiles d’accès', text: 'Rebords hauts, luminaires, grilles et arrière des meubles atteints en toute sécurité depuis le sol grâce à des outils télescopiques.' },
          { title: 'Points de contact fréquents', text: 'Poignées, interrupteurs, rampes et équipements partagés traités avec une attention particulière.' },
          { title: 'Entretien périodique', text: 'Des passages trimestriels ou mensuels qui complètent votre plan régulier.' },
          { title: 'Nettoyage saisonnier', text: 'Une remise à neuf après une saison chargée, des congés, un déménagement ou des travaux.' },
          { title: 'Plans spécialisés', text: 'Des périmètres sur mesure pour cuisines, showrooms ou établissements horeca, définis zone par zone.' },
        ],
        benefitsTitle: 'Ce qu’apporte une remise à neuf',
        benefits: [
          { title: 'Un nouveau point de départ', text: 'L’entretien courant devient ensuite plus simple et plus efficace.' },
          { title: 'Organisé selon vos contraintes', text: 'Les travaux ont lieu dans des créneaux convenus, hors ouverture si nécessaire.' },
          { title: 'Un périmètre clair', text: 'Une liste écrite des zones, pour éviter toute surprise le jour J.' },
        ],
        process: [
          { title: 'Repérage', text: 'Nous recensons zones, surfaces et accès avant de fixer le périmètre.' },
          { title: 'Séquence', text: 'Du haut vers le bas, zone par zone, pour ne rien resalir.' },
          { title: 'Nettoyage intensif', text: 'Une équipe dédiée suit la liste convenue.' },
          { title: 'Visite conjointe', text: 'Nous vérifions ensemble le résultat avant de clôturer.' },
        ],
        faqs: [
          { q: 'À quelle fréquence prévoir un nettoyage en profondeur ?', a: 'Cela dépend de la fréquentation et de l’usage. Dans ce concept, un établissement horeca très fréquenté pourrait opter pour un passage mensuel, et des bureaux pour un passage trimestriel ou saisonnier.' },
          { q: 'Intervenez-vous en hauteur ?', a: 'Non. Le concept Clario se limite aux zones accessibles en toute sécurité depuis le sol avec des outils télescopiques. Les travaux nécessitant échelles, nacelles ou accès sur corde sont exclus.' },
        ],
        meta: {
          title: 'Nettoyage en profondeur',
          description: 'Concept de nettoyage en profondeur périodique pour bureaux, commerces et horeca en Belgique : surfaces, zones difficiles d’accès et remises à neuf saisonnières. Démo fictive.',
        },
      },
    },
  },
  // ======================================================================
  {
    id: 'window',
    route: 'window',
    number: '03',
    hero: 'service-window-hero',
    detail: 'service-window-detail-partition',
    related: ['office', 'deep'],
    copy: {
      en: {
        name: 'Window Cleaning',
        short: 'Streak-free shopfronts, interior glazing and partitions, cleaned on a schedule that keeps light coming in.',
        eyebrow: 'Service 03 — Window Cleaning',
        heroTitle: 'Let the <em>daylight</em> do its work',
        heroLede: 'Careful cleaning of commercial glass — shopfronts, interior windows and partitions — for a clear first impression.',
        introTitle: 'Clear glass changes how a space feels',
        intro: [
          'Glass is often the first thing a visitor sees and the last thing a team notices. Fingerprints on a partition or a dull shopfront quietly lower the standard of everything around them.',
          'Our window concept focuses on glass that can be reached safely from the ground or floor: shopfronts, accessible exterior windows, interior glazing and partitions. Prices are based on glass area rather than floor area.',
        ],
        includesTitle: 'Which glass is included',
        includes: [
          { title: 'Commercial glass surfaces', text: 'Doors, display glass and glazed panels cleaned with squeegees and microfibre for a streak-free finish.' },
          { title: 'Interior windows', text: 'Inside faces of windows, sills and frames wiped down.' },
          { title: 'Accessible exterior windows', text: 'Ground-level exterior glass reachable safely from the pavement or with water-fed poles.' },
          { title: 'Shopfronts', text: 'Early-morning shopfront cleaning so windows are clear before opening.' },
          { title: 'Glass partitions', text: 'Meeting-room walls and office dividers polished free of marks and smudges.' },
          { title: 'Scheduled maintenance', text: 'Monthly or quarterly rounds so glass never gets to the point of being noticed.' },
        ],
        benefitsTitle: 'The difference clear glass makes',
        benefits: [
          { title: 'More daylight', text: 'Clean glazing lets more natural light into the workspace.' },
          { title: 'A sharper first impression', text: 'Shopfronts and entrances look cared for from the street.' },
          { title: 'Measured by glass', text: 'Pricing follows the glass area actually cleaned — not your floor plan.' },
        ],
        process: [
          { title: 'Glass inventory', text: 'We note glazed surfaces, access and any limits.' },
          { title: 'Safe scope', text: 'Only glass reachable safely from the ground is included.' },
          { title: 'Clean & detail', text: 'Glass, frames and sills cleaned, then checked against the light.' },
          { title: 'Recurring rounds', text: 'A schedule that matches your street, season and footfall.' },
        ],
        faqs: [
          { q: 'Do you clean upper-floor exterior windows?', a: 'Not in this concept. Exterior glass that would require ladders, lifts or rope access is outside Clario’s fictional scope.' },
          { q: 'Why is window pricing per m² of glass?', a: 'Because the effort depends on the glass itself, not on the size of the room behind it. The demo wizard asks for an approximate glass area for this reason.' },
        ],
        meta: {
          title: 'Window Cleaning',
          description: 'Commercial window cleaning concept for Belgian businesses: shopfronts, interior windows, accessible exterior glass and partitions. Fictional demo, priced per m² of glass.',
        },
      },
      nl: {
        name: 'Glazenwassen',
        short: 'Streeploze etalages, binnenramen en glazen wanden, volgens een planning die het daglicht binnenhoudt.',
        eyebrow: 'Dienst 03 — Glazenwassen',
        heroTitle: 'Laat het <em>daglicht</em> zijn werk doen',
        heroLede: 'Zorgvuldige reiniging van glas in bedrijven — etalages, binnenramen en glazen wanden — voor een heldere eerste indruk.',
        introTitle: 'Helder glas verandert hoe een ruimte aanvoelt',
        intro: [
          'Glas is vaak het eerste wat een bezoeker ziet en het laatste wat een team opmerkt. Vingerafdrukken op een glazen wand of een doffe etalage halen ongemerkt alles eromheen naar beneden.',
          'Ons glasconcept richt zich op glas dat veilig vanaf de grond of de vloer bereikbaar is: etalages, toegankelijke buitenramen, binnenbeglazing en glazen wanden. De prijs is gebaseerd op de glasoppervlakte, niet op de vloeroppervlakte.',
        ],
        includesTitle: 'Welk glas inbegrepen is',
        includes: [
          { title: 'Glasoppervlakken in bedrijven', text: 'Deuren, vitrines en glaspanelen gereinigd met trekker en microvezel voor een streeploos resultaat.' },
          { title: 'Binnenramen', text: 'Binnenzijde van ramen, vensterbanken en kozijnen afgenomen.' },
          { title: 'Toegankelijke buitenramen', text: 'Buitenglas op gelijkvloers, veilig bereikbaar vanaf het voetpad of met een waterstofsteel.' },
          { title: 'Etalages', text: 'Etalages vroeg in de ochtend gereinigd, zodat ze helder zijn vóór de opening.' },
          { title: 'Glazen wanden', text: 'Wanden van vergaderzalen en kantoorscheidingen opgepoetst, zonder vlekken of strepen.' },
          { title: 'Gepland onderhoud', text: 'Maandelijkse of driemaandelijkse rondes, zodat vuil glas nooit opvalt.' },
        ],
        benefitsTitle: 'Het verschil van helder glas',
        benefits: [
          { title: 'Meer daglicht', text: 'Proper glas laat meer natuurlijk licht binnen.' },
          { title: 'Een sterkere eerste indruk', text: 'Etalages en ingangen ogen verzorgd vanaf de straat.' },
          { title: 'Gemeten in glas', text: 'De prijs volgt de werkelijk gereinigde glasoppervlakte — niet uw grondplan.' },
        ],
        process: [
          { title: 'Glasinventaris', text: 'We noteren de glasoppervlakken, de toegang en eventuele beperkingen.' },
          { title: 'Veilige afbakening', text: 'Enkel glas dat veilig vanaf de grond bereikbaar is, valt binnen de opdracht.' },
          { title: 'Reinigen & afwerken', text: 'Glas, kozijnen en vensterbanken gereinigd en daarna tegen het licht gecontroleerd.' },
          { title: 'Vaste rondes', text: 'Een planning op maat van uw straat, het seizoen en de passage.' },
        ],
        faqs: [
          { q: 'Wassen jullie ook buitenramen op de verdiepingen?', a: 'Niet in dit concept. Buitenglas waarvoor ladders, hoogwerkers of touwtoegang nodig zijn, valt buiten de fictieve opdracht van Clario.' },
          { q: 'Waarom is de prijs per m² glas?', a: 'Omdat de inspanning afhangt van het glas zelf, niet van de grootte van de ruimte erachter. Daarom vraagt de demowizard naar een geschatte glasoppervlakte.' },
        ],
        meta: {
          title: 'Glazenwassen',
          description: 'Concept voor glazenwassen bij Belgische bedrijven: etalages, binnenramen, toegankelijke buitenramen en glazen wanden. Fictieve demo, prijs per m² glas.',
        },
      },
      fr: {
        name: 'Nettoyage de vitres',
        short: 'Des vitrines, vitrages intérieurs et cloisons sans traces, nettoyés selon un calendrier qui laisse entrer la lumière.',
        eyebrow: 'Service 03 — Nettoyage de vitres',
        heroTitle: 'Laissez la <em>lumière</em> faire son œuvre',
        heroLede: 'Un nettoyage soigné du vitrage professionnel — vitrines, fenêtres intérieures et cloisons — pour une première impression limpide.',
        introTitle: 'Un verre net change la perception d’un espace',
        intro: [
          'Le verre est souvent la première chose qu’un visiteur voit et la dernière qu’une équipe remarque. Des traces de doigts sur une cloison ou une vitrine ternie abaissent discrètement le niveau de tout ce qui les entoure.',
          'Notre concept se concentre sur le vitrage accessible en toute sécurité depuis le sol : vitrines, fenêtres extérieures accessibles, vitrages intérieurs et cloisons. Le prix se base sur la surface vitrée, et non sur la surface au sol.',
        ],
        includesTitle: 'Quels vitrages sont inclus',
        includes: [
          { title: 'Surfaces vitrées professionnelles', text: 'Portes, vitrines et panneaux vitrés nettoyés à la raclette et en microfibre pour un résultat sans traces.' },
          { title: 'Fenêtres intérieures', text: 'Face intérieure des fenêtres, appuis et châssis essuyés.' },
          { title: 'Fenêtres extérieures accessibles', text: 'Vitrage extérieur de plain-pied, accessible en sécurité depuis le trottoir ou avec une perche à eau.' },
          { title: 'Vitrines', text: 'Vitrines nettoyées tôt le matin, pour qu’elles soient impeccables avant l’ouverture.' },
          { title: 'Cloisons vitrées', text: 'Parois de salles de réunion et séparations de bureaux polies, sans marques ni traînées.' },
          { title: 'Entretien planifié', text: 'Des passages mensuels ou trimestriels pour que le verre ne se remarque jamais.' },
        ],
        benefitsTitle: 'Ce que change un verre impeccable',
        benefits: [
          { title: 'Plus de lumière naturelle', text: 'Un vitrage propre laisse entrer davantage de lumière du jour.' },
          { title: 'Une première impression plus nette', text: 'Vitrines et entrées paraissent soignées depuis la rue.' },
          { title: 'Mesuré au vitrage', text: 'Le prix suit la surface vitrée réellement nettoyée — pas votre plan au sol.' },
        ],
        process: [
          { title: 'Inventaire du vitrage', text: 'Nous relevons les surfaces vitrées, les accès et les éventuelles limites.' },
          { title: 'Périmètre sûr', text: 'Seul le vitrage accessible en sécurité depuis le sol est inclus.' },
          { title: 'Nettoyage & finitions', text: 'Verre, châssis et appuis nettoyés, puis contrôlés à contre-jour.' },
          { title: 'Passages réguliers', text: 'Un calendrier adapté à votre rue, à la saison et à la fréquentation.' },
        ],
        faqs: [
          { q: 'Nettoyez-vous les fenêtres extérieures en étage ?', a: 'Pas dans ce concept. Le vitrage extérieur nécessitant échelles, nacelles ou accès sur corde sort du périmètre fictif de Clario.' },
          { q: 'Pourquoi un prix au m² de vitrage ?', a: 'Parce que l’effort dépend du verre lui-même, et non de la taille de la pièce derrière. C’est pourquoi l’assistant de démonstration demande une surface vitrée approximative.' },
        ],
        meta: {
          title: 'Nettoyage de vitres',
          description: 'Concept de nettoyage de vitres pour entreprises belges : vitrines, fenêtres intérieures, vitrage extérieur accessible et cloisons. Démo fictive, tarif au m² de vitrage.',
        },
      },
    },
  },
  // ======================================================================
  {
    id: 'sanitation',
    route: 'sanitation',
    number: '04',
    hero: 'service-sanitation-hero',
    detail: 'service-sanitation-detail-restroom',
    related: ['office', 'deep'],
    copy: {
      en: {
        name: 'Workplace Sanitation',
        short: 'Hygiene-focused care for high-contact surfaces, restrooms and shared workspaces — calm, methodical and routine.',
        eyebrow: 'Service 04 — Workplace Sanitation',
        heroTitle: 'Hygiene, handled <em>calmly</em> and consistently',
        heroLede: 'Methodical attention to the surfaces people share most, built into a routine your team can rely on.',
        introTitle: 'Focused on the places everyone touches',
        intro: [
          'Door handles, lift buttons, shared desks, coffee machines and restroom fittings are used by many hands every day. Workplace sanitation gives these points focused, recurring attention.',
          'The approach is practical rather than dramatic: the right product for each surface, correct contact times as indicated on product labels, colour-coded cloths to avoid cross-contamination, and a clear routine. We make no medical or guaranteed disinfection claims.',
        ],
        includesTitle: 'Where the focus lies',
        includes: [
          { title: 'High-contact surfaces', text: 'Handles, switches, rails, lift buttons, card readers and shared devices cleaned on a set rhythm.' },
          { title: 'Shared workspaces', text: 'Hot desks, phone booths and shared equipment cleaned between uses or at agreed times.' },
          { title: 'Restrooms', text: 'Detailed cleaning of fixtures, partitions, dispensers and floors, with consumables checked.' },
          { title: 'Common areas', text: 'Kitchens, entrances, lounges and stairwells given hygiene-focused attention.' },
          { title: 'Hygiene-focused maintenance', text: 'Colour-coded materials and documented routines that keep standards steady.' },
        ],
        benefitsTitle: 'A steady, practical routine',
        benefits: [
          { title: 'Visible care', text: 'Shared spaces that look and feel looked-after reassure teams and visitors.' },
          { title: 'Method over drama', text: 'Clear, repeatable steps rather than one-off interventions.' },
          { title: 'Honest scope', text: 'Focused cleaning and hygiene maintenance — no unsupported claims.' },
        ],
        process: [
          { title: 'Touch-point mapping', text: 'We identify the surfaces your people share most.' },
          { title: 'Product & method', text: 'Suitable products and colour-coded materials for each zone.' },
          { title: 'Routine rounds', text: 'Touch points cleaned on an agreed daily or weekly rhythm.' },
          { title: 'Documented checks', text: 'Simple logs show what was done and when.' },
        ],
        faqs: [
          { q: 'Does sanitation guarantee a germ-free workplace?', a: 'No — and no honest service can. This concept focuses on consistent cleaning and hygiene maintenance of shared surfaces, using products according to their labels.' },
          { q: 'Can this be combined with office cleaning?', a: 'Yes. In practice, many workplaces would add sanitation rounds to an existing office cleaning plan.' },
        ],
        meta: {
          title: 'Workplace Sanitation',
          description: 'Hygiene-focused workplace sanitation concept for Belgian businesses: high-contact surfaces, shared workspaces, restrooms and common areas. Fictional demo.',
        },
      },
      nl: {
        name: 'Hygiëne op de werkvloer',
        short: 'Hygiënegerichte zorg voor contactpunten, sanitair en gedeelde werkplekken — rustig, methodisch en als vaste routine.',
        eyebrow: 'Dienst 04 — Hygiëne op de werkvloer',
        heroTitle: 'Hygiëne, <em>rustig</em> en consequent aangepakt',
        heroLede: 'Methodische aandacht voor de oppervlakken die het meest gedeeld worden, ingebouwd in een routine waarop uw team kan rekenen.',
        introTitle: 'Gericht op de plekken die iedereen aanraakt',
        intro: [
          'Deurklinken, liftknoppen, gedeelde bureaus, koffiemachines en sanitair worden elke dag door veel handen gebruikt. Hygiëne op de werkvloer geeft deze punten gerichte, terugkerende aandacht.',
          'De aanpak is praktisch, niet dramatisch: het juiste product voor elk oppervlak, de juiste inwerktijd volgens het etiket, kleurgecodeerde doeken om kruisbesmetting te vermijden en een duidelijke routine. We doen geen medische claims en beloven geen gegarandeerde desinfectie.',
        ],
        includesTitle: 'Waar de focus ligt',
        includes: [
          { title: 'Veelgebruikte contactpunten', text: 'Klinken, schakelaars, leuningen, liftknoppen, badgelezers en gedeelde toestellen volgens een vast ritme gereinigd.' },
          { title: 'Gedeelde werkplekken', text: 'Flexplekken, belcellen en gedeeld materiaal gereinigd tussen gebruik of op afgesproken momenten.' },
          { title: 'Sanitair', text: 'Grondige reiniging van toestellen, scheidingswanden, dispensers en vloeren, met controle van verbruiksgoederen.' },
          { title: 'Gemeenschappelijke ruimtes', text: 'Keukens, ingangen, lounges en trappenhallen krijgen hygiënegerichte aandacht.' },
          { title: 'Hygiënegericht onderhoud', text: 'Kleurgecodeerd materiaal en vastgelegde routines houden de kwaliteit stabiel.' },
        ],
        benefitsTitle: 'Een stabiele, praktische routine',
        benefits: [
          { title: 'Zichtbare zorg', text: 'Verzorgde gedeelde ruimtes stellen teams en bezoekers gerust.' },
          { title: 'Methode boven spektakel', text: 'Duidelijke, herhaalbare stappen in plaats van losse acties.' },
          { title: 'Eerlijke afbakening', text: 'Gerichte reiniging en hygiënisch onderhoud — zonder onderbouwde beloftes te overschrijden.' },
        ],
        process: [
          { title: 'Contactpunten in kaart', text: 'We bepalen welke oppervlakken uw mensen het meest delen.' },
          { title: 'Product & methode', text: 'Geschikte producten en kleurgecodeerd materiaal per zone.' },
          { title: 'Vaste rondes', text: 'Contactpunten gereinigd volgens een afgesproken dag- of weekritme.' },
          { title: 'Gedocumenteerde controles', text: 'Eenvoudige logboeken tonen wat wanneer gebeurd is.' },
        ],
        faqs: [
          { q: 'Garandeert dit een kiemvrije werkplek?', a: 'Nee — en geen eerlijke dienst kan dat. Dit concept richt zich op consequente reiniging en hygiënisch onderhoud van gedeelde oppervlakken, met producten die volgens hun etiket worden gebruikt.' },
          { q: 'Kan dit gecombineerd worden met kantoorschoonmaak?', a: 'Ja. In de praktijk voegen veel werkplekken hygiënerondes toe aan een bestaand kantoorplan.' },
        ],
        meta: {
          title: 'Hygiëne op de werkvloer',
          description: 'Concept voor hygiëne op de werkvloer bij Belgische bedrijven: contactpunten, gedeelde werkplekken, sanitair en gemeenschappelijke ruimtes. Fictieve demo.',
        },
      },
      fr: {
        name: 'Hygiène des lieux de travail',
        short: 'Un entretien axé sur l’hygiène des points de contact, sanitaires et espaces partagés — calme, méthodique et régulier.',
        eyebrow: 'Service 04 — Hygiène des lieux de travail',
        heroTitle: 'L’hygiène, gérée avec <em>calme</em> et constance',
        heroLede: 'Une attention méthodique aux surfaces les plus partagées, intégrée à une routine sur laquelle votre équipe peut compter.',
        introTitle: 'Centré sur ce que tout le monde touche',
        intro: [
          'Poignées de porte, boutons d’ascenseur, bureaux partagés, machines à café et équipements sanitaires passent chaque jour entre de nombreuses mains. L’hygiène des lieux de travail leur accorde une attention ciblée et régulière.',
          'L’approche est pratique, pas spectaculaire : le bon produit pour chaque surface, des temps de contact conformes à l’étiquette, des chiffons à code couleur pour éviter la contamination croisée et une routine claire. Nous ne faisons aucune allégation médicale ni de désinfection garantie.',
        ],
        includesTitle: 'Où se porte l’attention',
        includes: [
          { title: 'Points de contact fréquents', text: 'Poignées, interrupteurs, rampes, boutons d’ascenseur, lecteurs de badge et appareils partagés nettoyés à un rythme fixe.' },
          { title: 'Espaces de travail partagés', text: 'Postes flexibles, cabines téléphoniques et équipements partagés nettoyés entre deux usages ou à heures convenues.' },
          { title: 'Sanitaires', text: 'Nettoyage minutieux des équipements, cloisons, distributeurs et sols, avec vérification des consommables.' },
          { title: 'Espaces communs', text: 'Cuisines, entrées, salons et cages d’escalier font l’objet d’une attention axée sur l’hygiène.' },
          { title: 'Entretien axé sur l’hygiène', text: 'Matériel à code couleur et routines documentées pour un niveau constant.' },
        ],
        benefitsTitle: 'Une routine stable et pragmatique',
        benefits: [
          { title: 'Un soin visible', text: 'Des espaces partagés bien tenus rassurent équipes et visiteurs.' },
          { title: 'La méthode plutôt que l’effet', text: 'Des étapes claires et reproductibles plutôt que des actions ponctuelles.' },
          { title: 'Un périmètre honnête', text: 'Un nettoyage ciblé et un entretien hygiénique — sans allégations infondées.' },
        ],
        process: [
          { title: 'Cartographie des points de contact', text: 'Nous identifions les surfaces les plus partagées.' },
          { title: 'Produits & méthode', text: 'Des produits adaptés et du matériel à code couleur pour chaque zone.' },
          { title: 'Passages réguliers', text: 'Points de contact nettoyés selon un rythme quotidien ou hebdomadaire convenu.' },
          { title: 'Contrôles documentés', text: 'Des relevés simples indiquent ce qui a été fait et quand.' },
        ],
        faqs: [
          { q: 'Ce service garantit-il un lieu de travail sans germes ?', a: 'Non — et aucun service honnête ne le peut. Ce concept porte sur un nettoyage régulier et un entretien hygiénique des surfaces partagées, avec des produits utilisés selon leur étiquette.' },
          { q: 'Peut-on le combiner au nettoyage de bureaux ?', a: 'Oui. En pratique, de nombreux lieux de travail ajouteraient des passages d’hygiène à un plan de nettoyage existant.' },
        ],
        meta: {
          title: 'Hygiène des lieux de travail',
          description: 'Concept d’hygiène des lieux de travail pour entreprises belges : points de contact, espaces partagés, sanitaires et espaces communs. Démo fictive.',
        },
      },
    },
  },
];

export function getService(id: ServiceId): Service {
  const s = services.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown service ${id}`);
  return s;
}
