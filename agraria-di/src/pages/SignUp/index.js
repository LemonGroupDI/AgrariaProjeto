import { useState, useContext  } from 'react'
import logo from '../../assets/logoAgrariaN.png';
import foto1 from '../../assets/gadodecorte.jpg'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/auth'

export default function SignUp(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUp, loadingAuth } = useContext(AuthContext);

  async function handleSubmit(e){
    e.preventDefault();

    if(name !== '' && email !== '' && password !== ''){
     await signUp(email, password, name)
    }

  }

  return(
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do sistema" />
          <h1 className='portal'>Portal do Cooperado</h1>
        </div>

        <div className='login-div'>
        <img className='login-img' src={foto1} alt="imagem de fundo login"/>

        <form onSubmit={handleSubmit}>
          <h1>Nova conta</h1>
          <input 
            type="text" 
            placeholder="Seu nome"
            value={name}
            onChange={ (e) => setName(e.target.value) }
          />

          <input 
            type="text" 
            placeholder="email@email.com"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />

          <input 
            type="password" 
            placeholder="********"
            value={password}
            onChange={ (e) => setPassword(e.target.value) }
          />

          <button type="submit">
            {loadingAuth ? 'Carregando...' : 'Cadastrar'}
          </button>
          <Link to="/signin">Já possui uma conta? Faça login</Link>
        </form>


        </div>

      </div>
    </div>
  )
}