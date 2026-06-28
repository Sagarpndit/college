import type { Article } from "./types";

export const articles: Article[] = [
  {
    slug: "jee-main-2027-complete-guide",
    title: "JEE Main 2027: Complete Preparation Guide, Syllabus & Strategy",
    excerpt:
      "Everything you need to know about JEE Main 2027 — eligibility, syllabus, exam pattern, preparation tips, and cutoffs.",
    category: "exam",
    featuredImage:
      "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1600&q=80",
    author: "Admission Hub Editorial",
    updatedAt: "2026-05-20",
    publishedAt: "2026-04-10",
    readingMinutes: 9,
    tags: ["JEE", "Engineering", "NTA"],
    blocks: [
      {
        type: "paragraph",
        content:
          "JEE Main is the gateway to India's top engineering institutes. This guide walks you through every aspect of the 2027 exam.",
      },
      {
        type: "highlights",
        items: [
          { label: "Conducting Body", value: "NTA" },
          { label: "Mode", value: "Online (CBT)" },
          { label: "Sessions", value: "Twice a year" },
          { label: "Total Marks", value: "300" },
        ],
      },
      { type: "heading", level: 2, content: "Eligibility Criteria" },
      {
        type: "paragraph",
        content:
          "Candidates must have passed 10+2 with Physics, Chemistry, and Mathematics. There is no age limit but a maximum of 3 consecutive attempts.",
      },
      {
        type: "unordered_list",
        items: [
          "10+2 with PCM",
          "No minimum percentage required",
          "3 consecutive attempts allowed",
          "Indian and foreign nationals eligible",
        ],
      },
      { type: "heading", level: 2, content: "Exam Pattern" },
      {
        type: "table",
        headers: ["Subject", "Questions", "Marks"],
        rows: [
          ["Physics", "30", "100"],
          ["Chemistry", "30", "100"],
          ["Mathematics", "30", "100"],
          ["Total", "90", "300"],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Pro Tip",
        content:
          "Focus on NCERT thoroughly for Chemistry — it covers 70% of the syllabus directly.",
      },
      { type: "heading", level: 2, content: "Important Dates" },
      {
        type: "timeline",
        items: [
          {
            date: "Nov 2026",
            title: "Application Opens",
            description: "Registration begins on NTA portal",
          },
          {
            date: "Dec 2026",
            title: "Application Closes",
            description: "Last date to submit forms",
          },
          {
            date: "Jan 2027",
            title: "Session 1 Exam",
            description: "First attempt window",
          },
          {
            date: "Apr 2027",
            title: "Session 2 Exam",
            description: "Second attempt window",
          },
          {
            date: "May 2027",
            title: "Result & Counselling",
            description: "JoSAA counselling begins",
          },
        ],
      },
      { type: "heading", level: 2, content: "Preparation Strategy" },
      {
        type: "pros_cons",
        pros: [
          "Strong NCERT foundation",
          "Regular mock tests",
          "PYQ practice",
          "Time management",
        ],
        cons: [
          "Avoid too many reference books",
          "Don't ignore weak subjects",
          "Don't skip revision",
        ],
      },
      { type: "heading", level: 2, content: "Cutoff Trends" },
      {
        type: "stats",
        items: [
          { label: "General", value: "93.2", suffix: "%ile" },
          { label: "OBC", value: "79.6", suffix: "%ile" },
          { label: "SC", value: "60.0", suffix: "%ile" },
          { label: "ST", value: "47.1", suffix: "%ile" },
        ],
      },
      {
        type: "quote",
        content:
          "Consistency beats intensity. An hour every day for 12 months trumps 12 hours every day for one month.",
        cite: "AIR 1, JEE Main 2024",
      },
      { type: "divider" },
      { type: "heading", level: 2, content: "Frequently Asked Questions" },
      {
        type: "faq",
        items: [
          {
            question: "Can I appear for JEE Main if I'm in Class 12?",
            answer:
              "Yes, students appearing in Class 12 boards are eligible to apply.",
          },
          {
            question: "Is there negative marking?",
            answer:
              "Yes, 1 mark is deducted for each wrong answer in MCQ questions.",
          },
          {
            question: "Can I change my exam city?",
            answer: "Yes, during the correction window provided by NTA.",
          },
        ],
      },
      {
        type: "download_cta",
        title: "Download Free JEE Main Syllabus PDF",
        description: "Complete chapter-wise syllabus with weightage analysis.",
        href: "#",
        buttonLabel: "Download PDF",
      },
      {
        type: "internal_links",
        title: "Related Reading",
        links: [
          {
            label: "NEET UG 2027 Complete Guide",
            href: "/blog/neet-ug-2027-preparation",
          },
          { label: "Top Engineering Colleges in India", href: "/colleges" },
          { label: "JEE Main vs JEE Advanced", href: "/exams/jee-main-2027" },
        ],
      },
    ],
  },
  {
    slug: "neet-ug-2027-preparation",
    title: "NEET UG 2027: Preparation Roadmap for Medical Aspirants",
    excerpt:
      "Structured 12-month plan, subject-wise strategy, and best resources for cracking NEET UG 2027.",
    category: "exam",
    featuredImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80",
    author: "Dr. Priya Sharma",
    updatedAt: "2026-05-18",
    publishedAt: "2026-04-02",
    readingMinutes: 8,
    tags: ["NEET", "Medical", "MBBS"],
    blocks: [
      {
        type: "paragraph",
        content:
          "NEET UG is the single gateway to MBBS in India. With over 20 lakh aspirants, smart preparation is non-negotiable.",
      },
      {
        type: "callout",
        variant: "info",
        content:
          "NEET 2027 is expected to be conducted in offline mode in early May 2027.",
      },
      { type: "heading", level: 2, content: "Subject-wise Strategy" },
      { type: "heading", level: 3, content: "Biology (50% weightage)" },
      {
        type: "paragraph",
        content:
          "Master NCERT line-by-line. Biology alone can fetch 320+ marks if NCERT is thorough.",
      },
      { type: "heading", level: 3, content: "Chemistry" },
      {
        type: "paragraph",
        content:
          "Inorganic from NCERT, Physical with concept clarity, Organic with reaction mechanisms.",
      },
      {
        type: "comparison",
        headers: ["Subject", "Source", "Time/Day"],
        rows: [
          ["Biology", "NCERT + Trueman's", "3 hours"],
          ["Chemistry", "NCERT + MS Chauhan", "2 hours"],
          ["Physics", "HC Verma + DC Pandey", "3 hours"],
        ],
      },
      {
        type: "faq",
        items: [
          {
            question: "How many hours should I study?",
            answer:
              "6-8 hours of focused study is sufficient if done consistently.",
          },
          {
            question: "Are coaching classes necessary?",
            answer:
              "Not mandatory. Self-study with good resources can be equally effective.",
          },
        ],
      },
    ],
  },
  {
    slug: "top-engineering-colleges-india-2027",
    title: "Top 10 Engineering Colleges in India for 2027 Admissions",
    excerpt:
      "Rankings, fees, placements, and admission process for India's leading engineering institutions.",
    category: "college",
    featuredImage:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80",
    author: "Admission Hub Editorial",
    updatedAt: "2026-05-15",
    publishedAt: "2026-03-20",
    readingMinutes: 7,
    tags: ["Engineering", "Colleges", "Rankings"],
    blocks: [
      {
        type: "paragraph",
        content:
          "Choosing the right engineering college is one of the biggest decisions of your career. Here's our curated list of India's top 10.",
      },
      {
        type: "table",
        headers: ["Rank", "College", "Location", "Avg Package"],
        rows: [
          ["1", "IIT Bombay", "Mumbai", "₹21.8 LPA"],
          ["2", "IISc Bangalore", "Bangalore", "₹25 LPA"],
          ["3", "IIT Delhi", "New Delhi", "₹20 LPA"],
          ["4", "IIT Madras", "Chennai", "₹19.5 LPA"],
          ["5", "IIT Kanpur", "Kanpur", "₹18.7 LPA"],
        ],
      },
      {
        type: "callout",
        variant: "success",
        content:
          "All IITs report 90%+ placement rates with median packages exceeding ₹15 LPA.",
      },
      {
        type: "internal_links",
        links: [
          { label: "IIT Bombay Profile", href: "/colleges/iit-bombay" },
          {
            label: "JEE Main 2027 Guide",
            href: "/blog/jee-main-2027-complete-guide",
          },
        ],
      },
    ],
  },
  {
    slug: "how-to-choose-the-right-college",
    title: "How to Choose the Right College: A Practical Framework",
    excerpt:
      "Beyond rankings — six factors that actually matter when picking your college.",
    category: "admission",
    featuredImage:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1600&q=80",
    author: "Rahul Verma",
    updatedAt: "2026-05-10",
    publishedAt: "2026-03-15",
    readingMinutes: 6,
    tags: ["Admission", "Career"],
    blocks: [
      {
        type: "paragraph",
        content:
          "Rankings tell you something but never everything. Use this framework to make a decision you won't regret.",
      },
      {
        type: "ordered_list",
        items: [
          "Program fit",
          "Location & climate",
          "Faculty quality",
          "Placement records",
          "Total cost of attendance",
          "Alumni network",
        ],
      },
      {
        type: "quote",
        content:
          "Pick the place where you'll grow the most, not just the brand that looks best on a resume.",
      },
    ],
  },
];

export const articleCategories = [
  "exam",
  "college",
  "career",
  "admission",
] as const;

export const FAQS = [
  {
    question: "How do I find the right college for me?",
    answer:
      "Use our filters by state, course, fees, and ownership. Each college page details placements, rankings, and eligibility so you can compare with confidence.",
  },
  {
    question: "Is Admission Hub free to use?",
    answer:
      "Yes, all content on Admission Hub is completely free for students. We're funded by select partnerships, never by paid rankings.",
  },
  {
    question: "How current is the exam information?",
    answer:
      "We update exam pages within 48 hours of any official notification from NTA, IIMs, and other conducting bodies.",
  },
  {
    question: "Can I get personalized admission counselling?",
    answer:
      "Yes — visit our Contact page to request a 1:1 session with our counsellors.",
  },
];
