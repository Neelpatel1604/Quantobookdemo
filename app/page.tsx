import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BarChart2, MessageSquare } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-180px)] flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Welcome to QuantoBooks
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          AI-powered bookkeeping platform for e-commerce businesses. 
          Gain financial insights and receive AI assistance for all your bookkeeping needs.
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/dashboard">
            <Button size="lg" className="px-8 gap-2">
              <BarChart2 size={20} />
              View Dashboard
            </Button>
          </Link>
          <Link href="/chat">
            <Button size="lg" variant="outline" className="px-8 gap-2">
              <MessageSquare size={20} />
              Chat with AI
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="p-6 bg-white rounded-lg shadow-sm border">
            <div className="mb-4 bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center">
              <BarChart2 className="text-blue-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">Financial Insights</h2>
            <p className="text-gray-600">Real-time reporting and visualization of your financial data.</p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-sm border">
            <div className="mb-4 bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center">
              <MessageSquare className="text-purple-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">AI Assistant</h2>
            <p className="text-gray-600">Get answers to your financial questions in real-time.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
