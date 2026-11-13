import type { Locale } from '../i18n/config.ts';

export type LegalDoc = 'privacy' | 'cookies' | 'terms' | 'notice';

export interface LegalSection { heading: string; body: string[]; list?: string[] }
export interface LegalPage {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  disclaimer: string;
}

const UPDATED = '13 November 2026';
const UPDATED_NL = '13 november 2026';
const UPDATED_FR = '13 novembre 2026';

const en: Record<LegalDoc, LegalPage> = {
  privacy: {
    meta: { title: 'Privacy Policy (Demo)', description: 'How this demonstration website handles data: it collects nothing, transmits nothing and installs no trackers. Illustrative document for a fictional brand.' },
    eyebrow: 'Demo legal',
    title: 'Privacy Policy',
    updated: UPDATED,
    intro: 'This document describes how this website actually behaves. Clario Cleaning is a fictional brand and this site is a portfolio demonstration, so there is no company collecting or processing your personal data through it.',
    sections: [
      { heading: 'Who is behind this website', body: ['This site was designed and built by Mahmoud Anwari as a portfolio demonstration. Clario Cleaning does not exist as a company, has no legal entity and offers no services.'] },
      { heading: 'What data is collected', body: ['None. This is a static website. There is no backend, no database, no contact endpoint, no newsletter service and no customer relationship system connected to it.'] },
      { heading: 'Forms on this site', body: ['The quote wizard, booking calendar and contact form run entirely in your browser. The values you see or enter are held in memory for the duration of your visit to that page and are discarded when you navigate away or close the tab. They are never submitted, stored, logged, emailed or transmitted anywhere.'] },
      { heading: 'Local storage', body: ['If you turn animations on or off, that single preference may be stored in your browser’s local storage under the key "clario-motion". It stays on your device, is never sent to a server, and can be removed at any time from the cookie preferences panel or by clearing your browser data.'] },
      { heading: 'Cookies and tracking', body: ['This site sets no cookies and loads no analytics, advertising, social-media or fingerprinting scripts. Fonts are self-hosted, so no font provider receives your IP address.'] },
      { heading: 'Hosting and server logs', body: ['The site is intended to be hosted as static files on Cloudflare Pages. Like any web host, the hosting provider may process technical request data (such as IP address and user agent) for delivery and security purposes under its own terms. The site owner does not add any additional collection on top of that.'] },
      { heading: 'Your rights', body: ['Because no personal data is collected or processed through this website, there is nothing to access, correct, export or erase. If you have a question about the demonstration itself, it can be directed to the site creator through the portfolio website linked in the footer.'] },
    ],
    disclaimer: 'This is an illustrative document written to describe a portfolio demonstration. It is not legal advice and would need review by a qualified professional before being reused by a real business.',
  },
  cookies: {
    meta: { title: 'Cookie Policy (Demo)', description: 'This demonstration website sets no cookies and loads no trackers. The only stored item is an optional animation preference in local storage.' },
    eyebrow: 'Demo legal',
    title: 'Cookie Policy',
    updated: UPDATED,
    intro: 'This page explains exactly what this website stores on your device. The short version: no cookies at all, and at most one optional preference in local storage.',
    sections: [
      { heading: 'Cookies used', body: ['None. This website does not set first-party or third-party cookies. There is no consent banner demanding a choice because there is nothing to consent to.'] },
      {
        heading: 'What may be stored locally',
        body: ['One optional item may be written to your browser’s local storage:'],
        list: [
          'clario-motion — remembers whether you switched animations on or off. Values: "on" or "off".',
          'clario-cookie-prefs-seen — set only if you choose to save your preference in the cookie preferences panel.',
        ],
      },
      { heading: 'Difference from cookies', body: ['Local storage is not sent with HTTP requests, so unlike a cookie it never reaches any server. It stays in your browser on this device until you clear it.'] },
      { heading: 'Analytics and advertising', body: ['No analytics platform, tag manager, advertising pixel, heatmap or session-recording tool is installed. The cookie preferences panel shows these categories for demonstration purposes and states clearly that there is nothing to switch on.'] },
      { heading: 'Managing your preferences', body: ['Open the cookie preferences panel from the footer link to review or clear what is stored. You can also clear site data for this domain in your browser settings at any time.'] },
    ],
    disclaimer: 'This is an illustrative document describing a portfolio demonstration. A real business would need a cookie policy that matches its own actual tooling, reviewed by a qualified professional.',
  },
  terms: {
    meta: { title: 'Terms of Use (Demo)', description: 'Terms describing the use of this fictional portfolio demonstration website for Clario Cleaning.' },
    eyebrow: 'Demo legal',
    title: 'Terms of Use',
    updated: UPDATED,
    intro: 'These terms describe the use of this demonstration website. They are written for a fictional brand and a portfolio project, not for a trading company.',
    sections: [
      { heading: 'Nature of this website', body: ['This website is a design and development portfolio demonstration. Clario Cleaning is a fictional brand. No services are offered, sold or provided through this site, and no contract can be formed with anyone through it.'] },
      { heading: 'No offer and no quotation', body: ['All prices, estimates and calculations shown on this site are illustrative sample values. The quote wizard produces a demonstration figure, not an offer, a quotation or a binding price. The booking calendar shows simulated availability and cannot reserve an appointment.'] },
      { heading: 'Accuracy of content', body: ['The service descriptions, company story, testimonials and statistics are fictional content written to demonstrate a realistic website. They should not be relied upon as information about any real cleaning company or about the commercial cleaning market.'] },
      { heading: 'Intellectual property', body: ['The design, code, written content and photography of this site belong to Mahmoud Anwari unless stated otherwise. The Clario name and wordmark are fictional and created for this project. Please do not reuse the site’s assets without permission.'] },
      { heading: 'Availability', body: ['This is a demonstration site and may be changed, moved or taken offline at any time without notice.'] },
      { heading: 'Liability', body: ['The site is provided “as is” for demonstration purposes. No warranty is given about its content, and no liability is accepted for decisions made on the basis of the fictional information it contains.'] },
    ],
    disclaimer: 'This is an illustrative document for a portfolio demonstration. It is not legal advice and would need professional review before reuse.',
  },
  notice: {
    meta: { title: 'Legal Notice (Demo)', description: 'Legal notice for the Clario Cleaning portfolio demonstration: who built it, what it is, and what it deliberately does not claim.' },
    eyebrow: 'Demo legal',
    title: 'Legal Notice',
    updated: UPDATED,
    intro: 'A legal notice normally identifies the business operating a website. Because Clario Cleaning is fictional, this page identifies the demonstration instead.',
    sections: [
      { heading: 'Website', body: ['clario.mahmoudanwari.com — a portfolio demonstration website presenting a fictional commercial cleaning brand.'] },
      { heading: 'Created by', body: ['Mahmoud Anwari, web designer and developer. The portfolio is linked in the footer of every page.'] },
      { heading: 'Fictional company', body: ['Clario Cleaning is not a registered company. There is deliberately no enterprise number, no VAT number, no registered office, no physical address and no opening hours listed anywhere on this site, because none exist.'] },
      { heading: 'Contact details', body: ['The email address and phone number shown on the contact page are non-functional placeholders using reserved example domains and empty number patterns. They are presented as plain text rather than clickable links so that no one can accidentally contact a company that does not exist.'] },
      { heading: 'Imagery', body: ['Photography is created specifically for this brand concept and art-directed to a written manifest. People shown in images do not represent real Clario employees, because there are none.'] },
      { heading: 'Reporting an issue', body: ['If something on this site appears misleading or you believe a demo disclosure is missing, please let the creator know through the portfolio site so it can be corrected.'] },
    ],
    disclaimer: 'This notice describes a portfolio demonstration and does not constitute the legal identification of an operating business.',
  },
};

const nl: Record<LegalDoc, LegalPage> = {
  privacy: {
    meta: { title: 'Privacybeleid (demo)', description: 'Hoe deze demonstratiewebsite met gegevens omgaat: ze verzamelt niets, verstuurt niets en installeert geen trackers. Illustratief document voor een fictief merk.' },
    eyebrow: 'Juridisch (demo)',
    title: 'Privacybeleid',
    updated: UPDATED_NL,
    intro: 'Dit document beschrijft hoe deze website zich werkelijk gedraagt. Clario Cleaning is een fictief merk en deze site is een portfoliodemonstratie: er is dus geen bedrijf dat via deze site uw persoonsgegevens verzamelt of verwerkt.',
    sections: [
      { heading: 'Wie zit achter deze website', body: ['Deze site is ontworpen en gebouwd door Mahmoud Anwari als portfoliodemonstratie. Clario Cleaning bestaat niet als bedrijf, heeft geen rechtspersoon en biedt geen diensten aan.'] },
      { heading: 'Welke gegevens worden verzameld', body: ['Geen. Dit is een statische website. Er is geen backend, geen databank, geen contactendpoint, geen nieuwsbriefdienst en geen CRM-systeem aan gekoppeld.'] },
      { heading: 'Formulieren op deze site', body: ['De offertewizard, de boekingskalender en het contactformulier werken volledig in uw browser. De waarden die u ziet of invult, blijven in het geheugen tijdens uw bezoek aan die pagina en verdwijnen zodra u wegnavigeert of het tabblad sluit. Ze worden nooit ingediend, bewaard, gelogd, gemaild of ergens naartoe verstuurd.'] },
      { heading: 'Lokale opslag', body: ['Als u animaties aan- of uitzet, kan die ene voorkeur bewaard worden in de lokale opslag van uw browser onder de sleutel "clario-motion". Ze blijft op uw toestel, wordt nooit naar een server gestuurd en kan op elk moment verwijderd worden via het cookievoorkeurenpaneel of door uw browsergegevens te wissen.'] },
      { heading: 'Cookies en tracking', body: ['Deze site plaatst geen cookies en laadt geen scripts voor analyse, advertenties, sociale media of fingerprinting. Lettertypes worden lokaal gehost, zodat geen enkele lettertypeleverancier uw IP-adres ontvangt.'] },
      { heading: 'Hosting en serverlogs', body: ['De site is bedoeld om als statische bestanden gehost te worden op Cloudflare Pages. Zoals elke webhost kan de hostingprovider technische verzoekgegevens (zoals IP-adres en user agent) verwerken voor levering en beveiliging, onder zijn eigen voorwaarden. De eigenaar van de site voegt daar niets aan toe.'] },
      { heading: 'Uw rechten', body: ['Omdat er via deze website geen persoonsgegevens worden verzameld of verwerkt, is er niets om in te kijken, te corrigeren, te exporteren of te wissen. Hebt u een vraag over de demonstratie zelf, dan kunt u de maker bereiken via de portfoliowebsite in de voettekst.'] },
    ],
    disclaimer: 'Dit is een illustratief document dat een portfoliodemonstratie beschrijft. Het is geen juridisch advies en zou door een gekwalificeerde professional nagekeken moeten worden vóór hergebruik door een echt bedrijf.',
  },
  cookies: {
    meta: { title: 'Cookiebeleid (demo)', description: 'Deze demonstratiewebsite plaatst geen cookies en laadt geen trackers. Het enige bewaarde item is een optionele animatievoorkeur in de lokale opslag.' },
    eyebrow: 'Juridisch (demo)',
    title: 'Cookiebeleid',
    updated: UPDATED_NL,
    intro: 'Deze pagina legt precies uit wat deze website op uw toestel bewaart. Kort samengevat: geen enkele cookie, en hoogstens één optionele voorkeur in de lokale opslag.',
    sections: [
      { heading: 'Gebruikte cookies', body: ['Geen. Deze website plaatst geen eigen cookies of cookies van derden. Er is geen opdringerige cookiebanner, omdat er niets is om toestemming voor te geven.'] },
      {
        heading: 'Wat lokaal bewaard kan worden',
        body: ['Eén optioneel item kan in de lokale opslag van uw browser geschreven worden:'],
        list: [
          'clario-motion — onthoudt of u animaties aan- of uitgezet hebt. Waarden: "on" of "off".',
          'clario-cookie-prefs-seen — wordt enkel geplaatst als u in het voorkeurenpaneel kiest om uw voorkeur te bewaren.',
        ],
      },
      { heading: 'Verschil met cookies', body: ['Lokale opslag wordt niet meegestuurd met HTTP-verzoeken en bereikt dus, in tegenstelling tot een cookie, nooit een server. Ze blijft in uw browser op dit toestel tot u ze wist.'] },
      { heading: 'Analyse en advertenties', body: ['Er is geen analyseplatform, tagmanager, advertentiepixel, heatmap of sessie-opnametool geïnstalleerd. Het cookievoorkeurenpaneel toont deze categorieën ter demonstratie en vermeldt duidelijk dat er niets in te schakelen valt.'] },
      { heading: 'Uw voorkeuren beheren', body: ['Open het cookievoorkeurenpaneel via de link in de voettekst om te bekijken of te wissen wat bewaard is. U kunt de sitegegevens voor dit domein ook op elk moment wissen in uw browserinstellingen.'] },
    ],
    disclaimer: 'Dit is een illustratief document dat een portfoliodemonstratie beschrijft. Een echt bedrijf heeft een cookiebeleid nodig dat overeenstemt met zijn eigen tools, nagekeken door een gekwalificeerde professional.',
  },
  terms: {
    meta: { title: 'Gebruiksvoorwaarden (demo)', description: 'Voorwaarden voor het gebruik van deze fictieve portfoliodemonstratiewebsite voor Clario Cleaning.' },
    eyebrow: 'Juridisch (demo)',
    title: 'Gebruiksvoorwaarden',
    updated: UPDATED_NL,
    intro: 'Deze voorwaarden beschrijven het gebruik van deze demonstratiewebsite. Ze zijn geschreven voor een fictief merk en een portfolioproject, niet voor een handelsvennootschap.',
    sections: [
      { heading: 'Aard van deze website', body: ['Deze website is een demonstratie voor een design- en ontwikkelportfolio. Clario Cleaning is een fictief merk. Er worden via deze site geen diensten aangeboden, verkocht of geleverd, en er kan via deze site met niemand een overeenkomst tot stand komen.'] },
      { heading: 'Geen aanbod en geen offerte', body: ['Alle prijzen, ramingen en berekeningen op deze site zijn illustratieve voorbeeldwaarden. De offertewizard produceert een demonstratiebedrag, geen aanbod, offerte of bindende prijs. De boekingskalender toont gesimuleerde beschikbaarheid en kan geen afspraak reserveren.'] },
      { heading: 'Juistheid van de inhoud', body: ['De dienstbeschrijvingen, het bedrijfsverhaal, de getuigenissen en de cijfers zijn fictieve inhoud, geschreven om een realistische website te demonstreren. Ze mogen niet gebruikt worden als informatie over een echt schoonmaakbedrijf of over de markt van de bedrijfsschoonmaak.'] },
      { heading: 'Intellectuele eigendom', body: ['Het ontwerp, de code, de teksten en de fotografie van deze site behoren toe aan Mahmoud Anwari, tenzij anders vermeld. De naam en het woordmerk Clario zijn fictief en voor dit project gecreëerd. Gelieve de elementen van deze site niet te hergebruiken zonder toestemming.'] },
      { heading: 'Beschikbaarheid', body: ['Dit is een demonstratiesite die op elk moment en zonder kennisgeving gewijzigd, verplaatst of offline gehaald kan worden.'] },
      { heading: 'Aansprakelijkheid', body: ['De site wordt “as is” aangeboden voor demonstratiedoeleinden. Er wordt geen garantie gegeven over de inhoud en geen aansprakelijkheid aanvaard voor beslissingen genomen op basis van de fictieve informatie die ze bevat.'] },
    ],
    disclaimer: 'Dit is een illustratief document voor een portfoliodemonstratie. Het is geen juridisch advies en zou professioneel nagekeken moeten worden vóór hergebruik.',
  },
  notice: {
    meta: { title: 'Juridische kennisgeving (demo)', description: 'Juridische kennisgeving voor de portfoliodemonstratie Clario Cleaning: wie ze gemaakt heeft, wat ze is en wat ze bewust niet beweert.' },
    eyebrow: 'Juridisch (demo)',
    title: 'Juridische kennisgeving',
    updated: UPDATED_NL,
    intro: 'Een juridische kennisgeving identificeert normaal het bedrijf achter een website. Omdat Clario Cleaning fictief is, identificeert deze pagina in de plaats daarvan de demonstratie.',
    sections: [
      { heading: 'Website', body: ['clario.mahmoudanwari.com — een portfoliodemonstratie die een fictief merk voor bedrijfsschoonmaak voorstelt.'] },
      { heading: 'Gemaakt door', body: ['Mahmoud Anwari, webdesigner en -ontwikkelaar. Het portfolio staat onderaan elke pagina gelinkt.'] },
      { heading: 'Fictief bedrijf', body: ['Clario Cleaning is geen geregistreerd bedrijf. Er staan op deze site bewust geen ondernemingsnummer, btw-nummer, maatschappelijke zetel, fysiek adres of openingsuren vermeld, omdat die niet bestaan.'] },
      { heading: 'Contactgegevens', body: ['Het e-mailadres en telefoonnummer op de contactpagina zijn niet-werkende tijdelijke gegevens met voorbehouden voorbeelddomeinen en lege nummerpatronen. Ze worden als gewone tekst getoond en niet als klikbare links, zodat niemand per ongeluk een onbestaand bedrijf kan contacteren.'] },
      { heading: 'Beeldmateriaal', body: ['De fotografie is specifiek voor dit merkconcept gemaakt en artistiek geregisseerd volgens een schriftelijk manifest. De personen op de beelden stellen geen echte Clario-medewerkers voor, want die bestaan niet.'] },
      { heading: 'Een probleem melden', body: ['Lijkt iets op deze site misleidend, of ontbreekt er volgens u een demovermelding, laat het dan weten aan de maker via de portfoliosite, zodat het rechtgezet kan worden.'] },
    ],
    disclaimer: 'Deze kennisgeving beschrijft een portfoliodemonstratie en vormt geen juridische identificatie van een werkend bedrijf.',
  },
};

const fr: Record<LegalDoc, LegalPage> = {
  privacy: {
    meta: { title: 'Politique de confidentialité (démo)', description: 'Comment ce site de démonstration traite les données : il ne collecte rien, ne transmet rien et n’installe aucun traceur. Document illustratif pour une marque fictive.' },
    eyebrow: 'Juridique (démo)',
    title: 'Politique de confidentialité',
    updated: UPDATED_FR,
    intro: 'Ce document décrit le comportement réel de ce site. Clario Cleaning est une marque fictive et ce site est une démonstration de portfolio : aucune entreprise ne collecte ni ne traite vos données personnelles par son intermédiaire.',
    sections: [
      { heading: 'Qui est derrière ce site', body: ['Ce site a été conçu et développé par Mahmoud Anwari à titre de démonstration de portfolio. Clario Cleaning n’existe pas en tant qu’entreprise, n’a aucune personnalité juridique et ne propose aucun service.'] },
      { heading: 'Quelles données sont collectées', body: ['Aucune. Il s’agit d’un site statique. Aucun backend, aucune base de données, aucun point de contact, aucun service de newsletter ni aucun CRM n’y est relié.'] },
      { heading: 'Les formulaires de ce site', body: ['L’assistant de devis, le calendrier de réservation et le formulaire de contact fonctionnent entièrement dans votre navigateur. Les valeurs que vous voyez ou saisissez restent en mémoire le temps de votre visite sur la page et disparaissent dès que vous la quittez ou fermez l’onglet. Elles ne sont jamais soumises, enregistrées, journalisées, envoyées par e-mail ni transmises où que ce soit.'] },
      { heading: 'Stockage local', body: ['Si vous activez ou désactivez les animations, cette unique préférence peut être enregistrée dans le stockage local de votre navigateur sous la clé « clario-motion ». Elle reste sur votre appareil, n’est jamais envoyée à un serveur et peut être supprimée à tout moment via le panneau de préférences cookies ou en effaçant les données de votre navigateur.'] },
      { heading: 'Cookies et traceurs', body: ['Ce site ne dépose aucun cookie et ne charge aucun script d’analyse, de publicité, de réseaux sociaux ou d’empreinte numérique. Les polices sont hébergées localement : aucun fournisseur de polices ne reçoit votre adresse IP.'] },
      { heading: 'Hébergement et journaux serveur', body: ['Le site est destiné à être hébergé sous forme de fichiers statiques sur Cloudflare Pages. Comme tout hébergeur, le fournisseur peut traiter des données techniques de requête (adresse IP, agent utilisateur) à des fins de livraison et de sécurité, selon ses propres conditions. Le propriétaire du site n’ajoute aucune collecte supplémentaire.'] },
      { heading: 'Vos droits', body: ['Aucune donnée personnelle n’étant collectée ni traitée via ce site, il n’y a rien à consulter, rectifier, exporter ou effacer. Pour toute question sur la démonstration elle-même, vous pouvez contacter le créateur via le site de portfolio lié en pied de page.'] },
    ],
    disclaimer: 'Ce document illustratif décrit une démonstration de portfolio. Il ne constitue pas un conseil juridique et devrait être revu par un professionnel qualifié avant d’être réutilisé par une entreprise réelle.',
  },
  cookies: {
    meta: { title: 'Politique en matière de cookies (démo)', description: 'Ce site de démonstration ne dépose aucun cookie et ne charge aucun traceur. Le seul élément stocké est une préférence d’animation facultative.' },
    eyebrow: 'Juridique (démo)',
    title: 'Politique en matière de cookies',
    updated: UPDATED_FR,
    intro: 'Cette page explique précisément ce que ce site enregistre sur votre appareil. En résumé : aucun cookie, et tout au plus une préférence facultative dans le stockage local.',
    sections: [
      { heading: 'Cookies utilisés', body: ['Aucun. Ce site ne dépose ni cookies propres ni cookies tiers. Il n’y a pas de bannière de consentement imposée, car il n’y a rien à accepter.'] },
      {
        heading: 'Ce qui peut être stocké localement',
        body: ['Un élément facultatif peut être écrit dans le stockage local de votre navigateur :'],
        list: [
          'clario-motion — mémorise si vous avez activé ou désactivé les animations. Valeurs : « on » ou « off ».',
          'clario-cookie-prefs-seen — enregistré uniquement si vous choisissez de conserver votre préférence dans le panneau dédié.',
        ],
      },
      { heading: 'Différence avec les cookies', body: ['Le stockage local n’est pas envoyé avec les requêtes HTTP : contrairement à un cookie, il n’atteint jamais aucun serveur. Il reste dans votre navigateur, sur cet appareil, jusqu’à ce que vous l’effaciez.'] },
      { heading: 'Mesure d’audience et publicité', body: ['Aucune plateforme d’analyse, gestionnaire de balises, pixel publicitaire, carte de chaleur ou outil d’enregistrement de session n’est installé. Le panneau de préférences affiche ces catégories à titre de démonstration et indique clairement qu’il n’y a rien à activer.'] },
      { heading: 'Gérer vos préférences', body: ['Ouvrez le panneau de préférences cookies depuis le lien en pied de page pour consulter ou effacer ce qui est enregistré. Vous pouvez aussi effacer les données du site pour ce domaine dans les réglages de votre navigateur.'] },
    ],
    disclaimer: 'Ce document illustratif décrit une démonstration de portfolio. Une entreprise réelle aurait besoin d’une politique cookies correspondant à ses propres outils, revue par un professionnel qualifié.',
  },
  terms: {
    meta: { title: 'Conditions d’utilisation (démo)', description: 'Conditions décrivant l’utilisation de ce site de démonstration fictif pour Clario Cleaning.' },
    eyebrow: 'Juridique (démo)',
    title: 'Conditions d’utilisation',
    updated: UPDATED_FR,
    intro: 'Ces conditions décrivent l’utilisation de ce site de démonstration. Elles sont rédigées pour une marque fictive et un projet de portfolio, non pour une société commerciale.',
    sections: [
      { heading: 'Nature de ce site', body: ['Ce site est une démonstration de portfolio en design et développement. Clario Cleaning est une marque fictive. Aucun service n’est proposé, vendu ou fourni via ce site, et aucun contrat ne peut y être conclu avec qui que ce soit.'] },
      { heading: 'Ni offre ni devis', body: ['Tous les prix, estimations et calculs présentés sont des valeurs d’exemple illustratives. L’assistant de devis produit un montant de démonstration, non une offre, un devis ou un prix contraignant. Le calendrier affiche des disponibilités simulées et ne peut réserver aucun rendez-vous.'] },
      { heading: 'Exactitude du contenu', body: ['Les descriptions de services, l’histoire de l’entreprise, les témoignages et les chiffres sont des contenus fictifs rédigés pour illustrer un site réaliste. Ils ne doivent pas être pris pour des informations sur une entreprise de nettoyage réelle ou sur le marché du nettoyage professionnel.'] },
      { heading: 'Propriété intellectuelle', body: ['Le design, le code, les textes et la photographie de ce site appartiennent à Mahmoud Anwari, sauf mention contraire. Le nom et le logotype Clario sont fictifs et créés pour ce projet. Merci de ne pas réutiliser les éléments du site sans autorisation.'] },
      { heading: 'Disponibilité', body: ['Ce site de démonstration peut être modifié, déplacé ou mis hors ligne à tout moment et sans préavis.'] },
      { heading: 'Responsabilité', body: ['Le site est fourni « en l’état » à des fins de démonstration. Aucune garantie n’est donnée quant à son contenu et aucune responsabilité n’est acceptée pour des décisions prises sur la base des informations fictives qu’il contient.'] },
    ],
    disclaimer: 'Ce document illustratif concerne une démonstration de portfolio. Il ne constitue pas un conseil juridique et devrait être revu par un professionnel avant toute réutilisation.',
  },
  notice: {
    meta: { title: 'Mentions légales (démo)', description: 'Mentions légales de la démonstration de portfolio Clario Cleaning : qui l’a créée, ce qu’elle est et ce qu’elle ne prétend délibérément pas être.' },
    eyebrow: 'Juridique (démo)',
    title: 'Mentions légales',
    updated: UPDATED_FR,
    intro: 'Des mentions légales identifient normalement l’entreprise qui exploite un site. Clario Cleaning étant fictive, cette page identifie la démonstration elle-même.',
    sections: [
      { heading: 'Site web', body: ['clario.mahmoudanwari.com — une démonstration de portfolio présentant une marque fictive de nettoyage professionnel.'] },
      { heading: 'Créé par', body: ['Mahmoud Anwari, webdesigner et développeur. Le portfolio est lié en pied de chaque page.'] },
      { heading: 'Entreprise fictive', body: ['Clario Cleaning n’est pas une entreprise enregistrée. Aucun numéro d’entreprise, numéro de TVA, siège social, adresse physique ou horaire d’ouverture n’est délibérément indiqué sur ce site, car il n’en existe aucun.'] },
      { heading: 'Coordonnées', body: ['L’adresse e-mail et le numéro de téléphone de la page contact sont des espaces réservés non fonctionnels utilisant des domaines d’exemple réservés et des numéros vides. Ils sont affichés en texte brut plutôt qu’en liens cliquables, afin que personne ne puisse contacter par erreur une entreprise inexistante.'] },
      { heading: 'Images', body: ['La photographie est créée spécifiquement pour ce concept de marque et dirigée selon un manifeste écrit. Les personnes représentées ne sont pas de véritables employés de Clario, puisqu’il n’en existe pas.'] },
      { heading: 'Signaler un problème', body: ['Si un élément de ce site vous semble trompeur ou si une mention de démonstration vous paraît manquante, faites-le savoir au créateur via son site de portfolio afin qu’il puisse être corrigé.'] },
    ],
    disclaimer: 'Ces mentions décrivent une démonstration de portfolio et ne constituent pas l’identification légale d’une entreprise en activité.',
  },
};

export const legal: Record<Locale, Record<LegalDoc, LegalPage>> = { en, nl, fr };
