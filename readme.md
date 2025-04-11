# MCP Server Guide

To build the MCP server, run:

```
npm install && npm run build
```

This will compile the typescript files and produce a build directory plus it will output the json you can copy/paste into your MCP client (Claude Desktop, Windsurf, Cursor, etc.)

If all things go well, this will produce an output similar to this:

```json
{
  "mcpServers": {
    "doordash": {
      "command": "node",
      "args": [
        "<thePathToYour>/build/index.js"
      ],
      "env": [
        {
          "DOORDASH_API_KEY": "<REPLACE>"
        }
      ]
    }
  }
}
```

## Support & Feedback
If things do not compile, or you have more advanced needs, please reach out to me at, jordan@daltonsolutions.com.

## Sharing

If you have found value in this service please share it on social media. You can tag me [@jordandalton](https://x.com/jordankdalton) on X, or [jdcarnivore](https://www.reddit.com/user/jdcarnivore) on Reddit.