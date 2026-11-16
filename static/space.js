/* ==========================================================================
   Albert Muratbaev — cosmic portfolio runtime
   - Full EN / RU localization (localStorage: "albert.lang")
   - Canvas starfield, pointer parallax, scroll reveals, nav state
   - Adaptive: respects prefers-reduced-motion, save-data, low-core devices
   ========================================================================== */
(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     Dictionary. Keys are referenced from HTML via:
       data-i18n="key"            -> textContent
       data-i18n-html="key"       -> innerHTML (trusted static strings only)
       data-i18n-attr="title:key" -> attribute value
       data-i18n-aria="key"       -> aria-label
     ---------------------------------------------------------------------- */
  var DICT = {
    en: {
      "meta.home.title": "Albert Muratbaev — Full-stack & Mobile Developer",
      "meta.home.desc": "Full-stack and mobile developer turning complex product flows into clear, reliable systems with Python, Django, FastAPI, React Native, and Flutter.",
      "meta.projects.title": "Projects — Albert Muratbaev",
      "meta.projects.desc": "Featured projects by Albert Muratbaev — full-stack and mobile systems built with Django, FastAPI, React Native, and Flutter.",

      "nav.home": "Home",
      "nav.about": "About",
      "nav.projects": "Projects",
      "nav.skills": "Skills",
      "nav.journey": "Journey",
      "nav.contact": "Contact",
      "nav.cta": "Let's talk",
      "nav.menu": "Open menu",
      "nav.close": "Close menu",
      "nav.lang": "Language",

      "hero.badge": "Full-stack & Mobile Developer",
      "hero.hello": "Hey, I'm Albert",
      "hero.titleHtml": "I enjoy <span class=\"grad-text glow\">building</span> and <span class=\"grad-text glow\">shipping</span> for the web &amp; mobile.",
      "hero.lead": "Full-stack & mobile developer turning complex product flows into clear, reliable systems — REST APIs, cross-platform apps, realtime communication, and geospatial features.",
      "hero.ctaWork": "Explore projects",
      "hero.ctaContact": "Get in touch",
      "hero.location": "Tashkent, Uzbekistan",
      "hero.focus": "Open to thoughtful work",
      "hero.scroll": "Scroll to explore",
      "hero.cardOne": "Django · FastAPI",
      "hero.cardTwo": "React Native · Flutter",
      "hero.imageAlt": "Stylized planet with an orbiting ring",

      "stats.tests": "Backend tests",
      "stats.mobile": "Mobile tests",
      "stats.systems": "Flagship systems",

      "about.eyebrow": "About",
      "about.titleHtml": "Clear systems, <span class=\"grad-text\">shipped end to end</span>.",
      "about.lead": "I turn complex product flows into clear, reliable systems — from API contracts and authorization rules to mobile clients and realtime tracking.",
      "about.body1": "Software Engineer with expertise in Python backends (Django, FastAPI), cross-platform mobile development (Flutter, React Native), and modern web interfaces (React, TypeScript). Experienced in building end-to-end production-like architectures, REST APIs, real-time tracking (PostGIS, WebSockets, Redis), self-hosted infrastructure (Coolify, Docker, n8n, Supabase), and comprehensive technical documentation. Strong focus on API contracts, security (IDOR/BOLA prevention), automated testing, and developer experience.",
      "about.body2": "My main focus is secure authorization, explicit domain rules, geospatial features, resilient client behavior, and automated testing. I debug from a reproducible symptom to the root cause, then protect the result with tests.",
      "about.quote": "Honest scope: locally verified production-like systems — not claimed live production traffic.",
      "about.profile": "Profile",
      "about.profileSub": "Developer card",
      "about.location": "Location",
      "about.education": "Education",
      "about.focus": "Focus",
      "about.stack": "Core stack",
      "about.locationValue": "Tashkent, Uzbekistan",
      "about.educationValue": "BSc Software Engineering, Turin Polytechnic University in Tashkent — expected 07/2028",
      "about.focusValue": "Secure authorization · Domain rules · Geospatial features · Resilient clients",
      "about.stackValue": "Python · Django · FastAPI · React Native · Flutter · TypeScript",

      "hl.eyebrow": "Principles",
      "hl.title": "How I work.",
      "hl.lead": "Five principles that shape every backend, mobile app, and dashboard I touch.",
      "hl.1t": "Server-owned access",
      "hl.1x": "Identity and authorization are enforced at both role and resource level.",
      "hl.2t": "Explicit contracts",
      "hl.2x": "API contracts, state machines, domain invariants, and database constraints.",
      "hl.3t": "Predictable failure",
      "hl.3x": "Network errors, retries, pagination, and realtime reconnects handled on purpose.",
      "hl.4t": "Root-cause debugging",
      "hl.4x": "From a reproducible symptom to the root cause — then protected with regression tests.",
      "hl.5t": "Honest scope",
      "hl.5x": "Locally verified production-like systems, not claimed live production traffic.",

      "projects.eyebrow": "Selected work",
      "projects.title": "Systems built end to end.",
      "projects.lead": "Two production-like platforms, verified locally with automated tests — from API contracts and authorization to mobile clients and realtime tracking.",
      "projects.p1title": "Real Estate Marketplace MVP",
      "projects.p1kind": "Marketplace · Geospatial",
      "projects.p1text": "Production-like marketplace with a Django/PostGIS backend and an Expo React Native client: OTP auth with JWT rotation, IDOR/BOLA protection, bounding-box search, and presigned uploads. Verified by 153 backend and 11 mobile tests.",
      "projects.p2title": "Last-mile Delivery Platform",
      "projects.p2kind": "Logistics · Realtime",
      "projects.p2text": "Full-stack delivery workflow with Flutter apps, a FastAPI backend, and a React dispatcher dashboard: order state machine, authorized WebSocket GPS tracking, Redis Pub/Sub, server-side ETA, and PostGIS queries.",
      "projects.moreTitle": "More on GitHub",
      "projects.moreText": "Explore the full collection of repositories — tooling, experiments, and production-like systems.",
      "projects.moreLink": "Open GitHub",
      "projects.open": "View on GitHub",
      "projects.viewAll": "View all projects",

      "skills.eyebrow": "Toolbelt",
      "skills.title": "The stack behind the systems.",
      "skills.lead": "Languages, frameworks, infrastructure, and quality tooling I use to ship reliable products.",
      "skills.g1": "Languages",
      "skills.g2": "Backend & API",
      "skills.g3": "Mobile & Web",
      "skills.g4": "Infrastructure",
      "skills.g5": "Automation & Quality",
      "skills.tip.python": "Primary language",
      "skills.tip.typescript": "Core stack",
      "skills.tip.javascript": "Frontend & scripts",
      "skills.tip.dart": "Flutter apps",
      "skills.tip.html": "Markup",
      "skills.tip.css": "Styling",
      "skills.tip.django": "Primary framework",
      "skills.tip.fastapi": "Async APIs",
      "skills.tip.celery": "Background jobs",
      "skills.tip.redis": "Cache & Pub/Sub",
      "skills.tip.postgresql": "PostGIS, geo queries",
      "skills.tip.sqlite": "Local databases",
      "skills.tip.reactnative": "Cross-platform apps",
      "skills.tip.expo": "Mobile build & routing",
      "skills.tip.flutter": "BLoC, Clean Architecture",
      "skills.tip.react": "Dashboards",
      "skills.tip.vite": "Frontend tooling",
      "skills.tip.tailwind": "Utility styling",
      "skills.tip.docker": "Containers & Compose",
      "skills.tip.linux": "Ubuntu, SSH",
      "skills.tip.github": "Git hosting & wikis",
      "skills.tip.actions": "CI/CD pipelines",
      "skills.tip.supabase": "BaaS & Postgres",
      "skills.tip.minio": "S3-compatible storage",
      "skills.tip.n8n": "Workflow automation",
      "skills.tip.coolify": "Self-hosted PaaS",
      "skills.tip.pytest": "153+ tests across projects",
      "skills.tip.vitest": "Frontend tests",
      "skills.tip.markdown": "Docs & wikis",
      "skills.tip.bash": "Scripts & deploys",

      "journey.eyebrow": "Career & journey",
      "journey.title": "Albert Muratbaev — CV",
      "journey.lead": "Full-Stack & Mobile Software Engineer · Tashkent, Uzbekistan · BSc Software Engineering, Turin Polytechnic University in Tashkent (expected 07/2028)",
      "journey.summary": "Professional summary",
      "journey.summaryText": "Software Engineer with expertise in Python backends (Django, FastAPI), cross-platform mobile development (Flutter, React Native), and modern web interfaces (React, TypeScript). Experienced in building end-to-end production-like architectures, REST APIs, real-time tracking (PostGIS, WebSockets, Redis), self-hosted infrastructure (Coolify, Docker, n8n, Supabase), and comprehensive technical documentation. Strong focus on API contracts, security (IDOR/BOLA prevention), automated testing, and developer experience.",
      "journey.exp": "Experience",
      "journey.role1": "Flutter Developer",
      "journey.org1": "Independent / Freelance",
      "journey.date1": "01/2024 – 05/2026",
      "journey.b1a": "Shopping & task manager apps with Flutter, Firebase, SQLite, Provider, and Material 3 design",
      "journey.b1b": "Weather forecast app: OpenWeather REST API integration, animated UI, optimized local database queries",
      "journey.role2": "Mentor's Assistant",
      "journey.org2": "IT Center, Kungrad",
      "journey.date2": "10/2023 – 05/2024",
      "journey.b2a": "Assisted students in frontend development (JavaScript, HTML/CSS) and basic Git/Markdown workflows",
      "journey.b2b": "Reviewed code, guided project deployments, supported independent student learning",
      "journey.skills": "Technical skills",
      "journey.l1": "Languages",
      "journey.l2": "Backend & API",
      "journey.l3": "Mobile & Web",
      "journey.l4": "DevOps & Self-Hosting",
      "journey.l5": "Testing & Quality",
      "journey.l6": "Documentation",
      "journey.v1": "Python, TypeScript, JavaScript, Dart, SQL (PostgreSQL/PostGIS), HTML, CSS, Markdown, Bash, PowerShell",
      "journey.v2": "Django, Django REST Framework, FastAPI, Pydantic, SQLAlchemy Async, Alembic, SimpleJWT, REST, OpenAPI, WebSocket, Celery, Redis",
      "journey.v3": "Flutter (BLoC, Provider, Riverpod, Clean Architecture), React Native (Expo, Expo Router), React, Vite, TanStack Query, Zustand",
      "journey.v4": "Docker, Docker Compose, Coolify, n8n, Supabase, MinIO/S3, Git/GitHub, CI/CD, Linux (Ubuntu/SSH)",
      "journey.v5": "pytest, Vitest, Flutter Unit/Widget/Integration tests, Ruff, mypy, ESLint, Prettier",
      "journey.v6": "Technical writing, README architecture, GitHub Wiki, OpenAPI specs, Mermaid.js",
      "journey.selected": "Selected projects",
      "journey.p1": "Real Estate Marketplace MVP — Full-Stack Developer",
      "journey.p1text": "Django REST Framework, React Native, Expo, PostgreSQL, PostGIS, Redis, Celery, MinIO, Docker. Versioned /api/v1 contract, phone/OTP auth with JWT rotation and blacklisting, PostGIS bounding-box & radius search with GiST indexes, owner-scoped queries preventing IDOR/BOLA, presigned S3/MinIO uploads, RU/UZ/EN localization — verified by 153 backend tests and 11 mobile unit tests.",
      "journey.p2": "Last-Mile Delivery Platform — Full-Stack / Mobile Developer",
      "journey.p2text": "Flutter, BLoC, FastAPI, React, TypeScript, PostgreSQL, PostGIS, Redis, WebSocket, Docker. Monorepo with Flutter customer/courier apps and a React dispatcher dashboard, real-time authorized WebSocket GPS tracking with validation and throttling, Redis Pub/Sub distribution, deterministic fallback route & ETA behind a provider adapter, and Markdown-based team documentation.",
      "journey.strengths": "Engineering strengths",
      "journey.st1": "Technical documentation & Markdown:",
      "journey.st1x": "architecture docs, API contracts, deployment runbooks, Markdown-driven workflows (n8n, Coolify, GitHub)",
      "journey.st2": "Security & reliability:",
      "journey.st2x": "JWT, RBAC, state machines, row locking, bounded retries, regression testing",
      "journey.st3": "Architecture:",
      "journey.st3x": "Clean Architecture, repository patterns, modular monoliths, server-owned contracts",

      "contact.eyebrow": "Contact",
      "contact.title": "Let's build something reliable.",
      "contact.lead": "Have a product flow that needs clear systems? I'm one message away.",
      "contact.email": "Send an email",
      "contact.copy": "Copy address",
      "contact.copied": "Copied!",
      "contact.emailLabel": "Email",
      "contact.tg": "Telegram",
      "contact.gh": "GitHub",
      "contact.li": "LinkedIn",
      "contact.ig": "Instagram",

      "footer.pages": "Pages",
      "footer.connect": "Connect",
      "footer.tagline": "Full-stack & mobile developer building clear, reliable systems for the web and mobile.",
      "footer.rights": "© 2026 Albert Muratbaev. All rights reserved.",
      "footer.built": "Designed in orbit",
      "footer.toTop": "Back to top",

      "pp.eyebrow": "Portfolio",
      "pp.title": "Projects",
      "pp.lead": "I build REST APIs, cross-platform mobile apps, realtime systems, and geospatial features with Django, FastAPI, React Native, and Flutter. Here are my featured projects — verified locally with automated tests.",
      "pp.b1": "Versioned /api/v1 contract, phone/OTP and password authentication, JWT rotation, blacklist, and secure token refresh",
      "pp.b2": "Property and listing domain with constraints, ownership rules, IDOR/BOLA protection, favorites, inquiries, and media",
      "pp.b3": "Bounding-box and radius search, distance ordering, GiST indexes, and presigned S3/MinIO uploads",
      "pp.b4": "Mobile discovery, filters, pagination, localization, resilient loading/error states, and Sentry foundations",
      "pp.b5": "Verified with Docker, Android API 36, 153 passing backend tests, and 11 mobile unit tests",
      "pp.c1": "Role-aware client, courier, dispatcher, and admin flows with resource-level authorization",
      "pp.c2": "Order state machine, row locking, audit trail, safe cancellation, and courier assignment",
      "pp.c3": "Authorized WebSocket GPS tracking with validation, throttling, bounded reconnect, and Redis Pub/Sub",
      "pp.c4": "Server-side ETA and route preview through an adapter with timeout, response validation, and fallback",
      "pp.c5": "PostGIS queries, paginated screens, deduplication, Docker Compose, and automated checks across all clients",
      "pp.note": "Every project is documented and tested. More experiments and tooling live on GitHub.",
      "pp.ctaTitle": "Want to see the code?",
      "pp.ctaLead": "Browse all repositories, tooling, and experiments on GitHub.",
      "pp.cta": "Open GitHub",
      "pp.back": "Back to home"
    },

    ru: {
      "meta.home.title": "Albert Muratbaev — Full-stack и mobile разработчик",
      "meta.home.desc": "Full-stack и mobile разработчик: превращаю сложные продуктовые сценарии в понятные и надёжные системы на Python, Django, FastAPI, React Native и Flutter.",
      "meta.projects.title": "Проекты — Albert Muratbaev",
      "meta.projects.desc": "Избранные проекты Albert Muratbaev — full-stack и мобильные системы на Django, FastAPI, React Native и Flutter.",

      "nav.home": "Главная",
      "nav.about": "Обо мне",
      "nav.projects": "Проекты",
      "nav.skills": "Навыки",
      "nav.journey": "Опыт",
      "nav.contact": "Контакты",
      "nav.cta": "Связаться",
      "nav.menu": "Открыть меню",
      "nav.close": "Закрыть меню",
      "nav.lang": "Язык",

      "hero.badge": "Full-stack и mobile разработчик",
      "hero.hello": "Привет, я Альберт",
      "hero.titleHtml": "Мне нравится <span class=\"grad-text glow\">создавать</span> и <span class=\"grad-text glow\">запускать</span> продукты для веба и мобильных устройств.",
      "hero.lead": "Full-stack и mobile разработчик: превращаю сложные продуктовые сценарии в понятные и надёжные системы — REST API, кроссплатформенные приложения, realtime-связь и работу с геоданными.",
      "hero.ctaWork": "Смотреть проекты",
      "hero.ctaContact": "Написать мне",
      "hero.location": "Ташкент, Узбекистан",
      "hero.focus": "Открыт к интересным задачам",
      "hero.scroll": "Листайте вниз",
      "hero.cardOne": "Django · FastAPI",
      "hero.cardTwo": "React Native · Flutter",
      "hero.imageAlt": "Стилизованная планета с орбитальным кольцом",

      "stats.tests": "Бэкенд-тестов",
      "stats.mobile": "Мобильных тестов",
      "stats.systems": "Флагманские системы",

      "about.eyebrow": "Обо мне",
      "about.titleHtml": "Понятные системы, <span class=\"grad-text\">от идеи до релиза</span>.",
      "about.lead": "Превращаю сложные продуктовые сценарии в понятные и надёжные системы — от API-контрактов и правил авторизации до мобильных клиентов и realtime-трекинга.",
      "about.body1": "Software Engineer с экспертизой в Python-бэкендах (Django, FastAPI), кроссплатформенной мобильной разработке (Flutter, React Native) и современных веб-интерфейсах (React, TypeScript). Опыт построения сквозных production-like архитектур, REST API, realtime-трекинга (PostGIS, WebSockets, Redis), self-hosted инфраструктуры (Coolify, Docker, n8n, Supabase) и подробной технической документации. Сильный фокус на API-контрактах, безопасности (защита от IDOR/BOLA), автоматизированном тестировании и developer experience.",
      "about.body2": "Главный фокус — безопасная авторизация, явные доменные правила, геосервисы, устойчивое поведение клиентов и автоматизированное тестирование. Отлаживаю от воспроизводимого симптома до первопричины, а затем закрепляю результат тестами.",
      "about.quote": "Честный скоуп: production-like системы, проверенные локально, — без заявлений о реальном production-трафике.",
      "about.profile": "Профиль",
      "about.profileSub": "Карточка разработчика",
      "about.location": "Локация",
      "about.education": "Образование",
      "about.focus": "Фокус",
      "about.stack": "Основной стек",
      "about.locationValue": "Ташкент, Узбекистан",
      "about.educationValue": "BSc Software Engineering, Туринский политехнический университет в Ташкенте — ожидается 07/2028",
      "about.focusValue": "Безопасная авторизация · Доменные правила · Геосервисы · Устойчивые клиенты",
      "about.stackValue": "Python · Django · FastAPI · React Native · Flutter · TypeScript",

      "hl.eyebrow": "Принципы",
      "hl.title": "Как я работаю.",
      "hl.lead": "Пять принципов, которые определяют каждый бэкенд, мобильное приложение и дашборд.",
      "hl.1t": "Доступ на сервере",
      "hl.1x": "Идентификация и авторизация проверяются и на уровне роли, и на уровне ресурса.",
      "hl.2t": "Явные контракты",
      "hl.2x": "API-контракты, стейт-машины, доменные инварианты и ограничения базы данных.",
      "hl.3t": "Предсказуемые сбои",
      "hl.3x": "Сетевые ошибки, ретраи, пагинация и реконнекты realtime обрабатываются осознанно.",
      "hl.4t": "Отладка до причины",
      "hl.4x": "От воспроизводимого симптома к первопричине — и закрепление регрессионными тестами.",
      "hl.5t": "Честный скоуп",
      "hl.5x": "Production-like системы, проверенные локально, без заявлений о реальном трафике.",

      "projects.eyebrow": "Избранное",
      "projects.title": "Системы, собранные целиком.",
      "projects.lead": "Две production-like платформы, проверенные локально автотестами — от API-контрактов и авторизации до мобильных клиентов и realtime-трекинга.",
      "projects.p1title": "Real Estate Marketplace MVP",
      "projects.p1kind": "Маркетплейс · Геоданные",
      "projects.p1text": "Production-like маркетплейс с бэкендом на Django/PostGIS и клиентом на Expo React Native: OTP-авторизация с ротацией JWT, защита от IDOR/BOLA, поиск по bounding-box и presigned-загрузки. Проверено 153 бэкенд- и 11 мобильными тестами.",
      "projects.p2title": "Last-mile Delivery Platform",
      "projects.p2kind": "Логистика · Realtime",
      "projects.p2text": "Сквозной процесс доставки: приложения Flutter, бэкенд FastAPI и диспетчерский дашборд на React — стейт-машина заказов, авторизованный GPS-трекинг по WebSocket, Redis Pub/Sub, серверный ETA и запросы PostGIS.",
      "projects.moreTitle": "Больше на GitHub",
      "projects.moreText": "Полная коллекция репозиториев — инструменты, эксперименты и production-like системы.",
      "projects.moreLink": "Открыть GitHub",
      "projects.open": "Смотреть на GitHub",
      "projects.viewAll": "Все проекты",

      "skills.eyebrow": "Инструменты",
      "skills.title": "Стек, на котором строятся системы.",
      "skills.lead": "Языки, фреймворки, инфраструктура и инструменты качества, с которыми я выпускаю надёжные продукты.",
      "skills.g1": "Языки",
      "skills.g2": "Бэкенд и API",
      "skills.g3": "Мобильные и веб",
      "skills.g4": "Инфраструктура",
      "skills.g5": "Автоматизация и качество",
      "skills.tip.python": "Основной язык",
      "skills.tip.typescript": "Основной стек",
      "skills.tip.javascript": "Frontend и скрипты",
      "skills.tip.dart": "Приложения Flutter",
      "skills.tip.html": "Разметка",
      "skills.tip.css": "Стилизация",
      "skills.tip.django": "Основной фреймворк",
      "skills.tip.fastapi": "Асинхронные API",
      "skills.tip.celery": "Фоновые задачи",
      "skills.tip.redis": "Кэш и Pub/Sub",
      "skills.tip.postgresql": "PostGIS, геозапросы",
      "skills.tip.sqlite": "Локальные БД",
      "skills.tip.reactnative": "Кроссплатформенные приложения",
      "skills.tip.expo": "Сборка и роутинг мобильных приложений",
      "skills.tip.flutter": "BLoC, Clean Architecture",
      "skills.tip.react": "Дашборды",
      "skills.tip.vite": "Сборка фронтенда",
      "skills.tip.tailwind": "Утилити-стили",
      "skills.tip.docker": "Контейнеры и Compose",
      "skills.tip.linux": "Ubuntu, SSH",
      "skills.tip.github": "Git-хостинг и вики",
      "skills.tip.actions": "CI/CD пайплайны",
      "skills.tip.supabase": "BaaS и Postgres",
      "skills.tip.minio": "S3-совместимое хранилище",
      "skills.tip.n8n": "Автоматизация процессов",
      "skills.tip.coolify": "Self-hosted PaaS",
      "skills.tip.pytest": "153+ тестов в проектах",
      "skills.tip.vitest": "Тесты фронтенда",
      "skills.tip.markdown": "Документация и вики",
      "skills.tip.bash": "Скрипты и деплой",

      "journey.eyebrow": "Карьера и путь",
      "journey.title": "Albert Muratbaev — CV",
      "journey.lead": "Full-Stack & Mobile Software Engineer · Ташкент, Узбекистан · BSc Software Engineering, Туринский политехнический университет в Ташкенте (ожидается 07/2028)",
      "journey.summary": "Профессиональное резюме",
      "journey.summaryText": "Software Engineer с экспертизой в Python-бэкендах (Django, FastAPI), кроссплатформенной мобильной разработке (Flutter, React Native) и современных веб-интерфейсах (React, TypeScript). Опыт построения сквозных production-like архитектур, REST API, realtime-трекинга (PostGIS, WebSockets, Redis), self-hosted инфраструктуры (Coolify, Docker, n8n, Supabase) и подробной технической документации. Сильный фокус на API-контрактах, безопасности (защита от IDOR/BOLA), автоматизированном тестировании и developer experience.",
      "journey.exp": "Опыт работы",
      "journey.role1": "Flutter-разработчик",
      "journey.org1": "Независимо / фриланс",
      "journey.date1": "01/2024 – 05/2026",
      "journey.b1a": "Приложения для покупок и управления задачами на Flutter, Firebase, SQLite, Provider и Material 3",
      "journey.b1b": "Приложение прогноза погоды: интеграция OpenWeather REST API, анимированный интерфейс, оптимизированные локальные запросы к БД",
      "journey.role2": "Ассистент ментора",
      "journey.org2": "IT Center, Кунград",
      "journey.date2": "10/2023 – 05/2024",
      "journey.b2a": "Помогал студентам во frontend-разработке (JavaScript, HTML/CSS) и базовых процессах Git/Markdown",
      "journey.b2b": "Проверял код, помогал с деплоем проектов и самостоятельным обучением студентов",
      "journey.skills": "Технические навыки",
      "journey.l1": "Языки",
      "journey.l2": "Бэкенд и API",
      "journey.l3": "Мобильные и веб",
      "journey.l4": "DevOps и self-hosting",
      "journey.l5": "Тестирование и качество",
      "journey.l6": "Документация",
      "journey.v1": "Python, TypeScript, JavaScript, Dart, SQL (PostgreSQL/PostGIS), HTML, CSS, Markdown, Bash, PowerShell",
      "journey.v2": "Django, Django REST Framework, FastAPI, Pydantic, SQLAlchemy Async, Alembic, SimpleJWT, REST, OpenAPI, WebSocket, Celery, Redis",
      "journey.v3": "Flutter (BLoC, Provider, Riverpod, Clean Architecture), React Native (Expo, Expo Router), React, Vite, TanStack Query, Zustand",
      "journey.v4": "Docker, Docker Compose, Coolify, n8n, Supabase, MinIO/S3, Git/GitHub, CI/CD, Linux (Ubuntu/SSH)",
      "journey.v5": "pytest, Vitest, Flutter Unit/Widget/Integration tests, Ruff, mypy, ESLint, Prettier",
      "journey.v6": "Технические тексты, архитектура README, GitHub Wiki, OpenAPI-спецификации, Mermaid.js",
      "journey.selected": "Избранные проекты",
      "journey.p1": "Real Estate Marketplace MVP — Full-Stack разработчик",
      "journey.p1text": "Django REST Framework, React Native, Expo, PostgreSQL, PostGIS, Redis, Celery, MinIO, Docker. Версионированный контракт /api/v1, авторизация по телефону/OTP с ротацией и блок-листом JWT, поиск по bounding-box и радиусу в PostGIS с GiST-индексами, owner-scoped запросы с защитой от IDOR/BOLA, presigned-загрузки в S3/MinIO, локализация RU/UZ/EN — проверено 153 бэкенд-тестами и 11 мобильными unit-тестами.",
      "journey.p2": "Last-Mile Delivery Platform — Full-Stack / Mobile разработчик",
      "journey.p2text": "Flutter, BLoC, FastAPI, React, TypeScript, PostgreSQL, PostGIS, Redis, WebSocket, Docker. Монорепозиторий с приложениями Flutter для клиента и курьера и диспетчерским дашбордом на React, realtime-трекинг GPS по авторизованному WebSocket с валидацией и троттлингом, доставка через Redis Pub/Sub, детерминированный fallback маршрута и ETA за адаптером провайдера, командная документация на Markdown.",
      "journey.strengths": "Инженерные сильные стороны",
      "journey.st1": "Техническая документация и Markdown:",
      "journey.st1x": "архитектурные документы, API-контракты, runbook’и деплоя, Markdown-ориентированные процессы (n8n, Coolify, GitHub)",
      "journey.st2": "Безопасность и надёжность:",
      "journey.st2x": "JWT, RBAC, стейт-машины, блокировки строк, ограниченные ретраи, регрессионные тесты",
      "journey.st3": "Архитектура:",
      "journey.st3x": "Clean Architecture, паттерн репозиторий, модульные монолиты, server-owned контракты",

      "contact.eyebrow": "Контакты",
      "contact.title": "Давайте создадим что-то надёжное.",
      "contact.lead": "Есть продуктовый сценарий, которому нужны понятные системы? Я на связи.",
      "contact.email": "Написать письмо",
      "contact.copy": "Копировать адрес",
      "contact.copied": "Скопировано!",
      "contact.emailLabel": "Email",
      "contact.tg": "Telegram",
      "contact.gh": "GitHub",
      "contact.li": "LinkedIn",
      "contact.ig": "Instagram",

      "footer.pages": "Страницы",
      "footer.connect": "Контакты",
      "footer.tagline": "Full-stack и mobile разработчик: понятные и надёжные системы для веба и мобильных устройств.",
      "footer.rights": "© 2026 Albert Muratbaev. Все права защищены.",
      "footer.built": "Дизайн — на орбите",
      "footer.toTop": "Наверх",

      "pp.eyebrow": "Портфолио",
      "pp.title": "Проекты",
      "pp.lead": "Я создаю REST API, кроссплатформенные мобильные приложения, realtime-системы и геосервисы на Django, FastAPI, React Native и Flutter. Ниже — избранные проекты, проверенные локально автотестами.",
      "pp.b1": "Версионированный контракт /api/v1, авторизация по телефону/OTP и паролю, ротация JWT, блок-лист и безопасное обновление токенов",
      "pp.b2": "Домен объектов и объявлений: ограничения, правила владения, защита от IDOR/BOLA, избранное, заявки и медиа",
      "pp.b3": "Поиск по bounding-box и радиусу, сортировка по расстоянию, GiST-индексы и presigned-загрузки в S3/MinIO",
      "pp.b4": "Мобильный поиск, фильтры, пагинация, локализация, устойчивые состояния загрузки/ошибок и основы Sentry",
      "pp.b5": "Проверено в Docker, Android API 36, 153 проходящими бэкенд-тестами и 11 мобильными unit-тестами",
      "pp.c1": "Роли клиента, курьера, диспетчера и администратора с авторизацией на уровне ресурсов",
      "pp.c2": "Стейт-машина заказов, блокировки строк, аудит-трейл, безопасная отмена и назначение курьера",
      "pp.c3": "Авторизованный GPS-трекинг по WebSocket с валидацией, троттлингом, ограниченным реконнектом и Redis Pub/Sub",
      "pp.c4": "Серверный ETA и предпросмотр маршрута через адаптер с таймаутом, валидацией ответа и fallback",
      "pp.c5": "Запросы PostGIS, пагинированные экраны, дедупликация, Docker Compose и автотесты во всех клиентах",
      "pp.note": "Каждый проект документирован и покрыт тестами. Больше экспериментов и инструментов — на GitHub.",
      "pp.ctaTitle": "Хотите посмотреть код?",
      "pp.ctaLead": "Все репозитории, инструменты и эксперименты — на GitHub.",
      "pp.cta": "Открыть GitHub",
      "pp.back": "На главную"
    }
  };

  var LANGS = ["en", "ru"];
  var page = document.body.getAttribute("data-page") || "home";

  function readStored() {
    try { return localStorage.getItem("albert.lang"); } catch (e) { return null; }
  }

  function detect() {
    var stored = readStored();
    if (LANGS.indexOf(stored) !== -1) return stored;
    /* Drop a stale value from the removed language so it self-heals. */
    if (stored) { try { localStorage.removeItem("albert.lang"); } catch (e) {} }
    var nav = (navigator.language || "en").toLowerCase().slice(0, 2);
    return LANGS.indexOf(nav) !== -1 ? nav : "en";
  }

  var lang = detect();

  function t(key) {
    var table = DICT[lang] || DICT.en;
    if (Object.prototype.hasOwnProperty.call(table, key)) return table[key];
    return Object.prototype.hasOwnProperty.call(DICT.en, key) ? DICT.en[key] : key;
  }

  function setMeta() {
    var title = t("meta." + page + ".title");
    var desc = t("meta." + page + ".desc");
    if (title && title.indexOf("meta.") !== 0) document.title = title;
    var meta = document.querySelector('meta[name="description"]');
    if (meta && desc) meta.setAttribute("content", desc);
    var og = document.querySelector('meta[property="og:title"]');
    if (og) og.setAttribute("content", title);
    var ogd = document.querySelector('meta[property="og:description"]');
    if (ogd) ogd.setAttribute("content", desc);
  }

  function apply(next, persist) {
    if (LANGS.indexOf(next) === -1) next = "en";
    lang = next;
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("data-lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var value = t(key);
      if (value != null) el.textContent = value;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      var value = t(key);
      if (value != null) el.innerHTML = value;
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      var pair = (el.getAttribute("data-i18n-attr") || "").split(":");
      if (pair.length === 2) el.setAttribute(pair[0], t(pair[1]));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });
    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      el.setAttribute("title", t(el.getAttribute("data-i18n-title")));
    });

    document.querySelectorAll(".lang__btn").forEach(function (btn) {
      var isActive = btn.getAttribute("data-lang") === lang;
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    var copyBtn = document.querySelector("[data-copy]");
    if (copyBtn && !copyBtn.classList.contains("is-done")) {
      var label = copyBtn.querySelector("[data-copy-label]");
      if (label) { label.setAttribute("data-i18n", "contact.copy"); label.textContent = t("contact.copy"); }
    }

    setMeta();

    if (persist) {
      try { localStorage.setItem("albert.lang", lang); } catch (e) {}
    }
  }

  /* ---------------------------------------------------------------------- */
  /* Starfield                                                              */
  /* ---------------------------------------------------------------------- */
  var mqReduced = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  var reduced = !!(mqReduced && mqReduced.matches);
  var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  var saveData = !!(conn && conn.saveData);
  var cores = navigator.hardwareConcurrency || 8;
  var lowPower = reduced || saveData || cores <= 2;

  if (lowPower) document.documentElement.classList.add("reduce-fx");

  function initStarfield() {
    var canvas = document.getElementById("starfield");
    if (!canvas || !canvas.getContext || lowPower) return;
    var ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    var w = 0, h = 0, dpr = 1, stars = [], raf = null, running = false, last = 0;
    var pointerX = 0, pointerY = 0, targetX = 0, targetY = 0;
    var mobile = window.innerWidth < 720;

    function build() {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      mobile = w < 720;
      var density = mobile ? 12500 : 7600;
      var count = Math.min(mobile ? 90 : 190, Math.max(50, Math.round((w * h) / density)));
      stars = [];
      for (var i = 0; i < count; i++) {
        var z = Math.random() * 0.8 + 0.2;
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: z,
          r: (0.5 + Math.random() * 1.15) * z,
          phase: Math.random() * Math.PI * 2,
          speed: 0.05 + Math.random() * 0.22,
          hue: Math.random() < 0.18 ? "rgba(158, 226, 255, " : (Math.random() < 0.14 ? "rgba(214, 190, 255, " : "rgba(255, 255, 255, ")
        });
      }
    }

    function frame(ts) {
      if (!running) return;
      if (!last) last = ts;
      var dt = Math.min((ts - last) / 16.667, 3);
      last = ts;
      pointerX += (targetX - pointerX) * 0.045;
      pointerY += (targetY - pointerY) * 0.045;

      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.y -= s.speed * s.z * dt * 0.55;
        if (s.y < -4) { s.y = h + 4; s.x = Math.random() * w; }
        var tw = 0.55 + 0.45 * Math.sin(ts * 0.0008 + s.phase);
        var px = s.x + pointerX * 14 * s.z;
        var py = s.y + pointerY * 10 * s.z;
        ctx.beginPath();
        ctx.fillStyle = s.hue + (0.28 + 0.62 * tw).toFixed(3) + ")";
        ctx.arc(px, py, s.r * (0.85 + 0.3 * tw), 0, 6.2832);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = null;
    }

    build();
    start();

    var resizeTimer = null;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 200);
    }, { passive: true });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else start();
    });

    if (window.matchMedia && window.matchMedia("(hover: hover)").matches && window.innerWidth > 900) {
      window.addEventListener("pointermove", function (e) {
        targetX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetY = (e.clientY / window.innerHeight - 0.5) * 2;
      }, { passive: true });
    }
  }

  /* ---------------------------------------------------------------------- */
  /* Pointer parallax for the hero scene                                    */
  /* ---------------------------------------------------------------------- */
  function initParallax() {
    if (lowPower) return;
    var hover = window.matchMedia && window.matchMedia("(hover: hover)").matches;
    if (!hover || window.innerWidth < 861) return;
    var root = document.documentElement;
    var ticking = false, nx = 0, ny = 0;

    window.addEventListener("pointermove", function (e) {
      nx = (e.clientX / window.innerWidth - 0.5) * 2;
      ny = (e.clientY / window.innerHeight - 0.5) * 2;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        root.style.setProperty("--par-x", nx.toFixed(3));
        root.style.setProperty("--par-y", ny.toFixed(3));
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------------------------------------------------------------------- */
  /* Reveal on scroll                                                       */
  /* ---------------------------------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    if (!("IntersectionObserver" in window) || reduced) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------------------- */
  /* Navigation: stuck state, active link, mobile menu                      */
  /* ---------------------------------------------------------------------- */
  function initNav() {
    var nav = document.querySelector(".nav");
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        if (nav) nav.classList.toggle("is-stuck", window.scrollY > 18);
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    var burger = document.querySelector(".burger");
    var menu = document.getElementById("mobileMenu");
    function closeMenu() {
      if (!menu || !burger) return;
      menu.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", t("nav.menu"));
      document.body.style.overflow = "";
    }
    function openMenu() {
      if (!menu || !burger) return;
      menu.classList.add("is-open");
      burger.setAttribute("aria-expanded", "true");
      burger.setAttribute("aria-label", t("nav.close"));
      document.body.style.overflow = "hidden";
    }
    if (burger && menu) {
      burger.addEventListener("click", function () {
        if (menu.classList.contains("is-open")) closeMenu(); else openMenu();
      });
      menu.addEventListener("click", function (e) {
        if (e.target.closest("a")) closeMenu();
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeMenu();
      });
      window.addEventListener("resize", function () {
        if (window.innerWidth > 860) closeMenu();
      }, { passive: true });
    }

    /* Scrollspy */
    var links = Array.prototype.slice.call(document.querySelectorAll(".nav__link[href^='#']"));
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = {};
    links.forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      var section = document.getElementById(id);
      if (section) map[id] = link;
    });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) { l.classList.remove("is-active"); });
        var link = map[entry.target.id];
        if (link) link.classList.add("is-active");
      });
    }, { rootMargin: "-42% 0px -52% 0px", threshold: 0 });
    Object.keys(map).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  /* ---------------------------------------------------------------------- */
  /* Card pointer glow                                                      */
  /* ---------------------------------------------------------------------- */
  function initCardGlow() {
    if (lowPower) return;
    document.querySelectorAll(".project").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - r.left) + "px");
        card.style.setProperty("--my", (e.clientY - r.top) + "px");
      }, { passive: true });
    });
  }

  /* ---------------------------------------------------------------------- */
  /* Copy email                                                            */
  /* ---------------------------------------------------------------------- */
  function initCopy() {
    var btn = document.querySelector("[data-copy]");
    if (!btn) return;
    var value = btn.getAttribute("data-copy");
    var timer = null;

    function showCopied() {
      btn.classList.add("is-done");
      var label = btn.querySelector("[data-copy-label]");
      if (label) label.textContent = t("contact.copied");
      clearTimeout(timer);
      timer = setTimeout(function () {
        btn.classList.remove("is-done");
        if (label) label.textContent = t("contact.copy");
      }, 2000);
    }

    btn.addEventListener("click", function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(showCopied, fallback);
      } else {
        fallback();
      }
      function fallback() {
        var area = document.createElement("textarea");
        area.value = value;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        try { document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(area);
        showCopied();
      }
    });
  }

  /* ---------------------------------------------------------------------- */
  /* Language buttons                                                       */
  /* ---------------------------------------------------------------------- */
  function initLang() {
    document.querySelectorAll(".lang__btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var next = btn.getAttribute("data-lang");
        if (!next) return;
        apply(next, true);
        btn.blur();
      });
    });
  }

  /* ---------------------------------------------------------------------- */
  /* Boot                                                                   */
  /* ---------------------------------------------------------------------- */
  document.documentElement.classList.add("js");
  initStarfield();
  initParallax();
  initReveal();
  initNav();
  initCardGlow();
  initCopy();
  initLang();
  apply(lang, false);
})();
