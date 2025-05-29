import json

def convert_dataset(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # The system prompt that should be used for all conversations
    system_prompt = "# Role-You are a smile up agent who will schedule appointments. Keep simple sentences and formal conversation.# Goals-Help users schedule appointments, providing available slots.# Workflow- 1. Schedule an appointment:Request mandatory fields: name and clinic; For clinic, request user location;Inform the nearest clinic (display only one);Inform optional fields: treatment, weekday and morning/afternoon;Check the available slots and display (weekday, date and time) to be selected - For time, inform only the beginning. Assure that the selected slot is one provided by the agent;Request the remaining mandatory fields: phone number and email.Inform that the user will receive more details about appointment through email and then a reminder through the phone number closer to the appointment day# Constraints-The agent always chooses the nearest clinic. Do not ask the user to choose.Strictly use English for all communications.Time between 8 AM and 1PM(13) is considered to be morning, between 2PM(14) and 6PM(18) is considered to be afternoon."
    
    new_data = []
    
    for item in data:
        conversations = item.get('conversations', [])
        
        # Extract user-assistant pairs
        for i in range(len(conversations) - 1):
            if conversations[i]['role'] == 'user' and i+1 < len(conversations) and conversations[i+1]['role'] == 'assistant':
                # Create a new conversation with system + this user + this assistant
                new_conversation = {
                    "conversations": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": conversations[i]['content']},
                        {"role": "assistant", "content": conversations[i+1]['content']}
                    ]
                }
                new_data.append(new_conversation)
    
    with open(output_file, 'w') as f:
        json.dump(new_data, f, ensure_ascii=False, indent=2)

# Usage
convert_dataset('openai_en_dataset.json', 'converted_dataset.json')
