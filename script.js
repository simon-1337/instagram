let posts = [{
        'user': 'Anakin',
        'profilpicture': 'img/pb1.jpg',
        'image': 'img/post1.jpg',
        'description': 'Wenn du dachtest auf Coruscant gibts Croissants *angry*',
        'location': 'Coruscant',
        'likes': 12000,
        'liked': false,
        'comments': ['Ein dummer Fehler das war #lol'],
        'comments-author': ['Yoda'],
    },
    {
        'user': 'Yoda',
        'profilpicture': 'img/pb2.jpg',
        'image': 'img/post2.jpg',
        'description': 'Einen guten Drink du brauchst',
        'location': 'Dagobah',
        'likes': 15000,
        'liked': false,
        'comments': [],
        'comments-author': [],
    },
    {
        'user': 'Chewbacca',
        'profilpicture': 'img/pb3.jpg',
        'image': 'img/post3.jpg',
        'description': 'Steht mir Blond?',
        'location': 'Yawin',
        'likes': 7500,
        'liked': false,
        'comments': [],
        'comments-author': [],
    },
    {
        'user': 'Anakin',
        'profilpicture': 'img/pb1.jpg',
        'image': 'img/post4.jpg',
        'description': 'Quote of the Day',
        'location': 'Death Star',
        'likes': 25000,
        'liked': false,
        'comments': ['Not funny anymore!!!'],
        'comments-author': ['Luke'],
    },
    {
        'user': 'Klonkrieger Nr. 42',
        'profilpicture': 'img/pb5.jpg',
        'image': 'img/post5.jpg',
        'description': 'Alles im Griff!',
        'location': 'Endor',
        'likes': 4000,
        'liked': false,
        'comments': [],
        'comments-author': [],
    },
];


let suggestions = [{
    'user': 'Kylo',
    'profilpicture': 'img/kylo.jpg'
    },
    {
    'user': 'Tusken-Räuber Bob',
    'profilpicture': 'img/bob.jpg'
    },
    {
    'user': 'I am a Porg',
    'profilpicture': 'img/porg.jpg'
    },
    {
    'user': 'Mando',
    'profilpicture': 'img/mando.jpg'
    },
];


function render() {
    renderUserSection();
    let postsSection = document.getElementById('posts');
    postsSection.innerHTML = '';

    for (let i = 0; i < posts.length; i++) {
        likeIcon = checkIfLiked(i);
        commentContainerID = 'comment-container' + i;
        postsSection.innerHTML += generateHTML(i, likeIcon);
        renderCommentsSection(commentContainerID, i);
    }
}


function showLoupe() {
    let elem = document.getElementById('input-field');
    if (!elem.classList.contains('transperency-and-padding')){
        elem.classList.add('transperency-and-padding');
    }
}


function removeLoupe() {
    //delay to ensure that the function gets executed
    setTimeout(function (){
    document.getElementById('input-field').classList.remove('transperency-and-padding');
    }, 1);
}


function checkIfLiked(i) {
    if (posts[i]['liked']) {
        return 'img/favorite-5-48.png'
    } else {
        return 'img/favorite-4-48.png'
    }
}


function generateHTML(i, likeIcon) {
    return /*html*/ `
        <div class="post">
            <div class="post-top">
                <img class="profilpic" src="${posts[i]['profilpicture']}" alt="">
                <div class="post-top-child">
                    <span class="profilname">${posts[i]['user']}</span>
                    <span class="location">${posts[i]['location']}</span>
                </div>
            </div>
            <img class="post-image" src="${posts[i]['image']}" alt="">
            <div class="subsection">
                <div class="icon-line">
                    <img class="like-icon" onclick="changeLikeIcon(${i})" src="${likeIcon}" alt="">
                    <img class="comment-icon" onclick="goToTextarea(${i})" src="img/comments-48.png" alt="">
                    <img src="img/paper-plane-48.png" alt="">
                </div>
                <span class="like-display">Gefällt ${posts[i]['likes']} Personen</span>
                <div class="subsection-child">
                    <span class="profilname-subsection">${posts[i]['user']}</span>
                    <span class="caption">${posts[i]['description']}</span>
                </div>
                <div class="comment-container" id="${commentContainerID}">
                </div>
            </div>
        </div>
        `;
}


function changeLikeIcon(i) {
    elem = posts[i];
    if (elem['liked'] == true) {
        elem['likes']--;
        elem['liked'] = false;
    } else {
        elem['likes']++;
        elem['liked'] = true;
    }
    render();
}


function renderCommentsSection(id, i) {
    container = document.getElementById(id);
    container.innerHTML = '';

    for (let j = 0; j < posts[i]['comments'].length; j++) {
        container.innerHTML += commentsHTML(i, j);
    }

    container.innerHTML += addCommentsHTML(i);
}


function commentsHTML(i, j) {
    return /*html*/ `
        <div class="comment-line">
            <span class="profilname-subsection">${posts[i]['comments-author'][j]}</span>
            <span class="comment">${posts[i]['comments'][j]}</span>
        </div>
    `;
}


function addCommentsHTML(i) {
    return /*html*/ `
        <div class="add-comments-section">
            <img src="img/happy-48.png" alt="">
            <form onsubmit="saveComments(${i})">
                <textarea id="comment-text${i}" placeholder="Kommetieren ..." required></textarea>
                <button class="button-opacity">Posten</button>
            </form>
        </div>
    `;
}


function saveComments(i) {
    id = 'comment-text' + i
    newComment = document.getElementById(id).value;
    posts[i]['comments'].push(newComment);
    posts[i]['comments-author'].push('Chewbacca');
    render();
}


function goToTextarea(i) {
    id = 'comment-text' + i;
    document.getElementById(id).focus();
}


function renderUserSection() {
    let container = document.getElementById('suggestions');
    container.innerHTML = '';

    for (let i = 0; i < suggestions.length; i++) {
        container.innerHTML += /*html*/ `
            <div class="suggestion-container">
                <div class="suggestion-container-child">    
                    <img src="${suggestions[i]['profilpicture']}" alt="">
                    <span>${suggestions[i]['user']}</span>
                </div>    
                <button class="follow-button" id="follow-button${i}" onclick="changeFollowButton('follow-button${i}')">Folgen</button>
            </div>
        `;
    }
}


function changeFollowButton(id) {
    let button = document.getElementById(id)
    if (button.innerHTML.indexOf('Folgen') != -1) {
        button.innerHTML = 'Gefolgt';
        button.classList.add('black-followed-button');
    }else {
        button.innerHTML = 'Folgen';
        button.classList.remove('black-followed-button');
    }
}
