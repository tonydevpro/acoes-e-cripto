//import React from 'react';
import {Line} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
//import plugin from 'eslint-plugin-react';

Chart.register(...registerables);

const GraficoLinha = ({dados}) => {

    if(!dados){
        return <p>Carregando dados...</p>;
    }

        const dataHora= new Date();//data e hora
        // Extrai os componentes da data e hora
        const dia = dataHora.getDate();
        const mes = dataHora.getMonth() + 1; // Mês começa em 0, então adicionamos 1
        const ano = dataHora.getFullYear();
        
        let linha ='rgb(33, 134, 13)';

        const tempo = dados['Time Series (5min)'] || dados['Time Series (Daily)'] || dados['Weekly Time Series'] || dados['Monthly Time Series'];
        let rotulo = Object.keys(tempo);
        let precodeFechamento = rotulo.map((time)=>parseFloat(tempo[time]['4. close']));
        const precodeAbertura = rotulo.map((time)=>parseFloat(tempo[time]['1. open']));

        if(tempo === dados['Time Series (5min)'])/* cotaçao do dia - 5 - 5 min */{
            const horario = rotulo.map((item)=>item.split(' ')[1]);
            rotulo = horario.map((item)=>item.split(':').slice(0,2).join(':'));
            linha = 'rgba(0, 0, 0, 0)';
        }
        if(tempo === dados['Time Series (Daily)'])/* cotaçao com espaçamento diaria*/{
            console.log(rotulo)
            const rotuloAno = rotulo.filter((item) => item.startsWith(`${ano}-`));
            const rotuloMes = rotuloAno.filter((item) => item.startsWith(`${ano}-${mes.toString().padStart(2, '0')}`));
            linha = 'rgba(0, 0, 0, 0)';
            rotulo = rotuloMes;
        
        }
        if(tempo === dados['Weekly Time Series'])/* cotaçao com espaçamento semanal */{
             rotulo = rotulo.filter((item) => item.startsWith(`${ano}-`));
            //const rotuloMes = rotuloAno.filter((item) => item.startsWith(`${ano}-${mes.toString().padStart(2, '0')}`));
            //rotulo = rotuloMes;
            linha = 'rgb(33, 134, 13)';
        }
        if(tempo === dados['Monthly Time Series'])/* cotação com espaçamento mensal */{
            rotulo = rotulo.filter((item) => item.startsWith(`${ano}-`));
            linha = 'rgb(33, 134, 13)';
        }
    



const data = {
    labels: rotulo,
    datasets:[
        ...(tempo === dados['Time Series (Daily)'] || dados['Time Series (5min)'] ? [] : [
        {
            label: 'Preço de Fechamento',
            data: precodeFechamento,
            borderColor: 'red',
            backgroundColor: 'rgba(252, 0, 0, 0)',
            tension: 0.3,
            fill:true,
        }]  ),
        {
            label: 'Preço de abertura',
            data: precodeAbertura,
            borderColor: 'green',
            backgroundColor: linha,
            tension: 0.3,
            fill:true,
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
        display: true,
        title: {
          display: true,
          text: 'Tempo',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Preço',
        },
      },
    },
  };

    return <Line data={data} options={opcoes}/>;}

export default GraficoLinha;