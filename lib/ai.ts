import api from './api';

interface AIResponse {
  message: string;
}

export const sendQueryToAI = async (query: string): Promise<AIResponse> => {
  try {
    const response = await api.post<AIResponse>('/ai', { query });
    return response.data;
  } catch (error) {
    console.error('AI query error:', error);
    throw error;
  }
}; 