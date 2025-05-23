import random
import tkinter as tk
from tkinter import ttk

def generate_random_math_fact(max_value=12):
    """Generates a random addition, subtraction, multiplication, or division math fact."""
    operation = random.choice(['+', '-', '*', '/'])
    num1 = random.randint(1, max_value)  # Avoid division by zero

    if operation == '+':
        num2 = random.randint(0, max_value)
        answer = num1 + num2
        return f"{num1} + {num2} = ______________"
    elif operation == '-':
        num2 = random.randint(0, max_value)
        if num1 < num2:
            num1, num2 = num2, num1
        answer = num1 - num2
        return f"{num1} - {num2} = ______________"
    elif operation == '*':
        num2 = random.randint(0, max_value)
        answer = num1 * num2
        return f"{num1} * {num2} = ______________"
    else:  # operation == '/'
        factors = [i for i in range(1, num1 + 1) if num1 % i == 0 and i <= max_value and num1 // i <= max_value]
        if not factors:
            # If no suitable divisor is found, default to multiplication
            num2 = random.randint(0, max_value)
            answer = num1 * num2
            return f"{num1} * {num2} = ______________"
        else:
            num2 = random.choice(factors)
            answer = num1 // num2
            return f"{num1} / {num2} = ______________"

def update_fact():
    """Updates the math fact displayed in the label."""
    new_fact = generate_random_math_fact()
    fact_label.config(text=new_fact)

# Create the main window
window = tk.Tk()
window.title("Random Math Facts")

# Create a label to display the math fact
fact_label = ttk.Label(window, text="", font=("Arial", 24))
fact_label.pack(padx=20, pady=20)

# Generate and display the initial math fact
update_fact()

# Create a button to generate a new fact
new_fact_button = ttk.Button(window, text="Generate New Fact", command=update_fact)
new_fact_button.pack(pady=10)

# Start the Tkinter event loop
window.mainloop()

