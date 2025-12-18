# Contributing to Interfaith Peace Initiative 🕊️

Thank you for your interest in contributing to the Interfaith Peace Initiative! This project aims to amplify universal teachings of peace across five major religions and combat religious extremism through evidence-based content.

## 🌟 Ways to Contribute

### 1. Content Contributions
- **Religious Teachings**: Submit peace teachings from Christianity, Islam, Hinduism, Buddhism, or Judaism
- **Counter-Extremism Articles**: Research-backed articles on deradicalization, moderate voices, interfaith cooperation
- **Translations**: Help translate content into Spanish, Arabic, Hindi, Chinese
- **Fact-Checking**: Verify religious texts, scholarly citations, research data

### 2. Technical Contributions
- **Bug Fixes**: Report or fix issues in the codebase
- **Component Development**: Create reusable Astro components for content enhancement
- **Performance Optimization**: Improve site speed, accessibility, SEO
- **Feature Development**: Add search, multilingual support, interactive features

### 3. Design Contributions
- **UI/UX Improvements**: Enhance user experience and accessibility
- **Visual Design**: Icons, illustrations, infographics for articles
- **Responsive Design**: Improve mobile and tablet experiences

## 📋 Content Guidelines

### Religious Content Standards
1. **Accuracy First**: All religious texts must include proper citations (book, chapter, verse)
2. **Scholarly Review**: Major content should be reviewed by scholars from the relevant tradition
3. **Respect & Balance**: Present all faiths with equal respect and without bias
4. **Peace Focus**: Emphasize teachings that promote peace, compassion, justice, reconciliation
5. **No Proselytizing**: Educational content only; no conversion attempts

### Counter-Extremism Content Standards
1. **Evidence-Based**: Cite peer-reviewed research, government reports, NGO studies
2. **Non-Partisan**: Avoid political bias; focus on objective analysis
3. **Empowering Moderates**: Amplify voices of peace, not just condemn extremism
4. **Actionable**: Provide practical strategies for educators, families, communities
5. **Multi-Faith**: Address extremism across all religions, not targeting one faith

### Writing Standards
- **Tone**: Scholarly yet accessible; compassionate but analytical
- **Word Count**: Articles typically 3,000-7,000 words with comprehensive coverage
- **SEO Optimization**: Target relevant keywords naturally within quality content
- **Formatting**: Use headings, bullet points, tables, and visual components
- **Citations**: APA format for academic sources; proper attribution for all quotes

## 🛠️ Technical Guidelines

### Getting Started
```bash
# Fork the repository
# Clone your fork
git clone https://github.com/YOUR-USERNAME/peace.git
cd peace

# Install dependencies
npm install

# Create a feature branch
git checkout -b feature/your-feature-name

# Start development server
npm run dev
```

### Development Workflow
1. **Create a Branch**: `git checkout -b feature/descriptive-name`
2. **Make Changes**: Follow code style and component patterns
3. **Test Locally**: `npm run build` and verify changes
4. **Commit**: Use clear, descriptive commit messages
5. **Push**: `git push origin feature/descriptive-name`
6. **Pull Request**: Open a PR with detailed description

### Code Standards
- **TypeScript**: Use TypeScript for type safety
- **Astro Components**: Follow existing component patterns
- **Tailwind CSS**: Use utility classes; avoid custom CSS
- **Accessibility**: WCAG AA compliance minimum
- **Performance**: Lighthouse score 95+ (Mobile & Desktop)
- **ESLint**: Fix all linting errors before committing

### Component Guidelines
```astro
---
// Props should be typed
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<!-- Use semantic HTML -->
<article class="prose max-w-none">
  <h2 class="text-2xl font-bold">{title}</h2>
  {description && <p class="text-gray-600">{description}</p>}
</article>
```

## 🔍 Pull Request Process

1. **Update Documentation**: If you add features, update README.md
2. **Add Tests**: For new features, add appropriate tests (if applicable)
3. **Check Build**: Ensure `npm run build` succeeds
4. **Description**: Clearly describe what your PR does and why
5. **Link Issues**: Reference related issues (e.g., "Fixes #123")
6. **Review**: Be responsive to code review feedback

### PR Title Format
```
feat: Add Sanskrit mantras component for Hindu teachings
fix: Correct Quran verse citation in peace article
docs: Update installation instructions in README
style: Improve mobile responsiveness of teaching cards
```

## 📚 Adding New Articles

### Article Template
Create file in `src/content/articles/your-article-slug.mdx`:

```mdx
---
title: "Your Article Title"
description: "Concise meta description (150-160 characters)"
publishDate: 2025-01-01
author: "Your Name"
religion: "interfaith" # or christianity, islam, hinduism, buddhism, judaism
category: "counter-extremism" # or teaching, comparison, history
tags: ["peace", "deradicalization", "moderate voices"]
featured: false
seo:
  keywords: ["primary keyword", "secondary keyword", "long-tail keyword"]
  canonicalUrl: "https://interfaithpeace.org/articles/your-article-slug"
---

import QuickAnswer from '../../components/QuickAnswer.astro';
import ExpertQuote from '../../components/ExpertQuote.astro';

<QuickAnswer>
Concise answer to main question (30-50 words) for featured snippet.
</QuickAnswer>

## Introduction

Your introduction here...

<ExpertQuote
  quote="Expert quote here"
  expert="Dr. Scholar Name"
  credentials="Professor of Religious Studies, University Name"
  source="Book or Article Title (2024)"
/>

## Main Content

...
```

### Article Checklist
- [ ] Proper frontmatter with all required fields
- [ ] SEO-optimized title and description
- [ ] QuickAnswer component for featured snippet
- [ ] Proper heading hierarchy (H2, H3, H4)
- [ ] At least 3 expert quotes with credentials
- [ ] Relevant internal links to other articles/teachings
- [ ] Citation for all research data and statistics
- [ ] Related articles component at end
- [ ] Schema.org markup via ArticleSchema component
- [ ] 3,000+ words for comprehensive coverage
- [ ] Proofread and grammar-checked

## 🔒 Security & Privacy

- **No Personal Data**: Don't include personal information in commits
- **Environment Variables**: Never commit `.env` files
- **API Keys**: Use environment variables for all credentials
- **Dependencies**: Keep packages updated for security patches
- **GDPR Compliance**: Ensure privacy-first analytics and no tracking

## 🤝 Community Guidelines

### Be Respectful
- Respect all religious traditions and their adherents
- Engage constructively in discussions and code reviews
- Assume good faith; clarify before criticizing
- Welcome newcomers and help them contribute

### Be Professional
- Focus on content quality and technical merit
- Avoid religious, political, or ideological debates
- Keep discussions relevant to project goals
- Accept feedback graciously

### Be Collaborative
- Share knowledge and help others learn
- Credit others' contributions
- Work together to resolve conflicts
- Build bridges, not walls

## 📧 Contact

- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Security**: Report security vulnerabilities privately
- **Content Review**: Email for scholarly review coordination

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You

Your contributions help build bridges between faiths and empower voices of peace. Together, we can counter extremism and promote understanding.

**Built with ❤️ for peace and interfaith understanding** 🕊️
