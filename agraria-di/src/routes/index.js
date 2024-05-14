import { Routes, Route } from 'react-router-dom'

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Inicio from '../pages/Inicio';
import CadastroCliente from '../pages/CadastroCliente';
import Conta from '../pages/Conta';

import Private from './private'


function RoutesApp(){
  return(
    <Routes>

      <Route path="/signin" element={ <SignIn/> } />

      <Route path="/signup" element={ <SignUp/> } />

      <Route path="/" element={<Private><Inicio/></Private>}/>
      
      <Route path="/cadastro" element={ <Private><CadastroCliente/></Private> } />

      <Route path="/conta" element={<Private><Conta/></Private>} />
    
    </Routes>
  )
}

export default RoutesApp;