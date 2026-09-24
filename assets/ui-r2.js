(function(){
  document.querySelectorAll('details.fx-r2-video-more[data-fx-tiktok-id]').forEach(function(details){
    var host=details.querySelector('.fx-r2-player');
    var id=details.getAttribute('data-fx-tiktok-id');
    if(!host || !/^\d+$/.test(id || '')) return;
    details.addEventListener('toggle',function(){
      if(!details.open){
        host.querySelectorAll('iframe').forEach(function(frame){
          frame.src='about:blank';
          frame.remove();
        });
        return;
      }
      if(host.querySelector('iframe')) return;
      var frame=document.createElement('iframe');
      frame.title=details.getAttribute('data-fx-player-title');
      frame.loading='lazy';
      frame.allow='fullscreen; picture-in-picture';
      frame.setAttribute('allowfullscreen','');
      frame.referrerPolicy='strict-origin-when-cross-origin';
      frame.src='https://www.tiktok.com/player/v1/'+id+'?autoplay=0&rel=0';
      host.appendChild(frame);
    });
  });
  var root=document.documentElement;
  root.classList.add('fx-r2-ready');
  var bar=document.createElement('div');
  bar.className='fx-r2-progress';
  bar.setAttribute('aria-hidden','true');
  document.body.prepend(bar);
  function updateProgress(){
    var max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    root.style.setProperty('--fx-r2-scroll',String(Math.min(1,Math.max(0,window.scrollY/max))));
  }
  updateProgress();
  addEventListener('scroll',updateProgress,{passive:true});
  addEventListener('resize',updateProgress);
  document.querySelectorAll('.fx-panel,.fx-news-card,.fx-video-card,.fx-story-card,main article,.product-card').forEach(function(node){
    node.classList.add('fx-r2-reveal');
  });
  if(!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.querySelectorAll('.fx-r2-reveal').forEach(function(node){node.classList.add('is-visible');});
    return;
  }
  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        entry.target.classList.toggle('is-emphasized',entry.intersectionRatio>.58);
      }else{
        entry.target.classList.remove('is-emphasized');
      }
    });
  },{threshold:[0,.18,.58],rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.fx-r2-reveal').forEach(function(node){observer.observe(node);});
})();
