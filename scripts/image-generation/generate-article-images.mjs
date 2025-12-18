#!/usr/bin/env node
/**
 * Imagen 4 Article Hero Image Generator
 * Generates hero images for peace website articles using Google's Imagen 4
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const API_KEY = process.env.GOOGLE_IMAGEN_API_KEY || process.env.GEMINI_API_KEY;
const OUTPUT_DIR = path.join(__dirname, '../../public/images/articles');

// Religion-specific color schemes
const RELIGION_COLORS = {
  christianity: { primary: '#4A90E2', secondary: '#5FA3E8' },
  islam: { primary: '#2ECC71', secondary: '#52D885' },
  hinduism: { primary: '#F39C12', secondary: '#F5A936' },
  buddhism: { primary: '#9B59B6', secondary: '#A76DBD' },
  judaism: { primary: '#3498DB', secondary: '#4BA3E2' },
  interfaith: { primary: '#95A5A6', secondary: '#A8B5B7' },
};

// Article configurations for image generation
const ARTICLES = [
  {
    slug: 'what-is-religious-extremism',
    religion: 'interfaith',
    prompt: 'A symbolic split image showing contrast between extremism and moderation: On left, dark stormy chaos with broken symbols; On right, peaceful harmony with intact diverse religious symbols (cross, crescent, om, star of David, dharma wheel) glowing softly. Gradient transition in center from dark to light. Peaceful, educational, interfaith, balanced composition.',
  },
  {
    slug: 'belief-spectrum-moderate-extremist',
    religion: 'interfaith',
    prompt: 'A horizontal spectrum visualization showing gradient from far left (secular) through center (moderate) to far right (extremist). Center glows with peaceful light. Multiple religious symbols arranged along spectrum. Abstract, infographic-style, educational, peaceful gradient colors.',
  },
  {
    slug: 'how-extremists-recruit',
    religion: 'interfaith',
    prompt: 'A protective shield made of diverse hands holding each other, forming a barrier. Behind shield, silhouettes of diverse people (youth, families) safe and peaceful. Dark shadowy figures trying to reach them but blocked. Protective, hopeful, community-focused, warm lighting.',
  },
  {
    slug: 'root-causes-religious-extremism',
    religion: 'interfaith',
    prompt: 'A tree with tangled dark roots underground (labeled: poverty, trauma, politics, ideology) and healthy green branches above ground with diverse religious symbols as leaves (cross, crescent, om, star, wheel). Roots in shadow, branches in light. Educational, analytical, hope emerging from understanding.',
  },
  {
    slug: 'psychology-of-extremism',
    religion: 'interfaith',
    prompt: 'A silhouette of a human head with intricate gears, puzzle pieces, and pathways inside showing psychological complexity. Some areas dark (trauma, bias), others light (empathy, understanding). Brain pathways glowing with neural connections. Scientific, compassionate, educational psychology visualization.',
  },
];

/**
 * Initialize Google Generative AI
 */
function initializeAI() {
  if (!API_KEY) {
    throw new Error(
      'Missing API key. Set GOOGLE_IMAGEN_API_KEY or GEMINI_API_KEY environment variable.'
    );
  }

  return new GoogleGenerativeAI(API_KEY);
}

/**
 * Generate image using Imagen 4
 */
async function generateImage(genAI, article) {
  console.log(`\n🎨 Generating image for: ${article.slug}`);
  console.log(`   Religion: ${article.religion}`);
  console.log(`   Prompt: ${article.prompt.substring(0, 100)}...`);

  try {
    const model = genAI.getGenerativeModel({ model: 'imagen-3.0-generate-001' });

    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          text: `Create a professional hero image for a peace website article.

Style: Modern, peaceful, interfaith harmony, educational
Dimensions: 1200x630px (social media optimized)
Colors: ${RELIGION_COLORS[article.religion].primary}, ${RELIGION_COLORS[article.religion].secondary}
Quality: High-quality, professional, symbolic

${article.prompt}

REQUIREMENTS:
- No text or words in image
- Peaceful and respectful representation
- Suitable for interfaith audience
- Professional website hero image quality
- Symbolic rather than literal
- Optimized for web (not too busy)`
        }]
      }],
      generationConfig: {
        aspectRatio: '16:9',
        numberOfImages: 1,
        safetySettings: {
          harmCategory: 'HARM_CATEGORY_VIOLENCE',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        }
      }
    });

    // Extract image data
    const response = await result.response;
    const imageData = response.candidates[0].content.parts[0].inlineData;

    if (!imageData || !imageData.data) {
      throw new Error('No image data received from API');
    }

    return {
      data: Buffer.from(imageData.data, 'base64'),
      mimeType: imageData.mimeType || 'image/png'
    };

  } catch (error) {
    console.error(`   ❌ Error generating image: ${error.message}`);
    throw error;
  }
}

/**
 * Save image to file
 */
async function saveImage(imageBuffer, article) {
  const extension = 'png'; // Imagen typically returns PNG
  const filename = `${article.slug}-hero.${extension}`;
  const filepath = path.join(OUTPUT_DIR, filename);

  // Ensure output directory exists
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  // Save image
  await fs.writeFile(filepath, imageBuffer);

  console.log(`   ✅ Saved: ${filename} (${(imageBuffer.length / 1024).toFixed(2)} KB)`);

  return filepath;
}

/**
 * Generate all article images
 */
async function generateAllImages() {
  console.log('🚀 Imagen 4 Article Hero Image Generator');
  console.log('=' .repeat(60));

  const genAI = initializeAI();
  const results = {
    success: [],
    failed: [],
  };

  for (const article of ARTICLES) {
    try {
      const image = await generateImage(genAI, article);
      const filepath = await saveImage(image.data, article);
      results.success.push({ article: article.slug, filepath });

      // Rate limiting: wait 2 seconds between requests
      await new Promise(resolve => setTimeout(resolve, 2000));

    } catch (error) {
      results.failed.push({ article: article.slug, error: error.message });
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 GENERATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Success: ${results.success.length}/${ARTICLES.length}`);
  console.log(`❌ Failed: ${results.failed.length}/${ARTICLES.length}`);

  if (results.failed.length > 0) {
    console.log('\n❌ FAILED IMAGES:');
    results.failed.forEach(({ article, error }) => {
      console.log(`   - ${article}: ${error}`);
    });
  }

  if (results.success.length > 0) {
    console.log('\n✅ GENERATED IMAGES:');
    results.success.forEach(({ article, filepath }) => {
      console.log(`   - ${article}`);
      console.log(`     ${filepath}`);
    });
  }

  return results;
}

/**
 * Main execution
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAllImages()
    .then(results => {
      if (results.failed.length > 0) {
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('\n❌ FATAL ERROR:', error.message);
      process.exit(1);
    });
}

export { generateAllImages, generateImage, ARTICLES };
