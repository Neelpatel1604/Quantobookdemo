import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json().catch(() => ({}));
    const { query } = body;
    
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid query parameter' },
        { status: 400 }
      );
    }
    
    // Rate limiting check could be added here in a real implementation
    
    // Simulate a delay to mimic AI processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
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
    
    return NextResponse.json({ message: response }, { status: 200 });
  } catch (error) {
    console.error('AI processing error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { error: 'Failed to process your request', details: errorMessage },
      { status: 500 }
    );
  }
} 