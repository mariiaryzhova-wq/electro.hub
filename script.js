/* ============================================================
   ElectroHub — script.js
   Всі JS-функції: DOM, таймери, анімації, Cookie, LocalStorage,
   регулярні вирази, розрахунки, сортування, календар, браузер
   ============================================================ */
 
'use strict';
 
/* ============================================================
   1. ІНІЦІАЛІЗАЦІЯ при завантаженні сторінки
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  initClock();
  initYear();
  initBrowserInfo();
  initJumpingImage();
  loadNote();
  loadCart();
  buildCalendar();
  buildSortTable();
  initCopyProtection();
  loadThemeCookie();
  initScrollReveal();
});
 
/* ============================================================
   2. ГОДИННИК — аналоговий + цифровий (setInterval)
   ============================================================ */
function initClock() {
  const hourHand   = document.getElementById('hourHand');
  const minuteHand = document.getElementById('minuteHand');
  const secondHand = document.getElementById('secondHand');
  const digital    = document.getElementById('digitalClock');
 
  if (!hourHand) return;
 
  function updateClock() {
    const now  = new Date();
    const h    = now.getHours();
    const m    = now.getMinutes();
    const s    = now.getSeconds();
    const ms   = now.getMilliseconds();
 
    // Плавні кути (з урахуванням мілісекунд)
    const secDeg = (s + ms / 1000) * 6;
    const minDeg = (m + s / 60) * 6;
    const hrDeg  = ((h % 12) + m / 60) * 30;
 
    secondHand.style.transform = `rotate(${secDeg}deg)`;
    minuteHand.style.transform = `rotate(${minDeg}deg)`;
    hourHand.style.transform   = `rotate(${hrDeg}deg)`;
 
    // Цифровий
    if (digital) {
      const pad = n => String(n).padStart(2, '0');
      digital.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
    }
  }
 
  updateClock();
  setInterval(updateClock, 100); // оновлення 10 разів на секунду для плавності
}
 
/* ============================================================
   3. ПОТОЧНИЙ РІК у footer
   ============================================================ */
function initYear() {
  document.querySelectorAll('#currentYear').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}
 
/* ============================================================
   4. ІНФОРМАЦІЯ ПРО БРАУЗЕР + ЗВІДКИ ПРИЙШОВ
   ============================================================ */
function initBrowserInfo() {
  const ua = navigator.userAgent;
  let browser = 'Невідомий браузер';
  let os      = 'Невідома ОС';
 
  // Визначення браузера
  if      (/Edg\//.test(ua))     browser = 'Microsoft Edge';
  else if (/OPR\//.test(ua))     browser = 'Opera';
  else if (/Firefox\//.test(ua)) browser = 'Mozilla Firefox';
  else if (/Chrome\//.test(ua))  browser = 'Google Chrome';
  else if (/Safari\//.test(ua))  browser = 'Apple Safari';
 
  // Визначення ОС
  if      (/Windows NT 10/.test(ua)) os = 'Windows 10/11';
  else if (/Windows NT 6/.test(ua))  os = 'Windows 7/8';
  else if (/Mac OS X/.test(ua))      os = 'macOS';
  else if (/Linux/.test(ua))         os = 'Linux';
  else if (/Android/.test(ua))       os = 'Android';
  else if (/iPhone|iPad/.test(ua))   os = 'iOS';
 
  // Звідки прийшов
  const referrer = document.referrer
    ? `з сайту: ${new URL(document.referrer).hostname}`
    : 'пряме відкриття / закладка';
 
  // Footer
  document.querySelectorAll('#browserInfo').forEach(el => {
    el.textContent = `${browser} | ${os}`;
  });
 
  // Детальна інфо для layout.html
  const details = document.getElementById('browserDetails');
  if (details) {
    details.innerHTML = `
      <div><strong>Браузер:</strong> ${browser}</div>
      <div><strong>ОС:</strong> ${os}</div>
      <div><strong>Мова:</strong> ${navigator.language}</div>
      <div><strong>Роздільна здатність:</strong> ${screen.width}×${screen.height}</div>
      <div><strong>Вікно:</strong> ${window.innerWidth}×${window.innerHeight} px</div>
      <div><strong>Cookies:</strong> ${navigator.cookieEnabled ? 'дозволені ✅' : 'заблоковані ❌'}</div>
      <div><strong>Джерело переходу:</strong> ${referrer}</div>
    `;
  }
}
 
/* ============================================================
   5. СТРИБАЮЧА КАРТИНКА — setInterval щосекунди
   ============================================================ */
let jumpInterval  = null;
let jumpingActive = false;
 
function initJumpingImage() {
  const img = document.getElementById('jumpingImage');
  if (!img) return;
  img.style.display = 'none';
}
 
function placeJumpingImage() {
  const img = document.getElementById('jumpingImage');
  if (!img) return;
 
  const icons = ['⚙️','🔌','💡','🔋','📡','🔧','⚡','🛠️'];
  img.textContent = icons[Math.floor(Math.random() * icons.length)];
 
  const maxX = window.innerWidth  - 60;
  const maxY = window.innerHeight - 60;
  const x    = Math.floor(Math.random() * maxX);
  const y    = Math.floor(Math.random() * maxY) + window.scrollY;
 
  img.style.left    = x + 'px';
  img.style.top     = y + 'px';
  img.style.display = 'block';
  img.style.animation = 'none';
  // Перезапускаємо анімацію через reflow
  void img.offsetWidth;
  img.style.animation = 'jumpAnim 0.5s ease forwards';
}
 
function toggleJumping() {
  const btn = document.getElementById('jumpBtn');
  const img = document.getElementById('jumpingImage');
 
  if (!jumpingActive) {
    jumpingActive = true;
    if (btn) btn.textContent = '⏹ Зупинити';
    placeJumpingImage();
    jumpInterval = setInterval(placeJumpingImage, 1000);
  } else {
    jumpingActive = false;
    clearInterval(jumpInterval);
    if (img) img.style.display = 'none';
    if (btn) btn.textContent = '▶ Запустити';
  }
}
 
/* ============================================================
   6. ІПОТЕЧНИЙ / КРЕДИТНИЙ КАЛЬКУЛЯТОР
   Формула ануїтетного платежу:
   M = P * [r(1+r)^n] / [(1+r)^n - 1]
   ============================================================ */
function calculateLoan() {
  const P = parseFloat(document.getElementById('loanAmount')?.value) || 0;
  const annualRate = parseFloat(document.getElementById('loanRate')?.value)  || 0;
  const n = parseInt(document.getElementById('loanMonths')?.value) || 0;
  const result = document.getElementById('loanResult');
 
  if (!result) return;
 
  if (P <= 0 || annualRate <= 0 || n <= 0) {
    result.innerHTML = '<span style="color:#ff4444">⚠️ Введіть коректні значення</span>';
    return;
  }
 
  const r = (annualRate / 100) / 12; // місячна ставка
  let monthlyPayment, totalPayment, overpayment;
 
  if (r === 0) {
    monthlyPayment = P / n;
  } else {
    monthlyPayment = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }
 
  totalPayment  = monthlyPayment * n;
  overpayment   = totalPayment - P;
 
  const fmt = v => v.toLocaleString('uk-UA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
 
  result.innerHTML = `
    <div class="loan-result">
      <div class="loan-result__row">
        <span>Щомісячний платіж:</span>
        <strong style="color:var(--color-primary); font-family:var(--font-display)">
          ${fmt(monthlyPayment)} грн
        </strong>
      </div>
      <div class="loan-result__row">
        <span>Загальна сума виплат:</span>
        <strong>${fmt(totalPayment)} грн</strong>
      </div>
      <div class="loan-result__row">
        <span>Переплата (відсотки):</span>
        <strong style="color:var(--color-accent)">${fmt(overpayment)} грн</strong>
      </div>
      <div class="loan-result__row">
        <span>Сума кредиту:</span>
        <strong>${fmt(P)} грн</strong>
      </div>
      <div class="loan-result__row">
        <span>Термін:</span>
        <strong>${n} міс. (${(n/12).toFixed(1)} р.)</strong>
      </div>
    </div>
  `;
 
  // Стиль для рядків
  const style = document.createElement('style');
  style.textContent = `.loan-result{display:flex;flex-direction:column;gap:10px;text-align:left;width:100%}
    .loan-result__row{display:flex;justify-content:space-between;gap:12px;
    font-size:13px;color:var(--color-text);padding:8px 0;
    border-bottom:1px solid var(--color-border);}
    .loan-result__row:last-child{border-bottom:none}`;
  if (!document.querySelector('style[data-loan]')) {
    style.setAttribute('data-loan', '');
    document.head.appendChild(style);
  }
}
 
/* ============================================================
   7. СОРТУВАННЯ МАСИВІВ — за назвою та ціною
   ============================================================ */
const productsData = [
  { name: 'Резистор SMD 0805 10кОм',        category: 'Резистор',    price: 0.45  },
  { name: 'Резистор CF 4.7кОм 0.25Вт',      category: 'Резистор',    price: 0.30  },
  { name: 'Конденсатор 100мкФ 25В',          category: 'Конденсатор', price: 2.10  },
  { name: 'Конденсатор керамічний 100нФ',    category: 'Конденсатор', price: 0.35  },
  { name: 'Транзистор BC547B NPN',           category: 'Транзистор',  price: 1.80  },
  { name: 'MOSFET IRF540N N-канал',          category: 'Транзистор',  price: 28.50 },
  { name: 'Діод 1N4007 1А 1000В',            category: 'Діод',        price: 0.80  },
  { name: 'Стабілітрон 1N4733A 5.1В',        category: 'Діод',        price: 1.90  },
  { name: 'Таймер NE555P DIP-8',             category: 'Мікросхема',  price: 4.50  },
  { name: 'ОП LM358N DIP-8',                 category: 'Мікросхема',  price: 6.80  },
  { name: 'Стабілізатор L7805CV +5В',        category: 'Мікросхема',  price: 12.00 },
  { name: 'Мікроконтролер ATmega328P',       category: 'Мікросхема',  price: 95.00 },
  { name: 'Модуль ESP32-WROOM-32D',          category: 'Модуль',      price: 185.00},
  { name: 'Дросель SMD 100мкГн 0805',        category: 'Котушка',     price: 3.20  },
  { name: 'Феритове кільце T50-43',          category: 'Котушка',     price: 22.00 },
  { name: 'Терморезистор NTC 10кОм',         category: 'Резистор',    price: 3.20  },
  { name: 'Фоторезистор LDR GL5528',         category: 'Резистор',    price: 5.50  },
  { name: 'Світлодіод 5мм червоний',         category: 'Діод',        price: 0.55  },
  { name: 'Діод Шоттки 1N5819',              category: 'Діод',        price: 1.20  },
  { name: 'Зсувний регістр 74HC595N',        category: 'Мікросхема',  price: 7.20  },
];
 
let sortedProducts = [...productsData];
 
function renderSortTable(data) {
  const container = document.getElementById('sortResult');
  if (!container) return;
 
  let html = `
    <div class="sort-row sort-row--header">
      <span>Назва компонента</span>
      <span>Категорія</span>
      <span>Ціна</span>
    </div>
  `;
 
  data.forEach(item => {
    html += `
      <div class="sort-row">
        <span>${item.name}</span>
        <span style="color:var(--color-secondary)">${item.category}</span>
        <span style="color:var(--color-primary);font-family:var(--font-display)">
          ${item.price.toFixed(2)} грн
        </span>
      </div>
    `;
  });
 
  container.innerHTML = html;
}
 
function buildSortTable() {
  renderSortTable(productsData);
}
 
function sortByName() {
  sortedProducts = [...productsData].sort((a, b) =>
    a.name.localeCompare(b.name, 'uk')
  );
  renderSortTable(sortedProducts);
  showNotification('Відсортовано за назвою (А→Я)');
}
 
function sortByPrice() {
  sortedProducts = [...productsData].sort((a, b) => a.price - b.price);
  renderSortTable(sortedProducts);
  showNotification('Відсортовано за зростанням ціни');
}
 
function resetSort() {
  renderSortTable(productsData);
  showNotification('Відновлено початковий порядок');
}
 
/* ============================================================
   8. КАЛЕНДАР НА ПОТОЧНИЙ МІСЯЦЬ (цикли)
   ============================================================ */
function buildCalendar() {
  const container = document.getElementById('calendar');
  if (!container) return;
 
  const now      = new Date();
  const year     = now.getFullYear();
  const month    = now.getMonth();
  const today    = now.getDate();
 
  // Дати поставок (для демо)
  const deliveryDays = [3, 7, 10, 14, 17, 21, 24, 28];
 
  const monthNames = [
    'Січень','Лютий','Березень','Квітень','Травень','Червень',
    'Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'
  ];
  const dayNames = ['Пн','Вт','Ср','Чт','Пт','Сб','Нд'];
 
  const firstDay = new Date(year, month, 1);
  const lastDay  = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();
 
  // День тижня першого дня (0=нд → 6, решта -1)
  let startDow = firstDay.getDay();
  startDow = startDow === 0 ? 6 : startDow - 1;
 
  let html = `<div class="calendar__header">
    📅 ${monthNames[month]} ${year}
  </div>
  <div class="calendar__grid">`;
 
  // Назви днів
  dayNames.forEach(d => {
    html += `<div class="calendar__day-name">${d}</div>`;
  });
 
  // Порожні клітинки перед першим днем
  for (let i = 0; i < startDow; i++) {
    html += `<div class="calendar__cell calendar__cell--empty"></div>`;
  }
 
  // Дні місяця
  for (let day = 1; day <= totalDays; day++) {
    const isToday    = day === today;
    const isDelivery = deliveryDays.includes(day);
    let cls = 'calendar__cell';
    if (isToday)    cls += ' calendar__cell--today';
    if (isDelivery && !isToday) cls += ' calendar__cell--delivery';
 
    html += `<div class="${cls}" title="${isDelivery ? '📦 Поставка товару' : ''}">${day}</div>`;
  }
 
  html += `</div>`;
 
  // Легенда
  html += `<div style="padding:12px 16px;font-size:12px;color:var(--color-text-muted);
    border-top:1px solid var(--color-border);display:flex;gap:20px;flex-wrap:wrap;">
    <span style="color:var(--color-primary)">■ Сьогодні</span>
    <span style="color:var(--color-secondary)">■ 📦 Дні поставок</span>
  </div>`;
 
  container.innerHTML = html;
}
 
/* ============================================================
   9. COOKIES — збереження теми
   ============================================================ */
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}
 
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [k, v] = cookie.trim().split('=');
    if (k === name) return decodeURIComponent(v || '');
  }
  return null;
}
 
function setTheme(color) {
  const themes = {
    green:  { primary: '#00ff88', secondary: '#00aaff' },
    blue:   { primary: '#00aaff', secondary: '#0066ff' },
    orange: { primary: '#ff6600', secondary: '#ff9900' },
  };
 
  const t = themes[color];
  if (!t) return;
 
  document.documentElement.style.setProperty('--color-primary',   t.primary);
  document.documentElement.style.setProperty('--color-secondary', t.secondary);
 
  setCookie('electrohub_theme', color, 30);
 
  const status = document.getElementById('themeStatus');
  if (status) {
    const labels = { green: '🟢 Зелена', blue: '🔵 Синя', orange: '🟠 Помаранчева' };
    status.textContent = `Тема збережена: ${labels[color]}`;
  }
 
  // Підсвічуємо активну кнопку
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.remove('btn--primary');
    btn.classList.add('btn--outline');
    if (btn.dataset.theme === color) {
      btn.classList.remove('btn--outline');
      btn.classList.add('btn--primary');
    }
  });
 
  showNotification(`Тема змінена на: ${color}`);
}
 
function loadThemeCookie() {
  const saved = getCookie('electrohub_theme');
  if (saved) {
    setTheme(saved);
  }
}
 
/* ============================================================
   10. LOCALSTORAGE — блокнот
   ============================================================ */
function saveNote() {
  const text   = document.getElementById('notepadText')?.value || '';
  const status = document.getElementById('notepadStatus');
 
  try {
    localStorage.setItem('electrohub_note', text);
    localStorage.setItem('electrohub_note_time', new Date().toLocaleString('uk-UA'));
    if (status) {
      status.textContent = '✅ Збережено: ' + new Date().toLocaleTimeString('uk-UA');
    }
  } catch (e) {
    if (status) status.textContent = '❌ Помилка збереження';
  }
}
 
function loadNote() {
  const textarea = document.getElementById('notepadText');
  const status   = document.getElementById('notepadStatus');
  if (!textarea) return;
 
  try {
    const saved = localStorage.getItem('electrohub_note');
    const time  = localStorage.getItem('electrohub_note_time');
    if (saved !== null) {
      textarea.value = saved;
      if (status && time) status.textContent = '📂 Завантажено із збереження: ' + time;
    }
  } catch (e) {
    // localStorage недоступний
  }
 
  // Автозбереження при введенні
  textarea.addEventListener('input', () => {
    try {
      localStorage.setItem('electrohub_note', textarea.value);
    } catch (e) {}
  });
}
 
function clearNote() {
  const textarea = document.getElementById('notepadText');
  const status   = document.getElementById('notepadStatus');
  if (textarea) textarea.value = '';
  try {
    localStorage.removeItem('electrohub_note');
    localStorage.removeItem('electrohub_note_time');
  } catch (e) {}
  if (status) status.textContent = '🗑 Очищено';
}
 
/* ============================================================
   11. РЕГУЛЯРНІ ВИРАЗИ — пошук кредитних карток та артикулів
   ============================================================ */
function searchPatterns() {
  const input  = document.getElementById('regexInput')?.value || '';
  const result = document.getElementById('regexResult');
  if (!result) return;
 
  if (!input.trim()) {
    result.innerHTML = '<span style="color:var(--color-text-muted)">Введіть текст для пошуку</span>';
    return;
  }
 
  let output = '';
  let found  = false;
 
  // Пошук номерів кредитних карток (Visa, MasterCard, 16 цифр)
  const cardRegex = /\b(?:\d[ \-]?){13,16}\d\b/g;
  const cards     = input.match(cardRegex);
  if (cards) {
    found = true;
    output += `<div style="margin-bottom:12px">
      <strong style="color:var(--color-accent)">💳 Знайдено номери карток (${cards.length}):</strong><br>
      ${cards.map(c => `<mark>${c.trim()}</mark>`).join(', ')}
    </div>`;
  }
 
  // Пошук артикулів ElectroHub (формат: ЛІТ-ЦИФ-ЦИФ)
  const articleRegex = /\b[A-Z]{1,5}-[A-Z0-9]{2,8}(?:-[A-Z0-9]{1,8})*\b/g;
  const articles = input.match(articleRegex);
  if (articles) {
    found = true;
    output += `<div style="margin-bottom:12px">
      <strong style="color:var(--color-primary)">🏷️ Знайдено артикули (${articles.length}):</strong><br>
      ${articles.map(a => `<mark>${a}</mark>`).join(', ')}
    </div>`;
  }
 
  // Пошук email
  const emailRegex = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;
  const emails = input.match(emailRegex);
  if (emails) {
    found = true;
    output += `<div style="margin-bottom:12px">
      <strong style="color:var(--color-secondary)">📧 Знайдено email (${emails.length}):</strong><br>
      ${emails.map(e => `<mark>${e}</mark>`).join(', ')}
    </div>`;
  }
 
  // Пошук телефонів
  const phoneRegex = /(?:\+38)?[ ]?\(?\d{3}\)?[ \-]?\d{3}[ \-]?\d{2}[ \-]?\d{2}/g;
  const phones = input.match(phoneRegex);
  if (phones) {
    found = true;
    output += `<div>
      <strong style="color:#aa44ff">📞 Знайдено телефони (${phones.length}):</strong><br>
      ${phones.map(p => `<mark>${p.trim()}</mark>`).join(', ')}
    </div>`;
  }
 
  if (!found) {
    output = '<span style="color:var(--color-text-muted)">❌ Нічого не знайдено. Спробуйте вставити номер картки або артикул товару.</span>';
  }
 
  result.innerHTML = output;
}
 
/* ============================================================
   12. ЗМІНА РОЗМІРУ ШРИФТУ — getElementsByTagName
   ============================================================ */
function changeFontSize(size) {
  const target = document.getElementById('fontDemoText');
  if (target) {
    target.style.fontSize = size + 'px';
    target.style.transition = 'font-size 0.3s ease';
  }
}
 
function changeAllParagraphs() {
  const paras   = document.getElementsByTagName('p');
  const newSize = prompt('Введіть новий розмір шрифту (px) для всіх абзаців:', '14');
  if (newSize && !isNaN(parseInt(newSize))) {
    Array.from(paras).forEach(p => {
      p.style.fontSize  = parseInt(newSize) + 'px';
      p.style.transition = 'font-size 0.3s ease';
    });
    showNotification(`Розмір шрифту всіх <p> змінено на ${newSize}px`);
  }
}
 
// Функція виводу тексту заданого розміру (параметри: рядок, розмір)
function displayTextWithSize(text, size) {
  const el = document.createElement('span');
  el.style.fontSize = size + 'px';
  el.textContent    = text;
  return el;
}
 
/* ============================================================
   13. ЕФЕКТ ПОСТУПОВОГО ВИТИРАННЯ ТЕКСТУ
   ============================================================ */
let eraseInterval = null;
let originalEraseText = '';
 
function startErase() {
  const target = document.getElementById('eraseTarget');
  if (!target) return;
 
  if (!originalEraseText) {
    originalEraseText = target.textContent;
  }
 
  clearInterval(eraseInterval);
 
  eraseInterval = setInterval(() => {
    const text = target.textContent;
    if (text.length === 0) {
      clearInterval(eraseInterval);
      return;
    }
    // Витираємо по одному символу з кінця
    target.textContent = text.slice(0, -1);
    // Додаємо ефект прозорості при наближенні до кінця
    const ratio = text.length / originalEraseText.length;
    target.style.opacity = Math.max(0.1, ratio);
  }, 60);
}
 
function resetErase() {
  clearInterval(eraseInterval);
  const target = document.getElementById('eraseTarget');
  if (target && originalEraseText) {
    target.textContent = originalEraseText;
    target.style.opacity = '1';
  }
}
 
/* ============================================================
   14. ФОРМА ЗАМОВЛЕННЯ
   ============================================================ */
function handleFormSubmit(event) {
  event.preventDefault();
  const form    = document.getElementById('orderForm');
  const message = document.getElementById('formMessage');
 
  const name  = document.getElementById('name')?.value.trim()  || '';
  const email = document.getElementById('email')?.value.trim() || '';
  const phone = document.getElementById('phone')?.value.trim() || '';
 
  if (!name || !email || !phone) {
    if (message) {
      message.textContent = '⚠️ Заповніть всі обов'язкові поля';
      message.style.color = '#ff4444';
    }
    return;
  }
 
  // Валідація телефону через RegExp
  const phonePattern = /^\+380\d{9}$/;
  if (!phonePattern.test(phone)) {
    if (message) {
      message.textContent = '⚠️ Телефон має бути у форматі +380XXXXXXXXX';
      message.style.color = '#ff4444';
    }
    return;
  }
 
  // Зберегти email в Cookie (запам'ятати користувача)
  setCookie('electrohub_user_email', email, 365);
  setCookie('electrohub_user_name', name, 365);
 
  if (message) {
    message.textContent = `✅ Дякуємо, ${name}! Ваше замовлення прийнято. Очікуйте дзвінка.`;
    message.style.color = 'var(--color-primary)';
  }
 
  form?.reset();
  showNotification('Замовлення успішно відправлено!');
}
 
/* ============================================================
   15. ПОШУК ПО КАТАЛОГУ (каталог)
   ============================================================ */
function searchCatalog() {
  const query  = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  const result = document.getElementById('searchResult');
  if (!result) return;
 
  if (!query) {
    result.textContent = '';
    return;
  }
 
  const matches = productsData.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query)
  );
 
  if (matches.length === 0) {
    result.innerHTML = `<span style="color:var(--color-accent)">❌ За запитом "${query}" нічого не знайдено</span>`;
  } else {
    result.innerHTML = `<span style="color:var(--color-primary)">✅ Знайдено ${matches.length} позицій: </span>` +
      matches.map(m => `<strong>${m.name}</strong> — ${m.price.toFixed(2)} грн`).join(' | ');
  }
}
 
// Enter у полі пошуку
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && document.activeElement?.id === 'searchInput') {
    searchCatalog();
  }
});
 
/* ============================================================
   16. КОШИК — каталог
   ============================================================ */
let cart = {};
 
function loadCart() {
  try {
    const saved = localStorage.getItem('electrohub_cart');
    if (saved) cart = JSON.parse(saved);
  } catch (e) {
    cart = {};
  }
  renderCart();
}
 
function saveCartToStorage() {
  try {
    localStorage.setItem('electrohub_cart', JSON.stringify(cart));
  } catch (e) {}
}
 
function addToCart(article, name) {
  if (cart[article]) {
    cart[article].qty++;
  } else {
    cart[article] = { name, qty: 1 };
  }
  saveCartToStorage();
  renderCart();
  showNotification(`✅ ${name} додано до кошика`);
}
 
function changeQty(article, delta) {
  if (!cart[article]) return;
  cart[article].qty += delta;
  if (cart[article].qty <= 0) delete cart[article];
  saveCartToStorage();
  renderCart();
}
 
function clearCart() {
  cart = {};
  saveCartToStorage();
  renderCart();
  showNotification('🗑 Кошик очищено');
}
 
function renderCart() {
  const content = document.getElementById('cartContent');
  const total   = document.getElementById('cartTotal');
  if (!content) return;
 
  const items = Object.entries(cart);
 
  if (items.length === 0) {
    content.innerHTML = '<p class="cart-empty">Кошик порожній. Додайте товари з каталогу.</p>';
    if (total) total.style.display = 'none';
    return;
  }
 
  let html = '';
  let totalQty = 0;
 
  items.forEach(([art, item]) => {
    totalQty += item.qty;
    html += `
      <div class="cart-item">
        <div>
          <div class="cart-item__name">${item.name}</div>
          <div class="cart-item__art">${art}</div>
        </div>
        <div class="cart-item__qty">
          <button class="cart-item__qty-btn" onclick="changeQty('${art}', -1)">−</button>
          <span class="cart-item__count">${item.qty}</span>
          <button class="cart-item__qty-btn" onclick="changeQty('${art}', 1)">+</button>
        </div>
        <button class="cart-item__remove" onclick="changeQty('${art}', -999)" title="Видалити">✕</button>
      </div>
    `;
  });
 
  html += `<div class="cart-item" style="font-family:var(--font-display);font-size:13px">
    <span style="color:var(--color-text-muted)">Всього позицій:</span>
    <span style="color:var(--color-primary)">${items.length} найменувань, ${totalQty} шт.</span>
  </div>`;
 
  content.innerHTML = html;
  if (total) total.style.display = 'flex';
}
 
/* ============================================================
   17. ЗАБОРОНА КОПІЮВАННЯ ТА ПЕРЕГЛЯДУ ВИХІДНОГО КОДУ
   ============================================================ */
function initCopyProtection() {
  // Заборона копіювання (тільки на захищених секціях)
  document.querySelectorAll('.protected-content').forEach(el => {
    el.addEventListener('copy', function(e) {
      e.preventDefault();
      e.clipboardData.setData('text/plain', 'Копіювання заборонено © ElectroHub');
    });
    el.addEventListener('selectstart', function(e) { e.preventDefault(); });
  });
 
  // Заборона контекстного меню на зображеннях
  document.querySelectorAll('.product-card__img, .gallery__img').forEach(img => {
    img.addEventListener('contextmenu', function(e) { e.preventDefault(); });
    img.setAttribute('draggable', 'false');
  });
 
  // Попередження при спробі відкрити DevTools (F12)
  document.addEventListener('keydown', function(e) {
    if (e.key === 'F12') {
      console.warn('%c⚠️ ElectroHub — захист контенту', 'color:#00ff88;font-size:16px;font-weight:bold');
    }
    // Ctrl+U — вихідний код
    if (e.ctrlKey && e.key === 'u') {
      e.preventDefault();
      showNotification('⛔ Перегляд вихідного коду заблоковано');
    }
    // Ctrl+Shift+I — DevTools
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
      e.preventDefault();
    }
  });
}
 
/* ============================================================
   18. СПОВІЩЕННЯ (Toast notification)
   ============================================================ */
function showNotification(text, duration = 3000) {
  // Видалити попереднє
  const existing = document.getElementById('toast-notification');
  if (existing) existing.remove();
 
  const toast = document.createElement('div');
  toast.id = 'toast-notification';
  toast.textContent = text;
  toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 32px;
    background: var(--color-bg-card);
    color: var(--color-primary);
    border: 1px solid rgba(0,255,136,0.3);
    padding: 12px 20px;
    border-radius: 8px;
    font-family: var(--font-display, monospace);
    font-size: 13px;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 24px rgba(0,255,136,0.15);
    z-index: 9999;
    animation: fadeIn 0.3s ease;
    max-width: 300px;
    word-break: break-word;
    backdrop-filter: blur(8px);
  `;
 
  document.body.appendChild(toast);
 
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s ease';
    setTimeout(() => toast.remove(), 500);
  }, duration);
}
 
/* ============================================================
   19. SCROLL REVEAL — анімація появи елементів при скролі
   ============================================================ */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
 
  // Спостерігаємо за картками та секціями
  const targets = document.querySelectorAll(
    '.category-card, .product-card, .team-card, .review-card, ' +
    '.partner-logo, .demo-card, .widget-card, .grid-block'
  );
 
  targets.forEach((el, i) => {
    el.style.opacity  = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
    observer.observe(el);
  });
 
  // Стиль для видимих елементів
  const style = document.createElement('style');
  style.textContent = `.is-visible { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);
}
 
/* ============================================================
   20. УТИЛІТИ
   ============================================================ */
 
// Плавний скрол для всіх якірних посилань
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const target   = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
 
// Автозаповнення форми з Cookie
window.addEventListener('load', function() {
  const savedEmail = getCookie('electrohub_user_email');
  const savedName  = getCookie('electrohub_user_name');
  const emailField = document.getElementById('email');
  const nameField  = document.getElementById('name');
  if (emailField && savedEmail) emailField.value = savedEmail;
  if (nameField  && savedName)  nameField.value  = savedName;
});
 
/* ============================================================
   CONSOLE WELCOME
   ============================================================ */
console.log(
  '%c⚡ ElectroHub %c— Каталог радіодеталей\n' +
  '%c Розроблено з ❤️ | JavaScript ES6+ | CSS Grid | БЕМ ',
  'color:#00ff88;font-size:18px;font-weight:bold',
  'color:#fff;font-size:14px',
  'background:#0d1524;color:#7a94b8;font-size:11px;padding:4px 8px;border-radius:4px'
);
