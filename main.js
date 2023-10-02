// TODO
// - Add 3d effect like -> https://www.artalents.it/
// - Add shine effect ✅


gsap.registerPlugin(MotionPathPlugin);
const tl = gsap.timeline();
const duration = 10;

tl
.to(".circle", {
    repeat: -1,
    duration: duration,
    ease: Sine.easeOut,
    motionPath: {
        path: ".path",
        align: ".path",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: 0.5,
        end: 0.5,
    },
    onRepeat: showCircle,
    onStart: showCircle
});

function showCircle() {
    let tl = gsap.timeline({
        defaults: {
            ease: Power3.easeInOut,
            duration: 0.8,
        }
    });
    
    tl
    .fromTo(".circle", {
        autoAlpha: 0, 
        scale: 0
    }, {
        delay: () => duration / 9 , 
        autoAlpha: 1, 
        scale: 1
    })
    .to(".circle", {
        autoAlpha: 0, 
        scale: 0, 
        onComplete: function() {
            tl.kill();
            tl = null;
        }
    }, ">15%");
}


// Mouse Move
mouseMoveSVG();

function mouseMoveSVG() {
    const section = document.querySelector("section");
    const svg = document.querySelector("svg");
    
    const ease = Power3.easeOut;
    const speed = 0.8;
    const rotX = gsap.quickTo(svg, "rotationX", {duration: speed, ease: ease});
    const rotY = gsap.quickTo(svg, "rotationY", {duration: speed, ease: ease});
    const transX = gsap.quickTo(svg, "x", {duration: speed, ease: ease});
    const transY = gsap.quickTo(svg, "y", {duration: speed, ease: ease});
    
    section.addEventListener("mousemove", function(e) {
        const x = ((e.clientX / window.innerWidth) - 0.5) * 20;
        const y = ((e.clientY / window.innerHeight) - 0.5) * 10;
    
        rotX(-y);
        rotY(x);
        transX(x * 3);
        transY(y);
    });
}