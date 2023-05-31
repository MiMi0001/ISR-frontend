import jwtDecode from "jwt-decode";
import dayjs from "dayjs";


let baseURL = "https://isr-backend.herokuapp.com"
let refreshURL = baseURL + "/token/refresh/";

async function refreshAccessToken() {
    let refreshToken = localStorage.getItem("refreshToken");
    let payload = {"refresh": refreshToken};

    let response = await fetch(refreshURL, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    let tokens = await response.json();

    localStorage.setItem("accessToken", tokens.access);
    console.log("Access token has been refreshed.");

    return tokens.access;
}

export async function loginToBackend(user) {
    let url = baseURL + "/token/";

    let response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    return response.json();
}

export async function fetchISR(relativeURL, httpMethodString, payloadObject={}) {
    let url = baseURL + relativeURL;

    let accessToken = localStorage.getItem("accessToken");

    let response = null;
    if (accessToken) {
        console.log("Fetching backend on "+relativeURL);
        let tokenExpiry = jwtDecode(accessToken).exp;
        let isTokenExpired = dayjs.unix(tokenExpiry).diff(dayjs()) < 1;

        // If the access token has been  expired, we have to refresh it.
        if (isTokenExpired) {
            accessToken = await refreshAccessToken();
        }

        if (httpMethodString.toUpperCase() === "GET") { // GET request cannot have a body.
            console.log("Sending GET request...");
            response = await fetch(url, {
                method: httpMethodString,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            })

        } else if (httpMethodString.toUpperCase() === "POST") {
            console.log("Sending POST request with payload:")
            console.log(payloadObject);
            response = await fetch(url, {
                method: httpMethodString,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify(payloadObject)
            })
        }
    }
    // If we don't have the access token(the user hadn't login yet), return null.
    else {
        return null;
    }

    return response;
}
