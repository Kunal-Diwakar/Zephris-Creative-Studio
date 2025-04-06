function animation(params) {
    const hero = {
        title: Splitting({
            target: ".hero-title > h1",
            by: "chars",
        }),
        paragraph: document.querySelectorAll(".hero-para-text"),
        medias: gsap.utils.toArray(".hero-media-img"),
        nav: document.querySelector(".nav"),
    };

    const gallery = {
        container: document.querySelector(".hero-hidden"),
        medias: document.querySelectorAll(".hero-hidden-img"),
        button: document.getElementById("hidden"),
    };

    const init = () => {
        gsap.set(".char", { yPercent: 100, display: "inline-block" });
        gsap.set(hero.paragraph, { autoAlpha: 0 });
        gsap.set(hero.medias, { yPercent: 200 });
        gsap.set(hero.nav, { yPercent: -100 });

        animateHere();
    };

    const animateHere = () => {
        const tl = gsap.timeline({
            defaults: {
                duration: 1.0,
                delay: 5,
                ease: "power4.inOut",
                stagger: {
                    each: 0.04,
                    from: "center",
                },
            },
        });

        tl.to(".char", { yPercent: 0 })
            .to(hero.paragraph, { autoAlpha: 1 }, 0)
            .to(hero.medias, { yPercent: 0 }, 0)
            .to(hero.nav, { yPercent: 0 }, 0);

        showGallery();
    };

    const showGallery = () => {
        const selectedParagraph = document.querySelectorAll(
            ".hero-para > span:not(#hidden)"
        );

        const tlGallery = gsap.timeline({
            paused: true,
            defaults: {
                duration: 0.5,
                ease: "power4.inOut"
            }
        });

        gsap.set(gallery.container, { autoAlpha: 0, pointerEvents: "none", });
        gsap.set(gallery.medias, { zIndex: 0 });

        tlGallery.to(['.chars', selectedParagraph, hero.medias, hero.nav], {
            autoAlpha: 0,
            pointerEvents: 'none'
        })
            .to(gallery.container, {
                autoAlpha: 1,
                pointerEvents: 'auto'
            }, 0)

        gsap.to(gallery.medias, {
            repeat: -1,
            zIndex: 1,
            stagger: 0.6,
        });

        gallery.button.addEventListener('mouseenter', () => tlGallery.play());
        gallery.button.addEventListener('mouseleave', () => tlGallery.reverse());

    };

    window.addEventListener("DOMContentLoaded", init);
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


animation();
preloader();
