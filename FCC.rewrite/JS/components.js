document.addEventListener("DOMContentLoaded", function() {
    // Load header
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
        });

    // Load hero
    fetch('components/hero.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('hero-container').innerHTML = data;
        });

    // Load footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });
});