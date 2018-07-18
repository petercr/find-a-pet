export function isValidZip(zip) {
    return /^\d{5}(-d\{4})?$/.test(zip);
}

// Display Alert Message
export function alertMessage(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));

    // get container
    const container = document.querySelector('.container');
    // get form
    const form = document.querySelector('#pet-form');
    // insert alert
    container.insertBefore(div, form);

    setTimeout(() => document.querySelector('.alert').remove(), 3000);


}