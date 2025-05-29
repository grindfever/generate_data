app.post('/parse-tool-call', async (req, res) => {
    const { message } = req.body;
  
    const match = message.match(/<tool_call>(.*?)<\/tool_call>/);
    if (!match) {
      return res.status(400).json({ error: 'No <tool_call> found in message.' });
    }
  
    let toolCall;
    try {
      toolCall = JSON.parse(match[1]);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid JSON inside <tool_call>.' });
    }
  
    const { name, arguments: args } = toolCall;
  
    // Route the tool call internally to your API logic
    switch (name) {
      case 'get_locations': {
        const location = args?.location?.toLowerCase();
        const normalizedLocation = removeAccents(location);
        const matchingClinics = [];
  
        for (let i = 0; i < localizacoes.length; i++) {
          const [clinicName, area] = localizacoes[i]
            .split(',')
            .map((part) => removeAccents(part.trim().toLowerCase()));
          if (normalizedLocation.includes(clinicName) || normalizedLocation.includes(area)) {
            matchingClinics.push(clinics[i]);
          }
        }
  
        const response = matchingClinics.length
          ? `Pode marcar na clínica ${matchingClinics.join(', ')}.`
          : `Pode marcar numa das nossas clínicas, como ${clinics[Math.floor(Math.random() * clinics.length)]}.`;
  
        return res.json({ message: response });
      }
  
      case 'get_slots': {
        const time = args?.time ? parseInt(args.time) : null;
        const periodParam = args?.period?.toLowerCase();
        const morning = slots.morning;
        const afternoon = slots.afternoon;
  
        let selectedPeriod = null;
        let selectedTime = null;
  
        if (!isNaN(time)) {
          if (morning.includes(time)) {
            selectedPeriod = 'morning';
            selectedTime = time;
          } else if (afternoon.includes(time)) {
            selectedPeriod = 'afternoon';
            selectedTime = time;
          } else {
            return res.json({ message: 'Não há slots disponíveis para essa hora.' });
          }
        }
  
        if (selectedPeriod === null && (periodParam === 'morning' || periodParam === 'afternoon')) {
          selectedPeriod = periodParam;
        }
  
        if (selectedPeriod === null) {
          return res.json({ message: 'Por favor, indique um horário ou período válido.' });
        }
  
        const available = slots[selectedPeriod] || [];
        if (available.length === 0) {
          return res.json({ message: 'Sem disponibilidade nesse período.' });
        }
  
        const shuffled = [...available].sort(() => 0.5 - Math.random());
        const chosen = shuffled.slice(0, 2);
        const includesRequested = selectedTime !== null && chosen.includes(selectedTime);
  
        const response = includesRequested
          ? `Temos vaga para as ${chosen.join('h ou ')}h.`
          : `Temos disponibilidade às ${chosen.join('h e ')}h nesse período.`;
  
        return res.json({ message: response });
      }
  
      default:
        return res.status(400).json({ error: `Função desconhecida: ${name}` });
    }
  });
  