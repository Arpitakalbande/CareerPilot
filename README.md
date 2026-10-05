
# Job Search AI - Job Preparation Agent

A comprehensive AI-powered job search platform with LangGraph agents, resume analysis, job scraping, recruiter chatbot, and interview preparation.

## ✨ Features

- **Resume Analysis Pro**: Detailed ATS scoring with 8 granular subscores (skills, experience, education, certifications, projects, impact, formatting, keyword coverage)
- **Job Search & Ranking**: Search and scrape jobs from Indeed, Naukri, and SerpApi with AI-powered ranking
- **AI Recruiter Interview**: Voice-enabled recruiter chatbot with local Whisper STT + browser TTS and real-time performance analysis
- **Interview Prep**: AI-generated interview Q&A with robust JSON parsing and batching
- **Cover Letter Generator**: Auto-generate professional cover letters with your resume links (LinkedIn, GitHub, Portfolio)
- **Email Application**: Send tailored application emails with resume attachment and auto-extracted profile links
- **LangGraph Orchestration**: Multi-agent workflow for coordinated task execution
- **Semantic Embeddings**: Match resumes to job postings using Hugging Face embeddings

## Tech Stack

**Backend:**
- FastAPI (REST API framework)
- Uvicorn (ASGI server)
- LangGraph (AI agent orchestration)
- Anthropic Claude (LLM)
- pdfplumber & PyMuPDF (PDF extraction)
- BeautifulSoup (web scraping)
- Hugging Face (semantic embeddings)

**Frontend:**
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- shadcn/ui (component library)
- Recharts (data visualization)
- MediaRecorder + backend Whisper STT
- Browser SpeechSynthesis (TTS)

**Infrastructure:**
- Python 3.11+
- Node.js 18+
- Conda/venv (Python environments)
- npm/bun (Node package manager)

## Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- Anthropic API Key (https://console.anthropic.com)
- Git

### Environment Setup

1. **Clone the repository:**
```bash
git clone https://github.com/Arpitbanait/Job-Preparation-Agent.git
cd Job-Preparation-Agent
```

2. **Create Python virtual environment:**
```bash
python -m venv venv

# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate
```

3. **Install Python dependencies:**
```bash
pip install -r requirements.txt
```

4. **Set up environment variables:**
```bash
# Copy and edit the .env file
cp .env.example .env  # or create manually
```

Add to `.env`:
```env
# Required
ANTHROPIC_API_KEY=sk-ant-...your_key_here...

# Optional (for resume extraction)
SERPER_API_KEY=your_serper_key

# Optional (for job scraping fallback)
SERPAPI_API_KEY=your_serpapi_key

# Optional (Gmail OAuth for email sending)
# Follow: https://developers.google.com/gmail/api/quickstart/python
```

---

## 🚀 Running the Backend

### Start FastAPI Server

```bash
# Navigate to project root
cd /path/to/Job-Preparation-Agent

# Activate virtual environment (if not already active)
venv\Scripts\activate  # Windows
# or
source venv/bin/activate  # macOS/Linux

# Start the server
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

**Output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

**API Documentation:**
- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc
- Health Check: http://127.0.0.1:8000/api/v1/health

### Available Backend Endpoints

**Resume Analysis:**
- `POST /api/v1/analyze-resume` - Basic ATS analysis
- `POST /api/v1/resume/analyze/pro` - Detailed ATS with subscores (skill_match, experience, education, certifications, projects, impact, formatting, keyword_coverage)

**Job Search:**
- `POST /api/v1/search-jobs` - Search and rank jobs with AI scoring

**Interview:**
- `POST /api/v1/generate-interview-qa` - Generate interview questions
- `POST /api/v1/recruiter/chat` - Chat with AI recruiter
- `POST /api/v1/recruiter/transcribe` - Transcribe recruiter voice input using local Whisper
- `POST /api/v1/interview/analyze` - Analyze completed interview and get performance score

**Cover Letter & Email:**
- `POST /api/v1/generate-cover-letter` - Generate cover letter
- `POST /api/v1/send-mail-oauth` - Send application email with resume attachment and profile links

**Workflow:**
- `POST /api/v1/workflow/job-apply/start` - Execute full job application workflow

---

## 🎨 Running the Frontend

### Install Frontend Dependencies

```bash
# Navigate to frontend directory
cd frontend/job-spark-ai

# Install dependencies with npm or bun
npm install
# or
bun install
```

### Start Development Server

```bash
# From frontend/job-spark-ai directory
npm run dev
# or
bun run dev
```

**Output:**
```
VITE v5.4.21 ready in 1351 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

Open browser: **http://localhost:5173**

### Frontend Features

The React frontend includes 6 main sections:

1. **Resume Analyzer**
   - Upload PDF resume
   - View detailed ATS scores (8 metrics)
   - See matched/missing keywords
   - Get improvement recommendations
   - View radar chart and performance heatmap

2. **Job Search**
   - Enter job title and location
   - Filter by salary range and job type
   - View AI-ranked results
   - Apply directly with resume

3. **Interview Prep**
   - Generate interview questions
   - Select difficulty level (beginner/intermediate/advanced)
   - Get Q&A pairs with explanations
   - Practice before the real interview

4. **AI Recruiter Chat**
   - Voice-enabled interview simulation
   - Real-time recruiter questions
  - Speak naturally with local Whisper speech-to-text (backend transcription)
  - AI responses played with browser text-to-speech
   - End interview to see performance analysis
   - Get score (0-100), strengths, improvements, and feedback

5. **Cover Letter Generator**
   - Upload resume and job description
   - Auto-generate professional cover letter
   - Ready to copy/paste or download

6. **Workflow (Full Application)**
   - Upload resume
   - Select job posting
   - Auto-generate cover letter
   - Send application via email

### Build for Production

```bash
# From frontend/job-spark-ai directory
npm run build
# or
bun run build
```

Output will be in `dist/` folder.

---

## 📋 API Usage Examples

### 1. Analyze Resume (Pro)

```bash
curl -X POST http://localhost:8000/api/v1/resume/analyze/pro \
  -F "file=@resume.pdf" \
  -F "job_description=5+ years Python, AWS, Docker experience"
```

**Response:**
```json
{
  "overall_score": 82.5,
  "subscores": {
    "skill_match": 90.0,
    "experience_score": 85.0,
    "education_score": 75.0,
    "certification_score": 60.0,
    "projects_score": 80.0,
    "impact_score": 88.0,
    "formatting_score": 92.0,
    "keyword_coverage": 85.0,
    "final_ats_score": 82.5
  },
  "skills_match": {
    "present": ["python", "aws", "docker", "fastapi"],
    "missing": ["kubernetes", "terraform"],
    "percentage": 90.0
  },
  "matched_keywords": [...],
  "missing_keywords": [...],
  "recommendations": ["Add Kubernetes experience", "Mention ML projects"],
  "top_improvements": ["Add quantifiable achievements", "Use power verbs"]
}
```

### 2. Search Jobs

```bash
curl -X POST http://localhost:8000/api/v1/search-jobs \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Data Scientist",
    "location": "San Francisco, CA",
    "salary_min": 120000,
    "salary_max": 180000,
    "job_type": "Full-time"
  }'
```

### 3. Generate Interview Q&A

```bash
curl -X POST http://localhost:8000/api/v1/generate-interview-qa \
  -H "Content-Type: application/json" \
  -d '{
    "job_title": "Senior Backend Engineer",
    "job_description": "5+ years with Python, microservices, Docker, Kubernetes",
    "difficulty": "intermediate",
    "num_questions": 5
  }'
```

### 4. Send Application Email with Resume

```bash
curl -X POST http://localhost:8000/api/v1/send-mail-oauth \
  -F "to=hiring@company.com" \
  -F "subject=Application for Senior Backend Engineer" \
  -F "resume_pdf=@resume.pdf" \
  -F "role=Senior Backend Engineer" \
  -F "company=TechCorp" \
  -F "short=true" \
  -F "auto_links=true"
```

**Auto-generated email body:**
```
Hello TechCorp Hiring Team
Role: Senior Backend Engineer
Resume: Attached
LinkedIn: https://linkedin.com/in/yourname
GitHub: https://github.com/yourname
Portfolio: https://yourname.dev
Thanks,
Your Name
```

---

## 🔧 Configuration

### `.env` Variables

```env
# API Keys
ANTHROPIC_API_KEY=sk-ant-...
SERPAPI_API_KEY=...
SERPER_API_KEY=...

# Model Configuration
MODEL_NAME=claude-3-sonnet-20241022
EMBEDDINGS_MODEL=sentence-transformers/all-MiniLM-L6-v2
LOCAL_WHISPER_MODEL_SIZE=base
LOCAL_WHISPER_DEVICE=cpu
LOCAL_WHISPER_COMPUTE_TYPE=int8

# Job Scraper
MAX_JOBS_PER_SCRAPE=20
INDEED_ENABLED=true

# Resume Analysis
RESUME_MIN_SCORE=40
SKILL_WEIGHT=0.3
EXPERIENCE_WEIGHT=0.2
EDUCATION_WEIGHT=0.1
CERTIFICATION_WEIGHT=0.1
PROJECTS_WEIGHT=0.1
IMPACT_WEIGHT=0.1
FORMATTING_WEIGHT=0.1
```

---

## 📂 Project Structure

```
Job-Preparation-Agent/
├── app/
│   ├── main.py                 # FastAPI app entry point
│   ├── config.py               # Configuration loader
│   └── api/
│       ├── routes.py           # All API endpoints
│       └── schemas.py          # Pydantic request/response models
├── agents/
│   ├── supervisor_agent.py     # LangGraph coordinator
│   ├── resume_agent.py         # Resume analysis
│   ├── job_search_agent.py     # Job ranking/filtering
│   ├── interview_agent.py      # Interview generation
│   └── application_workflow.py # Full workflow orchestration
├── modules/
│   ├── resume_ats.py           # ATS scoring engine (8 metrics)
│   ├── job_scraper.py          # Indeed, Naukri, SerpApi scraper
│   ├── interview_qa.py         # Interview Q&A generator
│   ├── cover_letter.py         # Cover letter + link extraction
│   ├── gmail_sender.py         # OAuth email + attachments
│   ├── resume_parser.py        # PDF/text parsing
│   └── embeddings.py           # Semantic embeddings
├── utils/
│   ├── parsers.py              # Text extraction utilities
│   └── validators.py           # Input validation
├── frontend/
│   └── job-spark-ai/
│       ├── src/
│       │   ├── App.tsx         # Main React app
│       │   ├── components/
│       │   │   ├── sections/   # ResumeAnalyzer, JobSearch, Interview, etc.
│       │   │   ├── layout/     # Navbar, Footer
│       │   │   └── ui/         # shadcn components
│       │   ├── api/            # API client helpers
│       │   ├── hooks/          # Custom React hooks
│       │   └── pages/          # Page components
│       ├── package.json        # Frontend dependencies
│       └── vite.config.ts      # Vite configuration
├── .env.example                # Environment variables template
├── requirements.txt            # Python dependencies
├── .gitignore                  # Git ignore patterns
└── README.md                   # This file
```

---

## 🔑 API Key Setup

### Anthropic Claude
1. Visit https://console.anthropic.com/
2. Create an account or sign in
3. Generate an API key
4. Add to `.env`: `ANTHROPIC_API_KEY=sk-ant-...`

### Gmail OAuth (for email sending)
1. Go to https://developers.google.com/gmail/api/quickstart/python
2. Click "Enable the Gmail API"
3. Create OAuth 2.0 Client ID (Desktop app)
4. Download credentials.json and place in project root
5. First run will prompt browser login
6. token.json will be auto-generated

### SerpApi (optional, for job scraping fallback)
1. Visit https://serpapi.com/
2. Sign up and get API key
3. Add to `.env`: `SERPAPI_API_KEY=...`

---

## ⚙️ Running Both Backend & Frontend Together

**Terminal 1 (Backend):**
```bash
venv\Scripts\activate  # Windows
uvicorn app.main:app --reload --port 8000
```

**Terminal 2 (Frontend):**
```bash
cd frontend/job-spark-ai
npm run dev
```

Then open: http://localhost:5173

---

## 🐛 Troubleshooting

### Backend Issues

**Issue:** `ModuleNotFoundError: No module named 'anthropic'`
- Solution: Run `pip install -r requirements.txt`

**Issue:** `ANTHROPIC_API_KEY not found`
- Solution: Create `.env` file and add your API key

**Issue:** Job scraper returns empty results
- Solution: Indeed/Naukri may block; SerpApi fallback will be used if configured

**Issue:** Resume upload fails
- Solution: Ensure PyMuPDF is installed: `pip install PyMuPDF pdfplumber`

### Frontend Issues

**Issue:** `npm ERR! code ERESOLVE`
- Solution: Use `npm install --legacy-peer-deps` or `bun install`

**Issue:** API calls fail (CORS)
- Solution: Backend must be running on http://127.0.0.1:8000

**Issue:** Voice transcription not working in Recruiter Chat
- Solution: Confirm backend is running and `/api/v1/recruiter/transcribe` is reachable
- Solution: Verify local Whisper dependencies are installed: `pip install -r requirements.txt`
- Solution: Try a smaller local model in `.env` (for low-memory systems): `LOCAL_WHISPER_MODEL_SIZE=tiny`

---

## 📊 Performance Benchmarks

- Resume analysis: ~1-2 seconds
- Job search: ~5-10 seconds
- Interview QA generation: ~10-15 seconds
- Cover letter generation: ~3-5 seconds
- Email sending: ~1-2 seconds

---

## 📝 Features by Endpoint

### Resume Analysis
- **Input:** PDF file + job description
- **Output:** 8 detailed subscores, matched/missing keywords, ATS percentage, recommendations
- **Processing:** Deterministic local engine (no random values)

### Job Search
- **Input:** Query, location, salary range, job type
- **Output:** Ranked job listings (sorted by AI relevance)
- **Sources:** Indeed, Naukri, SerpApi fallback

### Interview
- **Input:** Job title, description, difficulty, question count
- **Output:** JSON array of Q&A pairs with explanations
- **Levels:** beginner, intermediate, advanced

### Recruiter Chat
- **Input:** Message, conversation history, resume, job description
- **Output:** AI recruiter response (concise questions)
- **Voice:** Local Whisper STT (`/api/v1/recruiter/transcribe`) + browser TTS synthesis

### Email
- **Input:** To address, subject, resume PDF, role, company
- **Output:** Professional application email with attachment
- **Auto-links:** LinkedIn, GitHub, Portfolio (extracted from resume)

---

## 🚢 Deployment

### Backend (Railway, Heroku, AWS)
```bash
# Build: Already works with pip/Python
# Run: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

### Frontend (Vercel, Netlify)
```bash
# Build: npm run build
# Output: dist/ folder (static files)
```

---

## 📄 License

MIT License - See LICENSE file

---

## 🤝 Contributing

Contributions welcome! Please:
1. Create a feature branch (`git checkout -b feature/your-feature`)
2. Commit changes (`git commit -m 'Add your feature'`)
3. Push to branch (`git push origin feature/your-feature`)
4. Open a Pull Request

---



