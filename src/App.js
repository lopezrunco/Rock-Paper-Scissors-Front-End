import { createContext, useEffect, useReducer } from 'react'
import { Routes, Route } from 'react-router-dom'

import Forbidden from './pages/access/Forbidden'
import NotFound from './pages/access/NotFound'
import LoggedOut from './pages/access/LoggedOut'
import DashBoard from './pages/access/DashBoard'
import Login from './pages/security/Login'
import Register from './pages/security/Register'
import WelcomeScreen from './pages/WelcomeScreen'
import MultiPlayerStartScreen from './pages/MultiPlayerStartScreen'
import SinglePlayerStartScreen from './pages/SinglePlayerStartScreen'
import SinglePlay from './pages/game/SinglePlay'
import SelectOpponent from './pages/game/SelectOpponent'
import GameCreated from './pages/game/GameCreated'
import OnPlayGames from './pages/game/OnPlayGames'
import Play from './pages/game/Play'
import Result from './pages/game/Result'
import History from './pages/game/History'
import TutorialScreen from './pages/TutorialScreen'

import RequireAuth from './components/RequireAuth'
import BackgroundShape from './components/BackgroundShape'
import Nav from './components/Nav'
import Footer from './components/Footer'
import NavigationScrollToTop from './components/NavigationScrollToTop'
import Loader from './components/Loader'
import NewGameButton from './components/NewGameButton'

import { ENABLE_MFA, HIDE_LOADER, LOGIN, LOGOUT, REFRESH_TOKEN, SHOW_LOADER } from './action-types'

import './App.scss'

// Creacion de contexto para manejo de datos tipo autenticacion
export const AuthContext = createContext()

// Estado inicial del contexto de autenticacion
const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user')),
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  showingLoader: false
}

// Reducer para manejo de acciones de tipo login
const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      // Se toman los valores del usuario y se setean en el local storage
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('token', action.payload.user.token)
      localStorage.setItem('refreshToken', action.payload.user.refreshToken)

      // Retorna nuevo estado
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.user.token,
        refreshToken: action.payload.user.refreshToken
      }

    case REFRESH_TOKEN:
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('refreshToken', action.payload.refreshToken)

      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken
      }

    case LOGOUT:
      localStorage.clear()

      // Se retorna nuevo estado con los valores reseteados
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        refreshToken: null
      }

    case ENABLE_MFA:
      // Basicamente se clona el usuario actual y le habilita el MFA
      const user = {
        ...state.user,
        mfaEnabled: true
      }

      // Se guarda en el local storage para deshabilitar boton de activar MFA
      localStorage.setItem('user', JSON.stringify(user))

      // Actualiza el estado
      return {
        ...state,
        user
      }

    case SHOW_LOADER:
      return {
        ...state,
        showingLoader: true
      }

    case HIDE_LOADER:
      return {
        ...state,
        showingLoader: false
      }

    default:
      // Si la accion no matchea ningun caso, retorna el mismo estado
      return state
  }
}

function App() {
  // const location = useLocation()

  // Hook useReducer: se envia la funcion reducer y el estado inicial que manejara
  // Deja disponible el estado y el dispatch
  const [state, dispatch] = useReducer(reducer, initialState)

  // Hook useEffect: Restablece el estado de la app cada vez que carga
  useEffect(() => {
    // Se intenta obtener del local storage los datos del usuario
    const user = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')

    // Si el usuario esta logueado, se hace dispatch de tipo login con los datos
    if (user && token) {
      dispatch({
        type: LOGIN,
        payload: {
          user,
          token
        }
      })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <div className="App">

        <BackgroundShape />
        <Nav />
        <NavigationScrollToTop />

        <Routes>

          <Route path="/games/history" element={
            <RequireAuth>
              <History />
              <NewGameButton />
            </RequireAuth>
          } />

          <Route path="/games/on-play" element={
            <RequireAuth>
              <OnPlayGames />
              <NewGameButton />
            </RequireAuth>
          } />

          <Route path="/games/result/:id" element={
            <RequireAuth>
              <Result />
            </RequireAuth>
          } />

          <Route path="/games/play/:id" element={
            <RequireAuth>
              <Play />
            </RequireAuth>
          } />

          <Route path="/game-created" element={
            <RequireAuth>
              <GameCreated />
            </RequireAuth>
          } />

          <Route path="/select-opponent" element={
            <RequireAuth>
              <SelectOpponent />
            </RequireAuth>
          } />

          <Route path="/multi-player-start-screen" element={
            <MultiPlayerStartScreen />
          } />

          <Route path="/single-play" element={
            <SinglePlay />
          } />

          <Route path="/single-player-start-screen" element={
            <SinglePlayerStartScreen />
          } />

          <Route path="/tutorial" element={
            <RequireAuth>
              <TutorialScreen />
            </RequireAuth>
          } />

          <Route path="/user/dashboard" element={
            <RequireAuth>
              <DashBoard />
            </RequireAuth>
          } />

          <Route path="/logged-out" element={
            <LoggedOut />
          } />

          <Route path="/login" element={
            <Login />
          } />

          <Route path="/register" element={
            <Register />
          } />

          <Route path="/" element={
            <>
              <WelcomeScreen />
              <Footer />
            </>
          } />

          <Route path="/forbidden" element={
            <Forbidden />
          } />

          <Route path="*" element={
            <NotFound />
          } />

        </Routes>

        {/* El loader se muestra si showingLoader es true */}
        {state.showingLoader && (
          <Loader />
        )}

      </div>
    </AuthContext.Provider>
  )
}

export default App
