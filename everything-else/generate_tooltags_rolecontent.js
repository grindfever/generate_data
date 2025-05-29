const { faker } = require('@faker-js/faker/locale/en');

// Configure faker to use English
faker.locale = 'en';
let lastIsDistrict=null;
let laststrformat=null;
const sysprompt= "# Role-You are a smile up agent who will schedule appointments. Keep simple sentences and formal conversation.#Tools- You have access to the SmileUp API, where you can use these two functions: -get_locations(location),which should return a list of possible clinics the user can schedule an appointment, if only one clinic appears then propose that clinic to schedule the user appointment , if more than one clinic appear then pick the first one to propose to the user, if he asks for more clinics show him all clinics available. -get_slots(period?,time?),where period is a string('morning' or 'afternoon')and time is a integer between 8 and 18  can be 'morning','afternoon',the tool returns two available slots and match is true if the time is included in slots.If match is true:you should just accept the user proposed schedule if not then you should display the slots for the user to choose from.  #Tool Format Constraints: - Always invoke tools using the exact format: <tool_call>{\"name\": \"<tool_name>\", \"arguments\": {<key>: <value>, ...}}</tool_call> -Never use function-style like get_locations(\"porto\") or <get_slots(\"morning\", \"9\")-After a tool call, you will receive the tool's JSON response wrapped as: <tool_result>{...}</tool_result> - Use this data to generate a natural language response.- Do NOT echo the raw JSON back to the user. # Goals-Help users schedule appointments, providing available slots.# Workflow- 1. Schedule an appointment:Request mandatory fields: name and clinic; For clinic, request user location;Inform the nearest clinic (display only one);Inform optional fields: treatment, weekday and morning/afternoon;Check the available slots and display (weekday, date and time) to be selected - For time, inform only the beginning. Assure that the selected slot is one provided by the agent;Request the remaining mandatory fields: phone number and email.Inform that the user will receive more details about appointment through email and then a reminder through the phone number closer to the appointment day# Constraints-The agent always chooses the nearest clinic. Do not ask the user to choose.Strictly use English for all communications.Time between 8 AM and 1PM(13) is considered to be morning, between 2PM(14) and 6PM(18) is considered to be afternoon.";
const toolsprompt = [
    {
      name: "get_slots",
      description: "Get available time slots for a given period, if time is given then period is generated automatically",
      parameters: {
        type: "object",
        properties: {
          time: { type: "integer" },
          period: { type: "string" }
        }
      }
    },
    {
      name: "get_locations",
      description: "Get nearby clinic locations based on user location",
      parameters: {
        type: "object",
        properties: {
          location: { type: "string" }
        },
        required: ["location"]
      }
    }
  ];
  
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

function generateClinicContent(selectedClinicIndex, isDistrict = false, one = false) {
  // If isDistrict is false, return only the selected clinic
  if (!isDistrict) {
    return `{\"clinics\": [\"${clinics[selectedClinicIndex]}\"]}`;
  }
  
  // Get the district from the location
  const fullLocation = localizacoes[selectedClinicIndex];
  const district = fullLocation.split(", ")[1];
  
  // Get the list of clinics for this district
  let clinicsList;
  
  // Return clinics based on district
  switch (district) {
    case "Lisbon":
      clinicsList = ["Alcântara Dental Clinic","Alegro Alfragide Dental Clinic","Algés Dental Clinic","Alvalade Dental Clinic","Arroios Dental Clinic","Benfica Dental Clinic","El Corte Inglés Dental Clinic","Loures Dental Clinic","Lumiar Dental Clinic","Odivelas Dental Clinic","Queluz Dental Clinic","Torres Vedras Dental Clinic","Vila Franca de Xira Dental Clinic"];
      break;
    
    case "Porto":
      clinicsList = ["Amarante Dental Clinic","Areosa (Rio Tinto) Dental Clinic","Campo Alegre Dental Clinic","Carvalhos Dental Clinic","Ermesinde Dental Clinic","Gondomar Dental Clinic","Matosinhos Dental Clinic","Paços de Ferreira Dental Clinic","Paredes Dental Clinic","Penafiel Dental Clinic","Póvoa de Varzim Dental Clinic","Trindade Domus Dental Clinic","Vila Nova de Gaia Dental Clinic"];
      break;
    
    case "Beja":
      clinicsList = ["Almodôvar Dental Clinic","Beja Dental Clinic"];
      break;
    
    case "Setúbal":
      clinicsList = ["Almada Dental Clinic","Barreiro Dental Clinic","Montijo Dental Clinic","Setúbal Dental Clinic","Sines Dental Clinic"];
      break;
    
    case "Faro":
      clinicsList = ["Albufeira Dental Clinic","Faro Dental Clinic","Lagos Dental Clinic","Loulé Dental Clinic","Olhão Dental Clinic","Portimão Dental Clinic","Silves Dental Clinic","Tavira Dental Clinic"];
      break;
    
    case "Viana do Castelo":
      clinicsList = ["Arcos de Valdevez Dental Clinic","Viana do Castelo Dental Clinic"];
      break;
    
    case "Viseu":
      clinicsList = ["Forum Viseu Dental Clinic","Viseu Dental Clinic"];
      break;
    
    case "Vila Real":
      clinicsList = ["Chaves Dental Clinic","Vila Real Dental Clinic"];
      break;
    
    case "Braga":
      clinicsList = ["Barcelos Dental Clinic","Braga Dental Clinic","Espaço Guimarães Dental Clinic","Fafe Dental Clinic","Guimarães Dental Clinic","Vila Nova de Famalicão Dental Clinic","Vila Verde Dental Clinic"];
      break;
    
    case "Aveiro":
      clinicsList = ["Águeda Dental Clinic","Aveiro Dental Clinic","Espinho Dental Clinic","Ílhavo Dental Clinic","São João da Madeira Dental Clinic"];
      break;
    
    case "Leiria":
      clinicsList = ["Benedita Dental Clinic","Caldas da Rainha Dental Clinic","Leiria Dental Clinic","Pombal Dental Clinic"];
      break;
    
    case "Coimbra":
      clinicsList = ["Cantanhede Dental Clinic","Coimbra Dental Clinic","Figueira da Foz Dental Clinic"];
      break;
    
    case "Castelo Branco":
      clinicsList = ["Castelo Branco Dental Clinic","Covilhã Dental Clinic"];
      break;

    case "Santarém":
      clinicsList = ["Santarém Dental Clinic","Tomar Dental Clinic","Torres Novas Dental Clinic"];
      break;
    
    // For districts with only one clinic or not listed above
    default:
      // Find all clinics in this district
      clinicsList = [];
      for (let i = 0; i < localizacoes.length; i++) {
        if (localizacoes[i].split(", ")[1] === district) {
          clinicsList.push(clinics[i]);
        }
      }
      
      // If no clinics found, use the selected clinic as fallback
      if (clinicsList.length === 0) {
        clinicsList = [clinics[selectedClinicIndex]];
      }
  }
  
  // Handle the one parameter
  if (one) {
    // Return only the first clinic in the list
    strformat=clinicsList[0];
    laststrformat=strformat;
    return `{\"clinics\": [\"${clinicsList[0]}\"]}`;
  } else {
    // Return all clinics in the list
    strformat= clinicsList.join(", ");
    laststrformat=strformat;
    return `{\"clinics\":[${clinicsList.map(clinic => `\"${clinic}\"`).join(",")}]}`;
  }
}


function getRandomDistinctPair(arr) {
      const shuffled = arr.slice().sort(() => 0.5 - Math.random());
      return [shuffled[0], shuffled.find(x => x !== shuffled[0])];
}
    
function generateSlotContent(selectedTime,match) {
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

function generateTimePreferenceStatement(selectedTime, isTime = false, isBoth = false) {
  const period = getPeriodByTime(selectedTime);
  
  // If isBoth is true, use options that include both time and period
  if (isBoth && period !== "undefined") {
    const bothOptions = [
      `around ${selectedTime} o'clock in the ${period}`,
      `at ${selectedTime} in the ${period}`,
      `how about ${selectedTime} in the ${period}?`,
      `I'm available at ${selectedTime} in the ${period}`,
      `Can it be at ${selectedTime} in the ${period}?`,
      `I'd prefer ${selectedTime} o'clock during the ${period}`,
      `${selectedTime} in the ${period} would be perfect`,
    ];
    return faker.helpers.arrayElement(bothOptions);
  }
  // If period is undefined or isTime is true, use time-specific options
  else if (period === "undefined" || isTime) {
    const timeOptions = [
      `at ${selectedTime}`,
      `around ${selectedTime} would be fine`,
      `maybe around ${selectedTime} o'clock`,
      `how about ${selectedTime} o'clock?`,
      `I'm available at ${selectedTime}`,
      `Can it be at ${selectedTime}?`,
    ];
    return faker.helpers.arrayElement(timeOptions);
  } 
  // Otherwise, use period-based options
  else {
    const periodOptions = [
      `preferably in the ${period}`,
      `any time during the ${period} works for me`,
      `during the ${period}`,
      `I'd prefer the ${period}`,
      `the ${period} would be best for me`,
      `sometime in the ${period}`,
    ];
    return faker.helpers.arrayElement(periodOptions);
  }
}
function generateDayPreferenceStatement(selectedDay) {
  const options = [
    `I prefer ${selectedDay}`,
    `${capitalizer(selectedDay)}`,
    `I’d like to schedule for ${selectedDay}`,
    "Any weekday works for me",
    `Preferably ${selectedDay}`,
    `If possible, ${selectedDay}`
  ];
  return faker.helpers.arrayElement(options);
}

// Generate location statement
function generateLocationStatement(selectedClinicIndex) {
  const fullLocation = localizacoes[selectedClinicIndex];
  const isDistrict = Math.random() < 0.8;
  lastIsDistrict = isDistrict;
  // Split location into city and district
  const [city, district] = fullLocation.split(", ");

  let options = [];

  // Create separate options for district-only or full location
  if (isDistrict) {
    options = [
      `I'm located in ${district}.`,
      `I live in ${district}.`,
      `I'm currently in ${district}.`,
      `I'm from ${district}.`,
      `I'm in the ${district} area.`,
      `${district} area.`,
      `I'm a ${district} resident.`,
      `I reside in ${district}.`,
      `${capitalizer(district)}.`
    ];
  } else {
    options = [
      `I'm located in ${city}.`,
      `I live nearby to ${city}.`,
      `I live in ${city}.`,
      `I'm currently in ${city}.`,
      `My location is ${city}.`,
      `I reside in ${city}.`,
      `${capitalizer(city)}.`
    ];
  }

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
    // Flow 1: Standard flow match false , picks slot1 from slots , time&period
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
      const localstat = generateLocationStatement(selectedClinicIndex);
      const fullLocation = localizacoes[selectedClinicIndex];
      const [spot, district] = fullLocation.split(", ");
      const local = lastIsDistrict ? district : spot;
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedPeriod = faker.helpers.arrayElement(["morning", "afternoon"]);
      const selectedTime = faker.helpers.arrayElement(timeSlots[selectedPeriod]);
      const slotContent = generateSlotContent(selectedTime, false);//for match-----------------
      const slotData = JSON.parse(slotContent);
      const clinicapi=generateClinicContent(selectedClinicIndex,lastIsDistrict,false);
      const oneclinic= laststrformat ? laststrformat.split(",")[0].trim() : "";
      let slot1,slot2;
      if (slotData.slots) {
        [slot1, slot2] = slotData.slots;
      }
      
      
      return {
    
        "conversations": [
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
          "content": localstat
        },  
            // This represents the API response
        {
              "role": "assistant",
              "content": `<tool_call>{\"name\": \"get_locations\", \"arguments\": {\"location\": \"${local}\"}}</tool_call>`
        },
        {
            "role":"assistant",
            "content": `<tool_result>${clinicapi}</tool_result>`
        },
            
            // Assistant uses the returned information
        { 
              "role": "assistant", 
              "content": `We have a SmileUP which is ${oneclinic} that is convenient for you. What would be your preferred day and time of day for the appointment?`
        },
        {
          "role": "user",
          "content": `${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(selectedTime,false,true)}`
        },
        //----------------------------------------
        {
            "role": "assistant",
            "content": `<tool_call>{\"name\": \"get_slots\", \"arguments\": {\"time\": \"${selectedTime}\",\"period\": \"${selectedPeriod}\"}}</tool_call>`
        },
        {
          "role":"assistant",
          "content": `<tool_result>${slotContent}</tool_result>`
        },
            // Assistant uses the returned information
        {
          "role": "assistant",
          "content": `We dont have availability at that time but we do have ${slot1} and ${slot2} available. Would this time work for you?`
        },
        {
          "role": "user",
          "content": faker.helpers.arrayElement([
            `Yes ${slot1} works.`,
            `Perfect, I can do at ${slot1}.`,
            `${slot1} is good for me.`,
            `Yes, ${slot1} works for me.`
           
          ])
        },
        {
          "role": "assistant",
          "content": `${generateAppointmentConfirmation(selectedDay, slot1, oneclinic)} We’ll send you an email with all the appointment details, and if you provided a phone number, you'll receive a reminder SMS the day before. Is there anything else I can help you with?`
        }
        ],
        "system": sysprompt,
        "tools": JSON.stringify(toolsprompt)};
    },
    //flow 12 added later 
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
      const localstat = generateLocationStatement(selectedClinicIndex);
      const fullLocation = localizacoes[selectedClinicIndex];
      const [spot, district] = fullLocation.split(", ");
      const local = lastIsDistrict ? district : spot;
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedPeriod = faker.helpers.arrayElement(["morning", "afternoon"]);
      const selectedTime = faker.helpers.arrayElement(timeSlots[selectedPeriod]);
      const slotContent = generateSlotContent(selectedTime, false);//for match-----------------
      const slotData = JSON.parse(slotContent);
      const clinicapi=generateClinicContent(selectedClinicIndex,lastIsDistrict,false);
      const oneclinic= laststrformat ? laststrformat.split(",")[0].trim() : "";
      const clinicsondistrict = laststrformat.split(',').map(c => c.trim());
      const randomClinic = clinicsondistrict[Math.floor(Math.random() * clinicsondistrict.length)];
      let slot1,slot2;
      if (slotData.slots) {
        [slot1, slot2] = slotData.slots;
      }
      if (local!==district || randomClinic===oneclinic ){return null}
      
      return {
    
        "conversations": [
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
          "content": localstat
        },  
            // This represents the API response
        {
              "role": "assistant",
              "content": `<tool_call>{\"name\": \"get_locations\", \"arguments\": {\"location\": \"${local}\"}}</tool_call>`
        },
        {
            "role":"assistant",
            "content": `<tool_result>${clinicapi}</tool_result>`
        },
            
            // Assistant uses the returned information
        { 
              "role": "assistant", 
              "content": `We have a SmileUP which is ${oneclinic} that is convenient for you. What would be your preferred day and time of day for the appointment?`
        },
        {
          "role": "user",
          "content": `I'm sorry but do you have any other clinics in ${local}, ${oneclinic} is a bit of a stretch for me.`
        },  
        { 
          "role": "assistant", 
          "content": `We have more SmileUP clinics in ${local} these are the clinics : ${laststrformat} which one is more convenient for you?`
        },
        {
          "role": "user",
          "content": faker.helpers.arrayElement([
            `I'd prefer ${randomClinic}, is that possible?`,
            `Can we go with ${randomClinic}?`,
            `${randomClinic} sounds more convenient to me.`,
            `I think ${randomClinic} works better for me.`,
            `What about ${randomClinic}? I live near it I think.`
          ])
        },  
        { 
          "role": "assistant", 
          "content": `Ok I will schedule for ${randomClinic}. What would be your preferred day and time of day for the appointment?`
        },
        {
          "role": "user",
          "content": `${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(selectedTime,false,true)}`
        },
        //----------------------------------------
        {
            "role": "assistant",
            "content": `<tool_call>{\"name\": \"get_slots\", \"arguments\": {\"time\": \"${selectedTime}\",\"period\": \"${selectedPeriod}\"}}</tool_call>`
        },
        {
          "role":"assistant",
          "content": `<tool_result>${slotContent}</tool_result>`
        },
            // Assistant uses the returned information
        {
          "role": "assistant",
          "content": `We dont have availability at that time but we do have ${slot1} and ${slot2} available. Would this time work for you?`
        },
        {
          "role": "user",
          "content": faker.helpers.arrayElement([
            `Yes ${slot1} works.`,
            `Perfect, I can do at ${slot1}.`,
            `${slot1} is good for me.`,
            `Yes, ${slot1} works for me.`
           
          ])
        },
        {
          "role": "assistant",
          "content": `${generateAppointmentConfirmation(selectedDay, slot1, randomClinic)} We’ll send you an email with all the appointment details, and if you provided a phone number, you'll receive a reminder SMS the day before. Is there anything else I can help you with?`
        }
        ],
        "system": sysprompt,
        "tools": JSON.stringify(toolsprompt)};
    },
    //flow 14 district only 1 clinic 
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
      const localstat = generateLocationStatement(selectedClinicIndex);
      const fullLocation = localizacoes[selectedClinicIndex];
      const [spot, district] = fullLocation.split(", ");
      const local = lastIsDistrict ? district : spot;
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedPeriod = faker.helpers.arrayElement(["morning", "afternoon"]);
      const selectedTime = faker.helpers.arrayElement(timeSlots[selectedPeriod]);
      const slotContent = generateSlotContent(selectedTime, false);//for match-----------------
      const slotData = JSON.parse(slotContent);
      const clinicapi=generateClinicContent(selectedClinicIndex,lastIsDistrict,false);
      const oneclinic= laststrformat ? laststrformat.split(",")[0].trim() : "";
      const clinicsondistrict = laststrformat.split(',').map(c => c.trim());
      let slot1,slot2;
      if (slotData.slots) {
        [slot1, slot2] = slotData.slots;
      }
      if (local!==district || clinicsondistrict.length !== 1) {
        return null;
      }
      
      return {
    
        "conversations": [
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
          "content": localstat
        },  
            // This represents the API response
        {
              "role": "assistant",
              "content": `<tool_call>{\"name\": \"get_locations\", \"arguments\": {\"location\": \"${local}\"}}</tool_call>`
        },
        {
            "role":"assistant",
            "content": `<tool_result>${clinicapi}</tool_result>`
        },
            
            // Assistant uses the returned information
        { 
              "role": "assistant", 
              "content": `We have a SmileUP which is ${oneclinic} that is convenient for you. What would be your preferred day and time of day for the appointment?`
        },
        {
          "role": "user",
          "content": `I'm sorry but do you have any other clinics in ${local}, ${oneclinic} is a bit of a stretch for me.`
        },  
        { 
          "role": "assistant", 
          "content": `We only have this SmileUP ${oneclinic} in ${local}, if you would like to book the appointment for this clinic please provide me with your preferred day and time of day for the appointment?`
        },
        {
          "role": "user",
          "content": `${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(selectedTime,false,true)}`
        },
        //----------------------------------------
        {
            "role": "assistant",
            "content": `<tool_call>{\"name\": \"get_slots\", \"arguments\": {\"time\": \"${selectedTime}\",\"period\": \"${selectedPeriod}\"}}</tool_call>`
        },
        {
          "role":"assistant",
          "content": `<tool_result>${slotContent}</tool_result>`
        },
            // Assistant uses the returned information
        {
          "role": "assistant",
          "content": `We dont have availability at that time but we do have ${slot1} and ${slot2} available. Would this time work for you?`
        },
        {
          "role": "user",
          "content": faker.helpers.arrayElement([
            `Yes ${slot1} works.`,
            `Perfect, I can do at ${slot1}.`,
            `${slot1} is good for me.`,
            `Yes, ${slot1} works for me.`
           
          ])
        },
        {
          "role": "assistant",
          "content": `${generateAppointmentConfirmation(selectedDay, slot1, oneclinic)} We’ll send you an email with all the appointment details, and if you provided a phone number, you'll receive a reminder SMS the day before. Is there anything else I can help you with?`
        }
        ],
        "system": sysprompt,
        "tools": JSON.stringify(toolsprompt)};
    },
    // Flow 2: Client requests specific day/time, agent offers alternative -match false , picks slot1 from slots ,period
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
      const localstat = generateLocationStatement(selectedClinicIndex);
      const fullLocation = localizacoes[selectedClinicIndex];
      const [spot, district] = fullLocation.split(", ");
      const local = lastIsDistrict ? district : spot;
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const alternativeDay = faker.helpers.arrayElement(weekdays.filter(day => day !== selectedDay));
      const selectedPeriod = faker.helpers.arrayElement(["morning", "afternoon"]);
      const selectedTime = faker.helpers.arrayElement(timeSlots[selectedPeriod]);
      const slotContent = generateSlotContent(selectedTime, false);//for match-----------------
      const slotData = JSON.parse(slotContent);
      const clinicapi=generateClinicContent(selectedClinicIndex,lastIsDistrict,false);
      const oneclinic= laststrformat ? laststrformat.split(",")[0].trim() : "";
      let slot1,slot2;
      if (slotData.slots) {
        [slot1, slot2] = slotData.slots;
      }
      
      return {
        
        "conversations": [
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
          "content": localstat
        },
          
        {
            "role": "assistant",
            "content": `<tool_call>{\"name\": \"get_locations\", \"arguments\": {\"location\": \"${local}\"}}</tool_call>`
        },
        {
          "role":"assistant",
          "content": `<tool_result>${clinicapi}</tool_result>`
        },
          
          // Assistant uses the returned information
        { 
            "role": "assistant", 
            "content": `We have a SmileUP which is ${oneclinic} that is convenient for you. What would be your preferred day and time of day for the appointment?`
        },
        {
          "role": "user",
          "content": `${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(selectedTime,false,false)}`
        },
        {
            "role": "assistant",
            "content": `<tool_call>{\"name\": \"get_slots\", \"arguments\": {\"period\": \"${selectedPeriod}\"}}</tool_call>`
        },
        {
          "role":"assistant",
          "content": `<tool_result>${slotContent}</tool_result>`
        },
              
              // Assistant uses the returned information
          {
            "role": "assistant",
            "content": `We have ${slot1} and ${slot2} available but only for ${alternativeDay}. Would this time work for you?`
          },
          {
            "role": "user",
            "content": faker.helpers.arrayElement([
              `Yes, ${slot2} is fine with me.`,
              `Alright, I’ll do it at ${slot2}.`,
              `${slot2} is good for me.`,
              `Yes, ${slot2} works for me.`,
              `Okay, let's go with ${slot2} then.`
            ])
          },
        {
          "role": "assistant",
          "content": `${generateAppointmentConfirmation(alternativeDay, slot2, oneclinic)} We'll send you an email with all the appointment details, and if you provided a phone number, you'll get a reminder SMS the day before. Can I help you with anything else?`
        }
      ],"system": sysprompt,
        "tools": JSON.stringify(toolsprompt)};
    },
    
    // Flow 3: Client is very specific with requests
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedPeriod = faker.helpers.arrayElement(["morning", "afternoon"]);
      const selectedTime = faker.helpers.arrayElement(timeSlots[selectedPeriod]);
      const slotContent = generateSlotContent(selectedTime, true);//for match-----------------
      const localstat = generateLocationStatement(selectedClinicIndex);
      const fullLocation = localizacoes[selectedClinicIndex];
      const [spot, district] = fullLocation.split(", ");
      const local = lastIsDistrict ? district : spot;
      const clinicapi=generateClinicContent(selectedClinicIndex,lastIsDistrict,false);
      const oneclinic= laststrformat ? laststrformat.split(",")[0].trim() : "";
  
      return {
        "conversations": [
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
          "content": `First, I need some of your details. Could you tell me your full name, email, and phone number, please?`
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
          "content": localstat
        },
        {
            "role": "assistant",
            "content": `<tool_call>{\"name\": \"get_locations\", \"arguments\": {\"location\": \"${local}\"}}</tool_call>`
      },
      {
          "role":"assistant",
          "content": `<tool_result>${clinicapi}</tool_result>`
      },
        
        // Assistant uses the returned information
    { 
          "role": "assistant", 
          "content": `We have a SmileUP which is ${oneclinic} that is convenient for you. What would be your preferred day and time of day for the appointment?`
    },
        {
          "role": "user",
          "content":`${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(selectedTime,true,false)}`
        },
        {
            "role": "assistant",
            "content": `<tool_call>{\"name\": \"get_slots\", \"arguments\": {\"time\": \"${selectedTime}\"}}</tool_call>`
        },
        {
          "role":"assistant",
          "content": `<tool_result>${slotContent}</tool_result>`
        },
        {
          "role": "assistant",
          "content": `${generateAppointmentConfirmation(selectedDay, selectedTime, oneclinic)} We’ll send you an email with all the appointment details, and a reminder SMS the day before if you provided your number. Anything else I can assist with?`
        }
      ],"system": sysprompt,
      "tools": JSON.stringify(toolsprompt)};
    },
    // Flow 13: added later for districts Client is very specific with requests
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedPeriod = faker.helpers.arrayElement(["morning", "afternoon"]);
      const selectedTime = faker.helpers.arrayElement(timeSlots[selectedPeriod]);
      const slotContent = generateSlotContent(selectedTime, true);//for match-----------------
      const localstat = generateLocationStatement(selectedClinicIndex);
      const fullLocation = localizacoes[selectedClinicIndex];
      const [spot, district] = fullLocation.split(", ");
      const local = lastIsDistrict ? district : spot;
      const clinicapi=generateClinicContent(selectedClinicIndex,lastIsDistrict,false);
      const oneclinic= laststrformat ? laststrformat.split(",")[0].trim() : "";
      const clinicsondistrict = laststrformat.split(',').map(c => c.trim());
      const randomClinic = clinicsondistrict[Math.floor(Math.random() * clinicsondistrict.length)];

      if (local!==district || randomClinic===oneclinic ){return null}
  
      return {
        "conversations": [
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
          "content": `First, I need some of your details. Could you tell me your full name, email, and phone number, please?`
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
          "content": localstat
        },
        {
            "role": "assistant",
            "content": `<tool_call>{\"name\": \"get_locations\", \"arguments\": {\"location\": \"${local}\"}}</tool_call>`
      },
      {
          "role":"assistant",
          "content": `<tool_result>${clinicapi}</tool_result>`
      },
        
        // Assistant uses the returned information
    { 
          "role": "assistant", 
          "content": `We have a SmileUP which is ${oneclinic} that is convenient for you. What would be your preferred day and time of day for the appointment?`
    },
    {
      "role": "user",
      "content": `I'm sorry but do you have any other clinics in ${local}, ${oneclinic} is a bit of a stretch for me.`
    },  
    { 
      "role": "assistant", 
      "content": `We have more SmileUP clinics in ${local} these are the clinics : ${laststrformat} which one is more convenient for you?`
    },
    {
      "role": "user",
      "content": faker.helpers.arrayElement([
        `I'd prefer ${randomClinic}, is that possible?`,
        `Can we go with ${randomClinic}?`,
        `${randomClinic} sounds more convenient to me.`,
        `I think ${randomClinic} works better for me.`,
        `What about ${randomClinic}? I live near it I think.`
      ])
    },  
    { 
      "role": "assistant", 
      "content": `Ok I will schedule for ${randomClinic}. What would be your preferred day and time of day for the appointment?`
    },
        {
          "role": "user",
          "content":`${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(selectedTime,true,false)}`
        },
        {
            "role": "assistant",
            "content": `<tool_call>{\"name\": \"get_slots\", \"arguments\": {\"time\": \"${selectedTime}\"}}</tool_call>`
        },
        {
          "role":"assistant",
          "content": `<tool_result>${slotContent}</tool_result>`
        },
        {
          "role": "assistant",
          "content": `${generateAppointmentConfirmation(selectedDay, selectedTime, oneclinic)} We’ll send you an email with all the appointment details, and a reminder SMS the day before if you provided your number. Anything else I can assist with?`
        }
      ],"system": sysprompt,
      "tools": JSON.stringify(toolsprompt)};
    },
    // Flow 4: Client just wants first available appointment--------District-------false- period
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
      const localstat = generateLocationStatement(selectedClinicIndex);
      const fullLocation = localizacoes[selectedClinicIndex];
      const [spot, district] = fullLocation.split(", ");
      const local = lastIsDistrict ? district : spot;
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedPeriod = faker.helpers.arrayElement(["morning", "afternoon"]);
      const selectedTime = faker.helpers.arrayElement(timeSlots[selectedPeriod]);
      const slotContent = generateSlotContent(selectedTime, false);//for match-----------------
      const slotData = JSON.parse(slotContent);
      const clinicapi=generateClinicContent(selectedClinicIndex,lastIsDistrict,false);
      const oneclinic= laststrformat ? laststrformat.split(",")[0].trim() : "";
      let slot1,slot2;
      if (slotData.slots) {
        [slot1, slot2] = slotData.slots;
      }
      
      
      return { 
        "conversations": [
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
            "content":  `Hi, I’d like to book the earliest available appointment, preferably in the ${selectedPeriod}. `
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
            "content": localstat
          },
          {
            "role": "assistant",
            "content": `<tool_call>{\"name\": \"get_slots\", \"arguments\": {\"period\": \"${selectedPeriod}\"}}</tool_call>`
        },
        {
          "role":"assistant",
          "content": `<tool_result>${slotContent}</tool_result>`
        },
        {
            "role": "assistant",
            "content": `<tool_call>{\"name\": \"get_locations\", \"arguments\": {\"location\": \"${local}\"}}</tool_call>`
        },
        {
          "role":"assistant",
          "content":generateClinicContent(selectedClinicIndex,lastIsDistrict,false)
        },        
        // Assistant uses the returned information
    { 
          "role": "assistant", 
          "content": `We have a SmileUP which is ${oneclinic} that is convenient for you. We have this ${selectedPeriod} at ${slot1} and ${slot2} available`
    },
          {
            "role": "user",
            "content": faker.helpers.arrayElement([
              `Yes perfect, il do it at ${slot1}.`,
              `${slot1} works, thank you.`,
              `Yes, I can at ${slot1}, the sooner the better,thanks.`,
              `Yes I can go at ${slot1}, thank you.`
            ])
          },
          {
            "role": "assistant",
            "content": `${generateAppointmentConfirmation(selectedDay, slot1, oneclinic)} We’ll send you an email with all the appointment details, and a reminder SMS the day before if you provided your number. Anything else I can help with?`
          }
        ]
        ,"system": sysprompt,
        "tools": JSON.stringify(toolsprompt)};
    },
    
    // Flow 5: Client asks about specific services first-------District----
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedPeriod = faker.helpers.arrayElement(["morning", "afternoon"]);
      const selectedTime = faker.helpers.arrayElement(timeSlots[selectedPeriod]);
      const dentalServices = ["dental cleaning", "check-ups", "cavity treatment", "whitening", "extraction", "root canal", "dental implants"];
      const selectedService = faker.helpers.arrayElement(dentalServices);
      const slotContent = generateSlotContent(selectedTime, true);//for match-----------------
      const localstat = generateLocationStatement(selectedClinicIndex);
      const fullLocation = localizacoes[selectedClinicIndex];
      const [spot, district] = fullLocation.split(", ");
      const local = lastIsDistrict ? district : spot;
      const clinicapi=generateClinicContent(selectedClinicIndex,lastIsDistrict,false);
      const oneclinic= laststrformat ? laststrformat.split(",")[0].trim() : "";
      
      return { 
        "conversations": [
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
            "content":  localstat
          },
             // Assistant decides to use the tool and makes the call
             //alterar para district
             {
                "role": "assistant",
                "content": `<tool_call>{\"name\": \"get_locations\", \"arguments\": {\"location\": \"${local}\"}}</tool_call>`
          },
          {
              "role":"assistant",
              "content": `<tool_result>${clinicapi}</tool_result>`
          },
        
        // Assistant uses the returned information
    { 
          "role": "assistant", 
          "content": `We have a SmileUP which is ${oneclinic} that is convenient for you. What would be your preferred day and time of day for the appointment?`
    },
          {
            "role": "user",
            "content": `${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(selectedTime,true,false)}`
          },
          {
            "role": "assistant",
            "content": `<tool_call>{\"name\": \"get_slots\", \"arguments\": {\"time\": \"${selectedTime}\"}}</tool_call>`
        },
        {
          "role":"assistant",
          "content": `<tool_result>${slotContent}</tool_result>`
        },
              
              // Assistant uses the returned information
          {
            "role": "assistant",
            "content": `We  have availability at that time. ${generateAppointmentConfirmation(selectedDay, selectedTime, oneclinic)} You’ll receive an email with all details of your ${selectedService} appointment and, if a phone number was provided, a reminder SMS the day before. Anything else I can help you with?`
          }
        ]
        ,"system": sysprompt,
        "tools": JSON.stringify(toolsprompt)};
    },

    // Flow 6: Client asks about prices before booking ----District--
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
      const localstat = generateLocationStatement(selectedClinicIndex);
      const fullLocation = localizacoes[selectedClinicIndex];
      const [spot, district] = fullLocation.split(", ");
      const local = lastIsDistrict ? district : spot;
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedPeriod = faker.helpers.arrayElement(["morning", "afternoon"]);
      const selectedTime = faker.helpers.arrayElement(timeSlots[selectedPeriod]);
      const slotContent = generateSlotContent(selectedTime, false);//for match-----------------
      const slotData = JSON.parse(slotContent);
      const clinicapi=generateClinicContent(selectedClinicIndex,lastIsDistrict,false);
      const oneclinic= laststrformat ? laststrformat.split(",")[0].trim() : "";
      let slot1,slot2;
      if (slotData.slots) {
        [slot1, slot2] = slotData.slots;
      }
      return { 
        "conversations": [
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
            "content": "The cost depends on the treatment and the clinic. If you'd like a price for a specific treatment, please contact one of our clinics. However, evaluation consultations are free at our SmileUP clinics. Shall I book one for you? I’ll need your full name, email, and phone number."
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
            "content": localstat
          },
            // Assistant decides to use the tool and makes the call-----District
            {
                "role": "assistant",
                "content": `<tool_call>{\"name\": \"get_locations\", \"arguments\": {\"location\": \"${local}\"}}</tool_call>`
          },
          {
              "role":"assistant",
              "content": `<tool_result>${clinicapi}</tool_result>`
          },
        
        // Assistant uses the returned information
    { 
          "role": "assistant", 
          "content": `We have a SmileUP which is ${oneclinic} that is convenient for you. What would be your preferred day and time of day for the appointment?`
    },
          
          {
            "role": "user",
            "content": `${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(selectedTime,false,true)}`
          },
          {
            "role": "assistant",
            "content": `<tool_call>{\"name\": \"get_slots\", \"arguments\": {\"time\": \"${selectedTime}\",\"period\": \"${selectedPeriod}\"}}</tool_call>`
        },
        {
          "role":"assistant",
          "content": `<tool_result>${slotContent}</tool_result>`
        },
              
              // Assistant uses the returned information
          {
            "role": "assistant",
            "content": `I'm sorry but we dont have availability at that time but we do have ${slot1} and ${slot2} available. Would this time work for you?`
          },
        {
          "role": "user",
          "content": faker.helpers.arrayElement([
            `Yes, ${slot2} is fine with me.`,
            `Alright, I’ll do it at ${slot2}.`,
            `${slot2} is good for me.`,
            `Yes, ${slot2} works for me.`,
            `Okay, let's go with ${slot2} then.`
          ])
        },
          {
            "role": "assistant",
            "content": `${generateAppointmentConfirmation(selectedDay, slot2, oneclinic)} You’ll receive the details by email and an SMS reminder if you provided a phone number.`
          }
        ]
        ,"system": sysprompt,
        "tools": JSON.stringify(toolsprompt)};
      },
   

    // Flow 7: Client cancels mid-way and reschedules later
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
      const localstat = generateLocationStatement(selectedClinicIndex);
      const fullLocation = localizacoes[selectedClinicIndex];
      const [spot, district] = fullLocation.split(", ");
      const local = lastIsDistrict ? district : spot;
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedPeriod = faker.helpers.arrayElement(["morning", "afternoon"]);
      const selectedTime = faker.helpers.arrayElement(timeSlots[selectedPeriod]);
      const slotContent = generateSlotContent(selectedTime, false);//for match-----------------
      const slotData = JSON.parse(slotContent);
      const clinicapi=generateClinicContent(selectedClinicIndex,lastIsDistrict,false);
      const oneclinic= laststrformat ? laststrformat.split(",")[0].trim() : "";
      let slot1,slot2;
      if (slotData.slots) {
        [slot1, slot2] = slotData.slots;
      }

      return {
          "conversations": [
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
            "content": localstat
          },
             // Assistant decides to use the tool and makes the call
             {
                "role": "assistant",
                "content": `<tool_call>{\"name\": \"get_locations\", \"arguments\": {\"location\": \"${local}\"}}</tool_call>`
          },
          {
              "role":"assistant",
              "content": `<tool_result>${clinicapi}</tool_result>`
          },
        
        // Assistant uses the returned information
    { 
          "role": "assistant", 
          "content": `We have a SmileUP which is ${oneclinic} that is convenient for you. What would be your preferred day and time of day for the appointment?`
    },
          {
            "role": "user",
            "content": faker.helpers.arrayElement([
              "Sorry, I can't right now.",
              "I'll leave it for another time, thanks.",
              "I gotta go.",
              "I have to go sorry."
            ])
          },
          {
            "role": "assistant",
            "content": "I understand, no problem. If you want to schedule another time, I'm here to help."
          },
          {
            "role": "user",
            "content": faker.helpers.arrayElement([
              "Hi again, I really want to schedule an appointment.",
              "I decided to go ahead with the booking.",
              "I want to schedule it."
            ])
          },
          {
            "role": "assistant",
            "content": "Great! Let's continue. What day and time would work for you?"
          },
          {
            "role": "user",
            "content": `${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(selectedTime,false,true)}`
          },
          {
            "role": "assistant",
            "content": `<tool_call>{\"name\": \"get_slots\", \"arguments\": {\"time\": \"${selectedTime}\",\"period\": \"${selectedPeriod}\"}}</tool_call>`
        },
        {
          "role":"assistant",
          "content": `<tool_result>${slotContent}</tool_result>`
        },
            {
              "role": "assistant",
              "content": `I'm sorry but we dont have availability at that time but we do have ${slot1} and ${slot2} available. Would this time work for you?`
            },
          {
            "role": "user",
            "content": faker.helpers.arrayElement([
              `Yes, ${slot1} is fine with me.`,
              `Alright, I’ll do it at ${slot1}.`,
              `${slot1} is good for me.`,
              `Yes, ${slot1} works for me.`,
              `Okay, let's go with ${slot1} then.`
            ])
          },
          {
            "role": "assistant",
            "content": `${generateAppointmentConfirmation(selectedDay, slot1, oneclinic)} We'll send you an email and an SMS reminder if you provided your phone number.`
          }
        ]
        ,"system": sysprompt,
        "tools": JSON.stringify(toolsprompt)};
    },
     // Flow 16:district dif Client asks for online consultations ----District
 () => {
  const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
  const localstat = generateLocationStatement(selectedClinicIndex);
  const fullLocation = localizacoes[selectedClinicIndex];
  const [spot, district] = fullLocation.split(", ");
  const local = lastIsDistrict ? district : spot;
  const selectedDay = faker.helpers.arrayElement(weekdays);
  const selectedPeriod = faker.helpers.arrayElement(["morning", "afternoon"]);
  const selectedTime = faker.helpers.arrayElement(timeSlots[selectedPeriod]);
  const slotContent = generateSlotContent(selectedTime, true);//for match-----------------
  const clinicapi=generateClinicContent(selectedClinicIndex,lastIsDistrict,false);
  const oneclinic= laststrformat ? laststrformat.split(",")[0].trim() : "";
  const clinicsondistrict = laststrformat.split(',').map(c => c.trim());

  if (local!==district || clinicsondistrict.length !== 1) {
    return null;
  }
  return {
    "conversations": [
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
        "I’d like to book at one of your clinics then."
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
      "content": localstat
    },
    {
        "role": "assistant",
        "content": `<tool_call>{\"name\": \"get_locations\", \"arguments\": {\"location\": \"${local}\"}}</tool_call>`
  },
  {
      "role":"assistant",
      "content": `<tool_result>${clinicapi}</tool_result>`
  },
        
        // Assistant uses the returned information
    { 
          "role": "assistant", 
          "content": `We have a SmileUP which is ${oneclinic} that is convenient for you. What would be your preferred day and time of day for the appointment?`
    },
    {
      "role": "user",
      "content": `I'm sorry but do you have any other clinics in ${local}, ${oneclinic} is a bit of a stretch for me.`
    },  
    { 
      "role": "assistant", 
      "content": `We only have this SmileUP ${oneclinic} in ${local}, if you would like to book the appointment for this clinic please provide me with your preferred day and time of day for the appointment?`
    },
    {
      "role": "user",
      "content": `${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(selectedTime,false,true)}`
    },
    {
        "role": "assistant",
        "content": `<tool_call>{\"name\": \"get_slots\", \"arguments\": {\"time\": \"${selectedTime}\",\"period\": \"${selectedPeriod}\"}}</tool_call>`
    },
    {
      "role":"assistant",
      "content": `<tool_result>${slotContent}</tool_result>`
    },
    {
      "role": "assistant",
      "content": `${generateAppointmentConfirmation(selectedDay, selectedTime, oneclinic)} We’ll send you an email with all the appointment details, and a reminder SMS the day before if you provided your number. Anything else I can assist with?`
    }
  ],"system": sysprompt,
  "tools": JSON.stringify(toolsprompt)};
},
 // Flow 15:district dif Client asks for online consultations ----District
 () => {
  const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
  const localstat = generateLocationStatement(selectedClinicIndex);
  const fullLocation = localizacoes[selectedClinicIndex];
  const [spot, district] = fullLocation.split(", ");
  const local = lastIsDistrict ? district : spot;
  const selectedDay = faker.helpers.arrayElement(weekdays);
  const selectedPeriod = faker.helpers.arrayElement(["morning", "afternoon"]);
  const selectedTime = faker.helpers.arrayElement(timeSlots[selectedPeriod]);
  const slotContent = generateSlotContent(selectedTime, true);//for match-----------------
  const clinicapi=generateClinicContent(selectedClinicIndex,lastIsDistrict,false);
  const oneclinic= laststrformat ? laststrformat.split(",")[0].trim() : "";
  const clinicsondistrict = laststrformat.split(',').map(c => c.trim());
  const randomClinic = clinicsondistrict[Math.floor(Math.random() * clinicsondistrict.length)];

  if (local!==district || randomClinic===oneclinic ){return null}
  return {
    "conversations": [
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
        "I’d like to book at one of your clinics then."
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
      "content": localstat
    },
    {
        "role": "assistant",
        "content": `<tool_call>{\"name\": \"get_locations\", \"arguments\": {\"location\": \"${local}\"}}</tool_call>`
  },
  {
      "role":"assistant",
      "content": `<tool_result>${clinicapi}</tool_result>`
  },
        
        // Assistant uses the returned information
    { 
          "role": "assistant", 
          "content": `We have a SmileUP which is ${oneclinic} that is convenient for you. What would be your preferred day and time of day for the appointment?`
    },
    {
      "role": "user",
      "content": `I'm sorry but do you have any other clinics in ${local}, ${oneclinic} is a bit of a stretch for me.`
    },  
    { 
      "role": "assistant", 
      "content": `We have more SmileUP clinics in ${local} these are the clinics : ${laststrformat} which one is more convenient for you?`
    },
    {
      "role": "user",
      "content": faker.helpers.arrayElement([
        `I'd prefer ${randomClinic}, is that possible?`,
        `Can we go with ${randomClinic}?`,
        `${randomClinic} sounds more convenient to me.`,
        `I think ${randomClinic} works better for me.`,
        `What about ${randomClinic}? I live near it I think.`
      ])
    },  
    { 
      "role": "assistant", 
      "content": `Ok I will schedule for ${randomClinic}. What would be your preferred day and time of day for the appointment?`
    },
    {
      "role": "user",
      "content": `${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(selectedTime,false,true)}`
    },
    {
        "role": "assistant",
        "content": `<tool_call>{\"name\": \"get_slots\", \"arguments\": {\"time\": \"${selectedTime}\",\"period\": \"${selectedPeriod}\"}}</tool_call>`
    },
    {
      "role":"assistant",
      "content": `<tool_result>${slotContent}</tool_result>`
    },
    {
      "role": "assistant",
      "content": `${generateAppointmentConfirmation(selectedDay, selectedTime, randomClinic)} We’ll send you an email with all the appointment details, and a reminder SMS the day before if you provided your number. Anything else I can assist with?`
    }
  ],"system": sysprompt,
  "tools": JSON.stringify(toolsprompt)};
},
    // Flow 8: Client asks for online consultations ----District
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
      const localstat = generateLocationStatement(selectedClinicIndex);
      const fullLocation = localizacoes[selectedClinicIndex];
      const [spot, district] = fullLocation.split(", ");
      const local = lastIsDistrict ? district : spot;
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedPeriod = faker.helpers.arrayElement(["morning", "afternoon"]);
      const selectedTime = faker.helpers.arrayElement(timeSlots[selectedPeriod]);
      const slotContent = generateSlotContent(selectedTime, true);//for match-----------------
      const clinicapi=generateClinicContent(selectedClinicIndex,lastIsDistrict,false);
      const oneclinic= laststrformat ? laststrformat.split(",")[0].trim() : "";
      
      return {
        "conversations": [
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
            "I’d like to book at one of your clinics then."
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
          "content": localstat
        },
        {
            "role": "assistant",
            "content": `<tool_call>{\"name\": \"get_locations\", \"arguments\": {\"location\": \"${local}\"}}</tool_call>`
      },
      {
          "role":"assistant",
          "content": `<tool_result>${clinicapi}</tool_result>`
      },
            
            // Assistant uses the returned information
        { 
              "role": "assistant", 
              "content": `We have a SmileUP which is ${oneclinic} that is convenient for you. What would be your preferred day and time of day for the appointment?`
        },
        {
          "role": "user",
          "content": `${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(selectedTime,false,true)}`
        },
        {
            "role": "assistant",
            "content": `<tool_call>{\"name\": \"get_slots\", \"arguments\": {\"time\": \"${selectedTime}\",\"period\": \"${selectedPeriod}\"}}</tool_call>`
        },
        {
          "role":"assistant",
          "content": `<tool_result>${slotContent}</tool_result>`
        },
        {
          "role": "assistant",
          "content": `${generateAppointmentConfirmation(selectedDay, selectedTime, oneclinic)} We’ll send you an email with all the appointment details, and a reminder SMS the day before if you provided your number. Anything else I can assist with?`
        }
      ],"system": sysprompt,
      "tools": JSON.stringify(toolsprompt)};
    },
    
    // Flow 9: Cliente a marcar para outra pessoa
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
      const localstat = generateLocationStatement(selectedClinicIndex);
      const fullLocation = localizacoes[selectedClinicIndex];
      const [spot, district] = fullLocation.split(", ");
      const local = lastIsDistrict ? district : spot;
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedPeriod = faker.helpers.arrayElement(["morning", "afternoon"]);
      const selectedTime = faker.helpers.arrayElement(timeSlots[selectedPeriod]);
      const male = ["son", "husband", "father", "father-in-law"];
      const female = ["daughter", "wife", "mother", "mother-in-law"];
      const clinicapi=generateClinicContent(selectedClinicIndex,lastIsDistrict,false);
      const oneclinic= laststrformat ? laststrformat.split(",")[0].trim() : "";
      const personType = faker.helpers.arrayElement([
        `my ${faker.helpers.arrayElement(male)}`,
        `my ${faker.helpers.arrayElement(female)}`
      ]);
      const slotContent = generateSlotContent(selectedTime, false);//for match-----------------
      const slotData = JSON.parse(slotContent);
      let slot1,slot2;
      if (slotData.slots) {
        [slot1, slot2] = slotData.slots;
      }

      return {
        "conversations": [
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
          "content": localstat
        },
        {
            "role": "assistant",
            "content": `<tool_call>{\"name\": \"get_locations\", \"arguments\": {\"location\": \"${local}\"}}</tool_call>`
      },
      {
          "role":"assistant",
          "content": `<tool_result>${clinicapi}</tool_result>`
      },
            
            // Assistant uses the returned information
        { 
              "role": "assistant", 
              "content": `We have a SmileUP which is ${oneclinic} that is convenient for you. What would be your preferred day and time of day for the appointment?`
        },
        {
          "role": "user",
          "content": `${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(selectedTime,false,false)}`
        },
        {
            "role": "assistant",
            "content": `<tool_call>{\"name\": \"get_slots\", \"arguments\": {\"period\": \"${selectedPeriod}\"}}</tool_call>`
        },
        {
          "role":"assistant",
          "content": `<tool_result>${slotContent}</tool_result>`
        },
              
              // Assistant uses the returned information
          {
            "role": "assistant",
            "content": `We do have ${slot1} and ${slot2} available. Would this time work for you?`
          },
        {
          "role": "user",
          "content": faker.helpers.arrayElement([
            `Yes, ${slot1} is fine with me.`,
            `Alright, I’ll do it at ${slot1}.`,
            `${slot1} is good for me.`,
            `Yes, ${slot1} works for me.`,
            `Okay, let's go with ${slot1} then.`
          ])
        },
        {
          "role": "assistant",
          "content": `${generateAppointmentConfirmation(selectedDay, slot1, oneclinic)} We'll send the details via email and an SMS reminder if a phone number was provided.`
        } 
      ],"system": sysprompt,
        "tools": JSON.stringify(toolsprompt)};
    },
    

    // Flow 10: Emergency appointment outside regular scheduling district
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
      const localstat = generateLocationStatement(selectedClinicIndex);
      const fullLocation = localizacoes[selectedClinicIndex];
      const [spot, district] = fullLocation.split(", ");
      const local = lastIsDistrict ? district : spot;
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedPeriod = faker.helpers.arrayElement(["morning", "afternoon"]);
      const selectedTime = faker.helpers.arrayElement(timeSlots[selectedPeriod]);
      const slotContent = generateSlotContent(selectedTime, false);//for match-----------------
      const slotData = JSON.parse(slotContent);
      const clinicapi=generateClinicContent(selectedClinicIndex,lastIsDistrict,false);
      const oneclinic= laststrformat ? laststrformat.split(",")[0].trim() : "";
      let slot1,slot2;
      if (slotData.slots) {
        [slot1, slot2] = slotData.slots;
      }

      return {
        "conversations": [
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
          "content": localstat
        },
        {
            "role": "assistant",
            "content": `<tool_call>{\"name\": \"get_locations\", \"arguments\": {\"location\": \"${local}\"}}</tool_call>`
      },
      {
          "role":"assistant",
          "content": `<tool_result>${clinicapi}</tool_result>`
      },
          
          // Assistant uses the returned information
      { 
            "role": "assistant", 
            "content": `We have a SmileUP which is ${oneclinic} that is convenient for you. What would be your preferred day and time of day for the appointment?`
      },
        {
          "role": "user",
          "content": faker.helpers.arrayElement([
            "I know it's late but can we schedule it after 20?.",
            "I need it still today , can it be at 23? Im really hurting",
            "I woke up in an indescribable pain , can i book for 6 or 7 before your regular schedule?"
          ])
        },
        {
          "role": "assistant",
          "content": `I can't schedule emergency appointments yet, if you are in real urgency i suggest you call 9999999999, il remind you that you will need to pay more for an appointment outside our schedule(from 8 to 18). `
        }
      ],"system": sysprompt,
      "tools": JSON.stringify(toolsprompt)};
    },
    
  // Flow 11: Cliente tenta marcar para horario impossivel
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);
      const localstat = generateLocationStatement(selectedClinicIndex);
      const fullLocation = localizacoes[selectedClinicIndex];
      const [spot, district] = fullLocation.split(", ");
      const local = lastIsDistrict ? district : spot;
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const wrongTime = faker.helpers.arrayElement([5, 6, 7, 19, 20, 21, 22, 23]); // Invalid hours
      const selectedPeriod = faker.helpers.arrayElement(["morning", "afternoon"]);
      const selectedTime = faker.helpers.arrayElement(timeSlots[selectedPeriod]);
      const slotContent = generateSlotContent(selectedTime, false);//for match-----------------
      const slotData = JSON.parse(slotContent);
      const clinicapi=generateClinicContent(selectedClinicIndex,lastIsDistrict,false);
      const oneclinic= laststrformat ? laststrformat.split(",")[0].trim() : "";
      let slot1,slot2;
      if (slotData.slots) {
        [slot1, slot2] = slotData.slots;
      }
      const slotContent2 = generateSlotContent(wrongTime, false);//for match-----------------
      
      return {
        "conversations": [
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
          "content": localstat
        },
        {
            "role": "assistant",
            "content": `<tool_call>{\"name\": \"get_locations\", \"arguments\": {\"location\": \"${local}\"}}</tool_call>`
      },
      {
          "role":"assistant",
          "content": `<tool_result>${clinicapi}</tool_result>`
      },
          
          // Assistant uses the returned information
      { 
            "role": "assistant", 
            "content": `We have a SmileUP which is ${oneclinic} that is convenient for you. What would be your preferred day and time of day for the appointment?`
      },
        {
          "role": "user",
          "content": `${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(wrongTime)}`
        },
        {
            "role": "assistant",
            "content": `<tool_call>{\"name\": \"get_slots\", \"arguments\": {\"time\": \"${selectedTime}\",\"period\": \"${selectedPeriod}\"}}</tool_call>`
        },
        {
          "role":"assistant",
          "content": `<tool_result>${slotContent}</tool_result>`
        },
            
            // Assistant uses the returned information
        {
          "role": "assistant",
          "content": `I'm sorry but our schedules are from 8 untill 18, if you want to schedule an urgency appointment outside our schedule i suggest you call 999999999, i'l remind you that this type of appointments have an increased payment. `
        },
        {
          "role": "user",
          "content": faker.helpers.arrayElement([
            `How about around ${selectedTime} o'clock?`,
            `Would ${selectedTime} work?`,
            `Can it be ${selectedTime} then?`,
            `I can also go at ${selectedTime}`,
            `Ok then it can be at ${selectedTime}`
          ])
        },
        {
            "role": "assistant",
            "content": `<tool_call>{\"name\": \"get_slots\", \"arguments\": {\"time\": \"${selectedTime}\"}}</tool_call>`
        },
        {
          "role":"assistant",
          "content": `<tool_result>${slotContent}</tool_result>`
        },
            
            // Assistant uses the returned information
        {
          "role": "assistant",
          "content": `We dont have availability at that time but we have ${slot1} and ${slot2} available. Would this time work for you?`
        },
        {
          "role": "user",
          "content": faker.helpers.arrayElement([
            `Yes, ${slot2} is fine with me.`,
            `Alright, I’ll do it at ${slot2}.`,
            `${slot2} is good for me.`,
            `Yes, ${slot2} works for me.`,
            `Okay, let's go with ${slot2} then.`
          ])
        },
        {
          "role": "assistant",
          "content": `${generateAppointmentConfirmation(selectedDay, slot2, oneclinic)} We'll email the details and send an SMS reminder if a phone number was provided.`
        }
      ],"system": sysprompt,
      "tools": JSON.stringify(toolsprompt)};
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
    if (conversation==null) continue;
    dataset.push(conversation);
  }
  
  return dataset;
}

// Generate and export the dataset
const numberOfConversations = 1000; // Adjust as needed
const dataset = generateDataset(numberOfConversations);

console.log(JSON.stringify(dataset, null, 2));

// To save to a file:
const fs = require('fs');
fs.writeFileSync('openai_en_dataset.json', JSON.stringify(dataset, null, 2));


