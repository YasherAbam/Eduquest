import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../config/supabase';
import { chatService } from '../../services/chat.service';
import './ChatWindow.css';

const ChatWindow = ({ currentUser, otherUser, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (currentUser?.id && otherUser?.id) {
            loadChatHistory();
            const subscription = supabase
                .channel('chat_messages')
                .on('INSERT', { event: '*', schema: 'public', table: 'chat_messages' }, 
                    payload => {
                        if ((payload.new.sender_id === otherUser.id && 
                             payload.new.receiver_id === currentUser.id) || 
                            (payload.new.sender_id === currentUser.id && 
                             payload.new.receiver_id === otherUser.id)) {
                            setMessages(prev => [...prev, payload.new]);
                        }
                    }
                )
                .subscribe();

            return () => {
                subscription.unsubscribe();
            };
        }
    }, [currentUser?.id, otherUser?.id]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const loadChatHistory = async () => {
        if (!currentUser?.id || !otherUser?.id) return;

        setLoading(true);
        try {
            const result = await chatService.getChatHistory(currentUser.id, otherUser.id);
            if (result.success) {
                setMessages(result.messages);
            } else {
                console.error('Failed to load chat history:', result.error);
            }
        } catch (error) {
            console.error('Error loading chat history:', error);
        }
        setLoading(false);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentUser?.id || !otherUser?.id || sending) return;

        setSending(true);
        try {
            const result = await chatService.sendMessage(
                currentUser.id,
                otherUser.id,
                newMessage.trim()
            );

            if (result.success) {
                setNewMessage('');
            } else {
                console.error('Failed to send message:', result.error);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
        setSending(false);
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    if (!currentUser || !otherUser) {
        return <div className="chat-window">Loading chat...</div>;
    }

    return (
        <div className="chat-window">
            <div className="chat-header">
                <div className="chat-user-info">
                    <img 
                        src={otherUser.avatar || '/default-avatar.png'} 
                        alt={otherUser.email} 
                        className="chat-avatar"
                    />
                    <h3>{otherUser.email}</h3>
                </div>
                <button className="close-button" onClick={onClose}>×</button>
            </div>

            <div className="chat-messages">
                {loading ? (
                    <div className="loading">Loading messages...</div>
                ) : (
                    <>
                        {messages.length === 0 ? (
                            <div className="no-messages">
                                No messages yet. Start a conversation!
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`message ${
                                        msg.sender_id === currentUser.id ? 'sent' : 'received'
                                    }`}
                                >
                                    <div className="message-content">{msg.message}</div>
                                    <div className="message-time">
                                        {formatTime(msg.created_at)}
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            <form onSubmit={handleSendMessage} className="chat-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    disabled={loading || sending}
                />
                <button 
                    type="submit" 
                    disabled={loading || sending || !newMessage.trim()}
                >
                    <i className="fas fa-paper-plane"></i>
                </button>
            </form>
        </div>
    );
};

export default ChatWindow;