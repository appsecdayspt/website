// Shared base components used by all card layouts

function CardShell({ children, style }) {
  return (
    <div className="card" style={style}>
      <div className="ink-bg" />
      <div className="grid-overlay" />
      <div className="noise" />
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </div>
    </div>
  );
}

// Contenteditable field — click to edit directly on the card
function Editable({ tag: Tag = 'div', children, ...props }) {
  return (
    <Tag contentEditable suppressContentEditableWarning {...props}>
      {children}
    </Tag>
  );
}

window.CardShell = CardShell;
window.Editable  = Editable;
