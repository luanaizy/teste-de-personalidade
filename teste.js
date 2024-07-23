function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
    const data = event.dataTransfer.getData("text");
    const dragged_element = document.getElementById(data);
    dragged_element.classList.add('dragging');
}

function allowDrop(event) {
    event.preventDefault();
    event.target.classList.add('over');
}

function dragLeave(event){
    event.target.classList.remove('over');
}
function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const dragged_element = document.getElementById(data);
    dragged_element.classList.remove('dragging');
    const dragged_element_partner = dragged_element.previousElementSibling;
    const targetElement = event.target;
    targetElement.classList.remove('over');

    const parent = targetElement.parentNode;

    if (parent.contains(dragged_element) && targetElement.classList.contains("ghost")){
        if(dragged_element_partner === targetElement) return;

        parent.removeChild(dragged_element);
        parent.removeChild(dragged_element_partner);
        
        if(targetElement === parent.firstElementChild){
            parent.insertBefore(dragged_element_partner, targetElement.nextElementSibling);
            parent.insertBefore(dragged_element, targetElement.nextElementSibling);
        } else {
            parent.insertBefore(dragged_element_partner, targetElement);
            parent.insertBefore(dragged_element, targetElement);
        }      
    } else {
        return;
    }
}


function calcularMedias() {
    const scores = { dominancia: 0, influencia: 0, estabilidade: 0, cautela: 0 };

    document.querySelectorAll(".Bloco").forEach(bloco => {
        bloco.querySelectorAll(".TestButton").forEach((button, index) => {
            const value = parseInt(button.getAttribute("data-value"));
            const category = button.getAttribute("data-category");
            scores[category] += value * (4 - (index));
        });
    });


    const dominanciaPercent = Math.round(((scores.dominancia-274) / 2196) * 100);
    const influenciaPercent = Math.round(((scores.influencia-274) / 2196) * 100);
    const estabilidadePercent = Math.round(((scores.estabilidade-274) / 2196) * 100);
    const cautelaPercent = Math.round(((scores.cautela-274) / 2196) * 100);

    criarGrafico(dominanciaPercent, influenciaPercent, estabilidadePercent, cautelaPercent);

    document.getElementById('resultado-fieldset').style.display = 'block';
    document.getElementById('resultado').style.display = 'block';
    document.getElementById('myChart').style.display = 'block';

}

function criarGrafico(dominancia, influencia, estabilidade, cautela) {
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
                data: {
                    labels: ['Dominância', 'Cautela', 'Influência', 'Estabilidade'],
                    datasets: [{
                        label: 'Análise Comportamental',
                        data: [dominancia, cautela, influencia, estabilidade],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: false
                        },
                        annotation: {
                            annotations: {
                                line1: {
                                    type: 'line',
                                    yMin: 50,
                                    yMax: 50,
                                    borderColor: 'rgba(255, 0, 0, 1)', // cor vermelha para destacar
                                    borderWidth: 2,
                                    borderDash: [5, 5]
                                }
                            }
                        }
                    },
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                beginAtZero: true,
                                max: 100
                            },
                            grid: {
                                display: false // remove a grade
                            }
                        },
                        x: {
                            grid: {
                                display: false // remove a grade
                            }
                        }
                    }
                }
            });
        };





document.getElementById('TesteDiscFinalizarButton').addEventListener('click', calcularMedias);















// const personalidade = {
//     dominancia: 0,
//     influencia: 0,
//     estabilidade: 0,
//     cautela: 0,
// };

// function somarPontuacao(categoria, pontuacao, button) {

//     const botoes = button.parentElement.querySelectorAll('button');

//     if (button.classList.contains('pressed')) {
//         personalidade[categoria] -= pontuacao;
//         button.classList.remove('pressed');
//         botoes.forEach(btn => {
//             if (btn !== button) {
//                 btn.disabled = false;
//             }
//         });
//     } else {
//         personalidade[categoria] += pontuacao;
//         button.classList.add('pressed');
//         botoes.forEach(btn => {
//         if (btn !== button) {
//             btn.disabled = true;
//         }
//     });
//     }
// }

// function calcularMedias(button) {
//     const { dominancia, influencia, estabilidade, cautela } = personalidade;
//     const denominador = dominancia + influencia + estabilidade + cautela;

//     const dom = Math.floor((dominancia * 100) / denominador);
//     const inf = Math.floor((influencia * 100) / denominador);
//     const est = Math.floor((estabilidade * 100) / denominador);
//     const cau = Math.floor((cautela * 100) / denominador);

//     const dominanciaInput = document.getElementById('dominancia-input');
//     const influenciaInput = document.getElementById('influencia-input');
//     const estabilidadeInput = document.getElementById('estabilidade-input');
//     const cautelaInput = document.getElementById('cautela-input');

//     dominanciaInput.value = dom;
//     influenciaInput.value = inf;
//     estabilidadeInput.value = est;
//     cautelaInput.value = cau;

//     const formulario = document.getElementById('formulario');
//     formulario.submit();
//     ocultarElemento('dominancia');
//     ocultarElemento('influencia');
//     ocultarElemento('estabilidade');
//     ocultarElemento('cautela');
//     window.location.href = "/teste/disc/sucess/"
//     button.style.display = 'none';
//     criarGrafico();
// }

// function ocultarElemento(id) {
//     const elemento = document.getElementById(id);
//     elemento.style.display = 'none';
// }

// function criarGrafico() {
//     const ctx = document.getElementById('myChart').getContext('2d');
//     const { dominancia, influencia, estabilidade, cautela } = personalidade;

//     const data = {
//         labels: ['Dominância', 'Influência', 'Estabilidade', 'Cautela'],
//         datasets: [{
//             data: [dominancia, influencia, estabilidade, cautela],
//             backgroundColor: [
//                 '#FF6384', // Cor para Dominância
//                 '#36A2EB', // Cor para Influência
//                 '#FFCE56', // Cor para Estabilidade
//                 '#4BC0C0'  // Cor para Cautela
//             ],
//         }]
//     };

//     const myPieChart = new Chart(ctx, {
//         type: 'pie',
//         data: data,
//     });
// }

// function voltarAoInicio() {
//     window.location.href = '/teste/'; // Substitua 'index.html' pelo nome do seu arquivo inicial
// }