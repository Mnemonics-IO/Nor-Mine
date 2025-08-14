document.addEventListener('DOMContentLoaded', function() {
    const components = [
        { id: 'hero-section', url: './Components/hero.html' },
        { id: 'why-section', url: './Components/why-section.html' },
        { id: 'testimonials-section', url: './Components/testimonials.html' },
        { id: 'certified-section', url: './Components/certified.html' },
        { id: 'faq-section', url: './Components/faq.html' },
        { id: 'footer-section', url: './Components/footer.html' }
    ];

    components.forEach(component => {
        fetch(component.url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const links = doc.head.querySelectorAll('link[rel="stylesheet"]');
                links.forEach(link => {
                    const newLink = document.createElement('link');
                    newLink.rel = 'stylesheet';
                    // Adjust the path to be relative to index.html
                    // Assuming all CSS files are in the 'Styling' directory
                    const cssFileName = link.href.substring(link.href.lastIndexOf('/') + 1);
                    newLink.href = `./Styling/${cssFileName}`;
                    document.head.appendChild(newLink);
                });
                // Extract body content, excluding script tags
                const bodyContent = doc.body.innerHTML;
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = bodyContent;

                // Correct image paths
                tempDiv.querySelectorAll('img').forEach(img => {
                    if (img.src.includes('../images/')) {
                        img.src = img.src.replace('../images/', './images/');
                    }
                });

                tempDiv.querySelectorAll('script').forEach(script => script.remove());
                document.getElementById(component.id).innerHTML = tempDiv.innerHTML;
            })
            .catch(error => {
                console.error(`Error loading ${component.id}:`, error);
            });
    });
});