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

(function(){
  var REF_CODE='6oxwxmm663ix';
  var STORAGE_KEY='fixonReferralAttribution';
  var THIRTY_DAYS_MS=30*24*60*60*1000;
  var ATTR='data-fixon-ref';
  var inRewrite=false;
  var attrs=['href','src','poster','data-src'];
  var root=document.documentElement;

  function safeNow(){
    return Date.now ? Date.now() : new Date().getTime();
  }

  function isFixonUrl(value){
    if(!value || !/^[\t\n\f\r ]*(https?:)?\/\//i.test(value)) return false;
    try{
      var candidate=String(value).replace(/^[\t\n\f\r ]+/,'');
      if(candidate.indexOf('//')===0) candidate='https:'+candidate;
      var url=new URL(candidate,document.baseURI);
      if(url.protocol!=='http:' && url.protocol!=='https:') return false;
      var host=url.hostname.toLowerCase();
      return host==='fixon.pro' || host==='www.fixon.pro';
    }catch(error){
      return false;
    }
  }

  function withReferral(value){
    if(!isFixonUrl(value)) return value;
    try{
      var candidate=String(value).replace(/^[\t\n\f\r ]+/,'');
      if(candidate.indexOf('//')===0) candidate='https:'+candidate;
      var url=new URL(candidate,document.baseURI);
      url.searchParams.set('ref',REF_CODE);
      return url.toString();
    }catch(error){
      return value;
    }
  }

  function setStatus(status,extra){
    if(!root) return;
    var payload={code:REF_CODE,status:status};
    if(extra){
      Object.keys(extra).forEach(function(key){payload[key]=extra[key];});
    }
    try{
      root.setAttribute(ATTR,JSON.stringify(payload));
    }catch(error){
      root.setAttribute(ATTR,'{"code":"'+REF_CODE+'","status":"'+status+'"}');
    }
  }

  function persistAttribution(){
    var now=safeNow();
    var payload={code:REF_CODE,timestamp:now,expiresAt:now+THIRTY_DAYS_MS};
    try{
      var existingRaw=localStorage.getItem(STORAGE_KEY);
      if(existingRaw){
        try{
          var existing=JSON.parse(existingRaw);
          if(existing && existing.code===REF_CODE && existing.timestamp && existing.expiresAt && existing.expiresAt>now){
            setStatus('stored',{timestamp:existing.timestamp,expiresAt:existing.expiresAt});
            return;
          }
        }catch(parseError){
          // Replace malformed local attribution data with a fresh valid entry.
        }
      }
      localStorage.setItem(STORAGE_KEY,JSON.stringify(payload));
      setStatus('stored',{timestamp:payload.timestamp,expiresAt:payload.expiresAt});
    }catch(error){
      setStatus('storage-unavailable');
    }
  }

  function rewriteAttribute(node,name){
    if(!node || !node.getAttribute || !node.hasAttribute(name)) return;
    var before=node.getAttribute(name);
    var after=withReferral(before);
    if(after!==before){
      node.setAttribute(name,after);
    }
  }

  function rewriteNode(node){
    if(!node || node.nodeType!==1) return;
    var tag=node.tagName ? node.tagName.toLowerCase() : '';
    if(tag==='a' || tag==='area'){
      rewriteAttribute(node,'href');
    }
    if(tag==='img' || tag==='video' || tag==='source' || tag==='iframe' || tag==='embed'){
      rewriteAttribute(node,'src');
      rewriteAttribute(node,'poster');
      rewriteAttribute(node,'data-src');
    }
  }

  function rewriteTree(scope){
    if(inRewrite) return;
    inRewrite=true;
    try{
      rewriteNode(scope);
      if(scope && scope.querySelectorAll){
        scope.querySelectorAll('a[href],area[href],img[src],img[data-src],video[src],video[poster],video[data-src],source[src],source[data-src],iframe[src],iframe[data-src],embed[src],embed[data-src]').forEach(rewriteNode);
      }
    }finally{
      inRewrite=false;
    }
  }

  function closestNavigable(target){
    if(!target || !target.closest) return null;
    return target.closest('a[href],area[href]');
  }

  function rewriteBeforeNavigation(event){
    rewriteNode(closestNavigable(event.target));
  }

  persistAttribution();
  rewriteTree(document);
  document.addEventListener('click',rewriteBeforeNavigation,true);
  document.addEventListener('auxclick',rewriteBeforeNavigation,true);
  document.addEventListener('contextmenu',rewriteBeforeNavigation,true);

  if('MutationObserver' in window){
    new MutationObserver(function(mutations){
      if(inRewrite) return;
      mutations.forEach(function(mutation){
        if(mutation.type==='attributes'){
          if(attrs.indexOf(mutation.attributeName)!==-1){
            rewriteNode(mutation.target);
          }
          return;
        }
        mutation.addedNodes.forEach(rewriteTree);
      });
    }).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:attrs});
  }
})();
