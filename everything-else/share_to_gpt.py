import json
import uuid

def convert_llama_to_openai(input_path, output_path):
    with open(input_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    converted = []

    for entry in data:
        conv = []
        tool_call_map = {}

        # Add system prompt if present
        if "system" in entry:
            conv.append({
                "role": "system",
                "content": entry["system"]
            })

        for msg in entry["conversations"]:
            role = msg["from"]
            value = msg["value"]

            if role == "human":
                conv.append({
                    "role": "user",
                    "content": value
                })

            elif role == "gpt":
                conv.append({
                    "role": "assistant",
                    "content": value
                })

            elif role == "function_call":
                call = json.loads(value)
                call_id = str(uuid.uuid4())
                tool_call_map[call_id] = call["name"]

                conv.append({
                    "role": "assistant",
                    "content": None,
                    "tool_calls": [
                        {
                            "id": call_id,
                            "type": "function",
                            "function": {
                                "name": call["name"],
                                "arguments": json.dumps(call["arguments"])
                            }
                        }
                    ]
                })

            elif role == "observation":
                # Find the last tool call to match this observation
                last_tool_call_id = list(tool_call_map.keys())[-1]
                last_tool_name = tool_call_map[last_tool_call_id]

                conv.append({
                    "role": "tool",
                    "tool_call_id": last_tool_call_id,
                    "content": value
                })

        converted.append({
            "messages": conv
        })

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(converted, f, indent=2, ensure_ascii=False)

    print(f"✅ Converted {len(converted)} conversation(s) to OpenAI format and saved to {output_path}")

# Example usage:
convert_llama_to_openai("openai_en_dataset.json", "openaidatadataset.json")
