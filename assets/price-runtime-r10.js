(() => {
  'use strict';
  const data = window.FIXON_PRICE_GLOBAL_R8 || window.FIXON_PRICE_INTERNATIONAL_R8 || window.FIXON_PRICE_RETAIL_R8;
  const restored = window.FIXON_DELIVERY_R10;
  if (!data || !restored) return;
  const code = data.marketCode, event = code === 'WH';
  const languages = window.FIXON_PRICE_LANGUAGES_R10 || data.languageOrder || Object.keys(data.localizedText || {}).filter(k => document.getElementById(k));
  if (!languages.length) languages.push('pl', 'en');
  const words = {
    pl: ['Zamawiam głównie maszyny','Eksport konfiguracji','Warianty dostawy i marże','Liczba sztuk','Koszt logistyczny / szt.','Marża detaliczna','Marża B2B','Rabat','Przywrócony model dostawy','Dane szacunkowe z wcześniejszego wdrożenia; dokładny adres i koszt przewoźnika wymagają potwierdzenia.','Cena detaliczna netto - model','Cena dropshipping netto - model','Warunki współpracy','Regularne','Testowe','Oferta Warsaw Home','Wartość zakupów','Zakup netto','Dostawa','Źródło','Do wyceny','Kwoty netto. Marże nie są rabatami.','Ceny brutto','Model netto bez potwierdzonego VAT/importu','Jednorazowy zakup lub opłacone zakupy z 30 dni. Poziom przez 12 miesięcy.','Narzędzia','Maszyny','URBANROOT'],
    en: ['I mainly order machines','Export configuration','Delivery options and margins','Units','Logistics cost / unit','Retail margin','B2B margin','Discount','Restored delivery model','Historical estimated costs; the exact address and carrier cost require confirmation.','Estimated in-store net price','Estimated dropship net price','Partner terms','Regular','Trial','Warsaw Home offer','Purchase value','Net purchase','Delivery','Source','Quote required','Net amounts. Margins are not discounts.','Gross prices','Net model; VAT/import not confirmed','One order or paid orders from the last 30 days. Level retained for 12 months.','Tools','Machines','URBANROOT']
  };
  const focusText = {de:'Ich bestelle hauptsächlich Maschinen',fr:'Je commande surtout des machines',nl:'Ik bestel vooral machines',it:'Ordino principalmente macchine',es:'Pido principalmente máquinas',pt:'Encomendo sobretudo máquinas',ca:'Compro principalment màquines',cs:'Objednávám hlavně stroje',sk:'Objednávam hlavne stroje',hu:'Főként gépeket rendelek',ro:'Comand în principal utilaje',da:'Jeg bestiller primært maskiner',sv:'Jag beställer främst maskiner',fi:'Tilaan pääasiassa koneita',no:'Jeg bestiller hovedsakelig maskiner',is:'Ég panta aðallega vélar',hr:'Naručujem uglavnom strojeve',bs:'Naručujem uglavnom mašine',sr:'Наручујем углавном машине',sl:'Naročam predvsem stroje',bg:'Поръчвам основно машини',mk:'Нарачувам главно машини',sq:'Porosis kryesisht makineri',et:'Tellin peamiselt masinaid',lv:'Pasūtu galvenokārt iekārtas',lt:'Daugiausia užsakau mašinas',el:'Παραγγέλνω κυρίως μηχανήματα',tr:'Ağırlıklı olarak makine sipariş ediyorum',uk:'Замовляю переважно машини',ru:'Заказываю преимущественно машины',kk:'Негізінен машиналарға тапсырыс беремін',az:'Əsasən maşınlar sifariş edirəm',hy:'Հիմնականում մեքենաներ եմ պատվիրում',ka:'ძირითადად მანქანებს ვუკვეთავ',ga:'Ordaím meaisíní den chuid is mó',mt:'Nordna l-aktar magni'};
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const finite = n => typeof n === 'number' && Number.isFinite(n);
  const model=window.FIXON_FINANCE_R10;
  const state = {tier:1,mode:event?'fair':'regular',machineFocused:false};
  const storageKey = 'fixon-price-configuration-r10-'+code;
  try { const saved=JSON.parse(localStorage.getItem(storageKey)||'null'); if(saved){if(Number.isInteger(saved.tier)&&saved.tier>=0&&saved.tier<5)state.tier=saved.tier;state.machineFocused=saved.machineFocused===true;if(['regular','trial',...(event?['fair']:[])].includes(saved.mode))state.mode=saved.mode;} } catch {}
  const persist = () => {try{localStorage.setItem(storageKey,JSON.stringify(state));}catch{}};
  const rate=(category,qty)=>model.discount(category,qty,state,code);
  function labelFor(lang){return window.FIXON_PRICE_LABELS_R10?.[lang]||data.labels?.[lang]||data.localizedText?.[lang]||{};}
  const sections=[];
  for(const lang of languages){
    const root=document.getElementById(lang);if(!root)continue;
    const t=labelFor(lang),w=window.FIXON_PRICE_WORDS_R10?.[lang]||words[lang]||words.en;
    const currency=data.country?.currency||'PLN';
    let locale=lang;
    const policy=data.numericLocalePolicy?.language===lang?data.numericLocalePolicy:null;
    if(policy)locale=[policy.preferred,policy.fallback].find(l=>Intl.NumberFormat.supportedLocalesOf([l]).length)||'en';
    const fmt=n=>finite(n)?new Intl.NumberFormat(locale,{style:'currency',currency,minimumFractionDigits:2,maximumFractionDigits:2}).format(n):t.quote||w[20];
    const pct=n=>finite(n)?new Intl.NumberFormat(locale,{maximumFractionDigits:1}).format(n)+'%':t.quote||w[20];
    const controls=document.createElement('div');controls.className='r10-controls';
    const tierLabels=t.tier||['< 1000 EUR','1000 EUR · 10%','5000 EUR · 20%','25 000 EUR · 30%','100 000 EUR · 35%'];
    controls.innerHTML=`<label>${esc(t.level||w[16])}<select data-r10-tier>${tierLabels.map((x,i)=>`<option value="${i}">${esc(x)}</option>`).join('')}</select></label><label>${esc(t.mode||w[12])}<select data-r10-mode><option value="regular">${esc(t.regular||w[13])}</option><option value="trial">${esc(t.trial||w[14])}</option>${event?`<option value="fair">${esc(w[15])}</option>`:''}</select></label><label class="r10-focus"><input type="checkbox" data-r10-machines><span>${esc(focusText[lang]||w[0])}</span></label><button type="button" data-r10-export>${esc(w[1])} · JSON</button>`;
    const heading=root.querySelector('h2,h1');if(heading)heading.after(controls);else root.prepend(controls);
    const terms=document.createElement('details');terms.className='r10-terms';
    const existingLink=document.querySelector('.fixon-suite-nav a[href*="commercial-offer"]');
    const termsUrl=event?'../updates/FIXON-program-R8.html#'+(lang==='pl'?'pl':'en'):(existingLink?.getAttribute('href')||'../markets/'+code+'/'+(lang==='pl'?'pl':'en')+'/commercial-offer.html').split('#')[0]+'#'+(['pl','en'].includes(lang)?lang:'local');
    const categories=t.categories||{standard:w[25],special_machines:w[26],urbanroot:w[27]};
    terms.innerHTML=`<summary>${esc(t.rulesSummary||w[12])}</summary><p>${esc(t.qualification||w[24])}</p><table><tr><th>${esc(categories.standard)}</th><td>1000 EUR: 10% · 5000 EUR: 20% · 25 000 EUR: 30% · 100 000 EUR: 35%</td></tr><tr><th>URBANROOT</th><td>15% · 25% · 35% · 40%</td></tr><tr><th>${esc(t.trial||w[14])}</th><td>${esc(categories.standard)}: 20% · ${esc(categories.special_machines)}: 10% · URBANROOT: 25%</td></tr>${event?`<tr><th>WARSAW HOME</th><td>25%+ · ${esc(categories.special_machines)}: 15% · URBANROOT: 30%+</td></tr>`:''}</table>${[t.advance,t.return,t.shippingPromos,t.marginFormula].filter(Boolean).map(s=>'<p>'+esc(s)+'</p>').join('')}<a href="${esc(termsUrl)}">${esc(w[12])}</a>`;
    controls.after(terms);
    const notice=root.querySelector('.notice');if(notice)notice.textContent=w[8]+' · '+restored.sourceDate+'. '+w[9];
    const cards=[...root.querySelectorAll('.product-card')];
    cards.forEach((card,index)=>{card.dataset.r10Index=index;card.dataset.r10Category=data.products[card.dataset.sku]?.category||'standard';const panel=document.createElement('section');panel.className='r10-price';card.append(panel);});
    let renderKey=null,sortKey=null;
    function update(){
      controls.querySelector('[data-r10-tier]').value=state.tier;controls.querySelector('[data-r10-mode]').value=state.mode;controls.querySelector('[data-r10-machines]').checked=state.machineFocused;
      if(root.hidden)return;
      const nextRenderKey=state.tier+':'+state.mode;
      if(renderKey!==nextRenderKey)for(const card of cards){
        const sku=card.dataset.sku,p=data.products[sku],r=restored.products[sku];if(!p||!r)continue;
        const {source,fx,selling,estimatedSelling,rows:tableRows}=model.finance(p,r,state,code);
        const purchaseAt=qty=>{const discount=rate(p.category,qty);return discount==null?null:source*(1-discount);};
        const panel=card.querySelector('.r10-price'),first=tableRows.find(q=>q.quantity===1)||tableRows[0];
        const moneyCell=(value,kind)=>`<td data-r10-value="${finite(value)?value:''}" data-r10-kind="${kind}">${fmt(value)}</td>`;
        const marginCell=(value,kind)=>`<td data-r10-value="${finite(value)?value:''}" data-r10-kind="${kind}" class="${finite(value)&&value<0?'r10-negative':''}">${pct(value)}</td>`;
        panel.innerHTML=`
          <h3>${esc(categories[p.category]||p.category)}</h3>
          <dl>
            <dt>${esc(finite(selling.grossLocal)?t.retail||w[31]:w[10])}</dt><dd>${selling.indicative?'≈ ':''}${fmt(finite(selling.grossLocal)?selling.grossLocal:selling.netLocal)}</dd>
            <dt>${esc(finite(selling.dropshipGrossLocal)?t.ds||w[22]:w[11])}</dt><dd>${fmt(finite(selling.dropshipGrossLocal)?selling.dropshipGrossLocal:selling.dropshipNetLocal)}</dd>
            <dt>${esc(t.b2b||'B2B netto')}</dt><dd>${fmt(selling.partnerLocal)}</dd>
            <dt>${esc(t.purchase||w[17])}</dt><dd>${fmt(purchaseAt(1))}</dd>
          </dl>
          ${estimatedSelling?`<p class="r10-estimate">${esc(w[23])}. ${esc(w[32])}</p>`:''}
          ${first?.purchase==null?`<p>${esc(t.consumer||'< 1000 EUR: fixon.pro')}</p><a href="${esc(p.storeUrl)}" target="_blank" rel="noopener">${esc(t.link||'FIXON')}</a>`:''}
          <h4>${esc(w[2])}</h4>
          <p class="r10-source">${esc(w[8])} · ${esc(r.sourceDate||restored.sourceDate)} · EUR → ${esc(currency)}. ${esc(w[32])}</p>
          <div class="r10-table-wrap"><table class="r10-delivery"><thead><tr>
            <th>${esc(w[3])}</th><th>${esc(w[7])}</th><th>${esc(w[17])} / 1</th><th>${esc(w[4])}</th><th>${esc(t.rm||w[5])}</th><th>${esc(t.bm||w[6])}</th><th>${esc(t.dm||'Dropshipping')}</th>
          </tr></thead><tbody>${tableRows.map(q=>`<tr data-r10-quantity="${q.quantity}"><td>${q.quantity}</td><td>${pct(q.discount==null?null:q.discount*100)}</td>${moneyCell(q.purchase,'purchase')}${moneyCell(q.logistics,'logistics')}${marginCell(q.rm,'retailMargin')}${marginCell(q.bm,'b2bMargin')}${marginCell(q.dm,'dropshipMargin')}</tr>`).join('')}</tbody></table></div>
          <details class="r10-freight-details"><summary>${esc(w[18])} · ${esc(w[19])}</summary>
            <div class="r10-table-wrap"><table class="r10-delivery"><thead><tr><th>${esc(w[3])}</th><th>${esc(w[28])}</th><th>${esc(w[29])}</th><th>${esc(w[30])}</th></tr></thead>
            <tbody>${tableRows.map(q=>`<tr><td>${q.quantity}</td><td>${fmt(q.freight)}</td><td>${q.retainedDelivery?'—':[q.dutyNetEur,q.clearanceNetEur,q.riskNetEur].map(n=>fmt(finite(n)?n*fx:null)).join(' / ')}</td><td title="${esc(q.retainedDelivery?'R8':q.service)}">${q.retainedDelivery?'FIXON.pro · 2026-10-21':esc(q.provider)+'<br>'+esc(q.days)}</td></tr>`).join('')}</tbody></table></div>
          </details><p class="r10-source">${esc(w[21])} ${esc(w[9])}</p>`;
        const summary=card.querySelector('.summary-copy');if(summary){let chip=summary.querySelector('.r10-current-price');if(!chip){chip=document.createElement('span');chip.className='summary-price r10-current-price';summary.append(chip);}chip.textContent=(t.purchase||w[17])+': '+fmt(purchaseAt(1));}
      }
      renderKey=nextRenderKey;
      const container=cards[0]?.parentElement;
      if(sortKey!==state.machineFocused&&container&&cards.every(c=>c.parentElement===container))for(const card of [...cards].sort((a,b)=>state.machineFocused?Number(b.dataset.r10Category==='special_machines')-Number(a.dataset.r10Category==='special_machines')||Number(a.dataset.r10Index)-Number(b.dataset.r10Index):Number(a.dataset.r10Index)-Number(b.dataset.r10Index)))container.append(card);
      sortKey=state.machineFocused;
    }
    controls.querySelector('[data-r10-tier]').onchange=e=>{state.tier=Number(e.target.value);persist();sections.forEach(x=>x.update());};
    controls.querySelector('[data-r10-mode]').onchange=e=>{state.mode=e.target.value;if(!event&&state.mode==='fair')state.mode='regular';persist();sections.forEach(x=>x.update());};
    controls.querySelector('[data-r10-machines]').onchange=e=>{state.machineFocused=e.target.checked;persist();sections.forEach(x=>x.update());};
    controls.querySelector('[data-r10-export]').onclick=()=>{
      const exported={schema:'fixon-price-configuration',version:1,market:code,language:lang,exportedAt:new Date().toISOString(),configuration:{...state},filters:{search:root.querySelector('[data-product-search]')?.value||'',category:root.querySelector('[data-category-filter]')?.value||''},sourcePrices:'2026-10-19',deliverySource:restored.sourceDate,simulation:true,eligibilityConfirmed:false};
      const url=URL.createObjectURL(new Blob([JSON.stringify(exported,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='FIXON-'+code+'-'+lang+'-configuration.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),5000);window.FIXON_LAST_CONFIG_EXPORT=exported;
    };
    sections.push({lang,root,update});
  }
  const navLinks=[...document.querySelectorAll('.fixon-suite-nav a')];
  const nativeNav=navLinks.map(a=>a.textContent);
  navLinks.forEach((a,i)=>a.dataset.fixonNavIndex=i);
  const show=()=>{
    let lang=location.hash.slice(1);if(!sections.some(s=>s.lang===lang))lang=data.defaultLanguage||languages[0];
    document.documentElement.lang=lang;sections.forEach(s=>{s.root.hidden=s.lang!==lang;if(s.lang===lang)s.update();});
    document.querySelectorAll('.language-tabs a[href]').forEach(a=>{a.classList.toggle('active',a.hash==='#'+lang);if(data.languageNames?.[a.hash.slice(1)])a.textContent=data.languageNames[a.hash.slice(1)];});
    const suite=labelFor(lang).suite||data.commonSuite?.[lang]||({pl:['Start','Cennik','Warunki współpracy','Materiały marketingowe','Katalog','Nowości','Kontakt'],en:['Start','Price list','Partner terms','Marketing materials','Catalogue','New products','Contact']})[lang]||nativeNav;
    document.querySelectorAll('.fixon-suite-nav a[data-fixon-nav-index]').forEach(a=>{const i=Number(a.dataset.fixonNavIndex);if(suite[i])a.textContent=suite[i];});
    document.dispatchEvent(new CustomEvent('fixonlanguagechange'));
  };
  addEventListener('hashchange',show);show();
  window.FIXON_PRICE_R10={getState:()=>({...state}),rate:(sku,qty=1)=>rate(data.products[sku]?.category,qty),restored,market:code};
})();
