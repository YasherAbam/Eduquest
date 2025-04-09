import { supabase } from '../config/supabase';

export const chatService = {
    // Get all admin users except current admin
    getAllAdminUsers: async (currentAdminId) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('id, email, first_name, last_name, avatar_url, role')
                .or('role.eq.admin,role.eq.admin2')  // Get both admin and admin2
                .neq('id', currentAdminId)  // Exclude current admin
                .order('first_name');

            if (error) throw error;

            return {
                success: true,
                admins: data
            };
        } catch (error) {
            await logError(error, 'getAllAdminUsers');
            return {
                success: false,
                error: error.message
            };
        }
    },

    getAdminChatHistory: async (adminId1, adminId2) => {
        try {
            // First verify both users are admins
            const { data: users, error: userError } = await supabase
                .from('profiles')
                .select('id, role')
                .in('id', [adminId1, adminId2])
                .or('role.eq.admin,role.eq.admin2');

            if (userError) throw userError;
            if (users.length !== 2) {
                throw new Error('One or both users are not admins');
            }

            // Get chat messages
            const { data, error } = await supabase
                .from('admin_chat_messages')
                .select(`
                    *,
                    sender:sender_id(id, email, first_name, last_name, avatar_url),
                    receiver:receiver_id(id, email, first_name, last_name, avatar_url)
                `)
                .or(`sender_id.eq.${adminId1},receiver_id.eq.${adminId2},sender_id.eq.${adminId2},receiver_id.eq.${adminId1}`)
                .order('created_at', { ascending: true });

            if (error) throw error;

            return {
                success: true,
                messages: data.map(msg => ({
                    ...msg,
                    senderName: `${msg.sender.first_name} ${msg.sender.last_name}`,
                    receiverName: `${msg.receiver.first_name} ${msg.receiver.last_name}`
                }))
            };
        } catch (error) {
            await logError(error, 'getAdminChatHistory');
            return {
                success: false,
                error: error.message
            };
        }
    },

    sendAdminMessage: async (senderId, receiverId, message) => {
        try {
            // Verify both users are admins
            const { data: users, error: userError } = await supabase
                .from('profiles')
                .select('id, role')
                .in('id', [senderId, receiverId])
                .or('role.eq.admin,role.eq.admin2');

            if (userError) throw userError;
            if (users.length !== 2) {
                throw new Error('One or both users are not admins');
            }

            // Create or get admin conversation
            let { data: conversation, error: convError } = await supabase
                .from('admin_conversations')
                .select()
                .or(`admin1_id.eq.${senderId},admin2_id.eq.${receiverId},admin1_id.eq.${receiverId},admin2_id.eq.${senderId}`)
                .single();

            if (!conversation) {
                const { data: newConv, error: createError } = await supabase
                    .from('admin_conversations')
                    .insert({
                        admin1_id: senderId,
                        admin2_id: receiverId,
                        last_message: message,
                        last_message_at: new Date().toISOString()
                    })
                    .select()
                    .single();

                if (createError) throw createError;
                conversation = newConv;
            } else {
                // Update existing conversation
                const { error: updateError } = await supabase
                    .from('admin_conversations')
                    .update({
                        last_message: message,
                        last_message_at: new Date().toISOString()
                    })
                    .eq('id', conversation.id);

                if (updateError) throw updateError;
            }

            // Send the message
            const { data: newMessage, error: msgError } = await supabase
                .from('admin_chat_messages')
                .insert({
                    conversation_id: conversation.id,
                    sender_id: senderId,
                    receiver_id: receiverId,
                    message: message,
                    created_at: new Date().toISOString()
                })
                .select()
                .single();

            if (msgError) throw msgError;

            return {
                success: true,
                message: newMessage
            };
        } catch (error) {
            await logError(error, 'sendAdminMessage');
            return {
                success: false,
                error: error.message
            };
        }
    },

    getAdminConversations: async (adminId) => {
        try {
            // First get the conversations
            const { data: conversations, error: convError } = await supabase
                .from('admin_conversations')
                .select('*')
                .or(`admin1_id.eq.${adminId},admin2_id.eq.${adminId}`)
                .order('last_message_at', { ascending: false });

            if (convError) {
                console.error('Supabase conversations query error:', convError);
                throw convError;
            }

            // Then get all the admin profiles we need
            const adminIds = conversations.reduce((ids, conv) => {
                ids.add(conv.admin1_id);
                ids.add(conv.admin2_id);
                return ids;
            }, new Set());

            const { data: adminProfiles, error: profileError } = await supabase
                .from('profiles')
                .select('id, email, first_name, last_name, avatar_url, role')
                .in('id', Array.from(adminIds));

            if (profileError) {
                console.error('Supabase profiles query error:', profileError);
                throw profileError;
            }

            // Create a map of admin profiles for easy lookup
            const adminMap = adminProfiles.reduce((map, profile) => {
                map[profile.id] = profile;
                return map;
            }, {});

            // Combine the data
            const enrichedConversations = conversations.map(conv => {
                const admin1 = adminMap[conv.admin1_id] || { id: conv.admin1_id };
                const admin2 = adminMap[conv.admin2_id] || { id: conv.admin2_id };
                return {
                    ...conv,
                    admin1,
                    admin2,
                    otherAdmin: conv.admin1_id === adminId ? admin2 : admin1
                };
            });

            return {
                success: true,
                conversations: enrichedConversations
            };
        } catch (error) {
            await logError(error, 'getAdminConversations');
            return {
                success: false,
                error: error.message
            };
        }
    },



    deleteAdminMessage: async (messageId, adminId) => {
        try {
            const { error } = await supabase
                .from('admin_chat_messages')
                .delete()
                .eq('id', messageId)
                .eq('sender_id', adminId);

            if (error) throw error;

            return {
                success: true
            };
        } catch (error) {
            await logError(error, 'deleteAdminMessage');
            return {
                success: false,
                error: error.message
            };
        }
    }
};

// Add this to your chat service
const logError = async (error, context) => {
    console.error(`Error in ${context}:`, {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
    });
    
    // Test connection
    const { data, error: testError } = await supabase
        .from('profiles')
        .select('role')
        .limit(1);
        
    if (testError) {
        console.error('Connection test failed:', testError);
    } else {
        console.log('Connection test succeeded:', data);
    }
};