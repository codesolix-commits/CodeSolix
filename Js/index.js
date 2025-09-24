  AOS.init();
// for navbar responsiveness
document.addEventListener('DOMContentLoaded', function() {
const menubtn = document.querySelector(".menu_btn");
const navigation  = document.querySelector(".navigation");
menubtn.addEventListener("click",() =>{
  menubtn.classList.toggle("active");
  navigation.classList.toggle("active");
});

// Change Slide 
const btn = document.querySelectorAll(".nav__btn");
const slider = document.querySelectorAll(".video-slider");
const contents = document.querySelectorAll(".index__content");
var sliderNav = function(manual){
  btn.forEach((button)=>{
    button.classList.remove("active");

  })
  slider.forEach((slide)=>{
    slide.classList.remove("active");

  })
  contents.forEach((content)=>{
    content.classList.remove("active");

  })

  btn[manual].classList.add("active");
  slider[manual].classList.add("active");
  contents[manual].classList.add("active");
}
btn.forEach((button,i)=>{
  button.addEventListener("click",()=>{
    sliderNav(i);
  })
});
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                entry.target.classList.remove('animate');
            }
        });
    });

    document.querySelectorAll('.team-section .content').forEach(content => {
        observer.observe(content);
    });
let imgbx = document.querySelectorAll(".imgbx");
let contentbx = document.querySelectorAll(".contentbx");

for(let i = 0 ; i < imgbx.length; i++){
    imgbx[i].addEventListener("mouseover",function(){
        for(let i = 0 ; i < contentbx.length; i++){
            contentbx[i].className = 'contentbx';
        }
        document.getElementById(this.dataset.id).className = 'contentbx active';

        for(let i=0 ; i<imgbx; i++){
            imgbx[i].className = 'imgbx';
        }
        this.className = 'imgbx active';
    });
}
// scroll Reveal
const sr  = ScrollReveal({
    distance:'65px',
    duration:2600,
    delay:450,
    reset:true
});
sr.reveal('.hero-text',{delay:200,origin:'top'}); 
sr.reveal('.hero-image',{delay:450,origin:'top'}); 

sr.reveal('.block1',{delay:400,origin:'top'}); 
sr.reveal('.block2',{delay:500,origin:'bottom'}); 
sr.reveal('.block3',{delay:200,origin:'top'}); 
sr.reveal('.block4',{delay:350,origin:'bottom'}); 
// swiper
const swiper = new Swiper('.js-testimonials-slider', {
    grabCursor:true,
    spaceBetween:30,
    pagination:{
        el:'.js-testimonials-pagination',
        clickable:true
    },
    breakpoints:{
        767:{
            slidesPerView:2
        }
    }
}); 
});
