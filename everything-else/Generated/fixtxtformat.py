import re

# Define the file path
file_path = "/home/miguelfigueiredo/Desktop/texts.txt"

def standardize_dialogue(text):
    # Ensure dashes are followed by a space
    text = re.sub(r"Agente\s*-\s*", "Agente - ", text)
    text = re.sub(r"Cliente\s*-\s*", "Cliente - ", text)

    # Remove extra spaces at the start and end of lines
    text = "\n".join(line.strip() for line in text.split("\n"))

    # Ensure consistent line breaks (one between each line)
    text = re.sub(r"\n{2,}", "\n", text)

    return text

# Read the file
with open(file_path, "r", encoding="utf-8") as file:
    content = file.read()

# Process the dialogue
formatted_content = standardize_dialogue(content)

# Write back to the same file
with open(file_path, "w", encoding="utf-8") as file:
    file.write(formatted_content)

print("File formatting complete!")
