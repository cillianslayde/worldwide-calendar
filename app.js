const CATS=["All","Government","National","Regional","Religious","Pagan/Wiccan","International","Cultural","Awareness","Historical","Astronomy","Family","Education","Business"];
const CLASS={Government:"government",National:"government",Regional:"government",Religious:"religious","Pagan/Wiccan":"religious",International:"international",Cultural:"cultural",Awareness:"awareness",Historical:"historical",Astronomy:"astronomy",Family:"cultural",Education:"cultural",Business:"business"};
let cursor=new Date(),active="All",selected=null;
const $=s=>document.querySelector(s), pad=n=>String(n).padStart(2,"0");
const key=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
function addDays(d,n){let x=new Date(d);x.setDate(x.getDate()+n);return x}
function nth(y,m,w,n){let d=new Date(y,m,1);return new Date(y,m,1+((w-d.getDay()+7)%7)+7*(n-1))}
function last(y,m,w){let d=new Date(y,m+1,0);return new Date(y,m,d.getDate()-((d.getDay()-w+7)%7))}
function easter(y){let a=y%19,b=Math.floor(y/100),c=y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451);return new Date(y,Math.floor((h+l-7*m+114)/31)-1,((h+l-7*m+114)%31)+1)}
function events(y,m,d){
 let dt=new Date(y,m,d), k=key(dt), a=[], add=(name,cat,region="Worldwide",desc="")=>a.push({name,cat,region,desc});
 let mm=k.slice(5);
 // Canada
 if(k===key(nth(y,8,1,1)))add("Labour Day","National","Canada","Federal statutory holiday.");
 if(k===key(new Date(y,6,1)))add("Canada Day","National","Canada","National holiday.");
 if(k===key(nth(y,9,1,2)))add("National Day for Truth and Reconciliation","National","Canada","National remembrance and reflection.");
 if(k===key(new Date(y,10,11)))add("Remembrance Day","National","Canada","Honours those who served and died in military service.");
 if(k===key(nth(y,1,1,3)))add("Family Day","Regional","Canada","Observed in several provinces.");
 if(k===key(nth(y,4,1,2)))add("Victoria Day","Regional","Canada","Provincial/federal observance; exact statutory treatment varies.");
 if(k===key(nth(y,9,1,2)))add("Thanksgiving","National","Canada","Canadian Thanksgiving.");
 if(k===key(new Date(y,11,25)))add("Christmas Day","National","Canada","Christian and statutory holiday.");
 if(k===key(new Date(y,11,26)))add("Boxing Day","National","Canada","Statutory holiday in some jurisdictions.");
 // US
 if(k===key(nth(y,0,1,3)))add("Martin Luther King Jr. Day","National","United States","Federal holiday.");
 if(k===key(nth(y,1,1,3)))add("Presidents' Day","National","United States","Federal holiday commonly associated with U.S. presidents.");
 if(k===key(last(y,4,1)))add("Memorial Day","National","United States","Honours U.S. military personnel who died in service.");
 if(k===key(nth(y,8,1,1)))add("Labor Day","National","United States","Federal holiday.");
 if(k===key(new Date(y,5,19)))add("Juneteenth","National","United States","Federal holiday.");
 if(k===key(new Date(y,6,4)))add("Independence Day","National","United States","National holiday.");
 if(k===key(nth(y,10,4,4)))add("Thanksgiving Day","National","United States","Federal holiday.");
 if(k===key(new Date(y,10,11)))add("Veterans Day","National","United States","Honours military veterans.");
 if(k===key(new Date(y,11,25)))add("Christmas Day","National","United States","Federal holiday.");
 // International
 const I={"01-27":"International Holocaust Remembrance Day","03-08":"International Women's Day","03-20":"International Day of Happiness","03-21":"International Day for the Elimination of Racial Discrimination","04-22":"International Mother Earth Day","05-03":"World Press Freedom Day","06-05":"World Environment Day","06-20":"World Refugee Day","08-09":"International Day of the World's Indigenous Peoples","09-21":"International Day of Peace","10-24":"United Nations Day","11-20":"World Children's Day","12-03":"International Day of Persons with Disabilities","12-10":"Human Rights Day"};
 if(I[mm])add(I[mm],"International");
 // Cultural / awareness
 const C={"02-02":["Groundhog Day","Cultural","Canada/United States"],"02-14":["Valentine's Day","Cultural","Worldwide"],"04-01":["April Fools' Day","Cultural","Worldwide"],"10-31":["Halloween","Cultural","Worldwide"],"11-13":["World Kindness Day","Awareness","Worldwide"]};
 if(C[mm])add(C[mm][0],C[mm][1],C[mm][2],"Widely observed cultural/awareness date.");
 // Christian
 let e=easter(y); if(k===key(e))add("Easter Sunday","Religious","Christian","Movable Christian feast."); if(k===key(addDays(e,-2)))add("Good Friday","Religious","Christian","Christian observance."); if(k===key(addDays(e,1)))add("Easter Monday","Religious","Christian","Observed as a public holiday in many countries.");
 // Wiccan / Pagan Sabbats
 const S={"02-01":"Imbolc","03-20":"Ostara","04-30":"Beltane","06-21":"Litha (Summer Solstice)","08-01":"Lughnasadh","09-22":"Mabon","10-31":"Samhain","12-21":"Yule (Winter Solstice)"};
 if(S[mm])add(S[mm],"Pagan/Wiccan","Worldwide","Wheel of the Year observance; traditions and exact dates vary.");
 // Esbat — monthly full moon is added below as an astronomy/Pagan marker when phase is full.
 // Approx lunar phase
 const ref=Date.UTC(2000,0,6,18,14), days=(Date.UTC(y,m,d)-ref)/86400000, cycle=29.530588853, age=((days%cycle)+cycle)%cycle;
 let phase=age<1||age>28.53?["New Moon","🌑"]:age<7.38?["Waxing Crescent","🌒"]:age<8.38?["First Quarter","🌓"]:age<14.77?["Waxing Gibbous","🌔"]:age<15.77?["Full Moon","🌕"]:age<22.15?["Waning Gibbous","🌖"]:age<23.15?["Last Quarter","🌗"]:["Waning Crescent","🌘"];
 add(`${phase[1]} ${phase[0]}`,"Astronomy","Worldwide","Approximate lunar phase for this date.");
 if(phase[0]==="Full Moon")add("Esbat / Full Moon","Pagan/Wiccan","Worldwide","Many Wiccan and Pagan traditions observe the full moon as an Esbat; names and practices vary.");
 return a;
}
function visible(y,m,d){let q=$("#search").value.toLowerCase().trim(),r=$("#region").value;return events(y,m,d).filter(e=>(active==="All"||e.cat===active)&&(r==="Worldwide"||e.region==="Worldwide"||e.region.includes(r))&&(!q||`${e.name} ${e.cat} ${e.region} ${e.desc}`.toLowerCase().includes(q)))}
function render(){let y=cursor.getFullYear(),m=cursor.getMonth(),first=new Date(y,m,1),start=new Date(y,m,1-first.getDay()),total=0;$("#year").value=y;$("#title").textContent=cursor.toLocaleDateString(undefined,{month:"long",year:"numeric"});$("#weekdays").innerHTML=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(x=>`<div>${x}</div>`).join("");let h=[];for(let i=0;i<42;i++){let d=addDays(start,i),ev=visible(d.getFullYear(),d.getMonth(),d.getDate());total+=ev.length;h.push(`<div class="day ${d.getMonth()!=m?"out":""} ${key(d)===key(new Date())?"today":""}" data-k="${key(d)}" tabindex="0"><div class="num">${d.getDate()}</div>${ev.slice(0,4).map(e=>`<div class="event ${CLASS[e.cat]||""}" title="${e.name}">${e.name}</div>`).join("")}${ev.length>4?`<div class="event">+${ev.length-4} more</div>`:""}</div>`)}$("#grid").innerHTML=h.join("");$("#count").textContent=`${total} visible entries`;document.querySelectorAll(".day").forEach(x=>{x.onmouseenter=()=>show(x.dataset.k);x.onclick=()=>show(x.dataset.k);x.onfocus=()=>show(x.dataset.k)})}
function show(k){selected=k;let [y,m,d]=k.split("-").map(Number);m--;let dt=new Date(y,m,d),all=events(y,m,d),ev=visible(y,m,d),moon=all.find(x=>x.cat==="Astronomy");$("#details").innerHTML=`<h2>${dt.toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric",year:"numeric"})}</h2><p class="muted">${ev.length} visible · ${all.length} indexed entries</p>${ev.map(e=>`<article class="card"><span class="badge">${e.cat} · ${e.region}</span><h3>${e.name}</h3><p>${e.desc}</p></article>`).join("")||`<p class="muted">No events match the current filters.</p>`}${moon?`<div class="astro"><strong>Astronomy</strong><br>${moon.name} — ${moon.desc}</div>`:""}`;document.querySelectorAll(".day").forEach(x=>x.classList.toggle("selected",x.dataset.k===k))}
$("#region").innerHTML=["Worldwide","Canada","United States","United Kingdom","Australia","India","Japan","China","Mexico","Brazil","France","Germany","Italy","Spain","South Africa"].map(x=>`<option>${x}</option>`).join("");
$("#cats").innerHTML=CATS.map(x=>`<button data-c="${x}" class="${x===active?"active":""}">${x}</button>`).join("");
$("#cats").querySelectorAll("button").forEach(b=>b.onclick=()=>{active=b.dataset.c;$("#cats").querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===b));render()});
$("#prev").onclick=()=>{cursor.setMonth(cursor.getMonth()-1);render()};$("#next").onclick=()=>{cursor.setMonth(cursor.getMonth()+1);render()};$("#today").onclick=()=>{cursor=new Date();render();show(key(cursor))};$("#year").onchange=e=>{let y=+e.target.value;if(y>=1900&&y<=2100){cursor.setFullYear(y);render()}};$("#region").onchange=render;$("#search").oninput=render;render();