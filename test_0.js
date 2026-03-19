
// === APP STATE ===
const APP = {
  currentView: 'loading',
  selectedCity: null,
  selectedRoute: null,
  checkedPoints: JSON.parse(localStorage.getItem('cw_checked') || '{}'),
  achievements: JSON.parse(localStorage.getItem('cw_achievements') || '[]'),
  totalCheckins: parseInt(localStorage.getItem('cw_total') || '0'),
  demoMode: false,
  amapKey: '040c3af03bab9232ab67e0d232838b28'
};
// [MOCK_DATA]
const CITY_COLORS = {
  '上海':['#ff6b35','#e84393'],'北京':['#e84393','#a29bfe'],
  '成都':['#00b894','#00cec9'],'杭州':['#74b9ff','#a29bfe'],
  '长沙':['#fdcb6e','#e17055'],'广州':['#fd79a8','#e84393']
};
const CITY_IMAGES = {
  '上海':'https://images.unsplash.com/photo-1537531383496-47ad37110765?w=600&q=80',
  '北京':'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&q=80',
  '成都':'https://images.unsplash.com/photo-1590103514966-5e2a11c13b52?w=600&q=80',
  '杭州':'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=600&q=80',
  '长沙':'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80',
  '广州':'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80'
};
const CHALLENGES = [
  {icon:'📸',text:'在这里拍一张最有创意的自拍！'},
  {icon:'🍜',text:'品尝这附近最受欢迎的一道小吃，并给它打分！'},
  {icon:'🎨',text:'用手机画一幅这个地方的速写！'},
  {icon:'👋',text:'和一位当地人聊天，问一个关于这里的故事！'},
  {icon:'📝',text:'用三个词描述此刻的心情，发到朋友圈！'},
  {icon:'🎵',text:'找到这附近的街头艺人，听一首歌！'},
  {icon:'🌿',text:'收集一片有特色的树叶或花瓣作为纪念！'},
  {icon:'☕',text:'在最近的咖啡店点一杯特色饮品！'},
  {icon:'🔍',text:'找到一个隐藏的有趣细节（涂鸦、门牌号等）！'},
  {icon:'🧭',text:'闭上眼睛转三圈，朝面对的方向走100步看看有什么！'}
];
const MOCK_DATA = {
'上海':{
  slogan:'魔都不夜城',
  routes:[
    {id:'sh1',name:'法租界文艺漫步',banner:'https://images.unsplash.com/photo-1548919973-5cef591cdbc9?w=600&q=80',
     desc:'穿梭百年梧桐树下，感受老上海的浪漫与摩登并存。从武康大楼出发，走过最有腔调的咖啡一条街。',
     difficulty:'easy',season:'春秋',duration:'3-4h',distance:'5.2km',
     points:[
       {name:'武康大楼',type:'历史建筑',desc:'上海最著名的Art Deco风格公寓，网红打卡第一站',lat:31.2050,lng:121.4365,color:'#ff6b35'},
       {name:'武康路',type:'历史街区',desc:'百年梧桐夹道的浪漫老路，名人故居云集',lat:31.2065,lng:121.4370,color:'#e84393'},
       {name:'安福路',type:'文艺街区',desc:'话剧艺术中心所在地，独立品牌聚集',lat:31.2088,lng:121.4395,color:'#a29bfe'},
       {name:'乌鲁木齐中路',type:'美食街',desc:'隐藏美食宝藏街道，从日料到越南粉应有尽有',lat:31.2103,lng:121.4420,color:'#00b894'},
       {name:'巨鹿路',type:'潮流街区',desc:'网红店密集，vintage古着店探索之旅',lat:31.2125,lng:121.4455,color:'#fdcb6e'},
       {name:'思南公馆',type:'历史建筑群',desc:'花园洋房里的下午茶，感受海派生活美学',lat:31.2140,lng:121.4480,color:'#74b9ff'}
     ]},
    {id:'sh2',name:'外滩到城隍庙探味',banner:'https://images.unsplash.com/photo-1474181628612-1048006d5feb?w=600&q=80',
     desc:'从十里洋场到烟火人间，一条路线吃遍上海味道。万国建筑群到豫园九曲桥，经典不容错过。',
     difficulty:'easy',season:'四季',duration:'4-5h',distance:'4.8km',
     points:[
       {name:'外滩万国建筑群',type:'地标',desc:'中国近代史的见证，黄浦江畔最壮观的天际线',lat:31.2400,lng:121.4900,color:'#ff6b35'},
       {name:'南京路步行街',type:'商业街',desc:'百年老字号与现代商场并存的购物天堂',lat:31.2370,lng:121.4800,color:'#e84393'},
       {name:'人民广场',type:'地标广场',desc:'上海市中心的绿肺，周边博物馆值得一逛',lat:31.2310,lng:121.4730,color:'#a29bfe'},
       {name:'福州路文化街',type:'文化街',desc:'书香四溢的文化一条街，古籍书店寻宝',lat:31.2345,lng:121.4770,color:'#00b894'},
       {name:'豫园',type:'古典园林',desc:'四百年江南古典园林，领略海派园林之美',lat:31.2270,lng:121.4920,color:'#fdcb6e'},
       {name:'城隍庙美食广场',type:'美食区',desc:'南翔小笼、蟹粉生煎…上海味道集大成之处',lat:31.2260,lng:121.4930,color:'#fd79a8'},
       {name:'老码头',type:'创意园区',desc:'百年老仓库改造的时尚创意空间',lat:31.2240,lng:121.4960,color:'#74b9ff'}
     ]},
    {id:'sh3',name:'苏州河畔艺术巡礼',banner:'https://images.unsplash.com/photo-1506158722652-12e95ebbc643?w=600&q=80',
     desc:'沿苏州河畔的当代艺术之旅。从M50到梦想公园，探索这座城市最有活力的创意地带。',
     difficulty:'medium',season:'春秋',duration:'5-6h',distance:'7.1km',
     points:[
       {name:'M50创意园',type:'艺术园区',desc:'上海最早的创意园区之一，画廊与工作室云集',lat:31.2460,lng:121.4490,color:'#a29bfe'},
       {name:'普陀区梦清园',type:'公园',desc:'苏州河畔的生态绿地，适合小憩',lat:31.2480,lng:121.4350,color:'#00b894'},
       {name:'长寿路咖啡带',type:'咖啡街',desc:'新晋咖啡圣地，独立咖啡馆连绵不绝',lat:31.2420,lng:121.4400,color:'#fdcb6e'},
       {name:'四行仓库',type:'历史遗址',desc:'淞沪会战的历史见证，抗战纪念地',lat:31.2405,lng:121.4700,color:'#e84393'},
       {name:'上海邮政博物馆',type:'博物馆',desc:'欧式建筑里的邮政历史，天台视角绝佳',lat:31.2450,lng:121.4880,color:'#ff6b35'},
       {name:'外白渡桥',type:'历史桥梁',desc:'上海第一座钢铁桥，浪漫的黄昏必到之处',lat:31.2440,lng:121.4930,color:'#74b9ff'},
       {name:'1933老场坊',type:'创意园区',desc:'远东第一屠宰场的华丽转身，建筑本身就是艺术品',lat:31.2510,lng:121.4960,color:'#fd79a8'}
     ]}
  ]
},
'北京':{
  slogan:'千年古都新玩法',
  routes:[
    {id:'bj1',name:'胡同深度漫游',banner:'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=600&q=80',
     desc:'穿越南锣鼓巷到五道营，在胡同里发现最地道的北京。四合院里的咖啡香，胡同口的炸酱面。',
     difficulty:'easy',season:'春秋',duration:'3-4h',distance:'4.5km',
     points:[
       {name:'南锣鼓巷',type:'历史胡同',desc:'北京最热闹的胡同，文创小店与传统并存',lat:39.9372,lng:116.4025,color:'#ff6b35'},
       {name:'帽儿胡同',type:'历史胡同',desc:'婉容故居所在地，安静的老北京氛围',lat:39.9380,lng:116.4010,color:'#e84393'},
       {name:'国子监街',type:'文化街',desc:'元明清三代最高学府，古槐参天',lat:39.9460,lng:116.4110,color:'#a29bfe'},
       {name:'五道营胡同',type:'文艺街区',desc:'北京的小清新一条街，隐藏美食宝藏',lat:39.9485,lng:116.4120,color:'#00b894'},
       {name:'雍和宫',type:'寺庙',desc:'北京最灵验的藏传佛教寺院',lat:39.9475,lng:116.4170,color:'#fdcb6e'},
       {name:'地坛公园',type:'公园',desc:'史铁生笔下的那座园子，四季皆美',lat:39.9530,lng:116.4130,color:'#74b9ff'}
     ]},
    {id:'bj2',name:'中轴线文化之旅',banner:'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&q=80',
     desc:'沿着世界最长城市中轴线行走，从钟鼓楼到前门大街，触摸600年帝都的脊梁。',
     difficulty:'medium',season:'四季',duration:'5-6h',distance:'6.8km',
     points:[
       {name:'钟鼓楼',type:'历史地标',desc:'元明清三代报时中心，登楼俯瞰胡同全貌',lat:39.9430,lng:116.3930,color:'#ff6b35'},
       {name:'什刹海',type:'历史湖区',desc:'老北京的水乡记忆，荷花市场人间烟火',lat:39.9405,lng:116.3870,color:'#74b9ff'},
       {name:'景山公园',type:'皇家园林',desc:'登万春亭，看故宫全景的最佳视角',lat:39.9250,lng:116.3960,color:'#00b894'},
       {name:'故宫角楼',type:'皇家建筑',desc:'中国古建筑巅峰之作，日落时分最美',lat:39.9230,lng:116.3980,color:'#e84393'},
       {name:'天安门广场',type:'地标广场',desc:'世界最大城市广场，庄严肃穆',lat:39.9054,lng:116.3976,color:'#fdcb6e'},
       {name:'前门大街',type:'商业街',desc:'老字号聚集地，全聚德、便宜坊，老北京味道',lat:39.8980,lng:116.3970,color:'#fd79a8'},
       {name:'杨梅竹斜街',type:'文艺胡同',desc:'前门旁最文艺的斜街，独立书店与手作店',lat:39.8960,lng:116.3940,color:'#a29bfe'}
     ]},
    {id:'bj3',name:'798艺术区探索',banner:'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&q=80',
     desc:'从包豪斯厂房到当代艺术殿堂。798+望京小街，感受北京最前沿的艺术气息。',
     difficulty:'easy',season:'四季',duration:'4-5h',distance:'3.5km',
     points:[
       {name:'798艺术区大门',type:'艺术园区',desc:'中国当代艺术的地标，工业遗产与艺术的完美融合',lat:39.9840,lng:116.4940,color:'#a29bfe'},
       {name:'UCCA尤伦斯当代艺术中心',type:'美术馆',desc:'中国最重要的当代艺术机构之一',lat:39.9845,lng:116.4960,color:'#ff6b35'},
       {name:'798七星中街',type:'画廊街',desc:'大小画廊密集，随时偶遇惊喜展览',lat:39.9835,lng:116.4930,color:'#e84393'},
       {name:'751D·Park',type:'设计园区',desc:'火车头广场与设计市集的完美融合',lat:39.9860,lng:116.4910,color:'#00b894'},
       {name:'Cafe Flatwhite',type:'咖啡馆',desc:'798最出圈的咖啡馆，工业风与精品咖啡',lat:39.9830,lng:116.4925,color:'#fdcb6e'}
     ]}
  ]
},
'成都':{
  slogan:'巴适得很的慢生活',
  routes:[
    {id:'cd1',name:'太古里-宽窄巷子潮流线',banner:'https://images.unsplash.com/photo-1590103514966-5e2a11c13b52?w=600&q=80',
     desc:'从最潮的太古里到最古的宽窄巷子，一条路线打卡成都的新与旧。火锅、盖碗茶、采耳一条龙。',
     difficulty:'easy',season:'四季',duration:'4-5h',distance:'4.2km',
     points:[
       {name:'IFS国际金融中心',type:'地标商场',desc:'趴在楼顶的大熊猫是成都的潮流地标',lat:30.6567,lng:104.0827,color:'#ff6b35'},
       {name:'太古里',type:'商业街区',desc:'最会玩的开放式购物街区，快慢里巷皆精彩',lat:30.6550,lng:104.0850,color:'#e84393'},
       {name:'大慈寺',type:'寺庙',desc:'闹中取静的千年古刹，太古里旁的一片净土',lat:30.6545,lng:104.0865,color:'#a29bfe'},
       {name:'人民公园',type:'公园',desc:'成都人最爱的喝茶去处，鹤鸣茶社百年历史',lat:30.6600,lng:104.0620,color:'#00b894'},
       {name:'宽窄巷子',type:'历史街区',desc:'三百年老街的成都记忆，宽巷子慢生活',lat:30.6700,lng:104.0600,color:'#fdcb6e'},
       {name:'小通巷',type:'文艺街区',desc:'宽窄巷子旁的隐藏宝藏，本地人的文艺后花园',lat:30.6710,lng:104.0585,color:'#74b9ff'}
     ]},
    {id:'cd2',name:'玉林路小酒馆夜游',banner:'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
     desc:'"走到玉林路的尽头，坐在小酒馆的门口"。从赵雷歌里走出来的成都夜生活，文青必打卡。',
     difficulty:'easy',season:'夏秋',duration:'3-4h',distance:'3.0km',
     points:[
       {name:'玉林西路',type:'生活街区',desc:'成都最有烟火气的社区之一',lat:30.6340,lng:104.0580,color:'#ff6b35'},
       {name:'小酒馆',type:'音乐酒吧',desc:'赵雷《成都》同款酒馆，独立音乐圣地',lat:30.6338,lng:104.0575,color:'#e84393'},
       {name:'玉林综合市场',type:'市场',desc:'最市井的成都味道，烟火人间',lat:30.6335,lng:104.0590,color:'#00b894'},
       {name:'彩虹街',type:'网红街',desc:'ins风彩虹墙，出片率超高',lat:30.6330,lng:104.0560,color:'#a29bfe'},
       {name:'九眼桥酒吧街',type:'酒吧街',desc:'成都夜生活的另一面，灯火通明到天亮',lat:30.6430,lng:104.0830,color:'#fdcb6e'}
     ]},
    {id:'cd3',name:'锦里-武侯祠三国文化之旅',banner:'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80',
     desc:'三国迷的必走路线，从武侯祠到锦里古街，回望蜀汉英雄的传奇与浪漫。',
     difficulty:'easy',season:'四季',duration:'3-4h',distance:'3.2km',
     points:[
       {name:'武侯祠',type:'历史古迹',desc:'中国唯一君臣合祀的祠庙，三国文化的圣地',lat:30.6450,lng:104.0490,color:'#e84393'},
       {name:'锦里古街',type:'古街',desc:'传说中西蜀最古老的商业街，汉风唐韵',lat:30.6460,lng:104.0480,color:'#ff6b35'},
       {name:'耍都',type:'美食街',desc:'本地人推荐的美食聚集地，串串和火锅天堂',lat:30.6440,lng:104.0505,color:'#00b894'},
       {name:'浣花溪公园',type:'公园',desc:'杜甫草堂旁的诗意公园，曲径通幽',lat:30.6500,lng:104.0380,color:'#74b9ff'},
       {name:'杜甫草堂',type:'历史古迹',desc:'诗圣杜甫流寓成都时的故居，文学朝圣地',lat:30.6530,lng:104.0350,color:'#a29bfe'},
       {name:'送仙桥古玩市场',type:'市场',desc:'淘古玩、找手串，接地气的寻宝之旅',lat:30.6520,lng:104.0400,color:'#fdcb6e'}
     ]}
  ]
},
'杭州':{
  slogan:'人间天堂 诗画江南',
  routes:[
    {id:'hz1',name:'西湖十景经典环游',banner:'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=600&q=80',
     desc:'断桥残雪、苏堤春晓…步行环游西湖经典十景，感受千年文人墨客笔下的杭州之美。',
     difficulty:'medium',season:'春秋',duration:'5-6h',distance:'9.5km',
     points:[
       {name:'断桥残雪',type:'经典景点',desc:'白娘子与许仙相遇之地，西湖最浪漫的符号',lat:30.2600,lng:120.1550,color:'#74b9ff'},
       {name:'白堤',type:'景观堤',desc:'一株杨柳一株桃，春天最美的西湖画卷',lat:30.2580,lng:120.1500,color:'#00b894'},
       {name:'楼外楼',type:'老字号',desc:'百年名店，西湖醋鱼、龙井虾仁必尝',lat:30.2530,lng:120.1470,color:'#ff6b35'},
       {name:'苏堤春晓',type:'经典景点',desc:'苏东坡留给杭州的礼物，六桥烟柳如画',lat:30.2400,lng:120.1400,color:'#e84393'},
       {name:'花港观鱼',type:'经典景点',desc:'红鱼池畔赏花观鱼，园林精品',lat:30.2320,lng:120.1380,color:'#fdcb6e'},
       {name:'雷峰塔',type:'历史古迹',desc:'重建的千年古塔，登顶俯瞰西湖全景',lat:30.2310,lng:120.1480,color:'#a29bfe'},
       {name:'柳浪闻莺',type:'经典景点',desc:'西湖边最适合发呆的草坪，听莺赏柳',lat:30.2410,lng:120.1560,color:'#fd79a8'}
     ]},
    {id:'hz2',name:'南宋御街-河坊街市井游',banner:'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=600&q=80',
     desc:'穿越南宋御街到河坊街，品杭帮菜、逛药铺、喝龙井，感受最有烟火气的杭州。',
     difficulty:'easy',season:'四季',duration:'3-4h',distance:'3.5km',
     points:[
       {name:'南宋御街',type:'历史街区',desc:'800年前南宋皇帝走过的路，考古遗址就在脚下',lat:30.2470,lng:120.1690,color:'#ff6b35'},
       {name:'河坊街',type:'古街',desc:'最热闹的古街，非遗手艺人与百年老店',lat:30.2460,lng:120.1710,color:'#e84393'},
       {name:'胡庆余堂',type:'老字号',desc:'江南药王，清代药铺博物馆',lat:30.2455,lng:120.1700,color:'#00b894'},
       {name:'吴山广场',type:'广场',desc:'登吴山，看钱塘江与西湖的双面杭州',lat:30.2430,lng:120.1670,color:'#a29bfe'},
       {name:'中山南路美食街',type:'美食街',desc:'杭帮菜小馆密集，知味观总店就在这',lat:30.2440,lng:120.1720,color:'#fdcb6e'}
     ]},
    {id:'hz3',name:'灵隐-龙井禅意之旅',banner:'https://images.unsplash.com/photo-1580192985016-7e15ef081dd8?w=600&q=80',
     desc:'灵隐寺的晨钟暮鼓，龙井村的新茶飘香。远离喧嚣，在山林间寻找内心的宁静。',
     difficulty:'hard',season:'春季',duration:'6-7h',distance:'10.2km',
     points:[
       {name:'灵隐寺',type:'寺庙',desc:'杭州最古老的名刹，济公出家之地',lat:30.2400,lng:120.1050,color:'#a29bfe'},
       {name:'飞来峰',type:'自然景观',desc:'五代至宋的摩崖石刻，自然与人文的奇观',lat:30.2410,lng:120.1060,color:'#00b894'},
       {name:'永福禅寺',type:'寺庙',desc:'灵隐旁最清幽的小寺，日式庭院风格',lat:30.2420,lng:120.1040,color:'#74b9ff'},
       {name:'梅家坞',type:'茶村',desc:'西湖龙井的核心产区，茶山间品茶赏景',lat:30.2200,lng:120.0950,color:'#fdcb6e'},
       {name:'龙井村',type:'茶村',desc:'龙井茶的故乡，十八棵御茶树',lat:30.2250,lng:120.1100,color:'#ff6b35'},
       {name:'九溪烟树',type:'自然景观',desc:'九溪十八涧，最诗意的山间溪流',lat:30.2150,lng:120.1200,color:'#e84393'}
     ]}
  ]
},
'长沙':{
  slogan:'不夜星城 嗨翻全场',
  routes:[
    {id:'cs1',name:'五一广场-太平街美食暴走',banner:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
     desc:'从五一广场到太平街，一条路线吃遍长沙美食。臭豆腐、糖油粑粑、茶颜悦色，胃不够用！',
     difficulty:'easy',season:'四季',duration:'3-4h',distance:'3.0km',
     points:[
       {name:'五一广场',type:'城市中心',desc:'长沙最核心的地标，美食辐射中心',lat:28.1970,lng:112.9770,color:'#ff6b35'},
       {name:'黄兴路步行街',type:'商业街',desc:'长沙最繁华的步行街，潮流与美食并存',lat:28.1940,lng:112.9780,color:'#e84393'},
       {name:'太平街',type:'古街',desc:'两千年历史的老街，贾谊故居就在这里',lat:28.1920,lng:112.9690,color:'#a29bfe'},
       {name:'坡子街',type:'美食街',desc:'火宫殿所在地，长沙小吃的半壁江山',lat:28.1910,lng:112.9720,color:'#00b894'},
       {name:'茶颜悦色（概念店）',type:'茶饮',desc:'长沙的骄傲，新中式茶饮的标杆',lat:28.1950,lng:112.9760,color:'#fdcb6e'},
       {name:'IFS国金中心',type:'商场',desc:'KAWS雕塑打卡，长沙的潮流新地标',lat:28.1935,lng:112.9775,color:'#74b9ff'}
     ]},
    {id:'cs2',name:'橘子洲-岳麓山人文行',banner:'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80',
     desc:'"独立寒秋，湘江北去，橘子洲头"。毛主席诗词里的长沙，从橘子洲到岳麓书院。',
     difficulty:'medium',season:'秋季',duration:'5-6h',distance:'8.0km',
     points:[
       {name:'橘子洲头',type:'地标景点',desc:'青年毛泽东雕像，湘江中最浪漫的洲',lat:28.1830,lng:112.9610,color:'#ff6b35'},
       {name:'岳麓山',type:'风景名胜',desc:'长沙的后花园，爱晚亭红枫如火',lat:28.1860,lng:112.9400,color:'#e84393'},
       {name:'爱晚亭',type:'历史亭阁',desc:'中国四大名亭之一，秋天最美',lat:28.1855,lng:112.9420,color:'#a29bfe'},
       {name:'岳麓书院',type:'历史古迹',desc:'千年学府，中国四大书院之首',lat:28.1870,lng:112.9430,color:'#fdcb6e'},
       {name:'湖南大学',type:'校园',desc:'开放式校园，百年老建筑与青春活力',lat:28.1880,lng:112.9450,color:'#00b894'},
       {name:'渔人码头',type:'休闲区',desc:'湘江边的日落最佳观赏地',lat:28.1850,lng:112.9500,color:'#74b9ff'}
     ]},
    {id:'cs3',name:'超级文和友-解放西夜游',banner:'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80',
     desc:'长沙不夜城的精髓——超级文和友的80年代穿越，加上解放西路的通宵狂欢。',
     difficulty:'easy',season:'夏季',duration:'4-5h',distance:'2.5km',
     points:[
       {name:'超级文和友',type:'美食综合体',desc:'7层楼的80年代复古空间，沉浸式美食体验',lat:28.1945,lng:112.9790,color:'#ff6b35'},
       {name:'解放西路',type:'酒吧街',desc:'长沙夜生活的代名词，不到凌晨不罢休',lat:28.1930,lng:112.9750,color:'#e84393'},
       {name:'化龙池',type:'酒吧街',desc:'更文艺的夜生活选择，livehouse聚集',lat:28.1900,lng:112.9740,color:'#a29bfe'},
       {name:'都正街',type:'历史街区',desc:'闹中取静的老街，白天拍照超好看',lat:28.1905,lng:112.9760,color:'#00b894'},
       {name:'杜甫江阁',type:'历史建筑',desc:'湘江边的绝佳夜景观赏点',lat:28.1890,lng:112.9680,color:'#fdcb6e'}
     ]}
  ]
},
'广州':{
  slogan:'食在广州 叹在羊城',
  routes:[
    {id:'gz1',name:'老西关-上下九早茶漫步',banner:'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80',
     desc:'从陈家祠到上下九，走进最地道的老广州。一盅两件叹早茶，骑楼下的慢时光。',
     difficulty:'easy',season:'四季',duration:'4-5h',distance:'4.0km',
     points:[
       {name:'陈家祠',type:'历史建筑',desc:'岭南建筑艺术的巅峰之作，砖雕石雕美轮美奂',lat:23.1255,lng:113.2460,color:'#ff6b35'},
       {name:'荔枝湾涌',type:'历史水道',desc:'千年古水道，西关风情画卷',lat:23.1230,lng:113.2420,color:'#74b9ff'},
       {name:'泮溪酒家',type:'老字号',desc:'园林式酒家里的正宗广式早茶',lat:23.1240,lng:113.2440,color:'#00b894'},
       {name:'恩宁路',type:'历史街区',desc:'最美老街，永庆坊网红打卡地',lat:23.1210,lng:113.2400,color:'#e84393'},
       {name:'上下九步行街',type:'商业街',desc:'百年骑楼下的老广味道，莲香楼和陶陶居',lat:23.1180,lng:113.2470,color:'#fdcb6e'},
       {name:'沙面岛',type:'历史建筑群',desc:'欧式建筑群的异国情调，广州的鼓浪屿',lat:23.1100,lng:113.2350,color:'#a29bfe'}
     ]},
    {id:'gz2',name:'珠江新城-小蛮腰都市夜游',banner:'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=600&q=80',
     desc:'CBD天际线到小蛮腰的夜景路线。花城广场的灯光秀，珠江夜游的粼粼波光。',
     difficulty:'easy',season:'四季',duration:'3-4h',distance:'4.5km',
     points:[
       {name:'花城广场',type:'城市广场',desc:'广州的客厅，南北中轴线的核心',lat:23.1190,lng:113.3210,color:'#a29bfe'},
       {name:'广东省博物馆',type:'博物馆',desc:'月光宝盒造型的文化殿堂',lat:23.1180,lng:113.3230,color:'#ff6b35'},
       {name:'海心沙',type:'公园',desc:'亚运会开幕式举办地，珠江边的浪漫之地',lat:23.1130,lng:113.3200,color:'#00b894'},
       {name:'广州塔（小蛮腰）',type:'地标',desc:'600米高的城市地标，摩天轮上看广州',lat:23.1060,lng:113.3240,color:'#e84393'},
       {name:'珠江夜游码头',type:'码头',desc:'登船夜游珠江，两岸灯火璀璨',lat:23.1100,lng:113.3180,color:'#fdcb6e'}
     ]},
    {id:'gz3',name:'东山口文艺半日游',banner:'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80',
     desc:'东山少爷与西关小姐的故事从这里开始。红砖洋楼里的独立咖啡馆与设计师小店。',
     difficulty:'easy',season:'春秋',duration:'3-4h',distance:'3.0km',
     points:[
       {name:'东山口地铁站',type:'出发点',desc:'从B出口出来就是另一个广州',lat:23.1290,lng:113.2920,color:'#ff6b35'},
       {name:'庙前直街',type:'文艺街区',desc:'ins风小店最密集的一条街',lat:23.1300,lng:113.2940,color:'#e84393'},
       {name:'署前路',type:'历史街区',desc:'红砖洋楼配法国梧桐，出片率爆表',lat:23.1310,lng:113.2930,color:'#a29bfe'},
       {name:'新河浦',type:'历史建筑群',desc:'广州最美的老洋楼片区，民国风满满',lat:23.1280,lng:113.2950,color:'#00b894'},
       {name:'烟墩路',type:'美食街',desc:'社区美食宝藏，肠粉、牛杂、糖水应有尽有',lat:23.1270,lng:113.2960,color:'#fdcb6e'}
     ]}
  ]
}
};
// [AMAP_INTEGRATION]
const ACHIEVEMENTS = [
  {id:'first_step',icon:'👣',name:'第一步',req:'完成首次打卡',need:1,type:'checkin'},
  {id:'explorer',icon:'🧭',name:'初级探索者',req:'打卡10个地点',need:10,type:'checkin'},
  {id:'wanderer',icon:'🗺️',name:'城市漫游者',req:'打卡25个地点',need:25,type:'checkin'},
  {id:'master',icon:'👑',name:'漫步大师',req:'打卡50个地点',need:50,type:'checkin'},
  {id:'sh_fan',icon:'🏙️',name:'魔都达人',req:'完成上海任一路线',need:1,type:'city',city:'上海'},
  {id:'bj_fan',icon:'🏯',name:'京城行者',req:'完成北京任一路线',need:1,type:'city',city:'北京'},
  {id:'cd_fan',icon:'🐼',name:'蓉城知己',req:'完成成都任一路线',need:1,type:'city',city:'成都'},
  {id:'hz_fan',icon:'🍵',name:'杭城雅客',req:'完成杭州任一路线',need:1,type:'city',city:'杭州'},
  {id:'cs_fan',icon:'🌶️',name:'星城辣友',req:'完成长沙任一路线',need:1,type:'city',city:'长沙'},
  {id:'gz_fan',icon:'🥟',name:'羊城食神',req:'完成广州任一路线',need:1,type:'city',city:'广州'},
  {id:'multi_city',icon:'✈️',name:'跨城旅人',req:'在3个不同城市打卡',need:3,type:'cities'},
  {id:'foodie',icon:'🍜',name:'美食猎人',req:'打卡5个美食相关地点',need:5,type:'category',cat:'美食'}
];

// Amap integration helpers
const AmapHelper = {
  map: null,
  markers: [],
  polyline: null,
  infoWindow: null,

  init(containerId) {
    // Clear previous
    this.markers = [];
    this.polyline = null;
    const placeholder = document.getElementById('mapPlaceholder');
    if (placeholder) placeholder.style.display = 'none';

    if (typeof AMap === 'undefined' || APP.demoMode) {
      if (placeholder) {
        placeholder.style.display = 'flex';
        this.showDemoMap(containerId);
      }
      return;
    }
    try {
      if (this.map) {
        this.map.destroy();
        this.map = null;
      }
      const route = APP.selectedRoute;
      const center = route && route.points.length > 0
        ? [route.points[0].lng, route.points[0].lat]
        : [116.397, 39.908];
      this.map = new AMap.Map(containerId, {
        zoom: 14,
        center: center,
        viewMode: '2D',
        mapStyle: 'amap://styles/whitesmoke'
      });
      if (route) {
        this.addMarkers(route.points);
        this.drawRoute(route.points);
      }
    } catch (e) {
      console.warn('Amap init failed:', e);
      if (placeholder) {
        placeholder.style.display = 'flex';
        this.showDemoMap(containerId);
      }
    }
  },

  showDemoMap(containerId) {
    const route = APP.selectedRoute;
    if (!route) return;
    const placeholder = document.getElementById('mapPlaceholder');
    if (placeholder) {
      placeholder.innerHTML = `
        <div style="width:100%;height:100%;position:relative;background:linear-gradient(135deg,#e8e5e0,#d4d0c8);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;">
          <div style="width:90%;max-width:400px;aspect-ratio:1;position:relative;border-radius:16px;background:#fff;box-shadow:0 4px 24px rgba(0,0,0,.08);overflow:hidden;padding:20px;">
            <div style="text-align:center;margin-bottom:12px;font-family:var(--font-display);font-size:1.2rem;">${route.name}</div>
            <svg viewBox="0 0 300 300" style="width:100%;height:auto;">
              ${route.points.map((p, i) => {
                const x = 40 + (i % 3) * 110;
                const y = 40 + Math.floor(i / 3) * 80;
                const nextI = i + 1;
                let line = '';
                if (nextI < route.points.length) {
                  const nx = 40 + (nextI % 3) * 110;
                  const ny = 40 + Math.floor(nextI / 3) * 80;
                  line = '<line x1="'+x+'" y1="'+y+'" x2="'+nx+'" y2="'+ny+'" stroke="'+p.color+'" stroke-width="2" stroke-dasharray="6,4" opacity="0.5"/>';
                }
                const key = route.id + '_' + i;
                const checked = APP.checkedPoints[key];
                return line + '<circle cx="'+x+'" cy="'+y+'" r="14" fill="'+(checked ? '#00b894' : p.color)+'" opacity="0.9"/><text x="'+x+'" y="'+(y+4)+'" text-anchor="middle" fill="#fff" font-size="8" font-weight="bold">'+(i+1)+'</text><text x="'+x+'" y="'+(y+28)+'" text-anchor="middle" fill="#333" font-size="7">'+p.name.substring(0,4)+'</text>';
              }).join('')}
            </svg>
            <div style="text-align:center;font-size:.7rem;color:rgba(26,26,46,.35);margin-top:8px;">地图加载失败 · 请检查网络或API Key</div>
          </div>
        </div>`;
    }
  },

  addMarkers(points) {
    if (!this.map) return;
    points.forEach((p, i) => {
      const key = APP.selectedRoute.id + '_' + i;
      const checked = APP.checkedPoints[key];
      const markerContent = document.createElement('div');
      markerContent.innerHTML = `<div style="
        width:32px;height:32px;border-radius:50%;
        background:${checked ? '#00b894' : p.color};
        color:#fff;font-size:12px;font-weight:900;
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 2px 8px rgba(0,0,0,.25);
        border:2px solid #fff;
        cursor:pointer;
      ">${checked ? '✓' : (i+1)}</div>`;
      const marker = new AMap.Marker({
        position: [p.lng, p.lat],
        content: markerContent,
        offset: new AMap.Pixel(-16, -16),
        title: p.name
      });
      marker.on('click', () => {
        const info = new AMap.InfoWindow({
          content: `<div style="padding:8px 12px;min-width:180px;font-family:'Noto Sans SC',sans-serif;">
            <div style="font-weight:700;font-size:14px;margin-bottom:4px;">${i+1}. ${p.name}</div>
            <div style="font-size:11px;color:#888;margin-bottom:4px;">${p.type}</div>
            <div style="font-size:12px;color:#555;line-height:1.5;">${p.desc}</div>
            ${checked ? '<div style="margin-top:6px;color:#00b894;font-size:11px;font-weight:700;">✓ 已打卡</div>' : ''}
          </div>`,
          offset: new AMap.Pixel(0, -20)
        });
        info.open(this.map, [p.lng, p.lat]);
      });
      marker.setMap(this.map);
      this.markers.push(marker);
    });
  },

  drawRoute(points) {
    if (!this.map || points.length < 2) return;
    // Draw a polyline connecting all points
    const path = points.map(p => [p.lng, p.lat]);
    this.polyline = new AMap.Polyline({
      path: path,
      strokeColor: '#ff6b35',
      strokeWeight: 4,
      strokeOpacity: 0.8,
      strokeStyle: 'dashed',
      strokeDasharray: [10, 5],
      lineJoin: 'round',
      lineCap: 'round'
    });
    this.polyline.setMap(this.map);

    // Try walking route for the first two points as a demo
    if (typeof AMap !== 'undefined') {
      try {
        const walking = new AMap.Walking({ map: this.map, hideMarkers: true });
        // Plan walking route between first and last point
        walking.search(
          [points[0].lng, points[0].lat],
          [points[points.length-1].lng, points[points.length-1].lat],
          (status, result) => {
            if (status === 'complete') {
              // Walking route rendered on map automatically
              // Remove our dashed polyline since real route is shown
              if (this.polyline) {
                this.polyline.setMap(null);
                this.polyline = null;
              }
            }
          }
        );
      } catch(e) {
        console.warn('Walking route failed:', e);
      }
    }

    // Fit view to show all markers
    this.map.setFitView(this.markers, false, [60, 60, 60, 60]);
  },

  searchPOI(keyword, city, callback) {
    if (typeof AMap === 'undefined' || APP.demoMode) {
      callback([]);
      return;
    }
    try {
      const ps = new AMap.PlaceSearch({ city: city, pageSize: 10 });
      ps.search(keyword, (status, result) => {
        if (status === 'complete' && result.poiList) {
          callback(result.poiList.pois);
        } else {
          callback([]);
        }
      });
    } catch(e) {
      console.warn('POI search failed:', e);
      callback([]);
    }
  }
};
// [VIEW_CONTROLLER]
function showView(viewId) {
  ['citySelect','routeList','routeDetail'].forEach(id => {
    const el = document.getElementById(id);
    el.classList.toggle('active', id === viewId);
  });
  const tabBar = document.getElementById('tabBar');
  tabBar.classList.toggle('visible', viewId !== 'loading');
  window.scrollTo(0, 0);
}
function goBack(target) {
  showView(target);
}
function closeMap() {
  document.getElementById('mapPanel').classList.remove('active');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}
// [CITY_SELECT_LOGIC]
// POI categories for CityWalk route generation
const POI_CATEGORIES = [
  {code:'110000',type:'110000',name:'景点',icon:'🏛️',types:'风景名胜|公园广场|文物古迹|博物馆|纪念馆|展览馆|主题公园'},
  {code:'050000',type:'050000',name:'美食',icon:'🍜',types:'中餐厅|小吃快餐|咖啡厅|茶艺馆|甜品店'},
  {code:'060000',type:'060000',name:'购物',icon:'🛍️',types:'商业步行街|特色商业街|购物中心'},
  {code:'080000',type:'080000',name:'文艺',icon:'🎨',types:'美术馆|图书馆|文化宫|剧场|画廊|文化传媒'},
  {code:'141000',type:'141000',name:'网红',icon:'📸',types:'广场|特色街道|历史建筑'},
  {code:'120000',type:'120000',name:'住宅办公',icon:'🏢',types:'写字楼|商务大厦|科技园区'},
  {code:'150000',type:'150000',name:'交通设施',icon:'🚉',types:'火车站|地铁站|公交枢纽|长途汽车站'},
  {code:'070000',type:'070000',name:'生活服务',icon:'🏪',types:'便利店|超市|邮局|银行'},
  {code:'090000',type:'090000',name:'体育休闲',icon:'⛳',types:'体育场馆|游泳馆|健身中心|高尔夫球场'},
  {code:'100000',type:'100000',name:'医疗保健',icon:'🏥',types:'综合医院|专科医院|诊所|药店'},
  {code:'140000',type:'140000',name:'科教文化',icon:'🏫',types:'高等院校|中学|科研机构|培训机构'},
];
const DEFAULT_COLORS = ['#ff6b35','#e84393','#a29bfe','#00b894','#fdcb6e','#74b9ff','#fd79a8','#e17055'];
// Dynamic city data store (augments MOCK_DATA)
// 修改基线 / Base: index.html (原始版本 2026-03-17)
// 修改内容 / Changes: DYNAMIC_CITIES 从 localStorage 恢复，实现持久化
const DYNAMIC_CITIES = JSON.parse(localStorage.getItem('cw_dynamic_cities') || '{}');
function saveDynamicCities() {
  try { localStorage.setItem('cw_dynamic_cities', JSON.stringify(DYNAMIC_CITIES)); } catch(e) {}
}
let _searchDebounce = null;

function renderCities(filter = '') {
  const grid = document.getElementById('cityGrid');
  const hint = document.getElementById('searchHint');
  // Combine mock + dynamic cities
  const allCities = {...MOCK_DATA, ...DYNAMIC_CITIES};
  const cities = Object.keys(allCities);
  const filtered = filter ? cities.filter(c => c.includes(filter)) : cities;

  // Show hint when user is typing a non-matching city
  if (filter && filtered.length === 0) {
    hint.classList.add('visible');
  } else {
    hint.classList.remove('visible');
  }

  grid.innerHTML = filtered.map((city, i) => {
    const data = allCities[city];
    const isDynamic = !!DYNAMIC_CITIES[city];
    const colors = CITY_COLORS[city] || (isDynamic ? ['#ff6b35','#e84393'] : ['#666','#999']);
    const img = CITY_IMAGES[city] || '';
    const routeCount = data.routes ? data.routes.length : 0;
    return `<div class="city-card ${isDynamic?'dynamic':''} anim-scaleIn stagger-${Math.min(i+1,8)}" onclick="selectCity('${city}')">
      <div class="city-card-bg" style="background-image:${img?`url('${img}')`:'none'};background-color:${colors[0]}"></div>
      <div class="city-card-overlay"></div>
      <div class="city-card-tag">${isDynamic?'🔍 AI发现':''}${routeCount}条路线</div>
      <div class="city-card-info">
        <div class="city-card-name">${city}</div>
        <div class="city-card-count">${data.slogan || '等你来探索'}</div>
      </div>
    </div>`;
  }).join('');
}

function filterCities(val) {
  const v = val.trim();
  renderCities(v);
  // Show hint for non-empty input not matching existing cities
  const hint = document.getElementById('searchHint');
  const allCities = {...MOCK_DATA, ...DYNAMIC_CITIES};
  if (v && !allCities[v]) {
    hint.classList.add('visible');
  }
}

function selectCity(city) {
  APP.selectedCity = city;
  const allCities = {...MOCK_DATA, ...DYNAMIC_CITIES};
  if (allCities[city]) {
    renderRouteList(city);
    showView('routeList');
  } else {
    discoverCity(city);
  }
}

// === DYNAMIC CITY DISCOVERY via Amap API ===
async function discoverCity(cityName) {
  cityName = cityName.trim();
  if (!cityName) return;

  // 修改基线 / Base: index.html discoverCity() 原始版本
  // 修改内容 / Changes: 改为调用后端 LLM API 生成路线,高德POI搜索作为降级方案
  // Changed to call backend LLM API for route generation, with AMap POI fallback

  // If already have data, just go
  const allCities = {...MOCK_DATA, ...DYNAMIC_CITIES};
  if (allCities[cityName] && allCities[cityName].routes && allCities[cityName].routes.length > 0) {
    APP.selectedCity = cityName;
    renderRouteList(cityName);
    showView('routeList');
    return;
  }

  // Show loading
  const loader = document.getElementById('searchLoading');
  if (loader) loader.style.display = 'block';
  showToast(`正在用 AI 为「${cityName}」规划路线...`);

  try {
    // 优先调用后端 LLM 生成路线 / Try backend LLM first
    const resp = await fetch('/api/routes/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city: cityName }),
    });

    if (!resp.ok) throw new Error(`后端返回 ${resp.status}`);
    const result = await resp.json();

    if (!result.success || !result.data?.routes?.length) {
      throw new Error('LLM 未生成有效路线');
    }

    const routeData = result.data;

    // 为路线添加 banner 图
    routeData.routes.forEach((r, i) => {
      if (!r.banner) {
        r.banner = `https://images.unsplash.com/photo-${1500000000000 + i * 100}?w=600&q=80`;
      }
      // 确保 points 有 color
      (r.points || []).forEach((p, pi) => {
        if (!p.color) p.color = DEFAULT_COLORS[pi % DEFAULT_COLORS.length];
      });
    });

    // 存储为动态城市
    DYNAMIC_CITIES[cityName] = {
      slogan: routeData.slogan || '等你来发现',
      routes: routeData.routes,
    };
    saveDynamicCities();
    if (!CITY_COLORS[cityName]) {
      CITY_COLORS[cityName] = [DEFAULT_COLORS[Math.floor(Math.random()*DEFAULT_COLORS.length)], DEFAULT_COLORS[Math.floor(Math.random()*DEFAULT_COLORS.length)]];
    }

    if (loader) loader.style.display = 'none';
    renderCities('');
    APP.selectedCity = cityName;
    renderRouteList(cityName);
    showView('routeList');
    showToast(`AI 生成了${routeData.routes.length}条「${cityName}」路线！`);

  } catch (backendErr) {
    console.warn('[discoverCity] 后端 LLM 失败，降级到本地 POI 搜索:', backendErr.message);

    // 降级方案: 使用原有的高德 POI 搜索逻辑 / Fallback to AMap POI search
    if (typeof AMap === 'undefined') {
      showToast('地图服务和后端均不可用，请稍后重试');
      if (loader) loader.style.display = 'none';
      return;
    }

    try {
      const cityInfo = await amapGeocode(cityName);
      if (!cityInfo) {
        showToast(`未找到城市「${cityName}」，请检查名称`);
        if (loader) loader.style.display = 'none';
        return;
      }

      const poiResults = await Promise.all(
        POI_CATEGORIES.map(cat => amapPOISearch(cat.types.split('|')[0], cityName, cat.code))
      );

      const allPOIs = [];
      POI_CATEGORIES.forEach((cat, ci) => {
        const pois = poiResults[ci] || [];
        pois.forEach(poi => {
          if (poi.location) {
            // 修改: 兼容 AMap v2.0 LngLat 对象 / Compatible with AMap v2.0 LngLat object
            let lng, lat;
            if (typeof poi.location === 'string') { [lng, lat] = poi.location.split(',').map(Number); }
            else if (typeof poi.location === 'object') { lng = poi.location.lng || poi.location.getLng?.(); lat = poi.location.lat || poi.location.getLat?.(); }
            if (lng && lat && !isNaN(lng) && !isNaN(lat)) {
              allPOIs.push({
                name: poi.name, type: cat.name,
                desc: poi.address || poi.type || cat.name + '打卡点',
                lat, lng,
                color: DEFAULT_COLORS[allPOIs.length % DEFAULT_COLORS.length],
                category: cat.name, catIcon: cat.icon,
              });
            }
          }
        });
      });

      if (allPOIs.length < 3) {
        showToast(`「${cityName}」暂未找到足够的打卡点`);
        if (loader) loader.style.display = 'none';
        return;
      }

      const routes = generateRoutesFromPOIs(allPOIs, cityName);
      DYNAMIC_CITIES[cityName] = { slogan: cityInfo.district || '等你来发现', routes };
      saveDynamicCities();
      if (!CITY_COLORS[cityName]) {
        CITY_COLORS[cityName] = [DEFAULT_COLORS[Math.floor(Math.random()*DEFAULT_COLORS.length)], DEFAULT_COLORS[Math.floor(Math.random()*DEFAULT_COLORS.length)]];
      }

      if (loader) loader.style.display = 'none';
      renderCities('');
      APP.selectedCity = cityName;
      renderRouteList(cityName);
      showView('routeList');
      showToast(`发现了${routes.length}条「${cityName}」的打卡路线！`);
    } catch (fallbackErr) {
      console.error('Fallback city discovery also failed:', fallbackErr);
      showToast('探索失败，请稍后重试');
      if (loader) loader.style.display = 'none';
    }
  }
}

// === AUTO-DETECT CURRENT CITY ===
async function locateMyCity() {
  const btn = document.getElementById('locateBtn');
  if (btn) btn.classList.add('locating');
  showToast('正在定位您的城市...');

  try {
    // Method 1: AMap.CitySearch (IP-based, fast, no permission needed)
    const cityName = await new Promise((resolve, reject) => {
      if (typeof AMap === 'undefined') { reject('地图未加载'); return; }
      const cs = new AMap.CitySearch();
      cs.getLocalCity(function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
          // result.city is like "上海市", strip the "市" suffix
          let name = result.city || '';
          name = name.replace(/[市省区]$/, '');
          resolve(name);
        } else {
          reject('IP定位失败');
        }
      });
    });

    if (!cityName) {
      showToast('无法获取城市信息');
      if (btn) btn.classList.remove('locating');
      return;
    }

    if (btn) btn.classList.remove('locating');

    // Fill the search input with detected city
    const input = document.getElementById('citySearch');
    if (input) input.value = cityName;

    showToast(`定位到：${cityName}`);

    // Check if city already exists in list
    const allCities = {...MOCK_DATA, ...DYNAMIC_CITIES};
    if (allCities[cityName]) {
      APP.selectedCity = cityName;
      renderRouteList(cityName);
      showView('routeList');
    } else {
      // Auto-discover the city
      discoverCity(cityName);
    }
  } catch (err) {
    console.warn('CitySearch failed, trying Geolocation...', err);
    // Method 2: Browser Geolocation + Reverse Geocode
    try {
      const cityName = await locateViaBrowser();
      if (btn) btn.classList.remove('locating');
      if (!cityName) {
        showToast('定位失败，请手动输入城市名');
        return;
      }
      const input = document.getElementById('citySearch');
      if (input) input.value = cityName;
      showToast(`定位到：${cityName}`);
      const allCities = {...MOCK_DATA, ...DYNAMIC_CITIES};
      if (allCities[cityName]) {
        APP.selectedCity = cityName;
        renderRouteList(cityName);
        showView('routeList');
      } else {
        discoverCity(cityName);
      }
    } catch (e2) {
      if (btn) btn.classList.remove('locating');
      showToast('定位失败，请手动输入城市名');
    }
  }
}

function locateViaBrowser() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) { reject('不支持定位'); return; }
    navigator.geolocation.getCurrentPosition(
      pos => {
        const lnglat = [pos.coords.longitude, pos.coords.latitude];
        const geocoder = new AMap.Geocoder();
        geocoder.getAddress(lnglat, function(status, result) {
          if (status === 'complete' && result.regeocode) {
            let city = result.regeocode.addressComponent.city || result.regeocode.addressComponent.province || '';
            city = city.replace(/[市省区]$/, '');
            resolve(city);
          } else {
            reject('反向地理编码失败');
          }
        });
      },
      err => reject(err.message),
      { timeout: 8000, maximumAge: 300000 }
    );
  });
}

// === QUICK CITY SUGGESTIONS ===
const CITY_POOL = [
  '南京','西安','重庆','厦门','武汉','苏州','大理','深圳',
  '青岛','昆明','桂林','三亚','拉萨','哈尔滨','天津','郑州',
  '济南','福州','合肥','太原','贵阳','兰州','海口','银川',
  '呼和浩特','乌鲁木齐','丽江','洛阳','扬州','泉州','绍兴',
  '珠海','中山','佛山','东莞','威海','烟台','秦皇岛','大连',
  '宁波','无锡','常州','温州','湖州','嘉兴','徐州','泰州',
  '黄山','九江','景德镇','凤凰','平遥','周庄','乌镇','婺源'
];
function refreshQuickCities() {
  const container = document.getElementById('quickCities');
  if (!container) return;
  // Exclude cities already in list
  const existing = new Set(Object.keys({...MOCK_DATA, ...DYNAMIC_CITIES}));
  const available = CITY_POOL.filter(c => !existing.has(c));
  // Shuffle and pick 8
  const shuffled = available.sort(() => Math.random() - 0.5).slice(0, 8);
  container.innerHTML = '<span class="quick-label">试试：</span>' +
    shuffled.map(c => `<button class="quick-chip" onclick="discoverCity('${c}')">${c}</button>`).join('') +
    `<button class="quick-chip" onclick="refreshQuickCities()" title="换一批">🔄</button>`;
}

// Generate routes by clustering POIs by category and proximity
function generateRoutesFromPOIs(pois, cityName) {
  const routes = [];
  const prefix = cityName.substring(0,2).toLowerCase() + '_dyn';

  // Route 1: Mixed highlights (top rated / first of each category)
  const highlights = [];
  const seen = new Set();
  POI_CATEGORIES.forEach(cat => {
    const catPois = pois.filter(p => p.category === cat.name && !seen.has(p.name));
    catPois.slice(0, 2).forEach(p => { highlights.push(p); seen.add(p.name); });
  });
  if (highlights.length >= 3) {
    routes.push({
      id: prefix + '1',
      name: cityName + '精华漫步',
      banner: '',
      desc: `由高德地图智能发现的${cityName}精华路线，涵盖景点、美食、文艺等多个打卡点，一条路线体验城市精华。`,
      difficulty: 'easy',
      season: '四季',
      duration: Math.max(2, Math.round(highlights.length * 0.6)) + '-' + Math.max(3, Math.round(highlights.length * 0.8)) + 'h',
      distance: (highlights.length * 0.8).toFixed(1) + 'km',
      points: highlights.slice(0, 8),
      isGenerated: true
    });
  }

  // Route 2: Scenic / cultural route
  const scenicPois = pois.filter(p => (p.category === '景点' || p.category === '文艺') && !seen.has(p.name));
  if (scenicPois.length >= 3) {
    const pts = scenicPois.slice(0, 7);
    pts.forEach(p => seen.add(p.name));
    routes.push({
      id: prefix + '2',
      name: cityName + '人文探索',
      banner: '',
      desc: `探索${cityName}的历史文化底蕴。从景点到文艺空间，感受这座城市的文化脉络。`,
      difficulty: 'medium',
      season: '春秋',
      duration: Math.max(3, Math.round(pts.length * 0.7)) + '-' + Math.max(4, Math.round(pts.length * 0.9)) + 'h',
      distance: (pts.length * 0.9).toFixed(1) + 'km',
      points: pts,
      isGenerated: true
    });
  }

  // Route 3: Food route
  const foodPois = pois.filter(p => p.category === '美食' && !seen.has(p.name));
  if (foodPois.length >= 3) {
    const pts = foodPois.slice(0, 6);
    pts.forEach(p => seen.add(p.name));
    routes.push({
      id: prefix + '3',
      name: cityName + '美食暴走',
      banner: '',
      desc: `${cityName}吃货必走路线！从街头小吃到地道餐厅，一条路线喂饱你的胃。`,
      difficulty: 'easy',
      season: '四季',
      duration: Math.max(2, Math.round(pts.length * 0.5)) + '-' + Math.max(3, Math.round(pts.length * 0.7)) + 'h',
      distance: (pts.length * 0.6).toFixed(1) + 'km',
      points: pts,
      isGenerated: true
    });
  }

  // Route 4: Shopping + trendy route
  const trendyPois = pois.filter(p => (p.category === '购物' || p.category === '网红') && !seen.has(p.name));
  if (trendyPois.length >= 3) {
    const pts = trendyPois.slice(0, 6);
    routes.push({
      id: prefix + '4',
      name: cityName + '潮流打卡',
      banner: '',
      desc: `${cityName}的潮流地标和网红打卡点，适合拍照发圈。`,
      difficulty: 'easy',
      season: '四季',
      duration: Math.max(2, Math.round(pts.length * 0.5)) + '-' + Math.max(3, Math.round(pts.length * 0.6)) + 'h',
      distance: (pts.length * 0.5).toFixed(1) + 'km',
      points: pts,
      isGenerated: true
    });
  }

  return routes;
}

// === Amap API Promise wrappers ===
function amapGeocode(city) {
  return new Promise((resolve) => {
    AMap.plugin('AMap.Geocoder', () => {
      const geocoder = new AMap.Geocoder({ city: city });
      geocoder.getLocation(city, (status, result) => {
        if (status === 'complete' && result.geocodes && result.geocodes.length > 0) {
          const geo = result.geocodes[0];
          resolve({
            lng: geo.location.getLng(),
            lat: geo.location.getLat(),
            city: geo.city || city,
            district: geo.district || geo.city || city,
            adcode: geo.adcode
          });
        } else {
          resolve(null);
        }
      });
    });
  });
}

function amapPOISearch(keyword, city, typeCode) {
  return new Promise((resolve) => {
    try {
      const ps = new AMap.PlaceSearch({
        city: city,
        citylimit: true,
        pageSize: 25,
        type: typeCode || ''
      });
      ps.search(keyword, (status, result) => {
        if (status === 'complete' && result.poiList && result.poiList.pois) {
          resolve(result.poiList.pois);
        } else {
          resolve([]);
        }
      });
    } catch(e) {
      console.warn('POI search error:', e);
      resolve([]);
    }
  });
}
// [ROUTE_LIST_LOGIC]
function getRouteProgress(route) {
  let checked = 0;
  route.points.forEach((_, i) => {
    if (APP.checkedPoints[route.id + '_' + i]) checked++;
  });
  return { checked, total: route.points.length, pct: Math.round((checked / route.points.length) * 100) };
}
function renderRouteList(city) {
  const allCities = {...MOCK_DATA, ...DYNAMIC_CITIES};
  const data = allCities[city];
  if (!data) { discoverCity(city); return; }
  const isDynamic = !!DYNAMIC_CITIES[city];
  document.getElementById('routeCityName').textContent = city + ' CityWalk';
  document.getElementById('routeCitySubtitle').textContent = data.slogan || '';
  // Stats
  let totalPoints = 0, checkedPoints = 0;
  data.routes.forEach(r => {
    const p = getRouteProgress(r);
    totalPoints += p.total;
    checkedPoints += p.checked;
  });
  document.getElementById('routeStats').innerHTML = `
    <div class="stat-pill anim-fadeInUp stagger-1"><div class="num">${data.routes.length}</div><div class="label">条路线</div></div>
    <div class="stat-pill anim-fadeInUp stagger-2"><div class="num">${totalPoints}</div><div class="label">个打卡点</div></div>
    <div class="stat-pill anim-fadeInUp stagger-3"><div class="num">${checkedPoints}</div><div class="label">已打卡</div></div>`;
  // Discovery banner for dynamic cities
  let cardsHTML = '';
  if (isDynamic) {
    cardsHTML += `<div class="discover-banner"><div class="discover-banner-inner anim-fadeInUp">
      <div class="icon">🔍</div>
      <div class="text">以下路线由 <strong>高德地图 API</strong> 实时发现并智能生成，基于${city}的热门景点、美食、文艺空间等 POI 数据自动规划。</div>
    </div></div>`;
  }
  // Cards
  cardsHTML += '<div class="route-cards">' + data.routes.map((route, ri) => {
    const prog = getRouteProgress(route);
    const diffClass = route.difficulty === 'easy' ? 'diff-easy' : route.difficulty === 'medium' ? 'diff-medium' : 'diff-hard';
    const diffText = route.difficulty === 'easy' ? '轻松' : route.difficulty === 'medium' ? '适中' : '挑战';
    const isGen = route.isGenerated;
    const bannerStyle = route.banner
      ? `background-image:url('${route.banner}');background-color:${(CITY_COLORS[city]||['#666'])[0]}`
      : `background:linear-gradient(135deg,${(CITY_COLORS[city]||['#ff6b35','#e84393'])[0]},${(CITY_COLORS[city]||['#ff6b35','#e84393'])[1]})`;
    return `<div class="route-card ${isGen?'generated':''} anim-fadeInUp stagger-${ri+1}" onclick="selectRoute('${city}','${route.id}')">
      <div class="route-card-banner">
        <div class="route-card-banner-bg" style="${bannerStyle}"></div>
        <div class="route-card-banner-overlay"></div>
        <div class="route-card-banner-tags">
          <span class="rtag ${diffClass}">${diffText}</span>
          <span class="rtag season">${route.season}</span>
        </div>
        <div class="route-card-banner-title">${route.name}${isGen?'<span class="gen-badge">🤖 AI发现</span>':''}</div>
      </div>
      <div class="route-card-body">
        <div class="route-card-desc">${route.desc}</div>
        <div class="route-card-meta">
          <span>🕐 ${route.duration}</span>
          <span>📏 ${route.distance}</span>
          <span>📍 ${route.points.length}个点</span>
        </div>
        ${prog.checked > 0 ? `<div class="route-card-progress">
          <div class="progress-bar"><div class="progress-fill" style="width:${prog.pct}%"></div></div>
          <div class="progress-text">${prog.checked}/${prog.total} 已打卡 (${prog.pct}%)</div>
        </div>` : ''}
      </div>
    </div>`;
  }).join('') + '</div>';
  document.getElementById('routeCards').innerHTML = cardsHTML;
}
// [ROUTE_DETAIL_LOGIC]
function selectRoute(city, routeId) {
  const allCities = {...MOCK_DATA, ...DYNAMIC_CITIES};
  const data = allCities[city];
  if (!data) return;
  const route = data.routes.find(r => r.id === routeId);
  if (!route) return;
  APP.selectedRoute = route;
  document.getElementById('detailHeroBg').style.backgroundImage = `url('${route.banner}')`;
  document.getElementById('detailHeroBg').style.backgroundColor = (CITY_COLORS[city]||['#666'])[0];
  const prog = getRouteProgress(route);
  const diffText = route.difficulty === 'easy' ? '轻松' : route.difficulty === 'medium' ? '适中' : '挑战';
  let html = `<div class="detail-title-card anim-fadeInUp">
    <div class="detail-title">${route.name}</div>
    <div class="detail-desc">${route.desc}</div>
    <div class="detail-tags">
      <span class="dtag">${diffText}难度</span>
      <span class="dtag">${route.season}推荐</span>
      <span class="dtag">${city}</span>
    </div>
    <div class="detail-meta-row">
      <div class="detail-meta-item"><div class="val">${route.duration}</div><div class="lbl">预计时长</div></div>
      <div class="detail-meta-item"><div class="val">${route.distance}</div><div class="lbl">总距离</div></div>
      <div class="detail-meta-item"><div class="val">${prog.checked}/${prog.total}</div><div class="lbl">已打卡</div></div>
    </div>
    <button class="detail-map-btn" onclick="openMap()">🗺️ 查看地图路线</button>
  </div>
  <div class="waypoints-title anim-fadeInUp stagger-2">📍 打卡点 (${route.points.length})</div>
  <div class="waypoint-list">`;
  route.points.forEach((p, i) => {
    const key = route.id + '_' + i;
    const checked = APP.checkedPoints[key];
    html += `<div class="waypoint-item anim-slideInRight stagger-${Math.min(i+1,8)}">
      <div class="waypoint-line">
        <div class="waypoint-dot ${checked?'checked':''}" style="background:${checked?'#00b894':p.color}">${checked?'':'<span style=\"font-size:.7rem\">'+(i+1)+'</span>'}</div>
        <div class="waypoint-connector"></div>
      </div>
      <div class="waypoint-card ${checked?'checked-card':''}">
        <div class="wp-name">${p.name}</div>
        <div class="wp-type">${p.type}</div>
        <div class="wp-desc">${p.desc}</div>
        <div class="wp-actions">
          <button class="wp-checkin-btn ${checked?'done':''}" onclick="event.stopPropagation();checkinPoint('${route.id}',${i},'${p.name}')" ${checked?'disabled':''}>${checked?'✓ 已打卡':'打卡'}</button>
          <button class="wp-challenge-btn" onclick="event.stopPropagation();triggerChallenge('${p.name}')">🎲 随机挑战</button>
        </div>
      </div>
    </div>`;
  });
  html += '</div>';
  if (prog.pct > 0) {
    html += `<div style="margin-top:20px;padding:16px;background:#fff;border-radius:var(--radius-sm);box-shadow:0 2px 12px rgba(26,26,46,.06);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <span style="font-weight:700;font-size:.85rem;">路线进度</span>
        <span style="font-size:.8rem;font-weight:900;background:linear-gradient(135deg,var(--teal),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">${prog.pct}%</span>
      </div>
      <div class="progress-bar" style="height:8px;border-radius:8px;">
        <div class="progress-fill" style="width:${prog.pct}%;height:100%;border-radius:8px;"></div>
      </div>
      ${prog.pct === 100 ? '<div style="text-align:center;margin-top:12px;font-size:.85rem;color:var(--teal);font-weight:700;">🎉 恭喜！路线已全部完成！</div>' : ''}
    </div>`;
  }
  document.getElementById('detailContent').innerHTML = html;

  // 修改基线 / Base: selectRoute() 原始版本
  // 修改内容 / Changes: 异步加载天气信息和小红书推荐，插入到路线详情页
  // Added async weather and XHS recommendation loading into route detail page

  // 异步加载天气信息 / Load weather info async
  loadWeatherForCity(city);
  // 异步加载小红书推荐 / Load XHS recommendations async
  loadXHSRecommendations(city, route.name);

  showView('routeDetail');
}

// === 天气信息加载 / Weather Info Loader ===
const WEATHER_ICONS = {
  '晴': '☀️', '多云': '⛅', '阴': '☁️', '阵雨': '🌦️', '雷阵雨': '⛈️',
  '小雨': '🌧️', '中雨': '🌧️', '大雨': '🌧️', '暴雨': '🌧️',
  '雪': '🌨️', '小雪': '🌨️', '中雪': '🌨️', '大雪': '❄️', '雾': '🌫️', '霾': '😷',
};
async function loadWeatherForCity(city) {
  const container = document.getElementById('detailContent');
  if (!container) return;

  // 插入占位符
  const weatherDiv = document.createElement('div');
  weatherDiv.id = 'weatherInfoCard';
  weatherDiv.style.cssText = 'margin-top:16px;';
  weatherDiv.innerHTML = `<div style="background:linear-gradient(135deg,rgba(116,185,255,.1),rgba(0,184,148,.08));border:1px solid rgba(116,185,255,.15);border-radius:var(--radius);padding:14px 16px;display:flex;align-items:center;gap:12px;">
    <div style="font-size:1.5rem;">🌤️</div>
    <div style="flex:1;font-size:.78rem;color:rgba(26,26,46,.45);">天气加载中...</div>
  </div>`;
  container.appendChild(weatherDiv);

  try {
    const resp = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
    if (!resp.ok) throw new Error('天气接口异常');
    const result = await resp.json();
    if (!result.success) throw new Error(result.error);

    const w = result.data;
    const icon = WEATHER_ICONS[w.weather] || '🌤️';
    const suggestion = getSuggestion(w.weather, w.temperature);

    // 存储到全局供全景漫游使用
    APP.currentWeather = w;

    weatherDiv.innerHTML = `<div style="background:linear-gradient(135deg,rgba(116,185,255,.1),rgba(0,184,148,.08));border:1px solid rgba(116,185,255,.15);border-radius:var(--radius);padding:14px 16px;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
        <div style="font-size:2rem;">${icon}</div>
        <div style="flex:1;">
          <div style="font-weight:700;font-size:1rem;">${w.city} · ${w.weather} ${w.temperature}°C</div>
          <div style="font-size:.72rem;color:rgba(26,26,46,.45);margin-top:2px;">湿度 ${w.humidity}% · ${w.winddirection}风 ${w.windpower}级</div>
        </div>
      </div>
      <div style="font-size:.75rem;color:rgba(26,26,46,.5);line-height:1.6;padding:8px 10px;background:rgba(255,255,255,.6);border-radius:8px;">💡 ${suggestion}</div>
      ${w.forecasts.length > 0 ? `<div style="display:flex;gap:8px;margin-top:10px;overflow-x:auto;">
        ${w.forecasts.slice(0, 3).map(f => `<div style="flex:1;min-width:70px;text-align:center;padding:8px 4px;background:rgba(255,255,255,.5);border-radius:8px;">
          <div style="font-size:.6rem;color:rgba(26,26,46,.35);">${f.date?.slice(5)}</div>
          <div style="font-size:1.1rem;margin:4px 0;">${WEATHER_ICONS[f.dayweather]||'🌤️'}</div>
          <div style="font-size:.65rem;font-weight:600;">${f.nighttemp}~${f.daytemp}°</div>
        </div>`).join('')}
      </div>` : ''}
    </div>`;
  } catch (err) {
    console.warn('[Weather] 加载失败:', err.message);
    weatherDiv.innerHTML = '';
  }
}

function getSuggestion(weather, temp) {
  const t = parseInt(temp);
  if (weather.includes('雨')) return '今日有雨，建议携带雨伞，穿防滑鞋出行。室内打卡点优先安排。';
  if (weather.includes('雪')) return '今日有雪，路面可能湿滑，注意防寒保暖，拍照会很美！';
  if (weather.includes('雾') || weather.includes('霾')) return '空气质量不佳，建议佩戴口罩，减少户外逗留时间。';
  if (t > 35) return '高温预警！建议错峰出行，多补充水分，注意防晒。';
  if (t > 28) return '天气炎热，建议穿轻薄透气衣物，随身携带水和防晒用品。';
  if (t < 5) return '天气寒冷，请注意保暖。可以多安排室内打卡点和暖心美食站。';
  if (t < 15) return '气温较低，建议穿保暖外套。秋冬漫步别有风味！';
  return '天气适宜出行，是 CityWalk 的好日子！记得穿舒适的步行鞋。';
}

// === 小红书推荐加载 / XHS Recommendations Loader ===
async function loadXHSRecommendations(city, routeName) {
  const container = document.getElementById('detailContent');
  if (!container) return;

  const xhsDiv = document.createElement('div');
  xhsDiv.id = 'xhsRecommendations';
  xhsDiv.style.cssText = 'margin-top:20px;';
  xhsDiv.innerHTML = `<div style="font-family:var(--font-display);font-size:1.1rem;margin-bottom:12px;padding-left:4px;">📕 小红书攻略</div>
    <div style="font-size:.78rem;color:rgba(26,26,46,.35);text-align:center;padding:16px;">正在搜索相关攻略...</div>`;
  container.appendChild(xhsDiv);

  try {
    const keyword = `${city} citywalk ${routeName}`;
    const resp = await fetch(`/api/xhs/search?keyword=${encodeURIComponent(keyword)}`);
    const result = await resp.json();

    if (!result.success || !result.data || result.data.length === 0) {
      xhsDiv.innerHTML = `<div style="font-family:var(--font-display);font-size:1.1rem;margin-bottom:12px;padding-left:4px;">📕 小红书攻略</div>
        <div style="font-size:.75rem;color:rgba(26,26,46,.3);text-align:center;padding:16px;line-height:1.6;">暂无相关攻略<br>小红书 MCP 服务可能未启动</div>`;
      return;
    }

    const feeds = Array.isArray(result.data) ? result.data.slice(0, 6) : [];
    let cards = feeds.map(f => {
      const title = f.title || f.noteCard?.displayTitle || '小红书笔记';
      const likes = f.likes || f.noteCard?.interactInfo?.likedCount || '';
      const cover = f.cover || f.noteCard?.cover?.urlDefault || '';
      const user = f.user?.nickname || f.noteCard?.user?.nickname || '';
      return `<div style="background:#fff;border-radius:var(--radius-sm);overflow:hidden;box-shadow:0 2px 12px rgba(26,26,46,.06);cursor:pointer;" onclick="window.open('https://www.xiaohongshu.com/explore/${f.id || f.noteId || ''}','_blank')">
        ${cover ? `<div style="height:100px;background:url('${cover}') center/cover;"></div>` : ''}
        <div style="padding:10px 12px;">
          <div style="font-size:.75rem;font-weight:600;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${title}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px;">
            <span style="font-size:.62rem;color:rgba(26,26,46,.35);">${user}</span>
            ${likes ? `<span style="font-size:.62rem;color:#ff6b6b;">❤️ ${likes}</span>` : ''}
          </div>
        </div>
      </div>`;
    }).join('');

    xhsDiv.innerHTML = `<div style="font-family:var(--font-display);font-size:1.1rem;margin-bottom:12px;padding-left:4px;">📕 小红书攻略</div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;">${cards}</div>`;
  } catch (err) {
    console.warn('[XHS] 加载失败:', err.message);
    xhsDiv.innerHTML = `<div style="font-family:var(--font-display);font-size:1.1rem;margin-bottom:12px;padding-left:4px;">📕 小红书攻略</div>
      <div style="font-size:.75rem;color:rgba(26,26,46,.3);text-align:center;padding:16px;">小红书服务未连接</div>`;
  }
}
function openMap() {
  document.getElementById('mapPanel').classList.add('active');
  document.getElementById('mapTitle').textContent = APP.selectedRoute ? APP.selectedRoute.name : '地图导览';
  // Small delay to ensure DOM is visible before map init
  setTimeout(() => {
    AmapHelper.init('amap-container');
  }, 100);
}
// [CHECKIN_LOGIC]
function checkinPoint(routeId, pointIndex, pointName) {
  const key = routeId + '_' + pointIndex;
  if (APP.checkedPoints[key]) return;
  APP.checkedPoints[key] = Date.now();
  APP.totalCheckins++;
  localStorage.setItem('cw_checked', JSON.stringify(APP.checkedPoints));
  localStorage.setItem('cw_total', APP.totalCheckins.toString());

  // Show checkin modal
  document.getElementById('checkinIcon').textContent = '📍';
  document.getElementById('checkinTitle').textContent = '打卡成功!';
  document.getElementById('checkinDesc').textContent = `恭喜你到达「${pointName}」！这是你的第 ${APP.totalCheckins} 次打卡。`;

  // Check achievements
  const newAchievements = checkAchievements();
  const badgeEl = document.getElementById('checkinBadge');
  if (newAchievements.length > 0) {
    badgeEl.style.display = 'inline-flex';
    badgeEl.textContent = `🏅 解锁成就: ${newAchievements.map(a => a.name).join(', ')}`;
  } else {
    badgeEl.style.display = 'none';
  }

  const modal = document.getElementById('checkinModal');
  modal.classList.add('active');
  setTimeout(() => modal.querySelector('.modal-box').style.transform = 'scale(1)', 10);

  // Refresh detail view
  if (APP.selectedCity && APP.selectedRoute) {
    selectRoute(APP.selectedCity, APP.selectedRoute.id);
  }
}
function triggerChallenge(pointName) {
  const ch = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
  document.getElementById('challengeIcon').textContent = ch.icon;
  document.getElementById('challengeDesc').textContent = `在「${pointName}」的挑战：${ch.text}`;
  const modal = document.getElementById('challengeModal');
  modal.classList.add('active');
  setTimeout(() => modal.querySelector('.modal-box').style.transform = 'scale(1)', 10);
}
// [ACHIEVEMENT_LOGIC]
function checkAchievements() {
  const newOnes = [];
  ACHIEVEMENTS.forEach(a => {
    if (APP.achievements.includes(a.id)) return;
    let unlocked = false;
    if (a.type === 'checkin') {
      unlocked = APP.totalCheckins >= a.need;
    } else if (a.type === 'city') {
      const cityData = MOCK_DATA[a.city];
      if (cityData) {
        unlocked = cityData.routes.some(r => {
          const prog = getRouteProgress(r);
          return prog.pct === 100;
        });
      }
    } else if (a.type === 'cities') {
      const citiesChecked = new Set();
      Object.keys(APP.checkedPoints).forEach(key => {
        Object.keys(MOCK_DATA).forEach(city => {
          MOCK_DATA[city].routes.forEach(r => {
            r.points.forEach((_, i) => {
              if (key === r.id + '_' + i) citiesChecked.add(city);
            });
          });
        });
      });
      unlocked = citiesChecked.size >= a.need;
    }
    if (unlocked) {
      APP.achievements.push(a.id);
      newOnes.push(a);
    }
  });
  if (newOnes.length > 0) {
    localStorage.setItem('cw_achievements', JSON.stringify(APP.achievements));
  }
  return newOnes;
}
function showAchievements() {
  const grid = document.getElementById('achieveGrid');
  grid.innerHTML = ACHIEVEMENTS.map((a, i) => {
    const unlocked = APP.achievements.includes(a.id);
    return `<div class="achieve-card ${unlocked?'':'locked'} anim-scaleIn stagger-${Math.min(i+1,8)}">
      <div class="icon">${a.icon}</div>
      <div class="name">${a.name}</div>
      <div class="req">${unlocked ? '✓ 已解锁' : a.req}</div>
    </div>`;
  }).join('');
  document.getElementById('achievePanel').classList.add('active');
}
function closeAchievements() {
  document.getElementById('achievePanel').classList.remove('active');
}
// [CREATIVE_MODES]
const CREATIVE_MODES = [
  {id:'freeroam',icon:'🌍',name:'无限漫游',en:'FREE ROAM',
   desc:'在无限延伸的城市中自由探索！基于高德地图POI数据，走到哪里城市就生成到哪里。选择一座城市作为起点，向任意方向出发吧。',
   tags:['无限','探索','真实地图','动态生成'],cls:'freeroam-mode'},
  {id:'colorwalk',icon:'🌈',name:'ColorWalk',en:'COLOR WALK',
   desc:'每人选一个颜色，在CityWalk途中专注寻找属于自己颜色的城市元素——红色的门、蓝色的天、黄色的落叶。拍下来拼在一起，生成一组独一无二的城市色卡。',
   tags:['2-6人','拍照','社交','创意'],cls:'color-mode'},
  {id:'visit',icon:'📷',name:'到此一游',en:'MEMORY CAMERA',
   desc:'找到城市角落里的电子相机、展示屏，留下你的笑容作为"非卖品"。或者用我们的虚拟相机拍下此刻，存入城市留影墙，让陌生的旅人看到你曾来过这里。',
   tags:['独行侠','浪漫','异步社交','记录'],cls:'visit-mode'},
  {id:'blindwalk',icon:'🎲',name:'盲盒Walk',en:'BLIND BOX WALK',
   desc:'到路口扔骰子决定方向！左转？右转？直走？掉头？把选择权交给命运，每一步都是未知的惊喜。最后回顾你的随机路线，也许会发现意想不到的宝藏。',
   tags:['随机','冒险','惊喜','佛系'],cls:'blind-mode'},
  {id:'soundwalk',icon:'🎧',name:'声音Walk',en:'SOUND WALK',
   desc:'闭上眼睛，用耳朵感受这座城市。记录街头艺人的吉他、胡同里的鸟鸣、咖啡机的嗡鸣声。你的城市声音地图，比照片更有温度。',
   tags:['独行侠','感官','文艺','沉浸'],cls:'sound-mode'},
  {id:'timewalk',icon:'⏳',name:'时间胶囊Walk',en:'TIME CAPSULE WALK',
   desc:'带一张这座城市的老照片出发，找到同一个角度，拍下今天的样子。时间在流淌，城市在呼吸，而你正站在两个时代的交汇点。',
   tags:['怀旧','对比','记录','人文'],cls:'time-mode'},
  // pixelcity mode removed / 像素城市模式已移除
  {id:'glasscity',icon:'✨',name:'全景漫游',en:'3D GLASS CITY',
   desc:'拟真3D全景城市，玻璃质感的摩天大楼、动态光影与粒子特效。基于高德地图真实建筑数据，沉浸式漫步于一座流光溢彩的未来之城。',
   tags:['高级','全景','奢华','沉浸'],cls:'glass-mode'}
];

const COLOR_OPTIONS = [
  {name:'热情红',hex:'#E74C3C',emoji:'❤️'},
  {name:'落日橙',hex:'#FF6B35',emoji:'🧡'},
  {name:'暖阳黄',hex:'#F1C40F',emoji:'💛'},
  {name:'生机绿',hex:'#00B894',emoji:'💚'},
  {name:'天空蓝',hex:'#3498DB',emoji:'💙'},
  {name:'神秘紫',hex:'#9B59B6',emoji:'💜'},
  {name:'樱花粉',hex:'#FD79A8',emoji:'🩷'},
  {name:'纯净白',hex:'#ECF0F1',emoji:'🤍'}
];

const BLIND_DIRECTIONS = [
  {dir:'左转',emoji:'⬅️',desc:'转向左边，走到下一个路口'},
  {dir:'右转',emoji:'➡️',desc:'转向右边，看看那边有什么'},
  {dir:'直走',emoji:'⬆️',desc:'勇往直前，不要犹豫'},
  {dir:'掉头',emoji:'🔄',desc:'回头看看，也许错过了什么'},
  {dir:'进最近的店',emoji:'🚪',desc:'推开最近的一扇门，进去逛逛'},
  {dir:'坐下休息',emoji:'🪑',desc:'找个地方坐下来，观察周围的人'},
  {dir:'跟着声音走',emoji:'🎵',desc:'听到什么声音？跟着它走'},
  {dir:'走进巷子',emoji:'🏘️',desc:'看到小巷就钻进去，探索隐秘角落'}
];

// Visit mode memory store (simulated shared gallery)
const VISIT_GALLERY = JSON.parse(localStorage.getItem('cw_visit_gallery') || '[]');
const DEMO_GALLERY = [
  {id:'demo1',photo:'',emoji:'😊',location:'武康大楼前',city:'上海',time:'2025-12-15 14:32',msg:'第一次来上海，爱了！'},
  {id:'demo2',photo:'',emoji:'😎',location:'南锣鼓巷',city:'北京',time:'2025-11-20 10:15',msg:'胡同里的阳光真好'},
  {id:'demo3',photo:'',emoji:'🥰',location:'宽窄巷子',city:'成都',time:'2025-10-08 16:45',msg:'盖碗茶配秋日午后'},
  {id:'demo4',photo:'',emoji:'😄',location:'西湖断桥',city:'杭州',time:'2026-01-03 09:20',msg:'冬天的西湖也很美'},
  {id:'demo5',photo:'',emoji:'🤩',location:'太平街',city:'长沙',time:'2026-02-14 20:30',msg:'臭豆腐yyds'},
  {id:'demo6',photo:'',emoji:'😋',location:'上下九',city:'广州',time:'2026-01-28 11:00',msg:'早茶吃到扶墙出'},
];

function showCreative() {
  const body = document.getElementById('creativeBody');
  body.innerHTML = `
    <div style="text-align:center;padding:10px 0 24px;">
      <div style="font-family:var(--font-display);font-size:1.6rem;">解锁新玩法</div>
      <div style="font-size:.82rem;color:rgba(26,26,46,.4);margin-top:4px;">换一种方式，重新发现城市</div>
    </div>
    ${CREATIVE_MODES.map((m, i) => `
      <div class="mode-card ${m.cls} anim-fadeInUp stagger-${i+1}" onclick="openMode('${m.id}')">
        <div class="mode-card-top">
          <div class="mode-card-icon">${m.icon}</div>
          <div class="mode-card-name">${m.name}</div>
          <div class="mode-card-en">${m.en}</div>
        </div>
        <div class="mode-card-body">
          <div class="mode-card-desc">${m.desc}</div>
          <div class="mode-card-tags">${m.tags.map(t => `<span class="mode-tag">${t}</span>`).join('')}</div>
        </div>
      </div>
    `).join('')}`;
  document.getElementById('creativePanel').classList.add('active');
}
function closeCreative() {
  document.getElementById('creativePanel').classList.remove('active');
}
function closeSubPanel(id) {
  document.getElementById(id).classList.remove('active');
  // Stop camera if visit panel
  if (id === 'visitPanel' && window._visitStream) {
    window._visitStream.getTracks().forEach(t => t.stop());
    window._visitStream = null;
  }
}
function openMode(id) {
  if (id === 'freeroam') openFreeroam();
  else if (id === 'colorwalk') openColorWalk();
  else if (id === 'visit') openVisitMode();
  else if (id === 'blindwalk') openBlindWalk();
  else if (id === 'soundwalk') openSoundWalk();
  else if (id === 'timewalk') openTimeWalk();
}

// === FREE ROAM (INFINITE MODE) ===
// 修改基线 / Base: index.html openFreeroam (原始版本)
// 修改内容 / Changes: 增加城市搜索输入框 + IP自动定位 + 热门城市快捷入口，使漫游支持任意城市
function openFreeroam() {
  const city = APP.selectedCity || '上海';
  // Remove any existing overlay first
  const existing = document.getElementById('freeroamOverlay');
  if (existing) existing.remove();
  // 收集所有可用城市（预设 + 动态）
  const allCityNames = [...new Set([...Object.keys(MOCK_DATA), ...Object.keys(DYNAMIC_CITIES)])];
  const hotCities = ['上海','北京','成都','杭州','长沙','广州','南京','西安','重庆','深圳','武汉','厦门'];
  // Show engine selection overlay with city picker
  const overlay = document.createElement('div');
  overlay.id = 'freeroamOverlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:500;display:flex;align-items:center;justify-content:center;background:rgba(10,10,20,.88);backdrop-filter:blur(12px);';
  overlay.innerHTML = `
    <div style="background:rgba(20,22,35,.95);border-radius:24px;padding:32px 28px;max-width:380px;width:92%;text-align:center;border:1px solid rgba(255,255,255,.08);box-shadow:0 24px 80px rgba(0,0,0,.5);max-height:90vh;overflow-y:auto;">
      <div style="font-size:3rem;margin-bottom:8px;">🌍</div>
      <div style="font-family:var(--font-display);font-size:1.6rem;color:#fff;margin-bottom:4px;">无限漫游</div>
      <div style="font-size:.78rem;color:rgba(255,255,255,.45);margin-bottom:14px;line-height:1.6;">输入任意城市名，在像素/3D世界中自由探索</div>
      <!-- 城市搜索输入框 -->
      <div style="display:flex;gap:8px;margin-bottom:12px;">
        <input id="freeroamCityInput" type="text" value="${city}" placeholder="输入城市名..."
          style="flex:1;padding:12px 16px;border-radius:12px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);color:#fff;font-size:.95rem;outline:none;font-family:inherit;"
          onkeydown="if(event.key==='Enter'){_freeroamSetCity(this.value)}" />
        <button onclick="_freeroamAutoLocate()" id="freeroamLocateBtn"
          style="padding:0 14px;border-radius:12px;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;font-size:1.1rem;cursor:pointer;border:none;transition:transform .2s;" title="IP自动定位">
          📍
        </button>
      </div>
      <!-- 当前选中城市 -->
      <div id="freeroamCityLabel" style="font-size:.82rem;color:var(--accent);font-weight:700;margin-bottom:12px;">当前: ${city}</div>
      <!-- 热门城市快捷入口 -->
      <div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:16px;">
        ${hotCities.map(c => `<button onclick="_freeroamSetCity('${c}')" style="padding:5px 12px;border-radius:16px;font-size:.72rem;font-weight:600;cursor:pointer;border:1px solid rgba(255,255,255,.1);background:${c===city?'rgba(255,107,53,.2)':'rgba(255,255,255,.04)'};color:${c===city?'var(--accent)':'rgba(255,255,255,.5)'};transition:all .2s;" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='rgba(255,255,255,.1)'">${c}</button>`).join('')}
      </div>
      <div style="display:flex;gap:12px;margin-bottom:16px;">
        <button onclick="startFreeroam('gx')" style="flex:1;padding:20px 0;border-radius:18px;background:linear-gradient(135deg,#1a2040,#0a0a20);border:1px solid rgba(255,255,255,.1);color:#fff;font-size:1.05rem;font-weight:700;cursor:pointer;transition:all .3s cubic-bezier(0.4, 0, 0.2, 1);position:relative;overflow:hidden;" onmouseover="this.style.borderColor='#5cadff';this.style.boxShadow='0 0 30px rgba(92,173,255,.2)';this.style.transform='translateY(-2px)'" onmouseout="this.style.borderColor='rgba(255,255,255,.1)';this.style.boxShadow='none';this.style.transform='translateY(0)'">
          <div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 0%, rgba(92,173,255,0.15) 0%, transparent 60%);pointer-events:none;"></div>
          <div style="font-size:2.2rem;margin-bottom:6px;filter:drop-shadow(0 0 10px rgba(92,173,255,0.4));">✨</div>全景
        </button>
        <button onclick="startRealRoam()" style="flex:1;padding:20px 0;border-radius:18px;background:linear-gradient(135deg,#1f3d4a,#0f242e);border:1px solid rgba(255,255,255,.1);color:#fff;font-size:1.05rem;font-weight:700;cursor:pointer;transition:all .3s cubic-bezier(0.4, 0, 0.2, 1);position:relative;overflow:hidden;" onmouseover="this.style.borderColor='#00b894';this.style.boxShadow='0 0 30px rgba(0,184,148,.2)';this.style.transform='translateY(-2px)'" onmouseout="this.style.borderColor='rgba(255,255,255,.1)';this.style.boxShadow='none';this.style.transform='translateY(0)'">
          <div style="position:absolute;inset:0;background:url('https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png') no-repeat center center;opacity:0.05;background-size:cover;pointer-events:none;"></div>
          <div style="font-size:2.2rem;margin-bottom:6px;filter:drop-shadow(0 0 10px rgba(0,184,148,0.4));">🗺️</div>真实地图
        </button>
      </div>
      <button onclick="document.getElementById('freeroamOverlay').remove()" style="padding:8px 24px;border-radius:20px;background:rgba(255,255,255,.06);color:rgba(255,255,255,.4);font-size:.8rem;cursor:pointer;border:none;">取消</button>
    </div>`;
  document.body.appendChild(overlay);
  document.getElementById('creativePanel').classList.remove('active');
  // Focus input
  setTimeout(() => document.getElementById('freeroamCityInput')?.select(), 100);
}
// 漫游城市选择辅助函数 / Helper: set roaming city
function _freeroamSetCity(cityName) {
  cityName = cityName.trim();
  if (!cityName) return;
  APP.selectedCity = cityName;
  const label = document.getElementById('freeroamCityLabel');
  if (label) label.textContent = '当前: ' + cityName;
  const input = document.getElementById('freeroamCityInput');
  if (input) input.value = cityName;
  showToast('漫游目标: ' + cityName);
}
// IP自动定位 / Auto-detect city via IP
async function _freeroamAutoLocate() {
  const btn = document.getElementById('freeroamLocateBtn');
  if (btn) { btn.textContent = '⏳'; btn.style.pointerEvents = 'none'; }
  try {
    if (typeof AMap === 'undefined') throw new Error('地图服务未加载');
    const cityName = await new Promise((resolve, reject) => {
      const cs = new AMap.CitySearch();
      cs.getLocalCity(function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
          let name = result.city || '';
          name = name.replace(/[市省区]$/, '');
          resolve(name);
        } else { reject('IP定位失败'); }
      });
    });
    if (cityName) {
      _freeroamSetCity(cityName);
      showToast('IP定位成功: ' + cityName);
    }
  } catch(e) {
    showToast('定位失败: ' + (e.message || e));
  } finally {
    if (btn) { btn.textContent = '📍'; btn.style.pointerEvents = 'auto'; }
  }
}

async function startFreeroam(type) {
  const overlay = document.getElementById('freeroamOverlay');
  if (overlay) overlay.remove();
  const city = APP.selectedCity || '上海';

  // PX branch removed, GX is now the only canvas engine
  // PX分支已移除，GX现在是唯一的Canvas引擎
    // Use glass city panel
    document.getElementById('glassCityTag').textContent = city + ' · 无限';
    document.getElementById('glassCityPanel').classList.add('active');
    document.getElementById('glassLoading').classList.remove('hidden');
    document.getElementById('glassLoadBar').style.width = '0%';
    document.getElementById('glassLoadText').textContent = '正在初始化无限世界...';
    setTimeout(async () => {
      try {
        const wrap = document.getElementById('glassCanvasWrap');
        GX.canvas = document.getElementById('glassCanvas');
        GX.ctx = GX.canvas.getContext('2d');
        GX.miniC = document.getElementById('glassMinimapCanvas');
        GX.miniCtx = GX.miniC.getContext('2d');
        function resize2() {
          GX.canvas.width = wrap.clientWidth;
          GX.canvas.height = wrap.clientHeight;
          GX.miniC.width = 100;
          GX.miniC.height = 100;
        }
        resize2();
        window._glassResize = resize2;
        window.addEventListener('resize', resize2);

        document.getElementById('glassLoadText').textContent = '获取城市坐标...';
        document.getElementById('glassLoadBar').style.width = '30%';
        await initInfiniteMode('gx', city);
        document.getElementById('glassLoadText').textContent = '生成初始区域...';
        document.getElementById('glassLoadBar').style.width = '70%';
        GX.particles = [];
        for (let i = 0; i < 40; i++) {
          GX.particles.push({x:GX.px+Math.random()*60-30,y:GX.py+Math.random()*60-30,z:Math.random()*80+20,speed:0.2+Math.random()*0.5,size:1+Math.random()*2,alpha:0.1+Math.random()*0.3});
        }
        await new Promise(r => setTimeout(r, 300));
        document.getElementById('glassLoadBar').style.width = '100%';
        document.getElementById('glassLoadText').textContent = '欢迎来到 ' + city + ' · 无限漫游';
        await new Promise(r => setTimeout(r, 400));
        document.getElementById('glassLoading').classList.add('hidden');
        GX.running = true;
        GX.time = 0;
        GX.vehicle = 'walk';
        GX.pMoving = false;
        GX.moveX = 0; GX.moveY = 0;
        GX.keys = {};
        setupGlassListeners();
        renderVehicleSelector('glass');
        glassGameLoop();
      } catch(e) {
        console.error('Freeroam GX init error:', e);
        document.getElementById('glassLoadText').textContent = '初始化失败: ' + e.message;
      }
    }, 200);
  }


// === REAL MAP ENGINE ===
// 修改内容 / Changes: 真实地图漫游模式入口与逻辑
const RX = {
  map: null, canvas: null, ctx: null,
  running: false, animFrame: null,
  // 角色坐标及状态
  px: 0, py: 0, lat: 0, lng: 0,
  pDir: 0, pFrame: 0, pFrameTimer: 0, pMoving: false,
  moveX: 0, moveY: 0, keys: {}, speed: 0.00003, // 经纬度移动速度
  baseSpeed: 0.00003, vehicle: 'walk', boosting: false, boostEnergy: 100, boostMax: 100, boostDrain: 0.8, boostRegen: 0.3,
  // 数据缓存
  pois: [], cityName: '', lastPanTime: 0
};

async function startRealRoam() {
  const overlay = document.getElementById('freeroamOverlay');
  if (overlay) overlay.remove();
  const city = APP.selectedCity || '上海';
  
  // 注入或显示真实地图面板
  let panel = document.getElementById('realMapPanel');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'realMapPanel';
    panel.style.cssText = 'position:fixed;inset:0;z-index:900;background:#1a1c29;display:none;';
    panel.innerHTML = `
      <div style="position:absolute;top:20px;left:20px;z-index:10;display:flex;align-items:center;gap:12px;">
        <button onclick="closeRealRoam()" style="width:40px;height:40px;border-radius:50%;background:rgba(20,22,35,.8);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.1);color:#fff;font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;">
          <i class="bi bi-arrow-left"></i>
        </button>
        <div style="background:rgba(20,22,35,.8);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.1);padding:6px 16px;border-radius:20px;color:#fff;font-weight:700;display:flex;align-items:center;gap:8px;box-shadow:0 8px 32px rgba(0,0,0,.3);">
          <span style="font-size:1.2rem;">🗺️</span> <span id="realCityTag">${city} · 真实探索</span>
        </div>
      </div>
      <!-- 高德地图容器 -->
      <div id="realMapContainer" style="position:absolute;inset:0;background:#2d2d3a;"></div>
      <!-- 透明Canvas叠加层，用于绘制居中的像素角色 -->
      <canvas id="realCanvas" style="position:absolute;inset:0;pointer-events:none;z-index:2;"></canvas>
      
      <!-- 加载屏 -->
      <div id="realLoading" style="position:absolute;inset:0;z-index:20;background:rgba(20,22,35,.98);display:flex;align-items:center;justify-content:center;flex-direction:column;">
        <div style="font-size:3rem;margin-bottom:20px;animation:pulse 1s infinite alternate;">📍</div>
        <div style="font-family:var(--font-display);font-size:1.4rem;color:#fff;margin-bottom:24px;" id="realLoadText">正在获取真实地理数据...</div>
        <div style="width:240px;height:6px;background:rgba(255,255,255,.1);border-radius:3px;overflow:hidden;">
          <div id="realLoadBar" style="height:100%;width:0%;background:linear-gradient(90deg,var(--accent),#00b894);transition:width .3s;border-radius:3px;"></div>
        </div>
      </div>
      
      <!-- 载具选择器和控制区同PX -->
      <div id="realVehicleWrap" style="position:absolute;right:20px;bottom:140px;z-index:10;display:flex;flex-direction:column;gap:12px;"></div>
      <div id="realTouchLeft" style="position:absolute;left:20px;bottom:30px;width:120px;height:120px;z-index:10;"></div>
      <div id="realTouchRight" style="position:absolute;right:20px;bottom:30px;width:120px;height:120px;z-index:10;"></div>
    `;
    document.body.appendChild(panel);
  }
  
  document.getElementById('realCityTag').textContent = city + ' · 真实探索';
  panel.style.display = 'block';
  const loadingDiv = document.getElementById('realLoading');
  loadingDiv.style.display = 'flex';
  document.getElementById('realLoadBar').style.width = '20%';
  document.getElementById('realLoadText').textContent = '连接高德卫星路网...';
  
  setTimeout(async () => {
    try {
      if (typeof AMap === 'undefined') throw new Error("AMap API 未加载");
      // 获取城市坐标
      const info = await amapGeocode(city);
      if (!info) throw new Error("无法获取城市坐标");
      
      document.getElementById('realLoadBar').style.width = '50%';
      document.getElementById('realLoadText').textContent = '渲染真实街道...';
      
      RX.lat = info.lat;
      RX.lng = info.lng;
      RX.cityName = city;
      
      // 初始化地图
      if(RX.map) { RX.map.destroy(); }
      RX.map = new AMap.Map('realMapContainer', {
        center: [RX.lng, RX.lat],
        zoom: 17,
        mapStyle: 'amap://styles/darkblue', // 使用暗色主题匹配应用风格
        showBuildingBlock: true,
        rotateEnable: true,
        pitchEnable: true,
        pitch: 60,
        rotation: 0,
        features: ['bg', 'road', 'building'] // 只保留基础元素，隐藏默认POI
      });
      
      RX.canvas = document.getElementById('realCanvas');
      RX.ctx = RX.canvas.getContext('2d');
      function resizeRX() {
        RX.canvas.width = window.innerWidth;
        RX.canvas.height = window.innerHeight;
      }
      resizeRX();
      window._realResize = resizeRX;
      window.addEventListener('resize', resizeRX);
      
      // 初始化 POI 网格系统
      RX.poiGrid = {};
      RX.pois = [];
      
      document.getElementById('realLoadBar').style.width = '80%';
      document.getElementById('realLoadText').textContent = '搜寻周边兴趣点...';
      
      // 预先查询周边的POI
      try {
        await Promise.race([
          checkAndLoadRXGrid(),
          new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 5000))
        ]);
      } catch (err) {
        console.warn('Load POIs nearby warning or timeout:', err);
      }
      
      document.getElementById('realLoadBar').style.width = '100%';
      document.getElementById('realLoadText').textContent = '欢迎来到真实的 ' + city;
      await new Promise(r => setTimeout(r, 400));
      loadingDiv.style.display = 'none';
      
      RX.running = true;
      RX.vehicle = 'walk';
      RX.pMoving = false;
      RX.moveX = 0; RX.moveY = 0;
      RX.keys = {};
      
      setupRealListeners();
      renderVehicleSelector('real');
      
      // 地图加载完成后，保证角色居中
      RX.px = RX.canvas.width / 2;
      RX.py = RX.canvas.height / 2;
      
      realGameLoop();
    } catch (e) {
      console.error('RealRoam init error:', e);
      document.getElementById('realLoadText').textContent = '初始化失败: ' + e.message;
      setTimeout(() => { loadingDiv.style.display = 'none'; closeRealRoam(); }, 3000);
    }
  }, 300);
}

function closeRealRoam() {
  RX.running = false;
  cancelAnimationFrame(RX.animFrame);
  if(RX.map) { RX.map.destroy(); RX.map = null; }
  window.removeEventListener('resize', window._realResize);
  document.getElementById('realMapPanel').style.display = 'none';
  if(RX._touchCleaner) RX._touchCleaner();
}

// --- REAL MAP ENGINE LOGIC ---
function setupRealListeners() {
  window.addEventListener('keydown', realKeyDown);
  window.addEventListener('keyup', realKeyUp);
  setupRealTouch();
}

function realKeyDown(e) {
  if(!RX.running) return;
  RX.keys[e.key.toLowerCase()] = true;
  if(e.key === 'Shift') RX.boosting = true;
  if(e.key === ' ' || e.key === 'e') {
    // Press Space or E to checkin near POI
    checkRealPOICheckin();
  }
}
function realKeyUp(e) {
  if(!RX.running) return;
  RX.keys[e.key.toLowerCase()] = false;
  if(e.key === 'Shift') RX.boosting = false;
}

function setupRealTouch() {
  const L = document.getElementById('realTouchLeft');
  const R = document.getElementById('realTouchRight');
  if(!L || !R) return;
  
  let jx=0, jy=0, jAct=false;
  const lTouch = (e) => {
    e.preventDefault();
    const t = e.touches[0] || e.changedTouches[0];
    const rect = L.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    let dx = t.clientX - cx, dy = t.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const maxR = 40;
    if(dist>maxR) { dx = dx/dist*maxR; dy = dy/dist*maxR; }
    jx = dx/maxR; jy = dy/maxR;
    jAct = true;
    L.innerHTML = `<div style="position:absolute;left:50%;top:50%;width:80px;height:80px;margin:-40px 0 0 -40px;border-radius:50%;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);"><div style="position:absolute;left:50%;top:50%;width:40px;height:40px;margin:-20px 0 0 -20px;border-radius:50%;background:rgba(255,255,255,.4);transform:translate(${dx}px,${dy}px);"></div></div>`;
  };
  const lEnd = (e) => {
    e.preventDefault(); jAct=false; jx=0; jy=0;
    L.innerHTML = `<div style="position:absolute;left:50%;top:50%;width:80px;height:80px;margin:-40px 0 0 -40px;border-radius:50%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);"><div style="position:absolute;left:50%;top:50%;width:40px;height:40px;margin:-20px 0 0 -20px;border-radius:50%;background:rgba(255,255,255,.2);"></div></div>`;
  };
  L.addEventListener('touchstart', lTouch, {passive:false});
  L.addEventListener('touchmove', lTouch, {passive:false});
  L.addEventListener('touchend', lEnd, {passive:false});
  lEnd({preventDefault:()=>{}});

  const rTouch = (e) => { e.preventDefault(); RX.boosting=true; R.style.opacity='0.5'; };
  const rEnd = (e) => { e.preventDefault(); RX.boosting=false; R.style.opacity='1'; checkRealPOICheckin(); };
  R.innerHTML = `<div style="position:absolute;left:50%;top:50%;width:60px;height:60px;margin:-30px 0 0 -30px;border-radius:50%;background:rgba(255,107,53,.3);border:2px solid rgba(255,107,53,.6);display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.5rem;box-shadow:0 0 15px rgba(255,107,53,.4);">⚡</div>`;
  R.addEventListener('touchstart', rTouch, {passive:false});
  R.addEventListener('touchend', rEnd, {passive:false});

  RX._joystick = () => {
    if(!jAct) return {x:0, y:0};
    return {x: jx, y: jy};
  };
  
  RX._touchCleaner = () => {
    L.removeEventListener('touchstart', lTouch); L.removeEventListener('touchmove', lTouch); L.removeEventListener('touchend', lEnd);
    R.removeEventListener('touchstart', rTouch); R.removeEventListener('touchend', rEnd);
  };
}

function updateRealPlayer() {
  RX.moveX = 0; RX.moveY = 0;
  if(RX.keys['w'] || RX.keys['arrowup']) RX.moveY = 1;
  if(RX.keys['s'] || RX.keys['arrowdown']) RX.moveY = -1;
  if(RX.keys['a'] || RX.keys['arrowleft']) RX.moveX = -1;
  if(RX.keys['d'] || RX.keys['arrowright']) RX.moveX = 1;
  
  if(RX._joystick) {
    const j = RX._joystick();
    if(j.x!==0 || j.y!==0) { RX.moveX = j.x; RX.moveY = -j.y; }
  }
  
  RX.pMoving = (Math.abs(RX.moveX)>0.1 || Math.abs(RX.moveY)>0.1);
  
  if(RX.pMoving) {
    if(Math.abs(RX.moveX)>Math.abs(RX.moveY)){ RX.pDir = RX.moveX>0 ? 3 : 1; }
    else { RX.pDir = RX.moveY>0 ? 2 : 0; }
    
    // 载具加速与能量衰减
    let curSpeed = RX.baseSpeed;
    if (RX.vehicle === 'bicycle') curSpeed *= 2.5;
    else if (RX.vehicle === 'scooter') curSpeed *= 3.5;
    else if(RX.boosting && RX.boostEnergy > 0) {
      curSpeed *= 2.2;
      RX.boostEnergy = Math.max(0, RX.boostEnergy - RX.boostDrain);
    }
    
    // 更新经纬度（注意纬度向上是正，所以 Y 取反）
    RX.lng += RX.moveX * curSpeed;
    RX.lat -= RX.moveY * curSpeed * Math.cos(RX.lat * Math.PI/180); // 简单球体投影修正
    
    RX.pFrameTimer++;
    if(RX.pFrameTimer > 10) { RX.pFrame = (RX.pFrame + 1) % 4; RX.pFrameTimer = 0; }
    
    // 限制每150ms最多panTo一次，防止卡顿
    const now = Date.now();
    if(now - RX.lastPanTime > 150 && RX.map) {
      RX.map.panTo([RX.lng, RX.lat]);
      RX.lastPanTime = now;
    }
  } else {
    RX.pFrame = 0;
    if(RX.boostEnergy < RX.boostMax) RX.boostEnergy = Math.min(RX.boostMax, RX.boostEnergy + RX.boostRegen);
  }
}

// --- RX 引擎 POI 无限加载网格系统 ---
RX.poiGrid = {}; // key: "x_y", value: array of poi markers
RX.gridSize = 0.005; // 约500米一个网格

function getRXGridKey(lng, lat) {
  return Math.floor(lng / RX.gridSize) + '_' + Math.floor(lat / RX.gridSize);
}

// 检查并自动加载周围的 POI 网格
async function checkAndLoadRXGrid() {
  if(!RX.map || !RX.lng || !RX.lat) return;
  const cx = Math.floor(RX.lng / RX.gridSize);
  const cy = Math.floor(RX.lat / RX.gridSize);
  
  // 检查九宫格
  for(let i = -1; i <= 1; i++) {
    for(let j = -1; j <= 1; j++) {
      const key = (cx + i) + '_' + (cy + j);
      if(!RX.poiGrid[key] && !RX.poiGrid[key + '_loading']) {
        RX.poiGrid[key + '_loading'] = true;
        
        // 计算网格中心经纬度
        const gridLng = (cx + i + 0.5) * RX.gridSize;
        const gridLat = (cy + j + 0.5) * RX.gridSize;
        
        loadRealPOIsNearBy(gridLng, gridLat, key);
      }
    }
  }
  
  // 清理过远的网格缓存 (距离大于3个网格)
  Object.keys(RX.poiGrid).forEach(key => {
    if(key.endsWith('_loading')) return;
    const [x, y] = key.split('_').map(Number);
    if(Math.abs(x - cx) > 3 || Math.abs(y - cy) > 3) {
      // 移除地图上的 marker
      RX.poiGrid[key].forEach(m => RX.map.remove(m));
      delete RX.poiGrid[key];
    }
  });
}

async function loadRealPOIsNearBy(lng, lat, gridKey) {
  if(!RX.map) return;
  const priorityCats=[ {code:'110000',name:'景点'},{code:'050000',name:'美食'},{code:'060000',name:'购物'},{code:'080000',name:'文艺'},{code:'141000',name:'网红'} ];
  let gridPois = [];
  
  try {
      const results = await Promise.all(priorityCats.map(cat => 
        chunkPOISearchNearBy(lng, lat, 600, cat.code) // 搜索600m范围
      ));
      
      priorityCats.forEach((cat, ci) => {
          (results[ci] || []).forEach(poi => {
            if(poi.location) {
               let plng, plat;
               if (typeof poi.location === 'string') { [plng, plat] = poi.location.split(',').map(Number); }
               else if (typeof poi.location === 'object') { plng = poi.location.lng || poi.location.getLng?.(); plat = poi.location.lat || poi.location.getLat?.(); }
               
               if(plng && plat && !isNaN(plng) && !isNaN(plat)) {
                 // 去重: 确保全局 pois 数组中没有相同的 id
                 if (!RX.pois.find(p => p.id === poi.id)) {
                   const poiObj = {id: poi.id, name: poi.name, type: cat.name, address: poi.address, lat: plat, lng: plng, collected: false};
                   RX.pois.push(poiObj);
                   
                   // 创建 marker
                   const marker = new AMap.Marker({
                       position: [plng, plat],
                       title: poi.name,
                       content: `<div style="background:rgba(0,0,0,.7);color:#fff;padding:4px 8px;border-radius:12px;font-size:12px;border:1px solid rgba(255,255,255,.3);white-space:nowrap;backdrop-filter:blur(4px);pointer-events:none;transform:scale(0.9);">📍 ${poi.name}</div>`,
                       offset: new AMap.Pixel(-20, -30)
                   });
                   gridPois.push(marker);
                 }
               }
            }
          });
      });
      
      // 添加到地图并保存到网格
      if (gridPois.length > 0) {
        RX.map.add(gridPois);
      }
      RX.poiGrid[gridKey] = gridPois;
      delete RX.poiGrid[gridKey + '_loading'];
      
  } catch(e) { 
      console.warn("Real POI fetch err:", e); 
      delete RX.poiGrid[gridKey + '_loading'];
  }
}

// 检查并进行打卡判定（距离 < 50米 约0.0005度）
function checkRealPOICheckin() {
  if(!RX.pois.length) return;
  let closest = null, minDist = 0.0005; // ~50m
  RX.pois.forEach(poi => {
    if(poi.collected) return;
    const dLng = Math.abs(poi.lng - RX.lng);
    const dLat = Math.abs(poi.lat - RX.lat);
    const dist = Math.hypot(dLng, dLat);
    if(dist < minDist) { minDist = dist; closest = poi; }
  });
  if(closest) {
    closest.collected = true;
    checkinPoint('real_map', 0, closest.name); // 复用通用的打卡逻辑
    createFloatingText(RX.px, RX.py - 30, '+打卡成功! 🎉', '#00b894', 'realCanvas');
    showToast('已探索：' + closest.name);
  } else {
    createFloatingText(RX.px, RX.py - 30, '附近没有可打卡点', '#aaaaaa', 'realCanvas');
  }
}

function drawRealHUD() {
  const ctx = RX.ctx;
  ctx.save();
  // Location text
  ctx.fillStyle = '#fff'; ctx.font = '700 14px var(--font-display)'; ctx.textAlign = 'left';
  ctx.fillText(`${(RX.lat||0).toFixed(4)}, ${(RX.lng||0).toFixed(4)}`, 40, 90);
  ctx.fillStyle = 'var(--accent)';
  ctx.fillText('📍', 20, 90);
  
  // Boost Bar
  ctx.fillStyle='rgba(0,0,0,0.4)'; ctx.fillRect(20, 110, 100, 6);
  if(RX.boostEnergy>0) { ctx.fillStyle='var(--accent)'; ctx.fillRect(20, 110, Math.max(0, RX.boostEnergy), 6); }
  ctx.restore();
}

function realGameLoop() {
  if(!RX.running) return;
  RX.animFrame = requestAnimationFrame(realGameLoop);
  
  updateRealPlayer();
  
  const ctx = RX.ctx;
  ctx.clearRect(0,0,RX.canvas.width,RX.canvas.height);
  
  // 绘制中心像素角色 (居中在屏幕上)
  drawPixelCharacter(ctx, RX.px, RX.py, RX.pDir, RX.pFrame, RX.vehicle);
  drawRealHUD();
  
  // 绘制漂浮文字
  for(let i=FloatingTexts.length-1; i>=0; i--) {
    const ft = FloatingTexts[i];
    if(ft.ctxId === 'realCanvas' || (!ft.ctxId && ft.canvasId==='realCanvas')) {
      ft.y -= 0.5; ft.alpha -= 0.015;
      ctx.fillStyle = ft.color; ctx.globalAlpha = Math.max(0, ft.alpha);
      ctx.font = '700 16px var(--font-display)'; ctx.textAlign = 'center';
      ctx.fillText(ft.text, ft.x, ft.y);
      if(ft.alpha<=0) FloatingTexts.splice(i,1);
    }
  }
  ctx.globalAlpha = 1;
}

// 修改基线 / Base: index.html HEAD (本地最新版)
// 修改内容 / Changes: 移除了重复定义的 VEHICLES 常量及相关冗余逻辑，修复了 Identifier 'VEHICLES' has already been declared 导致的 SyntaxError 和加载卡死问题。
// Removed redundant VEHICLES constant to fix SyntaxError.

// === COLOR WALK ===
let colorWalkState = JSON.parse(localStorage.getItem('cw_colorwalk') || '{"players":[],"photos":{}}');

function openColorWalk() {
  renderColorWalk();
  document.getElementById('colorWalkPanel').classList.add('active');
}
function renderColorWalk() {
  const body = document.getElementById('colorWalkBody');
  const hasPlayers = colorWalkState.players.length > 0;
  body.innerHTML = `
    <div style="text-align:center;padding:8px 0 16px;">
      <div style="font-size:2.5rem;margin-bottom:8px;">🌈</div>
      <div style="font-family:var(--font-display);font-size:1.4rem;">ColorWalk</div>
      <div style="font-size:.8rem;color:rgba(26,26,46,.4);margin-top:4px;line-height:1.6;">
        每人选一个颜色，在城市中寻找属于自己颜色的元素<br>拍下来，拼成一组独特的城市色卡
      </div>
    </div>
    ${!hasPlayers ? `
      <div style="background:#fff;border-radius:var(--radius);padding:20px;box-shadow:var(--shadow);margin-bottom:16px;">
        <div style="font-weight:700;font-size:.9rem;margin-bottom:12px;">选择参与人数</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          ${[2,3,4,5,6].map(n => `
            <button onclick="startColorWalk(${n})" style="flex:1;min-width:50px;padding:12px 0;border-radius:var(--radius-sm);background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;font-weight:900;font-size:1.1rem;box-shadow:0 2px 12px rgba(255,107,53,.2);transition:transform .2s;"
            onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">${n}人</button>
          `).join('')}
        </div>
      </div>
    ` : `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <span style="font-weight:700;font-size:.9rem;">${colorWalkState.players.length} 位玩家的色卡</span>
        <button onclick="resetColorWalk()" style="padding:6px 14px;border-radius:20px;font-size:.68rem;font-weight:700;color:rgba(26,26,46,.4);background:rgba(26,26,46,.06);transition:background .2s;"
        onmouseover="this.style.background='rgba(26,26,46,.1)'" onmouseout="this.style.background='rgba(26,26,46,.06)'">重新开始</button>
      </div>
      <div class="color-result-grid">
        ${colorWalkState.players.map((p, pi) => {
          const photos = colorWalkState.photos[pi] || [];
          return `<div class="color-result-card">
            <div class="color-result-header">
              <div class="color-result-dot" style="background:${p.hex}"></div>
              <div class="color-result-name">玩家${pi+1} · ${p.name}</div>
            </div>
            <div class="color-result-photos">
              ${photos.length > 0 ? photos.map(ph => `
                <img class="photo-thumb" src="${ph}" style="width:100%;height:100%;object-fit:cover;" alt="${p.name}">
              `).join('') : `<div class="empty">${p.emoji} 还没拍照</div>`}
              <button class="color-upload-btn" onclick="colorUpload(${pi})">📸 拍一张${p.name}</button>
            </div>
          </div>`;
        }).join('')}
      </div>
      ${Object.values(colorWalkState.photos).some(a => a.length > 0) ? `
        <div style="margin-top:20px;text-align:center;">
          <button onclick="generateColorCard()" style="padding:12px 28px;border-radius:var(--radius);background:linear-gradient(135deg,#ff6b35,#e84393,#a29bfe,#00b894);color:#fff;font-weight:700;font-size:.9rem;box-shadow:0 4px 16px rgba(255,107,53,.3);transition:transform .2s;"
          onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">🎨 生成城市色卡</button>
        </div>
      ` : ''}
    `}`;
}
function startColorWalk(num) {
  // Randomly assign colors
  const shuffled = [...COLOR_OPTIONS].sort(() => Math.random() - 0.5);
  colorWalkState.players = shuffled.slice(0, num);
  colorWalkState.photos = {};
  for (let i = 0; i < num; i++) colorWalkState.photos[i] = [];
  localStorage.setItem('cw_colorwalk', JSON.stringify(colorWalkState));
  renderColorWalk();
  showToast(`已分配 ${num} 种颜色，出发寻找吧！`);
}
function resetColorWalk() {
  colorWalkState = {players:[], photos:{}};
  localStorage.setItem('cw_colorwalk', JSON.stringify(colorWalkState));
  renderColorWalk();
}
function colorUpload(playerIndex) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.capture = 'environment';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (!colorWalkState.photos[playerIndex]) colorWalkState.photos[playerIndex] = [];
      colorWalkState.photos[playerIndex].push(ev.target.result);
      localStorage.setItem('cw_colorwalk', JSON.stringify(colorWalkState));
      renderColorWalk();
      showToast(`${colorWalkState.players[playerIndex].name} +1 张照片！`);
    };
    reader.readAsDataURL(file);
  };
  input.click();
}
function generateColorCard() {
  showToast('城市色卡已生成！截图保存你的作品');
}

// === VISIT MODE (到此一游) ===
function openVisitMode() {
  renderVisitMode();
  document.getElementById('visitPanel').classList.add('active');
}
function renderVisitMode() {
  const allPhotos = [...DEMO_GALLERY, ...VISIT_GALLERY].sort((a,b) => b.time.localeCompare(a.time));
  const body = document.getElementById('visitBody');
  const now = new Date();
  const dateStr = now.getFullYear() + '.' + String(now.getMonth()+1).padStart(2,'0') + '.' + String(now.getDate()).padStart(2,'0') + ' ' + String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
  body.innerHTML = `
    <div style="text-align:center;padding:8px 0 20px;">
      <div style="font-size:2.5rem;margin-bottom:8px;">📷</div>
      <div style="font-family:var(--font-display);font-size:1.4rem;">到此一游</div>
      <div style="font-size:.8rem;color:rgba(26,26,46,.4);margin-top:4px;line-height:1.6;">
        在城市留下你的笑容<br>让陌生的旅人知道，你曾来过这里
      </div>
    </div>
    <div class="camera-frame">
      <div class="camera-screen" id="cameraScreen">
        <div class="placeholder-cam" id="camPlaceholder">📸<br>点击下方按钮<br>打开相机留影</div>
        <video id="camVideo" autoplay playsinline muted style="display:none;"></video>
        <canvas id="camCanvas" style="display:none;"></canvas>
        <div class="camera-overlay"></div>
        <div class="camera-date">${dateStr}</div>
      </div>
      <div class="camera-controls">
        <button class="cam-secondary-btn" onclick="toggleCamera()" id="camToggleBtn">📷</button>
        <button class="shutter-btn" onclick="takeVisitPhoto()"><div class="shutter-inner"></div></button>
        <button class="cam-secondary-btn" onclick="switchCamera()">🔄</button>
      </div>
    </div>
    <div style="margin-top:12px;background:#fff;border-radius:var(--radius-sm);padding:12px 14px;box-shadow:0 2px 8px rgba(26,26,46,.04);">
      <input id="visitLocation" type="text" placeholder="📍 你在哪里？（如：武康大楼前）" style="width:100%;padding:8px 0;font-size:.85rem;border:none;outline:none;background:transparent;font-family:var(--font-body);color:var(--ink);">
      <input id="visitMsg" type="text" placeholder="💬 留一句话给陌生人..." style="width:100%;padding:8px 0;font-size:.85rem;border:none;outline:none;background:transparent;font-family:var(--font-body);color:var(--ink);border-top:1px solid rgba(26,26,46,.06);margin-top:4px;">
    </div>
    <div style="margin-top:24px;">
      <div style="font-family:var(--font-display);font-size:1.2rem;margin-bottom:4px;">🖼️ 城市留影墙</div>
      <div style="font-size:.75rem;color:rgba(26,26,46,.35);margin-bottom:14px;">来自各地漫步者的笑容</div>
      ${allPhotos.length > 0 ? `
        <div class="gallery-strip">
          ${allPhotos.map(p => `
            <div class="gallery-item anim-scaleIn">
              <div style="width:100%;height:100px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,rgba(26,26,46,.03),rgba(26,26,46,.06));font-size:2.5rem;">
                ${p.photo ? `<img src="${p.photo}" style="width:100%;height:100%;object-fit:cover;">` : p.emoji}
              </div>
              <div class="gallery-item-info">
                <div class="loc">📍 ${p.location} · ${p.city}</div>
                <div class="time">${p.time}</div>
                ${p.msg ? `<div style="font-size:.55rem;color:rgba(26,26,46,.45);margin-top:2px;font-style:italic;">"${p.msg}"</div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      ` : '<div class="gallery-empty">还没有人留影，成为第一个吧！</div>'}
    </div>`;
}
function toggleCamera() {
  const video = document.getElementById('camVideo');
  const placeholder = document.getElementById('camPlaceholder');
  if (window._visitStream) {
    window._visitStream.getTracks().forEach(t => t.stop());
    window._visitStream = null;
    video.style.display = 'none';
    placeholder.style.display = 'block';
    return;
  }
  const constraints = { video: { facingMode: window._camFacing || 'user', width:{ideal:640}, height:{ideal:480} }, audio: false };
  navigator.mediaDevices.getUserMedia(constraints).then(stream => {
    window._visitStream = stream;
    video.srcObject = stream;
    video.style.display = 'block';
    placeholder.style.display = 'none';
  }).catch(() => {
    showToast('无法访问相机，请检查权限');
  });
}
function switchCamera() {
  window._camFacing = window._camFacing === 'user' ? 'environment' : 'user';
  if (window._visitStream) {
    window._visitStream.getTracks().forEach(t => t.stop());
    window._visitStream = null;
    toggleCamera();
  }
}
function takeVisitPhoto() {
  const video = document.getElementById('camVideo');
  const canvas = document.getElementById('camCanvas');
  const location = document.getElementById('visitLocation').value.trim() || '未知地点';
  const msg = document.getElementById('visitMsg').value.trim();
  const city = APP.selectedCity || '未知城市';
  const now = new Date();
  const timeStr = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0') + ' ' + String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
  let photoData = '';
  if (window._visitStream && video.videoWidth > 0) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    // Add timestamp overlay
    ctx.fillStyle = 'rgba(0,0,0,.4)';
    ctx.fillRect(0, canvas.height - 30, canvas.width, 30);
    ctx.fillStyle = '#fff';
    ctx.font = '12px monospace';
    ctx.fillText(timeStr + ' | ' + location, 8, canvas.height - 10);
    photoData = canvas.toDataURL('image/jpeg', 0.7);
  }
  const entry = {
    id: 'user_' + Date.now(),
    photo: photoData,
    emoji: ['😊','😄','🥰','😎','🤩','😋','🤗','✨'][Math.floor(Math.random()*8)],
    location: location,
    city: city,
    time: timeStr,
    msg: msg
  };
  VISIT_GALLERY.push(entry);
  localStorage.setItem('cw_visit_gallery', JSON.stringify(VISIT_GALLERY));
  renderVisitMode();
  showToast('留影成功！你的笑容已留在这座城市');
  // Re-init camera
  if (window._visitStream) {
    setTimeout(() => {
      const v = document.getElementById('camVideo');
      if (v && window._visitStream) {
        v.srcObject = window._visitStream;
        v.style.display = 'block';
        const ph = document.getElementById('camPlaceholder');
        if (ph) ph.style.display = 'none';
      }
    }, 300);
  }
}

// === BLIND WALK ===
let blindWalkHistory = JSON.parse(localStorage.getItem('cw_blindwalk') || '[]');

function openBlindWalk() {
  renderBlindWalk();
  document.getElementById('blindWalkPanel').classList.add('active');
}
function renderBlindWalk() {
  const body = document.getElementById('blindWalkBody');
  body.innerHTML = `
    <div style="text-align:center;padding:8px 0 10px;">
      <div style="font-size:2.5rem;margin-bottom:8px;">🎲</div>
      <div style="font-family:var(--font-display);font-size:1.4rem;">盲盒Walk</div>
      <div style="font-size:.8rem;color:rgba(26,26,46,.4);margin-top:4px;line-height:1.6;">
        把选择权交给命运<br>点击骰子，决定你的下一步
      </div>
    </div>
    <div class="dice-container">
      <div class="dice-visual" id="diceVisual" onclick="rollDice()">🎲</div>
      <div style="font-size:.75rem;color:rgba(26,26,46,.3);">点击骰子开始</div>
      <div class="dice-result" id="diceResult"></div>
    </div>
    ${blindWalkHistory.length > 0 ? `
      <div class="dice-history">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <h4 style="margin:0;">今日路线回顾 (${blindWalkHistory.length}步)</h4>
          <button onclick="resetBlindWalk()" style="padding:4px 10px;border-radius:12px;font-size:.65rem;font-weight:600;color:rgba(26,26,46,.35);background:rgba(26,26,46,.05);">清除</button>
        </div>
        ${blindWalkHistory.map((s, i) => `
          <div class="dice-step anim-slideInRight stagger-${Math.min(i+1,8)}">
            <div class="num">${i+1}</div>
            <div class="dir">${s.dir}</div>
            <div class="emoji">${s.emoji}</div>
          </div>
        `).join('')}
      </div>
    ` : ''}`;
}
function rollDice() {
  const dice = document.getElementById('diceVisual');
  dice.classList.remove('rolling');
  void dice.offsetWidth;
  dice.classList.add('rolling');
  setTimeout(() => {
    const result = BLIND_DIRECTIONS[Math.floor(Math.random() * BLIND_DIRECTIONS.length)];
    dice.textContent = result.emoji;
    dice.classList.remove('rolling');
    document.getElementById('diceResult').innerHTML = `
      <h4>${result.dir}！</h4>
      <p>${result.desc}</p>
    `;
    blindWalkHistory.push(result);
    localStorage.setItem('cw_blindwalk', JSON.stringify(blindWalkHistory));
    // Re-render to update history
    setTimeout(() => renderBlindWalk(), 800);
  }, 600);
}
function resetBlindWalk() {
  blindWalkHistory = [];
  localStorage.setItem('cw_blindwalk', '[]');
  renderBlindWalk();
}

// === SOUND WALK (simple prompt mode) ===
function openSoundWalk() {
  const body = document.getElementById('colorWalkBody');
  body.innerHTML = `
    <div style="text-align:center;padding:20px 0;">
      <div style="font-size:3rem;margin-bottom:12px;">🎧</div>
      <div style="font-family:var(--font-display);font-size:1.5rem;">声音Walk</div>
      <div style="font-size:.85rem;color:rgba(26,26,46,.45);margin-top:8px;line-height:1.7;max-width:320px;margin-left:auto;margin-right:auto;">
        闭上眼睛，用耳朵感受城市<br><br>
        今日任务：记录 <strong>5种</strong> 不同的城市声音
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px;margin-top:16px;">
      ${['☕ 咖啡机的声音','🐦 鸟鸣或虫鸣','🎸 街头艺人的音乐','🚲 自行车铃声','🗣️ 最动听的方言','💧 流水声','🍳 街边炒菜的声音','🔔 寺庙钟声'].map((s, i) => `
        <label style="display:flex;align-items:center;gap:12px;padding:14px 16px;background:#fff;border-radius:var(--radius-sm);box-shadow:0 1px 6px rgba(26,26,46,.04);cursor:pointer;transition:transform .2s;" onmouseover="this.style.transform='translateX(4px)'" onmouseout="this.style.transform='translateX(0)'">
          <input type="checkbox" style="width:18px;height:18px;accent-color:var(--accent);">
          <span style="font-size:.88rem;">${s}</span>
        </label>
      `).join('')}
    </div>
    <div style="text-align:center;margin-top:24px;font-size:.75rem;color:rgba(26,26,46,.3);">
      找到声音后勾选，集齐5种解锁「声音猎人」成就
    </div>`;
  document.getElementById('colorWalkPanel').classList.add('active');
}

// === TIME CAPSULE WALK (simple prompt mode) ===
function openTimeWalk() {
  const body = document.getElementById('colorWalkBody');
  body.innerHTML = `
    <div style="text-align:center;padding:20px 0;">
      <div style="font-size:3rem;margin-bottom:12px;">⏳</div>
      <div style="font-family:var(--font-display);font-size:1.5rem;">时间胶囊Walk</div>
      <div style="font-size:.85rem;color:rgba(26,26,46,.45);margin-top:8px;line-height:1.7;max-width:320px;margin-left:auto;margin-right:auto;">
        带一张老照片出发<br>找到同一个地点，拍下今天的样子
      </div>
    </div>
    <div style="background:#fff;border-radius:var(--radius);padding:20px;box-shadow:var(--shadow);margin-top:16px;">
      <div style="font-weight:700;font-size:.9rem;margin-bottom:12px;">📸 上传老照片</div>
      <div id="oldPhotoArea" style="aspect-ratio:4/3;border:2px dashed rgba(26,26,46,.12);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;cursor:pointer;background:rgba(26,26,46,.02);transition:border-color .2s;overflow:hidden;" onclick="uploadOldPhoto()" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='rgba(26,26,46,.12)'">
        <div style="text-align:center;color:rgba(26,26,46,.25);font-size:.85rem;line-height:1.6;">
          <div style="font-size:2rem;margin-bottom:6px;">🏚️</div>
          点击上传一张老照片<br>或从相册选择
        </div>
      </div>
    </div>
    <div style="background:#fff;border-radius:var(--radius);padding:20px;box-shadow:var(--shadow);margin-top:16px;">
      <div style="font-weight:700;font-size:.9rem;margin-bottom:12px;">📸 拍下今天</div>
      <div id="newPhotoArea" style="aspect-ratio:4/3;border:2px dashed rgba(26,26,46,.12);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;cursor:pointer;background:rgba(26,26,46,.02);transition:border-color .2s;overflow:hidden;" onclick="uploadNewPhoto()" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='rgba(26,26,46,.12)'">
        <div style="text-align:center;color:rgba(26,26,46,.25);font-size:.85rem;line-height:1.6;">
          <div style="font-size:2rem;margin-bottom:6px;">🏙️</div>
          站在同一个位置<br>拍一张今天的照片
        </div>
      </div>
    </div>
    <div style="text-align:center;margin-top:20px;font-size:.75rem;color:rgba(26,26,46,.3);line-height:1.6;">
      时间在流淌，城市在呼吸<br>你正站在两个时代的交汇点
    </div>`;
  document.getElementById('colorWalkPanel').classList.add('active');
}
function uploadOldPhoto() {
  pickPhoto('oldPhotoArea');
}
function uploadNewPhoto() {
  pickPhoto('newPhotoArea');
}
function pickPhoto(areaId) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      document.getElementById(areaId).innerHTML = `<img src="${ev.target.result}" style="width:100%;height:100%;object-fit:cover;">`;
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

// === SHARED CONSTANTS ===

const REWARD_TYPES = [
  {icon:'⭐',name:'星辰碎片',points:10,color:'#ffd700'},
  {icon:'💎',name:'蓝宝石',points:25,color:'#5cadff'},
  {icon:'🔮',name:'水晶球',points:15,color:'#b464ff'},
  {icon:'🍜',name:'美食券',points:20,color:'#ffb43c'},
  {icon:'📸',name:'打卡徽章',points:30,color:'#ff64b4'},
  {icon:'🎁',name:'盲盒礼物',points:50,color:'#ff6b6b'},
];

const REWARD_RESPAWN_TIME = 30000; // 30 seconds

// === VEHICLE SYSTEM (shared by both modes) ===
const VEHICLES = {
  walk:       {icon:'🚶',name:'步行',   speedMult:1.0, boostMult:1.8, desc:'默认步行模式', rarity:'common'},
  skateboard: {icon:'🛹',name:'滑板',   speedMult:1.5, boostMult:2.5, desc:'街头风格，自由滑行', rarity:'common'},
  bike:       {icon:'🚲',name:'自行车', speedMult:1.8, boostMult:2.8, desc:'轻快骑行，加速更快', rarity:'common'},
  scooter:    {icon:'🛴',name:'滑板车', speedMult:2.2, boostMult:3.5, desc:'灵活穿梭，极速冲刺', rarity:'uncommon'},
  car:        {icon:'🚗',name:'小轿车', speedMult:3.0, boostMult:4.5, desc:'高速巡航，能量消耗大', rarity:'uncommon'},
  motorcycle: {icon:'🏍️',name:'摩托车', speedMult:3.5, boostMult:5.0, desc:'极速飙车，风驰电掣', rarity:'rare'},
  boat:       {icon:'🛶',name:'小船',   speedMult:2.0, boostMult:3.0, desc:'水上漂流，畅游江河', rarity:'rare', canWater:true},
  helicopter: {icon:'🚁',name:'直升机', speedMult:5.0, boostMult:7.0, desc:'空中霸主，无视障碍', rarity:'legendary'},
};

const RARITY_COLORS = {common:'#4ade80',uncommon:'#60a5fa',rare:'#a78bfa',legendary:'#fbbf24'};
const RARITY_NAMES = {common:'普通',uncommon:'稀有',rare:'珍稀',legendary:'传说'};

// Vehicle pickup definitions with rarity weights
const VEHICLE_PICKUP_TYPES = [
  {key:'skateboard', weight:5},
  {key:'bike',       weight:5},
  {key:'scooter',    weight:4},
  {key:'car',        weight:3},
  {key:'motorcycle', weight:2},
  {key:'boat',       weight:2},
  {key:'helicopter', weight:1},
];

// Vehicle unlock persistence
let VEHICLE_UNLOCKS = JSON.parse(localStorage.getItem('cw_vehicle_unlocks') || '["walk"]');
function isVehicleUnlocked(vKey) { return VEHICLE_UNLOCKS.includes(vKey); }
function unlockVehicle(vKey) {
  if (!VEHICLE_UNLOCKS.includes(vKey)) {
    VEHICLE_UNLOCKS.push(vKey);
    localStorage.setItem('cw_vehicle_unlocks', JSON.stringify(VEHICLE_UNLOCKS));
  }
}
function pickRandomVehiclePickup() {
  const locked = VEHICLE_PICKUP_TYPES.filter(v => !isVehicleUnlocked(v.key));
  if (locked.length === 0) return null;
  const totalW = locked.reduce((s, v) => s + v.weight, 0);
  let r = Math.random() * totalW;
  for (const v of locked) { r -= v.weight; if (r <= 0) return v.key; }
  return locked[locked.length - 1].key;
}

function switchVehicle(mode, vKey) {
  const st = mode === 'px' ? PX : GX;
  if (!VEHICLES[vKey]) return;
  if (!isVehicleUnlocked(vKey)) {
    showToast('🔒 ' + VEHICLES[vKey].name + ' 尚未解锁，在地图上寻找吧！');
    return;
  }
  st.vehicle = vKey;
  st.speed = st.baseSpeed * VEHICLES[vKey].speedMult;
  renderVehicleSelector(mode);
  const panel = mode === 'px' ? 'pixel' : 'glass';
  const label = document.getElementById(panel + 'VehicleLabel');
  if (label) label.textContent = VEHICLES[vKey].icon + ' ' + VEHICLES[vKey].name;
  showToast(VEHICLES[vKey].icon + ' 切换为 ' + VEHICLES[vKey].name);
}

function renderVehicleSelector(mode) {
  const panel = mode === 'px' ? 'pixel' : 'glass';
  const st = mode === 'px' ? PX : GX;
  const sel = document.getElementById(panel + 'VehicleSel');
  if (!sel) return;
  const modePrefix = mode === 'px' ? 'px' : 'glass';
  let html = '<div class="vh-title">选择载具</div>';
  Object.keys(VEHICLES).forEach(vKey => {
    const v = VEHICLES[vKey];
    const unlocked = isVehicleUnlocked(vKey);
    const active = st.vehicle === vKey;
    const rCol = RARITY_COLORS[v.rarity] || '#fff';
    if (unlocked) {
      html += `<div class="vh-opt${active?' active':''}" data-v="${vKey}" onclick="switchVehicle('${modePrefix}','${vKey}')"><span class="vh-icon">${v.icon}</span><span class="vh-name">${v.name}</span><span class="vh-rarity" style="color:${rCol};font-size:9px;margin-left:auto">${RARITY_NAMES[v.rarity]||''}</span><span class="vh-desc">${v.desc}</span></div>`;
    } else {
      html += `<div class="vh-opt locked" data-v="${vKey}"><span class="vh-icon" style="filter:grayscale(1);opacity:.4">🔒</span><span class="vh-name" style="opacity:.35">???</span><span class="vh-rarity" style="color:${rCol};font-size:9px;margin-left:auto;opacity:.5">${RARITY_NAMES[v.rarity]||''}</span></div>`;
    }
  });
  sel.innerHTML = html;
}

function showVehicleUnlockToast(vKey) {
  const v = VEHICLES[vKey];
  if (!v) return;
  const rCol = RARITY_COLORS[v.rarity] || '#ffd700';
  const el = document.createElement('div');
  el.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) scale(0);z-index:400;padding:24px 36px;border-radius:20px;background:rgba(10,10,20,.92);backdrop-filter:blur(16px);color:#fff;text-align:center;pointer-events:none;transition:all .5s cubic-bezier(.17,.67,.35,1.4);border:2px solid '+rCol+';box-shadow:0 0 60px '+rCol+'44,0 12px 40px rgba(0,0,0,.5);';
  el.innerHTML = `<div style="font-size:14px;opacity:.6;margin-bottom:8px;letter-spacing:2px">载具解锁!</div><div style="font-size:52px;margin-bottom:8px;filter:drop-shadow(0 0 12px ${rCol})">${v.icon}</div><div style="font-size:20px;font-weight:700;color:${rCol}">${v.name}</div><div style="font-size:13px;opacity:.6;margin-top:6px">${v.desc}</div><div style="font-size:11px;margin-top:8px;color:${rCol};opacity:.7">${RARITY_NAMES[v.rarity]}</div>`;
  document.body.appendChild(el);
  requestAnimationFrame(() => { el.style.transform = 'translate(-50%,-50%) scale(1)'; });
  setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translate(-50%,-60%) scale(.8)'; }, 2500);
  setTimeout(() => el.remove(), 3200);
}

function updateRewardRespawns(state) {
  const now = Date.now();
  state.rewards.forEach(r => {
    if (r.collected && !r.isVehiclePickup && !r.respawning) {
      r.respawning = true;
      r.respawnTimer = now;
    }
    if (r.respawning && (now - r.respawnTimer) >= REWARD_RESPAWN_TIME) {
      r.collected = false;
      r.respawning = false;
      r.respawnTimer = 0;
      r.type = REWARD_TYPES[Math.floor(Math.random() * REWARD_TYPES.length)];
      r.fadeAlpha = 0;
      delete state.collectedRewards[r.id];
    }
    if (!r.collected && r.fadeAlpha < 1) {
      r.fadeAlpha = Math.min(1, r.fadeAlpha + 0.02);
    }
  });
}

function toggleVehiclePanel(mode) {
  const panel = mode === 'px' ? 'pixel' : 'glass';
  const sel = document.getElementById(panel + 'VehicleSel');
  if (sel) sel.classList.toggle('active');
}

function updateBoost(st) {
  const v = VEHICLES[st.vehicle];
  if (st.boosting && st.boostEnergy > 0) {
    st.speed = st.baseSpeed * v.boostMult;
    st.boostEnergy = Math.max(0, st.boostEnergy - st.boostDrain);
    if (st.boostEnergy <= 0) st.boosting = false;
  } else {
    st.speed = st.baseSpeed * v.speedMult;
    if (!st.boosting && st.boostEnergy < st.boostMax) {
      st.boostEnergy = Math.min(st.boostMax, st.boostEnergy + st.boostRegen);
    }
  }
}

// === INFINITE WORLD CHUNK SYSTEM ===
// 修改基线 / Base: index.html INFINITE WORLD CHUNK SYSTEM 原始版本
// 修改内容 / Changes: 城市感知种子 + 地形档案 + 基于纬度/城市类型的动态地形生成
// City-aware seed + terrain profiles + latitude/city-type driven dynamic terrain generation
const CHUNK_SIZE = 32;
// 修改基线 / Base: GEO 对象 (commit 3cf6855)
// 修改内容 / Changes: 新增 waterFeatures(城市级水系数据) 和 densityBase(核心区域POI密度基准)
// Added waterFeatures (city-level water data) and densityBase (core area POI density baseline)
const GEO = {originLat:31.23,originLng:121.47,degPerTileY:0.000135,degPerTileX:0.000156,
  waterFeatures:[],  // 城市级水系特征: [{gridX, gridY, direction:'h'|'v', width:3-8}]
  densityBase:0.22   // 核心区域建筑生成概率基准
};
function gridToGeo(gx,gy){return{lat:GEO.originLat-gy*GEO.degPerTileY,lng:GEO.originLng+gx*GEO.degPerTileX};}
function geoToGrid(lat,lng){return{gx:(lng-GEO.originLng)/GEO.degPerTileX,gy:(GEO.originLat-lat)/GEO.degPerTileY};}

// 城市感知种子: 将城市经纬度编入哈希，使不同城市产生不同地形
// City-aware seed: incorporate city lat/lng into hash so different cities produce different terrain
function chunkSeed(cx,cy){
  const cityHash = (Math.floor(GEO.originLat*1e5)*73) ^ (Math.floor(GEO.originLng*1e5)*137);
  return(((cx*73856093)^(cy*19349663))^cityHash)>>>0;
}

// 地形档案: 不同类型城市的地形参数 / Terrain profiles for different city types
const CITY_TERRAIN_PROFILES = {
  modern:   { mainRoadGap: 12, secRoadMin: 2, secRoadMax: 4, waterProb: 0.10, waterWidth: [2,3], treeDensity: 0.06, treeStep: 4, roadCurve: false },
  historic: { mainRoadGap: 14, secRoadMin: 1, secRoadMax: 2, waterProb: 0.15, waterWidth: [2,4], treeDensity: 0.14, treeStep: 3, roadCurve: true },
  cultural: { mainRoadGap: 13, secRoadMin: 1, secRoadMax: 3, waterProb: 0.12, waterWidth: [2,3], treeDensity: 0.16, treeStep: 3, roadCurve: true },
  coastal:  { mainRoadGap: 12, secRoadMin: 2, secRoadMax: 3, waterProb: 0.30, waterWidth: [3,6], treeDensity: 0.08, treeStep: 4, roadCurve: false },
  nature:   { mainRoadGap: 16, secRoadMin: 0, secRoadMax: 1, waterProb: 0.18, waterWidth: [3,5], treeDensity: 0.25, treeStep: 2, roadCurve: true },
};

// 获取当前城市的地形档案 / Get terrain profile for current city
function getTerrainProfile(){
  const cityName = APP.selectedCity || '';
  const knownType = typeof KNOWN_CITY_TYPES!=='undefined' ? KNOWN_CITY_TYPES[cityName] : null;
  // 如果已知城市类型，直接使用；否则根据纬度推断
  if(knownType && CITY_TERRAIN_PROFILES[knownType]) return CITY_TERRAIN_PROFILES[knownType];
  // 纬度推断: 高纬度→自然, 低纬度→现代(密集), 中纬度→文化
  const lat = Math.abs(GEO.originLat);
  if(lat > 40) return CITY_TERRAIN_PROFILES.nature;
  if(lat > 33) return CITY_TERRAIN_PROFILES.cultural;
  if(lat < 25) return CITY_TERRAIN_PROFILES.modern;
  return CITY_TERRAIN_PROFILES.modern;
}

function createChunkManager(){
  return{chunks:new Map(),loading:new Set(),LOAD_RADIUS:2,UNLOAD_RADIUS:4,frameCounter:0};
}
function createChunk(cx,cy){
  return{cx,cy,ground:null,buildings:[],trees:[],rewards:[],pois:[],generated:false,poisLoaded:false,poisLoading:false,seed:chunkSeed(cx,cy)};
}

function generateChunkTerrain(chunk){
  const S=CHUNK_SIZE,rng=mulberry32(chunk.seed);
  const tp = getTerrainProfile();
  chunk.ground=[];
  for(let y=0;y<S;y++){chunk.ground[y]=[];for(let x=0;x<S;x++)chunk.ground[y][x]='grass';}

  // ======== 主干道 / Main roads (城市类型决定间距) ========
  const gap = tp.mainRoadGap;
  // 使用种子偏移主干道位置，使不同区块的主干道位置略有变化但仍能对齐
  const roadOffset = Math.floor(rng() * 3);
  const mainRoads = [];
  for(let r = gap - roadOffset; r < S; r += gap) { if(r >= 2 && r < S-1) mainRoads.push(r); }
  mainRoads.forEach(r=>{
    for(let x=0;x<S;x++){chunk.ground[r][x]='road';}
    for(let y=0;y<S;y++){chunk.ground[y][r]='road';}
  });

  // ======== 次级道路 / Secondary roads (密度由城市档案决定) ========
  const numSec = tp.secRoadMin + Math.floor(rng() * (tp.secRoadMax - tp.secRoadMin + 1));
  for(let s=0;s<numSec;s++){
    const isH=rng()>0.5, pos=2+Math.floor(rng()*(S-4));
    if(tp.roadCurve && rng() < 0.4){
      // 弯曲道路(历史/文化/自然城市) / Curved roads for historic/cultural/nature cities
      let curY = pos;
      for(let x=0;x<S;x++){
        if(isH){
          if(curY>=0 && curY<S) chunk.ground[curY][x]='road';
          if(rng()<0.15) curY += (rng()>0.5?1:-1); // 随机弯曲
          curY = Math.max(1, Math.min(S-2, curY));
        } else {
          if(x>=0 && x<S) chunk.ground[x][pos]='road';
        }
      }
    } else {
      if(isH){for(let x=0;x<S;x++)chunk.ground[pos][x]='road';}
      else{for(let y=0;y<S;y++)chunk.ground[y][pos]='road';}
    }
  }

  // ======== 水系 / Water (基于真实地理数据) ========
  // 修改基线 / Base: generateChunkTerrain 随机水系生成 (commit 3cf6855)
  // 修改内容 / Changes: 用 GEO.waterFeatures 真实水系替代纯随机水块, 保留 coastal 海洋逻辑
  // Replaced random water blocks with GEO.waterFeatures real water, kept coastal ocean logic
  let hasRealWater = false;
  if (GEO.waterFeatures.length > 0) {
    GEO.waterFeatures.forEach(river => {
      if (generateRiverInChunk(chunk, river)) hasRealWater = true;
    });
  }
  // 如果没有真实水系数据，回退到基于概率的随机水系 (但概率减半)
  // Fallback to probability-based random water if no real data (halved probability)
  if (!hasRealWater) {
    const chunkGeo = gridToGeo(chunk.cx*S+S/2, chunk.cy*S+S/2);
    const geoNoise = (Math.abs(chunkGeo.lat*1000)%1 + Math.abs(chunkGeo.lng*1000)%1) / 2;
    const waterThreshold = tp.waterProb * 0.5 + geoNoise * 0.03; // 减半随机水概率
    if (rng() < waterThreshold) {
      const ry = 4+Math.floor(rng()*(S-8));
      const baseWidth = tp.waterWidth[0];
      const maxExtra = tp.waterWidth[1] - tp.waterWidth[0];
      for (let x=0;x<S;x++) {
        const ww = Math.floor(baseWidth + rng()*maxExtra);
        for (let d=0;d<ww;d++) { if(ry+d<S) chunk.ground[ry+d][x]='water'; }
      }
    }
  }
  // 沿海城市的外围区块有可能出现大面积海洋
  if (tp === CITY_TERRAIN_PROFILES.coastal && (Math.abs(chunk.cx)>2 || Math.abs(chunk.cy)>2) && rng()<0.3) {
    const seaStart = rng()>0.5 ? 0 : Math.floor(S*0.6);
    const seaEnd = seaStart===0 ? Math.floor(S*0.4) : S;
    for(let y=seaStart;y<seaEnd;y++){for(let x=0;x<S;x++){chunk.ground[y][x]='water';}}
  }

  // ======== 装饰树木 / Decorative trees (密度基于城市档案) ========
  const TREE_COLORS=['#4a7c59','#5a8c65','#3d6b4a','#2d8e5e','#3a9960'];
  const step = tp.treeStep;
  for(let y=1;y<S-1;y+=step){for(let x=1;x<S-1;x+=step){
    if(chunk.ground[y][x]==='grass'&&rng()<tp.treeDensity){
      chunk.trees.push({lx:x,ly:y,x:chunk.cx*S+x,y:chunk.cy*S+y,h:2+Math.floor(rng()*3),type:Math.floor(rng()*3),
        size:1+Math.floor(rng()*2),color:TREE_COLORS[Math.floor(rng()*TREE_COLORS.length)]});
    }
  }}
  chunk.generated=true;
}
// Random building name pools by category for filler buildings
const FILLER_NAMES={
  '景点':['城市公园','纪念广场','文化宫','博物馆','展览馆','名人故居','历史遗址','古塔','观景台','碑林'],
  '美食':['老字号面馆','烧烤大排档','甜品屋','火锅店','早茶楼','小笼包铺','奶茶店','烤鸭店','川菜馆','粤菜馆','拉面馆','饺子馆','咖啡厅','面包坊'],
  '购物':['百货商场','潮牌集合店','文创市集','古董店','书店','数码城','花卉市场','茶叶店','特产商城','零食铺'],
  '文艺':['画廊','独立书店','咖啡书屋','手作工坊','艺术空间','摄影工作室','陶艺馆','音乐酒吧','剧场','诗社'],
  '网红':['网红墙','打卡地标','主题咖啡','猫咖','沉浸体验馆','密室逃脱','剧本杀','VR体验','屋顶花园','天台酒吧'],
  '住宅办公':['写字楼','商务中心','公寓','居民楼','创业园','联合办公','产业园','科技大厦','金融中心','总部基地'],
  '交通设施':['公交站','地铁站','停车场','出租站','共享单车点','充电站','客运站','高铁站'],
  '生活服务':['便利店','超市','药房','洗衣店','理发店','快递站','银行','邮局','健身房','宠物店'],
  '体育休闲':['篮球场','足球场','游泳馆','羽毛球馆','公园绿地','滑板场','攀岩馆','瑜伽馆'],
  '医疗保健':['社区医院','诊所','中医馆','体检中心','口腔医院','眼科医院','康复中心','养生堂'],
  '科教文化':['小学','中学','大学','图书馆','科技馆','天文馆','少年宫','培训机构','研究所','实验室'],
};
// Filler buildings for chunks without POI data
function generateChunkFillers(engine,chunk){
  const S=CHUNK_SIZE,rng=mulberry32(chunk.seed+99999);
  const occupied=new Set();
  chunk.buildings.forEach(b=>{
    for(let dy=0;dy<2;dy++)for(let dx=0;dx<b.w;dx++)occupied.add((b.ly+dy)+','+(b.lx+dx));
  });
  const isGlass=(engine===GX);
  const catKeys=Object.keys(isGlass?GLASS_COLORS:BLDG_TYPES);
  // 修改基线 / Base: generateChunkFillers (commit 3cf6855)
  // 修改内容 / Changes: 用 getChunkDensity 替代固定 0.22 概率, 建筑高度随距离递减
  // Replaced fixed 0.22 probability with getChunkDensity(), building height decreases with distance
  const density = getChunkDensity(chunk.cx, chunk.cy);
  const dist = Math.sqrt(chunk.cx * chunk.cx + chunk.cy * chunk.cy);
  // 建筑高度根据密度调整: 核心区高楼 (30-70), 中等区 (15-35), 郊区 (5-15)
  const heightMultiplier = Math.max(0.2, 1.0 - dist * 0.06);
  const stepSize = density > 0.25 ? 3 : (density > 0.15 ? 4 : 6); // 密度高→间距小
  for(let ly=2;ly<S-2;ly+=stepSize){for(let lx=2;lx<S-2;lx+=stepSize){
    if(chunk.ground[ly][lx]==='grass'&&!occupied.has(ly+','+lx)&&rng()<density){
      const catName=catKeys[Math.floor(rng()*catKeys.length)];
      if(catName==='default')continue;
      const bw=1+Math.floor(rng()*2);
      if(occupied.has(ly+','+(lx+1)))continue;
      const gx=chunk.cx*S+lx,gy=chunk.cy*S+ly;
      if(isGlass){
        const gc=GLASS_COLORS[catName]||GLASS_COLORS['default'];
        const bh=Math.floor((10+Math.floor(rng()*30)) * heightMultiplier);
        const names=FILLER_NAMES[catName]||FILLER_NAMES['生活服务'];
        const bName=names[Math.floor(rng()*names.length)];
        chunk.buildings.push({lx,ly,x:gx,y:gy,w:bw,h:Math.max(5,bh),gc,name:bName,type:catName,address:'',poiIdx:-1});
      }else{
        const bt=BLDG_TYPES[catName]||BLDG_TYPES['default'];
        const bh=bt.h[0]+Math.floor(rng()*(bt.h[1]-bt.h[0]+1));
        const names=FILLER_NAMES[catName]||FILLER_NAMES['生活服务'];
        const bName=names[Math.floor(rng()*names.length)];
        chunk.buildings.push({lx,ly,x:gx,y:gy,w:bw,h:bh,
          color:bt.colors[Math.floor(rng()*bt.colors.length)],roofColor:bt.roofColor,
          style:bt.style,icon:bt.icon,name:bName,type:catName,address:'',poiIdx:-1});
      }
      for(let dy=0;dy<2;dy++)for(let dx=0;dx<bw;dx++)occupied.add((ly+dy)+','+(lx+dx));
    }
  }}
  // Generate seeded rewards scattered in chunk
  const rwRng=mulberry32(chunk.seed+77777);
  let rwId=Math.abs(chunk.cx*10000+chunk.cy*100);
  for(let i=0;i<8;i++){
    const rx=Math.floor(rwRng()*S),ry=Math.floor(rwRng()*S);
    if(chunk.ground[ry]&&chunk.ground[ry][rx]!=='water'){
      const rt=REWARD_TYPES[rwId%REWARD_TYPES.length];
      chunk.rewards.push({id:'r'+rwId,x:chunk.cx*S+rx,y:chunk.cy*S+ry,type:rt,collected:false,
        bobPhase:rwRng()*Math.PI*2,fadeAlpha:1,respawning:false,respawnTimer:0,isVehiclePickup:false});
      rwId++;
    }
  }
  // Rare vehicle pickup (1 in 3 chunks)
  if(rwRng()<0.33){
    const vKeys=Object.keys(VEHICLES).filter(k=>k!=='walk');
    if(vKeys.length>0){
      const vk=vKeys[Math.floor(rwRng()*vKeys.length)];
      const vrx=10+Math.floor(rwRng()*12),vry=10+Math.floor(rwRng()*12);
      chunk.rewards.push({id:'v'+rwId,x:chunk.cx*S+vrx,y:chunk.cy*S+vry,type:REWARD_TYPES[0],collected:false,
        bobPhase:rwRng()*Math.PI*2,fadeAlpha:1,respawning:false,respawnTimer:0,
        isVehiclePickup:true,vehicleKey:vk});
    }
  }
}
function getGround(engine,gx,gy){
  if(!engine.infiniteMode){
    if(gx<0||gx>=engine.worldW||gy<0||gy>=engine.worldH)return 'grass';
    return engine.ground[gy][gx];
  }
  const cx=Math.floor(gx/CHUNK_SIZE),cy=Math.floor(gy/CHUNK_SIZE);
  const chunk=engine.chunkMgr.chunks.get(cx+','+cy);
  if(!chunk||!chunk.generated)return 'grass';
  const lx=((gx%CHUNK_SIZE)+CHUNK_SIZE)%CHUNK_SIZE;
  const ly=((gy%CHUNK_SIZE)+CHUNK_SIZE)%CHUNK_SIZE;
  return chunk.ground[ly][lx];
}
function getVisibleBuildings(engine){
  if(!engine.infiniteMode)return engine.buildings;
  const all=[];
  for(const chunk of engine.chunkMgr.chunks.values()){
    if(chunk.buildings.length)all.push(...chunk.buildings);
  }
  return all;
}
function getVisibleRewards(engine){
  if(!engine.infiniteMode)return engine.rewards;
  const all=[];
  for(const chunk of engine.chunkMgr.chunks.values()){
    if(chunk.rewards.length)all.push(...chunk.rewards);
  }
  return all;
}
function getVisibleTrees(engine){
  if(!engine.infiniteMode)return engine.trees||[];
  const all=[];
  for(const chunk of engine.chunkMgr.chunks.values()){
    if(chunk.trees.length)all.push(...chunk.trees);
  }
  return all;
}
function isOccupiedInfinite(engine,tx,ty){
  if(engine.ghostMode)return false;
  if(!engine.infiniteMode){
    return engine.buildings.some(b=>tx>=b.x&&tx<b.x+b.w&&ty>=b.y&&ty<b.y+2);
  }
  const cx=Math.floor(tx/CHUNK_SIZE),cy=Math.floor(ty/CHUNK_SIZE);
  const chunk=engine.chunkMgr.chunks.get(cx+','+cy);
  if(!chunk)return false;
  return chunk.buildings.some(b=>tx>=b.x&&tx<b.x+b.w&&ty>=b.y&&ty<b.y+2);
}
// 修改: 检测玩家是否卡在建筑内，自动移到最近道路
// Auto-unstuck: if player is inside a building, teleport to nearest road
function unstuckPlayer(engine){
  const ptx=Math.round(engine.px),pty=Math.round(engine.py);
  if(!isOccupiedInfinite(engine,ptx,pty))return; // not stuck
  console.log(`[Unstuck] 玩家卡在建筑内 (${ptx},${pty}), 寻找最近道路...`);
  for(let r=1;r<15;r++){
    for(let dx=-r;dx<=r;dx++){for(let dy=-r;dy<=r;dy++){
      if(Math.abs(dx)!==r&&Math.abs(dy)!==r)continue; // only check ring
      const tx=ptx+dx,ty=pty+dy;
      const g=getGround(engine,tx,ty);
      if((g==='road'||g==='grass')&&!isOccupiedInfinite(engine,tx,ty)){
        engine.px=tx;engine.py=ty;
        console.log(`[Unstuck] 已移动到 (${tx},${ty}) [${g}]`);
        return;
      }
    }}
  }
  // 极端情况: 开启穿越模式 / Extreme case: enable ghost mode
  engine.ghostMode=true;
  console.log('[Unstuck] 无法找到空地, 已开启穿越模式');
  showToast('已自动开启穿越模式');
}
function toggleGhostMode(engineType){
  const engine=engineType==='px'?PX:GX;
  engine.ghostMode=!engine.ghostMode;
  const btn=document.getElementById(engineType+'GhostBtn');
  if(btn){btn.style.background=engine.ghostMode?'rgba(0,255,200,0.35)':'rgba(0,0,0,0.25)';btn.title=engine.ghostMode?'穿越模式:开':'穿越模式:关';}
  showToast(engine.ghostMode?'穿越模式已开启 · 可穿过建筑':'穿越模式已关闭');
}
// API throttling for POI search
const API_THROTTLE={queue:[],active:0,maxConcurrent:2,minInterval:300,lastCallTime:0};
API_THROTTLE.enqueue=function(fn){
  return new Promise(resolve=>{
    this.queue.push({resolve,fn});
    this._process();
  });
};
API_THROTTLE._process=function(){
  if(this.active>=this.maxConcurrent||this.queue.length===0)return;
  const now=Date.now(),wait=Math.max(0,this.minInterval-(now-this.lastCallTime));
  if(wait>0){setTimeout(()=>this._process(),wait);return;}
  this.active++;this.lastCallTime=Date.now();
  const{resolve,fn}=this.queue.shift();
  fn().then(r=>{resolve(r);this.active--;this._process();}).catch(()=>{resolve([]);this.active--;this._process();});
};
// POI cache
const POI_CACHE=new Map();
const POI_CACHE_TTL=30*60*1000;
// Search POIs by geographic coordinates
function chunkPOISearchNearBy(centerLng,centerLat,radius,typeCode){
  return new Promise(resolve=>{
    const timeout=setTimeout(()=>resolve([]),3000);
    try{
      if(typeof AMap==='undefined'){clearTimeout(timeout);resolve([]);return;}
      const ps=new AMap.PlaceSearch({pageSize:20,type:typeCode||'',extensions:'base'});
      ps.searchNearBy('',[centerLng,centerLat],radius,(status,result)=>{
        clearTimeout(timeout);
        if(status==='complete'&&result.poiList&&result.poiList.pois)resolve(result.poiList.pois);
        else resolve([]);
      });
    }catch(e){clearTimeout(timeout);resolve([]);}
  });
}
// Load POIs for a chunk
async function loadChunkPOIs(engine,chunk){
  const key=chunk.cx+','+chunk.cy;
  if(chunk.poisLoaded||chunk.poisLoading)return;
  chunk.poisLoading=true;
  // Check cache
  const cached=POI_CACHE.get(key);
  if(cached&&Date.now()-cached.ts<POI_CACHE_TTL){
    populateChunkBuildings(engine,chunk,cached.pois);
    chunk.poisLoaded=true;chunk.poisLoading=false;return;
  }
  // Compute chunk center geo
  const centerGx=chunk.cx*CHUNK_SIZE+CHUNK_SIZE/2;
  const centerGy=chunk.cy*CHUNK_SIZE+CHUNK_SIZE/2;
  const geo=gridToGeo(centerGx,centerGy);
  // Search priority categories + water bodies via throttle
  // 修改基线 / Base: loadChunkPOIs 原始版本
  // 修改内容 / Changes: 增加水系 POI 查询 (190000), 用于真实河流检测
  // Added water body POI query (190000) for real river/lake detection
  const priorityCats=[
    {code:'110000',name:'景点'},{code:'050000',name:'美食'},
    {code:'060000',name:'购物'},{code:'080000',name:'文艺'},
    {code:'190000',name:'水系'}
  ];
  const allPois=[];
  try{
    const results=await Promise.all(priorityCats.map(cat=>
      API_THROTTLE.enqueue(()=>chunkPOISearchNearBy(geo.lng,geo.lat,500,cat.code))
    ));
    priorityCats.forEach((cat,ci)=>{
      (results[ci]||[]).forEach(poi=>{
        if(poi.location){
          // 修改: 兼容 AMap v2.0 LngLat 对象 / Compatible with AMap v2.0 LngLat object
          let lng,lat;
          if(typeof poi.location==='string'){[lng,lat]=poi.location.split(',').map(Number);}
          else if(typeof poi.location==='object'){lng=poi.location.lng||poi.location.getLng?.();lat=poi.location.lat||poi.location.getLat?.();}
          if(lng&&lat&&!isNaN(lng)&&!isNaN(lat))allPois.push({name:poi.name,type:cat.name,address:poi.address||'',lat,lng});
        }
      });
    });
  }catch(e){console.warn('Chunk POI load error:',e);}
  POI_CACHE.set(key,{pois:allPois,ts:Date.now()});
  populateChunkBuildings(engine,chunk,allPois);
  // 修改: 基于 POI 密度和水系检测二次修正地形
  // Refine terrain based on POI density and water body detection
  refineChunkTerrain(chunk, allPois);
  chunk.poisLoaded=true;chunk.poisLoading=false;
}
// Convert POIs to buildings within a chunk
// 修改基线 / Base: populateChunkBuildings 之前
// 修改内容 / Changes: 新增 refineChunkTerrain 函数 — POI 密度驱动路网 + 水系 POI 驱动河流
// Added refineChunkTerrain — POI density drives road refinement + water POI drives river placement

function refineChunkTerrain(chunk, pois){
  if(!chunk.ground) return;
  const S = CHUNK_SIZE;

  // 1. 水系 POI → 在对应方向生成河流
  const waterPois = pois.filter(p => p.type === '水系');
  if(waterPois.length > 0){
    const centerGeo = gridToGeo(chunk.cx*S+S/2, chunk.cy*S+S/2);
    waterPois.forEach(wp => {
      // 计算水系 POI 相对于区块中心的方向
      const dlat = wp.lat - centerGeo.lat;
      const dlng = wp.lng - centerGeo.lng;
      // 将经纬度偏移转换为区块内的大致位置
      const localY = Math.floor(S/2 - dlat / GEO.degPerTileY);
      const localX = Math.floor(S/2 + dlng / GEO.degPerTileX);
      // 在该方向生成水域（宽度2-4格）
      const wy = Math.max(2, Math.min(S-4, localY));
      const ww = 2 + Math.floor(Math.random()*3);
      const isHorizontal = Math.abs(dlng) > Math.abs(dlat);
      if(isHorizontal){
        // 横向河流
        for(let x=0;x<S;x++){
          for(let d=0;d<ww;d++){
            const ty = wy + d;
            if(ty>=0 && ty<S) chunk.ground[ty][x]='water';
          }
        }
      } else {
        // 纵向河流
        const wx = Math.max(2, Math.min(S-4, localX));
        for(let y=0;y<S;y++){
          for(let d=0;d<ww;d++){
            const tx = wx + d;
            if(tx>=0 && tx<S) chunk.ground[y][tx]='water';
          }
        }
      }
    });
    console.log(`[Terrain] 区块(${chunk.cx},${chunk.cy}) 检测到${waterPois.length}个水系POI, 已生成河流`);
  }

  // 2. POI 密度 → 加密路网
  const nonWaterPois = pois.filter(p => p.type !== '水系');
  if(nonWaterPois.length > 12){
    // POI 很多的区域：增加一条额外的小路
    const rng = mulberry32(chunk.seed + 55555);
    const pos = 3 + Math.floor(rng() * (S-6));
    const isH = rng() > 0.5;
    if(isH){for(let x=0;x<S;x++){if(chunk.ground[pos][x]==='grass')chunk.ground[pos][x]='road';}}
    else{for(let y=0;y<S;y++){if(chunk.ground[y][pos]==='grass')chunk.ground[y][pos]='road';}}
  } else if(nonWaterPois.length < 3){
    // POI 很少的区域：将部分道路变回绿地（模拟公园）
    const rng = mulberry32(chunk.seed + 66666);
    for(let y=0;y<S;y++){for(let x=0;x<S;x++){
      if(chunk.ground[y][x]==='road' && rng()<0.15){
        chunk.ground[y][x]='grass';
      }
    }}
  }
}

function populateChunkBuildings(engine,chunk,pois){
  const S=CHUNK_SIZE,isGlass=(engine===GX);
  const rng=mulberry32(chunk.seed+12345);
  const occupied=new Set();
  // Mark existing fillers
  chunk.buildings.forEach(b=>{
    for(let dy=0;dy<2;dy++)for(let dx=0;dx<b.w;dx++)occupied.add((b.ly+dy)+','+(b.lx+dx));
  });
  // 修改: 标记玩家位置为已占用，防止异步建筑放置在玩家身上
  // Mark player position as occupied to prevent async buildings from trapping player
  const plx=Math.round(engine.px)-chunk.cx*S, ply=Math.round(engine.py)-chunk.cy*S;
  if(plx>=0&&plx<S&&ply>=0&&ply<S){
    for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){
      const sx=plx+dx,sy=ply+dy;
      if(sx>=0&&sx<S&&sy>=0&&sy<S)occupied.add(sy+','+sx);
    }
  }
  const poiBuildings=[];
  pois.forEach((poi,idx)=>{
    const grid=geoToGrid(poi.lat,poi.lng);
    const lx=Math.round(grid.gx)-chunk.cx*S;
    const ly=Math.round(grid.gy)-chunk.cy*S;
    if(lx<1||lx>=S-3||ly<1||ly>=S-3)return;
    if(isGlass){
      const gc=GLASS_COLORS[poi.type]||GLASS_COLORS['default'];
      const bw=1+Math.floor(rng()*2),bh=20+Math.floor(rng()*50);
      for(let att=0;att<15;att++){
        const ox=lx+(att%5)-2,oy=ly+Math.floor(att/5)-1;
        if(ox<0||oy<0||ox+bw>=S||oy+2>=S)continue;
        let ok=true;
        for(let dy=0;dy<2&&ok;dy++)for(let dx=0;dx<bw&&ok;dx++){
          if(occupied.has((oy+dy)+','+(ox+dx))||chunk.ground[oy+dy][ox+dx]==='water')ok=false;
        }
        if(ok){
          const b={lx:ox,ly:oy,x:chunk.cx*S+ox,y:chunk.cy*S+oy,w:bw,h:bh,gc,
            name:poi.name,type:poi.type,address:poi.address,poiIdx:idx};
          poiBuildings.push(b);
          for(let dy=0;dy<2;dy++)for(let dx=0;dx<bw;dx++)occupied.add((oy+dy)+','+(ox+dx));
          // Connect to nearest road
          connectChunkRoad(chunk,ox,oy);
          break;
        }
      }
    }else{
      const bt=BLDG_TYPES[poi.type]||BLDG_TYPES['default'];
      const bw=bt.w[0]+Math.floor(rng()*(bt.w[1]-bt.w[0]+1));
      const bh=bt.h[0]+Math.floor(rng()*(bt.h[1]-bt.h[0]+1));
      for(let att=0;att<15;att++){
        const ox=lx+(att%5)-2,oy=ly+Math.floor(att/5)-1;
        if(ox<0||oy<0||ox+bw>=S||oy+2>=S)continue;
        let ok=true;
        for(let dy=0;dy<2&&ok;dy++)for(let dx=0;dx<bw&&ok;dx++){
          if(occupied.has((oy+dy)+','+(ox+dx))||chunk.ground[oy+dy][ox+dx]==='water')ok=false;
        }
        if(ok){
          const b={lx:ox,ly:oy,x:chunk.cx*S+ox,y:chunk.cy*S+oy,w:bw,h:bh,
            color:bt.colors[Math.floor(rng()*bt.colors.length)],roofColor:bt.roofColor,
            style:bt.style,icon:bt.icon,name:poi.name,type:poi.type,address:poi.address,poiIdx:idx};
          poiBuildings.push(b);
          for(let dy=0;dy<2;dy++)for(let dx=0;dx<bw;dx++)occupied.add((oy+dy)+','+(ox+dx));
          connectChunkRoad(chunk,ox,oy);
          break;
        }
      }
    }
  });
  // Remove fillers that overlap with new POI buildings, then add POI buildings
  chunk.buildings=[...chunk.buildings.filter(b=>!poiBuildings.some(pb=>Math.abs(pb.lx-b.lx)<4&&Math.abs(pb.ly-b.ly)<4&&!b.name)),...poiBuildings];
  // Generate rewards near POI buildings
  let rId=chunk.cx*10000+chunk.cy*100;
  poiBuildings.forEach((b,bi)=>{
    if(bi%2===0){
      const rt=REWARD_TYPES[rId%REWARD_TYPES.length];
      chunk.rewards.push({id:'c'+rId,x:b.x+b.w+1,y:b.y+1,type:rt,collected:false,
        bobPhase:rng()*Math.PI*2,fadeAlpha:1,respawning:false,respawnTimer:0,isVehiclePickup:false});
      rId++;
    }
  });
}
function connectChunkRoad(chunk,bx,by){
  const S=CHUNK_SIZE;
  // Find nearest road
  let bd=999,brx=-1,bry=-1;
  for(let y=0;y<S;y++)for(let x=0;x<S;x++){
    if(chunk.ground[y][x]==='road'){
      const d=Math.abs(x-bx)+Math.abs(y-by);
      if(d<bd){bd=d;brx=x;bry=y;}
    }
  }
  if(brx<0)return;
  // L-shaped path
  const dx=brx>bx?1:-1;
  for(let x=bx;x!==brx;x+=dx){if(x>=0&&x<S&&by>=0&&by<S&&chunk.ground[by][x]!=='water')chunk.ground[by][x]='road';}
  const dy=bry>by?1:-1;
  for(let y=by;y!==bry;y+=dy){if(brx>=0&&brx<S&&y>=0&&y<S&&chunk.ground[y][brx]!=='water')chunk.ground[y][brx]='road';}
}
// === EXPLORATION TRACKING ===
const EXPLORE_TRACK={visitedChunks:new Set(),totalSteps:0,discoveredPOIs:0,distanceKm:0};
function trackChunkVisit(cx,cy){
  const key=cx+','+cy;
  if(!EXPLORE_TRACK.visitedChunks.has(key)){
    EXPLORE_TRACK.visitedChunks.add(key);
    // Distance achievement milestones
    const count=EXPLORE_TRACK.visitedChunks.size;
    if(count===10)showToast('探索成就: 漫步者 - 探索了10个区域!');
    if(count===25)showToast('探索成就: 行者 - 探索了25个区域!');
    if(count===50)showToast('探索成就: 旅人 - 探索了50个区域!');
    if(count===100)showToast('探索成就: 冒险家 - 探索了100个区域!');
  }
}
function checkStepMilestones(){
  const s=EXPLORE_TRACK.totalSteps;
  if(s===100&&!EXPLORE_TRACK._m100){EXPLORE_TRACK._m100=true;showToast('步行100步! 城市在你脚下');}
  if(s===500&&!EXPLORE_TRACK._m500){EXPLORE_TRACK._m500=true;showToast('步行500步! 真正的漫步者');}
  if(s===1000&&!EXPLORE_TRACK._m1k){EXPLORE_TRACK._m1k=true;showToast('步行1000步! 距离约15公里');}
  if(s===5000&&!EXPLORE_TRACK._m5k){EXPLORE_TRACK._m5k=true;showToast('步行5000步! 城市探索大师');}
}
function getExploreStats(){
  return{chunks:EXPLORE_TRACK.visitedChunks.size,steps:EXPLORE_TRACK.totalSteps,
    distKm:(EXPLORE_TRACK.totalSteps*0.015).toFixed(2)};
}
// Update chunks around player
function updateChunks(engine){
  const mgr=engine.chunkMgr;
  if(!mgr)return;
  mgr.frameCounter=(mgr.frameCounter||0)+1;
  if(mgr.frameCounter%6!==0)return; // check every 6 frames
  const pcx=Math.floor(engine.px/CHUNK_SIZE),pcy=Math.floor(engine.py/CHUNK_SIZE);
  // Track current chunk visit
  trackChunkVisit(pcx,pcy);
  // Load nearby
  for(let dy=-mgr.LOAD_RADIUS;dy<=mgr.LOAD_RADIUS;dy++){
    for(let dx=-mgr.LOAD_RADIUS;dx<=mgr.LOAD_RADIUS;dx++){
      const cx=pcx+dx,cy=pcy+dy,key=cx+','+cy;
      if(!mgr.chunks.has(key)&&!mgr.loading.has(key)){
        mgr.loading.add(key);
        const chunk=createChunk(cx,cy);
        generateChunkTerrain(chunk);
        generateChunkFillers(engine,chunk);
        mgr.chunks.set(key,chunk);
        mgr.loading.delete(key);
        // Async POI loading
        if(typeof AMap!=='undefined'&&!APP.demoMode){
          loadChunkPOIs(engine,chunk);
        }
      }
    }
  }
  // Unload far chunks
  for(const[key,chunk]of mgr.chunks){
    const dist=Math.abs(chunk.cx-pcx)+Math.abs(chunk.cy-pcy);
    if(dist>mgr.UNLOAD_RADIUS){
      mgr.chunks.delete(key);
    }
  }
}
// Reverse geocode for HUD
let _lastGeocodeTm=0,_lastGeocodeLoc='';
function updateLocationHUD(engine){
  const now=Date.now();
  if(now-_lastGeocodeTm<5000)return;
  _lastGeocodeTm=now;
  const geo=gridToGeo(engine.px,engine.py);
  if(typeof AMap==='undefined')return;
  try{
    AMap.plugin('AMap.Geocoder',()=>{
      const gc=new AMap.Geocoder({});
      gc.getAddress([geo.lng,geo.lat],(status,result)=>{
        if(status==='complete'&&result.regeocode){
          _lastGeocodeLoc=result.regeocode.formattedAddress||'';
        }
      });
    });
  }catch(e){}
}
// 修改基线 / Base: initInfiniteMode (commit 3cf6855)
// 修改内容 / Changes: 1)修复PX引用 2)新增城市级水系预查询 3)新增建筑密度基准计算 4)新增跨chunk河流连续性
// Fixed PX ref, added city-level water pre-query, density baseline calc, cross-chunk river continuity

// === 跨 Chunk 河流连续性算法 / Cross-chunk river continuity ===
function generateRiverInChunk(chunk, river) {
  const S = CHUNK_SIZE;
  const chunkStartX = chunk.cx * S;
  const chunkStartY = chunk.cy * S;
  const chunkEndX = chunkStartX + S;
  const chunkEndY = chunkStartY + S;
  
  if (river.direction === 'h') {
    // 横向河流: 检查 river.gridY 是否在当前 chunk 的 Y 范围内
    if (river.gridY >= chunkStartY && river.gridY < chunkEndY) {
      const localY = river.gridY - chunkStartY;
      const rng = mulberry32(chunk.seed + river.gridX * 7 + river.gridY * 13);
      for (let x = 0; x < S; x++) {
        const ww = Math.max(2, river.width + Math.floor(rng() * 3) - 1); // 宽度微波动
        for (let d = -Math.floor(ww/2); d < Math.ceil(ww/2); d++) {
          const ty = localY + d;
          if (ty >= 0 && ty < S) {
            chunk.ground[ty][x] = 'water';
          }
        }
      }
      return true;
    }
  } else {
    // 纵向河流: 检查 river.gridX 是否在当前 chunk 的 X 范围内
    if (river.gridX >= chunkStartX && river.gridX < chunkEndX) {
      const localX = river.gridX - chunkStartX;
      const rng = mulberry32(chunk.seed + river.gridX * 11 + river.gridY * 17);
      for (let y = 0; y < S; y++) {
        const ww = Math.max(2, river.width + Math.floor(rng() * 3) - 1);
        for (let d = -Math.floor(ww/2); d < Math.ceil(ww/2); d++) {
          const tx = localX + d;
          if (tx >= 0 && tx < S) {
            chunk.ground[y][tx] = 'water';
          }
        }
      }
      return true;
    }
  }
  return false;
}

// === 计算 chunk 的建筑密度系数 / Compute chunk building density factor ===
function getChunkDensity(cx, cy) {
  const dist = Math.sqrt(cx * cx + cy * cy);
  // 核心区密度高，越远越稀疏，最低 10%
  return GEO.densityBase * Math.max(0.10, 1.0 - dist * 0.08);
}

// Initialize infinite mode for an engine
async function initInfiniteMode(engineType, cityName) {
  const engine = GX; // 仅支持 GX 引擎 (PX 已移除)
  
  // Geocode city center (with timeout to avoid hanging)
  let originLat = 31.23, originLng = 121.47;
  if (typeof AMap !== 'undefined') {
    try {
      const info = await Promise.race([amapGeocode(cityName), new Promise(r => setTimeout(() => r(null), 3000))]);
      if (info) { originLat = info.lat; originLng = info.lng; }
    } catch(e) {}
  }
  GEO.originLat = originLat;
  GEO.originLng = originLng;
  // Adjust degPerTileX for latitude
  GEO.degPerTileX = 0.000135 / Math.cos(originLat * Math.PI / 180);
  
  // === 城市级水系预查询 / City-level water feature pre-query ===
  GEO.waterFeatures = [];
  if (typeof AMap !== 'undefined') {
    try {
      const waterPois = await Promise.race([
        chunkPOISearchNearBy(originLng, originLat, 3000, '190000'), // 3km 范围查水系
        new Promise(r => setTimeout(() => r([]), 4000))
      ]);
      
      if (waterPois && waterPois.length > 0) {
        waterPois.forEach(wp => {
          let wlng, wlat;
          if (typeof wp.location === 'string') { [wlng, wlat] = wp.location.split(',').map(Number); }
          else if (typeof wp.location === 'object') { wlng = wp.location.lng || wp.location.getLng?.(); wlat = wp.location.lat || wp.location.getLat?.(); }
          
          if (wlng && wlat && !isNaN(wlng) && !isNaN(wlat)) {
            const grid = geoToGrid(wlat, wlng);
            const gx = Math.round(grid.gx);
            const gy = Math.round(grid.gy);
            // 根据水系名称推断方向: 含"江""河"多为横向，含"湖""海"为区域
            const name = wp.name || '';
            const isHorizontal = /[江河溪creek river]/.test(name) ? Math.abs(wlng - originLng) > Math.abs(wlat - originLat) : Math.random() > 0.5;
            const width = 3 + Math.floor(Math.random() * 4); // 3-6 格宽
            
            GEO.waterFeatures.push({
              gridX: gx, gridY: gy,
              direction: isHorizontal ? 'h' : 'v',
              width: width,
              name: name
            });
          }
        });
        console.log(`[Terrain] 城市 ${cityName} 检测到 ${GEO.waterFeatures.length} 个水系特征:`, GEO.waterFeatures.map(w => w.name).join(', '));
      }
    } catch(e) { console.warn('Water feature query failed:', e); }
  }
  
  // === 建筑密度基准计算 / Density baseline from initial POI count ===
  if (typeof AMap !== 'undefined') {
    try {
      const densityPois = await Promise.race([
        chunkPOISearchNearBy(originLng, originLat, 500, ''), // 500m 全类型
        new Promise(r => setTimeout(() => r([]), 3000))
      ]);
      const poiCount = densityPois ? densityPois.length : 0;
      // POI 越多 → 核心密度越高 (0.15 ~ 0.35)
      GEO.densityBase = Math.min(0.35, Math.max(0.15, 0.12 + poiCount * 0.005));
      console.log(`[Terrain] 核心区 POI 密度基准: ${GEO.densityBase.toFixed(3)} (基于 ${poiCount} 个 POI)`);
    } catch(e) { GEO.densityBase = 0.22; }
  }
  
  // Set up engine
  engine.infiniteMode = true;
  engine.chunkMgr = createChunkManager();
  engine.px = 0; engine.py = 0;
  engine.camX = 0; engine.camY = 0;
  engine.steps = 0; engine.score = 0;
  engine.rewards = []; engine.collectedRewards = {}; engine.vehiclePickups = [];
  engine.buildings = []; engine.trees = []; engine.pois = [];
  engine.routePath = []; engine._geoBounds = null;
  
  // Generate initial chunks (3x3 around origin)
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const cx = dx, cy = dy, key = cx + ',' + cy;
      const chunk = createChunk(cx, cy);
      generateChunkTerrain(chunk);
      generateChunkFillers(engine, chunk);
      engine.chunkMgr.chunks.set(key, chunk);
      if (typeof AMap !== 'undefined' && !APP.demoMode) loadChunkPOIs(engine, chunk);
    }
  }
  
  // Place player on nearest road to (0,0)
  for (let r = 0; r < 20; r++) {
    for (let dx = -r; dx <= r; dx++) {
      for (let dy = -r; dy <= r; dy++) {
        if (getGround(engine, dx, dy) === 'road') {
          engine.px = dx; engine.py = dy; engine.camX = dx; engine.camY = dy;
          return;
        }
      }
    }
  }
}

// === PIXEL CITY ENGINE === (已移除 / REMOVED)
// 修改基线 / Base: index.html v0.4.3 (commit a24200b)
// 修改内容 / Changes: 完全移除像素漫游引擎代码约845行
// Completely removed Pixel City engine code (~845 lines)


// Utility: deterministic RNG
function mulberry32(a) {
  return function() {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function lightenColor(hex, amt) {
  if(!hex)return '#888888';
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  let r = parseInt(hex.substring(0,2),16);
  let g = parseInt(hex.substring(2,4),16);
  let b = parseInt(hex.substring(4,6),16);
  r = Math.min(255, r + amt); g = Math.min(255, g + amt); b = Math.min(255, b + amt);
  return '#' + ((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);
}

// === 3D GLASS CITY ENGINE ===
const GX = {
  canvas:null,ctx:null,miniC:null,miniCtx:null,
  running:false,animFrame:null,
  worldW:60,worldH:60,
  buildings:[],ground:null,particles:[],
  rewards:[],routePath:[],collectedRewards:{},score:0,
  vehiclePickups:[],
  infiniteMode:false,chunkMgr:null,ghostMode:false,
  camX:30,camY:30,zoom:1.8,targetZoom:1.8,
  px:30,py:30,pDir:0,pMoving:false,steps:0,speed:0.05,
  baseSpeed:0.05,vehicle:'walk',boosting:false,boostEnergy:100,boostMax:100,boostDrain:0.8,boostRegen:0.3,
  moveX:0,moveY:0,keys:{},
  pois:[],cityName:'',time:0,
  vpY:0.35,fov:600,tiltAngle:0.55,
};

const GLASS_COLORS = {
  '景点':{base:'#a03030',baseL:'#c84848',baseD:'#6e1e1e',glow:'#ff5a5a',edge:'rgba(200,100,100,.4)',accent:'#d44',sheen:'rgba(255,180,170,.35)'},
  '美食':{base:'#a07028',baseL:'#c89040',baseD:'#704a10',glow:'#ffb43c',edge:'rgba(200,160,80,.4)',accent:'#da4',sheen:'rgba(255,220,170,.3)'},
  '购物':{base:'#28507a',baseL:'#3870a8',baseD:'#183050',glow:'#3ca0ff',edge:'rgba(80,140,200,.4)',accent:'#5af',sheen:'rgba(170,210,255,.3)'},
  '文艺':{base:'#5a3080',baseL:'#7848a8',baseD:'#3a1858',glow:'#b464ff',edge:'rgba(160,100,220,.4)',accent:'#a5f',sheen:'rgba(210,180,255,.3)'},
  '网红':{base:'#903060',baseL:'#b84880',baseD:'#601840',glow:'#ff64b4',edge:'rgba(220,100,160,.4)',accent:'#f6b',sheen:'rgba(255,180,220,.3)'},
  '住宅办公':{base:'#3a5570',baseL:'#4a7090',baseD:'#2a3a50',glow:'#6a9ac0',edge:'rgba(100,140,180,.4)',accent:'#7ac',sheen:'rgba(170,200,230,.28)'},
  '交通设施':{base:'#505060',baseL:'#686878',baseD:'#383848',glow:'#9090a8',edge:'rgba(130,130,150,.35)',accent:'#99a',sheen:'rgba(190,190,210,.25)'},
  '生活服务':{base:'#1a7a68',baseL:'#28a088',baseD:'#105848',glow:'#40c8a8',edge:'rgba(60,180,150,.4)',accent:'#4ca',sheen:'rgba(150,230,210,.3)'},
  '体育休闲':{base:'#2a7a3a',baseL:'#38a048',baseD:'#185828',glow:'#50c860',edge:'rgba(70,180,90,.4)',accent:'#5c6',sheen:'rgba(160,230,170,.28)'},
  '医疗保健':{base:'#808898',baseL:'#a0a8b8',baseD:'#606878',glow:'#c0c8d8',edge:'rgba(170,178,200,.4)',accent:'#bcd',sheen:'rgba(220,225,240,.35)'},
  '科教文化':{base:'#2a3448',baseL:'#3a4a68',baseD:'#1a2430',glow:'#5a7098',edge:'rgba(80,100,140,.35)',accent:'#68a',sheen:'rgba(160,180,210,.28)'},
  'default':{base:'#3a4550',baseL:'#506070',baseD:'#252e35',glow:'#8ca0b4',edge:'rgba(120,140,160,.35)',accent:'#8ab',sheen:'rgba(180,200,220,.25)'},
};

// 修改基线 / Base: 新增代码
// 修改内容 / Changes: 新增城市特征分析系统和城市专属色板
// Added city profile analysis system and city-specific palettes

// === 城市特征分析系统 / City Profile Analysis ===
const CITY_PROFILES = {
  modern:  { label:'现代都市', heightBase:35, heightVar:55, density:0.45, fillerDensity:0.4, waterRatio:0.05,
             skyTop:'#020818', skyMid:'#0a1030', skyBot:'#101840',
             roadColor:'rgba(40,45,55,.9)', groundColor:'rgba(20,25,35,.6)', particleType:'neon',
             accentGlow:'#3ca0ff'},
  historic:{ label:'历史古城', heightBase:12, heightVar:20, density:0.35, fillerDensity:0.3, waterRatio:0.03,
             skyTop:'#0a0810', skyMid:'#1a1020', skyBot:'#201828',
             roadColor:'rgba(60,45,35,.8)', groundColor:'rgba(35,28,22,.6)', particleType:'lantern',
             accentGlow:'#ff9844'},
  cultural:{ label:'文艺之城', heightBase:18, heightVar:30, density:0.32, fillerDensity:0.25, waterRatio:0.08,
             skyTop:'#080818', skyMid:'#101028', skyBot:'#181838',
             roadColor:'rgba(35,40,50,.85)', groundColor:'rgba(25,28,35,.55)', particleType:'sakura',
             accentGlow:'#b464ff'},
  coastal: { label:'滨海城市', heightBase:22, heightVar:35, density:0.35, fillerDensity:0.3, waterRatio:0.25,
             skyTop:'#041828', skyMid:'#0a2840', skyBot:'#103858',
             roadColor:'rgba(30,42,55,.85)', groundColor:'rgba(18,28,38,.55)', particleType:'seagull',
             accentGlow:'#40e0d0'},
  nature:  { label:'自然风光', heightBase:10, heightVar:15, density:0.2, fillerDensity:0.15, waterRatio:0.12,
             skyTop:'#040a10', skyMid:'#081820', skyBot:'#0c2830',
             roadColor:'rgba(30,45,30,.7)', groundColor:'rgba(15,25,15,.5)', particleType:'firefly',
             accentGlow:'#50c860'},
};

// 已知城市映射 (可用 POI 分析结果覆盖)
const KNOWN_CITY_TYPES = {
  '上海':'modern','北京':'modern','深圳':'modern','广州':'modern','重庆':'modern','成都':'modern','武汉':'modern',
  '西安':'historic','南京':'historic','洛阳':'historic','开封':'historic','敦煌':'historic',
  '杭州':'cultural','苏州':'cultural','丽江':'cultural','大理':'cultural','凤凰':'cultural','景德镇':'cultural',
  '青岛':'coastal','厦门':'coastal','三亚':'coastal','大连':'coastal','珠海':'coastal','烟台':'coastal','海口':'coastal','秦皇岛':'coastal','威海':'coastal','北海':'coastal',
  '桂林':'nature','张家界':'nature','九寨沟':'nature','黄山':'nature','昆明':'nature',
};

function analyzeCityProfile(pois, cityName) {
  // 如果有已知映射，优先使用
  const knownType = KNOWN_CITY_TYPES[cityName];

  // 统计 POI 类型分布
  const typeCounts = {};
  pois.forEach(p => { typeCounts[p.type] = (typeCounts[p.type]||0) + 1; });
  const total = pois.length || 1;

  // 计算各类占比
  const scenicRatio = ((typeCounts['景点']||0) + (typeCounts['体育休闲']||0)) / total;
  const foodShopRatio = ((typeCounts['美食']||0) + (typeCounts['购物']||0) + (typeCounts['网红']||0)) / total;
  const cultureRatio = ((typeCounts['文艺']||0) + (typeCounts['科教文化']||0)) / total;
  const businessRatio = ((typeCounts['住宅办公']||0) + (typeCounts['交通设施']||0)) / total;

  // 通过 POI 分布推断城市类型
  let inferredType = 'modern';
  if (scenicRatio > 0.4) inferredType = 'nature';
  else if (cultureRatio > 0.3) inferredType = 'cultural';
  else if (businessRatio > 0.4 || foodShopRatio > 0.4) inferredType = 'modern';
  else if (scenicRatio > 0.25 && cultureRatio > 0.15) inferredType = 'historic';

  const profileType = knownType || inferredType;
  const profile = { ...CITY_PROFILES[profileType] };
  profile.type = profileType;
  profile.poiCounts = typeCounts;
  profile.totalPois = total;

  // 根据 POI 数量动态调整密度
    const tx=x+dx,ty=y+dy;
    if(tx<0||tx>=GX.worldW||ty<0||ty>=GX.worldH)return false;
    if(GX.ground[ty][tx]==='road'||GX.ground[ty][tx]==='water')return false;
    if(occ.has(ty+','+tx))return false;
  }
  return true;
}

// --- 3D Projection ---
function glassProject(gx,gy,gz){
  // Isometric base + perspective depth
  const tw=28,th=14;
  const isoX=(gx-gy)*(tw/2);
  const isoY=(gx+gy)*(th/2);
  // Apply vertical offset for height
  const screenY=isoY-gz;
  // Depth-based scaling for perspective feel
  const depth=isoY+400;
  const scale=GX.fov/(GX.fov+depth*0.15);
  return {sx:isoX*scale,sy:screenY*scale,scale:scale};
}

// --- Main Render ---
function glassRender(){
  const ctx=GX.ctx,cw=GX.canvas.width,ch=GX.canvas.height;
  GX.time+=0.016;
  ctx.clearRect(0,0,cw,ch);

  // 修改基线 / Base: glassRender() 天空渲染 (天气+城市profile)  
  // 修改内容 / Changes: 天空默认使用城市profile色板，天气仍然覆盖
  // Sky defaults from city profile palette, weather still overrides

  const w = APP.currentWeather || {};
  const weather = w.weather || '';
  const prof = GX.cityProfile || CITY_PROFILES['modern'];
  const skyG=ctx.createLinearGradient(0,0,0,ch);

  if (weather.includes('雨') || weather.includes('阵雨')) {
    skyG.addColorStop(0,'#1a1a2e'); skyG.addColorStop(0.3,'#2d3436');
    skyG.addColorStop(0.6,'#363b3f'); skyG.addColorStop(1,'#2c3e50');
  } else if (weather.includes('雪')) {
    skyG.addColorStop(0,'#dfe6e9'); skyG.addColorStop(0.3,'#b2bec3');
    skyG.addColorStop(0.6,'#636e72'); skyG.addColorStop(1,'#2d3436');
  } else if (weather.includes('雾') || weather.includes('霾')) {
    skyG.addColorStop(0,'#636e72'); skyG.addColorStop(0.3,'#b2bec3');
    skyG.addColorStop(0.6,'#dfe6e9'); skyG.addColorStop(1,'#b2bec3');
  } else {
    // 使用城市 profile 色板 / Use city profile palette
    skyG.addColorStop(0, prof.skyTop);
    skyG.addColorStop(0.4, prof.skyMid);
    skyG.addColorStop(1, prof.skyBot);
  }
  ctx.fillStyle=skyG;
  ctx.fillRect(0,0,cw,ch);

  // Weather particles (rain/snow)
  if (!GX.weatherParticles) GX.weatherParticles = [];
  if (weather.includes('雨')) {
    // 生成雨滴 / Rain drops
    while (GX.weatherParticles.length < 120) {
      GX.weatherParticles.push({ x: Math.random()*cw, y: Math.random()*ch, speed: 4+Math.random()*6, len: 8+Math.random()*12 });
    }
    ctx.strokeStyle = 'rgba(174,214,241,.35)';
    ctx.lineWidth = 1;
    for (const p of GX.weatherParticles) {
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x-1, p.y+p.len); ctx.stroke();
      p.y += p.speed; p.x -= 0.5;
      if (p.y > ch) { p.y = -p.len; p.x = Math.random()*cw; }
    }
  } else if (weather.includes('雪')) {
    // 生成雪花 / Snowflakes
    while (GX.weatherParticles.length < 80) {
      GX.weatherParticles.push({ x: Math.random()*cw, y: Math.random()*ch, speed: 0.5+Math.random()*1.5, r: 1+Math.random()*3, drift: Math.random()*2-1 });
    }
    ctx.fillStyle = 'rgba(255,255,255,.6)';
    for (const p of GX.weatherParticles) {
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
      p.y += p.speed; p.x += Math.sin(GX.time*2+p.drift)*0.5;
      if (p.y > ch) { p.y = -5; p.x = Math.random()*cw; }
    }
  } else if (weather.includes('雾') || weather.includes('霾')) {
    // 雾气效果 / Fog effect
    ctx.globalAlpha = 0.15;
    for (let i = 0; i < 5; i++) {
      const fy = ch*0.3 + i*40 + Math.sin(GX.time*0.2+i)*20;
      ctx.fillStyle = 'rgba(200,200,200,.3)';
      ctx.fillRect(0, fy, cw, 60);
    }
    ctx.globalAlpha = 1;
  }

  // Aurora bands (only when clear/night) - 使用 profile accentGlow
  if (!weather.includes('雨') && !weather.includes('雪') && !weather.includes('雾')) {
    ctx.globalAlpha=0.06;
    for(let i=0;i<3;i++){
      const ay=ch*0.1+i*40+Math.sin(GX.time*0.3+i)*15;
      const ag=ctx.createLinearGradient(0,ay,cw,ay+60);
      ag.addColorStop(0,'transparent');
      ag.addColorStop(0.3,i===0?prof.accentGlow:i===1?'#b464ff':'#00e0a0');
      ag.addColorStop(0.7,i===0?prof.accentGlow+'cc':i===1?'#c78cff':'#40ffc0');
      ag.addColorStop(1,'transparent');
      ctx.fillStyle=ag;
      ctx.fillRect(0,ay,cw,50);
    }
    ctx.globalAlpha=1;
  }

  // === 城市特色粒子 / City-specific Ambient Particles ===
  if (!GX._cityParticles) GX._cityParticles = [];
  if (prof.particleType === 'neon' && !weather.includes('雨') && !weather.includes('雪')) {
    // 霓虹光点 / Neon dots (modern cities)
    while (GX._cityParticles.length < 25) GX._cityParticles.push({x:Math.random()*cw,y:ch*0.35+Math.random()*ch*0.6,vx:(Math.random()-0.5)*0.3,vy:-0.1-Math.random()*0.3,r:1+Math.random()*2,hue:Math.random()*360});
    for (const p of GX._cityParticles) {
      ctx.globalAlpha=0.3+Math.sin(GX.time*3+p.hue)*0.2;
      ctx.fillStyle=`hsl(${p.hue},80%,60%)`;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
      p.x+=p.vx;p.y+=p.vy;if(p.y<ch*0.3||p.x<0||p.x>cw){p.x=Math.random()*cw;p.y=ch*0.9+Math.random()*ch*0.1;}
    }
    ctx.globalAlpha=1;
  } else if (prof.particleType === 'lantern' && !weather.includes('雨')) {
    // 灯笼 / Lanterns (historic cities)
    while (GX._cityParticles.length < 12) GX._cityParticles.push({x:Math.random()*cw,y:ch*0.5+Math.random()*ch*0.4,vx:(Math.random()-0.5)*0.2,vy:-0.2-Math.random()*0.3,r:3+Math.random()*3,phase:Math.random()*Math.PI*2});
    for (const p of GX._cityParticles) {
      const glow=0.4+Math.sin(GX.time*2+p.phase)*0.2;
      ctx.globalAlpha=glow;
      ctx.fillStyle='#ff4500';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#ff8c00';ctx.beginPath();ctx.arc(p.x,p.y,p.r*0.6,0,Math.PI*2);ctx.fill();
      p.x+=p.vx+Math.sin(GX.time+p.phase)*0.15;p.y+=p.vy;
      if(p.y<ch*0.1){p.y=ch*0.9;p.x=Math.random()*cw;}
    }
    ctx.globalAlpha=1;
  } else if (prof.particleType === 'sakura') {
    // 樱花 / Cherry blossoms (cultural cities)
    while (GX._cityParticles.length < 30) GX._cityParticles.push({x:Math.random()*cw,y:-10-Math.random()*ch*0.3,vx:0.3+Math.random()*0.5,vy:0.5+Math.random()*1,r:2+Math.random()*3,rot:Math.random()*Math.PI*2});
    for (const p of GX._cityParticles) {
      ctx.globalAlpha=0.5;
      ctx.fillStyle=Math.random()>0.5?'#ffb7c5':'#ff91a4';
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);
      ctx.beginPath();ctx.ellipse(0,0,p.r,p.r*0.6,0,0,Math.PI*2);ctx.fill();
      ctx.restore();
      p.x+=p.vx+Math.sin(GX.time+p.rot)*0.3;p.y+=p.vy;p.rot+=0.02;
      if(p.y>ch+10||p.x>cw+10){p.x=-10;p.y=-10-Math.random()*50;}
    }
    ctx.globalAlpha=1;
  } else if (prof.particleType === 'seagull') {
    // 海鸥 / Seagulls (coastal cities)
    while (GX._cityParticles.length < 8) GX._cityParticles.push({x:Math.random()*cw,y:ch*0.1+Math.random()*ch*0.2,vx:1+Math.random()*1.5,vy:Math.sin(Math.random()*Math.PI)*0.3,wingPhase:Math.random()*Math.PI*2});
    ctx.strokeStyle='rgba(255,255,255,.5)';ctx.lineWidth=1.5;
    for (const p of GX._cityParticles) {
      const wing=Math.sin(GX.time*4+p.wingPhase)*5;
      ctx.beginPath();ctx.moveTo(p.x-8,p.y+wing);ctx.quadraticCurveTo(p.x,p.y-3,p.x+8,p.y+wing);ctx.stroke();
      p.x+=p.vx;p.y+=Math.sin(GX.time*0.5+p.wingPhase)*0.4;
      if(p.x>cw+20){p.x=-20;p.y=ch*0.08+Math.random()*ch*0.15;}
    }
  } else if (prof.particleType === 'firefly' && !weather.includes('雨')) {
    // 萤火虫 / Fireflies (nature cities)
    while (GX._cityParticles.length < 20) GX._cityParticles.push({x:Math.random()*cw,y:ch*0.4+Math.random()*ch*0.5,vx:(Math.random()-0.5)*0.5,vy:(Math.random()-0.5)*0.5,phase:Math.random()*Math.PI*2});
    for (const p of GX._cityParticles) {
      const glow=Math.max(0,Math.sin(GX.time*1.5+p.phase));
      ctx.globalAlpha=glow*0.7;
      ctx.fillStyle='#aaff44';ctx.beginPath();ctx.arc(p.x,p.y,2,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='rgba(170,255,68,.15)';ctx.beginPath();ctx.arc(p.x,p.y,6,0,Math.PI*2);ctx.fill();
      p.x+=p.vx+Math.sin(GX.time+p.phase)*0.3;p.y+=p.vy+Math.cos(GX.time*0.7+p.phase)*0.3;
      if(p.x<0||p.x>cw)p.vx*=-1;if(p.y<ch*0.3||p.y>ch)p.vy*=-1;
    }
    ctx.globalAlpha=1;
  }

  // Stars (dimmed in bad weather)
  const starAlpha = weather.includes('雨') || weather.includes('雪') || weather.includes('雾') ? 0.03 : 0.25;
  const rng=mulberry32(77);
  ctx.fillStyle=`rgba(255,255,255,${starAlpha})`;
  for(let i=0;i<80;i++){
    const blink=Math.sin(GX.time*2+i*0.7)*0.5+0.5;
    ctx.globalAlpha=0.1+blink*0.2;
    ctx.fillRect(rng()*cw,rng()*ch*0.4,1,1);
  }
  ctx.globalAlpha=1;

  // Far city silhouette - profile-driven heights
  const silH = prof.type==='modern'?60:prof.type==='historic'?25:prof.type==='nature'?15:40;
  ctx.fillStyle = prof.type==='coastal'?'rgba(15,30,50,.8)':prof.type==='historic'?'rgba(35,25,20,.75)':'rgba(20,25,40,.8)';
  for(let i=0;i<30;i++){
    const sx=i*(cw/30),bh=5+rng()*silH,bw=cw/30-2;
    ctx.fillRect(sx,ch*0.38-bh,bw,bh);
  }
  // Horizon glow - profile accent
  const hg=ctx.createLinearGradient(0,ch*0.35,0,ch*0.42);
  hg.addColorStop(0, prof.accentGlow + '10');
  hg.addColorStop(1,'transparent');
  ctx.fillStyle=hg;
  ctx.fillRect(0,ch*0.35,cw,ch*0.07);

  // Camera
  const camIso=glassProject(GX.camX,GX.camY,0);
  const offX=cw/2-camIso.sx*GX.zoom;
  const offY=ch*0.6-camIso.sy*GX.zoom;
  ctx.save();
  ctx.translate(offX,offY);
  ctx.scale(GX.zoom,GX.zoom);

  const vr=Math.ceil(22/GX.zoom);
  const sX=GX.infiniteMode?Math.floor(GX.camX-vr):Math.max(0,Math.floor(GX.camX-vr)),eX=GX.infiniteMode?Math.ceil(GX.camX+vr):Math.min(GX.worldW-1,Math.ceil(GX.camX+vr));
  const sY=GX.infiniteMode?Math.floor(GX.camY-vr):Math.max(0,Math.floor(GX.camY-vr)),eY=GX.infiniteMode?Math.ceil(GX.camY+vr):Math.min(GX.worldH-1,Math.ceil(GX.camY+vr));

  // Ground
  const tw=28,th=14;
  for(let y=sY;y<=eY;y++){for(let x=sX;x<=eX;x++){
    const p=glassProject(x,y,0);
    const tile=getGround(GX,x,y);
    ctx.beginPath();
    ctx.moveTo(p.sx,p.sy-th/2);ctx.lineTo(p.sx+tw/2,p.sy);ctx.lineTo(p.sx,p.sy+th/2);ctx.lineTo(p.sx-tw/2,p.sy);ctx.closePath();
    if(tile==='road'){
      ctx.fillStyle=prof.roadColor;ctx.fill();
      ctx.strokeStyle='rgba(60,80,120,.15)';ctx.lineWidth=0.3;ctx.stroke();
    }else if(tile==='water'){
      const wc = prof.type==='coastal'?[20,100,160]:[30,80,140];
      const wAlpha=0.5+Math.sin(GX.time*2+x*0.5+y*0.3)*0.15;
      ctx.fillStyle=`rgba(${wc[0]},${wc[1]},${wc[2]},${wAlpha})`;ctx.fill();
    }else{
      ctx.fillStyle=prof.groundColor;ctx.fill();
      if((x+y)%4===0){ctx.fillStyle='rgba(20,40,25,.3)';ctx.fill();}
    }
  }}

  // Route path glow on ground
  const routeSet=new Set(GX.routePath.map(rp=>rp.x+','+rp.y));
  for(let y=sY;y<=eY;y++){for(let x=sX;x<=eX;x++){
    if(!routeSet.has(x+','+y))continue;
    const p=glassProject(x,y,0);
    const pulse=0.25+Math.sin(GX.time*3+x*0.4+y*0.3)*0.12;
    ctx.beginPath();
    ctx.moveTo(p.sx,p.sy-th/2);ctx.lineTo(p.sx+tw/2,p.sy);ctx.lineTo(p.sx,p.sy+th/2);ctx.lineTo(p.sx-tw/2,p.sy);ctx.closePath();
    ctx.fillStyle=`rgba(255,200,80,${pulse})`;ctx.fill();
    ctx.strokeStyle=`rgba(255,180,50,${pulse*0.6})`;ctx.lineWidth=0.5;ctx.stroke();
  }}

  // Road reflections (subtle)
  const gxVisBlds=GX.infiniteMode?getVisibleBuildings(GX):GX.buildings;
  ctx.globalAlpha=0.03;
  gxVisBlds.forEach(b=>{
    if(!b.gc)return;
    if(b.h>25){
      const p=glassProject(b.x,b.y+2,0);
      const rg=ctx.createRadialGradient(p.sx,p.sy,0,p.sx,p.sy,30);
      rg.addColorStop(0,b.gc.glow);rg.addColorStop(1,'transparent');
      ctx.fillStyle=rg;ctx.fillRect(p.sx-30,p.sy-15,60,30);
    }
  });
  ctx.globalAlpha=1;

  // Depth-sort drawables
  const drawables=[];
  gxVisBlds.forEach(b=>{
    if(b.x+b.w>=sX&&b.x<=eX&&b.y+2>=sY&&b.y<=eY)
      drawables.push({type:'b',obj:b,sortKey:b.y+b.x*0.5});
  });
  const gxVisRew=GX.infiniteMode?getVisibleRewards(GX):GX.rewards;
  gxVisRew.forEach(r=>{
    if(!r.collected&&r.x>=sX&&r.x<=eX&&r.y>=sY&&r.y<=eY)
      drawables.push({type:'r',obj:r,sortKey:r.y+r.x*0.5});
  });
  drawables.push({type:'p',sortKey:GX.py+GX.px*0.5});
  drawables.sort((a,b)=>a.sortKey-b.sortKey);

  drawables.forEach(d=>{
    if(d.type==='b')drawGlassBuilding(ctx,d.obj);
    else if(d.type==='r')drawGlassReward(ctx,d.obj);
    else drawGlassPlayer(ctx);
  });

  // Floating particles
  ctx.globalAlpha=1;
  GX.particles.forEach(pt=>{
    pt.z+=pt.speed*0.3;
    pt.x+=Math.sin(GX.time+pt.y)*0.005;
    if(pt.z>100){pt.z=10;pt.x=Math.random()*GX.worldW;pt.y=Math.random()*GX.worldH;}
    const pp=glassProject(pt.x,pt.y,pt.z);
    if(pp.sx>-500&&pp.sx<500&&pp.sy>-500&&pp.sy<500){
      ctx.globalAlpha=pt.alpha*Math.sin(pt.z/100*Math.PI);
      ctx.fillStyle='#fff';
      ctx.beginPath();ctx.arc(pp.sx,pp.sy,pt.size*pp.scale,0,Math.PI*2);ctx.fill();
    }
  });
  ctx.globalAlpha=1;

  ctx.restore();

  // HUD
  if(GX.infiniteMode){
    const geo2=gridToGeo(GX.px,GX.py);
    document.getElementById('gHudCoord').textContent=(_lastGeocodeLoc||geo2.lat.toFixed(4)+', '+geo2.lng.toFixed(4));
    document.getElementById('gHudBuildings').textContent=gxVisBlds.length+' 建筑';
    updateLocationHUD(GX);
  }else{
    document.getElementById('gHudCoord').textContent=Math.round(GX.px)+', '+Math.round(GX.py);
    document.getElementById('gHudBuildings').textContent=GX.buildings.filter(b=>b.name).length+' 建筑';
  }
  document.getElementById('gHudSteps').textContent=GX.steps+' 步';
  document.getElementById('gHudScore').textContent=GX.score+' 分';
  const coll=gxVisRew.filter(r=>r.collected).length;
  document.getElementById('gHudRewards').textContent=coll+'/'+gxVisRew.length;

  renderGlassMinimap();
}

function drawGlassReward(ctx,r){
  if(r.collected) return;
  if(!r.type) r.type=REWARD_TYPES[0];
  ctx.save();
  ctx.globalAlpha = r.fadeAlpha !== undefined ? r.fadeAlpha : 1;
  const bobH=3+Math.sin(GX.time*4+r.bobPhase)*2;
  const p=glassProject(r.x,r.y,bobH);
  const sz=(r.isVehiclePickup ? 12 : 8)*p.scale;
  // Glow disc on ground
  const pg=glassProject(r.x,r.y,0);
  ctx.globalAlpha=0.25+Math.sin(GX.time*3+r.bobPhase)*0.1;
  const grd=ctx.createRadialGradient(pg.sx,pg.sy,0,pg.sx,pg.sy,sz*1.5);
  grd.addColorStop(0,r.type.color);grd.addColorStop(1,'transparent');
  ctx.fillStyle=grd;ctx.fillRect(pg.sx-sz*1.5,pg.sy-sz,sz*3,sz*2);
  ctx.globalAlpha=1;
  // Floating orb
  const orbG=ctx.createRadialGradient(p.sx-sz*0.2,p.sy-sz*0.3,sz*0.1,p.sx,p.sy,sz);
  orbG.addColorStop(0,'rgba(255,255,255,.9)');orbG.addColorStop(0.3,r.type.color);orbG.addColorStop(1,'rgba(0,0,0,.2)');
  ctx.beginPath();ctx.arc(p.sx,p.sy,sz,0,Math.PI*2);
  ctx.fillStyle=orbG;ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.4)';ctx.lineWidth=0.5;ctx.stroke();
  // Icon
  ctx.font=`${Math.round(sz*1.2)}px serif`;ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(r.type.icon,p.sx,p.sy);
  // Points label
  ctx.font=`bold ${Math.max(6,Math.round(sz*0.6))}px sans-serif`;
  ctx.fillStyle='#fff';ctx.strokeStyle='rgba(0,0,0,.5)';ctx.lineWidth=2;
  ctx.strokeText('+'+r.type.points,p.sx,p.sy-sz-3);
  ctx.fillText('+'+r.type.points,p.sx,p.sy-sz-3);
  ctx.textAlign='start';
  // Vehicle pickup special border
  if(r.isVehiclePickup){
    const v=VEHICLES[r.vehicleKey];
    const rCol=RARITY_COLORS[v?v.rarity:'common']||'#4ade80';
    ctx.strokeStyle=rCol;ctx.lineWidth=2;
    const rot=GX.time*2;
    ctx.save();ctx.translate(p.sx,p.sy);ctx.rotate(rot);
    ctx.strokeRect(-sz-3,-sz-3,(sz+3)*2,(sz+3)*2);
    ctx.restore();
    ctx.font='bold 8px sans-serif';ctx.fillStyle=rCol;ctx.textAlign='center';
    ctx.fillText('NEW',p.sx,p.sy-sz-10);
    ctx.textAlign='start';
  }
  ctx.restore();
}

function drawGlassBuilding(ctx,b){
  const gc=b.gc||{base:'#3a5570',baseL:'#4a7090',baseD:'#2a3a50',glow:'#6a9ac0',edge:'rgba(100,140,180,.4)',accent:'#7ac',sheen:'rgba(170,200,230,.28)'};
  const p0=glassProject(b.x,b.y,0);
  const pTop=glassProject(b.x,b.y,b.h);
  const tw=28,hw=tw/2*b.w;
  const height=p0.sy-pTop.sy;

  // LEFT FACE — silk matte gradient (dark to base)
  ctx.beginPath();
  ctx.moveTo(p0.sx-hw,p0.sy);
  ctx.lineTo(p0.sx-hw,p0.sy-height);
  ctx.lineTo(p0.sx,p0.sy-height+7*b.w);
  ctx.lineTo(p0.sx,p0.sy+7*b.w);
  ctx.closePath();
  const lg=ctx.createLinearGradient(p0.sx-hw,p0.sy-height,p0.sx-hw,p0.sy);
  lg.addColorStop(0,gc.baseL);lg.addColorStop(0.4,gc.base);lg.addColorStop(1,gc.baseD);
  ctx.fillStyle=lg;ctx.fill();
  ctx.strokeStyle=gc.edge;ctx.lineWidth=0.6;ctx.stroke();

  // LEFT ceramic sheen — subtle top highlight band
  ctx.globalAlpha=0.5;
  const shG=ctx.createLinearGradient(p0.sx-hw,p0.sy-height,p0.sx-hw,p0.sy-height+height*0.3);
  shG.addColorStop(0,gc.sheen);shG.addColorStop(1,'transparent');
  ctx.fillStyle=shG;
  ctx.beginPath();
  ctx.moveTo(p0.sx-hw,p0.sy-height);
  ctx.lineTo(p0.sx-hw,p0.sy-height+height*0.25);
  ctx.lineTo(p0.sx,p0.sy-height+7*b.w+height*0.25);
  ctx.lineTo(p0.sx,p0.sy-height+7*b.w);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha=1;

  // RIGHT FACE — lighter silk tone
  ctx.beginPath();
  ctx.moveTo(p0.sx,p0.sy+7*b.w);
  ctx.lineTo(p0.sx,p0.sy-height+7*b.w);
  ctx.lineTo(p0.sx+hw,p0.sy-height);
  ctx.lineTo(p0.sx+hw,p0.sy);
  ctx.closePath();
  const rg=ctx.createLinearGradient(p0.sx,p0.sy-height,p0.sx,p0.sy);
  rg.addColorStop(0,gc.baseL);rg.addColorStop(0.5,gc.base);rg.addColorStop(1,gc.baseD);
  ctx.fillStyle=rg;ctx.fill();
  ctx.strokeStyle=gc.edge;ctx.lineWidth=0.6;ctx.stroke();

  // RIGHT ceramic sheen — lighter band
  ctx.globalAlpha=0.35;
  const shR=ctx.createLinearGradient(p0.sx+hw,p0.sy-height,p0.sx+hw,p0.sy-height+height*0.25);
  shR.addColorStop(0,'rgba(255,255,255,.3)');shR.addColorStop(1,'transparent');
  ctx.fillStyle=shR;
  ctx.beginPath();
  ctx.moveTo(p0.sx,p0.sy-height+7*b.w);
  ctx.lineTo(p0.sx,p0.sy-height+7*b.w+height*0.2);
  ctx.lineTo(p0.sx+hw,p0.sy-height+height*0.2);
  ctx.lineTo(p0.sx+hw,p0.sy-height);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha=1;

  // TOP FACE — porcelain cap
  ctx.beginPath();
  ctx.moveTo(p0.sx,p0.sy-height-7*b.w+14*b.w);
  ctx.lineTo(p0.sx-hw,p0.sy-height);
  ctx.lineTo(p0.sx,p0.sy-height+7*b.w);
  ctx.lineTo(p0.sx+hw,p0.sy-height);
  ctx.closePath();
  const tg2=ctx.createLinearGradient(p0.sx-hw,p0.sy-height,p0.sx+hw,p0.sy-height);
  tg2.addColorStop(0,gc.baseL);tg2.addColorStop(0.5,gc.sheen.replace('.3)','.6)').replace('.25)','.5)').replace('.35)','.6)'));tg2.addColorStop(1,gc.base);
  ctx.fillStyle=tg2;ctx.fill();
  ctx.strokeStyle=gc.edge;ctx.lineWidth=0.4;ctx.stroke();

  // Window grid — warm inset glow
  const rows=Math.min(Math.floor(b.h/8),6);
  const cols=Math.max(b.w,2);
  for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
      const wy=p0.sy-12-r*(height/(rows+1));
      const wx=p0.sx+4+c*(hw/cols);
      const lit=((b.x*7+b.y*13+r*3+c)%5)<3;
      ctx.fillStyle=lit?'rgba(255,230,180,.45)':'rgba(20,20,30,.4)';
      ctx.fillRect(wx,wy,3,4);
      // left face windows
      const lwx=p0.sx-hw+3+c*(hw/cols)*0.8;
      ctx.fillStyle=lit?'rgba(255,220,160,.35)':'rgba(15,15,25,.35)';
      ctx.fillRect(lwx,wy+1,3,4);
    }
  }

  // Vertical ceramic ribs (left face decorative lines)
  if(b.h>20){
    ctx.strokeStyle=gc.sheen;ctx.lineWidth=0.3;ctx.globalAlpha=0.2;
    for(let ri=1;ri<b.w*2;ri++){
      const rx=p0.sx-hw+ri*(hw/b.w/2);
      ctx.beginPath();ctx.moveTo(rx,p0.sy-height*0.05);ctx.lineTo(rx,p0.sy-height*0.95);ctx.stroke();
    }
    ctx.globalAlpha=1;
  }

  // Soft top glow for POI buildings
  if(b.name){
    ctx.globalAlpha=0.12+Math.sin(GX.time*1.5+b.x)*0.06;
    const tg=ctx.createRadialGradient(p0.sx,p0.sy-height-5,0,p0.sx,p0.sy-height-5,hw*1.5);
    tg.addColorStop(0,gc.glow);tg.addColorStop(1,'transparent');
    ctx.fillStyle=tg;
    ctx.fillRect(p0.sx-hw*1.5,p0.sy-height-5-hw*1.5,hw*3,hw*3);
    ctx.globalAlpha=1;

    // POI label
    ctx.font='6px "Noto Sans SC",sans-serif';
    ctx.textAlign='center';
    ctx.fillStyle='rgba(255,255,255,.6)';
    ctx.fillText(b.name.substring(0,8),p0.sx,p0.sy-height-10);
  }
}

function drawGlassPlayer(ctx){
  const p=glassProject(GX.px,GX.py,0);
  const bounce=GX.pMoving?Math.sin(GX.time*12)*1.5:0;
  const by=p.sy-2+bounce;
  const v=GX.vehicle;
  const bst=GX.boosting&&GX.boostEnergy>0;

  // Ground glow
  ctx.globalAlpha=0.15;
  const glowR=(v==='car'||v==='motorcycle')?18:(v==='helicopter')?20:(v==='bike'||v==='scooter'||v==='boat')?14:12;
  const gc2=bst?'#ffd700':'#5cadff';
  const gg=ctx.createRadialGradient(p.sx,p.sy+2,0,p.sx,p.sy+2,glowR);
  gg.addColorStop(0,gc2);gg.addColorStop(1,'transparent');
  ctx.fillStyle=gg;ctx.fillRect(p.sx-glowR,p.sy-glowR/2,glowR*2,glowR);
  ctx.globalAlpha=1;

  // Shadow
  const shW=(v==='car'||v==='motorcycle')?12:(v==='helicopter')?0:(v==='bike'||v==='scooter'||v==='boat')?8:6;
  ctx.fillStyle='rgba(0,0,0,.3)';
  ctx.beginPath();ctx.ellipse(p.sx,p.sy+2,shW,2.5,0,0,Math.PI*2);ctx.fill();

  // Boost trail
  if(bst&&GX.pMoving){
    const dxT=[0,1,0,-1][GX.pDir],dyT=[1,0,-1,0][GX.pDir];
    for(let t=1;t<=4;t++){ctx.globalAlpha=0.2/t;ctx.fillStyle='#ffd700';ctx.beginPath();ctx.arc(p.sx-dxT*t*5,p.sy+2-dyT*t*3,4-t*0.7,0,Math.PI*2);ctx.fill();}
    ctx.globalAlpha=1;
  }

  ctx.shadowColor=bst?'rgba(255,215,0,.5)':'rgba(92,173,255,.4)';ctx.shadowBlur=8;

  if(v==='walk'){
    // Legs
    ctx.fillStyle='#1a2a3a';
    if(GX.pMoving){const lo=Math.sin(GX.time*15)*2;ctx.fillRect(p.sx-2.5,by-4,2.5,5+lo);ctx.fillRect(p.sx+0.5,by-4,2.5,5-lo);}
    else{ctx.fillRect(p.sx-2.5,by-4,2.5,5);ctx.fillRect(p.sx+0.5,by-4,2.5,5);}
    // Body
    const bodyG=ctx.createLinearGradient(p.sx-3,by-14,p.sx+3,by-14);
    bodyG.addColorStop(0,'#2a4a6a');bodyG.addColorStop(0.5,'#3a6a9a');bodyG.addColorStop(1,'#2a4a6a');
    ctx.fillStyle=bodyG;ctx.fillRect(p.sx-3.5,by-14,7,10);
    // Head
    ctx.fillStyle='#ffe0cc';ctx.fillRect(p.sx-3,by-20,6,6);
    ctx.fillStyle='#1a1a2e';ctx.fillRect(p.sx-3.5,by-21,7,2.5);
    ctx.fillStyle='#fff';
    if(GX.pDir===0){ctx.fillRect(p.sx-2,by-18,1.5,1.5);ctx.fillRect(p.sx+1,by-18,1.5,1.5);}
    else if(GX.pDir===1){ctx.fillRect(p.sx-2.5,by-18,1.5,1.5);}
    else if(GX.pDir===3){ctx.fillRect(p.sx+1.5,by-18,1.5,1.5);}
  }else if(v==='bike'){
    // Frame
    ctx.strokeStyle='#5dade2';ctx.lineWidth=1.5;
    ctx.beginPath();ctx.moveTo(p.sx-6,by-2);ctx.lineTo(p.sx,by-9);ctx.lineTo(p.sx+6,by-2);ctx.stroke();
    ctx.beginPath();ctx.moveTo(p.sx,by-9);ctx.lineTo(p.sx-2,by-2);ctx.stroke();
    ctx.strokeStyle='#aaa';ctx.lineWidth=1;
    ctx.beginPath();ctx.arc(p.sx-6,by-1,3.5,0,Math.PI*2);ctx.stroke();
    ctx.beginPath();ctx.arc(p.sx+6,by-1,3.5,0,Math.PI*2);ctx.stroke();
    // Rider
    const rg=ctx.createLinearGradient(p.sx-2,by-18,p.sx+2,by-18);
    rg.addColorStop(0,'#2a4a6a');rg.addColorStop(1,'#3a6a9a');
    ctx.fillStyle=rg;ctx.fillRect(p.sx-2.5,by-18,5,8);
    ctx.fillStyle='#ffe0cc';ctx.fillRect(p.sx-2,by-22,4,4);
    ctx.fillStyle='#e74c3c';ctx.fillRect(p.sx-2.5,by-23,5,2);
  }else if(v==='scooter'){
    // Deck
    const dg=ctx.createLinearGradient(p.sx-7,by-3,p.sx+7,by-3);
    dg.addColorStop(0,'#1abc9c');dg.addColorStop(1,'#2ecc71');
    ctx.fillStyle=dg;ctx.fillRect(p.sx-7,by-3,14,2.5);
    ctx.strokeStyle='#999';ctx.lineWidth=1.5;
    ctx.beginPath();ctx.moveTo(p.sx+5,by-3);ctx.lineTo(p.sx+5,by-13);ctx.stroke();
    ctx.fillStyle='#666';ctx.fillRect(p.sx+3,by-14,5,2);
    ctx.fillStyle='#333';ctx.beginPath();ctx.arc(p.sx-6,by,3,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.arc(p.sx+6,by,3,0,Math.PI*2);ctx.fill();
    // Rider
    const rg2=ctx.createLinearGradient(p.sx-2,by-17,p.sx+2,by-17);
    rg2.addColorStop(0,'#2a4a6a');rg2.addColorStop(1,'#3a6a9a');
    ctx.fillStyle=rg2;ctx.fillRect(p.sx-2.5,by-17,5,8);
    ctx.fillStyle='#ffe0cc';ctx.fillRect(p.sx-2,by-21,4,4);
  }else if(v==='skateboard'){
    // Board
    ctx.fillStyle='#e74c3c';ctx.fillRect(p.sx-6,by-2,12,2.5);
    ctx.fillStyle='#c0392b';ctx.fillRect(p.sx-7,by-3,2,2.5);ctx.fillRect(p.sx+5,by-3,2,2.5);
    ctx.fillStyle='#333';ctx.fillRect(p.sx-4,by+1,2,1.5);ctx.fillRect(p.sx+2,by+1,2,1.5);
    // Rider
    const rg3=ctx.createLinearGradient(p.sx-2,by-15,p.sx+2,by-15);
    rg3.addColorStop(0,'#2a4a6a');rg3.addColorStop(1,'#3a6a9a');
    ctx.fillStyle=rg3;ctx.fillRect(p.sx-2.5,by-15,5,8);
    ctx.fillStyle='#ffe0cc';ctx.fillRect(p.sx-2,by-19,4,4);
    ctx.fillStyle='#9b59b6';ctx.fillRect(p.sx-2.5,by-20,5,2);
  }else if(v==='car'){
    // Car body
    const cg=ctx.createLinearGradient(p.sx-10,by-7,p.sx+10,by-7);
    cg.addColorStop(0,'#a02020');cg.addColorStop(0.5,'#e74c3c');cg.addColorStop(1,'#a02020');
    ctx.fillStyle=cg;ctx.fillRect(p.sx-10,by-7,20,7);
    // Roof
    ctx.fillStyle='#c0392b';ctx.fillRect(p.sx-6,by-12,12,5);
    // Windows
    ctx.fillStyle='rgba(135,206,250,.5)';ctx.fillRect(p.sx-5,by-11,4,3.5);ctx.fillRect(p.sx+1,by-11,4,3.5);
    // Wheels
    ctx.fillStyle='#222';ctx.beginPath();ctx.arc(p.sx-7,by+1,3,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.arc(p.sx+7,by+1,3,0,Math.PI*2);ctx.fill();
    // Headlights
    ctx.fillStyle='#ffd700';
    if(GX.pDir===3){ctx.fillRect(p.sx+9,by-5,2,2);}
    else if(GX.pDir===1){ctx.fillRect(p.sx-11,by-5,2,2);}
    else{ctx.fillRect(p.sx-10,by-6,2,1.5);ctx.fillRect(p.sx+8,by-6,2,1.5);}
  }else if(v==='motorcycle'){
    // Motorcycle body
    const mg=ctx.createLinearGradient(p.sx-7,by-6,p.sx+7,by-6);
    mg.addColorStop(0,'#4a1a6a');mg.addColorStop(0.5,'#8e44ad');mg.addColorStop(1,'#4a1a6a');
    ctx.fillStyle=mg;ctx.fillRect(p.sx-7,by-6,14,5);
    ctx.fillStyle='#6c3483';ctx.fillRect(p.sx-3,by-9,6,3);
    ctx.fillStyle='#888';ctx.fillRect(p.sx+6,by-4,3,1.5);
    ctx.fillStyle='#222';ctx.beginPath();ctx.arc(p.sx-6,by,3,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.arc(p.sx+6,by,3,0,Math.PI*2);ctx.fill();
    // Rider
    ctx.fillStyle='#1a1a1a';ctx.fillRect(p.sx-2.5,by-18,5,8);
    ctx.fillStyle='#ffe0cc';ctx.fillRect(p.sx-2,by-22,4,4);
    ctx.fillStyle='#222';ctx.fillRect(p.sx-2.5,by-23,5,2.5);
    ctx.fillStyle='#111';ctx.fillRect(p.sx-2,by-20.5,4,1);
    ctx.fillStyle='#ffd700';
    if(GX.pDir===3)ctx.fillRect(p.sx+8,by-5,2,2);
    else if(GX.pDir===1)ctx.fillRect(p.sx-10,by-5,2,2);
    else{ctx.fillRect(p.sx-7,by-5,1.5,1.5);ctx.fillRect(p.sx+6,by-5,1.5,1.5);}
  }else if(v==='boat'){
    // Hull
    const bg=ctx.createLinearGradient(p.sx-9,by-2,p.sx+9,by+3);
    bg.addColorStop(0,'#5a3010');bg.addColorStop(0.5,'#8B4513');bg.addColorStop(1,'#5a3010');
    ctx.fillStyle=bg;ctx.beginPath();
    ctx.moveTo(p.sx-9,by-2);ctx.lineTo(p.sx+9,by-2);
    ctx.lineTo(p.sx+7,by+4);ctx.lineTo(p.sx-7,by+4);
    ctx.closePath();ctx.fill();
    ctx.fillStyle='#A0522D';ctx.fillRect(p.sx-6,by-4,12,2);
    if(GX.pMoving){ctx.fillStyle='rgba(100,200,255,.3)';for(let sp=0;sp<4;sp++){const sx2=p.sx+(Math.random()-.5)*16,sy2=by+3+Math.random()*3;ctx.beginPath();ctx.arc(sx2,sy2,1.5+Math.random(),0,Math.PI*2);ctx.fill();}}
    // Rider
    const rg4=ctx.createLinearGradient(p.sx-2,by-16,p.sx+2,by-16);
    rg4.addColorStop(0,'#2a4a6a');rg4.addColorStop(1,'#3a6a9a');
    ctx.fillStyle=rg4;ctx.fillRect(p.sx-2.5,by-16,5,8);
    ctx.fillStyle='#ffe0cc';ctx.fillRect(p.sx-2,by-20,4,4);
    ctx.fillStyle='#f39c12';ctx.fillRect(p.sx-2.5,by-21,5,2);
  }else if(v==='helicopter'){
    // Body
    const hg=ctx.createLinearGradient(p.sx-7,by-8,p.sx+7,by-8);
    hg.addColorStop(0,'#1a2a3a');hg.addColorStop(0.5,'#2c3e50');hg.addColorStop(1,'#1a2a3a');
    ctx.fillStyle=hg;ctx.fillRect(p.sx-7,by-8,14,6);
    ctx.fillStyle='#34495e';ctx.fillRect(p.sx-5,by-12,10,4);
    ctx.fillStyle='rgba(135,206,250,.5)';ctx.fillRect(p.sx-4,by-11,8,2.5);
    ctx.fillStyle='#2c3e50';ctx.fillRect(p.sx+6,by-7,7,2);
    ctx.fillStyle='#e74c3c';ctx.fillRect(p.sx+12,by-9,2,5);
    const rotA=GX.time*8;
    ctx.strokeStyle='#bbb';ctx.lineWidth=1.5;
    ctx.beginPath();ctx.moveTo(p.sx-12*Math.cos(rotA),by-15);ctx.lineTo(p.sx+12*Math.cos(rotA),by-15);ctx.stroke();
    ctx.beginPath();ctx.moveTo(p.sx-12*Math.sin(rotA),by-15);ctx.lineTo(p.sx+12*Math.sin(rotA),by-15);ctx.stroke();
    ctx.fillStyle='#999';ctx.beginPath();ctx.arc(p.sx,by-15,2.5,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='#666';ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(p.sx-6,by-2);ctx.lineTo(p.sx-8,by+2);ctx.lineTo(p.sx+8,by+2);ctx.lineTo(p.sx+6,by-2);ctx.stroke();
  }

  ctx.shadowColor='transparent';ctx.shadowBlur=0;

  // Name tag
  const vInfo=VEHICLES[v];
  const tagText=vInfo.icon+' '+vInfo.name;
  ctx.font='5px "Noto Sans SC",sans-serif';
  const tagW2=ctx.measureText(tagText).width||24;
  const tagY2=(v==='car'||v==='motorcycle')?by-16:(v==='helicopter')?by-20:by-28;
  ctx.fillStyle='rgba(20,30,50,.5)';
  ctx.fillRect(p.sx-tagW2/2-4,tagY2-2,tagW2+8,10);
  ctx.strokeStyle=bst?'rgba(255,215,0,.3)':'rgba(92,173,255,.2)';ctx.lineWidth=0.4;
  ctx.strokeRect(p.sx-tagW2/2-4,tagY2-2,tagW2+8,10);
  ctx.textAlign='center';ctx.fillStyle=bst?'rgba(255,230,150,.8)':'rgba(200,220,255,.7)';
  ctx.fillText(tagText,p.sx,tagY2+6);
}

function renderGlassMinimap(){
  const mc=GX.miniCtx,mw=100,mh=100;
  mc.fillStyle='rgba(10,10,20,.9)';mc.fillRect(0,0,mw,mh);

  if(GX.infiniteMode){
    const viewTiles=80;
    const s=mw/viewTiles;
    const sgx=Math.floor(GX.px-viewTiles/2),sgy=Math.floor(GX.py-viewTiles/2);
    for(let gy=sgy;gy<sgy+viewTiles;gy+=2){for(let gx=sgx;gx<sgx+viewTiles;gx+=2){
      const t=getGround(GX,gx,gy);
      mc.fillStyle=t==='road'?'rgba(40,50,70,.8)':t==='water'?'rgba(30,80,140,.6)':'rgba(15,25,20,.6)';
      mc.fillRect((gx-sgx)*s,(gy-sgy)*s,s*2,s*2);
    }}
    const gxMBlds=getVisibleBuildings(GX);
    gxMBlds.forEach(b=>{
      mc.fillStyle=b.name?(b.gc?b.gc.glow:'#aaa'):'rgba(60,70,90,.5)';
      mc.globalAlpha=b.name?0.6:0.3;
      mc.fillRect((b.x-sgx)*s,(b.y-sgy)*s,b.w*s+1,2*s);
      mc.globalAlpha=1;
    });
    mc.fillStyle='#5cadff';mc.shadowColor='#5cadff';mc.shadowBlur=4;
    mc.fillRect(mw/2-1.5,mh/2-1.5,3,3);
    mc.shadowBlur=0;
    mc.strokeStyle='rgba(92,173,255,.2)';mc.lineWidth=0.5;
    const vr2=12/GX.zoom;
    mc.strokeRect((mw-vr2*2*s)/2,(mh-vr2*2*s)/2,vr2*2*s,vr2*2*s);
    return;
  }

  const s=mw/GX.worldW;
  for(let y=0;y<GX.worldH;y+=2){for(let x=0;x<GX.worldW;x+=2){
    const t=GX.ground[y][x];
    mc.fillStyle=t==='road'?'rgba(40,50,70,.8)':t==='water'?'rgba(30,80,140,.6)':'rgba(15,25,20,.6)';
    mc.fillRect(x*s,y*s,s*2,s*2);
  }}
  // Route path on minimap
  mc.fillStyle='rgba(255,200,80,.5)';
  GX.routePath.forEach(rp=>{mc.fillRect(rp.x*s,rp.y*s,s,s);});
  // Buildings
  GX.buildings.forEach(b=>{
    mc.fillStyle=b.name?(b.gc?b.gc.glow:'#aaa'):'rgba(60,70,90,.5)';
    mc.globalAlpha=b.name?0.6:0.3;
    mc.fillRect(b.x*s,b.y*s,b.w*s+1,2*s);
    mc.globalAlpha=1;
  });
  // Uncollected rewards
  GX.rewards.forEach(r=>{
    if(r.collected)return;
    mc.fillStyle=r.type.color;mc.globalAlpha=0.8;
    mc.fillRect(r.x*s-0.5,r.y*s-0.5,s+1,s+1);
  });
  mc.globalAlpha=1;
  // Player
  mc.fillStyle='#5cadff';mc.shadowColor='#5cadff';mc.shadowBlur=4;
  mc.fillRect(GX.px*s-1.5,GX.py*s-1.5,3,3);
  mc.shadowBlur=0;
  mc.strokeStyle='rgba(92,173,255,.2)';mc.lineWidth=0.5;
  const vr=12/GX.zoom;
  mc.strokeRect((GX.camX-vr)*s,(GX.camY-vr)*s,vr*2*s,vr*2*s);
}

// --- Game Loop ---
function glassGameLoop(){
  if(!GX.running)return;
  // 修改: 延迟3秒后检查玩家是否卡在建筑内
  // Check once after 3s delay to allow async POI buildings to load
  if(!GX._unstuckChecked && GX._startTime && Date.now()-GX._startTime>3000){
    GX._unstuckChecked=true;
    unstuckPlayer(GX);
  }
  if(!GX._startTime) GX._startTime=Date.now();
  GX.zoom+=(GX.targetZoom-GX.zoom)*0.1;
  // Boost key: Shift
  GX.boosting=!!(GX.keys['Shift']||GX.keys['ShiftLeft']||GX.keys['ShiftRight']);
  updateBoost(GX);
  const gxBar=document.getElementById('glassBoostFill');
  if(gxBar)gxBar.style.width=(GX.boostEnergy/GX.boostMax*100)+'%';
  let dx=GX.moveX,dy=GX.moveY;
  if(GX.keys['ArrowUp']||GX.keys['w']||GX.keys['W'])dy-=1;
  if(GX.keys['ArrowDown']||GX.keys['s']||GX.keys['S'])dy+=1;
  if(GX.keys['ArrowLeft']||GX.keys['a']||GX.keys['A'])dx-=1;
  if(GX.keys['ArrowRight']||GX.keys['d']||GX.keys['D'])dx+=1;
  if(dx!==0&&dy!==0){const l=Math.sqrt(dx*dx+dy*dy);dx/=l;dy/=l;}
  GX.pMoving=(dx!==0||dy!==0);
  if(GX.pMoving){
    const nx=GX.px+dx*GX.speed,ny=GX.py+dy*GX.speed;
    if(Math.abs(dy)>Math.abs(dx))GX.pDir=dy>0?0:2;else GX.pDir=dx>0?3:1;
    const tx=Math.round(nx),ty=Math.round(ny);
    if(!GX.infiniteMode&&(tx<0||tx>=GX.worldW||ty<0||ty>=GX.worldH)){
      if(!GX._boundaryToastTime||Date.now()-GX._boundaryToastTime>8000){
        GX._boundaryToastTime=Date.now();
        showToast('已到达区域边界 · 试试底部「漫游」进入无限模式!');
      }
    }
    if(GX.infiniteMode||(tx>=0&&tx<GX.worldW&&ty>=0&&ty<GX.worldH)){
      const tile=getGround(GX,tx,ty);
      const canWater=VEHICLES[GX.vehicle]&&VEHICLES[GX.vehicle].canWater;
      if(GX.ghostMode||((tile!=='water'||canWater)&&!isOccupiedInfinite(GX,tx,ty))){
        if(Math.floor(GX.px)!==Math.floor(nx)||Math.floor(GX.py)!==Math.floor(ny)){GX.steps++;if(GX.infiniteMode){EXPLORE_TRACK.totalSteps++;checkStepMilestones();}}
        GX.px=nx;GX.py=ny;
      }
    }
  }
  GX.camX+=(GX.px-GX.camX)*0.06;
  GX.camY+=(GX.py-GX.camY)*0.06;
  // Infinite mode chunk updates
  if(GX.infiniteMode)updateChunks(GX);
  // Reward collection check
  const gxRewLoop=GX.infiniteMode?getVisibleRewards(GX):GX.rewards;
  gxRewLoop.forEach(r=>{
    if(r.collected)return;
    const dist=Math.abs(r.x-GX.px)+Math.abs(r.y-GX.py);
    if(dist<1.5){
      r.collected=true;
      GX.collectedRewards[r.id]=true;
      if(r.isVehiclePickup&&r.vehicleKey){
        unlockVehicle(r.vehicleKey);
        showVehicleUnlockToast(r.vehicleKey);
        renderVehicleSelector('glass');
      }else{
        GX.score+=r.type.points;
        showGlassRewardToast(r.type);
      }
    }
  });
  // Reward respawn
  updateRewardRespawns(GX);
  try { glassRender(); } catch(e) { console.warn('GX render error:', e); }
  GX.animFrame=requestAnimationFrame(glassGameLoop);
}

// --- Input ---
function setupGlassListeners(){
  window._gxKeyDown=e=>{GX.keys[e.key]=true;if(e.key==='g'||e.key==='G')toggleGhostMode('gx');};
  window._gxKeyUp=e=>{GX.keys[e.key]=false;};
  window.addEventListener('keydown',window._gxKeyDown);
  window.addEventListener('keyup',window._gxKeyUp);

  // Mouse wheel zoom
  const gxWrap=document.getElementById('glassCanvasWrap');
  window._gxWheel=e=>{e.preventDefault();glassZoom(e.deltaY<0?1:-1);};
  gxWrap.addEventListener('wheel',window._gxWheel,{passive:false});
  const joy=document.getElementById('glassJoystick');
  const knob=document.getElementById('glassJoystickKnob');
  let ja=false;const jR=40;
  function jM(cx,cy){
    const r=joy.getBoundingClientRect();
    let dx=cx-(r.left+r.width/2),dy=cy-(r.top+r.height/2);
    const d=Math.sqrt(dx*dx+dy*dy);
    if(d>jR){dx=dx/d*jR;dy=dy/d*jR;}
    knob.style.transform=`translate(${dx}px,${dy}px)`;
    GX.moveX=dx/jR;GX.moveY=dy/jR;
    if(Math.abs(GX.moveX)<0.15)GX.moveX=0;
    if(Math.abs(GX.moveY)<0.15)GX.moveY=0;
  }
  window._gxTS=e=>{if(e.target.closest('.glass-joystick')){ja=true;jM(e.touches[0].clientX,e.touches[0].clientY);e.preventDefault();}};
  window._gxTM=e=>{if(ja){jM(e.touches[0].clientX,e.touches[0].clientY);e.preventDefault();}};
  window._gxTE=()=>{if(ja){ja=false;knob.style.transform='translate(0,0)';GX.moveX=0;GX.moveY=0;}};
  joy.addEventListener('touchstart',window._gxTS,{passive:false});
  window.addEventListener('touchmove',window._gxTM,{passive:false});
  window.addEventListener('touchend',window._gxTE);
  let mj=false;
  window._gxMD=e=>{if(e.target.closest('.glass-joystick')){mj=true;jM(e.clientX,e.clientY);}};
  window._gxMM=e=>{if(mj)jM(e.clientX,e.clientY);};
  window._gxMU=()=>{if(mj){mj=false;knob.style.transform='translate(0,0)';GX.moveX=0;GX.moveY=0;}};
  joy.addEventListener('mousedown',window._gxMD);
  window.addEventListener('mousemove',window._gxMM);
  window.addEventListener('mouseup',window._gxMU);
}
function removeGlassListeners(){
  window.removeEventListener('keydown',window._gxKeyDown);
  window.removeEventListener('keyup',window._gxKeyUp);
  window.removeEventListener('touchmove',window._gxTM);
  window.removeEventListener('touchend',window._gxTE);
  window.removeEventListener('mousemove',window._gxMM);
  window.removeEventListener('mouseup',window._gxMU);
  const gxWrap=document.getElementById('glassCanvasWrap');
  if(gxWrap&&window._gxWheel)gxWrap.removeEventListener('wheel',window._gxWheel);
  GX.keys={};GX.moveX=0;GX.moveY=0;
}
function glassZoom(dir){GX.targetZoom=Math.max(0.8,Math.min(4,GX.targetZoom+dir*0.3));}
function glassInteract(){
  let near=null,bd=Infinity;
  GX.buildings.forEach(b=>{if(!b.name)return;const d=Math.abs(b.x+b.w/2-GX.px)+Math.abs(b.y+1-GX.py);if(d<bd){bd=d;near=b;}});
  if(near&&bd<5){
    const pp=document.getElementById('glassPoiPopup');
    document.getElementById('gpName').textContent=near.name;
    document.getElementById('gpType').textContent=near.type+(near.address?' · '+near.address:'');
    document.getElementById('gpDesc').textContent='走近探索这里的故事…';
    pp.style.left='50%';pp.style.bottom='140px';pp.style.transform='translateX(-50%)';
    pp.classList.add('active');
    setTimeout(()=>pp.classList.remove('active'),4000);
  }else{showToast('附近没有可互动的地点');}
}
function closeGlassPopup(){document.getElementById('glassPoiPopup').classList.remove('active');}
function showGlassRewardToast(rt){
  const el=document.createElement('div');
  el.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) scale(0);z-index:300;padding:14px 28px;border-radius:16px;background:rgba(15,15,25,.85);backdrop-filter:blur(12px);color:#fff;font-size:16px;text-align:center;pointer-events:none;transition:all .4s cubic-bezier(.17,.67,.35,1.3);border:1px solid rgba(255,255,255,.12);box-shadow:0 8px 32px rgba(0,0,0,.4);';
  el.innerHTML=`<div style="font-size:32px;margin-bottom:4px">${rt.icon}</div><div style="font-weight:700;color:${rt.color}">${rt.name}</div><div style="font-size:13px;opacity:.7;margin-top:2px">+${rt.points} 分</div><div style="font-size:12px;opacity:.5;margin-top:4px">总分: ${GX.score}</div>`;
  document.body.appendChild(el);
  requestAnimationFrame(()=>{el.style.transform='translate(-50%,-50%) scale(1)';});
  setTimeout(()=>{el.style.opacity='0';el.style.transform='translate(-50%,-70%) scale(.8)';},1500);
  setTimeout(()=>el.remove(),2200);
}

// === EXPLORE MAP (版图点亮) ===
// City positions on simplified China map (normalized 0-100 coordinate system)
const EXPLORE_CITIES = [
  {name:'哈尔滨',x:82,y:12,emoji:'❄️',region:'东北'},
  {name:'长春',x:83,y:18,emoji:'🌲',region:'东北'},
  {name:'沈阳',x:80,y:23,emoji:'🏭',region:'东北'},
  {name:'大连',x:79,y:28,emoji:'🌊',region:'东北'},
  {name:'北京',x:70,y:28,emoji:'🏯',region:'华北'},
  {name:'天津',x:73,y:30,emoji:'🎡',region:'华北'},
  {name:'石家庄',x:67,y:33,emoji:'🏔️',region:'华北'},
  {name:'太原',x:63,y:31,emoji:'⛰️',region:'华北'},
  {name:'呼和浩特',x:60,y:22,emoji:'🐴',region:'华北'},
  {name:'济南',x:72,y:36,emoji:'🌺',region:'华东'},
  {name:'青岛',x:77,y:36,emoji:'🍺',region:'华东'},
  {name:'郑州',x:65,y:39,emoji:'🚄',region:'华中'},
  {name:'西安',x:57,y:39,emoji:'🏛️',region:'西北'},
  {name:'兰州',x:48,y:36,emoji:'🍜',region:'西北'},
  {name:'银川',x:52,y:30,emoji:'🏜️',region:'西北'},
  {name:'西宁',x:44,y:36,emoji:'🦌',region:'西北'},
  {name:'乌鲁木齐',x:22,y:20,emoji:'🍇',region:'西北'},
  {name:'南京',x:74,y:43,emoji:'🌸',region:'华东'},
  {name:'上海',x:79,y:44,emoji:'🌃',region:'华东'},
  {name:'杭州',x:77,y:48,emoji:'🍵',region:'华东'},
  {name:'合肥',x:71,y:44,emoji:'📚',region:'华东'},
  {name:'武汉',x:66,y:46,emoji:'🌉',region:'华中'},
  {name:'长沙',x:65,y:51,emoji:'🌶️',region:'华中'},
  {name:'南昌',x:70,y:50,emoji:'🦆',region:'华东'},
  {name:'福州',x:76,y:54,emoji:'🫖',region:'华东'},
  {name:'厦门',x:74,y:58,emoji:'🏖️',region:'华东'},
  {name:'台北',x:80,y:57,emoji:'🧋',region:'华东'},
  {name:'广州',x:66,y:62,emoji:'🥟',region:'华南'},
  {name:'深圳',x:68,y:64,emoji:'💻',region:'华南'},
  {name:'香港',x:69,y:65,emoji:'🌇',region:'华南'},
  {name:'南宁',x:57,y:63,emoji:'🌴',region:'华南'},
  {name:'海口',x:60,y:72,emoji:'🏝️',region:'华南'},
  {name:'成都',x:50,y:47,emoji:'🐼',region:'西南'},
  {name:'重庆',x:55,y:48,emoji:'🏙️',region:'西南'},
  {name:'贵阳',x:56,y:54,emoji:'🌄',region:'西南'},
  {name:'昆明',x:48,y:57,emoji:'🌺',region:'西南'},
  {name:'拉萨',x:30,y:46,emoji:'🏔️',region:'西南'},
  {name:'苏州',x:77,y:44,emoji:'🏯',region:'华东'},
  {name:'大理',x:45,y:58,emoji:'🦋',region:'西南'},
  {name:'丽江',x:43,y:55,emoji:'🏔️',region:'西南'},
  {name:'三亚',x:59,y:76,emoji:'🏖️',region:'华南'},
  {name:'洛阳',x:63,y:38,emoji:'🌸',region:'华中'},
  {name:'桂林',x:60,y:58,emoji:'🏞️',region:'华南'},
];

// City adjacency graph (which cities connect to which)
const CITY_EDGES = [
  ['哈尔滨','长春'],['长春','沈阳'],['沈阳','大连'],['沈阳','北京'],
  ['北京','天津'],['北京','石家庄'],['北京','呼和浩特'],['北京','太原'],
  ['天津','济南'],['济南','青岛'],['济南','郑州'],['济南','南京'],
  ['石家庄','太原'],['石家庄','郑州'],['太原','西安'],['太原','呼和浩特'],
  ['呼和浩特','银川'],['银川','兰州'],['兰州','西宁'],['兰州','西安'],['兰州','乌鲁木齐'],
  ['西安','郑州'],['西安','成都'],['西安','洛阳'],['洛阳','郑州'],
  ['郑州','武汉'],['郑州','合肥'],
  ['南京','上海'],['南京','合肥'],['南京','杭州'],['南京','苏州'],
  ['上海','杭州'],['上海','苏州'],
  ['杭州','福州'],['杭州','南昌'],
  ['合肥','武汉'],['合肥','南昌'],
  ['武汉','长沙'],['武汉','南昌'],['武汉','重庆'],
  ['长沙','南昌'],['长沙','广州'],['长沙','贵阳'],['长沙','桂林'],
  ['南昌','福州'],
  ['福州','厦门'],['福州','台北'],
  ['厦门','广州'],['厦门','深圳'],
  ['广州','深圳'],['广州','南宁'],['广州','桂林'],
  ['深圳','香港'],
  ['南宁','桂林'],['南宁','海口'],['南宁','昆明'],
  ['海口','三亚'],
  ['成都','重庆'],['成都','贵阳'],['成都','昆明'],['成都','拉萨'],
  ['重庆','贵阳'],
  ['贵阳','昆明'],['贵阳','桂林'],
  ['昆明','大理'],['昆明','拉萨'],
  ['大理','丽江'],
  ['西宁','拉萨'],
];

// Explore state (persisted)
let exploreState = JSON.parse(localStorage.getItem('cw_explore') || 'null') || {
  unlocked: ['上海'], // Start city
  completed: [],
  startCity: '上海',
  totalLit: 0
};

function saveExploreState() {
  localStorage.setItem('cw_explore', JSON.stringify(exploreState));
}

function getExploreLevel() {
  const lit = exploreState.completed.length;
  if (lit >= 30) return {level:7,name:'传奇行者',icon:'👑'};
  if (lit >= 20) return {level:6,name:'华夏旅神',icon:'⚡'};
  if (lit >= 15) return {level:5,name:'版图征服者',icon:'🗺️'};
  if (lit >= 10) return {level:4,name:'跨越万里',icon:'🚀'};
  if (lit >= 5) return {level:3,name:'区域探索家',icon:'🧭'};
  if (lit >= 2) return {level:2,name:'双城记',icon:'🌉'};
  return {level:1,name:'新手旅人',icon:'🌱'};
}

function getCityExploreStatus(cityName) {
  if (exploreState.completed.includes(cityName)) return 'completed';
  if (exploreState.unlocked.includes(cityName)) return 'unlocked';
  return 'locked';
}

function getAdjacentCities(cityName) {
  const adjacent = [];
  CITY_EDGES.forEach(([a, b]) => {
    if (a === cityName) adjacent.push(b);
    if (b === cityName) adjacent.push(a);
  });
  return adjacent;
}

// Check if a city's routes are sufficiently completed to "light up"
function isCityRouteCompleted(cityName) {
  const allCities = {...MOCK_DATA, ...DYNAMIC_CITIES};
  const data = allCities[cityName];
  if (!data || !data.routes || data.routes.length === 0) return false;
  // Need at least 1 route fully completed, OR 50%+ of total points checked
  let totalPoints = 0, checkedPoints = 0, anyRouteComplete = false;
  data.routes.forEach(r => {
    const prog = getRouteProgress(r);
    totalPoints += prog.total;
    checkedPoints += prog.checked;
    if (prog.pct === 100) anyRouteComplete = true;
  });
  return anyRouteComplete || (totalPoints > 0 && (checkedPoints / totalPoints) >= 0.5);
}

// Process unlock logic — call after check-ins
function processExploreUnlocks() {
  const newlyCompleted = [];
  const newlyUnlocked = [];

  // Check all unlocked cities for completion
  exploreState.unlocked.forEach(city => {
    if (!exploreState.completed.includes(city) && isCityRouteCompleted(city)) {
      exploreState.completed.push(city);
      newlyCompleted.push(city);

      // Unlock adjacent cities
      const neighbors = getAdjacentCities(city);
      neighbors.forEach(n => {
        if (!exploreState.unlocked.includes(n)) {
          exploreState.unlocked.push(n);
          newlyUnlocked.push(n);
        }
      });
    }
  });

  if (newlyCompleted.length > 0 || newlyUnlocked.length > 0) {
    saveExploreState();
    if (newlyUnlocked.length > 0) {
      showUnlockAnimation(newlyCompleted, newlyUnlocked);
    }
  }
}

function showUnlockAnimation(completed, unlocked) {
  document.getElementById('unlockIcon').textContent = '🔓';
  document.getElementById('unlockTitle').textContent = unlocked.length > 1 ? `${unlocked.length}座新城市解锁！` : `${unlocked[0]}解锁！`;
  document.getElementById('unlockDesc').textContent = `恭喜点亮「${completed.join('、')}」！相邻城市已解锁，继续探索吧。`;
  document.getElementById('unlockCities').innerHTML = unlocked.map((c, i) => {
    const city = EXPLORE_CITIES.find(ec => ec.name === c);
    return `<span class="unlock-city-tag" style="animation-delay:${i * 0.1}s">${city ? city.emoji : '🏙️'} ${c}</span>`;
  }).join('');
  document.getElementById('exploreUnlockAnim').classList.add('active');
}

function closeUnlockAnim() {
  document.getElementById('exploreUnlockAnim').classList.remove('active');
}

function showExplore() {
  // Process any pending unlocks
  processExploreUnlocks();
  renderExploreMap();
  document.getElementById('explorePanel').classList.add('active');
}

function closeExplore() {
  document.getElementById('explorePanel').classList.remove('active');
}

function renderExploreMap() {
  const level = getExploreLevel();
  document.getElementById('exploreLevelBadge').textContent = `Lv.${level.level} ${level.name}`;

  // Stats
  document.getElementById('exploreStatsRow').innerHTML = `
    <div class="explore-stat anim-fadeInUp stagger-1">
      <div class="e-num">${exploreState.completed.length}</div>
      <div class="e-lbl">已点亮</div>
    </div>
    <div class="explore-stat anim-fadeInUp stagger-2">
      <div class="e-num">${exploreState.unlocked.length}</div>
      <div class="e-lbl">已解锁</div>
    </div>
    <div class="explore-stat anim-fadeInUp stagger-3">
      <div class="e-num">${EXPLORE_CITIES.length}</div>
      <div class="e-lbl">全部城市</div>
    </div>`;

  // City detail cards
  const detail = document.getElementById('exploreCityDetail');
  let html = '';
  const allCities = {...MOCK_DATA, ...DYNAMIC_CITIES};

  exploreState.unlocked.forEach((cityName, idx) => {
    const status = getCityExploreStatus(cityName);
    const cityMeta = EXPLORE_CITIES.find(c => c.name === cityName);
    const data = allCities[cityName];
    const hasRoutes = data && data.routes && data.routes.length > 0;

    const bgColor = status === 'completed' ? 'rgba(0,184,148,.08)' : 'rgba(255,107,53,.05)';
    const statusText = status === 'completed' ? '✅ 已点亮' : '🔓 探索中';
    const statusColor = status === 'completed' ? 'var(--teal)' : 'var(--accent)';
    const iconBg = status === 'completed' ? 'linear-gradient(135deg,#00b894,#00cec9)' : 'linear-gradient(135deg,#ff6b35,#e84393)';

    html += `<div class="explore-city-card anim-fadeInUp stagger-${Math.min(idx+1,8)}" style="background:${bgColor}" onclick="onExploreCityCardClick('${cityName}')">
      <div class="ec-top">
        <div class="ec-icon" style="background:${iconBg};color:#fff;font-size:1.3rem;">${cityMeta ? cityMeta.emoji : '🏙️'}</div>
        <div class="ec-info">
          <div class="ec-name">${cityName}</div>
          <div class="ec-status" style="color:${statusColor}">${statusText}</div>
        </div>
        ${status === 'unlocked' && !hasRoutes ? '<span style="padding:4px 10px;border-radius:12px;font-size:.6rem;font-weight:700;background:rgba(255,107,53,.1);color:var(--accent);">需要搜索路线</span>' : ''}
      </div>`;

    if (hasRoutes) {
      let totalP = 0, checkedP = 0;
      data.routes.forEach(r => { const p = getRouteProgress(r); totalP += p.total; checkedP += p.checked; });
      const pct = totalP > 0 ? Math.round(checkedP / totalP * 100) : 0;
      html += `<div class="ec-progress">
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
        <div class="progress-text">${checkedP}/${totalP} 打卡点 · ${pct}%</div>
      </div>
      <div class="ec-routes">${data.routes.map(r => {
        const rp = getRouteProgress(r);
        return `<span class="ec-route-chip ${rp.pct === 100 ? 'done' : ''}">${rp.pct === 100 ? '✅ ' : ''}${r.name}</span>`;
      }).join('')}</div>`;
    } else {
      html += `<div style="font-size:.75rem;color:rgba(26,26,46,.35);margin-top:4px;line-height:1.5;">在「城市」页面搜索此城市以获取打卡路线</div>`;
    }

    html += '</div>';
  });

  // Show locked cities hint
  const lockedCount = EXPLORE_CITIES.length - exploreState.unlocked.length;
  if (lockedCount > 0) {
    html += `<div class="explore-locked-msg">还有 ${lockedCount} 座城市等待解锁<br>完成已解锁城市的路线以点亮相邻版图</div>`;
  }

  detail.innerHTML = html;
}

function onExploreCityClick(cityName) {
  const status = getCityExploreStatus(cityName);
  if (status === 'locked') {
    showToast(`「${cityName}」尚未解锁，先完成相邻城市的路线吧`);
    return;
  }
  // Go to this city's route page
  closeExplore();
  const allCities = {...MOCK_DATA, ...DYNAMIC_CITIES};
  if (allCities[cityName]) {
    APP.selectedCity = cityName;
    renderRouteList(cityName);
    showView('routeList');
  } else {
    // Need to discover this city first
    selectCity(cityName);
  }
}

function onExploreCityCardClick(cityName) {
  onExploreCityClick(cityName);
}

// Hook into checkin to auto-process explore unlocks
const _originalCheckinPoint = checkinPoint;
checkinPoint = function(routeId, pointIndex, pointName) {
  _originalCheckinPoint(routeId, pointIndex, pointName);
  // After checkin, check for explore map updates
  setTimeout(() => processExploreUnlocks(), 500);
};

// [ANIMATION_HELPERS]
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (4 + Math.random() * 8) + 's';
    p.style.animationDelay = Math.random() * 6 + 's';
    p.style.width = (2 + Math.random() * 3) + 'px';
    p.style.height = p.style.width;
    container.appendChild(p);
  }
}
// [INIT]
// 修改基线 / Base: index.html HEAD (693dc51)
// 修改内容 / Changes: 恢复被截断的初始化代码 (enterApp, DOMContentLoaded, AMap script)
function enterApp() {
  document.getElementById('splashScreen').classList.add('hidden');
  showView('citySelect');
  renderCities();
}
// Boot sequence
window.addEventListener('DOMContentLoaded', () => {
  createParticles();
  // Simulate loading
  setTimeout(() => {
    document.getElementById('loadingScreen').classList.add('hidden');
  }, 1200);
});
