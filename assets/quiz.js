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
