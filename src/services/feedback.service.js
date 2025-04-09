import { supabase } from '../config/supabase';

export const feedbackService = {
    // Submit feedback
    async submitFeedback(userId, activityId, rating, feedback, isAnonymous) {
        return await supabase
            .from('feedback')
            .insert([{
                user_id: isAnonymous ? null : userId,
                activity_id: activityId,
                rating,
                feedback,
                is_anonymous: isAnonymous,
                created_at: new Date()
            }]);
    },

    // Submit satisfaction survey
    async submitSurvey(userId, userType, responses, isAnonymous) {
        return await supabase
            .from('satisfaction_surveys')
            .insert([{
                user_id: isAnonymous ? null : userId,
                user_type: userType,
                responses,
                is_anonymous: isAnonymous,
                created_at: new Date()
            }]);
    }
};