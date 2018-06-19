
window.onscroll = function () {
    var scroll = (document.documentElement.scrollTop ||
                  document.body.scrollTop);
    
    if (scroll <100){
        self.location.hash= "#accueil";
    }
    else if (scroll >100 && scroll <700){
        self.location.hash= "#part2";
    }
    else if (scroll >700 && scroll <1300){
        self.location.hash= "#part3";
    }
    else if (scroll >1300 && scroll <2000){
        self.location.hash= "#part4";
    }
    else if (scroll >2000 && scroll <2400){
        self.location.hash= "#part5";
    }
    else if (window.matchMedia("(min-width: 1000px)").matches) {
    if (scroll >2400){
        self.location.hash= "#footer";
    }
}
}