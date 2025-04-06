import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-180px)] flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Welcome to QuantoBooks
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          AI-powered bookkeeping platform for e-commerce businesses. 
          Simplify reconciliation, detect discrepancies, and gain financial insights.
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              View Dashboard
            </Button>
          </Link>
          <Link href="/chat">
            <Button size="lg" variant="outline" className="px-8">
              Chat with AI
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="p-6 bg-white rounded-lg shadow-sm border">
            <div className="mb-4 bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Bank Reconciliation</h2>
            <p className="text-gray-600">Automatically match transactions and identify discrepancies.</p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-sm border">
            <div className="mb-4 bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Financial Insights</h2>
            <p className="text-gray-600">Real-time reporting and visualization of your financial data.</p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-sm border">
            <div className="mb-4 bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-600">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">AI Assistant</h2>
            <p className="text-gray-600">Get answers to your financial questions in real-time.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
