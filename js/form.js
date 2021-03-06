//Alert box
alert('Olá, você está prestes a conhecer meu primeiro projeto em js, nele você pode adicionar pacientes, filtrar os pacientes na tabela, importar uma tabela já existente e apagar pacientes. Agradeço a visita! =)')

var botaoAdicionar = document.querySelector('#adicionar-paciente');
botaoAdicionar.addEventListener('click', function () {
    event.preventDefault();

    var form = document.querySelector('#form-adiciona');

    // Extraindo informações do paciente do form
    var paciente = obtemPacienteDoFormulario(form);

    console.log(paciente);


    // Cria a Tr e Td do paciente
    var erros = validaPaciente(paciente);

    if (erros.length > 0) {
        exibeMensagensDeErros(erros);

        return;
    }

    // Adicionando o paciente na tabela
    adicionaPacienteNaTabela(paciente)

    form.reset();
    var mensagensErro = document.querySelector('#mensagens-erro');
    mensagensErro.innerHTML = '';

});

function adicionaPacienteNaTabela(paciente) {
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector('#tabela-pacientes');
    tabela.appendChild(pacienteTr);

}

function exibeMensagensDeErros(erros) {
    var ul = document.querySelector('#mensagens-erro');
    ul.innerHTML = ''

    erros.forEach(function (erro) {
        var li = document.createElement('li');
        li.textContent = erro;
        ul.appendChild(li);

    });
}

function obtemPacienteDoFormulario(form) {
    var altura = form.altura.value.replace(',', '.');

    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: altura,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, altura)
    }
    console.log(form.altura.value);
    return paciente;
}

function montaTr(paciente) {
    var pacienteTr = document.createElement('tr');
    pacienteTr.classList.add('paciente');

    pacienteTr.appendChild(montaTd(paciente.nome, 'info-nome'));
    pacienteTr.appendChild(montaTd(paciente.peso, 'info-peso'));
    pacienteTr.appendChild(montaTd(paciente.altura, 'info-altura'));
    pacienteTr.appendChild(montaTd(paciente.gordura, 'info-gordura'));
    pacienteTr.appendChild(montaTd(paciente.imc, 'info-imc'));

    return pacienteTr
}

function montaTd(dado, classe) {
    var td = document.createElement('td');
    td.textContent = dado;
    td.classList.add(classe);
    return td;
}


function validaPaciente(paciente) {

    var erros = [];

    if (paciente.nome.length == 0) {
        erros.push('O nome não pode ser em branco')
    }

    if (!validaPeso(paciente.peso)) {
        erros.push('Peso é inválido');
    }

    if (!validaAltura(paciente.altura)) {
        erros.push('Altura é inválida');
    }

    if (paciente.gordura.length == 0) {
        erros.push('A gordura não pode ser em branco')
    }

    return erros;

}