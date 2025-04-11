import path from 'path';
import fs from 'fs';

const filePath = path.join(process.cwd(), 'build', 'index.js');

// look for any env variables inside the file
const env = {};

// Read the file
const fileContent = fs.readFileSync(filePath, 'utf-8');

// Find all env variables
const envRegex = /process\.env\.(\w+)/g;
let match;
while ((match = envRegex.exec(fileContent)) !== null) {
    const row = { [match[1]]: '<REPLACE>' };
    Object.assign(env, row);
}

const structure = {
    mcpServers : {
        "doordash" : {
            command : "node",
            args : [filePath],
            env : env
        }
    }
}

console.log('Copy/Paste into your MCP client:');
console.log(
    JSON.stringify(structure, null, 2)
);
