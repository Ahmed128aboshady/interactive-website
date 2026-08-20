/* -------------------------------------------------------------
   AI Engine for ScienceGuide - Handles Local Simulation & Gemini API
   ------------------------------------------------------------- */

class AstroTutorEngine {
    constructor() {
        this.apiKey = localStorage.getItem('gemini_api_key') || null;
        this.systemInstruction = `
أنت معلم علوم مدرسي مصري تفاعلي ذكي واسمك (مستر شريف).
وظيفتك هي إجابة أسئلة الطلاب حول مادة العلوم (الأحياء، الكيمياء، الفيزياء) بأسلوب شيق، مبسط، مشجع، ومليء بالرموز التعبيرية 🧬🧪🌡️.

يحتوي موقعنا التفاعلي على الأقسام والصفحات التالية:
1. cell-section (عن الخلية الحية وعضياتها: النواة nucleus، الميتوكوندريا mitochondria، السيتوبلازم cytoplasm)
2. elements-section (عن العناصر الكيميائية: الهيدروجين hydrogen، الأكسجين oxygen، الكربون carbon، الحديد iron)
3. states-section (عن حالات المادة وحركة جزيئاتها: الصلبة solid، السائلة liquid، الغازية gas)
4. quiz-section (مختبر أسئلة كويز العلوم التفاعلي)

لكي تجعل الموقع يتفاعل مع كلامك وتوجيه الطالب، يجب أن تكتب كود توجيهي في نهاية إجابتك تماماً (على سطر جديد) ليوجه الصفحة للقسم المناسب.
الصيغة المطلوبة للأكواد التوجيهية هي:
- للتنقل لقسم الخلية الحية: [NAV:cell-section]
- للتنقل لعضية محددة في الخلية: [NAV:cell-section:spot-name] (حيث spot-name هي: nucleus أو mitochondria أو cytoplasm)
- للتنقل لقسم العناصر الكيميائية: [NAV:elements-section]
- للتنقل لعنصر كيميائي محدد: [NAV:elements-section:element-name] (حيث element-name هي: hydrogen أو oxygen أو carbon أو iron)
- للتنقل لقسم حالات المادة: [NAV:states-section]
- للتنقل لحالة مادة محددة: [NAV:states-section:state-name] (حيث state-name هي: solid أو liquid أو gas)
- للتنقل لقسم الكويز والاختبارات: [NAV:quiz-section]

يرجى الالتزام التام بإضافة الكود التوجيهي [NAV:...] في نهاية إجابتك إذا كان كلامك يخص درساً أو قسماً معيناً ليتحرك الموقع تلقائياً مع شرحك!
أجب باللغة العربية دائماً وبشكل ودود ومحبب وبسيط للطلاب كمعلم حقيقي.
`;

        // Local Fallback Database for General Science
        this.localResponses = [
            {
                keywords: ['خلية', 'خليه', 'النواة', 'النواه', 'ميتوكوندريا', 'سيتوبلازم', 'أحياء', 'احياء', 'nucleus', 'mitochondria', 'cytoplasm'],
                text: `الخلية هي وحدة البناء والوظيفة في جسم الكائن الحي! 🧬 وتتكون الخلية من أجزاء هامة (عضيات) تعمل معاً:
1. **النواة (Nucleus):** مركز التحكم في الخلية، تحتوي على المادة الوراثية وتتحكم في انقسام الخلية.
2. **الميتوكوندريا (Mitochondria):** محطة توليد الطاقة في الخلية، حيث تنتج الطاقة اللازمة للأنشطة الحيوية.
3. **السيتوبلازم (Cytoplasm):** سائل هلامي تسبح فيه العضيات وتحدث فيه معظم العمليات الحيوية.

سأحرك الصفحة الآن لمجسم الخلية الحية التفاعلي! اضغط على الأرقام (1، 2، 3) لاستكشاف العضيات بنفسك.`,
                nav: 'cell-section'
            },
            {
                keywords: ['نواة', 'نواه', 'تحكم'],
                text: `النواة (Nucleus) 🔮 هي بمثابة "مخ الخلية" ومركز التحكم الرئيسي بها! هي التي تحتوي على الحمض النووي (DNA) وتوجه الخلية في عمليات التكاثر وإنتاج البروتينات.

سأوجهك الآن مباشرة لنواة الخلية في مجسم الشرح التفاعلي!`,
                nav: 'cell-section:nucleus'
            },
            {
                keywords: ['ميتوكوندريا', 'طاقة الخلية', 'طاقة الخليه'],
                text: `الميتوكوندريا (Mitochondria) ⚡ هي مصنع إنتاج الطاقة الحقيقي داخل الخلية الحية! تقوم بحرق الغذاء (الجلوكوز) باستخدام الأكسجين لإنتاج جزيئات الطاقة الكيميائية (ATP) التي تدعم حركة الخلية ونشاطها.

سأنقلك الآن للميتوكوندريا في مجسم الخلية لتشاهد تفاصيلها!`,
                nav: 'cell-section:mitochondria'
            },
            {
                keywords: ['سيتوبلازم', 'السائل'],
                text: `السيتوبلازم (Cytoplasm) 🧪 هو السائل الهلامي شبه السائل الذي يملأ فراغ الخلية وتسبح فيه كل العضيات الأخرى. يتكون معظمه من الماء وتحدث فيه الكثير من التفاعلات الكيميائية الأساسية للحياة.

سأوجه الشاشة الآن لقسم السيتوبلازم في الخلية!`,
                nav: 'cell-section:cytoplasm'
            },
            {
                keywords: ['كربون', 'الكربون', 'carbon'],
                text: `عنصر الكربون (Carbon) 🖤 هو عمود الخيمة للحياة على الأرض! يمتلك عدداً ذرياً يساوي 6، ويتميز بقدرته الفريدة على تكوين سلاسل طويلة من الروابط الكيميائية، ويوجد في الطبيعة بصور مختلفة مثل الفحم المتواضع والألماس الثمين!

سأنقلك الآن لقسم العناصر الكيميائية وأحدد لك الكربون!`,
                nav: 'elements-section:carbon'
            },
            {
                keywords: ['أكسجين', 'اكسجين', 'oxygen'],
                text: `الأكسجين (Oxygen) 💨 هو غاز الحياة الذي نتنفسه! يمثل حوالي 21% من غلافنا الجوي، وعدده الذري 8. يدخل في تركيب الماء (H₂O) وهو ضروري جداً لعمليات التنفس وحرق الغذاء لإنتاج الطاقة في أجسام الكائنات الحية.

سأوجه الصفحة لعنصر الأكسجين في لوحة المستكشف الكيميائي!`,
                nav: 'elements-section:oxygen'
            },
            {
                keywords: ['حديد', 'الحديد', 'iron'],
                text: `الحديد (Iron) 🔩 هو عنصر الصلابة والقوة! عدده الذري 26، وهو من أهم المعادن الانتقالية في القشرة الأرضية. يدخل في صناعة المباني والآلات، كما أنه عنصر حيوي يدخل في تركيب الهيموجلوبين لنقل الأكسجين في دمنا!

سأنقل الشاشة لعنصر الحديد لتشاهد خصائصه الكيميائية!`,
                nav: 'elements-section:iron'
            },
            {
                keywords: ['هيدروجين', 'الهيدروجين', 'hydrogen'],
                text: `الهيدروجين (Hydrogen) 🎈 هو أخف وأبسط العناصر الكيميائية في الكون كله! عدده الذري 1، وهو المكون الرئيسي للنجوم والشمس، ويدمج مع الأكسجين ليكون المياه التي نشربها.

دعنا نلقي نظرة على الهيدروجين في لوحة العناصر الكيميائية!`,
                nav: 'elements-section:hydrogen'
            },
            {
                keywords: ['كيمياء', 'عناصر', 'العناصر', 'الجدول الدوري'],
                text: `العناصر الكيميائية هي المواد النقية الأساسية التي لا يمكن تجزئتها لـمواد أبسط. مثل الكربون والأكسجين والحديد والهيدروجين. تم ترتيبها في الجدول الدوري حسب أعدادها الذرية.

سأنقلك الآن لمستكشف العناصر الكيميائية لمقارنة خصائصها!`,
                nav: 'elements-section'
            },
            {
                keywords: ['صلب', 'الصلبة', 'الصلبه', 'solid'],
                text: `الحالة الصلبة (Solid) 🧱 تتميز بأن المواد فيها لها شكل ثابت وحجم ثابت، والسبب في ذلك أن جزيئاتها متقاربة جداً ومتراصة بقوة بقوى ترابط كبيرة، وتتحرك فقط حركة اهتزازية بسيطة في مكانها دون انتقال.

سأوجه الصفحة لمحاكاة جزيئات المادة الصلبة لتشاهد حركتها الاهتزازية البسيطة!`,
                nav: 'states-section:solid'
            },
            {
                keywords: ['سائل', 'السائلة', 'السائله', 'liquid'],
                text: `الحالة السائلة (Liquid) 💧 تتميز بأن لها حجماً ثابتاً ولكن شكلها غير ثابت (تأخذ شكل الإناء الذي توضع فيه)، لأن قوى الترابط بين جزيئاتها أضعف نسبياً من الصلبة، مما يسمح للجزيئات بالانزلاق والحركة بحرية أكبر.

دعنا ننتقل لمحاكاة الحالة السائلة لتشاهد كيف تتحرك الجزيئات وتنزلق حول بعضها!`,
                nav: 'states-section:liquid'
            },
            {
                keywords: ['غاز', 'الغازية', 'الغازيه', 'gas'],
                text: `الحالة الغازية (Gas) 💨 تتميز بأن ليس لها حجم ثابت ولا شكل ثابت، فقوى الترابط بين الجزيئات تكاد تكون منعدمة، والجزيئات متباعدة جداً وتتحرك بحرية تامة وبسرعة كبيرة في جميع الاتجاهات لتملأ أي وعاء.

سأحرك الصفحة لمحاكاة جزيئات الحالة الغازية العشوائية وسريعة الحركة!`,
                nav: 'states-section:gas'
            },
            {
                keywords: ['حالات المادة', 'المادة', 'فيزياء', 'جزيئات', 'الجزيئات'],
                text: `توجد المادة في ثلاث حالات أساسية في الطبيعة: الصلبة (حجم وشكل ثابت)، السائلة (حجم ثابت وشكل متغير)، والغازية (حجم وشكل متغير). والسبب في اختلافها هو المسافات وقوى الترابط بين الجزيئات.

سأنقلك الآن لقسم محاكاة جزيئات المادة لتدرس حركتها بنفسك!`,
                nav: 'states-section'
            },
            {
                keywords: ['اختبار', 'كويز', 'اسئلة', 'أسئلة', 'امتحان', 'تقييم', 'تحدي', 'تحدي المعرفة', 'quiz'],
                text: `أنت جاهز لتحدي مستر شريف العلمي؟ 🎓
أعددت لك اختباراً من 3 أسئلة ليقيس فهمك للخلية والعناصر الكيميائية وحالات المادة.

سأنقلك الآن لأسفل الصفحة عند قسم كويز العلوم، اضغط على "ابدأ الكويز" وريني شطارتك! بالتوفيق!`,
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
        return this.apiKey !== null;
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
