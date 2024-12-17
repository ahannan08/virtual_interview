import os
import random
import time
from groq import Groq

# Initialize Groq client
client = Groq(api_key="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")

# Concept Arrays for Each Role
role_concepts = {
    "frontend": ["React", "Redux", "JSX", "CSS Flexbox", "Virtual DOM"],
    "backend": ["Node.js", "Express.js", "REST APIs", "Database Design", "Authentication"],
    "fullstack": ["React", "Node.js", "Microservices", "API Integration", "Database Scaling"],
    "ai_engineer": ["Neural Networks", "Machine Learning", "TensorFlow", "Data Preprocessing", "Reinforcement Learning"]
}

def generate_question(role, difficulty):
    """Generate a question for a given role and difficulty level."""
    try:
        # Randomly select a concept from the role's concept array
        concept = random.choice(role_concepts.get(role, []))
        
        if difficulty == "beginner":
            question = f"What is {concept}, and why is it used?"
        elif difficulty == "intermediate":
            question = f"Write a script or explain how {concept} can be used in a real-world application."
        elif difficulty == "advanced":
            question = f"How would you optimize or design a system using {concept} for a large-scale application?"
        else:
            question = "Invalid difficulty level."
        
        return question
    except Exception as e:
        return {"error": str(e)}

def evaluate_response(question, user_response, difficulty):
    """Evaluate the user's response to a question based on the difficulty level."""
    try:
        score = 0
        feedback = ""
        
        # Logic for evaluating based on difficulty
        if difficulty == "beginner":
            if len(user_response.split()) >= 20:
                feedback = "Correctness: High. You covered the required concepts."
                score = 1
            else:
                feedback = "Correctness: Low. Try to include the following keywords: basic concepts."
        
        elif difficulty == "intermediate":
            if len(user_response.split()) >= 40 and "example" in user_response.lower():
                feedback = "Correctness: Medium. Good explanation with examples."
                score = 2
            else:
                feedback = "Correctness: Low. Provide examples and revise topics."
        
        elif difficulty == "advanced":
            if len(user_response.split()) >= 50:
                feedback = "Correctness: High. You provided a detailed response. Suggested areas for further improvement."
                score = 3
            else:
                feedback = "Correctness: Medium. Provide a more in-depth explanation."
        
        return feedback, score
    except Exception as e:
        return {"error": str(e)}, 0

if __name__ == "__main__":
    print("Virtual Interview Workflow:")

    role = input("Enter your role (frontend/backend/fullstack/ai_engineer): ").strip().lower()
    difficulty = input("Select difficulty level (beginner/intermediate/advanced): ").strip().lower()

    if difficulty == "beginner":
        num_questions = 5
    elif difficulty == "intermediate":
        num_questions = 3
    elif difficulty == "advanced":
        num_questions = 2
    else:
        print("Invalid difficulty level. Exiting.")
        exit()

    total_score = 0
    for i in range(num_questions):
        print(f"\nQuestion {i + 1}:")
        question = generate_question(role, difficulty)
        print(question)
        start_time = time.time()
        user_response = input("Enter your response: ")
        end_time = time.time()

        if end_time - start_time > 120:
            print("Time's up! Moving to the next question.")
            continue

        feedback, score = evaluate_response(question, user_response, difficulty)
        print("Feedback:", feedback)
        total_score += score

    print(f"\nYour total score: {total_score}/{num_questions * (1 if difficulty == 'beginner' else 2 if difficulty == 'intermediate' else 3)}")
