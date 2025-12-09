document.addEventListener('DOMContentLoaded', function () {

    const audio = document.getElementById('lamp-audio');
    const desktopBtn = document.getElementById('desktop-btn');
    const mobileBtn = document.getElementById('mobile-btn');
    const loveMessage = document.getElementById('love-message');
    const lampContainer = document.getElementById('lamp-container');

    let lampOn = false;
    let originalMessage = loveMessage.textContent;

    // Máquina de escribir
    function typeLoveMessage() {

        loveMessage.textContent = "";
        loveMessage.style.opacity = "1";
        let i = 0;

        function type() {
            if (i <= originalMessage.length) {
                loveMessage.textContent = originalMessage.slice(0, i);
                i++;
                setTimeout(type, 70);
            } else {
                // Mostrar botón otra vez
                setTimeout(() => {
                    if (desktopBtn) desktopBtn.classList.remove("btn-hidden");
                    if (mobileBtn) mobileBtn.classList.remove("btn-hidden");
                }, 600);
            }
        }

        setTimeout(type, 400);
    }

    // Reset mensaje
    function resetMessage() {
        loveMessage.textContent = "";
        loveMessage.style.opacity = "0";
    }

    // ON / OFF lámpara
    function toggleLampAndMusic() {

        lampOn = !lampOn;

        // Sincronizar botones
        [desktopBtn, mobileBtn].forEach(btn => {
            if (!btn) return;
            btn.classList.toggle("on", lampOn);
            btn.querySelector("span").textContent = lampOn ? "APAGAR" : "ENCENDER";
        });

        if (lampOn) {
            document.body.classList.add("lamp-on");
            lampContainer.classList.add("lamp-on");

            // Ocultar botones
            if (desktopBtn) desktopBtn.classList.add("btn-hidden");
            if (mobileBtn) mobileBtn.classList.add("btn-hidden");

            // Música
            audio.currentTime = 0;
            audio.play().catch(() => {});

            // Animación móvil
            if (window.innerWidth <= 600) {
                lampContainer.classList.add("lamp-down");
            }

            // Mensaje
            setTimeout(typeLoveMessage, 900);

        } else {
            document.body.classList.remove("lamp-on");
            lampContainer.classList.remove("lamp-on");

            audio.pause();
            audio.currentTime = 0;

            resetMessage();
        }
    }

    if (desktopBtn) desktopBtn.addEventListener('click', toggleLampAndMusic);
    if (mobileBtn) mobileBtn.addEventListener('click', toggleLampAndMusic);

    resetMessage();
});
