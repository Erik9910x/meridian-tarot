/**
 * Tarot Cuabin — Reading API Client
 * Sends question and selected cards to /api/reading
 * Strictly conforms to SPEC.md Section 5
 */

const ReadingAPI = {
  async fetchReading(question, selectedCards) {
    if (!question || !question.trim()) {
      throw new Error('Vui lòng nhập câu hỏi của bạn.');
    }

    if (!Array.isArray(selectedCards) || selectedCards.length !== 3) {
      throw new Error('Cần chọn đủ 3 lá bài để tiến hành giải bài.');
    }

    const payload = {
      schemaVersion: '1.0',
      language: 'vi',
      question: question.trim(),
      spread: 'past-present-future',
      cards: selectedCards.map((c, index) => {
        const positions = ['past', 'present', 'future'];
        const data = c.data;
        return {
          id: data.id,
          nameEn: data.nameEn,
          nameVi: data.nameVi,
          position: positions[index],
          orientation: 'upright',
          meaningUpright: data.meaningUpright,
          keywords: data.keywords || []
        };
      })
    };

    try {
      const response = await fetch('/api/reading', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Lỗi máy chủ (${response.status})`);
      }

      return result;
    } catch (err) {
      console.error('API Reading Error:', err);
      throw err;
    }
  }
};

if (typeof window !== 'undefined') {
  window.ReadingAPI = ReadingAPI;
}
