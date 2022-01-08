import React, { useContext } from "react"
import { BoxArrowRight, ClockHistory, House, Joystick, People, Person, Clipboard } from "react-bootstrap-icons"
import { useNavigate } from "react-router-dom"

import { LOGOUT } from "../../../action-types"
import { AuthContext } from "../../../App"
import NavigationLink from "../../NavigationLink"
import { NavbarWrapper } from "./NavbarStyles"

function Navbar({ open }) {
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    const logout = () => {
        authDispatch({ type: LOGOUT })
        navigate('/logged-out')
    }

    return (
        <NavbarWrapper open={open}>
            <NavigationLink className="menu-button" to="/"><House /><span>Home</span></NavigationLink>
            <NavigationLink className="menu-button" to="/single-player-start-screen"><Person /><span>Singleplayer</span></NavigationLink>
            <NavigationLink className="menu-button" to="/multi-player-start-screen"><People /><span>Multiplayer</span></NavigationLink>
            {authState.user && (
                <>
                    <NavigationLink className="menu-button" to="/games/on-play"><Joystick /><span>OnPlay</span></NavigationLink>
                    <NavigationLink className="menu-button" to="/games/history"><ClockHistory /><span>History</span></NavigationLink>
                    <NavigationLink className="menu-button" to="/user/dashboard"><Clipboard /><span>Profile</span></NavigationLink>
                    <button classNameName='logout-button' onClick={logout}>
                        <NavigationLink className="menu-button" to="/"><BoxArrowRight />Logout</NavigationLink>
                    </button>
                </>
            )}
        </NavbarWrapper>
    )
}

export default Navbar 