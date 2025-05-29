import json
import re

def convert_txt_to_json(input_file, output_file):
    """
    Converts a text file with conversations to a JSON file with input-output pairs.
    Handles:
    - Consecutive messages from the same speaker by combining them
    - Creates appropriate input-output pairs maintaining conversation flow
    - Handles potential misalignments in conversation
    """
    try:
        with open(input_file, 'r', encoding='utf-8') as file:
            content = file.read()
    except FileNotFoundError:
        print(f"Error: File {input_file} not found.")
        return 0
    except Exception as e:
        print(f"Error reading file: {e}")
        return 0
    
    # Split content by conversation blocks using the # marker
    conversation_blocks = re.split(r'#\d+\s*\n', content)
    # Remove any empty blocks
    conversation_blocks = [block.strip() for block in conversation_blocks if block.strip()]
    
    all_pairs = []
    
    for block_idx, block in enumerate(conversation_blocks):
        # Parse the block into a list of (speaker, text) tuples
        messages = []
        current_speaker = None
        current_text = ""
        
        lines = block.split('\n')
        for line in lines:
            line = line.strip()
            if not line:
                continue
                
            # Match the speaker and the text
            match = re.match(r"^(Agente|Cliente)\s*[\-\:]\s*(.*)$", line)
            if not match:
                # If not a standard format line, add to current text if we have a speaker
                if current_speaker:
                    current_text += " " + line
                continue
                
            speaker, text = match.groups()
            
            # If speaker changes, store the previous message and start a new one
            if current_speaker and current_speaker != speaker:
                messages.append((current_speaker, current_text.strip()))
                current_text = text
            elif current_speaker == speaker:
                # Same speaker, append to current text
                current_text += " " + text
            else:
                # First speaker in the conversation
                current_text = text
                
            current_speaker = speaker
        
        # Don't forget the last message
        if current_speaker and current_text:
            messages.append((current_speaker, current_text.strip()))
        
        # Now create input-output pairs
        i = 0
        while i < len(messages) - 1:  # -1, because we need at least one more message
            speaker, text = messages[i]
            
            # We want Cliente as input, Agente as output
            if speaker == "Cliente":
                # Look ahead for the next Agente response
                j = i + 1
                while j < len(messages) and messages[j][0] != "Agente":
                    j += 1
                
                if j < len(messages):  # Found an Agente response
                    cliente_inputs = [text]
                    # Collect any consecutive Cliente messages
                    k = i + 1
                    while k < j and messages[k][0] == "Cliente":
                        cliente_inputs.append(messages[k][1])
                        k += 1
                    
                    # Combine all Cliente inputs
                    combined_input = " ".join(cliente_inputs)
                    # Get the Agente output
                    agente_output = messages[j][1]
                    
                    # Create the pair
                    all_pairs.append({
                        "input": combined_input,
                        "output": agente_output
                    })
                    
                    i = j + 1  # Move past the Agente message
                else:
                    # No Agente response found, skip this Cliente message
                    i += 1
            else:
                # Skip Agente messages that don't follow a Cliente message
                i += 1
    
    # Write to JSON file
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(all_pairs, f, ensure_ascii=False, indent=2)
        
        print(f"Successfully created {len(all_pairs)} input-output pairs in {output_file}")
        return len(all_pairs)
    except Exception as e:
        print(f"Error writing to file: {e}")
        return 0

def process_conversation_file():
    input_file = input("/home/miguelfigueiredo/Desktop/Generated/texts.txt").strip()
    if not input_file:
        input_file = "texts.txt"  # Default filename
        
    output_file = input("Enter the path for the output JSON file [default: training_data.json]: ").strip()
    if not output_file:
        output_file = "/home/miguelfigueiredo/Desktop/Generated/training_data.json"  # Default output filename
        
    num_pairs = convert_txt_to_json(input_file, output_file)
    if num_pairs > 0:
        print(f"Created {num_pairs} training pairs.")
    else:
        print("Conversion failed.")

if __name__ == "__main__":
    process_conversation_file()