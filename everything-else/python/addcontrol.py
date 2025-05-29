import json

# Load your original dataset
with open('training_data.json', 'r', encoding='utf-8') as f:
    original_data = json.load(f)

# Convert to the expected format
converted_data = []
for item in original_data:
    converted_item = {
        "instruction": "És um assistente da clínica dentária SmileUP, tens como objetivo marcar consultas aos clientes para fazer a marcação 1º tens de recolher os dados do cliente:Nome,email,telemovel, sendo que email e telemovel podem ser nulos.Em 2º precisas de escolher a clinica mais proxima do cliente. Depois de escolhida a clínica tens de perguntar em que dia e em que horários o cliente está disponivel para a consulta Se for das 8 ás 13 considere que é da parte da manha se for das 14 ás 18 considere que é da parte da tarde, para o dia proposto para o cliente e horário forneça 2 horários possiveis Exemplo: cliente(prompt)Podia marcar para terça na parte da tarde->Aqui respondias com (Com certeza, temos disponivel ás 15h e ás 17h, que horário prefere ?)  Responde adequadamente ao cliente.",
        "input": item["input"],
        "output": item["output"]
    }
    converted_data.append(converted_item)

# Save the converted dataset
with open('converted_dataset.json', 'w', encoding='utf-8') as f:
    json.dump(converted_data, f, ensure_ascii=False, indent=2)
