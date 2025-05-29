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
        # Loop through each message pair
        messages = conversation.get('messages', [])
        for i in range(0, len(messages), 2):
            input_message = messages[i].get('input')
            response_message = messages[i-1].get('response')
            
            if input_message and response_message:
                simplified_data.append({
                    'input': input_message,
                    'output': response_message
                })
    
    # Write the simplified data to the output file in the requested format
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(simplified_data, f, ensure_ascii=False, indent=2)  # Adjusted indent to 2

# Specify the input and output file paths
#input_file = '/home/miguelfigueiredo/Desktop/Generated/texts.json'  # Replace with your input file path
inut_file='/home/miguelfigueiredo/Desktop/Generated/training_data.json'
output_file = 'simplified_conversations.json'  # Replace with your desired output file path

# Call the function to convert the data
convert_conversations(input_file, output_file)
