let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const btn = document.getElementById('installBtn');
    if (btn) btn.hidden = false;
});

document.addEventListener('click', async (e) => {

    if (e.target.id !== 'installBtn') return;

    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    deferredPrompt = null;

    e.target.hidden = true;
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
}
