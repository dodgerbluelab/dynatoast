# DynamicToast
 DynamicToast - a lightweight toast system inspired by Apple's Dynamic Island

## Installation:
Add these to your HTML head.

\<link rel="stylesheet" href="`https://cdn.jsdelivr.net/gh/dodgerbluelab/dynatoast@latest/dt.css`">

\<script src="`https://cdn.jsdelivr.net/gh/dodgerbluelab/dynatoast@latest/dt.js`"></script>

## Usage: 

Throw a DynamicToast() width a few parameters:

`text: 'Your toast message here'` REQUIRED

`expanded: 'Addtional info here'` OPTIONAL

`type: 'success', 'info', 'warning', 'error', 'async'` OPTIONAL

`duration: 3000 (ms) ` OPTIONAL (Will fallback to 5000)

## Example: 
`DynamicToast({
   text: "I appreciate your support. Thank you.",
   type: 'success',
   duration: 2500
});´`

