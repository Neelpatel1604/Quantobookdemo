import { useState, useEffect, useCallback } from 'react';
import { sendQueryToAI } from '@/lib/ai';
import { parseJsonWithDates, generateId } from '@/lib/utils';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isOffline?: boolean;
}

export default function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  
  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load messages from localStorage on component mount
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem('chatMessages');
      if (savedMessages) {
        const parsedMessages = parseJsonWithDates(savedMessages);
        if (Array.isArray(parsedMessages)) {
          // Add IDs to messages if they don't have them (for older stored messages)
          const messagesWithIds = parsedMessages.map(msg => ({
            ...msg,
            id: msg.id || generateId(),
            timestamp: msg.timestamp || new Date()
          }));
          setMessages(messagesWithIds);
        }
      }
    } catch (error) {
      console.error('Error parsing saved messages:', error);
      // Clear corrupted messages
      localStorage.removeItem('chatMessages');
    }
  }, []);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    setError(null);

    const userMessage: Message = { 
      id: generateId(),
      text, 
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Handle offline mode
    if (!isOnline) {
      setTimeout(() => {
        const offlineMessage: Message = {
          id: generateId(),
          text: 'You appear to be offline. Your message has been saved and will be processed when you reconnect.',
          sender: 'ai',
          timestamp: new Date(),
          isOffline: true
        };
        setMessages(prev => [...prev, offlineMessage]);
        setIsLoading(false);
      }, 500);
      return;
    }
    
    try {
      const response = await sendQueryToAI(text);
      const aiMessage: Message = {
        id: generateId(),
        text: response.message,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
      
      const errorAiMessage: Message = {
        id: generateId(),
        text: 'Sorry, I encountered an error processing your request. Please try again.',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorAiMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isOnline]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
    setError(null);
  }, []);

  return {
    messages,
    sendMessage,
    clearMessages,
    isLoading,
    error,
    isOnline
  };
} 