const { faker } = require('@faker-js/faker/locale/pt_PT');

// Configure faker to use Portuguese
faker.locale = 'pt_PT';

// List of SmileUP clinic and locations
const clinics = [
  "Clínica Dentária Águeda", "Clínica Dentária Albufeira", "Clínica Dentária Alcântara",
  "Clínica Dentária Alegro Alfragide", "Clínica Dentária Algés", "Clínica Dentária Almada",
  "Clínica Dentária Almodôvar", "Clínica Dentária Alvalade", "Clínica Dentária Amarante",
  "Clínica Dentária Arcos de Valdevez", "Clínica Dentária Areosa", "Clínica Dentária Arroios",
  "Clínica Dentária Aveiro", "Clínica Dentária Barcelos", "Clínica Dentária Barreiro",
  "Clínica Dentária Beja", "Clínica Dentária Benedita", "Clínica Dentária Benfica", "Clínica Dentária Braga",
  "Clínica Dentária Bragança", "Clínica Dentária Caldas da Rainha", "Clínica Dentária Campo Alegre",
  "Clínica Dentária Cantanhede", "Clínica Dentária Carvalhos", "Clínica Dentária Castelo Branco",
  "Clínica Dentária Chaves", "Clínica Dentária Coimbra", "Clínica Dentária Covilhã", "Clínica Dentária El Corte Inglês",
  "Clínica Dentária Ermesinde", "Clínica Dentária Espaço Guimarães", "Clínica Dentária Espinho", "Clínica Dentária Évora",
  "Clínica Dentária Fafe", "Clínica Dentária Faro", "Clínica Dentária Figueira da Foz", "Clínica Dentária Forum Viseu",
  "Clínica Dentária Gondomar", "Clínica Dentária Guarda", "Clínica Dentária Guimarães", "Clínica Dentária Ílhavo",
  "Clínica Dentária Lagoa", "Clínica Dentária Lagos", "Clínica Dentária Leiria", "Clínica Dentária Loulé", 
  "Clínica Dentária Loures", "Clínica Dentária Lumiar", "Clínica Dentária Madeira", "Clínica Dentária Matosinhos",
  "Clínica Dentária Montijo", "Clínica Dentária Odivelas", "Clínica Dentária Olhão", "Clínica Dentária Paços de Ferreira",
  "Clínica Dentária Paredes", "Clínica Dentária Penafiel", "Clínica Dentária Pombal", "Clínica Dentária Portimão",
  "Clínica Dentária Póvoa de Varzim", "Clínica Dentária Queluz", "Clínica Dentária Santarém", 
  "Clínica Dentária São João da Madeira", "Clínica Dentária Setúbal", "Clínica Dentária Silves", 
  "Clínica Dentária Sines", "Clínica Dentária Tavira", "Clínica Dentária Tomar", "Clínica Dentária Torres Novas",
  "Clínica Dentária Torres Vedras", "Clínica Dentária Trindade Domus", "Clínica Dentária Viana do Castelo",
  "Clínica Dentária Vila Franca de Xira", "Clínica Dentária Vila Nova de Famalicão", "Clínica Dentária Vila Nova de Gaia",
  "Clínica Dentária Vila Real", "Clínica Dentária Vila Verde", "Clínica Dentária Viseu"
];

const localizacoes = [
  "em Águeda", "em Albufeira", "em Alcântara em Lisboa", "no Alegro Alfragide, em Carnaxide", 
  "em Algés", "em Almada", "em Almodôvar", "em Alvalade em Lisboa", "em Amarante", "em Arcos de Valdevez", 
  "na Areosa (Rio Tinto)", "em Arroios em Lisboa", "em Aveiro", "em Barcelos", "no Barreiro", "em Beja", 
  "na Benedita em Alcobaça", "em Benfica em Lisboa", "em Braga", "em Bragança", "nas Caldas da Rainha", 
  "no Campo Alegre no Porto", "em Cantanhede", "nos Carvalhos em Vila Nova de Gaia", "em Castelo Branco", 
  "em Chaves", "em Coimbra", "na Covilhã", "no El Corte Inglês em Lisboa", "em Ermesinde", "no Espaço Guimarães", 
  "em Espinho", "em Évora", "em Fafe", "em Faro", "na Figueira da Foz", "na Figueira da Foz", "no Forum Viseu", 
  "em Gondomar em São Cosme", "na Guarda", "em Guimarães", "em Ílhavo", "em Lagos", "em Lagos", "em Leiria", 
  "em Loulé", "em Loures", "no Lumiar em Lisboa", "em Funchal na Madeira", "em Matosinhos", "no Montijo", 
  "em Odivelas", "em Olhão", "em Paços de Ferreira", "em Paredes", "em Penafiel", "em Pombal", "em Portimão", 
  "na Póvoa de Varzim", "em Queluz", "em Santarém", "em São João da Madeira", "em Setúbal", "em Silves", 
  "em Sines", "em Tavira", "em Tomar", "em Torres Novas", "em Torres Vedras", "na Trindade Domus no Porto", 
  "em Viana do Castelo", "em Vila Franca de Xira", "em Vila Nova de Famalicão", "em Vila Nova de Gaia", 
  "em Vila Real", "em Vila Verde", "em Viseu"
];

// Time periods
const timeSlots = {
  "manhã": [9, 10, 11, 12],
  "tarde": [14, 15, 16, 17, 18]
};

// Days of the week in Portuguese
const weekdays = ["segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

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
function generateClient1stRequest(){
  const options= [
    "Olá.",
    "Olá",
    "Boas",
    "Boas.",
    "Hey.",
    "Hey"];
    return faker.helpers.arrayElement(options);
}
function generateClientInitialRequest() {
  const options= [
    "Olá, gostaria de marcar uma consulta.",
    "Boa tarde, preciso de uma consulta no dentista.",
    "Queria marcar uma consulta dentária, por favor.",
    "Bom dia, é possível agendar uma consulta?",
    "Preciso de uma consulta na SmileUP.",
    "Gostaria de saber se têm vagas para consulta.",
    "Precisava de meter implantes dentários, gostaria de realizar uma consulta para saber mais sobre este processo.",
    "Preciso fazer uma limpeza dentária, têm disponibilidade?",
    "Posso marcar uma consulta para um check-up dental?",
    "Quero marcar uma consulta para tratar de uma cárie.",
    "É possível agendar uma consulta para mim?",
    "Podem indicar a próxima disponibilidade para consulta?",
    "Estou à procura de consulta para esta semana.",
    "Gostaria de marcar uma consulta para fazer uma limpeza dentária"
  ];
  return faker.helpers.arrayElement(options);
}
function capitalizer(str) {
  if (!str) return "";
  return str[0].toUpperCase() + str.slice(1);
}


function getPeriodByTime(time) {
  if (time >= 9 && time < 13) return "manhã";
  if (time >= 14 && time < 18) return "tarde";
  return "indefinido";
}

function generateTimePreferenceStatement(selectedTime) {
  const period = getPeriodByTime(selectedTime);
  let options = [];

  if (period === "indefinido") {
    options = [
      `ás ${selectedTime}`,
      `e podia ser ás ${selectedTime}`,
      `lá para as ${selectedTime}`
    ];
  } else {
    options = [
    `de preferência de ${period}`,
    "a qualquer hora, para mim tanto me faz.",
    "de manha ou de tarde.",
    `lá para as ${selectedTime} horas`,
    `pela parte da ${period}`,
    `antes das ${selectedTime +1}`,
    `depois das ${selectedTime -1}`,
    `por volta das ${selectedTime} horas.`
  ];
  } 
  return faker.helpers.arrayElement(options);
  
}


function generateDayPreferenceStatement(selectedDay) {
  const options = [
    `Prefiro na ${selectedDay}`,
    `${capitalizer(selectedDay)}`,
    `Gostava de agendar para ${selectedDay}`,
    "Qualquer dia durante a semana serve",
    "De preferência ao início da semana",
    "Se possível, mais para o final da semana"
  ];
  return faker.helpers.arrayElement(options);
}

// Generate location statement
function generateLocationStatement(index) {
  const location = localizacoes[index];  // Acessa a localização correspondente pelo índice

  const options = [
    `Encontro-me ${location}.`,
    `Moro por perto, ${location}.`,
    `Vivo ${location}.`,
    `Estou ${location}.`,
    `A minha localização é ${location}.`,
    `Eu moro ${location}.`,
    `Moro ${location}.`,
    `${capitalizer(location)}.`
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
    `${firstName} ${lastName}. Para contacto, ${phoneStatement} e ${emailStatement}.`,
    `${firstName} ${lastName} é o meu nome. ${phoneStatement.charAt(0).toUpperCase() + phoneStatement.slice(1)}. ${emailStatement.charAt(0).toUpperCase() + emailStatement.slice(1)}.`
  ];
  
  return faker.helpers.arrayElement(options);
}

// Generate conversations
function generateConversation() {
  const conversationFlows = [
    // Flow 1: Standard flow
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);  // Seleciona um índice aleatório
      const selectedClinic = clinics[selectedClinicIndex];
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedPeriod = faker.helpers.arrayElement(["manhã", "tarde"]);
      const selectedTime = faker.helpers.arrayElement(timeSlots[selectedPeriod]);
      
      return [
        {
          "input":generateClient1stRequest(),
          "output":generateAgentGreeting()
        },
        { 
          "input": generateClientInitialRequest(),
          "output": `Para agendar uma consulta, preciso de algumas informações suas. Pode me dizer o seu nome completo, email e número de telemóvel, por favor?`
        },
        {
          "input": generateClientInfo(),
          "output": "Obrigado pelos seus dados. Em que zona reside ou trabalha para podermos encontrar a clínica mais próxima de si?"
        },
        {
          "input": generateLocationStatement(selectedClinicIndex),
          "output": `Temos uma clínica SmileUP em ${selectedClinic} que seria conveniente para si. Qual seria a sua preferência de dia e período do dia para a consulta?`
        },
        {
          "input": `${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(selectedTime)}`,
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
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);  // Seleciona um índice aleatório
      const selectedClinic = clinics[selectedClinicIndex];
      const requestedDay = faker.helpers.arrayElement(weekdays);
      const alternativeDay = faker.helpers.arrayElement(weekdays.filter(day => day !== requestedDay));
      const selectedPeriod = faker.helpers.arrayElement(["manhã", "tarde"]);
      const selectedTime = faker.helpers.arrayElement(timeSlots[selectedPeriod]);
      
      return [
        {
          "input":generateClient1stRequest(),
          "output":generateAgentGreeting()
        },
        { 
          "input": generateClientInitialRequest(),
          "output": `Para agendar uma consulta, preciso de algumas informações suas. Pode me dizer o seu nome completo, email e número de telemóvel, por favor?`
        },
        {
          "input": generateClientInfo(),
          "output": "Obrigado pelos seus dados. Em que zona reside ou trabalha para podermos encontrar a clínica mais próxima de si?"
        },
        {
          "input": generateLocationStatement(selectedClinicIndex),
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
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);  // Seleciona um índice aleatório
      const selectedClinic = clinics[selectedClinicIndex];
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedTime = faker.helpers.arrayElement([...timeSlots["manhã"], ...timeSlots["tarde"]]);
      
      return [
        {
          "input":generateClient1stRequest(),
          "output":generateAgentGreeting()
        },
        { 
          "input": `Olá, preciso marcar uma consulta para ${selectedDay} às ${selectedTime}, é possível?`,
          "output": `Vou verificar a disponibilidade para ${selectedDay} às ${selectedTime}. Primeiro, preciso de algumas informações suas. Pode me dizer o seu nome completo, email e número de telemóvel, por favor?`
        },
        {
          "input": generateClientInfo(),
          "output": "Obrigado pelos seus dados. Em que zona reside ou trabalha para podermos encontrar a clínica mais próxima de si?"
        },
        {
          "input": generateLocationStatement(selectedClinicIndex),
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
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);  // Seleciona um índice aleatório
      const selectedClinic = clinics[selectedClinicIndex];
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedTime = faker.helpers.arrayElement([...timeSlots["manhã"], ...timeSlots["tarde"]]);
      
      return [
        {
          "input":generateClient1stRequest(),
          "output":generateAgentGreeting()
        },
        { 
          "input": "Olá, queria marcar uma consulta o mais rápido possível.",
          "output": `Posso verificar a próxima vaga disponível. Primeiro, preciso de algumas informações suas. Pode me dizer o seu nome completo, email e número de telemóvel, por favor?`
        },
        {
          "input": generateClientInfo(),
          "output": "Obrigado pelos seus dados. Em que zona reside ou trabalha para podermos encontrar a clínica mais próxima de si?"
        },
        {
          "input": generateLocationStatement(selectedClinicIndex),
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
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);  // Seleciona um índice aleatório
      const selectedClinic = clinics[selectedClinicIndex];
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedTime = faker.helpers.arrayElement([...timeSlots["manhã"], ...timeSlots["tarde"]]);
      const dentalServices = ["limpeza dentária", "check-ups", "tratamento de cárie", "branqueamento", "extração", "tratamento de canal", "implantes dentários"];
      const selectedService = faker.helpers.arrayElement(dentalServices);
      
      return [
        {
          "input":generateClient1stRequest(),
          "output":generateAgentGreeting()
        },
        { 
          "input": `Bom dia, fazem ${selectedService}? Queria marcar uma consulta.`,
          "output": `Sim, realizamos ${selectedService} em todas as nossas clínicas. Para agendar uma consulta, preciso de algumas informações suas. Pode me dizer o seu nome completo, email e número de telemóvel, por favor?`
        },
        {
          "input": generateClientInfo(),
          "output": "Obrigado pelos seus dados. Em que zona reside ou trabalha para podermos encontrar a clínica mais próxima de si?"
        },
        {
          "input": generateLocationStatement(selectedClinicIndex),
          "output": `A clínica SmileUP mais próxima de si fica em ${selectedClinic}. Qual seria a sua preferência de dia e período do dia para a consulta de ${selectedService}?`
        },
        {
          "input": `${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(selectedTime)}`,
          "output": `Temos disponibilidade para ${selectedDay} às ${selectedTime}. Esta hora seria conveniente para si?`
        },
        {
          "input": faker.helpers.arrayElement(["Sim, pode ser.", "Perfeito, aceito.", "Essa hora é boa para mim."]),
          "output": `${generateAppointmentConfirmation(selectedDay, selectedTime, selectedClinic)} Enviaremos um email com todos os detalhes da sua consulta para ${selectedService} e, caso tenha fornecido um número de telemóvel, receberá uma SMS de lembrete no dia anterior. Há mais alguma coisa em que possa ajudar?`
        }
      ];
    },
    // Flow 6: Client asks about prices before booking
() => {
  const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);  // Seleciona um índice aleatório
  const selectedClinic = clinics[selectedClinicIndex];
  const selectedDay = faker.helpers.arrayElement(weekdays);
  const selectedTime = faker.helpers.arrayElement([...timeSlots["manhã"], ...timeSlots["tarde"]]);

  return [ 
    {
      "input":generateClient1stRequest(),
      "output":generateAgentGreeting()
    },
    {
      "input": faker.helpers.arrayElement(["Olá, quanto custa uma consulta dentária?","Poderia me dizer o custo de implantes dentários?","Quanto ficaria o preço de uma consulta?"]),
      "output": `O valor de uma consulta depende do tipo de tratamento, se quiser o custo para algum tipo de tratamento deveria contactar uma das nossas clínicas mas a consulta de avaliação é gratuita nas nossas clínicas SmileUP. Posso agendar uma para si? Preciso do seu nome completo, email e número de telemóvel.`
    },
    {
      "input": `${faker.helpers.arrayElement(["Ok, obrigado aqui estão os meus dados:", "Tudo bem,aqui está a minha informação:", "Claro, os meus dados são:"])} ${generateClientInfo()}`,
      "output": "Obrigado pelos seus dados. Em que zona reside ou trabalha para podermos encontrar a clínica mais próxima de si?"
    },
    {
      "input": generateLocationStatement(selectedClinicIndex),
      "output": `A clínica SmileUP mais próxima de si fica em ${selectedClinic}. Qual seria a sua preferência de dia e período do dia para a consulta?`
    },
    {
      "input": `${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(selectedTime)}`,
      "output": `Tenho disponibilidade para ${selectedDay} às ${selectedTime}. Esta hora serve para si?`
    },
    {
      "input": faker.helpers.arrayElement(["Sim, pode ser.","Sim, pode marcar.", "Perfeito, aceito.", "Essa hora está ótima."]),
      "output": `${generateAppointmentConfirmation(selectedDay, selectedTime, selectedClinic)} Vai receber os detalhes por email e lembrete SMS por telemóvel se o forneceu.`
    }
  ];
},

    // Flow 7: Client cancels mid-way and reschedules later
() => {
  const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);  // Seleciona um índice aleatório
      const selectedClinic = clinics[selectedClinicIndex];
  const selectedDay = faker.helpers.arrayElement(weekdays);
  const selectedTime = faker.helpers.arrayElement([...timeSlots["manhã"], ...timeSlots["tarde"]]);

  return [
    {
      "input":generateClient1stRequest(),
      "output":generateAgentGreeting()
    },
    {
      "input": generateClientInitialRequest(),
      "output": `Para agendar a sua consulta, preciso do seu nome completo, email e número de telemóvel.`
    },
    {
      "input": generateClientInfo(),
      "output": "Obrigado. Qual é a sua localização para encontrar a clínica mais próxima?"
    },
    {
      "input": generateLocationStatement(selectedClinicIndex),
      "output": `A clínica SmileUP mais próxima de si é a de ${selectedClinic}. Em que dia e hora deseja realizar a sua consulta?`
    },
    {
      "input": faker.helpers.arrayElement(["Desculpe, afinal não posso agora.", "Vou deixar para outra altura. Obrigado."]),
      "output": "Compreendo, sem problema. Quando quiser reagendar, estarei disponível para ajudar."
    },
    {
      "input": faker.helpers.arrayElement(["Olá novamente, quero mesmo marcar.", "Decidi avançar com a marcação."]),
      "output": `Claro! Vamos então prosseguir. Em que dia e hora deseja realizar a sua consulta?`
    },
    {
      "input": `${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(selectedTime)}`,
      "output": `Tenho disponibilidade para ${selectedDay} às ${selectedTime}. Esta hora serve para si?`
    },
    {
      "input": faker.helpers.arrayElement(["Sim, pode ser.", "Está combinado.","Pode ser."]),
      "output": `${generateAppointmentConfirmation(selectedDay, selectedTime, selectedClinic)} Enviaremos email e se forneceu o seu telemovel receberá um SMS de lembrete.`
    }
  ];
},

    // Flow 8: Client asks for online consultations
() => {
  const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);  // Seleciona um índice aleatório
      const selectedClinic = clinics[selectedClinicIndex];
  const selectedDay = faker.helpers.arrayElement(weekdays);
  const selectedTime = faker.helpers.arrayElement([...timeSlots["manhã"], ...timeSlots["tarde"]]);

  return [
    {
      "input":generateClient1stRequest(),
      "output":generateAgentGreeting()
    },
    {
      "input": faker.helpers.arrayElement(["Olá, fazem consultas online?","Fazem consultas online?","Olá, consigo fazer uma consulta online?"]),
      "output": `De momento não realizamos consultas online, apenas presenciais nas nossas clínicas SmileUP. Posso ajudar a agendar uma consulta presencial?`
    },
    {
      "input": faker.helpers.arrayElement(["Sim, então marque presencial.", "Ok, quero presencial.","Então queria uma presencial.","Queria marcar então com uma das suas clínicas."]),
      "output": "Perfeito. Pode fornecer o seu nome completo, email e número de telemóvel?"
    },
    {
      "input": generateClientInfo(),
      "output": "Obrigado. Qual a sua localização? Precisamos desta informação para escolher a clínica mais próxima de si."
    },
    {
      "input": generateLocationStatement(selectedClinicIndex),
      "output": `A clínica mais próxima de si é a ${selectedClinic}. Qual seria o dia e hora preferidos?`
    },
    {
      "input": `${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(selectedTime)}`,
      "output": `Tenho disponibilidade para ${selectedDay} às ${selectedTime}. Esta hora serve para si??`
    },
    {
      "input": faker.helpers.arrayElement(["Sim, pode ser.", "Está combinado.","Pode ser."]),
      "output": `${generateAppointmentConfirmation(selectedDay, selectedTime, selectedClinic)} Enviaremos email e se forneceu o seu telemovel receberá um SMS de lembrete.`
    }
  ];
},

    // Flow 9: Cliente a marcar para outra pessoa
() => {
  const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);  // Seleciona um índice aleatório
      const selectedClinic = clinics[selectedClinicIndex];
  const selectedDay = faker.helpers.arrayElement(weekdays);
  const selectedTime = faker.helpers.arrayElement([...timeSlots["manhã"], ...timeSlots["tarde"]]);
  const male= ["filho", "marido", "pai", "sogro"];
  const female= ["filha", "mulher", "mãe", "sogra"];
  
  const personType = faker.helpers.arrayElement([
    `o meu ${faker.helpers.arrayElement(male)}`,
    `a minha ${faker.helpers.arrayElement(female)}`
  ]);
  return [
    {
      "input":generateClient1stRequest(),
      "output":generateAgentGreeting()
    },
    {
      "input": `Gostaria de marcar uma consulta para ${personType}.`,
      "output": `Claro! Preciso do nome completo, email (se aplicável) e número de telemóvel.`
    },
    {
      "input": generateClientInfo(),
      "output": "Obrigado. Qual seria a localização? Para ver qual seria a clínica mais próxima."
    },
    {
      "input": generateLocationStatement(selectedClinicIndex),
      "output": `A unidade SmileUP mais próxima é a de ${selectedClinic}. Que dia e hora preferia?`
    },
    {
      "input": `${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(selectedTime)}`,
      "output": `Tenho vaga para ${selectedDay} às ${selectedTime}. Quer confirmar?`
    },
    {
      "input": faker.helpers.arrayElement(["Sim, marque.", "Pode agendar.", "Sim, assim já fica marcado.","Sim."]),
      "output": `${generateAppointmentConfirmation(selectedDay, selectedTime, selectedClinic)} Enviaremos os detalhes por email e um lembrete perto do dia se forneceu telemovel.`
    }
  ];
},

    // Flow 10: Emergency appointment outside regular scheduling
    () => {
      const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);  // Seleciona um índice aleatório
      const selectedClinic = clinics[selectedClinicIndex];
      const selectedDay = faker.helpers.arrayElement(weekdays);
      const selectedTime = faker.helpers.arrayElement([...timeSlots["manhã"], ...timeSlots["tarde"]]);

      return [
        {
          "input":generateClient1stRequest(),
          "output":generateAgentGreeting()
        },
        {
          "input":  `${generateClientInitialRequest()} Estou com uma dor insuportável queria uma marcação urgente. `,
          "output": `Lamento saber disso. Vamos tentar agendar a primeira vaga possível para si. Pode indicar o seu nome completo, email e número de telemóvel?`
        },
        {
          "input": generateClientInfo(),
          "output": "Obrigado. Pode indicar onde reside ou trabalha para encontrarmos a clínica mais próxima de si?"
        },
        {
          "input": generateLocationStatement(selectedClinicIndex),
          "output": `A clínica SmileUP mais próxima de si é a de ${selectedClinic}. Temos uma vaga para ${selectedDay} às ${selectedTime}. Posso reservar?`
        },
        {
          "input": faker.helpers.arrayElement([
            "Sim, por favor.",
            "Pode marcar, sim.",
            "Essa hora serve, obrigado."
          ]),
          "output": `${generateAppointmentConfirmation(selectedDay, selectedTime, selectedClinic)} Se surgir um cancelamento mais cedo, avisamos. Vai receber um email com os detalhes e lembrete SMS.`
        }
      ];
    },
        // Flow 11: Cliente tenta marcar para horario impossivel
        () => {
          const selectedClinicIndex = faker.helpers.arrayElement([...Array(clinics.length).keys()]);  // Seleciona um índice aleatório
      const selectedClinic = clinics[selectedClinicIndex];
          const selectedDay = faker.helpers.arrayElement(weekdays);
          const wrongTime = faker.helpers.arrayElement([5, 6, 7, 19, 20, 21, 22, 23]);
          const selectedTime = faker.helpers.arrayElement([...timeSlots["manhã"], ...timeSlots["tarde"]]);
          return [
            {
              "input":generateClient1stRequest(),
              "output":generateAgentGreeting()
            },
            {
              "input": generateClientInitialRequest(),
              "output": `Claro! Preciso do nome completo, email (se aplicável) e número de telemóvel.`
            },
            {
              "input": generateClientInfo(),
              "output": "Obrigado. Qual seria a localização? Para ver qual seria a clínica mais próxima."
            },
            {
              "input": generateLocationStatement(selectedClinicIndex),
              "output": `A unidade SmileUP mais próxima é a de ${selectedClinic}. Que dia e hora preferia?`
            },
            {
              "input": `${generateDayPreferenceStatement(selectedDay)} ${generateTimePreferenceStatement(wrongTime)}`,
              "output": `A essa hora não temos disponibilidade, as nossas consultas apenas se encontram abertas das 8 ás 18 e fazemos consultas de hora em hora. Quer escolher outro horário?`
            },
            {
              "input": `Então podia ser por volta das ${selectedTime} horas.`,
              "output": `Tenho vaga para ${selectedDay} às ${selectedTime}. Quer confirmar?`
            },
            {
              "input": faker.helpers.arrayElement(["Sim, pode marcar.", "Pode agendar.", "Sim, assim já fica marcado.", "Sim."]),
              "output": `${generateAppointmentConfirmation(selectedDay, selectedTime, selectedClinic)} Enviaremos os detalhes por email e um lembrete perto do dia se forneceu telemóvel.`
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
const fs = require('fs');
fs.writeFileSync('dental_appointment_dataset.json', JSON.stringify(dataset, null, 2));