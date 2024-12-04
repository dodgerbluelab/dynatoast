async function DynamicToast({text, type, timer, expanded,actions}) {

    let isMobile = window.innerWidth < 480;

    return new Promise((resolve) => {
        let duration = timer ? timer : 5000;
        let remainingTime = duration;
        let startTime;
        let timeoutId;
        let isPaused = false;

        type = type === undefined ? 'default' : type;
        type.toLowerCase()
        

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

        if (type.includes('emoji')) { 
            let emoji = type.split(':')[1].trim()
            toastEl.setAttribute('data-dynamic-toast-emoji', emoji);
            toastEl.setAttribute('data-dynamic-toast', 'emoji'); 
        }

        // if (actions) {
        //     toastEl.setAttribute('data-dynamic-toast', 'action');
        //     handleActions(actions, toastEl);
        // }
    

        let dynamicWidth = '420px'

        if (isMobile) {
            dynamicWidth = 'calc(100vw - 16px)'
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

        async function dismissToast() {
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

        // function handleActions(actions, toastEl) {
        //     const actionWrapper = document.createElement('div');
        //     actionWrapper.setAttribute('data-toast-actions', '')
         
        //     function createButton(action) {
        //         const actionName = Object.entries(actions).find(([_, value]) => value === action)?.[0];
        //         const button = document.createElement('button');
        //         button.setAttribute('data-toast-action', actionName)
        //         button.textContent = action.cta;
        //         button.onclick = () => {
        //             dismissToast().then(() => {
        //                 action.handler();
        //             })
        //         };
        //         return button;
        //     }
         
        //     actionWrapper.appendChild(createButton(actions.decline));
        //     actionWrapper.appendChild(createButton(actions.accept));
        //     toastEl.appendChild(actionWrapper);
        //  }

        if (type !== 'async' && !actions) {
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

        document.body.appendChild(toastEl);
    });

}
