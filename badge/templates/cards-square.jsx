// 1080×1080 square social cards — feed posts (Instagram, LinkedIn, X)
const SQ = 1080;

// ── i18n ─────────────────────────────────────────────────────────────
const LANG = (function() {
  try { return localStorage.getItem('badge-lang') || 'en'; } catch(e) { return 'en'; }
})();

const STRINGS = {
  en: {
    name:           'Your name',
    roleCompany:    'Role · Company',
    talkTitle:      'Your talk title goes here',
    calendarKicker: '// Mark your calendar',
    atEventKicker:  '// At AppSec Days PT 2026',
    talkLabel:      '// Talk title',
    goingStamp:     "I'm going",
    goingLine1:     "I'M",
    goingLine2:     'GOING.',
    speakingLine1:  "I'M",
    speakingLine2:  'SPEAKING.',
    seeYouLine1:    'See you',
    seeYouLine2:    'in Porto.',
  },
  pt: {
    name:           'O teu nome',
    roleCompany:    'Cargo · Empresa',
    talkTitle:      'O título da tua palestra',
    calendarKicker: '// Marca a data',
    atEventKicker:  '// AppSec Days PT 2026',
    talkLabel:      '// Palestra',
    goingStamp:     'Eu Vou',
    goingLine1:     'EU',
    goingLine2:     'VOU.',
    speakingLine1:  'A MINHA',
    speakingLine2:  'PALESTRA.',
    seeYouLine1:    'Vemo-nos',
    seeYouLine2:    'no Porto.',
  },
};

function t(key) {
  return (STRINGS[LANG] || STRINGS.en)[key] ?? STRINGS.en[key];
}

// ─── A · I'M GOING ──────────────────────────────────────────────────
function SquareAttending() {
  return (
    <CardShell style={{ width: SQ, height: SQ, padding: 72 }}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* AppSec Days lockup */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src="../assets/appsecdays-lockup-white.png" alt="OWASP AppSec Days Portugal 2026" style={{ height: 78, width: 'auto' }} />
          <span className="mono" style={{ fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', textAlign: 'right', lineHeight: 1.6 }}>
            23–24 SEP 2026<br/>FACM · Porto · PT
          </span>
        </div>

        {/* Dominant headline */}
        <div style={{ marginTop: 56 }}>
          <span className="kicker" style={{ fontSize: 16, color: 'var(--cyan)' }}>{t('calendarKicker')}</span>
          <h1 className="display" style={{ fontSize: 260, color: '#fff', lineHeight: 0.82, marginTop: 16 }}>
            {t('goingLine1')}<br /><span style={{ color: 'var(--cyan)' }}>{t('goingLine2')}</span>
          </h1>
        </div>

        <div style={{ flex: 1 }}></div>

        {/* Photo + name */}
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32, alignItems: 'center' }}>
          <image-slot id="sq-attending-photo" shape="circle"
            style={{ width: 200, height: 200 }}
            placeholder={t('name')}>
          </image-slot>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Editable tag="div" className="display" style={{ fontSize: 56, color: '#fff' }}>{t('name')}</Editable>
            <Editable tag="div" className="mono" style={{ fontSize: 15, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--cyan)' }}>{t('roleCompany')}</Editable>
            <span className="mono" style={{ fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginTop: 8 }}>appsecdays.pt</span>
          </div>
        </div>
      </div>
    </CardShell>
  );
}

// ─── B · I'M SPEAKING ───────────────────────────────────────────────
function SquareSpeaker() {
  return (
    <CardShell style={{ width: SQ, height: SQ, padding: 0 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '440px 1fr', height: '100%' }}>
        {/* left: photo */}
        <div style={{ position: 'relative', padding: 48 }}>
          <image-slot id="sq-speaker-photo" shape="rounded" radius="10"
            style={{ position: 'absolute', inset: 48 }}
            placeholder={t('name')}>
          </image-slot>
          <div style={{ position: 'absolute', left: 48, right: 48, bottom: 48, padding: '16px 18px', background: 'linear-gradient(180deg, transparent, rgba(6,9,20,0.85))', display: 'flex', flexDirection: 'column', gap: 4, pointerEvents: 'none' }}>
            <Editable tag="div" className="display" style={{ fontSize: 30, color: '#fff', pointerEvents: 'auto' }}>{t('name')}</Editable>
            <Editable tag="div" className="mono" style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--cyan)', pointerEvents: 'auto' }}>{t('roleCompany')}</Editable>
          </div>
        </div>

        {/* right: content */}
        <div style={{ padding: '56px 56px 56px 8px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <img src="../assets/appsecdays-lockup-white.png" alt="OWASP AppSec Days Portugal 2026" style={{ height: 56, width: 'auto' }} />
          </div>

          <div style={{ marginTop: 36 }}>
            <span className="kicker" style={{ fontSize: 13, color: 'var(--cyan)' }}>{t('atEventKicker')}</span>
            <h1 className="display" style={{ fontSize: 120, color: '#fff', lineHeight: 0.82, marginTop: 14 }}>
              {t('speakingLine1')}<br /><span style={{ color: 'var(--cyan)' }}>{t('speakingLine2')}</span>
            </h1>
          </div>

          <div style={{ flex: 1 }}></div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span className="mono" style={{ fontSize: 12, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>{t('talkLabel')}</span>
            <Editable tag="div" className="display" style={{ fontSize: 32, color: '#fff', lineHeight: 1.05 }}>{t('talkTitle')}</Editable>
            <span className="mono" style={{ fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginTop: 18 }}>
              23–24 SEP 2026 · FACM · Porto · appsecdays.pt
            </span>
          </div>
        </div>
      </div>
    </CardShell>
  );
}

// ─── C · SEE YOU IN PORTO ───────────────────────────────────────────
function SquareMinimal() {
  return (
    <CardShell style={{ width: SQ, height: SQ, padding: 72 }}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span className="stamp cyan" style={{ fontSize: 12 }}>{t('goingStamp')}</span>
          <span className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.22em', textTransform: 'uppercase', textAlign: 'right' }}>
            // 23–24 SEP 2026<br />// FACM · Porto · PT
          </span>
        </div>

        <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
          <img src="../assets/appsecdays-lockup-white.png" alt="OWASP AppSec Days Portugal 2026" style={{ width: '92%', height: 'auto' }} />
          <div style={{ width: 80, height: 4, background: 'var(--cyan)', boxShadow: '0 0 20px var(--cyan)' }}></div>
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
          <h1 className="display" style={{ fontSize: 158, color: '#fff', lineHeight: 0.82, textAlign: 'center' }}>
            {t('seeYouLine1')}<br /><span style={{ color: 'var(--cyan)' }}>{t('seeYouLine2')}</span>
          </h1>
        </div>

        {/* photo + name */}
        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr auto', gap: 28, alignItems: 'center' }}>
          <image-slot id="sq-minimal-photo" shape="circle"
            style={{ width: 140, height: 140 }}
            placeholder={t('name')}>
          </image-slot>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Editable tag="div" className="display" style={{ fontSize: 38, color: '#fff' }}>{t('name')}</Editable>
            <Editable tag="div" className="mono" style={{ fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--cyan)' }}>{t('roleCompany')}</Editable>
          </div>
          <span className="mono" style={{ fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', textAlign: 'right' }}>
            appsecdays<br />.pt
          </span>
        </div>
      </div>
    </CardShell>
  );
}

window.SquareAttending = SquareAttending;
window.SquareSpeaker = SquareSpeaker;
window.SquareMinimal = SquareMinimal;
