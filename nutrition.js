/* Portion values are estimates, not brand-specific measurements. */
(function(root){
  const rows = [
    ['鸡蛋（水煮）','鸡蛋 水煮蛋 煮鸡蛋 白煮蛋',155,1.1,12.6,10.6,50,'个'],
    ['米饭（熟）','米饭 白米饭 大米饭',130,28.2,2.7,.3,150,'碗'],
    ['糙米饭（熟）','糙米饭 杂粮饭',123,25.6,2.7,1,150,'碗'],
    ['燕麦片（干）','燕麦 燕麦片',389,66.3,16.9,6.9,40,'份'],
    ['全脂牛奶','牛奶 纯牛奶 全脂奶',61,4.8,3.2,3.3,250,'盒'],
    ['脱脂牛奶','脱脂奶 脱脂牛奶',34,5,3.4,.1,250,'盒'],
    ['希腊酸奶（原味脱脂）','希腊酸奶 无糖希腊酸奶',59,3.6,10.3,.4,150,'杯'],
    ['原味酸奶','酸奶 原味酸奶',72,9.3,2.5,2.7,200,'杯'],
    ['无糖豆浆','无糖豆浆 豆浆',33,1.2,3,1.8,250,'杯'],
    ['鸡胸肉（熟，去皮）','鸡胸 鸡胸肉',165,0,31,3.6,120,'份'],
    ['三文鱼（熟）','三文鱼',206,0,22.1,12.4,120,'份'],
    ['虾仁（熟）','虾 虾仁 白灼虾',99,.2,24,.3,100,'份'],
    ['瘦牛肉（熟）','牛肉 瘦牛肉',217,0,26,12,100,'份'],
    ['北豆腐','豆腐 北豆腐 老豆腐',144,2.8,17.3,8.7,100,'份'],
    ['嫩豆腐','嫩豆腐 南豆腐',61,1.2,6.2,3.7,150,'份'],
    ['西兰花（水煮）','西兰花',35,7.2,2.4,.4,150,'份'],
    ['生菜','生菜',15,2.9,1.4,.2,100,'份'],
    ['黄瓜','黄瓜',15,3.6,.7,.1,150,'根'],
    ['番茄','番茄 西红柿',18,3.9,.9,.2,150,'个'],
    ['红薯（熟）','红薯 地瓜 烤红薯',90,20.7,2,.2,150,'个'],
    ['玉米（熟，可食部分）','玉米 煮玉米',96,21,3.4,1.5,150,'根'],
    ['土豆（水煮）','土豆 马铃薯',87,20.1,1.9,.1,150,'个'],
    ['香蕉','香蕉',89,22.8,1.1,.3,100,'根'],
    ['苹果','苹果',52,13.8,.3,.2,180,'个'],
    ['橙子','橙 橙子',47,11.8,.9,.1,130,'个'],
    ['蓝莓','蓝莓',57,14.5,.7,.3,125,'盒'],
    ['草莓','草莓',32,7.7,.7,.3,150,'份'],
    ['牛油果','牛油果 鳄梨',160,8.5,2,14.7,140,'个'],
    ['杏仁','杏仁',579,21.6,21.2,49.9,20,'小把'],
    ['核桃仁','核桃 核桃仁',654,13.7,15.2,65.2,20,'小把'],
    ['橄榄油','橄榄油 食用油',884,0,0,100,5,'茶匙'],
    ['全麦面包','全麦面包 全麦吐司',247,41,13,4.2,35,'片'],
    ['白吐司','面包 吐司 白吐司',266,49,9,3.2,35,'片'],
    ['馒头','馒头 白馒头',223,47,7,1.1,100,'个'],
    ['白粥','白粥 大米粥 稀饭',46,10,1,.1,250,'碗'],
    ['面条（水煮）','面条 清水面',138,25,4.5,2.1,200,'碗'],
    ['荞麦面（熟）','荞麦面',99,21.4,5.1,.1,200,'碗'],
    ['鸡肉蔬菜沙拉（含少量酱）','鸡肉沙拉 鸡胸肉沙拉',105,7,10,4,300,'份'],
    ['蔬菜沙拉（不含酱）','蔬菜沙拉 沙拉',25,4,1,.3,200,'份'],
    ['拿铁（无糖全脂奶）','拿铁 无糖拿铁',50,4,2.6,2.6,300,'杯'],
    ['美式咖啡（无糖）','美式 黑咖啡 咖啡',1,0,.1,0,300,'杯'],
    ['蒸饺（肉馅）','蒸饺 饺子 水饺',220,27,9,8,25,'个'],
    ['肉包','肉包 包子',230,30,9,8,100,'个'],
    ['茶叶蛋','茶叶蛋',150,1,13,10,50,'个'],
    ['煎蛋','煎蛋 荷包蛋',196,1,13.6,15,55,'个'],
    ['花生酱','花生酱',588,20,25,50,15,'汤匙'],
    ['番茄炒蛋','番茄炒蛋 西红柿炒鸡蛋 西红柿炒蛋',110,6,7,7,250,'盘'],
    ['青椒炒肉','青椒炒肉 辣椒炒肉 农家小炒肉',175,7,13,11,250,'盘'],
    ['鱼香肉丝','鱼香肉丝',165,15,10,8,250,'盘'],
    ['宫保鸡丁','宫保鸡丁',185,15,13,9,250,'盘'],
    ['麻婆豆腐','麻婆豆腐',130,8,8,8,300,'份'],
    ['红烧肉','红烧肉 五花肉',360,8,16,29,150,'份'],
    ['红烧排骨','红烧排骨 糖醋排骨',265,10,20,16,180,'份'],
    ['可乐鸡翅','可乐鸡翅 红烧鸡翅',225,11,18,12,180,'份'],
    ['番茄炖牛腩','番茄炖牛腩 西红柿牛腩 牛腩煲',125,7,11,6,350,'碗'],
    ['土豆炖牛肉','土豆炖牛肉 牛肉炖土豆',135,12,10,5,350,'碗'],
    ['肉末茄子','肉末茄子 鱼香茄子',150,13,7,8,250,'盘'],
    ['酸辣土豆丝','酸辣土豆丝 炒土豆丝 土豆丝',115,17,2,5,250,'盘'],
    ['地三鲜','地三鲜',170,18,3,10,300,'盘'],
    ['清炒时蔬','清炒时蔬 炒青菜 清炒青菜 清炒生菜 炒蔬菜',75,7,3,4,250,'盘'],
    ['蒜蓉西兰花','蒜蓉西兰花 炒西兰花',70,8,4,3,250,'盘'],
    ['家常蒸蛋','蒸蛋 鸡蛋羹 水蒸蛋',82,3,7,5,200,'碗'],
    ['清蒸鱼','清蒸鱼 清蒸鲈鱼 蒸鱼',120,2,19,4,250,'份'],
    ['红烧鱼','红烧鱼',155,7,17,7,250,'份'],
    ['炒饭','炒饭 蛋炒饭 扬州炒饭',185,28,6,6,350,'份'],
    ['炒面','炒面 家常炒面',195,29,7,6,350,'份'],
    ['西红柿鸡蛋面','西红柿鸡蛋面 番茄鸡蛋面',105,15,5,3,550,'碗'],
    ['牛肉面','牛肉面 兰州牛肉面 牛肉拉面',110,15,7,3,650,'碗'],
    ['重庆小面','重庆小面 麻辣小面',165,22,6,6,500,'碗'],
    ['螺蛳粉','螺蛳粉',165,23,5,6,500,'碗'],
    ['黄焖鸡米饭','黄焖鸡米饭 黄焖鸡套餐',128,18,7,3.5,650,'份'],
    ['盖浇饭','盖浇饭 盖饭 家常盖饭',145,21,7,4,600,'份'],
    ['卤肉饭','卤肉饭 台湾卤肉饭',180,22,7,7,500,'份'],
    ['烤肉拌饭','烤肉拌饭 烧肉饭',170,22,9,5,550,'份'],
    ['鸡排饭','鸡排饭 炸鸡排饭',190,23,9,7,550,'份'],
    ['麻辣烫（含主食）','麻辣烫 麻辣拌 冒菜',135,15,7,6,600,'碗'],
    ['麻辣烫（少主食）','轻食麻辣烫 麻辣烫少粉 麻辣烫不喝汤',95,8,8,4,550,'碗'],
    ['砂锅米线','砂锅米线 云南米线 过桥米线',120,18,6,3,600,'碗'],
    ['酸菜鱼饭','酸菜鱼饭 酸菜鱼套餐',135,17,8,4,650,'份'],
    ['水饺（肉馅，10个）','水饺 饺子 肉饺子 煮饺子',220,27,9,8,250,'份'],
    ['煎饼果子','煎饼果子 煎饼 鸡蛋煎饼',220,28,9,8,250,'套'],
    ['肉夹馍','肉夹馍',245,30,11,9,180,'个'],
    ['轻食鸡胸饭','轻食 鸡胸饭 减脂餐 健身餐',105,14,9,2.5,450,'份'],
    ['波奇饭','波奇饭 poke饭 夏威夷拌饭',125,16,9,3.5,450,'份'],
    ['珍珠奶茶（全糖）','珍珠奶茶 全糖奶茶 黑糖珍珠奶茶 波霸奶茶',105,20,1.5,2,500,'杯'],
    ['珍珠奶茶（半糖）','半糖奶茶 半糖珍珠奶茶 五分糖奶茶',80,14,1.8,2,500,'杯'],
    ['鲜奶茶（无糖）','无糖奶茶 无糖鲜奶茶 鲜奶茶',52,5,2.6,2.5,450,'杯'],
    ['普通奶茶（全糖）','奶茶 全糖奶茶 原味奶茶',90,17,1.5,2,500,'杯'],
    ['水果茶（全糖）','水果茶 全糖水果茶 杨枝甘露风味果茶',70,17,0.5,0.2,500,'杯'],
    ['水果茶（半糖）','半糖水果茶 五分糖水果茶',48,11.5,0.5,0.2,500,'杯'],
    ['芝士奶盖茶','芝士奶盖 奶盖茶 芝士茶',92,13,2,3.5,500,'杯'],
    ['杨枝甘露','杨枝甘露 芒果西米露',115,20,1.5,3.2,450,'杯'],
    ['生椰拿铁','生椰拿铁 椰乳拿铁',70,8,1,3.8,450,'杯'],
    ['珍珠（奶茶加料）','珍珠 波霸 黑糖珍珠 奶茶加珍珠',190,45,0.3,0.2,60,'份'],
    ['椰果（奶茶加料）','椰果 奶茶加椰果',145,35,0.2,0.2,60,'份'],
    ['奶盖（加料）','奶盖 芝士奶盖 加奶盖',310,10,5,28,50,'份']
  ];
  const catalog=rows.map((r,id)=>({id:String(id),name:r[0],aliases:r[1].split(' '),kcal:r[2],carbs:r[3],protein:r[4],fat:r[5],grams:r[6],unit:r[7]}));
  const factors=['kcal','carbs','protein','fat'];
  const round=n=>Math.round(n*10)/10;
  function query(text){
    let q=text.trim().replace(/^(吃了|吃|喝了|喝)/,'');
    const m=q.match(/^([\d.]+|半|一|两|二|三|四|五|六|七|八|九|十)\s*(小把|茶匙|汤匙|碗|盘|套|个|份|杯|盒|片|根|袋|包)\s*/);
    const digits={半:.5,一:1,两:2,二:2,三:3,四:4,五:5,六:6,七:7,八:8,九:9,十:10};
    const count=m?(digits[m[1]]??Number(m[1])):1;
    if(m)q=q.slice(m[0].length);
    const matches=catalog.map(f=>({f,score:f.name===q||f.aliases.includes(q)?3:f.aliases.some(a=>a.includes(q))?2:f.name.includes(q)?1:0})).filter(v=>q?v.score>0:true).sort((a,b)=>b.score-a.score).map(v=>v.f);
    return {matches,count:Number.isFinite(count)&&count>0&&count<=20?count:1,unit:m?.[2]||null};
  }
  function portion(food,count){
    if(!Number.isFinite(count)||count<=0||count>20)throw Error('请选择 0 到 20 份之间的食用份数');
    return {name:food.name,grams:round(food.grams*count),...Object.fromEntries(factors.map(k=>[k,round(food[k]*food.grams/100*count)])),portion:`${count} ${food.unit}`,source:'catalog',catalogId:food.id,count};
  }
  function normalize(text){return text.normalize('NFKC').replace(/[，,]/g,'.').replace(/[：]/g,':').replace(/千\s*焦/g,'kJ').replace(/千\s*卡|大\s*卡/g,'kcal').replace(/毫\s*升/g,'ml').replace(/克/g,'g').replace(/公\s*斤/g,'kg').replace(/净\s*含\s*量/g,'净含量').replace(/碳\s*水\s*化\s*合\s*物/g,'碳水化合物').replace(/蛋\s*白\s*质/g,'蛋白质').replace(/脂\s*肪/g,'脂肪').replace(/能\s*量/g,'能量');}
  function parseLabel(text){
    const corrected=text.replace(/干\s*焦/g,'千焦').replace(/兢\s*水\s*化\s*合\s*物/g,'碳水化合物').replace(/净\s*合\s*量/g,'净含量');
    const t=normalize(corrected),warnings=[];
    if(corrected!==text)warnings.push('已修正常见标签字形，请对照原标签确认热量与净含量。');
    const energy=t.match(/(?:能量|热量|energy|calories)\s*[:|]?\s*(\d+(?:\.\d+)?)\s*(kcal|kj|卡路里)?/i);
    if(!energy)return {error:'未找到热量。请拍清楚营养成分表，或粘贴包含“能量 / 热量”的标签文字。'};
    const unit=energy[2]?.toLowerCase()||(/calories/i.test(energy[0])?'kcal':null);
    if(!unit)return {error:'热量单位未识别，请在标签文字中补全 kJ、千焦或 kcal；不能直接把千焦当成大卡。'};
    const kcal=Number(energy[1])/(unit==='kj'?4.184:1);
    let basis=null,baseAmount=null,baseUnit=null;
    const per=t.match(/(?:每\s*|per\s*)(\d+(?:\.\d+)?)\s*(kg|g|ml|l)\b/i);
    const serving=t.match(/(?:每份|每一份|per\s+serving|serving\s+size)/i);
    const whole=t.match(/(?:每袋|每包|每瓶|每盒|整包|整袋|per\s+(?:pack|bottle))/i);
    if(per){basis='weight';baseAmount=Number(per[1]);baseUnit=per[2].toLowerCase();if(baseUnit==='kg'){baseAmount*=1000;baseUnit='g';}if(baseUnit==='l'){baseAmount*=1000;baseUnit='ml';}}
    else if(whole)basis='pack';else if(serving)basis='serving';
    if(!basis)return {error:'未识别计量基准。请让照片包含表头“每100克 / 每份 / 每包”。'};
    const net=t.match(/(?:净含量|净重|net\s*(?:weight|wt|content)?)[\s:约]*([\d.]+)\s*(kg|g|ml|l)\b/i);
    let netAmount=net?Number(net[1]):null,netUnit=net?.[2].toLowerCase();
    if(netUnit==='kg'){netAmount*=1000;netUnit='g';}if(netUnit==='l'){netAmount*=1000;netUnit='ml';}
    const servingSize=t.match(/(?:每份|serving\s+size)\s*[:(（]?\s*([\d.]+)\s*(g|ml)/i);
    const servings=t.match(/(?:每(?:包|袋|盒|瓶)(?:装|含|约|有)?|servings\s+per\s+container)\s*[:约]?\s*([\d.]+)\s*(?:份)?/i);
    let multiplier=1,amount=0,portionUnit=basis==='serving'?'份':'包';
    if(basis==='weight'){
      if(!netAmount||baseAmount<=0||netUnit!==baseUnit)return {error:'这张表按重量 / 容量标注，还需要包装净含量才能算整包。请补拍含“净含量”的位置，或把这行标签文字粘贴进来。'};
      multiplier=netAmount/baseAmount;amount=netAmount;
    }else if(basis==='serving'){
      amount=servingSize?Number(servingSize[1]):0;
      if(servings&&Number(servings[1])>0){multiplier=Number(servings[1]);portionUnit='包';amount*=multiplier;}
    }else amount=netAmount||0;
    if(!Number.isFinite(kcal)||kcal<0||kcal*multiplier>20000||multiplier<=0)return {error:'识别到的数值异常，请核对标签后重试。'};
    const result={kcal:round(kcal*multiplier),grams:round(amount),unit:portionUnit,source:'label',basis,originalEnergy:`${energy[1]} ${unit}`,multiplier,missing:[]};
    const patterns={carbs:/(?:碳水化合物|碳水|(?:total\s+)?carbohydrate[s]?)\s*[:|]?\s*(\d+(?:\.\d+)?)\s*g?/i,protein:/(?:蛋白质|protein)\s*[:|]?\s*(\d+(?:\.\d+)?)\s*g?/i,fat:/(?:脂肪|(?:total\s+)?fat)\s*[:|]?\s*(\d+(?:\.\d+)?)\s*g?/i};
    for(const k of ['carbs','protein','fat']){const m=t.match(patterns[k]);result[k]=m?round(Number(m[1])*multiplier):0;if(!m)result.missing.push(k);}
    if(result.missing.length)warnings.push('部分营养素未识别，保存后会标注“营养信息不完整”，不推算精确的下一餐克数。');
    result.description=basis==='weight'?`每 ${baseAmount} ${baseUnit} · 净含量 ${netAmount} ${netUnit}`:basis==='serving'?`标签按每份标注${portionUnit==='包'?` · 每包 ${multiplier} 份`:''}`:'标签按整包标注';
    result.warnings=warnings;
    return result;
  }
  function labelPortion(parsed,count,name){
    if(parsed.error)throw Error(parsed.error);
    if(!Number.isFinite(count)||count<=0||count>20)throw Error('请选择有效份数');
    return {name:name.trim()||'包装食品',grams:round(parsed.grams*count),...Object.fromEntries(factors.map(k=>[k,round(parsed[k]*count)])),portion:`${count} ${parsed.unit}`,source:'label',count,labelBase:parsed,missing:parsed.missing||[]};
  }
  function manualPortion(name,kjPer100g,grams){
    const kj=Number(kjPer100g),weight=Number(grams);
    if(!Number.isFinite(kj)||kj<=0||kj>100000)throw Error('请输入包装上每 100g 的千焦数');
    if(!Number.isFinite(weight)||weight<=0||weight>10000)throw Error('请输入这次实际吃下的克重');
    const foodName=name.trim();if(!foodName)throw Error('请填写食品名称');
    return {name:foodName,grams:round(weight),kcal:round(kj/4.184*weight/100),carbs:0,protein:0,fat:0,portion:`${round(weight)} g`,source:'manual',missing:['carbs','protein','fat'],manualBase:{kjPer100g:round(kj),grams:round(weight)}};
  }
  function evaluation(d,date,today){
    const tasks=[...['早餐','午餐','晚餐'].map((name,i)=>({name,done:!!d?.meals?.[i]?.length})),{name:'喝水',done:(d?.water||0)>=2000},{name:'睡眠',done:!!d?.sleep},{name:'阅读',done:!!d?.read}];
    const completed=tasks.filter(t=>t.done).length,score=Math.round(completed/6*100);
    const hasRecord=!!d&&(d.meals.some(m=>m.length)||d.water>0||d.sleep||d.read||d.finalized);
    const settled=date<today||d?.finalized;
    const status=date>today?'future':!hasRecord?'empty':score===100?'success':score>=50?'halfway':settled?'failed':'progress';
    return {tasks,completed,score,status,characterState:score===100?'happy':score>=50?'encouraging':'idle',emoji:{success:'😊',halfway:'🙂',failed:'😠',progress:'◔',empty:'—',future:''}[status]};
  }
  const api={catalog,query,portion,parseLabel,labelPortion,manualPortion,evaluation};root.Nutrition=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
