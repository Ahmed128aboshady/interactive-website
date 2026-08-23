/* -------------------------------------------------------------
   AI Engine for ScienceGuide - Handles Local Simulation & Gemini API
   ------------------------------------------------------------- */

class AstroTutorEngine {
    constructor() {
        this.apiKey = localStorage.getItem('gemini_api_key') || null;
        this.systemInstruction = `
أنت معلم علوم مدرسي مصري تفاعلي ذكي واسمك (مستر شريف).
وظيفتك هي إجابة أسئلة الطلاب حول مادة العلوم (الأحياء، الكيمياء، الفيزياء) بأسلوب شيق، مبسط، مشجع، ومتكلم بصوت واضح 🧬🧪🌡️.

عند الشرح، وجه الطالب تفاعلياً كمعلم حقيقي، مثل:
- "لو ضغطت على رقم (1) في مجسم الخلية ستجد النواة..."
- "لو ضغطت على بطاقة عنصر الكربون ستجد عدده الذري..."
- "لو ضغطت على زر الحالة الصلبة ستشاهد حركة الجزيئات..."

يحتوي موقعنا التفاعلي على الأقسام التالية:
1. cell-section (عن الخلية الحية وعضياتها: النواة nucleus رقم 1، الميتوكوندريا mitochondria رقم 2، السيتوبلازم cytoplasm رقم 3)
2. elements-section (عن العناصر الكيميائية: الهيدروجين hydrogen، الأكسجين oxygen، الكربون carbon، الحديد iron)
3. states-section (عن حالات المادة وحركة جزيئاتها: الصلبة solid، السائلة liquid، الغازية gas)
4. quiz-section (مختبر أسئلة كويز العلوم التفاعلي)

يجب أن تكتب كود توجيهي في نهاية إجابتك تماماً (على سطر جديد):
- لتحديد عضية الخلية: [NAV:cell-section:nucleus] أو [NAV:cell-section:mitochondria] أو [NAV:cell-section:cytoplasm]
- لتحديد عنصر كيميائي: [NAV:elements-section:carbon] أو [NAV:elements-section:oxygen] أو [NAV:elements-section:iron] أو [NAV:elements-section:hydrogen]
- لتحديد حالة مادة: [NAV:states-section:solid] أو [NAV:states-section:liquid] أو [NAV:states-section:gas]
- للتنقل لقسم الكويز: [NAV:quiz-section]
`;

        // Local Fallback Database for General Science
        this.localResponses = [
            {
                keywords: ['خلية', 'خليه', 'أحياء', 'احياء'],
                text: `الخلية هي وحدة البناء والوظيفة في جسم الكائن الحي! 🧬
لو ضغطت على رقم (1) في مجسم الخلية ستجد النواة مركز التحكم، ولو ضغطت على رقم (2) ستجد الميتوكوندريا مصنع الطاقة، ورقم (3) هو السيتوبلازم السائل الحيوي! 
سأفتح لك رقم (1) الآن في اللوحة التفاعلية لنشرح النواة سوا!`,
                nav: 'cell-section:nucleus'
            },
            {
                keywords: ['نواة', 'نواه', 'تحكم', 'nucleus', '1', 'واحد', 'رقم 1'],
                text: `لو ضغطت على رقم (1) في مجسم الخلية 🔮 ستجد النواة! 
النواة هي مخ الخلية ومركز التحكم الرئيسي، وتحتوي على الحمض النووي (DNA) وتوجه انقسام الخلية. لقد فتحت لك رقم 1 الآن في المجسم التفاعلي!`,
                nav: 'cell-section:nucleus'
            },
            {
                keywords: ['ميتوكوندريا', 'طاقة', 'mitochondria', '2', 'ثنين', 'اثنين', 'رقم 2'],
                text: `لو ضغطت على رقم (2) في مجسم الخلية ⚡ ستجد الميتوكوندريا! 
الميتوكوندريا هي مصنع الطاقة الحقيقي داخل الخلية، حيث تحرق سكر الجلوكوز بالأكسجين وتولد مركبات الطاقة ATP. سأفتح لك رقم 2 الآن لتشاهد تفاصيلها!`,
                nav: 'cell-section:mitochondria'
            },
            {
                keywords: ['سيتوبلازم', 'السائل', 'cytoplasm', '3', 'ثلاثة', 'ثلاثه', 'رقم 3'],
                text: `لو ضغطت على رقم (3) في مجسم الخلية 🧪 ستجد السيتوبلازم! 
السيتوبلازم هو السائل الهلامي الذي يملأ الخلية وتسبح فيه كل العضيات الحيوية وتحدث فيه التفاعلات. لقد فتحت لك رقم 3 الآن لتستكشفه!`,
                nav: 'cell-section:cytoplasm'
            },
            {
                keywords: ['كربون', 'الكربون', 'carbon'],
                text: `لو ضغطت على بطاقة عنصر الكربون (C) 🖤 في لوحة العناصر، ستجد عدده الذري 6 وكتلته الذرية 12.011! 
الكربون هو أساس الكيمياء العضوية وجميع أشكال الحياة على الأرض. لقد فتحت لك بطاقة الكربون الآن لمشاهدة خصائصه!`,
                nav: 'elements-section:carbon'
            },
            {
                keywords: ['أكسجين', 'اكسجين', 'oxygen'],
                text: `لو ضغطت على بطاقة عنصر الأكسجين (O) 💨 في اللوحة الكيميائية، ستجد عدده الذري 8! 
الأكسجين هو غاز الحياة الأساسي للتنفس ويمثل 21% من الغلاف الجوي. لقد حددت لك بطاقة الأكسجين الآن في اللوحة!`,
                nav: 'elements-section:oxygen'
            },
            {
                keywords: ['حديد', 'الحديد', 'iron'],
                text: `لو ضغطت على بطاقة عنصر الحديد (Fe) 🔩 ستجد عدده الذري 26! 
الحديد هو معدن الصلابة والقوة ويدخل في تركيب هيموجلوبين الدم لنقل الأكسجين. سأفتح لك بطاقة الحديد الآن لتشاهد بياناته!`,
                nav: 'elements-section:iron'
            },
            {
                keywords: ['هيدروجين', 'الهيدروجين', 'hydrogen'],
                text: `لو ضغطت على بطاقة عنصر الهيدروجين (H) 🎈 ستجد عدده الذري 1! 
الهيدروجين هو أبسط وأخف العناصر في الكون والمكون الرئيسي للنجوم والمياه. لقد حددت لك الهيدروجين الآن!`,
                nav: 'elements-section:hydrogen'
            },
            {
                keywords: ['كيمياء', 'عناصر', 'العناصر', 'الجدول الدوري'],
                text: `العناصر الكيميائية هي المواد النقية الأساسية! 🧪 
لو ضغطت على أي عنصر من بطاقات لوحة الكيمياء مثل الكربون أو الأكسجين أو الحديد ستجد عدده الذري وكتلته. سأفتح لك عنصر الكربون الآن لتجربته!`,
                nav: 'elements-section:carbon'
            },
            {
                keywords: ['صلب', 'الصلبة', 'الصلبه', 'solid'],
                text: `لو ضغطت على زر (الصلبة) 🧱 في لوحة الفيزياء، ستلاحظ أن الجزيئات متقاربة جداً ومتراصة وتحتفظ بشكل وحجم ثابت! 
لقد شغلت لك محاكاة الحالة الصلبة الآن لتشاهد حركة جزيئاتها الاهتزازية!`,
                nav: 'states-section:solid'
            },
            {
                keywords: ['سائل', 'السائلة', 'السائله', 'liquid'],
                text: `لو ضغطت على زر (السائلة) 💧 في المحاكاة، ستشاهد أن الجزيئات تنزلق بحرية أكبر وتأخذ شكل الوعاء! 
لقد فتحت لك محاكاة الحالة السائلة الآن لتدرس حركتها!`,
                nav: 'states-section:liquid'
            },
            {
                keywords: ['غاز', 'الغازية', 'الغازيه', 'gas'],
                text: `لو ضغطت على زر (الغازية) 💨 ستشاهد الجزيئات متباعدة جداً وتتحرك بحرية تامة وبسرعة كبيرة في جميع الاتجاهات! 
لقد شغلت لك محاكاة الحالة الغازية الآن!`,
                nav: 'states-section:gas'
            },
            {
                keywords: ['حالات المادة', 'المادة', 'فيزياء', 'جزيئات', 'الجزيئات'],
                text: `توجد المادة في ثلاث حالات أساسية: الصلبة والسائلة والغازية! 🌡️ 
لو ضغطت على أزرار حالات المادة ستشاهد كيف تتغير حركة الجزيئات وقوى الترابط بينها. سأفتح لك محاكاة الحالة الصلبة الآن لنبدأ!`,
                nav: 'states-section:solid'
            },
            {
                keywords: ['اختبار', 'كويز', 'اسئلة', 'أسئلة', 'امتحان', 'تقييم', 'تحدي', 'quiz'],
                text: `جاهز لتحدي مستر شريف العلمي؟ 🎓 
لو ضغطت على زر (ابدأ الكويز) سيبدأ الاختبار فوراً المكون من 3 أسئلة. لقد فتحت لك لوحة الكويز الآن، وريني شطارتك!`,
                nav: 'quiz-section'
            }
        ];
    }

    setApiKey(key) {
        if (key && key.trim().startsWith('AIzaSy')) {
            this.apiKey = key.trim();
            localStorage.setItem('gemini_api_key', this.apiKey);
            return true;
        }
        return false;
    }

    clearApiKey() {
        this.apiKey = null;
        localStorage.removeItem('gemini_api_key');
    }

    isApiKeyActive() {
        this.apiKey = localStorage.getItem('gemini_api_key') || null;
        return this.apiKey !== null && this.apiKey.trim() !== '';
    }

    // Main interaction endpoint
    async getResponse(userInput) {
        if (this.isApiKeyActive()) {
            try {
                return await this.callGeminiAPI(userInput);
            } catch (error) {
                console.error("Gemini API Error, falling back to local simulation:", error);
                return this.getLocalResponse(userInput);
            }
        } else {
            await new Promise(resolve => setTimeout(resolve, 800));
            return this.getLocalResponse(userInput);
        }
    }

    // Call actual Gemini 1.5 Flash API
    async callGeminiAPI(prompt) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
        
        const payload = {
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: this.systemInstruction },
                        { text: `سؤال الطالب الحالي: ${prompt}` }
                    ]
                }
            ],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 500,
            }
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP Error Status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const textResponse = data.candidates[0].content.parts[0].text;
            return this.parseResponse(textResponse);
        } else {
            throw new Error("Invalid response structure from Gemini API");
        }
    }

    // Local simulation parsing
    getLocalResponse(input) {
        const lowercaseInput = input.toLowerCase();
        
        for (const item of this.localResponses) {
            const matched = item.keywords.some(keyword => lowercaseInput.includes(keyword));
            if (matched) {
                return {
                    text: item.text,
                    nav: item.nav
                };
            }
        }

        // Default response if no keywords matched
        return {
            text: `سؤال جميل جداً! 🔬 بصفتي معلم العلوم الخاص بك، يسعدني الإجابة على أي سؤال يخص الخلية الحية، أو العناصر الكيميائية، أو حالات المادة وحركة الجزيئات.
جرب أن تسألني عن:
- النواة أو الميتوكوندريا في الخلية 🧬
- عنصر الأكسجين أو الحديد أو الكربون الكيميائي 🧪
- المادة في حالتها الصلبة والسائلة والغازية 🌡️
- أو قل لي "ابدأ الكويز" لأختبر معلوماتك! 🚀

أدخل سؤالك أو تحدث بصوتك وسأوجهك للقسم المناسب فوراً!`,
            nav: null
        };
    }

    // Parse navigation tokens from response text
    parseResponse(rawText) {
        const navRegex = /\[NAV:([^\]]+)\]/;
        const match = rawText.match(navRegex);
        
        let cleanedText = rawText.replace(navRegex, '').trim();
        let navCommand = null;
        
        if (match && match[1]) {
            navCommand = match[1];
        }

        return {
            text: cleanedText,
            nav: navCommand
        };
    }
}
