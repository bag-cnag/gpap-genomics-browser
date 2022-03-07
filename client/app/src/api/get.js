



export function getVisibility(url_prefix, token, queryString){
    return fetch(url_prefix + "/samplevisibility/?format=json&group=" + queryString.groups + "&user=" + queryString.username + "&sample=",
        {
            method: "GET",
            headers:{
                'Accept': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Content-Type': "application/json; charset=utf8",
                'Authorization': token
            }
        })


}



