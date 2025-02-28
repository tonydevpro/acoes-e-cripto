import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const GraficoVolume = ({ dados }) => {
    if (!dados) {
        return
    }

    const dataHora= new Date();//data e hora
        // Extrai os componentes da data e hora
        const mes = dataHora.getMonth() + 1; // Mês começa em 0, então adicionamos 1
        const ano = dataHora.getFullYear();

    const tempo = dados['Time Series (5min)'] || dados['Time Series (Daily)'] || dados['Weekly Time Series'] || dados['Monthly Time Series'];
    
    let rotulo = Object.keys(tempo);
    let volumes = rotulo.map((time) => parseFloat(tempo[time]['5. volume']));

    if (tempo === dados['Time Series (5min)']) {
        const horario = rotulo.map((item) => item.split(' ')[1]);
        rotulo = horario.map((item) => item.split(':').slice(0, 2).join(':'));
    }
    if(tempo === dados['Time Series (Daily)'])/* cotaçao com espaçamento diaria*/{
        console.log(rotulo)
        const rotuloAno = rotulo.filter((item) => item.startsWith(`${ano}-`));
        const rotuloMes = rotuloAno.filter((item) => item.startsWith(`${ano}-${mes.toString().padStart(2, '0')}`));
        rotulo = rotuloMes;
    
    }
    if(tempo === dados['Weekly Time Series'])/* cotaçao com espaçamento semanal */{
         rotulo = rotulo.filter((item) => item.startsWith(`${ano}-`));
        
    }
    if(tempo === dados['Monthly Time Series'])/* cotação com espaçamento mensal */{
        rotulo = rotulo.filter((item) => item.startsWith(`${ano}-`));
        
    }


    const data = {
        labels: rotulo,
        datasets: [
            {
                label: 'Volume de Negociação',
                data: volumes,
                backgroundColor: 'rgba(54, 162, 235, 0.5)', // Azul translúcido
                borderColor: 'rgba(54, 162, 235, 1)', // Azul sólido
                borderWidth: 1,
            }
        ]
    };

    const opcoes = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Tempo',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Volume',
                },
            },
        },
    };

    return <Bar data={data} options={opcoes} />;
};

export default GraficoVolume;