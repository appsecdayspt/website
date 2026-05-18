class ImageSlot extends HTMLElement {
  static get observedAttributes() { return ['shape', 'radius', 'placeholder']; }

  connectedCallback() { this._setup(); }

  _setup() {
    if (this._ready) return;
    this._ready = true;

    const shape       = this.getAttribute('shape') || 'circle';
    const radius      = this.getAttribute('radius') || '12';
    const placeholder = this.getAttribute('placeholder') || 'Add photo';

    // Inject keyframe animation once per page
    if (!document.getElementById('image-slot-css')) {
      const s = document.createElement('style');
      s.id = 'image-slot-css';
      s.textContent = `
        @keyframes is-pulse {
          0%, 100% { border-color: rgba(38,212,255,0.4); box-shadow: inset 0 0 0 0 rgba(38,212,255,0); }
          50%       { border-color: rgba(38,212,255,0.75); box-shadow: inset 0 0 24px 0 rgba(38,212,255,0.07); }
        }
        .is-ph { animation: is-pulse 2.8s ease-in-out infinite; }
        .is-ph.is-drag { background: rgba(38,212,255,0.12) !important; border-color: #26d4ff !important; animation: none; }
      `;
      document.head.appendChild(s);
    }

    // Preserve position set by the parent (e.g. React inline style position:absolute)
    // Only default to relative when the element has no explicit position yet.
    const existingPos = this.style.position;

    Object.assign(this.style, {
      display:      'block',
      overflow:     'hidden',
      cursor:       'pointer',
      flexShrink:   '0',
      borderRadius: shape === 'circle' ? '50%' : `${radius}px`,
    });

    if (!existingPos) this.style.position = 'relative';

    this.innerHTML = `
      <div class="is-ph" style="
        position:absolute;inset:0;
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        gap:14px;padding:16px;text-align:center;
        border:2px dashed rgba(38,212,255,0.4);
        border-radius:inherit;
        pointer-events:none;
      ">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style="color:rgba(38,212,255,0.75);flex-shrink:0">
          <rect x="2" y="9" width="32" height="23" rx="4" stroke="currentColor" stroke-width="1.8"/>
          <circle cx="18" cy="20.5" r="6" stroke="currentColor" stroke-width="1.8"/>
          <path d="M12.5 9l2-4h7l2 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="28" cy="14" r="1.5" fill="currentColor"/>
        </svg>
        <div style="display:flex;flex-direction:column;gap:4px;">
          <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(38,212,255,0.85);font-weight:600;">${placeholder}</span>
          <span style="font-family:'DM Sans',sans-serif;font-size:11px;color:rgba(255,255,255,0.28);letter-spacing:0.03em;">click or drag an image here</span>
        </div>
      </div>
      <div class="is-img" style="position:absolute;inset:0;background-size:cover;background-position:center center;background-repeat:no-repeat;display:none;pointer-events:none;"></div>
      <input type="file" accept="image/jpeg,image/png,image/webp,image/*" style="position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%;"/>
    `;

    const input  = this.querySelector('input');
    const imgDiv = this.querySelector('.is-img');
    const ph     = this.querySelector('.is-ph');

    input.addEventListener('change', e => {
      if (e.target.files[0]) this._load(e.target.files[0], imgDiv, ph);
    });

    this.addEventListener('dragover', e => { e.preventDefault(); e.stopPropagation(); ph.classList.add('is-drag'); });
    this.addEventListener('dragleave', () => ph.classList.remove('is-drag'));
    this.addEventListener('drop', e => {
      e.preventDefault(); e.stopPropagation(); ph.classList.remove('is-drag');
      const file = e.dataTransfer?.files[0];
      if (file && file.type.startsWith('image/')) this._load(file, imgDiv, ph);
    });
  }

  _load(file, imgDiv, ph) {
    const reader = new FileReader();
    reader.onload = e => {
      // background-image+cover is correctly rendered by html2canvas;
      // object-fit:cover on <img> is not — that was causing aspect ratio changes on export.
      imgDiv.style.backgroundImage = `url(${e.target.result})`;
      imgDiv.style.display         = 'block';
      ph.style.display             = 'none';
      this._dataURL                = e.target.result;
      this.dispatchEvent(new CustomEvent('photo-loaded', { bubbles: true }));
    };
    reader.readAsDataURL(file);
  }

  triggerPicker() {
    this.querySelector('input[type=file]')?.click();
  }

  getDataURL() { return this._dataURL || null; }
}

if (!customElements.get('image-slot')) customElements.define('image-slot', ImageSlot);
