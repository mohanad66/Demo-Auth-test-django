import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useState } from "react";
import "../styles/Form.css"
import LoadingIndicator from "./loadingIndicator";

export default function Form({ route, method }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const named = method === "login" ? "Login" : "Register"
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate("/")

            }
            else{
                navigate("/login")
            }
        }
        catch (err) {
            alert(err)
        }
        finally {
            setLoading(false)
        }
    }
    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{named}</h1>
        <input type="text" className="form-input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        {loading && <LoadingIndicator /> }
        <button type="submit" className="form-button" > {named}</button>
    </form>
}
