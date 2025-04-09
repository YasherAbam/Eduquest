import { supabase } from '../config/supabase'

export const authService = {
    login: async (email, password) => {
        console.log('Auth Service: Attempting login with email:', email);
        try {
          // First, sign in the user
          const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
    
          if (authError) {
            console.error('Auth Service: Login error:', authError);
            throw authError;
          }
    
          console.log('Auth Service: Login successful, auth data:', authData);
    
          if (!authData?.user?.id) {
            throw new Error('No user ID in auth response');
          }

          // Then get their profile
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authData.user.id)
            .single();
    
          if (profileError) {
            console.error('Auth Service: Profile fetch error:', profileError);
            throw profileError;
          }

          console.log('Auth Service: Profile fetched:', profile);

          if (!profile) {
            throw new Error('Profile not found');
          }

          // Return structured response
          return {
            data: {
              session: authData.session,
              user: authData.user,
              profile: profile
            },
            error: null
          };
        } catch (error) {
          console.error('Auth Service: Login error:', error);
          return { data: null, error };
        }
    },
    
    signup: async (email, password, fullName, studentId, course, birthday) => {
        console.log('Auth Service: Attempting signup with:', { 
          email, 
          fullName, 
          studentId, 
          course, 
          birthday 
        });
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName,
                student_id: studentId,
                course: course,
                birthday: birthday,
                role: 'user'
              },
              emailRedirectTo: `${window.location.origin}/login`
            }
          });

          if (error) {
            console.error('Auth Service: Signup error:', error);
            throw error;
          }

          console.log('Auth Service: Signup successful:', data);
          return data;
        } catch (error) {
          console.error('Auth Service: Signup error:', error);
          throw error;
        }
    },

    logout: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    getCurrentUser: async () => {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        
        if (user) {
          console.log('Auth Service: Getting current user profile for:', user.id);
          // Get user profile
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          if (profileError) {
            console.error('Auth Service: Error getting current user profile:', profileError);
            throw profileError;
          }
          return { ...user, profile };
        }
        return null;
    },

    getUserProfile: async (userId) => {
        console.log('Auth Service: Getting user profile for ID:', userId);
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
    
          if (error) {
            console.error('Auth Service: Error fetching profile:', error);
            throw error;
          }
    
          if (!data) {
            console.error('Auth Service: No profile found for user:', userId);
            throw new Error('Profile not found');
          }
    
          console.log('Auth Service: Profile found:', data);
          return data;
        } catch (error) {
          console.error('Auth Service: getUserProfile error:', error);
          throw error;
        }
    },

    updateProfile: async (userId, updates) => {
        const { data, error } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', userId);
        if (error) throw error;
        return data;
    },

    resetPassword: async (email) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
    },

    updatePassword: async (newPassword) => {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) throw error;
    },

    // Helper function to check if user has specific role
    hasRole: async (userId, role) => {
        const profile = await authService.getUserProfile(userId);
        return profile?.role === role;
    }
}

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