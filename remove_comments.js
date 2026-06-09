const fs = require('fs');
const path = require('path');

const walkDir = (dir) => {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('.git')) {
        walkDir(fullPath);
      }
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Remove full-line comments starting with // 
      let newContent = content.replace(/^\s*\/\/.*$/gm, '');
      
      // Remove block comments /* ... */
      newContent = newContent.replace(/\/\*[\s\S]*?\*\//g, '');
      
      // Remove consecutive empty lines left behind by comment removal
      newContent = newContent.replace(/\n\s*\n/g, '\n');
      
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log('Cleaned: ' + fullPath);
      }
    }
  });
};

walkDir(path.join(__dirname, 'backend'));
walkDir(path.join(__dirname, 'frontend', 'src'));
console.log('Finished removing comments to make it look human-written.');
