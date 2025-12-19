#!/usr/bin/env node
/**
 * Imagen 4 API Connection Test
 * Simple test to verify Imagen 4 API and API key are working
 */

import { GoogleGenAI } from '@google/genai';
import * as fs from 'node:fs';

const API_KEY = process.env.GOOGLE_IMAGEN_API_KEY || process.env.GEMINI_IMAGEN_4_API_KEY || process.env.GEMINI_API_KEY;

async function testConnection() {
  console.log('🧪 Testing Imagen 4 API Connection');
  console.log('=' .repeat(60));

  // Check API key
  if (!API_KEY) {
    console.error('❌ ERROR: Missing API key');
    console.log('\nPlease set one of these environment variables:');
    console.log('  - GOOGLE_IMAGEN_API_KEY');
    console.log('  - GEMINI_IMAGEN_4_API_KEY');
    console.log('  - GEMINI_API_KEY');
    console.log('\nExample:');
    console.log('  export GOOGLE_IMAGEN_API_KEY="your-api-key-here"');
    process.exit(1);
  }

  console.log('✅ API key found');
  console.log(`   Key: ${API_KEY.substring(0, 10)}...${API_KEY.substring(API_KEY.length - 5)}`);

  try {
    console.log('\n📡 Initializing Google Imagen AI...');
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    console.log('✅ SDK initialized successfully');

    console.log('\n🎨 Testing image generation with Imagen 4...');
    console.log('   Model: imagen-4.0-generate-001');

    console.log('\n🖼️  Generating test image (simple peace symbol)...');
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: 'A simple, peaceful dove carrying an olive branch. Minimalist style, white background, symbolic, professional.',
      config: {
        numberOfImages: 1,
      },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new Error('No images generated');
    }

    const generatedImage = response.generatedImages[0];
    const imgBytes = generatedImage.image.imageBytes;
    const buffer = Buffer.from(imgBytes, 'base64');

    // Save test image
    const outputPath = 'test-imagen-output.png';
    fs.writeFileSync(outputPath, buffer);

    console.log('✅ Test image generated successfully!');
    console.log(`   Image size: ${(buffer.length / 1024).toFixed(2)} KB`);
    console.log(`   Saved to: ${outputPath}`);

    console.log('\n' + '='.repeat(60));
    console.log('🎉 SUCCESS: Imagen 4 API is working!');
    console.log('=' .repeat(60));
    console.log('\nYou can now run:');
    console.log('  node generate-homepage-images.mjs');
    console.log('  node generate-article-images.mjs');

    return true;

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);

    if (error.stack) {
      console.error('\nStack trace:');
      console.error(error.stack);
    }

    if (error.message.includes('API key')) {
      console.log('\n💡 Tip: Verify your API key is valid at:');
      console.log('   https://aistudio.google.com/app/apikey');
    } else if (error.message.includes('model') || error.message.includes('404')) {
      console.log('\n💡 Tip: Imagen 4 may not be enabled for your API key');
      console.log('   Visit Google AI Studio to enable Imagen 4');
    } else if (error.message.includes('quota') || error.message.includes('rate')) {
      console.log('\n💡 Tip: You may have hit rate limits. Wait a moment and try again.');
    }

    console.log('\n📖 Documentation:');
    console.log('   https://ai.google.dev/gemini-api/docs/imagen');

    process.exit(1);
  }
}

// Run test
testConnection();
