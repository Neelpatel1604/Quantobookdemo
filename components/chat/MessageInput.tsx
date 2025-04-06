'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic } from 'lucide-react';

interface MessageInputProps {
  onSend: (text: string) => void;
  isLoading?: boolean;
}

export default function MessageInput({ onSend, isLoading = false }: MessageInputProps) {
  const [text, setText] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus input on component mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSend(text.trim());
      setText('');
    }
  };
  
  // Handle Shift+Enter to send message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      if (text.trim()) {
        onSend(text.trim());
        setText('');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message... (Press Enter to send)"
        disabled={isLoading}
        className="pr-24 py-6 bg-white border-gray-300"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
        <Button 
          type="button" 
          size="icon"
          variant="ghost"
          disabled={isLoading}
          className="text-gray-500 hover:text-gray-700"
          onClick={() => alert('Voice input coming soon!')}
        >
          <Mic size={20} />
        </Button>
        <Button 
          type="submit" 
          size="sm"
          disabled={isLoading || !text.trim()}
          className={`rounded-full px-3 ${text.trim() ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300'}`}
        >
          <Send size={16} className="mr-1" />
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </form>
  );
} 