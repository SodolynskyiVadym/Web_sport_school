import axios from "axios";

const mainURL = "http://localhost:8000"

export async function requestGroupsGet(url){
    return await axios.get(mainURL + "/groups" + url).then(res => res.data);
}

export async function requestUsersGet(url){
    return await axios.get(mainURL + "/users" + url).then(res => res.data);
}

export async function requestReviewsGet(url){
    return await axios.get(mainURL + "/reviews" + url).then(res => res.data);
}

export async function requestSchedulesGet(url){
    return await axios.get(mainURL + "/groups/schedules" + url).then(res => res.data);
}

export async function getUserByToken(token) {
    return await axios.get(mainURL + `/users/getRoleUser/${token}`).then(res => res.data);
}
