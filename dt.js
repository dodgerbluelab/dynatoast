async function DynamicToast({text, type, timer, expanded}) {

    let isMobile = window.innerWidth < 480;

    return new Promise((resolve) => {
        let duration = timer ? timer : 5000;
        let remainingTime = duration;
        let startTime;
        let timeoutId;
        let isPaused = false;

        console.log(type)

        type = type === undefined ? 'default' : type;
        
        

        // Check for existing async toast to transform
        const existingAsyncToast = document.querySelector('[data-dynamic-toast="async"]');
        
        if (type !== 'async' && existingAsyncToast) {
            existingAsyncToast.setAttribute('data-dynamic-toast', type);
            existingAsyncToast.textContent = text;
            
            startTime = Date.now();
            timeoutId = setTimeout(dismissToast, duration);

            existingAsyncToast.addEventListener('mouseenter', () => {
                if (!isPaused) {
                    clearTimeout(timeoutId);
                    remainingTime = remainingTime - (Date.now() - startTime);
                    isPaused = true;
                }
            });

            existingAsyncToast.addEventListener('mouseleave', () => {
                if (isPaused) {
                    startTime = Date.now();
                    timeoutId = setTimeout(dismissToast, remainingTime);
                    isPaused = false;
                }
            });
            
            function dismissToast() {
                existingAsyncToast.classList.remove('visible');
                existingAsyncToast.classList.add('dismiss');
                existingAsyncToast.style.width = '48px';
                
                existingAsyncToast.addEventListener('transitionend', event => {
                    if (event.propertyName === 'transform') {
                        existingAsyncToast.remove();
                        resolve();
                    }
                });
            }
            
            return;
        }

        if (!text) {
            console.error('Dynamic toast must have a text');
            return;
        }

        const toastEl = document.createElement('div');
        toastEl.setAttribute('data-dynamic-toast', type);
        toastEl.textContent = text;

        if (expanded) { 
            toastEl.setAttribute('data-dynamic-toast-expanded', expanded); 
        }
        
        document.body.appendChild(toastEl);

        let dynamicWidth = '420px'

        if (isMobile) {
            dynamicWidth = 'calc(100vw - 40px)'
        }


        const baseSize = 58;
        toastEl.style.width = `${baseSize}px`;
        toastEl.style.height = `${baseSize}px`;


        const handleAnimationEnd = (event) => {
            if (event.animationName === 'dynamicToastIntro') {
                toastEl.style.width = dynamicWidth;
                toastEl.classList.add('visible');

                toastEl.addEventListener('transitionend', (event) => {                    
                    if (event.propertyName === 'width') {
                        const toastHeight = toastEl.scrollHeight;
                        toastEl.style.height = `${toastHeight}px`;
                    }
                });
            }
        };
        
        toastEl.addEventListener('animationend', handleAnimationEnd, { once: true });



        function dismissToast() {
            toastEl.classList.remove('visible');
            toastEl.classList.add('dismiss');
            toastEl.style.width = baseSize;
            
            toastEl.addEventListener('transitionend', event => {
                if (event.propertyName === 'transform') {
                    toastEl.remove();
                    resolve();
                }
            });
        }

        if (type !== 'async') {
            startTime = Date.now();
            timeoutId = setTimeout(dismissToast, duration);

            toastEl.addEventListener('mouseenter', () => {
                if (!isPaused) {
                    clearTimeout(timeoutId);
                    remainingTime = remainingTime - (Date.now() - startTime);
                    isPaused = true;
                }
            });

            toastEl.addEventListener('mouseleave', () => {
                if (isPaused) {
                    startTime = Date.now();
                    timeoutId = setTimeout(dismissToast, remainingTime);
                    isPaused = false;
                }
            });
        }
    });
}
