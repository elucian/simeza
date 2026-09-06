document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const title = document.getElementById('contactTitle');
    const error = document.getElementById('contactError');
    const recipients = {
        'pavybeloiu@gmail.com': 'Pavy',
        'eluchn@proton.me': 'Eluchn'
    };
    const recipient = new URLSearchParams(window.location.search).get('to') || '';
    const recipientName = recipients[recipient];

    const close = () => {
        const lang = localStorage.getItem('lang') || 'en';
        const slugs = {
            en: 'about.html', ro: 'despre.html', de: 'ueber-uns.html', fr: 'a-propos.html',
            es: 'sobre-nosotros.html', ru: 'o-nas.html', pt: 'sobre.html', hu: 'rolunk.html', it: 'chi-siamo.html'
        };
        location.href = '/' + lang + '/' + (slugs[lang] || 'about.html');
    };

    if (recipientName) {
        title.textContent = 'Contact ' + recipientName;
    } else {
        error.hidden = false;
        error.textContent = 'Choose a contact from the About page.';
    }

    document.getElementById('closeContactBtn')?.addEventListener('click', close);
    document.getElementById('closeContactAction')?.addEventListener('click', close);

    form?.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!recipientName) return;
        if (!form.reportValidity()) return;

        const fields = new FormData(form);
        const body = [
            'Name: ' + fields.get('name'),
            'Email: ' + fields.get('email'),
            'Phone: ' + (fields.get('phone') || 'Not provided'),
            '',
            fields.get('message')
        ].join('\n');
        location.href = 'mailto:' + encodeURIComponent(recipient) + '?subject=' + encodeURIComponent(fields.get('subject')) + '&body=' + encodeURIComponent(body);
    });
});
