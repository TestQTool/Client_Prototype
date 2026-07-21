import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'package.json', 'playwright.config.js', 'playwright.framework.config.js',
  'config/environment.js', 'core/BasePage.js', 'fixtures/test.js',
  'pageObjects/.gitkeep', 'tests/.gitkeep', 'utils/secrets.js',
  'framework-tests/fixtures/test.js',
  'framework-tests/pageObjects/HealthPage.js',
  'framework-tests/framework-health.test.js'
];

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) throw new Error(`Missing required files:\n${missing.join('\n')}`);

const scanRoots = ['config', 'core', 'fixtures', 'pageObjects', 'tests', 'utils', 'framework-tests'];
const findings = [];

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

for (const scanRoot of scanRoots) {
  const files = walk(path.join(root, scanRoot)).filter((file) => file.endsWith('.js'));
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    if (/https?:\/\//i.test(content)) findings.push(`${path.relative(root, file)} contains a full URL`);
    if (/(password|token|api[_-]?key)\s*[:=]\s*['"][^'"]+['"]/i.test(content)) {
      findings.push(`${path.relative(root, file)} may contain a hardcoded secret`);
    }
  }
}
if (findings.length) throw new Error(findings.join('\n'));

console.log('Hybrid framework validation passed.');
