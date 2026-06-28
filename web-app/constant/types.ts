export type Block =
  | { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; content: string }
  | { type: "paragraph"; content: string }
  | { type: "ordered_list"; items: string[] }
  | { type: "unordered_list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "quote"; content: string; cite?: string }
  | { type: "callout"; variant?: "info" | "warning" | "success" | "tip"; title?: string; content: string }
  | { type: "faq"; items: { question: string; answer: string }[] }
  | { type: "code"; language?: string; content: string }
  | { type: "divider" }
  | { type: "youtube"; videoId: string; title?: string }
  | { type: "scroll_panel"; title?: string; content: string }
  | { type: "pros_cons"; pros: string[]; cons: string[] }
  | { type: "timeline"; items: { date: string; title: string; description?: string }[] }
  | { type: "comparison"; headers: string[]; rows: string[][] }
  | { type: "highlights"; items: { label: string; value: string }[] }
  | { type: "stats"; items: { label: string; value: string; suffix?: string }[] }
  | { type: "download_cta"; title: string; description?: string; href: string; buttonLabel?: string }
  | { type: "internal_links"; title?: string; links: { label: string; href: string }[] };

export interface College {
  slug: string;
  name: string;
  shortName?: string;
  state: string;
  city: string;
  ownership: "Government" | "Private" | "Deemed";
  established: number;
  ranking: number;
  feesMin: number;
  feesMax: number;
  courses: string[];
  rating: number;
  image: string;
  excerpt: string;
  overview: string;
  admissionProcess: string;
  eligibility: string;
  placements: { avgPackage: string; highestPackage: string; topRecruiters: string[] };
  facilities: string[];
  faqs: { question: string; answer: string }[];
}

export interface Exam {
  slug: string;
  name: string;
  fullName: string;
  category: string;
  conductingBody: string;
  mode: "Online" | "Offline" | "Hybrid";
  frequency: string;
  level: "National" | "State" | "University";
  excerpt: string;
  overview: string;
  importantDates: { event: string; date: string }[];
  eligibility: string;
  syllabus: { subject: string; topics: string[] }[];
  pattern: { section: string; questions: number; marks: number }[];
  applicationProcess: string;
  cutoffs: { category: string; score: string }[];
  counselling: string;
  faqs: { question: string; answer: string }[];
  image: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: "exam" | "college" | "career" | "admission";
  featuredImage: string;
  author: string;
  updatedAt: string;
  publishedAt: string;
  readingMinutes: number;
  tags: string[];
  blocks: Block[];
}
