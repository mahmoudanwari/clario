/**
 * IMAGE ASSET REGISTRY — single source of truth for every photograph slot.
 *
 * Workflow: drop a finished file named `<file>.jpg` (or .png/.webp/.avif) into
 * `src/assets/clario/`. The <Media> component detects it at build time and
 * replaces the placeholder with an optimised AVIF/WebP <picture>. No code
 * changes are needed. `npm run manifest` regenerates docs/image-assets.md.
 *
 * Keep this file free of TypeScript-only runtime syntax (enums etc.) so the
 * manifest script can import it with Node's built-in type stripping.
 */

export type Aspect = '3:2' | '4:5' | '1:1' | '16:9' | '4:3' | '2:1' | '1.91:1' | '9:16';
export type Priority = 'P1' | 'P2' | 'P3';
export type Tone = 'forest' | 'sage' | 'sand' | 'ivory';

export interface ImageAsset {
  id: string;
  file: string;
  page: string;
  section: string;
  subject: string;
  composition: string;
  camera: string;
  aspect: Aspect;
  size: string;
  lighting: string;
  colors: string;
  people: string;
  uniform: string;
  background: string;
  alt: { en: string; nl: string; fr: string };
  priority: Priority;
  tone: Tone;
  /** CSS object-position used when the image is cropped by a layout. */
  focus?: string;
  notes?: string;
}

/** Shown on placeholders. Set to false to hide the asset labels. */
export const showPlaceholderLabels = true;

const UNIFORM =
  'Forest-green (#244F41 family) short-sleeve polo or zip work jacket, charcoal work trousers, small ivory CLARIO wordmark on chest (text only, no other logos), clean non-slip shoes. No gloves unless handling products.';
const NOUNIFORM = 'Not applicable';
const DAYLIGHT = 'Soft natural daylight from large windows, gentle warm bounce, no harsh shadows, no visible flash';
const GRADE = 'Warm ivory highlights, muted forest and sage greens, subtle sand/oak accents; low saturation, editorial grade';

export const images = [
  // ---------------- HOME ----------------
  {
    id: 'CL-01', file: 'home-hero-team-office', page: 'Home', section: 'Hero (full-screen)',
    subject: 'Two professional cleaners working calmly in a bright, modern open-plan Belgian office — one wiping a long oak meeting table, one in soft focus behind tidying a shared workspace.',
    composition: 'Wide, cinematic. Keep the LEFT 45% visually quiet (light wall, window, soft blur) for headline text. Main subject in the right third. Generous headroom.',
    camera: 'Eye level, 35mm equivalent, shallow depth of field (f/2.8 feel), slightly off-axis.',
    aspect: '3:2', size: '2880 × 1920 px (min 2400 × 1600)', lighting: DAYLIGHT, colors: GRADE,
    people: 'Yes — 2 adults, faces may be partly visible but not the focus; diverse, natural, not posing at camera.',
    uniform: UNIFORM,
    background: 'Contemporary office: oak, plants, large glazing, light concrete or ivory walls, tidy but lived-in.',
    alt: {
      en: 'Two Clario cleaners in forest-green uniforms tidying a bright modern office',
      nl: 'Twee schoonmakers van Clario in bosgroene uniformen poetsen een licht, modern kantoor',
      fr: 'Deux agents Clario en uniforme vert forêt entretiennent un bureau moderne et lumineux',
    },
    priority: 'P1', tone: 'forest', focus: '70% 50%',
    notes: 'Most important image on the site. Also used as LCP — please export a well-compressed JPEG (< 600 KB).',
  },
  {
    id: 'CL-02', file: 'home-hero-detail-glass', page: 'Home', section: 'Hero (layered inset card)',
    subject: 'Close-up of a gloved or bare hand drawing a microfibre cloth across a glass meeting-room partition; a streak-free reflection of daylight.',
    composition: 'Tight crop, diagonal movement from lower-left to upper-right. Cloth in sage or forest green.',
    camera: 'Macro-ish, 50–85mm, eye level with the glass.', aspect: '4:5', size: '1200 × 1500 px',
    lighting: DAYLIGHT, colors: GRADE, people: 'Hand and forearm only (green sleeve visible).', uniform: UNIFORM,
    background: 'Blurred office interior through the glass.',
    alt: {
      en: 'A microfibre cloth leaving a streak-free finish on a glass partition',
      nl: 'Een microvezeldoek laat een streeploze glazen wand achter',
      fr: 'Un chiffon microfibre laisse une paroi vitrée sans traces',
    },
    priority: 'P1', tone: 'sage',
  },
  {
    id: 'CL-03', file: 'home-intro-reception', page: 'Home', section: 'Brand introduction (large image)',
    subject: 'A calm, freshly cleaned reception area of a small Belgian company early in the morning, one cleaner finishing a counter in the background.',
    composition: 'Vertical. Counter and plants in foreground, cleaner small in mid-ground. Space at top.',
    camera: 'Eye level, 35mm.', aspect: '4:5', size: '1600 × 2000 px', lighting: 'Early morning daylight, warm low sun through blinds.',
    colors: GRADE, people: 'Yes — 1 cleaner, small in frame.', uniform: UNIFORM,
    background: 'Reception desk in oak, terrazzo or light stone floor, plants.',
    alt: {
      en: 'A freshly cleaned reception area in early morning light',
      nl: 'Een pas gepoetste receptie in het ochtendlicht',
      fr: 'Un accueil fraîchement nettoyé dans la lumière du matin',
    },
    priority: 'P2', tone: 'sand',
  },
  {
    id: 'CL-04', file: 'home-intro-detail-cart', page: 'Home', section: 'Brand introduction (small overlapping image)',
    subject: 'Neatly organised cleaning trolley with colour-coded microfibre cloths, refillable spray bottles with plain labels and a small plant nearby.',
    composition: 'Square, top-down 3/4 angle, orderly arrangement.', camera: 'Slightly elevated, 50mm.', aspect: '1:1', size: '1200 × 1200 px',
    lighting: DAYLIGHT, colors: GRADE, people: 'No.', uniform: NOUNIFORM,
    background: 'Light floor or neutral wall. No brand labels on products.',
    alt: {
      en: 'An organised cleaning trolley with colour-coded cloths and refillable bottles',
      nl: 'Een geordende schoonmaakkar met kleurgecodeerde doeken en hervulbare flessen',
      fr: 'Un chariot de nettoyage ordonné avec chiffons à code couleur et flacons rechargeables',
    },
    priority: 'P2', tone: 'sage',
  },
  {
    id: 'CL-05', file: 'home-why-team-briefing', page: 'Home', section: 'Why Clario',
    subject: 'Small cleaning team (3 people) having a short briefing with a tablet before a shift, in a modern office corridor.',
    composition: 'Vertical, people grouped in lower two-thirds, natural interaction.', camera: 'Eye level, 35–50mm.', aspect: '4:5', size: '1600 × 2000 px',
    lighting: DAYLIGHT, colors: GRADE, people: 'Yes — 3 adults, natural expressions, not looking at camera.', uniform: UNIFORM,
    background: 'Office corridor with glass walls and wood details.',
    alt: {
      en: 'A Clario team reviewing a cleaning plan on a tablet before their shift',
      nl: 'Een Clario-team overloopt het schoonmaakplan op een tablet vóór de shift',
      fr: 'Une équipe Clario passe en revue le plan de nettoyage sur une tablette avant le service',
    },
    priority: 'P2', tone: 'forest',
  },
  {
    id: 'CL-06', file: 'before-after-meeting-room-before', page: 'Home', section: 'Before / after comparison — BEFORE',
    subject: 'A modern meeting room at the end of a busy workday: used coffee cups, crumbs, smudged glass table, chairs pushed out, marks on the whiteboard, slightly dusty sill. Believable, not filthy.',
    composition: 'IDENTICAL framing to CL-07. Lock the camera on a tripod; only the state of the room may change.',
    camera: 'Tripod, eye level, 24–28mm, straight verticals.', aspect: '2:1', size: '2400 × 1200 px (supplied: 1670 × 816)',
    lighting: 'Same daylight as CL-07 (shoot both within minutes).', colors: GRADE, people: 'No.', uniform: NOUNIFORM,
    background: 'Meeting room with glass table, 6 chairs, window, whiteboard.',
    alt: {
      en: 'Meeting room before cleaning, with cups, crumbs and smudged surfaces',
      nl: 'Vergaderzaal vóór de schoonmaak, met koffiekopjes, kruimels en vlekken',
      fr: 'Salle de réunion avant nettoyage, avec tasses, miettes et surfaces marquées',
    },
    priority: 'P1', tone: 'sand',
    notes: 'MUST be a matched pair with CL-07: same space, same camera position, same lens, same light. NO text, labels or watermarks in the image — the component renders its own translated Before/After labels. The supplied version had a "Before Cleaning" pill burned in; the top 125 px were trimmed to remove it, which is why the ratio is 2:1 rather than 3:2.',
  },
  {
    id: 'CL-07', file: 'before-after-meeting-room-after', page: 'Home', section: 'Before / after comparison — AFTER',
    subject: 'The exact same meeting room after cleaning: clear streak-free table, chairs aligned, whiteboard clean, sill dusted.',
    composition: 'IDENTICAL framing to CL-06.', camera: 'Tripod, identical settings to CL-06.', aspect: '2:1', size: '2400 × 1200 px (supplied: 1670 × 816)',
    lighting: 'Same daylight as CL-06.', colors: GRADE, people: 'No.', uniform: NOUNIFORM,
    background: 'Same as CL-06.',
    alt: {
      en: 'The same meeting room after cleaning, with clear surfaces and aligned chairs',
      nl: 'Dezelfde vergaderzaal na de schoonmaak, met nette oppervlakken en rechte stoelen',
      fr: 'La même salle de réunion après nettoyage, surfaces nettes et chaises alignées',
    },
    priority: 'P1', tone: 'sage',
    notes: 'MUST be a matched pair with CL-06. NO text, labels or watermarks in the image. The supplied version had an "After Cleaning" pill burned in; trimmed identically to CL-06 so the pair stays pixel-aligned.',
  },
  {
    id: 'CL-08', file: 'home-sustainability-refill', page: 'Home', section: 'Sustainability feature',
    subject: 'A cleaner refilling a reusable spray bottle from a larger concentrate container using a measured dosing pump.',
    composition: 'Vertical, hands and bottle in sharp focus, face out of frame or soft.', camera: '50mm, slightly above.', aspect: '4:5', size: '1600 × 2000 px',
    lighting: DAYLIGHT, colors: 'Greener grade allowed: sage and forest dominant, ivory highlights.', people: 'Hands/torso only.', uniform: UNIFORM,
    background: 'Utility room or storeroom with tidy shelves, wood and plants.',
    alt: {
      en: 'Refilling a reusable spray bottle with a measured dose of concentrate',
      nl: 'Een herbruikbare sprayfles wordt bijgevuld met een afgemeten dosis concentraat',
      fr: 'Remplissage d’un pulvérisateur réutilisable avec une dose mesurée de concentré',
    },
    priority: 'P1', tone: 'forest',
  },

  // ---------------- SERVICES ----------------
  {
    id: 'CL-09', file: 'services-overview-hero', page: 'Services', section: 'Page hero',
    subject: 'Wide view of a modern retail showroom being cleaned before opening: one cleaner mopping a polished floor, display tables in the background.',
    composition: 'Wide, subject in right half, calm left half.', camera: 'Eye level, 28–35mm.', aspect: '3:2', size: '2400 × 1600 px',
    lighting: DAYLIGHT, colors: GRADE, people: 'Yes — 1 cleaner.', uniform: UNIFORM, background: 'Minimal showroom, oak and stone.',
    alt: {
      en: 'A cleaner mopping a showroom floor before opening hours',
      nl: 'Een schoonmaker dweilt de vloer van een showroom vóór openingstijd',
      fr: 'Un agent lave le sol d’un showroom avant l’ouverture',
    },
    priority: 'P2', tone: 'sand', focus: '65% 50%',
  },
  {
    id: 'CL-10', file: 'service-office-hero', page: 'Office Cleaning', section: 'Service hero + service card',
    subject: 'Cleaner wiping down a row of tidy workstations in an open-plan office.',
    composition: 'Wide; keep the main subject within the central 50% so it survives a 4:5 crop for the service card.', camera: 'Eye level, 35mm.', aspect: '3:2', size: '2400 × 1600 px',
    lighting: DAYLIGHT, colors: GRADE, people: 'Yes — 1 cleaner.', uniform: UNIFORM, background: 'Desks, monitors (screens off/blank), plants.',
    alt: {
      en: 'A cleaner wiping workstations in an open-plan office',
      nl: 'Een schoonmaker reinigt werkplekken in een landschapskantoor',
      fr: 'Un agent nettoie les postes de travail d’un open space',
    },
    priority: 'P1', tone: 'forest', focus: '50% 50%',
  },
  {
    id: 'CL-11', file: 'service-office-detail-kitchen', page: 'Office Cleaning', section: 'Detail image',
    subject: 'Office kitchenette being cleaned: worktop wiped, sink gleaming, mugs arranged.',
    composition: 'Vertical detail.', camera: '50mm, eye level.', aspect: '4:5', size: '1600 × 2000 px',
    lighting: DAYLIGHT, colors: GRADE, people: 'Hands/arm only.', uniform: UNIFORM, background: 'Light kitchenette with oak and tile.',
    alt: {
      en: 'An office kitchenette with a freshly wiped worktop',
      nl: 'Een kantoorkitchenette met een pas afgeveegd werkblad',
      fr: 'Une kitchenette de bureau au plan de travail fraîchement nettoyé',
    },
    priority: 'P2', tone: 'sage',
  },
  {
    id: 'CL-12', file: 'service-deep-hero', page: 'Deep Cleaning', section: 'Service hero + service card',
    subject: 'Two cleaners carrying out a periodic deep clean in a restaurant dining room after hours: chairs on tables, one cleaning skirting/table bases.',
    composition: 'Wide; subjects within central 50%.', camera: 'Eye level or slightly low, 28–35mm.', aspect: '3:2', size: '2400 × 1600 px',
    lighting: 'Warm evening interior light mixed with dusk window light.', colors: GRADE, people: 'Yes — 2 cleaners.', uniform: UNIFORM,
    background: 'Contemporary Belgian bistro, wood tables, warm pendant lights.',
    notes: 'NEEDS REPLACEMENT: the supplied version has a step ladder in frame. The Deep Cleaning page states plainly that work at height is outside the concept\'s scope ("no ladders, lifts or rope access"), so the image contradicts the copy. The cleaner is correctly standing on the floor with a telescopic pole — only the ladder has to go.',
    alt: {
      en: 'Two cleaners deep cleaning a restaurant dining room after closing',
      nl: 'Twee schoonmakers doen een grondige poetsbeurt in een restaurant na sluitingstijd',
      fr: 'Deux agents effectuent un nettoyage en profondeur d’une salle de restaurant après la fermeture',
    },
    priority: 'P1', tone: 'sand', focus: '50% 55%',
  },
  {
    id: 'CL-13', file: 'service-deep-detail-highreach', page: 'Deep Cleaning', section: 'Detail image',
    subject: 'Cleaner using an extendable pole duster on a high shelf or light fitting, standing safely on the floor.',
    composition: 'Vertical, emphasis on reach — NO ladders or work at height.', camera: 'Low angle, 35mm.', aspect: '4:5', size: '1600 × 2000 px',
    lighting: DAYLIGHT, colors: GRADE, people: 'Yes — 1 cleaner.', uniform: UNIFORM, background: 'Office or showroom with high shelving.',
    alt: {
      en: 'A cleaner using an extendable duster to reach a high shelf from the floor',
      nl: 'Een schoonmaker gebruikt een telescopische plumeau om vanaf de vloer een hoge plank te bereiken',
      fr: 'Un agent utilise un plumeau télescopique pour atteindre une étagère haute depuis le sol',
    },
    priority: 'P2', tone: 'forest',
  },
  {
    id: 'CL-14', file: 'service-window-hero', page: 'Window Cleaning', section: 'Service hero + service card',
    subject: 'Cleaner using a squeegee on a ground-floor shopfront window from the pavement, morning street scene softly blurred.',
    composition: 'Wide; subject centred. Ground-level only — no ladders, ropes or heights.', camera: 'Eye level, 35mm, slight reflection play.', aspect: '3:2', size: '2400 × 1600 px',
    lighting: 'Morning daylight, soft overcast or early sun.', colors: GRADE, people: 'Yes — 1 cleaner.', uniform: UNIFORM,
    background: 'Generic Belgian street with brick facades, no readable shop names or real brands.',
    alt: {
      en: 'A cleaner using a squeegee on a shopfront window at street level',
      nl: 'Een schoonmaker trekt een etalageraam af op straatniveau',
      fr: 'Un agent passe la raclette sur une vitrine au niveau de la rue',
    },
    priority: 'P1', tone: 'sage', focus: '50% 50%',
  },
  {
    id: 'CL-15', file: 'service-window-detail-partition', page: 'Window Cleaning', section: 'Detail image',
    subject: 'Interior glass partition being polished, crisp reflections.',
    composition: 'Vertical, strong geometry of the glass frame.', camera: '50mm.', aspect: '4:5', size: '1600 × 2000 px',
    lighting: DAYLIGHT, colors: GRADE, people: 'Hand/arm only.', uniform: UNIFORM, background: 'Office interior through glass.',
    alt: {
      en: 'An interior glass partition being polished to a clear finish',
      nl: 'Een glazen binnenwand wordt helder opgepoetst',
      fr: 'Une cloison vitrée intérieure polie jusqu’à la transparence',
    },
    priority: 'P2', tone: 'ivory',
  },
  {
    id: 'CL-16', file: 'service-sanitation-hero', page: 'Workplace Sanitation', section: 'Service hero + service card',
    subject: 'Cleaner wiping high-contact points — door handle, light switch, lift button — in a bright office lobby.',
    composition: 'Wide; subject centred. Calm, hygienic, not clinical or alarming.', camera: 'Eye level, 35mm.', aspect: '3:2', size: '2400 × 1600 px',
    lighting: DAYLIGHT, colors: GRADE, people: 'Yes — 1 cleaner.', uniform: UNIFORM + ' Disposable gloves are appropriate here.',
    background: 'Office lobby with lift doors, plants, stone floor. Avoid hospital imagery, hazmat suits or masks.',
    alt: {
      en: 'A cleaner wiping a door handle and light switch in an office lobby',
      nl: 'Een schoonmaker reinigt een deurklink en lichtschakelaar in een kantoorhal',
      fr: 'Un agent nettoie une poignée de porte et un interrupteur dans un hall de bureaux',
    },
    priority: 'P1', tone: 'forest', focus: '50% 50%',
  },
  {
    id: 'CL-17', file: 'service-sanitation-detail-restroom', page: 'Workplace Sanitation', section: 'Detail image',
    subject: 'Spotless, modern commercial restroom vanity with soap dispenser and folded paper towels.',
    composition: 'Vertical, architectural, no people.', camera: 'Eye level, 35mm, straight verticals.', aspect: '4:5', size: '1600 × 2000 px',
    lighting: 'Soft even interior light.', colors: GRADE, people: 'No.', uniform: NOUNIFORM, background: 'Stone/tile, oak, mirror.',
    alt: {
      en: 'A clean, modern restroom vanity in a commercial building',
      nl: 'Een propere, moderne lavabo in een bedrijfsgebouw',
      fr: 'Un lavabo moderne et propre dans un bâtiment professionnel',
    },
    priority: 'P2', tone: 'ivory',
  },

  // ---------------- SUSTAINABILITY ----------------
  {
    id: 'CL-18', file: 'sustainability-hero-materials', page: 'Sustainability', section: 'Page hero',
    subject: 'Flat-lay still life: stacked washable microfibre cloths in sage/ivory, refillable glass and aluminium bottles, a measuring jug, a sprig of greenery, on an oak surface.',
    composition: 'Wide, generous negative space on the left.', camera: 'Top-down or 30° angle, 50mm.', aspect: '3:2', size: '2400 × 1600 px',
    lighting: 'Soft window light from the right.', colors: GRADE, people: 'No.', uniform: NOUNIFORM, background: 'Oak or linen surface. No product brands.',
    alt: {
      en: 'Reusable microfibre cloths and refillable bottles arranged on an oak surface',
      nl: 'Herbruikbare microvezeldoeken en hervulbare flessen op een eikenhouten tafel',
      fr: 'Chiffons microfibres réutilisables et flacons rechargeables disposés sur du chêne',
    },
    priority: 'P1', tone: 'sage', focus: '70% 50%',
  },
  {
    id: 'CL-19', file: 'sustainability-journey-products', page: 'Sustainability', section: 'Journey step 1 — product selection',
    subject: 'Hands reading the label of a plain, unbranded concentrate bottle in a storeroom.',
    composition: 'Vertical.', camera: '50mm.', aspect: '4:5', size: '1200 × 1500 px', lighting: DAYLIGHT, colors: GRADE,
    people: 'Hands only.', uniform: UNIFORM, background: 'Tidy shelving.',
    alt: {
      en: 'Checking the label of a cleaning concentrate before use',
      nl: 'Het etiket van een schoonmaakconcentraat wordt nagekeken vóór gebruik',
      fr: 'Vérification de l’étiquette d’un concentré de nettoyage avant usage',
    },
    priority: 'P2', tone: 'sand',
  },
  {
    id: 'CL-20', file: 'sustainability-journey-cloths', page: 'Sustainability', section: 'Journey step 2 — reusable materials',
    subject: 'Freshly laundered, folded microfibre cloths in colour-coded stacks.',
    composition: 'Vertical, rhythmic stacks.', camera: '50mm, slight angle.', aspect: '4:5', size: '1200 × 1500 px', lighting: DAYLIGHT, colors: GRADE,
    people: 'No.', uniform: NOUNIFORM, background: 'Linen/wood.',
    alt: {
      en: 'Stacks of laundered, colour-coded microfibre cloths',
      nl: 'Stapels gewassen, kleurgecodeerde microvezeldoeken',
      fr: 'Piles de chiffons microfibres lavés, classés par couleur',
    },
    priority: 'P2', tone: 'sage',
  },
  {
    id: 'CL-21', file: 'sustainability-journey-water', page: 'Sustainability', section: 'Journey step 3 — water use',
    subject: 'A flat mop being lightly pre-moistened from a measured bottle instead of a full bucket.',
    composition: 'Vertical, emphasise the small amount of water.', camera: '35–50mm.', aspect: '4:5', size: '1200 × 1500 px', lighting: DAYLIGHT, colors: GRADE,
    people: 'Hands/legs only.', uniform: UNIFORM, background: 'Office floor.',
    alt: {
      en: 'A flat mop pad being lightly pre-moistened with a measured amount of water',
      nl: 'Een vlakmop wordt licht bevochtigd met een afgemeten hoeveelheid water',
      fr: 'Une frange de lavage légèrement humidifiée avec une quantité d’eau mesurée',
    },
    priority: 'P2', tone: 'forest',
  },
  {
    id: 'CL-22', file: 'sustainability-journey-planning', page: 'Sustainability', section: 'Journey step 4 — efficient planning',
    subject: 'Team lead planning a route on a tablet next to a floor plan printout.',
    composition: 'Vertical.', camera: '50mm, over-the-shoulder.', aspect: '4:5', size: '1200 × 1500 px', lighting: DAYLIGHT, colors: GRADE,
    people: 'Yes — 1 person, face not visible.', uniform: UNIFORM, background: 'Office table.',
    alt: {
      en: 'A team lead planning an efficient cleaning route on a tablet',
      nl: 'Een teamleider plant een efficiënte poetsroute op een tablet',
      fr: 'Un chef d’équipe planifie un parcours de nettoyage efficace sur tablette',
    },
    priority: 'P3', tone: 'sand',
  },

  // ---------------- ABOUT ----------------
  {
    id: 'CL-23', file: 'about-hero-team', page: 'About', section: 'Page hero',
    subject: 'A Clario team of four walking together through a bright office atrium at the start of a shift, relaxed and confident.',
    composition: 'Wide, group in right two-thirds, motion implied.', camera: 'Eye level, 35mm.', aspect: '3:2', size: '2400 × 1600 px',
    lighting: DAYLIGHT, colors: GRADE, people: 'Yes — 4 adults, diverse ages and backgrounds. Fictional models — not real employees.', uniform: UNIFORM,
    background: 'Atrium with stairs, wood and glass.',
    alt: {
      en: 'A team of four Clario cleaners walking through an office atrium',
      nl: 'Een team van vier Clario-schoonmakers wandelt door een kantoorgebouw',
      fr: 'Une équipe de quatre agents Clario traverse l’atrium d’un immeuble de bureaux',
    },
    priority: 'P1', tone: 'forest', focus: '60% 50%',
  },
  {
    id: 'CL-24', file: 'about-detail-care', page: 'About', section: 'Philosophy (detail)',
    subject: 'A cleaner straightening a chair and checking a finished room with a quick look — the final check.',
    composition: 'Vertical.', camera: '35–50mm.', aspect: '4:5', size: '1600 × 2000 px', lighting: DAYLIGHT, colors: GRADE,
    people: 'Yes — 1 cleaner.', uniform: UNIFORM, background: 'Meeting room or lounge.',
    alt: {
      en: 'A cleaner straightening a chair during a final room check',
      nl: 'Een schoonmaker zet een stoel recht tijdens de laatste controle',
      fr: 'Un agent replace une chaise lors de la vérification finale',
    },
    priority: 'P2', tone: 'sage',
  },
  {
    id: 'CL-25', file: 'about-detail-teamwork', page: 'About', section: 'Teamwork (detail)',
    subject: 'Two cleaners coordinating in a corridor, one handing the other a fresh cloth.',
    composition: 'Square.', camera: '50mm.', aspect: '1:1', size: '1400 × 1400 px', lighting: DAYLIGHT, colors: GRADE,
    people: 'Yes — 2 adults.', uniform: UNIFORM, background: 'Office corridor.',
    alt: {
      en: 'Two cleaners coordinating their work in a corridor',
      nl: 'Twee schoonmakers stemmen hun werk af in een gang',
      fr: 'Deux agents coordonnent leur travail dans un couloir',
    },
    priority: 'P3', tone: 'sand',
  },

  // ---------------- CONVERSION PAGES ----------------
  {
    id: 'CL-26', file: 'quote-side-workspace', page: 'Request a Quote', section: 'Side image',
    subject: 'Quiet, freshly cleaned co-working space in late afternoon light.',
    composition: 'Vertical, calm, no people.', camera: '35mm.', aspect: '4:5', size: '1200 × 1500 px', lighting: 'Late afternoon warm daylight.', colors: GRADE,
    people: 'No.', uniform: NOUNIFORM, background: 'Co-working tables, plants.',
    alt: {
      en: 'A quiet, freshly cleaned co-working space',
      nl: 'Een rustige, pas gepoetste coworkingruimte',
      fr: 'Un espace de coworking calme et fraîchement nettoyé',
    },
    priority: 'P3', tone: 'sand',
  },
  {
    id: 'CL-27', file: 'book-side-assessment', page: 'Book an Assessment', section: 'Side image',
    subject: 'A Clario team lead walking a site with a tablet, noting floor types and access points during an assessment.',
    composition: 'Vertical.', camera: '35mm.', aspect: '4:5', size: '1200 × 1500 px', lighting: DAYLIGHT, colors: GRADE,
    people: 'Yes — 1 person (team lead).', uniform: UNIFORM, background: 'Empty office floor.',
    alt: {
      en: 'A team lead taking notes on a tablet during an on-site assessment',
      nl: 'Een teamleider maakt notities op een tablet tijdens een plaatsbezoek',
      fr: 'Un chef d’équipe prend des notes sur tablette lors d’une visite sur site',
    },
    priority: 'P2', tone: 'forest',
  },
  {
    id: 'CL-28', file: 'contact-hero-lounge', page: 'Contact', section: 'Page hero',
    subject: 'Calm hospitality lounge/café interior, freshly cleaned, morning light, no people.',
    composition: 'Wide, quiet left side.', camera: '28–35mm.', aspect: '3:2', size: '2400 × 1600 px', lighting: DAYLIGHT, colors: GRADE,
    people: 'No.', uniform: NOUNIFORM, background: 'Café seating, plants, warm wood.',
    alt: {
      en: 'A calm, freshly cleaned café lounge in morning light',
      nl: 'Een rustige, pas gepoetste lounge in het ochtendlicht',
      fr: 'Un salon de café calme et fraîchement nettoyé dans la lumière du matin',
    },
    priority: 'P3', tone: 'sage', focus: '65% 50%',
  },
  {
    id: 'CL-29', file: 'home-hero-team-office-mobile', page: 'Home', section: 'Hero — optional portrait crop for phones',
    subject: 'Same scene as CL-01, re-framed vertically for small screens.',
    composition: 'Vertical; subject in lower half so the headline can sit at the top.', camera: 'As CL-01.', aspect: '4:5', size: '1200 × 1500 px',
    lighting: DAYLIGHT, colors: GRADE, people: 'As CL-01.', uniform: UNIFORM, background: 'As CL-01.',
    alt: {
      en: 'Two Clario cleaners in forest-green uniforms tidying a bright modern office',
      nl: 'Twee schoonmakers van Clario in bosgroene uniformen poetsen een licht, modern kantoor',
      fr: 'Deux agents Clario en uniforme vert forêt entretiennent un bureau moderne et lumineux',
    },
    priority: 'P3', tone: 'forest', focus: '50% 70%',
    notes: 'Optional. If absent, CL-01 is cropped with its focus point on phones.',
  },
  {
    id: 'CL-30', file: 'og-default', page: 'All pages', section: 'Social sharing (Open Graph) image',
    subject: 'Simplified version of CL-01 with space for the CLARIO wordmark; the wordmark can be added by me in code-free editing or left off.',
    composition: 'Landscape, subject right, quiet left.', camera: 'As CL-01.', aspect: '1.91:1', size: '1200 × 630 px',
    lighting: DAYLIGHT, colors: GRADE, people: 'Optional.', uniform: UNIFORM, background: 'As CL-01.',
    alt: {
      en: 'Clario Cleaning — fictional portfolio concept',
      nl: 'Clario Cleaning — fictief portfolioconcept',
      fr: 'Clario Cleaning — concept fictif de portfolio',
    },
    priority: 'P2', tone: 'forest',
    notes: 'Place as public/images/clario/og-default.jpg (JPEG, < 300 KB). Social platforms cannot use SVG, so no og:image is emitted until this file exists.',
  },
] as const satisfies readonly ImageAsset[];

export type ImageId = (typeof images)[number]['id'];
export type ImageFile = (typeof images)[number]['file'];

export function getImage(file: ImageFile): ImageAsset {
  const found = images.find((img) => img.file === file);
  if (!found) throw new Error(`Unknown image asset: ${file}`);
  return found;
}
