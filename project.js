function animation() {
    gsap.registerPlugin(ScrollTrigger);

    let lenis;

    const initItems = () => {
        lenis = new Lenis({
            smoothWheel: true,
            smoothTouch: true,
        });

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        lenis.scrollTo(0, { immediate: true });

        initScrollTrigger();
    }

    const initScrollTrigger = () => {
        const hero = document.querySelector('.hero');
        const nav = document.querySelector('.nav');
        const images = document.querySelectorAll('.gallery-row-media-img');

        gsap.utils.toArray(images).forEach((image) => {
            gsap.set(image, { scale: 1.2 });

            const imageRect = image.getBoundingClientRect();
            const heightDifference = imageRect.height - image.parentElement.offsetHeight;

            gsap.fromTo(image, {
                y: -heightDifference,
            },
                {
                    scrollTrigger: {
                        trigger: image,
                        start: "top center+=30%",
                        end: "bottom+=10% top",
                        scrub: true,
                    },
                    y: heightDifference,
                    ease: "none",
                });

            const tlHero = gsap.timeline({
                scrollTrigger: {
                    trigger: hero,
                    start: "top top",
                    end: "center top",
                    scrub: true,
                },
            });

            tlHero.to([hero, nav], {
                autoAlpha: 0,
            })
        });
    };


    window.onload = () => {
        initItems()
    }
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

animation()
preloader()
