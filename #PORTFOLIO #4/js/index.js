document.addEventListener('DOMContentLoaded', () => {
    const responsiveMenu = document.querySelector(".responsiveMenu");
    const resMenuBtn = document.querySelector(".resMenuBtn");
    const resMenuExit = document.querySelector(".resMenuExit");
    const main = document.querySelector("main");
    const headerLogo = document.querySelector("header img");

    // ================================================================================

    const swiperWrapper = document.querySelector(".swiper-wrapper");
    const prevBtn = document.querySelector(".prevBtn");
    const nextBtn = document.querySelector(".nextBtn");

    prevBtn.addEventListener("click", function () {
        swiperWrapper.classList.remove("active");
    })

    nextBtn.addEventListener("click", function () {
        swiperWrapper.classList.add("active");
    })


    // ================================================================================

    if (headerLogo) {
        document.addEventListener("mousemove", (e) => {
            const rect = headerLogo.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;
            // Limit tilt angle to ±15deg
            const maxTilt = 25;
            const tiltX = Math.max(-maxTilt, Math.min(maxTilt, dy / 10));
            const tiltY = Math.max(-maxTilt, Math.min(maxTilt, -dx / 10));
            headerLogo.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

            headerLogo.style.opacity = "1";
            headerLogo.style.scale = "1";
        });

        document.addEventListener("mouseleave", () => {
            headerLogo.style.transform = "";
            headerLogo.style.scale = "0.8";
            headerLogo.style.opacity = "0.5";
        });

        headerLogo.addEventListener("click", () => {
            window.location.href = "index.html"
        });
    }

    // ================================================================================

    if (responsiveMenu && resMenuBtn && resMenuExit && main) {
        resMenuBtn.addEventListener("click", function () {
            responsiveMenu.classList.add("active");
            main.classList.add("active");
        });

        resMenuExit.addEventListener("click", function () {
            responsiveMenu.classList.remove("active");
            main.classList.remove("active");
        });
    }

    // ================================================================================

    var canvas = document.querySelector('canvas');
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
    letters = letters.split('');
    var fontSize = 10,
        columns = Math.floor(canvas.width / fontSize);
    var drops = [];
    for (var i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    // Track mouse position
    var mouse = { x: -1000, y: -1000 };
    canvas.addEventListener('mousemove', function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    canvas.addEventListener('mouseleave', function () {
        mouse.x = -1000;
        mouse.y = -1000;
    });

    // Animation timing control
    var lastTime = 0;
    var speed = 40; // ms between drops (lower = faster)

    function draw(now) {
        if (!lastTime) lastTime = now;
        var delta = now - lastTime;
        if (delta > speed) {
            ctx.fillStyle = 'rgba(0,0,0,0.07)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            for (var i = 0; i < drops.length; i++) {
                var text = letters[Math.floor(Math.random() * letters.length)];
                var x = i * fontSize;
                var y = drops[i] * fontSize;

                // Extend highlight radius
                var dist = Math.hypot(mouse.x - x, mouse.y - y);
                if (dist < fontSize * 10) {
                    ctx.fillStyle = '#90dcff';
                    ctx.font = 'bold ' + fontSize + 'px monospace';
                } else {
                    ctx.fillStyle = '#134d80';
                    ctx.font = fontSize + 'px monospace';
                }
                ctx.fillText(text, x, y);

                drops[i]++;
                if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
                    drops[i] = 0;
                }
            }
            lastTime = now;
        }
        requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);



    // ================================================================================




    const cards = document.querySelectorAll(".animate");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                entry.target.classList.toggle("animationDone", entry.isIntersecting);
            });
        },
        {
            threshold: 0.5,
        }
    );

    cards.forEach((card) => {
        observer.observe(card);
    });


    const cards2 = document.querySelectorAll(".animate2");

    const observer2 = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                entry.target.classList.toggle("animationDone2", entry.isIntersecting);
            });
        },
        {
            threshold: 0.5,
        }
    );

    cards2.forEach((card) => {
        observer2.observe(card);
    });




    // ================================================================================




    const star = document.querySelector('.star');

    // Define the start and end polygons as arrays of [x, y] percentages
    const startPolygon = [
        [6.125, 48.389], [37.116, 37.108], [48.389, 6.125],/* ...rest of your points... */[6.125, 48.389]
    ];
    const endPolygon = Array(startPolygon.length).fill([100, 0]); // Collapse to a point

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    function interpolatePolygon(start, end, t) {
        return start.map((point, i) => {
            const [x1, y1] = point;
            const [x2, y2] = end[i];
            return `${lerp(x1, x2, t)}% ${lerp(y1, y2, t)}%`;
        }).join(', ');
    }

    let startTime = null;
    const duration = 2000; // ms

    function animateClipPath(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const t = Math.min(elapsed / duration, 1);

        const polygon = interpolatePolygon(startPolygon, endPolygon, t);
        star.style.clipPath = `polygon(${polygon})`;

        if (t < 1) {
            requestAnimationFrame(animateClipPath);
        }
    }

    // Start the animation
    animateClipPath();

});