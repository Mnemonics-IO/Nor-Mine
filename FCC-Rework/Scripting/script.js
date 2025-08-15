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


                    const cssFileName = link.href.substring(link.href.lastIndexOf('/') + 1);
                    newLink.href = `./Styling/${cssFileName}`;
                    document.head.appendChild(newLink);
                });
                
                const bodyContent = doc.body.innerHTML;
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = bodyContent;

                
                tempDiv.querySelectorAll('img').forEach(img => {
                    let originalSrc = img.getAttribute('src');
                    if (originalSrc && originalSrc.startsWith('../images/')) {
                        img.src = originalSrc.replace('../images/', './images/');
                    } else if (originalSrc && originalSrc.startsWith('./images/')) {
                        img.src = originalSrc;
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