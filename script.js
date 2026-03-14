function createBinaryLines() {
    const topBinary = document.createElement('div');
    topBinary.className = 'binary-line';
    topBinary.id = 'top-binary';

    const bottomBinary = document.createElement('div');
    bottomBinary.className = 'binary-line';
    bottomBinary.id = 'bottom-binary';

    const header = document.querySelector('.header');

    header.insertBefore(topBinary, header.firstChild);
    header.appendChild(bottomBinary);

    function generateBinary() {
        let binary = '';
        for (let i = 0; i < 100; i++) {
            binary += Math.random() > 0.5 ? '1' : '0';
        }
        return binary;
    }

    function updateBinary() {
        topBinary.textContent = generateBinary();
        bottomBinary.textContent = generateBinary();
    }

    updateBinary();

    setInterval(updateBinary, 200);
}

document.addEventListener('DOMContentLoaded', createBinaryLines);

async function fetchBreakingNews() {
    const meta = document.querySelector('meta[name="newsapi-key"]');
    const apiKey = meta && meta.content && meta.content.trim();
    if (!apiKey) return;

    const marqueeEl = document.querySelector('.marquee-content');
    if (!marqueeEl) return;

    try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=${encodeURIComponent(apiKey)}`;
        const resp = await fetch(url);
        if (!resp.ok) throw new Error('Network response not ok');
        const data = await resp.json();
        if (data && Array.isArray(data.articles) && data.articles.length > 0) {
            const headlines = data.articles.map(a => a.title).filter(Boolean);
            if (headlines.length > 0) {
                const content = 'BREAKING: ' + headlines.join('  //  ');
                marqueeEl.textContent = content;
            }
        }
    } catch (err) {
        console.error('Failed to fetch breaking news:', err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchBreakingNews();
    setInterval(fetchBreakingNews, 5 * 60 * 1000);
});
