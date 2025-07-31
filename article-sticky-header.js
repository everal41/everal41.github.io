document.addEventListener('DOMContentLoaded', () => {
    const stickyHeader = document.getElementById('sticky-header');
    const stickyTitle = document.getElementById('sticky-header-title');
    const stickyProgressBar = document.getElementById('sticky-progress-bar');
    const mainHeader = document.querySelector('.site-header');
    const articleContainer = document.querySelector('.guide-article-container');
    const mainArticleTitle = articleContainer.querySelector('h1'); // Находим главный заголовок H1
    const sections = document.querySelectorAll('.guide-article-container h2[id]');
    const articleEnd = document.getElementById('article-end');

    if (!stickyHeader || !mainHeader || !articleContainer || !mainArticleTitle || sections.length === 0 || !articleEnd) {
        return;
    }

    const mainHeaderHeight = mainHeader.offsetHeight;

    const applyHeaderStyles = (sourceElement) => {
        const styles = window.getComputedStyle(sourceElement);
        stickyTitle.style.color = styles.color;
    };

    const sectionsData = Array.from(sections).map((section, index) => {
        const nextSection = sections[index + 1];
        const endElement = nextSection || articleEnd;
        return {
            element: section,
            title: section.textContent,
            top: section.offsetTop,
            height: endElement.offsetTop - section.offsetTop,
        };
    });

    let activeSection = null;

    const onScroll = () => {
        const scrollY = window.scrollY;
        const containerRect = articleContainer.getBoundingClientRect();
        const containerTop = containerRect.top + scrollY; // Абсолютная позиция контейнера статьи

        // --- Логика фиксации и позиционирования панели ---
        // Панель должна стать "fixed", когда верх контейнера статьи достигает низа шапки
        if (containerRect.top <= mainHeaderHeight) {
            stickyHeader.classList.add('is-fixed');
            stickyHeader.style.left = `${containerRect.left}px`;
            stickyHeader.style.width = `${containerRect.width}px`;
            stickyHeader.style.top = `${mainHeaderHeight}px`;
        } else {
            stickyHeader.classList.remove('is-fixed');
            // Сбрасываем инлайновые стили, чтобы панель вернулась на свое место в потоке документа
            stickyHeader.style.left = '';
            stickyHeader.style.width = '';
            stickyHeader.style.top = '';
        }

        // Показываем панель, как только она входит в область видимости
        if (containerRect.top < window.innerHeight && containerRect.bottom > 0) {
            stickyHeader.classList.add('is-active');
        } else {
            stickyHeader.classList.remove('is-active');
        }

        // --- Логика смены заголовка и прогресс-бара ---
        let currentSection = null;
        for (const section of sectionsData) {
            if (scrollY >= section.top - mainHeaderHeight) {
                currentSection = section;
            }
        }
        
        if (currentSection) {
            // Если мы в зоне действия секции
            if (activeSection !== currentSection) {
                activeSection = currentSection;
                stickyTitle.textContent = activeSection.title;
                applyHeaderStyles(activeSection.element);
            }

            const originalTitleRect = activeSection.element.getBoundingClientRect();
            if (originalTitleRect.top <= mainHeaderHeight) {
                activeSection.element.classList.add('original-h2-hidden');
            } else {
                activeSection.element.classList.remove('original-h2-hidden');
            }

            const pixelsScrolledInSection = scrollY - (activeSection.top - mainHeaderHeight);
            let progress = pixelsScrolledInSection / (activeSection.height - activeSection.element.offsetHeight);
            progress = Math.min(1, Math.max(0, progress));
            stickyProgressBar.style.width = `${progress * 100}%`;
            
        } else {
            // Если мы выше первой секции, показываем главный заголовок статьи
            activeSection = null;
            stickyTitle.textContent = mainArticleTitle.textContent;
            applyHeaderStyles(mainArticleTitle);
            stickyProgressBar.style.width = '0%'; // Сбрасываем прогресс
        }

        sectionsData.forEach(s => {
            if (s !== activeSection) {
                s.element.classList.remove('original-h2-hidden');
            }
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Вызываем функцию один раз при загрузке, чтобы установить начальное состояние
    onScroll();
});