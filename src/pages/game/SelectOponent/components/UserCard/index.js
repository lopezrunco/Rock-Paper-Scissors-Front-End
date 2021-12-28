import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { UsersContext } from "../.."
import { AuthContext } from "../../../../../App"
import { apiUrl } from "../../../../../utils/api-url"


function UserCard({ user }) {
    const navigate = useNavigate()
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)
    // const { state: usersState, dispatch: usersDispatch } = useContext(UsersContext)

    return (
        <div className="col-md-4">
            <div className="user-card">
                <h4 className="nickname">{user.nickname}</h4>
                <p>{user.id}</p>
            </div>
        </div>
    )

    // const createGame = () => {
    //     fetch(apiUrl('/games/create'), {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': authState.token,
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(response => {
    //         if (response.ok) {
    //             return response.json()
    //         } else {
    //             throw response
    //         }
    //     }).then(data => {

    //     })
    // }
}

export default UserCard