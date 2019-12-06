// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker
//     .register('/sw.js', {scope: '/help/'})
//     .then(function(){
//         console.log('service worker register')
//     })
//     .catch(function(){
//         console.log('service worker fail to register')
//     });
// }

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('/sw.js')
    .then(function(){
        console.log('service worker register')
    })
    .catch(function(){
        console.error('service worker fail to register')
    });
}