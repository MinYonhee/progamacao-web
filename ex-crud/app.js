const APP_ID = 'oiyoEAMYPe2DuC34amnM2Bdl4Tt0hHWMDQc2u3Uv'; 
const REST_API_KEY = 'dvcYWwoQEAfrhN1Ud3U8tON4i4UohibIITINvFS6'; 
const SERVER_URL = 'https://parseapi.back4app.com'; 


Parse.initialize(APP_ID, REST_API_KEY);
Parse.serverURL = SERVER_URL;

async function createDespesa(descricao, valor) {
    try {
        const response = await fetch(`${SERVER_URL}/classes/Despesas`, {
            method: 'POST',
            headers: {
                'X-Parse-Application-Id': APP_ID, // Certifique-se que o APP_ID está correto
                'X-Parse-REST-API-Key': REST_API_KEY, // Certifique-se que o REST_API_KEY está correto
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ descricao, valor }) // Dados a serem enviados
        });

        const result = await response.json();
        console.log("Resposta da criação da despesa: ", result); // Verifica se a despesa foi criada com sucesso
        getDespesas(); // Atualiza a lista de despesas
    } catch (error) {
        console.error('Erro ao criar despesa:', error);
    }
}


// Função para adicionar despesa
async function adicionarDespesa(descricao, valor) {
    const Despesa = Parse.Object.extend('Despesas');
    const novaDespesa = new Despesa();

    novaDespesa.set('descricao', descricao);
    novaDespesa.set('valor', parseFloat(valor));

    try {
        await novaDespesa.save();
        listarDespesas();
    } catch (error) {
        console.error('Erro ao adicionar despesa:', error);
    }
}

// Função para atualizar o valor da despesa
async function atualizarDespesa(id, valor) {
    const Despesa = Parse.Object.extend('Despesas');
    const query = new Parse.Query(Despesa);

    try {
        const despesa = await query.get(id);
        despesa.set('valor', parseFloat(valor));
        await despesa.save();
        listarDespesas();
    } catch (error) {
        console.error('Erro ao atualizar despesa:', error);
    }
}

// Função para deletar despesa
async function deletarDespesa(id) {
    const Despesa = Parse.Object.extend('Despesas');
    const query = new Parse.Query(Despesa);

    try {
        const despesa = await query.get(id);
        await despesa.destroy();
        listarDespesas();
    } catch (error) {
        console.error('Erro ao deletar despesa:', error);
    }
}

// Evento de submissão do formulário para criar nova despesa
document.getElementById('despesaForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const descricao = document.getElementById('descricao').value;
    const valor = document.getElementById('valor').value;

    if (descricao && valor) {
        adicionarDespesa(descricao, valor);
        document.getElementById('despesaForm').reset();
    }
});

// Carregar despesas ao carregar a página
listarDespesas();