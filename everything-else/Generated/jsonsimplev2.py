import json

# Function to convert structured conversation data into simplified input-output pairs
def convert_conversations(input_file, output_file):
    # Open and load the input JSON file
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # List to store the simplified input-output pairs
    simplified_data = []

    # Iterate over each conversation
    for conversation in data:
        messages = conversation.get('messages', [])
        
        is_input = False  # Flag to track consecutive inputs
        input_message = None  # Store consecutive inputs
        response_message = None  # Store previous response

        for i in range(len(messages)):
            msg = messages[i]

            if "input" in msg:
                if is_input:
                    # If we are in an input sequence, concatenate with a line break
                    input_message += "\n" + msg["input"]
                else:
                    input_message = msg["input"]
                    is_input = True  # Start tracking input sequence
            elif "response" in msg:
                if response_message is None:
                    response_message = msg["response"]
                else:
                    # Concatenate consecutive responses
                    response_message += "\n" + msg["response"]

                # If there was an input before, store the pair
                if input_message:
                    simplified_data.append({
                        "input": input_message,
                        "output": response_message
                    })
                    # Reset for the next pair
                    input_message = None
                    response_message = None
                    is_input = False  # Reset input tracking

        # If the last message was input without a response, still save it
        if input_message:
            simplified_data.append({
                "input": input_message,
                "output": response_message if response_message else ""
            })

    # Write the simplified data to the output file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(simplified_data, f, ensure_ascii=False, indent=2)

# Specify the input and output file paths
#input_file = '/home/miguelfigueiredo/Desktop/Generated/texts.json'  # Replace with your input file path
input_file = '/home/miguelfigueiredo/Desktop/Generated/training_data.json'
output_file = 'newtune2.json'  # Replace with your desired output file path

# Call the function to convert the data
convert_conversations(input_file, output_file)

