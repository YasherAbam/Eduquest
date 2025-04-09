import { supabase } from '../config/supabase';

export const emailService = {
    // Send email notification
    sendNotification: async (to, subject, content) => {
        try {
            // First check if user exists
            const { data: userData, error: userError } = await supabase
                .from('auth.users')
                .select('id, email')
                .eq('email', to)
                .single();

            if (userError) throw new Error('User not found');

            // Store notification in Supabase
            const { data, error } = await supabase
                .from('email_notifications')
                .insert([{
                    recipient: userData.id,
                    subject,
                    content,
                    status: 'pending',
                    created_at: new Date().toISOString()
                }])
                .select()
                .single();

            if (error) {
                console.error('Database error:', error);
                throw new Error('Failed to save notification');
            }

            return { success: true, data };
        } catch (error) {
            console.error('Error in sendNotification:', error);
            return { 
                success: false, 
                error: error.message || 'Failed to send notification' 
            };
        }
    },

    // Get notification history for a user
    getNotificationHistory: async (userId) => {
        try {
            const { data, error } = await supabase
                .from('email_notifications')
                .select(`
                    *,
                    recipient:auth.users(email)
                `)
                .eq('recipient', userId)
                .order('created_at', { ascending: false });

            if (error) throw error;

            return { 
                success: true, 
                notifications: data.map(notification => ({
                    ...notification,
                    recipientEmail: notification.recipient?.email
                }))
            };
        } catch (error) {
            console.error('Error in getNotificationHistory:', error);
            return { 
                success: false, 
                error: error.message || 'Failed to fetch notifications' 
            };
        }
    },

    // Mark notification as read
    markAsRead: async (notificationId) => {
        try {
            const { data, error } = await supabase
                .from('email_notifications')
                .update({ status: 'read' })
                .eq('id', notificationId)
                .select()
                .single();

            if (error) throw error;

            return { success: true, data };
        } catch (error) {
            console.error('Error in markAsRead:', error);
            return { 
                success: false, 
                error: error.message || 'Failed to mark notification as read' 
            };
        }
    }
};