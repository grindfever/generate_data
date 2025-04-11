# generate_data
This repository holds some of the scripts/programs used to generate data to be used for finetuning models 

python scripts :
generate.py -> we create entries 

generate.py + convert_conversations.py -> Format = [{"input":"client_prompt","output":"agent_response"},{..}]
generate.py + conver_conversations.py+ addcontrol.py -> Format=[{“instruction”:”control_statment”,”input”:”client_prompt”,”output”:”agent_response”},….]

Use the scripts :
python script_name.py
or 
python3 script_name.py

This was too short on variance so i tried messing with faker library on node.js.
npm version 10.8.2
node version 18.20.8
do :
npm install @faker-js/faker to be able to use the node.js script :

use node script:
node generate-dataset.js > dental_appointment_dataset.json
