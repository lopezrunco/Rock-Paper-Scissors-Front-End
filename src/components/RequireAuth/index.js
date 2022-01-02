import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../App";

// Accede a los hijos por dentro de este componente
function RequireAuth({ children }) {
    const { state: auth } = useContext(AuthContext)
    const location = useLocation()  // Indica desde donde viene el usuario

    // Si el usuario no esta autenticado, retorna un componente de navegacion que lleva al login
    if (!auth.isAuthenticated) {
        return <Navigate to='/login' state={{ from: location }} />
    } else {
        // Si esta autenticado, retorna los hijos, como si nunca hubiere pasado por la condicion
        return children
    }
}

export default RequireAuth