/* ============ DATA: all content pools ============ */
/* Turkish case suffixes after a number, e.g. 12'yi, 12'nin, 10'u */
const numSuffix = (n, kind) => {
  const tens = { 10: 'u', 20: 'i', 30: 'u', 40: 'ı', 50: 'i', 60: 'ı', 70: 'i', 80: 'i', 90: 'ı' }, ones = { 1: 'i', 2: 'i', 3: 'ü', 4: 'ü', 5: 'i', 6: 'ı', 7: 'i', 8: 'i', 9: 'u' };
  const v = n % 10 ? ones[n % 10] : (tens[n % 100] || 'ı');
  const endsVowel = [2, 6, 7].includes(n % 10) || (n % 10 === 0 && [20, 50].includes(n % 100));
  return kind === 'gen' ? (endsVowel ? 'n' : '') + v + 'n' : (endsVowel ? 'y' : '') + v;
};
const acc = (n) => n + "'" + numSuffix(n, 'acc'), gen = (n) => n + "'" + numSuffix(n, 'gen');
const DATA = {};

DATA.SUBSTACK = 'https://kechykid.substack.com';
DATA.COVER_CDN = 'https://substackcdn.com/image/fetch/w_600,c_limit,f_auto,q_auto:good/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F';
DATA.COVERS = {1: "54be95c3-b986-473a-a675-4d36f2dce37e_596x847.png", 8: "b15004af-ad6b-498c-9d9e-bc090e36d969_452x649.png", 9: "6fd1900a-9734-49ba-99ab-dcd6add744ce_1448x2048.jpeg", 10: "b183005b-fee9-410b-bed7-2f9d46a07ccd_506x802.png", 12: "55ab0ff8-9f53-4f66-a6ce-4dcfdffaca2d_553x759.png"};
/* Page images of each issue, e.g. { 12: { count: 36, dir: 'sayilar/12/' } } -> sayilar/12/p001.webp */
DATA.PAGES = {};
DATA.LEVELS = [
  { min: 0, name: 'Meraklı', e: '🌱' },
  { min: 101, name: 'Kaşif', e: '🧭' },
  { min: 301, name: 'Bilgin', e: '📚' },
  { min: 701, name: 'Mucit', e: '💡' },
  { min: 1501, name: 'Kechy Ustası', e: '👑' }
];

DATA.CHARACTERS = [
  { id: 'kechy', name: 'KECHY', role: 'Meraklı', bg: '#7FD3DA', color: '#1FA2B0', text: 'Her şeyi merak eder. En sevdiği kelime: “Neden?”', link: 'kesfet', team: 'Keşif Takımı' },
  { id: 'mino', name: 'MİNO', role: 'Bilimci', bg: '#C9B8F2', color: '#9A7FE0', text: 'Laboratuvarın şefi. Deney yapmadan duramaz.', link: 'lab', team: 'Bilim Takımı' },
  { id: 'piko', name: 'PİKO', role: 'Komik', bg: '#A7DDA9', color: '#43AE5B', text: 'Şakaları ve bilmeceleri hiç bitmez.', link: 'oyun-bilmece', team: 'Kahkaha Takımı' },
  { id: 'luna', name: 'LUNA', role: 'Kitapçı', bg: '#F7A9C8', color: '#E6508A', text: 'Geceleri kitap okur, en güzel hikâyeleri anlatır.', link: 'oku', team: 'Hikâye Takımı' },
  { id: 'robo', name: 'ROBO', role: 'Teknoloji', bg: '#BFD6E6', color: '#3C7DD9', text: 'Bulmacaları sever, her şeyi kodla çözer.', link: 'oyna', team: 'Kod Takımı' },
  { id: 'momo', name: 'MOMO', role: 'Hayvansever', bg: '#FFC39A', color: '#F2752B', text: 'Bütün hayvanların dostu. Doğayı korur.', link: 'hayvanlar', team: 'Doğa Takımı' }
];

/* Titles of 1, 6 and 8-12 follow the real issues; 2-5 and 7 are still badge themes until those PDFs arrive.
   Dates of 1-6 come from the old kechydergisi.com posts (web.archive.org sitemap), 8-12 from the Substack posts. */
DATA.ISSUES = [
  { n: 1, title: 'Çocukluk', emoji: '🎠', color: '#1FA2B0', date: 'Eylül 2021' },
  { n: 2, title: 'Dinozor', emoji: '🦕', color: '#43AE5B', date: 'Ekim 2021' },
  { n: 3, title: 'Uzay', emoji: '🚀', color: '#3D4FA8', date: 'Ocak 2022' },
  { n: 4, title: 'Bilim', emoji: '🔬', color: '#8E6FD8', date: 'Haziran 2022' },
  { n: 5, title: 'Okyanus', emoji: '🐳', color: '#1C7FC4', date: 'Ekim 2022' },
  { n: 6, title: 'Konuşan Dağ', emoji: '⛄', color: '#5B7FC4', date: 'Ocak 2023', theme: 'Kış sayısı: Luka Animasyon (Zehra Canbaz), Annemler Duymasın (Kechy yazarları) ve Konuşan Dağ (Cafer Başer).' },
  { n: 7, title: 'Müzik', emoji: '🎵', color: '#D94A83' },
  { n: 8, title: 'Kış', emoji: '❄️', color: '#4F9BDA', date: 'Aralık 2023' },
  { n: 9, title: 'Hayal Gücü', emoji: '💭', color: '#F2752B', date: 'Eylül 2024', url: 'https://kechykid.substack.com/p/kechy-9-burada' },
  { n: 10, title: 'Cesaret', emoji: '🦊', color: '#E36C9D', date: 'Mart 2025' },
  { n: 11, title: 'Lezzet', emoji: '🍓', color: '#E89A12', date: 'Temmuz 2025' },
  { n: 12, title: 'Arkadaşlık', emoji: '🤝', color: '#1B8F9C', date: 'Şubat 2026', topic: 'Akran zorbalığına hayır', slogan: 'Zorba olma, kanka ol!' }
];
DATA.ISSUES.forEach(i => { if (DATA.COVERS[i.n]) i.img = DATA.COVER_CDN + DATA.COVERS[i.n]; });
/* covers saved in the site whose pages are not here yet (6: kechydergisi.com archive, 1280px original) */
DATA.LOCAL_COVERS = { 6: 'img/kapak/6.webp' };
if (typeof location !== 'undefined' && !/claude/.test(location.hostname)) DATA.ISSUES.forEach(i => { if (DATA.LOCAL_COVERS[i.n]) i.img = DATA.LOCAL_COVERS[i.n]; });
/* Real magazine pages and covers from the issue PDFs (build.py -> ISSUE_FILES); covers are page 1 of the PDF */
if (typeof ISSUE_FILES !== 'undefined' && typeof location !== 'undefined' && !/claude/.test(location.hostname)) Object.entries(ISSUE_FILES).forEach(([n, f]) => {
  DATA.PAGES[n] = { dir: `sayi/${n}/`, count: f.count, v: f.v, text: f.t, idx: f.idx || [] };
  const is = DATA.ISSUES.find(i => i.n === +n); if (is) { is.img = `sayi/${n}/kapak.webp?v=${f.v}`; if (f.theme) is.theme = f.theme; }
});
DATA.ISSUE_QUIZ = {
  1: [['Kaç kıta vardır?', ['5', '6', '7', '9'], 2, 'Asya, Afrika, Kuzey Amerika, Güney Amerika, Antarktika, Avrupa ve Okyanusya.'],
    ['Pusulanın iğnesi hangi yönü gösterir?', ['Güney', 'Kuzey', 'Doğu', 'Batı'], 1, 'Pusula iğnesi mıknatıstır ve Dünya\'nın manyetik kuzeyini gösterir.'],
    ['Dünyanın en büyük okyanusu hangisidir?', ['Atlas', 'Hint', 'Pasifik', 'Arktik'], 2, 'Pasifik Okyanusu tüm karaların toplamından bile büyüktür.'],
    ['Haritada mavi renk genelde neyi gösterir?', ['Dağları', 'Suyu', 'Çölü', 'Şehirleri'], 1, 'Mavi; denizleri, gölleri ve nehirleri gösterir.'],
    ['Ekvator nedir?', ['Bir dağ', 'Dünyayı ikiye bölen hayali çizgi', 'Bir nehir', 'Bir ülke'], 1, 'Ekvator, Dünya\'yı kuzey ve güney diye ikiye ayıran hayali çizgidir.']],
  2: [['“Dinozor” ne demektir?', ['Korkunç kertenkele', 'Büyük kuş', 'Uzun boyun', 'Hızlı koşan'], 0, 'Eski Yunanca “deinos” korkunç, “sauros” kertenkele demek.'],
    ['Hangi dinozor otçuldu?', ['T-Rex', 'Velociraptor', 'Brakiyozor', 'Spinozor'], 2, 'Uzun boynuyla ağaçların tepesindeki yaprakları yerdi.'],
    ['Dinozor kemiklerini inceleyen bilim insanına ne denir?', ['Astronot', 'Paleontolog', 'Veteriner', 'Pilot'], 1, 'Paleontologlar fosillerden geçmişi öğrenir.'],
    ['Bugün hangi hayvanlar dinozorların akrabasıdır?', ['Kuşlar', 'Kediler', 'Balıklar', 'Arılar'], 0, 'Kuşlar, dinozorların yaşayan torunlarıdır.'],
    ['Fosil nedir?', ['Taşlaşmış canlı kalıntısı', 'Bir tür bitki', 'Deniz kabuğu şekeri', 'Yıldız'], 0, 'Milyonlarca yıl önce yaşamış canlıların taşa dönüşmüş izleridir.']],
  3: [['Güneş\'e en yakın gezegen hangisidir?', ['Venüs', 'Merkür', 'Mars', 'Dünya'], 1, 'Merkür en küçük ve Güneş\'e en yakın gezegendir.'],
    ['Ay\'a ilk ayak basan insan kimdir?', ['Yuri Gagarin', 'Neil Armstrong', 'Galileo', 'Newton'], 1, '1969\'da Neil Armstrong Ay\'a ilk adımı attı.'],
    ['Güneş aslında nedir?', ['Gezegen', 'Yıldız', 'Uydu', 'Kuyruklu yıldız'], 1, 'Güneş bize en yakın yıldızdır.'],
    ['Halkalarıyla ünlü gezegen hangisidir?', ['Satürn', 'Mars', 'Merkür', 'Venüs'], 0, 'Satürn\'ün halkaları buz ve kaya parçalarından oluşur.'],
    ['Güneş ışığı Dünya\'ya kaç dakikada gelir?', ['1 saniyede', 'Yaklaşık 8 dakikada', '1 günde', '1 yılda'], 1, 'Işık saniyede 300.000 km gider; Güneş\'ten gelmesi yaklaşık 8 dakika sürer.']],
  4: [['Su kaç derecede kaynar?', ['50', '80', '100', '200'], 2, 'Deniz seviyesinde su 100°C\'de kaynar.'],
    ['Bitkiler ne ile besin üretir?', ['Güneş ışığı', 'Ay ışığı', 'Rüzgâr', 'Kum'], 0, 'Buna fotosentez denir.'],
    ['Mıknatıs hangisini çeker?', ['Tahta', 'Plastik', 'Demir', 'Cam'], 2, 'Mıknatıslar demir gibi bazı metalleri çeker.'],
    ['Buz eriyince neye dönüşür?', ['Gaza', 'Suya', 'Taşa', 'Tuza'], 1, 'Katı buz ısınınca sıvı suya dönüşür.'],
    ['Gökkuşağı ne zaman görülür?', ['Güneş ve yağmur birlikteyken', 'Gece', 'Sadece kışın', 'Rüzgârlı havada'], 0, 'Güneş ışığı yağmur damlalarında kırılır ve renklerine ayrılır.']],
  5: [['Dünyadaki en büyük hayvan hangisidir?', ['Fil', 'Mavi balina', 'Köpekbalığı', 'Zürafa'], 1, 'Mavi balina yaşamış en büyük hayvandır.'],
    ['Ahtapotun kaç kolu vardır?', ['4', '6', '8', '10'], 2, 'Ahtapotun 8 kolu ve 3 kalbi vardır.'],
    ['Deniz suyu neden tuzludur?', ['Balıklar yüzünden', 'Kayalardan gelen mineraller yüzünden', 'Yağmur yüzünden', 'Güneş yüzünden'], 1, 'Nehirler kayalardaki tuzları denize taşır.'],
    ['Yunuslar nasıl nefes alır?', ['Solungaçla', 'Başlarının üstündeki delikle', 'Derileriyle', 'Nefes almazlar'], 1, 'Yunuslar memelidir ve yüzeye çıkıp hava solur.'],
    ['Mercanlar nedir?', ['Taş', 'Bitki', 'Minik hayvanlar', 'Balık yumurtası'], 2, 'Mercanlar minik hayvanların oluşturduğu kolonilerdir.']],
  6: [['Ağaçlar havaya ne verir?', ['Duman', 'Oksijen', 'Kum', 'Tuz'], 1, 'Ağaçlar karbondioksiti alır, oksijen verir.'],
    ['Bir ağacın yaşını nasıl anlarız?', ['Yaprak sayısından', 'Gövdesindeki halkalardan', 'Rengi', 'Boyundan'], 1, 'Her yıl gövdede yeni bir halka oluşur.'],
    ['Sincaplar kış için ne saklar?', ['Balık', 'Fındık ve palamut', 'Şeker', 'Taş'], 1, 'Sincaplar yiyeceklerini toprağa gömer.'],
    ['Hangi hayvan gece avlanır?', ['Baykuş', 'Tavuk', 'Kelebek', 'İnek'], 0, 'Baykuşlar geceleri çok iyi görür ve duyar.'],
    ['Mantar bir bitki midir?', ['Evet', 'Hayır, ayrı bir canlı grubudur', 'Bir çeşit taştır', 'Bir böcektir'], 1, 'Mantarlar ne bitki ne hayvandır; kendi grupları vardır.']],
  7: [['Bir notanın adı hangisidir?', ['Do', 'Ka', 'Zu', 'Pi'], 0, 'Notalar: do, re, mi, fa, sol, la, si.'],
    ['Bağlama hangi tür çalgıdır?', ['Vurmalı', 'Telli', 'Üflemeli', 'Tuşlu'], 1, 'Bağlama telli bir halk çalgısıdır.'],
    ['Davul hangi tür çalgıdır?', ['Telli', 'Üflemeli', 'Vurmalı', 'Tuşlu'], 2, 'Davul vurularak çalınır.'],
    ['Ses neyle yayılır?', ['Titreşimle', 'Işıkla', 'Renkle', 'Kokuyla'], 0, 'Ses havadaki titreşimlerle kulağımıza ulaşır.'],
    ['Piyanoda kaç tuş vardır (standart)?', ['24', '52', '88', '100'], 2, 'Standart bir piyanoda 88 tuş bulunur.']],
  8: [['Kar tanelerinin kaç kolu olur?', ['4', '5', '6', '8'], 2, 'Kar kristalleri genelde altı kollu olur.'],
    ['Hangi hayvan kış uykusuna yatar?', ['Ayı', 'Tavuk', 'Kedi', 'Papağan'], 0, 'Ayılar kışı mağaralarında uyuyarak geçirir.'],
    ['Su kaç derecede donar?', ['0', '10', '-20', '100'], 0, 'Su 0°C\'de donar.'],
    ['Penguenler hangi kıtada yaşar?', ['Afrika', 'Antarktika', 'Avrupa', 'Asya'], 1, 'Pek çok penguen Antarktika ve çevresinde yaşar.'],
    ['Kışın günler nasıl olur?', ['Daha uzun', 'Daha kısa', 'Aynı', 'Hiç gün olmaz'], 1, 'Kışın Güneş daha kısa süre gökyüzünde kalır.']],
  9: [['Ana renkler hangileridir?', ['Kırmızı, sarı, mavi', 'Yeşil, mor, turuncu', 'Siyah, beyaz, gri', 'Pembe, kahve, mor'], 0, 'Diğer renkler bu üç ana rengin karışımıyla elde edilir.'],
    ['Mavi ve sarı karışırsa ne olur?', ['Mor', 'Yeşil', 'Turuncu', 'Kahve'], 1, 'Mavi + sarı = yeşil.'],
    ['Heykel neyle yapılabilir?', ['Taş ve kil', 'Su', 'Hava', 'Işık'], 0, 'Heykeltıraşlar taş, kil, metal ve ahşap kullanır.'],
    ['Ebru sanatı nerede yapılır?', ['Su üstünde', 'Kum üstünde', 'Cam üstünde', 'Duvarda'], 0, 'Ebru, boyaların özel bir su üstünde desen oluşturmasıyla yapılır.'],
    ['Kırmızı ve sarı karışırsa?', ['Turuncu', 'Yeşil', 'Mor', 'Mavi'], 0, 'Kırmızı + sarı = turuncu.']],
  10: [['Lale hangi mevsimde açar?', ['Kış', 'İlkbahar', 'Yaz', 'Sonbahar'], 1, 'Laleler ilkbaharda açar.'],
    ['Arılar çiçeklerden ne toplar?', ['Nektar', 'Kum', 'Su', 'Taş'], 0, 'Arılar nektardan bal yapar.'],
    ['Tırtıl neye dönüşür?', ['Kuşa', 'Kelebeğe', 'Balığa', 'Kurbağaya'], 1, 'Tırtıl koza örer ve kelebeğe dönüşür.'],
    ['Leylekler baharda nereden gelir?', ['Afrika\'dan', 'Ay\'dan', 'Kutuptan', 'Okyanustan'], 0, 'Leylekler kışı Afrika\'da geçirip baharda geri döner.'],
    ['Tohumun büyümesi için ne gerekir?', ['Su, toprak, ışık', 'Sadece karanlık', 'Buz', 'Tuz'], 0, 'Su, toprak ve ışık tohumu filizlendirir.']],
  11: [['Yazın güneşten korunmak için ne yaparız?', ['Şapka ve güneş kremi kullanırız', 'Hiç su içmeyiz', 'Öğlen güneşte uyuruz', 'Kalın mont giyeriz'], 0, 'Şapka, gölge ve bol su yazın en iyi arkadaşlarımızdır.'],
    ['Karpuzun yüzde kaçı sudur?', ['Yüzde 10', 'Yüzde 50', 'Yüzde 90\'dan fazlası', 'Hiç'], 2, 'Karpuzun yüzde 90\'dan fazlası sudur.'],
    ['Deniz kaplumbağaları yumurtalarını nereye bırakır?', ['Kuma', 'Ağaca', 'Kayaya', 'Suya'], 0, 'Caretta caretta kaplumbağaları Türkiye kıyılarında kuma yumurta bırakır.'],
    ['Kumdan kale yaparken kumu nasıl sağlam yaparız?', ['Biraz ıslatarak', 'Kurutarak', 'Isıtarak', 'Tuz ekleyerek'], 0, 'Islak kum taneleri birbirine yapışır.'],
    ['Yaz mevsimi hangi aylardır?', ['Haziran, Temmuz, Ağustos', 'Aralık, Ocak, Şubat', 'Mart, Nisan, Mayıs', 'Eylül, Ekim, Kasım'], 0, 'Kuzey yarımkürede yaz Haziran\'da başlar.']],
  12: [['Bir arkadaşın sürekli alay ediliyorsa ne yaparsın?', ['Ben de gülerim', 'Yanında olurum ve bir büyüğe söylerim', 'Görmezden gelirim', 'Başka yere giderim'], 1, 'Yanında durmak ve güvendiğin bir büyüğe söylemek en doğru adımdır.'],
    ['Zorbalık nedir?', ['Birine bilerek ve tekrar tekrar zarar vermek', 'Oyun oynamak', 'Şaka yapmak', 'Yardım etmek'], 0, 'Zorbalık; vurmak, alay etmek, dışlamak ya da internette kötü mesaj yazmak olabilir.'],
    ['Oyunda biri yalnız kalmışsa?', ['Oyuna davet ederim', 'Bakıp geçerim', 'Güler geçerim', 'Hiçbir şey'], 0, 'Kimseyi dışarıda bırakmamak herkesi mutlu eder.'],
    ['Birine zorbalık yapıldığını görünce kime söyleyebiliriz?', ['Öğretmene ya da aileye', 'Kimseye', 'Sadece internete', 'Zorbaya'], 0, 'Güvendiğin bir yetişkine söylemek “ispiyon” değil, yardım etmektir.'],
    ['Farklı olmak nasıl bir şeydir?', ['Güzel ve normal', 'Kötü', 'Yasak', 'Utanç verici'], 0, 'Hepimiz farklıyız; bu dünyayı renkli yapar.']]
};

DATA.QUESTIONS = [
  ['Dünyanın en hızlı hayvanı hangisidir?', ['Çita', 'Gökdoğan', 'Aslan', 'Kartal'], 1, 'Gökdoğan dalış sırasında 300 km/s\'nin üzerine çıkabilir. Karada en hızlısı çitadır.'],
  ['Bir örümceğin kaç bacağı vardır?', ['6', '8', '10', '4'], 1, 'Örümceklerin 8 bacağı vardır. Böceklerin ise 6 bacağı olur; yani örümcek böcek değildir!'],
  ['Güneş Sistemi\'ndeki en büyük gezegen hangisidir?', ['Mars', 'Jüpiter', 'Dünya', 'Venüs'], 1, 'Jüpiter\'in içine 1.300\'den fazla Dünya sığabilir.'],
  ['Pandalar en çok ne yer?', ['Balık', 'Bambu', 'Bal', 'Muz'], 1, 'Pandalar günde 12 saate kadar bambu yiyebilir.'],
  ['Gökkuşağında kaç renk vardır?', ['5', '6', '7', '8'], 2, 'Kırmızı, turuncu, sarı, yeşil, mavi, lacivert ve mor.'],
  ['Türkiye\'nin başkenti neresidir?', ['İstanbul', 'İzmir', 'Ankara', 'Bursa'], 2, 'Ankara 1923\'ten beri Türkiye\'nin başkentidir.'],
  ['Hangisi bir memelidir?', ['Köpekbalığı', 'Yunus', 'Ahtapot', 'Kaplumbağa'], 1, 'Yunuslar yavrularını emzirir ve hava solur.'],
  ['Su kaç derecede donar?', ['0°C', '10°C', '100°C', '-50°C'], 0, 'Su 0 santigrat derecede buza dönüşür.'],
  ['Hangi gezegene “Kızıl Gezegen” denir?', ['Venüs', 'Mars', 'Satürn', 'Neptün'], 1, 'Mars\'ın toprağındaki demir pası onu kırmızı gösterir.'],
  ['Boyu en uzun hayvan hangisidir?', ['Fil', 'Zürafa', 'Deve', 'At'], 1, 'Zürafalar 5,5 metreye kadar uzayabilir.'],
  ['Arılar hangisini üretir?', ['Süt', 'Bal', 'Ekmek', 'Peynir'], 1, 'Bir kavanoz bal için arılar milyonlarca çiçeği ziyaret eder.'],
  ['Hangisi bir kıta değildir?', ['Afrika', 'Asya', 'Grönland', 'Avrupa'], 2, 'Grönland dünyanın en büyük adasıdır ama kıta değildir.'],
  ['Ahtapotun kaç kalbi vardır?', ['1', '2', '3', '4'], 2, 'Ahtapotun 3 kalbi vardır ve kanı mavidir!'],
  ['Uzaya giden ilk insan kimdir?', ['Neil Armstrong', 'Yuri Gagarin', 'Galileo', 'Newton'], 1, 'Yuri Gagarin 1961\'de uzaya çıktı. Ay\'a ilk ayak basan ise Neil Armstrong\'du.'],
  ['Hangi hayvan kış uykusuna yatar?', ['Ayı', 'Tavuk', 'İnek', 'Papağan'], 0, 'Ayılar kışı uyuyarak geçirir; vücutlarındaki yağı kullanırlar.'],
  ['Dünyanın en büyük okyanusu hangisidir?', ['Atlas', 'Hint', 'Pasifik', 'Arktik'], 2, 'Pasifik Okyanusu tüm kıtaların toplamından büyüktür.'],
  ['Kelebekler tadı neyle alır?', ['Kanatlarıyla', 'Ayaklarıyla', 'Antenleriyle', 'Gözleriyle'], 1, 'Kelebekler bir yaprağa konunca ayaklarıyla tadına bakar.'],
  ['Hangisi bir sebzedir?', ['Elma', 'Havuç', 'Muz', 'Çilek'], 1, 'Havuç bir kök sebzedir.'],
  ['Deve hörgücünde ne depolar?', ['Su', 'Yağ', 'Kum', 'Taş'], 1, 'Hörgüçte yağ vardır; deve bu yağı enerjiye dönüştürür.'],
  ['Yetişkin bir insanda kaç kemik vardır?', ['106', '206', '306', '26'], 1, 'Bebeklerde daha fazla kemik vardır; büyüdükçe bazıları birleşir.'],
  ['Hangisi daha hızlıdır?', ['Ses', 'Işık', 'İkisi aynı', 'Rüzgâr'], 1, 'Bu yüzden şimşeği gök gürültüsünden önce görürüz.'],
  ['Hangi kuş geriye doğru uçabilir?', ['Kartal', 'Sinekkuşu', 'Penguen', 'Baykuş'], 1, 'Sinekkuşu kanatlarını saniyede 50 kez çırpabilir.'],
  ['Türkiye\'nin en yüksek dağı hangisidir?', ['Uludağ', 'Ağrı Dağı', 'Erciyes', 'Palandöken'], 1, 'Ağrı Dağı 5.137 metre yüksekliğindedir.'],
  ['Hangi hayvan hem karada hem suda yaşar?', ['Kurbağa', 'Kedi', 'Serçe', 'Tavşan'], 0, 'Kurbağalar amfibidir: hem suda hem karada yaşar.'],
  ['Dünya Güneş\'in etrafında kaç günde döner?', ['7', '30', 'Yaklaşık 365', '100'], 2, 'Bir tur yaklaşık 365 gün 6 saat sürer. Artık yıllar buradan gelir!'],
  ['Hangisi yenilenebilir enerji kaynağıdır?', ['Kömür', 'Petrol', 'Rüzgâr', 'Doğalgaz'], 2, 'Rüzgâr ve güneş enerjisi tükenmez.'],
  ['Penguenler uçabilir mi?', ['Evet', 'Hayır ama çok iyi yüzerler', 'Sadece geceleri', 'Sadece kışın'], 1, 'Penguenler kanatlarını suyun altında “uçar gibi” kullanır.'],
  ['Satranç tahtasında kaç kare vardır?', ['32', '48', '64', '100'], 2, '8 sıra ve 8 sütun: 64 kare.'],
  ['Hangi iki renk karışınca yeşil olur?', ['Kırmızı + Sarı', 'Mavi + Sarı', 'Kırmızı + Mavi', 'Beyaz + Siyah'], 1, 'Mavi ile sarı karışınca yeşil elde edilir.'],
  ['Mavi balinanın kalbi yaklaşık ne büyüklüktedir?', ['Portakal', 'Futbol topu', 'Küçük bir araba', 'Bir ev'], 2, 'Mavi balinanın kalbi küçük bir araba kadar büyüktür.'],
  ['Hangisi Güneş Sistemi\'nde değildir?', ['Mars', 'Satürn', 'Sirius', 'Merkür'], 2, 'Sirius bir yıldızdır ve gece gökyüzündeki en parlak yıldızdır.'],
  ['Koalalar günde kaç saate kadar uyuyabilir?', ['2', '8', '20', '1'], 2, 'Okaliptüs yaprağı az enerji verdiği için koalalar çok uyur.'],
  ['Dünyanın en büyük çölü hangisidir?', ['Sahra', 'Antarktika', 'Gobi', 'Atacama'], 1, 'Çöl, çok az yağış alan yerdir. Antarktika dev bir buz çölüdür!'],
  ['Göbeklitepe hangi ilimizdedir?', ['Şanlıurfa', 'Konya', 'Van', 'Trabzon'], 0, 'Göbeklitepe yaklaşık 12.000 yıllıktır; piramitlerden bile eskidir.'],
  ['Hangi hayvan en uzun yaşar?', ['Kelebek', 'Hamster', 'Dev kaplumbağa', 'Tavuk'], 2, 'Dev kaplumbağalar 150 yıldan fazla yaşayabilir.'],
  ['Bir üçgenin kaç kenarı vardır?', ['2', '3', '4', '5'], 1, 'Üç kenar, üç köşe!'],
  ['Hangisi Ay\'ın Dünya\'ya etkisidir?', ['Gelgit', 'Deprem', 'Rüzgâr', 'Yağmur'], 0, 'Ay\'ın çekimi denizlerde gelgite (med-cezir) neden olur.'],
  ['Van kedisinin ünlü özelliği nedir?', ['Uçabilmesi', 'Farklı renkte gözleri ve suyu sevmesi', 'Havlaması', 'Yeşil tüyleri'], 1, 'Van kedilerinin çoğu yüzmeyi sever ve gözleri farklı renkte olabilir.'],
  ['Hangi organımız vücuda kan pompalar?', ['Mide', 'Kalp', 'Akciğer', 'Beyin'], 1, 'Kalbin bir yumruk kadardır ve hiç durmadan çalışır.'],
  ['Dünyanın en uzun nehirlerinden biri hangisidir?', ['Nil', 'Kızılırmak', 'Tuna', 'Fırat'], 0, 'Nil ve Amazon, dünyanın en uzun iki nehridir.']
];

DATA.TASKS = [
  ['🔵', 'Evinde yuvarlak olan 5 şey bul.'], ['🐦', 'Bir kuş gör. Rengini hatırla.'],
  ['👨‍👩‍👧', 'Annene ya da babana çocukken oynadığı bir oyunu sor.'], ['🔤', '3 dakika içinde K harfiyle başlayan 10 kelime bul.', 'oyun-harf'],
  ['☁️', 'Pencereden bak: bulutlar neye benziyor? Birini çiz.', 'cizim'], ['💛', 'Bugün birine teşekkür et.'],
  ['🔴', 'Evde kırmızı olan 7 şey bul.'], ['🌱', 'Bir bitkiyi sula ya da bir yaprağı incele.'],
  ['🤸', '10 kez zıpla, 10 kez esne!'], ['👂', 'Gözlerini kapat: 5 farklı ses duyabiliyor musun?'],
  ['🗣️', 'Bir büyüğüne bugün öğrendiğin bir bilgiyi anlat.'], ['🧸', 'Oyuncaklarını renklerine göre sırala.'],
  ['✏️', 'Adının harfleriyle bir akrostiş yaz.'], ['✈️', 'Kâğıttan bir uçak yap ve uçur.'],
  ['🌦️', 'Bugünün havasını çiz.', 'cizim'], ['🐒', 'En sevdiğin hayvanı taklit et, ailen tahmin etsin.'],
  ['🟦', 'Evdeki kare şeyleri say.'], ['🌟', 'Bir arkadaşına ya da kardeşine iltifat et.'],
  ['🧹', 'Masanı topla, Kechy çok sevinir!'], ['🔢', '20\'den 1\'e kadar geriye doğru say.'],
  ['🍂', 'Bir yaprak ya da taş topla, şeklini incele.'], ['💃', 'Ailenle 5 dakika dans et.'],
  ['🪞', 'Aynaya bak ve kendine 3 güzel şey söyle.'], ['📖', 'Bildiğin bir masalın sonunu değiştir ve anlat.'],
  ['💧', 'Bir bardak su iç. Vücudun teşekkür eder!'], ['🌙', 'Akşam gökyüzünde Ay\'ı ara. Hangi şekilde?'],
  ['🕰️', 'Evdeki en eski eşyanın hikâyesini bir büyüğüne sor.'], ['🎵', 'Bir şarkıyı sadece mırıldan, ailen bulsun.'],
  ['🐞', 'Bir böceği ya da kuşu 1 dakika sessizce izle.'], ['🆕', 'Yeni bir kelime öğren ve bugün 3 kez kullan.'],
  ['🍽️', 'Sofrayı kurmaya ya da toplamaya yardım et.'], ['🐐', 'Kechy\'yi çiz! Kechy TV\'deki “Beraber Çizelim”e bak.', 'tv'],
  ['📚', 'Kitaplığındaki en ince kitabı bul ve kapağını incele.'], ['🤝', 'Oyunda yalnız kalan birini oyuna davet et.']
];

DATA.NOTES = ['Bugün birine teşekkür etmeyi unutma.', 'Hata yapmak öğrenmenin bir parçası.', 'Bir soru sor, merakın büyüsün!', 'Su içmeyi unutma!',
  'Bugün bir arkadaşına gülümse.', 'Yorulunca mola vermek de cesarettir.', 'Dışarıda gökyüzüne bak. Bugün ne renk?', 'Kendi hızında ilerle, burada yarış yok!',
  'Birine yardım etmek kalbi ısıtır.', 'Bugün yeni bir şey dene.', 'Kitaplar kapı gibidir. Birini aç!', 'Kimseyi dışarıda bırakma; oyuna davet et.',
  'Üzgün bir arkadaşın varsa yanında ol.', 'Merak etmek süper bir güç!', 'Bugün ailene sarıl.', 'Ekrandan sonra biraz hareket etmeye ne dersin?',
  'Her gün biraz, çok şey demek!', 'Bir büyüğüne bugününü anlat.', 'Doğayı koru, çöpünü yere atma.', 'Zorbalık gördüysen güvendiğin bir büyüğe söyle.',
  'Farklı olmak güzeldir.', 'Hayal gücün sınırsız!', 'Bugün bir çiçeği kokla.', 'Sabırlı ol; tohumlar da yavaş büyür.', 'Denemeye devam et, sen yaparsın!',
  'Gözlerini dinlendir, biraz uzağa bak.', 'Paylaşmak iki kat mutluluktur.', 'Sorunu anlatmak çözümün ilk adımıdır.', 'Gülmek en güzel egzersiz!'];

DATA.COUNTRIES = [
  ['TR', 'Türkiye', 'Ankara', 'Türkçe', 'Merhaba', '🇹🇷', 'İstanbul hem Avrupa\'da hem Asya\'dadır. Göbeklitepe 12.000 yıllık bir tapınaktır.', 'Asya-Avrupa'],
  ['JP', 'Japonya', 'Tokyo', 'Japonca', 'Konnichiwa', '🇯🇵', 'Binlerce adadan oluşur. Baharda kiraz çiçekleri her yeri pembeye boyar.', 'Asya'],
  ['EG', 'Mısır', 'Kahire', 'Arapça', 'Marhaba', '🇪🇬', 'Giza Piramitleri 4.500 yıldan daha eskidir.', 'Afrika'],
  ['KE', 'Kenya', 'Nairobi', 'Svahili ve İngilizce', 'Jambo', '🇰🇪', 'Her yıl milyonlarca zebra ve antilop birlikte yolculuk eder. Buna “Büyük Göç” denir.', 'Afrika'],
  ['BR', 'Brezilya', 'Brasília', 'Portekizce', 'Olá', '🇧🇷', 'Amazon yağmur ormanlarının büyük kısmı buradadır.', 'Güney Amerika'],
  ['US', 'ABD', 'Washington', 'İngilizce', 'Hello', '🇺🇸', 'Büyük Kanyon 400 kilometreden uzundur.', 'Kuzey Amerika'],
  ['CN', 'Çin', 'Pekin', 'Çince', 'Nǐ hǎo', '🇨🇳', 'Çin Seddi binlerce kilometre uzunluğundadır. Dev pandalar da burada yaşar.', 'Asya'],
  ['IN', 'Hindistan', 'Yeni Delhi', 'Hintçe ve İngilizce', 'Namaste', '🇮🇳', 'Satrancın atası sayılan oyun burada ortaya çıktı.', 'Asya'],
  ['AU', 'Avustralya', 'Kanberra', 'İngilizce', 'G\'day', '🇦🇺', 'Kangurular ve koalaların vatanıdır.', 'Okyanusya'],
  ['FR', 'Fransa', 'Paris', 'Fransızca', 'Bonjour', '🇫🇷', 'Eyfel Kulesi 330 metre boyundadır.', 'Avrupa'],
  ['IT', 'İtalya', 'Roma', 'İtalyanca', 'Ciao', '🇮🇹', 'Pizza Napoli şehrinde doğdu.', 'Avrupa'],
  ['DE', 'Almanya', 'Berlin', 'Almanca', 'Hallo', '🇩🇪', 'Masalları toplayan Grimm Kardeşler Almanyalıdır.', 'Avrupa'],
  ['GB', 'Birleşik Krallık', 'Londra', 'İngilizce', 'Hello', '🇬🇧', 'Big Ben aslında saat kulesinin içindeki büyük çanın adıdır.', 'Avrupa'],
  ['ES', 'İspanya', 'Madrid', 'İspanyolca', 'Hola', '🇪🇸', 'La Tomatina festivalinde insanlar birbirine domates atar!', 'Avrupa'],
  ['MX', 'Meksika', 'Meksiko', 'İspanyolca', 'Hola', '🇲🇽', 'Çikolatanın hammaddesi kakao, burada binlerce yıl önce içecek olarak kullanılırdı.', 'Kuzey Amerika'],
  ['CA', 'Kanada', 'Ottawa', 'İngilizce ve Fransızca', 'Hello, Bonjour', '🇨🇦', 'Dünyanın en uzun kıyı şeridine sahiptir.', 'Kuzey Amerika'],
  ['RU', 'Rusya', 'Moskova', 'Rusça', 'Privet', '🇷🇺', 'Dünyanın en büyük ülkesidir ve 11 saat dilimi vardır.', 'Avrupa-Asya'],
  ['IS', 'İzlanda', 'Reykjavik', 'İzlandaca', 'Halló', '🇮🇸', 'Volkanlar ve buzullar yan yanadır. Kuzey ışıkları görülebilir.', 'Avrupa'],
  ['NO', 'Norveç', 'Oslo', 'Norveççe', 'Hei', '🇳🇴', 'Yazın bazı yerlerde güneş gece yarısı bile batmaz.', 'Avrupa'],
  ['FI', 'Finlandiya', 'Helsinki', 'Fince', 'Moi', '🇫🇮', 'Yaklaşık 188.000 gölü vardır!', 'Avrupa'],
  ['GR', 'Yunanistan', 'Atina', 'Yunanca', 'Yassou', '🇬🇷', 'İlk Olimpiyat Oyunları burada yapıldı.', 'Avrupa'],
  ['MA', 'Fas', 'Rabat', 'Arapça ve Berberice', 'Salam', '🇲🇦', 'Dünyanın en eski üniversitelerinden biri Fes şehrindedir.', 'Afrika'],
  ['NG', 'Nijerya', 'Abuja', 'İngilizce', 'Sannu', '🇳🇬', 'Afrika\'nın en kalabalık ülkesidir.', 'Afrika'],
  ['ZA', 'Güney Afrika', 'Pretoria', '12 resmi dil', 'Sawubona', '🇿🇦', 'Boulders Plajı\'nda penguenler yaşar!', 'Afrika'],
  ['AR', 'Arjantin', 'Buenos Aires', 'İspanyolca', 'Hola', '🇦🇷', 'Tango dansı burada doğdu.', 'Güney Amerika'],
  ['PE', 'Peru', 'Lima', 'İspanyolca', 'Hola', '🇵🇪', 'Machu Picchu, dağların tepesindeki eski bir İnka şehridir.', 'Güney Amerika'],
  ['CL', 'Şili', 'Santiago', 'İspanyolca', 'Hola', '🇨🇱', 'Atacama Çölü dünyanın en kurak yerlerinden biridir.', 'Güney Amerika'],
  ['KR', 'Güney Kore', 'Seul', 'Korece', 'Annyeong', '🇰🇷', 'Korece alfabe Hangıl, 1443\'te icat edildi.', 'Asya'],
  ['ID', 'Endonezya', 'Cakarta', 'Endonezce', 'Halo', '🇮🇩', '17.000\'den fazla adası var. Komodo ejderleri burada yaşar.', 'Asya'],
  ['TH', 'Tayland', 'Bangkok', 'Tayca', 'Sawasdee', '🇹🇭', 'Fil, ülkenin sevilen simgesidir.', 'Asya'],
  ['AZ', 'Azerbaycan', 'Bakü', 'Azerbaycan Türkçesi', 'Salam', '🇦🇿', '“Ateşler Ülkesi” diye bilinir. Yanardağ\'daki alevler hiç sönmez.', 'Asya'],
  ['KZ', 'Kazakistan', 'Astana', 'Kazakça ve Rusça', 'Sälem', '🇰🇿', 'Elmanın anavatanı olarak bilinir.', 'Asya'],
  ['ET', 'Etiyopya', 'Addis Ababa', 'Amharca', 'Selam', '🇪🇹', 'Kahvenin ilk keşfedildiği yer olarak bilinir.', 'Afrika'],
  ['MG', 'Madagaskar', 'Antananarivo', 'Malgaşça ve Fransızca', 'Salama', '🇲🇬', 'Lemurlar doğada yalnızca burada yaşar.', 'Afrika'],
  ['NZ', 'Yeni Zelanda', 'Wellington', 'İngilizce ve Maorice', 'Kia ora', '🇳🇿', 'Uçamayan kivi kuşu ülkenin simgesidir.', 'Okyanusya'],
  ['NL', 'Hollanda', 'Amsterdam', 'Felemenkçe', 'Hallo', '🇳🇱', 'Ülkede insan sayısından daha fazla bisiklet vardır.', 'Avrupa'],
  ['CH', 'İsviçre', 'Bern', 'Dört resmi dil', 'Grüezi', '🇨🇭', 'Dört resmi dili vardır: Almanca, Fransızca, İtalyanca ve Romanşça.', 'Avrupa'],
  ['SE', 'İsveç', 'Stockholm', 'İsveççe', 'Hej', '🇸🇪', 'Her kış buzdan bir otel yeniden yapılır.', 'Avrupa'],
  ['NP', 'Nepal', 'Katmandu', 'Nepalce', 'Namaste', '🇳🇵', 'Everest Dağı Nepal ile Çin sınırındadır. Bayrağı dikdörtgen değildir!', 'Asya'],
  ['CU', 'Küba', 'Havana', 'İspanyolca', 'Hola', '🇨🇺', 'Dünyanın en küçük kuşu arı sinekkuşu burada yaşar.', 'Kuzey Amerika'],
  ['MN', 'Moğolistan', 'Ulan Batur', 'Moğolca', 'Sain baina uu', '🇲🇳', 'Bazı aileler hâlâ “ger” denen yuvarlak çadırlarda yaşar.', 'Asya'],
  ['PK', 'Pakistan', 'İslamabad', 'Urduca ve İngilizce', 'Salam', '🇵🇰', 'Dünyanın en yüksek ikinci dağı K2 buradadır.', 'Asya']
].map(([code, name, cap, lang, hello, flag, fact, cont]) => ({ code, name, cap, lang, hello, flag, fact, cont }));

DATA.ANIMALS = [
  ['🐙', 'Ahtapot', 'Okyanus', 'Yengeç ve balık', '3 kalp, mavi kan, renk değiştirme', 'Kollarındaki vantuzlarla tat alabilir.'],
  ['🐘', 'Fil', 'Savan ve orman', 'Ot ve meyve', 'Hortumunda binlerce kas', 'Yavrusu doğduğunda yaklaşık 100 kilo gelir.'],
  ['🦒', 'Zürafa', 'Savan', 'Akasya yaprağı', '50 cm\'lik mor dil', 'Boynunda da bizim gibi 7 omur vardır.'],
  ['🐧', 'Penguen', 'Güney kutbu ve denizleri', 'Balık ve kril', 'Suyun altında uçar gibi yüzer', 'İmparator penguen babalar yumurtayı ayaklarının üstünde taşır.'],
  ['🦉', 'Baykuş', 'Orman', 'Fare ve böcek', 'Başını 270 derece çevirir', 'Kanat tüyleri sayesinde neredeyse sessiz uçar.'],
  ['🐢', 'Deniz kaplumbağası', 'Okyanus', 'Deniz çayırı ve denizanası', 'Doğduğu kumsalı bulur', 'Caretta caretta, Türkiye kıyılarında yumurtlar.'],
  ['🦈', 'Köpekbalığı', 'Okyanus', 'Balık', 'Kokuyu çok uzaktan alır', 'Köpekbalıkları ağaçlardan bile önce vardı!'],
  ['🐝', 'Bal arısı', 'Çiçekli bahçeler', 'Nektar ve polen', 'Dans ederek konuşur', 'Dans ederek çiçeklerin yerini birbirine anlatır.'],
  ['🦋', 'Kelebek', 'Çayır ve bahçe', 'Çiçek nektarı', 'Ayaklarıyla tat alır', 'Tırtılken koza örer, sonra kelebeğe dönüşür.'],
  ['🐬', 'Yunus', 'Okyanus', 'Balık ve kalamar', 'Beyninin yarısıyla uyur', 'Birbirlerine özel ıslıklarla “isim” verirler.'],
  ['🦘', 'Kanguru', 'Avustralya', 'Ot', 'Bir sıçrayışta 8 metre', 'Yavrusu doğduğunda bir fasulye tanesi kadardır.'],
  ['🐨', 'Koala', 'Avustralya ormanları', 'Okaliptüs yaprağı', 'Günde 20 saate kadar uyku', 'Parmak izleri insanlarınkine çok benzer.'],
  ['🐪', 'Deve', 'Çöl', 'Kuru ot ve dikenli bitki', 'Günlerce susuz kalabilir', 'Kum fırtınasında burun deliklerini kapatabilir.'],
  ['🐻‍❄️', 'Kutup ayısı', 'Kuzey kutbu', 'Fok', 'Buzda kaymaz pati', 'Kürkü aslında şeffaf, derisi ise siyahtır!'],
  ['🦎', 'Bukalemun', 'Tropik orman', 'Böcek', 'Gözlerini ayrı ayrı oynatır', 'Dili vücudundan bile uzun olabilir.'],
  ['🐈', 'Van kedisi', 'Van', 'Balık ve et', 'Yüzmeyi sever', 'Bir gözü mavi, bir gözü kehribar rengi olabilir.'],
  ['🐋', 'Mavi balina', 'Okyanus', 'Kril', 'Yaşamış en büyük hayvan', 'Dinozorlardan bile büyüktür!'],
  ['🐜', 'Karınca', 'Her yerde', 'Tohum ve böcek', 'Kendi ağırlığının katlarını taşır', 'Koloniler halinde yaşar ve iş bölümü yapar.']
].map(([e, name, home, food, power, fact]) => ({ e, name, home, food, power, fact }));

DATA.FACTS = [
  ['🍯', 'Bal hiç bozulmaz! Mısır\'daki eski mezarlarda bile yenebilir bal bulundu.'], ['🐙', 'Ahtapotların üç kalbi vardır ve kanları mavidir.'],
  ['🪐', 'Satürn o kadar hafiftir ki dev bir havuz olsaydı suda yüzerdi.'], ['🌕', 'Ay, her yıl Dünya\'dan yaklaşık 4 santim uzaklaşıyor.'],
  ['🦈', 'Köpekbalıkları ağaçlardan daha eskidir!'], ['🍌', 'Muz aslında bir meyve türü olan “üzümsü meyve”dir, çilek ise değildir.'],
  ['🦒', 'Zürafanın dili yaklaşık 50 santimdir ve mor renklidir.'], ['🐨', 'Koalalar günde 20 saate kadar uyuyabilir.'],
  ['☀️', 'Güneş ışığı Dünya\'ya yaklaşık 8 dakikada ulaşır.'], ['🦴', 'Bebekler yetişkinlerden daha çok kemikle doğar.'],
  ['🐝', 'Arılar dans ederek birbirlerine yol tarif eder.'], ['🐬', 'Yunuslar beyinlerinin yarısıyla uyur.'],
  ['🌋', 'Dünyanın merkezi, Güneş\'in yüzeyi kadar sıcaktır.'], ['🏔️', 'Everest Dağı 8.849 metre yüksekliğindedir.'],
  ['🌳', 'Dünyanın en uzun ağacı 115 metreden uzundur.'], ['🐧', 'Penguenlerin neredeyse hepsi Dünya\'nın güney yarısında yaşar.'],
  ['🦋', 'Kelebekler tat almak için ayaklarını kullanır.'], ['🐘', 'Filler zıplayamaz ama çok iyi yüzer.'],
  ['⚡', 'Şimşek, Güneş\'in yüzeyinden daha sıcaktır.'], ['🌍', 'Dünya\'nın yüzeyinin yaklaşık üçte ikisi sudur.'],
  ['🐌', 'Salyangozların binlerce minik dişi vardır.'], ['🐈', 'Kedilerin her kulağında 30\'dan fazla kas vardır.'],
  ['🏛️', 'Göbeklitepe, Stonehenge\'den ve piramitlerden bile eskidir.'], ['🌷', 'Laleler aslında Orta Asya\'dan gelir.'],
  ['🦉', 'Baykuşlar başlarını 270 derece çevirebilir.'], ['🧊', 'Antarktika\'daki buz, Dünya\'daki tatlı suyun büyük kısmını saklar.'],
  ['🐫', 'Develerin hörgücünde su değil, yağ vardır.'], ['🐻‍❄️', 'Kutup ayılarının derisi siyahtır!'],
  ['💓', 'Kalbin her gün yaklaşık 100.000 kez atar.'], ['🌈', 'Uçaktan bakınca gökkuşağı bazen tam bir daire görünür.']
];

DATA.EXPERIMENTS = [
  { id: 'yumurta', title: 'Yüzen Yumurta', e: '🥚', mats: [['🥚', '1 yumurta'], ['🥛', '1 bardak su'], ['🧂', '6 kaşık tuz'], ['🥄', 'Kaşık']],
    steps: ['Bardağı suyla doldur.', 'Yumurtayı yavaşça suya bırak. Ne oldu? Battı!', 'Yumurtayı çıkar ve suya 6 kaşık tuz ekleyip karıştır.', 'Yumurtayı tekrar bırak. Bak, yüzüyor!'],
    why: 'Tuzlu su, tatlı sudan daha yoğundur. Yoğun su yumurtayı yukarı iter. İnsanların Lut Gölü\'nde kolayca yüzmesinin nedeni de budur.' },
  { id: 'cicek', title: 'Renk Değiştiren Çiçek', e: '🌼', mats: [['🌼', 'Beyaz bir çiçek'], ['🥛', 'Bardak su'], ['🎨', 'Gıda boyası']],
    steps: ['Bardağa su koy ve birkaç damla gıda boyası ekle.', 'Çiçeğin sapını bir büyüğüne kestir.', 'Çiçeği renkli suya koy.', 'Bir gün bekle ve yapraklara bak.'],
    why: 'Bitkiler suyu gövdelerindeki minik kanallarla yukarı çeker. Boya da suyla birlikte yapraklara taşınır.' },
  { id: 'uzum', title: 'Dans Eden Kuru Üzümler', e: '🍇', mats: [['🫧', 'Maden suyu'], ['🍇', '5 kuru üzüm'], ['🥛', 'Şeffaf bardak']],
    steps: ['Bardağa maden suyu doldur.', 'Kuru üzümleri içine at.', 'Birkaç saniye izle: üzümler iner, çıkar, dans eder!'],
    why: 'Gaz kabarcıkları üzümlere yapışır ve onları yukarı taşır. Kabarcıklar yüzeyde patlayınca üzümler tekrar batar.' },
  { id: 'sut', title: 'Sihirli Süt Renkleri', e: '🥛', mats: [['🍽️', 'Tabak'], ['🥛', 'Süt'], ['🎨', 'Gıda boyası'], ['🧴', 'Bulaşık deterjanı'], ['🧻', 'Kulak çubuğu']],
    steps: ['Tabağa biraz süt dök.', 'Sütün ortasına farklı renklerden birer damla boya damlat.', 'Kulak çubuğunun ucunu deterjana batır.', 'Çubuğu sütün ortasına değdir ve izle!'],
    why: 'Deterjan, sütteki yağla karşılaşınca hareket eder ve renkleri iter. Renkler dans eder gibi dağılır.' },
  { id: 'balon', title: 'Kendi Kendine Şişen Balon', e: '🎈', mats: [['🍶', 'Boş şişe'], ['🫗', 'Yarım bardak sirke'], ['🧂', '2 kaşık karbonat'], ['🎈', 'Balon']],
    steps: ['Bir büyüğünle birlikte şişeye sirke koy.', 'Huni yardımıyla balonun içine karbonat doldur.', 'Balonun ağzını şişeye geçir.', 'Balonu kaldır, karbonat sirkeye düşsün. Balon şişiyor!'],
    why: 'Sirke ile karbonat karışınca karbondioksit gazı oluşur. Gaz balonu şişirir.' },
  { id: 'gokkusagi', title: 'Bardakta Gökkuşağı', e: '🌈', mats: [['🥛', 'Bardak su'], ['☀️', 'Güneşli pencere'], ['📄', 'Beyaz kâğıt']],
    steps: ['Su dolu bardağı güneş alan pencerenin kenarına koy.', 'Beyaz kâğıdı bardağın önüne, yere koy.', 'Bardağı ve kâğıdı biraz oynat. Kâğıtta renkleri gördün mü?'],
    why: 'Güneş ışığı aslında bütün renklerin karışımıdır. Su ışığı kırar ve renklerine ayırır.' },
  { id: 'yuruyen', title: 'Yürüyen Su', e: '💧', mats: [['🥛', '3 bardak'], ['🎨', 'Kırmızı ve mavi boya'], ['🧻', 'Kâğıt havlu']],
    steps: ['Üç bardağı yan yana koy. Kenardakileri suyla doldur, ortadakini boş bırak.', 'Bir bardağa kırmızı, diğerine mavi boya damlat.', 'İki kâğıt havluyu rulo yap: biri kırmızıdan ortaya, diğeri maviden ortaya uzansın.', 'Bir saat bekle. Ortadaki bardakta ne renk oluştu?'],
    why: 'Su, kâğıt havlunun minik boşluklarında tırmanabilir. Buna kılcallık denir. Kırmızı ve mavi birleşince mor olur.' },
  { id: 'limon', title: 'Gizli Limon Mürekkebi', e: '🍋', mats: [['🍋', 'Limon suyu'], ['🧻', 'Kulak çubuğu'], ['📄', 'Beyaz kâğıt'], ['💡', 'Isı (bir büyük yardımıyla)']],
    steps: ['Kulak çubuğunu limon suyuna batır ve kâğıda gizli bir mesaj yaz.', 'Kâğıdın kurumasını bekle. Mesaj görünmez oldu!', 'Bir büyüğünden kâğıdı dikkatlice ısıtmasını iste.', 'Gizli mesajın ortaya çıktığını gör!'],
    why: 'Limon suyu ısınınca kararır. Böylece görünmez mesaj kahverengi olur.', safe: 'Isıtma işini mutlaka bir yetişkin yapmalı.' }
];

DATA.RIDDLES = [
  ['Dişleri var ama ısırmaz, saçları düzeltir.', 'Tarak', ['Makas', 'Fırça']],
  ['Sayfaları var ama ağaç değil, konuşmaz ama çok şey anlatır.', 'Kitap', ['Defter', 'Gazete']],
  ['Kanadı var kuş değil, bal yapar ama aşçı değil.', 'Arı', ['Kelebek', 'Sinek']],
  ['Yüzü var, iki kolu var ama ayağı yok; hep “tik tak” der.', 'Saat', ['Radyo', 'Telefon']],
  ['Ne kadar çok alırsan o kadar büyür.', 'Çukur', ['Balon', 'Kum']],
  ['Islandıkça kurur.', 'Havlu', ['Sünger', 'Çamaşır']],
  ['Her yerde seni izler ama ışık yoksa kaybolur.', 'Gölge', ['Ayna', 'Kedi']],
  ['Kışın beyaz beyaz yağar, güneş çıkınca erir.', 'Kar', ['Yağmur', 'Dolu']],
  ['Kabuğu evidir, yavaş yavaş gezer; yağmurdan sonra ortaya çıkar.', 'Salyangoz', ['Kaplumbağa', 'Solucan']],
  ['Tuşları var ama kapı açmaz, çalınca şarkı söyler.', 'Piyano', ['Klavye', 'Kilit']],
  ['Dört ayağı var yürümez, sırtı var ama yatmaz.', 'Sandalye', ['Masa', 'Yatak']],
  ['Kırılmadan kullanılamaz.', 'Yumurta', ['Ceviz', 'Bardak']],
  ['Başı var ama düşünmez, dişleri var ama ağzı yok.', 'Sarımsak', ['Tarak', 'Soğan']],
  ['Yağmurdan sonra gökte yedi renkli bir köprü.', 'Gökkuşağı', ['Bulut', 'Şimşek']],
  ['Adını söyleyince bozulur.', 'Sessizlik', ['Sır', 'Uyku']],
  ['Uzun kulaklı, havuç sever, zıp zıp zıplar.', 'Tavşan', ['Kanguru', 'Fare']],
  ['Gündüz uyur, gece uyanır; kocaman gözleriyle her yeri görür.', 'Baykuş', ['Yarasa', 'Kedi']],
  ['Beyazdır süt değildir, tatlıdır bal değildir.', 'Şeker', ['Tuz', 'Un']],
  ['Ağzı var konuşmaz, yatağı var uyumaz.', 'Nehir', ['Mağara', 'Deniz']],
  ['Bir evim var, penceresi yok; içinde sarı bir güneş var.', 'Yumurta', ['Portakal', 'Lamba']]
];

DATA.WORDS = {
  'Hayvanlar': ['KEÇİ', 'PANDA', 'TİLKİ', 'KAPLAN', 'BAYKUŞ', 'YUNUS', 'ZÜRAFA', 'ARI'],
  'Uzay': ['GÜNEŞ', 'AY', 'MARS', 'YILDIZ', 'ROKET', 'GEZEGEN', 'UYDU', 'SATÜRN'],
  'Meyveler': ['ELMA', 'ARMUT', 'KİRAZ', 'MUZ', 'ÜZÜM', 'ÇİLEK', 'KAYISI', 'İNCİR'],
  'Renkler': ['MAVİ', 'SARI', 'YEŞİL', 'MOR', 'PEMBE', 'TURUNCU', 'BEYAZ', 'GRİ']
};
DATA.PLANETS = [
  { n: 'Merkür', size: 34, bg: '#A8A29E', f: 'En küçük gezegen ve Güneş\'e en yakın olanı.' },
  { n: 'Venüs', size: 46, bg: '#E8C27A', f: 'En sıcak gezegen! Bulutları ısıyı hapseder.' },
  { n: 'Dünya', size: 48, bg: 'radial-gradient(circle at 60% 60%,#43AE5B 20%,transparent 22%),#3C7DD9', f: 'Evimiz. Üzerinde yaşam olduğunu bildiğimiz tek gezegen.' },
  { n: 'Mars', size: 40, bg: '#D9573B', f: 'Kızıl gezegen. Güneş Sistemi\'nin en yüksek yanardağı burada.' },
  { n: 'Jüpiter', size: 78, bg: 'repeating-linear-gradient(0deg,#D8A26A 0 8px,#F1D2A6 8px 14px)', f: 'En büyük gezegen. Dev bir fırtınası var: Büyük Kırmızı Leke.' },
  { n: 'Satürn', size: 66, bg: '#E9CD8B', f: 'Halkaları buz ve kaya parçalarından oluşur.', ring: true },
  { n: 'Uranüs', size: 56, bg: '#7FD8E0', f: 'Yan yatmış gibi döner!' },
  { n: 'Neptün', size: 54, bg: '#3E5FD8', f: 'En rüzgârlı gezegen. Rüzgârları çok hızlıdır.' }
];
DATA.HABITATS = [
  { id: 'okyanus', n: 'Okyanus', e: '🌊', c: 'var(--tint-ocean)', a: [['🐙', 'Ahtapot'], ['🐬', 'Yunus'], ['🐢', 'Deniz kaplumbağası'], ['🦈', 'Köpekbalığı']] },
  { id: 'kutup', n: 'Kutup', e: '❄️', c: 'var(--tint-sky)', a: [['🐧', 'Penguen'], ['🦭', 'Fok'], ['🐻‍❄️', 'Kutup ayısı']] },
  { id: 'orman', n: 'Orman', e: '🌳', c: 'var(--tint-leaf)', a: [['🦉', 'Baykuş'], ['🐿️', 'Sincap'], ['🦊', 'Tilki'], ['🦌', 'Geyik']] },
  { id: 'col', n: 'Çöl', e: '🏜️', c: 'var(--tint-sun)', a: [['🐪', 'Deve'], ['🦂', 'Akrep'], ['🦎', 'Kertenkele']] },
  { id: 'savan', n: 'Savan', e: '🦒', c: 'var(--tint-horn)', a: [['🦁', 'Aslan'], ['🦓', 'Zebra'], ['🐘', 'Fil']] }
];
DATA.CASES = [
  { id: 'kurabiye', title: 'Kayıp Kurabiyeler', e: '🍪', bg: 'linear-gradient(#FFE9C7 0 62%,#E4B98A 62%)',
    intro: 'Kechy\'nin fırından yeni çıkan kurabiyeleri kayboldu! Mutfağı incele ve ipuçlarını topla.',
    spots: [['🧺', 18, 70, '3', 'Sepette kırıntılar var. Kırıntıların yanında bir “3” yazıyor!'], ['🪴', 40, 50, null, 'Sadece toprak ve yeşil yapraklar.'], ['🧊', 82, 45, 'K', 'Buzdolabının kapağında mıknatıslı bir “K” harfi var.'], ['🐾', 60, 82, '🐾', 'Yerde minik pati izleri!'], ['📻', 30, 28, null, 'Radyoda neşeli bir şarkı çalıyor.']],
    order: 'Sayı, sonra harf, sonra iz.', code: ['3', 'K', '🐾'],
    solve: 'Kurabiyeleri Momo almış! Ama yemek için değil: bahçedeki kuşlara ikram etmek için. Kechy çok sevindi.' },
  { id: 'kitap', title: 'Luna\'nın Kitabı Nerede?', e: '📚', bg: 'linear-gradient(#DCD2F7 0 60%,#9C7B5A 60%)',
    intro: 'Luna en sevdiği masal kitabını bulamıyor. Kütüphanede ipuçlarını ara!',
    spots: [['🕯️', 20, 40, '7', 'Mumun dibinde minik bir “7” çizilmiş.'], ['📖', 45, 30, 'L', 'Rafta “L” harfiyle işaretlenmiş boş bir yer var.'], ['🪑', 70, 75, null, 'Sandalyenin üstünde sadece bir yastık var.'], ['🌙', 84, 24, '🌙', 'Pencereden Ay görünüyor. Pencere pervazında bir işaret var!'], ['🗄️', 30, 78, null, 'Çekmecede kalemler ve silgiler.']],
    order: 'Sayı, harf, sonra gökyüzündeki işaret.', code: ['7', 'L', '🌙'],
    solve: 'Kitap pencerenin kenarındaymış! Luna dün gece Ay\'ı izlerken orada unutmuş.' },
  { id: 'pil', title: 'Robo\'nun Kayıp Pili', e: '🔋', bg: 'linear-gradient(#CFE3EE 0 60%,#8A9BAA 60%)',
    intro: 'Robo\'nun yedek pili kayboldu, enerjisi azalıyor! Atölyede ipucu ara.',
    spots: [['🧰', 22, 72, '5', 'Alet çantasının kapağında “5” yazıyor.'], ['🔌', 48, 40, null, 'Priz boş, kablo yok.'], ['🦾', 72, 58, 'R', 'Robot kolunun üstünde “R” harfi parlıyor.'], ['⭐', 86, 22, '⭐', 'Duvardaki posterde büyük bir yıldız var!'], ['🪜', 12, 36, null, 'Merdivenin basamakları tozlu.']],
    order: 'Sayı, harf, sonra şekil.', code: ['5', 'R', '⭐'],
    solve: 'Pil, Robo\'nun kendi göğüs cebindeymiş! Robo biraz utandı ama çok güldü.' }
];
DATA.KEYPAD = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'K', 'E', 'C', 'H', 'Y', 'L', 'R', '🔺', '⭐', '🐝', '🌙', '🤝', '🐾', '🍀'];
DATA.VAULT = [
  { code: ['K', 'E', 'C', 'H', 'Y'], title: 'Gizli Kechy Kartı', e: '🃏', text: 'Kechy\'nin sırrı: En sevdiği yiyecek kırmızı elmadır. Ama her zaman yarısını bir arkadaşıyla paylaşır!' },
  { code: ['🔺', '7', 'K', '🐝'], title: 'Gizli Hikâye: Kayıp Yıldız', e: '🌟', text: 'Kechy bir gece gökyüzünden düşen minik bir yıldız buldu. Yıldız korkmuştu. Kechy onu tepeye taşıdı ve birlikte şarkı söylediler. Yıldız cesaretini topladı ve yeniden gökyüzüne yükseldi. O gece gökyüzündeki en parlak yıldız, Kechy\'ye göz kırpıyordu.' },
  { code: ['🤝', '1', '2'], title: 'Arkadaşlık Kalkanı Kartı', e: '🛡️', text: 'Kalkanın üç gücü var: 1) Yalnız kalana “Gel, beraber oynayalım” de. 2) Kötü söz duyarsan “Bu doğru değil” de. 3) Güvendiğin bir büyüğe anlat. Sen de bir Arkadaşlık Kalkanısın!' }
];
DATA.SURPRISES = [
  { t: 'Uzay Çıkartması', e: '🚀', d: 'Pasaportuna parlak bir roket çıkartması.' },
  { t: 'Deniz Çıkartması', e: '🐳', d: 'Koleksiyonuna mavi balina çıkartması.' },
  { t: 'Dinozor Çıkartması', e: '🦕', d: 'Uzun boyunlu dinozor çıkartması.' },
  { t: 'Gökkuşağı Çıkartması', e: '🌈', d: 'Rengârenk gökkuşağı çıkartması.' },
  { t: 'Taç Çıkartması', e: '👑', d: 'Kechy Ustaları için altın taç.' },
  { t: 'Robot Çıkartması', e: '🤖', d: 'Robo\'dan bir çıkartma.' },
  { t: 'Baykuş Çıkartması', e: '🦉', d: 'Luna\'dan hikâye çıkartması.' },
  { t: 'Çiçek Çıkartması', e: '🌻', d: 'Güneş gibi bir ayçiçeği.' }
];

DATA.STORY = {
  heroes: [
    { e: '🐯', n: 'Kaplan Kiko', gen: 'Kaplan Kiko\'nun' }, { e: '🤖', n: 'Robot Bip', gen: 'Robot Bip\'in' },
    { e: '👧', n: 'Ada', gen: 'Ada\'nın' }, { e: '🐉', n: 'Ejderha Ateş', gen: 'Ejderha Ateş\'in' },
    { e: '🐐', n: 'Kechy', gen: 'Kechy\'nin' }, { e: '👦', n: 'Deniz', gen: 'Deniz\'in' }
  ],
  places: [
    { e: '🌕', n: 'Ay', dat: 'Ay\'a', loc: 'Ay\'da', desc: 'gri tozların arasında, Dünya uzakta mavi bir bilye gibi parlıyordu' },
    { e: '🏰', n: 'Kale', dat: 'eski kaleye', loc: 'eski kalede', desc: 'taş duvarlar yankılanıyor, bayraklar rüzgârda dalgalanıyordu' },
    { e: '🌊', n: 'Okyanus', dat: 'okyanusun derinliklerine', loc: 'okyanusun derinliklerinde', desc: 'renkli balıklar yanından geçiyor, mercanlar ışıl ışıl parlıyordu' },
    { e: '🌳', n: 'Orman', dat: 'sihirli ormana', loc: 'sihirli ormanda', desc: 'ağaçlar fısıldıyor, sincaplar dallarda koşturuyordu' },
    { e: '🏜️', n: 'Çöl', dat: 'altın çöle', loc: 'altın çölde', desc: 'kum tepeleri dalga gibi uzanıyor, develer yavaşça yürüyordu' },
    { e: '🏙️', n: 'Şehir', dat: 'uçan şehre', loc: 'uçan şehirde', desc: 'evler bulutların üstünde süzülüyor, balonlar pencerelere uğruyordu' }
  ],
  items: [
    { e: '🗝️', n: 'altın anahtar', acc: 'altın anahtarı' }, { e: '💎', n: 'parlayan taş', acc: 'parlayan taşı' },
    { e: '🗺️', n: 'eski harita', acc: 'eski haritayı' }, { e: '🥚', n: 'benekli yumurta', acc: 'benekli yumurtayı' },
    { e: '📦', n: 'gizemli kutu', acc: 'gizemli kutuyu' }
  ],
  friends: [
    { e: '🐧', n: 'penguen Pofi' }, { e: '🦉', n: 'baykuş Luna' }, { e: '🐭', n: 'minik fare Mino' }, { e: '🦜', n: 'papağan Piko' }
  ],
  lessons: [
    { e: '🤝', n: 'Yardımlaşma', end: 'O gün herkes öğrendi ki birlikte çalışınca en zor işler bile kolaylaşır.' },
    { e: '🦁', n: 'Cesaret', end: 'O gün öğrendi ki cesaret korkmamak değil, korksan da denemektir.' },
    { e: '💛', n: 'Paylaşmak', end: 'O gün öğrendi ki paylaşılan sevinç iki kat büyür.' },
    { e: '🔍', n: 'Merak', end: 'O gün öğrendi ki soru sormak, yeni dünyaların kapısını açar.' }
  ]
};

DATA.AUDIO_STORIES = [
  { id: 'yildiz', title: 'Kechy ve Kayıp Yıldız', e: '⭐', char: 'kechy', text: 'Bir gece Kechy tepede otururken gökyüzünden minik bir ışık düştü. Işık, çimenlerin arasında titriyordu. Kechy yaklaştı ve gördü ki bu küçücük bir yıldızdı. “Yolumu kaybettim” dedi yıldız. “Arkadaşlarım çok yukarıda.” Kechy düşündü. Sonra yıldızı nazikçe boynuzlarının arasına aldı ve tepenin en yüksek yerine tırmandı. Birlikte bir şarkı söylediler. Şarkı bittiğinde yıldız parladı, parladı ve yavaşça gökyüzüne yükseldi. O gece gökyüzündeki en parlak yıldız, Kechy\'ye göz kırpıyordu.' },
  { id: 'luna', title: 'Luna\'nın Gece Kütüphanesi', e: '🦉', char: 'luna', text: 'Luna her gece ormanın ortasındaki yaşlı meşe ağacında bir kütüphane açardı. Tavşanlar, sincaplar ve kirpiler gelir, Luna da onlara kitap okurdu. Bir gece küçük bir kirpi en arkada yalnız oturuyordu. “Neden öne gelmiyorsun?” diye sordu Luna. Kirpi utandı: “Dikenlerim herkesi rahatsız ediyor.” Luna gülümsedi ve yanına bir yastık koydu. “Burada herkese yer var” dedi. O gece kirpi en önde oturdu ve hikâyeyi en çok o sevdi.' },
  { id: 'robo', title: 'Robo Uyumayı Öğreniyor', e: '🤖', char: 'robo', text: 'Robo hiç uyumazdı. Gece gündüz bulmaca çözer, kod yazar, düğmelerine basardı. Bir gün ışıkları titremeye başladı. Mino onu inceledi ve güldü: “Robo, senin dinlenmen gerek!” Robo şaşırdı: “Robotlar da dinlenir mi?” “Herkes dinlenir” dedi Mino. O gece Robo ilk kez ışıklarını kıstı, pencereden yıldızlara baktı ve derin bir “bip” sesiyle uykuya daldı. Sabah uyandığında bulmacaları iki kat hızlı çözdü.' }
];
DATA.STORY_QUIZ = {
  yildiz: [['Kechy gökyüzünden düşen ışığın ne olduğunu gördü?', ['Bir ateş böceği', 'Küçük bir yıldız', 'Bir fener'], 1, 'Işık, yolunu kaybetmiş küçük bir yıldızdı.'],
    ['Kechy yıldıza yardım etmek için ne yaptı?', ['Onu evinde sakladı', 'Onu uyuttu', 'Onu tepenin en yüksek yerine taşıdı'], 2, 'Kechy yıldızı boynuzlarının arasına alıp tepeye tırmandı.'],
    ['Tepede birlikte ne yaptılar?', ['Şarkı söylediler', 'Top oynadılar', 'Resim çizdiler'], 0, 'Şarkı bitince yıldız parladı ve gökyüzüne yükseldi.']],
  luna: [['Luna kütüphanesini nerede açardı?', ['Okulda', 'Yaşlı meşe ağacında', 'Deniz kenarında'], 1, 'Luna her gece ormanın ortasındaki yaşlı meşe ağacında kitap okurdu.'],
    ['Küçük kirpi neden en arkada oturuyordu?', ['Dikenlerinin herkesi rahatsız ettiğini düşünüyordu', 'Uykusu vardı', 'Kitapları sevmiyordu'], 0, 'Kirpi utanıyordu. Luna ona yanında bir yer açtı.'],
    ['Luna kirpiye ne dedi?', ['Sessiz ol', 'Git buradan', 'Burada herkese yer var'], 2, 'Luna herkesin kütüphanede bir yeri olduğunu gösterdi.']],
  robo: [['Robo\'nun sorunu neydi?', ['Hiç uyumazdı', 'Çok yemek yerdi', 'Konuşamıyordu'], 0, 'Robo gece gündüz çalışıyordu ve ışıkları titremeye başladı.'],
    ['Robo\'ya dinlenmesi gerektiğini kim söyledi?', ['Piko', 'Mino', 'Luna'], 1, 'Mino, herkesin dinlenmeye ihtiyacı olduğunu söyledi.'],
    ['Robo uyuduktan sonra ne oldu?', ['Bozuldu', 'Uçmaya başladı', 'Bulmacaları iki kat hızlı çözdü'], 2, 'Dinlenmek beynimize de iyi gelir!']]
};
DATA.BOOK = [
  { ill: ['kechy', 'momo'], t: 'Kechy ile Momo her sabah okulun bahçesinde buluşurdu. Bir gün Momo çok sessizdi.' },
  { ill: ['momo'], expr: 'sleep', t: '“Ne oldu Momo?” diye sordu Kechy. Momo yere baktı: “Bazıları kulaklarımla dalga geçiyor. Beni oyunlarına almıyorlar.”' },
  { ill: ['kechy'], expr: 'wow', t: 'Kechy üzüldü. Sonra aklına Luna\'nın sözü geldi: “Zorbalık görürsen susma. Yanında dur ve bir büyüğe anlat.”' },
  { ill: ['kechy', 'momo', 'luna'], t: 'Kechy, Momo\'nun elini tuttu. Birlikte öğretmenleri Luna\'ya gittiler ve her şeyi anlattılar.' },
  { ill: ['piko', 'robo', 'mino'], t: 'Ertesi gün Piko, Robo ve Mino da geldi. “Momo, bizimle oynar mısın?” dediler. Oyun daha önce hiç bu kadar eğlenceli olmamıştı.' },
  { ill: ['kechy', 'momo', 'piko', 'luna', 'robo', 'mino'], expr: 'happy2', t: 'O günden sonra bahçede bir kural vardı: Kimse yalnız kalmaz. Sen de bir Arkadaşlık Kalkanı olabilirsin!' }
];

DATA.TV = [
  { id: 'deney', title: '1 Dakikada Deney: Yüzen Yumurta', cat: '🔬', bg: 'var(--tint-lilac)', scenes: [
    ['🥚💧', 'Bir bardak suya yumurta koyalım. Ne oldu? Battı!', 'a-drop'], ['🧂🥄', 'Şimdi suya altı kaşık tuz ekleyip karıştıralım.', 'a-spin'],
    ['🥚', 'Yumurtayı tekrar bırak. Bak, yüzüyor!', 'a-float'], ['🤔', 'Neden mi? Tuzlu su daha yoğundur, yumurtayı yukarı iter.', 'a-wiggle'],
    ['🏊', 'Bu yüzden insanlar Lut Gölü\'nde kolayca yüzer.', 'a-float'], ['🎉', 'Evde bir büyüğünle sen de dene!', 'a-pop']] },
  { id: 'japonya', title: '1 Dakikada Dünya: Japonya', cat: '🌍', bg: 'var(--tint-berry)', scenes: [
    ['🇯🇵', 'Merhaba! Bugün Japonya\'dayız. Burada “merhaba” demek için “Konnichiwa” deriz.', 'a-pop'], ['🗾', 'Japonya binlerce adadan oluşur.', 'a-zoom'],
    ['🌸', 'Baharda kiraz çiçekleri her yeri pembeye boyar.', 'a-float'], ['🗻', 'En yüksek dağı Fuji\'dir. Aslında bir yanardağdır!', 'a-zoom'],
    ['🍣', 'Suşi, pirinç ve balıkla yapılan ünlü bir yemektir.', 'a-wiggle'], ['🎉', 'Haritada Japonya\'yı bul ve pasaportuna damga kazan!', 'a-pop']] },
  { id: 'ahtapot', title: 'İnanılmaz Hayvanlar: Ahtapot', cat: '🐘', bg: 'var(--tint-ocean)', scenes: [
    ['🐙', 'Bu bir ahtapot. Sekiz kolu var!', 'a-wiggle'], ['💙💙💙', 'Üç kalbi var ve kanı mavi!', 'a-pop'],
    ['🎨', 'Saklanmak için rengini değiştirebilir.', 'a-spin'], ['🫙', 'Kavanoz kapağını bile açabilir. Çok akıllıdır!', 'a-zoom'],
    ['🎉', 'Hayvanlar bölümünde daha fazla hayvan seni bekliyor.', 'a-pop']] },
  { id: 'bal', title: 'Bunu Biliyor muydun? Bal', cat: '🧠', bg: 'var(--tint-sun)', scenes: [
    ['🐝', 'Arılar çiçeklerden nektar toplar.', 'a-float'], ['🍯', 'Nektarı kovanda bala dönüştürürler.', 'a-drop'],
    ['🏺', 'Bal neredeyse hiç bozulmaz. Çok eski kaplarda bile yenebilir bal bulundu!', 'a-zoom'], ['🎉', 'Bugün birine bu bilgiyi anlat!', 'a-pop']] },
  { id: 'saka', title: 'Kechy Şakası', cat: '😂', bg: 'var(--tint-leaf)', scenes: [
    ['🧑‍🏫', 'Öğretmen sordu: “Suyun formülü nedir?”', 'a-pop'], ['🙋', 'Öğrenci cevap verdi: “H, I, J, K, L, M, N, O!”', 'a-wiggle'],
    ['🤔', '“Bu da ne?” “Siz H\'den O\'ya dediniz ya!”', 'a-zoom'], ['🐄🐄', 'İki inek konuşuyormuş. Biri “Möö” demiş. Diğeri: “Ben de tam onu diyecektim!”', 'a-wiggle'],
    ['😂', 'Hadi bu şakayı ailene anlat!', 'a-pop']] },
  { id: 'cizim', title: 'Beraber Çizelim: Kechy', cat: '🎨', bg: 'var(--tint-sky)', draw: true, scenes: [
    ['draw:1', 'Kâğıdını ve kalemini hazırla. Önce büyük bir oval çiz.'], ['draw:2', 'Şimdi yukarıya iki kıvrık boynuz ekle.'],
    ['draw:3', 'Yanlara iki uzun kulak çiz.'], ['draw:4', 'İki kocaman göz ekle.'], ['draw:5', 'Altına burun ve gülümseme çiz.'],
    ['draw:6', 'Harika! Şimdi Kechy\'ni boya. Boynuzları turuncu olsun!']] }
];

DATA.BADGES = [
  { id: 'hosgeldin', name: 'Hoş Geldin', emoji: '👋', color: '#1FA2B0', how: 'Kechy Pasaportunu oluştur.' },
  { id: 'ilk-soru', name: 'İlk Soru', emoji: '🧠', color: '#9A7FE0', how: 'Günün sorusunu cevapla.' },
  { id: 'soru-10', name: 'Bilgi Avcısı', emoji: '🎓', color: '#9A7FE0', how: '10 soru cevapla.' },
  { id: 'ilk-gorev', name: 'Görev Başladı', emoji: '🎯', color: '#E6508A', how: 'İlk görevini tamamla.' },
  { id: 'gorev-10', name: 'Görev Ustası', emoji: '🏅', color: '#E6508A', how: '10 görev tamamla.' },
  { id: 'kahraman', name: 'Günün Kahramanı', emoji: '🦸', color: '#FFC83A', how: 'Bir günde 4 etkinliğin hepsini bitir.' },
  { id: 'kasif-5', name: 'Genç Kaşif', emoji: '🧭', color: '#43AE5B', how: 'Haritada 5 ülke keşfet.' },
  { id: 'dunya-15', name: 'Dünya Gezgini', emoji: '🌍', color: '#43AE5B', how: '15 ülke keşfet.' },
  { id: 'oyuncu-5', name: 'Oyun Sever', emoji: '🎮', color: '#3C7DD9', how: '5 farklı oyunu bitir.' },
  { id: 'hafiza', name: 'Hafıza Şampiyonu', emoji: '🃏', color: '#3C7DD9', how: 'Hafıza oyununu zor seviyede bitir.' },
  { id: 'labirent', name: 'Yol Bulucu', emoji: '🌀', color: '#3C7DD9', how: '3 labirent çöz.' },
  { id: 'uzay', name: 'Astronot', emoji: '🚀', color: '#3D4FA8', how: 'Gezegenleri doğru sırala.' },
  { id: 'hayvan', name: 'Hayvan Dostu', emoji: '🐾', color: '#F2752B', how: 'Hayvan Kurtarma oyununu bitir.' },
  { id: 'bilmece', name: 'Bilmece Bilen', emoji: '🦜', color: '#43AE5B', how: '10 bilmece çöz.' },
  { id: 'dedektif', name: 'Dedektif', emoji: '🔍', color: '#1D2E42', c2: '#FFC83A', how: 'Bir dedektif vakasını çöz.' },
  { id: 'sifre', name: 'Şifre Kırıcı', emoji: '🔐', color: '#1D2E42', c2: '#FFC83A', how: 'Gizli Kasa\'yı aç.' },
  { id: 'sanatci', name: 'Küçük Sanatçı', emoji: '🎨', color: '#F2752B', how: 'İlk çizimini kaydet.' },
  { id: 'hikayeci', name: 'Hikâyeci', emoji: '✍️', color: '#E6508A', how: 'Hikâye Makinesi ile bir hikâye yaz.' },
  { id: 'bilimci', name: 'Bilim İnsanı', emoji: '🧪', color: '#9A7FE0', how: 'İlk deneyini yap.' },
  { id: 'okur', name: 'Kitap Kurdu', emoji: '📚', color: '#E6508A', how: '3 hikâye oku ya da dinle.' },
  { id: 'izleyici', name: 'Kechy TV', emoji: '📺', color: '#1FA2B0', how: '3 bölüm izle.' },
  { id: 'pazar', name: 'Pazar Kaşifi', emoji: '🎁', color: '#E6508A', how: 'Pazar Sürprizini aç.' },
  { id: 'kalkan', name: 'Arkadaşlık Kalkanı', emoji: '🛡️', color: '#1B8F9C', how: 'Kechy 12 mini kitabını bitir.' }
].concat(DATA.ISSUES.map(i => ({ id: 'sayi-' + i.n, name: 'Kechy ' + i.n + ' · ' + i.title, emoji: i.emoji, color: i.color, c2: '#FFC83A', how: 'Kechy ' + gen(i.n) + ' 5 sorusunu cevapla.', issue: i.n })));

DATA.NICK_A = ['Kechy', 'Neşeli', 'Meraklı', 'Cesur', 'Parlak', 'Minik', 'Uçan', 'Gülen', 'Hızlı', 'Bilge'];
DATA.NICK_B = ['Panda', 'Tilki', 'Kaplan', 'Penguen', 'Tavşan', 'Keçi', 'Baykuş', 'Yunus', 'Sincap', 'Kirpi'];
DATA.AV_BASES = [['goat', 'Keçi'], ['panda', 'Panda'], ['fox', 'Tilki'], ['tiger', 'Kaplan'], ['penguin', 'Penguen'], ['bunny', 'Tavşan'], ['cat', 'Van kedisi'], ['owl', 'Baykuş'], ['robot', 'Robot']];
DATA.AV_HATS = [['none', 'Yok'], ['kep', 'Kep'], ['tac', 'Taç'], ['bere', 'Bere'], ['sihirbaz', 'Sihirbaz'], ['cicek', 'Çiçek'], ['kulaklik', 'Kulaklık']];
DATA.AV_GLASSES = [['none', 'Yok'], ['yuvarlak', 'Yuvarlak'], ['gunes', 'Güneş'], ['kalp', 'Kalp'], ['gozluk', 'Bilimci']];
DATA.AV_SHIRTS = ['#1FA2B0', '#E6508A', '#FFC83A', '#43AE5B', '#9A7FE0', '#F2752B', '#3C7DD9', '#1D2E42'];

DATA.GALLERY = [
  { n: 'Ece', age: 9, t: 'Uçan evler şehri', seed: 11, kind: 'ucan' }, { n: 'Deniz', age: 10, t: 'Denizaltı şehri', seed: 23, kind: 'deniz' },
  { n: 'Lina', age: 8, t: 'Gökkuşağı mahallesi', seed: 37, kind: 'gokkusagi' }, { n: 'Emir', age: 7, t: 'Roketli şehir', seed: 41, kind: 'sehir' },
  { n: 'Zeynep', age: 11, t: 'Balonlu kasaba', seed: 59, kind: 'ucan' }, { n: 'Mert', age: 9, t: 'Mercan şehri', seed: 67, kind: 'deniz' }
];

DATA.GAMES = [
  { id: 'hafiza', t: 'Hafıza Kartları', e: '🃏', d: 'Eşleri bul, hafızanı güçlendir.', cat: 'beyin', bg: 'bg-sky', skill: 'Mantık' },
  { id: 'quiz', t: 'Kechy Bilgi Yarışması', e: '🧠', d: '8 soru, her cevapta yeni bir bilgi.', cat: 'beyin', bg: 'bg-lilac', skill: 'Bilgi' },
  { id: 'kelime', t: 'Kelime Avı', e: '🔤', d: 'Harflerin arasına saklanan kelimeleri bul.', cat: 'kelime', bg: 'bg-sun', skill: 'Okuma' },
  { id: 'labirent', t: 'Kechy Labirenti', e: '🌀', d: 'Kechy\'yi taze otlara ulaştır.', cat: 'beyin', bg: 'bg-leaf', skill: 'Mantık' },
  { id: 'yapboz', t: 'Kaydırmalı Yapboz', e: '🧩', d: 'Parçaları kaydır, resmi tamamla.', cat: 'beyin', bg: 'bg-horn', skill: 'Mantık' },
  { id: 'sudoku', t: 'Sudoku Kids', e: '🔢', d: '4x4 meyveli sudoku.', cat: 'beyin', bg: 'bg-berry', skill: 'Mantık', isNew: true },
  { id: 'fark', t: 'Farkı Bul', e: '🔍', d: 'İki resim arasındaki 5 farkı bul.', cat: 'beyin', bg: 'bg-ocean', skill: 'Dikkat' },
  { id: 'boyama', t: 'Boyama Kitabı', e: '🖍️', d: 'Dokun ve boya. Taşma derdi yok!', cat: 'sanat', bg: 'bg-berry', skill: 'Sanat' },
  { id: 'bilmece', t: 'Piko\'nun Bilmeceleri', e: '❓', d: 'Tahmin et, gül, öğren.', cat: 'kelime', bg: 'bg-leaf', skill: 'Okuma' },
  { id: 'ulke', t: 'Ülkeyi Bul', e: '🗺️', d: 'Bayrağa bak, ülkeyi tahmin et.', cat: 'kesif', bg: 'bg-sky', skill: 'Coğrafya' },
  { id: 'uzay', t: 'Kechy ile Uzaya Git', e: '🚀', d: 'Gezegenleri Güneş\'ten başlayarak sırala.', cat: 'kesif', bg: 'bg-lilac', skill: 'Bilim', isNew: true },
  { id: 'hayvan', t: 'Hayvan Kurtarma', e: '🐾', d: 'Her hayvanı kendi evine götür.', cat: 'kesif', bg: 'bg-horn', skill: 'Bilim', isNew: true },
  { id: 'dedektif', t: 'Kechy Dedektif', e: '🕵️', d: 'İpuçlarını topla, şifreyi çöz.', cat: 'beyin', bg: 'bg-sun', skill: 'Mantık', isNew: true },
  { id: 'harf', t: 'Harf Avı', e: '⏱️', d: '3 dakikada bir harfle başlayan 10 kelime.', cat: 'kelime', bg: 'bg-sky', skill: 'Okuma' }
];
DATA.DAILY_GAMES = ['hafiza', 'yapboz', 'labirent', 'kelime', 'sudoku', 'fark'];
