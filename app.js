/* -------------------------------------------------------------
   Main Application Logic for Mena Science Platform
   Grade 1 Prep (1ع) & Grade 2 Prep (2ع) Interactive Systems
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // Instantiate AI Engine
    const aiEngine = new MrMenaAIEngine();

    // DOM Elements
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessagesContainer = document.getElementById('chat-messages-container');
    const clearChatBtn = document.getElementById('clear-chat-btn');
    const guidanceBanner = document.getElementById('guidance-banner');
    const guidanceText = document.getElementById('guidance-text');
    const appContainer = document.querySelector('.hologram-app-container');
    const toggleViewBtn = document.getElementById('toggle-view-mode');
    const viewBadgeText = document.getElementById('view-badge-text');

    // Grade Switcher Elements
    const tabGrade1 = document.getElementById('tab-grade-1');
    const tabGrade2 = document.getElementById('tab-grade-2');
    const g1Left = document.getElementById('grade1-left-content');
    const g2Left = document.getElementById('grade2-left-content');
    const g1Right = document.getElementById('grade1-right-content');
    const g2Right = document.getElementById('grade2-right-content');
    const g1Prompts = document.getElementById('g1-prompts');
    const g2Prompts = document.getElementById('g2-prompts');
    const leftColTitle = document.getElementById('left-column-title');
    const rightColTitle = document.getElementById('right-column-title');
    const welcomeGradeText = document.getElementById('welcome-grade-text');

    // Sound & Speech Control
    const toggleSoundBtn = document.getElementById('toggle-sound');
    const soundBadgeText = document.getElementById('sound-badge-text');
    let isSoundEnabled = true;
    let currentAudioObject = null;

    function updateSoundBadge(triggerTest = false) {
        if (!toggleSoundBtn) return;
        const icon = toggleSoundBtn.querySelector('i');
        if (isSoundEnabled) {
            toggleSoundBtn.classList.remove('muted-mode');
            if (icon) icon.className = 'fa-solid fa-volume-high';
            if (soundBadgeText) soundBadgeText.textContent = 'الصوت مفعل';
            if (triggerTest) {
                speakText("أهلاً بك يا بطل! مستر مينا جرجس جاهز للشرح والتحدث معك.");
            }
        } else {
            toggleSoundBtn.classList.add('muted-mode');
            if (icon) icon.className = 'fa-solid fa-volume-xmark';
            if (soundBadgeText) soundBadgeText.textContent = 'الصوت مكتوم';
            if (currentAudioObject) {
                currentAudioObject.pause();
                currentAudioObject = null;
            }
        }
    }

    if (toggleSoundBtn) {
        updateSoundBadge(false);
        toggleSoundBtn.addEventListener('click', () => {
            isSoundEnabled = !isSoundEnabled;
            updateSoundBadge(true);
        });
    }

    // Speech synthesis helper
    function cleanForSpeech(text) {
        let clean = text
            .replace(/\[NAV:[^\]]+\]/g, '')
            .replace(/\*\*([^*]+)\*\*/g, '$1')
            .replace(/[*_#`~]/g, '')
            .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
            .replace(/\s+/g, ' ')
            .trim();

        const sentences = clean.split(/[.!؟\n]+/);
        if (sentences.length > 1 && sentences[0].length >= 20) {
            clean = sentences.slice(0, 2).join('! ').trim();
        }
        return clean.substring(0, 140).trim();
    }

    function speakText(text) {
        if (!isSoundEnabled) return;

        const avatarChar = document.querySelector('.mena-avatar') || document.querySelector('.astrotutor-character');
        const cleanText = cleanForSpeech(text);
        if (!cleanText) return;

        const ttsUrl = `http://localhost:8000/tts?text=${encodeURIComponent(cleanText)}`;
        const audioPlayer = document.getElementById('tutor-audio-player');

        if (avatarChar) avatarChar.classList.add('is-speaking');

        if (audioPlayer) {
            try { audioPlayer.pause(); } catch(e){}
            audioPlayer.src = ttsUrl;
            audioPlayer.onended = audioPlayer.onerror = () => {
                if (avatarChar) avatarChar.classList.remove('is-speaking');
            };
            audioPlayer.play().catch(() => {
                if (avatarChar) avatarChar.classList.remove('is-speaking');
            });
        } else {
            if (currentAudioObject) {
                try { currentAudioObject.pause(); } catch(e){}
            }
            const audio = new Audio(ttsUrl);
            currentAudioObject = audio;
            audio.onended = audio.onerror = () => {
                if (avatarChar) avatarChar.classList.remove('is-speaking');
            };
            audio.play().catch(() => {
                if (avatarChar) avatarChar.classList.remove('is-speaking');
            });
        }
    }

    // Test Voice Button
    const testVoiceBtn = document.getElementById('test-voice-btn');
    if (testVoiceBtn) {
        testVoiceBtn.addEventListener('click', () => {
            const testPhrase = "أهلاً بيك يا بطل! أنا مستر مينا جرجس، يلا بينا نقفل امتحان العلوم سوا!";
            showToast("🔊 مستر مينا يتحدث معك الآن...");
            speakText(testPhrase);
        });
    }

    // ================= GRADE SWITCHING LOGIC =================
    function switchGrade(grade) {
        aiEngine.setGrade(grade);

        if (grade === 'grade1') {
            tabGrade1.classList.add('active-grade');
            tabGrade2.classList.remove('active-grade');

            g1Left.classList.remove('hidden');
            g2Left.classList.add('hidden');
            g1Right.classList.remove('hidden');
            g2Right.classList.add('hidden');

            g1Prompts.classList.remove('hidden');
            g2Prompts.classList.add('hidden');

            if (leftColTitle) leftColTitle.textContent = "مختبر العلوم التفاعلي (1ع)";
            if (rightColTitle) rightColTitle.textContent = "مختبر الفيزياء والكويز (1ع)";
            if (welcomeGradeText) welcomeGradeText.textContent = "الصف الأول الإعدادي";

            showToast("تم التبديل إلى منهج الصف الأول الإعدادي (1ع) 🥇");
            speakText("أهلاً بيك في منهج أولى إعدادي! اختر أي تجربة أو اسألني.");
        } else {
            tabGrade2.classList.add('active-grade');
            tabGrade1.classList.remove('active-grade');

            g1Left.classList.add('hidden');
            g2Left.classList.remove('hidden');
            g1Right.classList.add('hidden');
            g2Right.classList.remove('hidden');

            g1Prompts.classList.add('hidden');
            g2Prompts.classList.remove('hidden');

            if (leftColTitle) leftColTitle.textContent = "مختبر العلوم التفاعلي (2ع)";
            if (rightColTitle) rightColTitle.textContent = "مختبر الفيزياء والكويز (2ع)";
            if (welcomeGradeText) welcomeGradeText.textContent = "الصف الثاني الإعدادي";

            showToast("تم التبديل إلى منهج الصف الثاني الإعدادي (2ع) 🥈");
            speakText("أهلاً بيك في منهج تانية إعدادي! اختر أي تجربة أو اسألني.");
        }
    }

    if (tabGrade1 && tabGrade2) {
        tabGrade1.addEventListener('click', () => switchGrade('grade1'));
        tabGrade2.addEventListener('click', () => switchGrade('grade2'));
    }

    // ================= 1ع: ATOMIC STRUCTURE & ENERGY LEVELS =================
    const atomSpots = document.querySelectorAll('#g1-atom-section .hotspot');
    const atomPlaceholder = document.getElementById('atom-placeholder');
    const atomSpotContent = document.getElementById('atom-spot-content');
    const atomSpotTitle = document.getElementById('atom-spot-title');
    const atomSpotText = document.getElementById('atom-spot-text');
    const atomSpotRule = document.getElementById('atom-spot-rule');

    const atomData = {
        nucleus: {
            title: 'النواة الذرية الموجبة (+P / ±N)',
            text: 'توجد في مركز الذرة وتتركز فيها كتلة الذرة. تحتوي على بروتونات موجبة (+) ونيوترونات متعادلة (±).',
            rule: 'العدد الكتلي = البروتونات + النيوترونات'
        },
        'level-k': {
            title: 'المستوى K (المستوى الأول)',
            text: 'أقرب المستويات إلى النواة وأقلها في الطاقة، ويتشبع بـ 2 إلكترون كحد أقصى طبقاً للقاعدة 2n².',
            rule: '2 × (1)² = 2 إلكترون'
        },
        'level-l': {
            title: 'المستوى L (المستوى الثاني)',
            text: 'يتشبع بـ 8 إلكترونات كحد أقصى، وطاقته أعلى من المستوى K.',
            rule: '2 × (2)² = 8 إلكترونات'
        },
        'level-m': {
            title: 'المستوى M (المستوى الثالث)',
            text: 'يتشبع بـ 18 إلكترون كحد أقصى، ولا يتحمل أي مستوى طاقة خارجي أكثر من 8 إلكترونات.',
            rule: '2 × (3)² = 18 إلكترون'
        }
    };

    const atomVoiceTexts = {
        nucleus: 'النواة موجبة الشحنة وتتركز فيها كتلة الذرة بالكامل لأن جواها بروتونات موجبة ونيوترونات متعادلة!',
        'level-k': 'المستوى K هو أقرب المستويات للنواة وأقلها طاقة ويتشبع باثنين إلكترون حسب قاعدة 2n²!',
        'level-l': 'المستوى L هو المستوى الثاني ويتشبع بـ 8 إلكترونات!',
        'level-m': 'المستوى M هو المستوى الثالث ويتشبع بـ 18 إلكترون كحد أقصى!'
    };

    atomSpots.forEach(spot => {
        spot.addEventListener('click', () => {
            const spotKey = spot.getAttribute('data-spot');
            activateAtomSpot(spotKey, true);
        });
    });

    function activateAtomSpot(spotKey, speakOutLoud = false) {
        atomSpots.forEach(s => s.classList.remove('active-spot'));
        const active = document.querySelector(`#g1-atom-section .hotspot[data-spot="${spotKey}"]`);
        if (active) active.classList.add('active-spot');

        const data = atomData[spotKey];
        if (data && atomSpotContent) {
            if (atomPlaceholder) atomPlaceholder.classList.add('hidden');
            atomSpotContent.classList.remove('hidden');
            atomSpotTitle.textContent = data.title;
            atomSpotText.textContent = data.text;
            atomSpotRule.textContent = data.rule;

            if (speakOutLoud && atomVoiceTexts[spotKey]) {
                speakText(atomVoiceTexts[spotKey]);
            }
        }
    }

    // ================= 1ع: DENSITY & FLOATING LAB =================
    const densityCards = document.querySelectorAll('#g1-density-section .planet-card-mini');
    const densityName = document.getElementById('density-item-name');
    const densityDesc = document.getElementById('density-item-desc');
    const densityVal = document.getElementById('density-val');
    const densityBar = document.getElementById('density-bar');

    const densityData = {
        wood: { name: 'قطعة الخشب', desc: 'كثافة الخشب (0.6 جم/سم³) أقل من كثافة الماء (1 جم/سم³) فتطفو على السطح.', val: '0.6 جم/سم³', width: '30%', voice: 'الخشب كثافته 0.6 أقل من المية علشان كده بيطفو على السطح!' },
        cork: { name: 'سدادة الفلين', desc: 'كثافة الفلين (0.2 جم/سم³) خفيفة جداً وأقل من الماء فتطفو تماماً.', val: '0.2 جم/سم³', width: '15%', voice: 'الفلين خفيف جداً وكثافته 0.2 ويطفو فوق الماء بسهولة!' },
        iron: { name: 'مسمار الحديد', desc: 'كثافة الحديد (7.8 جم/سم³) أكبر بكثير من كثافة الماء فيغوص فوراً في القاع.', val: '7.8 جم/سم³', width: '78%', voice: 'الحديد كثافته 7.8 أكبر من المية علشان كده بيغوص في القاع فوراً!' },
        gold: { name: 'خاتم الذهب', desc: 'كثافة الذهب عالية جداً (19.3 جم/سم³) فيغوص بسرعة إلى أعمق نقطة.', val: '19.3 جم/سم³', width: '95%', voice: 'الذهب معدن ثقيل وكثافته 19.3 ويغوص في قاع الإناء!' }
    };

    densityCards.forEach(card => {
        card.addEventListener('click', () => {
            const key = card.getAttribute('data-density');
            activateDensity(key, true);
        });
    });

    function activateDensity(key, speakOutLoud = false) {
        densityCards.forEach(c => c.classList.remove('active-card'));
        const active = document.querySelector(`#g1-density-section .planet-card-mini[data-density="${key}"]`);
        if (active) active.classList.add('active-card');

        const d = densityData[key];
        if (d && densityName) {
            densityName.textContent = d.name;
            densityDesc.textContent = d.desc;
            densityVal.textContent = d.val;
            densityBar.style.width = d.width;
            if (speakOutLoud) speakText(d.voice);
        }
    }

    // ================= 1ع: PENDULUM ENERGY LAB =================
    const energyBtns = document.querySelectorAll('.energy-btn');
    const energyTitle = document.getElementById('energy-state-title');
    const energyDesc = document.getElementById('energy-state-desc');

    energyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const state = btn.getAttribute('data-pendulum');
            energyBtns.forEach(b => b.classList.remove('active-state'));
            btn.classList.add('active-state');
            if (state === 'highest') {
                energyTitle.textContent = 'عند أقصى إزاحة (أعلى نقطة)';
                energyDesc.textContent = 'تكون طاقة الوضع = الطاقة الميكانيكية، وطاقة الحركة = صفر لانعدام السرعة.';
                speakText('عند أعلى نقطة طاقة الوضع بتكون أكبر ما يمكن وطاقة الحركة صفر لأن السرعة صفر!');
            } else {
                energyTitle.textContent = 'عند موضع السكون (أقصى سرعة)';
                energyDesc.textContent = 'تكون طاقة الحركة أكبر ما يمكن، وطاقة الوضع أقل ما يمكن، والمجموع الميكانيكي ثابت دائماً.';
                speakText('عند موضع السكون السرعة بتكون أقصى ما يمكن وطاقة الحركة أكبر ما يمكن!');
            }
        });
    });

    // ================= 2ع: PERIODIC TABLE LAB =================
    const groupCards = document.querySelectorAll('#g2-periodic-section .planet-card-mini');
    const groupName = document.getElementById('group-explorer-name');
    const groupDesc = document.getElementById('group-explorer-desc');
    const groupVal = document.getElementById('group-activity-val');
    const groupBar = document.getElementById('group-activity-bar');

    const groupData = {
        alkali: { name: 'فلزات الأقلاء (المجموعة 1A)', desc: 'فلزات أحادية التكافؤ، نشطة جداً كيميائياً، وتحفظ تحت سطح الكيروسين.', val: 'أحادي (+1) - عالي جداً', width: '90%', voice: 'الأقلاء فلزات نشطة جداً أحادية التكافؤ وتتفاعل مع الماء بعنف مع تصاعد الهيدروجين!' },
        halogens: { name: 'الهالوجينات (المجموعة 7A)', desc: 'لافلزات أحادية التكافؤ تتحد مع الفلزات مكونة أملاحاً، وتوجد في صورة جزيئات ثنائية الذرة.', val: 'أحادي (-1) - عالي جداً', width: '85%', voice: 'الهالوجينات لافلزات نشطة تتحد مع الفلزات لتكوين الأملاح زي كلوريد الصوديوم!' },
        noble: { name: 'الغازات الخاملة (المجموعة 18)', desc: 'عناصر مستقرة كيميائياً لا تشترك في التفاعلات لاكتمال مستوى طاقتها الخارجي بـ 8 إلكترونات.', val: 'صفر (مكتمل)', width: '10%', voice: 'الغازات الخاملة تكافؤها صفر ومستوى طاقتها الأخير مكتمل بثمانية إلكترونات!' },
        water: { name: 'مركب الماء (H₂O)', desc: 'مركب قطبي يتميز بشذوذ خواصه وارتفاع درجتي غليانه وانصهاره بسبب الروابط الهيدروجينية.', val: 'رابطة هيدروجينية فريدة', width: '95%', voice: 'الماء مركب فريد بسبب الروابط الهيدروجينية اللي بتخليه يغلي عند 100 ويتجمد عند صفر!' }
    };

    groupCards.forEach(card => {
        card.addEventListener('click', () => {
            const key = card.getAttribute('data-group');
            groupCards.forEach(c => c.classList.remove('active-card'));
            card.classList.add('active-card');
            const d = groupData[key];
            if (d && groupName) {
                groupName.textContent = d.name;
                groupDesc.textContent = d.desc;
                groupVal.textContent = d.val;
                groupBar.style.width = d.width;
                speakText(d.voice);
            }
        });
    });

    // ================= 2ع: ATMOSPHERE LAYERS LAB =================
    const layerCards = document.querySelectorAll('#g2-atmosphere-section .planet-card-mini');
    const layerName = document.getElementById('layer-name');
    const layerDesc = document.getElementById('layer-desc');
    const layerTempVal = document.getElementById('layer-temp-val');
    const layerTempBar = document.getElementById('layer-temp-bar');

    const layerData = {
        troposphere: { name: 'طبقة التروبوسفير (طبقة الطقس)', desc: 'تمتد حتى 13 كم، تحدث بها كافة التقلبات الجوية وتحتوي على 75% من كتلة الهواء.', temp: '-60°م', width: '25%', voice: 'التروبوسفير هي الطبقة الأولى وفيها كل التقلبات الجوية و75% من هواء الغلاف الجوي!' },
        stratosphere: { name: 'طبقة الستراتوسفير (طبقة الأوزون)', desc: 'تمتد من 13 كم حتى 50 كم، خالية من الغيوم والاضطرابات وتحتوي على طبقة الأوزون الواقية.', temp: '0°م', width: '50%', voice: 'الستراتوسفير مناسبة لحركة الطائرات وفيها طبقة الأوزون اللي بتحمينا من الأشعة فوق البنفسجية!' },
        mesosphere: { name: 'طبقة الميزوسفير (أبرد الطبقات)', desc: 'تمتد حتى 85 كم، أبرد طبقات الغلاف الجوي وتتكون فيها الشهب نتيجة الاحتكاك بالهواء.', temp: '-90°م', width: '10%', voice: 'الميزوسفير هي أبرد طبقة في الغلاف الجوي وبتتكون فيها الشهب اللي بتحمي الأرض!' },
        thermosphere: { name: 'طبقة الثرموسفير (الطبقة الحرارية)', desc: 'تمتد حتى 675 كم، أسخن الطبقات وتصل حرارتها إلى 1200°م ويوجد في أعلاها الأيونوسفير.', temp: '1200°م', width: '95%', voice: 'الثرموسفير هي أعلى وأسخن الطبقات وفيها الأيونوسفير المستخدم في الاتصالات اللاسلكية!' }
    };

    layerCards.forEach(card => {
        card.addEventListener('click', () => {
            const key = card.getAttribute('data-layer');
            layerCards.forEach(c => c.classList.remove('active-card'));
            card.classList.add('active-card');
            const d = layerData[key];
            if (d && layerName) {
                layerName.textContent = d.name;
                layerDesc.textContent = d.desc;
                layerTempVal.textContent = d.temp;
                layerTempBar.style.width = d.width;
                speakText(d.voice);
            }
        });
    });

    // ================= QUIZ 1ع ENGINE =================
    const g1Questions = [
        { q: "ما هي وحدة قياس الكثافة في النظام الدولي؟", a: ["جرام / سم³", "متر / ثانية", "نيوتن", "جول"], c: 0 },
        { q: "المستوى الثاني L يتشبع بحد أقصى بـ كم إلكترون طبقاً للقاعدة (2n²)؟", a: ["2 إلكترون", "8 إلكترونات", "18 إلكترون", "32 إلكترون"], c: 1 },
        { q: "عند أقصى ارتفاع يصل إليه البندول البسيط، تكون طاقة الحركة مساوية لـ:", a: ["أقصى قيمة", "نصف الطاقة", "صفر", "الطاقة الميكانيكية"], c: 2 },
        { q: "أي المواد التالية تطفو فوق سطح الماء بسبب انخفاض كثافتها؟", a: ["مسمار الحديد", "قطعة الفلين", "عملة النحاس", "سلسلة الذهب"], c: 1 }
    ];

    let g1Idx = 0, g1Score = 0;
    const g1StartBtn = document.getElementById('g1-start-quiz-btn');
    const g1RestartBtn = document.getElementById('g1-restart-btn');
    const g1Intro = document.getElementById('g1-quiz-intro');
    const g1Play = document.getElementById('g1-quiz-play');
    const g1Result = document.getElementById('g1-quiz-result');
    const g1QNum = document.getElementById('g1-q-num');
    const g1QText = document.getElementById('g1-q-text');
    const g1Grid = document.getElementById('g1-answers-grid');
    const g1Progress = document.getElementById('g1-quiz-progress');

    function startG1Quiz() {
        g1Idx = 0; g1Score = 0;
        g1Intro.classList.add('hidden');
        g1Result.classList.add('hidden');
        g1Play.classList.remove('hidden');
        showG1Q();
    }

    function showG1Q() {
        const item = g1Questions[g1Idx];
        g1Progress.style.width = `${(g1Idx / g1Questions.length) * 100}%`;
        g1QNum.textContent = `السؤال ${g1Idx + 1} من ${g1Questions.length}`;
        g1QText.textContent = item.q;
        g1Grid.innerHTML = '';
        item.a.forEach((ans, i) => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.textContent = ans;
            btn.addEventListener('click', () => {
                const all = g1Grid.querySelectorAll('.answer-btn');
                all.forEach(b => b.style.pointerEvents = 'none');
                if (i === item.c) {
                    btn.classList.add('correct');
                    g1Score++;
                    speakText("الله ينور عليك يا بطل! إجابة صحيحة!");
                } else {
                    btn.classList.add('incorrect');
                    all[item.c].classList.add('correct');
                    speakText("معلش يا بطل، ركز في السؤال اللي جاي!");
                }
                setTimeout(() => {
                    g1Idx++;
                    if (g1Idx < g1Questions.length) showG1Q();
                    else finishG1Quiz();
                }, 1400);
            });
            g1Grid.appendChild(btn);
        });
    }

    function finishG1Quiz() {
        g1Play.classList.add('hidden');
        g1Result.classList.remove('hidden');
        g1Progress.style.width = '100%';
        const title = document.getElementById('g1-res-title');
        const text = document.getElementById('g1-res-text');
        title.textContent = g1Score === 4 ? "ممتاز جداً يا بطل! 🏆 (درجة كاملة)" : "أحسنت يا بطل! 👏";
        text.textContent = `لقد حصلت على ${g1Score} من 4 أسئلة صحيحة في كويز 1ع.`;
        speakText(g1Score === 4 ? "عاش يا بطل! قفلت كويز أولى إعدادي بنجاح 4 من 4!" : `ممتاز يا بطل! نتيجتك ${g1Score} من 4.`);
    }

    if (g1StartBtn) g1StartBtn.addEventListener('click', startG1Quiz);
    if (g1RestartBtn) g1RestartBtn.addEventListener('click', startG1Quiz);

    // ================= QUIZ 2ع ENGINE =================
    const g2Questions = [
        { q: "رتب العالم موزلي العناصر في جدوله الدوري تصاعدياً حسب:", a: ["أوزانها الذرية", "أعدادها الذرية", "كثافتها", "سالبية ذراتها"], c: 1 },
        { q: "توجد طبقة الأوزون الحامية لكوكب الأرض في طبقة:", a: ["التروبوسفير", "الستراتوسفير", "الميزوسفير", "الثرموسفير"], c: 1 },
        { q: "شذوذ خواص الماء يرجع إلى وجود روابط بين جزيئاته تسمى روابط:", a: ["أيونية", "تساهمية", "هيدروجينية", "فلزية"], c: 2 },
        { q: "تعتبر حفرية الماموث المحفوظة في الجليد مثالاً لـ:", a: ["حفرية كائن كامل", "حفرية قالب مصمت", "حفرية طابع", "أخشاب متحجرة"], c: 0 }
    ];

    let g2Idx = 0, g2Score = 0;
    const g2StartBtn = document.getElementById('g2-start-quiz-btn');
    const g2RestartBtn = document.getElementById('g2-restart-btn');
    const g2Intro = document.getElementById('g2-quiz-intro');
    const g2Play = document.getElementById('g2-quiz-play');
    const g2Result = document.getElementById('g2-quiz-result');
    const g2QNum = document.getElementById('g2-q-num');
    const g2QText = document.getElementById('g2-q-text');
    const g2Grid = document.getElementById('g2-answers-grid');
    const g2Progress = document.getElementById('g2-quiz-progress');

    function startG2Quiz() {
        g2Idx = 0; g2Score = 0;
        g2Intro.classList.add('hidden');
        g2Result.classList.add('hidden');
        g2Play.classList.remove('hidden');
        showG2Q();
    }

    function showG2Q() {
        const item = g2Questions[g2Idx];
        g2Progress.style.width = `${(g2Idx / g2Questions.length) * 100}%`;
        g2QNum.textContent = `السؤال ${g2Idx + 1} من ${g2Questions.length}`;
        g2QText.textContent = item.q;
        g2Grid.innerHTML = '';
        item.a.forEach((ans, i) => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.textContent = ans;
            btn.addEventListener('click', () => {
                const all = g2Grid.querySelectorAll('.answer-btn');
                all.forEach(b => b.style.pointerEvents = 'none');
                if (i === item.c) {
                    btn.classList.add('correct');
                    g2Score++;
                    speakText("الله ينور عليك يا بطل! إجابة صحيحة وممتازة!");
                } else {
                    btn.classList.add('incorrect');
                    all[item.c].classList.add('correct');
                    speakText("معلش يا بطل، ركز في السؤال اللي جاي!");
                }
                setTimeout(() => {
                    g2Idx++;
                    if (g2Idx < g2Questions.length) showG2Q();
                    else finishG2Quiz();
                }, 1400);
            });
            g2Grid.appendChild(btn);
        });
    }

    function finishG2Quiz() {
        g2Play.classList.add('hidden');
        g2Result.classList.remove('hidden');
        g2Progress.style.width = '100%';
        const title = document.getElementById('g2-res-title');
        const text = document.getElementById('g2-res-text');
        title.textContent = g2Score === 4 ? "ممتاز جداً يا بطل! 🏆 (درجة كاملة)" : "أحسنت يا بطل! 👏";
        text.textContent = `لقد حصلت على ${g2Score} من 4 أسئلة صحيحة في كويز 2ع.`;
        speakText(g2Score === 4 ? "عاش يا بطل! قفلت كويز تانية إعدادي بنجاح 4 من 4!" : `ممتاز يا بطل! نتيجتك ${g2Score} من 4.`);
    }

    if (g2StartBtn) g2StartBtn.addEventListener('click', startG2Quiz);
    if (g2RestartBtn) g2RestartBtn.addEventListener('click', startG2Quiz);

    // ================= PROMPT CHIPS & CHAT =================
    document.querySelectorAll('.prompt-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const prompt = chip.getAttribute('data-prompt');
            handleUserMessage(prompt);
        });
    });

    sendBtn.addEventListener('click', () => {
        const text = chatInput.value.trim();
        if (text) {
            handleUserMessage(text);
            chatInput.value = '';
            chatInput.style.height = 'auto';
        }
    });

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendBtn.click();
        }
    });

    clearChatBtn.addEventListener('click', () => {
        chatMessagesContainer.innerHTML = `
            <div id="latest-tutor-message" class="animate-fade-in">
                <p>تم تصفير المحادثة يا بطل! 🧪</p>
                <p>أنا مستر مينا جرجس، اسألني في أي وقت عن المذكرات أو كتاب الامتحان.</p>
            </div>
        `;
    });

    async function handleUserMessage(message) {
        appendMessage('student', message);
        const loadingId = appendLoadingBubble();

        try {
            const res = await aiEngine.getResponse(message);
            removeLoadingBubble(loadingId);
            appendMessage('tutor', res.text);
            speakText(res.text);

            if (res.nav) {
                executeNavigation(res.nav);
            }
        } catch (e) {
            removeLoadingBubble(loadingId);
            appendMessage('tutor', 'عذراً يا بطل، حدث خطأ أثناء المعالجة. حاول مرة أخرى!');
        }
    }

    function executeNavigation(navStr) {
        const parts = navStr.split(':');
        const secId = parts[0];
        const detail = parts[1];

        // Ensure grade tab matches section
        if (secId.startsWith('g1-')) {
            if (tabGrade1 && !tabGrade1.classList.contains('active-grade')) switchGrade('grade1');
        } else if (secId.startsWith('g2-')) {
            if (tabGrade2 && !tabGrade2.classList.contains('active-grade')) switchGrade('grade2');
        }

        if (detail) {
            if (secId === 'g1-atom-section') activateAtomSpot(detail);
            if (secId === 'g1-density-section') activateDensity(detail);
            if (secId === 'g2-periodic-section') {
                const card = document.querySelector(`#g2-periodic-section .planet-card-mini[data-group="${detail}"]`);
                if (card) card.click();
            }
        }
    }

    function appendMessage(sender, text) {
        const div = document.createElement('div');
        div.className = sender === 'student' ? 'user-message animate-fade-in' : 'tutor-response animate-fade-in';
        div.innerHTML = `<p>${text}</p>`;
        chatMessagesContainer.appendChild(div);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    function appendLoadingBubble() {
        const id = 'loading-' + Date.now();
        const div = document.createElement('div');
        div.id = id;
        div.className = 'tutor-response animate-fade-in';
        div.innerHTML = '<p class="typing-indicator"><span>.</span><span>.</span><span>.</span> يقوم مستر مينا بالتفكير وتجهيز الشرح</p>';
        chatMessagesContainer.appendChild(div);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        return id;
    }

    function removeLoadingBubble(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    // ================= MICROPHONE SPEECH RECOGNITION =================
    const micBtn = document.getElementById('mic-btn');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let isRecording = false;
    let recognition = null;

    if (micBtn && SpeechRecognition) {
        micBtn.addEventListener('click', () => {
            if (isRecording && recognition) {
                recognition.stop();
                return;
            }

            try {
                recognition = new SpeechRecognition();
                recognition.lang = 'ar-EG';
                recognition.continuous = false;
                recognition.interimResults = false;

                recognition.onstart = () => {
                    isRecording = true;
                    micBtn.classList.add('recording-active');
                    showToast('🎙️ جاري الاستماع إلى صوتك الآن...');
                };

                recognition.onresult = (event) => {
                    const speechResult = event.results[0][0].transcript;
                    chatInput.value = speechResult;
                    handleUserMessage(speechResult);
                };

                recognition.onerror = () => {
                    showToast('لم يتم التقاط الصوت، حاول مجدداً.');
                };

                recognition.onend = () => {
                    isRecording = false;
                    micBtn.classList.remove('recording-active');
                };

                recognition.start();
            } catch(e) {
                showToast('خطأ في تشغيل المايك');
            }
        });
    }

    // API Modal Handlers
    const apiModal = document.getElementById('api-settings-modal');
    const toggleApiBtn = document.getElementById('toggle-api-settings');
    const closeApiBtn = document.getElementById('close-api-modal');
    const saveApiBtn = document.getElementById('save-api-keys-btn');
    const geminiInput = document.getElementById('gemini-api-key-input');
    const elevenKeyInput = document.getElementById('elevenlabs-api-key-input');
    const elevenVoiceInput = document.getElementById('elevenlabs-voice-id-input');

    if (toggleApiBtn) {
        toggleApiBtn.addEventListener('click', () => {
            if (geminiInput) geminiInput.value = localStorage.getItem('gemini_api_key') || '';
            if (elevenKeyInput) elevenKeyInput.value = localStorage.getItem('elevenlabs_api_key') || '';
            if (elevenVoiceInput) elevenVoiceInput.value = localStorage.getItem('elevenlabs_voice_id') || '';
            apiModal.classList.remove('hidden');
        });
    }

    if (closeApiBtn) {
        closeApiBtn.addEventListener('click', () => apiModal.classList.add('hidden'));
    }

    if (saveApiBtn) {
        saveApiBtn.addEventListener('click', () => {
            if (geminiInput) localStorage.setItem('gemini_api_key', geminiInput.value.trim());
            if (elevenKeyInput) localStorage.setItem('elevenlabs_api_key', elevenKeyInput.value.trim());
            if (elevenVoiceInput) localStorage.setItem('elevenlabs_voice_id', elevenVoiceInput.value.trim());
            showToast('✅ تم حفظ إعدادات الـ API بنجاح!');
            apiModal.classList.add('hidden');
        });
    }

    // View Mode Toggle (Simple / Expanded)
    if (toggleViewBtn) {
        toggleViewBtn.addEventListener('click', () => {
            if (appContainer.classList.contains('simple-mode')) {
                appContainer.classList.remove('simple-mode');
                appContainer.classList.add('show-full-all');
                viewBadgeText.textContent = 'الوضع المبسط';
            } else {
                appContainer.classList.add('simple-mode');
                appContainer.classList.remove('show-full-all');
                viewBadgeText.textContent = 'الوضع الكامل';
            }
        });
    }

    function showToast(msg) {
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toast-message');
        if (toast && toastMsg) {
            toastMsg.textContent = msg;
            toast.classList.remove('hidden');
            setTimeout(() => toast.classList.add('hidden'), 3500);
        }
    }
});
