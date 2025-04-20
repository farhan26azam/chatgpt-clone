'use client';

import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';
import { BotIcon, UserIcon, SendHorizonal } from 'lucide-react';

export default function ChatBox() {
  const [messages, setMessages] = useState<any[]>([
    {
      role: 'assistant',
      content: 'Hello! How can I assist you today?',
      imageUrl: null,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: updatedMessages }),
    });

    const contentType = res.headers.get('Content-Type');

    if (contentType?.includes('application/json')) {
      const data = await res.json();
      setMessages([...updatedMessages, data.reply]);

      await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.reply),
      });
    } else {
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let streamedText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          streamedText += chunk;
          setMessages([...updatedMessages, { role: 'assistant', content: streamedText }]);
        }

        await fetch('/api/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role: 'assistant', content: streamedText }),
        });
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('/api/history');
        const data = await res.json();
        setMessages(data.messages);
      } catch (err) {
        console.error('Failed to load history:', err);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col h-screen px-4 pt-6 pb-4">
      <header className="text-center mb-4">
        <h1 className="text-2xl font-bold text-white">🧠 ChatGPT Clone</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Powered by GPT-4 & Image AI</p>
      </header>

      <div className="flex-1 overflow-y-auto bg-white dark:bg-[#1a1a1a] rounded-lg p-4 space-y-4 shadow-inner">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex max-w-[80%] gap-3 items-start">
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                    <BotIcon size={18} />
                  </div>
                )}
                {msg.role === 'user' && (
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    <UserIcon size={18} />
                  </div>
                )}
                <div
                  className={`p-3 rounded-xl shadow-sm whitespace-pre-wrap text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none'
                  }`}
                >
                  {msg.imageUrl ? (
                    <>
                      <p className="mb-2">{msg.content.split('\n')[0]}</p>
                      <img
                        src={msg.imageUrl}
                        alt="Generated"
                        className="rounded-lg max-w-full h-auto border border-gray-300"
                      />
                    </>
                  ) : (
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-500 italic dark:text-gray-400"
          >
            AI is typing...
          </motion.p>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="flex mt-4 gap-2 items-center"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 flex items-center gap-1"
        >
          <SendHorizonal size={18} />
          Send
        </button>
      </form>
    </div>
  );
}
