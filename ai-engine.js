/* -------------------------------------------------------------
   AI Engine for CosmoGuide - Handles Local Simulation & Gemini API
   ------------------------------------------------------------- */

class AstroTutorEngine {
    constructor() {
        this.apiKey = localStorage.getItem('gemini_api_key') || null;
        this.systemInstruction = `
أنت معلم فلك وفضاء تفاعلي ذكي واسمك (AstroTutor).
وظيفتك هي إجابة أسئلة الطلاب حول المجموعة الشمسية والفضاء بأسلوب شيق، مبسط، ومليء بالرموز التعبيرية 🚀🌌.

يحتوي موقعنا التفاعلي على الأقسام والصفحات التالية:
1. sun-section (عن الشمس وطبقاتها: اللب Core، الغلاف الضوئي Photosphere، الهالة Corona)
2. rocky-section (عن الكواكب الصخرية الصلبة: عطارد mercury، الزهرة venus، الأرض earth، المريخ mars)
3. gas-section (عن الكواكب الغازية العملاقة: المشتري jupiter، زحل saturn، أورانوس uranus، نبتون neptune)
4. quiz-section (مختبر الأسئلة والكويزات التفاعلية)

لكي تجعل الموقع يتفاعل مع كلامك، يجب أن تكتب كود توجيهي في نهاية إجابتك تماماً (على سطر جديد) ليوجه الصفحة للقسم المناسب.
الصيغة المطلوبة للأكواد التوجيهية هي:
- للتنقل لقسم الشمس: [NAV:sun-section]
- للتنقل لقسم الكواكب الصخرية: [NAV:rocky-section]
- للتنقل لكوكب صخري محدد: [NAV:rocky-section:planet-name] (مثل: [NAV:rocky-section:mars] أو [NAV:rocky-section:earth] إلخ)
- للتنقل لقسم الكواكب الغازية: [NAV:gas-section]
- للتنقل لكوكب غازي محدد: [NAV:gas-section:planet-name] (مثل: [NAV:gas-section:jupiter] أو [NAV:gas-section:saturn] إلخ)
- للتنقل لقسم الكويز والاختبارات: [NAV:quiz-section]

يرجى الالتزام التام بإضافة الكود التوجيهي [NAV:...] في نهاية إجابتك إذا كان كلامك يخص قسماً أو كوكباً معيناً ليتحرك الموقع تلقائياً مع شرحك!
أجب باللغة العربية دائماً وبشكل ودود ومحبب للطلاب.
`;

        // Local Fallback Database
        this.localResponses = [
            {
                keywords: ['شمس', 'الشمس', 'حرارة الشمس', 'كورونا', 'اللب', 'corona', 'core'],
                text: `الشمس هي نجمنا الأم! ☀️ هي كرة عملاقة ملتهبة من الغازات وتشكل 99.8% من كتلة المجموعة الشمسية بأكملها. تتكون الشمس من عدة طبقات رئيسية:
1. **اللب (Core):** المفاعل النووي للشمس وتبلغ حرارته 15 مليون درجة مئوية!
2. **الغلاف الضوئي (Photosphere):** السطح المرئي الذي نراه وتبلغ حرارته 5,500 درجة مئوية.
3. **الإكليل أو الهالة (Corona):** الغلاف الجوي الخارجي ويمتد ملايين الكيلومترات في الفضاء.

سأقوم الآن بتمرير الصفحة لقسم الشمس لعرض المجسم التفاعلي! يمكنك الضغط على النقاط (1، 2، 3) لاستكشاف الطبقات بنفسك.`,
                nav: 'sun-section'
            },
            {
                keywords: ['مريخ', 'المريخ', 'أحمر', 'mars'],
                text: `كوكب المريخ 🔴 يلقب بـ "الكوكب الأحمر" بسبب وفرة أكسيد الحديد (الصدأ) على سطحه. هو رابع كوكب بعداً عن الشمس ويتميز بوجود أكبر بركان في المجموعة الشمسية وهو "جبل أوليمبوس". العلماء مهتمون جداً بدراسته لاحتمالية وجود ماء متجمد تحت سطحه!

سأوجهك الآن مباشرة إلى قسم الكواكب الصخرية وسأفتح بطاقة المريخ لتستعرض إحصاءاته!`,
                nav: 'rocky-section:mars'
            },
            {
                keywords: ['أرض', 'الأرض', 'الحياة', 'earth'],
                text: `كوكب الأرض 🌍 هو موطننا والواحة الزرقاء الوحيدة المعروفة بإيوائها للحياة في الكون الفسيح! يتميز بوجود مياه سائلة تغطي 71% من سطحه، وغلاف جوي مثالي للتنفس يحمينا من الإشعاعات الضارة.

سأنقلك الآن لقسم الكواكب الصخرية لعرض تفاصيل كوكب الأرض في لوحة المقارنة الحية!`,
                nav: 'rocky-section:earth'
            },
            {
                keywords: ['زهرة', 'الزهرة', 'venus'],
                text: `كوكب الزهرة 🪐 هو ثاني كواكب المجموعة الشمسية وهو أكثر الكواكب حرارة على الإطلاق! (تصل حرارته إلى 475 درجة مئوية) والسبب في ذلك هو غلافه الجوي الكثيف جداً الذي يحبس الحرارة مثل الصوبة الزجاجية (الاحتباس الحراري).

سأنتقل بك الآن لقسم الكواكب الصخرية ونلقي نظرة على كوكب الزهرة!`,
                nav: 'rocky-section:venus'
            },
            {
                keywords: ['عطارد', 'mercury'],
                text: `عطارد ☄️ هو أصغر كواكب المجموعة الشمسية وأقربها إلى الشمس. بسبب قربه الشديد، يدور حول الشمس بسرعة كبيرة جداً (سنتُه تعادل 88 يوماً أرضياً فقط)، لكنه يفتقر لغلاف جوي حقيقي يحميه، مما يجعله شديد البرودة ليلاً وشديد الحرارة نهاراً!

سأقوم بتمرير الصفحة لقسم الكواكب الصخرية وتحديد عطارد!`,
                nav: 'rocky-section:mercury'
            },
            {
                keywords: ['مشتري', 'المشتري', 'jupiter'],
                text: `كوكب المشتري 🌀 هو عملاق الغاز وملك الكواكب! هو أكبر كوكب في المجموعة الشمسية (يمكنه احتواء أكثر من 1300 كوكب بحجم الأرض داخله!). يتميز ببقعته الحمراء العظيمة وهي عاصفة مستمرة منذ مئات السنين، ويمتلك أكثر من 95 قمراً!

سأوجهك الآن لمحاكاة أوربت الكواكب الغازية ونرى المشتري العملاق!`,
                nav: 'gas-section:jupiter'
            },
            {
                keywords: ['زحل', 'saturn'],
                text: `زحل 🪐 هو الكوكب الأنيق المشهور بنظامه الحلقي المذهل المكون من الجليد والصخور والغبار. هو ثاني أكبر كوكب، وكثافته منخفضة جداً لدرجة أنه لو وجد محيط مائي كبير بما يكفي لكان زحل يطفو فوقه!

دعنا ننتقل لمحاكاة الكواكب الغازية لنستعرض زحل وحلقاته البديعة!`,
                nav: 'gas-section:saturn'
            },
            {
                keywords: ['أورانوس', 'uranus'],
                text: `أورانوس 💙 هو العملاق الجليدي ذو اللون الأزرق المخضر البارد بسبب غاز الميثان. ما يميزه هو دورانه على جنبه (محور دورانه مائل بزاوية 98 درجة تقريباً)، كأنه يتدحرج حول الشمس!

دعنا ننتقل لقسم العمالقة الغازية لنستكشف هذا الكوكب العجيب!`,
                nav: 'gas-section:uranus'
            },
            {
                keywords: ['نبتون', 'neptune'],
                text: `نبتون 🔵 هو الكوكب الأزرق الداكن والأبعد في مجموعتنا الشمسيّة. يتميز برياحه العاتية التي تعد الأسرع في المجموعة الشمسية (تصل إلى 2100 كم/ساعة)، وهو عملاق جليدي غامق وهادئ.

سأحرك الصفحة لقسم الكواكب الغازية الخارجية ونحدد نبتون الأخير!`,
                nav: 'gas-section:neptune'
            },
            {
                keywords: ['كواكب صخرية', 'كواكب صخريه', 'الصخرية', 'الصخريه', 'الصخور'],
                text: `الكواكب الصخرية هي عطارد، الزهرة، الأرض، والمريخ. تتميز بأنها قريبة من الشمس ولها أسطح صلبة يمكن الوقوف عليها ومكونة من المعادن والصخور.

سأنتقل بك إلى قسم الكواكب الصخرية لعرض لوحة المقارنة الحية!`,
                nav: 'rocky-section'
            },
            {
                keywords: ['كواكب غازية', 'كواكب غازيه', 'الغازية', 'الغازيه', 'الغازات'],
                text: `العمالقة الغازية هي المشتري، زحل، أورانوس، ونبتون. تقع في الجزء الخارجي من المجموعة الشمسية، وهي ضخمة جداً وليس لها سطح صلب حقيقي، بل تتكون من غازي الهيدروجين والهيليوم وسوائل متجمدة.

سأقوم بنقلك لقسم العمالقة الغازية لتشاهد محاكاة مداراتها الممتعة!`,
                nav: 'gas-section'
            },
            {
                keywords: ['اختبار', 'كويز', 'اسئلة', 'أسئلة', 'امتحان', 'تحدي', 'تحدي المعرفة', 'quiz'],
                text: `رائع! أنت مستعد لتحدي المعلومات في مختبر المعرفة؟ 🚀
لقد أعددت لك كويزاً تفاعلياً من 3 أسئلة لتختبر فهمك لرحلتنا اليوم.

سأنقلك الآن لأسفل الصفحة عند قسم كويز الفضاء، اضغط على "ابدأ الاختبار الآن" لتبدأ التحدي! بالتوفيق!`,
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
            // Wait 800ms to simulate AI thinking in local mode
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
            text: `سؤال ممتاز! 🌌 بصفتي **AstroTutor**، يسعدني الإجابة على أي سؤال يخص المجموعة الشمسية.
يمكنك أن تسألني عن:
- طبقات الشمس المختلفة ☀️
- أي كوكب صخري (عطارد، الزهرة، الأرض، المريخ) 🔴
- الكواكب الغازية وحلقاتها (المشتري، زحل، أورانوس، نبتون) 🪐
- أو إذا أردت خوض الاختبار الدراسي اكتب "ابدأ الكويز" 🚀

أدخل سؤالك وسأوجهك للقسم المناسب فوراً!`,
            nav: null
        };
    }

    // Parse navigation tokens from response text
    parseResponse(rawText) {
        // Find [NAV:section-id] or [NAV:section-id:planet]
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
