import { NextRequest, NextResponse } from 'next/server';

// Check if the API key is set
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

export async function POST(request: NextRequest): Promise<Response> {
  try {
    // Parse and validate request body
    const body = await request.json().catch(() => ({}));
    const { query, config } = body;
    
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid query parameter' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!PERPLEXITY_API_KEY) {
      console.warn('Perplexity API key not configured. Using mock responses.');
      return handleMockResponse(query);
    }
    
    // Make a real call to Perplexity API
    try {
      const perplexityResponse = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
        },
        body: JSON.stringify({
          model: config?.model || 'sonar',
          messages: [
            { 
              role: 'system', 
              content: `You are a financial assistant for bookkeeping called QuantoBooks AI. 

1. DO NOT cite sources, references, or numbered citations in your responses.
2. DO NOT include phrases like "based on the search results" or "according to the information provided".
3. Format your responses in a clean, professional style using Markdown:
   - Use **bold** for important terms and headers
   - Use bullet points (* item) or numbered lists (1. item) for multiple points
   - Keep paragraphs short (2-3 sentences maximum)
   - Use line breaks between paragraphs for readability
4. Avoid adding citations like [1], [2], or [source] at the end of sentences.
5. Speak with authority and confidence about financial topics.
6. Always provide actionable advice when appropriate.
7. Use professional financial terminology but explain complex concepts simply.
8. Keep sentences concise and avoid long, complex explanations.` 
            },
            { role: 'user', content: query }
          ],
          temperature: config?.temperature || 0.7,
          max_tokens: config?.maxTokens || 500
        })
      });

      const data = await perplexityResponse.json();
      
      if (!perplexityResponse.ok) {
        console.error('Perplexity API error:', data);
        throw new Error(data.error?.message || 'Error calling Perplexity API');
      }
      
      let message = data.choices[0]?.message?.content || 'No response from AI';
      
      // Post-process the message to remove citations and clean up formatting
      message = cleanupAIResponse(message);
      
      return NextResponse.json({ message }, { status: 200 });
    } catch (apiError) {
      console.error('Perplexity API call failed:', apiError);
      // Fallback to mock responses if API call fails
      return handleMockResponse(query);
    }
    
  } catch (error) {
    console.error('AI processing error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { error: 'Failed to process your request', details: errorMessage },
      { status: 500 }
    );
  }
}

// Function to handle mock responses for testing
function handleMockResponse(query: string): Promise<Response> {
  // Simulate a delay to mimic API processing time
  return new Promise((resolve) => {
    setTimeout(() => {
      let response = '';
      
      // Simple responses for common queries
      if (query.toLowerCase().includes('reconciliation')) {
        response = "Bank reconciliation is the process of matching your books against your bank statements. I can help you identify discrepancies and suggest adjustments. Would you like me to analyze your latest bank statement?";
      } else if (query.toLowerCase().includes('discrepancy')) {
        response = "I've detected 3 cash discrepancies in your recent transactions:\n\n1. Invoice #1089 - Expected: $1,250.00, Received: $1,200.00 (-$50.00)\n2. Payment #4502 - Expected: $3,720.50, Recorded: $3,270.50 (-$450.00)\n3. Refund #782 - Expected: $129.99, Processed: $0.00 (-$129.99)\n\nWould you like me to suggest correction entries?";
      } else if (query.toLowerCase().includes('expense') || query.toLowerCase().includes('cost')) {
        response = "Your top expense categories for this quarter are:\n\n1. Product Inventory: $42,500 (45%)\n2. Marketing & Advertising: $15,300 (16%)\n3. Shipping & Fulfillment: $12,200 (13%)\n4. Software Subscriptions: $8,700 (9%)\n5. Office Expenses: $5,400 (6%)\n\nYour shipping costs have increased 7.5% compared to last quarter. Would you like recommendations to reduce these expenses?";
      } else if (query.toLowerCase().includes('revenue') || query.toLowerCase().includes('sales')) {
        response = "Based on your current data, your revenue is trending upward by 12.3% quarter-over-quarter while expenses remain stable (+2.1%). This has improved your profit margin by 4.2% compared to last quarter. Your best performing product categories are Electronics (+18%) and Home Goods (+15%).";
      } else if (query.toLowerCase().includes('tax') || query.toLowerCase().includes('taxes')) {
        response = "Based on your current financial data, I estimate your quarterly tax liability at approximately $12,450. You have $3,200 in potential deductions that haven't been applied yet. Would you like me to analyze these potential tax savings?";
      } else {
        response = `I understand your question about "${query}". As your AI bookkeeping assistant, I can help with reconciliations, financial reporting, detecting unusual patterns in your transactions, tax planning, and expense optimization. How else can I assist you today?`;
      }
      
      resolve(NextResponse.json({ message: response }, { status: 200 }));
    }, 500);
  });
}

// Function to clean up AI responses by removing citations and improving formatting
function cleanupAIResponse(text: string): string {
  if (!text) return text;
  
  // Remove citation patterns like [1], [2], etc.
  text = text.replace(/\[\d+\]/g, '');
  
  // Remove citation patterns like [source]
  text = text.replace(/\[source\]/gi, '');
  
  // Remove phrases that reference search results
  text = text.replace(/based on( the)? search results,?/gi, '');
  text = text.replace(/according to( the)? information provided,?/gi, '');
  text = text.replace(/based on( the)? available information,?/gi, '');
  
  // Fix any double spaces created by removals
  text = text.replace(/\s{2,}/g, ' ');
  
  // Fix any orphaned punctuation (e.g., "topic ." becomes "topic.")
  text = text.replace(/\s+\./g, '.');
  text = text.replace(/\s+,/g, ',');
  text = text.replace(/\s+:/g, ':');
  
  // Break long paragraphs (more than 150 chars) into smaller chunks
  const paragraphs = text.split(/\n\n+/);
  const formattedParagraphs = paragraphs.map(para => {
    // Skip if it's already a list or has formatting
    if (para.trim().startsWith('-') || para.trim().startsWith('*') || 
        para.trim().startsWith('#') || para.trim().startsWith('1.')) {
      return para;
    }
    
    // If paragraph is long, break it into sentences
    if (para.length > 150) {
      const sentences = para.match(/[^.!?]+[.!?]+/g) || [para];
      // Group sentences into chunks of 1-3 sentences
      const chunks = [];
      let currentChunk = '';
      
      for (const sentence of sentences) {
        if (currentChunk.length + sentence.length > 150) {
          chunks.push(currentChunk.trim());
          currentChunk = sentence;
        } else {
          currentChunk += sentence;
        }
      }
      
      if (currentChunk) {
        chunks.push(currentChunk.trim());
      }
      
      return chunks.join('\n\n');
    }
    
    return para;
  });
  
  // Join paragraphs with double line breaks
  text = formattedParagraphs.join('\n\n');
  
  // Format numeric lists with bold headers
  text = text.replace(/(\d+\.\s+)([^:]+):(\s+)/g, '$1**$2:**$3');
  
  // Convert "Key: Value" patterns to bold keys
  text = text.replace(/^([A-Za-z\s]+):(\s+)/gm, '**$1:**$2');
  
  // Properly format markdown headers if they don't have space after ###
  text = text.replace(/^(#{1,3})([^#\s])/gm, '$1 $2');
  
  // Ensure headers have proper line breaks before and after
  text = text.replace(/([^\n])(\s*)(#{1,3}\s+[^\n]+)(\s*)([^\n])/g, '$1\n\n$3\n\n$5');
  
  // Add bold to important financial terms
  const financialTerms = [
    'revenue', 'expense', 'profit', 'margin', 'tax', 'reconciliation', 
    'discrepancy', 'liability', 'asset', 'equity', 'balance sheet', 'income statement',
    'cash flow', 'accounts receivable', 'accounts payable', 'depreciation', 'amortization',
    'inventory', 'payroll', 'budget', 'forecast', 'accrual', 'ledger', 'journal', 'audit'
  ];
  
  // Only bold standalone terms, not when they're part of other words
  financialTerms.forEach(term => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    // Skip if the term is already in a markdown bold section
    text = text.replace(regex, (match) => {
      // Check if we're inside a markdown bold section
      const prevText = text.substring(0, text.indexOf(match));
      const asteriskCount = (prevText.match(/\*/g) || []).length;
      if (asteriskCount % 2 !== 0) return match; // Inside bold section
      return `**${match}**`;
    });
  });
  
  // Convert dash/asterisk lists to proper markdown if not already
  text = text.replace(/^[ \t]*[-*][ \t]+(.+)$/gm, '* $1');
  
  return text;
} 