import { useEffect, useState } from 'react'
import './App.css'
import empresas from './assets/empresas.json'
import Select from 'react-select';

function App() {
  const [acao, setAcao] = useState('');
  const [periodo, setPeriodo] = useState('TIME_SERIES_INTRADAY');

    const opcoes = empresas.map((acao)=>({
      value: acao.sigla,
      label: `${acao.sigla} - ${acao.nomeAcao}`
    }));

    const identificarMudancas = (selecionado) =>{
      setAcao(selecionado);
      console.log('ação escolhida:', selecionado.value);

    };
  useEffect(()=>{

    if(!acao)return;

    const buscarDados = async () => {
      try{
        const dadosApi = await fetch(`https://www.alphavantage.co/query?function=${periodo}&symbol=${acao.value}&interval=5min&apikey=M6SRS61OPX6BTE7C`)
        const dados = await dadosApi.json();
        console.log(dados)
      }
      catch(error){
        console.log(error)
      }
      
    }
    
    buscarDados()
  },[acao, periodo])
  console.log(acao);


  return (
    <>
      <div className='geral'>
      <div className='inputText'>
        {/*seleção da acao*/}
        <Select options={opcoes} onChange={identificarMudancas} placeholder='digite para buscar'/>
      </div>


      {/*selaçao de periodo de demostraçao*/}
      <div className='selectPeriodo'>
        <label>
          Escolha o tipo de dados:
          <select value={periodo} onChange={(e)=>{setPeriodo(e.target.value)}}>
            <option value="TIME_SERIES_INTRADAY">intervaloDiario</option>
            <option value="TIME_SERIES_DAILY">Diário</option>
            <option value="TIME_SERIES_WEEKLY">Semanal</option>
            <option value="TIME_SERIES_MONTHLY">Mensal</option>
          </select>
        </label>
      </div>
      </div>
    </>
  )
}

export default App
