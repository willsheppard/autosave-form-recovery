/*

Autosave Form Recovery

Autosave every form, no action necessary. Recover the text if it gets lost.

Author: Will Sheppard

*/

const saveEvery = 5; // seconds

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

document.querySelectorAll('input[type=text], textarea').forEach(input => {
    input.addEventListener('input', debounce(event => {
        const data = {};
        data[event.target.name] = event.target.value;

        chrome.storage.local.set(data, () => {
            console.log('Text data saved:', event.target.value);
            console.log('Form name:', input.form ? input.form.name : 'N/A');
            console.log('Form field name:', event.target.name);
            console.log('Page URL:', window.location.href);
        });
    }, saveEvery * 1000)); // debounce time
});
