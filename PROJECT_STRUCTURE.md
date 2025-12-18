# Peace Project Structure

## Directory Overview

```
peace/
├── .github/                 # GitHub Actions workflows
│   └── workflows/
│       └── deploy.yml       # Automated deployment
│
├── .vscode/                 # VS Code configuration
│   ├── extensions.json      # Recommended extensions
│   └── settings.json        # Editor settings
│
├── docs/                    # Documentation
│   └── article-templates/   # Article writing templates
│       ├── COUNTER-EXTREMISM-TEMPLATE.mdx
│       └── ARTICLES-8-30-BRIEF.md
│
├── public/                  # Static assets
│   ├── favicon.svg
│   └── robots.txt
│
├── scripts/                 # Utility scripts
│   ├── add-imagen-key.sh   # Image generation setup
│   └── schema.sql           # Database schema
│
├── src/                     # Source code
│   ├── components/          # Reusable Astro components (29 total)
│   │   ├── ActionableInsight.astro
│   │   ├── ArticleSchema.astro
│   │   ├── CaseStudy.astro
│   │   ├── ComparisonTable.astro
│   │   ├── DefinitionBox.astro
│   │   ├── ExpertQuote.astro
│   │   ├── GreekWord.astro
│   │   ├── HebrewCard.astro
│   │   ├── HistoricalContext.astro
│   │   ├── HistoricalExample.astro
│   │   ├── ManipulationTechnique.astro
│   │   ├── MantraCard.astro
│   │   ├── MeditationGuide.astro
│   │   ├── ProfileCard.astro
│   │   ├── QuickAnswer.astro
│   │   ├── RecruitmentStage.astro
│   │   ├── RelatedArticles.astro
│   │   ├── RelatedTeachings.astro
│   │   ├── ResearchData.astro
│   │   ├── SEOArticleSchema.astro
│   │   ├── ScholarQuote.astro
│   │   ├── SelfAssessment.astro
│   │   ├── SpectrumLevel.astro
│   │   ├── SpectrumMovement.astro
│   │   ├── TacticBreakdown.astro
│   │   ├── TeachingCard.astro
│   │   ├── VerseCard.astro
│   │   ├── VerseComparison.astro
│   │   └── WarningSign.astro
│   │
│   ├── content/             # Content collections
│   │   ├── articles/        # Blog articles (22 files)
│   │   │   ├── *.mdx        # 18 active articles
│   │   │   └── *.mdx.old    # 4 legacy articles (need refactoring)
│   │   ├── teachings/       # Religious teachings (15 files)
│   │   │   ├── buddhism/
│   │   │   ├── christianity/
│   │   │   ├── hinduism/
│   │   │   ├── islam/
│   │   │   └── judaism/
│   │   └── config.ts        # Content collection schemas
│   │
│   ├── layouts/             # Page layouts
│   │   └── BaseLayout.astro
│   │
│   ├── lib/                 # Shared utilities
│   │
│   ├── pages/               # Route pages
│   │   ├── index.astro      # Homepage
│   │   └── teachings/
│   │       ├── index.astro  # Teachings listing
│   │       └── [religion]/[slug].astro  # Dynamic teaching pages
│   │
│   ├── styles/              # Global styles
│   │   └── global.css
│   │
│   ├── types.ts             # TypeScript type definitions
│   │
│   └── utils/               # Utility functions
│       └── supabase.ts      # Supabase client
│
├── .editorconfig            # Editor configuration
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore patterns
├── .prettierrc              # Prettier configuration
├── astro.config.mjs         # Astro configuration
├── CONTRIBUTING.md          # Contribution guidelines
├── COUNTER-EXTREMISM_30_ARTICLE_PLAN.md  # Article series plan
├── LEGACY_ARTICLES_TODO.md  # Legacy articles documentation
├── LICENSE                  # MIT License
├── netlify.toml             # Netlify deployment config
├── package.json             # NPM dependencies
├── PROJECT_STRUCTURE.md     # This file
├── README.md                # Project overview
├── SEO_ARTICLE_EXECUTION_PLAN.txt  # SEO strategy
├── SEO_KEYWORD_RESEARCH.md  # Keyword research
├── tailwind.config.mjs      # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── wrangler.toml            # Cloudflare Pages configuration
```

## Key Directories

### `/src/components/`
Specialized Astro components for article enhancement:
- **SEO Components**: ArticleSchema, SEOArticleSchema, QuickAnswer
- **Content Components**: ExpertQuote, ScholarQuote, ResearchData, CaseStudy
- **Interactive Components**: SelfAssessment, ComparisonTable, RelatedArticles
- **Religion-Specific**: VerseCard, HebrewCard, MantraCard, GreekWord
- **Counter-Extremism**: WarningSign, SpectrumLevel, TacticBreakdown

### `/src/content/articles/`
Blog articles (MDX format):
- **Active**: 18 articles ready for production
- **Legacy**: 4 articles needing component refactoring
- **Topics**: Bible verses, Quran teachings, counter-extremism, interfaith peace

### `/src/content/teachings/`
Multi-faith peace teachings (5 religions, 15 teachings total):
- Buddhism (3)
- Christianity (3)
- Hinduism (3)
- Islam (3)
- Judaism (3)

## Component Architecture

### Base Layout
All pages use `BaseLayout.astro` which provides:
- HTML structure
- Global styles
- SEO meta tags
- Navigation
- Footer

### Content Collections
Defined in `src/content/config.ts`:
- Articles collection (MDX)
- Teachings collection (MDX)
- Schema validation
- Type safety

### Styling Approach
- **Framework**: Tailwind CSS 3
- **Typography**: @tailwindcss/typography plugin
- **Custom**: src/styles/global.css
- **Components**: Utility-first approach
- **Colors**: Religion-specific color system

## Build Output

### Static Site (`/dist`)
- Homepage: `/index.html`
- Teachings index: `/teachings/index.html`
- Teaching pages: `/teachings/{religion}/{slug}/index.html` (15 pages)
- Sitemap: `/sitemap-index.xml`
- Robots: `/robots.txt`

### Assets
- JavaScript bundle: `/_astro/client.*.js` (194KB, 60KB gzipped)
- CSS: Inline for critical, extracted for non-critical
- Images: Optimized via Astro's image service

## Development Workflow

### Local Development
```bash
npm run dev          # Start dev server on http://localhost:4321
npm run build        # Build for production
npm run preview      # Preview production build
npm run check        # Type check
npm run lint         # Lint code
npm run format       # Format code
```

### Deployment
- **Primary**: Cloudflare Pages (wrangler.toml)
- **Alternative**: Netlify (netlify.toml)
- **CI/CD**: GitHub Actions (.github/workflows/deploy.yml)

## Configuration Files

### Core
- `astro.config.mjs`: Astro configuration
- `tsconfig.json`: TypeScript settings
- `tailwind.config.mjs`: Tailwind customization
- `package.json`: Dependencies and scripts

### Code Quality
- `.prettierrc`: Code formatting
- `.editorconfig`: Editor consistency
- `.eslintrc.js`: (to be added) Linting rules

### Deployment
- `wrangler.toml`: Cloudflare Pages
- `netlify.toml`: Netlify
- `.github/workflows/deploy.yml`: GitHub Actions

### Environment
- `.env.example`: Template for environment variables
- `.env`: (local only, git-ignored) Actual credentials

## Content Workflow

### Writing Articles
1. Copy template from `docs/article-templates/COUNTER-EXTREMISM-TEMPLATE.mdx`
2. Fill in frontmatter (title, description, keywords, etc.)
3. Write content using provided components
4. Add to `src/content/articles/`
5. Build and test: `npm run build`
6. Commit and deploy

### Adding Teachings
1. Create MDX file in appropriate religion folder
2. Use TeachingCard, VerseCard components
3. Include proper citations
4. Link to related teachings
5. Test and deploy

## Beads (bd) Issue Tracking

Project uses bd for task management:
```bash
bd list              # View all issues
bd show ISSUE-ID     # View issue details
bd create            # Create new issue
bd update            # Update issue status
bd close             # Close completed issue
```

Current bd issues tracked in `.beads/` directory (git-ignored).

## Future Additions

### Planned Features
- Meilisearch integration for fast search
- Supabase database for dynamic content
- Multilingual support (ES, AR, HI, ZH)
- User comments and discussions
- Analytics dashboard

### Planned Content
- 23 remaining Counter-Extremism articles
- 4 legacy article refactorings
- Additional teachings from all 5 religions
- Video/audio transcripts
- Infographics and visualizations
