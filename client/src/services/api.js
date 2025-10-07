const BASE_URL = (import.meta?.env?.VITE_API_URL || '').replace(/\/$/, '');

function buildUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${normalizedPath}`;
}

export async function getBooks(category) {
  const url = new URL(buildUrl('/api/books'));
  if (category && category !== 'all') {
    url.searchParams.set('category', category);
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch books');
  return res.json();
}



