document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    // Highlight.js initialization
    hljs.highlightAll();

    // Sample data - replace with your actual content
    const videos = [
        {
            id: 1,
            title: "Survival Game Run",
            description: "Learn how to scrape websites using BeautifulSoup",
            thumbnail: "https://i.ytimg.com/vi/example1/maxresdefault.jpg",
            url: "https://youtube.com/shorts/X6fCFC_wy2o?si=yXNBcimK1RkrffA6",
            language: "python"
        },
        {
            id: 2,
            title: "JavaScript DOM Manipulation",
            description: "Master the Document Object Model in JS",
            thumbnail: "https://i.ytimg.com/vi/example2/maxresdefault.jpg",
            url: "https://youtube.com/watch?v=example2",
            language: "javascript"
        },
        {
            id: 3,
            title: "CSS Grid Layout Tutorial",
            description: "Complete guide to CSS Grid",
            thumbnail: "https://i.ytimg.com/vi/example3/maxresdefault.jpg",
            url: "https://youtube.com/watch?v=example3",
            language: "html"
        }
    ];

    const codeSnippets = [
        {
            id: 1,
            title: "Web Scraper.py",
            description: "Python script to scrape website data",
            code: `import requests
from bs4 import BeautifulSoup

url = 'https://example.com'
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Extract all links
for link in soup.find_all('a'):
    print(link.get('href'))`,
            language: "python",
            videoId: 1
        },
        {
            id: 2,
            title: "DOM Event Handler.js",
            description: "JavaScript event handling example",
            code: `document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
});`,
            language: "javascript",
            videoId: 2
        },
        {
            id: 3,
            title: "Grid Layout.css",
            description: "CSS Grid template example",
            code: `.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
}

.grid-item {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}`,
            language: "css",
            videoId: 3
        }
    ];

    // Load videos
    const videoContainer = document.getElementById('video-container');
    
    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
            <a href="${video.url}" target="_blank">
                <div class="video-thumbnail">
                    <img src="${video.thumbnail}" alt="${video.title}">
                </div>
                <div class="video-info">
                    <h3>${video.title}</h3>
                    <p>${video.description}</p>
                </div>
            </a>
        `;
        videoContainer.appendChild(videoCard);
    });

    // Load code snippets
    const codeContainer = document.getElementById('code-container');
    
    function renderCodeSnippets(lang = 'all') {
        codeContainer.innerHTML = '';
        
        const filteredSnippets = lang === 'all' 
            ? codeSnippets 
            : codeSnippets.filter(snippet => snippet.language === lang);
        
        filteredSnippets.forEach(snippet => {
            const codeCard = document.createElement('div');
            codeCard.className = 'code-card';
            codeCard.innerHTML = `
                <div class="code-header">
                    <h3>${snippet.title}</h3>
                    <div class="code-actions">
                        <button class="copy-btn" data-code="${snippet.id}">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                        <a href="https://youtube.com/watch?v=example${snippet.videoId}" target="_blank">
                            <i class="fas fa-video"></i> Video
                        </a>
                    </div>
                </div>
                <div class="code-content">
                    <pre><code class="language-${snippet.language}">${snippet.code}</code></pre>
                </div>
            `;
            codeContainer.appendChild(codeCard);
        });
        
        // Re-highlight code blocks
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
        
        // Add copy functionality
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const snippetId = this.getAttribute('data-code');
                const snippet = codeSnippets.find(s => s.id == snippetId);
                navigator.clipboard.writeText(snippet.code);
                
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });
        });
    }
    
    // Initial render
    renderCodeSnippets();
    
    // Tab filtering
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const lang = this.getAttribute('data-lang');
            renderCodeSnippets(lang);
        });
    });
    
    // Search functionality
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('code-search');
    
    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredSnippets = codeSnippets.filter(snippet => 
            snippet.title.toLowerCase().includes(searchTerm) || 
            snippet.description.toLowerCase().includes(searchTerm)
        );
        
        codeContainer.innerHTML = '';
        
        filteredSnippets.forEach(snippet => {
            const codeCard = document.createElement('div');
            codeCard.className = 'code-card';
            codeCard.innerHTML = `
                <div class="code-header">
                    <h3>${snippet.title}</h3>
                    <div class="code-actions">
                        <button class="copy-btn" data-code="${snippet.id}">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                        <a href="https://youtube.com/watch?v=example${snippet.videoId}" target="_blank">
                            <i class="fas fa-video"></i> Video
                        </a>
                    </div>
                </div>
                <div class="code-content">
                    <pre><code class="language-${snippet.language}">${snippet.code}</code></pre>
                </div>
            `;
            codeContainer.appendChild(codeCard);
        });
        
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navMenu.style.display = 'none';
            }
        });
    });
});
