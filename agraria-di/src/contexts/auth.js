import { useState, createContext, useEffect } from 'react';
import { auth, db } from '../services/firebaseConnetion';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const AuthContext = createContext({});

function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  useEffect(() => {
    async function loadUser(){
      const storageUser = localStorage.getItem('@agraria-di')

      if(storageUser){
        setUser(JSON.parse(storageUser))
        setLoading(false);
      }


      setLoading(false);

    }

    loadUser();
  }, [])


  async function signIn(email, password){
    setLoadingAuth(true);

    await signInWithEmailAndPassword(auth, email, password)
    .then( async (value) => {
      let uid = value.user.uid;

      const docRef = doc(db, "agraria-di", uid);
      const docSnap = await getDoc(docRef)

      let data = {
        uid: uid,
        nome: docSnap.data().nome,
        avatarUrl: docSnap.data().avatarUrl
      }

      setUser(data);
      storageUser(data);
      setLoadingAuth(false);
      toast.success("Bem-vindo(a) de volta!")
      navigate("/")
    })
    .catch((error) => {
      console.log(error);
      setLoadingAuth(false);
      toast.error("Ops algo deu errado!");
    }) 

  }


  // Cadastrar um novo user
  async function signUp(email, password, name){
    setLoadingAuth(true);

    await createUserWithEmailAndPassword(auth, email, password)
    .then( async (value) => {
        let uid = value.user.uid

        await setDoc(doc(db, "agraria-di", uid), {
          nome: name,
          avatarUrl: null
        })
        .then( () => {

          let data = {
            uid: uid,
            nome: name,
            avatarUrl: null
          };

          setUser(data);
          storageUser(data);
          setLoadingAuth(false);
          toast.success("Seja bem-vindo ao sistema!")
          navigate("/")
          
        })


    })
    .catch((error) => {
      console.log(error);
      setLoadingAuth(false);
      toast.error("Ops algo deu errado!");
    })

  }


  function storageUser(data){
    localStorage.setItem('@agraria-di', JSON.stringify(data))
  }

  async function logout(){
    await signOut(auth);
    localStorage.removeItem('@agraria-di');
    setUser(null);
  }

  return(
    <AuthContext.Provider 
      value={{
        signed: !!user,
        user,
        signIn,
        signUp,
        logout,
        loadingAuth,
        loading,
        storageUser,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;