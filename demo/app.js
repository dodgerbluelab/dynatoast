let activeCode = 0;

// Now you can chain them properly:
async function showToasts() {

    highlightCodeBlock()

    await DynamicToast({
        text: 'This is the DynamicToast',
        type: 'success',
        expanded: 'Please consider writing a thoughtful and clever expansion text.',
        duration: 5000
    }).then(()=> {
        highlightCodeBlock()
    })

    await DynamicToast({
        text: 'Inspired by Apple. Built with joy and passion.',
        duration: 6000
    }).then(()=> {
        highlightCodeBlock()
    })

    await DynamicToast({
        text: 'A new message was recieved',
        type: 'info',
        duration: 5000
    }).then(()=> {
        highlightCodeBlock()
    })

    await DynamicToast({
        text: "Please be aware of your sharing you credentials",
        type: 'warning',
        duration: 2500
    }).then(()=> {
        highlightCodeBlock()
    })
    
    await DynamicToast({
        text: 'Starship experienced a Rapid Unscheduled Disassembly',
        type: 'error',
        duration: 5000
    })


}

function highlightCodeBlock () {
   let codeBlocks = Array.from(document.querySelectorAll('pre'))
   codeBlocks.forEach(block => {
    block.classList.remove('active')
   })
   codeBlocks[activeCode].classList.add('active')
   activeCode++



}

showToasts();
