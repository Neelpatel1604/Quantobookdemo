/**
 * AI service for QuantoBooks
 */

interface AIConfig {
  apiKey?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

// Default AI configuration
const aiConfig: AIConfig = {
  apiKey: process.env.NEXT_PUBLIC_PERPLEXITY_API_KEY || '',
  model: 'sonar', // Perplexity model
  temperature: 0.7,
  maxTokens: 500
};

// Function to send a query to AI
export async function sendQueryToAI(query: string): Promise<{ message: string }> {
  if (!query) {
    throw new Error('Query is required');
  }

  try {
    // Send request to the internal API route
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        config: aiConfig
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (!data || !data.message) {
      throw new Error('Invalid response from AI service');
    }

    return data;
  } catch (error) {
    console.error('Error in AI service:', error);
    throw error;
  }
} 