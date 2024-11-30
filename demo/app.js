function highlightCodeBlock(clickedElement) {
    const codeBlocks = Array.from(document.querySelectorAll('.doc-wrapper pre'));
    codeBlocks.forEach(block => {
        block.classList.remove('active');
    });
    clickedElement.classList.add('active');
}




async function saveThis() {

    DynamicToast({
        text: "Saving your stuff",
        type: "async"
    });

    try {
        // Simulate API call with a delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
    } catch (error) {
        DynamicToast({
            text: "Failed to save",
            type: "error",
            duration: 4000
        });
    }
}


function initializeClickableExamples() {
    const examples = [
        // Example 1
        () => DynamicToast({
            text: 'Check out our new features!',
            type: 'info',
            duration: 4000
        }),

        // Example 2
        () => DynamicToast({
            text: 'You are running low of tokens',
            type: 'warning',
            expanded: 'Based on you current you will need to purchase more tokens immediately!',
            duration: 5000
        }),

        // Example 3
        () => DynamicToast({
            text: 'Failed to connect to the server',
            type: 'error',
            expanded: 'Please check your internet connection and try again',
            duration: 6000
        }),

        // Example 4
        () => DynamicToast({
            text: 'Your profile has been updated',
            type: 'success',
            duration: 3000
        }),

        // Example 5
        () => DynamicToast({
            text: 'New message from John',
            type: 'info',
            expanded: 'Hey, are we still meeting today?',
            duration: 4000
        }),

        // Example 6
        () => {
            saveThis()
                .then(() => {
                    DynamicToast({
                        text: "Successfully saved!",
                        type: "success",
                        duration: 3000
                    })
                        .then(() => {
                            DynamicToast({
                                text: 'You just saw an async DynamicToast-call',
                                expanded: 'Use an async function; if the callback is succesful, then add a new. This will automatically update the latter.',
                                duration: 8000
                            })
                        })
                })
        }
    ];

    document.querySelectorAll('.doc-wrapper pre').forEach((pre, index) => {
        pre.style.cursor = 'pointer';
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

// Call this after your HTML is rendered
initializeClickableExamples();