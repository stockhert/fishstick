async function loadLessons() {
    try {
        const response = await fetch('src/Lessons.json');
        return await response.json();
    } catch (error) {
        console.error('Error loading lessons:', error);
        return [];
    }
}

function displayLesson(lesson) {
    const mainContent = document.querySelector('main');
    
    if (!mainContent) {
        console.error('Main content area not found');
        return;
    }
    
    mainContent.innerHTML = `
        <div id="lesson-content">
            <h1>${lesson.title}</h1>
            <div class="lesson-text">
                ${lesson.content}
            </div>
        </div>
    `;
}

async function initializeLessonHandlers() {
    const lessons = await loadLessons();
    const lessonItems = document.querySelectorAll('.expandable_content li');

    lessonItems.forEach((item, index) => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {

            // remove active class from all items vv
            lessonItems.forEach(li => li.classList.remove('active'));
            this.classList.add('active');
            
            const lessonName = this.textContent.trim().toLowerCase().replace(/\s+/g, '_');
            const lesson = lessons.find(lesson => lesson.id === lessonName);
            
            if (lesson) {
                displayLesson(lesson);
            } else {
                console.warn(`Lesson not found for: ${lessonName}`);
            }
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLessonHandlers);
} else {
    initializeLessonHandlers();
}