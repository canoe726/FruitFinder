var imgLinks = [];
var searchLinks = [];
var no_image_text = document.querySelector('.no-image');
var loader = document.querySelector('.loader-container');
var imgNotFound = document.querySelector('.img-not-found');
var imgFound = document.querySelector('.img-found');
var gallery = document.querySelector('.img-found .card-container');
var modal = document.querySelector('.modal');
var keywordsClass = document.querySelector('.keywords');

window.onclick = function(event) {
    clickOutBoundModal(event);
}

getImageLinks();

/* skin change */
function modeChange(elem) {
    var mode = elem.innerHTML;
    if(mode === 'BLACK MODE') {
        elem.innerHTML = 'WHITE MODE';
        
        document.querySelector('html').style.backgroundColor = 'dimgrey';
        document.querySelector('header .title a').style.color = 'white';

        if(typeof(Storage) !== "undefined") {
            localStorage.setItem('skin', 'BLACK MODE');
        }

    } else {
        elem.innerHTML = 'BLACK MODE';

        document.querySelector('html').style.backgroundColor = 'white';
        document.querySelector('header .title a').style.color = 'black';

        if(typeof(Storage) !== "undefined") {
            localStorage.setItem('skin', 'WHITE MODE');
        }
    }
}

/* make card gallery */
function shuffle(array) {
    var ret = array;

    var i, j, x;
    for(i=ret.length - 1; i>=0; i--) {
        j = Math.floor(Math.random() * (i+1));
        x = ret[i];
        ret[i] = ret[j];
        ret[j] = x;
    }

    return ret;
}

function getImageLinks() {
    var dir = 'image/';
    var format = '.jpg';
    var fruits = ['apple', 'banana', 'coconut', 'grape'];
    var i, j;
    for(i=0; i<fruits.length; i++) {
        for(j=1; j<11; j++) {
            var obj = {};
            obj.link = dir + fruits[i] + j + format;
            obj.title = fruits[i];
            obj.desc = 'index - ' + j;
            imgLinks.push(obj);
        }
    }
    imgLinks = shuffle(imgLinks);
}

makeCardGallery(imgLinks);
function makeCardGallery(img) {
    var imgIdx = 8;

    var i;
    for(i=0; i<imgIdx; i++) {
        var html = `
        <div class="card">
            <img onclick="showModal(this);" src="` + img[i].link + `" alt="` + img[i].desc + `"/>
            <article class="content">
                <div class="title">` + img[i].title + `</div>
                <div class="desc">` + img[i].desc + `</div>
            </article>
        </div>
        `;
        gallery.innerHTML += html;
    }
}

/* search */
function pressedKeyboard() {
    if(window.event.keyCode == 13) {
        findFruit();
    }
}

function deleteKeyword(elem) {
    var curElem = elem;
    elem.parentNode.removeChild(curElem);

    searchFruit();
}

function searchFruit() {
    searchLinks = [];

    no_image_text.style.display = 'none';

    var keywords = document.querySelectorAll('.prev-search');

    if(keywords.length === 0) {
        localStorage.setItem('keywords', undefined);

        foundImage();
        gallery.innerHTML = '';
        makeCardGallery(imgLinks);

    } else {
        var i, j;

        var words = '';
        for(i=0; i<keywords.length; i++) {
            words += keywords[i].innerHTML + ',';
        }
        localStorage.setItem('keywords', words);

        for(i=0; i<imgLinks.length; i++) {
            for(j=0; j<keywords.length; j++) {
                if(imgLinks[i].title === keywords[j].innerHTML) {
                    searchLinks.push(imgLinks[i]);
                }
            }
        }
    
        if(searchLinks.length === 0) {
            notFoundImage();
    
        } else {
            loader.style.display = 'block';
    
            gallery.innerHTML = '';
            makeCardGallery(searchLinks);
    
            loader.style.display = 'none';
        }
    }
}

function findFruit() {
    var input = document.querySelector('.search-input');
    if(input.value === '') {
        alert('검색어를 입력하세요!');
    
    } else {
        var keyword = input.value;
        keyword = keyword.toLowerCase();

        var html = `<button class="prev-search" type="button" onclick="deleteKeyword(this);">` + keyword + `</button>`;
        keywordsClass.innerHTML += html;
        input.value = '';

        searchFruit();
    }
}

function removeKeywords() {
    foundImage();

    localStorage.setItem('keywords', undefined);

    keywordsClass.innerHTML = '';
    keywordsClass.innerHTML += `<button class="del-search" type="button" onclick="removeKeywords();">모든 검색어 삭제</button>`;
    
    gallery.innerHTML = '';
    makeCardGallery(imgLinks);
}

/* search error handling */
function notFoundImage() {
    imgNotFound.style.display = 'block';
    
    imgFound.style.display = 'none';
}

function foundImage() {
    no_image_text.style.display = 'none';

    imgNotFound.style.display = 'none';
    
    imgFound.style.display = 'block';
}


/* infinite scroll, lazy loading */
function getScrollTop() {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

function getDocumentHeight() {
    const body = document.body;
    const html = document.documentElement;

    return Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
    );
}

document.addEventListener('DOMContentLoaded', function() {
    var lazyLoadTimeOut;

    function lazyLoad() {
        var imageFound = document.querySelector('.img-not-found');
        if(window.getComputedStyle(imageFound).display === 'block') {
            return false;
        }

        if(lazyLoadTimeOut) {
            clearTimeout(lazyLoadTimeOut);
        }

        lazyLoadTimeOut = setTimeout(function() {
            loader.style.display = 'block';

            var scrollTop = getScrollTop();
            var documentHeight = getDocumentHeight();
            var checkHeight = documentHeight - window.innerHeight - 100;

            if(scrollTop >= checkHeight) {
                var isSearched = document.querySelectorAll('.prev-search');
                var cardLength = document.querySelectorAll('.card').length;
                
                if(isSearched.length > 0) {
                    if(cardLength === searchLinks.length) {
                        no_image_text.style.display = 'block';
                        loader.style.display = 'none';
                        return false;
                    }
                    
                    var newIdx;
                    if(cardLength + 4 < searchLinks.length) {
                        newIdx = cardLength + 4;
                    } else {
                        newIdx = searchLinks.length;
                    }

                    for(var i=cardLength; i<newIdx; i++) {
                        var html = `
                        <div class="card">
                            <img onclick="showModal(this);" src="` + searchLinks[i].link + `" alt="` + imgLinks[i].desc + `"/>
                            <article class="content">
                                <div class="title">` + searchLinks[i].title + `</div>
                                <div class="desc">` + searchLinks[i].desc + `</div>
                            </article>
                        </div>
                        `;
                        gallery.innerHTML += html;
                    }

                } else {
                    if(cardLength === imgLinks.length) {
                        no_image_text.style.display = 'block';
                        loader.style.display = 'none';
                        return false;
                    }

                    var newIdx;
                    if(cardLength + 4 < imgLinks.length) {
                        newIdx = cardLength + 4;
                    } else {
                        newIdx = imgLinks.length;
                    }

                    for(var i=cardLength; i<newIdx; i++) {
                        var html = `
                        <div class="card">
                            <img onclick="showModal(this);" src="` + imgLinks[i].link + `" alt="` + imgLinks[i].desc + `"/>
                            <article class="content">
                                <div class="title">` + imgLinks[i].title + `</div>
                                <div class="desc">` + imgLinks[i].desc + `</div>
                            </article>
                        </div>
                        `;
                        gallery.innerHTML += html;
                    }
                }
            }
            loader.style.display = 'none';
            
        }, 20);
    }

    document.addEventListener('scroll', lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationChange", lazyLoad);
});

/* modal */
function showModal(elem) {
    modal.style.display = 'block';

    var curElem = elem.parentNode;

    var modalTitle = curElem.querySelector('.title').innerHTML;
    var modalImage = curElem.querySelector('img').src;
    var modalContent1 = curElem.querySelector('.desc').innerHTML;
    var modalContent2 = (new Date());

    var title = modal.querySelector('.title');
    title.innerHTML = modalTitle;

    var img = modal.querySelector('img');
    img.src = modalImage;

    var content1 = modal.querySelector('.content1');
    content1.innerHTML = modalContent1;

    var content2 = modal.querySelector('.content2');
    content2.innerHTML = modalContent2;
}

function closeModal() {
    modal.style.display = 'none';
}

function clickOutBoundModal(e) {
    if(e.target == modal) {
        modal.style.display = 'none';
    }
}

/* use web storage api */
if(typeof(Storage) !== "undefined") {
    /* skin storage */
    if(localStorage.getItem('skin') === undefined) { localStorage.setItem('skin', 'WHITE MODE'); }
    var mode = localStorage.getItem('skin');
    var skinBtn = document.querySelector('.skin-btn');
    if(mode === 'BLACK MODE') {
        skinBtn.innerHTML = 'WHITE MODE';

        document.querySelector('html').style.backgroundColor = 'dimgrey';
        document.querySelector('header .title a').style.color = 'white';

    } else {
        skinBtn.innerHTML = 'BLACK MODE';

        document.querySelector('html').style.backgroundColor = 'white';
        document.querySelector('header .title a').style.color = 'black';
    }

    /* keywords storage */
    var keywords = localStorage.getItem('keywords');
    if(keywords.length !== 0) {
        keywords = keywords.split(',');
        keywords.splice(-1,1);

        for(var i=0; i<keywords.length; i++) {
            var html = `<button class="prev-search" type="button" onclick="deleteKeyword(this);">` + keywords[i] + `</button>`;
            keywordsClass.innerHTML += html;
        }

        searchFruit();
    }
    
} else {
    console.log('No Web Storage support, can`t load user setting ...');
}