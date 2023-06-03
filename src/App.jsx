import { generateFakeUserData } from './fakeUserData.js'
import { useState, useEffect } from 'react'
import { PseudoRandChanging } from './errMaker/pseudoRandChanging.js'
import ParamsBar from './components/ParamsBar.jsx'
import Table from './components/Table.jsx'
import { downloadCSV } from './downloadCSV.js'
import 'bootstrap/dist/css/bootstrap.min.css'

function App(){
  const [region, setRegion] = useState('de');
  const [errors, setErrors] = useState('');
  const [seed, setSeed] = useState('');
  const [fakeUserData, setFakeUserData] = useState([]);
  const [page, setPage] = useState(1);
  const dataPortion = 10;

  useEffect(()=>{
    const fakeData = generateFakeUserData(seed, 1, region, 20);
    setFakeUserData(fakeData);
  }, [])
  
  let ignoreScrl = false;
  function handleScroll(){
    const windowBottom = window.pageYOffset + window.innerHeight;
    if (windowBottom >= document.documentElement.offsetHeight-50){
      if (ignoreScrl) return
      ignoreScrl = true;
      const nextPage = page+1;
      setPage(nextPage);
      const startIndex = nextPage*dataPortion+1;
      const nextPageFakeData = generateFakeUserData(
        seed, nextPage, region, dataPortion, startIndex,
      );
      const pseudoRand = new PseudoRandChanging(nextPageFakeData, Number(errors));
      const errUserData = pseudoRand.getResult();
      setFakeUserData(old=>[...old, ...errUserData]);
    }
  }
  window.onscroll = handleScroll;

  function downloadData(){
    downloadCSV(fakeUserData);
  }

  return(
    <div className="container-fluid">
      <ParamsBar
        region={region}
        setRegion={setRegion}
        seed={seed} 
        setSeed={setSeed}
        errors={errors}
        setErrors={setErrors}
        setPage={setPage}
        setFakeUserData={setFakeUserData}
      />
      <Table fakeUserData={fakeUserData}/>
      <button 
        className="position-fixed bottom-0 end-0 mb-5 me-5 btn btn-success" 
        onClick={downloadData}>
          Export to CSV
        </button>
    </div>
  )
}

export default App;