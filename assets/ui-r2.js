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
  function simplify(nav, links, inPage){
    if(!nav || links.length<7) return;
    var labels=inPage
      ? {start:'Start',price:links[1].querySelector('strong').textContent,catalog:links[4].querySelector('strong').textContent,documents:document.documentElement.lang==='en'?'Documents':'Dokumenty'}
      : {start:links[0].textContent,price:links[1].textContent,catalog:links[4].textContent,documents:document.documentElement.lang==='en'?'Documents':'Dokumenty'};
    var primary=[0,1,4].map(function(index){
      var anchor=document.createElement('a');
      anchor.href=links[index].getAttribute('href');
      anchor.dataset.fixonNavIndex=index;
      anchor.textContent=labels[['start','price','catalog'][[0,1,4].indexOf(index)]];
      return anchor;
    });
    var menu=document.createElement('details');
    menu.className='fx-r10-documents';
    var summary=document.createElement('summary');
    summary.textContent=labels.documents;
    menu.appendChild(summary);
    var list=document.createElement('div');
    [2,3,5,6].forEach(function(index){var a=links[index].cloneNode(true);a.dataset.fixonNavIndex=index;list.appendChild(a);});
    menu.appendChild(list);
    nav.replaceChildren.apply(nav,primary.concat(menu));
  }
  document.querySelectorAll('.fixon-suite-nav').forEach(function(nav){
    simplify(nav,Array.from(nav.children).filter(function(node){return node.tagName==='A';}),false);
  });
  document.querySelectorAll('.desktop-nav').forEach(function(nav){
    var links=Array.from(document.querySelector('.direct-links')?.querySelectorAll(':scope > a') || []);
    simplify(nav,links,true);
  });
  var style=document.createElement('style');
  style.textContent='.fx-r10-documents{position:relative;flex:0 0 auto;color:inherit}.fx-r10-documents summary{display:block;cursor:pointer;list-style:none;padding:12px 14px;font:700 12px/1.2 Arial,sans-serif;white-space:nowrap}.fx-r10-documents summary::-webkit-details-marker{display:none}.fx-r10-documents>div{position:absolute;right:0;bottom:100%;min-width:220px;max-width:min(90vw,340px);display:grid;background:#06271b;border:1px solid rgba(255,255,255,.25);box-shadow:0 10px 35px rgba(0,0,0,.24)}.fx-r10-documents:not([open])>div{display:none}.fx-r10-documents a{white-space:normal!important}.desktop-nav .fx-r10-documents>div{top:100%;bottom:auto;background:#fff;color:#06271b}.desktop-nav .fx-r10-documents a{color:#06271b;padding:10px 12px}.desktop-nav .fx-r10-documents summary{font:800 13px/1.2 var(--fx-r2-font);padding:9px 10px}.fixon-suite-nav{overflow:visible!important}.fixon-suite-nav .fx-r10-documents a{display:block}.fixon-suite-nav .fx-r10-documents summary{color:#fff}.fixon-suite-nav .fx-r10-documents summary:hover,.fixon-suite-nav .fx-r10-documents summary:focus-visible{background:#c7df47;color:#06271b}';
  style.textContent+='@media(max-width:700px){.fixon-suite-nav{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr));width:calc(100% - 20px)!important;max-width:none!important;left:10px!important;right:10px!important;transform:none!important;box-sizing:border-box}.fixon-suite-nav>a,.fixon-suite-nav>.fx-r10-documents{min-width:0;max-width:100%;box-sizing:border-box}.fixon-suite-nav>a{padding:10px 4px!important;white-space:normal!important;overflow-wrap:anywhere;line-height:1.25}.fixon-suite-nav .fx-r10-documents summary{padding:10px 4px;white-space:normal;overflow-wrap:anywhere;line-height:1.25;text-align:center}.fixon-suite-nav .fx-r10-documents>div{max-width:calc(100vw - 24px)}}';
  document.head.appendChild(style);
  function translateDocuments(){
    var names={pl:'Dokumenty',en:'Documents',de:'Dokumente',fr:'Documents',nl:'Documenten',it:'Documenti',es:'Documentos',pt:'Documentos',ca:'Documents',cs:'Dokumenty',sk:'Dokumenty',hu:'Dokumentumok',ro:'Documente',da:'Dokumenter',sv:'Dokument',fi:'Asiakirjat',no:'Dokumenter',is:'Skjöl',hr:'Dokumenti',bs:'Dokumenti',sr:'Документи',sl:'Dokumenti',bg:'Документи',mk:'Документи',sq:'Dokumente',et:'Dokumendid',lv:'Dokumenti',lt:'Dokumentai',el:'Έγγραφα',tr:'Belgeler',uk:'Документи',ru:'Документы',kk:'Құжаттар',az:'Sənədlər',hy:'Փաստաթղթեր',ka:'დოკუმენტები',ga:'Doiciméid',mt:'Dokumenti'};
    document.querySelectorAll('.fx-r10-documents>summary').forEach(function(summary){summary.textContent=names[document.documentElement.lang]||'Documents';});
  }
  translateDocuments();
  document.addEventListener('fixonlanguagechange',translateDocuments);
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
