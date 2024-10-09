let listaDespesas = document.getElementById('listaDespesas');
let inputSomatorio = document.getElementById('inputSomatorio');

const headers = {
    "X-Parse-Application-Id": "oiyoEAMYPe2DuC34amnM2Bdl4Tt0hHWMDQc2u3Uv",
    "X-Parse-REST-API-Key": "dvcYWwoQEAfrhN1Ud3U8tON4i4UohibIITINvFS6",
    "Content-Type": "application/json"
};

const pegarDespesas = async () => {
    try {
        const resposta = await fetch("https://parseapi.back4app.com/classes/Despesa", {
            method: 'GET',
            headers: headers
        })

        if (resposta.ok) {
            listaDespesas.innerHTML = "";
            let respostaEmJson = await resposta.json();
    
            respostaEmJson.results.forEach(despesa => {
                let novaDespesa = document.createElement('li');
                let inputValorDespesa = document.createElement('input');
                let botaoEditar = document.createElement('button');
                let botaoDeletar = document.createElement('button');
                let botaoSalvarEdicao = document.createElement('button');

                inputValorDespesa.value = despesa.valor;
                inputValorDespesa.disabled = true;
                inputValorDespesa.id = `despesa-${despesa.objectId}`

                novaDespesa.innerText = `${despesa.descricao}`;

                botaoEditar.innerText = "Editar";
                botaoEditar.id = despesa.objectId;
                botaoEditar.onclick = alterarVisibilidadeInputDespesa;

                botaoDeletar.innerText = "x";
                botaoDeletar.id = despesa.objectId;
                botaoDeletar.onclick = deletarDespesa;

                botaoSalvarEdicao.innerText = "Salvar";
                botaoSalvarEdicao.id = despesa.objectId;
                botaoSalvarEdicao.onclick = editarDespesa;

                listaDespesas.appendChild(novaDespesa);
                listaDespesas.appendChild(inputValorDespesa);
                listaDespesas.appendChild(botaoEditar);
                listaDespesas.appendChild(botaoDeletar);
                listaDespesas.appendChild(botaoSalvarEdicao);
            });
            
            let somatorioDespesas = respostaEmJson.results.reduce((valorAtual, item) => { 
                return valorAtual + item.valor
            }, 0);
    
            inputSomatorio.value = somatorioDespesas;
        } else {
            throw new Error('Falha ao buscar as despesas');
        }
    } catch(erro) {
        alert(erro);
    }
}

const criarDespesa = async () => {
    let dados = {
        descricao: document.getElementById('descricao').value,
        valor: Number(document.getElementById('valor').value),
    }

    try {
        const resposta = await fetch("https://parseapi.back4app.com/classes/Despesa", {
            method: 'POST',
            body: JSON.stringify(dados),
            headers: headers
        })

        if (resposta.ok) {
            let respostaEmJson = await resposta.json();
            alert('Despesa criada com sucesso!');
            pegarDespesas();
        } else {
            throw new Error('Falha ao criar a despesa.');
        }

    } catch(erro) {
        alert(erro);
    }
}

const alterarVisibilidadeInputDespesa = async (e) => {
    const idDespesa = e.target.id;
    let inputDespesa = document.getElementById(`despesa-${idDespesa}`);
    inputDespesa.disabled = !inputDespesa.disabled;
} 

const editarDespesa = async (e) => {
    const idDespesa = e.target.id;
    let inputDespesa = document.getElementById(`despesa-${idDespesa}`);
    let dados = {
        valor: Number(inputDespesa.value),
    }

    try {
        const resposta = await fetch(`https://parseapi.back4app.com/classes/Despesa/${idDespesa}`, {
            method: 'PUT',
            body: JSON.stringify(dados),
            headers: headers
        })

        if (resposta.ok) {
            let respostaEmJson = await resposta.json();
            alert('Despesa editada com sucesso!');
            pegarDespesas();
        } else {
            throw new Error('Falha ao editar a despesa.');
        }

    } catch(erro) {
        alert(erro);
    }
}

const deletarDespesa = async (e) => {
    const idDespesa = e.target.id;
    let confirmacao = confirm("Tem certeza que deseja excluir essa despesa?");

    try {
        const resposta = await fetch(`https://parseapi.back4app.com/classes/Despesa/${idDespesa}`, {
            method: 'DELETE',
            headers: headers
        })

        if (resposta.ok && confirmacao) {
            let respostaEmJson = await resposta.json();
            alert('Despesa excluída com sucesso!');
            pegarDespesas();
        } else {
            throw new Error('Falha ao excluir a despesa.');
        }

    } catch(erro) {
        alert(erro);
    }
}

window.onload = pegarDespesas;