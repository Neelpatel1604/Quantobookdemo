'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Download, BookOpen, WifiOff, MessageSquare, Clock, PlusCircle, Trash, Menu, X } from 'lucide-react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import FileUploader from './FileUploader';
import useChat from '@/hooks/useChat';
import { formatDistanceToNow } from 'date-fns';

export default function ChatWindow() {
  const { 
    messages, 
    sendMessage, 
    clearMessages, 
    startNewChat, 
    deleteChat,
    switchChat,
    isLoading, 
    isOnline,
    activeChat,
    chatHistories
  } = useChat();

  const [showSidebar, setShowSidebar] = useState(false);

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

  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteChat(chatId);
  };

  const handleSwitchChat = (chatId: string) => {
    switchChat(chatId);
    // Close sidebar on mobile after selecting a chat
    setShowSidebar(false);
  };

  return (
    <div className="w-full flex gap-4 relative">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed bottom-4 left-4 z-10">
        <Button 
          variant="default" 
          size="icon" 
          className="rounded-full shadow-lg"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Left Sidebar - Chat History */}
      <div className={`${
        showSidebar 
          ? 'fixed inset-0 z-50 bg-white h-full w-full md:w-1/4 md:static md:bg-transparent md:z-auto transform translate-x-0 transition-transform duration-300 ease-in-out' 
          : 'fixed inset-0 z-50 bg-white h-full w-full md:w-1/4 md:static md:bg-transparent md:z-auto transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out'
        }`}>
        <Card className="h-full shadow-sm">
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md flex items-center gap-2">
                <MessageSquare size={16} />
                Chat History
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={startNewChat}
                  title="Start New Chat"
                >
                  <PlusCircle size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 md:hidden"
                  onClick={() => setShowSidebar(false)}
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
            {chatHistories.length > 0 ? (
              <div className="space-y-1">
                {chatHistories.map(chat => (
                  <div 
                    key={chat.id}
                    className={`p-3 rounded-md cursor-pointer hover:bg-gray-100 flex items-start justify-between group ${
                      activeChat === chat.id ? 'bg-blue-50 border border-blue-200' : ''
                    }`}
                    onClick={() => handleSwitchChat(chat.id)}
                  >
                    <div className="overflow-hidden">
                      <div className="text-sm font-medium truncate">
                        {chat.title || 'New Chat'}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Clock size={12} />
                        {formatDistanceToNow(new Date(chat.updatedAt), { addSuffix: true })}
                        <span className="ml-1">• {chat.messages.length} messages</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-500"
                      onClick={(e) => handleDeleteChat(chat.id, e)}
                    >
                      <Trash size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 text-sm p-4">
                No conversations yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Chat Window */}
      <div className="flex-1">
        <Card className="w-full shadow-lg border-gray-200">
          <CardHeader className="border-b px-3 md:px-6 py-3 md:py-4 flex flex-row justify-between items-center bg-white">
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 p-1 rounded-full">
                <BookOpen size={18} className="text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg md:text-xl">QuantoBooks AI Assistant</CardTitle>
                <div className="text-xs text-gray-500">
                  Powered by Perplexity Sonar
                </div>
                {!isOnline && (
                  <div className="flex items-center gap-1 text-xs text-yellow-600 mt-1">
                    <WifiOff size={12} />
                    <span>Offline Mode - Your messages will be saved</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-1 md:gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1 text-gray-600 border-gray-300 text-xs p-2 h-8 md:text-sm md:p-2"
                onClick={startNewChat}
              >
                <PlusCircle size={14} className="hidden md:inline" />
                <span className="md:inline">New</span>
              </Button>
              {messages.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1 text-gray-600 border-gray-300 text-xs p-2 h-8 md:text-sm md:p-2"
                  onClick={exportChat}
                >
                  <Download size={14} className="hidden md:inline" />
                  <span className="md:inline">Export</span>
                </Button>
              )}
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1 text-gray-600 border-gray-300 text-xs p-2 h-8 md:text-sm md:p-2"
                onClick={clearMessages}
              >
                <Trash2 size={14} className="hidden md:inline" />
                <span className="md:inline">Clear</span>
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-2 md:p-6 pb-2 md:pb-4">
            <MessageList 
              messages={messages} 
              isLoading={isLoading} 
              onSendExample={sendMessage}
            />
            
            <MessageInput onSend={sendMessage} isLoading={isLoading} />
          </CardContent>
          
          <CardFooter className="pt-0 pb-2 md:pb-4 px-2 md:px-6">
            <FileUploader />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 
