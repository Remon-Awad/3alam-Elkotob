// ==========================================
// 3alam El Kotob — script.js (ملف الجافاسكريبت الوحيد)
//// ==========================================
// 3alam El Kotob — script.js (ملف الجافاسكريبت الوحيد)
//
// الملف مقسوم تلات أجزاء:
//   1) الإعدادات: رقم الواتساب والإنستجرام
//   2) بيانات المكتبة: الكتب والأسعار والعروض  ← ده الجزء اللي بتعدّل فيه
//   3) الكود: بيبني الصفحة والسلة، مش محتاج تلمسه
// ==========================================


// ##########################################
// 1) الإعدادات
// ##########################################

// ====== إعدادات المكتبة (عدّلها براحتك) ======
const CONFIG = {
  // رقم الواتساب بالصيغة الدولية من غير + أو مسافات
  whatsappNumber: "201041471362",
  // رابط الإنستجرام، مثال: "https://instagram.com/yourpage"
  instagramUrl: "",
  // رابط موقعك بعد ما تنشره، مثال: "https://3alamelkotob.com/"
  // بيتحط في روابط المشاركة. لو سيبته فاضي بيستخدم رابط الصفحة الحالي.
  siteUrl: "",
  currency: "ج.م"
};


const PAGE_SIZE = 36;      // عدد الصفوف اللي بتظهر في كل مرة
const OFFERS_VISIBLE = 6;  // لازم يطابق nth-child(n+7) في style.css
const CART_KEY = "alam-el-kotob-cart";

// ##########################################
// 2) بيانات المكتبة (الكتب / الأسعار / العروض)
// ##########################################

// السعر العادي لأي كتاب
const DEFAULT_PRICE = 80;

// كتب ليها سعر مختلف عن العادي (اكتب اسم الكتاب زي ما هو في القوايم تحت)
const PRICE_OVERRIDES = {
  "فن اللامبالاة": 75,
  "العادات الذرية": 75,
  "أنتِ قوة مذهلة": 75,
  "قصص القرآن بالعامية": 75
};

// قسم "وصل حديثًا": الكتب لازم تكون موجودة في القوايم تحت
// author و desc اختياريين
const FEATURED_NEW = [
  {
    title: "فن اللامبالاة",
    author: "مارك مانسون",
    desc: "كتاب يساعدك تبص للحياة من زاوية مختلفة، وتفهم إيه اللي يستاهل اهتمامك فعلًا وإيه اللي ممكن تعدّيه ببساطة."
  },
  {
    title: "العادات الذرية",
    author: "جيمس كلير",
    desc: "إزاي العادات الصغيرة، لما تستمر عليها، تعمل فرق كبير جدًا مع الوقت: تبني عادات إيجابية وتتخلص من السيئة وتحسّن تركيزك."
  },
  { title: "أنتِ قوة مذهلة" },
  { title: "قصص القرآن بالعامية" }
];

// أسماء بتظهر للسلاسل بشكل أحسن (اختياري)
const SERIES_NAMES = {
  // مثال: "الاسم القديم": "الاسم اللي يظهر للزبون"
};

// ------------------------------------------
// الصور (اختيارية)
// حط الصور في فولدر اسمه images جنب index.html.
// - لأي كتاب أو سلسلة: اكتب اسمه زي ما هو في القوايم تحت، وبعده مسار الصورة.
// - للعروض: اكتب img: "images/اسم.jpg" جوه العرض نفسه (في BUNDLES).
// الكتاب أو العرض اللي من غير صورة بيظهر عادي بتصميمه الورقي،
// ولو مسار الصورة غلط الصورة بتختفي لوحدها من غير ما الصفحة تبوظ.
// ------------------------------------------
const IMAGES = {
  // كتب فردية
  "العادات الذرية": "images/El 3adat el zarrya.png",
  "أنتِ قوة مذهلة": "images/Enta qowah mozhela.jpeg",
  "فن اللامبالاة": "images/Fann el lamobalah.jpeg",
  "قصص القرآن بالعامية": "images/Qessas el qoran bel 3amya.jpeg",

  // سلاسل (اسم السلسلة)
  "قبل ان تبرد القهوة": "images/Selselat qabl an tabrod el qahwa el 4 agzaa.png",
};

// ------------------------------------------
// الأقسام والكتب
// كل سطر = كتاب. ممكن تلزق قايمة جديدة على طول.
// - التكرار بيتشال تلقائي.
// - "اسم 1" و"اسم 2" بيتجمعوا تلقائي في سلسلة.
// - "اسم كتاب (اسم الكاتب)" بيتجمع في سلسلة باسم الكاتب.
// ------------------------------------------
const CATEGORIES = [
  {
    id: "horror",
    name: "رعب وتشويق ومغامرات",
    icon: "🌄",
    color: ["#4a3326", "#2a1d15"],
    titles: `
اكتب حتى لا أنكسر
سكوربيوس 1
ست الحسن
لوز مر
عنب الثعلب
ذيل القط
مخالب القط
جمرة
في قلبي أنثى عبرية
ذكر شرقي منقرض
تروفانتس
صديقي السيكوباتي
جاز وروك
مينتو
متجر للقتلة
متجر دالجوت الأحلام 1
متجر دالجوت الأحلام 2
جومانة
الجساسة
السجيل
جريمة في رأس السيد هود
جثتان والثالثة عند قدمي
ذات الوشاح الوردي
جريمة السيدة ه
جريمة في ليلة ممطرة
جريمة العقار 47
رضا
النزيل
ظل النوم
ايكادولي
اوبال
امانوس
مملكة المرعبين
داو
ظل النعيم
مكتبة الكلمات المفقودة
انتخريستوس 1
القادمون
الهلكوت
عشيرة برهوت
حطمني
اعصني
طاغوت
حلوى الليمون السحرية
قواعد جارتين
أمواج اكما
دقات الشامو
أرض زيكولا
اماريتا
وادي الذئاب المنسية
واحة يعقوب
فتاة الياقة الزرقاء
خوف 1
خوف 2
خوف 3
لا تكن لطيفا أكثر من اللازم
صلاة الممسوس
هسيس
يحدث ليلا في الغرفة المغلقة
القربان
أبناء الليل
سرداب قصر البارون
دليل جدتي لقتل الأوغاد
خلف القهوة يتنفس القتلة
مخلوقات الليل 1
في حضرة الجان
الجزار
طريقة طبخ جثة في المنزل
انترستا 1
أنين
11:11
يأجوج ومأجوج
مدينة الموتى
العائد
المرتد
متجر دالجوت الأحلام
جثة لذيذة
لارسيا
دماء تتاروبيت
حاوي
شبكة العنكبوت
سعد الدباس
أرض القرابين
جحيم العابرين
أجيج
الغيهب
الانتهازي
الوليمة
ليلة ماطرة
النداء
لوكاندة بير الوطاويط
أذكار الموت
جثة في بيت طائر الدودو
مدرسة ميلر
حارة الجزار
قرية الشيخ
قصر الخواجة
قبل أن تبرد القهوة 1
قبل أن تبرد القهوة 2
قبل أن تبرد القهوة 3
قبل أن تبرد القهوة 4
جند ابنة الشيطان
ثم لم يبقَ أحد
العوسج 1
العوسج 2
نصف ميت
منزل أبو خطوة
أيام مع الباشا
نوح المذبوح
ابتسم فأنت ميت
نظرية الفستق 1
نظرية الفستق 2
السيدة التي حسبت نفسها سوسة
قريبا سيحل الظلام
وهج البنفسج 1
جريمة في قطار الشرق
سأرحل
سفاح الأزقة
لقاء مع كاتب رعب
ما يحدث خلف أبواب المشرحة
حارس المشرحة
في سبيل التاج
ماجدولين
لوكاندة الجن
كوضوح التوت
كوابيس قبل النوم 1
كوابيس قبل النوم 2
كوابيس قبل النوم 3
مشفى ليفان
مدينة الحب لا يسكنها العقلاء
أنت كل أشيائي الجميلة
ردني إليك
يوتوبيا
سر الغرفة 207
بعد ساعات العمل الرسمية
ستوكهولم
عندما يعزف الشيطان
ضريح عمر بن الجن
الزعفرانة
وقائع الجمعة الأخيرة
فارس الأندلس
فتى الأندلس
ربيع الأندلس
ارسس ١
ارسس ٢
آزر
إنهم يأتون ليلا
ليلة في ضيافة الكونت
نادر فودة 1
نادر فودة 2
نادر فودة 3
نادر فودة 4
نادر فودة 5
نادر فودة 6
نادر فودة 7
نادر فودة 8
نادر فودة 9
`
  },
  {
    id: "religious",
    name: "الكتب الدينية",
    icon: "🌸",
    color: ["#5f6b5a", "#37402f"],
    titles: `
رسائل من القرآن
رسائل من عمر بن الخطاب
رسائل من علي بن أبي طالب
رسائل من التابعين
السلام عليك يا صاحبي
ليطمئن قلبي
عندما التقيت عمر بن الخطاب
حديث المساء
حديث الصباح
للرجال فقط
الأرض بعد طوفان نوح
إدريس النبي
نطفة
قصص القرآن بالعامية
ما لا يسع المسلم جهله
ما لا يسع أطفال المسلمين جهله
لكنود
نبض
علمتني سورة يوسف
علمتني سورة البقرة
أسرار سورة البقرة
أسرار الدعاء
أنتِ أيضا صحابية
كوني صحابية
فاتتني صلاة
رقائق القرآن
الطريق إلى الله
مسلكيات
الماجريات
إن الله معنا
لأنك الله 1
لأنك الله 2
السجدة الأخيرة
أول مرة أحسن الظن
أول مرة أصلي
ولنا في الحلال لقاء
حوار مع صديقي الملحد
رحلتي من الشك إلى الإيمان
البسي واسع
قررت أن أخلع الحجاب
هكذا رأيت رسول الله
إن ربي لطيف
مفاتيح خزائن الله
من كل آية فكرة
أنا صاحبك القرآن
ندى تشتكي لعائشة
إلى المنكسرة قلوبهم
مع النبي
يوم في حياة النبي
على خطى الرسول
`
  },
  {
    id: "psychology",
    name: "علم النفس وتطوير الذات",
    icon: "💗",
    color: ["#7a4b45", "#4a2a26"],
    titles: `
الشوك والقرنفل
أفضل نسخة منك
التغيير يبدأ منك أنت
كن لنفسك كل شيء
كن الشخص الذي يجعلك سعيدا
30 يوم ضد الاكتئاب
كيف تعيش كل ساعة في يومك
عقدك النفسية سجنك الأبدي
فن الكلام
فن اللامبالاة
فن التعافي
فن التركيز والإنجاز
فن الذكاء الاجتماعي
فن التأثير في الآخرين
الحياة ليست رجلا
لن يكسرني رجل
تحت مسمى الرجولة
متعة أن تكون في العشرين
متعة أن تكون منتصف العمر
متعة أن تكون في الثلاثين
دع القلق وابدأ الحياة
الطريقة الأكثر فاعلية لإنجاز المهام
قوس قزح
فقاقيع
E. S. P
قهوة باليورانيوم
علاقات خطرة
استراحة نفسية
ما لا نبوح به
ما رواه البحر
فيتامينات نفسية
جلسات نفسية
مذكرات طبيب نفسي
لأننا لم نكن بخير
الخروج عن النص
الخروج عن النص من جديد
القلق هو العدو
كن قويا
مدينة الأقوياء
فكر كأنك طبيب نفسي
فكر وتصرف كأنك قط
كن أقوى من مشاعرك
50 سؤال في الحب
إلى ما لا نهاية
هادم الأساطير
ماذا لو
الهشاشة النفسية
المرونة النفسية
أنا مش فاهمني
استيقظ وعش
الذكاء العاطفي في التربية
التهذيب الإيجابي في تربية الأطفال
التهذيب الإيجابي من الألف إلى الياء
لا مكان للملل
نعمة الألم
10 معارك في الحياة
مبادئ التحليل النفسي
هرم بلا قمة
من الصفر
مميز بالأصفر
سأخبرك شيئا يجعلك سعيدا
ليلة حب
التجربة الفكرية لروح أمة
تعافيت
ضحكات كئيبة
كيف تكسب أصدقاء وتؤثر على الآخرين
اعرف وجهك الآخر
أحببت وغدا
أبي الذي أكره
الدحيح
الوحش الذي يسكنك يمكن أن يكون لطيفا
أول 20 ساعة
العادات السبع للمراهقين الأكثر فاعلية
اصنع وقت أكثر من المتاح
العادات الذرية
سيندرلا سيكرت
أنتِ قوة مذهلة
قوة عقلك الباطن
كيف تؤثر على الآخرين وتكسب أصدقاء
كلنا مرضى نفسيين
محاط بالحمقى
محاط بالمرضى النفسيين
توقف عن إرضاء الآخرين
توقف عن إهدار حياتك
الأب الغني والأب الفقير
السماح بالرحيل
نادي الخامسة صباحا
غصون البندق 1
غصون البندق 2
`
  },
  {
    id: "misc",
    name: "كتب وروايات متنوعة",
    icon: "📍",
    color: ["#a07a4a", "#6b4c27"],
    titles: `
خبايا 2
خبايا 3
خبايا 4
خبايا 5
عائد إلى حيفا
أم سعد
24 ساعة صحة
الصهيونية العالمية
ابن سينا
أفيون الشعوب
عن وطن لحم ودم
فن الحرب
فن أن تكون دائما على صواب
على أجنحة العصافير
عن شيء اسمه الحب
الخيميائي
الليالي البيضاء
الجريمة والعقاب 1
الجريمة والعقاب 2
صاحب الظل الطويل
مغامرة صندوق الشوكولاتة (أجاثا كريستي)
لغز سرقة سند المليون دولار (أجاثا كريستي)
لغز الوصية المفقودة (أجاثا كريستي)
مغامرة النجم الغربي (أجاثا كريستي)
لغز نزل الصياد (أجاثا كريستي)
مغامرة النبيل الإيطالي (أجاثا كريستي)
مغامرة المقبرة المصرية (أجاثا كريستي)
لغز اختطاف رئيس الوزراء (أجاثا كريستي)
حادثة حفلة النصر (أجاثا كريستي)
الدليل المزدوج (أجاثا كريستي)
مغامرة العميل المرموق (شيرلوك هولمز)
مغامرة الجندي الشاحب (شيرلوك هولمز)
مغامرة بذور البرتقال (شيرلوك هولمز)
لغز الوجه الأصفر (شيرلوك هولمز)
لغز مدرسة الدير (شيرلوك هولمز)
لغز قدم الشيطان (شيرلوك هولمز)
لغز تماثيل نابليون (شيرلوك هولمز)
مغامرات بيتر الأسود (شيرلوك هولمز)
مغامرة النزيلة الملثمة (شيرلوك هولمز)
لغز الصندوق الورقي (شيرلوك هولمز)
مغامرة الياقوتة الزرقاء (شيرلوك هولمز)
لغز جلوريا سكوت (شيرلوك هولمز)
وثائق المعاهدة البحرية (شيرلوك هولمز)
لغز الرجال الراقصين (شيرلوك هولمز)
مغامرة الرجل ذي الشفاه الملتوية (شيرلوك هولمز)
`
  }
];

// ------------------------------------------
// العروض
// items: أسماء الكتب (لازم تطابق القوايم فوق)
// was:   السعر قبل الخصم (لو مش مكتوب بيتحسب من أسعار الكتب)
// note:  سطر توضيحي، gift: هدية مع العرض
// img:   صورة العرض (اختياري)، مثال: img: "images/offer.jpg"
// ------------------------------------------
const BUNDLES = [
  {
    id: "mirna-mahdy",
    img: "images/Selselat nooh el alfy el 5 agzaa w ma3ahom sadeeqy el psychopath.png",
    title: "مجموعة ميرنا المهدي",
    price: 300,
    items: ["سلسلة نوح الألفي (٥ أجزاء)", "صديقي السيكوباتي"]
  },
  {
    id: "selfdev-1",
    img: "images/Mo7at bel marda El 3adat 3odak el nafsya Kon lenafsak.png",
    title: "باقة تطوير الذات",
    price: 220,
    items: ["محاط بالمرضى النفسيين", "العادات الذرية", "عقدك النفسية سجنك الأبدي", "كن لنفسك كل شيء"]
  },
  {
    id: "selfdev-2",
    img: "images/Fann el embalah Mo7at bel 7omqa Mo7at bel marda el nafsyeen Fann el kalam.png",
    title: "باقة مهارات التعامل مع الناس",
    price: 220,
    items: ["فن اللامبالاة", "محاط بالحمقى", "محاط بالمرضى النفسيين", "فن الكلام"]
  },
  {
    id: "mix-narcissism",
    img: "images/Lan yeksarny ragol Ahbabt wogdan Fann en tkoon Fakker ka2annak tabeeb nafsy.png",
    title: "باقة العلاقات والوعي النفسي",
    price: 220,
    items: ["لن يكسرني رجل", "أحببت وغدا", "فن أن تكون دائما على صواب", "فكر كأنك طبيب نفسي"]
  },
  {
    id: "selfdev-bomb",
    img: "images/El ab el ghany wel ab el faqeer Ahbabt w ghadat Aby elli akrah Nady teshtaky le 3aisha.png",
    title: "باقة النضج الشخصي",
    price: 220,
    items: ["الأب الغني والأب الفقير", "أبي الذي أكره", "أحببت وغدا", "ندى تشتكي لعائشة"]
  },
  {
    id: "four-sweets",
    img: "images/Gamra Hasees Saffah el azqa Sa3ad el dabbas.png",
    title: "باقة الرعب والتشويق ١",
    price: 220,
    items: ["جمرة", "هسيس", "سفاح الأزقة", "سعد الدباس"]
  },
  {
    id: "four-sweets-2",
    img: "images/Wahat el ya3qoub Nooh el madbooh Lela fe deyafet el kont Lekaa ma3 kateb ro3b.jpeg",
    title: "باقة الرعب والتشويق ٢",
    price: 220,
    items: ["واحة يعقوب", "نوح المذبوح", "ليلة في ضيافة الكونت", "لقاء مع كاتب رعب"]
  },
  {
    id: "noha-daoud",
    img: "images/Satan wel thaltha 3end qadamy Gareemat el 3aqar 47 Zat el weshah el wardy.png",
    title: "مجموعة نهى داوود",
    price: 200,
    items: ["جثتان والثالثة عند قدمي", "جريمة العقار 47", "ذات الوشاح الوردي"]
  },
  {
    id: "al-hamdan",
    img: "images/Resis 1 Resis 2 Azer.png",
    title: "مجموعة آل حمدان",
    price: 200,
    items: ["ارسس ١", "ارسس ٢", "آزر"]
  },
  {
    id: "khawf",
    img: "images/Package Khouf 1 2 3.png",
    title: "سلسلة خوف",
    price: 200,
    items: ["خوف 1", "خوف 2", "خوف 3"]
  },
  {
    id: "zikola",
    img: "images/Selselat ard zikola el 3 agzaa Lekaa ma3 kateb ro3b hedaya.png",
    title: "سلسلة أرض زيكولا",
    price: 220,
    note: "٣ أجزاء",
    gift: { title: "لقاء مع كاتب رعب", note: "متاح استبداله" }
  },
  {
    id: "mamlakat-ashrar",
    img: "images/Selselat mamlakat el ashrar el 3 agzaa.png",
    title: "سلسلة مملكة الأشرار",
    price: 250,
    note: "٣ أجزاء"
  },
  {
    id: "ektob",
    img: "images/Package Aktob.png",
    title: "سلسلة اكتب",
    price: 275,
    note: "السلسلة كاملة"
  },
  {
    id: "noh-alalfy",
    img: "images/Selselet Nouh Elalfi 6 agzaa.png",
    title: "سلسلة نوح الألفي",
    price: 400,
    was: 500,
    note: "٦ أجزاء"
  },
  {
    id: "amr-abdelhamid",
    img: "images/Mento Ard zikola Amareta Wady el zeeb el mansya Qwa3ed garten Amwag akma Daqat el shamo Wahat el ya3qoub.png",
    title: "مجموعة عمرو عبدالحميد",
    price: 450,
    was: 800,
    items: [
      "مينتو", "أرض زيكولا", "اماريتا", "وادي الذئاب المنسية",
      "قواعد جارتين", "أمواج اكما", "دقات الشامو", "واحة يعقوب"
    ]
  }
];

// ------------------------------------------
// آراء القرّاء (فاضية دلوقتي، والقسم بيختفي لحد ما تضيف آراء حقيقية)
// مثال: { text: "الكتب وصلت بسرعة", name: "اسم الزبون" }
// ------------------------------------------
const REVIEWS = [];


// ##########################################
// 3) الكود (مش محتاج تلمسه)
// ##########################################

// ====== أدوات ======
const $ = id => document.getElementById(id);
const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)");
const fmt = n => n.toLocaleString("ar-EG") + " " + CONFIG.currency;
const num = n => n.toLocaleString("ar-EG");
const esc = s => String(s).replace(/[&<>"']/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// توحيد الكتابة العربية عشان البحث ما يتأثرش بالهمزات والتاء المربوطة وغيرها
function norm(s) {
  return String(s)
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

const parseList = text => text.split("\n").map(s => s.trim()).filter(Boolean);

function countLabel(n, kind) {
  const w = kind === "author" ? ["كتاب", "كتابين", "كتب"] : ["جزء", "جزءين", "أجزاء"];
  if (n === 2) return w[1];
  return num(n) + " " + (n <= 10 ? w[2] : w[0]);
}

// ==========================================
// بناء الكتالوج من قسم البيانات
// ==========================================
const ITEMS = {};        // كل حاجة تنفع تتحط في السلة (كتاب / سلسلة / عرض)
const books = [];        // الكتب الفردية
const bookByKey = {};
const catById = {};
const rowsByCat = {};
const seenKeys = new Set();

// روابط مباشرة: كل كتاب / سلسلة / عرض ليه slug قصير وثابت (مبني على اسمه)
const BY_SLUG = {};
function shortHash(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
  return h.toString(36);
}
function regSlug(it, prefix, raw, plain) {
  let s = prefix + "-" + (plain ? raw : shortHash(raw));
  while (BY_SLUG[s]) s += "x";
  it.slug = s;
  BY_SLUG[s] = it;
}

const priceOverrides = {};
Object.keys(PRICE_OVERRIDES).forEach(t => { priceOverrides[norm(t)] = PRICE_OVERRIDES[t]; });

const imageByKey = {};
Object.keys(IMAGES).forEach(t => { imageByKey[norm(t)] = IMAGES[t]; });

CATEGORIES.forEach(cat => {
  catById[cat.id] = cat;
  cat.books = [];
  parseList(cat.titles).forEach(raw => {
    let title = raw, tag = "";
    const tm = raw.match(/^(.*?)\s*\(\s*([^)]+?)\s*\)\s*$/);
    if (tm && tm[1].trim()) { title = tm[1].trim(); tag = tm[2].trim(); }

    const key = norm(title);
    if (!key || seenKeys.has(key)) return;   // تكرار
    seenKeys.add(key);

    const nm = title.match(/^(.*?\S)\s+([0-9٠-٩]+)$/);
    const book = {
      type: "book",
      id: "b:" + key,
      key,
      title,
      tag,
      cat: cat.id,
      base: nm ? nm[1] : "",
      num: nm ? parseInt(norm(nm[2]), 10) : 0,
      price: priceOverrides[key] !== undefined ? priceOverrides[key] : DEFAULT_PRICE,
      series: null
    };
    book.search = norm(title + " " + tag);
    book.img = imageByKey[key] || "";
    regSlug(book, "b", key);
    books.push(book);
    cat.books.push(book);
    bookByKey[key] = book;
    ITEMS[book.id] = book;
  });
});

// تجميع الأجزاء في سلاسل
function buildRows(cat) {
  const gkey = b => b.tag ? "t:" + norm(b.tag) : b.base ? "n:" + norm(b.base) : "";
  const groups = new Map();

  cat.books.forEach(b => {
    const g = gkey(b);
    if (!g) return;
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g).push(b);
  });
  // كتاب من غير رقم اسمه نفس اسم السلسلة بيتضم ليها
  cat.books.forEach(b => {
    if (gkey(b)) return;
    const g = "n:" + b.key;
    if (groups.has(g)) groups.get(g).push(b);
  });

  const rows = [];
  const done = new Set();
  cat.books.forEach(b => {
    const g = gkey(b) || "n:" + b.key;
    const members = groups.get(g);
    if (members && members.length >= 2) {
      if (done.has(g)) return;
      done.add(g);
      rows.push(makeSeries(g, members, cat));
    } else {
      rows.push(b);
    }
  });
  return rows;
}

function makeSeries(g, members, cat) {
  const isAuthor = g.startsWith("t:");
  const parts = isAuthor ? members : members.slice().sort((a, b) => a.num - b.num);
  const raw = isAuthor ? parts[0].tag : (parts.find(p => p.base) || parts[0]).base;
  const name = SERIES_NAMES[raw] || raw;
  const kind = isAuthor ? "author" : "numbered";
  const s = {
    type: "series",
    id: "s:" + g,
    title: name,
    label: name + " (" + countLabel(parts.length, kind) + ")",
    cat: cat.id,
    kind,
    parts,
    price: parts.reduce((t, p) => t + p.price, 0),
    img: imageByKey[norm(name)] || imageByKey[norm(raw)] || ""
  };
  parts.forEach(p => { p.series = s; p.search = norm(p.search + " " + name); });
  regSlug(s, "s", g);
  ITEMS[s.id] = s;
  return s;
}

CATEGORIES.forEach(cat => { rowsByCat[cat.id] = buildRows(cat); });
const seriesCount = CATEGORIES.reduce((t, c) => t + rowsByCat[c.id].filter(r => r.type === "series").length, 0);

// العروض
const bundles = BUNDLES.map(b => {
  const parts = (b.items || []).map(t => {
    const bk = bookByKey[norm(t)];
    return { title: bk ? bk.title : t, price: bk ? bk.price : DEFAULT_PRICE };
  });
  const sum = parts.reduce((t, p) => t + p.price, 0);
  const was = b.was !== undefined ? b.was : (parts.length >= 2 ? sum : 0);
  const o = {
    type: "bundle",
    id: "o:" + b.id,
    title: b.title,
    price: b.price,
    was: was > b.price ? was : 0,
    parts,
    note: b.note || "",
    gift: b.gift || null,
    img: b.img || ""
  };
  regSlug(o, "o", b.id, true);
  ITEMS[o.id] = o;
  return o;
});

// ====== UI ======

// ====== الصور (اختيارية) ======
const encodePath = p => p.split("/").map(encodeURIComponent).join("/");
const imgTag = (src, cls = "") => src
  ? `<img ${cls ? `class="${cls}" ` : ""}src="${esc(encodePath(src))}" alt="" loading="lazy" onerror="imgFail(this)">` : "";
const thumbHTML = src => src
  ? `<div class="thumb" data-img="box">${imgTag(src)}</div>` : "";

// ====== زرار المشاركة ======
const SHARE_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>';
const WA_SVG = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4a12 12 0 0 0-10.3 18.1L4 28l6.1-1.6A12 12 0 1 0 16 4Z" fill="#fff"/><path d="M11.5 11.5c.2-1.2.9-1.8 1.6-1.8l1.3 2.9-1.1 1.2c.9 1.9 2.4 3.2 4.2 4.1l1.2-1.1 2.9 1.3c-.1.8-.7 1.5-1.8 1.7-4.3.5-8.9-3.8-8.3-8.3Z" fill="#128c7e"/></svg>';
const shareBtn = (it, extra = "") =>
  `<button class="share-btn${extra ? " " + extra : ""}" data-share="${esc(it.id)}" aria-label="شارك ${esc(it.title)}" title="مشاركة">${SHARE_SVG}</button>`;

// لو الصورة مش لاقياها: بنشيلها ويرجع التصميم الورقي من غير صورة
function imgFail(img) {
  const box = img.closest("[data-img]");
  if (box && box.dataset.img === "box") {
    const card = box.closest(".offer");
    if (card) card.classList.remove("has-pic");
    box.remove();
    return;
  }
  if (box) box.classList.remove("has-img");
  img.remove();
}

// ==========================================
// عرض العروض
// ==========================================
const OFFER_ITEMS_SHOWN = 4; // عدد الكتب اللي بتظهر في الكارت، والباقي بيتفتح بزرار

function offerItemsHTML(parts) {
  if (!parts.length) return "";
  const li = p => `<li>${esc(p.title)}</li>`;
  const head = `<ul class="offer-items">${parts.slice(0, OFFER_ITEMS_SHOWN).map(li).join("")}</ul>`;
  const rest = parts.slice(OFFER_ITEMS_SHOWN);
  if (!rest.length) return head;
  return `${head}
        <div class="offer-more"><ul class="offer-items">${rest.map(li).join("")}</ul></div>
        <button class="items-toggle" aria-expanded="false">عرض باقي الكتب (${num(rest.length)}) <span class="chev" aria-hidden="true">⌄</span></button>`;
}

function offerHTML(o) {
  const pct = o.was ? Math.round((o.was - o.price) / o.was * 100) : 0;
  const badge = o.was
    ? `<span class="offer-badge save">وفّر ${fmt(o.was - o.price)}</span>`
    : `<span class="offer-badge plain">عرض</span>`;
  const note = o.note ? `<p class="offer-note">${esc(o.note)}</p>` : "";
  const gift = o.gift
    ? `<div class="offer-gift">🎁 هدية: ${esc(o.gift.title)}${o.gift.note ? " (" + esc(o.gift.note) + ")" : ""}</div>` : "";
  const was = o.was ? `<s class="offer-was">${fmt(o.was)}</s>` : "";
  const pctChip = o.was ? `<span class="pct">خصم ${num(pct)}٪</span>` : "";
  const pic = o.img
    ? `<div class="offer-img" data-img="box">${imgTag(o.img, "offer-bg")}${imgTag(o.img)}</div>` : "";
  return `
    <article class="offer${o.img ? " has-pic" : ""}">
      ${shareBtn(o, "share-float")}
      ${pic}
      <div class="offer-top">
        ${badge}
        <h3>${esc(o.title)}</h3>
        ${offerItemsHTML(o.parts)}${note}${gift}
      </div>
      <div class="offer-bottom">
        <div class="offer-price"><div class="offer-now"><strong>${fmt(o.price)}</strong>${pctChip}</div>${was}</div>
        <button class="add" data-add="${esc(o.id)}">أضف العرض</button>
      </div>
    </article>`;
}

function renderOffers() {
  const grid = $("offersGrid");
  const more = $("moreOffers");
  grid.innerHTML = bundles.map(offerHTML).join("");
  if (bundles.length > OFFERS_VISIBLE) {
    grid.classList.add("collapsed");
    more.hidden = false;
    more.textContent = `عرض كل العروض (${num(bundles.length)})`;
    more.onclick = () => {
      const collapsed = grid.classList.toggle("collapsed");
      more.textContent = collapsed ? `عرض كل العروض (${num(bundles.length)})` : "عرض أقل";
    };
  } else {
    more.hidden = true;
  }
}

// ==========================================
// وصل حديثًا
// ==========================================
function renderNew() {
  const cards = FEATURED_NEW.map(f => {
    const b = bookByKey[norm(f.title)];
    if (!b) return "";
    const c = catById[b.cat].color;
    const img = f.img || b.img;
    return `
      <article class="card">
        <div class="cover${img ? " has-img" : ""}" data-img="cover" style="--c1:${c[0]};--c2:${c[1]}"><span class="cover-title">${esc(b.title)}</span>${imgTag(img)}</div>
        <div class="card-body">
          <h3>${esc(b.title)}</h3>
          ${f.author ? `<div class="author">${esc(f.author)}</div>` : ""}
          ${f.desc ? `<p class="card-desc">${esc(f.desc)}</p>` : ""}
          <div class="card-foot">
            <span class="price">${fmt(b.price)}</span>
            <div class="offer-actions">
              ${shareBtn(b)}
              <button class="add" data-add="${esc(b.id)}">أضف للسلة</button>
            </div>
          </div>
        </div>
      </article>`;
  }).join("");
  if (!cards.trim()) { $("new").hidden = true; return; }
  $("newGrid").innerHTML = cards;
}

// ==========================================
// الأقسام
// ==========================================
function renderCategories() {
  $("catGrid").innerHTML = CATEGORIES.map(c => `
    <button class="cat-tile" data-cat="${c.id}" style="--cat-bg:linear-gradient(90deg,${c.color[0]},${c.color[1]})">
      <span class="ic" aria-hidden="true">${c.icon}</span>
      <h3>${esc(c.name)}</h3>
      <span class="n">${num(c.books.length)} كتاب</span>
    </button>`).join("");
}

function renderTabs() {
  const tabs = [{ id: "all", name: "الكل", n: books.length },
    ...CATEGORIES.map(c => ({ id: c.id, name: c.name, n: c.books.length }))];
  $("tabs").innerHTML = tabs.map(t =>
    `<button class="chip ${t.id === state.cat ? "active" : ""}" data-cat="${t.id}">${esc(t.name)} <small>${num(t.n)}</small></button>`
  ).join("");
}

// ==========================================
// كل الكتب (بحث + أقسام + عرض المزيد)
// ==========================================
const state = { cat: "all", q: "" };
let currentRows = [];
let renderedCount = 0;

function computeRows() {
  const tokens = norm(state.q).split(" ").filter(Boolean);
  if (tokens.length) {
    const pool = state.cat === "all" ? books : books.filter(b => b.cat === state.cat);
    return pool.filter(b => tokens.every(t => b.search.includes(t)));
  }
  if (state.cat === "all") return CATEGORIES.reduce((all, c) => all.concat(rowsByCat[c.id]), []);
  return rowsByCat[state.cat];
}

const priceTag = b => b.price !== DEFAULT_PRICE ? `<span class="row-price">${fmt(b.price)}</span>` : "";

function bookRowHTML(b) {
  const sub = b.series ? `<div class="row-sub">${esc(b.series.title)}</div>` : "";
  return `
    <div class="row" style="--cat-bg:${catById[b.cat].color[0]}">
      ${thumbHTML(b.img)}
      <div class="row-main"><div class="row-title">${esc(b.title)}</div>${sub}</div>
      ${priceTag(b)}
      ${shareBtn(b)}
      <span class="row-count" data-count-for="${esc(b.id)}"></span>
      <button class="add-sm" data-add="${esc(b.id)}" aria-label="أضف ${esc(b.title)}">+</button>
    </div>`;
}

function seriesRowHTML(s) {
  const parts = s.parts.map(p => `
    <div class="part">
      <span class="part-title">${esc(p.title)}</span>
      ${priceTag(p)}
      <span class="row-count" data-count-for="${esc(p.id)}"></span>
      <button class="add-sm" data-add="${esc(p.id)}" aria-label="أضف ${esc(p.title)}">+</button>
    </div>`).join("");
  return `
    <div class="row series" style="--cat-bg:${catById[s.cat].color[0]}">
      ${thumbHTML(s.img)}
      <div class="row-main">
        <div class="row-title">${esc(s.title)}</div>
        <div class="row-sub">سلسلة، ${countLabel(s.parts.length, s.kind)}</div>
      </div>
      <span class="row-price">${fmt(s.price)}</span>
      ${shareBtn(s)}
      <button class="toggle" aria-expanded="false">الأجزاء <span class="chev" aria-hidden="true">⌄</span></button>
      <span class="row-count" data-count-for="${esc(s.id)}"></span>
      <button class="add" data-add="${esc(s.id)}">أضف الكل</button>
      <div class="parts"><div class="parts-inner">${parts}</div></div>
    </div>`;
}

const rowHTML = r => r.type === "series" ? seriesRowHTML(r) : bookRowHTML(r);
const rowBookCount = rows => rows.reduce((n, r) => n + (r.type === "series" ? r.parts.length : 1), 0);

function emptyHTML() {
  const wa = CONFIG.whatsappNumber
    ? `<a class="btn ghost" target="_blank" rel="noopener" href="https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent("عايز أسأل عن كتاب: " + state.q)}">اسأل عنه على واتساب</a>` : "";
  return `<div class="empty-list"><p>مفيش نتيجة لـ «${esc(state.q)}»</p><p>جرّب كلمة تانية، أو اسأل عن الكتاب مباشرة.</p>${wa}</div>`;
}

function updateMeta() {
  const n = rowBookCount(currentRows);
  const catName = state.cat === "all" ? "كل الأقسام" : catById[state.cat].name;
  $("resultMeta").textContent = state.q.trim()
    ? `${num(n)} نتيجة`
    : `${catName}: ${num(n)} كتاب`;
}

function appendRows() {
  const list = $("list");
  const more = $("moreBooks");
  if (!currentRows.length) {
    list.innerHTML = emptyHTML();
    more.hidden = true;
    return;
  }
  const next = currentRows.slice(renderedCount, renderedCount + PAGE_SIZE);
  list.insertAdjacentHTML("beforeend", next.map(rowHTML).join(""));
  renderedCount += next.length;
  updateCounts();
  const left = currentRows.length - renderedCount;
  more.hidden = left <= 0;
  more.textContent = `عرض المزيد (${num(left)})`;
}

function renderList() {
  currentRows = computeRows();
  renderedCount = 0;
  $("list").innerHTML = "";
  appendRows();
  updateMeta();
}

let swapTimer;
function setCategory(id, scroll) {
  const changed = id !== state.cat;
  state.cat = id;
  $("tabs").querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c.dataset.cat === id));
  if (scroll) {
    $("books").scrollIntoView({ behavior: prefersReduced.matches ? "auto" : "smooth", block: "start" });
  }
  if (!changed) return;
  clearTimeout(swapTimer);
  if (prefersReduced.matches) { renderList(); return; }
  const list = $("list");
  list.classList.add("is-swapping");
  swapTimer = setTimeout(() => {
    renderList();
    list.classList.remove("is-swapping");
  }, 280);
}

let searchTimer;
$("search").addEventListener("input", e => {
  state.q = e.target.value;
  clearTimeout(searchTimer);
  searchTimer = setTimeout(renderList, 120);
});
$("moreBooks").onclick = appendRows;

// ==========================================
// السلة
// ==========================================
function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) || "{}");
    const c = {};
    Object.keys(saved).forEach(id => { if (ITEMS[id] && saved[id] > 0) c[id] = saved[id]; });
    return c;
  } catch (err) {
    return {};
  }
}
function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (err) { /* مش مشكلة */ }
}

let cart = loadCart();

function cartTotal() {
  return Object.keys(cart).reduce((t, id) => t + ITEMS[id].price * cart[id], 0);
}

function itemSub(it) {
  if (it.type === "series") return "سلسلة، " + countLabel(it.parts.length, it.kind);
  if (it.type === "bundle") return it.was ? "عرض، وفّر " + fmt(it.was - it.price) : "عرض";
  return fmt(it.price);
}

function updateCounts() {
  document.querySelectorAll("[data-count-for]").forEach(el => {
    const n = cart[el.dataset.countFor] || 0;
    el.textContent = n ? "×" + num(n) : "";
    el.classList.toggle("on", n > 0);
  });
}

// إجمالي التوفير من العروض اللي في السلة
function cartSaving() {
  return Object.keys(cart).reduce((t, id) => {
    const it = ITEMS[id];
    return t + (it.was ? (it.was - it.price) * cart[id] : 0);
  }, 0);
}

// عدّاد التوفير بيعدّ لحد الرقم الجديد بدل ما يتغير فجأة
let savingShown = 0, savingRaf;
function showSaving(to) {
  cancelAnimationFrame(savingRaf);
  const el = $("savingAmount");
  const from = savingShown;
  savingShown = to;
  if (prefersReduced.matches || from === to) { el.textContent = fmt(to); return; }
  const t0 = performance.now();
  const tick = now => {
    const p = Math.min((now - t0) / 600, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(Math.round(from + (to - from) * e));
    if (p < 1) savingRaf = requestAnimationFrame(tick);
  };
  savingRaf = requestAnimationFrame(tick);
}

function renderCart() {
  const ids = Object.keys(cart);
  const count = ids.reduce((s, id) => s + cart[id], 0);
  $("cartCount").textContent = num(count);

  const saving = cartSaving();
  if (!ids.length) {
    $("items").innerHTML = '<div class="empty">السلة فاضية 📭<br>ضيف كتب أو عروض، وبعدها كمّل الطلب</div>';
  } else {
    $("items").innerHTML = ids.map(id => {
      const it = ITEMS[id];
      return `
        <div class="item">
          <div class="item-info"><strong>${esc(it.title)}</strong><small>${esc(itemSub(it))}</small></div>
          <div class="item-side">
            <div class="qty">
              <button data-act="dec" data-id="${esc(id)}" aria-label="تقليل">−</button>
              <span>${num(cart[id])}</span>
              <button data-act="inc" data-id="${esc(id)}" aria-label="زيادة">+</button>
            </div>
            <span class="line-price">${fmt(it.price * cart[id])}</span>
          </div>
        </div>`;
    }).join("");
  }
  $("total").textContent = fmt(cartTotal());
  $("saving").hidden = !saving;
  showSaving(saving);
  $("toForm").disabled = !ids.length;
  saveCart();
  updateCounts();
}

function addToCart(id) {
  if (!ITEMS[id]) return;
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
  bumpBadge();
  toast("تمت الإضافة للسلة ✅");
}

$("items").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  const id = b.dataset.id;
  if (b.dataset.act === "inc") cart[id]++;
  if (b.dataset.act === "dec") {
    cart[id]--;
    if (cart[id] <= 0) delete cart[id];
  }
  renderCart();
});

// ====== السلة الجانبية ======
function showView(name) {
  const isForm = name === "form";
  $("viewCart").hidden = isForm;
  $("orderForm").hidden = !isForm;
  $("drawerTitle").textContent = isForm ? "بيانات الطلب" : "سلة المشتريات";
  const v = isForm ? $("orderForm") : $("viewCart");
  if (!prefersReduced.matches) {
    v.classList.remove("show");
    void v.offsetWidth;
    v.classList.add("show");
  }
}
const openCart = () => {
  showView("cart");
  $("drawer").classList.add("open");
  $("overlay").classList.add("open");
};
const closeCart = () => {
  $("drawer").classList.remove("open");
  $("overlay").classList.remove("open");
};
$("cartBtn").onclick = openCart;
$("closeCart").onclick = closeCart;
$("overlay").onclick = closeCart;
$("toForm").onclick = () => {
  if (!Object.keys(cart).length) return toast("السلة فاضية!");
  showView("form");
};
$("backToCart").onclick = () => showView("cart");

// ====== إرسال الطلب على واتساب ======
$("orderForm").addEventListener("submit", e => {
  e.preventDefault();
  const ids = Object.keys(cart);
  if (!ids.length) { showView("cart"); return toast("السلة فاضية!"); }

  const f = new FormData(e.target);
  const val = k => String(f.get(k) || "").trim();

  const lines = ids.map(id => {
    const it = ITEMS[id];
    const prefix = it.type === "bundle" ? "[عرض] " : it.type === "series" ? "[سلسلة] " : "";
    const name = it.type === "series" ? it.label : it.title;
    const inside = it.type === "bundle" && it.parts.length
      ? " (" + it.parts.map(p => p.title).join("، ") + ")" : "";
    return `• ${prefix}${name}${inside} × ${cart[id]} = ${fmt(it.price * cart[id])}`;
  });

  const msg = [
    "أهلاً عالم الكتب، عايز أطلب:",
    ...lines,
    "",
    `الإجمالي: ${fmt(cartTotal())}`,
    cartSaving() ? `وفّرت: ${fmt(cartSaving())}` : "",
    "",
    `الاسم: ${val("name")}`,
    `التليفون: ${val("phone")}`,
    val("governorate") ? `المحافظة: ${val("governorate")}` : "",
    `العنوان: ${val("address")}`,
    val("notes") ? `ملاحظات: ${val("notes")}` : ""
  ].filter((l, i, a) => l !== "" || a[i - 1] !== "").join("\n").trim();

  if (CONFIG.whatsappNumber) {
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  } else {
    toast("شكرًا لطلبك! هنتواصل معاك قريب 🎉");
  }
  cart = {};
  renderCart();
  closeCart();
  e.target.reset();
});

// ====== حركة بسيطة لعدّاد السلة ======
function bumpBadge() {
  const b = $("cartCount");
  b.classList.remove("bump");
  void b.offsetWidth; // يعيد تشغيل الحركة
  b.classList.add("bump");
}

// ====== Toast ======
let toastTimer;
function toast(msg) {
  const el = $("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

// ==========================================
// نافذة التفاصيل + المشاركة (رابط مباشر لكل كتاب / سلسلة / عرض)
// ==========================================
const featuredByKey = {};
FEATURED_NEW.forEach(f => { featuredByKey[norm(f.title)] = f; });

const baseUrl = () => (CONFIG.siteUrl || location.href).split("#")[0].split("?")[0];
const linkFor = it => baseUrl() + "#" + it.slug;

const sheetWrap = $("sheetWrap");
let sheetItem = null;
let sheetOpener = null;

function sheetHTML(it) {
  const kind = it.type === "bundle" ? (it.was ? "وفّر " + fmt(it.was - it.price) : "عرض")
    : it.type === "series" ? "سلسلة" : "كتاب";
  const cat = it.type === "bundle" ? null : catById[it.cat];
  const feat = it.type === "book" ? featuredByKey[it.key] : null;

  let media;
  if (it.img) {
    media = `<div class="sheet-media" data-img="box">${imgTag(it.img)}</div>`;
  } else {
    const c = cat ? cat.color : ["#8d6a4f", "#5a3e2b"];
    media = `<div class="cover" style="--c1:${c[0]};--c2:${c[1]}"><span class="cover-title">${esc(it.title)}</span></div>`;
  }

  let sub = "";
  if (it.type === "book") sub = (feat && feat.author ? feat.author + " · " : "") + cat.name + (it.series ? " · " + it.series.title : "");
  else if (it.type === "series") sub = cat.name + " · " + countLabel(it.parts.length, it.kind);
  else if (it.note) sub = it.note;

  const parts = it.type === "bundle" || it.type === "series" ? it.parts : [];
  const list = parts.length
    ? `<ul class="offer-items sheet-list">${parts.map(p => `<li>${esc(p.title)}</li>`).join("")}</ul>` : "";
  const gift = it.gift
    ? `<div class="offer-gift">🎁 هدية: ${esc(it.gift.title)}${it.gift.note ? " (" + esc(it.gift.note) + ")" : ""}</div>` : "";
  const desc = feat && feat.desc ? `<p class="sheet-desc">${esc(feat.desc)}</p>` : "";
  const was = it.was ? `<s>${fmt(it.was)}</s>` : "";
  const addLabel = it.type === "bundle" ? "أضف العرض للسلة" : it.type === "series" ? "أضف السلسلة كلها للسلة" : "أضف للسلة";

  return `
    ${media}
    <div class="sheet-content">
      <span class="offer-badge">${esc(kind)}</span>
      <h2 class="sheet-title" id="sheetTitle">${esc(it.title)}</h2>
      ${sub ? `<div class="sheet-sub">${esc(sub)}</div>` : ""}
      ${desc}${list}${gift}
      <div class="sheet-price"><strong>${fmt(it.price)}</strong>${was}</div>
      <div class="sheet-actions">
        <button class="btn block" data-add="${esc(it.id)}">${addLabel} <span class="row-count" data-count-for="${esc(it.id)}"></span></button>
        <button class="btn block wa-share" data-sheet="wa">${WA_SVG}<span>شارك على واتساب</span></button>
      </div>
      <div class="sheet-link">
        <input type="text" id="sheetLink" readonly dir="ltr" value="${esc(linkFor(it))}" aria-label="رابط المشاركة">
        <button class="add" data-sheet="copy">انسخ الرابط</button>
      </div>
    </div>`;
}

function openSheet(it, fromHash) {
  if (!it) return;
  if (sheetWrap.hidden) sheetOpener = document.activeElement;
  sheetItem = it;
  $("sheetBody").innerHTML = sheetHTML(it);
  updateCounts();
  $("sheet").scrollTop = 0;
  sheetWrap.hidden = false;
  document.body.style.overflow = "hidden";
  if (!fromHash) {
    try { history.replaceState(null, "", "#" + it.slug); } catch (err) { /* مش مشكلة */ }
  }
  $("sheet").focus({ preventScroll: true });
}

function closeSheet(keepHash) {
  if (sheetWrap.hidden) return;
  sheetWrap.hidden = true;
  document.body.style.overflow = "";
  sheetItem = null;
  if (!keepHash && BY_SLUG[decodeURIComponent(location.hash.slice(1))]) {
    try { history.replaceState(null, "", location.pathname + location.search); } catch (err) { /* مش مشكلة */ }
  }
  if (sheetOpener && sheetOpener.focus) sheetOpener.focus();
  sheetOpener = null;
}

function itemFromHash() {
  let h = "";
  try { h = decodeURIComponent(location.hash.slice(1)); } catch (err) { return null; }
  return BY_SLUG[h] || null;
}

function copyLink(it) {
  const link = linkFor(it);
  const fallback = () => {
    const inp = $("sheetLink");
    if (inp) { inp.select(); inp.setSelectionRange(0, link.length); }
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (err) { /* مش مشكلة */ }
    toast(ok ? "تم نسخ الرابط ✅" : "انسخ الرابط من الخانة");
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(link).then(() => toast("تم نسخ الرابط ✅"), fallback);
  } else {
    fallback();
  }
}

function shareWhatsApp(it) {
  const label = it.type === "bundle" ? "عرض" : it.type === "series" ? "سلسلة" : "كتاب";
  const text = `${label}: ${it.title}\nالسعر: ${fmt(it.price)}\n${linkFor(it)}`;
  window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank", "noopener");
}

$("sheetBody").addEventListener("click", e => {
  const b = e.target.closest("[data-sheet]");
  if (!b || !sheetItem) return;
  if (b.dataset.sheet === "copy") copyLink(sheetItem);
  if (b.dataset.sheet === "wa") shareWhatsApp(sheetItem);
});
$("sheetBackdrop").onclick = () => closeSheet();
$("sheetClose").onclick = () => closeSheet();
$("sheetBody").addEventListener("focusin", e => {
  if (e.target.id === "sheetLink") e.target.select();
});

addEventListener("hashchange", () => {
  const it = itemFromHash();
  if (it) openSheet(it, true);
  else closeSheet(true);
});

// ==========================================
// ضغطات عامة (إضافة للسلة / الأجزاء / الأقسام / التابات)
// ==========================================
document.addEventListener("click", e => {
  const add = e.target.closest("[data-add]");
  if (add) { addToCart(add.dataset.add); return; }

  const sh = e.target.closest("[data-share]");
  if (sh) { openSheet(ITEMS[sh.dataset.share]); return; }

  const more = e.target.closest(".items-toggle");
  if (more) {
    const open = more.closest(".offer").classList.toggle("open");
    more.setAttribute("aria-expanded", String(open));
    return;
  }

  const tog = e.target.closest(".toggle");
  if (tog) {
    const open = tog.closest(".row").classList.toggle("open");
    tog.setAttribute("aria-expanded", String(open));
    return;
  }

  const tile = e.target.closest(".cat-tile");
  if (tile) { setCategory(tile.dataset.cat, true); return; }

  const chip = e.target.closest("#tabs .chip");
  if (chip) setCategory(chip.dataset.cat, false);
});

// ==========================================
// التواصل
// ==========================================
(function setupContact() {
  if (CONFIG.whatsappNumber) {
    $("waLink").href = `https://wa.me/${CONFIG.whatsappNumber}`;
    $("waLink").textContent = "WhatsApp: +" + CONFIG.whatsappNumber;
    $("phone1").href = `tel:+${CONFIG.whatsappNumber}`;
    $("phone1").textContent = "+" + CONFIG.whatsappNumber;
  } else {
    $("waItem").hidden = true;
  }
  if (CONFIG.instagramUrl) {
    $("igLink").href = CONFIG.instagramUrl;
  } else {
    $("igItem").hidden = true;
  }

  // زرار الواتساب العايم
  const wa = $("waFloat");
  if (CONFIG.whatsappNumber) {
    const text = encodeURIComponent("أهلاً عالم الكتب، عايز أستفسر عن كتاب");
    wa.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;
  } else {
    wa.hidden = true;
  }

  // زرار "اطلب على واتساب" في قسم إزاي تطلب
  const howWa = $("howWa");
  if (CONFIG.whatsappNumber) {
    const text = encodeURIComponent("أهلاً عالم الكتب، عايز أطلب كتب:");
    howWa.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;
  } else {
    howWa.hidden = true;
  }
})();

// ====== آراء القرّاء (بتظهر لما تضيف آراء في قسم البيانات في script.js) ======
if (REVIEWS.length) {
  $("quotes").innerHTML = REVIEWS.map(r =>
    `<div class="quote"><p>${esc(r.text)}</p><b>${esc(r.name || "")}</b></div>`).join("");
  $("reviews").hidden = false;
}

// ====== أرقام حقيقية من البيانات ======
$("statBooks").dataset.count = books.length;
$("statOffers").dataset.count = bundles.length;
$("statSeries").dataset.count = seriesCount;
document.querySelectorAll("[data-default-price]").forEach(el => { el.textContent = num(DEFAULT_PRICE); });

// ====== عدّاد الأرقام ======
function countUp(el) {
  const target = +el.dataset.count;
  const show = n => { el.textContent = num(Math.round(n)); };

  if (prefersReduced.matches) { show(target); return; }

  const duration = 1800;
  const start = performance.now();
  const tick = now => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 4); // بيبدأ سريع ويهدّى في الآخر
    show(target * eased);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) { countUp(en.target); io.unobserve(en.target); }
  });
});
document.querySelectorAll("[data-count]").forEach(el => io.observe(el));

// ====== الوضع الليلي ======
let themeTimer;
$("themeBtn").onclick = () => {
  const root = document.documentElement;
  const isDark =
    root.dataset.theme === "dark" ||
    (!root.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
  if (!prefersReduced.matches) {
    root.classList.add("theme-anim");
    clearTimeout(themeTimer);
    themeTimer = setTimeout(() => root.classList.remove("theme-anim"), 650);
  }
  root.dataset.theme = isDark ? "light" : "dark";
};

// ====== قايمة الموبايل ======
const menuBtn = $("menuBtn");
const mobileMenu = $("mobileMenu");

function setMenu(open) {
  mobileMenu.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "إغلاق القايمة" : "فتح القايمة");
  menuBtn.textContent = open ? "✕" : "☰";
}
menuBtn.onclick = () => setMenu(!mobileMenu.classList.contains("open"));
mobileMenu.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", e => {
  if (e.key === "Escape") { setMenu(false); closeCart(); closeSheet(); }
});
matchMedia("(min-width: 861px)").addEventListener("change", e => { if (e.matches) setMenu(false); });

// ====== تشغيل ======
$("year").textContent = new Date().getFullYear().toLocaleString("ar-EG", { useGrouping: false });
renderOffers();
renderNew();
renderCategories();
renderTabs();
renderList();
renderCart();

// لو الزبون فتح رابط مباشر لكتاب أو عرض، نفتح تفاصيله على طول
{
  const linked = itemFromHash();
  if (linked) openSheet(linked, true);
}
// الملف مقسوم تلات أجزاء:
//   1) الإعدادات: رقم الواتساب والإنستجرام
//   2) بيانات المكتبة: الكتب والأسعار والعروض  ← ده الجزء اللي بتعدّل فيه
//   3) الكود: بيبني الصفحة والسلة، مش محتاج تلمسه
// ==========================================


// ##########################################
// 1) الإعدادات
// ##########################################

// ====== إعدادات المكتبة (عدّلها براحتك) ======
const CONFIG = {
  // رقم الواتساب بالصيغة الدولية من غير + أو مسافات
  whatsappNumber: "201041471362",
  // رابط الإنستجرام، مثال: "https://instagram.com/yourpage"
  instagramUrl: "",
  currency: "ج.م"
};

const PAGE_SIZE = 36;      // عدد الصفوف اللي بتظهر في كل مرة
const OFFERS_VISIBLE = 6;  // لازم يطابق nth-child(n+7) في style.css
const CART_KEY = "alam-el-kotob-cart";

// ##########################################
// 2) بيانات المكتبة (الكتب / الأسعار / العروض)
// ##########################################

// السعر العادي لأي كتاب
const DEFAULT_PRICE = 80;

// كتب ليها سعر مختلف عن العادي (اكتب اسم الكتاب زي ما هو في القوايم تحت)
const PRICE_OVERRIDES = {
  "فن الامبالاه": 75,
  "العادات الذريه": 75,
  "انتِ قوه مذهله": 75,
  "قصص القرآن بالعامية": 75
};

// قسم "وصل حديثًا": الكتب لازم تكون موجودة في القوايم تحت
// author و desc اختياريين
const FEATURED_NEW = [
  {
    title: "فن الامبالاه",
    author: "مارك مانسون",
    desc: "كتاب يساعدك تبص للحياة من زاوية مختلفة، وتفهم إيه اللي يستاهل اهتمامك فعلًا وإيه اللي ممكن تعدّيه ببساطة."
  },
  {
    title: "العادات الذريه",
    author: "جيمس كلير",
    desc: "إزاي العادات الصغيرة، لما تستمر عليها، تعمل فرق كبير جدًا مع الوقت: تبني عادات إيجابية وتتخلص من السيئة وتحسّن تركيزك."
  },
  { title: "انتِ قوه مذهله" },
  { title: "قصص القرآن بالعامية" }
];

// أسماء بتظهر للسلاسل بشكل أحسن (اختياري)
const SERIES_NAMES = {
  "اجاثا كريستي": "أجاثا كريستي",
  "نادر فوده": "نادر فودة",
  "قبل ان تبرد القهوة": "قبل أن تبرد القهوة"
};

// ------------------------------------------
// الصور (اختيارية)
// حط الصور في فولدر اسمه images جنب index.html.
// - لأي كتاب أو سلسلة: اكتب اسمه زي ما هو في القوايم تحت، وبعده مسار الصورة.
// - للعروض: اكتب img: "images/اسم.jpg" جوه العرض نفسه (في BUNDLES).
// الكتاب أو العرض اللي من غير صورة بيظهر عادي بتصميمه الورقي،
// ولو مسار الصورة غلط الصورة بتختفي لوحدها من غير ما الصفحة تبوظ.
// ------------------------------------------
const IMAGES = {
  // كتب فردية
  "العادات الذريه": "images/El 3adat el zarrya.png",
  "انتِ قوه مذهله": "images/Enta qowah mozhela.jpeg",
  "فن الامبالاه": "images/Fann el lamobalah.jpeg",
  "قصص القرآن بالعامية": "images/Qessas el qoran bel 3amya.jpeg",

  // سلاسل (اسم السلسلة)
  "قبل ان تبرد القهوة": "images/Selselat qabl an tabrod el qahwa el 4 agzaa.png",
};

// ------------------------------------------
// الأقسام والكتب
// كل سطر = كتاب. ممكن تلزق قايمة جديدة على طول.
// - التكرار بيتشال تلقائي.
// - "اسم 1" و"اسم 2" بيتجمعوا تلقائي في سلسلة.
// - "اسم كتاب (اسم الكاتب)" بيتجمع في سلسلة باسم الكاتب.
// ------------------------------------------
const CATEGORIES = [
  {
    id: "horror",
    name: "رعب وتشويق ومغامرات",
    icon: "🌄",
    color: ["#4a3326", "#2a1d15"],
    titles: `
اكتب حتي لا انكسر
سكوربيوس 1
ست الحسن
لوز مر
عنب الثعلب
ذيل القط
مخالب القط
جمره
في قلبي أنثى عبريه
ذكر شرقي منقرض
تروفانتس
صديقى السيكوباتى
جاز وروك
مينتو
متجر للقتلة
متجر دالجوت الأحلام 1
متجر دالجوت الأحلام 2
جومانه
الجساسه
السجيل
جريمه في رأس السيد هود
جثتان والثالثه عند قدمي
ذات الوشاح الوردي
جريمه السيده ه
جريمه في ليله ممطره
جريمه العقار 47
رضا
النزيل
ظل النوم
ايكادولي
اوبال
امانوس
مملكه المرعبين
داو
ظل النعيم
مكتبه الكلمات المفقوده
انتخريستوس 1
القادمون
الهلكوت
عشيره برهوت
حطمني
اعصني
طاغوت
حلوى الليمون السحرية
قواعد جارتين
امواج اكما
دقات الشامو
ارض زيكولا
اماريتا
وادي الذئاب المنسيه
واحه يعقوب
فتاه الياقه الزرقاء
خوف 1
خوف 2
خوف 3
لا تكن لطيفا أكثر من اللازم
صلاه الممسوس
هسيس
يحدث ليلا في الغرفه المغلقه
القربان
ابناء الليل
سرداب قصر البارون
دليل جدتي لقتل الاوغاد
خلف القهوه يتنفس القتله
مخلوقات الليل 1
في حضره الجان
الجزار
طريقه طبخ جثه في المنزل
انترستا 1
انين
11:11
يأجوج ومأجوج
مدينه الموتي
العائد
المرتد
متجر دالجوت الأحلام
جثه لذيذه
لارسيا
دماء تتاروبيت
حاوي
شبكه العنكبوت
سعد الدباس
ارض القرابين
جحيم العابرين
اجيج
الغيهب
الانتهازي
الوليمه
ليله ماطره
النداء
لوكانده بير الوطاويط
اذكار الموت
جثه في بيت طائر الدودو
مدرسه ميلر
حاره الجزار
قريه الشيخ
قصر الخواجه
قبل ان تبرد القهوة 1
قبل ان تبرد القهوة 2
قبل ان تبرد القهوة 3
قبل ان تبرد القهوة 4
جند ابنه الشيطان
ثم لم يبقي احد
العوسج 1
العوسج 2
نصف ميت
منزل ابو خطوه
ايام مع الباشا
نوح المذبوح
ابتسم فأنت ميت
نظريه الفستق 1
نظريه الفستق 2
السيده التي حسبت نفسها سوسه
قريبا سيحل الظلام
وهج البنفسج 1
جريمه في قطار الشرق
سأرحل
سفاح الازقه
لقاء مع كاتب رعب
ما يحدث خلف ابواب المشرحه
حارس المشرحه
في سبيل التاج
ماجدولين
لوكانده الجن
كوضوح التوت
كوابيس قبل النوم 1
كوابيس قبل النوم 2
كوابيس قبل النوم 3
مشفى ليفان
مدينه الحب لا يسكنها العقلاء
انت كل اشيائي الجميله
ردنى إليك
يوتوبيا
سر الغرفه 207
بعد ساعات العمل الرسميه
ستوكهولم
عندما يعزف الشيطان
ضريح عمر بن الجن
الزعفرانة
وقائع الجمعه الاخيره
فارس الاندلس
فتى الاندلس
ربيع الأندلس
ارسس ١
ارسس ٢
آزر
انهم يأتون ليلا
ليله في ضيافه الكونت
نادر فوده 1
نادر فوده 2
نادر فوده 3
نادر فوده 4
نادر فوده 5
نادر فوده 6
نادر فوده 7
نادر فوده 8
نادر فوده 9
`
  },
  {
    id: "religious",
    name: "الكتب الدينية",
    icon: "🌸",
    color: ["#5f6b5a", "#37402f"],
    titles: `
رسائل من القرآن
رسائل من عمر بن الخطاب
رسائل من على بن أبى طالب
رسائل من التابعين
السلام عليك يا صاحبي
ليطمئن قلبي
عندما التقيت عمر بن الخطاب
حديث المساء
حديث الصباح
للرجال فقط
الأرض بعد طوفان نوح
ادريس النبي
نطفه
قصص القرآن بالعامية
ما لا يسع المسلم جهله
ما لا يسع اطفال المسلمين جهله
لكنود
نبض
علمتني سورة يوسف
علمتني سورة البقرة
اسرار سوره البقره
اسرار الدعاء
انتِ ايضا صحابيه
كونى صحابيه
فاتتني صلاه
رقائق القرآن
الطريق الي الله
مسلكيات
الماجريات
ان الله معنا
لأنك الله 1
لأنك الله 2
السجده الاخيره
اول مره احسن الظن
أول مرة اصلي
ولنا في الحلال لقاء
حوار مع صديقي المحلد
رحلتي من الشك الي الايمان
البسي واسع
قررت أن اخلع الحجاب
هكذا رأيت رسول الله
ان ربي لطيف
مفاتيح خزائن الله
من كل ايه فكره
انا صاحبك القرآن
ندي تشتكي لعائشه
الي المنكسرة قلوبهم
مع النبي
يوم في حياة النبي
على خطى الرسول
`
  },
  {
    id: "psychology",
    name: "علم النفس وتطوير الذات",
    icon: "💗",
    color: ["#7a4b45", "#4a2a26"],
    titles: `
الشوك والقرنفل
افضل نسخه منك
التغيير يبدأ منك انت
كن لنفسك كل شئ
كن الشخص الذي يجعلك سعيدا
30 يوم ضد الاكتئاب
كيف تعيش كل ساعه في يومك
عقدك النفسيه سجنك الابدي
فن الكلام
فن الامبالاه
فن التعافي
فن التركيز والانجاز
فن الذكاء الاجتماعي
فن التأثير في الآخرين
الحياه ليست رجلا
لن يكسرني رجل
تحت مسمى الرجولة
متعه أن تكون في العشرين
متعه أن تكون منتصف العمر
متعه أن تكون في الثلاثين
دع القلق وابدأ الحياه
الطريقه الأكثر فاعليه لإنجاز المهام
قوس قزح
فقاقيع
E. S. P
قهوه باليورانيوم
علاقات خطره
استراحه نفسيه
ما لا نبوح به
ما رواه البحر
فيتامينات نفسيه
جلسات نفسيه
مذكرات طبيب نفسي
لاننا لم نكن بخير
الخروج عن النص
الخروج عن النص من جديد
القلق هو العدو
كن قويا
مدينه الأقوياء
فكر كأنك طبيب نفسي
فكر وتصرف كأنك قط
كن اقوي من مشاعرك
50 سؤال ف الحب
الي ما لا نهايه
هادم الاساطير
ماذا لو
الهشاشه النفسيه
المرونه النفسيه
انا مش فاهمني
استيقظ وعش
الذكاء العاطفي في التربيه
التهذيب الإيجابي في تربية الأطفال
التهذيب الإيجابي من الألف إلى الياء
لا مكان للملل
نعمه الالم
10 معارك في الحياه
مبادئ التحليل النفسي
هرم بلا قمة
من الصفر
مميز بالاصفر
ساخبرك شيء يجعلك سعيدا
ليله حب
التجربه الفكريه لروح امه
تعافيت
ضحكات كئيبه
كيف تكسب اصدقاء وتؤثر على الآخرين
اعرف وجهك الاخر
احببت وغدا
ابى الذى اكره
الدحيح
الوحش الذي يسكنك يمكن أن يكون لطيفا
اول 20 ساعه
العادات السبع للمراهقين الاكثر فاعليه
اصنع وقت اكتر من المتاح
العادات الذريه
سيندرلا سيكرت
انتِ قوه مذهله
قوه عقلك الباطن
كيف تؤثر على الآخرين وتكسب اصدقاء
كلنا مرضي نفسيين
محاط بالحمقى
محاط بالمرضي النفسيين
توقف عن إرضاء الآخرين
توقف عن إهدار حياتك
الاب الغني والاب الفقير
السماح بالرحيل
نادي الخامسه صباحا
غصون البندق 1
غصون البندق 2
`
  },
  {
    id: "misc",
    name: "كتب وروايات متنوعة",
    icon: "📍",
    color: ["#a07a4a", "#6b4c27"],
    titles: `
خبايا 2
خبايا 3
خبايا 4
خبايا 5
عائد إلى حيفا
ام سعد
24 ساعه صحه
الصهيونية العالميه
ابن سينا
أفيون الشعوب
عن وطن لحم ودم
فن الحرب
فن ان تكون دائما على صواب
على أجنحة العصافير
عن شيء اسمه الحب
الخيميائي
الليالي البيضاء
الجريمه والعقاب 1
الجريمه والعقاب 2
صاحب الظل الطويل
مغامره صندوق الشوكولاته (اجاثا كريستي)
لغز سرقه سند المليون دولار (اجاثا كريستي)
لغز الوصيه المفقوده (اجاثا كريستي)
مغامره النجم الغربي (اجاثا كريستي)
لغز نزل الصياد (اجاثا كريستي)
مغامره النبيل الايطالي (اجاثا كريستي)
مغامره المقبره المصريه (اجاثا كريستي)
لغز اختطاف رئيس الوزراء (اجاثا كريستي)
حادثه حفله النصر (اجاثا كريستي)
الدليل المزدوج (اجاثا كريستي)
مغامره العميل المرموق (شيرلوك هولمز)
مغامره الجندي الشاحب (شيرلوك هولمز)
مغامره بذور البرتقال (شيرلوك هولمز)
لغز الوجه الاصفر (شيرلوك هولمز)
لغز مدرسه الدير (شيرلوك هولمز)
لغز قدم الشيطان (شيرلوك هولمز)
لغز تماثيل نابليون (شيرلوك هولمز)
مغامرات بيتر الاسود (شيرلوك هولمز)
مغامره النزيله الملثمه (شيرلوك هولمز)
لغز الصندوق الورقي (شيرلوك هولمز)
مغامره الياقوتة الزرقاء (شيرلوك هولمز)
لغز جلوريا سكوت (شيرلوك هولمز)
وثائق المعاهدة البحريه (شيرلوك هولمز)
لغز الرجال الراقصين (شيرلوك هولمز)
مغامره الرجل ذو الشفاه الملتوية (شيرلوك هولمز)
`
  }
];

// ------------------------------------------
// العروض
// items: أسماء الكتب (لازم تطابق القوايم فوق)
// was:   السعر قبل الخصم (لو مش مكتوب بيتحسب من أسعار الكتب)
// note:  سطر توضيحي، gift: هدية مع العرض
// img:   صورة العرض (اختياري)، مثال: img: "images/offer.jpg"
// ------------------------------------------
const BUNDLES = [
  {
    id: "mirna-mahdy",
    img: "images/Selselat nooh el alfy el 5 agzaa w ma3ahom sadeeqy el psychopath.png",
    title: "٦ كتب لميرنا المهدي",
    price: 300,
    items: ["سلسلة نوح الألفي (٥ أجزاء)", "صديقى السيكوباتى"]
  },
  {
    id: "selfdev-1",
    img: "images/Mo7at bel marda El 3adat 3odak el nafsya Kon lenafsak.png",
    title: "باكدج تطوير الذات ١",
    price: 220,
    items: ["محاط بالمرضي النفسيين", "العادات الذريه", "عقدك النفسيه سجنك الابدي", "كن لنفسك كل شئ"]
  },
  {
    id: "selfdev-2",
    img: "images/Fann el embalah Mo7at bel 7omqa Mo7at bel marda el nafsyeen Fann el kalam.png",
    title: "باكدج تطوير الذات ٢",
    price: 220,
    items: ["فن الامبالاه", "محاط بالحمقى", "محاط بالمرضي النفسيين", "فن الكلام"]
  },
  {
    id: "mix-narcissism",
    img: "images/Lan yeksarny ragol Ahbabt wogdan Fann en tkoon Fakker ka2annak tabeeb nafsy.png",
    title: "مكس تطوير الذات والنرجسية",
    price: 220,
    items: ["لن يكسرني رجل", "احببت وغدا", "فن ان تكون دائما على صواب", "فكر كأنك طبيب نفسي"]
  },
  {
    id: "selfdev-bomb",
    img: "images/El ab el ghany wel ab el faqeer Ahbabt w ghadat Aby elli akrah Nady teshtaky le 3aisha.png",
    title: "قنبلة تطوير ذات",
    price: 220,
    items: ["الاب الغني والاب الفقير", "ابى الذى اكره", "احببت وغدا", "ندي تشتكي لعائشه"]
  },
  {
    id: "four-sweets",
    img: "images/Gamra Hasees Saffah el azqa Sa3ad el dabbas.png",
    title: "أربع حلويات ١",
    price: 220,
    items: ["جمره", "هسيس", "سفاح الازقه", "سعد الدباس"]
  },
  {
    id: "four-sweets-2",
    img: "images/Wahat el ya3qoub Nooh el madbooh Lela fe deyafet el kont Lekaa ma3 kateb ro3b.jpeg",
    title: "أربع حلويات ٢",
    price: 220,
    items: ["واحه يعقوب", "نوح المذبوح", "ليله في ضيافه الكونت", "لقاء مع كاتب رعب"]
  },
  {
    id: "noha-daoud",
    img: "images/Satan wel thaltha 3end qadamy Gareemat el 3aqar 47 Zat el weshah el wardy.png",
    title: "٣ حلويات لنهى داوود",
    price: 200,
    items: ["جثتان والثالثه عند قدمي", "جريمه العقار 47", "ذات الوشاح الوردي"]
  },
  {
    id: "al-hamdan",
    img: "images/Resis 1 Resis 2 Azer.png",
    title: "باكدج آل حمدان",
    price: 200,
    items: ["ارسس ١", "ارسس ٢", "آزر"]
  },
  {
    id: "khawf",
    img: "images/Package Khouf 1 2 3.png",
    title: "سلسلة خوف",
    price: 200,
    items: ["خوف 1", "خوف 2", "خوف 3"]
  },
  {
    id: "zikola",
    img: "images/Selselat ard zikola el 3 agzaa Lekaa ma3 kateb ro3b hedaya.png",
    title: "سلسلة أرض زيكولا",
    price: 220,
    note: "٣ أجزاء",
    gift: { title: "لقاء مع كاتب رعب", note: "متاح استبداله" }
  },
  {
    id: "mamlakat-ashrar",
    img: "images/Selselat mamlakat el ashrar el 3 agzaa.png",
    title: "سلسلة مملكة الأشرار",
    price: 250,
    note: "٣ أجزاء"
  },
  {
    id: "ektob",
    img: "images/Package Aktob.png",
    title: "سلسلة اكتب",
    price: 275,
    note: "السلسلة كاملة"
  },
  {
    id: "noh-alalfy",
    img: "images/Selselet Nouh Elalfi 6 agzaa.png",
    title: "سلسلة نوح الألفي",
    price: 400,
    was: 500,
    note: "٦ أجزاء"
  },
  {
    id: "amr-abdelhamid",
    img: "images/Mento Ard zikola Amareta Wady el zeeb el mansya Qwa3ed garten Amwag akma Daqat el shamo Wahat el ya3qoub.png",
    title: "عرض عمرو عبدالحميد",
    price: 450,
    was: 800,
    items: [
      "مينتو", "ارض زيكولا", "اماريتا", "وادي الذئاب المنسيه",
      "قواعد جارتين", "امواج اكما", "دقات الشامو", "واحه يعقوب"
    ]
  }
];

// ------------------------------------------
// آراء القرّاء (فاضية دلوقتي، والقسم بيختفي لحد ما تضيف آراء حقيقية)
// مثال: { text: "الكتب وصلت بسرعة", name: "اسم الزبون" }
// ------------------------------------------
const REVIEWS = [];


// ##########################################
// 3) الكود (مش محتاج تلمسه)
// ##########################################

// ====== أدوات ======
const $ = id => document.getElementById(id);
const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)");
const fmt = n => n.toLocaleString("ar-EG") + " " + CONFIG.currency;
const num = n => n.toLocaleString("ar-EG");
const esc = s => String(s).replace(/[&<>"']/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// توحيد الكتابة العربية عشان البحث ما يتأثرش بالهمزات والتاء المربوطة وغيرها
function norm(s) {
  return String(s)
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

const parseList = text => text.split("\n").map(s => s.trim()).filter(Boolean);

function countLabel(n, kind) {
  const w = kind === "author" ? ["كتاب", "كتابين", "كتب"] : ["جزء", "جزءين", "أجزاء"];
  if (n === 2) return w[1];
  return num(n) + " " + (n <= 10 ? w[2] : w[0]);
}

// ==========================================
// بناء الكتالوج من قسم البيانات
// ==========================================
const ITEMS = {};        // كل حاجة تنفع تتحط في السلة (كتاب / سلسلة / عرض)
const books = [];        // الكتب الفردية
const bookByKey = {};
const catById = {};
const rowsByCat = {};
const seenKeys = new Set();

const priceOverrides = {};
Object.keys(PRICE_OVERRIDES).forEach(t => { priceOverrides[norm(t)] = PRICE_OVERRIDES[t]; });

const imageByKey = {};
Object.keys(IMAGES).forEach(t => { imageByKey[norm(t)] = IMAGES[t]; });

CATEGORIES.forEach(cat => {
  catById[cat.id] = cat;
  cat.books = [];
  parseList(cat.titles).forEach(raw => {
    let title = raw, tag = "";
    const tm = raw.match(/^(.*?)\s*\(\s*([^)]+?)\s*\)\s*$/);
    if (tm && tm[1].trim()) { title = tm[1].trim(); tag = tm[2].trim(); }

    const key = norm(title);
    if (!key || seenKeys.has(key)) return;   // تكرار
    seenKeys.add(key);

    const nm = title.match(/^(.*?\S)\s+([0-9٠-٩]+)$/);
    const book = {
      type: "book",
      id: "b:" + key,
      key,
      title,
      tag,
      cat: cat.id,
      base: nm ? nm[1] : "",
      num: nm ? parseInt(norm(nm[2]), 10) : 0,
      price: priceOverrides[key] !== undefined ? priceOverrides[key] : DEFAULT_PRICE,
      series: null
    };
    book.search = norm(title + " " + tag);
    book.img = imageByKey[key] || "";
    books.push(book);
    cat.books.push(book);
    bookByKey[key] = book;
    ITEMS[book.id] = book;
  });
});

// تجميع الأجزاء في سلاسل
function buildRows(cat) {
  const gkey = b => b.tag ? "t:" + norm(b.tag) : b.base ? "n:" + norm(b.base) : "";
  const groups = new Map();

  cat.books.forEach(b => {
    const g = gkey(b);
    if (!g) return;
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g).push(b);
  });
  // كتاب من غير رقم اسمه نفس اسم السلسلة بيتضم ليها
  cat.books.forEach(b => {
    if (gkey(b)) return;
    const g = "n:" + b.key;
    if (groups.has(g)) groups.get(g).push(b);
  });

  const rows = [];
  const done = new Set();
  cat.books.forEach(b => {
    const g = gkey(b) || "n:" + b.key;
    const members = groups.get(g);
    if (members && members.length >= 2) {
      if (done.has(g)) return;
      done.add(g);
      rows.push(makeSeries(g, members, cat));
    } else {
      rows.push(b);
    }
  });
  return rows;
}

function makeSeries(g, members, cat) {
  const isAuthor = g.startsWith("t:");
  const parts = isAuthor ? members : members.slice().sort((a, b) => a.num - b.num);
  const raw = isAuthor ? parts[0].tag : (parts.find(p => p.base) || parts[0]).base;
  const name = SERIES_NAMES[raw] || raw;
  const kind = isAuthor ? "author" : "numbered";
  const s = {
    type: "series",
    id: "s:" + g,
    title: name,
    label: name + " (" + countLabel(parts.length, kind) + ")",
    cat: cat.id,
    kind,
    parts,
    price: parts.reduce((t, p) => t + p.price, 0),
    img: imageByKey[norm(name)] || imageByKey[norm(raw)] || ""
  };
  parts.forEach(p => { p.series = s; p.search = norm(p.search + " " + name); });
  ITEMS[s.id] = s;
  return s;
}

CATEGORIES.forEach(cat => { rowsByCat[cat.id] = buildRows(cat); });
const seriesCount = CATEGORIES.reduce((t, c) => t + rowsByCat[c.id].filter(r => r.type === "series").length, 0);

// العروض
const bundles = BUNDLES.map(b => {
  const parts = (b.items || []).map(t => {
    const bk = bookByKey[norm(t)];
    return { title: bk ? bk.title : t, price: bk ? bk.price : DEFAULT_PRICE };
  });
  const sum = parts.reduce((t, p) => t + p.price, 0);
  const was = b.was !== undefined ? b.was : (parts.length >= 2 ? sum : 0);
  const o = {
    type: "bundle",
    id: "o:" + b.id,
    title: b.title,
    price: b.price,
    was: was > b.price ? was : 0,
    parts,
    note: b.note || "",
    gift: b.gift || null,
    img: b.img || ""
  };
  ITEMS[o.id] = o;
  return o;
});

// ====== UI ======

// ====== الصور (اختيارية) ======
const encodePath = p => p.split("/").map(encodeURIComponent).join("/");
const imgTag = (src, cls = "") => src
  ? `<img ${cls ? `class="${cls}" ` : ""}src="${esc(encodePath(src))}" alt="" loading="lazy" onerror="imgFail(this)">` : "";
const thumbHTML = src => src
  ? `<div class="thumb" data-img="box">${imgTag(src)}</div>` : "";

// لو الصورة مش لاقياها: بنشيلها ويرجع التصميم الورقي من غير صورة
function imgFail(img) {
  const box = img.closest("[data-img]");
  if (box && box.dataset.img === "box") {
    const card = box.closest(".offer");
    if (card) card.classList.remove("has-pic");
    box.remove();
    return;
  }
  if (box) box.classList.remove("has-img");
  img.remove();
}

// ==========================================
// عرض العروض
// ==========================================
const OFFER_ITEMS_SHOWN = 4; // عدد الكتب اللي بتظهر في الكارت، والباقي بيتفتح بزرار

function offerItemsHTML(parts) {
  if (!parts.length) return "";
  const li = p => `<li>${esc(p.title)}</li>`;
  const head = `<ul class="offer-items">${parts.slice(0, OFFER_ITEMS_SHOWN).map(li).join("")}</ul>`;
  const rest = parts.slice(OFFER_ITEMS_SHOWN);
  if (!rest.length) return head;
  return `${head}
        <div class="offer-more"><ul class="offer-items">${rest.map(li).join("")}</ul></div>
        <button class="items-toggle" aria-expanded="false">عرض باقي الكتب (${num(rest.length)}) <span class="chev" aria-hidden="true">⌄</span></button>`;
}

function offerHTML(o) {
  const badge = `<span class="offer-badge">${o.was ? "وفّر " + fmt(o.was - o.price) : "عرض"}</span>`;
  const note = o.note ? `<p class="offer-note">${esc(o.note)}</p>` : "";
  const gift = o.gift
    ? `<div class="offer-gift">🎁 هدية: ${esc(o.gift.title)}${o.gift.note ? " (" + esc(o.gift.note) + ")" : ""}</div>` : "";
  const was = o.was ? `<s>${fmt(o.was)}</s>` : "";
  const pic = o.img
    ? `<div class="offer-img" data-img="box">${imgTag(o.img, "offer-bg")}${imgTag(o.img)}</div>` : "";
  return `
    <article class="offer${o.img ? " has-pic" : ""}">
      ${pic}
      <div class="offer-top">
        ${badge}
        <h3>${esc(o.title)}</h3>
        ${offerItemsHTML(o.parts)}${note}${gift}
      </div>
      <div class="offer-bottom">
        <div class="offer-price"><strong>${fmt(o.price)}</strong>${was}</div>
        <button class="add" data-add="${esc(o.id)}">أضف العرض</button>
      </div>
    </article>`;
}

function renderOffers() {
  const grid = $("offersGrid");
  const more = $("moreOffers");
  grid.innerHTML = bundles.map(offerHTML).join("");
  if (bundles.length > OFFERS_VISIBLE) {
    grid.classList.add("collapsed");
    more.hidden = false;
    more.textContent = `عرض كل العروض (${num(bundles.length)})`;
    more.onclick = () => {
      const collapsed = grid.classList.toggle("collapsed");
      more.textContent = collapsed ? `عرض كل العروض (${num(bundles.length)})` : "عرض أقل";
    };
  } else {
    more.hidden = true;
  }
}

// ==========================================
// وصل حديثًا
// ==========================================
function renderNew() {
  const cards = FEATURED_NEW.map(f => {
    const b = bookByKey[norm(f.title)];
    if (!b) return "";
    const c = catById[b.cat].color;
    const img = f.img || b.img;
    return `
      <article class="card">
        <div class="cover${img ? " has-img" : ""}" data-img="cover" style="--c1:${c[0]};--c2:${c[1]}"><span class="cover-title">${esc(b.title)}</span>${imgTag(img)}</div>
        <div class="card-body">
          <h3>${esc(b.title)}</h3>
          ${f.author ? `<div class="author">${esc(f.author)}</div>` : ""}
          ${f.desc ? `<p class="card-desc">${esc(f.desc)}</p>` : ""}
          <div class="card-foot">
            <span class="price">${fmt(b.price)}</span>
            <button class="add" data-add="${esc(b.id)}">أضف للسلة</button>
          </div>
        </div>
      </article>`;
  }).join("");
  if (!cards.trim()) { $("new").hidden = true; return; }
  $("newGrid").innerHTML = cards;
}

// ==========================================
// الأقسام
// ==========================================
function renderCategories() {
  $("catGrid").innerHTML = CATEGORIES.map(c => `
    <button class="cat-tile" data-cat="${c.id}" style="--cat-bg:linear-gradient(90deg,${c.color[0]},${c.color[1]})">
      <span class="ic" aria-hidden="true">${c.icon}</span>
      <h3>${esc(c.name)}</h3>
      <span class="n">${num(c.books.length)} كتاب</span>
    </button>`).join("");
}

function renderTabs() {
  const tabs = [{ id: "all", name: "الكل", n: books.length },
    ...CATEGORIES.map(c => ({ id: c.id, name: c.name, n: c.books.length }))];
  $("tabs").innerHTML = tabs.map(t =>
    `<button class="chip ${t.id === state.cat ? "active" : ""}" data-cat="${t.id}">${esc(t.name)} <small>${num(t.n)}</small></button>`
  ).join("");
}

// ==========================================
// كل الكتب (بحث + أقسام + عرض المزيد)
// ==========================================
const state = { cat: "all", q: "" };
let currentRows = [];
let renderedCount = 0;

function computeRows() {
  const tokens = norm(state.q).split(" ").filter(Boolean);
  if (tokens.length) {
    const pool = state.cat === "all" ? books : books.filter(b => b.cat === state.cat);
    return pool.filter(b => tokens.every(t => b.search.includes(t)));
  }
  if (state.cat === "all") return CATEGORIES.reduce((all, c) => all.concat(rowsByCat[c.id]), []);
  return rowsByCat[state.cat];
}

const priceTag = b => b.price !== DEFAULT_PRICE ? `<span class="row-price">${fmt(b.price)}</span>` : "";

function bookRowHTML(b) {
  const sub = b.series ? `<div class="row-sub">${esc(b.series.title)}</div>` : "";
  return `
    <div class="row" style="--cat-bg:${catById[b.cat].color[0]}">
      ${thumbHTML(b.img)}
      <div class="row-main"><div class="row-title">${esc(b.title)}</div>${sub}</div>
      ${priceTag(b)}
      <span class="row-count" data-count-for="${esc(b.id)}"></span>
      <button class="add-sm" data-add="${esc(b.id)}" aria-label="أضف ${esc(b.title)}">+</button>
    </div>`;
}

function seriesRowHTML(s) {
  const parts = s.parts.map(p => `
    <div class="part">
      <span class="part-title">${esc(p.title)}</span>
      ${priceTag(p)}
      <span class="row-count" data-count-for="${esc(p.id)}"></span>
      <button class="add-sm" data-add="${esc(p.id)}" aria-label="أضف ${esc(p.title)}">+</button>
    </div>`).join("");
  return `
    <div class="row series" style="--cat-bg:${catById[s.cat].color[0]}">
      ${thumbHTML(s.img)}
      <div class="row-main">
        <div class="row-title">${esc(s.title)}</div>
        <div class="row-sub">سلسلة، ${countLabel(s.parts.length, s.kind)}</div>
      </div>
      <span class="row-price">${fmt(s.price)}</span>
      <button class="toggle" aria-expanded="false">الأجزاء <span class="chev" aria-hidden="true">⌄</span></button>
      <span class="row-count" data-count-for="${esc(s.id)}"></span>
      <button class="add" data-add="${esc(s.id)}">أضف الكل</button>
      <div class="parts"><div class="parts-inner">${parts}</div></div>
    </div>`;
}

const rowHTML = r => r.type === "series" ? seriesRowHTML(r) : bookRowHTML(r);
const rowBookCount = rows => rows.reduce((n, r) => n + (r.type === "series" ? r.parts.length : 1), 0);

function emptyHTML() {
  const wa = CONFIG.whatsappNumber
    ? `<a class="btn ghost" target="_blank" rel="noopener" href="https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent("عايز أسأل عن كتاب: " + state.q)}">اسأل عنه على واتساب</a>` : "";
  return `<div class="empty-list"><p>مفيش نتيجة لـ «${esc(state.q)}»</p><p>جرّب كلمة تانية، أو اسأل عن الكتاب مباشرة.</p>${wa}</div>`;
}

function updateMeta() {
  const n = rowBookCount(currentRows);
  const catName = state.cat === "all" ? "كل الأقسام" : catById[state.cat].name;
  $("resultMeta").textContent = state.q.trim()
    ? `${num(n)} نتيجة`
    : `${catName}: ${num(n)} كتاب`;
}

function appendRows() {
  const list = $("list");
  const more = $("moreBooks");
  if (!currentRows.length) {
    list.innerHTML = emptyHTML();
    more.hidden = true;
    return;
  }
  const next = currentRows.slice(renderedCount, renderedCount + PAGE_SIZE);
  list.insertAdjacentHTML("beforeend", next.map(rowHTML).join(""));
  renderedCount += next.length;
  updateCounts();
  const left = currentRows.length - renderedCount;
  more.hidden = left <= 0;
  more.textContent = `عرض المزيد (${num(left)})`;
}

function renderList() {
  currentRows = computeRows();
  renderedCount = 0;
  $("list").innerHTML = "";
  appendRows();
  updateMeta();
}

let swapTimer;
function setCategory(id, scroll) {
  const changed = id !== state.cat;
  state.cat = id;
  $("tabs").querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c.dataset.cat === id));
  if (scroll) {
    $("books").scrollIntoView({ behavior: prefersReduced.matches ? "auto" : "smooth", block: "start" });
  }
  if (!changed) return;
  clearTimeout(swapTimer);
  if (prefersReduced.matches) { renderList(); return; }
  const list = $("list");
  list.classList.add("is-swapping");
  swapTimer = setTimeout(() => {
    renderList();
    list.classList.remove("is-swapping");
  }, 280);
}

let searchTimer;
$("search").addEventListener("input", e => {
  state.q = e.target.value;
  clearTimeout(searchTimer);
  searchTimer = setTimeout(renderList, 120);
});
$("moreBooks").onclick = appendRows;

// ==========================================
// السلة
// ==========================================
function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) || "{}");
    const c = {};
    Object.keys(saved).forEach(id => { if (ITEMS[id] && saved[id] > 0) c[id] = saved[id]; });
    return c;
  } catch (err) {
    return {};
  }
}
function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (err) { /* مش مشكلة */ }
}

let cart = loadCart();

function cartTotal() {
  return Object.keys(cart).reduce((t, id) => t + ITEMS[id].price * cart[id], 0);
}

function itemSub(it) {
  if (it.type === "series") return "سلسلة، " + countLabel(it.parts.length, it.kind);
  if (it.type === "bundle") return it.was ? "عرض، وفّر " + fmt(it.was - it.price) : "عرض";
  return fmt(it.price);
}

function updateCounts() {
  document.querySelectorAll("[data-count-for]").forEach(el => {
    const n = cart[el.dataset.countFor] || 0;
    el.textContent = n ? "×" + num(n) : "";
    el.classList.toggle("on", n > 0);
  });
}

function renderCart() {
  const ids = Object.keys(cart);
  const count = ids.reduce((s, id) => s + cart[id], 0);
  $("cartCount").textContent = num(count);

  let saving = 0;
  if (!ids.length) {
    $("items").innerHTML = '<div class="empty">السلة فاضية 📭<br>ضيف كتب أو عروض، وبعدها كمّل الطلب</div>';
  } else {
    $("items").innerHTML = ids.map(id => {
      const it = ITEMS[id];
      if (it.was) saving += (it.was - it.price) * cart[id];
      return `
        <div class="item">
          <div class="item-info"><strong>${esc(it.title)}</strong><small>${esc(itemSub(it))}</small></div>
          <div class="item-side">
            <div class="qty">
              <button data-act="dec" data-id="${esc(id)}" aria-label="تقليل">−</button>
              <span>${num(cart[id])}</span>
              <button data-act="inc" data-id="${esc(id)}" aria-label="زيادة">+</button>
            </div>
            <span class="line-price">${fmt(it.price * cart[id])}</span>
          </div>
        </div>`;
    }).join("");
  }
  $("total").textContent = fmt(cartTotal());
  $("saving").hidden = !saving;
  $("savingAmount").textContent = fmt(saving);
  $("toForm").disabled = !ids.length;
  saveCart();
  updateCounts();
}

function addToCart(id) {
  if (!ITEMS[id]) return;
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
  bumpBadge();
  toast("تمت الإضافة للسلة ✅");
}

$("items").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  const id = b.dataset.id;
  if (b.dataset.act === "inc") cart[id]++;
  if (b.dataset.act === "dec") {
    cart[id]--;
    if (cart[id] <= 0) delete cart[id];
  }
  renderCart();
});

// ====== السلة الجانبية ======
function showView(name) {
  const isForm = name === "form";
  $("viewCart").hidden = isForm;
  $("orderForm").hidden = !isForm;
  $("drawerTitle").textContent = isForm ? "بيانات الطلب" : "سلة المشتريات";
  const v = isForm ? $("orderForm") : $("viewCart");
  if (!prefersReduced.matches) {
    v.classList.remove("show");
    void v.offsetWidth;
    v.classList.add("show");
  }
}
const openCart = () => {
  showView("cart");
  $("drawer").classList.add("open");
  $("overlay").classList.add("open");
};
const closeCart = () => {
  $("drawer").classList.remove("open");
  $("overlay").classList.remove("open");
};
$("cartBtn").onclick = openCart;
$("closeCart").onclick = closeCart;
$("overlay").onclick = closeCart;
$("toForm").onclick = () => {
  if (!Object.keys(cart).length) return toast("السلة فاضية!");
  showView("form");
};
$("backToCart").onclick = () => showView("cart");

// ====== إرسال الطلب على واتساب ======
$("orderForm").addEventListener("submit", e => {
  e.preventDefault();
  const ids = Object.keys(cart);
  if (!ids.length) { showView("cart"); return toast("السلة فاضية!"); }

  const f = new FormData(e.target);
  const val = k => String(f.get(k) || "").trim();

  const lines = ids.map(id => {
    const it = ITEMS[id];
    const prefix = it.type === "bundle" ? "[عرض] " : it.type === "series" ? "[سلسلة] " : "";
    const name = it.type === "series" ? it.label : it.title;
    const inside = it.type === "bundle" && it.parts.length
      ? " (" + it.parts.map(p => p.title).join("، ") + ")" : "";
    return `• ${prefix}${name}${inside} × ${cart[id]} = ${fmt(it.price * cart[id])}`;
  });

  const msg = [
    "أهلاً عالم الكتب، عايز أطلب:",
    ...lines,
    "",
    `الإجمالي: ${fmt(cartTotal())}`,
    "",
    `الاسم: ${val("name")}`,
    `التليفون: ${val("phone")}`,
    val("governorate") ? `المحافظة: ${val("governorate")}` : "",
    `العنوان: ${val("address")}`,
    val("notes") ? `ملاحظات: ${val("notes")}` : ""
  ].filter((l, i, a) => l !== "" || a[i - 1] !== "").join("\n").trim();

  if (CONFIG.whatsappNumber) {
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  } else {
    toast("شكرًا لطلبك! هنتواصل معاك قريب 🎉");
  }
  cart = {};
  renderCart();
  closeCart();
  e.target.reset();
});

// ====== حركة بسيطة لعدّاد السلة ======
function bumpBadge() {
  const b = $("cartCount");
  b.classList.remove("bump");
  void b.offsetWidth; // يعيد تشغيل الحركة
  b.classList.add("bump");
}

// ====== Toast ======
let toastTimer;
function toast(msg) {
  const el = $("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

// ==========================================
// ضغطات عامة (إضافة للسلة / الأجزاء / الأقسام / التابات)
// ==========================================
document.addEventListener("click", e => {
  const add = e.target.closest("[data-add]");
  if (add) { addToCart(add.dataset.add); return; }

  const more = e.target.closest(".items-toggle");
  if (more) {
    const open = more.closest(".offer").classList.toggle("open");
    more.setAttribute("aria-expanded", String(open));
    return;
  }

  const tog = e.target.closest(".toggle");
  if (tog) {
    const open = tog.closest(".row").classList.toggle("open");
    tog.setAttribute("aria-expanded", String(open));
    return;
  }

  const tile = e.target.closest(".cat-tile");
  if (tile) { setCategory(tile.dataset.cat, true); return; }

  const chip = e.target.closest("#tabs .chip");
  if (chip) setCategory(chip.dataset.cat, false);
});

// ==========================================
// التواصل
// ==========================================
(function setupContact() {
  if (CONFIG.whatsappNumber) {
    $("waLink").href = `https://wa.me/${CONFIG.whatsappNumber}`;
    $("waLink").textContent = "WhatsApp: +" + CONFIG.whatsappNumber;
    $("phone1").href = `tel:+${CONFIG.whatsappNumber}`;
    $("phone1").textContent = "+" + CONFIG.whatsappNumber;
  } else {
    $("waItem").hidden = true;
  }
  if (CONFIG.instagramUrl) {
    $("igLink").href = CONFIG.instagramUrl;
  } else {
    $("igItem").hidden = true;
  }

  // زرار الواتساب العايم
  const wa = $("waFloat");
  if (CONFIG.whatsappNumber) {
    const text = encodeURIComponent("أهلاً عالم الكتب، عايز أستفسر عن كتاب");
    wa.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;
  } else {
    wa.hidden = true;
  }

  // زرار "اطلب على واتساب" في قسم إزاي تطلب
  const howWa = $("howWa");
  if (CONFIG.whatsappNumber) {
    const text = encodeURIComponent("أهلاً عالم الكتب، عايز أطلب كتب:");
    howWa.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;
  } else {
    howWa.hidden = true;
  }
})();

// ====== آراء القرّاء (بتظهر لما تضيف آراء في قسم البيانات في script.js) ======
if (REVIEWS.length) {
  $("quotes").innerHTML = REVIEWS.map(r =>
    `<div class="quote"><p>${esc(r.text)}</p><b>${esc(r.name || "")}</b></div>`).join("");
  $("reviews").hidden = false;
}

// ====== أرقام حقيقية من البيانات ======
$("statBooks").dataset.count = books.length;
$("statOffers").dataset.count = bundles.length;
$("statSeries").dataset.count = seriesCount;
$("statPrice").dataset.count = DEFAULT_PRICE;
document.querySelectorAll("[data-default-price]").forEach(el => { el.textContent = num(DEFAULT_PRICE); });

// ====== عدّاد الأرقام ======
function countUp(el) {
  const target = +el.dataset.count;
  const show = n => { el.textContent = num(Math.round(n)); };

  if (prefersReduced.matches) { show(target); return; }

  const duration = 1800;
  const start = performance.now();
  const tick = now => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 4); // بيبدأ سريع ويهدّى في الآخر
    show(target * eased);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) { countUp(en.target); io.unobserve(en.target); }
  });
});
document.querySelectorAll("[data-count]").forEach(el => io.observe(el));

// ====== الوضع الليلي ======
let themeTimer;
$("themeBtn").onclick = () => {
  const root = document.documentElement;
  const isDark =
    root.dataset.theme === "dark" ||
    (!root.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
  if (!prefersReduced.matches) {
    root.classList.add("theme-anim");
    clearTimeout(themeTimer);
    themeTimer = setTimeout(() => root.classList.remove("theme-anim"), 650);
  }
  root.dataset.theme = isDark ? "light" : "dark";
};

// ====== قايمة الموبايل ======
const menuBtn = $("menuBtn");
const mobileMenu = $("mobileMenu");

function setMenu(open) {
  mobileMenu.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "إغلاق القايمة" : "فتح القايمة");
  menuBtn.textContent = open ? "✕" : "☰";
}
menuBtn.onclick = () => setMenu(!mobileMenu.classList.contains("open"));
mobileMenu.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", e => {
  if (e.key === "Escape") { setMenu(false); closeCart(); }
});
matchMedia("(min-width: 861px)").addEventListener("change", e => { if (e.matches) setMenu(false); });

// ====== تشغيل ======
$("year").textContent = new Date().getFullYear().toLocaleString("ar-EG", { useGrouping: false });
renderOffers();
renderNew();
renderCategories();
renderTabs();
renderList();
renderCart();
