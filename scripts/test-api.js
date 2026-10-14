const handler = require('../api/reading.js');

const mockReq = {
  method: 'POST',
  body: {
    question: 'Tôi muốn biết hướng phát triển sự nghiệp sắp tới của mình?',
    cards: [
      {
        id: 'major-00-fool',
        nameEn: 'The Fool',
        nameVi: 'Kẻ Khờ',
        position: 'past',
        meaningUpright: 'Khởi đầu mới đầy tự do, tin tưởng dấn thân.',
        keywords: ['khởi đầu', 'tự do', 'dấn thân']
      },
      {
        id: 'wands-ace',
        nameEn: 'Ace of Wands',
        nameVi: 'Át Gậy',
        position: 'present',
        meaningUpright: 'Tia lửa nhiệt huyết và ý tưởng sáng tạo mới.',
        keywords: ['nhiệt huyết', 'ý tưởng', 'sáng tạo']
      },
      {
        id: 'pentacles-10',
        nameEn: 'Ten of Pentacles',
        nameVi: 'Mười Xu',
        position: 'future',
        meaningUpright: 'Thịnh vượng bền vững lâu dài, thành tựu vững chãi.',
        keywords: ['thịnh vượng', 'bền vững', 'thành tựu']
      }
    ]
  }
};

const mockRes = {
  statusCode: 200,
  headers: {},
  setHeader(k, v) { this.headers[k] = v; },
  end(content) {
    console.log('Status Code:', this.statusCode);
    console.log('Headers:', this.headers);
    console.log('Response Body:\n', JSON.stringify(JSON.parse(content), null, 2));
  }
};

console.log('Testing /api/reading handler...');
handler(mockReq, mockRes).catch(err => console.error('Handler error:', err));
