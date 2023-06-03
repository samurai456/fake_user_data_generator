import { useState } from 'react'
import { PseudoRandChanging } from '../errMaker/pseudoRandChanging.js'
import { generateFakeUserData } from '../fakeUserData.js'
import { getRandomSeed } from '../randomSeed'

function ParamsBar({seed, setSeed, region, setRegion, errors, setErrors, setPage, setFakeUserData}){
    const adaptive = " col-xl-2 col-lg-2 col-md-2 col-sm-8 col-10 my-3 ";

    function handleParamsChange(region, errors, seed){
        const userData = generateFakeUserData(seed, 1, region, 20);
        const pseudoRand = new PseudoRandChanging(userData, Number(errors));
        const errUserData = pseudoRand.getResult();
        setFakeUserData(errUserData);
        setPage(1);
    }

    return (
        <div className="row justify-content-center text-nowrap">
            <div className={adaptive}>
                <label className="control-label">
                    Region
                </label>
                <select 
                    className="form-select"
                    value={region} 
                    onChange={e=>{
                        setRegion(e.target.value);
                        handleParamsChange(e.target.value, errors, seed);
                    }}
                >
                    <option value='de'>Germany</option>
                    <option value='fr'>France</option>
                    <option value='sv'>Sweden</option>
                    <option value='es'>Spain</option>
                </select>
            </div>
            
            <div className={adaptive}>
                <label className="control-label">
                    Errors per record
                </label>
                <input 
                    className="form-control"
                    value={errors}
                    onChange={e=>{
                        const val = e.target.value;
                        if(val==='0') return
                        if(Number(val) <= 1000 || val===''){
                            setErrors(val);
                            handleParamsChange(region, val, seed)
                        }
                    }}
                />
                <input 
                    type='range' 
                    step='0.25' 
                    min="0" 
                    max="10" 
                    className="form-range"
                    value={Number(errors) || 0}
                    onChange={e=>{
                        setErrors(e.target.value);
                        handleParamsChange(region, e.target.value, seed);
                    }}
                />
            </div>

            
            <div className="col-xl-4 col-lg-5 col-md-5 col-sm-8 col-10 my-3">
                <label className="control-label">
                    Seed
                </label>
                <div className="d-flex">
                    <input 
                        className="form-control"
                        value={seed}
                        onChange={e=>{
                            setSeed(e.target.value);
                            handleParamsChange(region, errors, e.target.value);
                        }}
                    />
                    <button
                        className="btn btn-primary ms-1"
                        onClick={()=>{
                            const randomSeed = getRandomSeed();
                            setSeed(randomSeed);
                            handleParamsChange(region, errors, randomSeed);
                        }}
                    >
                        random
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default ParamsBar