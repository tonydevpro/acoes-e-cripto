import { useEffect, useState } from 'react'
import './App.css'
import empresas from './assets/empresas.json'
import Select from 'react-select';
import  Line  from './grafico';
import Barra from './graficoVolume';

function App() {
  const [acao, setAcao] = useState('');
  const [periodo, setPeriodo] = useState('TIME_SERIES_INTRADAY');
  const [parametro, setParametro] = useState('');
  const [loading, setLoading] = useState(false);

    const opcoes = empresas.map((acao)=>({
      value: acao.sigla,
      label: `${acao.sigla} - ${acao.nomeAcao}`
    }));

    const identificarMudancas = (selecionado) =>{
      setAcao(selecionado);
      

    };
  useEffect(()=>{

    if(!acao)return;

    const buscarDados = async () => {
      setLoading(true);
      try{
        const dadosApi = await fetch(`https://www.alphavantage.co/query?function=${periodo}&symbol=${acao.value}&interval=5min&apikey=M6SRS61OPX6BTE7C`)
        const dados = await dadosApi.json();
        setParametro(dados)
      }
      catch(error){
        console.log(error)
      }finally{
        setLoading(false);
      }
      
    }
    
    buscarDados()
  },[acao, periodo])



  return (
    <>
      <div className='geral'>
        <h1 className="title">Análise de Ações</h1>
      <div className="controls">
        <div className='inputText'>
          {/*seleção da acao*/}
          <Select options={opcoes} onChange={identificarMudancas} placeholder='digite para buscar' className="select"/>
        </div>


        {/*selaçao de periodo de demostraçao*/}
        <div className='selectPeriodo'>
          <label>
            Escolha o tipo de dados:
            <select value={periodo} onChange={(e)=>{setPeriodo(e.target.value)}}>
              <option value="TIME_SERIES_INTRADAY">Variaçao Diaria</option>
              <option value="TIME_SERIES_DAILY">Diário</option>
              <option value="TIME_SERIES_WEEKLY">Semanal</option>
              <option value="TIME_SERIES_MONTHLY">Mensal</option>
            </select>
          </label>
        </div>
      </div>
        <div className='grafico'>
        {loading ? <p>Carregando dados...</p> : 
        <div className='graficos-line-bar'>
          <Line dados={parametro} />,
          <Barra dados={parametro} />
        </div>
        }
        </div>
      </div>
    </>
  )
}

export default App
