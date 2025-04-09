import React, { useState } from 'react';
import { feedbackService } from '../../services/feedback.service';
import './SatisfactionSurvery.css';

const SatisfactionSurvey = ({ userId, userType, onSubmit }) => {
    const [responses, setResponses] = useState({
        overall_satisfaction: '',
        ease_of_use: '',
        feature_satisfaction: '',
        improvement_suggestions: '',
    });
    const [isAnonymous, setIsAnonymous] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await feedbackService.submitSurvey(
                userId,
                userType,
                responses,
                isAnonymous
            );
            onSubmit && onSubmit();
        } catch (error) {
            console.error('Error submitting survey:', error);
        }
    };

    return (
        <div className="satisfaction-survey">
            <h3>Satisfaction Survey</h3>
            <form onSubmit={handleSubmit}>
                <div className="survey-question">
                    <label>Overall satisfaction with the platform:</label>
                    <select
                        value={responses.overall_satisfaction}
                        onChange={(e) => setResponses({
                            ...responses,
                            overall_satisfaction: e.target.value
                        })}
                    >
                        <option value="">Select rating</option>
                        <option value="5">Very Satisfied</option>
                        <option value="4">Satisfied</option>
                        <option value="3">Neutral</option>
                        <option value="2">Dissatisfied</option>
                        <option value="1">Very Dissatisfied</option>
                    </select>
                </div>

                <div className="survey-question">
                    <label>How easy is it to use our platform?</label>
                    <select
                        value={responses.ease_of_use}
                        onChange={(e) => setResponses({
                            ...responses,
                            ease_of_use: e.target.value
                        })}
                    >
                        <option value="">Select rating</option>
                        <option value="5">Very Easy</option>
                        <option value="4">Easy</option>
                        <option value="3">Moderate</option>
                        <option value="2">Difficult</option>
                        <option value="1">Very Difficult</option>
                    </select>
                </div>

                <div className="survey-question">
                    <label>Suggestions for improvement:</label>
                    <textarea
                        value={responses.improvement_suggestions}
                        onChange={(e) => setResponses({
                            ...responses,
                            improvement_suggestions: e.target.value
                        })}
                        placeholder="Please share your suggestions..."
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

                <button type="submit">Submit Survey</button>
            </form>
        </div>
    );
};

export default SatisfactionSurvey;