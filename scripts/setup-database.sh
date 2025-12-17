#!/bin/bash

# Yuvoo Database Setup Script
# This script helps set up the Neon database for development

set -e

echo "🗄️  Yuvoo Database Setup"
echo "========================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Load environment variables from .env.local if it exists
if [ -f ".env.local" ]; then
    export $(grep -v '^#' .env.local | xargs)
fi

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}❌ DATABASE_URL environment variable is not set${NC}"
    echo ""
    echo "Please:"
    echo "1. Create a Neon database at https://console.neon.tech"
    echo "2. Copy the connection string"
    echo "3. Add it to .env.local:"
    echo ""
    echo "   DATABASE_URL=\"postgresql://user:password@host:5432/yuvoo?sslmode=require\""
    echo ""
    echo "Then run this script again."
    exit 1
fi

echo -e "${GREEN}✅ DATABASE_URL is configured${NC}"
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  .env.local file not found${NC}"
    echo "Please create .env.local and add your DATABASE_URL"
    exit 1
fi

echo "📋 Database Setup Steps:"
echo ""
echo "1. Testing database connection..."
echo ""

# Test connection
if npx tsx src/lib/db/test-connection.ts 2>/dev/null; then
    echo -e "${GREEN}✅ Database connection successful!${NC}"
    echo ""
else
    echo -e "${RED}❌ Database connection failed${NC}"
    echo ""
    echo "Please check:"
    echo "- DATABASE_URL is correct in .env.local"
    echo "- Neon database is active (not paused)"
    echo "- Network connection is working"
    exit 1
fi

echo "2. Pushing schema to database..."
echo ""

# Push schema
if npm run db:push; then
    echo -e "${GREEN}✅ Schema pushed successfully!${NC}"
    echo ""
else
    echo -e "${RED}❌ Schema push failed${NC}"
    echo ""
    echo "Please check the error messages above"
    exit 1
fi

echo "3. Database setup complete!"
echo ""
echo -e "${BLUE}💡 Next steps:${NC}"
echo ""
echo "   Optional - Seed with sample data:"
echo "   npm run db:seed"
echo ""
echo "   Open Drizzle Studio (database GUI):"
echo "   npm run db:studio"
echo ""
echo "   View database in Neon Console:"
echo "   https://console.neon.tech"
echo ""
echo -e "${GREEN}✅ Database setup complete!${NC}"
