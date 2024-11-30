# DynamicToast
 DynamicToast - a lightweight toast system inspired by Apple's Dynamic Island

## Installation:
Add these to your HTML head.

\<link rel="stylesheet" href="`https://cdn.jsdelivr.net/gh/dodgerbluelab/dynatoast@latest/dynamic-toast.min.css`">

\<script src="`https://cdn.jsdelivr.net/gh/dodgerbluelab/dynatoast@latest/dynamic-toast.min.js`"></script>

## Usage: 

Throw a DynamicToast() width a few parameters:

`text: 'Your toast message here'` REQUIRED

`type: 'success', 'info', 'warning', 'error'` OPTIONAL

`duration: 3000 (ms) ` OPTIONAL (Will fallback to 5000)

## Example: 
`DynamicToast({
   text: "I appreciate your support. Thank you.",
   type: 'success',
   duration: 2500
});´`

