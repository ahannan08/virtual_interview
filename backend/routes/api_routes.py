from flask import Blueprint, request, jsonify
from service.generate_question import generate_question
from service.evaluate_response import evaluate_response
from utils.session_manager import SessionManager

session_routes = Blueprint("session_routes", __name__)
sessions = SessionManager()

@session_routes.route('/start', methods=['POST'])
def start_session():
    data = request.json
    role = data.get("role")
    difficulty = data.get("difficulty")
    session_id = sessions.start_session(role, difficulty)
    questions = generate_question(role, difficulty)
    sessions.set_questions(session_id, questions)
    return jsonify({"session_id": session_id, "questions_count": len(questions)})

@session_routes.route('/question', methods=['POST'])
def get_question():
    session_id = request.json.get("session_id")
    if not session_id:
        return jsonify({"error": "Session ID is required"}), 400
    
    question = sessions.get_next_question(session_id)
    
    if "message" in question:
        return jsonify(question), 200
    return jsonify({"question": question}), 200

@session_routes.route('/answer', methods=['POST'])
def submit_answer():
    data = request.json
    session_id = data.get("session_id")
    question_number = data.get("question_number")
    user_response = data.get("user_response")

    # Get the session's difficulty level
    difficulty = sessions.get_difficulty(session_id)
    
    # Now pass the difficulty to evaluate_response
    feedback, score = evaluate_response(question_number, user_response, difficulty)
    
    sessions.update_score(session_id, score)
    next_question_available = sessions.has_more_questions(session_id)
    
    return jsonify({"feedback": feedback, "score": score, "next_question_available": next_question_available})

@session_routes.route('/end', methods=['POST'])
def end_session():
    session_id = request.json.get("session_id")
    summary = sessions.get_summary(session_id)
    return jsonify(summary)
