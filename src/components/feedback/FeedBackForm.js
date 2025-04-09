import React, { useState } from 'react';
import { feedbackService } from '../../services/feedback.service';
import { Rating } from '@mui/material';
import './FeedbackForm.css';

const FeedbackForm = ({ activityId, userId, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await feedbackService.submitFeedback(
                userId,
                activityId,
                rating,
                feedback,
                isAnonymous
            );
            onSubmit && onSubmit();
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <div className="feedback-form">
            <h3>Activity Feedback</h3>
            <form onSubmit={handleSubmit}>
                <div className="rating-container">
                    <label>Rating:</label>
                    <Rating
                        value={rating}
                        onChange={(_, newValue) => setRating(newValue)}
                    />
                </div>
                <div className="feedback-container">
                    <label>Feedback:</label>
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Share your thoughts or suggestions..."
                    />
                </div>
                <div className="anonymous-option">
                    <label>
                        <input
                            type="checkbox"
                            checked={isAnonymous}
                            onChange={(e) => setIsAnonymous(e.target.checked)}
                        />
                        Submit anonymously
                    </label>
                </div>
                <button type="submit">Submit Feedback</button>
            </form>
        </div>
    );
};

export default FeedbackForm;