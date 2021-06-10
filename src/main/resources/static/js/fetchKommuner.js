let body ={
    "name":"",
    "kommuneKode":""
}
let getRequest = {
    method: "GET",
    headers: {
        "content-type": "application/json"
    }
}
let postRequest = {
    method: "POST",
    body: body,
    headers: {
        "content-type": "application/json"
    }
}


async function fetchKommunerFromDataforsyningen(){
    await fetch("https://api.dataforsyningen.dk/kommuner",getRequest)
        .then(response => response.json())
        .then(data => kommuneListHandler(data))
        .catch((error) => console.log(error))

}

async function kommuneListHandler(data){
    data.forEach(kommune => postKommune(kommune));
}
async function postKommune(kommune){
    console.log(kommune);
    body.name = kommune.navn;
    body.kommuneKode = kommune.kode;
    postRequest.body = JSON.stringify(body);
    fetch("/postKommune",postRequest)
        .catch((error) => console.log(error));


    let progress = document.getElementById("progess");
    progress.innerText="Kommunerne er blevet hentet!";
}

fetchKommunerFromDataforsyningen();