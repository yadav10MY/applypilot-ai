# ApplyPilot AI 🚀

> Transform your career with AI-powered resume analysis, job matching, and personalized career roadmaps

ApplyPilot AI is a comprehensive career development platform that helps job seekers optimize their resumes, find matching opportunities, and plan their career growth using artificial intelligence.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## ✨ Features

- **🤖 AI-Powered Resume Analysis** - Get instant ATS scoring and detailed feedback on your resume
- **💼 Smart Job Matching** - Find jobs that perfectly match your skills with intelligent scoring
- **🗺️ Personalized Career Roadmap** - Get a 12-month plan to achieve your career goals
- **📊 Skill Gap Analysis** - Identify missing skills and get learning resources
- **🔐 Secure Authentication** - Email/password and Google OAuth integration
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **🌗 Dark Mode** - Eye-friendly theme switching
- **⚡ Real-time Updates** - Instant feedback and notifications

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/)
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication:** [Supabase Auth](https://supabase.com/auth)
- **AI Integration:** OpenAI / Anthropic Claude
- **State Management:** React Hooks
- **Form Handling:** React Hook Form (implicit)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **npm** or **yarn** or **pnpm**
- **Git**

You'll also need accounts for:

- [Supabase](https://supabase.com/) - For database and authentication
- [OpenAI](https://openai.com/) or [Anthropic](https://anthropic.com/) - For AI features

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yadav10MY/applypilot-ai.git
cd applypilot-ai
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# OpenAI/Anthropic API Configuration
OPENAI_API_KEY=your-openai-api-key
# OR use Anthropic Claude
ANTHROPIC_API_KEY=your-anthropic-api-key

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set Up Supabase Database

#### Option A: Using Supabase Dashboard (Recommended for beginners)

1. Go to your [Supabase Dashboard](https://app.supabase.com/)
2. Navigate to **SQL Editor**
3. Copy the contents of `supabase/migrations/001_initial_schema.sql`
4. Paste and run the SQL script

#### Option B: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push
```

See [supabase/README.md](./supabase/README.md) for detailed database documentation.

### 5. Configure Authentication

1. Go to **Supabase Dashboard** → **Authentication** → **Providers**
2. Enable **Email** provider
3. (Optional) Enable **Google** provider:
   - Add your Google OAuth credentials
   - Set authorized redirect URL: `http://localhost:3000/auth/callback`

### 6. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
applypilot-ai/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API routes
│   │   │   ├── analyze-resume/   # Resume analysis endpoint
│   │   │   └── generate-roadmap/ # Career roadmap endpoint
│   │   ├── auth/                 # Authentication pages
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   ├── reset-password/
│   │   │   └── update-password/
│   │   ├── dashboard/            # Protected dashboard pages
│   │   │   ├── resume/           # Resume analysis
│   │   │   ├── jobs/             # Job matching
│   │   │   ├── roadmap/          # Career roadmap
│   │   │   └── profile/          # User profile
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Landing page
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── dashboard/            # Dashboard-specific components
│   │   └── ui/                   # Reusable UI components
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Utility functions
│   │   ├── src/lib/              # Core business logic
│   │   │   ├── job-matcher.ts   # Job matching algorithm
│   │   │   ├── resume-parser.ts # Resume parsing
│   │   │   ├── openai.ts        # AI integration
│   │   │   └── utils.ts         # Helper functions
│   │   ├── supabase.ts           # Supabase client (browser)
│   │   └── supabase-server.ts    # Supabase client (server)
│   └── middleware.ts             # Auth middleware
├── supabase/
│   ├── migrations/               # Database migrations
│   └── README.md                 # Database documentation
├── public/                       # Static assets
├── .env.example                  # Environment variables template
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## 🎯 Key Features Guide

### Resume Analysis

1. Navigate to **Dashboard** → **Resume Analysis**
2. Upload your resume (PDF, DOCX, or TXT)
3. Get instant ATS score and detailed feedback
4. View strengths, weaknesses, and recommendations
5. Identify your skills and skill gaps

### Job Matching

1. Go to **Dashboard** → **Job Matching**
2. Use filters to search for jobs
3. View match scores for each job
4. See which requirements you meet
5. Save or apply to jobs

### Career Roadmap

1. Visit **Dashboard** → **Career Roadmap**
2. Enter your target role
3. Get a 12-month personalized plan
4. Track milestones and goals
5. Access curated learning resources

## 🔧 Configuration

### AI Provider Configuration

The app supports both OpenAI and Anthropic Claude. Edit `src/lib/src/lib/openai.ts` to switch providers or customize AI behavior.

### Theme Customization

Modify `tailwind.config.ts` to customize colors, fonts, and other design tokens.

### Database Schema

See `supabase/README.md` for detailed information about the database schema, tables, and relationships.

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yadav10MY/applypilot-ai)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com/)
3. Add environment variables
4. Deploy

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:

- **Netlify**
- **Railway**
- **Render**
- **AWS Amplify**
- **Digital Ocean**

## 🔒 Security

- All API routes require authentication
- Row Level Security (RLS) enabled on all database tables
- Environment variables are never exposed to the client
- Passwords are hashed by Supabase Auth
- HTTPS enforced in production

## 🐛 Troubleshooting

### Common Issues

**"Missing Supabase credentials" error:**
- Ensure `.env` file exists with correct values
- Restart the development server after updating `.env`

**Database connection errors:**
- Verify Supabase credentials are correct
- Check if database migrations have been run
- Ensure RLS policies are properly configured

**AI features not working:**
- Confirm API key is valid and has credits
- Check API endpoint configuration
- Review error logs in browser console

**Authentication issues:**
- Clear browser cookies and local storage
- Check Supabase Auth settings
- Verify redirect URLs are configured

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - [yadav10MY](https://github.com/yadav10MY)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Radix UI](https://www.radix-ui.com/) - Unstyled UI components
- [OpenAI](https://openai.com/) / [Anthropic](https://anthropic.com/) - AI capabilities
- [Lucide Icons](https://lucide.dev/) - Beautiful icons

## 📧 Support

For support, email support@applypilot.ai or open an issue on GitHub.

## 🗺️ Roadmap

- [ ] PDF resume parsing with better accuracy
- [ ] Integration with LinkedIn
- [ ] Real job board API integration
- [ ] Interview preparation module
- [ ] Cover letter generator
- [ ] Salary negotiation insights
- [ ] Mobile app (React Native)
- [ ] Multi-language support

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

Made with ❤️ using Next.js and Supabase
