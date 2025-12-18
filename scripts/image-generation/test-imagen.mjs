#!/usr/bin/env node
/**
 * Imagen 4 API Connection Test
 * Simple test to verify Google Generative AI SDK and API key are working
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GOOGLE_IMAGEN_API_KEY || process.env.GEMINI_API_KEY;

async function testConnection() {
  console.log('🧪 Testing Imagen 4 API Connection');
  console.log('=' .repeat(60));

  // Check API key
  if (!API_KEY) {
    console.error('❌ ERROR: Missing API key');
    console.log('\nPlease set one of these environment variables:');
    console.log('  - GOOGLE_IMAGEN_API_KEY');
    console.log('  - GEMINI_API_KEY');
    console.log('\nExample:');
    console.log('  export GOOGLE_IMAGEN_API_KEY="your-api-key-here"');
    process.exit(1);
  }

  console.log('✅ API key found');
  console.log(`   Key: ${API_KEY.substring(0, 10)}...${API_KEY.substring(API_KEY.length - 5)}`);

  try {
    console.log('\n📡 Initializing Google Generative AI...');
    const genAI = new GoogleGenerativeAI(API_KEY);

    console.log('✅ SDK initialized successfully');

    console.log('\n🎨 Testing image generation model...');
    const model = genAI.getGenerativeModel({ model: 'imagen-3.0-generate-001' });

    console.log('✅ Model loaded: imagen-3.0-generate-001');

    console.log('\n🖼️  Generating test image (simple peace symbol)...');
    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          text: 'A simple, peaceful dove carrying an olive branch. Minimalist style, white background, symbolic, professional.'
        }]
      }],
      generationConfig: {
        aspectRatio: '1:1',
        numberOfImages: 1,
      }
    });

    const response = await result.response;

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error('No image candidates returned');
    }

    const imageData = response.candidates[0].content.parts[0].inlineData;

    if (!imageData || !imageData.data) {
      throw new Error('No image data in response');
    }

    const imageSize = Buffer.from(imageData.data, 'base64').length;

    console.log('✅ Test image generated successfully!');
    console.log(`   Image size: ${(imageSize / 1024).toFixed(2)} KB`);
    console.log(`   MIME type: ${imageData.mimeType}`);

    console.log('\n' + '='.repeat(60));
    console.log('🎉 SUCCESS: Imagen 4 API is working!');
    console.log('=' .repeat(60));
    console.log('\nYou can now run:');
    console.log('  node generate-article-images.mjs');

    return true;

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);

    if (error.message.includes('API key')) {
      console.log('\n💡 Tip: Verify your API key is valid at:');
      console.log('   https://makersuite.google.com/app/apikey');
    } else if (error.message.includes('model')) {
      console.log('\n💡 Tip: Check if Imagen 3.0 is available in your region/account');
      console.log('   Some models may require enabling in Google AI Studio');
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
