document.addEventListener('DOMContentLoaded', () => {
    const copyEmail = async (email) => {
        if (!email) return false;
        try {
            await navigator.clipboard.writeText(email);
            return true;
        } catch (error) {
            const input = document.createElement('textarea');
            input.value = email;
            input.setAttribute('readonly', '');
            input.style.position = 'fixed';
            input.style.opacity = '0';
            document.body.appendChild(input);
            input.select();
            const copied = document.execCommand('copy');
            input.remove();
            return copied;
        }
    };

    document.querySelectorAll('.about-contact-btn[data-email]').forEach((link) => {
        link.addEventListener('click', () => {
            void copyEmail(link.dataset.email).then((copied) => {
                if (copied) link.title = 'Email address copied';
            });
        });
    });
});
