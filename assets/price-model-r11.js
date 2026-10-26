(function(root){
  'use strict';
  const finite=n=>typeof n==='number'&&Number.isFinite(n);
  function discount(category,quantity,state,market){
    if(state.mode==='trial')return category==='special_machines'?.10:category==='urbanroot'?.25:.20;
    if(market==='WH'&&state.mode==='fair')return category==='special_machines'?.15:category==='urbanroot'?.30:.25;
    if(category==='special_machines')return state.tier<3?(quantity===1?.05:.10):state.tier===3?(quantity<=5?.10:.15):(quantity<=20?.15:.20);
    const base=[null,.10,.20,.30,.35][state.tier];
    return base==null?null:base+(category==='urbanroot'?.05:0);
  }
  function finance(product,historical,state,market){
    const source=finite(product.sourceNetLocal)?product.sourceNetLocal:product.sourceNet;
    const fx=finite(product.sourceNetEur)&&product.sourceNetEur>0?source/product.sourceNetEur:product.selling?.rate||1;
    const unit=historical.quotes.find(q=>q.quantity===1);
    const unitLogistics=finite(unit?.combinedLogisticsNetEur)?unit.combinedLogisticsNetEur*fx:null;
    const selling={...product.selling};let estimatedSelling=false;
    if(!finite(selling.netLocal)&&finite(unitLogistics)){
      // A dated net scenario is not a verified current store cap or import/VAT quote.
      selling.netLocal=Math.min((.9*source+unitLogistics)/.8,source+unitLogistics);
      selling.partnerLocal=selling.netLocal*.8;
      estimatedSelling=true;
    }
    const margin=(revenue,purchase,logistics)=>[revenue,purchase,logistics].every(finite)&&revenue>0?(revenue-purchase-logistics)/revenue*100:null;
    const rows=historical.quotes.map(q=>{
      const rate=discount(product.category,q.quantity,state,market);
      const purchase=finite(source)&&finite(rate)?source*(1-rate):null;
      const retainedDelivery=!q.currentStoreQuote&&finite(product.quotes?.[q.quantity]?.netPerUnit);
      const logistics=retainedDelivery?product.quotes[q.quantity].netPerUnit:finite(q.combinedLogisticsNetEur)?q.combinedLogisticsNetEur*fx:null;
      return {...q,discount:rate,purchase,logistics,retainedDelivery,freight:retainedDelivery?logistics:finite(q.freightNetEur)?q.freightNetEur*fx:null,
        rm:margin(selling.netLocal,purchase,logistics),bm:margin(selling.partnerLocal,purchase,logistics)};
    });
    for(const key of Object.keys(selling))if(/dropship/i.test(key))delete selling[key];
    return {source,fx,selling,estimatedSelling,rows};
  }
  const api={finite,discount,finance};
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.FIXON_FINANCE_R10=api;
})(typeof window==='object'?window:globalThis);
