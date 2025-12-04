document.addEventListener('DOMContentLoaded', () => {
    const bootOverlay = document.getElementById('boot-sequence');
    const bootLog = document.getElementById('boot-log');
    const mainContent = document.querySelector('.hidden-content');
    const navbar = document.querySelector('.navbar');

    // Boot Sequence Messages
    const logMessages = [
        "> flutter doctor -v",
        "[✓] Flutter (Channel stable, v3.38.0, on Microsoft Windows)",
        "[✓] Android toolchain - develop for Android devices",
        "[✓] Chrome - develop for the web",
        "> flutter pub get",
        "Resolving dependencies... (1.2s)",
        "> flutter run -d chrome --release",
        "Compiling lib/main.dart for the Web...",
        "Connecting to VM Service at ws://127.0.0.1:55555/ws",
    ];

    let delay = 0;
    const messageDelay = 150; // ms between messages

    // Run Boot Sequence
    logMessages.forEach((msg, index) => {
        setTimeout(() => {
            const p = document.createElement('div');
            p.textContent = msg;
            bootLog.appendChild(p);
            bootLog.scrollTop = bootLog.scrollHeight;

            // If last message, trigger reveal
            if (index === logMessages.length - 1) {
                setTimeout(revealContent, 800);
            }
        }, delay);
        delay += messageDelay + (Math.random() * 100); // Add some randomness
    });

    function revealContent() {
        bootOverlay.style.transition = 'opacity 0.5s ease-out';
        bootOverlay.style.opacity = '0';

        setTimeout(() => {
            bootOverlay.style.display = 'none';
            mainContent.classList.add('visible');
            navbar.classList.add('visible');

            // Trigger Text Reveals
            animateTextReveal(document.getElementById('hero-name'));
            setTimeout(() => {
                animateTextReveal(document.getElementById('hero-title'));
            }, 500);
        }, 500);
    }

    // Matrix/Binary Text Reveal Effect
    function animateTextReveal(element) {
        const finalText = element.getAttribute('data-final');
        const chars = "010101010101010101"; // Binary theme
        const duration = 1500;
        const interval = 50;
        const steps = duration / interval;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const revealedLength = Math.floor(finalText.length * progress);

            let currentText = finalText.substring(0, revealedLength);

            // Add random chars for the rest
            for (let i = revealedLength; i < finalText.length; i++) {
                currentText += chars[Math.floor(Math.random() * chars.length)];
            }

            element.textContent = currentText;

            if (step >= steps) {
                clearInterval(timer);
                element.textContent = finalText; // Ensure final text is clean
            }
        }, interval);
    }

    // Mouse Spotlight Effect
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        document.body.style.setProperty('--cursor-x', x + 'px');
        document.body.style.setProperty('--cursor-y', y + 'px');
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
