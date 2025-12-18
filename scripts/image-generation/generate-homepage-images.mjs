#!/usr/bin/env node
/**
 * Imagen 4 Homepage Hero & Banner Generator
 * Generates stunning hero images and banners for homepage redesign
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const API_KEY = process.env.GOOGLE_IMAGEN_API_KEY || process.env.GEMINI_API_KEY;
const OUTPUT_DIR = path.join(__dirname, '../../public/images/homepage');

// Homepage image configurations
const HOMEPAGE_IMAGES = [
  {
    name: 'hero-main',
    prompt: `A breathtaking panoramic scene of diverse people from different cultures and religions standing together in a circle of peace. Shot from above, showing 5 distinct groups: Christians with crosses, Muslims with crescents, Hindus with om symbols, Buddhists with dharma wheels, and Jews with stars of David, all holding hands forming a perfect circle. Golden hour lighting, ethereal glow, floating dove symbols, olive branches, soft gradient sky from deep blue to warm gold. Ultra-realistic, cinematic, 8K quality, professional photography style, warm and hopeful atmosphere. Diverse ethnicities, traditional garments in vibrant colors, peaceful expressions, unity and harmony theme.`,
    aspectRatio: '16:9',
  },
  {
    name: 'banner-interfaith-unity',
    prompt: `Abstract geometric composition representing interfaith unity: Five overlapping translucent circles in religion-specific colors (blue for Christianity, green for Islam, saffron for Hinduism, purple for Buddhism, light blue for Judaism) merging into a radiant white center. Subtle religious symbols integrated as elegant line art. Smooth gradients, modern minimalist style, floating particles of light, ethereal glow effects, professional graphic design. Clean, inspiring, hopeful mood. 8K resolution, suitable for web banner.`,
    aspectRatio: '21:9',
  },
  {
    name: 'feature-teachings',
    prompt: `An ancient illuminated manuscript open on an ornate wooden table, showing beautiful calligraphy from multiple sacred texts (Bible, Quran, Bhagavad Gita, Torah, Buddhist sutras) with gold leaf decorations. Soft candlelight, warm amber glow, shallow depth of field, professional book photography. Symbols of peace: dove, olive branch, lotus flower subtly placed. Rich textures, leather binding, aged parchment. Cozy, scholarly, reverent atmosphere. Ultra-realistic, 8K quality.`,
    aspectRatio: '4:3',
  },
  {
    name: 'feature-community',
    prompt: `A vibrant community gathering in a modern interfaith center: Diverse people of all ages and religions sitting in circles, engaging in dialogue, smiling and sharing food. Natural light streaming through large windows, contemporary architecture with religious symbols from all faiths displayed respectfully on walls. Children playing together in background, elderly sharing wisdom, youth listening. Warm, welcoming colors, professional event photography style, authentic human connection, joyful atmosphere. 8K resolution, photojournalistic style.`,
    aspectRatio: '16:9',
  },
  {
    name: 'feature-peace-symbol',
    prompt: `A stunning 3D render of a peace symbol made entirely of flowing, interconnected ribbons in five colors (blue, green, saffron, purple, light blue) representing different faiths. Each ribbon contains subtle textures of sacred patterns. Floating in ethereal space with soft bokeh background, dramatic lighting from above, gentle shadows, particles of light dancing around. Modern, abstract, artistic style. Glass-like translucent material, smooth surfaces, professional 3D visualization. 8K quality, suitable for website feature card.`,
    aspectRatio: '1:1',
  },
  {
    name: 'cta-background',
    prompt: `Abstract gradient background perfect for call-to-action section: Smooth flowing waves of color transitioning from deep indigo through purple, pink, and warm gold. Subtle texture overlay, soft bokeh particles, ethereal light rays, professional web design aesthetic. Calming yet energizing, optimistic and inspiring mood. No text, pure abstract composition. 8K resolution, modern gradient design, suitable for website banner background.`,
    aspectRatio: '21:9',
  },
  {
    name: 'stats-background',
    prompt: `Minimalist abstract composition: Soft, blurred circles of light in interfaith colors (blue, green, saffron, purple, light blue) on a clean gradient background from soft white to pale gray. Subtle geometric patterns, delicate grid lines, modern infographic style. Professional, clean, corporate aesthetic. Perfect for statistics/numbers overlay. 8K resolution, ultra-clean design.`,
    aspectRatio: '16:9',
  },
  {
    name: 'testimonial-pattern',
    prompt: `Elegant repeating pattern of small, minimalist peace symbols, religious icons, and geometric shapes in soft pastel colors. Islamic geometric patterns, Christian crosses, Hindu mandalas, Buddhist endless knots, Jewish stars - all simplified and harmoniously integrated. Subtle, barely visible texture, perfect for background pattern. Modern flat design, professional web texture. Seamless tileable pattern, 8K resolution.`,
    aspectRatio: '1:1',
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
async function generateImage(genAI, imageConfig) {
  console.log(`\n🎨 Generating: ${imageConfig.name}`);
  console.log(`   Aspect Ratio: ${imageConfig.aspectRatio}`);
  console.log(`   Prompt: ${imageConfig.prompt.substring(0, 100)}...`);

  try {
    const model = genAI.getGenerativeModel({ model: 'imagen-3.0-generate-001' });

    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          text: `Create a stunning, professional-quality image for a peace and interfaith website.

**Style Requirements:**
- Ultra-realistic OR modern abstract (depending on subject)
- Professional photography/design quality
- Suitable for premium website
- Optimized for web display
- No text or watermarks

**Technical Requirements:**
- High resolution (suitable for web)
- Sharp, clear, well-composed
- Proper lighting and color balance
- Web-optimized quality

**Mood:**
- Peaceful, harmonious, hopeful
- Warm and welcoming
- Professional and respectful
- Inspiring and uplifting

**Subject:**
${imageConfig.prompt}`
        }]
      }],
      generationConfig: {
        aspectRatio: imageConfig.aspectRatio,
        numberOfImages: 1,
        safetySettings: {
          harmCategory: 'HARM_CATEGORY_VIOLENCE',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        }
      }
    });

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
    console.error(`   ❌ Error: ${error.message}`);
    throw error;
  }
}

/**
 * Save image to file
 */
async function saveImage(imageBuffer, imageConfig) {
  const extension = 'png';
  const filename = `${imageConfig.name}.${extension}`;
  const filepath = path.join(OUTPUT_DIR, filename);

  // Ensure output directory exists
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  // Save image
  await fs.writeFile(filepath, imageBuffer);

  const sizeKB = (imageBuffer.length / 1024).toFixed(2);
  console.log(`   ✅ Saved: ${filename} (${sizeKB} KB)`);

  return filepath;
}

/**
 * Generate all homepage images
 */
async function generateAllImages() {
  console.log('🚀 Imagen 4 Homepage Image Generator');
  console.log('=' .repeat(70));
  console.log(`📊 Generating ${HOMEPAGE_IMAGES.length} images for homepage redesign`);
  console.log('=' .repeat(70));

  const genAI = initializeAI();
  const results = {
    success: [],
    failed: [],
  };

  for (const imageConfig of HOMEPAGE_IMAGES) {
    try {
      const image = await generateImage(genAI, imageConfig);
      const filepath = await saveImage(image.data, imageConfig);
      results.success.push({ name: imageConfig.name, filepath });

      // Rate limiting: wait 3 seconds between requests
      console.log('   ⏳ Waiting 3s before next request...');
      await new Promise(resolve => setTimeout(resolve, 3000));

    } catch (error) {
      results.failed.push({ name: imageConfig.name, error: error.message });
    }
  }

  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('📊 GENERATION SUMMARY');
  console.log('='.repeat(70));
  console.log(`✅ Success: ${results.success.length}/${HOMEPAGE_IMAGES.length}`);
  console.log(`❌ Failed: ${results.failed.length}/${HOMEPAGE_IMAGES.length}`);

  if (results.failed.length > 0) {
    console.log('\n❌ FAILED IMAGES:');
    results.failed.forEach(({ name, error }) => {
      console.log(`   - ${name}: ${error}`);
    });
  }

  if (results.success.length > 0) {
    console.log('\n✅ GENERATED IMAGES:');
    results.success.forEach(({ name, filepath }) => {
      console.log(`   - ${name}`);
      console.log(`     ${filepath}`);
    });
    console.log('\n🎉 Images ready for homepage redesign!');
    console.log('📁 Location: public/images/homepage/');
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

export { generateAllImages, generateImage, HOMEPAGE_IMAGES };
