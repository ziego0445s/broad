'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from './firebase/config';
import { GuestbookEntry } from './types/guestbook';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  // 컴포넌트가 마운트된 후에만 localStorage를 사용
  useEffect(() => {
    const savedName = localStorage.getItem('guestbook_name') || '';
    setName(savedName);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const guestbookEntries = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      })) as GuestbookEntry[];
      
      setEntries(guestbookEntries);
    });

    return () => unsubscribe();
  }, [mounted]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    localStorage.setItem('guestbook_name', newName);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) return;

    try {
      await addDoc(collection(db, 'guestbook'), {
        name,
        message,
        createdAt: new Date()
      });

      setMessage('');
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  if (!mounted) {
    return null; // 또는 로딩 상태를 보여줄 수 있습니다
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sky-100">
      {/* 상단 광고 섹션 */}
      {mounted && (
        <div className="flex justify-center py-4">
          <ins 
            className="kakao_ad_area" 
            style={{display: "none"}}
            data-ad-unit="DAN-UI7Ciq3UMuGfrnPw"
            data-ad-width="320"
            data-ad-height="50">
          </ins>
          <script 
            type="text/javascript" 
            src="//t1.daumcdn.net/kas/static/ba.min.js" 
            async>
          </script>
        </div>
      )}

      <div className="max-w-2xl mx-auto p-4">
        {/* 헤더 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-6">
          <h1 className="text-4xl font-bold text-sky-800 text-center">
            AI 공부방 ✏️
          </h1>
          <p className="text-center text-sky-600 mt-2">
            AI 학습에 대한 여러분의 생각을 공유해주세요
          </p>
        </div>

        {/* 메시지 목록 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6 h-[500px] overflow-y-auto">
          <div className="space-y-6">
            {entries.map((entry) => (
              <div key={entry.id} className="flex flex-col">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-400 to-sky-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {entry.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <span className="font-medium text-sky-800">{entry.name}</span>
                    <span className="ml-3 text-sm text-sky-500">
                      {entry.createdAt?.toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-sky-50 to-sky-100 rounded-2xl p-4 ml-12 relative message-bubble shadow-sm">
                  <p className="text-sky-800 leading-relaxed">{entry.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 입력 폼 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder="이름을 입력하세요"
              className="w-full px-6 py-3 rounded-xl border-2 border-sky-100 focus:border-sky-300 focus:outline-none bg-white/50 placeholder-sky-400 text-sky-800"
              required
            />
            
            <div className="flex gap-3">
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지를 입력하세요"
                className="flex-1 px-6 py-3 rounded-xl border-2 border-sky-100 focus:border-sky-300 focus:outline-none bg-white/50 placeholder-sky-400 text-sky-800"
                rows={3}
                required
              />
              <button
                type="submit"
                className="px-8 bg-gradient-to-r from-sky-400 to-sky-500 text-white rounded-xl hover:from-sky-500 hover:to-sky-600 transition-all duration-200 font-medium shadow-md"
              >
                전송
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 하단 광고 섹션 */}
      {mounted && (
        <div className="flex justify-center py-8">
          <ins 
            className="kakao_ad_area" 
            style={{display: "none"}}
            data-ad-unit="DAN-d0wFw74otxuvVaQJ"
            data-ad-width="300"
            data-ad-height="250">
          </ins>
          <script 
            type="text/javascript" 
            src="//t1.daumcdn.net/kas/static/ba.min.js" 
            async>
          </script>
        </div>
      )}

      <style jsx>{`
        .message-bubble::before {
          content: '';
          position: absolute;
          left: -12px;
          top: 16px;
          border-style: solid;
          border-width: 10px 12px 10px 0;
          border-color: transparent #f0f9ff transparent transparent;
        }
        
        /* 스크롤바 스타일링 */
        div::-webkit-scrollbar {
          width: 8px;
        }
        
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        
        div::-webkit-scrollbar-thumb {
          background: #93c5fd;
          border-radius: 4px;
        }
        
        div::-webkit-scrollbar-thumb:hover {
          background: #60a5fa;
        }
      `}</style>
    </div>
  );
}
