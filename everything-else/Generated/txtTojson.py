import json
import re

def txt_to_json(txt_file, json_file):
    with open(txt_file, 'r', encoding='utf-8') as file:
        lines = file.readlines()
    
    conversations = []
    conversation_block = []  # Holds dialogue lines for current conversation
    current_convo_id = None

    def flush_conversation(convo_id, block):
        messages = []
        for msg_line in block:
            match = re.match(r"^(Agente|Cliente)\s*[\:\-]\s*(.*)$", msg_line)
            if match:
                speaker, text = match.groups()
                # Convert speaker to Watsonx format
                if speaker == "Cliente":
                    messages.append({"input": text})
                elif speaker == "Agente":
                    messages.append({"response": text})
        if messages:
            return {"id": convo_id, "messages": messages}
        else:
            return None

    for line in lines:
        line = line.strip()
        if not line:
            continue  # Skip blank lines

        if line.startswith("#"):
            if conversation_block:
                convo = flush_conversation(current_convo_id, conversation_block)
                if convo is not None:
                    conversations.append(convo)
                
                conversation_block = []
            # Set new conversation ID
            id_str = line[1:].strip()
            try:
                current_convo_id = int(id_str)
            except ValueError:
                current_convo_id = id_str
        else:
            # Add lines containing "Agente" or "Cliente" to the block
            if "Agente" in line or "Cliente" in line:
                conversation_block.append(line)
    
    # Process the last conversation if there is any left
    if conversation_block:
        convo = flush_conversation(current_convo_id, conversation_block)
        if convo is not None:
            conversations.append(convo)

    # Write the conversations to the output JSON file
    with open(json_file, 'w', encoding='utf-8') as json_out:
        json.dump(conversations, json_out, ensure_ascii=False, indent=4)

    print(f"Data successfully converted to {json_file}")

# File paths
txt_file = "/home/miguelfigueiredo/Desktop/Generated/texts.txt"
json_file = "/home/miguelfigueiredo/Desktop/Generated/output.json"

txt_to_json(txt_file, json_file)
