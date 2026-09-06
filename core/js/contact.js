document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const title = document.getElementById('contactTitle');
    const recipientLabel = document.getElementById('contactRecipient');
    const error = document.getElementById('contactError');
    const newButton = document.getElementById('newContactBtn');
    const recipients = {
        'pavybeloiu@gmail.com': 'Pavy',
        'eluchn@proton.me': 'Eluchn'
    };
    const recipient = new URLSearchParams(window.location.search).get('to') || '';
    const recipientName = recipients[recipient];
    const draftKey = 'simezaContactDraft:' + recipient;

    const saveDraft = () => {
        if (!form || !recipientName) return;
        const fields = new FormData(form);
        localStorage.setItem(draftKey, JSON.stringify(Object.fromEntries(fields.entries())));
    };

    const restoreDraft = () => {
        if (!form || !recipientName) return;
        try {
            const draft = JSON.parse(localStorage.getItem(draftKey)) || {};
            ['name', 'phone', 'subject', 'message'].forEach((name) => {
                if (typeof draft[name] === 'string') form.elements[name].value = draft[name];
            });
            if (!form.elements.subject.value.trim()) form.elements.subject.value = 'Simeza Contact Message';
        } catch (error) {
            localStorage.removeItem(draftKey);
        }
    };

    const showError = (message) => {
        error.textContent = message;
        error.hidden = false;
    };

    const clearError = () => {
        error.hidden = true;
        error.textContent = '';
    };

    const close = () => {
        const lang = localStorage.getItem('lang') || 'en';
        location.href = '/' + lang + '/about.html';
    };

    if (recipientName) {
        title.textContent = 'Contact ' + recipientName;
        recipientLabel.textContent = recipient;
        restoreDraft();
    } else {
        showError('Choose a contact from the About page.');
    }

    document.getElementById('closeContactBtn')?.addEventListener('click', close);
    document.getElementById('closeContactAction')?.addEventListener('click', close);
    form?.addEventListener('input', saveDraft);

    newButton?.addEventListener('click', () => {
        form.elements.subject.value = 'Simeza Contact Message';
        form.elements.message.value = '';
        saveDraft();
        clearError();
        form.elements.subject.focus();
    });

    form?.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!recipientName) return;
        clearError();
        if (!form.reportValidity()) return;

        const fields = new FormData(form);
        const phone = String(fields.get('phone')).trim();
        const phoneDigits = phone.replace(/\D/g, '');
        const phoneIsValid = !phone || (phoneDigits.length >= 7 && phoneDigits.length <= 15 && /^[0-9+().\s-]+$/.test(phone));
        if (!phoneIsValid) {
            showError('Enter a valid phone number or leave it blank.');
            form.elements.phone.focus();
            return;
        }
        saveDraft();
        const body = [
            'Name: ' + fields.get('name'),
            'Phone: ' + (fields.get('phone') || 'Not provided'),
            '',
            fields.get('message')
        ].join('\n');
        const mailtoUrl = 'mailto:' + encodeURIComponent(recipient) + '?subject=' + encodeURIComponent(fields.get('subject')) + '&body=' + encodeURIComponent(body);
        location.href = mailtoUrl;
    });
});
