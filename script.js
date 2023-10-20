(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let paevaaeg = "AM";

            if (h >= 12) {
                paevaaeg = "PM";
            }
            if (h > 12) {
                h = h - 12;
            }
            if (h == 0) {
                h = 12;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " + paevaaeg;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);

    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";

    function estimateDelivery(event) {
        event.preventDefault();

        let linn = document.getElementById("linn");
        let kingitus = document.getElementById("v1");
        let kontaktivaba = document.getElementById("v2");
        let smartpost = document.getElementById("v3").checked;
        let dhl = document.getElementById("v4").checked;
        let ups = document.getElementById("v5").checked;
        let post = document.getElementById("v6").checked;
        let eesnimi = document.getElementById("fname").value;
        let perekonnanimi = document.getElementById("lname").value;
        let hind = 0;


        if (linn.value == "tln") {
            hind = 0;
        }
        if (linn.value == "trt") {
            hind = 2.50;
        }
        if (linn.value == "nrv") {
            hind = 2.50;
        }
        if (linn.value == "prn") {
            hind = 3.00;
        }

        if (linn.value === "") {

            alert("Palun valige linn nimekirjast");
            linn.focus();
            return;

        } else {

            if (kingitus.checked) {
                hind = hind + 5.00;
            }
            if (kontaktivaba.checked) {
                hind = hind + 1.00;
            }
            if (eesnimi == "") {
                alert("Palun sisestage nimi");
                linn.focus();
                return;
            }
            if (perekonnanimi == "") {
                alert("Palun sisestage perekonnanimi");
                linn.focus();
                return;
            }
            if (!isNaN(eesnimi)) {
                alert("Nimi ei tohi sisaldada numbreid");
                linn.focus();
                return;
            }
            if (!isNaN(perekonnanimi)) {
                alert("Perenimi ei tohi sisaldada numbreid");
                linn.focus();
                return;
            }


            console.log(smartpost);
            if ((smartpost || dhl || ups || post) == false) {
                alert("Palun valige tarneviis");
                linn.focus();
                return;

            } else {


                //e.innerHTML = "x,xx &euro;";
                e.innerHTML = hind + " &euro;";
            }
        }


        console.log("Tarne hind on arvutatud");
    }


})();

// map

//let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";
// Tegin endale konto ja sain oma API võtme
let mapAPIKey = "AggFoSRoUGUYRPC79y6YYlfHbkl5CMkKnQB5KejIeBQqSmioIDSkgEgpcjADrHN6";

let map;

function GetMap() {
    
    "use strict";

    // let centerPoint = new Microsoft.Maps.Location(
    //         58.38104, 
    //         26.71992
    //     );

    let taru_ulikool = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
    let tehvandi = new Microsoft.Maps.Location(
            58.054449, 
            26.499808
        );

    // https://learn.microsoft.com/en-us/bingmaps/v8-web-control/map-control-api/locationrect-class
    let centerPoint = Microsoft.Maps.LocationRect.fromLocations(taru_ulikool, tehvandi).center;

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 9,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    // let pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
    //         title: 'Tartu Ülikool',
    //         //subTitle: 'Hea koht',
    //         //text: 'UT'
    //     });

    let pushpin_1 = new Microsoft.Maps.Pushpin(taru_ulikool, {
        title: "Tartu Ülikool"
    });
    let pushpin_1_info = new Microsoft.Maps.Infobox(taru_ulikool, {
        title: "Tartu Ülikool",
        description: "Ülikool aastast 1632"
    });
    // https://learn.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/map/map-events
    Microsoft.Maps.Events.addHandler(pushpin_1, "click", function() {
        map.entities.push(pushpin_1_info);
    });


    let pushpin_2 = new Microsoft.Maps.Pushpin(tehvandi, {
        title: "Tehvandi"
    });
    let pushpin_2_info = new Microsoft.Maps.Infobox(tehvandi, {
        title: "Tehvandi",
        description: "Tuntud, kui talvine spordikeskus"
    });
    // https://learn.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/map/map-events
    Microsoft.Maps.Events.addHandler(pushpin_2, "click", function() {
        map.entities.push(pushpin_2_info);
    });

    map.entities.push(pushpin_1);
    map.entities.push(pushpin_2);

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

