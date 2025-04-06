'use client';

import { useRef, useEffect } from 'react';
import { Message } from '@/hooks/useChat';
import { CircleUser, Bot } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Format timestamp
  const formatTime = (timestamp?: Date) => {
    if (!timestamp) return '';
    
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      console.error('Error formatting timestamp:', error);
      return '';
    }
  };

  return (
    <div className="h-[500px] overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
      {messages.length === 0 ? (
        <div className="text-center py-8 flex flex-col items-center gap-4">
          <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center">
            <Bot size={32} className="text-blue-600" />
          </div>
          <div className="text-gray-500">
            <h3 className="text-lg font-medium mb-1">QuantoBooks AI Assistant</h3>
            <p className="text-sm">Ask me about bookkeeping, financial insights, or discrepancies.</p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="flex-shrink-0 mr-2">
                  <div className="bg-blue-100 rounded-full p-1 w-8 h-8 flex items-center justify-center">
                    <Bot size={16} className="text-blue-600" />
                  </div>
                </div>
              )}
              
              <div
                className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-blue-500 text-white rounded-tr-none' 
                    : 'bg-white border border-gray-200 rounded-tl-none'
                }`}
              >
                <div className={msg.sender === 'user' ? 'text-white' : 'text-gray-800'}>
                  {msg.text}
                </div>
                <div className={`text-xs mt-1 ${
                  msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {formatTime(msg.timestamp)}
                </div>
              </div>
              
              {msg.sender === 'user' && (
                <div className="flex-shrink-0 ml-2">
                  <div className="bg-gray-200 rounded-full p-1 w-8 h-8 flex items-center justify-center">
                    <CircleUser size={16} className="text-gray-600" />
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex mb-4 justify-start">
              <div className="flex-shrink-0 mr-2">
                <div className="bg-blue-100 rounded-full p-1 w-8 h-8 flex items-center justify-center">
                  <Bot size={16} className="text-blue-600" />
                </div>
              </div>
              <div className="max-w-[80%] p-3 rounded-lg bg-white border border-gray-200 rounded-tl-none">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
} 