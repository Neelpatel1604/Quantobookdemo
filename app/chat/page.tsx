import ChatWindow from '@/components/chat/ChatWindow';

export const metadata = {
  title: 'AI Chat | QuantoBooks',
  description: 'Real-time AI assistant for QuantoBooks',
};

export default function ChatPage() {
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">AI Chat Assistant</h1>
        <p className="text-gray-600">Get real-time help with your bookkeeping tasks and financial questions.</p>
      </div>
      
      <ChatWindow />
    </div>
  );
} 