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
    title: 'Free WhatsApp Rank Check',
    price: 'Free',
    features: ['Basic college probability', 'Quick chat reply', 'No commitment'],
    cta: 'Check Rank',
    highlighted: false,
  },
  {
    title: 'Better College Plan',
    price: '149',
    features: ['College comparison', 'Hidden truths', 'Placement reality', 'Best fit by rank'],
    cta: 'Choose Plan',
    highlighted: false,
  },
  {
    title: 'Better Branch Plan',
    price: '149',
    features: ['CSE vs IT vs ENTC etc', 'Career future', 'Difficulty reality', 'Regret prevention'],
    cta: 'Choose Plan',
    highlighted: false,
  },
  {
    title: 'Decision Bundle',
    price: '249',
    features: ['Everything in Better College & Branch', 'Best value', 'Most complete clarity'],
    cta: 'Get Bundle',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    title: 'Senior Review Call',
    price: '299',
    features: ['1-on-1 voice call', 'Direct senior insights', 'Detailed doubt clearing'],
    cta: 'Book Call',
    highlighted: false,
  },
  {
    title: 'Premium Choice Plan',
    price: '999',
    features: ['Full preference list creation', 'Parent-friendly guidance', 'Priority follow-up'],
    cta: 'Get Premium',
    highlighted: false,
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

export const faqItems = _override?.faqItems ?? [
  {
    question: 'Is this mentorship?',
    answer: 'No. ATYANT is a decision clarity service built to help students choose a better college, branch, and path after results.',
  },
  {
    question: 'How do sessions happen?',
    answer: 'After you choose a plan, we connect with you on WhatsApp and guide you through a focused decision conversation.',
  },
  {
    question: 'Can parents join?',
    answer: 'Yes. Parents are welcome and often join because the final decision usually needs family confidence too.',
  },
  {
    question: 'Is it useful for rank above 1 lakh?',
    answer: 'Yes. In fact, students in this range often need the most clarity because options feel wider and more confusing.',
  },
  {
    question: 'What if I’m confused between many options?',
    answer: 'That is exactly what we solve. We compare your options and help you narrow down what is actually best for your rank and goals.',
  },
];

export const howItWorksSteps = _override?.howItWorksSteps ?? [
  { step: '1', title: 'Choose Plan', text: 'Pick the guidance level that fits your confusion.' },
  { step: '2', title: 'Connect on WhatsApp', text: 'We reach out and start the decision conversation.' },
  { step: '3', title: 'Get Clear Decision', text: 'Leave with a practical path and confidence.' },
];

export const freeGroupBullets = _override?.freeGroupBullets ?? [
  'College updates',
  'Cutoff alerts',
  'Mistakes to avoid',
  'Senior Q&A',
];

export const footerLinks = _override?.footerLinks ?? [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'WhatsApp', href: 'https://wa.me/917286857290', title: 'All of you can join Atyant community' },
  { label: 'Contact', href: '#', title: 'Atyant Support - 917286857290' },
  { label: 'Privacy Policy', href: '#' },
];
