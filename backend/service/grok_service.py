# grok_service/grok_service.py

from generate_question import generate_question
from evaluate_response import evaluate_response

def get_question(role, difficulty):
    """Fetch a question based on the role and difficulty."""
    return generate_question(role, difficulty)

def submit_response(question, user_response, difficulty):
    """Evaluate the user's response to the question."""
    return evaluate_response(question, user_response, difficulty)
