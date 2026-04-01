// ✅ SUPABASE CONNECTION (ADD THIS AT TOP)
const supabaseUrl = "https://hfusnsoydprecttzgalq.supabase.cohttps://hfusnsoydprecttzgalq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmdXNuc295ZHByZWN0dHpnYWxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4ODUyNTQsImV4cCI6MjA5MDQ2MTI1NH0.toiJFssVpgNl7d2olo-l1ZWVrq97vEBflWRmwJYqubQ";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);


// 🧪 TEST FUNCTION (OPTIONAL BUT IMPORTANT)
async function addData() {
    const { data, error } = await supabase
        .from('messages')
        .insert([
            { name: "Darshita", message: "Hello from frontend 🚀" }
        ]);

    if (error) {
        console.error("Error:", error);
    } else {
        console.log("Data inserted:", data);
    }
}

// Call it once to test
addData();


// ================= YOUR ORIGINAL CODE =================

// Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- Intro Sequence ---
const introTl = gsap.timeline({ delay: 0.5 });

introTl.to('.intro-logo-text', {
    scale: 150,
    opacity: 0,
    duration: 1.5,
    ease: "power4.inOut"
});

introTl.set('.intro-logo-container', { display: 'none' });
introTl.set('.intro-scene-2', { display: 'block' });

introTl.to('.intro-img.left', { x: 0, opacity: 1, duration: 1.2 }, "scene2");
introTl.to('.intro-img.right', { x: 0, opacity: 1, duration: 1.2 }, "scene2");
introTl.to('.intro-img.top', { y: 0, opacity: 1, duration: 1.2 }, "scene2");
introTl.to('.intro-img.bottom', { y: 0, opacity: 1, duration: 1.2 }, "scene2");

introTl.to({}, { duration: 3 });

introTl.to('.intro-img', { 
    scale: 0.8, 
    opacity: 0, 
    y: 100, 
    stagger: 0.1, 
    duration: 0.8
}, "sceneOut");

introTl.set('.intro-scene-2', { display: 'none' });

introTl.set('.search-wrapper-interactive', { display: 'flex' });
introTl.fromTo('.search-wrapper-interactive', 
    { scale: 0.8, opacity: 0, y: 30 }, 
    { scale: 1, opacity: 1, y: 0, duration: 1,
        onComplete: () => {
            document.querySelector('.search-wrapper-interactive')
                .classList.remove('pointer-events-none');
        }
    }
);

// Search click
document.querySelector('.search-wrapper-interactive').addEventListener('click', () => {
    const enterTl = gsap.timeline();

    enterTl.to('.search-bg', { opacity: 0, duration: 0.3 });
    enterTl.to('.search-icon-svg', { opacity: 0, duration: 0.3 }, "<");

    enterTl.to('.search-text-inner', {
        scale: 60,
        opacity: 0,
        duration: 1.5
    }, "<0.1");

    enterTl.set('#intro-overlay', { display: 'none' });
    enterTl.set('body', { overflowY: 'auto', overflowX: 'hidden' });

    enterTl.to('#page-content', { 
        autoAlpha: 1, 
        duration: 1.2
    }, "-=0.5");
});

// Scroll reveal
const revealElements = gsap.utils.toArray('.reveal-up');

revealElements.forEach(element => {
    gsap.fromTo(element, 
        { opacity: 0, y: 80 },
        {
            opacity: 1,
            y: 0,
            duration: 1.2,
            scrollTrigger: {
                trigger: element,
                start: "top 85%"
            }
        }
    );
});

// Hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(cursorOutline, {scale: 1.5, duration: 0.2});
    });
    card.addEventListener('mouseleave', () => {
        gsap.to(cursorOutline, {scale: 1, duration: 0.2});
    });
});

// Mail modal
function openMailModal() {
    const modal = document.getElementById('mail-modal');
    const content = document.getElementById('mail-modal-content');
    modal.classList.remove('opacity-0', 'pointer-events-none');
    content.classList.add('scale-100');
}

function closeMailModal() 
{
    const modal = document.getElementById('mail-modal');
    const content = document.getElementById('mail-modal-content');
    modal.classList.add('opacity-0', 'pointer-events-none');
    content.classList.remove('scale-100');
    process.env.SUPABASE_URL
}
