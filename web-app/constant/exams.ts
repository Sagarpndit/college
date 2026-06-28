import type { Exam } from "./types";

export const exams: Exam[] = [
  {
    slug: "jee-main-2027",
    name: "JEE Main",
    fullName: "Joint Entrance Examination (Main) 2027",
    category: "Engineering",
    conductingBody: "National Testing Agency (NTA)",
    mode: "Online",
    frequency: "Twice a year",
    level: "National",
    excerpt:
      "National-level engineering entrance exam for admission to NITs, IIITs, GFTIs and a gateway to JEE Advanced.",
    overview:
      "JEE Main is the gateway exam for admission to undergraduate engineering programs at NITs, IIITs, and other centrally funded institutions. It is also the qualifying exam for JEE Advanced (for IIT admissions).",
    importantDates: [
      { event: "Application Start", date: "November 2026" },
      { event: "Application End", date: "December 2026" },
      { event: "Session 1 Exam", date: "January 2027" },
      { event: "Session 2 Exam", date: "April 2027" },
      { event: "Result Declaration", date: "April 2027" },
    ],
    eligibility:
      "Candidates must have passed 10+2 or equivalent with Physics, Chemistry, and Mathematics. No age limit. Maximum 3 consecutive attempts allowed.",
    syllabus: [
      {
        subject: "Physics",
        topics: [
          "Mechanics",
          "Thermodynamics",
          "Electromagnetism",
          "Optics",
          "Modern Physics",
        ],
      },
      {
        subject: "Chemistry",
        topics: [
          "Physical Chemistry",
          "Organic Chemistry",
          "Inorganic Chemistry",
        ],
      },
      {
        subject: "Mathematics",
        topics: [
          "Algebra",
          "Calculus",
          "Coordinate Geometry",
          "Trigonometry",
          "Statistics",
        ],
      },
    ],
    pattern: [
      { section: "Physics", questions: 30, marks: 100 },
      { section: "Chemistry", questions: 30, marks: 100 },
      { section: "Mathematics", questions: 30, marks: 100 },
    ],
    applicationProcess:
      "Online registration on the official NTA website. Upload required documents, pay application fee, and submit. Admit cards released 3 days before exam.",
    cutoffs: [
      { category: "General", score: "93.2 percentile" },
      { category: "OBC", score: "79.6 percentile" },
      { category: "SC", score: "60.0 percentile" },
      { category: "ST", score: "47.1 percentile" },
    ],
    counselling:
      "JoSAA conducts counselling for JEE Main qualifiers. Multiple rounds of seat allocation based on rank, choice filling, and category.",
    faqs: [
      {
        question: "How many times can I attempt JEE Main?",
        answer:
          "You can attempt JEE Main 3 consecutive years, twice each year.",
      },
      {
        question: "Is calculator allowed?",
        answer: "No, calculators are not permitted in the exam hall.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1200&q=80",
  },
  {
    slug: "neet-ug-2027",
    name: "NEET UG",
    fullName: "National Eligibility cum Entrance Test (UG) 2027",
    category: "Medical",
    conductingBody: "National Testing Agency (NTA)",
    mode: "Offline",
    frequency: "Once a year",
    level: "National",
    excerpt:
      "Single national medical entrance for MBBS, BDS, AYUSH, and veterinary admissions across India.",
    overview:
      "NEET-UG is the single entrance examination for admission to MBBS, BDS, BAMS, BHMS, BUMS, and other undergraduate medical courses in India.",
    importantDates: [
      { event: "Application Start", date: "February 2027" },
      { event: "Application End", date: "March 2027" },
      { event: "Exam Date", date: "May 2027" },
      { event: "Result", date: "June 2027" },
    ],
    eligibility:
      "10+2 with Physics, Chemistry, Biology/Biotechnology with minimum 50% marks. Minimum age 17 years.",
    syllabus: [
      {
        subject: "Physics",
        topics: ["Mechanics", "Thermodynamics", "Optics", "Modern Physics"],
      },
      { subject: "Chemistry", topics: ["Physical", "Organic", "Inorganic"] },
      {
        subject: "Biology",
        topics: ["Botany", "Zoology", "Human Physiology", "Genetics"],
      },
    ],
    pattern: [
      { section: "Physics", questions: 45, marks: 180 },
      { section: "Chemistry", questions: 45, marks: 180 },
      { section: "Biology", questions: 90, marks: 360 },
    ],
    applicationProcess:
      "Online application via NTA NEET portal with required documents.",
    cutoffs: [
      { category: "General", score: "720-137" },
      { category: "OBC/SC/ST", score: "136-107" },
    ],
    counselling:
      "MCC conducts AIQ counselling. State counselling for 85% state quota seats.",
    faqs: [
      {
        question: "Is NEET online or offline?",
        answer: "NEET is conducted in offline pen-and-paper mode.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
  },
  {
    slug: "cat-2026",
    name: "CAT",
    fullName: "Common Admission Test 2026",
    category: "Management",
    conductingBody: "IIMs",
    mode: "Online",
    frequency: "Once a year",
    level: "National",
    excerpt:
      "Gateway to IIMs and 1200+ top B-schools across India for MBA and PGDM programs.",
    overview:
      "CAT is the most popular MBA entrance exam in India, conducted by IIMs on a rotational basis.",
    importantDates: [
      { event: "Registration", date: "August 2026" },
      { event: "Exam", date: "November 2026" },
      { event: "Result", date: "January 2027" },
    ],
    eligibility: "Bachelor's degree with 50% marks (45% for SC/ST/PwD).",
    syllabus: [
      {
        subject: "VARC",
        topics: ["Reading Comprehension", "Verbal Reasoning"],
      },
      { subject: "DILR", topics: ["Data Interpretation", "Logical Reasoning"] },
      { subject: "Quant", topics: ["Arithmetic", "Algebra", "Geometry"] },
    ],
    pattern: [
      { section: "VARC", questions: 24, marks: 72 },
      { section: "DILR", questions: 20, marks: 60 },
      { section: "Quant", questions: 22, marks: 66 },
    ],
    applicationProcess: "Online registration on iimcat.ac.in.",
    cutoffs: [
      { category: "IIM A/B/C", score: "99+ percentile" },
      { category: "Other IIMs", score: "90-99 percentile" },
    ],
    counselling:
      "Each IIM conducts its own WAT-PI process for shortlisted candidates.",
    faqs: [
      {
        question: "Sectional cutoff?",
        answer:
          "Yes, IIMs have sectional cutoffs ranging from 70-85 percentile.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
  },
  {
    slug: "clat-2027",
    name: "CLAT",
    fullName: "Common Law Admission Test 2027",
    category: "Law",
    conductingBody: "Consortium of NLUs",
    mode: "Offline",
    frequency: "Once a year",
    level: "National",
    excerpt:
      "Gateway to 22 National Law Universities for UG and PG law programs.",
    overview:
      "CLAT is the national-level law entrance exam for admission to 5-year integrated LLB and LLM programs.",
    importantDates: [
      { event: "Registration", date: "July 2026" },
      { event: "Exam", date: "December 2026" },
    ],
    eligibility: "10+2 with 45% marks for UG; LLB degree for PG.",
    syllabus: [
      { subject: "English", topics: ["Comprehension", "Grammar"] },
      { subject: "Legal Reasoning", topics: ["Principles & Facts"] },
      { subject: "Logical Reasoning", topics: ["Critical Reasoning"] },
      { subject: "GK", topics: ["Current Affairs", "Static GK"] },
      { subject: "Quant", topics: ["Elementary Math"] },
    ],
    pattern: [{ section: "All Sections", questions: 120, marks: 120 }],
    applicationProcess: "Online via consortiumofnlus.ac.in",
    cutoffs: [{ category: "NLSIU", score: "Top 80 ranks" }],
    counselling: "Centralized counselling by Consortium with multiple rounds.",
    faqs: [
      {
        question: "Negative marking?",
        answer: "Yes, 0.25 marks deducted per wrong answer.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
  },
  {
    slug: "gate-2027",
    name: "GATE",
    fullName: "Graduate Aptitude Test in Engineering 2027",
    category: "Engineering",
    conductingBody: "IIT/IISc",
    mode: "Online",
    frequency: "Once a year",
    level: "National",
    excerpt:
      "PG engineering entrance and PSU recruitment gateway across 30 disciplines.",
    overview:
      "GATE tests engineering aptitude and is used for M.Tech admission and PSU recruitment.",
    importantDates: [
      { event: "Registration", date: "September 2026" },
      { event: "Exam", date: "February 2027" },
    ],
    eligibility:
      "Bachelor's degree in Engineering/Technology or Master's in Science.",
    syllabus: [
      { subject: "Discipline-specific", topics: ["Core engineering subjects"] },
    ],
    pattern: [{ section: "GA + Core", questions: 65, marks: 100 }],
    applicationProcess: "Online via GOAPS portal.",
    cutoffs: [{ category: "General", score: "25-30 marks" }],
    counselling: "COAP for IIT admissions; CCMT for NIT/IIIT.",
    faqs: [
      {
        question: "Score validity?",
        answer: "GATE score is valid for 3 years.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80",
  },
  {
    slug: "cuet-ug-2027",
    name: "CUET UG",
    fullName: "Common University Entrance Test (UG) 2027",
    category: "General",
    conductingBody: "NTA",
    mode: "Online",
    frequency: "Once a year",
    level: "National",
    excerpt:
      "Single entrance for admission to 250+ central, state, and private universities.",
    overview:
      "CUET-UG provides a single window for UG admissions across central universities including DU, JNU, BHU.",
    importantDates: [
      { event: "Registration", date: "February 2027" },
      { event: "Exam", date: "May 2027" },
    ],
    eligibility: "10+2 from recognized board.",
    syllabus: [
      { subject: "Language", topics: ["English/Hindi"] },
      { subject: "Domain Subjects", topics: ["Choose from 27 subjects"] },
      { subject: "General Test", topics: ["GK, Reasoning, Math"] },
    ],
    pattern: [{ section: "Per subject", questions: 50, marks: 250 }],
    applicationProcess: "Online via cuet.samarth.ac.in",
    cutoffs: [{ category: "DU SRCC", score: "98+ percentile" }],
    counselling: "Conducted by individual universities.",
    faqs: [
      {
        question: "How many subjects?",
        answer: "Up to 10 subjects can be selected.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1200&q=80",
  },
];

export const examCategories = Array.from(
  new Set(exams.map((e) => e.category)),
).sort();
