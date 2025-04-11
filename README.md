# generate_data
This repository holds some of the scripts/programs used to generate data to be used for finetuning ai models 

python scripts :
generate.py -> we create entries 

generate.py + convert_conversations.py -> Format = [{"input":"client_prompt","output":"agent_response"},{..}]
generate.py + conver_conversations.py+ addcontrol.py -> Format=[{“instruction”:”control_statment”,”input”:”client_prompt”,”output”:”agent_response”},….]

This was too short on variance so i tried messing with faker library on node.js.

