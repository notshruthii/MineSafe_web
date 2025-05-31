import sys
import ollama

print(sys.executable)
print(sys.path)
print("Import successful!")

user_data = sys.argv[1]

# System message and user message combined as a single prompt
prompt = f"""
You are a report generator for a mining company. Based on the following input, write a well-formatted safety report.

Input: {user_data}

Output format:
- Title
- Incident Description
- Possible Risk Level (Low/Medium/High)
- Recommended Action
"""

response = ollama.chat(
    model='gemma:2b',
    messages=[
        {'role': 'user', 'content': prompt}
    ]
)

report_text = response['message']['content']

# Save report
with open("report.txt", "w") as f:
    f.write(report_text)

print("Report generated and saved to report.txt")
