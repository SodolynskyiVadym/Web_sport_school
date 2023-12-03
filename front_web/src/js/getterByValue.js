import axios from "axios";

export async function getUserByToken(token) {
    return await axios.post("http://localhost:8000/users/getRoleUser", { token: token });
}

