# MCP (Model Context Protocol) Setup

This document describes the MCP server configurations for the Yuvoo project.

## Next.js DevTools MCP

The Next.js DevTools MCP server provides enhanced development tools and debugging capabilities for Next.js applications.

### Configuration

Add the following configuration to your MCP client (e.g., Cursor, Claude Desktop):

```json
{
  "mcpServers": {
    "next-devtools": {
      "command": "npx",
      "args": ["-y", "next-devtools-mcp@latest"]
    }
  }
}
```

### Setup Instructions

#### For Cursor IDE

1. Open Cursor Settings
2. Navigate to MCP Settings (or search for "MCP" in settings)
3. Add the `next-devtools` server configuration as shown above
4. Restart Cursor to apply changes

#### For Claude Desktop

1. Open Claude Desktop Settings
2. Navigate to Developer Settings
3. Edit the MCP configuration file
4. Add the `next-devtools` server configuration
5. Restart Claude Desktop

### Package Information

- **Package**: [next-devtools-mcp](https://www.npmjs.com/package/next-devtools-mcp)
- **Command**: `npx -y next-devtools-mcp@latest`
- **Purpose**: Provides Next.js development tools and debugging capabilities via MCP

### Features

The Next.js DevTools MCP server enables:

- Enhanced debugging capabilities
- Development tooling integration
- Real-time development insights
- Performance monitoring

### Verification

After configuration, you should see the `next-devtools` MCP server available in your MCP client. The server will automatically start when needed using `npx`.

### Notes

- The `-y` flag automatically accepts the package installation prompt
- The `@latest` tag ensures you always get the most recent version
- The server runs on-demand and doesn't require manual installation
