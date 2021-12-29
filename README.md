# Rock Paper Scissors Front End

## Instrucciones

Crear archivo .env con variables de entorno
```bash
PORT=4000
REACT_APP_API_PROTOCOL=http
REACT_APP_API_HOST=localhost
REACT_APP_API_PORT=3000
```

```bash
# Instalar dependencias
npm i

# Iniciar entorno de desarrollo
npm start

# Compilar web para publicar en hosting
npm run build
```

## Lógica base para definir ganador
Expandible añadiendo mas elementos al array, respetando los campos "id" y "losesTo"
```bash
[{ "id": 1, "name": "rock", "losesTo": 2 },
{ "id": 2, "name": "paper", "losesTo": 3 },
{ "id": 3, "name": "scissors", "losesTo": 1 }]
```