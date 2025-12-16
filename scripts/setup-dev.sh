#!/bin/bash

# Yuvoo Development Environment Setup Script
# This script helps set up the development environment

set -e

echo "🚀 Yuvoo Development Environment Setup"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  .env.local already exists${NC}"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Keeping existing .env.local"
    else
        echo "Creating new .env.local from example..."
        cp .env.local.example .env.local
        echo -e "${GREEN}✅ Created .env.local${NC}"
    fi
else
    echo "Creating .env.local from example..."
    cp .env.local.example .env.local
    echo -e "${GREEN}✅ Created .env.local${NC}"
fi

echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Edit .env.local and configure the following services:"
echo ""
echo "   📊 Database (Neon Postgres):"
echo "      - Create account at https://console.neon.tech"
echo "      - Create a new project"
echo "      - Copy connection string to DATABASE_URL"
echo ""
echo "   🔐 Authentication (Stack Auth):"
echo "      - Create account at https://stack-auth.com/dashboard"
echo "      - Create a new project"
echo "      - Copy Project ID, Publishable Key, and Secret Key"
echo ""
echo "   🤖 OpenAI:"
echo "      - Create account at https://platform.openai.com"
echo "      - Create API key"
echo "      - Copy key to OPENAI_API_KEY"
echo ""
echo "   🖼️  Cloudinary:"
echo "      - Create account at https://console.cloudinary.com"
echo "      - Copy Cloud Name, API Key, and API Secret"
echo ""
echo "   📧 Brevo (Email):"
echo "      - Create account at https://www.brevo.com"
echo "      - Create API key (v3)"
echo "      - Verify sender email"
echo ""
echo "2. After configuring .env.local, run:"
echo "   npm run db:push    # Initialize database"
echo "   npm run db:seed    # (Optional) Seed sample data"
echo ""
echo "3. Test your setup:"
echo "   npx tsx src/lib/db/test-connection.ts   # Test database"
echo "   npx tsx src/lib/auth/test-auth.ts       # Test Stack Auth"
echo ""
echo "4. Start development server:"
echo "   npm run dev"
echo ""
echo -e "${GREEN}✅ Setup script complete!${NC}"
echo ""
echo "For detailed instructions, see: docs/DEVELOPMENT_SETUP_GUIDE.md"
