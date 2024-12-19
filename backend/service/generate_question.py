import random

# Concept Arrays for Each Role
role_concepts = {
    "frontend": ["React", "Redux", "JSX", "CSS Flexbox", "Virtual DOM"],
    "backend": ["Node.js", "Express.js", "REST APIs", "Database Design", "Authentication"],
    "fullstack": ["React", "Node.js", "Microservices", "API Integration", "Database Scaling"],
    "ai_engineer": ["Neural Networks", "Machine Learning", "TensorFlow", "Data Preprocessing", "Reinforcement Learning"]
}

def generate_question(role, difficulty):
    """Generate a fixed number of questions for a given role and difficulty level."""
    try:
        # Number of questions based on difficulty
        question_counts = {"beginner": 5, "intermediate": 3, "advanced": 1}
        num_questions = question_counts.get(difficulty, 0)
        
        # Generate questions
        questions = []
        for _ in range(num_questions):
            concept = random.choice(role_concepts.get(role, []))
            if difficulty == "beginner":
                question = f"What is {concept}, and why is it used?"
            elif difficulty == "intermediate":
                question = f"Write a script or explain how {concept} can be used in a real-world application."
            elif difficulty == "advanced":
                question = f"How would you optimize or design a system using {concept} for a large-scale application?"
            else:
                question = "Invalid difficulty level."
            questions.append(question)
        
        return questions
    except Exception as e:
        return {"error": str(e)}
