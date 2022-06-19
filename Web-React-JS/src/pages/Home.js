import React, { useState } from 'react'
import api from '../api/Api'
import '../pages/Home.css'

import Lottie from "lottie-react";
import CepAnimado from "../assets/cepAnimation2.json";
import Animacao2 from "../assets/cepAnimation.json"

// import { FiSearch } from 'react-icons/fi'

export default function Home() {
    
    const [ cep, setCep ] = useState()
    const [ resApi, setResApi ] = useState()

    const [ animationState, setAnimationState ] = useState({
        isStopped: true, isPaused: true,
    })
    
    
     async function handlePesquisar(){
        cep === '' || cep == undefined && alert('Por favor, preencher o número do cep.')
        try{
            const response = await api.get(`${cep}/json`)
            setResApi( response.data )
            setCep('')
        }catch{
            alert('Por favor, verificar o numero do cep e tente novamente.')
        }
    }

    const animationOptions ={
        loop: true,
        autoplay: true,
        animationData: CepAnimado,
        rendererSettings: {
            preserveAspectRatio: 'xMidYmid slice'
        }
    }

  return (
    <div>
       <div className='container'>

           {/* <Lottie options={animationOptions}
                height={400}
                width={400}
                isStopped={animationState.isStopped}
                isPaused={animationState.isPaused}
           /> */}

        <div className='animacao'>
        <Lottie 
            animationData={CepAnimado}
            loop={true}
            />
        </div>

            <h1 className='title'>
                Buscador de CEP:
            </h1>

        <div>
            <input
            className='containerInput'
            type={'text'}
            placeholder='Digite o cep Ex: 01034903'
            value={cep}
            onChange={(event) => setCep(event.target.value.replace(/\D+/g,'').replace('-',''))}
            
            />
            {/* <FiSearch size={25} color={'#000'}/> */}
        </div>

        <div>
            <button onClick={() => handlePesquisar()} className='buttonPesquisar'>
                <span className='buttonTexto'> Pesquisar </span> 
            </button>
        </div>

        {
           resApi && (
        <div className='resultado'>
            <span className='resultadoTexto'> CEP: {resApi.cep} </span>
            <span className='resultadoTexto'> Rua: {resApi.logradouro} </span>
            <span className='resultadoTexto'> Bairro: {resApi.bairro} </span>
            <span className='resultadoTexto'> Cidade: {`${resApi.localidade} - ${resApi.uf}`} </span>
        </div>
           ) 
        }
        
       </div>
    </div>
  )
}
