// JavaScript for CP363 Database Course

// Function to generate table of contents
document.addEventListener('DOMContentLoaded', function() {
    // Check if table of contents element exists
    const tocElement = document.getElementById('table-of-contents');
    if (!tocElement) return;

    // Get all headings in the lesson content
    const lessonContent = document.querySelector('.lesson-content');
    if (!lessonContent) return;

    // If table of contents is already populated, don't regenerate
    if (tocElement.querySelector('ul')) return;

    const headings = lessonContent.querySelectorAll('h3[id], h4[id], h5[id]');
    if (headings.length === 0) return;

    // Create the table of contents
    const toc = document.createElement('ul');
    let currentLevel = 3;
    let currentList = toc;
    let parentList = null;

    headings.forEach(heading => {
        const level = parseInt(heading.tagName.charAt(1));
        const text = heading.textContent;
        const id = heading.id;

        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${id}`;
        link.textContent = text;
        listItem.appendChild(link);

        if (level > currentLevel) {
            // Create a new nested list
            const nestedList = document.createElement('ul');
            currentList.lastChild.appendChild(nestedList);
            parentList = currentList;
            currentList = nestedList;
        } else if (level < currentLevel) {
            // Go back to parent list
            currentList = parentList || toc;
        }

        currentList.appendChild(listItem);
        currentLevel = level;
    });

    tocElement.appendChild(toc);
});

// Function to highlight active section in table of contents
window.addEventListener('scroll', function() {
    const headings = document.querySelectorAll('.lesson-content h3[id], .lesson-content h4[id], .lesson-content h5[id]');
    const tocLinks = document.querySelectorAll('#table-of-contents a');
    
    if (headings.length === 0 || tocLinks.length === 0) return;

    // Find the current section
    let currentSection = '';
    for (let i = 0; i < headings.length; i++) {
        const heading = headings[i];
        const rect = heading.getBoundingClientRect();
        
        // If the heading is in the viewport or above it
        if (rect.top <= 100) {
            currentSection = heading.id;
        } else {
            break;
        }
    }

    // Highlight the current section in the table of contents
    if (currentSection) {
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
});

// Function to handle smooth scrolling for anchor links
document.addEventListener('click', function(event) {
    if (event.target.tagName === 'A' && event.target.getAttribute('href').startsWith('#')) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
});

// Function to create image placeholders for MySQL Workbench tutorial
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the lesson1 page
    if (!document.querySelector('.lesson-content')) return;
    
    // Find all image containers without actual images
    const emptyImageContainers = Array.from(document.querySelectorAll('.image-container')).filter(container => {
        const img = container.querySelector('img');
        return img && (!img.src || img.src.includes('images/mysql_') || img.src.endsWith('png'));
    });
    
    // Replace with placeholder divs
    emptyImageContainers.forEach(container => {
        const img = container.querySelector('img');
        const caption = container.querySelector('.image-caption');
        
        if (img && caption) {
            const captionText = caption.textContent;
            const className = getPlaceholderClass(captionText);
            
            // Create placeholder div
            const placeholder = document.createElement('div');
            placeholder.className = className;
            
            // Add heading and description
            const heading = document.createElement('h4');
            heading.textContent = captionText;
            
            const description = document.createElement('p');
            description.textContent = 'Screenshot will be displayed here';
            
            placeholder.appendChild(heading);
            placeholder.appendChild(description);
            
            // Replace image with placeholder
            img.replaceWith(placeholder);
        }
    });
    
    // Helper function to determine placeholder class based on caption
    function getPlaceholderClass(caption) {
        caption = caption.toLowerCase();
        
        if (caption.includes('download')) return 'mysql-download';
        if (caption.includes('interface')) return 'mysql-interface';
        if (caption.includes('connection')) return 'mysql-connection';
        if (caption.includes('schema')) return 'mysql-schema';
        if (caption.includes('table')) return 'mysql-table';
        if (caption.includes('query')) return 'mysql-query';
        if (caption.includes('data')) return 'mysql-data';
        
        return 'mysql-interface'; // Default
    }
});

// Function to add syntax highlighting to SQL code examples
document.addEventListener('DOMContentLoaded', function() {
    const sqlExamples = document.querySelectorAll('.sql-example pre');
    
    sqlExamples.forEach(example => {
        const code = example.textContent;
        const highlightedCode = highlightSQL(code);
        example.innerHTML = highlightedCode;
    });
    
    function highlightSQL(code) {
        // Simple SQL syntax highlighting
        return code
            .replace(/\b(SELECT|FROM|WHERE|JOIN|ON|GROUP BY|ORDER BY|HAVING|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|TABLE|DATABASE|INDEX|VIEW|PROCEDURE|FUNCTION|TRIGGER|AS|AND|OR|NOT|NULL|IS|IN|BETWEEN|LIKE|LIMIT|OFFSET|ASC|DESC|DISTINCT|COUNT|SUM|AVG|MIN|MAX)\b/gi, '<span class="keyword">$1</span>')
            .replace(/('.*?'|".*?")/g, '<span class="string">$1</span>')
            .replace(/\b(\d+)\b/g, '<span class="number">$1</span>')
            .replace(/(--.*$)/gm, '<span class="comment">$1</span>');
    }
});

// Function to make tables responsive
document.addEventListener('DOMContentLoaded', function() {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-responsive';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });
});

// Function to add "Back to Top" button
document.addEventListener('DOMContentLoaded', function() {
    const main = document.querySelector('main');
    if (!main) return;
    
    const backToTopButton = document.createElement('button');
    backToTopButton.id = 'back-to-top';
    backToTopButton.innerHTML = '&uarr;';
    backToTopButton.title = 'Back to Top';
    main.appendChild(backToTopButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add styles for the button
    const style = document.createElement('style');
    style.textContent = `
        #back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #4b2e83;
            color: white;
            border: none;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        #back-to-top.visible {
            opacity: 0.7;
        }
        
        #back-to-top:hover {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});
