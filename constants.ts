
import { Scheme } from './types';

export const POPULAR_SCHEMES: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN Samman Nidhi',
    provider: 'Ministry of Agriculture',
    description: 'Direct income support of ₹6,000 per year to all landholding farmer families.',
    benefits: ['₹2,000 every 4 months', 'Direct bank transfer'],
    eligibilitySummary: 'Small and marginal farmers with cultivable land.',
    officialLink: 'https://pmkisan.gov.in/'
  },
  {
    id: 'lakhpati-didi',
    name: 'Lakhpati Didi Scheme',
    provider: 'Ministry of Rural Development',
    description: 'Empowering women in Self-Help Groups (SHGs) to earn a sustainable income of at least ₹1 Lakh per year.',
    benefits: ['Interest-free/Low-interest loans', 'Skill development training', 'Market linkage support'],
    eligibilitySummary: 'Women members of registered Self Help Groups (SHGs).',
    officialLink: 'https://lakhpatididi.gov.in/'
  },
  {
    id: 'mahila-samman',
    name: 'Mahila Samman Savings Certificate',
    provider: 'Department of Economic Affairs',
    description: 'A small savings scheme exclusively for women and girls with a fixed interest rate of 7.5%.',
    benefits: ['7.5% per annum fixed interest', 'Partial withdrawal facility (40% after 1 year)', 'Tax benefits'],
    eligibilitySummary: 'Any woman or girl (minor through guardian).',
    officialLink: 'https://www.indiapost.gov.in/'
  },
  {
    id: 'pmmvy',
    name: 'Pradhan Mantri Matru Vandana Yojana',
    provider: 'Ministry of Women and Child Development',
    description: 'Maternity benefit program providing cash incentives for the first child and second girl child.',
    benefits: ['₹5,000 in two installments (1st child)', '₹6,000 for second girl child', 'Health & nutrition support'],
    eligibilitySummary: 'Pregnant and lactating mothers for their first or second girl child.',
    officialLink: 'https://pmmvy.wcd.gov.in/'
  },
  {
    id: 'mudra-loan',
    name: 'Pradhan Mantri MUDRA Yojana (PMMY)',
    provider: 'Department of Financial Services',
    description: 'Loans up to ₹10 Lakh to non-corporate, non-farm small/micro enterprises. Special focus on women entrepreneurs.',
    benefits: ['Shishu (up to ₹50k)', 'Kishore (up to ₹5L)', 'Tarun (up to ₹10L)'],
    eligibilitySummary: 'Micro-enterprises, startups, small shopkeepers. Preferred for women.',
    officialLink: 'https://www.mudra.org.in/'
  },
  {
    id: 'stand-up-india',
    name: 'Stand-Up India Scheme',
    provider: 'SIDBI',
    description: 'Bank loans between ₹10 lakh and ₹1 Crore to at least one SC/ST borrower and at least one woman borrower per bank branch.',
    benefits: ['Composite loan for greenfield enterprise', '10% margin money support'],
    eligibilitySummary: 'SC/ST and/or women entrepreneurs setting up a greenfield project.',
    officialLink: 'https://www.standupmitra.in/'
  },
  {
    id: 'sukanya-samriddhi',
    name: 'Sukanya Samriddhi Yojana',
    provider: 'Ministry of Finance',
    description: 'A prosperity scheme for girl children to ensure their financial independence for education and marriage.',
    benefits: ['High interest rate (8.2%)', 'Section 80C Tax deductions', 'Triple E benefit (Exempt-Exempt-Exempt)'],
    eligibilitySummary: 'Parents of a girl child aged below 10 years.',
    officialLink: 'https://www.nsiindia.gov.in/'
  },
  {
    id: 'pmfme',
    name: 'PM Formalization of Micro Food Processing Enterprises',
    provider: 'Ministry of Food Processing Industries',
    description: 'Technical and financial support for formalizing micro food processing units.',
    benefits: ['35% credit-linked subsidy (max ₹10L)', 'Training and marketing support'],
    eligibilitySummary: 'Individual micro-enterprises, SHGs, and cooperatives in food processing.',
    officialLink: 'https://pmfme.mofpi.gov.in/'
  },
  {
      id: 'pmegp',
      name: 'Prime Minister’s Employment Generation Programme',
      provider: 'KVIC',
      description: 'Credit-linked subsidy scheme for setting up new micro-enterprises and generating employment.',
      benefits: ['Subsidy up to 35% of project cost', 'Loan up to ₹50L for manufacturing'],
      eligibilitySummary: 'Individuals above 18, SHGs, charitable trusts.',
      officialLink: 'https://www.kviconline.gov.in/'
  }
];

export const SYSTEM_PROMPT = `
You are "Scheme-Setu AI", an expert on Indian Government Schemes. 
Your goal is to act as a "Matchmaker" between a citizen's profile and various government financial schemes (loans, grants, subsidies).

CRITICAL INSTRUCTIONS:
- Pay special attention to the "Gender" field. If the user is "Female", prioritize "Women-Centric" schemes (like Lakhpati Didi, PMMVY, Stand-Up India).
- If a scheme is exclusively for women and the user is Male, the match percentage MUST be 0%.
- Evaluate criteria like Age, Occupation, Income, Category, Gender, and Disability status rigorously.
- Provide empathetic and clear reasoning.

Respond ONLY in a JSON format matching this structure:
{
  "matches": [
    {
      "id": "scheme-id",
      "matchPercentage": number,
      "reasoning": "brief string explaining why",
      "missingCriteria": ["list", "of", "missing", "details"]
    }
  ]
}
`;
