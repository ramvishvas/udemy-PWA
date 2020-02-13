var deferredPrompt;

var box = document.querySelector('.box');
var button = document.querySelector('button');

if (!window.Promise) {
    window.Promise = Promise;
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function() {
            console.log('[Main.js] Service worker registered!');
        })
        .catch(function(err) {
            console.log(err);
        });
}

window.addEventListener('beforeinstallprompt', function(event) {
    console.log('[Main.js] beforeinstallprompt fired');
    event.preventDefault();
    deferredPrompt = event;
    return false;
});

function promptInstall() {
    if (deferredPrompt) {
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then(function(choiceResult) {
            console.log('[Main.js] outcome', choiceResult.outcome);

            if (choiceResult.outcome === 'dismissed') {
                console.log('[Main.js] User cancelled installation');
            } else {
                console.log('[Main.js] User added to home screen');
            }
        });

        deferredPrompt = null;
    }
}

button.addEventListener('click', function(event) {
    if (box.classList.contains('visible')) {
        box.classList.remove('visible');
    } else {
        box.classList.add('visible');
        promptInstall();
    }
});

// 1) Register a Service Worker
// 2) Identify the AppShell (i.e. core assets your app requires to provide its basic "frame")
// 3) Precache the AppShell
// 4) Add Code to fetch the precached assets from cache when needed
// 5) Precache other assets required to make the root index.html file work
// 6) Change some styling in the main.css file and make sure that the new file gets loaded + cached (hint: versioning)
// 7) Make sure to clean up unused caches
// 8) Add dynamic caching (with versioning) to cache everything in your app when visited/ fetched by the user

// Important: Clear your Application Storage first to get rid of the old SW & Cache from the Main Course Project!
