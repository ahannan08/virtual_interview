import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Feedback = ({ sessionId }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/api/session/end', {
          session_id: sessionId,
        });
        setSummary(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [sessionId]);

  if (loading) {
    return <p>Loading feedback...</p>;
  }

  if (!summary) {
    return <p>Error fetching feedback.</p>;
  }

  return (
    <div>
      <h3>Session Ended</h3>
      <p>Total Score: {summary.total_score} / {summary.max_score}</p>
      <p>Feedback: {summary.feedback.summary}</p>
      {summary.feedback.areas_to_improve && (
        <p>Areas to Improve: {summary.feedback.areas_to_improve}</p>
      )}
    </div>
  );
};

export default Feedback;
