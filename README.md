# XeeAI - Explainable AI Chatbot

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://xai-research.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.119.1-009688)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11+-blue)](https://www.python.org/)

XeeAI is an open-source explainable AI platform that provides transparency into LLM decision-making processes. Using the LIME (Local Interpretable Model-agnostic Explanations) algorithm, XeeAI visualizes how AI models interpret user inputs and generate responses, helping users understand and trust AI systems.

**Live Demo:** https://xai-research.vercel.app/
**Research Paper:** https://mr-jones123.github.io/static-website-for-paper/

![XeeAI Demo](https://via.placeholder.com/800x400.png?text=XeeAI+Demo+Screenshot)

---

## 📖 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Docker Deployment](#docker-deployment)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Acknowledgments](#acknowledgments)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 About The Project

XeeAI bridges the gap between complex AI systems and user understanding by providing real-time explanations of how language models process inputs and generate outputs. This project aims to:

- **Increase Transparency**: Show users how their inputs influence AI responses
- **Build Trust**: Help users understand AI decision-making through visualizations
- **Promote AI Literacy**: Make explainable AI accessible to everyone
- **Research Tool**: Provide a platform for studying AI interpretability

The project uses the **C-LIME (Conditional LIME)** algorithm to generate explanations, showing which parts of the user's input had the most significant impact on the AI's response.

---

## ✨ Features

- 🤖 **Interactive AI Chat**: Real-time streaming conversations with Google's Gemini AI
- 📊 **LIME Explanations**: Visual breakdown of how input features influence outputs
- 📈 **Interactive Visualizations**: Bar charts showing feature importance scores
- 🎨 **Modern UI**: Clean, responsive interface built with Tailwind CSS and shadcn/ui
- 📝 **Markdown Support**: Rich text rendering with syntax highlighting
- 🌙 **Dark Mode**: Built-in theme switching
- 🔄 **Streaming Responses**: Server-sent events for real-time AI responses
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile
- 🐳 **Docker Support**: Easy deployment with containerization
- 🚀 **Production Ready**: Deployed on Vercel (frontend) and Render (backend)

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15.1.6](https://nextjs.org/)** - React framework with App Router
- **[React 19.2.0](https://reactjs.org/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 3.4.18](https://tailwindcss.com/)** - Utility-first CSS
- **[shadcn/ui](https://ui.shadcn.com/)** - Component library (Radix UI primitives)
- **[Recharts 2.15.4](https://recharts.org/)** - Data visualization
- **[Framer Motion](https://www.framer.com/motion/)** - Animations
- **[react-markdown](https://github.com/remarkjs/react-markdown)** - Markdown rendering

### Backend
- **[FastAPI 0.119.1](https://fastapi.tiangolo.com/)** - Modern Python web framework
- **[Python 3.11+](https://www.python.org/)** - Programming language
- **[Google Generative AI](https://ai.google.dev/)** - Gemini 2.5 Flash integration
- **[scikit-learn](https://scikit-learn.org/)** - Machine learning (for LIME)
- **[spaCy](https://spacy.io/)** - Natural language processing
- **[Uvicorn](https://www.uvicorn.org/)** - ASGI server
- **[Pydantic](https://docs.pydantic.dev/)** - Data validation

### Deployment
- **[Vercel](https://vercel.com/)** - Frontend hosting + serverless functions
- **[Render](https://render.com/)** - Backend API hosting
- **[Docker](https://www.docker.com/)** - Containerization
- **[Docker Hub](https://hub.docker.com/)** - Container registry

### Package Managers
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient npm alternative (frontend)
- **[uv](https://github.com/astral-sh/uv)** - Blazing fast Python package installer (backend)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js 18+** - [Download](https://nodejs.org/)
- **Python 3.11+** - [Download](https://www.python.org/downloads/)
- **pnpm** - Install globally:
  ```bash
  npm install -g pnpm
  ```
- **uv** - Install Python package manager:
  ```bash
  curl -LsSf https://astral.sh/uv/install.sh | sh
  ```
- **Docker** (optional) - [Download](https://www.docker.com/products/docker-desktop)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/XAI-Research.git
   cd XAI-Research
   ```

2. **Install frontend dependencies**
   ```bash
   pnpm install
   ```

3. **Install backend dependencies**
   ```bash
   uv pip install -r requirements.txt
   ```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Required: Your Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Backend endpoint (for production)
NEXT_PUBLIC_RENDER_ENDPOINT=https://your-backend.onrender.com
```

**Getting a Gemini API Key:**
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it in your `.env.local` file

### Running Locally

#### Option 1: Run Frontend and Backend Separately

**Terminal 1 - Start the Backend (FastAPI):**
```bash
cd src/api
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: http://localhost:8000

**Terminal 2 - Start the Frontend (Next.js):**
```bash
pnpm dev
```

Frontend will be available at: http://localhost:3000

#### Option 2: Run with Docker

**Build and run the backend container:**
```bash
# Build the Docker image
docker build -t xeeai-backend .

# Run the container
docker run -p 8000:8000 --env-file .env xeeai-backend
```

**Start the frontend:**
```bash
pnpm dev
```

---

## 🐳 Docker Deployment

### Building the Backend Image

The backend can be containerized for easy deployment:

```bash
# Build the image
docker build -t yourusername/xeeai-backend:latest .

# Run locally
docker run -p 8000:8000 -e GEMINI_API_KEY=your_key_here yourusername/xeeai-backend:latest

# Push to Docker Hub
docker login
docker push yourusername/xeeai-backend:latest
```

### Docker Compose (Optional)

Create a `docker-compose.yml` for running both services:

```yaml
version: '3.8'
services:
  backend:
    build: .
    ports:
      - "8000:8000"
    env_file:
      - .env
    environment:
      - PORT=8000
```

Run with: `docker-compose up`

---

## 📁 Project Structure

```
XAI-Research/
├── src/
│   ├── api/                          # FastAPI Backend
│   │   ├── main.py                   # Main FastAPI application
│   │   ├── clime/                    # C-LIME algorithm implementation
│   │   │   ├── clime.py             # Core LIME explainer
│   │   │   ├── gemini_wrapper.py   # Gemini model wrapper
│   │   │   ├── segmenter.py        # Text segmentation (spaCy)
│   │   │   ├── subset_utils.py     # Subset sampling utilities
│   │   │   └── linear_model.py     # Linear model fitting
│   │   └── utils/
│   │       └── stream.py            # SSE streaming logic
│   │
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Landing page
│   │   ├── globals.css              # Global styles
│   │   └── (pages)/chatbot/        # Chatbot page
│   │
│   ├── components/                   # React Components
│   │   ├── Chatbot.tsx              # Main chatbot component
│   │   ├── ChatInterface.tsx        # Chat UI
│   │   ├── ExplainablePanel.tsx     # LIME visualization
│   │   └── ui/                      # shadcn/ui components
│   │
│   └── hooks/                        # Custom React hooks
│       └── useStreamingChat.ts      # Chat streaming hook
│
├── public/                           # Static assets
├── Dockerfile                        # Backend container config
├── .dockerignore                     # Docker ignore rules
├── requirements.txt                  # Python dependencies
├── package.json                      # Node.js dependencies
├── pnpm-lock.yaml                   # pnpm lock file
├── next.config.ts                   # Next.js configuration
├── tailwind.config.ts               # Tailwind configuration
└── README.md                        # This file
```

---

## 🔬 How It Works

### Architecture Overview

```
┌─────────────┐      HTTP/SSE       ┌──────────────┐      API Call      ┌─────────────┐
│  Next.js    │ ────────────────>   │   FastAPI    │ ────────────────>  │   Gemini    │
│  Frontend   │                     │   Backend    │                    │     API     │
└─────────────┘ <────────────────   └──────────────┘ <────────────────  └─────────────┘
      │                                     │
      │                                     │
      │         LIME Explanation            │
      │ <───────────────────────────────────┘
      │
      ▼
┌─────────────┐
│   Recharts  │
│   Visuals   │
└─────────────┘
```

### LIME Explanation Process

1. **User Input**: User sends a message to the chatbot
2. **Initial Response**: Gemini generates a response (streamed to frontend)
3. **Text Segmentation**: Input is segmented into words/sentences using spaCy
4. **Perturbation**: Multiple variations of the input are created by masking segments
5. **Model Queries**: Each variation is sent to Gemini to generate responses
6. **Similarity Scoring**: Outputs are compared to the original response
7. **Linear Model Fitting**: A linear model explains which segments are most important
8. **Visualization**: Feature importance scores are displayed as an interactive bar chart

### LIME Algorithm

This project uses **C-LIME (Conditional LIME)**, an adaptation of LIME for text generation models. The implementation is based on IBM's ICX360 framework (see [Acknowledgments](#acknowledgments)).

**Key Features:**
- Adaptive segmentation (words for short texts, sentences for long texts)
- Perturbation-based explanations
- Linear approximation of model behavior
- Visual feature importance ranking

---

## 🙏 Acknowledgments

This project uses the **C-LIME (Conditional LIME)** algorithm adapted from the [**IBM ICX360 (Intelligent Conversational Explainability 360)**](https://github.com/IBM/ICX360) framework.

We would like to express our sincere gratitude to the IBM Research team and all contributors to the ICX360 project for their groundbreaking work in explainable AI for conversational systems. Their open-source implementation provided the foundation for the explanation capabilities in XeeAI.

**Reference:**
- ICX360 GitHub Repository: https://github.com/IBM/ICX360
- Original LIME Paper: ["Why Should I Trust You?" Explaining the Predictions of Any Classifier](https://arxiv.org/abs/1602.04938) by Ribeiro et al. (2016)

### Built With

Special thanks to the following open-source projects:
- [Next.js](https://nextjs.org/) - React framework
- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework
- [Google Generative AI](https://ai.google.dev/) - Gemini API
- [scikit-learn](https://scikit-learn.org/) - Machine learning library
- [spaCy](https://spacy.io/) - Industrial-strength NLP
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Recharts](https://recharts.org/) - Composable charting library
- [Vercel](https://vercel.com/) - Deployment platform

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feat/amazing-feature`)
3. **Commit your Changes** using [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat: add amazing feature"
   ```
4. **Push to the Branch** (`git push origin feat/amazing-feature`)
5. **Open a Pull Request**

### Commit Convention

This project uses Conventional Commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features (when testing infrastructure is available)
- Update documentation as needed
- Ensure your code builds without errors: `pnpm build`

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📧 Contact

Project Link: [https://github.com/yourusername/XAI-Research](https://github.com/yourusername/XAI-Research)

Live Demo: [https://xai-research.vercel.app/](https://xai-research.vercel.app/)

---

## 🌟 Star History

If you find this project useful, please consider giving it a star! ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/XAI-Research&type=Date)](https://star-history.com/#yourusername/XAI-Research&Date)

---

**Built with ❤️ for AI transparency**
