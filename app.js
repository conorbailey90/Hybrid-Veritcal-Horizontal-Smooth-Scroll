const scrollable = document.querySelector('.scrollable');
const sectionTwo = document.querySelector('.two');
const info = document.querySelector('.info-mask');
let images = [...document.querySelectorAll('.image')];
let imagesTwo = [...document.querySelectorAll('.image-two')];

let projects = ['NEON', 'DOWNTOWN', 'BLOCK', 'ABSTRACT']

images.forEach((image, idx) => {
    image.style.backgroundImage = `url(./images/${idx + 1}.jpeg)`;
    image.addEventListener('mousemove', (e) => {
        image.nextElementSibling.style.clipPath = `circle(30% at ${e.offsetX}px ${e.offsetY}px)`
    })

    image.addEventListener('mouseenter', () => {
        info.children[0].innerText =  projects[idx];
        info.classList.add('active');
    })
    image.addEventListener('mouseleave',  () => {
        image.nextElementSibling.style.clipPath = `circle(0%)`;
        info.classList.remove('active');
    })
})

imagesTwo.forEach((image, idx) => {
    image.style.backgroundImage = `url(./images/${idx + 1}.jpeg)`;
    
})

let currentY = 0;
let targetY = 0;
let currentX = 0;
let targetX = 0;
let ease = 0.1;

let s1Height = 0;
let s2Width = 0;
let s3Height = 0;

function lerp(start, end, t){
    return start * ( 1 - t ) + end * t;
}

window.addEventListener('resize', setDimentions)

function setDimentions(){
    s1Height = document.querySelector('.one').getBoundingClientRect().height;
    s2Width = document.querySelector('.two').getBoundingClientRect().width - (window.innerWidth - window.innerHeight) - window.innerHeight;
    s3Height = document.querySelector('.three').getBoundingClientRect().height + window.innerHeight;
    document.body.style.height = `${s1Height + s2Width + s3Height}px`
}

function animate(){
    smoothScroll()
    requestAnimationFrame(animate);
}

function smoothScroll(){
    targetY = window.scrollY;
  
    if(targetY <= s1Height){
        currentY = lerp(currentY, targetY, ease);
        scrollable.style.transform = `translate3d(0, ${-currentY}px, 0) skewY(${(targetY - currentY) * -0.02 }deg)` ;

        currentX = lerp(currentX, 0, ease).toFixed(2);
        sectionTwo.style.transform = `translate3d(${-currentX}px, 0, 0)`;
    }


    if(targetY > s1Height && targetY < (s1Height + s2Width) ){
        targetY = s1Height ;
        currentY = lerp(currentY, targetY, ease);

        targetX = window.scrollY - s1Height >= s2Width ? s2Width : window.scrollY - s1Height ;
        currentX = lerp(currentX, targetX, ease);
         
        scrollable.style.transform = `translate3d(0, ${-currentY}px, 0) skewY(${(targetY - currentY) * -0.02 }deg)`;
        sectionTwo.style.transform = `translate3d(${-currentX}px, 0, 0) skewX(${(targetX - currentX) * -0.02 }deg)`;
    }

    if(targetY > s1Height + s2Width - window.innerHeight){
        targetX = s2Width ;
        currentX = lerp(currentX, targetX, ease);
        sectionTwo.style.transform = `translate3d(${-currentX}px, 0, 0) skewX(${(targetX - currentX) * -0.02 }deg)`;

        targetY = window.scrollY - (s2Width) ;
        currentY = lerp(currentY, targetY, ease);
        scrollable.style.transform = `translate3d(0, ${-currentY}px, 0) skewY(${(targetY - currentY) * -0.02 }deg)`;
    }
}

setDimentions();
animate()