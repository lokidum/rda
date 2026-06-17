/**
 * Single source of truth for copy, prices, suburbs and WhatsApp strings.
 * Every value here is lifted from CONTENT.md. Do not invent facts, prices or
 * reviews. Where Loki must supply something real, it is marked with TODO.
 *
 * Australian English. No em or en dashes anywhere.
 */

/* ---------- contact (locked) ---------- */
// One number, two link surfaces, one display format.
export const phone = {
  wa: '61432065741', // WhatsApp: no plus, country code 61, leading 0 dropped
  call: '+61432065741', // tel: link
  display: '+61 432 065 741', // human readable
} as const;

/** Build a wa.me URL with a consistently encoded, pre-filled message. */
export const waLink = (message: string): string =>
  `https://wa.me/${phone.wa}?text=${encodeURIComponent(message)}`;

export const tel = `tel:${phone.call}`;

/* Common pre-filled messages reused across CTAs. */
export const waMessages = {
  book: 'Hi Rams Driving Academy, I would like to book a lesson.',
  open: 'Hi Rams Driving Academy, I have a quick question.',
} as const;

/* ---------- brand + nav ---------- */
export const brand = {
  name: 'Rams Driving Academy',
  wordmarkTop: 'Rams Driving',
  wordmarkSub: 'Academy · Adelaide',
  location: 'Adelaide, South Australia',
} as const;

export const nav = [
  { href: '#services', label: 'Lessons' },
  { href: '#experience', label: 'The experience' },
  { href: '#fleet', label: 'Test day' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#faq', label: 'FAQ' },
] as const;

/* ---------- ticker (hero trust strip) ---------- */
export const ticker = [
  '20-plus years on Adelaide roads',
  'Automatic dual-control cars',
  'Lessons 7 days a week',
  'English, Tamil and Hindi',
  'Learner to P, conversion and refresher',
  'All licence backgrounds welcome',
] as const;

/* ---------- hero ---------- */
export const hero = {
  eyebrow: 'Adelaide · 20+ years of quiet confidence',
  // Headline rises word by word. "Calmly." is the italic accent word.
  headline: ['Master', 'the', 'Adelaide', 'roads.'],
  accent: 'Calmly.',
  lede: 'Patient, expert driving lessons from an instructor who has taught Adelaide for over 20 years. Learners, overseas licence holders and nervous drivers all welcome.',
  // Only truthful stats (CONTENT.md section 2): no student count or pass rate.
  stats: [
    { value: '20+ yrs', label: 'On Adelaide roads' },
    { value: '7 days', label: 'Flexible lesson times' },
    { value: '1 chat', label: 'Is all it takes to book' },
  ],
} as const;

/* ---------- manifesto ---------- */
// First person, from Dad. The two {pill} markers become inline photo pills.
export const manifesto = {
  label: 'The Rams philosophy',
  // Split into runs; {pill:slug} markers are replaced with the inline image.
  text: 'I have taught Adelaide drivers for more than twenty years. {pill:inline-city} Every learner is different, so every lesson is too. We go at your pace, in a calm car, with no judgement and no rush. {pill:inline-keys} Whether you are starting on your Ls, bringing an overseas licence across, or just getting your confidence back, you are in good hands.',
  signName: 'Barani Kumar',
  signRole: 'Founder and principal instructor',
} as const;

/* ---------- services ---------- */
export interface Service {
  id: string;
  num: string;
  title: string;
  blurb: string;
  price: string;
  unit: string;
  popular?: boolean;
  waMessage: string;
  ctaLabel: string;
}

export const services: Service[] = [
  {
    id: 'learner',
    num: '01',
    title: 'Learner to P training',
    blurb:
      'Step by step from your L plates through to passing the VORT or CBT and A in South Australia. Logbook hours signed off along the way.',
    price: '$110',
    unit: '/ lesson',
    waMessage:
      "Hi Rams Driving Academy, I'm on my Ls and I'd like to book learner to P training.",
    ctaLabel: 'Book this',
  },
  {
    id: 'conversion',
    num: '02',
    title: 'International licence conversion',
    blurb:
      'Hold an overseas licence? Tailored coaching to learn South Australian road rules, adjust to driving on the left and pass your practical test.',
    price: '$115',
    unit: '/ lesson',
    popular: true,
    waMessage:
      "Hi Rams Driving Academy, I hold an overseas licence and I'd like to ask about converting it to a SA licence.",
    ctaLabel: 'Book this',
  },
  {
    id: 'refresher',
    num: '03',
    title: 'Refresher lessons',
    blurb:
      'For licensed drivers building confidence, easing driving anxiety, or mastering Adelaide CBD and highway traffic.',
    price: '$100',
    unit: '/ lesson',
    waMessage:
      "Hi Rams Driving Academy, I have a licence and I'd like to book a refresher lesson.",
    ctaLabel: 'Book this',
  },
  {
    id: 'testday',
    num: '04',
    title: 'Test day support and car hire',
    blurb:
      'Sit your practical test in a fully insured, dual-control academy car, with a warm-up lesson beforehand.',
    price: 'Quoted',
    unit: 'on WhatsApp',
    waMessage:
      "Hi Rams Driving Academy, I'd like to ask about test day support and using your car for my test.",
    ctaLabel: 'Get a quote',
  },
];

/* ---------- experience / how it works ---------- */
export interface ExperienceStep {
  k: string;
  title: string;
  body: string;
  badge: string;
  image: number; // index into the lesson photo set (0..2)
}

export const experience: ExperienceStep[] = [
  {
    k: 'Step one',
    title: 'Message on WhatsApp.',
    body: 'Tell us where you are at and what you need. We reply fast, and a real instructor answers, not a call centre.',
    badge: '01 · First chat',
    image: 0,
  },
  {
    k: 'Step two',
    title: 'First lesson, your pace.',
    body: 'We assess your driving and build a simple plan, no pressure. Holding an overseas licence or starting from zero, the plan is built around you.',
    badge: '02 · Your plan',
    image: 1,
  },
  {
    k: 'Step three',
    title: 'Practice and progress.',
    body: 'Lessons 7 days a week in a calm automatic with dual controls, logbook hours signed off where they apply.',
    badge: '03 · On the road',
    image: 1,
  },
  {
    k: 'Step four',
    title: 'Test day.',
    body: 'Sit the test in the same car you learned in, with a warm-up beforehand. Familiar seat, familiar mirrors, steadier nerves.',
    badge: '04 · Test day',
    image: 2,
  },
];

/* ---------- fleet / test day ---------- */
export const fleet = {
  label: 'Test day, handled',
  heading: ['One car. The one you', 'learn in and test in.'],
  specs: [
    {
      title: 'Automatic, dual control',
      body: 'A modern automatic with a second brake and full supervision, so you can push your limits with a safety net under you.',
    },
    {
      title: 'Fully insured, always',
      body: 'Every lesson and every test drive is covered. You focus on the road, the paperwork is our problem.',
    },
    {
      title: 'Warm up before the test',
      body: 'A practice run right before your test, in the exact car you will be assessed in. No surprises on the day.',
    },
  ],
  body: 'No surprises on test day. You practise in the exact car you sit your test in, so the pedals, the mirrors and the feel are already second nature.',
  // Truthful, count-up friendly stats only.
  stats: [
    { count: 20, suffix: '+', label: 'Years teaching Adelaide' },
    { count: 7, suffix: ' days', label: 'Available every week' },
    { count: 3, suffix: '', label: 'Languages: English, Tamil, Hindi' },
  ],
} as const;

/* ---------- areas served ---------- */
// TODO(loki): confirm which suburbs Dad actually covers. Placeholder set below.
export const areas = {
  label: 'Where we drive',
  intro: 'Lessons across the wider Adelaide metro area. Tap your suburb to ask if we cover you.',
  note: 'Tap your suburb to ask us about it directly on WhatsApp.',
  suburbs: [
    'Adelaide CBD',
    'North Adelaide',
    'Prospect',
    'Mawson Lakes',
    'Salisbury',
    'Elizabeth',
    'Modbury',
    'Tea Tree Gully',
    'Norwood',
    'Magill',
    'Campbelltown',
    'Marion',
    'Mitcham',
    'Glenelg',
    'West Lakes',
    'Henley Beach',
    'Port Adelaide',
    'Findon',
    'Burnside',
    'Unley',
  ],
  chipMessage: (suburb: string) =>
    `Hi Rams Driving Academy, I'm in ${suburb}, do you cover my area?`,
  genericMessage: 'Hi Rams Driving Academy, do you cover my suburb for lessons?',
} as const;

/* ---------- reviews ---------- */
// TODO(loki): all reviews are PLACEHOLDER until real student quotes are
// collected (ask students, or pull from Google once the Business Profile is
// live). Keep placeholder:true so they are easy to find and replace.
export interface Review {
  name: string;
  role: string;
  text: string;
  placeholder: boolean;
}

export const reviews: Review[] = [
  {
    name: 'Priya',
    role: 'Licence conversion',
    text: 'Came on an Indian licence and was nervous about driving on the left. A few calm lessons and I passed first go. Could not recommend Rams more.',
    placeholder: true,
  },
  {
    name: 'Jack',
    role: 'Refresher lessons',
    text: 'Patient is the word. Got my confidence back after years off the road.',
    placeholder: true,
  },
  {
    name: 'Mei',
    role: 'Learner to P',
    text: 'Very kind teacher. Explained everything clearly and never made me feel rushed.',
    placeholder: true,
  },
  {
    name: 'Daniel',
    role: 'Test day car hire',
    text: 'Booked through WhatsApp, super easy. Same car for lessons and the test made test day way less stressful. Passed.',
    placeholder: true,
  },
  {
    name: 'Aarav',
    role: 'Licence conversion',
    text: 'Brought my licence over from overseas. Rams knew exactly what the examiners look for. Brilliant.',
    placeholder: true,
  },
  {
    name: 'Sophie',
    role: 'Learner to P',
    text: 'My daughter was a very anxious learner. He was so patient with her. Worth every dollar.',
    placeholder: true,
  },
];

// Feature quote pulled from one of the placeholder reviews above.
export const featureQuote = {
  text: 'A few calm lessons and I passed first go. Could not recommend Rams <span class="it">more.</span>',
  cite: 'Priya · Licence conversion',
} as const;

export const reviewNote =
  'Example student voices, shown until verified reviews are collected.';

/* ---------- FAQ ---------- */
// On-page text MUST match the FAQPage schema exactly (see SEO.md). These seven
// are the single source for both the visible accordion and the JSON-LD.
export interface Faq {
  q: string;
  a: string;
}

export const faq: Faq[] = [
  {
    q: 'How many lessons will I need?',
    a: 'It depends on your previous experience and the habits you have formed. For most experienced overseas drivers, a small number of tailored lessons is enough to learn South Australian road rules, adjust to driving on the left and correct habits before the practical test. Message Rams Driving Academy on WhatsApp for a personal estimate.',
  },
  {
    q: 'What is the difference between VORT and CBT and A?',
    a: 'VORT is a single practical driving test. CBT and A is a competency based logbook pathway with no final test. Rams Driving Academy trains and assesses for both, and will help you choose the right path.',
  },
  {
    q: 'I am a nervous driver. Is that okay?',
    a: 'Completely. Nervous and anxious drivers are welcome. Lessons are paced individually in a calm, judgement free car, and we go as slowly as you need.',
  },
  {
    q: 'Do you teach manual or automatic?',
    a: 'Automatic only. Lessons and tests are in a modern automatic dual-control car.',
  },
  {
    q: 'What languages do you speak?',
    a: 'English, Tamil and Hindi.',
  },
  {
    q: 'How do I pay and do I have to buy a package?',
    a: 'Pay by bank transfer, PayID or cash on the day. There are no lock-in packages, you book lessons as you need them.',
  },
  {
    q: 'How do I book?',
    a: 'Message Rams Driving Academy on WhatsApp or call on +61 432 065 741. No online forms, just a quick chat.',
  },
];

export const faqAside = {
  label: 'Good questions',
  heading: 'Asked',
  accent: 'often.',
  intro: 'Anything else on your mind? WhatsApp us. We genuinely do not mind quick questions.',
};

/* ---------- booking funnel ---------- */
export const funnel = {
  serviceOptions: [
    {
      value: 'Learner to P training',
      label: 'Learner to P training',
      hint: 'I am on my Ls and working towards my Ps',
    },
    {
      value: 'International licence conversion',
      label: 'International licence conversion',
      hint: 'I hold an overseas licence and want a SA licence',
    },
    {
      value: 'Refresher lessons',
      label: 'Refresher lessons',
      hint: 'I have a licence but want more confidence',
    },
    {
      value: 'Test day support and car hire',
      label: 'Test day support and car hire',
      hint: 'I want to use the academy car for my test',
    },
  ],
  experienceOptions: ['Never driven', 'Some experience', 'Hold a licence'],
  timeOptions: ['Weekday mornings', 'Weekday afternoons', 'Evenings', 'Weekends'],
} as const;

/* ---------- final CTA + footer ---------- */
export const finalCta = {
  heading: ['Ready when', 'you', 'are.'],
  body: 'Let us get you on the road. One message, a patient instructor, and twenty years of Adelaide roads in the passenger seat. The rest is just practice.',
} as const;

export const footer = {
  blurb:
    'Patient, expert driving instruction across Adelaide for over 20 years. Learner to P training, international licence conversion, refresher lessons and test day car hire, all booked with one simple WhatsApp message.',
  explore: [
    { href: '#services', label: 'Lessons and prices' },
    { href: '#experience', label: 'The experience' },
    { href: '#fleet', label: 'Test day and car hire' },
    { href: '#reviews', label: 'Student reviews' },
    { href: '#faq', label: 'FAQ' },
    { href: '#book', label: 'Book a lesson' },
  ],
  languages: 'English, Tamil and Hindi',
  hours: 'Lessons 7 days a week',
  smallprint:
    'Lesson availability and coverage may vary by suburb, message us to confirm.',
} as const;

/* ---------- image slots (placeholder system) ---------- */
// Drop a file with the exact name into public/images/ and the placeholder
// disappears automatically (see Placeholder.astro + checkImage helper).
export interface ImageSlot {
  file: string;
  w: number;
  h: number;
  alt: string;
  shot: string;
}

export const images: Record<string, ImageSlot> = {
  hero: {
    file: 'hero.jpg',
    w: 2400,
    h: 1500,
    alt: 'Rams Driving Academy car on an Adelaide road at golden hour',
    shot: 'Cinematic shot of the academy car on an Adelaide road, golden hour',
  },
  lesson1: {
    file: 'lesson-1.jpg',
    w: 1600,
    h: 1840,
    alt: 'A calm first driving lesson with the instructor',
    shot: 'Instructor with a student, calm first lesson, portrait',
  },
  lesson2: {
    file: 'lesson-2.jpg',
    w: 1600,
    h: 1840,
    alt: 'In car coaching, hands on the wheel and a mirror check',
    shot: 'In-car detail: hands on wheel, mirror check, portrait',
  },
  lesson3: {
    file: 'lesson-3.jpg',
    w: 1600,
    h: 1840,
    alt: 'A student holding their P plate after passing',
    shot: 'Student holding their P plate, big smile, portrait',
  },
  car: {
    file: 'car.jpg',
    w: 2000,
    h: 1440,
    alt: 'Rams Driving Academy dual-control automatic car',
    shot: 'The actual dual-control car, clean, three-quarter angle',
  },
  adelaide: {
    file: 'adelaide.jpg',
    w: 2000,
    h: 1250,
    alt: 'Adelaide, South Australia',
    shot: 'Adelaide skyline or a favourite teaching road',
  },
  'inline-city': {
    file: 'inline-city.jpg',
    w: 600,
    h: 280,
    alt: '',
    shot: 'A calm Adelaide street scene',
  },
  'inline-keys': {
    file: 'inline-keys.jpg',
    w: 600,
    h: 280,
    alt: '',
    shot: 'Car keys or an L-plate',
  },
};
