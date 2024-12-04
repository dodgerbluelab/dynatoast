function highlightCodeBlock(element) {
    document.querySelectorAll('[data-dynamic-toast]').forEach(item => item.remove())
    element.style.boxShadow = '0 0 0 2px #fff, 0 0 0 4px dodgerblue';
    setTimeout(() => {
        element.style.boxShadow = 'none';
    }, 3000);
}



async function saveThis() {

    DynamicToast({
        text: "Saving your stuff",
        type: "async"
    });

    try {
        // Simulate API call with a delay
        await new Promise(resolve => setTimeout(resolve, 3000));
        
    } catch (error) {
        DynamicToast({
            text: "Failed to save",
            type: "error",
            timer: 4000
        });
    }
}


function initializeClickableExamples() {
    const examples = [

        // Wave Example
        () => DynamicToast({
            text: 'Hi there! Wanna see something cool?',
            type: 'emoji:👋',
            timer: 3000
        }),

        // Example 1
        () => DynamicToast({
            text: 'Check out our new features!',
            type: 'info',
            timer: 3000
        }),

        // Example 2
        () => DynamicToast({
            text: 'You are running low of tokens',
            type: 'warning',
            expanded: 'Based on you current you will need to purchase more tokens immediately!',
            timer: 6000
        }),

        // Example 3
        () => DynamicToast({
            text: 'Failed to connect to the server',
            type: 'error',
            expanded: 'Please check your internet connection and try again.',
            timer: 5000
        }),

        // Example 4
        () => DynamicToast({
            text: 'Your profile has been updated',
            type: 'success',
            timer: 3000
        }),

        // Example 5
        () => DynamicToast({
            text: 'New message from John',
            type: 'info',
            expanded: 'Hey, are we still meeting today?',
            timer: 4000
        }),

        // Example 6
        () => {
            saveThis()
                .then(() => {
                    DynamicToast({
                        text: "Successfully saved!",
                        type: "success",
                        timer: 2000
                    }).then(() => {
                        DynamicToast({
                            text: 'You just saw a few async DynamicToast-calls',
                            type: "info",
                            timer: 5000
                        })
                    })
            
                });
        }
    ];

    document.querySelectorAll('.example').forEach((pre, index) => {
        pre.title = 'Click to run this example';
        
        pre.addEventListener('mouseenter', () => {
            pre.style.opacity = '0.8';
        });
        
        pre.addEventListener('mouseleave', () => {
            pre.style.opacity = '1';
        });
        
        pre.addEventListener('click', (e) => {
            highlightCodeBlock(e.currentTarget);
            examples[index]();
        });
    });
}

initializeClickableExamples()

DynamicToast({
    type: 'emoji:👋',
    text: 'Hi there! This is a DynamicToast',
    expanded: 'Check out the documentation and get started!'
})