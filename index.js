document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const navBar = document.querySelector('nav');
    const sections = Array.from(document.querySelectorAll('section')); 
    let sectionOffsets = [0, ...sections.map(section => section.offsetTop)]; 
    const getCurrentIndex = (scrollTop) => {
        for (let i = 1; i < sectionOffsets.length; i++) {
            if (scrollTop < sectionOffsets[i]) {
                return i - 1;
            }
        }
        return sectionOffsets.length - 1;
    };

    let ticking = false;
    const updateNav = () => {
        const scrollTop = window.pageYOffset;
        const currentIndex = getCurrentIndex(scrollTop);

        navLinks.forEach((link, index) => {
            link.classList.toggle('active', index === currentIndex);
        });

        if (navBar) {
            navBar.classList.toggle('scrolled', currentIndex > 0);
        }

        console.log('ScrollTop:', scrollTop, 'CurrentIndex:', currentIndex, '(0=HOME,4=CONTACT)', 'Offsets:', sectionOffsets);

        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNav);
            ticking = true;
        }
    });

    updateNav();


    window.addEventListener('resize', () => {
        sectionOffsets = [0, ...sections.map(section => section.offsetTop)];
        updateNav();
    });
});