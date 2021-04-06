let scrollale = document.querySelector('.scrollable');
const sectionTwo = document.querySelector('.two');

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
    targetY = window.scrollY;
  
    if(targetY <= s1Height){
        currentY = lerp(currentY, targetY, ease);
        scrollale.style.transform = `translate3d(0, ${-currentY}px, 0)`;

        currentX = lerp(currentX, 0, ease).toFixed(2);
        sectionTwo.style.transform = `translate3d(${-currentX}px, 0, 0)`;
    }


    if(targetY > s1Height && targetY <= (s1Height + s2Width) ){
        targetY = s1Height;
        currentY = lerp(currentY, targetY, ease);

        targetX = window.scrollY - s1Height >= s2Width ? s2Width : window.scrollY - s1Height ;
        currentX = lerp(currentX, targetX, ease);
         
        scrollale.style.transform = `translate3d(0, ${-currentY}px, 0)`;
        sectionTwo.style.transform = `translate3d(${-currentX}px, 0, 0)`;
    }

    if(targetY > s1Height + s2Width - window.innerHeight){
        targetX = s2Width ;
        currentX = lerp(currentX, targetX, ease);
        sectionTwo.style.transform = `translate3d(${-currentX}px, 0, 0)`;

        targetY = window.scrollY - (s2Width);
        currentY = lerp(currentY, targetY, ease);
        scrollale.style.transform = `translate3d(0, ${-currentY}px, 0)`;
    }
    requestAnimationFrame(animate);
}

setDimentions();
animate()