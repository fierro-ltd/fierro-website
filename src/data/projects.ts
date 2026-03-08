import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "agentic-ai-platform",
    title: "Agentic AI Platform",
    tag: "Enterprise SaaS",
    tagColor: "blue",
    description:
      "Production-ready platform for building AI applications with chat, document processing, and workflow orchestration.",
    longDescription:
      "A full-stack template for rapidly deploying agentic AI applications. Features real-time chat with LLM streaming, document ingestion with RAG pipelines, browser automation agents, and durable workflow orchestration. Designed as a foundation that teams can extend for their specific use case.",
    features: [
      "Real-time LLM chat with streaming responses",
      "Document upload, parsing, and RAG-powered Q&A",
      "Browser automation agent for web tasks",
      "Durable workflow orchestration with Temporal",
      "Multi-model support via LiteLLM and OpenRouter",
      "Production-grade auth, database, and deployment",
    ],
    techStack: [
      "React 19",
      "TypeScript",
      "FastAPI",
      "Temporal",
      "PostgreSQL",
      "PGVector",
      "Tailwind CSS",
      "Docker",
    ],
    demoUrl: "https://fullstack-solution-template.demos.fierro.co.uk",
    gridSpan: "wide",
  },
  {
    slug: "document-compliance",
    title: "Document Compliance Engine",
    tag: "Regulatory / GovTech",
    tagColor: "violet",
    description:
      "Automated document compliance checking powered by generative AI — upload, analyse, report.",
    longDescription:
      "An intelligent compliance platform that automates the review of regulatory documents. Upload documents and the system extracts key information, checks against compliance rules, identifies gaps, and generates structured reports. Built for regulated industries where manual document review is costly and error-prone.",
    features: [
      "Multi-format document ingestion (PDF, DOCX, images)",
      "AI-powered compliance rule extraction",
      "Automated gap analysis and risk scoring",
      "Structured compliance reports with citations",
      "Configurable rule sets per regulatory framework",
      "Audit trail and version tracking",
    ],
    techStack: [
      "React 19",
      "TypeScript",
      "FastAPI",
      "Claude API",
      "PostgreSQL",
      "Tailwind CSS",
      "Docker",
    ],
    demoUrl: "https://genai-document-compliance.demos.fierro.co.uk",
  },
  {
    slug: "healthcare-ai",
    title: "Healthcare AI Suite",
    tag: "Healthcare",
    tagColor: "emerald",
    description:
      "Clinical document processing, named entity recognition, and voice-powered patient intake with structured EHR output.",
    longDescription:
      "A comprehensive healthcare AI demo showcasing three capabilities: clinical document processing that extracts structured data from medical records, a named entity recognition engine for identifying medical terms, medications, and conditions, and a voice-powered patient intake system that conducts interviews and produces structured EHR-compatible output.",
    features: [
      "Clinical document parsing and structuring",
      "Medical named entity recognition (NER)",
      "Voice-powered patient intake interviews",
      "Structured EHR output generation",
      "FHIR-compatible data formats",
      "Multi-step agentic processing pipeline",
    ],
    techStack: [
      "React 19",
      "TypeScript",
      "FastAPI",
      "Claude API",
      "Whisper",
      "Tailwind CSS",
      "Docker",
    ],
    demoUrl: "https://agentic-ai-in-healthcare.demos.fierro.co.uk",
  },
  {
    slug: "intelligent-document-processing",
    title: "Intelligent Document Processing",
    tag: "Financial Services",
    tagColor: "amber",
    description:
      "Plugin-based document extraction, classification, and validation platform for multi-domain processing at scale.",
    longDescription:
      "A generic IDP platform with a plugin architecture that supports multiple document domains. Each plugin defines extraction schemas, validation rules, and processing pipelines tailored to specific document types. Includes an LLM-powered schema calibration system that learns extraction patterns from sample documents, reducing setup time from weeks to hours.",
    features: [
      "Plugin-based architecture for multi-domain support",
      "LLM-powered schema calibration from samples",
      "Multi-stage extraction pipeline (classify → extract → validate → enrich)",
      "Configurable validation rules per document type",
      "Schema versioning and evolution tracking",
      "Temporal-orchestrated processing for reliability",
    ],
    techStack: [
      "React 19",
      "TypeScript",
      "FastAPI",
      "Temporal",
      "PostgreSQL",
      "Claude API",
      "Tailwind CSS",
      "Docker",
    ],
    demoUrl: "https://idp-platform-template.demos.fierro.co.uk",
  },
];
