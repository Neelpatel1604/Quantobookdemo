'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Download, BookOpen, Info, WifiOff } from 'lucide-react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import FileUploader from './FileUploader';
import useChat from '@/hooks/useChat';

const EXAMPLE_QUESTIONS = [
  "What discrepancies were found in last month's books?",
  "How can I improve my profit margins?",
  "Show me my revenue breakdown by category",
  "Explain the bank reconciliation process"
];

export default function ChatWindow() {
  const { messages, sendMessage, clearMessages, isLoading, isOnline } = useChat();
  const [showExamples, setShowExamples] = useState(messages.length === 0);

  const handleSendExample = (question: string) => {
    sendMessage(question);
    setShowExamples(false);
  };

  const exportChat = () => {
    const chatText = messages.map(m => 
      `${m.sender.toUpperCase()} (${m.timestamp?.toLocaleString() || 'unknown'}): ${m.text}`
    ).join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quantobooks-chat-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg border-gray-200">
      <CardHeader className="border-b px-6 py-4 flex flex-row justify-between items-center bg-white">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 p-1 rounded-full">
            <BookOpen size={20} className="text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-xl">QuantoBooks AI Assistant</CardTitle>
            {!isOnline && (
              <div className="flex items-center gap-1 text-xs text-yellow-600 mt-1">
                <WifiOff size={12} />
                <span>Offline Mode - Your messages will be saved</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          {messages.length > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 text-gray-600 border-gray-300"
              onClick={exportChat}
            >
              <Download size={14} />
              Export
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1 text-gray-600 border-gray-300"
            onClick={clearMessages}
          >
            <Trash2 size={14} />
            Clear
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 pb-4">
        <MessageList messages={messages} isLoading={isLoading} />
        
        {showExamples && messages.length === 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Info size={16} className="text-blue-500" />
              <h3 className="text-sm font-medium text-gray-700">Try asking about:</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {EXAMPLE_QUESTIONS.map((q, i) => (
                <Button 
                  key={i}
                  variant="outline" 
                  className="justify-start font-normal text-left text-gray-700 h-auto py-2"
                  onClick={() => handleSendExample(q)}
                >
                  {q}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <MessageInput onSend={sendMessage} isLoading={isLoading} />
      </CardContent>
      
      <CardFooter className="pt-0 pb-4 px-6">
        <FileUploader />
      </CardFooter>
    </Card>
  );
} 