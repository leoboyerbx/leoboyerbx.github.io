let addCSS = function(styleLink) {
    let link = document.createElement("link")
  
    link.type = "text/css"
    link.rel = "stylesheet"
    link.href = styleLink

    document.head.appendChild(link)
}


window.onload = function () {

    addCSS("https://www.leoboyer.fr/css/backhome.css")
    addCSS("https://fonts.googleapis.com/css?family=Raleway|Source+Sans+Pro")

    let backButton = document.createElement('a')
    let linkTarget = document.querySelector('#lblink')
    let link
    if(linkTarget) {
        link = "#" + linkTarget.getAttribute('href')
    }
    else {
        link = ""
    }

    backButton.href = "https://www.leoboyer.fr/" + link
    backButton.innerHTML = '<div class="back-button">← Retour sur <span>leoboyer.fr</span></div>'

    document.body.appendChild(backButton)
}

