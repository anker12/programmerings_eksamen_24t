let body = {
    "id":"",
    "navn":"",
    "sognekode":"",
    "smitteTryk":""
}
let postRequest3 = {
    method: "PUT",
    body: body,
    headers: {
        "content-type": "application/json"
    }
}
let getRequest = {
    method: "GET",
    headers: {
        "content-type": "application/json"
    }
}

function fetchSogne(){
    fetch("/getallsogn",getRequest)
        .then(response => response.json())
        .then(data => listSogneHandler(data))
}

function listSogneHandler(data){
    data.forEach(sogn => listSogne(sogn));
}

function listSogne(sogn){
    let sogneList = document.getElementById("sogne-list");
    let sognDiv = document.createElement("div");
    sognDiv.id=""+sogn.id;
    sognDiv.className="sogne-div";
    let name = document.createElement("span");
    name.innerText=sogn.navn;
    name.className="sogne-navn";
    let br = document.createElement("br");
    let sognekode = document.createElement("span");
    sognekode.innerText="Sognekode: "+sogn.sognekode;
    let br2 = document.createElement("br");
    let smitteTryk = document.createElement("span");
    smitteTryk.innerText = "Smittetryk: "+sogn.smitteTryk;
    let br3 = document.createElement("br");
    let sognKommune = document.createElement("span");
    sognKommune.innerText = "Tilhører: "+sogn.kommune.name;
    let br4 = document.createElement("br");
    let sognEditBtn = document.createElement("button");
    sognEditBtn.innerText="Rediger";
    sognEditBtn.id="sogn-edit-btn";
    sognEditBtn.className="btn";

    //rediger knap
    sognEditBtn.addEventListener("click",function(){
        sognDiv.innerHTML="";

        let br5 = document.createElement("br");
        let br6 = document.createElement("br");
        let br7 = document.createElement("br");

        let nameEdit = document.createElement("span");
        nameEdit.innerText = sogn.navn;
        nameEdit.className="sogne-navn";
        nameEdit.id="sogn-name";

        let sognekodeEdit = document.createElement("input");
        sognekodeEdit.value=sogn.sognekode;
        sognekodeEdit.placeholder="sognets kode";
        sognekodeEdit.id="sognkode";
        let sognekodeEditLabel = document.createElement("label");
        sognekodeEditLabel.for="sognekode";
        sognekodeEditLabel.innerText="Sognets kode: ";

        let smitteTrykEdit = document.createElement("input");
        smitteTrykEdit.value = sogn.smitteTryk;
        smitteTrykEdit.placeholder="sognets smittetryk";
        smitteTrykEdit.id="song-smittetryk";
        let smitteTrykEditLabel = document.createElement("label");
        smitteTrykEditLabel.for="song-smittetryk";
        smitteTrykEditLabel.innerText="Sognets smittetryk: ";

        let sognKommuneEdit = document.createElement("input");
        sognKommuneEdit.value = sogn.kommune.kommuneKode;
        sognKommuneEdit.placeholder="associeret kommunekode";
        sognKommuneEdit.id="sogn-kommune-kode";
        let sognKommuneEditLabel = document.createElement("label");
        sognKommuneEditLabel.for="sogn-kommune-kode";
        sognKommuneEditLabel.innerText= "Associeret kommunekode: ";

        let saveBtn = document.createElement("button");
        saveBtn.innerText="Gem";
        saveBtn.className="btn";
        saveBtn.id="sogn-save-btn";
        //gem knap
        saveBtn.addEventListener("click",async function (){
            await createSogn();
            location.reload();
        })



        sognDiv.appendChild(nameEdit);
        sognDiv.appendChild(br);
        sognDiv.appendChild(sognekodeEditLabel);
        sognDiv.appendChild(br5);
        sognDiv.appendChild(sognekodeEdit);
        sognDiv.appendChild(br2);
        sognDiv.appendChild(smitteTrykEditLabel);
        sognDiv.appendChild(br6);
        sognDiv.appendChild(smitteTrykEdit);
        sognDiv.appendChild(br3);
        sognDiv.appendChild(sognKommuneEditLabel);
        sognDiv.appendChild(br7);
        sognDiv.appendChild(sognKommuneEdit);
        sognDiv.appendChild(br4);
        sognDiv.appendChild(saveBtn);


    });



    sognDiv.appendChild(name);
    sognDiv.appendChild(br);
    sognDiv.appendChild(sognekode);
    sognDiv.appendChild(br2);
    sognDiv.appendChild(smitteTryk);
    sognDiv.appendChild(br3);
    sognDiv.appendChild(sognKommune);
    sognDiv.appendChild(br4);
    sognDiv.appendChild(sognEditBtn);


    sogneList.appendChild(sognDiv);

}


async function createSogn(){

    let sognnavn = document.getElementById("sogn-name").innerText;
    let kommunekode = document.getElementById("sogn-kommune-kode").value;
    body.sognekode = document.getElementById("sognkode").value;
    body.smitteTryk = document.getElementById("song-smittetryk").value;
    body.navn = sognnavn;

    if(sognnavn!==null && sognnavn!==""){
        await fetchPostSogn(sognnavn,kommunekode);
    }else{
        alert("No bueno");
    }

}

async function fetchPostSogn(sognnavn,kommunekode){
    console.log(sognnavn + kommunekode);
    postRequest3.body = JSON.stringify(body);
    await fetch("/update/"+kommunekode+"/"+sognnavn,postRequest3)
        .then(response => console.log(response.json()))
        .catch((error) => console.log(error))
}


fetchSogne();