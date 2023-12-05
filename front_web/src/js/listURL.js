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

export async function requestDeleteReview(userID, coachID){
    return await axios.delete(mainURL + `/reviews/deleteReview/${userID}/${coachID}`)
}

export async function requestDeleteUser(userID){
    return await axios.delete(mainURL + `/users/deleteUser/${userID}`)
}

export async function requestDeleteGroup(groupID){
    return await axios.delete(mainURL + `/groups/deleteGroup/${groupID}`)
}

export async function requestDeleteSchedule(scheduleID){
    return await axios.delete(mainURL + `/groups/schedules/deleteSchedule/${scheduleID}`)
}

export async function getUserByToken(token) {
    return await axios.get(mainURL + `/users/getRoleUser/${token}`).then(res => res.data);
}
