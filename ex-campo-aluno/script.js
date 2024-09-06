document.getElementById('btn-transformar').addEventListener('click', function() {
    
    const mat = document.getElementById('mat').value.trim();
    const nome = document.getElementById('nome').value.trim();
    const idade = document.getElementById('idade').value.trim();
    const cpf = document.getElementById('cpf').value.trim();

    if (!mat || !nome || !idade || !cpf) {
        alert('Todos os campos devem ser preenchidos!');
        return;
    }

    if (!Number.isInteger(parseFloat(idade))) {
        alert('A idade deve ser um valor inteiro!');
        return;
    }


    const aluno = {
        matricula: mat,
        nome: nome,
        idade: parseInt(idade, 10),
        cpf: cpf
    };

    const saidaJSON = JSON.stringify(aluno, null, 2);
    document.getElementById('json-output').textContent = saidaJSON;
});
