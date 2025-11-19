document.addEventListener('DOMContentLoaded', () => {
    const responsiveMenu = document.querySelector(".responsiveMenu");
    const resMenuBtn = document.querySelector(".resMenuBtn");
    const resMenuExit = document.querySelector(".resMenuExit");
    const main = document.querySelector("main");
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




    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Star {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = 0.00002;  // Changed to 2px fixed size
            this.opacity = Math.random() < 0.5 ? 0.2 : Math.random();
            const isSlower = Math.random() < 0.9;
            const speed = isSlower ? 0.01 : 0.01;
            this.fadeDirection = Math.random() > 0.5 ? speed : -speed;
            this.isGray = Math.random() < 0.5;
        }

        update() {
            this.opacity += this.fadeDirection;
            if (this.opacity <= 0 || this.opacity >= 1) {
                this.fadeDirection *= -1;
            }
        }

        draw() {
            const color = this.isGray ? '28, 27, 27' : '71, 169, 255';

            // Draw glow
            ctx.fillStyle = `rgba(${color}, ${this.opacity * 0.5})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size + 1, 0, Math.PI * 2);
            ctx.fill();

            // Draw main star
            ctx.fillStyle = `rgba(${color}, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Create stars in a grid with smaller spacing
    const gridSpacing = 20; // Reduced from 30 to 15 to increase density
    const stars = [];

    function createStarGrid() {
        stars.length = 0;
        const rows = Math.floor(canvas.height / gridSpacing);
        const cols = Math.floor(canvas.width / gridSpacing);

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                stars.push(new Star(
                    j * gridSpacing + gridSpacing / 2,
                    i * gridSpacing + gridSpacing / 2
                ));
            }
        }
    }

    createStarGrid();

    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            star.update();
            star.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createStarGrid();
    });
});
