let body = {
    "sognekode":"",
    "smitteTryk":"",
    "nedluk":""
}
let putRequest2 = {
    method: "PUT",
    body: body,
    headers: {
        "content-type": "application/json"
    }
}

async function createSogn(){
    let sognnavn = document.getElementById("sogn-name").value;
    let kommunekode = document.getElementById("sogn-kommune-kode").value;
    body.sognekode = document.getElementById("sognkode").value;
    body.smitteTryk = document.getElementById("song-smittetryk").value;
    body.nedluk = document.getElementById("sogn-nedluk").value;
    if(sognnavn!==null && sognnavn!=="" && kommunekode!==null && kommunekode!=="" && body.sognekode!==null && body.sognekode!==""){
      await fetchPostSogn(sognnavn,kommunekode);

    }else{
        alert("No bueno");
    }

}

async function fetchPostSogn(sognnavn,kommunekode){
    putRequest2.body = JSON.stringify(body);
    await fetch("/update/"+kommunekode+"/"+sognnavn,putRequest2)
        .then(response => checkResponse(response))
        .catch((error) => console.log(error))

}

function checkResponse(response){
    if(response.ok){
        alert("Sognet blev oprettet!");
        location.reload();
    }else{
        alert("Noget gik galt, tjek felterne igen og vær sikker på at kommunerne er blevet fetched!");
    }
}