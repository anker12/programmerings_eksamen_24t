let body = {
    "sognekode":"",
    "smitteTryk":""
}
let postRequest2 = {
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
    if(sognnavn!==null && sognnavn!==""){
      await fetchPostSogn(sognnavn,kommunekode);

    }else{
        alert("No bueno");
    }

}

async function fetchPostSogn(sognnavn,kommunekode){
    postRequest2.body = JSON.stringify(body);
    await fetch("/update/"+kommunekode+"/"+sognnavn,postRequest2)
        .then(response => console.log(response.json()))
        .catch((error) => console.log(error))
    alert(sognnavn+" er blevet oprettet!");
    location.reload();
}
