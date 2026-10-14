/**
 * Meridian Tarot — Reading View Renderer
 * Editorial engraved design conforming to Meridian aesthetic (Fraunces + Inter)
 * Includes top-right Support Me button, support modal popup, and safe text rendering
 */

const ReadingView = {
  renderLoading(containerEl, message) {
    containerEl.innerHTML = '';

    const wrap = document.createElement('div');
    wrap.className = 'reading-loading-state';

    const spinner = document.createElement('div');
    spinner.className = 'mystic-compass-spinner';
    spinner.innerHTML = `
      <svg viewBox="0 0 64 64" width="48" height="48" role="img" aria-label="Compass spinner">
        <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" stroke-width="2" />
        <circle cx="32" cy="32" r="25" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.4" />
        <g stroke="currentColor" stroke-width="1.2" fill="currentColor">
          <path d="M32 8 L35.5 28.5 L32 32 Z" />
          <path d="M56 32 L35.5 35.5 L32 32 Z" />
          <path d="M32 56 L28.5 35.5 L32 32 Z" />
          <path d="M8 32 L28.5 28.5 L32 32 Z" />
        </g>
      </svg>
    `;

    const text = document.createElement('div');
    text.className = 'loading-title';
    text.textContent = message || 'Đang gửi năng lượng 3 lá bài tới trí tuệ nhân tạo...';

    const sub = document.createElement('div');
    sub.className = 'loading-subtitle';
    sub.textContent = 'Trí tuệ vũ trụ đang lắng nghe và soi tỏ lời giải đáp cho câu hỏi của bạn.';

    wrap.appendChild(spinner);
    wrap.appendChild(text);
    wrap.appendChild(sub);
    containerEl.appendChild(wrap);
  },

  renderError(containerEl, errorMessage, onRetry) {
    containerEl.innerHTML = '';

    const wrap = document.createElement('div');
    wrap.className = 'reading-error-state';

    const icon = document.createElement('div');
    icon.className = 'error-icon';
    icon.textContent = '✦';

    const title = document.createElement('h3');
    title.className = 'error-title';
    title.textContent = 'Không thể kết nối với thông điệp vũ trụ';

    const desc = document.createElement('p');
    desc.className = 'error-desc';
    desc.textContent = errorMessage || 'Đã xảy ra sự cố trong quá trình luận giải bài. Vui lòng thử lại.';

    const retryBtn = document.createElement('button');
    retryBtn.className = 'btn-meridian btn-retry';
    retryBtn.textContent = 'Thử gửi lại ✦';
    retryBtn.addEventListener('click', onRetry);

    wrap.appendChild(icon);
    wrap.appendChild(title);
    wrap.appendChild(desc);
    wrap.appendChild(retryBtn);
    containerEl.appendChild(wrap);
  },

  renderResult(containerEl, readingData, selectedCards, questionText, onRestart) {
    containerEl.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'reading-result-container';

    // 0. Top Bar: Brand left + Support Me button right
    const topBar = document.createElement('div');
    topBar.className = 'result-top-bar';

    const brandLeft = document.createElement('div');
    brandLeft.className = 'result-brand-left';
    brandLeft.innerHTML = `
      <span class="brand-compass-icon">✦</span>
      <span class="brand-wordmark">meridian tarot</span>
    `;

    const supportBtn = document.createElement('button');
    supportBtn.className = 'btn-support-me';
    supportBtn.innerHTML = `Support Me <span>✦</span>`;
    supportBtn.title = 'Ủng hộ tác giả Meridian Tarot';
    supportBtn.addEventListener('click', () => this.openSupportModal());

    topBar.appendChild(brandLeft);
    topBar.appendChild(supportBtn);
    container.appendChild(topBar);

    // 1. Question Recap
    const qBlock = document.createElement('div');
    qBlock.className = 'question-recap';

    const qLabel = document.createElement('span');
    qLabel.className = 'recap-label';
    qLabel.textContent = '✦ CÂU HỎI CỦA BẠN';

    const qText = document.createElement('p');
    qText.className = 'recap-content';
    qText.textContent = questionText;

    qBlock.appendChild(qLabel);
    qBlock.appendChild(qText);
    container.appendChild(qBlock);

    // 2. Title & Overview
    const headerBlock = document.createElement('div');
    headerBlock.className = 'reading-header-block';

    const hTitle = document.createElement('h2');
    hTitle.className = 'reading-title';
    hTitle.textContent = readingData.title || 'Thông điệp dành cho câu hỏi của bạn';

    const hOverview = document.createElement('p');
    hOverview.className = 'reading-overview';
    hOverview.textContent = readingData.overview || '';

    headerBlock.appendChild(hTitle);
    headerBlock.appendChild(hOverview);
    container.appendChild(headerBlock);

    // 3. Three Cards Grid
    const positionsMeta = [
      { key: 'past', label: 'QUÁ KHỨ', subtitle: 'Nền tảng & Căn nguyên' },
      { key: 'present', label: 'HIỆN TẠI', subtitle: 'Bối cảnh & Trạng thái' },
      { key: 'future', label: 'TƯƠNG LAI', subtitle: 'Xu hướng & Triển vọng' }
    ];

    const cardsGrid = document.createElement('div');
    cardsGrid.className = 'reading-cards-grid';

    positionsMeta.forEach((posMeta, idx) => {
      const cardObj = selectedCards[idx];
      const cardData = cardObj ? cardObj.data : null;
      if (!cardData) return;

      const aiCard = (readingData.cards || []).find(c => c.position === posMeta.key) ||
                     (readingData.cards && readingData.cards[idx]) || {};

      const cardCol = document.createElement('div');
      cardCol.className = 'reading-card-col';

      // Pos Header
      const posHeader = document.createElement('div');
      posHeader.className = 'card-col-header';

      const posTag = document.createElement('span');
      posTag.className = 'pos-tag';
      posTag.textContent = posMeta.label;

      const posSub = document.createElement('span');
      posSub.className = 'pos-sub';
      posSub.textContent = posMeta.subtitle;

      posHeader.appendChild(posTag);
      posHeader.appendChild(posSub);

      // Card Image
      const imgWrap = document.createElement('div');
      imgWrap.className = 'card-image-wrap';

      const img = document.createElement('img');
      img.src = cardData.image || 'back.png';
      img.alt = cardData.nameVi || cardData.nameEn;
      img.className = 'reading-card-img';
      img.loading = 'lazy';
      img.onerror = () => { img.src = 'back.png'; };

      imgWrap.appendChild(img);

      // Card Info
      const infoWrap = document.createElement('div');
      infoWrap.className = 'card-info-wrap';

      const nameVi = document.createElement('h3');
      nameVi.className = 'card-name-vi';
      nameVi.textContent = cardData.nameVi;

      const nameEn = document.createElement('div');
      nameEn.className = 'card-name-en';
      nameEn.textContent = cardData.nameEn;

      const interp = document.createElement('p');
      interp.className = 'card-interpretation';
      interp.textContent = aiCard.interpretation || cardData.meaningUpright || '';

      infoWrap.appendChild(nameVi);
      infoWrap.appendChild(nameEn);
      infoWrap.appendChild(interp);

      cardCol.appendChild(posHeader);
      cardCol.appendChild(imgWrap);
      cardCol.appendChild(infoWrap);

      cardsGrid.appendChild(cardCol);
    });

    container.appendChild(cardsGrid);

    // 4. Synthesis Section
    if (readingData.synthesis) {
      const synSection = document.createElement('div');
      synSection.className = 'reading-synthesis-block';

      const synTitle = document.createElement('h4');
      synTitle.className = 'synthesis-title';
      synTitle.textContent = '✦ Tổng Hòa Liên Kết Trải Bài';

      const synText = document.createElement('p');
      synText.className = 'synthesis-text';
      synText.textContent = readingData.synthesis;

      synSection.appendChild(synTitle);
      synSection.appendChild(synText);
      container.appendChild(synSection);
    }

    // 5. Reflection & Next Step Section
    if (readingData.reflectionPrompt || readingData.suggestedNextStep) {
      const guidanceGrid = document.createElement('div');
      guidanceGrid.className = 'reading-guidance-grid';

      if (readingData.reflectionPrompt) {
        const refBlock = document.createElement('div');
        refBlock.className = 'guidance-box reflection-box';

        const refTitle = document.createElement('h5');
        refTitle.textContent = '✦ Câu hỏi chiêm nghiệm';

        const refText = document.createElement('p');
        refText.textContent = readingData.reflectionPrompt;

        refBlock.appendChild(refTitle);
        refBlock.appendChild(refText);
        guidanceGrid.appendChild(refBlock);
      }

      if (readingData.suggestedNextStep) {
        const actBlock = document.createElement('div');
        actBlock.className = 'guidance-box action-box';

        const actTitle = document.createElement('h5');
        actTitle.textContent = '✦ Lời khuyên hành động';

        const actText = document.createElement('p');
        actText.textContent = readingData.suggestedNextStep;

        actBlock.appendChild(actTitle);
        actBlock.appendChild(actText);
        guidanceGrid.appendChild(actBlock);
      }

      container.appendChild(guidanceGrid);
    }

    // 6. Action Button (Restart)
    const actionRow = document.createElement('div');
    actionRow.className = 'reading-action-row';

    const restartBtn = document.createElement('button');
    restartBtn.className = 'btn-meridian btn-restart';
    restartBtn.textContent = 'Trải Bài Mới ✦';
    restartBtn.addEventListener('click', onRestart);

    actionRow.appendChild(restartBtn);
    container.appendChild(actionRow);

    containerEl.appendChild(container);
  },

  openSupportModal() {
    let modal = document.getElementById('support-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'support-modal';
      modal.className = 'support-modal-backdrop';
      modal.innerHTML = `
        <div class="support-modal-card" role="dialog" aria-modal="true">
          <button class="support-modal-close" aria-label="Đóng popup">&times;</button>
          <div class="support-modal-badge">✦ ỦNG HỘ TÁC GIẢ ✦</div>
          <h3 class="support-modal-title">Cảm Ơn Sự Đồng Hành Của Bạn</h3>
          <p class="support-modal-desc">
            Sự ủng hộ của bạn là nguồn động viên to lớn giúp <strong>Meridian Tarot</strong> duy trì chi phí máy chủ AI, vận hành ổn định và tiếp tục phát triển thêm những trải nghiệm bốc bài ý nghĩa hơn.
          </p>
          <div class="support-img-wrapper">
            <img src="support.jpg" alt="Ủng hộ tác giả Meridian Tarot" class="support-img" />
          </div>
          <div class="support-modal-note">
            Chúc bạn luôn an yên, sáng suốt và gặt hái thật nhiều phước lành trên hành trình phía trước! ✦
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('support-modal-close')) {
          modal.classList.remove('is-active');
        }
      });
    }

    // Trigger smooth fade-in
    requestAnimationFrame(() => {
      modal.classList.add('is-active');
    });
  }
};

if (typeof window !== 'undefined') {
  window.ReadingView = ReadingView;
}
