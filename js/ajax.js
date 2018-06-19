
let loading = function (action) {
    if (action == "start") {
        loader.classList.add('open')

    } else {
        loader.classList.remove('open')
    }
}
let openPage = function (page) {
    let xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let content
                let indexDataStart = xhr.responseText.indexOf('<!--DataStart-->')
                let indexDataEnd = xhr.responseText.indexOf('<!--DataEnd-->')
                if (indexDataStart != -1 && indexDataEnd != -1) {
                    let lenghtToGet = indexDataEnd - indexDataStart - 16
                    content = xhr.responseText.substr(indexDataStart + 16, lenghtToGet)
                    document.location.hash = page
                } else {
                    content = "Erreur de connexion. Le document demandé est mal formaté."
                }
                externalPage.innerHTML = content
                if (xhr.status === 200) {
                    let title = document.querySelector('#titrepage').innerHTML
                    if (title) {
                        document.title = 'Léo Boyer - ' + title
                    } else {
                        document.title = 'Léo Boyer'
                    }
                }
                openExternalPage()

            } else {
                alert('Erreur 404: document non trouvé.')
            }
            loading('stop')
        }
    }

    xhr.open('GET', page, true)
    xhr.send()
    loading('start')
}

let autoPage = function () {
    let hash = document.location.hash
    if (!hash) {
        closeExternalPage()
    } else {
        path = hash.substring(1)
        openPage(path)
    }
}

window.onpopstate = autoPage

//   Executer au chargement de la page
window.onload = function () {
    pages.forEach(function (value) {
        pagesScroll.push(getDistanceFromTop(document.querySelector('#' + value)) - (window.innerHeight * 0.3))
    })


    souligne.style.width = allMenu[0].offsetWidth + "px"
    souligne.style.left = allMenu[0].offsetLeft + "px"

    allMenu.forEach(function (element) {
        element.addEventListener("mouseover", function () {
            souligne.style.width = this.offsetWidth + "px"
            souligne.style.left = this.offsetLeft + "px"
        })
        element.addEventListener("mouseout", function () {
            souligne.style.width = allMenu[currentPage].offsetWidth + "px"
            souligne.style.left = allMenu[currentPage].offsetLeft + "px"
        })
    })

    initialtop = page.offsetTop
    initialheight = home.clientHeight
    
    
    
    let links = document.querySelectorAll('.pagelink')
    links.forEach(function (link) {
        link.addEventListener("click", function(ev) {
            ev.preventDefault()
            openPage(this.getAttribute('href'))
        })
    })
}


