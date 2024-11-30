async function DynamicToast({text, type, duration, expanded}) {
    return new Promise((resolve) => {

        let timer = duration ? duration : 5000;
        let remainingTime = timer;
        let startTime;
        let timeoutId;
        let isPaused = false;

        if (!text) {
            console.error('Dynamic toast must have a text');
            return;
        }

        if (timer < 2500) {
            console.warn(`Please consider a longer duration for the dynamic toast:\n${text}`);
        }

        const toastEl = document.createElement('div');
        toastEl.setAttribute('data-dynamic-toast', type);
        toastEl.textContent = text;
        
        if (expanded) {
            toastEl.setAttribute('data-dynamic-toast-expanded', expanded);
        }
        
        document.body.appendChild(toastEl);
        

        // gets content width
        const dynamicWidth = toastEl.getBoundingClientRect().width;

        // set starting width and prepares for animation
        const baseWidth = '30px';
        toastEl.style.width = baseWidth;
        

        toastEl.addEventListener('animationend', event => {
            if (event.animationName === 'dynamicToastIntro') {
                toastEl.classList.add('visible');
                toastEl.style.width = `${dynamicWidth}px`;
            }
        });

        function dismissToast() {
            toastEl.classList.remove('visible');
            toastEl.classList.add('dismiss');
            toastEl.style.width = baseWidth;
            
            toastEl.addEventListener('transitionend', event => {
                if (event.propertyName === 'transform') {
                    toastEl.remove();
                    resolve(); 
                }
            });
        }

        // Pause timer on hover
        toastEl.addEventListener('mouseenter', () => {
            if (!isPaused) {
                clearTimeout(timeoutId);
                remainingTime = remainingTime - (Date.now() - startTime);
                isPaused = true;
            }
        });

        // Resume timer on mouse leave
        toastEl.addEventListener('mouseleave', () => {
            if (isPaused) {
                startTime = Date.now();
                timeoutId = setTimeout(dismissToast, remainingTime);
                isPaused = false;
            }
        });

        // Start initial timer
        startTime = Date.now();
        timeoutId = setTimeout(dismissToast, remainingTime);
    });
}