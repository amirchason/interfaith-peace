# Interfaith Peace Initiative 🕊️

A world-class website exploring universal teachings of peace across **five major religions**: Christianity, Islam, Hinduism, Buddhism, and Judaism.

## ✨ Features

- 📚 **Scholarly Content** - Peace teachings reviewed by experts from each tradition
- 🔍 **Powerful Search** - Fast search powered by Meilisearch
- 🌍 **Multilingual** - Support for English, Spanish, Arabic, Hindi, Chinese
- ⚡ **Lightning Fast** - Astro 5 delivers 95+ Lighthouse scores
- 🎨 **Beautiful Design** - Religion-specific color system
- ♿ **Accessible** - WCAG AA compliant
- 🔐 **Privacy-First** - GDPR compliant analytics

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Start development server
npm run dev
```

Visit http://localhost:4321

## 🛠️ Technology Stack

- **Frontend**: Astro 5 with React islands
- **Database**: Supabase (PostgreSQL)
- **Search**: Meilisearch
- **Styling**: Tailwind CSS 3
- **Hosting**: Cloudflare Pages
- **Analytics**: Plausible (privacy-friendly)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type check with Astro
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier

## 🗄️ Database Setup

1. Create Supabase project at https://supabase.com
2. Run SQL migrations from `scripts/schema.sql` in SQL Editor
3. Add Supabase credentials to `.env`

## 🎨 Design System

### Religion-Specific Colors
- **Christianity**: Blue (#4A90E2)
- **Islam**: Green (#2ECC71)
- **Hinduism**: Saffron (#F39C12)
- **Buddhism**: Purple (#9B59B6)
- **Judaism**: Blue (#3498DB)
- **Interfaith**: Gray (#95A5A6)

## 📊 Cost Estimate

**Monthly**: $119-$283/month
- Cloudflare Pages: $0
- Supabase: $0-$25
- Meilisearch: $0-$29
- Plausible: $9
- APIs: $100-220

## 🤝 Contributing

Contributions welcome! See CONTRIBUTING.md for guidelines.

## 📄 License

MIT License

---

**Built with ❤️ for peace and interfaith understanding** 🕊️
