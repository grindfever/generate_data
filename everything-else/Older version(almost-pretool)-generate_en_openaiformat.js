const { faker } = require('@faker-js/faker/locale/en');

// Configure faker to use English
faker.locale = 'en';

const sysprompt= "# Role-You are a smile up agent who will schedule appointments. Keep simple sentences and formal conversation.#Tools- You have access to the SmileUp API, where you can use these two functions: -get_locations(location),which should return a list of possible clinics the user can schedule an appointment, if only one clinic appears then propose that clinic to schedule the user appointment , if more than one clinic appear then pick the first one to propose to the user, if he asks for more clinics show him all clinics available. -get_slots(period?,time?),where period is a string('morning' or 'afternoon')and time is a integer between 8 and 18  can be 'morning','afternoon',the tool returns two available slots and match is true if the time is included in slots.If match is true:you should just accept the user proposed schedule if not then you should display the slots for the user to choose from.  # Goals-Help users schedule appointments, providing available slots.# Workflow- 1. Schedule an appointment:Request mandatory fields: name and clinic; For clinic, request user location;Inform the nearest clinic (display only one);Inform optional fields: treatment, weekday and morning/afternoon;Check the available slots and display (weekday, date and time) to be selected - For time, inform only the beginning. Assure that the selected slot is one provided by the agent;Request the remaining mandatory fields: phone number and email.Inform that the user will receive more details about appointment through email and then a reminder through the phone number closer to the appointment day# Constraints-The agent always chooses the nearest clinic. Do not ask the user to choose.Strictly use English for all communications.Time between 8 AM and 1PM(13) is considered to be morning, between 2PM(14) and 6PM(18) is considered to be afternoon.";
// List of SmileUP clinic and locations
const clinics = [
  "Águeda Dental Clinic", "Albufeira Dental Clinic", "Alcântara Dental Clinic",
  "Alegro Alfragide Dental Clinic", "Algés Dental Clinic", "Almada Dental Clinic",
  "Almodôvar Dental Clinic", "Alvalade Dental Clinic", "Amarante Dental Clinic",
  "Arcos de Valdevez Dental Clinic", "Areosa Dental Clinic", "Arroios Dental Clinic",
  "Aveiro Dental Clinic", "Barcelos Dental Clinic", "Barreiro Dental Clinic",
  "Beja Dental Clinic", "Benedita Dental Clinic", "Benfica Dental Clinic", "Braga Dental Clinic",
  "Bragança Dental Clinic", "Caldas da Rainha Dental Clinic", "Campo Alegre Dental Clinic",
  "Cantanhede Dental Clinic", "Carvalhos Dental Clinic", "Castelo Branco Dental Clinic",
  "Chaves Dental Clinic", "Coimbra Dental Clinic", "Covilhã Dental Clinic", "El Corte Inglés Dental Clinic",
  "Ermesinde Dental Clinic", "Espaço Guimarães Dental Clinic", "Espinho Dental Clinic", "Évora Dental Clinic",
  "Fafe Dental Clinic", "Faro Dental Clinic", "Figueira da Foz Dental Clinic", "Forum Viseu Dental Clinic",
  "Gondomar Dental Clinic", "Guarda Dental Clinic", "Guimarães Dental Clinic", "Ílhavo Dental Clinic",
  "Lagoa Dental Clinic", "Lagos Dental Clinic", "Leiria Dental Clinic", "Loulé Dental Clinic", 
  "Loures Dental Clinic", "Lumiar Dental Clinic", "Madeira Dental Clinic", "Matosinhos Dental Clinic",
  "Montijo Dental Clinic", "Odivelas Dental Clinic", "Olhão Dental Clinic", "Paços de Ferreira Dental Clinic",
  "Paredes Dental Clinic", "Penafiel Dental Clinic", "Pombal Dental Clinic", "Portimão Dental Clinic",
  "Póvoa de Varzim Dental Clinic", "Queluz Dental Clinic", "Santarém Dental Clinic", 
  "São João da Madeira Dental Clinic", "Setúbal Dental Clinic", "Silves Dental Clinic", 
  "Sines Dental Clinic", "Tavira Dental Clinic", "Tomar Dental Clinic", "Torres Novas Dental Clinic",
  "Torres Vedras Dental Clinic", "Trindade Domus Dental Clinic", "Viana do Castelo Dental Clinic",
  "Vila Franca de Xira Dental Clinic", "Vila Nova de Famalicão Dental Clinic", "Vila Nova de Gaia Dental Clinic",
  "Vila Real Dental Clinic", "Vila Verde Dental Clinic", "Viseu Dental Clinic"
];

const localizacoes = [
  "Águeda, Aveiro", "Albufeira, Faro", "Alcântara, Lisbon", "Alegro Alfragide, Lisbon", 
  "Algés, Lisbon", "Almada, Setúbal", "Almodôvar, Beja", "Alvalade, Lisbon", "Amarante, Porto", 
  "Arcos de Valdevez, Viana do Castelo", "Areosa (Rio Tinto), Porto", "Arroios, Lisbon", 
  "Aveiro, Aveiro", "Barcelos, Braga", "Barreiro, Setúbal", "Beja, Beja", 
  "Benedita, Leiria", "Benfica, Lisbon", "Braga, Braga", 
  "Caldas da Rainha, Leiria", "Campo Alegre, Porto", "Cantanhede, Coimbra", 
  "Carvalhos, Porto", "Castelo Branco, Castelo Branco", "Chaves, Vila Real", 
  "Coimbra, Coimbra", "Covilhã, Castelo Branco", "El Corte Inglés, Lisbon", 
  "Ermesinde, Porto", "Espaço Guimarães, Braga", "Espinho, Aveiro", "Évora, Évora", 
  "Fafe, Braga", "Faro, Faro", "Figueira da Foz, Coimbra", "Figueira da Foz, Coimbra", 
  "Forum Viseu, Viseu", "Gondomar, Porto", "Guarda, Guarda", "Guimarães, Braga", 
  "Ílhavo, Aveiro", "Lagos, Faro", "Lagos, Faro", "Leiria, Leiria", "Loulé, Faro", 
  "Loures, Lisbon", "Lumiar, Lisbon", "Funchal, Madeira", "Matosinhos, Porto", 
  "Montijo, Setúbal", "Odivelas, Lisbon", "Olhão, Faro", "Paços de Ferreira, Porto", 
  "Paredes, Porto", "Penafiel, Porto", "Pombal, Leiria", "Portimão, Faro", 
  "Póvoa de Varzim, Porto", "Queluz, Lisbon", "Santarém, Santarém", 
  "São João da Madeira, Aveiro", "Setúbal, Setúbal", "Silves, Faro", 
  "Sines, Setúbal", "Tavira, Faro", "Tomar, Santarém", "Torres Novas, Santarém", 
  "Torres Vedras, Lisbon", "Trindade Domus, Porto", "Viana do Castelo, Viana do Castelo", 
  "Vila Franca de Xira, Lisbon", "Vila Nova de Famalicão, Braga", 
  "Vila Nova de Gaia, Porto", "Vila Real, Vila Real", "Vila Verde, Braga", "Viseu, Viseu"
];



// Time periods
const timeSlots = {
  "morning": [8,9, 10, 11, 12],
  "afternoon": [14, 15, 16, 17, 18]
};
function generateClinicContent(selectedClinicIndex){
  const content=[
    `{\"clinics\": [\"${clinics[selectedClinicIndex]}\"]}`,
    "{\"clinics\":[\"Alcântara Dental Clinic\",\"Alegro Alfragide Dental Clinic\",\"Algés Dental Clinic\",\"Alvalade Dental Clinic\",\"Arroios Dental Clinic\",\"Benfica Dental Clinic\",\"El Corte Inglés Dental Clinic\",\"Loures Dental Clinic\",\"Lumiar Dental Clinic\",\"Odivelas Dental Clinic\",\"Queluz Dental Clinic\",\"Torres Vedras Dental Clinic\",\"Vila Franca de Xira Dental Clinic\"]}",
    "{\"clinics\":[\"Amarante Dental Clinic\",\"Areosa (Rio Tinto) Dental Clinic\",\"Campo Alegre Dental Clinic\",\"Carvalhos Dental Clinic\",\"Ermesinde Dental Clinic\",\"Gondomar Dental Clinic\",\"Matosinhos Dental Clinic\",\"Paços de Ferreira Dental Clinic\",\"Paredes Dental Clinic\",\"Penafiel Dental Clinic\",\"Póvoa de Varzim Dental Clinic\",\"Trindade Domus Dental Clinic\",\"Vila Nova de Gaia Dental Clinic\"]}",
    "{\"clinics\":[\"Almodôvar Dental Clinic\",\"Beja Dental Clinic\"]}",
    "{\"clinics\":[\"Almada Dental Clinic\",\"Barreiro Dental Clinic\",\"Montijo Dental Clinic\",\"Setúbal Dental Clinic\",\"Sines Dental Clinic\"]}",
    "{\"clinics\":[\"Albufeira Dental Clinic\",\"Faro Dental Clinic\",\"Lagos Dental Clinic\",\"Lagos Dental Clinic\",\"Loulé Dental Clinic\",\"Olhão Dental Clinic\",\"Portimão Dental Clinic\",\"Silves Dental Clinic\",\"Tavira Dental Clinic\"]}",
    "{\"clinics\":[\"Arcos de Valdevez Dental Clinic\",\"Viana do Castelo Dental Clinic\"]}",
    "{\"clinics\":[\"Forum Viseu Dental Clinic\",\"Viseu Dental Clinic\"]}",
    "{\"clinics\":[\"Chaves Dental Clinic\",\"Vila Real Dental Clinic\"]}",
    "{\"clinics\":[\"Barcelos Dental Clinic\",\"Braga Dental Clinic\",\"Espaço Guimarães Dental Clinic\",\"Fafe Dental Clinic\",\"Guimarães Dental Clinic\",\"Vila Nova de Famalicão Dental Clinic\",\"Vila Verde Dental Clinic\"]}",
    "{\"clinics\":[\"Águeda Dental Clinic\",\"Aveiro Dental Clinic\",\"Espinho Dental Clinic\",\"Ílhavo Dental Clinic\",\"São João da Madeira Dental Clinic\"]}",
    "{\"clinics\":[\"Benedita Dental Clinic\",\"Caldas da Rainha Dental Clinic\",\"Leiria Dental Clinic\",\"Pombal Dental Clinic\"]}",
    "{\"clinics\":[\"Cantanhede Dental Clinic\",\"Coimbra Dental Clinic\",\"Figueira da Foz Dental Clinic\",\"Figueira da Foz Dental Clinic\"]}",
    "{\"clinics\":[\"Castelo Branco Dental Clinic\",\"Covilhã Dental Clinic\"]}"
  ];
  return faker.helpers.arrayElement(content);
}


function getRandomDistinctPair(arr) {
      const shuffled = arr.slice().sort(() => 0.5 - Math.random());
      return [shuffled[0], shuffled.find(x => x !== shuffled[0])];
}
    
function generateSlotContent(selectedTime) {
      const morningSlots = [8, 9, 10, 11, 12];
      const afternoonSlots = [14, 15, 16, 17];
    
      // Check for invalid input
      if (!Number.isInteger(selectedTime)) {
        return `{"error":"Please provide a valid time or period."}`;
      }
    
      const period = getPeriodByTime(selectedTime);
    
      if (!period) {
        return `{"error":"No slots available for that time."}`;
      }
    
      const slots = period === "morning" ? morningSlots : afternoonSlots;
    
      // Randomly decide if selectedTime should be included
      const match = Math.random() < 0.5;
    
      let finalSlots;
      if (match) {
        const others = slots.filter(s => s !== selectedTime);
        const secondSlot = others[Math.floor(Math.random() * others.length)];
        finalSlots = [selectedTime, secondSlot];
      } else {
        const filtered = slots.filter(s => s !== selectedTime);
        finalSlots = getRandomDistinctPair(filtered);
      }
    
      return `{"slots":[${finalSlots[0]},${finalSlots[1]}],"match":${match}}`;
}


// Days of the week 
const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

// Generate agent greeting variations
function generateAgentGreeting() {
  const greetings = [
    "Hello, good morning! I'm an assistant from SmileUP, how can I help you schedule your dental appointment?",
    "Welcome to SmileUP! I'm the scheduling assistant, can I book a dental appointment for you?",
    "Hi there! SmileUP assistant at your service. Would you like to book a dental appointment?",
    "Good morning, I'm the virtual assistant from SmileUP. Can I help you book your dental appointment?",
    "Hello, I work at SmileUP and I'm here to assist with your dental appointment scheduling."
  ];
  
  return faker.helpers.arrayElement(greetings);
}

function generateClient1stRequest() {
  const options = [
    "Hi.",
    "Hello",
    "Hey",
    "Hey there.",
    "Good day.",
    "Hello there"
  ];
  return faker.helpers.arrayElement(options);
}

function generateClientInitialRequest() {
  const options = [
    "Hello, I would like to book an appointment.",
    "Good afternoon, I need a dentist appointment.",
    "I’d like to schedule a dental appointment, please.",
    "Good morning, is it possible to book an appointment?",
    "I need a dental appointment at SmileUP.",
    "I’d like to know if you have any available slots for an appointment.",
    "I need dental implants and would like to schedule an appointment to learn more about the process.",
    "I need a dental cleaning, do you have availability?",
    "Can I book an appointment for a dental check-up?",
    "I’d like to book an appointment to treat a cavity.",
    "Is it possible to schedule an appointment for me?",
    "Can you tell me the next available slot for an appointment?",
    "I'm looking to schedule an appointment this week.",
    "I'd like to book an appointment for a dental cleaning."
  ];
  return faker.helpers.arrayElement(options);
}

function capitalizer(str) {
  if (!str) return "";
  return str[0].toUpperCase() + str.slice(1);
}


function getPeriodByTime(time) {
  if (time >= 8 && time < 13) return "morning";
  if (time >= 14 && time < 18) return "afternoon";
  return null;
}

function generateTimePreferenceStatement(selectedTime) {
  const period = getPeriodByTime(selectedTime);
  let options = [];

  if (period === "undefined") {
    options = [
      `at ${selectedTime}`,
      `around ${selectedTime} would be fine`,
      `maybe around ${selectedTime}`
    ];
  } else {
    options = [
      `preferably in the ${period}`,
      "any time works for me.",
      "morning or afternoon, either is fine.",
      `maybe around ${selectedTime} o'clock`,
      `during the ${period}`,
      `maybe around ${selectedTime} of the ${period}`,
      `around ${selectedTime} o'clock.`,
      `how about ${selectedTime} in the ${period}?`,
      `I’m available at ${selectedTime} in the ${period}`,
      `Can it be at ${selectedTime} in the ${period}?`,

    ];
  }
  return faker.helpers.arrayElement(options);
}

function generateDayPreferenceStatement(selectedDay) {
  const options = [
    `I prefer ${selectedDay}`,
    `${capitalizer(selectedDay)}`,
    `I’d like to schedule for ${selectedDay}`,
    "Any weekday works for me",
    "Preferably at the beginning of the week",
    "If possible, later in the week"
  ];
  return faker.helpers.arrayElement(options);
}

// Generate location statement
function generateLocationStatement(index) {
  const location = localizacoes[index];  // Gets the location corresponding to the index

  const options = [
    `I'm located in ${location}.`,
    `I live nearby to ${location}.`,
    `I live in ${location}.`,
    `I'm currently in ${location}.`,
    `My location is ${location}.`,
    `I live in ${location}.`,
    `I reside in ${location}.`,
    `${capitalizer(location)}.`
  ];

  return faker.helpers.arrayElement(options);
}

// Generate agent appointment confirmation
function generateAppointmentConfirmation(day, time, clinic) {
  const options = [
    `Great! Your appointment is scheduled for ${day} at ${time} at our ${clinic}.`,
    `Perfect! Your appointment is set for ${day} at ${time} at the ${clinic}.`,
    `Confirmed! I’ve scheduled your appointment for ${day} at ${time} at SmileUP in ${clinic}.`,
    `Excellent! Your appointment is booked for ${day} at ${time} at our ${clinic}.`,
    `All set! Your appointment is confirmed for ${day} at ${time} at the SmileUP in ${clinic}.`
  ];

  return faker.helpers.arrayElement(options);
}

// Generate client personal info response
function generateClientInfo() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const phone = Math.random() > 0.2 ? faker.phone.number('9########') : null;
  const email = Math.random() > 0.3 ? faker.internet.email({firstName, lastName}) : null;
  
  const phoneStatement = phone ? `my phone number is ${phone}` : "I don't have a phone number";
  const emailStatement = email ? `my email is ${email}` : "I don't have an email";
  
  const options = [
    `My name is ${firstName} ${lastName}, ${phoneStatement} and ${emailStatement}.`,
    `I'm called ${firstName} ${lastName}. ${phoneStatement.charAt(0).toUpperCase() + phoneStatement.slice(1)} and ${emailStatement}.`,
    `${firstName} ${lastName}. For contact, ${phoneStatement} and ${emailStatement}.`,
    `${firstName} ${lastName} is my name. ${phoneStatement.charAt(0).toUpperCase() + phoneStatement.slice(1)}. ${emailStatement.charAt(0).toUpperCase() + emailStatement.slice(1)}.`
  ];
  
  return faker.helpers.arrayElement(options);
}

// Generate conversations
function generateConversation() {
  const conversationFlows = [
    // Flow 1: Standard flow
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
      const selectedClinic = clinics[selectedClinicIndex];
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedPeriod = faker.helpers.arrayElement(["morning", "afternoon"]);
      const selectedTime = faker.helpers.arrayElement(timeSlots[selectedPeriod]);
      
      return {
        "conversations": [
        {
          "role": "system",   
          "content": sysprompt
        },
        {
          "role": "user",
          "content":generateClient1stRequest()
        },
        { "role": "assistant",
          "content": generateAgentGreeting()
        },
      
        {
          "role": "user",
          "content": generateClientInitialRequest()
        },
        {
          "role": "assistant",
          "content": "To book an appointment, I need some of your details. Could you please tell me your full name, email, and phone number?"
        },
        {
          "role": "user",
          "content": generateClientInfo()
        },
        {
          "role": "assistant",
          "content": "Thank you for your information. In which area do you live or work so we can find the closest clinic to you?"
        },
        {
          "role": "user",
          "content": generateLocationStatement(selectedClinicIndex)
        },
    
            // Assistant decides to use the tool and makes the call
        { 
              "role": "assistant", 
              "content": `I'll help you find a clinic near ${localizacoes[selectedClinicIndex]}`,     
        },
        {
          "role": "assistant",
          "tool_calls": [
            {
              "id": "get_locations_id",
              "name": "get_locations",
              "parameters": {"location": localizacoes[selectedClinicIndex]}
            }
          ]
        },
            
            // This represents the API response
        {
              "role": "function",
              "name": "get_locations",
              "content": generateClinicContent(selectedClinicIndex)
        },
            
            // Assistant uses the returned information
        { 
              "role": "assistant", 
              "content": `We have a SmileUP which is ${clinics[selectedClinicIndex]} that is convenient for you. What would be your preferred day and time of day for the appointment?`
        },
        {
          "role": "user",
          "content": `${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(selectedTime)}`
        },
        {
          "role": "assistant",
          "content": `We have availability on ${selectedDay} at ${selectedTime}. Would this time work for you?`
        },
        {
          "role": "user",
          "content": faker.helpers.arrayElement([
            "Yes, that works.",
            "Perfect, I accept.",
            "That time is good for me.",
            "Yes, that time works for me."
          ])
        },
        {
          "role": "assistant",
          "content": `${generateAppointmentConfirmation(selectedDay, selectedTime, selectedClinic)} We’ll send you an email with all the appointment details, and if you provided a phone number, you'll receive a reminder SMS the day before. Is there anything else I can help you with?`
        }
        ]};
    },
    
    // Flow 2: Client requests specific day/time, agent offers alternative
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
      const selectedClinic = clinics[selectedClinicIndex];
      const requestedDay = faker.helpers.arrayElement(weekdays);
      const alternativeDay = faker.helpers.arrayElement(weekdays.filter(day => day !== requestedDay));
      const selectedPeriod = faker.helpers.arrayElement(["morning", "afternoon"]);
      const selectedTime = faker.helpers.arrayElement(timeSlots[selectedPeriod]);
      
      return {
        "conversations": [
        {
          "role": "system",  
          "content": sysprompt
        },
        {
          "role": "user",
          "content": generateClient1stRequest()
        },
        {
          "role": "assistant",
          "content": generateAgentGreeting()
        },
        {
          "role": "user",
          "content": generateClientInitialRequest()
        },
        {
          "role": "assistant",
          "content": "To book an appointment, I need some of your details. Could you please tell me your full name, email, and phone number?"
        },
        {
          "role": "user",
          "content": generateClientInfo()
        },
        {
          "role": "assistant",
          "content": "Thank you for your information. In which area do you live or work so we can find the closest clinic to you?"
        },
        {
          "role": "user",
          "content": generateLocationStatement(selectedClinicIndex)
        },
        {
          "role": "assistant",
          "content": `We have the ${selectedClinic} that could be convenient for you. What would be your preferred day and time of day for the appointment?`
        },
        {
          "role": "user",
          "content": `Would ${requestedDay} in the ${selectedPeriod} work?`
        },
        {
          "role": "assistant",
          "content": `I'm sorry, but we don't have any availability on ${requestedDay} in the ${selectedPeriod}. We do have a slot on ${alternativeDay} at ${selectedTime}. Would that work for you?`
        },
        {
          "role": "user",
          "content": faker.helpers.arrayElement([
            "Yes, that’s fine.",
            "Alright, I’ll take that alternative.",
            "Okay, let's go with that day."
          ])
        },
        {
          "role": "assistant",
          "content": `${generateAppointmentConfirmation(alternativeDay, selectedTime, selectedClinic)} We'll send you an email with all the appointment details, and if you provided a phone number, you'll get a reminder SMS the day before. Can I help you with anything else?`
        }
      ]};
    },
    
    // Flow 3: Client is very specific with requests
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
      const selectedClinic = clinics[selectedClinicIndex];
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedTime = faker.helpers.arrayElement([...timeSlots["morning"], ...timeSlots["afternoon"]]);
      
      return {
        "conversations": [
        {
          "role": "system",  
          "content": sysprompt
        },
        {
          "role": "user",
          "content": generateClient1stRequest()
        },
        {
          "role": "assistant",
          "content": generateAgentGreeting()
        },
        {
          "role": "user",
          "content": `Hi, I need to book an appointment for ${selectedDay} at ${selectedTime}, is that possible?`
        },
        {
          "role": "assistant",
          "content": `Let me check availability for ${selectedDay} at ${selectedTime}. First, I need some of your details. Could you tell me your full name, email, and phone number, please?`
        },
        {
          "role": "user",
          "content": generateClientInfo()
        },
        {
          "role": "assistant",
          "content": "Thanks for your details. Which area do you live or work in so we can locate the closest clinic to you?"
        },
        {
          "role": "user",
          "content": generateLocationStatement(selectedClinicIndex)
        },
        {
          "role": "assistant",
          "content": `The nearest SmileUP clinic to you is in ${selectedClinic}. I’ve checked, and we do have availability on ${selectedDay} at ${selectedTime} at this clinic. Shall I book it?`
        },
        {
          "role": "user",
          "content": faker.helpers.arrayElement([
            "Yes, I confirm.",
            "Perfect, book it.",
            "Yes, let's schedule it."
          ])
        },
        {
          "role": "assistant",
          "content": `${generateAppointmentConfirmation(selectedDay, selectedTime, selectedClinic)} We’ll send you an email with all the appointment details, and a reminder SMS the day before if you provided your number. Anything else I can assist with?`
        }
      ]};
    },
    
    // Flow 4: Client just wants first available appointment
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
      const selectedClinic = clinics[selectedClinicIndex];
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedTime = faker.helpers.arrayElement([...timeSlots["morning"], ...timeSlots["afternoon"]]);
      
      return { 
        "conversations": [
          {
            "role": "system",  
            "content": sysprompt
          },
          {
            "role": "user",
            "content": generateClient1stRequest()
          },
          {
            "role": "assistant",
            "content": generateAgentGreeting()
          },
          {
            "role": "user",
            "content": "Hi, I’d like to book the earliest available appointment."
          },
          {
            "role": "assistant",
            "content": "I can check the next available slot. First, I need your details. Could you tell me your full name, email, and phone number, please?"
          },
          {
            "role": "user",
            "content": generateClientInfo()
          },
          {
            "role": "assistant",
            "content": "Thanks for your details. Which area do you live or work in so we can locate the closest clinic to you?"
          },
          {
            "role": "user",
            "content": generateLocationStatement(selectedClinicIndex)
          },
          {
            "role": "assistant",
            "content": `The nearest SmileUP clinic to you is the ${selectedClinic}. The earliest available slot is on ${selectedDay} at ${selectedTime}. Would that work for you?`
          },
          {
            "role": "user",
            "content": faker.helpers.arrayElement([
              "Yes, perfect.",
              "That works, thank you.",
              "Yes, the sooner the better."
            ])
          },
          {
            "role": "assistant",
            "content": `${generateAppointmentConfirmation(selectedDay, selectedTime, selectedClinic)} We’ll send you an email with all the appointment details, and a reminder SMS the day before if you provided your number. Anything else I can help with?`
          }
        ]};
    },
    
    // Flow 5: Client asks about specific services first
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
      const selectedClinic = clinics[selectedClinicIndex];
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedTime = faker.helpers.arrayElement([...timeSlots["morning"], ...timeSlots["afternoon"]]);
      const dentalServices = ["dental cleaning", "check-ups", "cavity treatment", "whitening", "extraction", "root canal", "dental implants"];
      const selectedService = faker.helpers.arrayElement(dentalServices);
      
      return { 
        "conversations": [
          {
            "role": "system",  
            "content": sysprompt
          },
          {
            "role": "user",
            "content": generateClient1stRequest()
          },
          {
            "role": "assistant",
            "content": generateAgentGreeting()
          },
          {
            "role": "user",
            "content": `Good morning, do you offer ${selectedService}? I'd like to schedule an appointment.`
          },
          {
            "role": "assistant",
            "content": `Yes, we offer ${selectedService} at all our clinics. To book an appointment, I need your full name, email, and phone number.`
          },
          {
            "role": "user",
            "content": generateClientInfo()
          },
          {
            "role": "assistant",
            "content": "Thanks for your details. Which area do you live or work in so we can locate the closest clinic to you?"
          },
          {
            "role": "user",
            "content": generateLocationStatement(selectedClinicIndex)
          },
          {
            "role": "assistant",
            "content": `The closest SmileUP clinic is ${selectedClinic}. What would be your preferred day and time of day for your ${selectedService} appointment?`
          },
          {
            "role": "user",
            "content": `${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(selectedTime)}`
          },
          {
            "role": "assistant",
            "content": `We have availability for ${selectedDay} at ${selectedTime}. Would that time be good for you?`
          },
          {
            "role": "user",
            "content": faker.helpers.arrayElement([
              "Yes, that works.",
              "Perfect, I accept.",
              "That time is good for me."
            ])
          },
          {
            "role": "assistant",
            "content": `${generateAppointmentConfirmation(selectedDay, selectedTime, selectedClinic)} You’ll receive an email with all details of your ${selectedService} appointment and, if a phone number was provided, a reminder SMS the day before. Anything else I can help you with?`
          }
        ]};
    },

    // Flow 6: Client asks about prices before booking
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
      const selectedClinic = clinics[selectedClinicIndex];
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedTime = faker.helpers.arrayElement([...timeSlots["morning"], ...timeSlots["afternoon"]]);
    
      return { 
        "conversations": [
          {
            "role": "system",  
            "content": sysprompt
          },
          {
            "role": "user",
            "content": generateClient1stRequest()
          },
          {
            "role": "assistant",
            "content": generateAgentGreeting()
          },
          {
            "role": "user",
            "content": faker.helpers.arrayElement([
              "Hi, how much does a dental appointment cost?",
              "Could you tell me the cost of dental implants?",
              "How much would a consultation be?"
            ])
          },
          {
            "role": "assistant",
            "content": "The cost depends on the treatment. If you'd like a price for a specific treatment, please contact one of our clinics. However, evaluation consultations are free at our SmileUP clinics. Shall I book one for you? I’ll need your full name, email, and phone number."
          },
          {
            role: "user",
            content: `${faker.helpers.arrayElement([
              "Okay, thanks. Here are my details:",
              "Sure, here’s my info:",
              "Alright, my details are:"
            ])} ${generateClientInfo()}`
          },
          {
            "role": "assistant",
            "content": "Thanks for your details. Which area do you live or work in so we can locate the closest clinic to you?"
          },
          {
            "role": "user",
            "content": generateLocationStatement(selectedClinicIndex)
          },
          {
            "role": "assistant",
            "content": `The closest SmileUP clinic is the ${selectedClinic}. What would be your preferred day and time of day for the consultation?`
          },
          {
            "role": "user",
            "content": `${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(selectedTime)}`
          },
          {
            "role": "assistant",
            "content": `We have availability for ${selectedDay} at ${selectedTime}. Does that time suit you?`
          },
          {
            "role": "user",
            "content": faker.helpers.arrayElement([
              "Yes, that works.",
              "Yes, you can book it.",
              "Perfect, I accept.",
              "That time is great."
            ])
          },
          {
            "role": "assistant",
            "content": `${generateAppointmentConfirmation(selectedDay, selectedTime, selectedClinic)} You’ll receive the details by email and an SMS reminder if you provided a phone number.`
          }
        ]};
      },
   

    // Flow 7: Client cancels mid-way and reschedules later
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
      const selectedClinic = clinics[selectedClinicIndex];
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedTime = faker.helpers.arrayElement([...timeSlots["morning"], ...timeSlots["afternoon"]]);
      
      return {
          "conversations": [
          {
            "role": "system",  
            "content": sysprompt
          },
          {
            "role": "user",
            "content": generateClient1stRequest()
          },
          {
            "role": "assistant",
            "content": generateAgentGreeting()
          },
          {
            "role": "user",
            "content": generateClientInitialRequest()
          },
          {
            "role": "assistant",
            "content": "To schedule your appointment, I need your full name, email, and phone number."
          },
          {
            "role": "user",
            "content": generateClientInfo()
          },
          {
            "role": "assistant",
            "content": "Thank you. What is your location so I can find the nearest clinic?"
          },
          {
            "role": "user",
            "content": generateLocationStatement(selectedClinicIndex)
          },
          {
            "role": "assistant",
            "content": `The nearest SmileUP clinic to you is the ${selectedClinic}. What day and time would you like the appointment?`
          },
          {
            "role": "user",
            "content": faker.helpers.arrayElement([
              "Sorry, I can't right now.",
              "I'll leave it for another time, thanks."
            ])
          },
          {
            "role": "assistant",
            "content": "I understand, no problem. If you want to reschedule, I'm here to help."
          },
          {
            "role": "user",
            "content": faker.helpers.arrayElement([
              "Hi again, I really want to schedule.",
              "I decided to go ahead with the booking."
            ])
          },
          {
            "role": "assistant",
            "content": "Great! Let's continue. What day and time would work for you?"
          },
          {
            "role": "user",
            "content": `${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(selectedTime)}`
          },
          {
            "role": "assistant",
            "content": `I have availability on ${selectedDay} at ${selectedTime}. Does that work for you?`
          },
          {
            "role": "user",
            "content": faker.helpers.arrayElement([
              "Yes, that works.",
              "It's a deal.",
              "That’s fine."
            ])
          },
          {
            "role": "assistant",
            "content": `${generateAppointmentConfirmation(selectedDay, selectedTime, selectedClinic)} We'll send you an email and an SMS reminder if you provided your phone number.`
          }
        ]};
    },

    // Flow 8: Client asks for online consultations
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
      const selectedClinic = clinics[selectedClinicIndex];
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedTime = faker.helpers.arrayElement([...timeSlots["morning"], ...timeSlots["afternoon"]]);
    
      return {
        "conversations": [
        {
          "role": "system",  
          "content": sysprompt
        },
        {
          "role": "user",
          "content": generateClient1stRequest()
        },
        {
          "role": "assistant",
          "content": generateAgentGreeting()
        },
        {
          "role": "user",
          "content": faker.helpers.arrayElement([
            "Hi, do you offer online consultations?",
            "Do you do online consultations?",
            "Hi, can I have an online consultation?"
          ])
        },
        {
          "role": "assistant",
          "content": "At the moment we do not offer online consultations, only in-person appointments at SmileUP clinics. Can I help you book one?"
        },
        {
          "role": "user",
          "content": faker.helpers.arrayElement([
            "Yes, book in-person.",
            "Okay, I want in-person.",
            "I want an in-person appointment.",
            "I’d like to book at one of your clinics."
          ])
        },
        {
          "role": "assistant",
          "content": "Perfect. Could you please provide your full name, email, and phone number?"
        },
        {
          "role": "user",
          "content": generateClientInfo()
        },
        {
          "role": "assistant",
          "content": "Thanks. What’s your location? We need that to find the closest clinic."
        },
        {
          "role": "user",
          "content": generateLocationStatement(selectedClinicIndex)
        },
        {
          "role": "assistant",
          "content": `The closest clinic to you is ${selectedClinic}. What day and time do you prefer?`
        },
        {
          "role": "user",
          "content": `${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(selectedTime)}`
        },
        {
          "role": "assistant",
          "content": `We have availability on ${selectedDay} at ${selectedTime}. Does that time work for you?`
        },
        {
          "role": "user",
          "content": faker.helpers.arrayElement([
            "Yes, that’s good.",
            "All set.",
            "That works."
          ])
        },
        {
          "role": "assistant",
          "content": `${generateAppointmentConfirmation(selectedDay, selectedTime, selectedClinic)} We'll email you the details and send an SMS reminder if a mobile number was provided.`
        } 
      ]};
    },
    
    // Flow 9: Cliente a marcar para outra pessoa
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
      const selectedClinic = clinics[selectedClinicIndex];
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedTime = faker.helpers.arrayElement([...timeSlots["morning"], ...timeSlots["afternoon"]]);
      const male = ["son", "husband", "father", "father-in-law"];
      const female = ["daughter", "wife", "mother", "mother-in-law"];
      
      const personType = faker.helpers.arrayElement([
        `my ${faker.helpers.arrayElement(male)}`,
        `my ${faker.helpers.arrayElement(female)}`
      ]);
    
      return {
        "conversations": [
        {
          "role": "system",  
          "content": sysprompt
        },
        {
          "role": "user",
          "content": generateClient1stRequest()
        },
        {
          "role": "assistant",
          "content": generateAgentGreeting()
        },
        {
          "role": "user",
          "content": `I'd like to book an appointment for ${personType}.`
        },
        {
          "role": "assistant",
          "content": "Sure! I need their full name, email (if applicable), and phone number."
        },
        {
          "role": "user",
          "content": generateClientInfo()
        },
        {
          "role": "assistant",
          "content": "Thanks. What's the location? So we can find the closest clinic."
        },
        {
          "role": "user",
          "content": generateLocationStatement(selectedClinicIndex)
        },
        {
          "role": "assistant",
          "content": `The closest SmileUP clinic is  ${selectedClinic}. What day and time do you prefer?`
        },
        {
          "role": "user",
          "content": `${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(selectedTime)}`
        },
        {
          "role": "assistant",
          "content": `There is availability on ${selectedDay} at ${selectedTime}. Would you like to confirm?`
        },
        {
          "role": "user",
          "content": faker.helpers.arrayElement([
            "Yes, go ahead.",
            "Please book it.",
            "Yes, let’s confirm it.",
            "Yes."
          ])
        },
        {
          "role": "assistant",
          "content": `${generateAppointmentConfirmation(selectedDay, selectedTime, selectedClinic)} We'll send the details via email and an SMS reminder if a phone number was provided.`
        } 
      ]};
    },
    

    // Flow 10: Emergency appointment outside regular scheduling
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
      const selectedClinic = clinics[selectedClinicIndex];
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedTime = faker.helpers.arrayElement([...timeSlots["morning"], ...timeSlots["afternoon"]]);
    
      return {
        "conversations": [
        {
          "role": "system",  
          "content": sysprompt
        },
        {
          "role": "user",
          "content": generateClient1stRequest()
        },
        {
          "role": "assistant",
          "content": generateAgentGreeting()
        },
        {
          "role": "user",
          "content": `${generateClientInitialRequest()} I'm in unbearable pain and need an urgent appointment.`
        },
        {
          "role": "assistant",
          "content": "I'm sorry to hear that. Let's try to book the earliest available slot for you. Can you provide your full name, email, and phone number?"
        },
        {
          "role": "user",
          "content": generateClientInfo()
        },
        {
          "role": "assistant",
          "content": "Thank you. Where do you live or work so we can find the nearest clinic?"
        },
        {
          "role": "user",
          "content": generateLocationStatement(selectedClinicIndex)
        },
        {
          "role": "assistant",
          "content": `The nearest SmileUP clinic is ${selectedClinic}. We have availability on ${selectedDay} at ${selectedTime}. Should I book it?`
        },
        {
          "role": "user",
          "content": faker.helpers.arrayElement([
            "Yes, please.",
            "Yes, book it.",
            "That time works, thanks."
          ])
        },
        {
          "role": "assistant",
          "content": `${generateAppointmentConfirmation(selectedDay, selectedTime, selectedClinic)} If we get a cancellation sooner, we'll notify you. You'll receive an email and an SMS reminder.`
        }
      ]};
    },
    
  // Flow 11: Cliente tenta marcar para horario impossivel
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
      const selectedClinic = clinics[selectedClinicIndex];
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const wrongTime = faker.helpers.arrayElement([5, 6, 7, 19, 20, 21, 22, 23]); // Invalid hours
      const selectedTime = faker.helpers.arrayElement([...timeSlots["morning"], ...timeSlots["afternoon"]]);
        
      return {
        "conversations": [
        {
          "role": "system",  
          "content": sysprompt
        },
        {
          "role": "user",
          "content": generateClient1stRequest()
        },
        {
          "role": "assistant",
          "content": generateAgentGreeting()
        },
        {
          "role": "user",
          "content": generateClientInitialRequest()
        },
        {
          "role": "assistant",
          "content": "Sure! I need your full name, email (if applicable), and phone number."
        },
        {
          "role": "user",
          "content": generateClientInfo()
        },
        {
          "role": "assistant",
          "content": "Thanks. What's your location? To find the closest clinic."
        },
        {
          "role": "user",
          "content": generateLocationStatement(selectedClinicIndex)
        },
        {
          "role": "assistant",
          "content": "The nearest SmileUP clinic is ${selectedClinic}. What day and time would you prefer?"
        },
        {
          "role": "user",
          "content": `${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(wrongTime)}`
        },
        {
          "role": "assistant",
          "content": "We are not available at that time. Our consultations run from 8h to 18h in hourly slots. Would you like to choose another time?"
        },
        {
          "role": "user",
          "content": `How about around ${selectedTime} o'clock?`
        },
        {
          "role": "assistant",
          "content": `We have availability on ${selectedDay} at ${selectedTime}. Would you like to confirm it?`
        },
        {
          "role": "user",
          "content": faker.helpers.arrayElement([
            "Yes, book it.",
            "Please go ahead.",
            "Yes, that works.",
            "Yes."
          ])
        },
        {
          "role": "assistant",
          "content": `${generateAppointmentConfirmation(selectedDay, selectedTime, selectedClinic)} We'll email the details and send an SMS reminder if a phone number was provided.`
        }
      ]};
    }
  ];
    
  // Randomly select a conversation flow
  return faker.helpers.arrayElement(conversationFlows)();
}

// Generate dataset with specified number of conversations
function generateDataset(count) {
  const dataset = [];
  
  for (let i = 0; i < count; i++) {
    const conversation = generateConversation();
    dataset.push(generateConversation());
  }
  
  return dataset;
}

// Generate and export the dataset
const numberOfConversations = 500; // Adjust as needed
const dataset = generateDataset(numberOfConversations);

console.log(JSON.stringify(dataset, null, 2));

// To save to a file:
const fs = require('fs');
fs.writeFileSync('openai_en_dataset.json', JSON.stringify(dataset, null, 2));


