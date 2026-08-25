# Generator script for Mr. Mena Gerges Science Platform

def build_index_html():
    html = """<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>منصة مستر مينا جرجس للعلوم التفاعلية | Mena Science 3D</title>
    <!-- Google Fonts: Cairo & Tajawal -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800&family=Tajawal:wght@400;500;700;800&display=swap" rel="stylesheet">
    <!-- FontAwesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Style Sheet -->
    <link rel="stylesheet" href="style.css?v=20">
    <!-- ResponsiveVoice Arabic TTS -->
    <script src="https://code.responsivevoice.org/responsivevoice.js?key=FREE"></script>
</head>
<body>
    <!-- Background Stars Simulation -->
    <div class="space-bg">
        <div class="stars"></div>
        <div class="twinkling"></div>
        <div class="nebula"></div>
    </div>

    <!-- Hidden Audio Player for Mr. Mena TTS -->
    <audio id="tutor-audio-player" style="display:none;"></audio>

    <!-- Top Platform Header -->
    <header class="main-platform-header glass-panel">
        <div class="header-branding">
            <div class="teacher-mini-badge">
                <img src="assets/mr_mena_1.jpeg" alt="مستر مينا جرجس" class="teacher-avatar-img">
                <div class="teacher-status-pulse"></div>
            </div>
            <div class="brand-titles">
                <h1>منصة مستر مينا جرجس للعلوم <span>Mena Science 3D</span></h1>
                <p>المساعد الذكي لمنهج ومذكرات العلوم للمرحلة الإعدادية</p>
            </div>
        </div>

        <!-- Grade 1 & Grade 2 Switcher Tabs -->
        <div class="grade-selector-nav">
            <button class="grade-tab-btn active-grade" data-grade="grade1" id="tab-grade-1">
                <i class="fa-solid fa-graduation-cap"></i>
                <div class="tab-label">
                    <span class="main-grade-title">الصف الأول الإعدادي</span>
                    <span class="sub-grade-term">الترم الأول (كتاب الامتحان ومذكرة مستر مينا)</span>
                </div>
            </button>
            <button class="grade-tab-btn" data-grade="grade2" id="tab-grade-2">
                <i class="fa-solid fa-atom"></i>
                <div class="tab-label">
                    <span class="main-grade-title">الصف الثاني الإعدادي</span>
                    <span class="sub-grade-term">الترم الأول (كتاب الامتحان ومذكرة مستر مينا)</span>
                </div>
            </button>
        </div>

        <!-- System Controls -->
        <div class="header-controls">
            <div class="sound-toggle-badge" id="toggle-sound" title="صوت مستر مينا">
                <i class="fa-solid fa-volume-high"></i>
                <span id="sound-badge-text">الصوت مفعل</span>
            </div>
            <div class="view-toggle-badge" id="toggle-view-mode" title="تبديل طريقة العرض">
                <i class="fa-solid fa-expand"></i>
                <span id="view-badge-text">الوضع الكامل</span>
            </div>
            <div class="api-toggle-badge" id="test-voice-btn" title="اختبر صوت مستر مينا" style="cursor:pointer;">
                <i class="fa-solid fa-play"></i>
                <span>صوت مستر مينا</span>
            </div>
            <div class="api-toggle-badge" id="toggle-api-settings" title="إعدادات الـ API والذكاء الاصطناعي" style="cursor:pointer;">
                <i class="fa-solid fa-gears"></i>
                <span id="api-badge-text">إعدادات API</span>
            </div>
        </div>
    </header>

    <!-- Main App Container: 3 Columns Grid -->
    <div class="hologram-app-container simple-mode">
        
        <!-- ================= LEFT COLUMN: LABS & EXPERIMENTS ================= -->
        <aside class="hologram-column left-column">
            <div class="column-header">
                <i class="fa-solid fa-microscope text-teal"></i>
                <span id="left-column-title">مختبر العلوم التفاعلي (1ع)</span>
            </div>
            
            <div class="column-scroll-content">
                
                <!-- ================= GRADE 1: LAB 1 (المادة والتركيب الذري) ================= -->
                <div class="grade-content-wrapper active-grade-content" id="grade1-left-content">
                    
                    <section id="g1-atom-section" class="edu-section active-highlight">
                        <div class="section-badge badge-grade1">1ع • الوحدة الأولى</div>
                        <h3 class="section-title"><i class="fa-solid fa-atom text-blue"></i> تركيب الذرة ومستويات الطاقة</h3>
                        <p class="section-subtitle">اضغط على مستويات الطاقة (K-L-M-N) لمعرفة سعتها الإلكترونية والتوزيع الذري.</p>
                        
                        <div class="sun-interactive-vertical">
                            <div class="sun-diagram-box">
                                <div class="sun-wrapper cell-wrapper">
                                    <div class="sun-glowing-effect atom-glow"></div>
                                    <svg class="sun-svg atom-svg" viewBox="0 0 220 220">
                                        <circle cx="110" cy="110" r="100" fill="none" stroke="rgba(0, 255, 210, 0.2)" stroke-width="2" stroke-dasharray="4"></circle>
                                        <circle cx="110" cy="110" r="78" fill="none" stroke="rgba(0, 200, 255, 0.3)" stroke-width="2" stroke-dasharray="4"></circle>
                                        <circle cx="110" cy="110" r="56" fill="none" stroke="rgba(180, 50, 255, 0.4)" stroke-width="2" stroke-dasharray="4"></circle>
                                        <circle cx="110" cy="110" r="36" fill="none" stroke="rgba(255, 180, 0, 0.5)" stroke-width="2" stroke-dasharray="4"></circle>
                                        
                                        <circle cx="110" cy="110" r="22" fill="url(#atomNucleusGrad)" class="cell-nucleus-circle"></circle>
                                        <text x="110" y="114" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">+P / ±N</text>
                                        
                                        <defs>
                                            <radialGradient id="atomNucleusGrad" cx="50%" cy="50%" r="50%">
                                                <stop offset="0%" stop-color="#ff3366" />
                                                <stop offset="60%" stop-color="#990033" />
                                                <stop offset="100%" stop-color="#4d001a" />
                                            </radialGradient>
                                        </defs>
                                    </svg>
                                    <button class="hotspot" style="top: 50%; left: 50%;" data-spot="nucleus" title="النواة الموجبة">
                                        <span class="pulse-ring"></span>
                                        <span class="hotspot-dot">النواة</span>
                                    </button>
                                    <button class="hotspot" style="top: 50%; left: 66%;" data-spot="level-k" title="المستوى K">
                                        <span class="pulse-ring"></span>
                                        <span class="hotspot-dot">K (2)</span>
                                    </button>
                                    <button class="hotspot" style="top: 50%; left: 76%;" data-spot="level-l" title="المستوى L">
                                        <span class="pulse-ring"></span>
                                        <span class="hotspot-dot">L (8)</span>
                                    </button>
                                    <button class="hotspot" style="top: 50%; left: 86%;" data-spot="level-m" title="المستوى M">
                                        <span class="pulse-ring"></span>
                                        <span class="hotspot-dot">M (18)</span>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="sun-details-card glass-panel" id="atom-info-panel">
                                <div class="card-placeholder-text" id="atom-placeholder">
                                    <i class="fa-solid fa-hand-pointer"></i>
                                    <h4>اضغط على النواة أو مستويات الطاقة (K, L, M) لشرح التوزيع الإلكتروني</h4>
                                </div>
                                <div class="card-content hidden" id="atom-spot-content">
                                    <h4 id="atom-spot-title" class="text-neon-yellow">المستوى K</h4>
                                    <p id="atom-spot-text">أقرب المستويات إلى النواة، أقلها طاقة، ويتشبع بـ 2 إلكترون طبقاً للقاعدة (2n²).</p>
                                    <div class="spot-stats">
                                        <div class="stat-item">
                                            <span class="stat-label">القاعدة:</span>
                                            <span class="stat-value" id="atom-spot-rule">2n² = 2 × (1)² = 2e⁻</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="g1-density-section" class="edu-section">
                        <div class="section-badge badge-grade1">1ع • معمل الكثافة</div>
                        <h3 class="section-title"><i class="fa-solid fa-scale-balanced text-teal"></i> الكثافة والطفو والغوص في الماء</h3>
                        <p class="section-subtitle">اختر المادة لمعرفة كثافتها وسلوكها في الماء (كثافة الماء = 1 جم/سم³).</p>
                        
                        <div class="planets-grid-compact">
                            <div class="planet-card-mini glass-panel active-card" data-density="wood">
                                <i class="fa-solid fa-tree text-green"></i>
                                <span>الخشب (0.6)</span>
                            </div>
                            <div class="planet-card-mini glass-panel" data-density="cork">
                                <i class="fa-solid fa-wine-bottle text-yellow"></i>
                                <span>الفلين (0.2)</span>
                            </div>
                            <div class="planet-card-mini glass-panel" data-density="iron">
                                <i class="fa-solid fa-cube text-blue"></i>
                                <span>الحديد (7.8)</span>
                            </div>
                            <div class="planet-card-mini glass-panel" data-density="gold">
                                <i class="fa-solid fa-gem text-purple"></i>
                                <span>الذهب (19.3)</span>
                            </div>
                        </div>

                        <div class="planet-explorer-panel glass-panel">
                            <div class="explorer-header">
                                <h4 id="density-item-name">قطعة الخشب</h4>
                                <p id="density-item-desc">كثافة الخشب (0.6 جم/سم³) أقل من كثافة الماء فتطفو على السطح.</p>
                            </div>
                            <div class="explorer-body-vertical">
                                <div class="progress-bar-group">
                                    <div class="bar-header">
                                        <span>الكثافة (ث = ك ÷ ح)</span>
                                        <span id="density-val">0.6 جم/سم³</span>
                                    </div>
                                    <div class="progress-bar-bg">
                                        <div class="progress-bar-fill fill-neon-green" id="density-bar" style="width: 30%;"></div>
                                    </div>
                                </div>
                                <div class="explorer-facts">
                                    <ul id="density-facts-list">
                                        <li>تطفو المواد الأقل كثافة من الماء (مثل الخشب والفلين والزيت) فوق سطحه.</li>
                                        <li>تغوص المواد الأكبر كثافة من الماء (مثل الحديد والنحاس والرصاص) في القاع.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <!-- ================= GRADE 2: LAB 1 (الجدول الدوري وخواص الماء) ================= -->
                <div class="grade-content-wrapper hidden" id="grade2-left-content">
                    
                    <section id="g2-periodic-section" class="edu-section active-highlight">
                        <div class="section-badge badge-grade2">2ع • الوحدة الأولى</div>
                        <h3 class="section-title"><i class="fa-solid fa-table-cells text-blue"></i> الجدول الدوري والمجموعات الرئيسية</h3>
                        <p class="section-subtitle">اضغط على المجموعة لاستكشاف فلزات الأقلاء (1A)، الهالوجينات (7A)، والغازات الخاملة.</p>
                        
                        <div class="planets-grid-compact">
                            <div class="planet-card-mini glass-panel active-card" data-group="alkali">
                                <div class="planet-sphere-mini alkali-img"></div>
                                <span>الأقلاء 1A</span>
                            </div>
                            <div class="planet-card-mini glass-panel" data-group="halogens">
                                <div class="planet-sphere-mini halogen-img"></div>
                                <span>الهالوجينات 7A</span>
                            </div>
                            <div class="planet-card-mini glass-panel" data-group="noble">
                                <div class="planet-sphere-mini noble-img"></div>
                                <span>الغازات الخاملة</span>
                            </div>
                            <div class="planet-card-mini glass-panel" data-group="water">
                                <div class="planet-sphere-mini water-img"></div>
                                <span>مركب الماء H₂O</span>
                            </div>
                        </div>

                        <div class="planet-explorer-panel glass-panel">
                            <div class="explorer-header">
                                <h4 id="group-explorer-name">فلزات الأقلاء (المجموعة 1A)</h4>
                                <p id="group-explorer-desc">فلزات أحادية التكافؤ، نشطة جداً كيميائياً، وتحفظ تحت سطح الكيروسين.</p>
                            </div>
                            <div class="explorer-body-vertical">
                                <div class="progress-bar-group">
                                    <div class="bar-header">
                                        <span>التكافؤ والنشاط الكيميائي</span>
                                        <span id="group-activity-val">أحادي (+1) - عالي جداً</span>
                                    </div>
                                    <div class="progress-bar-bg">
                                        <div class="progress-bar-fill fill-neon-yellow" id="group-activity-bar" style="width: 90%;"></div>
                                    </div>
                                </div>
                                <div class="explorer-facts">
                                    <ul id="group-facts-list">
                                        <li>تتفاعل مع الماء بشدة ويتصاعد غاز الهيدروجين الذي يشتعل بفرقعة.</li>
                                        <li>يزداد نشاطها الكيميائي بزيادة الحجم الذري، والأنشط هو السيزيوم (Cs).</li>
                                    </ul>
                                </div>
                                <button class="action-btn-compact" id="play-mendeleev-audio-btn" style="margin-top: 10px; background: linear-gradient(135deg, #ffd200, #ff7700); color: #000; font-weight: bold;">
                                    <i class="fa-solid fa-microphone-lines"></i> استمع لشرح مستر مينا بصوته لدرس مندليف وموزلي 🎙️
                                </button>
                            </div>
                        </div>
                    </section>

                    <section id="g2-water-section" class="edu-section">
                        <div class="section-badge badge-grade2">2ع • شذوذ خواص الماء</div>
                        <h3 class="section-title"><i class="fa-solid fa-droplet text-teal"></i> شذوذ الماء والروابط الهيدروجينية</h3>
                        <p class="section-subtitle">الروابط الهيدروجينية بين جزيئات الماء هي سر ارتفاع درجتي غليانه وانصهاره وشذوذ كثافته.</p>
                        
                        <div class="gas-interactive-vertical">
                            <div class="sun-details-card glass-panel" style="padding: 15px;">
                                <h4 class="text-neon-green"><i class="fa-solid fa-snowflake"></i> شذوذ كثافة الماء عند التجمد</h4>
                                <p style="font-size: 0.88rem; line-height: 1.6; margin-top: 8px;">
                                    عند انخفاض درجة حرارة الماء عن <strong>4°م</strong>، تتجمع الجزيئات بروابط هيدروجينية مكونة بلورات ثلج سداسية الشكل كبيرة الحجم بينها فراغات، <strong>فيزداد الحجم وتقل الكثافة</strong> ليطفو الثلج على السطح وتحيا الكائنات المائية في القاع!
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        </aside>

        <!-- ================= CENTER COLUMN: MR. MENA 3D AVATAR & CHAT ================= -->
        <main class="hologram-column center-column">
            
            <div class="character-arena">
                <div class="holo-pedestal">
                    <div class="holo-light"></div>
                    <div class="holo-rings">
                        <div class="ring-r1"></div>
                        <div class="ring-r2"></div>
                    </div>
                </div>

                <div class="astrotutor-character mena-avatar">
                    <div class="robot-head teacher-head mena-head">
                        <div class="mena-hair"></div>
                        <div class="teacher-glasses mena-glasses">
                            <span class="lens"></span>
                            <span class="bridge"></span>
                            <span class="lens"></span>
                        </div>
                        <div class="robot-face mena-face">
                            <div class="robot-eyes mena-eyes">
                                <span class="eye eye-left"></span>
                                <span class="eye eye-right"></span>
                            </div>
                            <div class="mena-beard"></div>
                            <div class="robot-mouth smile"></div>
                        </div>
                        <div class="hologram-crown-badge">Mr. Mena</div>
                    </div>
                    <div class="robot-body teacher-body mena-body">
                        <div class="lab-coat-collar"></div>
                        <div class="robot-screen mena-screen">
                            <div class="sine-wave"></div>
                        </div>
                        <div class="mena-name-tag">أ/ مينا جرجس</div>
                    </div>
                    <div class="robot-hands">
                        <div class="hand hand-left"></div>
                        <div class="hand hand-right"></div>
                    </div>
                    <div class="robot-shadow"></div>
                </div>
            </div>

            <div class="central-chat-area">
                <div class="tutor-chat-bubble glass-panel" id="tutor-bubble">
                    <div class="bubble-header">
                        <span class="tutor-title"><i class="fa-solid fa-chalkboard-user"></i> مستر مينا جرجس (معلم العلوم):</span>
                        <button class="clear-chat-btn" id="clear-chat-btn" title="مسح السجل"><i class="fa-solid fa-rotate-left"></i></button>
                    </div>
                    <div class="bubble-body" id="chat-messages-container">
                        <div id="latest-tutor-message" class="animate-fade-in">
                            <p>أهلاً بيك يا بطل في منصتنا التفاعلية! 🔬🧪</p>
                            <p>أنا <strong>مستر مينا جرجس</strong>، هشرح معاك كل تجارب ودروس العلوم لـ <strong id="welcome-grade-text">الصف الأول الإعدادي</strong> بأسلوبنا الممتع من واقع المذكرات وكتاب الامتحان!</p>
                            <p>اضغط على <strong>زر المايك 🎤 وتحدث بصوتك</strong>، أو اضغط على أي زر لشرح التجارب فوراً.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="guidance-banner-center hidden" id="guidance-banner">
                <i class="fa-solid fa-compass-drafting spinner-icon"></i>
                <span id="guidance-text">يقوم مستر مينا بتوجيه الصفحة وتجهيز الشرح...</span>
            </div>

            <div class="quick-prompts-center" id="g1-prompts">
                <button class="prompt-chip" data-prompt="اشرح لي التركيب الذري ومستويات الطاقة للذرة">⚛️ تركيب الذرة ومستويات الطاقة</button>
                <button class="prompt-chip" data-prompt="اشرح لي تجربة الكثافة وقانون الطفو والغوص">⚖️ تجربة الكثافة والطفو</button>
                <button class="prompt-chip" data-prompt="ما هي تحولات الطاقة في البندول البسيط؟">⚡ تحولات طاقة البندول</button>
                <button class="prompt-chip" data-prompt="اشرح لي التكيف وتنوع الكائنات الحية">🦅 التكيف في الطيور والنباتات</button>
            </div>

            <div class="quick-prompts-center hidden" id="g2-prompts">
                <button class="prompt-chip" data-prompt="اشرح لي تدرج خواص الجدول الدوري وفلزات الأقلاء والهالوجينات">📊 الجدول الدوري والأقلاء</button>
                <button class="prompt-chip" data-prompt="اشرح لي طبقات الغلاف الجوي وأهمية طبقة الأوزون">🌍 طبقات الغلاف الجوي والأوزون</button>
                <button class="prompt-chip" data-prompt="ما هي أنواع الحفريات وشروط تكون حفرية كائن كامل؟">🦖 أنواع الحفريات والانقراض</button>
                <button class="prompt-chip" data-prompt="اشرح لي شذوذ خواص الماء والروابط الهيدروجينية">💧 شذوذ كثافة وخواص الماء</button>
            </div>

            <div class="center-input-console glass-panel">
                <button id="mic-btn" class="mic-btn" title="تحدث بصوتك (تسجيل)">
                    <i class="fa-solid fa-microphone"></i>
                </button>
                <textarea id="chat-input" placeholder="اضغط على المايك وتحدث أو اكتب سؤالك هنا..." rows="1"></textarea>
                <button id="send-btn" class="send-btn">
                    <i class="fa-solid fa-paper-plane"></i>
                </button>
            </div>

        </main>

        <!-- ================= RIGHT COLUMN: PHYSICS, GEOLOGY & QUIZZES ================= -->
        <aside class="hologram-column right-column">
            <div class="column-header">
                <i class="fa-solid fa-flask-vial text-purple"></i>
                <span id="right-column-title">مختبر الفيزياء والكويز (1ع)</span>
            </div>

            <div class="column-scroll-content">
                
                <!-- ================= GRADE 1: RIGHT CONTENT ================= -->
                <div class="grade-content-wrapper active-grade-content" id="grade1-right-content">
                    
                    <section id="g1-energy-section" class="edu-section">
                        <div class="section-badge badge-grade1">1ع • الوحدة الثانية</div>
                        <h3 class="section-title"><i class="fa-solid fa-bolt text-yellow"></i> تحولات الطاقة والبندول البسيط</h3>
                        <p class="section-subtitle">تبادل طاقتي الوضع والحركة (الطاقة الميكانيكية = طاقة الوضع + طاقة الحركة = مقدار ثابت).</p>
                        
                        <div class="gas-interactive-vertical">
                            <div class="orbit-simulation-box glass-panel">
                                <div class="pendulum-container" id="pendulum-box">
                                    <div class="pendulum-string" id="pendulum-rod">
                                        <div class="pendulum-bob"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="gas-details-panel glass-panel">
                                <div class="states-buttons">
                                    <button class="energy-btn active-state" data-pendulum="highest">أعلى نقطة (وضع قصوى)</button>
                                    <button class="energy-btn" data-pendulum="middle">موضع السكون (سرعة قصوى)</button>
                                </div>
                                <h4 id="energy-state-title" style="margin-top:12px;">عند أقصى إزاحة</h4>
                                <p id="energy-state-desc">تكون طاقة الوضع مساوية للطاقة الميكانيكية وطاقة الحركة تساوي صفر لأن السرعة تصبح صفراً.</p>
                            </div>
                        </div>
                    </section>

                    <section id="g1-quiz-section" class="edu-section">
                        <div class="section-badge badge-grade1">1ع • بنك أسئلة مستر مينا</div>
                        <h3 class="section-title"><i class="fa-solid fa-trophy text-teal"></i> كويز علوم 1ع الشامل</h3>
                        <p class="section-subtitle">أسئلة وتدريبات تفاعلية من مذكرة مستر مينا وامتحانات كتاب الامتحان 1ع.</p>
                        
                        <div class="quiz-container-compact glass-panel">
                            <div id="g1-quiz-intro">
                                <h4>تحدي أوائل الطلبة للصف الأول الإعدادي 🚀</h4>
                                <button class="action-btn-compact" id="g1-start-quiz-btn">ابدأ كويز 1ع 📝</button>
                            </div>

                            <div id="g1-quiz-play" class="hidden">
                                <div class="quiz-progress-bar">
                                    <div class="quiz-progress-fill" id="g1-quiz-progress" style="width: 0%;"></div>
                                </div>
                                <div class="question-header">
                                    <span class="question-number" id="g1-q-num">السؤال 1 من 4</span>
                                    <h4 id="g1-q-text">السؤال يظهر هنا...</h4>
                                </div>
                                <div class="answers-grid-vertical" id="g1-answers-grid"></div>
                            </div>

                            <div id="g1-quiz-result" class="hidden">
                                <i class="fa-solid fa-trophy trophy-icon-mini"></i>
                                <h4 id="g1-res-title">رائع جداً!</h4>
                                <p id="g1-res-text">لقد حصلت على الدرجة النهائية.</p>
                                <div class="result-actions-vertical">
                                    <button class="action-btn-compact btn-secondary" id="g1-restart-btn">إعادة الاختبار <i class="fa-solid fa-rotate-right"></i></button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <!-- ================= GRADE 2: RIGHT CONTENT ================= -->
                <div class="grade-content-wrapper hidden" id="grade2-right-content">
                    
                    <section id="g2-atmosphere-section" class="edu-section">
                        <div class="section-badge badge-grade2">2ع • الوحدة الثانية</div>
                        <h3 class="section-title"><i class="fa-solid fa-cloud-sun text-yellow"></i> طبقات الغلاف الجوي والأوزون</h3>
                        <p class="section-subtitle">اضغط على الطبقة لمعرفة خصائصها ودرجة حرارتها والضغط الجوي بها.</p>
                        
                        <div class="planets-grid-compact">
                            <div class="planet-card-mini glass-panel active-card" data-layer="troposphere">
                                <i class="fa-solid fa-cloud-rain text-blue"></i>
                                <span>التروبوسفير</span>
                            </div>
                            <div class="planet-card-mini glass-panel" data-layer="stratosphere">
                                <i class="fa-solid fa-plane text-teal"></i>
                                <span>الستراتوسفير (الأوزون)</span>
                            </div>
                            <div class="planet-card-mini glass-panel" data-layer="mesosphere">
                                <i class="fa-solid fa-meteor text-purple"></i>
                                <span>الميزوسفير (الشهب)</span>
                            </div>
                            <div class="planet-card-mini glass-panel" data-layer="thermosphere">
                                <i class="fa-solid fa-satellite text-yellow"></i>
                                <span>الثرموسفير (الحرارية)</span>
                            </div>
                        </div>

                        <div class="planet-explorer-panel glass-panel">
                            <div class="explorer-header">
                                <h4 id="layer-name">طبقة التروبوسفير (طبقة الطقس)</h4>
                                <p id="layer-desc">تمتد حتى 13 كم، تحدث بها كافة الظواهر الجوية وتحتوي على 75% من كتلة الهواء و99% من بخار الماء.</p>
                            </div>
                            <div class="explorer-body-vertical">
                                <div class="progress-bar-group">
                                    <div class="bar-header">
                                        <span>درجة الحرارة عند القمة</span>
                                        <span id="layer-temp-val">-60°م</span>
                                    </div>
                                    <div class="progress-bar-bg">
                                        <div class="progress-bar-fill fill-neon-blue" id="layer-temp-bar" style="width: 25%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="g2-quiz-section" class="edu-section">
                        <div class="section-badge badge-grade2">2ع • بنك أسئلة مستر مينا</div>
                        <h3 class="section-title"><i class="fa-solid fa-trophy text-teal"></i> كويز علوم 2ع الشامل</h3>
                        <p class="section-subtitle">أسئلة وتدريبات تفاعلية من مذكرة مستر مينا وامتحانات كتاب الامتحان 2ع.</p>
                        
                        <div class="quiz-container-compact glass-panel">
                            <div id="g2-quiz-intro">
                                <h4>تحدي أوائل الطلبة للصف الثاني الإعدادي 🚀</h4>
                                <button class="action-btn-compact" id="g2-start-quiz-btn">ابدأ كويز 2ع 📝</button>
                            </div>

                            <div id="g2-quiz-play" class="hidden">
                                <div class="quiz-progress-bar">
                                    <div class="quiz-progress-fill" id="g2-quiz-progress" style="width: 0%;"></div>
                                </div>
                                <div class="question-header">
                                    <span class="question-number" id="g2-q-num">السؤال 1 من 4</span>
                                    <h4 id="g2-q-text">السؤال يظهر هنا...</h4>
                                </div>
                                <div class="answers-grid-vertical" id="g2-answers-grid"></div>
                            </div>

                            <div id="g2-quiz-result" class="hidden">
                                <i class="fa-solid fa-trophy trophy-icon-mini"></i>
                                <h4 id="g2-res-title">رائع جداً!</h4>
                                <p id="g2-res-text">لقد حصلت على الدرجة النهائية.</p>
                                <div class="result-actions-vertical">
                                    <button class="action-btn-compact btn-secondary" id="g2-restart-btn">إعادة الاختبار <i class="fa-solid fa-rotate-right"></i></button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        </aside>

    </div>

    <div class="toast hidden" id="toast">
        <i class="fa-solid fa-info-circle toast-icon"></i>
        <span class="toast-message" id="toast-message">رسالة التنبيه</span>
    </div>

    <div class="modal-overlay hidden" id="api-settings-modal">
        <div class="modal-card glass-panel">
            <div class="modal-header">
                <h3><i class="fa-solid fa-gears text-teal"></i> إعدادات الذكاء الاصطناعي والصوت المخصص</h3>
                <button class="close-modal-btn" id="close-api-modal"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="gemini-api-key-input"><i class="fa-solid fa-key text-teal"></i> مفتاح Gemini API (للإجابة الذكية من المذكرات):</label>
                    <input type="password" id="gemini-api-key-input" placeholder="ألصق مفتاح Gemini AI API..." class="modal-input">
                    <span class="input-hint">يستخدم للإجابة المباشرة على أسئلة الطلاب بأسلوب مستر مينا جرجس.</span>
                </div>
                <div class="form-group" style="margin-top: 15px;">
                    <label for="elevenlabs-api-key-input"><i class="fa-solid fa-microphone text-teal"></i> مفتاح ElevenLabs API Key (لاستنساخ صوت أستاذ مينا):</label>
                    <input type="password" id="elevenlabs-api-key-input" placeholder="ألصق مفتاح ElevenLabs API..." class="modal-input">
                    <span class="input-hint">يقوم بربط الصوت المستنسخ الحقيقي لأستاذ مينا من ملف التسجيل الصوتي.</span>
                </div>
                <div class="form-group" style="margin-top: 15px;">
                    <label for="elevenlabs-voice-id-input"><i class="fa-solid fa-id-badge text-teal"></i> معرف الصوت Voice ID لمستر مينا:</label>
                    <input type="text" id="elevenlabs-voice-id-input" placeholder="Voice ID المستنسخ" value="" class="modal-input">
                </div>
            </div>
            <div class="modal-footer" style="margin-top: 20px; display: flex; justify-content: flex-end;">
                <button class="action-btn-compact" id="save-api-keys-btn">حفظ الإعدادات 💾</button>
            </div>
        </div>
    </div>

    <script src="ai-engine.js?v=40"></script>
    <script src="app.js?v=40"></script>
</body>
</html>"""
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("index.html generated successfully!")

def build_ai_engine_js():
    js = """/* -------------------------------------------------------------
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
        const navRegex = /\\[NAV:([^\\]]+)\\]/;
        const match = rawText.match(navRegex);
        const cleanedText = rawText.replace(navRegex, '').trim();
        return {
            text: cleanedText,
            nav: match && match[1] ? match[1] : null
        };
    }
}
"""
    with open('ai-engine.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("ai-engine.js generated successfully!")

def build_app_js():
    js = """/* -------------------------------------------------------------
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
            .replace(/\\[NAV:[^\\]]+\\]/g, '')
            .replace(/\\*\\*([^*]+)\\*\\*/g, '$1')
            .replace(/[*_#`~]/g, '')
            .replace(/[\\u{1F600}-\\u{1F64F}\\u{1F300}-\\u{1F5FF}\\u{1F680}-\\u{1F6FF}\\u{2600}-\\u{26FF}\\u{2700}-\\u{27BF}]/gu, '')
            .replace(/\\s+/g, ' ')
            .trim();

        const sentences = clean.split(/[.!؟\\n]+/);
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

    const playMendeleevBtn = document.getElementById('play-mendeleev-audio-btn');
    if (playMendeleevBtn) {
        playMendeleevBtn.addEventListener('click', () => {
            const avatarChar = document.querySelector('.mena-avatar') || document.querySelector('.astrotutor-character');
            showToast("🎙️ يتم الآن تشغيل التسجيل الصوتي الحقيقي لمستر مينا جرجس...");
            const audioPlayer = document.getElementById('tutor-audio-player');
            if (avatarChar) avatarChar.classList.add('is-speaking');
            if (audioPlayer) {
                audioPlayer.src = 'assets/mr_mena_sample.ogg';
                audioPlayer.onended = audioPlayer.onerror = () => {
                    if (avatarChar) avatarChar.classList.remove('is-speaking');
                };
                audioPlayer.play().catch(e => {
                    if (avatarChar) avatarChar.classList.remove('is-speaking');
                });
            }
        });
    }

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
"""
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("app.js generated successfully!")

def build_style_css():
    css = """/* -------------------------------------------------------------
   Science Platform Stylesheet - Mr. Mena Gerges (Mena Science 3D)
   Grade 1 & Grade 2 Interactive Hologram Design
   ------------------------------------------------------------- */

:root {
    --bg-dark: #050b14;
    --bg-card: rgba(13, 27, 42, 0.75);
    --bg-glass: rgba(18, 38, 58, 0.65);
    --border-glass: rgba(0, 242, 254, 0.25);
    --neon-blue: #00f2fe;
    --neon-cyan: #4facfe;
    --neon-purple: #b026ff;
    --neon-green: #00ffd2;
    --neon-yellow: #ffd200;
    --text-main: #e2e8f0;
    --text-muted: #94a3b8;
    --grade1-color: #00ffd2;
    --grade2-color: #ffd200;
    --font-primary: 'Cairo', 'Tajawal', sans-serif;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: var(--font-primary);
}

body {
    background-color: var(--bg-dark);
    color: var(--text-main);
    overflow-x: hidden;
    min-height: 100vh;
    direction: rtl;
}

/* Background Atmosphere */
.space-bg {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background: radial-gradient(circle at 50% 30%, #0a1c2e 0%, #03070d 100%);
    z-index: -1;
}

.stars, .twinkling, .nebula {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none;
}

.nebula {
    background: radial-gradient(circle at 80% 20%, rgba(79, 172, 254, 0.12), transparent 45%),
                radial-gradient(circle at 20% 80%, rgba(176, 38, 255, 0.12), transparent 45%);
}

/* Glassmorphism Panel */
.glass-panel {
    background: var(--bg-glass);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid var(--border-glass);
    border-radius: 16px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.45);
}

/* Top Platform Header */
.main-platform-header {
    margin: 12px 20px;
    padding: 12px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
}

.header-branding {
    display: flex;
    align-items: center;
    gap: 14px;
}

.teacher-mini-badge {
    position: relative;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid var(--neon-cyan);
    overflow: hidden;
    box-shadow: 0 0 14px rgba(0, 242, 254, 0.5);
}

.teacher-avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.teacher-status-pulse {
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 10px;
    height: 10px;
    background: var(--neon-green);
    border-radius: 50%;
    border: 2px solid #000;
    box-shadow: 0 0 8px var(--neon-green);
}

.brand-titles h1 {
    font-size: 1.15rem;
    font-weight: 800;
    color: #fff;
}

.brand-titles h1 span {
    color: var(--neon-cyan);
    font-size: 0.85rem;
    background: rgba(0, 242, 254, 0.15);
    padding: 2px 8px;
    border-radius: 8px;
    margin-right: 6px;
}

.brand-titles p {
    font-size: 0.78rem;
    color: var(--text-muted);
}

/* Grade Selector Segmented Navigation */
.grade-selector-nav {
    display: flex;
    gap: 10px;
    background: rgba(0, 0, 0, 0.35);
    padding: 5px;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.08);
}

.grade-tab-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    background: transparent;
    border: 1px solid transparent;
    color: var(--text-muted);
    padding: 8px 18px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: right;
}

.grade-tab-btn i {
    font-size: 1.3rem;
}

.grade-tab-btn .main-grade-title {
    display: block;
    font-size: 0.95rem;
    font-weight: 700;
    color: inherit;
}

.grade-tab-btn .sub-grade-term {
    display: block;
    font-size: 0.72rem;
    opacity: 0.8;
}

.grade-tab-btn:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.05);
}

.grade-tab-btn.active-grade[data-grade="grade1"] {
    background: linear-gradient(135deg, rgba(0, 255, 210, 0.25), rgba(79, 172, 254, 0.3));
    border-color: var(--grade1-color);
    color: #fff;
    box-shadow: 0 0 16px rgba(0, 255, 210, 0.35);
}

.grade-tab-btn.active-grade[data-grade="grade2"] {
    background: linear-gradient(135deg, rgba(255, 210, 0, 0.25), rgba(255, 120, 0, 0.3));
    border-color: var(--grade2-color);
    color: #fff;
    box-shadow: 0 0 16px rgba(255, 210, 0, 0.35);
}

/* Header Controls */
.header-controls {
    display: flex;
    align-items: center;
    gap: 10px;
}

.sound-toggle-badge, .view-toggle-badge, .api-toggle-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(0, 242, 254, 0.1);
    border: 1px solid var(--border-glass);
    padding: 6px 12px;
    border-radius: 10px;
    font-size: 0.82rem;
    cursor: pointer;
    transition: all 0.25s ease;
    color: var(--text-main);
}

.sound-toggle-badge:hover, .view-toggle-badge:hover, .api-toggle-badge:hover {
    background: rgba(0, 242, 254, 0.25);
    color: #fff;
    box-shadow: 0 0 12px rgba(0, 242, 254, 0.3);
}

.sound-toggle-badge.muted-mode {
    background: rgba(255, 75, 75, 0.15);
    border-color: rgba(255, 75, 75, 0.35);
    color: #ff7b7b;
}

/* Main Grid Layout */
.hologram-app-container {
    display: grid;
    grid-template-columns: 360px 1fr 360px;
    gap: 20px;
    padding: 10px 20px 20px;
    min-height: calc(100vh - 110px);
}

.hologram-app-container.simple-mode {
    grid-template-columns: 340px 1fr 340px;
}

.hologram-column {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.column-header {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1rem;
    font-weight: 700;
    padding: 8px 12px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 12px;
}

.column-scroll-content {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-right: 4px;
}

/* Edu Section Card */
.edu-section {
    background: var(--bg-card);
    border: 1px solid var(--border-glass);
    border-radius: 14px;
    padding: 16px;
    transition: all 0.3s ease;
}

.edu-section.active-highlight {
    border-color: var(--neon-cyan);
    box-shadow: 0 0 18px rgba(0, 242, 254, 0.2);
}

.section-badge {
    display: inline-block;
    padding: 2px 10px;
    border-radius: 8px;
    font-size: 0.72rem;
    font-weight: 700;
    margin-bottom: 8px;
}

.badge-grade1 {
    background: rgba(0, 255, 210, 0.15);
    color: var(--grade1-color);
    border: 1px solid rgba(0, 255, 210, 0.3);
}

.badge-grade2 {
    background: rgba(255, 210, 0, 0.15);
    color: var(--grade2-color);
    border: 1px solid rgba(255, 210, 0, 0.3);
}

.section-title {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 4px;
    color: #fff;
}

.section-subtitle {
    font-size: 0.78rem;
    color: var(--text-muted);
    line-height: 1.4;
    margin-bottom: 14px;
}

/* Character & Hologram Arena */
.character-arena {
    position: relative;
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
}

.holo-pedestal {
    position: absolute;
    bottom: 5px;
    width: 140px;
    height: 30px;
}

.holo-light {
    position: absolute;
    bottom: 0; left: 50%;
    transform: translateX(-50%);
    width: 160px;
    height: 80px;
    background: radial-gradient(ellipse at bottom, rgba(0, 242, 254, 0.4), transparent 70%);
    border-radius: 50%;
}

.holo-rings .ring-r1, .holo-rings .ring-r2 {
    position: absolute;
    bottom: 0; left: 50%;
    transform: translateX(-50%);
    border: 1px solid var(--neon-cyan);
    border-radius: 50%;
    animation: rotateHolo 8s linear infinite;
}

.ring-r1 { width: 130px; height: 24px; opacity: 0.6; }
.ring-r2 { width: 90px; height: 16px; opacity: 0.8; animation-direction: reverse; }

@keyframes rotateHolo {
    from { transform: translateX(-50%) rotate(0deg); }
    to { transform: translateX(-50%) rotate(360deg); }
}

/* Mr. Mena 3D Avatar */
.astrotutor-character {
    position: relative;
    width: 100px;
    height: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: floatTeacher 4s ease-in-out infinite;
}

@keyframes floatTeacher {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
}

.mena-head {
    position: relative;
    width: 60px;
    height: 60px;
    background: #e2c09c;
    border-radius: 50%;
    border: 2px solid var(--neon-cyan);
    box-shadow: 0 0 16px rgba(0, 242, 254, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
}

.mena-hair {
    position: absolute;
    top: -4px;
    width: 58px;
    height: 22px;
    background: #1a1a1a;
    border-radius: 20px 20px 0 0;
}

.mena-glasses {
    position: absolute;
    top: 22px;
    display: flex;
    align-items: center;
    gap: 4px;
    z-index: 5;
}

.mena-glasses .lens {
    width: 16px;
    height: 12px;
    border: 2px solid #111;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.2);
}

.mena-glasses .bridge {
    width: 6px;
    height: 2px;
    background: #111;
}

.mena-eyes {
    position: absolute;
    top: 25px;
    display: flex;
    gap: 14px;
}

.mena-eyes .eye {
    width: 5px;
    height: 5px;
    background: #000;
    border-radius: 50%;
    animation: blinkEye 4s infinite;
}

@keyframes blinkEye {
    0%, 96%, 100% { transform: scaleY(1); }
    98% { transform: scaleY(0.1); }
}

.mena-beard {
    position: absolute;
    bottom: 2px;
    width: 36px;
    height: 16px;
    background: #1a1a1a;
    border-radius: 0 0 16px 16px;
    z-index: 2;
}

.robot-mouth {
    position: absolute;
    bottom: 8px;
    width: 14px;
    height: 4px;
    background: #fff;
    border-radius: 0 0 8px 8px;
    z-index: 4;
}

.is-speaking .robot-mouth {
    animation: talkMouth 0.25s infinite alternate;
}

@keyframes talkMouth {
    from { height: 4px; }
    to { height: 10px; }
}

.hologram-crown-badge {
    position: absolute;
    top: -24px;
    background: rgba(0, 242, 254, 0.2);
    border: 1px solid var(--neon-cyan);
    padding: 1px 8px;
    border-radius: 10px;
    font-size: 0.65rem;
    font-weight: 700;
    color: var(--neon-cyan);
}

.mena-body {
    position: relative;
    width: 70px;
    height: 55px;
    background: #ffffff;
    border-radius: 12px;
    border: 2px solid var(--neon-cyan);
    margin-top: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 6px;
}

.lab-coat-collar {
    width: 24px;
    height: 14px;
    border-bottom: 2px solid #00f2fe;
    border-left: 2px solid #00f2fe;
    border-right: 2px solid #00f2fe;
    margin-bottom: 4px;
}

.mena-name-tag {
    font-size: 0.65rem;
    font-weight: 800;
    color: #03070d;
    background: #00ffd2;
    padding: 1px 6px;
    border-radius: 4px;
}

/* Chat Bubbles */
.central-chat-area {
    margin-bottom: 12px;
}

.tutor-chat-bubble {
    padding: 16px;
}

.bubble-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-weight: 700;
    color: var(--neon-green);
}

.clear-chat-btn {
    background: transparent;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    font-size: 0.9rem;
}

.clear-chat-btn:hover { color: #fff; }

.bubble-body {
    max-height: 200px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 0.88rem;
    line-height: 1.6;
}

.user-message {
    align-self: flex-start;
    background: rgba(0, 242, 254, 0.15);
    border: 1px solid rgba(0, 242, 254, 0.3);
    padding: 8px 14px;
    border-radius: 14px 14px 4px 14px;
    color: #fff;
}

.tutor-response {
    align-self: flex-end;
    background: rgba(0, 255, 210, 0.1);
    border: 1px solid rgba(0, 255, 210, 0.25);
    padding: 10px 14px;
    border-radius: 14px 14px 14px 4px;
}

/* Quick Prompts */
.quick-prompts-center {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 14px;
}

.prompt-chip {
    background: rgba(13, 27, 42, 0.7);
    border: 1px solid rgba(0, 242, 254, 0.3);
    color: var(--text-main);
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.78rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.prompt-chip:hover {
    background: var(--neon-blue);
    color: #000;
    box-shadow: 0 0 12px rgba(0, 242, 254, 0.5);
}

/* Center Input Console */
.center-input-console {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 14px;
}

.center-input-console textarea {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #fff;
    resize: none;
    font-size: 0.9rem;
}

.mic-btn, .send-btn {
    background: rgba(0, 242, 254, 0.2);
    border: 1px solid var(--border-glass);
    color: #fff;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease;
}

.mic-btn:hover, .send-btn:hover {
    background: var(--neon-cyan);
    color: #000;
}

.mic-btn.recording-active {
    background: #ff3366;
    animation: pulseMic 1s infinite alternate;
}

@keyframes pulseMic {
    from { box-shadow: 0 0 4px #ff3366; }
    to { box-shadow: 0 0 16px #ff3366; }
}

/* Mini Cards & Interactive Orbit */
.planets-grid-compact {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-bottom: 12px;
}

.planet-card-mini {
    padding: 10px;
    text-align: center;
    cursor: pointer;
    font-size: 0.8rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    transition: all 0.2s;
}

.planet-card-mini:hover, .planet-card-mini.active-card {
    border-color: var(--neon-cyan);
    background: rgba(0, 242, 254, 0.15);
    box-shadow: 0 0 12px rgba(0, 242, 254, 0.3);
}

.progress-bar-group { margin-bottom: 8px; }
.bar-header { display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 4px; }
.progress-bar-bg { height: 6px; background: rgba(0,0,0,0.4); border-radius: 4px; overflow: hidden; }
.progress-bar-fill { height: 100%; border-radius: 4px; }
.fill-neon-blue { background: var(--neon-blue); }
.fill-neon-green { background: var(--neon-green); }
.fill-neon-yellow { background: var(--neon-yellow); }

.explorer-facts { font-size: 0.78rem; line-height: 1.5; color: var(--text-muted); margin-top: 8px; padding-right: 14px; }

/* Pendulum Simulation */
.pendulum-container {
    height: 90px;
    position: relative;
    display: flex;
    justify-content: center;
}

.pendulum-string {
    width: 2px;
    height: 70px;
    background: var(--neon-yellow);
    transform-origin: top center;
    animation: swingPendulum 2s ease-in-out infinite alternate;
}

.pendulum-bob {
    position: absolute;
    bottom: -10px;
    left: -9px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, #ffd200, #ff6600);
    box-shadow: 0 0 10px #ffd200;
}

@keyframes swingPendulum {
    0% { transform: rotate(35deg); }
    100% { transform: rotate(-35deg); }
}

/* Quiz Styles */
.action-btn-compact {
    background: linear-gradient(135deg, var(--neon-cyan), var(--neon-blue));
    color: #000;
    border: none;
    padding: 10px 18px;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    width: 100%;
    margin-top: 8px;
    font-size: 0.88rem;
}

.answers-grid-vertical {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 10px;
}

.answer-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #fff;
    padding: 8px 12px;
    border-radius: 8px;
    text-align: right;
    cursor: pointer;
    font-size: 0.85rem;
    transition: all 0.2s;
}

.answer-btn:hover { background: rgba(0, 242, 254, 0.15); border-color: var(--neon-cyan); }
.answer-btn.correct { background: rgba(0, 255, 210, 0.3) !important; border-color: #00ffd2 !important; }
.answer-btn.incorrect { background: rgba(255, 51, 102, 0.3) !important; border-color: #ff3366 !important; }

/* Helpers */
.hidden { display: none !important; }
.text-neon-yellow { color: var(--neon-yellow); }
.text-neon-green { color: var(--neon-green); }
.text-blue { color: var(--neon-blue); }
.text-teal { color: var(--neon-green); }
.text-purple { color: var(--neon-purple); }

/* Hotspots on SVG */
.cell-wrapper { position: relative; width: 220px; height: 220px; margin: 0 auto; }
.hotspot {
    position: absolute;
    width: 28px;
    height: 28px;
    transform: translate(-50%, -50%);
    background: rgba(0, 242, 254, 0.25);
    border: 1px solid var(--neon-cyan);
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.65rem;
    font-weight: 800;
    color: #fff;
}

.hotspot.active-spot {
    background: var(--neon-yellow);
    color: #000;
    box-shadow: 0 0 14px var(--neon-yellow);
}

.pulse-ring {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid var(--neon-cyan);
    animation: pulseRing 1.8s infinite;
}

@keyframes pulseRing {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(1.8); opacity: 0; }
}

/* Toast */
.toast {
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: rgba(3, 10, 20, 0.9);
    border: 1px solid var(--neon-cyan);
    padding: 12px 20px;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(0, 242, 254, 0.4);
    z-index: 999;
}

/* Modal */
.modal-overlay {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-card {
    width: 90%;
    max-width: 480px;
    padding: 24px;
}

.modal-input {
    width: 100%;
    padding: 10px;
    margin-top: 6px;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid var(--border-glass);
    border-radius: 8px;
    color: #fff;
}

.input-hint { font-size: 0.75rem; color: var(--text-muted); margin-top: 4px; display: block; }
"""
    with open('style.css', 'w', encoding='utf-8') as f:
        f.write(css)
    print("style.css generated successfully!")

if __name__ == '__main__':
    build_index_html()
    build_ai_engine_js()
    build_app_js()
    build_style_css()
