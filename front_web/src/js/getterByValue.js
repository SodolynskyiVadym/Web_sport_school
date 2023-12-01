import axios from "axios";

export async function getUserByToken(token) {
    return await axios.post("http://localhost:8000/users/getRoleUser", { token: token });
}

export async function getGroupIDByName(name) {
    await axios.post("http://localhost:8000/groups/getGroupByName", { name: name }).then(res => {
        console.log(res.data.id)
        return res.data.id
    })
}

