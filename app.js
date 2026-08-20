/* -------------------------------------------------------------
   Main Application Logic for ScienceGuide - Hologram UI Controls
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // Instantiate AI Engine
    const aiEngine = new AstroTutorEngine();

    // DOM Elements
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessagesContainer = document.getElementById('chat-messages-container');
    const clearChatBtn = document.getElementById('clear-chat-btn');
    const promptChips = document.querySelectorAll('.prompt-chip');
    const guidanceBanner = document.getElementById('guidance-banner');
    const guidanceText = document.getElementById('guidance-text');
    
    // API modal elements
    const toggleApiSettings = document.getElementById('toggle-api-settings');
    const apiSettingsPanel = document.getElementById('api-settings-panel');
    const closeSettingsBtn = document.getElementById('close-settings-btn');
    const geminiKeyInput = document.getElementById('gemini-key-input');
    const saveKeyBtn = document.getElementById('save-key-btn');
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.getElementById('status-text');
    const apiBadgeText = document.getElementById('api-badge-text');
    
    // Mic recording element
    const micBtn = document.getElementById('mic-btn');

    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    // Sidebar navigation and columns
    const sections = document.querySelectorAll('.edu-section');

    // Setup stored API Key
    if (aiEngine.isApiKeyActive()) {
        geminiKeyInput.value = aiEngine.apiKey;
        statusDot.className = 'status-dot active';
        statusText.textContent = 'مفتاح API نشط';
        toggleApiSettings.classList.add('active-mode');
        apiBadgeText.textContent = 'الذكاء الاصطناعي نشط';
    }

    // Modal triggers
    toggleApiSettings.addEventListener('click', () => {
        apiSettingsPanel.classList.remove('hidden');
    });

    closeSettingsBtn.addEventListener('click', () => {
        apiSettingsPanel.classList.add('hidden');
    });

    // Close modal on background click
    apiSettingsPanel.addEventListener('click', (e) => {
        if (e.target === apiSettingsPanel) {
            apiSettingsPanel.classList.add('hidden');
        }
    });

    // Save API key
    saveKeyBtn.addEventListener('click', () => {
        const key = geminiKeyInput.value.trim();
        if (key === "") {
            aiEngine.clearApiKey();
            statusDot.className = 'status-dot simulated';
            statusText.textContent = 'وضع المحاكاة النشط';
            toggleApiSettings.classList.remove('active-mode');
            apiBadgeText.textContent = 'وضع المحاكاة';
            showToast('تم الرجوع إلى وضع المحاكاة المحلي.');
            apiSettingsPanel.classList.add('hidden');
        } else {
            const success = aiEngine.setApiKey(key);
            if (success) {
                statusDot.className = 'status-dot active';
                statusText.textContent = 'مفتاح API نشط';
                toggleApiSettings.classList.add('active-mode');
                apiBadgeText.textContent = 'الذكاء الاصطناعي نشط';
                showToast('تم حفظ مفتاح API وتفعيله بنجاح! 🚀');
                apiSettingsPanel.classList.add('hidden');
            } else {
                showToast('عذراً، يبدو أن مفتاح API غير صالح.');
            }
        }
    });

    // Toast message trigger
    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3500);
    }

    // Highlighting section visually
    function highlightSection(sectionElement) {
        sections.forEach(s => s.classList.remove('active-highlight'));
        sectionElement.classList.add('active-highlight');
    }


    // ================= 1. CELL INTERACTIVE HOTSPOTS (BIOLOGY) =================
    const hotspots = document.querySelectorAll('.hotspot');
    const sunInfoPanel = document.getElementById('sun-info-panel');
    const sunSpotContent = document.getElementById('sun-spot-content');
    const sunPlaceholderText = sunInfoPanel.querySelector('.card-placeholder-text');
    const sunSpotTitle = document.getElementById('sun-spot-title');
    const sunSpotText = document.getElementById('sun-spot-text');
    const sunSpotTemp = document.getElementById('sun-spot-temp');

    const cellData = {
        nucleus: {
            title: '1. النواة (Nucleus)',
            text: 'هي "العقل المدبر" ومركز التحكم الرئيسي في الخلية الحية. تحتوي على المادة الوراثية (DNA) وتوجه كل الأنشطة الحيوية وانقسام الخلية لتكوين خلايا جديدة.',
            temp: 'مركز التحكم الوراثي والتكاثر'
        },
        mitochondria: {
            title: '2. الميتوكوندريا (Mitochondria)',
            text: 'هي "مصانع الطاقة" للخلية الحية. تقوم بعملية التنفس الخلوي وحرق سكر الجلوكوز لإنتاج مركب الطاقة ATP الذي يمد الخلية بالحيوية والحركة.',
            temp: 'إنتاج الطاقة الخلوية (ATP)'
        },
        cytoplasm: {
            title: '3. السيتوبلازم (Cytoplasm)',
            text: 'هو السائل الهلامي شبه الشفاف الذي يملأ تجويف الخلية الحية وتسبح فيه كل العضيات الأخرى. يتكون معظمه من الماء والمواد الغذائية المنحلة وتحدث فيه الكثير من العمليات الحيوية.',
            temp: 'الوسط المائي للتفاعلات الحيوية'
        }
    };

    hotspots.forEach(spot => {
        spot.addEventListener('click', () => {
            const spotKey = spot.getAttribute('data-spot');
            activateSunSpot(spotKey);
        });
    });

    function activateSunSpot(spotKey) {
        hotspots.forEach(s => s.classList.remove('active-spot'));
        const activeSpot = document.querySelector(`.hotspot[data-spot="${spotKey}"]`);
        if (activeSpot) activeSpot.classList.add('active-spot');

        const data = cellData[spotKey];
        if (data) {
            sunPlaceholderText.classList.add('hidden');
            sunSpotContent.classList.remove('hidden');
            
            sunSpotContent.style.opacity = 0;
            setTimeout(() => {
                sunSpotTitle.textContent = data.title;
                sunSpotText.textContent = data.text;
                sunSpotTemp.textContent = data.temp;
                sunSpotContent.style.opacity = 1;
                sunSpotContent.style.transition = 'opacity 0.3s ease';
            }, 100);
        }
    }


    // ================= 2. CHEMICAL ELEMENTS EXPLORER =================
    const planetCards = document.querySelectorAll('.planet-card-mini');
    const explorerPlanetName = document.getElementById('explorer-planet-name');
    const explorerPlanetDesc = document.getElementById('explorer-planet-desc');
    const planetFactsList = document.getElementById('planet-facts-list');
    
    const gravityBar = document.getElementById('gravity-bar');
    const gravityVal = document.getElementById('gravity-val');
    const distanceBar = document.getElementById('distance-bar');
    const distanceVal = document.getElementById('distance-val');
    const diameterBar = document.getElementById('diameter-bar');
    const diameterVal = document.getElementById('diameter-val');

    const chemicalData = {
        hydrogen: {
            name: 'عنصر الهيدروجين (Hydrogen - H)',
            desc: 'أبسط وأخف العناصر الكيميائية في الجدول الدوري والكون على الإطلاق.',
            gravity: '1',
            gravityWidth: '5%',
            distance: '1.008 جرام/مول',
            distanceWidth: '10%',
            diameter: '-252.9°م',
            diameterWidth: '8%',
            facts: [
                'يمثل حوالي 75% من الكتلة الكلية لعناصر الكون الفسيح.',
                'هو المكون الرئيسي للمياه عند اندماجه مع الأكسجين والمصدر الأساسي لطاقة النجوم.'
            ]
        },
        oxygen: {
            name: 'عنصر الأكسجين (Oxygen - O)',
            desc: 'غاز الحياة الأساسي والضروري لعمليات التنفس الكائناتي والاحتراق على كوكب الأرض.',
            gravity: '8',
            gravityWidth: '30%',
            distance: '15.999 جرام/مول',
            distanceWidth: '28%',
            diameter: '-183.0°م',
            diameterWidth: '14%',
            facts: [
                'يشكل حوالي 21% من الحجم الكلي للغلاف الجوي للأرض.',
                'يدخل في تركيب جميع المواد العضوية والمياه وهو العنصر الأكثر وفرة في القشرة الأرضية.'
            ]
        },
        carbon: {
            name: 'عنصر الكربون (Carbon - C)',
            desc: 'العنصر السحري الأساسي لجميع المركبات الحيوية والكيمياء العضوية على الأرض.',
            gravity: '6',
            gravityWidth: '22%',
            distance: '12.011 جرام/مول',
            distanceWidth: '22%',
            diameter: '4,827°م',
            diameterWidth: '82%',
            facts: [
                'يمكن أن يتواجد كفحم كربوني هش أسود أو يتحول تحت الضغط الهائل إلى ألماس صلب براق.',
                'يمتلك قدرة فريدة على تكوين 4 روابط كيميائية قوية مع العناصر الأخرى.'
            ]
        },
        iron: {
            name: 'عنصر الحديد (Iron - Fe)',
            desc: 'معدن انتقالي يتميز بصلابة شديدة، وهو أساس الصناعات الثقيلة والهندسة الإنشائية.',
            gravity: '26',
            gravityWidth: '95%',
            distance: '55.845 جرام/مول',
            distanceWidth: '98%',
            diameter: '2,862°م',
            diameterWidth: '55%',
            facts: [
                'عنصر حيوي يدخل في تركيب الهيموجلوبين في خلايا الدم لنقل الأكسجين بالأنحاء.',
                'يمتلك خصائص مغناطيسية قوية وهو المكون الأساسي لل لب المعدني للأرض.'
            ]
        }
    };

    planetCards.forEach(card => {
        card.addEventListener('click', () => {
            const planetKey = card.getAttribute('data-planet');
            activatePlanet(planetKey);
        });
    });

    function activatePlanet(planetKey) {
        planetCards.forEach(c => c.classList.remove('active-card'));
        const activeCard = document.querySelector(`.planet-card-mini[data-planet="${planetKey}"]`);
        if (activeCard) activeCard.classList.add('active-card');

        const data = chemicalData[planetKey];
        if (data) {
            explorerPlanetName.textContent = data.name;
            explorerPlanetDesc.textContent = data.desc;
            
            gravityBar.style.width = data.gravityWidth;
            gravityVal.textContent = data.gravity;
            distanceBar.style.width = data.distanceWidth;
            distanceVal.textContent = data.distance;
            diameterBar.style.width = data.diameterWidth;
            diameterVal.textContent = data.diameter;

            planetFactsList.innerHTML = '';
            data.facts.forEach(fact => {
                const li = document.createElement('li');
                li.textContent = fact;
                planetFactsList.appendChild(li);
            });
        }
    }


    // ================= 3. PHYSICS MOLECULAR PARTICLES SIMULATION =================
    const particlesContainer = document.getElementById('particles-container');
    const stateButtons = document.querySelectorAll('.state-btn');
    const stateTitle = document.getElementById('gas-planet-title');
    const stateDesc = document.getElementById('gas-planet-desc');
    const stateEnergyTag = document.getElementById('state-energy-tag');

    const statesData = {
        solid: {
            title: 'الحالة الصلبة (Solid State)',
            desc: 'تكون الجزيئات متراصة ومتقاربة جداً بقوة ترابط عملاقة. حركتها محدودة للغاية وتتحرك حركة اهتزازية سريعة وبسيطة في أماكنها دون مغادرتها، لذلك تحافظ على شكل وحجم ثابت.',
            energy: 'طاقة حركية منخفضة جداً'
        },
        liquid: {
            title: 'الحالة السائلة (Liquid State)',
            desc: 'تكون المسافات بين الجزيئات أكبر وقوى الترابط أضعف من الصلبة. تتمتع الجزيئات بحرية كافية للانزلاق والحركة فوق بعضها البعض، لذلك لها حجم ثابت وتأخذ شكل الوعاء.',
            energy: 'طاقة حركية متوسطة'
        },
        gas: {
            title: 'الحالة الغازية (Gas State)',
            desc: 'تكون الجزيئات متباعدة جداً وقوى الترابط بينها تكاد تكون منعدمة. تتحرك الجزيئات بحرية كاملة وسرعة فائقة في جميع الاتجاهات، وتتصادم وتملأ أي مساحة متاحة.',
            energy: 'طاقة حركية عالية جداً'
        }
    };

    let particles = [];
    let currentState = 'solid';
    const numParticles = 45;

    // Initialize particles coordinates and velocities
    function initParticles() {
        particlesContainer.innerHTML = '';
        particles = [];
        
        for (let i = 0; i < numParticles; i++) {
            const particleDiv = document.createElement('div');
            particleDiv.className = 'particle';
            particlesContainer.appendChild(particleDiv);

            particles.push({
                element: particleDiv,
                x: 0,
                y: 0,
                vx: 0,
                vy: 0,
                baseX: 0,
                baseY: 0
            });
        }
        
        updateParticlesConfig();
    }

    // Update coordinates configuration depending on the selected state
    function updateParticlesConfig() {
        const width = particlesContainer.clientWidth || 300;
        const height = particlesContainer.clientHeight || 180;
        
        particles.forEach((p, idx) => {
            if (currentState === 'solid') {
                // Arrange particles in a tight crystal grid in the center
                const cols = 9;
                const r = idx % cols;
                const c = Math.floor(idx / cols);
                p.baseX = (width / 2 - 60) + r * 15;
                p.baseY = (height / 2 - 35) + c * 15;
                p.x = p.baseX;
                p.y = p.baseY;
                p.vx = 0;
                p.vy = 0;
            } else if (currentState === 'liquid') {
                // Settle particles at the bottom of the container with slow motion
                p.x = Math.random() * (width - 15);
                p.y = (height / 2) + Math.random() * (height / 2 - 15);
                p.vx = (Math.random() - 0.5) * 1.5;
                p.vy = (Math.random() - 0.5) * 1.0;
            } else if (currentState === 'gas') {
                // Spread particles everywhere with high speeds
                p.x = Math.random() * (width - 15);
                p.y = Math.random() * (height - 15);
                p.vx = (Math.random() - 0.5) * 6;
                p.vy = (Math.random() - 0.5) * 6;
            }
        });
    }

    // Animation Loop
    function animateParticles() {
        const width = particlesContainer.clientWidth || 300;
        const height = particlesContainer.clientHeight || 180;

        particles.forEach(p => {
            if (currentState === 'solid') {
                // Vibration simulation
                p.x = p.baseX + (Math.random() - 0.5) * 2.5;
                p.y = p.baseY + (Math.random() - 0.5) * 2.5;
            } else if (currentState === 'liquid') {
                // Moving slowly and bouncing at bottom half
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off boundaries of bottom half
                if (p.x < 0 || p.x > width - 10) p.vx *= -1;
                if (p.y < height / 2 - 10 || p.y > height - 10) p.vy *= -1;
                
                // Boundaries clamping
                p.x = Math.max(0, Math.min(width - 10, p.x));
                p.y = Math.max(height / 2 - 10, Math.min(height - 10, p.y));
            } else if (currentState === 'gas') {
                // Rapid free movement everywhere
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off container walls
                if (p.x < 0 || p.x > width - 10) p.vx *= -1;
                if (p.y < 0 || p.y > height - 10) p.vy *= -1;

                p.x = Math.max(0, Math.min(width - 10, p.x));
                p.y = Math.max(0, Math.min(height - 10, p.y));
            }

            // Apply visual positions
            p.element.style.transform = `translate(${p.x}px, ${p.y}px)`;
        });

        requestAnimationFrame(animateParticles);
    }

    stateButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const stateKey = btn.getAttribute('data-state');
            activateState(stateKey);
        });
    });

    function activateState(stateKey) {
        stateButtons.forEach(b => b.classList.remove('active-state'));
        const activeBtn = document.querySelector(`.state-btn[data-state="${stateKey}"]`);
        if (activeBtn) activeBtn.classList.add('active-state');

        currentState = stateKey;
        updateParticlesConfig();

        const data = statesData[stateKey];
        if (data) {
            stateTitle.textContent = data.title;
            stateDesc.textContent = data.desc;
            stateEnergyTag.textContent = data.energy;
        }
    }


    // ================= 4. SCIENCE INTERACTIVE QUIZ =================
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');
    const askAiResultBtn = document.getElementById('ask-ai-result-btn');
    const quizIntro = document.getElementById('quiz-intro');
    const quizPlay = document.getElementById('quiz-play');
    const quizResult = document.getElementById('quiz-result');
    
    const quizProgressFill = document.getElementById('quiz-progress-fill');
    const questionNumText = document.getElementById('question-num');
    const questionText = document.getElementById('question-text');
    const answersGrid = document.getElementById('answers-grid');
    
    const resultTitle = document.getElementById('result-title');
    const resultText = document.getElementById('result-text');

    const quizQuestions = [
        {
            question: "ما هي وحدة البناء والتركيب الأساسية في جسم الكائن الحي؟",
            answers: ["الذرة الكيميائية", "الخلية الحية", "العنصر النقي", "الجزيء العضوي"],
            correctIndex: 1
        },
        {
            question: "أي من العناصر الكيميائية التالية يعتبر غازاً في درجة الحرارة الطبيعية وضروري للتنفس؟",
            answers: ["الحديد (Fe)", "الكربون (C)", "الأكسجين (O)", "النحاس (Cu)"],
            correctIndex: 2
        },
        {
            question: "في أي حالة من حالات المادة تكون الجزيئات متباعدة جداً وقوى الترابط بينها شبه منعدمة؟",
            answers: ["الحالة الصلبة", "الحالة السائلة", "الحالة الغازية", "الحالة الكريستالية"],
            correctIndex: 2
        }
    ];

    let currentQuestionIdx = 0;
    let userScore = 0;
    let quizActive = false;

    startQuizBtn.addEventListener('click', startQuiz);
    restartQuizBtn.addEventListener('click', startQuiz);
    
    askAiResultBtn.addEventListener('click', () => {
        const message = `أهلاً مستر شريف، لقد أنهيت كويز العلوم وحصلت على نتيجة ${userScore} من ${quizQuestions.length}. حلل مستواي بكلمات تشجيعية!`;
        handleUserMessage(message);
    });

    function startQuiz() {
        currentQuestionIdx = 0;
        userScore = 0;
        quizActive = true;
        
        quizIntro.classList.add('hidden');
        quizResult.classList.add('hidden');
        quizPlay.classList.remove('hidden');
        
        showQuestion();
    }

    function showQuestion() {
        const currentQ = quizQuestions[currentQuestionIdx];
        
        const progressPercentage = ((currentQuestionIdx) / quizQuestions.length) * 100;
        quizProgressFill.style.width = `${progressPercentage}%`;
        
        questionNumText.textContent = `السؤال ${currentQuestionIdx + 1} من ${quizQuestions.length}`;
        questionText.textContent = currentQ.question;
        
        answersGrid.innerHTML = '';
        currentQ.answers.forEach((ans, idx) => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.textContent = ans;
            btn.addEventListener('click', () => selectAnswer(btn, idx));
            answersGrid.appendChild(btn);
        });
    }

    function selectAnswer(selectedBtn, answerIdx) {
        const currentQ = quizQuestions[currentQuestionIdx];
        const answerButtons = answersGrid.querySelectorAll('.answer-btn');
        
        answerButtons.forEach(btn => btn.style.pointerEvents = 'none');

        if (answerIdx === currentQ.correctIndex) {
            selectedBtn.classList.add('correct');
            userScore++;
        } else {
            selectedBtn.classList.add('incorrect');
            answerButtons[currentQ.correctIndex].classList.add('correct');
        }

        setTimeout(() => {
            currentQuestionIdx++;
            if (currentQuestionIdx < quizQuestions.length) {
                showQuestion();
            } else {
                showResult();
            }
        }, 1500);
    }

    function showResult() {
        quizActive = false;
        quizPlay.classList.add('hidden');
        quizResult.classList.remove('hidden');
        
        quizProgressFill.style.width = '100%';

        if (userScore === quizQuestions.length) {
            resultTitle.textContent = "عبقري العلوم الصغير! 🏆";
            resultText.textContent = `ممتاز يا بطل! لقد حصلت على الدرجة النهائية ${userScore}/${quizQuestions.length} بنسبة 100%!`;
        } else if (userScore > 0) {
            resultTitle.textContent = "مستكشف علمي رائع! 💫";
            resultText.textContent = `عمل جيد! حصلت على نتيجة ${userScore} من ${quizQuestions.length}. كرر المحاولة للوصول للدرجة النهائية!`;
        } else {
            resultTitle.textContent = "حاول مجدداً يا بطل! 🔬";
            resultText.textContent = `لم تجب على أي سؤال. اسأل مستر شريف عن الدروس وسيعلمك كل شيء مجدداً!`;
        }
    }


    // ================= 5. VOICE RECOGNITION (WEB SPEECH API) =================
    let recognition = null;
    let isRecording = false;

    // Check browser compatibility for Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = 'ar-EG'; // Set to Egyptian Arabic / Standard Arabic
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            isRecording = true;
            micBtn.classList.add('active-recording');
            chatInput.placeholder = "جاري الاستماع... تحدث الآن بصوتك 🎤";
        };

        recognition.onend = () => {
            isRecording = false;
            micBtn.classList.remove('active-recording');
            chatInput.placeholder = "اضغط على المايك وتحدث أو اكتب سؤالك هنا...";
        };

        recognition.onresult = (event) => {
            const speechText = event.results[0][0].transcript;
            if (speechText) {
                chatInput.value = speechText;
                showToast(`تم التعرف على: "${speechText}"`);
                
                // Auto-send voice queries
                setTimeout(() => {
                    sendBtn.click();
                }, 600);
            }
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            if (event.error === 'not-allowed') {
                showToast("عذراً، يجب عليك إعطاء صلاحية الميكروفون للموقع.");
            } else {
                showToast("حدث خطأ أثناء الاستماع، جرب التحدث مجدداً.");
            }
            isRecording = false;
            micBtn.classList.remove('active-recording');
        };

        // Microphone Click Toggle
        micBtn.addEventListener('click', () => {
            if (isRecording) {
                recognition.stop();
            } else {
                recognition.start();
            }
        });
    } else {
        // Fallback if not supported (Safari/older browsers)
        micBtn.style.opacity = '0.5';
        micBtn.title = "الميكروفون غير مدعوم في هذا المتصفح";
        micBtn.addEventListener('click', () => {
            showToast("عذراً، متصفحك الحالي لا يدعم خاصية التسجيل الصوتي. يرجى الكتابة.");
        });
    }


    // ================= 6. CHAT CONSOLE LOGIC =================
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

    // Auto-grow input text area
    chatInput.addEventListener('input', () => {
        chatInput.style.height = 'auto';
        chatInput.style.height = (chatInput.scrollHeight - 10) + 'px';
    });

    clearChatBtn.addEventListener('click', () => {
        chatMessagesContainer.innerHTML = `
            <div id="latest-tutor-message" class="animate-fade-in">
                <p>تم تصفير سجل الأسئلة! 🧬</p>
                <p>أنا مستعد لأسئلتك الآن. تحدث بصوتك مباشرة أو اكتب سؤالك.</p>
            </div>
        `;
    });

    promptChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const promptText = chip.getAttribute('data-prompt');
            handleUserMessage(promptText);
        });
    });

    async function handleUserMessage(message) {
        appendMessage('student', message);
        const loadingId = appendLoadingBubble();

        try {
            const response = await aiEngine.getResponse(message);
            removeLoadingBubble(loadingId);
            appendMessage('tutor', response.text);
            
            if (response.nav) {
                executeNavigationCommand(response.nav);
            }
        } catch (error) {
            removeLoadingBubble(loadingId);
            appendMessage('tutor', `عذراً يا صديقي، حدث خطأ أثناء معالجة السؤال. تأكد من اتصال الإنترنت أو صحة مفتاح API.`);
            console.error(error);
        }
    }

    function appendMessage(sender, text) {
        const time = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
        
        let formattedText = text
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');

        const lineDiv = document.createElement('div');
        lineDiv.className = `chat-line ${sender === 'student' ? 'student-line' : 'tutor-line'}`;
        
        lineDiv.style.marginBottom = '12px';
        lineDiv.style.borderBottom = '1px dashed rgba(0, 255, 210, 0.05)';
        lineDiv.style.paddingBottom = '8px';
        
        if (sender === 'student') {
            lineDiv.innerHTML = `
                <span style="color:var(--neon-teal); font-weight:700; font-size:0.75rem; display:block;">أنت (${time}):</span>
                <p style="color:#d1fae5; margin-top:2px;">${formattedText}</p>
            `;
        } else {
            lineDiv.innerHTML = `
                <span style="color:var(--neon-blue); font-weight:700; font-size:0.75rem; display:block;">مستر شريف (${time}):</span>
                <p style="color:#f1f5f9; margin-top:2px;">${formattedText}</p>
            `;
        }

        chatMessagesContainer.appendChild(lineDiv);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    function appendLoadingBubble() {
        const loadingId = 'loading-' + Date.now();
        const loadingDiv = document.createElement('div');
        loadingDiv.id = loadingId;
        loadingDiv.style.padding = '8px 0';
        loadingDiv.innerHTML = `
            <div style="display:flex; gap:8px; align-items:center; font-size:0.78rem; color:var(--text-muted);">
                <i class="fa-solid fa-spinner spinner-icon" style="animation: spin 1s infinite linear;"></i>
                <span>مستر شريف يقوم بتحليل الشرح العلمي والتنقل...</span>
            </div>
        `;
        chatMessagesContainer.appendChild(loadingDiv);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        return loadingId;
    }

    function removeLoadingBubble(id) {
        const element = document.getElementById(id);
        if (element) {
            element.remove();
        }
    }


    // ================= 7. SCROLL NAVIGATION ROUTER =================
    function executeNavigationCommand(navString) {
        const parts = navString.split(':');
        const sectionId = parts[0];
        const detailKey = parts[1] || null;

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            let guidanceMsg = "يوجهك مستر شريف إلى لوحة الشرح المناسبة...";
            
            if (sectionId === 'cell-section') {
                guidanceMsg = "يوجهك مستر شريف إلى مجسم الخلية الحية! 🧬";
                if (detailKey) activateSunSpot(detailKey);
            } else if (sectionId === 'elements-section') {
                if (detailKey) {
                    const arabicName = chemicalData[detailKey] ? chemicalData[detailKey].name.split(' ')[1] : detailKey;
                    guidanceMsg = `يوجهك مستر شريف لعرض عنصر ${arabicName}! 🧪`;
                    activatePlanet(detailKey);
                } else {
                    guidanceMsg = "يوجهك مستر شريف لقسم العناصر والمواد! 🧪";
                }
            } else if (sectionId === 'states-section') {
                if (detailKey) {
                    const arabicName = statesData[detailKey] ? statesData[detailKey].title.split(' ')[0] : detailKey;
                    guidanceMsg = `يوجهك مستر شريف لمحاكاة جزيئات المادة ${arabicName}! 🌡️`;
                    activateState(detailKey);
                } else {
                    guidanceMsg = "يوجهك مستر شريف لمحاكاة سلوك جزيئات المادة! 🌡️";
                }
            } else if (sectionId === 'quiz-section') {
                guidanceMsg = "يوجهك مستر شريف إلى تحدي كويز العلوم! 🎓";
                if (!quizActive) {
                    setTimeout(() => startQuiz(), 1200);
                }
            }

            // Show center banner
            guidanceText.textContent = guidanceMsg;
            guidanceBanner.classList.remove('hidden');
            
            setTimeout(() => {
                guidanceBanner.classList.add('hidden');
            }, 3000);

            // Animate robot head screen when navigating
            const robotScreen = document.querySelector('.robot-screen');
            robotScreen.style.borderColor = 'var(--neon-green)';
            setTimeout(() => {
                robotScreen.style.borderColor = 'rgba(0, 255, 210, 0.2)';
            }, 2500);

            // Scroll the target section
            setTimeout(() => {
                const column = targetSection.closest('.column-scroll-content');
                if (column) {
                    column.scrollTop = targetSection.offsetTop - 20;
                } else {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                highlightSection(targetSection);
            }, 300);
        }
    }

    // Default Initialization
    activatePlanet('carbon');
    initParticles();
    animateParticles();
    activateState('solid');
});
