let body = {
    "id":"",
    "navn":"",
    "sognekode":"",
    "smitteTryk":"",
    "nedluk":""
}
let putRequest3 = {
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
let delRequest = {
    method: "DELETE",
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
    let br = document.createElement("br");
    let br2 = document.createElement("br");
    let br3 = document.createElement("br");
    let br4 = document.createElement("br");
    let br5 = document.createElement("br");
    let br6 = document.createElement("br");
    let br7 = document.createElement("br");
    let br8 = document.createElement("br");
    let br9 = document.createElement("br");

    let sogneList = document.getElementById("sogne-list");
    let sognDiv = document.createElement("div");
    sognDiv.id=""+sogn.id;
    sognDiv.className="sogne-div";
    let name = document.createElement("span");
    name.innerText=sogn.navn;
    name.className="sogne-navn";
    let sognekode = document.createElement("span");
    sognekode.innerText="Sognekode: "+sogn.sognekode;
    let smitteTryk = document.createElement("span");
    smitteTryk.innerText = "Smittetryk: "+sogn.smitteTryk;
    let sognKommune = document.createElement("span");
    sognKommune.innerText = "Tilhører: "+sogn.kommune.name;
    let sognNedluk = document.createElement("span");
    if(sogn.nedluk!==null){
        sognNedluk.innerText = "Nedlukning: "+sogn.nedluk.split("T")[0];
    } else{
        sognNedluk.innerText = "Nedlukning: Ingen dato sat";
    }
    let nedlukket = document.createElement("input");
    nedlukket.type="checkbox";
    nedlukket.checked=checkIfNedluking(sogn.nedluk);
    //nedlukket.disabled=true;
    nedlukket.addEventListener("click",function (){
        nedlukket.checked=checkIfNedluking(sogn.nedluk);
    })
    nedlukket.style.width="10px";
    nedlukket.style.margin="auto 0 auto 5px";
    nedlukket.style.top="2px";
    nedlukket.style.position="relative";
    let nedlukketLabel = document.createElement("label");
    nedlukketLabel.innerText="Under nedlukning: ";

    let sognEditBtn = document.createElement("button");
    sognEditBtn.innerText="Rediger";
    sognEditBtn.id="sogn-edit-btn";
    sognEditBtn.className="btn";

    //rediger knap
    sognEditBtn.addEventListener("click",function(){
        sognDiv.innerHTML="";

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

        let sognNedlukEdit = document.createElement("input");
        sognNedlukEdit.type="date";
        if(sogn.nedluk!==null){
            sognNedlukEdit.value = sogn.nedluk.split("T")[0];
        } else{
            sognNedlukEdit.value = null;
        }


        sognNedlukEdit.id="sogn-nedluk";
        let sognNedlukEditLabel = document.createElement("label");
        sognNedlukEditLabel.for="sogn-nedluk";
        sognNedlukEditLabel.innerText="Sognets nedlukningsdato: ";

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
        sognDiv.appendChild(br8);
        sognDiv.appendChild(sognNedlukEditLabel);
        sognDiv.appendChild(br4);
        sognDiv.appendChild(sognNedlukEdit);
        sognDiv.appendChild(br9);
        sognDiv.appendChild(saveBtn);


    });
    let deleteBtn = document.createElement("button");
    deleteBtn.className="btn";
    deleteBtn.id="sogn-delete-btn";
    deleteBtn.innerText="Slet";
    deleteBtn.addEventListener("click",async function (){
        await deleteSogn(sogn.id,sogn.navn);
    })



    sognDiv.appendChild(name);
    sognDiv.appendChild(br);
    sognDiv.appendChild(sognekode);
    sognDiv.appendChild(br2);
    sognDiv.appendChild(smitteTryk);
    sognDiv.appendChild(br3);
    sognDiv.appendChild(sognKommune);
    sognDiv.appendChild(br4);
    sognDiv.appendChild(sognNedluk);
    sognDiv.appendChild(br8);
    sognDiv.appendChild(nedlukketLabel);
    sognDiv.appendChild(nedlukket);
    sognDiv.appendChild(br7);
    sognDiv.appendChild(sognEditBtn);
    sognDiv.appendChild(deleteBtn);


    sogneList.appendChild(sognDiv);

}


async function createSogn(){

    let sognnavn = document.getElementById("sogn-name").innerText;
    let kommunekode = document.getElementById("sogn-kommune-kode").value;
    body.sognekode = document.getElementById("sognkode").value;
    body.smitteTryk = document.getElementById("song-smittetryk").value;
    body.navn = sognnavn;
    body.nedluk = document.getElementById("sogn-nedluk").value;

    if(sognnavn!==null && sognnavn!==""){
        await fetchPostSogn(sognnavn,kommunekode);
    }else{
        alert("No bueno");
    }

}

async function fetchPostSogn(sognnavn,kommunekode){
    console.log(sognnavn + kommunekode);
    putRequest3.body = JSON.stringify(body);
    await fetch("/update/"+kommunekode+"/"+sognnavn,putRequest3)
        .then(response => console.log(response.json()))
        .catch((error) => console.log(error))
}

async function deleteSogn(sognId,sognNavn){
    if(confirm("Vil du slette "+sognNavn + "?")){
        await fetchDeleteSogn(sognId);
    }

}

async function fetchDeleteSogn(sognId){
    await fetch("delete/"+sognId,delRequest)
        .then(response => console.log(response))
        .catch((error) => console.log(error))
    location.reload();
}

function checkIfNedluking(nedluk){
    if(nedluk!==null){
        let isClosed;
        let currentDate = new Date();
        let nedlukdate = new Date(nedluk.split("T")[0]);
        isClosed = nedlukdate < currentDate;
        return isClosed;
    }else{
        return false;
    }
}


fetchSogne();