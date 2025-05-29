import json
import os
import torch
from datasets import Dataset
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    TrainingArguments,
    Trainer,
    DataCollatorForLanguageModeling
)
from peft import get_peft_model, LoraConfig, TaskType

# Configuration
MODEL_NAME = "meta-llama/Llama-3.2-3B-Instruct"  # Name of the Llama 3.2 3B model
JSON_FILE_PATH = "training_data.json"  # Path to the JSON file with training data
OUTPUT_DIR = "llama-3-2-finetuned"  # Directory to save the fine-tuned model
LORA_R = 8  # Rank of the LoRA matrix
LORA_ALPHA = 16  # LoRA scaling
LORA_DROPOUT = 0.05  # Dropout rate for LoRA

# Check if GPU is available
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using: {device}")

# Load data from JSON file
def load_data(json_path):
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data

# Process data into the appropriate format
def process_data(data):
    # JSON format with "input" and "output"
    # [{"input": "...", "output": "..."}, ...]
    
    examples = []
    for item in data:
        # Format appropriate for instruction and response in Llama style
        text = f"<|system|>\nYou are a helpful and respectful assistant.\n<|user|>\n{item['input']}\n<|assistant|>\n{item['output']}"
        examples.append({"text": text})
    
    return Dataset.from_list(examples)

# Load tokenizer and model
def load_model_and_tokenizer():
    print("Loading tokenizer...")
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME, trust_remote_code=True)
    tokenizer.pad_token = tokenizer.eos_token
    
    print("Loading model...")
    model = AutoModelForCausalLM.from_pretrained(
        MODEL_NAME,
        torch_dtype=torch.float16,
        device_map="auto",
        trust_remote_code=True
    )
    
    # Configure LoRA for efficient fine-tuning
    peft_config = LoraConfig(
        task_type=TaskType.CAUSAL_LM,
        inference_mode=False,
        r=LORA_R,
        lora_alpha=LORA_ALPHA,
        lora_dropout=LORA_DROPOUT,
        target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],  # Typical attention modules for Llama
    )
    
    model = get_peft_model(model, peft_config)
    model.print_trainable_parameters()
    
    return tokenizer, model

# Function to tokenize the data
def tokenize_data(data, tokenizer):
    def tokenize_function(examples):
        return tokenizer(
            examples["text"],
            truncation=True,
            max_length=512,
            padding="max_length"
        )
    
    tokenized_data = data.map(tokenize_function, batched=True)
    return tokenized_data

# Main function
def main():
    print("Starting the fine-tuning process...")
    
    # Load data
    print("Loading data from JSON file...")
    raw_data = load_data(JSON_FILE_PATH)
    
    # Process data
    print("Processing data...")
    processed_data = process_data(raw_data)
    
    # Load model and tokenizer
    tokenizer, model = load_model_and_tokenizer()
    
    # Tokenize data
    tokenized_data = tokenize_data(processed_data, tokenizer)
    
    # Configure training
    training_args = TrainingArguments(
        output_dir=OUTPUT_DIR,
        per_device_train_batch_size=4,
        gradient_accumulation_steps=4,
        num_train_epochs=3,
        learning_rate=2e-4,
        fp16=True,
        logging_steps=100,
        save_steps=500,
        save_total_limit=3,
        report_to="tensorboard",
        optim="adamw_torch",
    )
    
    # Configure Trainer
    data_collator = DataCollatorForLanguageModeling(
        tokenizer=tokenizer,
        mlm=False  # We don't use masked language modeling for causal models like Llama
    )
    
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized_data,
        data_collator=data_collator,
    )
    
    # Start training
    print("Starting training...")
    trainer.train()
    
    # Save fine-tuned model
    print(f"Saving model to directory: {OUTPUT_DIR}")
    trainer.save_model(OUTPUT_DIR)
    tokenizer.save_pretrained(OUTPUT_DIR)
    
    print("Fine-tuning completed successfully!")

if __name__ == "__main__":
    main()