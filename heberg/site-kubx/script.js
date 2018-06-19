
window.onscroll = function () {
    var scroll = (document.documentElement.scrollTop ||
        document.body.scrollTop);
    var largeur= window.innerWidth;
    if (largeur > 900) {
        var positionInPage = 600;
    } else if (largeur < 900) {
        var positionInPage = 400;
    } else if (largeur < 400) {
        var positionInPage = 350;
    } else {
        var positionInPage = 600;
    }
    
    if(scroll > positionInPage){
            $('#menu').css('top','0');
        }
    
    
    else if (scroll < positionInPage || scroll == positionInPage) {
            
            $('#menu').css('top','-20%');
        }
} 

var play = function(id, title, des) {
    var largeur= window.innerWidth;
    if (largeur > 900) {
        var scroll = 750;
    } else if (largeur < 900) {
        var scroll = 550;
    } else if (largeur < 400) {
        var scroll = 500;
    } else {
        var scroll = 750;
    }
    $('html, body').animate({scrollTop: scroll}, 'slow');
    
    
    document.getElementById('title').innerHTML = title;
    document.getElementById('description').innerHTML = des;
    document.getElementById('lecteur').src = "https://www.youtube.com/embed/" + id;
    document.title = title + " | " + "KubX Studio";
}

var scrollTop = function() {
    $('html, body').animate({scrollTop: 0}, 'slow');
}

var showAll = function ()   {
    $('.cat').slideDown(400);
    $('.item').removeClass("selected");
    document.getElementById('titlecat').innerHTML = "Toutes les vidéos";
    $('#menu').css('backgroundColor', '#0f7fc4');
    $('#content').css('backgroundColor', '#0f7fc4');
    document.title = "KubX Studio";
}
var filtrer = function(classe, go, nom, couleur) {
    showAll();
    $('.cat').slideUp(400);
    $('.' + classe).slideDown(400);
    $(go).addClass("selected");
    $('#tous').removeClass("selected");
    document.getElementById('titlecat').innerHTML = nom;
    $('#menu').css('backgroundColor', couleur);
    $('#content').css('backgroundColor', couleur);
    document.title = nom + " | " + "KubX Studio";
    slide();
}

var filtrerplus = function(cat, go) {
    $('.item').removeClass("selected");
    $('#tous').removeClass("selected");
    $(go).addClass("selected");
    $('.souscat').css('display','none');
    $('#cat'+cat).css('display','inherit');
   $('#filtr').addClass('open3');
   $('#plusfiltr').addClass('open');
}

    var sidebar = 0;
var slide = function() {
    if(sidebar == 0) {sidebar = 1}
    else {sidebar = 0}
    $('#f1').toggleClass("fleche1");
        $('#f2').toggleClass("fleche2");
        $('#f3').toggleClass("fleche3");
        $('#lfiltr').toggleClass("rotate");
        $('#filtr').toggleClass("open");
        $('#filtr').removeClass("open3");
        $('#plusfiltr').toggleClass("open2");
        $('#plusfiltr').removeClass("open");
        $('#content').toggleClass("open2");
}
$(document).ready(function() {
    $('.inf p').slideToggle(400);
    
    $('#lfiltr').click(function() {
        slide();
    });
    var win = 0;
    $("#wintitle").click(function() {
        if(!win) {
            $('#cabout').css('bottom','10%');
            $('#cabout').css('width','80%');
            $('#cabout').css('left','10%');
            $('#content, #header, .social').css('opacity', '0.5');
            $('#ibuttons').removeClass('fa-chevron-circle-up');
            $('#ibuttons').addClass('fa-times-circle');
            win = 1;
        }
        else if(win) {
            $('#cabout').css('bottom','-80%');
            $('#cabout').css('width','350px');
            $('#cabout').css('left','50px');
            $('#content, #header, .social').css('opacity', '1');
            $('#ibuttons').removeClass('fa-times-circle');
            $('#ibuttons').addClass('fa-chevron-circle-up');
            win = 0;
        }
    });
    
    $('#cat2').click(function() {
        $('#infos').css('transform','translateX(-50%)');
        $('#underline').css('transform','translateX(100%)');
    });
    $('#cat1').click(function() {
        $('#infos').css('transform','translateX(0)');
        $('#underline').css('transform','translateX(0)');
    });
    
    var $glisse = $('#infos');
    var membres = 0;
    $glisse.hammer()
        .on('swipeleft', function(ev) {
            if(membres) {
                return true;
            }
            $('#infos').css('transform','translateX(-50%)');
            $('#underline').css('transform','translateX(100%)');
        membres = 1;
    });
    $glisse.hammer()
        .on('swiperight', function(ev) {
            if(!membres) {
                return true;
            }
            $('#infos').css('transform','translateX(0)');
            $('#underline').css('transform','translateX(0)');
        membres = 0;
    });
    
    
    var $page = $('#content');
    $page.hammer()
        .on('swipeleft', function(ev) {
            if(sidebar) {
                return true;
            }
            slide();
    })
    $page.hammer()
        .on('swiperight', function(ev) {
            if(!sidebar) {
                return true;
            }
            slide();
    });
    
    $('.inf h1').click(function() {
        $(this).next().slideToggle(400);
    });
    
    $('.text').mouseenter(function() {
        var $largeur = $(this).css('width');
        var $gauche = $(this).css('left');
        var $bas = $(this).css('bottom');
        var init = 0;
        if(init) {return true;}
        init = 1;
        //$(this + ':before').css('width', $largeur);
        console.log($gauche);
    });
});
  




