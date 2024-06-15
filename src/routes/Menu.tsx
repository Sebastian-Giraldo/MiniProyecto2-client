import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom";
import appFirebase from '../firebaseConfig';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export const Menu = () => {
  const navigate = useNavigate()

  const auth = getAuth(appFirebase);
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (userFirebase) => {
    if(userFirebase) {
      setUser(userFirebase);
      console.log(user.email, "g");
    } else {
      setUser(null);
    }
  });

  const goHome = () => {
    navigate('/')
  }

  return (
    <>
      <div style={{position: 'absolute', left: '10px', color: 'white'}}>
        {user? <p>{user.email}</p>:<p>Sin iniciar sesión</p>}
      </div>
      <button onClick={goHome} style={{position: 'absolute', top: '5px', right: '20px'}}>
        Log out
      </button>
      <Outlet />
    </>
  )
}

export default Menu
