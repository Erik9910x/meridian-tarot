# SPEC.md — Tarot Cuabin: Full 78-Card AR Reading

> **Document type:** Implementation specification  
> **Version:** 1.0  
> **Date:** 2026-10-14  
> **Source repository:** https://github.com/Dhao1601/tarotcuabin  
> **Primary language:** Vietnamese UI; bilingual card labels (Vietnamese + English)  
> **Status:** Ready for implementation after the coding agent completes a full repository clone and audit.

---

## 0. Instructions to the Implementing Agent

You are taking over an existing Tarot AR web experience. **Modify the existing project; do not replace it with an unrelated tarot template.** The objective is to retain the original hand-tracking / AR card-picking concept, complete the deck, and add a clear three-phase question → draw → reading flow.

Before writing code:

1. Clone `https://github.com/Dhao1601/tarotcuabin.git`.
2. Inspect the complete file tree, repository settings where accessible, all HTML/CSS/JS files, image assets, commit history if useful, and deployment configuration.
3. Confirm whether files/assets referenced by `index.html` (including `back.png` and `sparkle.png`) exist and work. Do not infer repository completeness from the README alone.
4. Run or serve the original version over localhost and record baseline behavior. Camera permission requires a secure context in normal browser deployment; localhost is suitable for local testing.
5. Read and apply the current Impeccable frontend-design skill. Use the supported installation method for the active coding tool; current docs are at https://impeccable.style/docs/ and the upstream source is https://github.com/pbakaus/impeccable. If the environment supports commands, use the recommended install/init flow and apply appropriate commands such as `init`, `shape`, `polish`, `audit`, `harden`, `animate`, and `adapt`. If the tool cannot install/run the skill, apply its design principles explicitly and state that the command was not run.
6. Implement only after the audit. Keep existing functioning AR behavior unless a change is required for the 78-card experience, safety, reliability, or the specified flow.

Do not claim a test passed unless it was actually run. If a capability cannot be verified locally (camera hardware, deployed AI API, external image availability), mark it as unverified and explain the manual test needed.

### Initial source review already performed

The repository's default branch is `main`. The GitHub connector allowed inspection of the root `README.md` and `index.html`. The README is minimal (`# tarotcuabin`, `tiktok: binnanee`). The accessible `index.html` is a standalone vanilla HTML/CSS/JavaScript experience titled **“Tarot AR - Faster Scroll”**. It loads Three.js r128, Tween.js 18.6.4, and MediaPipe `camera_utils`, `control_utils`, and `hands.js` from CDNs. It uses a Three.js card carousel/orbit, pinching through MediaPipe hand landmarks, mouse selection as a fallback, an animated star field/particle effect, and a result modal.

The visible `TAROT_DATA` array contains **16 entries**, not 78. They are The Fool, The Magician, The High Priestess, The Empress, The Emperor, The Lovers, The Chariot, The Hermit, Wheel of Fortune, Death, The Devil, The Tower, The Star, The Moon, The Sun, and The World. The missing six Major Arcana are The Hierophant, Strength, Justice, The Hanged Man, Temperance, and Judgement; all 56 Minor Arcana are absent.

The accessible source also shows these implementation risks to verify and address:

- Card IDs are assigned from the array index after the deck is shuffled; identifiers are therefore not stable.
- `cardCount` is derived from the incomplete deck, so the carousel silently contains only those 16 entries.
- Card images are loaded from remote Wikimedia URLs at runtime; failures and load progress need handling.
- `back.png` and `sparkle.png` are referenced as local assets, but their existence must be confirmed from the full cloned tree.
- Camera start is initiated without a robust user-facing permission/error path.
- The result is currently static card meanings; there is no question form or real AI reading request.
- Result markup is built using `innerHTML`. AI-generated text must never be inserted as unsanitized HTML.
- Rendering 78 full-size cards at the existing 16-card orbit settings will cause serious overlap. The spatial layout and hit-testing must be recalibrated for 78 cards.

**Access limitation:** A direct `git clone` attempt in the specification-authoring environment failed because DNS/network access to `github.com` was unavailable. Therefore, the review above is grounded in the repository metadata and files retrievable through the GitHub connector, not a claim that every repository file has been scanned. The implementing agent must complete the full clone/tree audit before coding.

---

## 1. Product Goal

Build a complete 78-card Rider–Waite–Smith-inspired tarot reading flow that uses the existing AR-style hand interaction. The user should be able to ask a question, draw exactly three distinct cards with the original experience, send the question and selected-card context to an AI endpoint that the project owner will configure, then view a structured reading.

### Core experience

1. Enter a question.
2. Start the original AR/card-draw experience.
3. Pick three unique cards using the hand-pinch gesture, with mouse/touch fallback.
4. Send the question plus the three selected cards and their positions to the reading API.
5. Display the returned interpretation in a clean result view.

### Product principles

- Preserve the distinctive AR card-picking experience; do not remove hand tracking merely to simplify implementation.
- Support all 78 cards, not just update the displayed counter to say 78.
- Use stable card IDs and a validated canonical deck data source.
- Keep the API/model provider replaceable because the owner will connect/configure the model.
- Never fabricate a reading when the API is not configured or fails.
- Make the interface cleaner and easier to understand, especially on small screens.
- No user account or database is required for this scope.
- Do not collect or log questions unnecessarily. Do not store questions permanently by default.
- Tarot copy should be framed as reflective/interpretive guidance, not certainty or professional medical, legal, or financial advice.

### Non-goals for this iteration

- No login, account system, database, cloud sync, payment, subscription, or user profile.
- No paid tarot marketplace or unrelated features.
- No requirement to train a custom AI model.
- No guarantee that hand tracking works when camera permission is denied or the device lacks a camera; graceful fallback is required.
- No advanced reversed-card interpretation unless the code can genuinely determine and consistently represent card orientation. The initial reading uses upright meanings by default.
- No full framework migration unless the audit proves it is necessary. Prefer the existing static app plus a small API integration boundary.

---

## 2. Required Three-Phase User Flow

Model the application as an explicit state machine. The user must not be able to skip directly into a result without three selected cards and a submitted question.

### Phase 1 — Question Input

**Purpose:** Capture what the user wants to reflect on before drawing cards. AI provider configuration may be added by the owner later; do not hard-code a provider or secret into the browser.

#### UI requirements

- Show a clean first screen with a concise title, one-sentence explanation, a large question textarea, and a primary action such as **“Bắt đầu trải bài”**.
- Example placeholder: “Bạn đang muốn tìm hiểu điều gì?”
- Accept Vietnamese and other Unicode characters.
- Trim leading/trailing whitespace and reject empty input.
- Define a reasonable maximum length (recommended: 1,000 characters); show remaining/maximum characters unobtrusively.
- Disable the primary action while validation fails or a transition is in progress.
- Explain briefly that the reading is for reflection, not a guaranteed prediction.
- Do not require a login or account.
- Do not send the question to an AI provider in Phase 1. It is captured as state for the next phase.

#### Behavior

- On valid submit, preserve the trimmed question in application state and transition to Phase 2.
- If the page is refreshed during the active reading, either restore the current session from `sessionStorage` or clearly reset it; prefer restoring question and selected cards if technically safe. Do not put user questions in URL query parameters.
- Provide a way to go back and edit the question before drawing. Once the three-card submission has started, retain the submitted question and cards for retries.
- Do not write a user's question to server logs or analytics.

#### Acceptance criteria

- Empty/whitespace-only questions cannot start a reading.
- A valid Vietnamese question survives the transition to Phase 2 without corruption.
- Clicking start once does not create duplicate sessions or duplicate transitions.

### Phase 2 — Original AR Draw: Select Three Cards

**Purpose:** Preserve the original hands-on AR experience and select three unique cards from the full 78-card deck.

#### Preserve and complete the original interaction

- Keep the original Three.js scene, card spin/orbit concept, card reveal animation, hand cursor/pinch interaction, selected-card animation, and count indicator where feasible.
- Use the full 78-card dataset as the only source of truth for the visible deck.
- Shuffle a copy of the data for each new draw. Do not mutate the canonical 78-card array.
- Every card must have a stable ID that never depends on shuffled array position.
- A card can only be selected once. Exactly three distinct IDs must be selected.
- Assign positions by selection order: first = **Quá khứ (Past)**, second = **Hiện tại (Present)**, third = **Tương lai (Future)**. These positional meanings must also be sent to the API.
- Show a clear progress indicator (e.g. `0/3`, `1/3`, `2/3`, `3/3`) and a simple instruction that adapts to input mode.
- After the third card completes its selection animation, prevent further picks and transition to the API loading state exactly once.
- The original three-card visual arrangement must still fit viewport dimensions and not overlap the question/status controls.

#### Layout for 78 cards

The original orbit was configured for a much smaller array. Recalculate the carousel/fan/ring spacing for 78 visible meshes. Choose a practical strategy after testing:

- a multi-lane elliptical orbit / curved carousel, or
- a fan/rail layout that preserves the 3D, hand-controlled rotation concept, or
- another compact layout that gives each card a selectable hit area without making all 78 cards unreadable.

Do not simply leave the original radius and card dimensions unchanged. At 78 cards they will overlap and raycasting will select cards behind other cards unpredictably. Validate actual visual spacing and pinch/click hit testing on desktop and mobile aspect ratios. If the implementation groups cards into lanes, the user must still be able to access all 78 cards using the same core interaction.

#### Input and camera behavior

- Request camera access after an explicit user action, with clear context explaining why it is needed.
- Catch rejected `getUserMedia`/MediaPipe camera startup promises.
- Provide a readable camera-denied/unavailable state and keep mouse/touch card selection available.
- Use pointer/touch-friendly controls without double-selecting from both mouse and pinch events.
- Debounce or gate pinch selection so one sustained pinch triggers one pick, then requires release before another pick.
- If MediaPipe CDN/model loading fails, do not leave the user stuck on a loading overlay; provide fallback controls and a retry option.
- Do not start multiple camera loops or duplicate animation loops after retry/restart.
- Stop camera tracks and release resources when the user exits/restarts the AR phase if the page lifecycle permits it.
- Require HTTPS in deployed environments and explain that camera access may not work from an insecure non-local origin.

#### Selection state to retain

For each selected card retain:

- `cardId` (stable unique ID)
- `nameEn`
- `nameVi`
- `arcana` (`major` or `minor`)
- `suit` where applicable
- `rank` / number where applicable
- `uprightMeaning`
- `position` (`past`, `present`, `future`)
- `orientation` (`upright` for the initial version)
- selected order / timestamp if useful for debugging

Do not rely only on the index of a card mesh. The selected state must remain correct after shuffle, mesh movement, responsive recalculation, and retry.

#### Submit to reading API after the third card

Once all three cards are selected and their animations finish:

1. Freeze further card selection.
2. Build one immutable reading request containing the user's original question and all three selected-card records.
3. Submit exactly once to the reading API.
4. Transition to Phase 3 loading state.
5. If the API call fails, keep the question and three cards selected so the user can retry without redrawing.

Do not send only opaque IDs if the AI endpoint has no reliable deck lookup. Send stable IDs plus names, positions, and the card's curated upright meaning. Do not send image binary data; card image URLs are not needed for text interpretation.

### Phase 3 — Reading Result

**Purpose:** Present the AI response tied explicitly to the user's question and the three cards.

#### Loading state

- Use a calm, minimal loading indicator and a short label such as “Đang kết nối các lá bài với câu hỏi của bạn…”.
- Do not block unrelated browser navigation or create an endless animation.
- Provide a cancel/back affordance only if aborting the request is supported safely; otherwise make the pending state clear.
- Prevent multiple simultaneous submissions.

#### Result layout

- Display the original question near the top in a compact, readable block.
- Show the three selected cards in order with their artwork, bilingual names, and positions: Past, Present, Future.
- Present an overall interpretation first, then each card's relationship to the question, then a synthesis showing how the three positions relate to each other.
- Finish with a practical reflection / suggested next step, not an absolute prediction.
- Make text easy to read on phone and desktop; use adequate line height and contrast.
- Provide actions: **“Trải bài mới”** and **“Thử gửi lại”** when relevant. If starting a new draw, clear old result state and question only after the user's explicit action.
- Preserve the existing selected cards and question in state if a request fails or returns malformed output.

#### Safe rendering

- Never insert AI response text into `innerHTML`.
- Render strings through `textContent` / framework-safe text nodes.
- If Markdown is supported later, use a maintained sanitizer and an explicit allow-list; do not trust raw provider HTML.
- Never interpolate the question directly into an HTML template.

---

## 3. Full Canonical 78-Card Deck

The complete deck must contain exactly 78 unique cards: 22 Major Arcana and 56 Minor Arcana (14 cards in each of four suits). Use the Rider–Waite–Smith convention already implied by the current Wikimedia card artwork. Preserve the familiar Major Arcana ordering in the current source and use Justice XI / Strength VIII to match Rider–Waite–Smith numbering.

### 3.1 Major Arcana — 22 cards

| Stable ID | English name | Vietnamese display name | Number |
|---|---|---|---:|
| `major-00-fool` | The Fool | Kẻ Khờ | 0 |
| `major-01-magician` | The Magician | Nhà Ảo Thuật | I |
| `major-02-high-priestess` | The High Priestess | Nữ Tư Tế | II |
| `major-03-empress` | The Empress | Hoàng Hậu | III |
| `major-04-emperor` | The Emperor | Hoàng Đế | IV |
| `major-05-hierophant` | The Hierophant | Giáo Hoàng | V |
| `major-06-lovers` | The Lovers | Những Người Yêu | VI |
| `major-07-chariot` | The Chariot | Cỗ Xe | VII |
| `major-08-strength` | Strength | Sức Mạnh | VIII |
| `major-09-hermit` | The Hermit | Ẩn Sĩ | IX |
| `major-10-wheel-of-fortune` | Wheel of Fortune | Bánh Xe Số Phận | X |
| `major-11-justice` | Justice | Công Lý | XI |
| `major-12-hanged-man` | The Hanged Man | Người Treo Ngược | XII |
| `major-13-death` | Death | Chuyển Hóa (Death) | XIII |
| `major-14-temperance` | Temperance | Tiết Chế | XIV |
| `major-15-devil` | The Devil | Ác Quỷ | XV |
| `major-16-tower` | The Tower | Tòa Tháp | XVI |
| `major-17-star` | The Star | Ngôi Sao | XVII |
| `major-18-moon` | The Moon | Mặt Trăng | XVIII |
| `major-19-sun` | The Sun | Mặt Trời | XIX |
| `major-20-judgement` | Judgement | Phán Quyết | XX |
| `major-21-world` | The World | Thế Giới | XXI |

### 3.2 Suit of Wands — 14 cards

| Stable ID | English name | Vietnamese display name |
|---|---|---|
| `wands-ace` | Ace of Wands | Át Gậy |
| `wands-02` | Two of Wands | Hai Gậy |
| `wands-03` | Three of Wands | Ba Gậy |
| `wands-04` | Four of Wands | Bốn Gậy |
| `wands-05` | Five of Wands | Năm Gậy |
| `wands-06` | Six of Wands | Sáu Gậy |
| `wands-07` | Seven of Wands | Bảy Gậy |
| `wands-08` | Eight of Wands | Tám Gậy |
| `wands-09` | Nine of Wands | Chín Gậy |
| `wands-10` | Ten of Wands | Mười Gậy |
| `wands-page` | Page of Wands | Tiểu Đồng Gậy |
| `wands-knight` | Knight of Wands | Kỵ Sĩ Gậy |
| `wands-queen` | Queen of Wands | Nữ Hoàng Gậy |
| `wands-king` | King of Wands | Vua Gậy |

### 3.3 Suit of Cups — 14 cards

| Stable ID | English name | Vietnamese display name |
|---|---|---|
| `cups-ace` | Ace of Cups | Át Cốc |
| `cups-02` | Two of Cups | Hai Cốc |
| `cups-03` | Three of Cups | Ba Cốc |
| `cups-04` | Four of Cups | Bốn Cốc |
| `cups-05` | Five of Cups | Năm Cốc |
| `cups-06` | Six of Cups | Sáu Cốc |
| `cups-07` | Seven of Cups | Bảy Cốc |
| `cups-08` | Eight of Cups | Tám Cốc |
| `cups-09` | Nine of Cups | Chín Cốc |
| `cups-10` | Ten of Cups | Mười Cốc |
| `cups-page` | Page of Cups | Tiểu Đồng Cốc |
| `cups-knight` | Knight of Cups | Kỵ Sĩ Cốc |
| `cups-queen` | Queen of Cups | Nữ Hoàng Cốc |
| `cups-king` | King of Cups | Vua Cốc |

### 3.4 Suit of Swords — 14 cards

| Stable ID | English name | Vietnamese display name |
|---|---|---|
| `swords-ace` | Ace of Swords | Át Kiếm |
| `swords-02` | Two of Swords | Hai Kiếm |
| `swords-03` | Three of Swords | Ba Kiếm |
| `swords-04` | Four of Swords | Bốn Kiếm |
| `swords-05` | Five of Swords | Năm Kiếm |
| `swords-06` | Six of Swords | Sáu Kiếm |
| `swords-07` | Seven of Swords | Bảy Kiếm |
| `swords-08` | Eight of Swords | Tám Kiếm |
| `swords-09` | Nine of Swords | Chín Kiếm |
| `swords-10` | Ten of Swords | Mười Kiếm |
| `swords-page` | Page of Swords | Tiểu Đồng Kiếm |
| `swords-knight` | Knight of Swords | Kỵ Sĩ Kiếm |
| `swords-queen` | Queen of Swords | Nữ Hoàng Kiếm |
| `swords-king` | King of Swords | Vua Kiếm |

### 3.5 Suit of Pentacles — 14 cards

| Stable ID | English name | Vietnamese display name |
|---|---|---|
| `pentacles-ace` | Ace of Pentacles | Át Xu |
| `pentacles-02` | Two of Pentacles | Hai Xu |
| `pentacles-03` | Three of Pentacles | Ba Xu |
| `pentacles-04` | Four of Pentacles | Bốn Xu |
| `pentacles-05` | Five of Pentacles | Năm Xu |
| `pentacles-06` | Six of Pentacles | Sáu Xu |
| `pentacles-07` | Seven of Pentacles | Bảy Xu |
| `pentacles-08` | Eight of Pentacles | Tám Xu |
| `pentacles-09` | Nine of Pentacles | Chín Xu |
| `pentacles-10` | Ten of Pentacles | Mười Xu |
| `pentacles-page` | Page of Pentacles | Tiểu Đồng Xu |
| `pentacles-knight` | Knight of Pentacles | Kỵ Sĩ Xu |
| `pentacles-queen` | Queen of Pentacles | Nữ Hoàng Xu |
| `pentacles-king` | King of Pentacles | Vua Xu |

### 3.6 Required card data schema

Store the deck in one canonical data module/file (for example `tarot-cards.js` or `data/tarot-cards.json`) and load it both for the AR scene and the reading payload. Do not maintain separate, drifting card lists for the UI and AI.

Recommended shape:

```json
{
  "id": "major-00-fool",
  "number": 0,
  "nameEn": "The Fool",
  "nameVi": "Kẻ Khờ",
  "arcana": "major",
  "suit": null,
  "rank": null,
  "image": "/assets/tarot/major-00-fool.webp",
  "backImage": "/assets/tarot/card-back.webp",
  "meaningUpright": "Một đoạn diễn giải ngắn, có ý nghĩa và được viết bằng tiếng Việt.",
  "keywords": ["khởi đầu", "tự do", "tin tưởng"]
}
```

This is a schema example, not the complete data record for every card. All 78 entries must have complete values, not placeholder meanings.

Required fields:

- `id`: unique, stable, URL-safe identifier.
- `nameEn`, `nameVi`: non-empty names.
- `arcana`: `major` or `minor`.
- `suit`: `wands`, `cups`, `swords`, `pentacles`, or `null` for Major Arcana.
- `rank` and/or `number`: meaningful consistent rank data.
- `image`: real artwork path/URL that loads.
- `meaningUpright`: a curated Vietnamese upright meaning, at minimum one useful sentence or a concise but substantive phrase.
- `keywords`: ideally 3–5 Vietnamese keywords for prompt grounding and compact UI.

`meaningReversed` may be included if a trustworthy, consistent dataset is available, but it is not required for this MVP. Do not claim a card is reversed because a mesh happens to rotate during its animation. All cards use `orientation: "upright"` unless reversal is intentionally implemented and tested.

### 3.7 Artwork and asset requirements

- Provide working artwork for **every one of the 78 cards**, not merely a name in the array.
- Prefer a local asset directory such as `assets/tarot/` or `public/assets/tarot/` depending on the chosen static structure. Local assets reduce hotlink failures and make loading predictable.
- Use consistent image dimensions/aspect ratio and a single consistent deck style (the existing source implies Rider–Waite–Smith).
- Verify each asset's availability and license/source before committing it. Do not assume every image found online has the same license. Retain required attribution where applicable.
- Optimize images to an appropriate compressed format/size without damaging legibility. Keep a shared card-back texture; do not create 78 duplicate copies of the same back image.
- Include a loading placeholder and an explicit per-card fallback if an image fails. One missing image must not crash the entire Three.js scene.
- If retaining external URLs for any assets, set image load/error callbacks and make the UI resilient when the user's network blocks the host.
- Verify any existing `back.png` / `sparkle.png` files in the cloned tree. If missing, replace with a local generated asset or a valid asset path rather than leaving a broken request.

---

## 4. Stable Deck and Draw Logic

### 4.1 Deck invariants

At initialization and in development/test mode, assert:

- Total card count is exactly 78.
- 22 cards have `arcana === "major"`.
- 56 cards have `arcana === "minor"`.
- Each of the four suits has exactly 14 cards.
- Every `id` is unique.
- Every card has a name, meaning and valid image path.
- Each new draw yields three unique IDs.

The visible progress counter should be based on selected cards (`0/3` to `3/3`), not the number of cards in the underlying deck.

### 4.2 Shuffle behavior

Use Fisher–Yates or another unbiased shuffle on a copied array. Do not mutate the canonical dataset, and do not use the shuffled index as `cardId`. Every mesh should carry the stable `card.id` in its `userData`.

### 4.3 Selection race prevention

Use a single selection gate/state transition to prevent double-triggering from concurrent mouse, touch, and pinch inputs. The pick operation must be atomic:

- Ignore picks if a card animation is already in progress.
- Ignore a card already picked.
- Ignore all picks after the third card.
- Update the selected-card state once, only after the selection is accepted.
- Invoke the reading request once after the third accepted pick and completion of its transition.

### 4.4 WebGL and animation performance

- Use a `THREE.LoadingManager` or equivalent to track loading and failed assets.
- Reuse shared materials/textures when possible; avoid creating duplicate card-back textures per card.
- Avoid 78 simultaneous unbounded image loads if it harms mobile performance; use a controlled preload strategy, lightweight placeholders, or progressive loading.
- Handle WebGL initialization failure with a clear message and an accessible non-AR fallback for drawing three cards.
- Recalculate camera aspect/projection and carousel layout on resize/orientation change.
- Limit device pixel ratio on lower-end devices as the current source already attempts to do.
- Prevent multiple `requestAnimationFrame` loops after restart.
- Dispose of no-longer-needed geometries, textures and materials when the deck is rebuilt.
- Avoid creating long-running animations for offscreen/nonessential UI.

---

## 5. AI Reading Integration Boundary

The owner will connect the actual AI provider/model. Build a clean API contract and a provider adapter seam; do not embed an actual secret or hardcode one provider throughout the UI.

### 5.1 Client/server boundary

Preferred deployment target remains compatible with the current static website. If Vercel is used, a small serverless endpoint such as `POST /api/reading` can keep the provider key server-side without forcing a complete Next.js migration.

- Client sends the question and structured card context to the endpoint.
- Server validates the request, constructs the prompt, calls the configured model provider, validates/normalizes the response, and returns safe structured data.
- Provider credentials belong only in server-side environment variables (for example `AI_API_KEY` and `AI_MODEL`, with actual names documented during implementation).
- Never commit `.env` secrets or expose them in front-end JavaScript.
- If the owner has not yet configured the AI provider, show a clear **“Chưa cấu hình API đọc bài”** state and preserve the question/cards. Do not display fabricated AI text in production.
- A mock adapter is permitted only for local tests/development and must be visibly labeled as mock output. It must never silently substitute for real AI in production.

If a serverless endpoint is outside the intended deployment environment, document the alternative and its security trade-offs before changing the architecture. A browser-only API call that exposes a secret is not an acceptable default.

### 5.2 Request contract

Endpoint: `POST /api/reading`  
Content type: `application/json`

Example request:

```json
{
  "schemaVersion": "1.0",
  "language": "vi",
  "question": "Mình nên chú ý điều gì trong giai đoạn sắp tới?",
  "spread": "past-present-future",
  "cards": [
    {
      "id": "major-09-hermit",
      "nameEn": "The Hermit",
      "nameVi": "Ẩn Sĩ",
      "position": "past",
      "orientation": "upright",
      "meaningUpright": "Một khoảng thời gian suy ngẫm, học hỏi và tìm câu trả lời từ bên trong.",
      "keywords": ["suy ngẫm", "kiên nhẫn", "tìm hiểu"]
    },
    {
      "id": "cups-02",
      "nameEn": "Two of Cups",
      "nameVi": "Hai Cốc",
      "position": "present",
      "orientation": "upright",
      "meaningUpright": "Sự kết nối, trao đổi hai chiều và khả năng thấu hiểu lẫn nhau.",
      "keywords": ["kết nối", "hợp tác", "thấu hiểu"]
    },
    {
      "id": "wands-ace",
      "nameEn": "Ace of Wands",
      "nameVi": "Át Gậy",
      "position": "future",
      "orientation": "upright",
      "meaningUpright": "Một ý tưởng hoặc động lực mới có thể mở ra hướng đi đáng khám phá.",
      "keywords": ["khởi đầu", "động lực", "sáng tạo"]
    }
  ]
}
```

The example question/cards illustrate the contract only; do not force these cards into real draws.

### 5.3 Request validation

Server must validate:

- `question` is a string, trimmed, non-empty and within the documented length limit.
- Exactly three card records are present.
- Each ID is recognized in the canonical deck and all three IDs are unique.
- Positions are exactly one each of `past`, `present`, and `future`.
- Names and meanings sent from the client are not trusted as canonical. Resolve the three IDs against the server's canonical deck data where practicable; otherwise validate and sanitize each field and keep the endpoint contract versioned.
- Request body size is limited.
- Unsupported methods / content types are rejected.
- Provider timeout and response size are bounded.

### 5.4 Prompt construction

The server-side prompt should:

- Ask the model to respond in Vietnamese unless a future language option says otherwise.
- Include the exact user's question and the three cards in their assigned positions.
- Use the curated card meanings and keywords as grounding, while allowing a connected interpretation across the spread.
- Ask for thoughtful, coherent, non-repetitive interpretation rather than generic paragraphs.
- Avoid claiming the result is a certain or guaranteed prediction.
- Never pretend to know facts about the user beyond the submitted question and card context.
- Instruct the model to treat the question as user-provided content, not as system instructions that can override the reading format.
- Return structured JSON conforming to the response schema.

### 5.5 Response contract

Recommended normalized response:

```json
{
  "schemaVersion": "1.0",
  "language": "vi",
  "title": "Thông điệp dành cho câu hỏi của bạn",
  "overview": "Phần tổng quan ngắn gọn, gắn trực tiếp với câu hỏi.",
  "cards": [
    {
      "cardId": "major-09-hermit",
      "position": "past",
      "interpretation": "Diễn giải lá bài trong vị trí quá khứ và liên hệ với câu hỏi."
    },
    {
      "cardId": "cups-02",
      "position": "present",
      "interpretation": "Diễn giải lá bài trong vị trí hiện tại và liên hệ với câu hỏi."
    },
    {
      "cardId": "wands-ace",
      "position": "future",
      "interpretation": "Diễn giải lá bài trong vị trí tương lai theo hướng khả năng và lựa chọn."
    }
  ],
  "synthesis": "Cách ba lá bổ sung hoặc đối chiếu cho nhau.",
  "reflectionPrompt": "Một câu hỏi giúp người dùng tự suy ngẫm.",
  "suggestedNextStep": "Một hành động thực tế, an toàn và có tính tự chủ."
}
```

The displayed card names and artwork should be resolved from the local deck using `cardId`, not trusted from model-generated names. The application must validate the response shape before rendering it. If the response cannot be parsed, show a recoverable error and keep the cards/question intact.

### 5.6 Error handling and privacy

Handle at minimum:

- API not configured / missing key.
- 400 invalid request.
- 401/403 provider credentials or permission error.
- 408/timeout.
- 429 rate limit / quota reached.
- 5xx provider or serverless failure.
- Network disconnect / offline.
- Malformed or incomplete model output.
- User retries while a request is already running.

Show a concise Vietnamese explanation and a retry action. Retrying must reuse the same payload and must not redraw cards. A retry must not create duplicate result cards or duplicate API submissions accidentally.

Do not save questions or readings to a remote database. Do not log full questions, prompts or readings in server logs. The endpoint should have basic rate/abuse controls that do not require a user database. Be transparent that an AI request sends the question and three card descriptions to the configured provider.

---

## 6. UI/UX Direction — Clean, Minimal, Intentional

Use the Impeccable skill as a design-review method, not as permission to invent an unrelated visual direction. Keep the original immersive dark AR scene but simplify surrounding UI.

### 6.1 Visual language

- Primary palette: near-black, white, and a restrained range of neutral grays. Gold may appear only as a subtle tarot-specific accent if it already exists and supports hierarchy; do not turn the interface into a glowing neon/gold dashboard.
- Use refined typography: readable sans-serif for controls/instructions/body text; a restrained serif may be used for the tarot title or card headings.
- Keep hierarchy strong: one main action per screen, compact support copy, predictable placement.
- Avoid oversized modal padding, crowded controls, excessive border/shadow/glow, nested cards, ornamental separators everywhere, and generic template layouts.
- Keep the card artwork as the visual focus during Phase 2.
- Make the result phase much easier to read than the current modal, especially on phones.

### 6.2 Phase-specific UI

**Question input:** centered and calm; textarea and start action are obvious. Keep the first screen low-clutter and responsive.

**AR draw:** full-screen scene, small progress counter, one concise instruction line, subtle cursor, and accessible camera/fallback controls. UI overlays must not block intended card selection.

**Loading:** compact and unobtrusive; no endless decorative loading effect.

**Reading result:** scrollable content with clear separation among overview, three card interpretations, synthesis and reflection. On mobile, cards may become a vertical stack; on desktop, use a clean three-card row where it fits.

### 6.3 Motion and interaction

- Use a consistent easing/duration system. Prefer purposeful transform/opacity animation and avoid animating layout-heavy properties where possible.
- Keep the existing card reveal but ensure animations complete and state transitions occur once.
- Remove or reduce decorative effects if they reduce card selection accuracy or mobile frame rate.
- Respect `prefers-reduced-motion` with reduced or skipped nonessential transitions.
- Provide visible keyboard focus, accessible labels, sufficient contrast and usable touch targets.
- On smaller viewports, prevent the result modal/panel from overflowing horizontally; use `max-height`, internal scrolling and sensible padding.
- Do not rely on hover alone for important controls.

### 6.4 Impeccable workflow

Use the skill to:

1. `init`: define the product and audience based on this spec and the existing AR experience.
2. `shape`: review the three-screen information architecture and user flow before final polish.
3. `polish`: reduce visual noise and fix hierarchy/spacing.
4. `adapt`: review phone, tablet and desktop layouts.
5. `animate`: improve card and state-transition motion without sacrificing responsiveness.
6. `harden` and `audit`: verify empty/error/loading states, accessibility and edge cases.

Run only the supported commands in the actual environment. If command availability differs, use equivalent review steps without claiming the tool ran.

---

## 7. Suggested Project Structure

The source currently appears to be a small static project. Do not force a large framework migration. A reasonable minimal refactor may be:

```text
/
├── index.html
├── styles.css                 # if separating styles improves maintainability
├── js/
│   ├── app.js                 # phase state machine and screen navigation
│   ├── tarot-data.js           # canonical, validated 78-card deck
│   ├── tarot-ar.js             # Three.js / MediaPipe integration
│   ├── reading-api.js         # API client and response validation
│   └── reading-view.js        # safe rendering of the reading response
├── assets/
│   └── tarot/
│       ├── card-back.webp
│       └── ...                 # all 78 verified card images
├── api/
│   └── reading.js             # optional Vercel serverless endpoint
└── README.md                  # setup, configuration, camera requirements
```

This is a proposal, not a mandate to split every function into many files. If the repository's actual tree reveals an existing structure, follow the project's conventions and document the final structure. If using ES modules in a static app, ensure it is served through a local web server rather than opened as `file://`.

Keep the front end usable with the AI endpoint unconfigured: it should still let the user enter a question and draw three cards, then show a clear API-not-configured state when it reaches the reading step. For test/dev, a mock response can exercise the UI, but it must be visually marked and must never masquerade as a real reading in production.

---

## 8. Acceptance Criteria

### 8.1 Deck correctness

- [ ] Exactly 78 unique cards load.
- [ ] Exactly 22 Major Arcana entries exist.
- [ ] Exactly 56 Minor Arcana entries exist.
- [ ] Each of Wands, Cups, Swords, Pentacles contains 14 entries.
- [ ] Every entry has a stable unique ID, English name, Vietnamese display name, upright meaning and functioning card artwork.
- [ ] No duplicate IDs and no missing referenced assets.
- [ ] Shuffling does not mutate or corrupt the canonical data.

### 8.2 Phase 1

- [ ] Question form renders cleanly on desktop and mobile.
- [ ] Empty input and whitespace-only input are rejected.
- [ ] Valid Vietnamese and Unicode questions remain intact through Phase 2.
- [ ] No API request occurs before the third card has been selected.

### 8.3 Phase 2 / AR

- [ ] Existing card spinning/orbit and card-pick animation still work.
- [ ] All 78 cards can be accessed; cards are not so overlapped that selection becomes unreliable.
- [ ] Hand pinch selects a single card per pinch action.
- [ ] Mouse and touch fallback work without camera permission.
- [ ] Selected cards are unique and selection order reliably maps to Past, Present, Future.
- [ ] The counter advances exactly once per picked card.
- [ ] After 3/3, further picks are blocked and the API submission fires once.
- [ ] Camera denied, camera missing, CDN failure, and WebGL initialization failure produce recoverable UI, not a blank/stuck page.

### 8.4 API and Phase 3

- [ ] Request contains question, all three stable IDs, names, meanings, and positions.
- [ ] Server validates input and never exposes provider API secrets to the browser.
- [ ] No fake AI reading appears in production when no provider is configured.
- [ ] Valid response displays overview, each card interpretation, synthesis and reflection prompt.
- [ ] Malformed response/network/timeout/rate-limit errors show useful feedback and preserve the question/cards.
- [ ] Retry uses the same three cards and does not start another draw.
- [ ] AI output is rendered as text/sanitized Markdown, not unsanitized `innerHTML`.
- [ ] “Trải bài mới” correctly resets state and releases camera resources.

### 8.5 Design quality

- [ ] Clean, minimal Vietnamese UI consistent across all three phases.
- [ ] Result view is scrollable and readable on 360px-wide phones.
- [ ] Card artwork and important controls retain sufficient contrast.
- [ ] Keyboard users can reach buttons/input and see focus indication.
- [ ] Reduced-motion preference is honored.
- [ ] No visible horizontal overflow at tested viewport sizes.
- [ ] Impeccable review was run if supported, or the manual equivalent was documented.

---

## 9. Test Plan

At minimum, add a lightweight automated deck validation test or an explicit executable validation script. If no test framework exists, do not introduce a heavyweight test stack just for this small app; a Node script or browser test is acceptable.

| Test ID | Scenario | Expected result |
|---|---|---|
| `DECK-001` | Load canonical deck | Count is 78 |
| `DECK-002` | Count Major Arcana | Exactly 22 |
| `DECK-003` | Count Minor suits | Four suits × 14 cards |
| `DECK-004` | Validate IDs | All IDs unique and stable |
| `DECK-005` | Validate card data | All required fields populated |
| `ASSET-001` | Check all card images | All 78 artwork paths resolve or have a known fallback |
| `FLOW-001` | Submit blank question | Stays on Phase 1 and shows validation |
| `FLOW-002` | Submit a valid Vietnamese question | Transitions to Phase 2 and retains the question |
| `AR-001` | Deny camera permission | Mouse/touch fallback remains usable |
| `AR-002` | Select one card by pinch | Counter advances once |
| `AR-003` | Keep pinching without releasing | Must not select multiple cards |
| `AR-004` | Select three cards | Three distinct IDs; correct Past/Present/Future order |
| `API-001` | Select third card with API configured | One request contains question and three card records |
| `API-002` | API not configured | Clear message; selected cards remain |
| `API-003` | API returns 429/500 or times out | Recoverable error and retry action |
| `API-004` | Retry after API failure | Same question and same cards are resent |
| `READ-001` | Valid structured response | Result sections render in correct order |
| `READ-002` | Provider returns malformed JSON | Safe error; no crash; selection remains |
| `SEC-001` | AI text contains HTML-like strings | Displayed as text, no script/markup execution |
| `RESP-001` | Phone width / portrait orientation | No horizontal overflow; usable result view |
| `LIFE-001` | Restart reading | Old selection cleared, no duplicate animation/camera loop |

Manual smoke test on the deployed HTTPS build is required for actual camera permission, MediaPipe loading, hand tracking, card interaction and Vercel API behavior.

---

## 10. Implementation Order

1. **Repository audit:** Clone, inspect complete tree and assets, run the original version, record current baseline and confirmed issues.
2. **Deck completion:** Add 78 stable records, bilingual names, meaningful Vietnamese upright interpretations and verified artwork. Add count/uniqueness validation.
3. **AR compatibility:** Adjust spatial layout for 78 cards; verify hit testing, pinch gating, resize behavior, camera fallback and cleanup.
4. **Phase 1 question UI:** Add validation and state persistence for the active reading.
5. **Phase 2 draw-to-request integration:** Build the payload after the third unique card and submit once. Preserve cards/question on failure.
6. **Phase 3 result UI:** Parse/validate response, render safe structured text, loading/error/retry/new-reading states.
7. **AI provider seam:** Add API contract/serverless adapter without hardcoded secrets. Make unconfigured state explicit until the owner connects a model.
8. **Impeccable clean-up:** Review visual hierarchy, responsive behavior, motion, accessibility and empty/error states.
9. **QA and handoff:** Run deck tests, build/lint commands if available, browser smoke tests and document remaining environment-dependent checks.

Do not stop after the UI looks right. Complete the deck validation and end-to-end state-flow checks.

---

## 11. Definition of Done

The work is complete only when:

- The repository has been cloned and its full tree inspected by the implementing agent.
- The deck has exactly 78 usable and unique cards with verified artwork and non-placeholder meanings.
- The original AR draw interaction remains functional, with fallback paths when camera/hand tracking is unavailable.
- The three phases work end-to-end and preserve state correctly.
- Selecting the third card constructs the request from the original question plus the three actual selected cards and their positions.
- API provider configuration is isolated and secrets are not shipped to the browser.
- Result state handles loading, error, retry and new draw without losing the current selection unexpectedly.
- The interface has received a clean-up pass guided by Impeccable principles and passes responsive/accessibility checks.
- Acceptance checks are executed and outcomes are reported honestly.
- README/setup instructions document local serving, HTTPS/camera permission, assets and AI API configuration.

## 12. Reference Links

- Source repository: https://github.com/Dhao1601/tarotcuabin
- Existing main HTML (inspect current branch before edits): https://github.com/Dhao1601/tarotcuabin/blob/main/index.html
- Impeccable design skill: https://github.com/pbakaus/impeccable
- Impeccable documentation: https://impeccable.style/docs/
- Three.js documentation: https://threejs.org/docs/
- MediaPipe Hand Landmarker / web guidance: https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker/web_js
- Vercel Functions documentation: https://vercel.com/docs/functions
- YouTube / camera deployment should be tested on HTTPS; browser API permission and model-loading behavior must be confirmed in the target browsers.

---

**Final instruction:** Implement the existing Tarot Cuabin project in place according to this document. Prioritize correctness of all 78 cards, reliable three-card AR selection, request integrity, and a clear reading result. Keep the visual experience clean and preserve the original product concept. Do not fabricate successful tests, card assets, AI responses, or API configuration.
