import axios from 'axios';

const NEWS_API_KEY = 'b32712083eac48669d729482a4ffd9d6';
const BASE_URL = 'https://newsapi.org/v2';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-Api-Key': NEWS_API_KEY,
  },
});

async function fetchFromApi(endpoint, params = {}) {
  try {
    const response = await api.get(`/${endpoint}`, { params });
    if (response.data.status === 'ok') {
      return response.data.articles || [];
    } else {
      console.warn('NewsAPI error:', response.data.message);
      return [];
    }
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    return [];
  }
}

export async function getNoticiasFutebol(pageSize = 10) {
  return fetchFromApi('everything', {
    q: 'futebol, brasil, jogador, copa do mundo',
    language: 'pt',
    pageSize,
  });
}

// Opcional: reutilizável com outros assuntos
export async function getNoticiasPorAssunto(assuntos = ['futebol'], pageSize = 10) {
  const query = assuntos.join(' OR ');
  return fetchFromApi('everything', {
    q: query,
    language: 'pt',
    pageSize,
  });
}
