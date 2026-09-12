let entryMode='name',picked=null,parsedLabel=null,legacyFood=null,monthView=selected.slice(0,7),lastSelected=selected,photoUrl=null,ocrGeneration=0,ocrWorker=null;
const nutrientNames={carbs:'碳水',protein:'蛋白质',fat:'脂肪'};
function switchEntry(mode){
  ocrGeneration++;if(ocrWorker){ocrWorker.terminate();ocrWorker=null;}
  entryMode=mode;legacyFood=null;picked=null;parsedLabel=null;
  $('name-panel').hidden=mode!=='name';$('label-panel').hidden=mode!=='label';
  $('name-tab').setAttribute('aria-pressed',String(mode==='name'));$('label-tab').setAttribute('aria-pressed',String(mode==='label'));
  $('portion-panel').hidden=true;$('save-food').disabled=true;$('label-confirm').checked=false;
  if(mode==='name')showMatches();
}
function openFood(i,f){
  activeMeal=i;editId=f?.id||null;ocrGeneration++;if(ocrWorker){ocrWorker.terminate();ocrWorker=null;}
  $('food-form').reset();$('food-title').textContent=`${f?'编辑':'记录'}${names[i]}`;
  $('label-preview').hidden=true;$('label-error').textContent='';$('ocr-status').textContent='照片只在当前浏览器内识别，不上传、不保存。';
  $('label-details').open=false;
  if(photoUrl){URL.revokeObjectURL(photoUrl);photoUrl=null;}
  switchEntry('name');
  if(f?.source==='catalog'&&Nutrition.catalog.some(v=>v.id===f.catalogId)){
    $('food-search').value=f.name;showMatches();selectFood(Nutrition.catalog.find(v=>v.id===f.catalogId),f.count||1);
  }else if(f?.source==='label'&&f.labelBase){
    switchEntry('label');parsedLabel=f.labelBase;$('package-name').value=f.name;$('portion-count').value=f.count||1;$('label-confirm').checked=true;showPortion();
  }else if(f){
    legacyFood=f;$('food-search').value=f.name;$('food-matches').replaceChildren();$('portion-count').value=1;showPortion();
  }
  $('food-dialog').showModal();
}
function showMatches(){
  const q=Nutrition.query($('food-search').value);$('food-matches').replaceChildren();
  if(!q.matches.length){const p=document.createElement('p');p.className='form-help';p.textContent='暂未收录这个食物。试试更简单的名称，或切换到包装标签；不会凭空估算未知食品。';$('food-matches').append(p);return;}
  q.matches.slice(0,$('food-search').value?12:8).forEach(f=>{
    const b=document.createElement('button');b.type='button';b.className='food-match';
    const label=document.createElement('span');label.textContent=f.name;
    const amount=document.createElement('small');amount.textContent=`1 ${f.unit} ≈ ${n(f.kcal*f.grams/100)} kcal`;
    b.append(label,amount);b.onclick=()=>selectFood(f,q.count);$('food-matches').append(b);
  });
}
function selectFood(f,count=1){picked=f;legacyFood=null;$('portion-count').value=count;showPortion();}
function currentPortion(){
  const count=Number($('portion-count').value);
  if(legacyFood){if(!Number.isFinite(count)||count<=0||count>20)throw Error('份数无效');return {...legacyFood,...Object.fromEntries(['kcal','carbs','protein','fat','grams'].map(k=>[k,Math.round(legacyFood[k]*count*10)/10])),portion:count===1?(legacyFood.portion||'原记录份量'):`${count} × 原记录份量`,source:'legacy'};}
  if(entryMode==='name'&&picked)return Nutrition.portion(picked,count);
  if(entryMode==='label'&&parsedLabel)return Nutrition.labelPortion(parsedLabel,count,$('package-name').value);
  return null;
}
function showPortion(){
  $('portion-panel').hidden=!(picked||parsedLabel||legacyFood);
  $('label-confirm-row').hidden=entryMode!=='label';
  const unit=legacyFood?'份原记录':entryMode==='name'?picked?.unit:parsedLabel?.unit;
  $('portion-unit').textContent=unit||'份';
  $('picked-name').textContent=legacyFood?.name||(entryMode==='name'?picked?.name:$('package-name').value||'包装食品');
  $('portion-hint').textContent=legacyFood?'保留原记录，选择倍数即可':entryMode==='name'?`常见大小：1 ${unit}约 ${picked?.grams} ${['牛奶','豆浆','拿铁','咖啡'].some(v=>picked?.name.includes(v))?'ml':'g'}，无需称重`:parsedLabel?.description||'';
  $('source-badge').textContent=legacyFood?'原记录':entryMode==='name'?'份量估算':'标签换算';
  let food=null;try{food=currentPortion();}catch{}
  $('save-food').disabled=!food||(entryMode==='label'&&!$('label-confirm').checked)||!$('portion-count').checkValidity();
  if(!food){$('result-kcal').textContent='—';$('result-macros').textContent='请选择有效份数';return;}
  $('result-kcal').textContent=n(food.kcal);
  $('result-macros').textContent=['carbs','protein','fat'].map(k=>`${nutrientNames[k]} ${food.missing?.includes(k)?'未识别':food[k]+'g'}`).join(' · ');
  $('result-note').textContent=entryMode==='label'?`${parsedLabel.originalEnergy}，已自动换算成大卡。${parsedLabel.warnings.join(' ')}`:'不同大小与做法会有差异，这是一份便于记录的近似值。';
}
$('food-search').oninput=()=>{picked=null;legacyFood=null;$('portion-panel').hidden=true;$('save-food').disabled=true;showMatches();};
$('name-tab').onclick=()=>switchEntry('name');$('label-tab').onclick=()=>switchEntry('label');
$('portion-count').oninput=showPortion;
$('portion-minus').onclick=()=>{$('portion-count').value=Math.max(.25,Number($('portion-count').value)-.5);showPortion();};
$('portion-plus').onclick=()=>{$('portion-count').value=Math.min(20,Number($('portion-count').value)+.5);showPortion();};
document.querySelectorAll('[data-count]').forEach(b=>b.onclick=()=>{$('portion-count').value=b.dataset.count;showPortion();});
$('package-name').oninput=()=>{if(parsedLabel)showPortion();};$('label-confirm').onchange=showPortion;
$('label-text').oninput=()=>{parsedLabel=null;$('portion-panel').hidden=true;$('save-food').disabled=true;$('label-confirm').checked=false;};
function parseCurrentLabel(){
  const result=Nutrition.parseLabel($('label-text').value);$('label-error').textContent=result.error||'';
  parsedLabel=result.error?null:result;$('portion-count').value=1;$('label-confirm').checked=false;
  if(parsedLabel)showPortion();else{$('portion-panel').hidden=true;$('save-food').disabled=true;}
}
$('parse-label').onclick=parseCurrentLabel;
$('food-form').onsubmit=e=>{
  e.preventDefault();if($('save-food').disabled)return;
  let f;try{f=currentPortion();}catch{return;}if(!f)return;
  f.id=editId||crypto.randomUUID();if(!validFood(f))return;
  mutate(d=>{if(editId){const index=d.meals[activeMeal].findIndex(v=>v.id===editId);if(index>=0)d.meals[activeMeal][index]=f;}else d.meals[activeMeal].push(f);});
  $('food-dialog').close();
};
function loadOCR(){
  if(window.Tesseract)return Promise.resolve();
  return new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='vendor/ocr/tesseract.min.js';script.onload=resolve;script.onerror=()=>{script.remove();reject(Error('识别组件加载失败，请重试或粘贴标签文字。'));};document.head.append(script);});
}
async function prepareLabelImage(file){
  const bitmap=await createImageBitmap(file);
  const scale=Math.min(2,2200/Math.max(bitmap.width,bitmap.height));
  const canvas=document.createElement('canvas');canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);
  const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.fillStyle='white';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();
  const image=ctx.getImageData(0,0,canvas.width,canvas.height),data=image.data,w=canvas.width,h=canvas.height;
  const darkRows=new Uint32Array(h),darkCols=new Uint32Array(w);
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){const p=(y*w+x)*4;const gray=.299*data[p]+.587*data[p+1]+.114*data[p+2];data[p]=data[p+1]=data[p+2]=gray;if(gray<100){darkRows[y]++;darkCols[x]++;}}
  // Long table rules confuse text segmentation; remove only near-continuous lines.
  const rows=new Set(),cols=new Set();
  darkRows.forEach((v,y)=>{if(v>w*.65)for(let z=Math.max(0,y-1);z<=Math.min(h-1,y+1);z++)rows.add(z);});
  darkCols.forEach((v,x)=>{if(v>h*.75)for(let z=Math.max(0,x-1);z<=Math.min(w-1,x+1);z++)cols.add(z);});
  for(const y of rows)for(let x=0;x<w;x++){const p=(y*w+x)*4;data[p]=data[p+1]=data[p+2]=255;}
  for(const x of cols)for(let y=0;y<h;y++){const p=(y*w+x)*4;data[p]=data[p+1]=data[p+2]=255;}
  ctx.putImageData(image,0,0);return canvas;
}
$('label-photo').onchange=()=>recognizePhoto($('label-photo').files[0],false);
$('extra-photo').onchange=()=>recognizePhoto($('extra-photo').files[0],true);
async function recognizePhoto(file,append){
  if(!file)return;
  const previousText=append?$('label-text').value:'';
  const generation=++ocrGeneration;if(ocrWorker){ocrWorker.terminate();ocrWorker=null;}
  if(!file.type.startsWith('image/')||file.size>15*1024*1024){$('ocr-status').textContent='请选择不超过 15MB 的图片。';return;}
  if(photoUrl)URL.revokeObjectURL(photoUrl);photoUrl=URL.createObjectURL(file);
  $('label-preview').src=photoUrl;$('label-preview').hidden=false;
  $('ocr-status').textContent='正在准备本地识别，首次使用可能需要几秒…';
  parsedLabel=null;$('portion-panel').hidden=true;$('save-food').disabled=true;
  let worker;let timeout;
  try{
    await loadOCR();if(generation!==ocrGeneration)return;
    worker=await Tesseract.createWorker('chi_sim',1,{workerPath:new URL('vendor/ocr/worker.min.js',location.href).href,corePath:new URL('vendor/ocr/',location.href).href,langPath:new URL('vendor/ocr/lang/',location.href).href,logger:m=>{if(generation===ocrGeneration&&m.status==='recognizing text')$('ocr-status').textContent=`正在识别标签 ${Math.round(m.progress*100)}%`;}});
    if(generation!==ocrGeneration){await worker.terminate();return;}ocrWorker=worker;
    const prepared=await prepareLabelImage(file);
    await worker.setParameters({tessedit_pageseg_mode:'6',preserve_interword_spaces:'1'});
    const result=await Promise.race([worker.recognize(prepared),new Promise((_,reject)=>timeout=setTimeout(()=>reject(Error('识别时间较长。请换一张清晰的近照，或直接粘贴标签文字。')),90000))]);
    if(generation!==ocrGeneration)return;
    $('label-text').value=previousText+'\n'+result.data.text;parseCurrentLabel();
    $('label-details').open=!parsedLabel;
    $('ocr-status').textContent=parsedLabel?'已读取标签，请核对自动换算结果后保存。':'已读取文字，但信息不完整。可补拍净含量或修正下方文字后重试。';
  }catch(error){if(generation===ocrGeneration)$('ocr-status').textContent=error.message||'未能识别，请重新拍照或粘贴标签文字。';}
  finally{clearTimeout(timeout);if(worker)await worker.terminate();if(ocrWorker===worker)ocrWorker=null;}
}
$('food-dialog').addEventListener('close',()=>{ocrGeneration++;if(ocrWorker){ocrWorker.terminate();ocrWorker=null;}if(photoUrl){URL.revokeObjectURL(photoUrl);photoUrl=null;}});
function dateParts(year,month,day){return `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;}
function moveMonth(offset){const [y,m]=monthView.split('-').map(Number);const d=new Date(y,m-1+offset,1);monthView=dateParts(d.getFullYear(),d.getMonth()+1,1).slice(0,7);renderTracker();}
$('month-prev').onclick=()=>moveMonth(-1);$('month-next').onclick=()=>moveMonth(1);$('month-today').onclick=()=>{monthView=localDate().slice(0,7);renderTracker();};
function renderTracker(){
  if(selected!==lastSelected){monthView=selected.slice(0,7);lastSelected=selected;}
  const [year,month]=monthView.split('-').map(Number),today=localDate();
  $('month-title').textContent=`${year} 年 ${month} 月`;$('month-next').disabled=monthView>=today.slice(0,7);
  const first=(new Date(year,month-1,1).getDay()+6)%7,last=new Date(year,month,0).getDate();
  $('calendar-grid').replaceChildren();let successes=0,recorded=0,scoreSum=0;
  for(let i=0;i<first;i++)$('calendar-grid').append(document.createElement('span'));
  for(let num=1;num<=last;num++){
    const date=dateParts(year,month,num),e=Nutrition.evaluation(state.days[date],date,today);
    if(!['future','empty'].includes(e.status)){recorded++;scoreSum+=e.score;if(e.status==='success')successes++;}
    const button=document.createElement('button');button.className=`calendar-day ${e.status}${date===selected?' selected':''}${date===today?' is-today':''}`;
    button.disabled=e.status==='future';button.setAttribute('aria-label',`${date} ${statusName(e.status)}${['empty','future'].includes(e.status)?'':`，完成度 ${e.score}%`}`);button.setAttribute('aria-pressed',String(date===selected));
    const number=document.createElement('span');number.textContent=num;const face=document.createElement('span');face.className='calendar-face';face.textContent=e.emoji;face.setAttribute('aria-hidden','true');button.append(number,face);
    button.onclick=()=>{selected=date;render();};$('calendar-grid').append(button);
  }
  $('month-summary').textContent=`本月 ${successes} 天全部完成 · ${recorded} 天有记录${recorded?` · 平均完成度 ${Math.round(scoreSum/recorded)}%`:''}`;
  const e=Nutrition.evaluation(state.days[selected],selected,today);
  $('review-date').textContent=`${selected.replace(/-/g,'.')} ${selected===today?'· 今天':''}`;
  $('review-emoji').textContent=e.emoji;$('review-percent').textContent=e.status==='empty'?'—':`${e.score}%`;$('review-status').textContent=statusName(e.status);
  $('review-fill').style.width=e.score+'%';$('review-tasks').replaceChildren();
  e.tasks.forEach(task=>{const item=document.createElement('span');item.className=task.done?'done':'';item.textContent=`${task.done?'✓':'○'} ${task.name}`;$('review-tasks').append(item);});
  $('review-message').textContent=e.status==='success'?'六项计划都完成了。今天，给自己一个笑脸。':e.status==='failed'?`完成了 ${e.completed} / 6 项。表情记录结果，不定义你；下一天继续。`:e.status==='empty'?'这一天还没有记录。从一餐饭或一杯水开始。':`已完成 ${e.completed} / 6 项，今天还在继续。`;
  $('finish-day').hidden=selected!==today||e.status==='empty'||e.status==='success';$('finish-day').textContent=day().finalized?'继续记录今天':'结束今天，查看评价';
}
function statusName(status){return {success:'全部完成',failed:'未完成',progress:'进行中',empty:'未记录',future:'尚未开始'}[status];}
$('finish-day').onclick=()=>mutate(d=>d.finalized=!d.finalized);
render();
