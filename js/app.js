let currentPage = 0
let souligne = document.querySelector('#souligne')
let allMenu = document.querySelectorAll('#main-nav ul li')
let pages = ["home", "web", "audiovisuel", "graphisme", "contact"]
let pagesScroll = []
let page = document.querySelector('#page')
let mainNav = document.querySelector('#main-nav')
let mainNavUl = document.querySelector('#main-nav ul')
let mainNavElementsWidth = mainNavUl.querySelector('li:first-child').offsetLeft + 50


allMenu.forEach(function (el) {
    mainNavElementsWidth += el.offsetWidth

})

let home = document.querySelector('#home')
let externalPage = document.querySelector('#external-page')
let externalContent = document.querySelector('#external-content')
let responsiveState = 0
let respMenuOpen = 0


let updateNav1 = function (upSouligne) {
    if (upSouligne) {
        if (!responsiveState) {
            souligne.style.width = allMenu[currentPage].offsetWidth + "px"
            souligne.style.left = allMenu[currentPage].offsetLeft + "px"
        }
        else if (!respMenuOpen) {
            mainNavUl.style.transform = "translateY(" + -60*currentPage + "px)"
        }
    }
    else {
        if (window.scrollY) {
            mainNav.classList.add('scrolled')
            document.querySelector('.st0').classList.add('hidden')
            page.style.top = "70%";
            home.style.height = "70%";
        } else {
            mainNav.classList.remove('scrolled')
            document.querySelector('.st0').classList.remove('hidden')
            page.style.top = "100%";
            home.style.height = "100%";
        }
    }
}
let responsive = function () {
    let pageWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (pageWidth <= mainNavElementsWidth) {
        mainNav.classList.add('responsive')
        responsiveState = 1
    }
    else {
        mainNav.classList.remove('responsive')
        responsiveState = 0
        updateNav1(1)
    }
}


//Gestion menu
let setUpNav1 = function () {

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
}

let setUpNav2 = function () {
    //Second menu
    let extSouligne = document.querySelector('#external-nav .souligne')
    let allElements = document.querySelectorAll('#external-nav ul li')
    let ref = document.querySelector('#external-nav #ext-title')
    allElements.forEach(function (element) {
        element.addEventListener("mouseover", function () {
            extSouligne.style.width = this.offsetWidth + "px"
            extSouligne.style.left = this.offsetLeft + "px"
        })
        element.addEventListener("mouseout", function () {
            extSouligne.style.width = ref.offsetWidth + "px"
            extSouligne.style.left = ref.offsetLeft + "px"
        })
    })
    extSouligne.style.width = ref.offsetWidth + "px"
    extSouligne.style.left = ref.offsetLeft + "px"
}

let setUpLinks = function (parent) {
    let links = parent.querySelectorAll('.pagelink')
    links.forEach(function (link) {
        link.addEventListener("click", function (ev) {
            ev.preventDefault()
            let val = this.getAttribute('href')
            let image = this.querySelector('.creationimage')
            openPage(val, image)
        })
    })
}





let openRespMenu = function() {
    document.querySelector("#menubutton").classList.add('open')
    mainNav.classList.add('scrolled')
    mainNavUl.style.transform = "translateY(0px)"
    let ulHeight = mainNavUl.clientHeight
    mainNav.style.height = ulHeight+"px"
    respMenuOpen = 1
}

let closeRespMenu = function() {
    document.querySelector("#menubutton").classList.remove('open')
    mainNavUl.style.transform = "translateY(" + -60*currentPage + "px)"
    mainNav.style.height = "60px"
    respMenuOpen = 0
    if (!window.scrollY) {
        mainNav.classList.remove('scrolled')
    }
}


let toggleExternalPage = function () {
    page.classList.toggle('externalpage-open')
    home.classList.toggle('externalpage-open')
    mainNav.classList.toggle('externalpage-open')
    externalPage.classList.toggle('open')
}
let closeExternalPage = function () {
    page.classList.remove('externalpage-open')
    home.classList.remove('externalpage-open')
    mainNav.classList.remove('externalpage-open')
    externalPage.classList.remove('open')
    externalContent.innerHTML = ""
    document.title = 'Léo Boyer'
    history.pushState(false, false, '#')
}
let openExternalPage = function () {
    page.classList.add('externalpage-open')
    home.classList.add('externalpage-open')
    mainNav.classList.add('externalpage-open')
    externalContent.scrollTop = 0
    externalPage.classList.add('open')
}

function getDistanceFromTop(element) {
    let yPos = 0;

    while (element) {
        yPos += (element.offsetTop);
        element = element.offsetParent;
    }

    return yPos;
}

let changePage = function (page) {
    let numPage = pages.indexOf(page)
    if (numPage == -1) {
        numPage = 0
    }
    section = document.querySelector('#' + page)
    let scrollValue
    if (!window.scrollY) {
        scrollValue = getDistanceFromTop(section) - 50 - (window.innerHeight * 0.3)
    } else {
        scrollValue = getDistanceFromTop(section) - 50
    }
    window.scroll({
        top: scrollValue,
        left: 0,
        behavior: 'smooth'
    });
    if (responsiveState) {
        closeRespMenu()
    }
    currentPage = numPage;
    updateNav1(1)

}



let observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.intersectionRatio > 0.7) {
            entry.target.classList.remove('not-visible')
            observer.unobserve(entry.target)
        }
    })
}, {
        threshold: [0.7]
    })

let items = document.querySelectorAll('.scrollappear')
items.forEach(function (item) {
    item.classList.add('not-visible')
    observer.observe(item)
})



let loading = function (action) {
    let loader = document.querySelector('#loader')
    if (action == "start") {
        loader.classList.add('open')

    } else {
        loader.classList.remove('open')
    }
}
let openPage = function (page, image) {
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
                    history.pushState(false, false, '#' + page.substr(0, page.length - 5))
                } else {
                    content = "Erreur de connexion. Le document demandé est mal formaté."
                }
                externalContent.innerHTML = content
                setUpLinks(externalContent)
                let title = document.querySelector('#titrepage').innerHTML
                let divTitle = document.querySelector('#ext-title')
                if (title) {
                    document.title = 'Léo Boyer - ' + title
                    divTitle.innerHTML = title
                } else {
                    document.title = 'Léo Boyer'
                    divTitle.innerHTML = "Page externe"
                }
                if (image) {
                    let src = image.getAttribute('src')
                    let bg = src.substr(0, src.length - 10) + "-blur.jpg"
                    externalPage.style.backgroundImage = "url(" + bg + ")"
                } else {
                    let image = document.querySelector('#imagepage > .extimg')
                    if (image) {
                        let src = image.getAttribute('src')
                        let bg = src.substr(0, src.length - 4) + "-blur.jpg"
                        externalPage.style.backgroundImage = "url(" + bg + ")"
                    }
                    else {
                    externalPage.style.backgroundImage = "url(img/moi-blur.jpg)"
                    }
                }
            
                setUpNav2()
            } else {
                alert('Erreur 404: document non trouvé.')
                closeExternalPage()
            }
            loading('stop')
        }
    }

    xhr.open('GET', page, true)
    xhr.send()
    loading('start')
    openExternalPage()
}

let autoPage = function () {
    let hash = document.location.hash
    if (!hash) {
        closeExternalPage()
    } else {
        path = hash.substring(1)
        openPage(path + ".html")
    }
}

window.onpopstate = autoPage




window.onscroll = function (ev) {

    updateNav1()
    let scrollY = window.scrollY
    if (scrollY < pagesScroll[1] - 60) {
        currentPage = 0
        updateNav1(1)
    } else if (scrollY < pagesScroll[2] - 60) {
        currentPage = 1
        updateNav1(1)
    } else if (scrollY < pagesScroll[3] - 60) {
        currentPage = 2
        updateNav1(1)
    } else if (scrollY < pagesScroll[4] - 300) {
        currentPage = 3
        updateNav1(1)
    } else if (scrollY >= pagesScroll[4] - 300) {
        currentPage = 4
        updateNav1(1)
    }



}






let extHammer = new Hammer(externalContent)

extHammer
    .on('swiperight', function () {
        closeExternalPage()
    })







//   Executer pendant chargement de la page

pages.forEach(function (value) {
    pagesScroll.push(getDistanceFromTop(document.querySelector('#' + value)) - (window.innerHeight * 0.3))
})
window.onresize = responsive
document.querySelector("#menubutton").addEventListener("click", function() {
    if (respMenuOpen) {
        closeRespMenu()
    }
    else {
        openRespMenu()
    }
})
let littleWindow = function () {
    let mobileView = window.open("https://www.leoboyer.fr/#", "Ce site sur mobile", "location=yes,resizable=yes,scrollbars=yes,status=yes, width=400, height=700");
}



responsive()
setUpNav1()
setUpNav2()
updateNav1()
updateNav1(1)
setUpLinks(document)
autoPage()