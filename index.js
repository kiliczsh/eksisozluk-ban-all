var eksisozluk = "https://eksisozluk.com";

function getFaverList(){
    let favsDoc = document.getElementsByClassName('favorite-list-popup toggles-menu')[0].getElementsByTagName('div')[0];
    let faversList = favsDoc.getElementsByTagName('ul')[0].children;
    let result = []
    for(let i=0;i<faversList.length;i++){
        let link = faversList[i].children[0].getAttribute('href');
        if(link.startsWith('/biri/')){
            result.push(link)
        }
    }
    return result;
}

async function sendRequests(actionUrl){
    var action = eksisozluk + actionUrl;
    console.log(action);
    await fetch(action, {
        "credentials": "include",
        "headers": {
            "Accept": "*/*",
            "Accept-Language": "en-US,en;q=0.5",
            "X-Requested-With": "XMLHttpRequest"
        },
        "method": "POST",
        "mode": "cors"
    }).then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}


var faversList = getFaverList();
var profileUrl = eksisozluk + faversList[0];
console.log(profileUrl);
var requestOptions = { method: 'GET', redirect: 'follow' };
await fetch(profileUrl, requestOptions)
    .then(response => response.text())
    .then(result => {userData = result;})
    .catch(error => console.log('error', error));
var userDoc = new DOMParser().parseFromString(userData, "text/html");
var blockedUser = userDoc.getElementById('blocked-link');
var blockedEntries = userDoc.getElementById('blocked-index-title-link');
var banUserUrl = blockedUser.getAttribute('data-remove-url');
var banEntriesUrl = blockedEntries.getAttribute('data-remove-url');
sendRequests(banUserUrl);
sendRequests(banUserEntriesUrl);

