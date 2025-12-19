#!/usr/bin/env node
/**
 * List available models for this API key
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GOOGLE_IMAGEN_API_KEY || process.env.GEMINI_API_KEY;

async function listModels() {
  if (!API_KEY) {
    console.error('❌ ERROR: Missing API key');
    process.exit(1);
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);

    console.log('📋 Listing available models...\n');

    const models = await genAI.listModels();

    console.log(`Found ${models.length} models:\n`);

    models.forEach((model, index) => {
      console.log(`${index + 1}. ${model.name}`);
      console.log(`   Display Name: ${model.displayName}`);
      console.log(`   Description: ${model.description}`);
      console.log(`   Supported methods: ${model.supportedGenerationMethods?.join(', ') || 'N/A'}`);
      console.log('');
    });

    // Filter for image generation models
    const imageModels = models.filter(m =>
      m.name.toLowerCase().includes('imagen') ||
      m.description.toLowerCase().includes('image') ||
      m.supportedGenerationMethods?.includes('generateImage')
    );

    if (imageModels.length > 0) {
      console.log('\n🎨 Image generation models:');
      imageModels.forEach(model => {
        console.log(`   - ${model.name}`);
      });
    }

  } catch (error) {
    console.error('❌ ERROR:', error.message);
    process.exit(1);
  }
}

listModels();
