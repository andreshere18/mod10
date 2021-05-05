'use strict';

let deferredInstalPrompt = null;
const installButton = document.getElementById('butInstall');
installButton.addEventListener("click", installPWA);

window.addEventListener('beforeintallprompt', saveBeforeInstallPromptEvent);

function saveBeforeInstallPromptEvent(ev) {
    deferredInstalPrompt = ev;
    installButton.removeAttribute('hidden');
}

function installPWA(ev) {
    deferredInstalPrompt.prompt();
    ev.srcElement.setAttribute('hidden', true);
    deferredInstalPrompt.userChoice.then((choice) => {
        if (choice.outcome == "accepted") {
            console.log("accepted");
        } else {
            console.log("rejected");
        }
        deferredInstalPrompt = null;
    })
}

window.addEventListener('appinstalled', logAppInstalled);

function logAppInstalled(ev) {
    console.log("Game installed");
}