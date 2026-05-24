import { Clock3, GraduationCap, HeartHandshake, School2, ShieldCheck, Sparkles, Users2 } from 'lucide-react';

const _override = (() => {
  try { return JSON.parse(localStorage.getItem('siteContentOverride') || 'null'); } catch { return null; }
})();

export const navLinks = _override?.navLinks ?? [
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Success Stories', href: '#stories' },
  { label: 'FAQ', href: '#faq' },
];

export const heroTrustBadges = _override?.heroTrustBadges ?? ['12,000+ Students Guided', '100+ Colleges Covered', '4.9 Rating'];

export const heroProfilePoints = _override?.heroProfilePoints ?? [
  'Rank 80k - 3 lakh',
  'Tier 2 / Tier 3 city',
  'Parent-influenced decision',
];

export const heroDecisionRows = _override?.heroDecisionRows ?? [
  { label: 'College fit', value: 'Strong match' },
  { label: 'Branch pressure', value: 'Resolved' },
  { label: 'Placement outlook', value: 'Clear' },
  { label: 'Regret risk', value: 'Reduced' },
];

export const painPoints = _override?.painPoints ?? [
  {
    title: 'Choose college blindly after rank',
    icon: GraduationCap,
    description: 'A rank alone does not tell you whether the college, branch, city, or peer group fits your future.',
  },
  {
    title: 'Take wrong branch due to pressure',
    icon: HeartHandshake,
    description: 'Family pressure, coach advice, and fear can push students into a branch they never wanted.',
  },
  {
    title: 'Lose 4 years fixing wrong decisions',
    icon: Clock3,
    description: 'A confusing admission choice can turn into a long, expensive detour in college life.',
  },
];

export const pillars = [
  {
    title: 'Real Seniors',
    description: 'Talk to students from the colleges you are considering and hear the reality directly.',
    icon: Users2,
  },
  {
    title: 'Real Placement Truth',
    description: 'Understand placements, branch reality, culture, opportunities, and what actually happens after joining.',
    icon: ShieldCheck,
  },
  {
    title: 'Better Rank Decisions',
    description: 'Get guidance based on your rank, budget, goals, and what fits your next 4 years.',
    icon: Sparkles,
  },
  {
    title: 'Parent-Friendly Guidance',
    description: 'Make decisions your parents can trust because they are practical, clear, and future-safe.',
    icon: School2,
  },
];

export const pricingPlans = _override?.pricingPlans ?? [
  {
    title: 'Quick Clarity',
    price: '399',
    originalPrice: '799',
    discount: '50% OFF',
    discountLabel: 'Limited Time Offer',
    bestFor: 'Students who want quick clarity on options and next steps.',
    features: [
      '20–30 min focused session',
      'One major confusion solved',
      'Rank & options quick review',
      'Post-call action summary',
      '24-hour WhatsApp support',
    ],
    cta: 'Book Quick Clarity',
    highlighted: false,
  },
  {
    title: 'Complete Guidance',
    price: '999',
    originalPrice: '2,499',
    discount: '60% OFF',
    discountLabel: 'JoSAA Launch Pricing',
    bestFor: 'Students who want complete strategy, clarity & guided decision-making.',
    features: [
      '2 in-depth guidance sessions',
      'Personalized strategy & roadmap',
      'Branch vs college analysis',
      'Freeze / Float guidance',
      'WhatsApp support (3–5 days)',
      'Call summary PDF',
      'Resource packs & strategy sheets',
    ],
    bonusLabel: '🎁 Included Starter Resources',
    bonus: [
      'College Starter Pack',
      'Career Growth Pack',
      'Opportunities & Roadmaps',
    ],
    cta: 'Get Complete Guidance',
    highlighted: true,
    badge: '⭐ Most Popular',
  },
  {
    title: 'Dream Seat Protection™',
    price: '1,799',
    originalPrice: '5,999',
    discount: '70% OFF',
    discountLabel: 'Priority Round Support',
    bestFor: 'Parents & students seeking peace of mind and end-to-end handholding.',
    features: [
      'Everything in Complete Guidance, plus:',
      'Round-wise JoSAA + CSAB support',
      'Freeze / Float / Slide strategy guidance',
      'Dedicated parent discussion session',
      'Preference order optimization',
      'Priority WhatsApp support',
      'Backup strategy if allotment changes',
      'Dedicated mentor till final rounds',
    ],
    bonusLabel: '🎁 Premium Career Advantage Pack',
    bonus: [
      'Internship & Career Roadmaps',
      'LinkedIn, Resume & Personal Branding',
      'Networking, Communication & Growth Guides',
      'High-Growth Engineering Domains (2025+)',
    ],
    cta: 'Get Dream Seat Protection',
    highlighted: false,
    badge: '',
  },
];

export const testimonials = _override?.testimonials ?? [
  {
    name: 'Rohan, Pune',
    quote: 'Saved me from taking wrong private college.',
  },
  {
    name: 'Sneha, Nagpur',
    quote: 'I was confused between branch and college. This helped a lot.',
  },
  {
    name: 'Aditya, Nashik',
    quote: 'My parents trusted the advice because it was practical.',
  },
];

export const faqCategories = _override?.faqCategories ?? [
  {
    category: 'What this actually is',
    items: [
      {
        question: "What does Atyant's JEE counselling support include?",
        answer: "1:1 sessions with current NIT/IIT/IIIT students who help you understand JoSAA/CSAB rounds, fill your choice list strategically, decode branch vs. college trade-offs, and avoid the mistakes most aspirants make in the 5-day window."
      },
      {
        question: "Is this the same as JoSAA counselling?",
        answer: "No. JoSAA is the official allotment process. We help you prepare for it — figuring out which colleges and branches to fill, in what order, based on your rank, category, home state, and goals."
      },
      {
        question: "Do you actually fill the JoSAA form for me?",
        answer: "No. You fill it yourself on the official JoSAA portal. We help you decide what to fill — the strategy, not the data entry."
      }
    ]
  },
  {
    category: 'Who needs this',
    items: [
      {
        question: "My rank is X — do I need counselling support?",
        answer: "If you're confident about your top 3 choices, maybe not. If you're staring at 80+ possible college-branch combinations and don't know how to order them, yes. Most aspirants underestimate how much one wrong choice order costs them."
      },
      {
        question: "I'm in OBC/SC/ST/EWS category. Can you help with category-specific counselling?",
        answer: "Yes. Our mentors include students from every category who went through the exact same counselling logic. Filter mentors by category match."
      },
      {
        question: "I'm a girl candidate eligible for female supernumerary seats. Does that change strategy?",
        answer: "Yes, significantly. We have mentors who used the female pool to get into better colleges than their rank suggested. Book one before locking your choice list."
      },
      {
        question: "My rank is low. Should I even bother with JoSAA or go straight to private colleges?",
        answer: "Talk to a mentor first. Many aspirants give up on JoSAA too early and miss CSAB special rounds where good colleges open up. Others waste weeks on JoSAA when their rank made it impossible from day one."
      }
    ]
  },
  {
    category: 'The actual decisions',
    items: [
      {
        question: "How do I decide between a higher-ranked branch at a lower NIT vs. a lower-ranked branch at a top NIT?",
        answer: "This is the single most asked question in JEE counselling. There's no formula. Talk to mentors from both paths — they'll tell you what placements, peer group, and life actually looked like."
      },
      {
        question: "Is CSE everywhere worth it, or should I take core branches at better NITs?",
        answer: "The honest answer changes every year based on placement trends. Get a current student's view, not a 2019 Quora answer."
      },
      {
        question: "Should I take a branch I don't want just to get into a top NIT, hoping to switch later?",
        answer: "Branch change rules vary by college and are getting harder every year. Don't bet on it without talking to someone who tried."
      },
      {
        question: "NIT vs. IIIT vs. BITS vs. state government college — how do I compare?",
        answer: "Each has different placement realities, fee structures, and campus life. We have mentors from all four — book whichever combination matches your shortlist."
      },
      {
        question: "What's the difference between JoSAA rounds, CSAB special, and state counselling? Should I do all three?",
        answer: "Yes, usually. But the strategy for each is different. Mentors walk you through the timeline and how to keep options open across all three."
      }
    ]
  }
];

export const howItWorksSteps = _override?.howItWorksSteps ?? [
  { step: '1', title: 'Share Details', text: 'Tell us your rank + target colleges.' },
  { step: '2', title: 'Get Matched', text: 'Get matched with a verified mentor from that exact college.' },
  { step: '3', title: 'Book Session', text: 'Book a session. Fill your choices right.' },
];

export const freeGroupBullets = _override?.freeGroupBullets ?? [
  'College updates',
  'Cutoff alerts',
  'Mistakes to avoid',
  'Senior Q&A',
];

export const footerLinks = _override?.footerLinks ?? [
  { label: 'Instagram', href: 'https://www.instagram.com/askatyant.in/' },
  { label: 'WhatsApp', href: 'https://wa.me/919579040183', title: 'All of you can join Atyant community' },
  { label: 'Contact', href: '#', title: 'Atyant Support - 919579040183' },
  { label: 'Privacy Policy', href: '#' },
];
