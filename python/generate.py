import random
# Listas de nomes e apelidos para gerar nomes de clientes e agentes
nomes = ["Ana", "Bruno", "Carlos", "Diana", "Eduardo", "Filipa","Joana","Manuel","Francisco","Margarida","José","Rafael","Carlota","Sofia"]
apelidos = ["Silva", "Santos", "Oliveira", "Pereira", "Costa", "Fernandes","Alves","Marques","Aguiar","Almeida","Laiginhas","Lamas","Rocha","Pinho","Figueiredo","Lencastre"]
nomes_agentes = ["Isabel Barros", "Gonçalo Cunha", "Pedro Silva", "Pedro Araujo", "Natália Pereira", "Elsa Dantas"]
clinicas = [
    "Clínica Dentária Águeda",
    "Clínica Dentária Albufeira",
    "Clínica Dentária Alcântara",
    "Clínica Dentária Alegro Alfragide",
    "Clínica Dentária Algés",
    "Clínica Dentária Almada",
    "Clínica Dentária Almodôvar",
    "Clínica Dentária Alvalade",
    "Clínica Dentária Amarante",
    "Clínica Dentária Arcos de Valdevez",
    "Clínica Dentária Areosa",
    "Clínica Dentária Arroios",
    "Clínica Dentária Aveiro",
    "Clínica Dentária Barcelos",
    "Clínica Dentária Barreiro",
    "Clínica Dentária Beja",
    "Clínica Dentária Benedita",
    "Clínica Dentária Benfica",
    "Clínica Dentária Braga",
    "Clínica Dentária Bragança",
    "Clínica Dentária Caldas da Rainha",
    "Clínica Dentária Campo Alegre",
    "Clínica Dentária Cantanhede",
    "Clínica Dentária Carvalhos",
    "Clínica Dentária Castelo Branco",
    "Clínica Dentária Chaves",
    "Clínica Dentária Coimbra",
    "Clínica Dentária Covilhã",
    "Clínica Dentária El Corte Inglês",
    "Clínica Dentária Ermesinde",
    "Clínica Dentária Espaço Guimarães",
    "Clínica Dentária Espinho",
    "Clínica Dentária Évora",
    "Clínica Dentária Fafe",
    "Clínica Dentária Faro",
    "Clínica Dentária Figueira da Foz",
    "Clínica Dentária Figueira da Foz, na Rua Miguel Bombarda",
    "Clínica Dentária Forum Viseu",
    "Clínica Dentária Gondomar",
    "Clínica Dentária Guarda",
    "Clínica Dentária Guimarães, na Av. Conde de Margaride",
    "Clínica Dentária Ílhavo",
    "Clínica Dentária Lagoa",
    "Clínica Dentária Lagos",
    "Clínica Dentária Leiria",
    "Clínica Dentária Loulé",
    "Clínica Dentária Loures",
    "Clínica Dentária Lumiar",
    "Clínica Dentária Madeira",
    "Clínica Dentária Matosinhos",
    "Clínica Dentária Montijo",
    "Clínica Dentária Odivelas",
    "Clínica Dentária Olhão",
    "Clínica Dentária Paços de Ferreira",
    "Clínica Dentária Paredes",
    "Clínica Dentária Penafiel",
    "Clínica Dentária Pombal",
    "Clínica Dentária Portimão",
    "Clínica Dentária Póvoa de Varzim",
    "Clínica Dentária Queluz",
    "Clínica Dentária Santarém",
    "Clínica Dentária São João da Madeira",
    "Clínica Dentária Setúbal",
    "Clínica Dentária Silves",
    "Clínica Dentária Sines",
    "Clínica Dentária Tavira",
    "Clínica Dentária Tomar",
    "Clínica Dentária Torres Novas",
    "Clínica Dentária Torres Vedras",
    "Clínica Dentária Trindade Domus",
    "Clínica Dentária Viana do Castelo",
    "Clínica Dentária Vila Franca de Xira",
    "Clínica Dentária Vila Nova de Famalicão",
    "Clínica Dentária Vila Nova de Gaia",
    "Clínica Dentária Vila Real",
    "Clínica Dentária Vila Verde",
    "Clínica Dentária Viseu, na Av. Dr. Alexandre Alves"
]
localizacoes = [
    "em Águeda",
    "em Albufeira",
    "em Alcântara em Lisboa",
    "no Alegro Alfragide ,em Carnaxide",
    "em Algés",
    "em Almada",
    "em Almodôvar",
    "em Alvalade em Lisboa",
    "em Amarante",
    "em Arcos de Valdevez",
    "na Areosa (Rio Tinto)",
    "em Arroios em Lisboa",
    "em Aveiro",
    "em Barcelos",
    "no Barreiro",
    "em Beja",
    "na Benedita em Alcobaça",
    "em Benfica em Lisboa",
    "em Braga",
    "em Bragança",
    "nas Caldas da Rainha",
    "no Campo Alegre no Porto",
    "em Cantanhede",
    "nos Carvalhos em Vila Nova de Gaia",
    "em Castelo Branco",
    "em Chaves",
    "em Coimbra",
    "na Covilhã",
    "no El Corte Inglês em Lisboa",
    "em Ermesinde",
    "no Espaço Guimarães",
    "em Espinho",
    "em Évora",
    "em Fafe",
    "em Faro",
    "na Figueira da Foz",
    "na Figueira da Foz",
    "no Forum Viseu",
    "em Gondomar em São Cosme",
    "na Guarda",
    "em Guimarães",
    "em Ílhavo",
    "em Lagoa",
    "em Lagos",
    "em Leiria",
    "em Loulé",
    "em Loures",
    "no Lumiar em Lisboa",
    "em Funchal na Madeira",
    "em Matosinhos",
    "no Montijo",
    "em Odivelas",
    "em Olhão",
    "em Paços de Ferreira",
    "em Paredes",
    "em Penafiel",
    "em Pombal",
    "em Portimão",
    "na Póvoa de Varzim",
    "em Queluz",
    "em Santarém",
    "em São João da Madeira",
    "em Setúbal",
    "em Silves",
    "em Sines",
    "em Tavira",
    "em Tomar",
    "em Torres Novas",
    "em Torres Vedras",
    "na Trindade Domus no Porto",
    "em Viana do Castelo",
    "em Vila Franca de Xira",
    "em Vila Nova de Famalicão",
    "em Vila Nova de Gaia",
    "em Vila Real",
    "em Vila Verde",
    "em Viseu"
]
# Definir a direção da chamada: 'cliente_para_agente' ou 'agente_para_cliente'
#Info 
nome_agente=None
nome_cliente=None
email=None
telefone=None
clinica=None
localização=None
clinic_choice=None
# Schedules
hours = [9,10,11,12,13,14,15,16,17,18]
weekdays = ["segunda", "terça", "quarta", "quinta", "sexta"]
option = None
hlist = None #hlist[hlist1 or 2][h] ,hlist1 & hlist2- hold 2 different hours 
escolha = None
day = None
hour = None
monthday= None
dias_escolha= None

#Setup
def setup():
    global option, hlist, day, hour,escolha,monthday,dias_escolha
    global clinica,local,telefone,nome_agente,nome_cliente,email
    global direcao_chamada
    # Definir a direção da chamada: 'cliente_para_agente' ou 'agente_para_cliente'
    direcao_chamada = random.choice(["cliente_para_agente", "agente_para_cliente"])
    # Randomly select an option (0, 1, 2, or 3)
    option = random.choice([0, 1, 2, 3])
    monthday = random.randint(1, 29)
    #Schedules
    #SÁBADO
    if option == 0:  # Opção 1 (weekend)
        hlist = random.sample(hours, 3)  # Pick 3 random hours
        hour = random.choice(hlist)  # Pick one hour from the 3 options
    #DIAS DA SEMANA
    elif option == 1:  
        hlist = (random.sample([16, 17, 18], 2), random.sample([16, 17, 18], 2))  # hlist1 & hlist12
        dias_escolha = random.sample(weekdays, 2)  # Pick 2 random weekdays
        escolha = random.choice([0, 1])  # Randomly choose one of the two days
        day = dias_escolha[escolha]
        hour = random.choice(hlist[escolha])  # Pick one hour from the selected hlist

    elif option == 2:  
        hlist = (random.sample([9, 10, 11, 12, 13, 14], 2), random.sample([9, 10, 11, 12, 13, 14], 2))  # hlist2 & hlist22
        dias_escolha = random.sample(weekdays, 2)  # Pick 2 random weekdays
        escolha = random.choice([0, 1])  # Randomly choose one of the two days
        day = dias_escolha[escolha]
        hour = random.choice(hlist[escolha])  # Pick one hour from the selected hlist

    elif option == 3: 
        hlist = (random.sample([14, 15, 16, 17, 18], 2), random.sample([14, 15, 16, 17, 18], 2))  # hlist3 & hlist32
        dias_escolha = random.sample(weekdays, 2)  # Pick 2 random weekdays
        escolha = random.choice([0, 1])  # Randomly choose one of the two days
        day = dias_escolha[escolha]
        hour = random.choice(hlist[escolha])# Pick one hour from the selected hlist

    # Generate basic information for client, agent, clinic
    nome_cliente = f"{random.choice(nomes)} {random.choice(apelidos)}"
    nome_agente = random.choice(nomes_agentes)
    email = f"{nome_cliente.split()[0].lower()}.{nome_cliente.split()[1].lower()}{random.randint(1,999)}@{random.choice(['gmail', 'hotmail', 'outlook'])}.com"
    telefone = f"91{random.randint(1000000, 9999999)}"   
    clinic_choice = random.randint(0, 76) 
    clinica=clinicas[clinic_choice]
    local=localizacoes[clinic_choice]

# 1-Introduções
#nome agente
def introducao_cliente_para_agente():
    opcoes = [
        f"Cliente - Olá.\nAgente - Olá, está a falar com {nome_agente} das clínicas dentárias SmileUP. Como o posso ajudar?\nCliente - Gostaria de marcar uma consulta.",
        f"Cliente - Olá, estou a falar com a SmileUP?\nAgente - Sim, o meu nome é {nome_agente}, o que posso fazer por si?\nCliente - Gostaria de marcar uma consulta.",
        f"Cliente - Olá.\nAgente - Olá, sou o seu assistente das clínicas dentárias SmileUP. Como posso ajudá-lo?\nCliente - Olá, gostaria de marcar uma consulta numa das suas clínicas.",
        f"Cliente - Olá.\n Agente - Olá, sou o seu assistente da SmileUp, posso lhe marcar consultas numa das nossas clinicas dentárias.\nCliente - Gostaria de marcar uma consulta."
    ]
    return random.choice(opcoes)
"""
#nomeagente nomecliente
def introducao_agente_para_cliente():
    opcoes = [
        f"Agente - Olá, bom dia! Daqui fala o agente das clínicas SmileUP. Estou a falar com {nome_cliente}?\nCliente - Sim, sou eu.\nAgente - Ótimo! Estamos a entrar em contacto porque vimos que demonstrou interesse na nossa consulta de avaliação gratuita. Gostaria de marcar uma consulta?",
        f"Agente - Olá, falo com {nome_cliente}? Daqui fala o agente das clínicas dentárias SmileUP.\nCliente - Sim, sou eu. Do que se trata?\nAgente - Estamos a ligar porque percebemos que tentou agendar uma consulta sem sucesso no nosso site. Podemos ajudá-lo agora?\nCliente - Sim, gostaria de agendar a consulta.",
        f"Agente - Boa tarde. Daqui fala o agente das clínicas dentárias SmileUP. Estou a falar com {nome_cliente}?\nCliente - Sim, com quem falo?\nAgente - Com {nome_agente} da SmileUP. Estamos a entrar em contacto porque faltou a uma consulta marcada recentemente. Gostaria de reagendar?",
        f"Agente - Olá, sou o agente das clínicas SmileUp, posso lhe marcar consultas numa das nossas 78 clinicas dentárias.\n Cliente - Olá, sim gostaria de marcar uma consulta."
    
    ]
    return random.choice(opcoes)

# 2-Contexto prévio 
#clinicas
def contexto_previo():
    opcoes = [
        "Agente - Estamos a ligar porque vimos que demonstrou interesse na nossa consulta de avaliação gratuita, através das nossas redes sociais. Desejava marcar uma consulta numa das nossas clínicas?\nCliente - Sim.",
        "Agente - Estamos a ligar visto que já teve uma consulta marcada e não compareceu. Gostaríamos de saber se deseja reagendar esta consulta.\nCliente - Sim, gostaria de reagendar para outro dia.",
        f"Agente - Ligamos-lhe hoje pois vimos que tentou agendar uma consulta sem sucesso no nosso site. Gostaria de fazer a marcação agora?\nCliente - Certo, pode ser.",
        f"Agente - Estamos a contacta-lo no seguimento de um formulário que prencheu através dos nossos canais digitais. Gostaria de o convidar a realizar uma consulta de avaliação dentária, sem qualquer tipo de custo, na nossa {clinica} da Smileup {local} , deseja marcar esta consulta?\n Cliente - Pode ser."
    ]
    return random.choice(opcoes)
# 3-Pedido de gravação da chamada (no vars)
def pedido_gravacao():
    opcoes = [
        "Agente - Para garantir a qualidade do nosso atendimento e por motivos de segurança, gostaria de pedir a sua autorização para gravar esta chamada. Autoriza?\nCliente - Sim, autorizo.",
        "Agente - Devo informá-lo que, por motivos de segurança e qualidade, esta chamada será gravada. Está de acordo?\nCliente - Estou.",
        f"Agente - Antes de seguirmos com o agendamento da sua consulta, {nome_cliente} pedia-lhe só a sua autorização para gravar esta chamada para efeitos de qualidade e melhoria do nosso serviço. Pode ser {nome_cliente}?\nCliente - Sim."
    ]
    return random.choice(opcoes)
"""
# 4-Explicaçao da consulta  (no vars)
def explicacao_consulta():
    opcoes = [
        "Agente - Esta consulta será gratuita e inclui um raio-X panorâmico, um diagnóstico completo, um plano de tratamento, assim como o estabelecimento de orçamento.",
        "Agente - A consulta que vamos agendar abrange um raio-X panorâmico, diagnóstico completo e plano de tratamento. Esta consulta não tem qualquer custo e será uma consulta de avaliação, onde depois pode decidir continuar conosco ou não o seu tratamento.\nCliente - Então, depois se quiser continuar o tratamento com vocês como poderia ver os custos?\nAgente - Isso aí depois irá depender da clínica. Após esta consulta, será feito um orçamento para o seu tratamento.\nCliente - Ok, parece-me bem",
        "Agente - Esta consulta de avaliação seria gratuita, onde será fornecido um diagnóstico completo, assim como um plano de tratamento e o respectivo orçamento. Também terá direito a um raio-X panorâmico e, como já disse, esta consulta não teria custo para si.",
        "Agente - Deseja marcar uma consulta de avaliação? Se for a sua primeira consulta conosco esta será gratuita, com direito a um raio-x panorãmico, diagnóstico completo e plano de tratamento.\nCliente - Não já realizei uma avaliação recentemente, gostaria de marcar uma consulta para tirar um dente que me está a doer.\nAgente - Certo.",
        "Agente - Ok, deseja marcar uma consulta de avaliação, ou já a fez?\nCliente - Gostaria de fazer uma consulta de avaliação sim.\nAgente - Esta consulta será gratuita se esta é a sua primeira vez a fazer uma avaliação nas nossas clínicas, tem direito a raio-x panorãmico, diagnóstico completo e a um plano de tratamento."
    ]
    return random.choice(opcoes)
# 5-Informações sobre a ADSE (no vars)
def adse():
    opcoes = [
        "Cliente - Desculpe, mas gostaria de saber se têm algum acordo com a ADSE.\nAgente - Sem problema. Nós, de momento, não temos acordo direto com a ADSE, mas consegue usufruir dos seus benefícios. Depois tem de perguntar na clínica onde fizer a sua consulta como seria o procedimento.",
        "Cliente - Eu tenho ADSE, vocês têm algum tipo de acordo?\nAgente - Não, mas você consegue usufruir dos seus benefícios. Tem é de se dar a algum trabalho para isso. Depois, na clínica onde tiver a sua consulta, eles explicam-lhe o procedimento.\nCliente - Ok, então eu depois pergunto lá."
    ]
    return random.choice(opcoes)
# 6-Solicitação de dados do cliente para o agente
def solicitacao_de_dados_cliente_para_agente():
    opcoes = [
        f"Agente - Pode-me dizer o seu nome?\nCliente - {nome_cliente}\nAgente - Certo, {nome_cliente}, poderia-me fornecer o seu e-mail para meter aqui na sua ficha.\nCliente - Sim, o meu email é {email}\nAgente - {email}, certo?\nCliente - Correto.\nAgente - Poderia dizer-me o seu número de telemóvel, para depois receber um lembrete da sua consulta.\nCliente - {telefone}\nAgente - Obrigado.",
        f"Agente - Para a marcação da consulta vou precisar dos seus dados, por favor diga-me o seu nome inteiro, email e o seu nº de telemovel.",
        f"Agente - Poderia dizer o seu nome?\nCliente - {nome_cliente}\nAgente - Você disse-me {nome_cliente}, correto?\nCliente - Exatamente.\nAgente - Você sabe me dizer o seu email?\nCliente - Sim, é {email}.\nAgente - E que número de telemóvel gostaria de guardar aqui na sua ficha? Seria este de qual me está a ligar?\nCliente - Sim, {telefone}\nAgente - Então apenas para confirmar, {nome_cliente}, o seu email é {email} e o seu telemóvel seria {telefone}, certo?\nCliente - Exato."
    ]
    return random.choice(opcoes)
    """
# 6-Confirmação de dados do agente para o cliente
def solicitacao_de_dados_agente_para_cliente():
    opcoes = [
        f"Agente - Iria só pedir que me confirmasse aqui os seus dados.\nCliente - Com certeza.\nAgente - O seu nome é {nome_cliente}, o seu email seria {email} e o seu telemóvel {telefone}, correto?\nCliente - Certo.",
        
        f"Agente - O seu nome é {nome_cliente} e o seu email é {email}, correto?\nCliente - Sim.\nAgente - Obrigado. Podia apenas me fornecer o seu telemóvel? Não aparece aqui no sistema.\nCliente - {telefone}\nAgente - Disse {telefone}, correto?\nCliente - Sim.",
        
        f"Agente - Poderia fornecer o seu email? Não chegou a guardar aqui nos seus dados.\nCliente - Sim, {email}.\nAgente - {email}, certo?\nCliente - Sim.\nAgente - Ok, só para confirmar, o seu telemóvel é {telefone}?\nCliente - Correto."
    ]
    return random.choice(opcoes)
    
# 7 - Identificação da Clínica Mais Próxima (Agente -> Cliente)
#clinica 
def identificar_clinica_agente_para_cliente():
    opcoes = [
        f"Agente - Com base nas informações que temos, a {clinica} seria a mais próxima de si. Correto?\nCliente - Sim, exato.",
        f"Agente - Segundo o nosso sistema, a clínica mais próxima de si é a {clinica}. Está certo?\nCliente - Sim.",
        f"Agente - A clínica mais próxima de si seria a {clinica}?\nCliente - Sim, exatamente."
    ]
    return random.choice(opcoes)
    """
# 7 - Identificação da Clínica Mais Próxima (Cliente -> Agente)
def identificar_clinica_cliente_para_agente():
    opcoes = [
        f"Agente - Vamos ver qual seria a clínica mais próxima de si, podia me dizer onde mora?\nCliente - Moro {local}.\nAgente - Então penso que seria a {clinica}, a que seria mais perto de si.",
        f"Agente - Poderia dizer-me onde você mora para encontrar a clínica mais perto de si.\nCliente - Claro que sim, moro {local}.\nAgente - Ok, então seria a {clinica}.\nCliente - E isso ficaria aonde?\nAgente - Ficaria {local}, mas depois também irá receber um email com informações mais detalhadas da consulta.\nCliente - Ok, obrigado.",
        f"Agente - Onde é que você mora?\nCliente - Eu moro {local}.\nAgente - Obrigado, deixe-me só ver então qual seria a clínica mais próxima de si...\nAgente - Seria a {clinica}.\nCliente - E isso aonde é que ficaria?\nAgente - Você depois vai receber um email com todas as informações, não se preocupe, mas ficaria {local}.\nCliente - Está bem, obrigado.",
        f"Agente - Onde é que você mora?\nCliente - Eu moro {local}.\nAgente - Obrigado, deixe-me só ver então qual seria a clínica mais próxima de si...\nAgente - Seria a {clinica}.\nCliente - E isso aonde é que ficaria?\nAgente - Você depois vai receber um email com todas as informações, não se preocupe, mas ficaria {local}."
    ]
    return random.choice(opcoes)

# 8 - Pergunta sobre Dias e Horários Preferidos
def perguntar_dias_horarios():
    # Option 0 - Weekend
    if option == 0:
        return f"Agente - Em que dia e horário lhe daria mais jeito agendar a consulta?\nCliente - Ao fim de semana, porque à semana tenho um horário ocupado.\nAgente - Então seria sábado, deixe-me ver que horários tenho aqui disponíveis. Teria de ser às {hlist[0]}, {hlist[1]}, ou às {hlist[2]}.\nCliente - Pode ser às {hour} então.\nAgente - Ok então ficaria para sábado dia {monthday} às {hour}, correto?\nCliente - Exatamente."

    # Option 1 - Weekday late afternoon
    elif option == 1:
        return f"Agente - Em que dia e horas lhe dava mais jeito?\nCliente - À semana posso ao final da tarde em qualquer dia, senão teria de ser ao fim de semana.\nAgente - Eu tenho aqui os seguintes horários: na {dias_escolha[0]} às {hlist[0][0]} ou às {hlist[0][1]} horas ou na {dias_escolha[1]} às {hlist[1][0]} ou às {hlist[1][1]} horas.\nCliente - Pode ser na {day} às {hour}.\nAgente - Então fica marcado para dia {monthday}, {day} às {hour} horas."

    # Option 2 - Weekday morning or lunchtime
    elif option == 2:
        return f"Agente - Em que dias e horas lhe daria jeito?\nCliente - Durante a semana posso de manhã ou na hora de almoço.\nAgente - Eu tenho aqui na {dias_escolha[0]} às {hlist[0][0]} ou na {dias_escolha[0]} às {hlist[0][1]} horas ou na {dias_escolha[1]} às {hlist[1][0]} ou na {dias_escolha[1]} às {hlist[1][1]} horas.\nCliente - Podia ficar para {day} às {hour} então.\nAgente - Claro, fica então marcada a consulta para {day} às {hour}."

    # Option 3 - Weekday afternoon
    elif option == 3:
        return f"Agente - Em que dias e horas lhe daria jeito?\nCliente - Só posso de tarde, que manhãs não me dá jeito.\nAgente - Sem problema, eu tenho na {dias_escolha[0]} às {hlist[0][0]} ou na {dias_escolha[0]} às {hlist[0][1]} horas ou na {dias_escolha[1]} às {hlist[1][0]} ou na {dias_escolha[1]} às {hlist[1][1]} horas.\nCliente - {day.capitalize()} às {hour}?\nAgente - Claro. Então fica marcado para {day} às {hour}.\nCliente - Obrigado."
# 9 - Marcação para Familiar ou Amigo(novar)
def marcar_para_familiar_ou_amigo():
    opcoes = [
        "Agente - Além de si, gostaria de agendar uma consulta para algum familiar ou amigo? A consulta é gratuita para ele ou ela também.\nCliente - Não, seria só para mim.",
        "Agente - A consulta é totalmente gratuita. Gostaria de marcar também para um amigo ou familiar?\nCliente - Não, obrigado."
    ]
    return random.choice(opcoes)
# 10 - Confirmação
def confirmacao():
    opcoes = [
        f"Agente - Então a consulta fica marcada para {day}, dia {monthday} às {hour} na {clinica}. Irá receber um e-mail com as informações da consulta e um SMS no dia anterior. Tem alguma questão ou posso lhe ajudar com mais alguma coisa?\nCliente - Não, obrigado.",
        f"Agente - A sua consulta ficou então agendada para {day}, dia {monthday} às {hour} na {clinica}. Depois receberá um email com os detalhes da consulta e vai receber um SMS no dia antes da consulta. Se tiver mais alguma questão ou se puder ajudar-lhe com mais alguma coisa...\nCliente - Não. É tudo.",
        f"Agente - Fica então para, {day}, dia {monthday} às {hour} na {clinica}, agendada a sua consulta. Ok {nome_cliente.split()[0]}? Tem mais alguma questão?\nCliente - Não, era tudo, obrigado."
    ]
    return random.choice(opcoes)
# 11 - Finalização
def finalizacao():
    opcoes = [
        "Agente - Então, tenha um resto de um bom dia e uma boa semana, obrigada.\nCliente - Obrigado e igualmente.\nAgente - Obrigado.",
        "Agente - Certo, tenha então uma boa semana e uma boa consulta.\nCliente - Obrigado.\nAgente - Obrigado.",
        "Agente - Obrigado então pela sua disponibilidade, tenha um resto de um bom dia. Obrigada.\nCliente - Obrigado e igualmente.\nAgente - Obrigado e boa consulta.\nCliente - Obrigado."
    ]
    return random.choice(opcoes)
# Simulação da chamada
def simulacao():

    setup()
 
    print(introducao_cliente_para_agente())

    print(explicacao_consulta())
    i=random.randint(0,4)
    if i==0:
        print(adse())
 
    print(solicitacao_de_dados_cliente_para_agente())
    print(identificar_clinica_cliente_para_agente())
    print(perguntar_dias_horarios())    
    print(marcar_para_familiar_ou_amigo())
    print(confirmacao())
    print(finalizacao())
    

# Executar a simulação
if __name__ == "__main__":
    for i in range(200):
        print(f"#{i+59}") 
        simulacao()
       
