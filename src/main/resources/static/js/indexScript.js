
let getRequest = {
    method: "GET",
    headers: {
        "content-type": "application/json"
    }
}

async function fetchSmitteTryk(kommuneid){
    let url = "/getSmitteTryk/"+kommuneid;
    await fetch(url,getRequest)
        .then(response => response.text())
        .then(data => changeSmitteTryk(kommuneid,data))
}

function fetchKommuner(){
    fetch("/getAllKommuner",getRequest)
        .then(response => response.json())
        .then(data => listKommunerHandler(data))

}

async function listKommunerHandler(data){
    await data.forEach(kommune => listKommuner(kommune));
    await data.forEach(kommune => fetchSmitteTryk(kommune.id))
    sortKommuner(divs);

}


let divs =[];
function listKommuner(kommune){
    console.log(kommune.name);
    let singleKommune = document.createElement("div");
    singleKommune.id = kommune.kommuneKode;
    singleKommune.className = "kommune-div";
    let name = document.createElement("span");
    name.innerText = kommune.name;
    name.className = "kommune-navn";
    let br = document.createElement("br");
    let br2 = document.createElement("br");

    let kommuneKode = document.createElement("span");
    kommuneKode.innerText = "Kommune kode: "+kommune.kommuneKode;
    let smitteTryk = document.createElement("span");
    smitteTryk.id="smitte"+kommune.id;
    smitteTryk.innerText = "Smittetryk: ";


    singleKommune.appendChild(name);
    singleKommune.appendChild(br);
    singleKommune.appendChild(kommuneKode);
    singleKommune.appendChild(br2);
    singleKommune.appendChild(smitteTryk);


    divs.push(singleKommune);

}

function sortKommuner(divs){
    let kommuneListDiv = document.getElementById("kommune-list");
    divs.sort(function (a, b){
        let idA = a.getAttribute("id");
        let idB = b.getAttribute("id");
        return (idA < idB) ? -1 : (idA > idB) ? 1 : 0;
    });
    divs.forEach(div => kommuneListDiv.appendChild(div));

}

function changeSmitteTryk(kommuneid,data){
    let smittetryk = document.getElementById("smitte"+kommuneid);
    smittetryk.innerText = "Smittetryk: "+data;
}

async function searchByKommunekode(){
    let kommunekode = document.getElementById("sorter").value;
    let allKommuner = document.getElementById("kommune-list");
    if(kommunekode===""){
        location.reload();
    } else{
        let searchedDiv = document.getElementById(""+kommunekode);
        allKommuner.innerHTML="";
        allKommuner.appendChild(searchedDiv);
    }

}




fetchKommuner();

