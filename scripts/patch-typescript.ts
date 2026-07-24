import fs from 'fs';
import path from 'path';

const tsDir = path.join(process.cwd(), 'node_modules', 'typescript');
const tsLibDir = path.join(tsDir, 'lib');
const targetFile = path.join(tsLibDir, 'version.cjs');
const shimFile = path.join(tsLibDir, 'typescript.js');
const pkgFile = path.join(tsDir, 'package.json');

if (fs.existsSync(tsLibDir)) {
  const cjsPatchContent = `
const ts6 = require('@typescript/typescript6');

const ts = {
  ...ts6,
  version: "7.0.2",
  versionMajorMinor: "7.0",
};

ts.__esModule = true;
ts.default = ts;

module.exports = ts;
`;

  fs.writeFileSync(targetFile, cjsPatchContent);
  fs.writeFileSync(shimFile, cjsPatchContent);

  if (fs.existsSync(pkgFile)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf8'));
      delete pkg.type;
      pkg.main = "./lib/version.cjs";
      if (pkg.exports) {
        pkg.exports["."] = "./lib/version.cjs";
        pkg.exports["./lib/typescript.js"] = "./lib/version.cjs";
        pkg.exports["./lib/typescript"] = "./lib/version.cjs";
      }
      fs.writeFileSync(pkgFile, JSON.stringify(pkg, null, 2));
    } catch {}
  }
}
