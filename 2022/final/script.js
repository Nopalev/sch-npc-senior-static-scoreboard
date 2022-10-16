async function TableLoader(){
    const response = await fetch("/2022/final/final-senior.json");
    const scoreboardData = await response.json();
    const tbody = document.createElement("tbody");
    const institution = [   "UI",
                            "UI",
                            "Binus",
                            "Binus",
                            "Binus",
                            "Binus",
                            "UI",
                            "ITB",
                            "ITB",
                            "ITB",
                            "Binus",
                            "ITB",
                            "Binus",
                            "Binus",
                            "Gunadarma",
                            "ITS",
                            "ITDel",
                            "UPI",
                            "ITDel",
                            "UISI"];
    let counter = 0;

    scoreboardData.data.scoreboard.content.entries.forEach(element => {
        const contestantRow = document.createElement("tr");
        contestantRow.setAttribute("style", "height: 5rem");

        const contestantRank = document.createElement("td");
        contestantRank.appendChild(document.createTextNode(element.rank));
        contestantRow.appendChild(contestantRank);

        const contestantTeam = document.createElement("td");
        contestantTeam.classList.add("tooltip");
        contestantTeam.setAttribute("style", "width: 400px");
        const layout = document.createElement("div");
        layout.classList.add("layout");
        const institutionImage = document.createElement("img");
        institutionImage.classList.add("institute-logo");
        
        const innerLayout = document.createElement("div");
        const teamName = document.createElement("p");
        teamName.setAttribute("style", "margin: auto auto auto 10px");
        const teamNameBold = document.createElement("b");
        teamNameBold.appendChild(document.createTextNode(element.contestantUsername));
        teamName.appendChild(teamNameBold);
        innerLayout.appendChild(teamName);

        const institutionName = document.createElement("p");
        institutionName.setAttribute("style", "margin: auto auto auto 10px; font-size: 0.8em; color: rgba(255, 255, 255, 0.75);");
        
        if(institution[counter] === "Binus"){
            institutionImage.setAttribute("src", "/2022/images/affiliations/UniversitasBinaNusantara.png");
            institutionName.appendChild(document.createTextNode(" Universitas Bina Nusantara "));
        }
        else if(institution[counter] === "UI"){
            institutionImage.setAttribute("src", "/2022/images/affiliations/UniversitasIndonesia.png");
            institutionName.appendChild(document.createTextNode(" Universitas Indonesia "));
        }
        else if(institution[counter] === "ITB"){
            institutionImage.setAttribute("src", "/2022/images/affiliations/InstitutTeknologiBandung.png");
            institutionName.appendChild(document.createTextNode(" Institut Teknologi Bandung "));
        }
        else if(institution[counter] === "ITS"){
            institutionImage.setAttribute("src", "/2022/images/affiliations/InstitutTeknologiSepuluhNopember.png");
            institutionName.appendChild(document.createTextNode(" Institut Teknologi Sepuluh Nopember "));
        }
        else if(institution[counter] === "Gunadarma"){
            institutionImage.setAttribute("src", "/2022/images/affiliations/UniversitasGunadarma.png");
            institutionName.appendChild(document.createTextNode(" Universitas Gunadarma "));
        }
        else if(institution[counter] === "ITDel"){
            institutionImage.setAttribute("src", "/2022/images/affiliations/InstitutTeknologiDel.png");
            institutionName.appendChild(document.createTextNode(" Institut Teknologi Del "));
        }
        else if(institution[counter] === "UPI"){
            institutionImage.setAttribute("src", "/2022/images/affiliations/UniversitasPendidikanIndonesia.png");
            institutionName.appendChild(document.createTextNode(" Universitas Pendidikan Indonesia "));
        }
        else if(institution[counter] === "UISI"){
            institutionImage.setAttribute("src", "/2022/images/affiliations/UniversitasInternasionalSemenIndonesia.png");
            institutionName.appendChild(document.createTextNode(" Universitas Internasional Semen Indonesia "));
        }

        layout.appendChild(institutionImage);
        innerLayout.appendChild(institutionName);
        layout.appendChild(innerLayout);
        contestantTeam.appendChild(layout);
        contestantRow.appendChild(contestantTeam);

        const contestantScore = document.createElement("td");

        if(counter === 0){
            contestantScore.classList.add("verdict-ac-100");
        }
        else if(counter === 1){
            contestantScore.classList.add("verdict-wa-80");
        }
        else if(counter === 2){
            contestantScore.classList.add("verdict-wa-60");
        }
        else if(counter === 3){
            contestantScore.classList.add("verdict-wa-40");
        }
        else if(counter === 4){
            contestantScore.classList.add("verdict-wa-20");
        }
        else{
            contestantScore.classList.add("verdict-neutral");
        }

        const teamScore = document.createElement("p");
        teamScore.setAttribute("style", "text-align: center; margin: auto; font-size: x-large;");
        teamScore.appendChild(document.createTextNode(element.totalAccepted));

        const teamPenalty = document.createElement("p");
        teamPenalty.setAttribute("style", "text-align: center; margin: auto; font-size: x-small;");
        teamPenalty.appendChild(document.createTextNode(element.totalPenalties));

        contestantScore.appendChild(teamScore);
        contestantScore.appendChild(document.createElement("br"));
        contestantScore.appendChild(teamPenalty);
        contestantRow.appendChild(contestantScore);

        for(let i=0; i<10; i++){
            const contestantVerdict = document.createElement("td");

            const attempt = document.createElement("p");
            attempt.setAttribute("align", "center");
            attempt.setAttribute("style", "margin: auto; font-size: larger");

            const penalty = document.createElement("p");
            penalty.setAttribute("style", "text-align: center; margin: auto; font-size: x-small;");

            if(element.attemptsList[i] !== 0 && element.penaltyList[i] !== 0){
                contestantVerdict.classList.add("verdict-ac-100");
                attempt.appendChild(document.createTextNode(element.attemptsList[i]));
                penalty.appendChild(document.createTextNode(element.penaltyList[i]));
            }
            else if(element.attemptsList[i] !== 0 && element.penaltyList[i] === 0){
                contestantVerdict.classList.add("verdict-wa-0");
                attempt.appendChild(document.createTextNode(element.attemptsList[i]));
                penalty.appendChild(document.createTextNode("-"));
            }
            else{
                contestantVerdict.classList.add("verdict-neutral");
                attempt.appendChild(document.createTextNode("-"));
                penalty.appendChild(document.createTextNode("-"));
            }
            contestantVerdict.appendChild(attempt);
            contestantVerdict.appendChild(document.createElement("br"));
            contestantVerdict.appendChild(penalty);

            contestantRow.appendChild(contestantVerdict);
        }

        tbody.appendChild(contestantRow);
        counter++;
    });

    document.getElementById("table").appendChild(tbody);
}

function Init(){
    TableLoader();
}