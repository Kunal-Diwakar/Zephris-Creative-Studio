function animation() {
    function initanimation() {
        gsap.registerPlugin(ScrollTrigger);

        const videoContainer = document.querySelector('.video-container-desktop');

        if (!videoContainer) {
            console.error('Could not find video container');
            return;
        }

        let isScrolled = false;

        // Scroll animation
        gsap.fromTo(videoContainer,
            {
                y: '-120vh',
                scale: 0.25,
            },
            {
                y: '0%',
                scale: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".intro",
                    start: "top bottom",
                    end: "top 10%",
                    scrub: 1.5,
                    onEnter: () => {
                        // Reset x position when scroll starts
                        isScrolled = true;
                        gsap.to(videoContainer, {
                            duration: 0.5,
                            x: 0,
                            ease: "power2.out"
                        });
                    },
                    onLeaveBack: () => {
                        isScrolled = false;
                    }
                }
            }
        );

        // Mouse movement
        let xPosition = 0;

        document.addEventListener('mousemove', (e) => {
            if (isScrolled) return; // Skip if scrolled

            xPosition = (e.clientX - window.innerWidth / 2) * 0.6;

            gsap.to(videoContainer, {
                duration: 0.5,
                x: xPosition,
                ease: "power1.out"
            });
        });

        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        lenis.on("scroll", ScrollTrigger.update);
    }

    document.addEventListener("DOMContentLoaded", initanimation);
}

function text() {
    gsap.registerPlugin(ScrollTrigger);
    
    const copies = document.querySelectorAll(".copy");

    function setupSplits() {
        // First, create the splits
        copies.forEach((copy) => {
            const split = new SplitType(copy, {
                types: 'lines',
                lineClass: 'split-line'
            });

            // Wrap lines in a div for better overflow control
            split.lines.forEach(line => {
                const wrapper = document.createElement('div');
                wrapper.classList.add('line-wrapper');
                line.parentNode.insertBefore(wrapper, line);
                wrapper.appendChild(line);
            });

            // Set initial state
            gsap.set(split.lines, {
                yPercent: 100,
                opacity: 0,
            });

            // Create animation
            gsap.to(split.lines, {
                scrollTrigger: {
                    trigger: copy,
                    toggleActions: "play none none none",
                    start: "top 80%",
                },
                yPercent: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out",
            });
        });
    }

    // Add required CSS
    const style = document.createElement('style');
    style.textContent = `
        .line-wrapper {
            overflow: hidden;
            padding: 2px 0;
        }
        .split-line {
            display: inline-block;
        }
    `;
    document.head.appendChild(style);

    setupSplits();

    // Handle resize
    window.addEventListener('resize', setupSplits);
}

function preloader() {
    const counter = document.querySelector(".counter");
    const preloader = document.querySelector(".preloader");

    const milestones = [0, 15, 30, 45, 60, 75, 95, 100];
    let currentIndex = 0;

    const updateCounter = () => {
        if (currentIndex < milestones.length) {
            counter.textContent = milestones[currentIndex];
            currentIndex++;
            setTimeout(updateCounter, 400);
        } else {
            gsap.to(preloader, {
                duration: 2,
                y: "-100%",
                ease: "power4.inOut",
            });
        }
    };

    window.addEventListener("load", updateCounter);
}

preloader()
animation()
text()