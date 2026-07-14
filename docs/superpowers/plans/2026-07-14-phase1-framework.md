# 地生会考学习平台 — 第1阶段实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 搭建学习平台骨架：首页导航、全局样式、错题本系统、一个示例章节

**Architecture:** 多页面纯静态HTML，共享CSS/JS资源文件。顶部固定三tab导航，localStorage跨页面共享错题数据。

**Tech Stack:** 纯HTML + CSS + Vanilla JS，零外部依赖

---

## 文件结构

```
C:/Users/lianxiang/Desktop/刘浩南/
├── index.html
├── assets/
│   ├── style.css
│   ├── app.js
│   └── quiz.js
├── geography/
│   └── g7s/
│       └── ch01.html
├── biology/
│   └── b7s/
├── exams/
├── errors/
│   └── index.html
└── docs/
```

---

### Task 1: 创建目录结构

**Files:**
- Create: 所有空目录

- [ ] **Step 1: 创建目录**

```bash
mkdir -p "C:/Users/lianxiang/Desktop/刘浩南/assets" \
         "C:/Users/lianxiang/Desktop/刘浩南/geography/g7s" \
         "C:/Users/lianxiang/Desktop/刘浩南/geography/g7x" \
         "C:/Users/lianxiang/Desktop/刘浩南/geography/g8s" \
         "C:/Users/lianxiang/Desktop/刘浩南/geography/g8x" \
         "C:/Users/lianxiang/Desktop/刘浩南/biology/b7s" \
         "C:/Users/lianxiang/Desktop/刘浩南/biology/b7x" \
         "C:/Users/lianxiang/Desktop/刘浩南/biology/b8s" \
         "C:/Users/lianxiang/Desktop/刘浩南/biology/b8x" \
         "C:/Users/lianxiang/Desktop/刘浩南/exams" \
         "C:/Users/lianxiang/Desktop/刘浩南/errors"
```

- [ ] **Step 2: 提交**

```bash
git add -A && git commit -m "chore: create project directory structure"
```

---

### Task 2: 全局样式表

**Files:**
- Create: `assets/style.css`

- [ ] **Step 1: 编写 style.css**

```css
/* === CSS变量 === */
:root {
  --color-geo: #2b7a78;
  --color-geo-light: #e0f2f1;
  --color-bio: #4a9c5d;
  --color-bio-light: #e8f5e9;
  --color-correct: #27ae60;
  --color-error: #e74c3c;
  --color-bg: #fafafa;
  --color-card: #ffffff;
  --color-text: #2c3e50;
  --color-text-light: #7f8c8d;
  --color-border: #e0e0e0;
  --nav-height: 52px;
  --breadcrumb-height: 36px;
  --max-width: 720px;
  --radius: 10px;
  --shadow: 0 2px 8px rgba(0,0,0,0.06);
}

/* === Reset === */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-text-size-adjust: 100%; }
body {
  font-family: -apple-system, "Microsoft YaHei", "PingFang SC", sans-serif;
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.7;
  padding-top: calc(var(--nav-height) + var(--breadcrumb-height));
  padding-bottom: 24px;
  max-width: var(--max-width);
  margin: 0 auto;
  min-height: 100vh;
}

/* === 顶部导航栏 === */
.top-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  background: var(--color-card);
  border-bottom: 1px solid var(--color-border);
  height: var(--nav-height);
}
.top-nav a {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--color-text-light);
  font-size: 0.95rem;
  font-weight: 500;
  border-bottom: 3px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}
.top-nav a.active {
  color: var(--color-text);
  border-bottom-color: var(--color-geo);
}
.top-nav a:hover { color: var(--color-text); }

/* === 面包屑 === */
.breadcrumb {
  position: fixed;
  top: var(--nav-height);
  left: 0; right: 0;
  z-index: 99;
  background: var(--color-bg);
  padding: 6px 16px;
  font-size: 0.85rem;
  color: var(--color-text-light);
  height: var(--breadcrumb-height);
  display: flex;
  align-items: center;
  overflow-x: auto;
  white-space: nowrap;
  border-bottom: 1px solid var(--color-border);
}
.breadcrumb a {
  color: var(--color-geo);
  text-decoration: none;
}
.breadcrumb span { margin: 0 4px; }

/* === 内容区 === */
.content { padding: 16px; }
.content h1 { font-size: 1.5rem; margin-bottom: 12px; }
.content h2 { font-size: 1.2rem; margin: 20px 0 10px; color: var(--color-geo); }
.content p { margin-bottom: 12px; }

/* === 学科选择卡片 === */
.subject-cards {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}
.subject-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  border-radius: var(--radius);
  background: var(--color-card);
  box-shadow: var(--shadow);
  border: 2px solid transparent;
  text-decoration: none;
  color: var(--color-text);
  cursor: pointer;
  transition: transform 0.15s, border-color 0.2s;
  min-height: 120px;
}
.subject-card:active { transform: scale(0.97); }
.subject-card.geo { border-color: var(--color-geo-light); }
.subject-card.geo:hover, .subject-card.geo.selected { border-color: var(--color-geo); }
.subject-card.bio { border-color: var(--color-bio-light); }
.subject-card.bio:hover, .subject-card.bio.selected { border-color: var(--color-bio); }
.subject-card .icon { font-size: 2.2rem; margin-bottom: 8px; }
.subject-card .label { font-size: 1.1rem; font-weight: 600; }

/* === 年级选择按钮 === */
.grade-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  overflow-x: auto;
}
.grade-tab {
  flex-shrink: 0;
  padding: 8px 18px;
  border-radius: 20px;
  border: 1px solid var(--color-border);
  background: var(--color-card);
  font-size: 0.9rem;
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s;
}
.grade-tab.active {
  background: var(--color-geo);
  color: #fff;
  border-color: var(--color-geo);
}

/* === 章节列表 === */
.chapter-list { list-style: none; }
.chapter-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  margin-bottom: 8px;
  border-radius: var(--radius);
  background: var(--color-card);
  box-shadow: var(--shadow);
  text-decoration: none;
  color: var(--color-text);
  transition: transform 0.15s;
  min-height: 48px;
}
.chapter-item:active { transform: scale(0.98); }
.chapter-item .ch-num {
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%;
  background: var(--color-geo-light);
  color: var(--color-geo);
  font-weight: 700;
  font-size: 0.85rem;
  margin-right: 12px;
  flex-shrink: 0;
}
.chapter-item .ch-info { flex: 1; }
.chapter-item .ch-title { font-weight: 500; }
.chapter-item .ch-meta { font-size: 0.8rem; color: var(--color-text-light); }
.chapter-item .ch-arrow { color: var(--color-text-light); font-size: 1.2rem; }

/* === 按钮 === */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
}
.btn:active { opacity: 0.8; }
.btn-primary { background: var(--color-geo); color: #fff; }
.btn-outline { background: var(--color-card); color: var(--color-geo); border: 1.5px solid var(--color-geo); }
.btn-sm { min-height: 36px; padding: 6px 14px; font-size: 0.85rem; }
.btn-danger { background: var(--color-error); color: #fff; }

/* === 练习题 === */
.quiz-container { margin-top: 20px; }
.quiz-progress {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 0.85rem;
  color: var(--color-text-light);
}
.progress-bar {
  flex: 1;
  height: 4px;
  background: var(--color-border);
  border-radius: 2px;
  margin: 0 12px;
  overflow: hidden;
}
.progress-bar .fill {
  height: 100%;
  background: var(--color-geo);
  border-radius: 2px;
  transition: width 0.3s;
}

.quiz-question {
  background: var(--color-card);
  border-radius: var(--radius);
  padding: 20px 16px;
  margin-bottom: 16px;
  box-shadow: var(--shadow);
}
.quiz-question .q-num {
  font-size: 0.85rem;
  color: var(--color-geo);
  font-weight: 600;
  margin-bottom: 8px;
}
.quiz-question .q-text {
  font-size: 1.05rem;
  font-weight: 500;
  margin-bottom: 16px;
}

.quiz-options { list-style: none; }
.quiz-option {
  display: flex;
  align-items: center;
  padding: 12px 14px;
  margin-bottom: 8px;
  border-radius: 8px;
  border: 1.5px solid var(--color-border);
  background: var(--color-card);
  cursor: pointer;
  transition: all 0.15s;
  min-height: 44px;
}
.quiz-option:active { transform: scale(0.98); }
.quiz-option:hover { border-color: var(--color-geo); background: var(--color-geo-light); }
.quiz-option.selected { border-color: var(--color-geo); background: var(--color-geo-light); }
.quiz-option.correct { border-color: var(--color-correct); background: #e8f5e9; }
.quiz-option.wrong { border-color: var(--color-error); background: #fdecea; }
.quiz-option.show-correct { border-color: var(--color-correct); background: #e8f5e9; }
.quiz-option .opt-label {
  width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%;
  background: var(--color-bg);
  font-weight: 600;
  font-size: 0.85rem;
  margin-right: 10px;
  flex-shrink: 0;
}

.quiz-feedback {
  padding: 12px 14px;
  border-radius: 8px;
  margin-top: 12px;
  font-size: 0.9rem;
  display: none;
}
.quiz-feedback.show { display: block; }
.quiz-feedback.correct { background: #e8f5e9; color: var(--color-correct); }
.quiz-feedback.wrong { background: #fdecea; color: var(--color-error); }

.quiz-results {
  background: var(--color-card);
  border-radius: var(--radius);
  padding: 32px 20px;
  text-align: center;
  box-shadow: var(--shadow);
}
.quiz-results .score {
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-geo);
}
.quiz-results .score-label { color: var(--color-text-light); margin: 8px 0 20px; }

/* === 错题本 === */
.error-list { list-style: none; }
.error-item {
  background: var(--color-card);
  border-radius: var(--radius);
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: var(--shadow);
  border-left: 4px solid var(--color-error);
}
.error-item .err-date {
  font-size: 0.8rem;
  color: var(--color-text-light);
  margin-bottom: 4px;
}
.error-item .err-chapter {
  font-size: 0.8rem;
  color: var(--color-geo);
  margin-bottom: 8px;
}
.error-item .err-question { font-weight: 500; margin-bottom: 10px; }
.error-item .err-original {
  font-size: 0.85rem;
  color: var(--color-error);
  margin-bottom: 4px;
}
.error-item .err-correct-answer {
  font-size: 0.85rem;
  color: var(--color-correct);
  margin-bottom: 10px;
}

.filter-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.filter-bar select {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  font-size: 0.9rem;
  background: var(--color-card);
  min-height: 44px;
}

.empty-state {
  text-align: center;
  padding: 48px 16px;
  color: var(--color-text-light);
}
.empty-state .empty-icon { font-size: 3rem; margin-bottom: 12px; }

/* === 考试页 === */
.exam-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--color-card);
  border-radius: var(--radius);
  margin-bottom: 16px;
  box-shadow: var(--shadow);
}
.exam-timer {
  font-size: 1.2rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--color-error);
}
.exam-timer.warning { animation: pulse 1s infinite; }
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* === 隐藏类 === */
.hidden { display: none !important; }

/* === 打印样式 === */
@media print {
  .top-nav, .breadcrumb, .btn, .quiz-feedback, .filter-bar,
  .quiz-progress, .exam-header, .exam-timer { display: none !important; }
  body {
    padding-top: 0;
    font-size: 12pt;
    color: #000;
    background: #fff;
    max-width: none;
  }
  .quiz-option.correct, .quiz-option.show-correct { background: #fff; border-color: #999; }
  .quiz-option.wrong { background: #fff; border-color: #999; }
  .content h2 { color: #000; }
  .chapter-item, .quiz-question, .error-item, .quiz-results {
    box-shadow: none;
    border: 1px solid #ccc;
    break-inside: avoid;
  }
}
```

---

### Task 3: 共享JS — 课程数据 + 导航 + 错题管理

**Files:**
- Create: `assets/app.js`

- [ ] **Step 1: 编写 app.js**

```javascript
// ========== 课程结构 ==========
const CURRICULUM = {
  geography: {
    label: '地理',
    icon: '🌍',
    color: 'geo',
    grades: {
      g7s: {
        label: '七年级上册',
        chapters: [
          { id: 'ch01', title: '地球与地图', desc: '地球的形状、大小、经纬度、地图' },
          { id: 'ch02', title: '陆地和海洋', desc: '七大洲四大洋、海陆变迁' },
          { id: 'ch03', title: '天气与气候', desc: '气温、降水、气候类型' },
          { id: 'ch04', title: '居民与聚落·发展与合作', desc: '人口、语言、宗教、聚落' }
        ]
      },
      g7x: {
        label: '七年级下册',
        chapters: [
          { id: 'ch01', title: '我们生活的大洲——亚洲', desc: '亚洲的位置、地形、气候' },
          { id: 'ch02', title: '邻近的地区和国家', desc: '日本、东南亚、印度、俄罗斯' },
          { id: 'ch03', title: '东半球其他的地区和国家', desc: '中东、欧洲西部、撒哈拉以南非洲' },
          { id: 'ch04', title: '西半球的国家', desc: '美国、巴西' },
          { id: 'ch05', title: '极地地区', desc: '南极、北极地区' }
        ]
      },
      g8s: {
        label: '八年级上册',
        chapters: [
          { id: 'ch01', title: '从世界看中国', desc: '疆域、人口、民族' },
          { id: 'ch02', title: '中国的自然环境', desc: '地形地势、气候、河流' },
          { id: 'ch03', title: '中国的自然资源', desc: '土地资源、水资源' },
          { id: 'ch04', title: '中国的经济发展', desc: '交通、农业、工业' }
        ]
      },
      g8x: {
        label: '八年级下册',
        chapters: [
          { id: 'ch01', title: '中国的地理差异', desc: '四大地理区域划分' },
          { id: 'ch02', title: '北方地区', desc: '东北、华北、黄土高原' },
          { id: 'ch03', title: '南方地区', desc: '长江三角洲、港澳、台湾' },
          { id: 'ch04', title: '西北地区', desc: '塔里木盆地、草原与荒漠' },
          { id: 'ch05', title: '青藏地区·中国在世界中', desc: '青藏高原、三江源' }
        ]
      }
    }
  },
  biology: {
    label: '生物',
    icon: '🧬',
    color: 'bio',
    grades: {
      b7s: {
        label: '七年级上册',
        chapters: [
          { id: 'ch01', title: '认识生物', desc: '生物的特征、调查周边环境中的生物' },
          { id: 'ch02', title: '了解生物圈', desc: '生物与环境的关系、生态系统' },
          { id: 'ch03', title: '细胞是生命活动的基本单位', desc: '显微镜、植物细胞、动物细胞' },
          { id: 'ch04', title: '细胞怎样构成生物体', desc: '细胞分裂、动物体和植物体的结构层次' },
          { id: 'ch05', title: '生物圈中的绿色植物', desc: '藻类、苔藓、蕨类、种子植物' },
          { id: 'ch06', title: '被子植物的一生', desc: '种子的萌发、开花与结果' },
          { id: 'ch07', title: '绿色植物与生物圈', desc: '光合作用、呼吸作用' }
        ]
      },
      b7x: {
        label: '七年级下册',
        chapters: [
          { id: 'ch01', title: '人的由来', desc: '人类的起源和发展、人的生殖' },
          { id: 'ch02', title: '人体的营养', desc: '食物中的营养物质、消化和吸收' },
          { id: 'ch03', title: '人体的呼吸', desc: '呼吸道和肺、发生在肺内的气体交换' },
          { id: 'ch04', title: '人体内物质的运输', desc: '血液、血管、血液循环' },
          { id: 'ch05', title: '人体内废物的排出', desc: '泌尿系统、尿的形成和排出' },
          { id: 'ch06', title: '人体生命活动的调节', desc: '神经调节、激素调节' },
          { id: 'ch07', title: '人类活动对生物圈的影响', desc: '环境污染、生态保护' }
        ]
      },
      b8s: {
        label: '八年级上册',
        chapters: [
          { id: 'ch01', title: '动物的主要类群', desc: '无脊椎动物、脊椎动物' },
          { id: 'ch02', title: '动物的运动和行为', desc: '运动系统、先天性行为和学习行为' },
          { id: 'ch03', title: '动物在生物圈中的作用', desc: '生态平衡、动物与人类' },
          { id: 'ch04', title: '细菌和真菌', desc: '分布、结构、在自然界中的作用' },
          { id: 'ch05', title: '病毒', desc: '病毒的种类、结构、繁殖' },
          { id: 'ch06', title: '生物的多样性及其保护', desc: '分类、生物多样性保护' }
        ]
      },
      b8x: {
        label: '八年级下册',
        chapters: [
          { id: 'ch01', title: '生物的生殖和发育', desc: '植物的生殖、昆虫/两栖动物/鸟的生殖发育' },
          { id: 'ch02', title: '生物的遗传与变异', desc: '基因、DNA、遗传规律、变异' },
          { id: 'ch03', title: '生命起源和生物进化', desc: '自然选择、生物进化的历程' },
          { id: 'ch04', title: '传染病和免疫', desc: '传染病、免疫与计划免疫' },
          { id: 'ch05', title: '用药与急救', desc: '安全用药、急救方法' },
          { id: 'ch06', title: '了解自己，增进健康', desc: '健康生活方式' }
        ]
      }
    }
  }
};

// ========== 错题管理（localStorage） ==========
const ERRORS_KEY = 'dshk_errors';

function getErrors() {
  try {
    return JSON.parse(localStorage.getItem(ERRORS_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function saveErrors(errors) {
  localStorage.setItem(ERRORS_KEY, JSON.stringify(errors));
}

function addError(error) {
  var errors = getErrors();
  // 避免重复添加同一道题
  if (!errors.some(function(e) { return e.id === error.id; })) {
    errors.push(error);
    saveErrors(errors);
  }
}

function removeError(id) {
  var errors = getErrors().filter(function(e) { return e.id !== id; });
  saveErrors(errors);
}

function clearAllErrors() {
  saveErrors([]);
}

function getErrorsBySubject(subject) {
  if (!subject) return getErrors();
  return getErrors().filter(function(e) { return e.subject === subject; });
}

function getErrorsByChapter(chapterId) {
  if (!chapterId) return getErrors();
  return getErrors().filter(function(e) { return e.chapterId === chapterId; });
}

// ========== 导航辅助 ==========
function getActiveNav() {
  var path = location.pathname;
  if (path.indexOf('/errors/') !== -1) return 'errors';
  if (path.indexOf('/exams/') !== -1) return 'exams';
  return 'home';
}

function highlightNav() {
  var active = getActiveNav();
  var links = document.querySelectorAll('.top-nav a');
  links.forEach(function(link) {
    link.classList.toggle('active', link.dataset.nav === active);
  });
}

// ========== 工具函数 ==========
function getQueryParam(name) {
  var url = new URL(location.href);
  return url.searchParams.get(name);
}

// ========== 页面初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
  highlightNav();
});
```

---

### Task 4: 练习引擎

**Files:**
- Create: `assets/quiz.js`

- [ ] **Step 1: 编写 quiz.js**

```javascript
// ========== 练习引擎 ==========
var QuizEngine = {
  currentIndex: 0,
  answers: [],        // { questionIndex, userAnswer, correct }
  quizData: [],
  subject: '',
  chapterId: '',
  chapterName: '',
  container: null,
  onComplete: null,

  init: function(options) {
    this.quizData = options.data || [];
    this.subject = options.subject || '';
    this.chapterId = options.chapterId || '';
    this.chapterName = options.chapterName || '';
    this.container = document.getElementById(options.containerId || 'quiz-area');
    this.currentIndex = 0;
    this.answers = [];
    this.onComplete = options.onComplete || null;
    this.render();
  },

  render: function() {
    if (!this.container) return;
    if (this.quizData.length === 0) {
      this.container.innerHTML = '<p style="text-align:center;padding:32px;color:var(--color-text-light)">暂无练习题</p>';
      return;
    }
    if (this.currentIndex >= this.quizData.length) {
      this.showResults();
      return;
    }

    var q = this.quizData[this.currentIndex];
    var total = this.quizData.length;
    var idx = this.currentIndex;
    var progressPct = Math.round((idx / total) * 100);

    var html = '';
    // 进度条
    html += '<div class="quiz-progress">';
    html += '<span>第 ' + (idx + 1) + ' / ' + total + ' 题</span>';
    html += '<div class="progress-bar"><div class="fill" style="width:' + progressPct + '%"></div></div>';
    html += '<span>' + progressPct + '%</span>';
    html += '</div>';

    // 题目
    html += '<div class="quiz-question" id="quiz-q">';
    html += '<div class="q-num">第 ' + (idx + 1) + ' 题</div>';
    html += '<div class="q-text">' + q.question + '</div>';
    html += '<div class="quiz-options">';
    q.options.forEach(function(opt, optIdx) {
      var labels = ['A', 'B', 'C', 'D'];
      html += '<div class="quiz-option" data-index="' + optIdx + '" onclick="QuizEngine.selectAnswer(' + optIdx + ')">';
      html += '<span class="opt-label">' + (labels[optIdx] || optIdx) + '</span>';
      html += '<span>' + opt + '</span>';
      html += '</div>';
    });
    html += '</div>';
    html += '<div class="quiz-feedback" id="quiz-feedback"></div>';
    html += '</div>';

    html += '<div style="display:flex;justify-content:space-between;margin-top:12px;">';
    html += '<button class="btn btn-outline btn-sm" id="quiz-prev-btn" style="visibility:' + (idx === 0 ? 'hidden' : 'visible') + '" onclick="QuizEngine.prevQuestion()">上一题</button>';
    html += '<button class="btn btn-primary btn-sm" id="quiz-next-btn" onclick="QuizEngine.nextQuestion()">' + (idx === total - 1 ? '完成' : '下一题') + '</button>';
    html += '</div>';

    this.container.innerHTML = html;
  },

  selectAnswer: function(optIdx) {
    var q = this.quizData[this.currentIndex];
    var isCorrect = (optIdx === q.answer);

    // 更新选项样式
    var options = this.container.querySelectorAll('.quiz-option');
    options.forEach(function(opt) {
      opt.classList.remove('selected', 'correct', 'wrong', 'show-correct');
      opt.style.pointerEvents = 'none';
    });

    var selectedOpt = this.container.querySelector('.quiz-option[data-index="' + optIdx + '"]');
    var correctOpt = this.container.querySelector('.quiz-option[data-index="' + q.answer + '"]');

    if (isCorrect) {
      selectedOpt.classList.add('correct');
    } else {
      selectedOpt.classList.add('wrong');
      correctOpt.classList.add('show-correct');
    }

    // 反馈信息
    var fb = document.getElementById('quiz-feedback');
    if (fb) {
      fb.className = 'quiz-feedback show ' + (isCorrect ? 'correct' : 'wrong');
      fb.innerHTML = isCorrect
        ? '✓ 回答正确！' + (q.explanation ? '<br><small>' + q.explanation + '</small>' : '')
        : '✗ 回答错误。正确答案是 <b>' + (['A','B','C','D'][q.answer] || q.answer) + '</b>。' + (q.explanation ? '<br><small>' + q.explanation + '</small>' : '');
    }

    // 记录答案
    this.answers[this.currentIndex] = {
      questionIndex: this.currentIndex,
      userAnswer: optIdx,
      correct: isCorrect
    };

    // 错题入错题本
    if (!isCorrect) {
      addError({
        id: q.id,
        subject: this.subject,
        chapterId: this.chapterId,
        chapterName: this.chapterName,
        question: q.question,
        options: q.options,
        correctAnswer: q.answer,
        userAnswer: optIdx,
        explanation: q.explanation || '',
        date: new Date().toISOString().slice(0, 10)
      });
    }
  },

  hasAnswered: function() {
    return this.answers[this.currentIndex] !== undefined;
  },

  nextQuestion: function() {
    if (this.currentIndex < this.quizData.length - 1) {
      this.currentIndex++;
      this.render();
      this.container.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.showResults();
    }
  },

  prevQuestion: function() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.render();
      this.container.scrollIntoView({ behavior: 'smooth' });
    }
  },

  showResults: function() {
    var correctCount = this.answers.filter(function(a) { return a.correct; }).length;
    var total = this.quizData.length;
    var pct = Math.round((correctCount / total) * 100);
    var emoji = pct >= 90 ? '🎉' : pct >= 70 ? '👍' : pct >= 50 ? '📚' : '💪';

    var html = '<div class="quiz-results">';
    html += '<div style="font-size:3rem;">' + emoji + '</div>';
    html += '<div class="score">' + correctCount + ' / ' + total + '</div>';
    html += '<div class="score-label">正确率 ' + pct + '%</div>';

    if (pct < 100) {
      var errorCount = total - correctCount;
      html += '<p style="color:var(--color-text-light);margin-bottom:16px;">' + errorCount + ' 道错题已自动加入错题本</p>';
    }

    html += '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">';
    html += '<button class="btn btn-outline" onclick="QuizEngine.retryWrong()">重做错题</button>';
    html += '<button class="btn btn-primary" onclick="QuizEngine.restart()">重新练习</button>';
    html += '</div>';
    html += '</div>';

    this.container.innerHTML = html;

    if (this.onComplete) {
      this.onComplete({ correct: correctCount, total: total, pct: pct });
    }
  },

  retryWrong: function() {
    var wrongIds = this.answers.filter(function(a) { return !a.correct; }).map(function(a) { return a.questionIndex; });
    var wrongData = this.quizData.filter(function(_, idx) { return wrongIds.indexOf(idx) !== -1; });
    if (wrongData.length === 0) {
      alert('没有错题，太棒了！');
      return;
    }
    this.quizData = wrongData;
    this.currentIndex = 0;
    this.answers = [];
    this.render();
    this.container.scrollIntoView({ behavior: 'smooth' });
  },

  restart: function() {
    this.currentIndex = 0;
    this.answers = [];
    this.render();
    this.container.scrollIntoView({ behavior: 'smooth' });
  }
};
```

---

### Task 5: 首页

**Files:**
- Create: `index.html`

- [ ] **Step 1: 编写 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>地生会考学习平台</title>
<link rel="stylesheet" href="assets/style.css">
</head>
<body>

<!-- 顶部导航 -->
<nav class="top-nav">
  <a href="index.html" data-nav="home" class="active">🏠 首页</a>
  <a href="errors/index.html" data-nav="errors">📝 错题本</a>
  <a href="#" data-nav="exams" onclick="alert('模拟考试功能将在后续版本上线')">📋 考试</a>
</nav>

<div class="breadcrumb">
  <span>首页</span>
</div>

<div class="content" id="app">
  <!-- 学科选择 -->
  <div class="subject-cards" id="subject-cards"></div>

  <!-- 年级选择 -->
  <div class="grade-tabs hidden" id="grade-tabs"></div>

  <!-- 章节列表 -->
  <div class="chapter-list hidden" id="chapter-list"></div>
</div>

<script src="assets/app.js"></script>
<script>
(function() {
  var currentSubject = null;
  var currentGrade = null;

  var subjectCardsEl = document.getElementById('subject-cards');
  var gradeTabsEl = document.getElementById('grade-tabs');
  var chapterListEl = document.getElementById('chapter-list');

  // 渲染学科卡片
  function renderSubjectCards() {
    var html = '';
    for (var key in CURRICULUM) {
      var subj = CURRICULUM[key];
      html += '<div class="subject-card ' + subj.color + '" onclick="window._selectSubject(\'' + key + '\')">';
      html += '<span class="icon">' + subj.icon + '</span>';
      html += '<span class="label">' + subj.label + '</span>';
      html += '</div>';
    }
    subjectCardsEl.innerHTML = html;
  }

  // 选择学科
  window._selectSubject = function(key) {
    currentSubject = key;
    var subj = CURRICULUM[key];
    currentGrade = null;

    // 高亮选中卡片
    var cards = subjectCardsEl.querySelectorAll('.subject-card');
    cards.forEach(function(c) { c.classList.remove('selected'); });
    cards.forEach(function(c) {
      if (c.textContent.indexOf(subj.label) !== -1) c.classList.add('selected');
    });

    // 渲染年级选择
    renderGradeTabs(key);
  };

  // 渲染年级标签
  function renderGradeTabs(key) {
    var subj = CURRICULUM[key];
    var grades = subj.grades;
    var html = '';
    for (var gKey in grades) {
      html += '<button class="grade-tab" data-grade="' + gKey + '" onclick="window._selectGrade(\'' + key + '\', \'' + gKey + '\')">' + grades[gKey].label + '</button>';
    }
    gradeTabsEl.innerHTML = html;
    gradeTabsEl.classList.remove('hidden');
    chapterListEl.innerHTML = '';
  }

  // 选择年级
  window._selectGrade = function(subjKey, gradeKey) {
    currentGrade = gradeKey;
    var subj = CURRICULUM[subjKey];
    var grade = subj.grades[gradeKey];

    // 更新面包屑
    document.querySelector('.breadcrumb').innerHTML = '<a href="index.html">首页</a><span>›</span><span>' + subj.label + '</span><span>›</span><span>' + grade.label + '</span>';

    // 高亮当前年级tab
    var tabs = gradeTabsEl.querySelectorAll('.grade-tab');
    tabs.forEach(function(t) { t.classList.remove('active'); });
    tabs.forEach(function(t) {
      if (t.dataset.grade === gradeKey) t.classList.add('active');
    });

    // 渲染章节列表
    renderChapterList(subj, grade, subjKey, gradeKey);
  };

  // 渲染章节列表
  function renderChapterList(subj, grade, subjKey, gradeKey) {
    // 确定章节页面路径前缀
    var prefix = subjKey + '/' + gradeKey + '/';

    var html = '';
    grade.chapters.forEach(function(ch, idx) {
      html += '<a class="chapter-item" href="' + prefix + ch.id + '.html">';
      html += '<span class="ch-num">' + (idx + 1) + '</span>';
      html += '<div class="ch-info">';
      html += '<div class="ch-title">' + ch.title + '</div>';
      html += '<div class="ch-meta">' + (ch.desc || '') + '</div>';
      html += '</div>';
      html += '<span class="ch-arrow">›</span>';
      html += '</a>';
    });

    chapterListEl.innerHTML = html;
    chapterListEl.classList.remove('hidden');
  }

  // 初始化
  renderSubjectCards();
})();
</script>

</body>
</html>
```

- [ ] **Step 2: 浏览器打开验证**

在浏览器中打开 `index.html`，确认：
- 页面显示地理和生物两个学科卡片
- 点击卡片后出现年级选择
- 点击年级后出现章节列表
- 顶部导航可以切换

---

### Task 6: 错题本页面

**Files:**
- Create: `errors/index.html`

- [ ] **Step 1: 编写 errors/index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>错题本 - 地生会考学习平台</title>
<link rel="stylesheet" href="../assets/style.css">
</head>
<body>

<nav class="top-nav">
  <a href="../index.html" data-nav="home">🏠 首页</a>
  <a href="index.html" data-nav="errors" class="active">📝 错题本</a>
  <a href="#" data-nav="exams" onclick="alert('模拟考试功能将在后续版本上线')">📋 考试</a>
</nav>

<div class="breadcrumb">
  <a href="../index.html">首页</a><span>›</span><span>错题本</span>
</div>

<div class="content" id="app">
  <h1>📝 错题本</h1>

  <div class="filter-bar" id="filter-bar">
    <select id="filter-subject" onchange="renderErrors()">
      <option value="">全部学科</option>
      <option value="geography">地理</option>
      <option value="biology">生物</option>
    </select>
    <select id="filter-chapter" onchange="renderErrors()">
      <option value="">全部章节</option>
    </select>
    <button class="btn btn-danger btn-sm" onclick="clearErrors()" style="margin-left:auto;">清空全部</button>
  </div>

  <div id="error-list"></div>
  <div class="empty-state hidden" id="empty-state">
    <div class="empty-icon">🎉</div>
    <p>暂无错题，继续保持！</p>
  </div>
</div>

<script src="../assets/app.js"></script>
<script src="../assets/quiz.js"></script>
<script>
(function() {
  var currentReanswer = null; // 当前正在重做的错题

  function getAllChapters() {
    var chapters = [];
    for (var subjKey in CURRICULUM) {
      var subj = CURRICULUM[subjKey];
      for (var gradeKey in subj.grades) {
        var grade = subj.grades[gradeKey];
        grade.chapters.forEach(function(ch) {
          chapters.push({
            key: subjKey + '/' + gradeKey + '/' + ch.id,
            label: subj.label + ' - ' + grade.label + ' - ' + ch.title
          });
        });
      }
    }
    return chapters;
  }

  // 初始化章节筛选
  function initChapterFilter() {
    var sel = document.getElementById('filter-chapter');
    var chapters = getAllChapters();
    chapters.forEach(function(ch) {
      var opt = document.createElement('option');
      opt.value = ch.key;
      opt.textContent = ch.label;
      sel.appendChild(opt);
    });
  }

  // 从题目ID推断章节ID (格式: "geo-g7s-ch01-q01")
  function idToChapterId(id) {
    var parts = id.split('-');
    if (parts.length >= 3) {
      var subj = parts[0] === 'geo' ? 'geography' : 'biology';
      return subj + '/' + parts[1] + '/' + parts[2];
    }
    return null;
  }

  // 渲染错题列表
  window.renderErrors = function() {
    var subject = document.getElementById('filter-subject').value;
    var chapter = document.getElementById('filter-chapter').value;
    var listEl = document.getElementById('error-list');
    var emptyEl = document.getElementById('empty-state');

    // 获取错题
    var errors = getErrors();

    // 筛选
    if (subject) {
      errors = errors.filter(function(e) { return e.subject === subject; });
    }
    if (chapter) {
      errors = errors.filter(function(e) {
        return idToChapterId(e.id) === chapter;
      });
    }

    if (errors.length === 0) {
      listEl.innerHTML = '';
      emptyEl.classList.remove('hidden');
      return;
    }

    emptyEl.classList.add('hidden');

    var labels = ['A', 'B', 'C', 'D'];
    var html = '<p style="color:var(--color-text-light);margin-bottom:12px;">共 ' + errors.length + ' 道错题</p>';

    errors.forEach(function(err, idx) {
      html += '<div class="error-item" id="error-' + idx + '">';
      html += '<div class="err-date">📅 ' + err.date + '</div>';
      html += '<div class="err-chapter">📖 ' + (err.chapterName || '未知章节') + '</div>';
      html += '<div class="err-question">' + err.question + '</div>';

      // 显示选项
      err.options.forEach(function(opt, optIdx) {
        var cls = '';
        if (optIdx === err.correctAnswer) cls = 'color:var(--color-correct);font-weight:500;';
        if (optIdx === err.userAnswer && optIdx !== err.correctAnswer) cls = 'color:var(--color-error);text-decoration:line-through;';
        html += '<div style="font-size:0.85rem;margin-bottom:2px;' + cls + '">' + labels[optIdx] + '. ' + opt + '</div>';
      });

      html += '<div class="err-original">你的答案：' + labels[err.userAnswer] + '</div>';
      html += '<div class="err-correct-answer">正确答案：' + labels[err.correctAnswer] + '</div>';
      if (err.explanation) {
        html += '<div style="font-size:0.85rem;color:var(--color-text-light);margin-bottom:8px;">💡 ' + err.explanation + '</div>';
      }

      html += '<div style="display:flex;gap:8px;">';
      html += '<button class="btn btn-outline btn-sm" onclick="window._reanswer(' + idx + ')">重新作答</button>';
      html += '<button class="btn btn-sm" style="background:var(--color-correct);color:#fff;" onclick="window._markCorrect(\'' + err.id + '\')">已掌握，移除</button>';
      html += '</div>';

      // 重做区域
      html += '<div class="hidden" id="reanswer-' + idx + '" style="margin-top:12px;"></div>';

      html += '</div>';
    });

    listEl.innerHTML = html;
  };

  // 重新作答
  window._reanswer = function(idx) {
    var errors = getErrors();
    var err = errors[idx];
    if (!err) return;

    var reanswerEl = document.getElementById('reanswer-' + idx);
    var labels = ['A', 'B', 'C', 'D'];

    var html = '<p style="font-weight:500;margin-bottom:8px;">' + err.question + '</p>';
    err.options.forEach(function(opt, optIdx) {
      html += '<div class="quiz-option" onclick="window._checkReanswer(' + idx + ', ' + optIdx + ')" style="margin-bottom:4px;">';
      html += '<span class="opt-label">' + labels[optIdx] + '</span>';
      html += '<span>' + opt + '</span>';
      html += '</div>';
    });
    html += '<div id="reanswer-fb-' + idx + '" class="quiz-feedback"></div>';

    reanswerEl.innerHTML = html;
    reanswerEl.classList.remove('hidden');
  };

  // 检查重做答案
  window._checkReanswer = function(idx, optIdx) {
    var errors = getErrors();
    var err = errors[idx];
    if (!err) return;

    var fb = document.getElementById('reanswer-fb-' + idx);
    var isCorrect = (optIdx === err.correctAnswer);

    // 禁用所有选项
    var options = document.querySelectorAll('#reanswer-' + idx + ' .quiz-option');
    options.forEach(function(opt, i) {
      opt.style.pointerEvents = 'none';
      if (i === err.correctAnswer) opt.classList.add('show-correct');
      if (i === optIdx && !isCorrect) opt.classList.add('wrong');
      if (i === optIdx && isCorrect) opt.classList.add('correct');
    });

    if (isCorrect) {
      fb.className = 'quiz-feedback show correct';
      fb.innerHTML = '✓ 回答正确！已从错题本移除。';
      removeError(err.id);
      // 2秒后刷新列表
      setTimeout(function() { renderErrors(); }, 1500);
    } else {
      fb.className = 'quiz-feedback show wrong';
      fb.innerHTML = '✗ 还是不对，正确答案是 ' + (['A','B','C','D'][err.correctAnswer]) + '。请继续加油！';
    }
  };

  // 标记已掌握
  window._markCorrect = function(id) {
    if (confirm('确认已掌握这道题？将从错题本中移除。')) {
      removeError(id);
      renderErrors();
    }
  };

  // 清空全部
  window.clearErrors = function() {
    if (confirm('确定要清空所有错题吗？此操作不可恢复。')) {
      clearAllErrors();
      renderErrors();
    }
  };

  // 初始化
  initChapterFilter();
  renderErrors();
})();
</script>

</body>
</html>
```

- [ ] **Step 2: 浏览器打开验证**

在浏览器中打开 `errors/index.html`，确认：
- 空错题本显示空状态
- 筛选下拉框有学科和章节选项
- 清空按钮弹出确认

---

### Task 7: 示例章节页面（地理七上第1章）

**Files:**
- Create: `geography/g7s/ch01.html`

- [ ] **Step 1: 编写 ch01.html（含知识 + 练习）**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>地球与地图 - 地理七上 - 地生会考学习平台</title>
<link rel="stylesheet" href="../../assets/style.css">
</head>
<body>

<nav class="top-nav">
  <a href="../../index.html" data-nav="home">🏠 首页</a>
  <a href="../../errors/index.html" data-nav="errors">📝 错题本</a>
  <a href="#" data-nav="exams" onclick="alert('模拟考试功能将在后续版本上线')">📋 考试</a>
</nav>

<div class="breadcrumb">
  <a href="../../index.html">首页</a><span>›</span><span>地理</span><span>›</span><span>七年级上册</span><span>›</span><span>地球与地图</span>
</div>

<div class="content">

<h1>第1章 地球与地图</h1>

<!-- ===== 知识点 ===== -->
<h2>一、地球的形状和大小</h2>
<p>地球是一个<strong>两极稍扁、赤道略鼓的不规则球体</strong>（椭球体）。</p>
<p>证明地球是球体的证据：</p>
<ul style="padding-left:20px;margin-bottom:12px;">
  <li>海边看远处驶来的帆船，先看到桅杆再看到船身</li>
  <li>月食时地球投射到月球上的影子是弧形的</li>
  <li>麦哲伦船队环球航行的成功</li>
  <li>地球的卫星照片</li>
</ul>
<p><strong>地球的大小：</strong></p>
<ul style="padding-left:20px;margin-bottom:12px;">
  <li>平均半径：约 <strong>6371千米</strong></li>
  <li>赤道周长：约 <strong>4万千米</strong></li>
  <li>表面积：约 <strong>5.1亿平方千米</strong></li>
</ul>

<h2>二、地球仪和经纬线</h2>
<p><strong>地轴</strong>：地球自转的假想轴，始终倾斜（与公转轨道面呈66.5°夹角）。</p>
<p><strong>两极</strong>：地轴与地球表面的两个交点——北极(N)和南极(S)。</p>

<h3>经线（子午线）</h3>
<ul style="padding-left:20px;margin-bottom:12px;">
  <li>连接南北两极的半圆</li>
  <li>所有经线长度相等</li>
  <li>指示南北方向</li>
  <li><strong>本初子午线</strong>（0°经线）：经过英国格林尼治天文台</li>
  <li>东西经分界：0°和180°</li>
  <li>东西半球分界：<strong>20°W和160°E</strong>组成的经线圈</li>
</ul>

<h3>纬线</h3>
<ul style="padding-left:20px;margin-bottom:12px;">
  <li>与赤道平行的圆圈</li>
  <li>赤道最长，向两极逐渐缩短</li>
  <li>指示东西方向</li>
  <li><strong>赤道</strong>（0°纬线）：南北半球分界</li>
  <li>低纬度：0°-30°；中纬度：30°-60°；高纬度：60°-90°</li>
</ul>

<p><strong>经纬网</strong>：由经线和纬线交织而成，用于确定地球上任意一点的位置。</p>

<h2>三、地球的运动</h2>

<h3>自转</h3>
<ul style="padding-left:20px;margin-bottom:12px;">
  <li>绕地轴旋转，方向：<strong>自西向东</strong></li>
  <li>周期：约 <strong>24小时</strong>（一天）</li>
  <li>产生现象：<strong>昼夜交替</strong>、时间的差异</li>
</ul>

<h3>公转</h3>
<ul style="padding-left:20px;margin-bottom:12px;">
  <li>绕太阳旋转，方向：<strong>自西向东</strong></li>
  <li>周期：约 <strong>365天</strong>（一年）</li>
  <li>产生现象：<strong>四季变化</strong>、昼夜长短变化、五带的划分</li>
</ul>

<p><strong>黄赤交角</strong>：地球公转轨道面（黄道面）与赤道面的夹角，约 <strong>23.5°</strong>。</p>

<h3>五带的划分</h3>
<table style="width:100%;border-collapse:collapse;margin-bottom:12px;font-size:0.9rem;">
  <tr style="background:var(--color-geo-light);">
    <th style="padding:8px;border:1px solid var(--color-border);text-align:left;">温度带</th>
    <th style="padding:8px;border:1px solid var(--color-border);text-align:left;">范围</th>
    <th style="padding:8px;border:1px solid var(--color-border);text-align:left;">特点</th>
  </tr>
  <tr>
    <td style="padding:8px;border:1px solid var(--color-border);">热带</td>
    <td style="padding:8px;border:1px solid var(--color-border);">南北回归线之间</td>
    <td style="padding:8px;border:1px solid var(--color-border);">有太阳直射现象</td>
  </tr>
  <tr>
    <td style="padding:8px;border:1px solid var(--color-border);">北/南温带</td>
    <td style="padding:8px;border:1px solid var(--color-border);">回归线与极圈之间</td>
    <td style="padding:8px;border:1px solid var(--color-border);">四季分明</td>
  </tr>
  <tr>
    <td style="padding:8px;border:1px solid var(--color-border);">北/南寒带</td>
    <td style="padding:8px;border:1px solid var(--color-border);">极圈以内</td>
    <td style="padding:8px;border:1px solid var(--color-border);">有极昼极夜现象</td>
  </tr>
</table>

<h2>四、地图</h2>
<p><strong>地图三要素</strong>：比例尺、方向、图例。</p>
<ul style="padding-left:20px;margin-bottom:12px;">
  <li><strong>比例尺</strong> = 图上距离 ÷ 实地距离。比例尺越大，表示的范围越小，内容越详细。</li>
  <li><strong>方向</strong>：一般定向法（上北下南左西右东）；指向标定向法；经纬网定向法。</li>
  <li><strong>图例</strong>：地图上表示地理事物的符号和注记。</li>
</ul>

<!-- 练习入口 -->
<div style="text-align:center;margin:32px 0 16px;">
  <button class="btn btn-primary" onclick="startQuiz()" style="font-size:1.1rem;padding:14px 48px;">
    📝 开始练习（10题）
  </button>
</div>

<!-- 练习区 -->
<div id="quiz-area" class="hidden"></div>

</div><!-- /content -->

<script src="../../assets/app.js"></script>
<script src="../../assets/quiz.js"></script>
<script>
// ===== 练习数据 =====
var GEO_G7S_CH01_QUIZ = [
  {
    id: "geo-g7s-ch01-q01",
    question: "地球的平均半径约为多少千米？",
    options: ["5371 km", "6371 km", "7371 km", "4371 km"],
    answer: 1,
    explanation: "地球的平均半径约为6371千米。口诀记忆：地球半径六三七一。"
  },
  {
    id: "geo-g7s-ch01-q02",
    question: "地球的赤道周长约为多少？",
    options: ["2万千米", "3万千米", "4万千米", "5万千米"],
    answer: 2,
    explanation: "赤道周长约4万千米。坐地日行八万里（4万千米=8万里）。"
  },
  {
    id: "geo-g7s-ch01-q03",
    question: "东西半球的分界线是？",
    options: ["0°和180°经线", "20°W和160°E", "20°E和160°W", "赤道"],
    answer: 1,
    explanation: "东西半球以20°W和160°E组成的经线圈为界，避免穿过太多国家。"
  },
  {
    id: "geo-g7s-ch01-q04",
    question: "地球自转的方向是？",
    options: ["自东向西", "自西向东", "自南向北", "自北向南"],
    answer: 1,
    explanation: "地球自转方向是自西向东。从北极上空看呈逆时针，从南极上空看呈顺时针。"
  },
  {
    id: "geo-g7s-ch01-q05",
    question: "地球自转一周的时间约为？",
    options: ["12小时", "24小时", "30天", "365天"],
    answer: 1,
    explanation: "地球自转一周约24小时（一天），产生昼夜交替现象。"
  },
  {
    id: "geo-g7s-ch01-q06",
    question: "地球公转产生的地理现象是？",
    options: ["昼夜交替", "四季变化", "潮汐现象", "日食月食"],
    answer: 1,
    explanation: "地球公转产生四季变化、昼夜长短变化和五带划分。昼夜交替是自转产生的。"
  },
  {
    id: "geo-g7s-ch01-q07",
    question: "划分南北半球的界线是？",
    options: ["本初子午线", "赤道（0°纬线）", "北回归线", "20°W经线"],
    answer: 1,
    explanation: "赤道（0°纬线）是南北半球的分界线。"
  },
  {
    id: "geo-g7s-ch01-q08",
    question: "中纬度的范围是？",
    options: ["0°-30°", "30°-60°", "60°-90°", "23.5°-66.5°"],
    answer: 1,
    explanation: "低纬度0°-30°，中纬度30°-60°，高纬度60°-90°。"
  },
  {
    id: "geo-g7s-ch01-q09",
    question: "黄赤交角的度数约为？",
    options: ["66.5°", "23.5°", "45°", "90°"],
    answer: 1,
    explanation: "黄赤交角约23.5°，即地球公转轨道面与赤道面的夹角。它决定了南北回归线的纬度。"
  },
  {
    id: "geo-g7s-ch01-q10",
    question: "有太阳直射现象的温度带是？",
    options: ["热带", "北温带", "南温带", "北寒带"],
    answer: 0,
    explanation: "热带（南北回归线之间）有太阳直射现象。温带四季分明，寒带有极昼极夜。"
  }
];

function startQuiz() {
  var quizArea = document.getElementById('quiz-area');
  quizArea.classList.remove('hidden');
  quizArea.scrollIntoView({ behavior: 'smooth' });

  QuizEngine.init({
    data: GEO_G7S_CH01_QUIZ,
    subject: 'geography',
    chapterId: 'g7s/ch01',
    chapterName: '第1章 地球与地图',
    containerId: 'quiz-area'
  });
}
</script>

</body>
</html>
```

- [ ] **Step 2: 浏览器打开验证**

在浏览器中打开 `geography/g7s/ch01.html`，确认：
- 知识点显示正确
- 点击"开始练习"后出现10道选择题
- 选择答案后立即判对错并显示解析
- 错题自动加入错题本（可到错题本页面验证）
- 做完所有题后显示结果
- 手机浏览器布局正常

---

### Task 8: 创建 TEACH 工作区文件

**Files:**
- Create: `MISSION.md`, `RESOURCES.md`, `NOTES.md`

- [ ] **Step 1: 编写 MISSION.md**

```markdown
# Mission: 地生会考学习平台

## Why
为弟弟（2026年9月升初二）备考2027年6月咸阳市地生会考，搭建一个手机可用的学习平台，帮助他从零基础开始系统学习地理和生物，顺利通过考试。

## Success looks like
- 弟弟能在手机上随时打开学习平台，按章节学知识点和做题
- 每章学完能做练习并获得即时反馈
- 错题自动收集，可以反复复习
- 考前能进行整套模拟考试
- 内容可以打印出来线下复习

## Constraints
- 纯静态HTML，file://协议直接在手机浏览器打开
- 人教版教材
- 陕西省咸阳市考区
- 备考周期：2026年9月 — 2027年6月（约10个月）
- 弟弟当前水平：零基础

## Out of scope
- 化学、物理等其他科目
- 视频/动画讲解
- 在线同步/账号系统
- 非人教版教材内容
```

- [ ] **Step 2: 编写 RESOURCES.md**

```markdown
# 地生会考 Resources

## Knowledge
- 人教版七年级地理上册/下册
- 人教版八年级地理上册/下册
- 人教版七年级生物上册/下册
- 人教版八年级生物上册/下册

## 待收集
- [ ] 陕西省咸阳市近3年地生会考真题
- [ ] 咸阳市地生会考考试大纲/说明
- [ ] 各章节重难点分析
```

- [ ] **Step 3: 编写 NOTES.md**

```markdown
# NOTES

## 用户偏好
- 移动端优先，导航栏在顶部
- 打印时隐藏导航元素
- 配色：地理蓝绿、生物绿色
- 简短干净，不花哨

## 工作记录
- 2026-07-14：第1阶段启动，搭建框架
```
```

---

## 实施顺序

Tasks 1-4（基础设施）→ Tasks 5-7（页面）→ Task 8（文档）

Task 1-4 可部分并行创建文件，但因为 Task 5-7 依赖前面的 CSS/JS，建议按顺序完成。
