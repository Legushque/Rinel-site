const cards=[...document.querySelectorAll('.character-card')];
const gallery=[...document.querySelectorAll('.gallery figure')];
const lightbox=document.querySelector('.lightbox');
const lbImg=lightbox.querySelector('img');
const caption=lightbox.querySelector('.lb-caption');
let current=0;
function open(index){current=index;const img=gallery[current].querySelector('img');lbImg.src=img.src;lbImg.alt=img.alt;caption.textContent=gallery[current].querySelector('figcaption').textContent;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function close(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow=''}
function move(step){open((current+step+gallery.length)%gallery.length)}
gallery.forEach((f,i)=>f.addEventListener('click',e=>{e.preventDefault();open(i)}));
lightbox.querySelector('.close').addEventListener('click',close);lightbox.querySelector('.prev').addEventListener('click',()=>move(-1));lightbox.querySelector('.next').addEventListener('click',()=>move(1));lightbox.addEventListener('click',e=>{if(e.target===lightbox)close()});document.addEventListener('keydown',e=>{if(!lightbox.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')move(-1);if(e.key==='ArrowRight')move(1)});
const menu=document.querySelector('.menu'),nav=document.querySelector('.nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('mobile-open');if(open){nav.style.display='flex';nav.style.position='fixed';nav.style.top='64px';nav.style.left='0';nav.style.right='0';nav.style.padding='22px';nav.style.background='rgba(8,8,8,.98)';nav.style.flexDirection='column';nav.style.gap='22px'}else{nav.removeAttribute('style')}});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('mobile-open')));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in-view')}),{threshold:.12});document.querySelectorAll('.character-card,.about-copy,.about-image,.contact-panel,.gallery figure').forEach(el=>observer.observe(el));
// Gallery horizontal scroll arrows
const galleryScroll=document.querySelector('.gallery-scroll');
const galleryArrowLeft=document.querySelector('.gallery-arrow--left');
const galleryArrowRight=document.querySelector('.gallery-arrow--right');
if(galleryScroll && galleryArrowLeft && galleryArrowRight){
  const updateGalleryArrows=()=>{
    const{scrollLeft,scrollWidth,clientWidth}=galleryScroll;
    galleryArrowLeft.classList.toggle('is-visible',scrollLeft>10);
    galleryArrowRight.classList.toggle('is-visible',scrollLeft<scrollWidth-clientWidth-10);
  };
  updateGalleryArrows();
  galleryScroll.addEventListener('scroll',updateGalleryArrows,{passive:true});
  window.addEventListener('resize',updateGalleryArrows,{passive:true});
  galleryArrowLeft.addEventListener('click',()=>{galleryScroll.scrollBy({left:-galleryScroll.clientWidth,behavior:'smooth'})});
  galleryArrowRight.addEventListener('click',()=>{galleryScroll.scrollBy({left:galleryScroll.clientWidth,behavior:'smooth'})});
}
