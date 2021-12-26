// Retorna la cadena de peticion a la API dependiendo de la ruta que reciba como parametro
export const apiUrl = (path) => {
    // Si se recibio la ruta sin el simbolo /, se le coloca, si no, no hace nada 
    if (!path.startsWith('/')) {
        path = `/${path}`
    }
    return `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}${path}`
}

// Output ej: http://localhost:3000/login