import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { chatService } from '../../services/chat.service';
import './Chatlist.css';

const ChatList = ({ currentUser, onSelectChat }) => {
    const [conversations, setConversations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [onlineUsers, setOnlineUsers] = useState(new Set());

    useEffect(() => {
        if (currentUser?.id) {
            loadConversations();
            subscribeToPresence();
            subscribeToNewMessages();
        }
    }, [currentUser?.id]);

    const loadConversations = async () => {
        if (!currentUser?.id) return;
        
        try {
            setLoading(true);
            const result = await chatService.getAdminConversations(currentUser.id);
            if (result.success) {
                setConversations(result.conversations);
            }
        } catch (error) {
            console.error('Error loading conversations:', error);
        } finally {
            setLoading(false);
        }
    };

    const subscribeToPresence = () => {
        if (!currentUser?.id) return null;

        const presenceChannel = supabase.channel('online-users');
        
        presenceChannel
            .on('presence', { event: 'sync' }, () => {
                const newState = new Set();
                const presenceState = presenceChannel.presenceState();
                
                Object.values(presenceState).forEach(presence => {
                    presence.forEach(p => newState.add(p.user_id));
                });
                
                setOnlineUsers(newState);
            })
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    await presenceChannel.track({ user_id: currentUser.id });
                }
            });

        return () => {
            presenceChannel.unsubscribe();
        };
    };

    const subscribeToNewMessages = () => {
        if (!currentUser?.id) return null;

        const subscription = supabase
            .channel('admin_chat_messages')
            .on('INSERT', { event: '*', schema: 'public', table: 'admin_chat_messages' }, 
                payload => {
                    if (payload.new.sender_id === currentUser.id || 
                        payload.new.receiver_id === currentUser.id) {
                        loadConversations();
                    }
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    };

   return (
    <div className="chat-list">
        <div className="chat-header">
            <h2>Messages</h2>
        </div>
        <div className="search-container">
            <input
                type="text"
                className="search-input"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
            <div className="conversations-list">
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : conversations.length === 0 ? (
                    <div className="no-conversations">No conversations yet</div>
                ) : (
                    conversations
                        .filter(conv => 
                            conv.otherAdmin?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            conv.otherAdmin?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            conv.otherAdmin?.email?.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map(conv => (
                            <div
                                key={conv.id}
                                className="conversation-item"
                                onClick={() => onSelectChat(conv.otherAdmin)}
                            >
                                <div className="conversation-avatar">
                                    {conv.otherAdmin.avatar_url ? (
                                        <img src={conv.otherAdmin.avatar_url} alt={conv.otherAdmin.first_name} />
                                    ) : (
                                        <div className="avatar-initial">
                                            {conv.otherAdmin.first_name?.[0]}
                                        </div>
                                    )}
                                    {onlineUsers.has(conv.otherAdmin.id) && (
                                        <span className="status-indicator online"></span>
                                    )}
                                </div>
                                <div className="conversation-info">
                                    <div className="conversation-name">
                                        {`${conv.otherAdmin.first_name} ${conv.otherAdmin.last_name}`}
                                    </div>
                                    {conv.last_message && (
                                        <div className="last-message">{conv.last_message}</div>
                                    )}
                                </div>
                            </div>
                        ))
                )}
            </div>
        </div>
    );
};

export default ChatList;