/**
 * Meridian Tarot — Main Application Controller
 * Coordinates:
 *   Phase 0: Meridian Landing Page (Viaduct video & engraved illustration)
 *   Phase 1: Question Input Screen
 *   Phase 2: 3D AR Card Draw (Three.js + MediaPipe)
 *   Phase 3: AI Reading Result (Claude Haiku 5.5) + Support Me Popup
 */

class TarotApp {
  constructor() {
    this.currentPhase = 0; // 0: Landing, 1: Question, 2: AR Draw, 3: Result
    this.userQuestion = '';
    this.selectedCards = [];
    this.arScene = null;
    this.latestReading = null;

    // DOM Screen Elements
    this.landingEl = document.getElementById('landing-screen');
    this.phase1El = document.getElementById('phase-1-screen');
    this.phase2El = document.getElementById('phase-2-screen');
    this.phase3El = document.getElementById('phase-3-screen');

    // Controls
    this.startTarotNowBtn = document.getElementById('start-tarot-now-btn');
    this.backToHomeBtn = document.getElementById('back-to-home-btn');
    this.questionInput = document.getElementById('question-input');
    this.charCountEl = document.getElementById('char-count');
    this.startDrawBtn = document.getElementById('start-draw-btn');

    this.counterEl = document.getElementById('counter');
    this.guideTextEl = document.getElementById('guide-text');
    this.virtualCursorEl = document.getElementById('virtual-cursor');
    this.inputVideoEl = document.getElementById('input-video');

    this.resultContainerEl = document.getElementById('result-content');

    this.init();
  }

  init() {
    // 1. Landing -> Phase 1
    if (this.startTarotNowBtn) {
      this.startTarotNowBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchPhase(1);
      });
    }

    // 2. Back to Home
    if (this.backToHomeBtn) {
      this.backToHomeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchPhase(0);
      });
    }

    // 3. Question Input Listeners
    if (this.questionInput) {
      this.questionInput.addEventListener('input', () => this._updateCharCount());
      // Restore previous question if any
      try {
        const savedQ = sessionStorage.getItem('meridian_tarot_question');
        if (savedQ) {
          this.questionInput.value = savedQ;
          this._updateCharCount();
        }
      } catch (e) {}
    }

    // 4. Start Draw Button -> Phase 2
    if (this.startDrawBtn) {
      this.startDrawBtn.addEventListener('click', () => this.handleStartDraw());
    }

    // Start at Landing Page
    this.switchPhase(0);
  }

  _updateCharCount() {
    if (!this.questionInput || !this.charCountEl) return;
    const len = this.questionInput.value.length;
    this.charCountEl.textContent = `${len}/1000`;
    if (this.startDrawBtn) {
      this.startDrawBtn.disabled = len === 0 || len > 1000;
    }
  }

  switchPhase(phaseNumber) {
    this.currentPhase = phaseNumber;

    if (this.landingEl) this.landingEl.style.display = phaseNumber === 0 ? 'flex' : 'none';
    if (this.phase1El) this.phase1El.style.display = phaseNumber === 1 ? 'flex' : 'none';
    if (this.phase2El) this.phase2El.style.display = phaseNumber === 2 ? 'block' : 'none';
    if (this.phase3El) this.phase3El.style.display = phaseNumber === 3 ? 'block' : 'none';

    if (phaseNumber === 0 || phaseNumber === 1) {
      if (this.arScene) {
        this.arScene.destroy();
        this.arScene = null;
      }
      if (phaseNumber === 1 && this.questionInput) {
        setTimeout(() => this.questionInput.focus(), 200);
      }
    } else if (phaseNumber === 2) {
      this.startPhase2();
    }
  }

  handleStartDraw() {
    const raw = this.questionInput ? this.questionInput.value.trim() : '';
    if (!raw) {
      alert('Vui lòng nhập câu hỏi của bạn trước khi bắt đầu trải bài.');
      return;
    }

    this.userQuestion = raw;
    try {
      sessionStorage.setItem('meridian_tarot_question', raw);
    } catch (e) {}

    this.switchPhase(2);
  }

  startPhase2() {
    this.selectedCards = [];
    if (this.counterEl) this.counterEl.textContent = '0 / 3';
    if (this.guideTextEl) this.guideTextEl.textContent = 'Đưa tay lên trước Camera để bắt đầu';

    // Instantiate 3D AR Scene
    this.arScene = new TarotARScene({
      container: document.getElementById('canvas-container'),
      onCardPicked: (count, cardData) => {
        if (this.counterEl) this.counterEl.textContent = `${count} / 3`;
        const positions = ['Quá khứ', 'Hiện tại', 'Tương lai'];
        const posText = positions[count - 1] || '';
        if (this.guideTextEl) {
          this.guideTextEl.textContent = `Lá bài thứ ${count} (${posText}): ${cardData.nameVi} ✦`;
        }
      },
      onStatusChange: (statusMsg) => {
        if (this.guideTextEl) this.guideTextEl.textContent = statusMsg;
      },
      onDrawComplete: (cards) => {
        this.selectedCards = cards;
        this.submitReading();
      }
    });

    // Load canonical 78 cards
    const deck = (typeof window !== 'undefined' && window.TAROT_DECK) ? window.TAROT_DECK : [];
    this.arScene.init(deck);

    // Start Camera for Hand Tracking
    this.arScene.startCamera(this.inputVideoEl, this.virtualCursorEl);
  }

  async submitReading() {
    this.switchPhase(3);
    ReadingView.renderLoading(this.resultContainerEl, 'Đang gửi năng lượng 3 lá bài tới trí tuệ nhân tạo...');

    try {
      const result = await ReadingAPI.fetchReading(this.userQuestion, this.selectedCards);
      this.latestReading = result;
      ReadingView.renderResult(
        this.resultContainerEl,
        result,
        this.selectedCards,
        this.userQuestion,
        () => this.restartReading()
      );
    } catch (err) {
      console.error('Error fetching reading:', err);
      ReadingView.renderError(
        this.resultContainerEl,
        err.message || 'Không thể liên lạc với máy chủ giải bài.',
        () => this.submitReading()
      );
    }
  }

  restartReading() {
    this.selectedCards = [];
    this.latestReading = null;
    this.switchPhase(1);
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.app = new TarotApp();
});
