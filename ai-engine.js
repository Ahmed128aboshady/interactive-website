/* -------------------------------------------------------------
   AI Engine for Mena Science Platform - Mr. Mena Gerges
   Grade 1 Prep (1ع) & Grade 2 Prep (2ع) Comprehensive Knowledge Base
   ------------------------------------------------------------- */

class MrMenaAIEngine {
    constructor() {
        this.apiKey = localStorage.getItem('gemini_api_key') || null;
        this.activeGrade = localStorage.getItem('mena_active_grade') || 'grade1';
        
        this.systemInstruction = `
أنت (مستر مينا جرجس) معلم العلوم الشهير للمرحلة الإعدادية (الصف الأول الإعدادي والصف الثاني الإعدادي)، شاب مصري عمرك حوالي 30 سنة، أسلوبك حماسي، محبب جداً للطلاب، وتشرح بأسلوب مبسط وممتع بالعامية المصرية الراقية من واقع مذكراتك وكتاب الامتحان المعتمد!

استخدم عباراتك الشهيرة مثل:
- "يا بطل المستقبل!" "ركز معايا في التريكة دي!" "السؤال ده بيجي في كل الامتحانات!" "يلا بينا نفهمها سوا!"

الموقع يحتوي على معامل تفاعلية للمنهجين:
[منهج 1ع أولى إعدادي]:
1. g1-atom-section (التركيب الذري ومستويات الطاقة K, L, M, N والنواة +P / ±N)
2. g1-density-section (معمل الكثافة والطفو والغوص: خشب، فلين، حديد، ذهب)
3. g1-energy-section (تحولات الطاقة وبندول الطاقة الميكانيكية)
4. g1-quiz-section (كويز علوم 1ع)

[منهج 2ع تانية إعدادي]:
1. g2-periodic-section (الجدول الدوري الحديث: الأقلاء 1A، الهالوجينات 7A، الغازات الخاملة 18)
2. g2-water-section (شذوذ خواص الماء، الروابط الهيدروجينية، الكثافة عند 4 درجات مئوية)
3. g2-atmosphere-section (طبقات الغلاف الجوي: التروبوسفير، الستراتوسفير وطبقة الأوزون، الميزوسفير، الثرموسفير)
4. g2-quiz-section (كويز علوم 2ع)

في نهاية إجابتك اكتب كود التوجيه المناسب على سطر مستقل:
- [NAV:g1-atom-section:nucleus] أو [NAV:g1-atom-section:level-k] أو [NAV:g1-atom-section:level-l] أو [NAV:g1-atom-section:level-m]
- [NAV:g1-density-section:wood] أو [NAV:g1-density-section:iron]
- [NAV:g1-energy-section:highest] أو [NAV:g1-energy-section:middle]
- [NAV:g1-quiz-section]
- [NAV:g2-periodic-section:alkali] أو [NAV:g2-periodic-section:halogens]
- [NAV:g2-water-section]
- [NAV:g2-atmosphere-section:troposphere] أو [NAV:g2-atmosphere-section:stratosphere]
- [NAV:g2-quiz-section]

مهم جداً: اجعل ردودك مركزة وممتعة في 2 إلى 3 جمل لتكون سريعة وفورية النطق!
`;

        // Comprehensive Local Knowledge Base for 1st Prep & 2nd Prep
        this.localResponses = [
            // ============ GRADE 1 PREP (1ع) ============
            {
                grade: 'grade1',
                keywords: ['ذرة', 'ذره', 'تركيب الذرة', 'مستويات الطاقة', 'k', 'l', 'm', 'n', 'إلكترون', 'بروتون', 'نيوترون'],
                text: `الذرة بتتكون من نواة موجبة بتدور حولها الإلكترونات السالبة في 7 مستويات طاقة! المستوى K بياخد 2 إلكترون، والمستوى L بياخد 8 إلكترونات حسب قاعدة 2n². فتحتلك مجسم الذرة ومستويات الطاقة في اللوحة!`,
                nav: 'g1-atom-section:level-k'
            },
            {
                grade: 'grade1',
                keywords: ['نواة', 'نواه', 'شحنة النواة', 'موجبة'],
                text: `النواة موجبة الشحنة لأن جواها بروتونات موجبة الشحنة ونيوترونات متعادلة، وتتركز فيها كتلة الذرة بالكامل! لقد حددت لك النواة في مجسم الذرة التفاعلي.`,
                nav: 'g1-atom-section:nucleus'
            },
            {
                grade: 'grade1',
                keywords: ['كثافة', 'كثافه', 'طفو', 'غوص', 'كتلة', 'حجم', 'الخشب', 'الحديد'],
                text: `الكثافة هي كتلة وحدة الحجوم من المادة، وقانونها (ث = ك ÷ ح)! المواد الأقل كثافة من المية زي الخشب والزيت بتطفو، والمواد الأكبر كثافة زي الحديد بتغوص. شغلتلك معمل الكثافة دلوقتي!`,
                nav: 'g1-density-section:wood'
            },
            {
                grade: 'grade1',
                keywords: ['طاقة', 'طاقه', 'بندول', 'ميكانيكية', 'وضع', 'حركة', 'تحولات'],
                text: `في البندول البسيط، بيحصل تبادل مستمر بين طاقة الوضع وطاقة الحركة، ومجموعهم اللي هو الطاقة الميكانيكية بيفضل مقدار ثابت! شغلتلك محاكاة البندول دلوقتي.`,
                nav: 'g1-energy-section:highest'
            },
            {
                grade: 'grade1',
                keywords: ['تكيف', 'تنوع', 'طيور', 'مناقير', 'نباتات مفترسة', 'بيات شتوي'],
                text: `التكيف ثلاث أنواع: تركيبي زي خف الجمل، وظيفي زي إفراز السم في الثعابين، وسلوكي زي هجرة الطيور والبيات الشتوي! ده سر بقاء الكائنات الحية وتنوعها.`,
                nav: 'g1-quiz-section'
            },
            {
                grade: 'grade1',
                keywords: ['كويز 1', 'امتحان 1', 'اسئلة 1', 'اختبار 1', 'تدريب 1', 'كويز أولى', 'كويز اولي'],
                text: `جاهز لتحدي مستر مينا في منهج أولى إعدادي؟ 🚀 فتحتلك كويز 1ع التفاعلي، وريني شطارتك وقفل الدرجة النهائية!`,
                nav: 'g1-quiz-section'
            },

            // ============ GRADE 2 PREP (2ع) ============
            {
                grade: 'grade2',
                keywords: ['جدول دوري', 'اقلاء', 'أقلاء', 'هالوجينات', 'موزلي', 'مندليف', 'دورات', 'مجموعات'],
                text: `الجدول الدوري الحديث بيتكون من 7 دورات أفقية و18 مجموعة رأسية رُتبت فيه العناصر حسب أعدادها الذرية وطريقة ملء مستويات الطاقة الفرعية! فتحتلك لوحة الجدول الدوري والأقلاء.`,
                nav: 'g2-periodic-section:alkali'
            },
            {
                grade: 'grade2',
                keywords: ['ماء', 'ماية', 'مية', 'شذوذ', 'روابط هيدروجينية', '4 درجات', 'ثلج'],
                text: `الماء مركب فريد بسبب الروابط الهيدروجينية بين جزيئاته! لما بتنخفض حرارته عن 4°م بتقل كثافته ويزداد حجمه فيطفو الثلج على السطح وتحيا الكائنات في الأعماق!`,
                nav: 'g2-water-section'
            },
            {
                grade: 'grade2',
                keywords: ['غلاف جوي', 'طبقات', 'تروبوسفير', 'ستراتوسفير', 'ميزوسفير', 'ثرموسفير', 'اوزون', 'أوزون'],
                text: `الغلاف الجوي بيتكون من 4 طبقات رئيسية: التروبوسفير (طبقة الطقس)، الستراتوسفير (فيها طبقة الأوزون الحامية من الأشعة فوق البنفسجية)، الميزوسفير، والثرموسفير! شغلتلك معمل الغلاف الجوي.`,
                nav: 'g2-atmosphere-section:stratosphere'
            },
            {
                grade: 'grade2',
                keywords: ['حفريات', 'حفرية', 'ماموث', 'كهرمان', 'قالب', 'طابع', 'انقراض', 'محميات'],
                text: `الحفريات هي آثار وبقايا الكائنات الحية القديمة المحفوظة في الصخور الرسوبية! زي حفرية الماموث في الجليد والكهرمان، وتدل على العمر النسبي وتطور الحياة.`,
                nav: 'g2-quiz-section'
            },
            {
                grade: 'grade2',
                keywords: ['كويز 2', 'امتحان 2', 'اسئلة 2', 'اختبار 2', 'تدريب 2', 'كويز تانية', 'كويز تانيه'],
                text: `جاهز لتحدي مستر مينا في منهج تانية إعدادي؟ 🚀 فتحتلك كويز 2ع التفاعلي، وريني تركيزك وإجاباتك النموذجية!`,
                nav: 'g2-quiz-section'
            }
        ];
    }

    setGrade(grade) {
        this.activeGrade = grade;
        localStorage.setItem('mena_active_grade', grade);
    }

    setApiKey(key) {
        if (key && key.trim().length > 10) {
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

    async getResponse(userInput) {
        if (this.isApiKeyActive()) {
            try {
                return await this.callGeminiAPI(userInput);
            } catch (error) {
                console.error("Gemini API Error, using local response:", error);
                return this.getLocalResponse(userInput);
            }
        } else {
            return this.getLocalResponse(userInput);
        }
    }

    async callGeminiAPI(prompt) {
        const gradeContext = this.activeGrade === 'grade1' ? 'منهج الصف الأول الإعدادي (1ع)' : 'منهج الصف الثاني الإعدادي (2ع)';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
        
        const payload = {
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: this.systemInstruction },
                        { text: `الطالب حالياً في: ${gradeContext}. سؤال الطالب: ${prompt}` }
                    ]
                }
            ],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 300,
            }
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            return this.parseResponse(data.candidates[0].content.parts[0].text);
        }
        throw new Error("Invalid structure from Gemini API");
    }

    getLocalResponse(input) {
        const lower = input.toLowerCase();
        
        // Match response prioritized by active grade
        const matchedGrade = this.localResponses.find(item => 
            item.grade === this.activeGrade && item.keywords.some(k => lower.includes(k))
        );

        if (matchedGrade) {
            return { text: matchedGrade.text, nav: matchedGrade.nav };
        }

        // General fallback across all keywords
        const matchedAny = this.localResponses.find(item => 
            item.keywords.some(k => lower.includes(k))
        );

        if (matchedAny) {
            return { text: matchedAny.text, nav: matchedAny.nav };
        }

        const gradeName = this.activeGrade === 'grade1' ? 'الصف الأول الإعدادي' : 'الصف الثاني الإعدادي';
        return {
            text: `سؤال جميل جداً يا بطل! 🔬 أنا مستر مينا جرجس جاهز لشرح أي جزء في منهج ومذكرات ${gradeName}. اسألني عن التجارب، القوانين، أو قل لي "ابدأ الكويز"!`,
            nav: this.activeGrade === 'grade1' ? 'g1-atom-section:level-k' : 'g2-periodic-section:alkali'
        };
    }

    parseResponse(rawText) {
        const navRegex = /\[NAV:([^\]]+)\]/;
        const match = rawText.match(navRegex);
        const cleanedText = rawText.replace(navRegex, '').trim();
        return {
            text: cleanedText,
            nav: match && match[1] ? match[1] : null
        };
    }
}
