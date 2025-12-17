#!/bin/bash

# Yuvoo Authentication Setup Script
# This script helps set up Stack Auth for development

set -e

echo "🔐 Yuvoo Authentication Setup"
echo "=============================="
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

# Check if Stack Auth environment variables are set
STACK_PROJECT_ID="$NEXT_PUBLIC_STACK_PROJECT_ID"
STACK_PUBLISHABLE_KEY="$NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY"
STACK_SECRET_KEY="$STACK_SECRET_SERVER_KEY"

if [ -z "$STACK_PROJECT_ID" ] || [ -z "$STACK_PUBLISHABLE_KEY" ] || [ -z "$STACK_SECRET_KEY" ]; then
    echo -e "${RED}❌ Stack Auth environment variables are not set${NC}"
    echo ""
    echo "Please:"
    echo "1. Create a Stack Auth project at https://stack-auth.com/dashboard"
    echo "2. Copy the following values:"
    echo "   - Project ID"
    echo "   - Publishable Client Key (starts with pk_)"
    echo "   - Secret Server Key (starts with sk_)"
    echo "3. Add them to .env.local:"
    echo ""
    echo "   NEXT_PUBLIC_STACK_PROJECT_ID=\"your-project-id\""
    echo "   NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=\"pk_...\""
    echo "   STACK_SECRET_SERVER_KEY=\"sk_...\""
    echo ""
    echo "4. Configure redirect URLs in Stack Auth dashboard:"
    echo "   - http://localhost:3000 (development)"
    echo "   - http://localhost:3000/auth/callback (development callback)"
    echo ""
    echo "Then run this script again."
    exit 1
fi

echo -e "${GREEN}✅ Stack Auth environment variables are configured${NC}"
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  .env.local file not found${NC}"
    echo "Please create .env.local and add your Stack Auth credentials"
    exit 1
fi

echo "📋 Authentication Setup Steps:"
echo ""
echo "1. Testing Stack Auth configuration..."
echo ""

# Test configuration
if npx tsx src/lib/auth/test-auth.ts 2>/dev/null; then
    echo -e "${GREEN}✅ Stack Auth configuration successful!${NC}"
    echo ""
else
    echo -e "${RED}❌ Stack Auth configuration failed${NC}"
    echo ""
    echo "Please check:"
    echo "- All three Stack Auth keys are correct in .env.local"
    echo "- Keys are not expired"
    echo "- Redirect URLs are configured in Stack Auth dashboard"
    echo "- No quotes around values in .env.local"
    exit 1
fi

echo "2. Authentication setup complete!"
echo ""
echo -e "${BLUE}💡 Next steps:${NC}"
echo ""
echo "   Test authentication flow:"
echo "   1. Start dev server: npm run dev"
echo "   2. Navigate to /auth/register"
echo "   3. Create a test account"
echo "   4. Verify email confirmation flow"
echo "   5. Test login at /auth/login"
echo ""
echo "   View Stack Auth dashboard:"
echo "   https://stack-auth.com/dashboard"
echo ""
echo -e "${GREEN}✅ Authentication setup complete!${NC}"
