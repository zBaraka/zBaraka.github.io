document.addEventListener('DOMContentLoaded', function() {
    const correctPassword = 'Angelobot28'; // Ersetze dies durch dein echtes Passwort
    let passwordOverlay;
    let passwordInput;
    let passwordError;

    function createPasswordOverlay() {
        passwordOverlay = document.createElement('div');
        passwordOverlay.id = 'password-overlay';
        passwordOverlay.innerHTML = `
            <div id="password-form">
                <h2>Enter Password</h2>
                <input type="password" id="password-input" placeholder="Password" aria-label="Password input">
                <button id="password-submit">Submit</button>
                <p id="password-error">Incorrect password</p>
            </div>
        `;
        document.body.appendChild(passwordOverlay);
        passwordInput = document.getElementById('password-input');
        const passwordSubmit = document.getElementById('password-submit');
        passwordError = document.getElementById('password-error');

        passwordSubmit.addEventListener('click', checkAndHideOverlay);
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkAndHideOverlay();
            }
        });
    }

    function checkAndHideOverlay() {
        if (passwordInput.value === correctPassword) {
            passwordOverlay.style.display = 'none';
            localStorage.setItem('auth', correctPassword);
        } else {
            passwordError.style.display = 'block';
            passwordInput.value = '';
        }
    }

    function checkAuth() {
        const savedAuth = localStorage.getItem('auth');
        if (savedAuth !== correctPassword) {
            createPasswordOverlay();
            observeOverlay();
        }
    }

    function observeOverlay() {
        const observer = new MutationObserver(function(mutationsList) {
            for (let mutation of mutationsList) {
                if (mutation.removedNodes) {
                    mutation.removedNodes.forEach(node => {
                        if (node.id === 'password-overlay') {
                            // Overlay wurde entfernt, lösche den Rest der Seite
                            document.documentElement.remove();
                            break; // Nicht weiter suchen, da die Seite gelöscht wurde
                        }
                    });
                }
            }
        });

        observer.observe(document.body, { childList: true });
    }

    checkAuth();
});
