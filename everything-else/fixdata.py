#!/usr/bin/env python3
import json
import os
import sys
import copy

def fix_consecutive_assistant_messages(data):
    """Fix datasets by merging consecutive assistant messages"""
    fixed_data = []
    
    for sample_idx, sample in enumerate(data):
        if "conversations" not in sample:
            print(f"Skipping sample {sample_idx} - missing conversations field")
            continue
            
        conversations = sample["conversations"]
        fixed_conversations = []
        i = 0
        
        while i < len(conversations):
            current = conversations[i]
            
            # Add non-assistant messages directly
            if current["role"] != "assistant":
                fixed_conversations.append(current)
                i += 1
                continue
                
            # For assistant messages, check if the next message is also from assistant
            merged_assistant = copy.deepcopy(current)
            i += 1
            
            # Keep merging as long as we find consecutive assistant messages
            while i < len(conversations) and conversations[i]["role"] == "assistant":
                next_msg = conversations[i]
                
                # Merge tool_calls if they exist
                if "tool_calls" in next_msg:
                    if "tool_calls" not in merged_assistant:
                        merged_assistant["tool_calls"] = []
                    merged_assistant["tool_calls"] = next_msg["tool_calls"]
                
                # Append content if it exists and isn't empty
                if "content" in next_msg and next_msg["content"] and next_msg["content"].strip():
                    if "content" in merged_assistant and merged_assistant["content"]:
                        merged_assistant["content"] += "\n" + next_msg["content"]
                    else:
                        merged_assistant["content"] = next_msg["content"]
                
                i += 1
            
            fixed_conversations.append(merged_assistant)
        
        # Create a new sample with fixed conversations
        fixed_sample = copy.deepcopy(sample)
        fixed_sample["conversations"] = fixed_conversations
        fixed_data.append(fixed_sample)
    
    return fixed_data

def main():
    if len(sys.argv) < 2:
        print("Usage: python fix_dataset.py <input_dataset.json> [output_dataset.json]")
        return
        
    input_path = sys.argv[1]
    output_path = sys.argv[2] if len(sys.argv) > 2 else input_path + ".fixed.json"
    
    if not os.path.exists(input_path):
        print(f"ERROR: File {input_path} not found")
        return
        
    try:
        with open(input_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        print(f"ERROR: Invalid JSON in {input_path}")
        print(f"JSON error: {e}")
        return
        
    print(f"Processing dataset: {input_path}")
    fixed_data = fix_consecutive_assistant_messages(data)
    
    print(f"Writing fixed dataset to: {output_path}")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(fixed_data, f, indent=2, ensure_ascii=False)
    
    print(f"Done! Fixed {len(fixed_data)} samples")
        
if __name__ == "__main__":
    main()
