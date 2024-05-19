// import { db, auth } from '../../services/firebaseConnetion';
// import {
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     signOut,
//     onAuthStateChanged
//   } from 'firebase/auth';
// import { useState, useContext, useEffect } from 'react'

// export default function SignIn(){
//      // Estado para armazenar o email e a senha do usuário.
//   const [email, setEmail] = useState('');
//   const [senha, setSenha] = useState('');
//   // Estado para verificar se o usuário está logado.
//   const [user, setUser] = useState(false);
//   // Estado para armazenar os detalhes do usuário logado.
//   const [userDetail, setUserDetail] = useState({});

//    // Efeito que verifica se o usuário está logado quando o componente é montado.
//    useEffect(() => {
//     async function checkLogin(){
//     onAuthStateChanged(auth, (user) => {
//     if(user){
//       console.log(user);
//       setUser(true);
//       setUserDetail({
//       uid: user.uid,
//       email: user.email
//     })
//     }else{
//       setUser(false);
//       setUserDetail({})
//     }
//     })
//     }
//     checkLogin();
//   }, [])

//   // Função para criar um novo usuário no Firebase Auth.
//   async function novoUsuario(){
//     await createUserWithEmailAndPassword(auth, email, senha)
//     .then(() => {
//       console.log("CADASTRADO COM SUCESSO!");
//       setEmail('');
//       setSenha('');
//     })
//     .catch((error) => {
//       if(error.code === 'auth/weak-password'){
//       alert("Senha muito fraca.");
//     }else if(error.code === 'auth/email-already-in-use'){
//       alert("Email já existe!");
//     }
//   })
//   }

//   // Função para fazer login de um usuário no Firebase Auth.
//   async function logarUsuario(){
//     await signInWithEmailAndPassword(auth, email, senha)
//     .then((value) => {
//       console.log("USER LOGADO COM SUCESSO");
//       console.log(value.user);
//       setUserDetail({
//         uid: value.user.uid,
//         email: value.user.email,
//     })
//       setUser(true);

//       setEmail('');
//       setSenha('');
//     })
//     .catch(() => {
//       console.log("ERRO AO FAZER O LOGIN");
//     })
//   }

//   // Função para fazer logout de um usuário no Firebase Auth.
//   async function fazerLogout(){
//     await signOut(auth)
//     setUser(false);
//     setUserDetail({});
//   }

//   return (
//     <div className='container'>
//       <h1>ReactJS + Firebase :)</h1>
//       { user && (
//         <div className='login'>
//           <strong>Seja bem-vindo(a) (Você está logado!)</strong> <br/>
//           <span>ID: {userDetail.uid} - Email: {userDetail.email}</span> <br/>
//           <button onClick={fazerLogout}>Sair da conta</button>
//           <br/> <br/>
//         </div>
//       )}
      
//       <div className="container">
//         <h2>Usuarios</h2>
//         <label>Email</label>
//         <input
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Digite um email"
//         /> <br/>
//         <label>Senha</label>
//         <input
//         value={senha}
//         onChange={(e) => setSenha(e.target.value)}
//         placeholder="Informe sua senha"
//         /> <br/>
//         <div className='dolado'>
//           <button onClick={novoUsuario}>Cadastrar</button>
  
//           <button onClick={logarUsuario}>Fazer login</button>
//         </div>
//         </div>
//         </div>
//     );
// }
import { db, auth } from '../../services/firebaseConnetion';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
  } from 'firebase/auth';
import { useState, useContext, useEffect } from 'react'

import './style.css'

import logo from '../../assets/logoAgrariaN.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import foto1 from '../../assets/gadodecorte.jpg'


export default function SignIn(){
    //Estado para armazenar o email e a senha do usuário.
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  // Estado para verificar se o usuário está logado.
  const [user, setUser] = useState(false);
  // Estado para armazenar os detalhes do usuário logado.
  const [userDetail, setUserDetail] = useState({});

   // Efeito que verifica se o usuário está logado quando o componente é montado.
   useEffect(() => {
    async function checkLogin(){
    onAuthStateChanged(auth, (user) => {
    if(user){
      console.log(user);
      setUser(true);
      setUserDetail({
      uid: user.uid,
      email: user.email
    })
    }else{
      setUser(false);
      setUserDetail({})
    }
    })
    }
    checkLogin();
  }, [])

  // Função para criar um novo usuário no Firebase Auth.
  async function novoUsuario(){
    await createUserWithEmailAndPassword(auth, email, senha)
    .then(() => {
      console.log("CADASTRADO COM SUCESSO!");
      setEmail('');
      setSenha('');
    })
    .catch((error) => {
      if(error.code === 'auth/weak-password'){
      alert("Senha muito fraca.");
    }else if(error.code === 'auth/email-already-in-use'){
      alert("Email já existe!");
    }
  })
  }

  // Função para fazer login de um usuário no Firebase Auth.
  async function logarUsuario(){
    await signInWithEmailAndPassword(auth, email, senha)
    .then((value) => {
      console.log("USER LOGADO COM SUCESSO");
      console.log(value.user);
      setUserDetail({
        uid: value.user.uid,
        email: value.user.email,
    })
      setUser(true);

      setEmail('');
      setSenha('');
    })
    .catch(() => {
      console.log("ERRO AO FAZER O LOGIN");
    })
  }

  // Função para fazer logout de um usuário no Firebase Auth.
  async function fazerLogout(){
    await signOut(auth)
    setUser(false);
    setUserDetail({});
  }
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const { user, signIn, loadingAuth } = useContext(AuthContext)

//   async function handleSignIn(e){
//     e.preventDefault();

//     if(email !== '' && password !== ''){
//       await signIn(email, password);
//     }

//   }


  return(
    <div className="container-center">
        { user && (
            <div>
            <strong>Seja bem-vindo(a) (Você está logado!)</strong> <br/>
            <span>ID: {user.uid} - Email: {user.email}</span> <br/>
            <button >Sair da conta</button>
            <br/> <br/>
            </div>
      )}
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do sistema" />
          <h1 className='portal'>Portal do Cooperado</h1>
        </div>
        <div className='login-div'>
        <img className='login-img' src={foto1} alt="imagem de fundo login"/>

        <form onSubmit={handleSignIn}>
          <h1>Entrar</h1>
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

          <button type="submit" onClick={logarUsuario}>
            {/* {loadingAuth ? "Carregando..." : "Acessar"} */}
            
          </button>

          <Link to="/signup">Criar uma conta</Link>

        </form>

        
        </div>

      </div>
    </div>
  )
}