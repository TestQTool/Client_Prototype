export function readSecret(name, fallback = '') {
  return process.env[name] || fallback;
}
