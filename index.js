window.onclick = function(event) {
    clickOutBoundModal(event);
}

var imgLinksIdx = 8;
var imgLinks = [];
getImageLinks();

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

makeCardGallery();
function makeCardGallery() {
    var gallery = document.querySelector('.card-container');
    var i;
    for(i=0; i<imgLinksIdx; i++) {
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

/* search */
function pressedKeyboard() {
    if(window.event.keyCode == 13) {
        findFruit();
    }
}

function findFruit() {
    var input = document.querySelector('.search-input');
    if(input.value === '') {
        alert('검색어를 입력하세요!');
    } else {
        alert('search');
    }
}

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

/* infinite scroll, lazy loading */
document.addEventListener('DOMContentLoaded', function() {
    var lazyLoadTimeOut;

    function lazyLoad() {
        if(lazyLoadTimeOut) {
            clearTimeout(lazyLoadTimeOut);
        }

        lazyLoadTimeOut = setTimeout(function() {
            var loader = document.querySelector('.loader-container');
            loader.style.display = 'block';

            var scrollTop = getScrollTop();
            var documentHeight = getDocumentHeight();
            var checkHeight = documentHeight - window.innerHeight - 100;

            if(imgLinksIdx === imgLinks.length) {
                var no_image_text = document.querySelector('.no-image');
                no_image_text.style.display = 'block';
                loader.style.display = 'none';
                return false;
            }

            if(scrollTop >= checkHeight) {
                if(imgLinksIdx + 4 < imgLinks.length) {
                    var newIdx = imgLinksIdx + 4;
                    for(var i=imgLinksIdx; i<newIdx; i++) {
                        var gallery = document.querySelector('.card-container');
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
                    imgLinksIdx = newIdx;
        
                } else {
                    imgLinksIdx = imgLinks.length;
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
var modal = document.querySelector('.modal');

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

/* search fruit */


/* refresh web storage */


/* error handling */



