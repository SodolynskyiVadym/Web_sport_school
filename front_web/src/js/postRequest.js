import axios from "axios";

// const mainURL = "http://localhost:8000"
const mainURL = process.env.VUE_APP_API_URL

export async function requestGroup(url, data){
    console.log(mainURL + url)
    return await axios.post(mainURL + "/groups" + url, data).then(res => res.data);
}

export async function requestUser(url, data){
        console.log(mainURL + url)
    return await axios.post(mainURL + "/users" + url, data).then(res => res.data);
}

export async function requestSchedule(url, data){
        console.log(mainURL + url)
    return await axios.post(mainURL + "/groups/schedules" + url, data).then(res => res.data);
}

export async function requestReview(url, data){
        console.log(mainURL + url)
    return await axios.post(mainURL + "/reviews" + url, data).then(res => res.data);
}
