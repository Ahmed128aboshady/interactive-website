/* -------------------------------------------------------------
   Main Application Logic for CosmoGuide - Interactive UI Controls
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // Instantiate AI Engine
    const aiEngine = new AstroTutorEngine();

    // Elements
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');
    const clearChatBtn = document.getElementById('clear-chat-btn');
    const promptChips = document.querySelectorAll('.prompt-chip');
    const guidanceBanner = document.getElementById('guidance-banner');
    const guidanceText = document.getElementById('guidance-text');
    
    // API config elements
    const toggleSettingsBtn = document.getElementById('toggle-settings');
    const apiSettingsBox = document.querySelector('.api-settings');
    const geminiKeyInput = document.getElementById('gemini-key-input');
    const saveKeyBtn = document.getElementById('save-key-btn');
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.getElementById('status-text');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    // Sidebar navigation elements
    const navItems = document.querySelectorAll('.nav-item');
    const mainContent = document.querySelector('.main-content');
    const sections = document.querySelectorAll('.edu-section');

    // Setup stored API Key
    if (aiEngine.isApiKeyActive()) {
        geminiKeyInput.value = aiEngine.apiKey;
        statusDot.className = 'status-dot active';
        statusText.textContent = 'مفتاح API نشط';
    }

    // 1. Sidebar settings toggle
    toggleSettingsBtn.addEventListener('click', () => {
        apiSettingsBox.classList.toggle('collapsed');
    });

    // Save API key
    saveKeyBtn.addEventListener('click', () => {
        const key = geminiKeyInput.value.trim();
        if (key === "") {
            aiEngine.clearApiKey();
            statusDot.className = 'status-dot simulated';
            statusText.textContent = 'وضع المحاكاة النشط';
            showToast('تم الرجوع إلى وضع المحاكاة المحلي.');
        } else {
            const success = aiEngine.setApiKey(key);
            if (success) {
                statusDot.className = 'status-dot active';
                statusText.textContent = 'مفتاح API نشط';
                showToast('تم حفظ مفتاح API وتفعيله بنجاح! 🚀');
                apiSettingsBox.classList.add('collapsed');
            } else {
                showToast('عذراً، يبدو أن مفتاح API غير صالح.');
            }
        }
    });

    // Show custom toast message
    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3500);
    }

    // 2. Sidebar Navigation Scroll Sync
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                navItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                highlightSection(targetSection);
            }
        });
    });

    // Highlight target section visually
    function highlightSection(sectionElement) {
        sections.forEach(s => s.classList.remove('active-highlight'));
        sectionElement.classList.add('active-highlight');
    }

    // Sync active nav item on manual scrolling
    mainContent.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = mainContent.scrollTop + (mainContent.clientHeight / 2);

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navItems.forEach(item => {
                if (item.getAttribute('data-target') === currentSectionId) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    });


    // 3. SUN INTERACTIVE HOTSPOTS
    const hotspots = document.querySelectorAll('.hotspot');
    const sunInfoPanel = document.getElementById('sun-info-panel');
    const sunSpotContent = document.getElementById('sun-spot-content');
    const sunPlaceholderText = sunInfoPanel.querySelector('.card-placeholder-text');
    const sunSpotTitle = document.getElementById('sun-spot-title');
    const sunSpotText = document.getElementById('sun-spot-text');
    const sunSpotTemp = document.getElementById('sun-spot-temp');

    const sunData = {
        core: {
            title: '1. لب الشمس (The Core)',
            text: 'هو النواة المركزية الكثيفة للشمس. هنا تحدث تفاعلات الاندماج النووي الاندماجي العملاقة، حيث تندمج ذرات الهيدروجين لتتحول إلى هيليوم، وتنتج كميات هائلة ومذهلة من الطاقة والضوء التي تدفئ كوكبنا الأرضي.',
            temp: '15 مليون درجة مئوية (15,000,000°م)'
        },
        photosphere: {
            title: '2. الغلاف الضوئي (The Photosphere)',
            text: 'هو السطح الخارجي المرئي للشمس الذي نشاهده من الأرض. هذا الغلاف ينشر الضوء المرئي وتظهر عليه أحياناً بقع مظلمة باردة نسبياً تُسمى البقع الشمسية (Sunspots) الناتجة عن اضطرابات مغناطيسية.',
            temp: '5,500 درجة مئوية (5,500°م)'
        },
        corona: {
            title: '3. الإكليل أو الهالة (The Corona)',
            text: 'هو الغلاف الجوي الخارجي المتوهج والرفيع للغاية للشمس. يمتد ملايين الكيلومترات في الفضاء، ولا يمكن رؤيته بالعين المجردة إلا أثناء كسوف الشمس الكلي عند حجب جسم القمر لقرص الشمس.',
            temp: 'من 1 إلى 3 ملايين درجة مئوية (1,000,000°م)'
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

        const data = sunData[spotKey];
        if (data) {
            sunPlaceholderText.classList.add('hidden');
            sunSpotContent.classList.remove('hidden');
            
            // Text change animation
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


    // 4. ROCKY PLANETS EXPLORER
    const planetCards = document.querySelectorAll('.planet-card');
    const explorerPlanetName = document.getElementById('explorer-planet-name');
    const explorerPlanetDesc = document.getElementById('explorer-planet-desc');
    const planetFactsList = document.getElementById('planet-facts-list');
    
    // Progress Bar fills
    const gravityBar = document.getElementById('gravity-bar');
    const gravityVal = document.getElementById('gravity-val');
    const distanceBar = document.getElementById('distance-bar');
    const distanceVal = document.getElementById('distance-val');
    const diameterBar = document.getElementById('diameter-bar');
    const diameterVal = document.getElementById('diameter-val');

    const rockyData = {
        mercury: {
            name: 'كوكب عطارد (Mercury)',
            desc: 'أصغر كواكب المجموعة الشمسيّة وأقربها إلى الشمس، سطحه مغطى بالفوهات النيزكية العميقة.',
            gravity: '0.38g',
            gravityWidth: '38%',
            distance: '0.39 AU',
            distanceWidth: '10%',
            diameter: '4,879 كم',
            diameterWidth: '18%',
            facts: [
                'سنتُه سريعة جداً حيث يكمل دورته حول الشمس في 88 يوماً أرضياً فقط.',
                'يفتقر تماماً لوجود غلاف جوي حقيقي مما يسبب تفاوتاً حرارياً مرعباً بين ليله ونهاره.'
            ]
        },
        venus: {
            name: 'كوكب الزهرة (Venus)',
            desc: 'ثاني كوكب بعداً عن الشمس، ويلقب بتوأم الأرض لحجمه المماثل، ولكنه كوكب جهنمي الحرارة.',
            gravity: '0.90g',
            gravityWidth: '90%',
            distance: '0.72 AU',
            distanceWidth: '18%',
            diameter: '12,104 كم',
            diameterWidth: '47%',
            facts: [
                'هو أسخن الكواكب على الإطلاق (475°م) بسبب احتباس حراري فائق ناتج عن غلافه الكربوني الكثيف.',
                'يدور حول نفسه بعكس اتجاه دوران باقي الكواكب (تشرق الشمس فيه من الغرب!).'
            ]
        },
        earth: {
            name: 'كوكب الأرض (Earth)',
            desc: 'ثالث كواكب المجموعة الشمسية وموطننا، وهو الكوكب الوحيد المؤكد فيه وجود حياة مائية برية حتى الآن.',
            gravity: '1.00g',
            gravityWidth: '100%',
            distance: '1.00 AU',
            distanceWidth: '25%',
            diameter: '12,742 كم',
            diameterWidth: '50%',
            facts: [
                'يمتلك غلافاً جوياً غنياً بالأكسجين والنيتروجين يسمح بتنفس الكائنات وتوازن الحرارة.',
                'تغطي المحيطات والبحار السائلة حوالي 71% من مساحة سطحه الكلية.'
            ]
        },
        mars: {
            name: 'كوكب المريخ (Mars)',
            desc: 'الجار الأحمر الرائع، كوكب صخري يتميز ببيئته الباردة والجافة وغلافه الجوي الخفيف جداً.',
            gravity: '0.38g',
            gravityWidth: '38%',
            distance: '1.52 AU',
            distanceWidth: '38%',
            diameter: '6,779 كم',
            diameterWidth: '26%',
            facts: [
                'يظهر لونه الأحمر بسبب وفرة أكسيد الحديد (الصدأ) المغطي لصخوره وتربته.',
                'يضم جبل أوليمبوس (Olympus Mons)، وهو أضخم بركان خامل تم اكتشافه في مجموعتنا الشمسية.'
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
        const activeCard = document.querySelector(`.planet-card[data-planet="${planetKey}"]`);
        if (activeCard) activeCard.classList.add('active-card');

        const data = rockyData[planetKey];
        if (data) {
            explorerPlanetName.textContent = data.name;
            explorerPlanetDesc.textContent = data.desc;
            
            // Fills updates
            gravityBar.style.width = data.gravityWidth;
            gravityVal.textContent = data.gravity;
            distanceBar.style.width = data.distanceWidth;
            distanceVal.textContent = data.distance;
            diameterBar.style.width = data.diameterWidth;
            diameterVal.textContent = data.diameter;

            // Facts updates
            planetFactsList.innerHTML = '';
            data.facts.forEach(fact => {
                const li = document.createElement('li');
                li.textContent = fact;
                planetFactsList.appendChild(li);
            });
        }
    }


    // 5. GAS GIANTS SIMULATION AND EXPLORER
    const orbitPlanets = document.querySelectorAll('.orbit-planet');
    const orbitLines = document.querySelectorAll('.orbit-line');
    const gasPlanetTitle = document.getElementById('gas-planet-title');
    const gasPlanetDesc = document.getElementById('gas-planet-desc');
    const gasMoonsVal = document.getElementById('gas-moons-val');

    const gasData = {
        jupiter: {
            title: 'المشتري (ملك العمالقة الغازية)',
            desc: 'أكبر كواكب النظام الشمسي على الإطلاق. وزنه يعادل مرتين ونصف وزن باقي الكواكب مجتمعة. يتميز بـ "البقعة الحمراء العظيمة" وهي عاصفة إعصارية عملاقة أكبر من حجم الأرض وتدور منذ قرون. جاذبيته الهائلة تحمي الكواكب الداخلية بجذب المذنبات المدمرة.',
            moons: '95 قمراً'
        },
        saturn: {
            title: 'زحل (سيد الحلقات المذهلة)',
            desc: 'ثاني كوكب من حيث الضخامة، ويشتهر بحلقاته الغبارية الجليدية البراقة. يتكون بشكل أساسي من غاز الهيدروجين الخفيف، وتبلغ كثافته الكلية أقل من كثافة المياه العادية، مما يعني أنه لو وضع في حوض مائي عملاق لكان يطفو على سطحه!',
            moons: '146 قمراً'
        },
        uranus: {
            title: 'أورانوس (العملاق المتدحرج البارد)',
            desc: 'عملاق جليدي أزرق فاتح. الميزة الاستثنائية لأورانوس هي ميلان محور دورانه بشكل جانبي حاد جداً (98 درجة)، مما يجعله يبدو وكأنه يتدحرج على جنبه على طول مسار مداره حول الشمس، ويعتقد أن هذا بسبب اصطدام فلكي قديم.',
            moons: '28 قمراً'
        },
        neptune: {
            title: 'نبتون (كوكب الرياح الزرقاء العاتية)',
            desc: 'أبعد كواكب المجموعة الشمسية وثامنها. يتميز بلونه الأزرق الداكن الجذاب الناتج عن غاز الميثان. هذا الكوكب البارد تجري على سطحه رياح فائقة السرعة هي الأقوى في النظام الشمسي، حيث تتجاوز سرعتها أحياناً 2,100 كيلومتر في الساعة!',
            moons: '16 قمراً'
        }
    };

    orbitPlanets.forEach(planet => {
        planet.addEventListener('click', (e) => {
            e.stopPropagation(); // Avoid parent click conflict
            const gasKey = planet.getAttribute('data-gas');
            activateGasPlanet(gasKey);
        });
    });

    // Clicking line orbit selects planet too
    orbitLines.forEach(line => {
        line.addEventListener('click', () => {
            const planetNode = line.querySelector('.orbit-planet');
            if (planetNode) {
                const gasKey = planetNode.getAttribute('data-gas');
                activateGasPlanet(gasKey);
            }
        });
    });

    function activateGasPlanet(gasKey) {
        orbitLines.forEach(l => l.classList.remove('active-orbit'));
        const planetNode = document.querySelector(`.orbit-planet[data-gas="${gasKey}"]`);
        if (planetNode) {
            const parentOrbit = planetNode.parentElement;
            parentOrbit.classList.add('active-orbit');
        }

        const data = gasData[gasKey];
        if (data) {
            gasPlanetTitle.textContent = data.title;
            gasPlanetDesc.textContent = data.desc;
            gasMoonsVal.textContent = data.moons;
        }
    }


    // 6. INTERACTIVE KNOWLEDGE QUIZ
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
            question: "أي من هذه الكواكب يعتبر كوكباً غازياً عملاقاً؟",
            answers: ["الأرض", "المريخ", "المشتري", "عطارد"],
            correctIndex: 2
        },
        {
            question: "كم تبلغ درجة حرارة قلب (لب) الشمس تقريباً؟",
            answers: ["5,500 درجة مئوية", "15 مليون درجة مئوية", "3 ملايين درجة مئوية", "100 ألف درجة مئوية"],
            correctIndex: 1
        },
        {
            question: "ما هو الكوكب الذي يتميز بوجود أكبر بركان خامد في المجموعة الشمسية؟",
            answers: ["زحل", "المريخ", "الزهرة", "نبتون"],
            correctIndex: 1
        }
    ];

    let currentQuestionIdx = 0;
    let userScore = 0;
    let quizActive = false;

    startQuizBtn.addEventListener('click', startQuiz);
    restartQuizBtn.addEventListener('click', startQuiz);
    
    askAiResultBtn.addEventListener('click', () => {
        const message = `لقد أنهيت كويز الفضاء وحصلت على نتيجة ${userScore} من ${quizQuestions.length}. حلل أدائي بكلمات تشجيعية!`;
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
        
        // Progress bar percentage
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
        
        // Disable all buttons to prevent multiple clicks
        answerButtons.forEach(btn => btn.style.pointerEvents = 'none');

        if (answerIdx === currentQ.correctIndex) {
            selectedBtn.classList.add('correct');
            userScore++;
        } else {
            selectedBtn.classList.add('incorrect');
            // Highlight the correct one
            answerButtons[currentQ.correctIndex].classList.add('correct');
        }

        setTimeout(() => {
            currentQuestionIdx++;
            if (currentQuestionIdx < quizQuestions.length) {
                showQuestion();
            } else {
                showResult();
            }
        }, 1800);
    }

    function showResult() {
        quizActive = false;
        quizPlay.classList.add('hidden');
        quizResult.classList.remove('hidden');
        
        quizProgressFill.style.width = '100%';

        if (userScore === quizQuestions.length) {
            resultTitle.textContent = "مذهل، رائد فضاء متميز! 🏆";
            resultText.textContent = `لقد أجبت بشكل صحيح على جميع الأسئلة وحصلت على ${userScore}/${quizQuestions.length} بنسبة 100%!`;
        } else if (userScore > 0) {
            resultTitle.textContent = "عمل رائع، مستكشف واعد! 💫";
            resultText.textContent = `لقد أجبت بشكل صحيح على ${userScore} من أصل ${quizQuestions.length} أسئلة. يمكنك المحاولة مرة أخرى للحصول على النتيجة الكاملة.`;
        } else {
            resultTitle.textContent = "حظاً أوفر في المرة القادمة! 🔭";
            resultText.textContent = `لم تجب على أي سؤال بشكل صحيح. اسأل AstroTutor ليشرح لك طبقات الشمس والكواكب ثم أعد المحاولة!`;
        }
    }


    // 7. AI ASSISTANT CHAT HANDLERS
    sendBtn.addEventListener('click', () => {
        const text = chatInput.value.trim();
        if (text) {
            handleUserMessage(text);
            chatInput.value = '';
            chatInput.style.height = 'auto'; // Reset input height
        }
    });

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendBtn.click();
        }
    });

    // Auto-expand textarea
    chatInput.addEventListener('input', () => {
        chatInput.style.height = 'auto';
        chatInput.style.height = (chatInput.scrollHeight - 10) + 'px';
    });

    clearChatBtn.addEventListener('click', () => {
        chatMessages.innerHTML = `
            <div class="message tutor-msg animate-fade-in">
                <div class="msg-bubble">
                    <p>مرحباً بك مجدداً! تم مسح المحادثة السابقة. 🌌</p>
                    <p>أنا جاهز لمساعدتك مجدداً. ما الذي تود استكشافه الآن؟</p>
                </div>
                <span class="msg-time">الآن</span>
            </div>
        `;
    });

    // Handle quick prompts click
    promptChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const promptText = chip.getAttribute('data-prompt');
            handleUserMessage(promptText);
        });
    });

    async function handleUserMessage(message) {
        // 1. Append Student Message
        appendMessage('student', message);

        // 2. Add loading bubble for Tutor
        const loadingId = appendLoadingBubble();
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            // 3. Request response from AI Engine
            const response = await aiEngine.getResponse(message);

            // Remove loading bubble
            removeLoadingBubble(loadingId);

            // 4. Append Tutor response to chat UI
            appendMessage('tutor', response.text);
            
            // 5. Execute navigation command if present
            if (response.nav) {
                executeNavigationCommand(response.nav);
            }
        } catch (error) {
            removeLoadingBubble(loadingId);
            appendMessage('tutor', `عذراً يا صديقي، حدث خطأ أثناء معالجة السؤال. تأكد من اتصال الإنترنت أو صحة مفتاح API.`);
            console.error(error);
        }

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function appendMessage(sender, text) {
        const time = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender === 'student' ? 'student-msg' : 'tutor-msg'}`;
        
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'msg-bubble';
        
        // Parse simple markdown-like **bold** syntax to HTML
        let formattedText = text
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
            
        bubbleDiv.innerHTML = `<p>${formattedText}</p>`;
        
        const timeSpan = document.createElement('span');
        timeSpan.className = 'msg-time';
        timeSpan.textContent = sender === 'student' ? `الطالب • ${time}` : `AstroTutor • ${time}`;
        
        messageDiv.appendChild(bubbleDiv);
        messageDiv.appendChild(timeSpan);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function appendLoadingBubble() {
        const loadingId = 'loading-' + Date.now();
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message tutor-msg loading-msg';
        messageDiv.id = loadingId;

        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'msg-bubble';
        bubbleDiv.innerHTML = `
            <div style="display:flex; gap:5px; align-items:center; padding: 4px 10px;">
                <span class="status-dot simulated" style="animation: breathe 1s infinite alternate;"></span>
                <span>جاري التفكير والكتابة...</span>
            </div>
        `;

        messageDiv.appendChild(bubbleDiv);
        chatMessages.appendChild(messageDiv);
        return loadingId;
    }

    function removeLoadingBubble(id) {
        const element = document.getElementById(id);
        if (element) {
            element.remove();
        }
    }

    // 8. NAVIGATION COMMAND EXECUTIVE
    function executeNavigationCommand(navString) {
        // Format: "section-id" or "section-id:planet-name"
        const parts = navString.split(':');
        const sectionId = parts[0];
        const detailKey = parts[1] || null;

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            // Trigger guidance notification banner
            let guidanceMsg = "يوجهك AstroTutor إلى قسم مناسب الآن...";
            
            if (sectionId === 'sun-section') {
                guidanceMsg = "يوجهك AstroTutor إلى لوحة الشمس التفاعلية! ☀️";
                if (detailKey) activateSunSpot(detailKey); // core, photosphere, corona
            } else if (sectionId === 'rocky-section') {
                if (detailKey) {
                    const arabicName = rockyData[detailKey] ? rockyData[detailKey].name.split(' ')[1] : detailKey;
                    guidanceMsg = `يوجهك AstroTutor إلى تفاصيل كوكب ${arabicName}! 🪐`;
                    activatePlanet(detailKey);
                } else {
                    guidanceMsg = "يوجهك AstroTutor إلى كواكب المجموعة الصخرية! 🌍";
                }
            } else if (sectionId === 'gas-section') {
                if (detailKey) {
                    const arabicName = gasData[detailKey] ? gasData[detailKey].title.split(' ')[0] : detailKey;
                    guidanceMsg = `يوجهك AstroTutor إلى محاكاة كوكب ${arabicName}! 🌀`;
                    activateGasPlanet(detailKey);
                } else {
                    guidanceMsg = "يوجهك AstroTutor إلى العمالقة الغازية الخارجية! 🪐";
                }
            } else if (sectionId === 'quiz-section') {
                guidanceMsg = "يوجهك AstroTutor إلى اختبار المعرفة! 🧪";
                if (!quizActive) {
                    // Auto-start if not started
                    setTimeout(() => startQuiz(), 1200);
                }
            }

            // Show banner
            guidanceText.textContent = guidanceMsg;
            guidanceBanner.classList.remove('hidden');
            
            setTimeout(() => {
                guidanceBanner.classList.add('hidden');
            }, 3000);

            // Scroll Smooth
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                highlightSection(targetSection);
            }, 300);
        }
    }

    // Default initialization (Select Earth & Jupiter by default on load)
    activatePlanet('earth');
    activateGasPlanet('jupiter');
});
