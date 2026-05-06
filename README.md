⚡ ElectroHub — Сайт-каталог радіодеталей
<div align="center">

</div>

📋 Зміст

Про проект
Структура файлів
Технології та вимоги
Функціональність
Запуск проекту
Архітектура CSS
JavaScript модулі
Адаптивність
Покриття вимог навчального курсу
Автор


🎯 Про проект
ElectroHub — це повноцінний багатосторінковий веб-сайт компанії-постачальника радіодеталей та електронних компонентів. Проект розроблений як курсова робота з дисципліни «Веб-технології та веб-дизайн» і демонструє комплексне застосування HTML5, CSS3 та JavaScript.
Мета проекту

Реалізувати сучасний адаптивний сайт каталогу товарів
Продемонструвати семантичну HTML5-розмітку
Застосувати складні CSS-техніки: Grid, БЕМ, анімації, медіа-запити
Реалізувати повноцінну JavaScript-функціональність без фреймворків

Тематика
Сайт представляє вигадану компанію ElectroHub — постачальника електронних компонентів з такими категоріями товарів:
резистори, конденсатори, транзистори, діоди, мікросхеми, котушки індуктивності.

📁 Структура файлів
electrohub/
│
├── index.html          # Головна сторінка (Hero, категорії, FAQ, форма)
├── catalog.html        # Каталог товарів (усі категорії, кошик, пошук)
├── layout.html         # Про компанію (CSS Grid демо, команда, партнери)
│
├── style.css           # Головні стилі (base, header, hero, footer, компоненти)
├── layout.css          # Стилі для layout.html + catalog.html
├── catalog.css         # Імпортер layout.css для catalog.html
│
└── script.js           # Весь JavaScript-функціонал
Опис сторінок
ФайлСторінкаОсновний контентindex.htmlГоловнаHero-секція, категорії, про нас, FAQ, галерея, мультимедіа, калькулятор, форма, блокнотcatalog.htmlКаталог6 категорій × 4–6 товарів, кошик, сортування, календар, пошукlayout.htmlПро компаніюCSS Grid сітка, команда, партнери, відгуки, контакти, JS-демо

🛠️ Технології та вимоги
Мінімальні системні вимоги
КомпонентВимогаБраузерChrome 90+, Firefox 88+, Safari 14+, Edge 90+JavaScriptУвімкненийРоздільна здатністьвід 320pxІнтернетПотрібен (для Google Fonts, placehold.co)
Використані технології
HTML5          — семантична розмітка, форми, мультимедіа, iframe
CSS3           — Grid, Flexbox, анімації @keyframes, медіа-запити
CSS Variables  — система дизайн-токенів через :root
BEM            — методологія іменування класів
Vanilla JS     — ES6+, DOM API, Web Storage, Cookie API
Google Fonts   — Orbitron, Exo 2

⚙️ Функціональність
HTML5 — Блок 1
ВимогаРеалізаціяФайлСемантичні теги<header>, <nav>, <main>, <footer>, <aside>, <article>, <section>Усі HTMLЗаголовки H1–H6Всі рівні присутні в about секціїindex.htmlАбзаци, жирний, курсив<p>, <strong>, <em>index.htmlМаркований список<ul> — переваги, навігаціяУсі HTMLНумерований список<ol> — кроки замовленняindex.htmlВкладений списокКонтакти → офіси → деталіlayout.htmlЗображення <img>Галерея, картки товарівУсі HTMLТаблиця <table>Умови для клієнтівindex.htmlЗовнішні посиланняПартнери, соцмережіУсі HTMLЯкірні посилання#categories, #contacts, #cart та ін.Усі HTMLМета-тегиcharset, viewport, description, keywords, author, ogУсі HTMLФонГрадієнт + radial-gradientstyle.cssКольори, шрифтиCSS змінні, Google Fontsstyle.cssFooterПовноцінний 4-колонковий підвалУсі HTML
HTML5 — Блок 2 (навігація, мультимедіа, форми)
ВимогаРеалізаціяФайлГоризонтальне dropdown менюCSS-only hover на <nav>style.cssВідео з контролами<video controls>index.htmlАудіо з контролами<audio controls>index.html<iframe>Google Maps вбудована картаindex.html, layout.htmlФорма з datetime-localПоле дати доставкиindex.htmlФорма з emailПоле emailindex.htmlФорма з telПоле телефонуindex.htmlФорма з urlПоле сайтуindex.htmlАтрибути required, maxlength, patternНа всіх полях формиindex.htmlFixed + деформація при hoverПлаваюча кнопка ⚡style.css
CSS3 — Блок 3
ВимогаРеалізаціяГрадієнтlinear-gradient, radial-gradient — hero, кнопки, прогрес-барТінь текстуtext-shadow — заголовки, логотипТінь блоківbox-shadow — картки, кнопки, годинникПрозорістьopacity — muted тексти, jumping imageУніверсальний *Reset стилів на початку файлуДочірній >.categories__grid > .category-card, .product-card > .product-card__badge:hoverКартки, кнопки, посилання, галерея:activeКнопки — зниження при кліку:nth-childТаблиця, партнери, відгуки — чергування кольорів:last-childСписки — прибирання border-bottom:focusПоля форм — підсвічування:checkedАкордеон, чекбокси, гамбургер-менюМедіа-запити1024px, 768px, 480px, 320pxГамбургер-менюCSS-only на 768px через :checkedАдаптивна галереяScale + насиченість при hoverCSS-акордеонFAQ без JavaScript (input:checked)Хлібні крихтиНавігаційний компонент breadcrumbsПрогрес-барНаповненість складу з анімацієюСтилізовані чекбоксиКастомні checkbox-customСпіральCSS @keyframes spinSpiralГодинникCSS + JS стрілки @keyframes
CSS Grid + БЕМ — Блок 4
ВимогаРеалізаціяCSS Grid LayoutHero, категорії, галерея, footer — усі через GridСкладна 9-колонкова сіткаРяд 1: 2 блоки; Ряд 2: 3 вкладені; Ряд 3: 7+2 колонкиАдаптація -md-Блоки перебудовуються на 2 колонкиАдаптація -sm-Бічний блок зникає, sidebar-блок ховаєтьсяАдаптація -xs-Збільшені відступи, порожній простірБЕМ іменуванняheader__nav, nav__link--active, product-card__body та ін.
JavaScript — Блок 5
ВимогаФункціяОписgetElementsByTagNamechangeAllParagraphs()Зміна шрифту всіх <p>Функція з аргументамиdisplayTextWithSize(text, size)Вивід тексту заданого розміруСтрибаюча картинкаplaceJumpingImage() + setIntervalЩосекунди в новому місціТекстовий годинникinitClock() + setIntervalЦифровий + аналоговийВитирання документаstartErase() + setIntervalПосимвольне витиранняІпотечний калькуляторcalculateLoan()Ануїтетна формула + переплатаСортування за іменемsortByName()Array.sort + localeCompareСортування за ціноюsortByPrice()Array.sort числовийКалендарbuildCalendar()Цикли, поточний місяцьCookiessetCookie/getCookieЗбереження теми та emailLocalStorage блокнотsaveNote/loadNote/clearNoteНотатки з автозбереженнямLocalStorage кошикaddToCart/loadCartКошик з кількістюВизначення браузераinitBrowserInfo()UA, OS, мова, роздільна здатністьЗвідки прийшовdocument.referrerВизначення джерела переходуЗаборона копіюванняinitCopyProtection()Зображення, Ctrl+URegExp — кредитні карткиsearchPatterns()Пошук 16-цифрових номерівRegExp — артикулиsearchPatterns()Пошук форматних артикулівRegExp — email, телефониsearchPatterns()Додаткові патерни

🚀 Запуск проекту
Варіант 1 — Просто відкрити у браузері
bash# Клонувати або розпакувати архів
git clone https://github.com/username/electrohub.git
cd electrohub

# Відкрити головну сторінку
# Windows:
start index.html
# macOS:
open index.html
# Linux:
xdg-open index.html
Варіант 2 — Локальний сервер (рекомендовано)
bash# Python 3
python -m http.server 8080

# Node.js (npx)
npx serve .

# VS Code — розширення Live Server (правий клік → Open with Live Server)
Відкрийте у браузері: http://localhost:8080
Варіант 3 — VS Code + Live Server

Встановіть розширення Live Server (Ritwick Dey)
Клацніть правою кнопкою на index.html
Виберіть Open with Live Server


🎨 Архітектура CSS
Дизайн-система (CSS Custom Properties)
css:root {
  /* Кольори */
  --color-bg:        #090e18;   /* Фон сторінки */
  --color-bg-2:      #0d1524;   /* Альтернативний фон */
  --color-bg-card:   #111b2e;   /* Фон карток */
  --color-primary:   #00ff88;   /* Зелений акцент */
  --color-secondary: #00aaff;   /* Синій акцент */
  --color-accent:    #ff6600;   /* Помаранчевий */
  --color-text:      #c8d8f0;   /* Основний текст */
  --color-text-muted:#7a94b8;   /* Приглушений текст */
  --color-border:    #1e2d47;   /* Межі */

  /* Типографіка */
  --font-display:    'Orbitron', monospace;   /* Заголовки */
  --font-body:       'Exo 2', sans-serif;     /* Текст */

  /* Стилі */
  --radius:          8px;
  --radius-lg:       16px;
  --shadow:          0 4px 24px rgba(0,255,136,0.10);
  --transition:      0.3s ease;
}
БЕМ-структура (приклади)
Блок:       .header
Елемент:    .header__logo
Елемент:    .header__nav
Модифікатор:.header__logo--compact

Блок:       .nav
Елемент:    .nav__list
Елемент:    .nav__item
Елемент:    .nav__link
Модифікатор:.nav__link--active
Модифікатор:.nav__item--dropdown

Блок:       .product-card
Елемент:    .product-card__img
Елемент:    .product-card__body
Елемент:    .product-card__price
Модифікатор:.product-card--in-stock
Модифікатор:.product-card--low-stock
Модифікатор:.product-card--out-stock
CSS Grid — складна сітка (layout.html)
9-колонкова сітка:

┌─────────────┬─────────────┐
│   Місія     │   Бачення   │   ← Ряд 1: col 1–5 | col 5–10
│  (4 кол.)   │  (5 кол.)   │
├──────┬───────┬────────────┤
│ 15+  │  50k+ │   10k+     │   ← Ряд 2: col 1–4 | 4–7 | 7–10
│(3кол)│(3кол) │  (3 кол.)  │
├───────────────────┬───────┤
│   Хронологія      │ Серт. │   ← Ряд 3: col 1–8 | col 8–10
│   (7 колонок)     │(2кол.)│
└───────────────────┴───────┘

📱 Адаптивність
БрейкпоінтНазваЗміни> 1024pxDesktopПовна розкладка, всі колонки≤ 1024px-md- TabletGrid 2 колонки, бічний блок зникає≤ 768px-sm- MobileGrid 1 колонка, з'являється гамбургер, iframe зникає≤ 480px-xs- SmallЗбільшені відступи, порожній простір≤ 320pxMicroМінімальна верстка, приховані деталі логотипу
Гамбургер-меню (CSS-only)
html<!-- Чекбокс-тригер -->
<input type="checkbox" id="menu-toggle" class="header__menu-toggle">
<label for="menu-toggle" class="header__burger">...</label>
<nav class="header__nav">...</nav>
css/* Відкриття через :checked */
.header__menu-toggle:checked ~ .header__nav {
  transform: translateY(0);
  opacity: 1;
}

📊 JavaScript модулі
script.js
│
├── initClock()              — аналоговий + цифровий годинник
├── initYear()               — рік у footer
├── initBrowserInfo()        — визначення браузера та ОС
├── initJumpingImage()       — ініціалізація стрибаючої іконки
├── toggleJumping()          — старт/стоп анімації
├── placeJumpingImage()      — розміщення у випадковому місці
│
├── calculateLoan()          — кредитний калькулятор
│
├── sortByName()             — сортування за назвою
├── sortByPrice()            — сортування за ціною
├── resetSort()              — скидання сортування
├── renderSortTable()        — рендер таблиці результатів
│
├── buildCalendar()          — генерація календаря поточного місяця
│
├── setCookie()              — запис Cookie
├── getCookie()              — читання Cookie
├── setTheme()               — зміна теми + збереження в Cookie
├── loadThemeCookie()        — відновлення теми
│
├── saveNote()               — збереження нотатки в LocalStorage
├── loadNote()               — завантаження нотатки
├── clearNote()              — очищення нотатки
│
├── addToCart()              — додавання товару до кошика
├── changeQty()              — зміна кількості в кошику
├── clearCart()              — очищення кошика
├── renderCart()             — рендер вмісту кошика
├── loadCart()               — відновлення кошика з LocalStorage
│
├── searchPatterns()         — RegExp: картки, артикули, email, тел.
├── searchCatalog()          — пошук по каталогу
│
├── changeFontSize()         — зміна розміру конкретного <p>
├── changeAllParagraphs()    — getElementsByTagName + prompt
├── displayTextWithSize()    — функція(рядок, розмір)
│
├── startErase()             — ефект витирання тексту
├── resetErase()             — відновлення тексту
│
├── handleFormSubmit()       — обробка форми замовлення
├── initCopyProtection()     — захист від копіювання
├── showNotification()       — Toast-сповіщення
└── initScrollReveal()       — IntersectionObserver анімації

✅ Покриття вимог навчального курсу
Блок 1 — Основи HTML5 та CSS3

 Семантична розмітка (<header>, <nav>, <main>, <footer>, <aside>, <article>, <section>)
 Заголовки H1 – H6 (всі рівні)
 Абзаци, <strong>, <em>, форматування
 Маркований <ul>, нумерований <ol>, вкладений список
 Зображення <img> з alt, width, height
 Таблиця <table> з <thead>, <tbody>, <caption>
 Зовнішні гіперпосилання (target="_blank")
 Внутрішні якірні посилання (#section)
 Мета-теги: charset, viewport, description, keywords, author, og
 Фон: gradient + background-image логіка
 Кольори тексту та CSS-змінні шрифтів
 Footer з усіма розділами

Блок 2 — Навігація, мультимедіа, форми

 Горизонтальне випадаюче меню (hover dropdown, CSS-only)
 Відео <video controls>
 Аудіо <audio controls>
 Фрейм <iframe> (Google Maps)
 Форма: datetime-local, email, tel, url
 Атрибути: required, maxlength, pattern
 Fixed-елемент з деформацією при :hover

Блок 3 — Просунутий CSS та анімації

 Градієнт (linear-gradient, radial-gradient)
 Тінь тексту (text-shadow)
 Тінь блоків (box-shadow)
 Прозорість (opacity)
 Універсальний селектор *
 Дочірній селектор >
 :hover, :active, :nth-child, :last-child, :focus, :checked
 Медіа-запити (1024px, 768px, 480px, 320px)
 Гамбургер-меню (CSS-only, 320px–768px)
 Адаптивна галерея з ефектом насиченості
 CSS-акордеон (FAQ, без JS)
 Хлібні крихти (breadcrumbs)
 Прогрес-бар з анімацією
 Стилізовані чекбокси
 Спіраль (@keyframes spinSpiral)
 Аналоговий годинник з рухомими стрілками

Блок 4 — CSS Grid + БЕМ

 CSS Grid Layout (Hero, категорії, галерея, footer, сітка layout)
 Складна сітка: ряд 1 — 2 блоки, ряд 2 — вкладені, ряд 3 — 7+2 колонки
 Адаптація -md-: перебудова блоків
 Адаптація -sm-: приховання бічного блоку
 Адаптація -xs-: порожній простір, зміна розкладки
 БЕМ: block__element--modifier для всіх компонентів

Блок 5 — JavaScript

 getElementsByTagName — зміна розміру <p>
 Функція з аргументами: displayTextWithSize(text, size)
 Стрибаюча картинка (setInterval, 1 сек)
 Текстовий + аналоговий годинник
 Ефект витирання документа
 Іпотечний калькулятор (ануїтетна формула)
 Сортування масивів за іменем та ціною
 Календар поточного місяця (цикли)
 Cookie: збереження теми, email
 LocalStorage: блокнот, кошик
 Визначення браузера та ОС
 Визначення звідки прийшов (document.referrer)
 Заборона копіювання, Ctrl+U
 Regular Expressions: кредитні картки, артикули, email, телефони


🗂️ Додаткові функції (понад вимоги)

Toast-сповіщення — анімовані повідомлення після дій
Scroll Reveal — IntersectionObserver анімація появи карток
Кошик — повноцінна корзина товарів з LocalStorage
Пошук по каталогу — фільтрація по 20 позиціях
Автозаповнення форм — відновлення email та імені з Cookie
Console Welcome — стилізоване привітання в DevTools
Плавний скрол — smooth scroll для якірних посилань
Анімації компонентів — pulse, blink, float, fadeIn


📐 Структура каталогу товарів
Каталог ElectroHub (50 000+ позицій)
│
├── 🔴 Резистори (12 400+)
│   ├── SMD (0402, 0603, 0805, 1206)
│   ├── THT (CF, MF, дротові)
│   ├── Змінні (потенціометри)
│   └── Спеціальні (NTC, PTC, LDR)
│
├── 🔵 Конденсатори (9 800+)
│   ├── Електролітичні (6.3В – 450В)
│   ├── Керамічні SMD (X7R, C0G, Y5V)
│   ├── Плівкові (MKT, MKP)
│   └── Танталові, суперконденсатори
│
├── 🟢 Транзистори (6 200+)
│   ├── Біполярні NPN/PNP
│   ├── MOSFET N/P-канал
│   ├── IGBT
│   └── Дарлінгтон
│
├── 🟡 Діоди (7 500+)
│   ├── Випрямні
│   ├── Стабілітрони (Zener)
│   ├── Шоттки
│   ├── Імпульсні
│   └── Світлодіоди (LED)
│
├── 🟠 Мікросхеми (14 100+)
│   ├── Таймери (NE555 та ін.)
│   ├── Операційні підсилювачі
│   ├── Стабілізатори напруги
│   ├── Логічні (74HC/LS/ACT)
│   └── Мікроконтролери (AVR, STM32, ESP32)
│
└── 🟣 Котушки індуктивності (4 300+)
    ├── SMD дроселі
    ├── THT дроселі
    ├── Тороїдальні
    └── Феритові сердечники

👤 Автор
Студентка гр.ПЗПІ-25-1

📧 Email: mariia.ryzhova@nure.ua
🏫 Університет: ХНУРЕ
📅 Рік: 2026


📄 Ліцензія
Цей проект створено виключно в навчальних цілях.
Всі назви брендів та продуктів є вигаданими або використовуються лише для прикладу.
MIT License — вільне використання з посиланням на автора

<div align="center">
⚡ ElectroHub — Ваш надійний постачальник радіодеталей
Made with 💚 using HTML5 · CSS3 · Vanilla JavaScript
</div>
