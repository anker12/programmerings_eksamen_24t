
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


    sognDiv.appendChild(name);
    sognDiv.appendChild(br);
    sognDiv.appendChild(sognekode);
    sognDiv.appendChild(br2);
    sognDiv.appendChild(smitteTryk);
    sognDiv.appendChild(br3);
    sognDiv.appendChild(sognKommune);

    sogneList.appendChild(sognDiv);

}

fetchSogne();