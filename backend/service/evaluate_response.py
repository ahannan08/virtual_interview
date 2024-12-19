def evaluate_response(question, user_response, difficulty):
    """Evaluate the user's response to a question based on the difficulty level."""
    try:
        score = 0
        feedback = ""
        keywords = {
            "beginner": ["basic", "definition", "concepts"],
            "intermediate": ["example", "use case", "implementation"],
            "advanced": ["optimization", "scalability", "design patterns"]
        }

        # Logic for evaluating based on difficulty
        if difficulty == "beginner":
            if len(user_response.split()) >= 10 and any(keyword in user_response.lower() for keyword in keywords[difficulty]):
                feedback = "Correctness: High. You covered the required concepts."
                score = 1
            else:
                feedback = f"Correctness: Low. Try to include the following keywords: {', '.join(keywords[difficulty])}."
        
        elif difficulty == "intermediate":
            if len(user_response.split()) >= 20 and any(keyword in user_response.lower() for keyword in keywords[difficulty]):
                feedback = "Correctness: Medium. Good explanation with examples."
                score = 2
            else:
                feedback = f"Correctness: Low. Provide examples and revise topics. Consider using keywords: {', '.join(keywords[difficulty])}."
        
        elif difficulty == "advanced":
            if len(user_response.split()) >= 30 and any(keyword in user_response.lower() for keyword in keywords[difficulty]):
                feedback = "Correctness: High. You provided a detailed response. Suggested areas for further improvement."
                score = 3
            else:
                feedback = f"Correctness: Medium. Provide a more in-depth explanation. Include keywords: {', '.join(keywords[difficulty])}."
        
        return feedback, score

    except Exception as e:
        return {"error": str(e)}, 0
