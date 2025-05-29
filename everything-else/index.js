const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Helper function to remove accents and diacritical marks
function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Remove diacritics
  }
// Localizacoes with clinic names and their areas (comma separated)
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


// Generate clinic names from localizacoes
const clinics = localizacoes.map(loc => `${loc.split(',')[0]} Dental Clinic`);

const slots = {
  morning: [8, 9, 10, 11, 12, 13],
  afternoon: [14, 15, 16, 17, 18]
};

app.get('/smileup', (req, res) => {
  const action = req.query.action;
  
  switch (action) {
    
        case 'get_locations':
            const location = req.query.location?.toLowerCase();
            
            // Normalize the input location to remove accents
            const normalizedLocation = removeAccents(location);
        
            // Try to match the location with the clinic name or area (after the comma)
            const matchingClinics = [];
        
            for (let i = 0; i < localizacoes.length; i++) {
                // Split the location into clinic name and area, then normalize both
                const [clinicName, area] = localizacoes[i].split(',').map(part => removeAccents(part.trim().toLowerCase()));
                
                // Check if the query matches clinic name first
                if (normalizedLocation.includes(clinicName)) {
                matchingClinics.push(clinics[i]);
                }
                
                // If no clinic name match, check the area
                else if (normalizedLocation.includes(area)) {
                matchingClinics.push(clinics[i]);
                }
            }
    
            // If there are matching clinics, return them; otherwise, return a random clinic
            if (matchingClinics.length > 0) {
                return res.json({clinics: matchingClinics});
            } else {
                const randomClinic = clinics[Math.floor(Math.random() * clinics.length)];
                return res.json([{clinics: randomClinic}]);
            }
      
            case 'get_slots':
    const timeParam = req.query.time;
    const periodParam = req.query.period?.toLowerCase();

    const time = timeParam ? parseInt(timeParam) : null;
    const morning = slots.morning;
    const afternoon = slots.afternoon;

    let selectedPeriod = null;
    let selectedTime = null;

    // Time provided
    if (!isNaN(time)) {
        if (morning.includes(time)) {
            selectedPeriod = 'morning';
            selectedTime = time;
        } else if (afternoon.includes(time)) {
            selectedPeriod = 'afternoon';
            selectedTime = time;
        } else {
            return res.json({ error: "No slots available for that time." });
        }
    }

    // Period fallback only if no valid time
    if (selectedPeriod === null && (periodParam === 'morning' || periodParam === 'afternoon')) {
        selectedPeriod = periodParam;
    }

    // Still nothing valid
    if (selectedPeriod === null) {
        return res.json({ error: "Please provide a valid time or period." });
    }

    const available = slots[selectedPeriod] || [];

    if (available.length === 0) {
        return res.json({ error: "No available slots for the selected period." });
    }

    // Shuffle and pick
    const shuffled = [...available].sort(() => 0.5 - Math.random());
    const chosen = shuffled.slice(0, 2);
    const includesRequested = selectedTime !== null && chosen.includes(selectedTime);

    return res.json({
        slots: chosen,
        match: includesRequested
    });

            default:
                    return res.status(400).json({ error: 'Unknown action' });
                    
          }});

app.listen(port, '0.0.0.0', () => {
  console.log(`SmileUP API running at http://localhost:${port}`);
});
