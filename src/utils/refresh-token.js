import { LOGOUT, REFRESH_TOKEN } from "../action-types"
import { apiUrl } from "./api-url"

export const refreshToken = (token, dispatch, navigate, callback) => {
    // Invoca al endpoint refresh pasandole el refresh token
    fetch(apiUrl('auth/refresh'), {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw response
        }
    }).then(response => {
        // Si sale todo ok, emite dispatch avisando al contexto de seguridad sobre el refresh token
        // El aviso llega al reducer de app.js, que actualiza el local storage y el state con los nuevos valores
        // Al hacer dicha actualizacion, se dispara nuevamente el useEffect
        dispatch({
            type: REFRESH_TOKEN,
            payload: response
        })
        // Definicion de funcion callback para reutilizar el codigo en distintos contextos
        // La misma se aplicara solo si viene como parametro
        if (callback) {
            callback()
        }
    }).catch(error => {
        // En caso de error se envia al usuario a login page y hace logout dispatch
        console.error(error)
        dispatch({
            type: LOGOUT
        })
        navigate('/login')
    })
}