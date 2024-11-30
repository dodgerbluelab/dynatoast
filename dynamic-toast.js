async function DynamicToast({text, type, timer, expanded}) {
    return new Promise((resolve) => {
        let duration = timer ? timer : 5000;
        let remainingTime = duration;
        let startTime;
        let timeoutId;
        let isPaused = false;
        

        // Check for existing async toast to transform
        const existingAsyncToast = document.querySelector('[data-dynamic-toast="async"]');
        
        if (type !== 'async' && existingAsyncToast) {
            existingAsyncToast.setAttribute('data-dynamic-toast', type);
            existingAsyncToast.textContent = text;
            
            // Update width to match new content
            existingAsyncToast.style.width = 'fit-content';
            const newWidth = existingAsyncToast.getBoundingClientRect().width;
            existingAsyncToast.style.width = `${newWidth}px`;
            
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
                existingAsyncToast.style.width = '30px';
                
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

        const dynamicWidth = toastEl.getBoundingClientRect().width;
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