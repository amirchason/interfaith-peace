# Imagen 4 Article Hero Image Generator

Automated generation of hero images for peace website articles using Google's Imagen 4 AI.

## 🎨 Features

- **Automated Generation**: Creates hero images for all articles
- **Religion-Specific Colors**: Uses project color scheme
- **Interfaith Sensitivity**: Respectful, symbolic representations
- **Optimized Output**: 1200x630px (social media optimized)
- **High Quality**: Professional, web-optimized images

## 📋 Prerequisites

1. **Node.js 20+** installed
2. **Google Generative AI API Key** (Gemini/Imagen access)
3. **Dependencies installed** (`npm install` in this directory)

## 🚀 Setup

### 1. Get API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Enable Imagen 4 access (may require project billing)

### 2. Set Environment Variable

```bash
# Option 1: Export in terminal
export GOOGLE_IMAGEN_API_KEY="your-api-key-here"

# Option 2: Add to .env file in project root
echo "GOOGLE_IMAGEN_API_KEY=your-api-key-here" >> ../../.env

# Option 3: Use GEMINI_API_KEY (alternative)
export GEMINI_API_KEY="your-api-key-here"
```

### 3. Test Connection

```bash
node test-imagen.mjs
```

Expected output:
```
✅ API key found
✅ SDK initialized successfully
✅ Model loaded: imagen-3.0-generate-001
✅ Test image generated successfully!
🎉 SUCCESS: Imagen 4 API is working!
```

## 🖼️ Generate Images

### Generate All Article Images

```bash
node generate-article-images.mjs
```

This will:
1. Generate hero images for all configured articles
2. Save images to `public/images/articles/`
3. Name files as `{article-slug}-hero.png`
4. Show progress and summary

### Generated Images

The script generates images for these articles:
- `what-is-religious-extremism-hero.png`
- `belief-spectrum-moderate-extremist-hero.png`
- `how-extremists-recruit-hero.png`
- `root-causes-religious-extremism-hero.png`
- `psychology-of-extremism-hero.png`

## 📐 Image Specifications

- **Dimensions**: 1200x630px (16:9 aspect ratio)
- **Format**: PNG
- **Size**: ~100-300 KB per image
- **Style**: Symbolic, peaceful, interfaith, professional
- **Usage**: Article hero images, social media cards

## 🎨 Article Configurations

Each article has:
- **Slug**: Article filename/URL
- **Religion**: Color scheme to use
- **Prompt**: AI generation instructions

Example:
```javascript
{
  slug: 'what-is-religious-extremism',
  religion: 'interfaith',
  prompt: 'A symbolic split image showing contrast...',
}
```

## ✏️ Adding New Articles

Edit `generate-article-images.mjs` and add to `ARTICLES` array:

```javascript
{
  slug: 'your-article-slug',
  religion: 'christianity', // or islam, hinduism, buddhism, judaism, interfaith
  prompt: 'Detailed prompt for image generation...',
}
```

## 🔧 Troubleshooting

### ❌ "Missing API key"
**Solution**: Set `GOOGLE_IMAGEN_API_KEY` or `GEMINI_API_KEY` environment variable

### ❌ "Model not found"
**Solution**:
- Check if Imagen 3.0 is available in your region
- Try model name: `imagen-3.0-generate-001` or `gemini-1.5-pro-vision`
- Enable Imagen in Google AI Studio settings

### ❌ "Quota exceeded"
**Solution**:
- Wait before retrying (rate limits)
- Check your Google Cloud billing account
- Reduce number of images generated at once

### ❌ "Image quality issues"
**Solution**:
- Refine prompts in `ARTICLES` configuration
- Add more specific style instructions
- Regenerate individual images by modifying script

## 💰 Cost Estimate

**Imagen 4 Pricing** (as of Dec 2024):
- ~$0.04 per image (standard quality)
- 5 articles = ~$0.20 per generation run
- Free tier: Check Google AI Studio for current limits

## 📊 Rate Limiting

The script includes automatic rate limiting:
- 2 seconds between requests
- Prevents API throttling
- Total time: ~10-15 seconds for 5 images

## 🔐 Security

**NEVER commit API keys to git!**

- API keys are in `.env` (already in `.gitignore`)
- Use environment variables in production
- Rotate keys if accidentally exposed

## 📚 Resources

- [Google Generative AI Docs](https://ai.google.dev/gemini-api/docs)
- [Imagen 4 Documentation](https://ai.google.dev/gemini-api/docs/imagen)
- [Google AI Studio](https://makersuite.google.com/)

## 🛠️ Maintenance

### Regenerate All Images
```bash
rm ../../public/images/articles/*-hero.png
node generate-article-images.mjs
```

### Regenerate Single Image
Modify `ARTICLES` array to include only desired article, then run script.

### Update Prompts
Edit prompts in `ARTICLES` configuration and regenerate.

---

**Generated with Claude Code** 🕊️
**Part of ULTRATHINK Phase 2** ⚡
