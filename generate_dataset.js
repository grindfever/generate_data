const { faker } = require('@faker-js/faker/locale/pt_PT');

// Configure faker to use Portuguese
faker.locale = 'pt_PT';

// List of SmileUP clinic locations
const clinics = [
  "Águeda", "Albufeira", "Alcântara", "Alfragide", "Algés", "Almada", "Almodôvar", 
  "Alvalade", "Amarante", "Arcos de Valdevez", "Areosa", "Arroios", "Aveiro", "Barcelos",
  "Barreiro", "Beja", "Benedita", "Benfica", "Braga", "Bragança", "Caldas da Rainha",
  "Campo Alegre", "Cantanhede", "Carvalhos", "Castelo Branco", "Chaves", "Coimbra",
  "Covilhã", "El Corte Inglês", "Ermesinde", "Espaço Guimarães", "Espinho", "Évora",
  "Fafe", "Faro", "Figueira da Foz", "Forum Viseu", "Gondomar", "Guarda", "Guimarães",
  "Ílhavo", "Lagoa", "Lagos", "Leiria", "Loulé", "Loures", "Lumiar", "Funchal",
  "Matosinhos", "Montijo", "Odivelas", "Olhão", "Paços de Ferreira", "Paredes",
  "Penafiel", "Pombal", "Portimão", "Póvoa de Varzim", "Queluz", "Santarém",
  "São João da Madeira", "Setúbal", "Silves", "Sines", "Tavira", "Tomar",
  "Torres Novas", "Torres Vedras", "Trindade Domus", "Viana do Castelo",
  "Vila Franca de Xira", "Vila Nova de Famalicão", "Vila Nova de Gaia", "Vila Real",
  "Vila Verde", "Viseu"
];

// Time periods
const timeSlots = {
  "manhã": ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"],
  "tarde": ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"]
};

// Days of the week in Portuguese
const weekdays = ["segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

// Generate random time preferences
function getRandomTimePreference() {
  const options = [
    "manhã",
    "tarde",
    "qualquer hora",
    `${faker.number.int({ min: 9, max: 18 })} horas`,
    `depois das ${faker.number.int({ min: 9, max: 16 })}`,
    `antes das ${faker.number.int({ min: 12, max: 18 })}`
  ];
  return faker.helpers.arrayElement(options);
}

// Generate random day preferences
function getRandomDayPreference() {
  const options = [
    faker.helpers.arrayElement(weekdays),
    `${faker.helpers.arrayElement(weekdays)} ou ${faker.helpers.arrayElement(weekdays)}`,
    `esta ${faker.helpers.arrayElement(weekdays)}`,
    `próxima ${faker.helpers.arrayElement(weekdays)}`,
    "esta semana",
    "próxima semana",
    `dia ${faker.number.int({ min: 1, max: 30 })}`
  ];
  return faker.helpers.arrayElement(options);
}

// Generate agent greeting variations
function generateAgentGreeting() {
  const greetings = [
    "Olá, bom dia! Sou assistente da SmileUP, como posso ajudar na marcação da sua consulta dentária?",
    "Bem-vindo à SmileUP! Sou o assistente de marcações, posso agendar uma consulta de dentista para si.",
    "Olá! Assistente da SmileUP ao seu dispor. Gostaria de marcar uma consulta de dentista?",
    "Bom dia, sou o assistente virtual da SmileUP. Posso ajudar a agendar a sua consulta dentária?",
    "Olá, trabalho na SmileUP e estou aqui para ajudar com a marcação da sua consulta dentária."
  ];
  
  return faker.helpers.arrayElement(greetings);
}

// Generate client initial contact variations
function generateClientInitialRequest() {
  const requests = [
    "Olá, gostaria de marcar uma consulta.",
    "Boa tarde, preciso de uma consulta no dentista.",
    "Queria marcar uma consulta dentária, por favor.",
    "Bom dia, é possível agendar uma consulta?",
    "Preciso de uma consulta na SmileUP.",
    "Olá, estou com dor de dentes e preciso de uma consulta urgente.",
    "Gostaria de saber se têm vagas para consulta.",
    "Preciso fazer uma limpeza dentária, têm disponibilidade?",
    "Posso marcar uma consulta para um check-up dental?",
    "Quero marcar uma consulta para tratar de uma cárie."
  ];
  
  return faker.helpers.arrayElement(requests);
}

// Generate time preference variations
function generateTimePreferenceStatement() {
  const timePreference = getRandomTimePreference();
  const options = [
    `Prefiro de ${timePreference}.`,
    `Para mim seria melhor ${timePreference}.`,
    `Tenho disponibilidade ${timePreference}.`,
    `Seria possível ${timePreference}?`,
    `${timePreference} seria ideal para mim.`
  ];
  
  return faker.helpers.arrayElement(options);
}

// Generate day preference variations
function generateDayPreferenceStatement() {
  const dayPreference = getRandomDayPreference();
  const options = [
    `Prefiro ${dayPreference}.`,
    `${dayPreference} seria bom para mim.`,
    `Estou disponível ${dayPreference}.`,
    `Pode ser ${dayPreference}?`,
    `Tenho disponibilidade ${dayPreference}.`
  ];
  
  return faker.helpers.arrayElement(options);
}

// Generate location statement
function generateLocationStatement() {
  const options = [
    `Estou em ${faker.location.city()}.`,
    `Moro próximo de ${faker.location.city()}.`,
    `Vivo em ${faker.location.city()}.`,
    `Estou na zona de ${faker.location.city()}.`,
    `Trabalho em ${faker.location.city()}, mas moro em ${faker.location.city()}.`
  ];
  
  return faker.helpers.arrayElement(options);
}

// Generate agent appointment confirmation
function generateAppointmentConfirmation(day, time, clinic) {
  const options = [
    `Ótimo! Fica então agendada a sua consulta para ${day} às ${time} na nossa clínica de ${clinic}.`,
    `Perfeito! A sua consulta está marcada para ${day} às ${time} na clínica de ${clinic}.`,
    `Confirmado! Agendei a sua consulta para ${day} às ${time} na SmileUP de ${clinic}.`,
    `Excelente! A sua consulta ficou marcada para ${day} às ${time} na nossa unidade de ${clinic}.`,
    `Muito bem! A sua consulta está confirmada para ${day} às ${time} na clínica SmileUP de ${clinic}.`
  ];
  
  return faker.helpers.arrayElement(options);
}

// Generate client personal info response
function generateClientInfo() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const phone = Math.random() > 0.2 ? faker.phone.number('9########') : null;
  const email = Math.random() > 0.3 ? faker.internet.email({firstName, lastName}) : null;
  
  const phoneStatement = phone ? `o meu número é ${phone}` : "não tenho número de telefone";
  const emailStatement = email ? `o meu email é ${email}` : "não tenho email";
  
  const options = [
    `O meu nome é ${firstName} ${lastName}, ${phoneStatement} e ${emailStatement}.`,
    `Chamo-me ${firstName} ${lastName}. ${phoneStatement.charAt(0).toUpperCase() + phoneStatement.slice(1)} e ${emailStatement}.`,
    `Sou o/a ${firstName} ${lastName}. Para contacto, ${phoneStatement} e ${emailStatement}.`,
    `${firstName} ${lastName} é o meu nome. ${phoneStatement.charAt(0).toUpperCase() + phoneStatement.slice(1)}. ${emailStatement.charAt(0).toUpperCase() + emailStatement.slice(1)}.`
  ];
  
  return faker.helpers.arrayElement(options);
}

// Generate conversations
function generateConversation() {
  const conversationFlows = [
    // Flow 1: Standard flow
    () => {
      const selectedClinic = faker.helpers.arrayElement(clinics);
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedPeriod = faker.helpers.arrayElement(["manhã", "tarde"]);
      const selectedTime = faker.helpers.arrayElement(timeSlots[selectedPeriod]);
      
      return [
        { 
          "input": generateClientInitialRequest(),
          "output": `${generateAgentGreeting()} Para agendar uma consulta, preciso de algumas informações suas. Pode me dizer o seu nome completo, email e número de telemóvel, por favor?`
        },
        {
          "input": generateClientInfo(),
          "output": "Obrigado pelos seus dados. Em que zona reside ou trabalha para podermos encontrar a clínica mais próxima de si?"
        },
        {
          "input": generateLocationStatement(),
          "output": `Temos uma clínica SmileUP em ${selectedClinic} que seria conveniente para si. Qual seria a sua preferência de dia e período do dia para a consulta?`
        },
        {
          "input": `${generateDayPreferenceStatement()} ${generateTimePreferenceStatement()}`,
          "output": `Tenho disponibilidade para ${selectedDay} às ${selectedTime}. Esta hora seria conveniente para si?`
        },
        {
          "input": faker.helpers.arrayElement(["Sim, pode ser.", "Perfeito, aceito.", "Essa hora é boa para mim.", "Sim, concordo com esse horário."]),
          "output": `${generateAppointmentConfirmation(selectedDay, selectedTime, selectedClinic)} Enviaremos um email com todos os detalhes da sua consulta e, caso tenha fornecido um número de telemóvel, receberá uma SMS de lembrete no dia anterior. Há mais alguma coisa em que possa ajudar?`
        }
      ];
    },
    
    // Flow 2: Client requests specific day/time, agent offers alternative
    () => {
      const selectedClinic = faker.helpers.arrayElement(clinics);
      const requestedDay = faker.helpers.arrayElement(weekdays);
      const alternativeDay = faker.helpers.arrayElement(weekdays.filter(day => day !== requestedDay));
      const selectedPeriod = faker.helpers.arrayElement(["manhã", "tarde"]);
      const selectedTime = faker.helpers.arrayElement(timeSlots[selectedPeriod]);
      
      return [
        { 
          "input": generateClientInitialRequest(),
          "output": `${generateAgentGreeting()} Para agendar uma consulta, preciso de algumas informações suas. Pode me dizer o seu nome completo, email e número de telemóvel, por favor?`
        },
        {
          "input": generateClientInfo(),
          "output": "Obrigado pelos seus dados. Em que zona reside ou trabalha para podermos encontrar a clínica mais próxima de si?"
        },
        {
          "input": generateLocationStatement(),
          "output": `Temos uma clínica SmileUP em ${selectedClinic} que seria conveniente para si. Qual seria a sua preferência de dia e período do dia para a consulta?`
        },
        {
          "input": `Pode ser ${requestedDay} de ${selectedPeriod}?`,
          "output": `Lamento, mas não temos vagas disponíveis para ${requestedDay} de ${selectedPeriod}. Temos disponibilidade para ${alternativeDay} às ${selectedTime}. Esta alternativa seria possível para si?`
        },
        {
          "input": faker.helpers.arrayElement(["Sim, pode ser.", "Tudo bem, aceito essa alternativa.", "Ok, fica para esse dia então."]),
          "output": `${generateAppointmentConfirmation(alternativeDay, selectedTime, selectedClinic)} Enviaremos um email com todos os detalhes da sua consulta e, caso tenha fornecido um número de telemóvel, receberá uma SMS de lembrete no dia anterior. Há mais alguma coisa em que possa ajudar?`
        }
      ];
    },
    
    // Flow 3: Client is very specific with requests
    () => {
      const selectedClinic = faker.helpers.arrayElement(clinics);
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedTime = faker.helpers.arrayElement([...timeSlots["manhã"], ...timeSlots["tarde"]]);
      
      return [
        { 
          "input": `Olá, preciso marcar uma consulta para ${selectedDay} às ${selectedTime}, é possível?`,
          "output": `${generateAgentGreeting()} Vou verificar a disponibilidade para ${selectedDay} às ${selectedTime}. Primeiro, preciso de algumas informações suas. Pode me dizer o seu nome completo, email e número de telemóvel, por favor?`
        },
        {
          "input": generateClientInfo(),
          "output": "Obrigado pelos seus dados. Em que zona reside ou trabalha para podermos encontrar a clínica mais próxima de si?"
        },
        {
          "input": generateLocationStatement(),
          "output": `A clínica SmileUP mais próxima de si fica em ${selectedClinic}. Verifiquei e temos disponibilidade para ${selectedDay} às ${selectedTime} nesta clínica. Confirma esta marcação?`
        },
        {
          "input": faker.helpers.arrayElement(["Sim, confirmo.", "Perfeito, pode marcar.", "Sim, fica marcado."]),
          "output": `${generateAppointmentConfirmation(selectedDay, selectedTime, selectedClinic)} Enviaremos um email com todos os detalhes da sua consulta e, caso tenha fornecido um número de telemóvel, receberá uma SMS de lembrete no dia anterior. Há mais alguma coisa em que possa ajudar?`
        }
      ];
    },
    
    // Flow 4: Client just wants first available appointment
    () => {
      const selectedClinic = faker.helpers.arrayElement(clinics);
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedTime = faker.helpers.arrayElement([...timeSlots["manhã"], ...timeSlots["tarde"]]);
      
      return [
        { 
          "input": "Olá, queria marcar uma consulta o mais rápido possível.",
          "output": `${generateAgentGreeting()} Posso verificar a próxima vaga disponível. Primeiro, preciso de algumas informações suas. Pode me dizer o seu nome completo, email e número de telemóvel, por favor?`
        },
        {
          "input": generateClientInfo(),
          "output": "Obrigado pelos seus dados. Em que zona reside ou trabalha para podermos encontrar a clínica mais próxima de si?"
        },
        {
          "input": generateLocationStatement(),
          "output": `A clínica SmileUP mais próxima de si fica em ${selectedClinic}. A primeira vaga disponível que temos é para ${selectedDay} às ${selectedTime}. Esta data seria conveniente para si?`
        },
        {
          "input": faker.helpers.arrayElement(["Sim, perfeito.", "Pode ser, obrigado.", "Sim, quanto mais cedo melhor."]),
          "output": `${generateAppointmentConfirmation(selectedDay, selectedTime, selectedClinic)} Enviaremos um email com todos os detalhes da sua consulta e, caso tenha fornecido um número de telemóvel, receberá uma SMS de lembrete no dia anterior. Há mais alguma coisa em que possa ajudar?`
        }
      ];
    },
    
    // Flow 5: Client asks about specific services first
    () => {
      const selectedClinic = faker.helpers.arrayElement(clinics);
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedTime = faker.helpers.arrayElement([...timeSlots["manhã"], ...timeSlots["tarde"]]);
      const dentalServices = ["limpeza dentária", "check-up", "tratamento de cárie", "branqueamento", "extração", "tratamento de canal"];
      const selectedService = faker.helpers.arrayElement(dentalServices);
      
      return [
        { 
          "input": `Bom dia, fazem ${selectedService}? Queria marcar uma consulta.`,
          "output": `${generateAgentGreeting()} Sim, realizamos ${selectedService} em todas as nossas clínicas. Para agendar uma consulta, preciso de algumas informações suas. Pode me dizer o seu nome completo, email e número de telemóvel, por favor?`
        },
        {
          "input": generateClientInfo(),
          "output": "Obrigado pelos seus dados. Em que zona reside ou trabalha para podermos encontrar a clínica mais próxima de si?"
        },
        {
          "input": generateLocationStatement(),
          "output": `A clínica SmileUP mais próxima de si fica em ${selectedClinic}. Qual seria a sua preferência de dia e período do dia para a consulta de ${selectedService}?`
        },
        {
          "input": `${generateDayPreferenceStatement()} ${generateTimePreferenceStatement()}`,
          "output": `Temos disponibilidade para ${selectedDay} às ${selectedTime}. Esta hora seria conveniente para si?`
        },
        {
          "input": faker.helpers.arrayElement(["Sim, pode ser.", "Perfeito, aceito.", "Essa hora é boa para mim."]),
          "output": `${generateAppointmentConfirmation(selectedDay, selectedTime, selectedClinic)} Enviaremos um email com todos os detalhes da sua consulta para ${selectedService} e, caso tenha fornecido um número de telemóvel, receberá uma SMS de lembrete no dia anterior. Há mais alguma coisa em que possa ajudar?`
        }
      ];
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
    dataset.push(...conversation);
  }
  
  return dataset;
}

// Generate and export the dataset
const numberOfConversations = 500; // Adjust as needed
const dataset = generateDataset(numberOfConversations);

console.log(JSON.stringify(dataset, null, 2));

// To save to a file:
// const fs = require('fs');
// fs.writeFileSync('dental_appointment_dataset.json', JSON.stringify(dataset, null, 2));