import uuid

class SessionManager:
    def __init__(self):
        self.sessions = {}

    import uuid
from service.generate_question import generate_question

class SessionManager:
    def __init__(self):
        self.sessions = {}

    def get_difficulty(self, session_id):
         session = self.sessions.get(session_id)
         return session.get('difficulty') if session else None


    def start_session(self, role, difficulty):
        """Start a new session for the given role and difficulty."""
        session_id = str(uuid.uuid4())
        
        # Generate questions based on role and difficulty
        questions = generate_question(role, difficulty)
        
        # Initialize the session with questions and metadata
        self.sessions[session_id] = {
            "role": role,
            "difficulty": difficulty,
            "questions": questions,
            "current_index": 0,  # Track which question is active
            "score": 0  # Initial score
        }
        return session_id
      

    def set_questions(self, session_id, questions):
        """Set questions for an existing session."""
        if session_id in self.sessions:
            self.sessions[session_id]["questions"] = questions
            # Reset the current index if questions are updated
            self.sessions[session_id]["current_index"] = 0
        else:
            raise ValueError(f"Session ID {session_id} does not exist.")


    
    def get_next_question(self, session_id):
        session = self.sessions.get(session_id)
        if session and session["current_index"] < len(session["questions"]):
            question = session["questions"][session["current_index"]]
            session["current_index"] += 1
            return question
        return {"message": "No more questions."}

    def update_score(self, session_id, score):
        self.sessions[session_id]["score"] += score

    def has_more_questions(self, session_id):
        session = self.sessions.get(session_id)
        return session and session["current_index"] < len(session["questions"])
    
    

    def get_summary(self, session_id):
        session = self.sessions.get(session_id)
        if session:
            total_score = session["score"]
            max_score = len(session["questions"])
            feedback = {
                "summary": "Well done!" if total_score > max_score / 2 else "Needs Improvement.",
                "areas_to_improve": "Provide more detail in answers." if total_score < max_score else ""
            }
            return {"total_score": total_score, "max_score": max_score, "feedback": feedback}
        return {"error": "Session not found."}
