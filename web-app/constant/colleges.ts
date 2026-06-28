import type { College } from "./types";

export const colleges: College[] = [
  {
    slug: "iit-bombay",
    name: "Indian Institute of Technology Bombay",
    shortName: "IIT Bombay",
    state: "Maharashtra",
    city: "Mumbai",
    ownership: "Government",
    established: 1958,
    ranking: 1,
    feesMin: 200000,
    feesMax: 250000,
    courses: ["B.Tech", "M.Tech", "PhD", "MBA"],
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80",
    excerpt:
      "Premier engineering institute renowned for technical education and research excellence.",
    overview:
      "IIT Bombay, established in 1958, is one of India's most prestigious engineering institutes. Located in Powai, Mumbai, it offers cutting-edge programs across engineering, science, design, and management with world-class faculty and research facilities.",
    admissionProcess:
      "Undergraduate admissions through JEE Advanced. Postgraduate via GATE for M.Tech, CAT for MBA, and JAM for M.Sc programs. Direct admissions available for foreign nationals through DASA.",
    eligibility:
      "10+2 with PCM and qualifying JEE Advanced rank for B.Tech. Bachelor's degree in relevant discipline for M.Tech/M.Sc programs.",
    placements: {
      avgPackage: "₹21.8 LPA",
      highestPackage: "₹3.7 Cr",
      topRecruiters: ["Google", "Microsoft", "Goldman Sachs", "Apple", "Adobe"],
    },
    facilities: [
      "Central Library",
      "Hostels",
      "Sports Complex",
      "Research Labs",
      "Hospital",
    ],
    faqs: [
      {
        question: "What is the cutoff for IIT Bombay CSE?",
        answer: "Typically under 100 All India Rank in JEE Advanced.",
      },
      {
        question: "Is there a hostel for all students?",
        answer: "Yes, hostel accommodation is provided to all students.",
      },
    ],
  },
  {
    slug: "iisc-bangalore",
    name: "Indian Institute of Science",
    shortName: "IISc Bangalore",
    state: "Karnataka",
    city: "Bangalore",
    ownership: "Government",
    established: 1909,
    ranking: 2,
    feesMin: 35000,
    feesMax: 200000,
    courses: ["BS", "M.Tech", "MSc", "PhD"],
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1200&q=80",
    excerpt:
      "India's top research-led institute for advanced scientific and engineering studies.",
    overview:
      "Founded in 1909 by JN Tata, IISc is India's premier institute for advanced research in science and engineering. It consistently ranks as India's top university.",
    admissionProcess:
      "Through KVPY/JEE Advanced/NEET for UG. GATE/JAM for PG admissions.",
    eligibility: "10+2 with science for UG; Bachelor's degree for PG.",
    placements: {
      avgPackage: "₹25 LPA",
      highestPackage: "₹2.1 Cr",
      topRecruiters: ["Google", "Intel", "Qualcomm", "DRDO", "ISRO"],
    },
    facilities: [
      "JRD Tata Memorial Library",
      "Hostels",
      "Gymkhana",
      "Health Centre",
    ],
    faqs: [
      {
        question: "Does IISc offer BTech?",
        answer: "IISc offers a 4-year Bachelor of Science (Research) program.",
      },
    ],
  },
  {
    slug: "iit-delhi",
    name: "Indian Institute of Technology Delhi",
    shortName: "IIT Delhi",
    state: "Delhi",
    city: "New Delhi",
    ownership: "Government",
    established: 1961,
    ranking: 3,
    feesMin: 220000,
    feesMax: 260000,
    courses: ["B.Tech", "M.Tech", "PhD", "MBA"],
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80",
    excerpt:
      "Leading engineering institute with strong industry connections and research output.",
    overview:
      "IIT Delhi is among India's most reputed engineering institutes, known for academic rigor and innovation.",
    admissionProcess: "JEE Advanced for B.Tech, GATE for M.Tech, CAT for MBA.",
    eligibility: "10+2 PCM + JEE Advanced qualification for B.Tech.",
    placements: {
      avgPackage: "₹20 LPA",
      highestPackage: "₹2 Cr",
      topRecruiters: ["Microsoft", "Amazon", "Uber", "Flipkart"],
    },
    facilities: ["Library", "Hostels", "Sports Stadium", "Innovation Hub"],
    faqs: [
      {
        question: "What is the campus size?",
        answer: "Approximately 320 acres in Hauz Khas, Delhi.",
      },
    ],
  },
  {
    slug: "aiims-delhi",
    name: "All India Institute of Medical Sciences",
    shortName: "AIIMS Delhi",
    state: "Delhi",
    city: "New Delhi",
    ownership: "Government",
    established: 1956,
    ranking: 1,
    feesMin: 5000,
    feesMax: 8000,
    courses: ["MBBS", "MD", "MS", "BSc Nursing"],
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&q=80",
    excerpt:
      "India's premier medical institute offering top-tier medical education and healthcare.",
    overview:
      "AIIMS New Delhi is India's leading public medical institute, established as an institution of national importance.",
    admissionProcess: "NEET-UG for MBBS, INI-CET for PG programs.",
    eligibility: "10+2 with PCB and qualifying NEET for MBBS.",
    placements: {
      avgPackage: "₹12 LPA",
      highestPackage: "₹50 LPA",
      topRecruiters: ["Government Hospitals", "Private Hospitals"],
    },
    facilities: ["Hospital", "Library", "Hostels", "Research Centers"],
    faqs: [
      {
        question: "Annual fees?",
        answer:
          "Approximately ₹6,000 per year, one of the most affordable in India.",
      },
    ],
  },
  {
    slug: "bits-pilani",
    name: "Birla Institute of Technology and Science",
    shortName: "BITS Pilani",
    state: "Rajasthan",
    city: "Pilani",
    ownership: "Private",
    established: 1964,
    ranking: 8,
    feesMin: 450000,
    feesMax: 500000,
    courses: ["B.E.", "M.E.", "MBA", "PhD"],
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80",
    excerpt:
      "Top-ranked private engineering institute with global alumni network.",
    overview:
      "BITS Pilani is a deemed-to-be university known for its flexible curriculum and Practice School program.",
    admissionProcess: "BITSAT entrance examination.",
    eligibility: "10+2 with minimum 75% in PCM/PCB.",
    placements: {
      avgPackage: "₹18 LPA",
      highestPackage: "₹1.5 Cr",
      topRecruiters: ["Microsoft", "Goldman Sachs", "Amazon"],
    },
    facilities: ["Library", "Hostels", "Sports", "Innovation Center"],
    faqs: [
      {
        question: "Is there reservation?",
        answer: "No, BITS does not follow reservation policies.",
      },
    ],
  },
  {
    slug: "iim-ahmedabad",
    name: "Indian Institute of Management Ahmedabad",
    shortName: "IIM Ahmedabad",
    state: "Gujarat",
    city: "Ahmedabad",
    ownership: "Government",
    established: 1961,
    ranking: 1,
    feesMin: 2500000,
    feesMax: 2500000,
    courses: ["MBA", "PGP", "PhD", "Executive MBA"],
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1568667256549-094345857637?w=1200&q=80",
    excerpt:
      "India's top business school producing world-class management leaders.",
    overview:
      "IIM Ahmedabad is consistently ranked as India's #1 business school.",
    admissionProcess: "CAT followed by WAT and Personal Interview.",
    eligibility: "Bachelor's degree with 50% marks and valid CAT score.",
    placements: {
      avgPackage: "₹34.36 LPA",
      highestPackage: "₹1.15 Cr",
      topRecruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs"],
    },
    facilities: ["Vikram Sarabhai Library", "Hostels", "Sports", "Auditorium"],
    faqs: [
      {
        question: "CAT cutoff?",
        answer: "99+ percentile for general category.",
      },
    ],
  },
  {
    slug: "du-srcc",
    name: "Shri Ram College of Commerce",
    shortName: "SRCC",
    state: "Delhi",
    city: "New Delhi",
    ownership: "Government",
    established: 1926,
    ranking: 1,
    feesMin: 35000,
    feesMax: 40000,
    courses: ["B.Com (H)", "B.A. Economics (H)", "M.Com"],
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=1200&q=80",
    excerpt:
      "India's premier commerce and economics college under Delhi University.",
    overview:
      "SRCC has been the top commerce college in India for decades, known for academic excellence and placements.",
    admissionProcess: "CUET-UG based admission.",
    eligibility: "10+2 with high CUET score.",
    placements: {
      avgPackage: "₹12 LPA",
      highestPackage: "₹35 LPA",
      topRecruiters: ["EY", "Deloitte", "KPMG", "PwC"],
    },
    facilities: ["Library", "Auditorium", "Sports", "Computer Labs"],
    faqs: [
      {
        question: "Cutoff?",
        answer: "98+ percentile in CUET for general category.",
      },
    ],
  },
  {
    slug: "nlsiu-bangalore",
    name: "National Law School of India University",
    shortName: "NLSIU Bangalore",
    state: "Karnataka",
    city: "Bangalore",
    ownership: "Government",
    established: 1987,
    ranking: 1,
    feesMin: 280000,
    feesMax: 320000,
    courses: ["BA LLB", "LLM", "PhD"],
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1589395937772-f67057e233df?w=1200&q=80",
    excerpt:
      "India's top law school producing leading legal professionals and judges.",
    overview:
      "NLSIU is India's premier law university, known for rigorous academics and influential alumni.",
    admissionProcess: "CLAT (Common Law Admission Test).",
    eligibility: "10+2 with 45% marks and CLAT qualification.",
    placements: {
      avgPackage: "₹18 LPA",
      highestPackage: "₹25 LPA",
      topRecruiters: ["AZB", "Khaitan", "Trilegal", "Cyril Amarchand"],
    },
    facilities: ["Moot Court", "Library", "Hostels", "Sports"],
    faqs: [
      {
        question: "Seat intake?",
        answer: "Approximately 120 seats for BA LLB program.",
      },
    ],
  },
];

export const states = Array.from(new Set(colleges.map((c) => c.state))).sort();
export const cities = Array.from(new Set(colleges.map((c) => c.city))).sort();
export const allCourses = Array.from(
  new Set(colleges.flatMap((c) => c.courses)),
).sort();
