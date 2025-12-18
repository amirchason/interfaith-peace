#!/bin/bash

# Script to add Google Gemini Imagen 4 API key from clipboard to .env file
# Usage: ./scripts/add-imagen-key.sh

set -e

PROJECT_DIR="/data/data/com.termux/files/home/proj/peace"
ENV_FILE="$PROJECT_DIR/.env"
ENV_EXAMPLE="$PROJECT_DIR/.env.example"

echo "🎨 Imagen 4 API Key Setup Script"
echo "================================"
echo ""

# Check if termux-clipboard-get is available
if ! command -v termux-clipboard-get &> /dev/null; then
    echo "❌ Error: termux-clipboard-get not found"
    echo "   Please install termux-api: pkg install termux-api"
    exit 1
fi

# Get API key from clipboard
echo "📋 Reading API key from clipboard..."
API_KEY=$(termux-clipboard-get)

if [ -z "$API_KEY" ]; then
    echo "❌ Error: Clipboard is empty"
    echo "   Please copy your Imagen 4 API key first"
    exit 1
fi

# Trim whitespace
API_KEY=$(echo "$API_KEY" | tr -d '[:space:]')

echo "✅ Found API key in clipboard: ${API_KEY:0:20}..."
echo ""

# Check if .env exists, if not create from .env.example
if [ ! -f "$ENV_FILE" ]; then
    echo "📄 Creating .env file from .env.example..."
    if [ -f "$ENV_EXAMPLE" ]; then
        cp "$ENV_EXAMPLE" "$ENV_FILE"
        echo "✅ Created .env file"
    else
        echo "⚠️  .env.example not found, creating new .env file"
        touch "$ENV_FILE"
    fi
    echo ""
fi

# Check if key already exists
if grep -q "^GOOGLE_IMAGEN_API_KEY=" "$ENV_FILE"; then
    echo "⚠️  GOOGLE_IMAGEN_API_KEY already exists in .env"
    read -p "   Do you want to replace it? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        # Replace existing key
        sed -i "s|^GOOGLE_IMAGEN_API_KEY=.*|GOOGLE_IMAGEN_API_KEY=$API_KEY|" "$ENV_FILE"
        echo "✅ Updated GOOGLE_IMAGEN_API_KEY in .env"
    else
        echo "❌ Cancelled - no changes made"
        exit 0
    fi
else
    # Add new key
    echo "" >> "$ENV_FILE"
    echo "# Google Gemini Imagen 4 API Key" >> "$ENV_FILE"
    echo "GOOGLE_IMAGEN_API_KEY=$API_KEY" >> "$ENV_FILE"
    echo "✅ Added GOOGLE_IMAGEN_API_KEY to .env"
fi

echo ""
echo "🎉 Success! Imagen 4 API key configured"
echo ""
echo "Next steps:"
echo "  1. Install Gemini SDK: npm install @google/generative-ai"
echo "  2. Test the API key with: node scripts/test-imagen.js"
echo "  3. Generate images for teachings: node scripts/generate-images.js"
echo ""
