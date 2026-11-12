// Hand-drawn botanical illustrations, built from plain SVG so they need no
// extra packages and no image files. Every shape is drawn slightly lopsided
// on purpose: perfectly symmetric curves look machine-made.
//
// Colours come from the CSS variables in styles/tokens.css, so a palette
// change there recolours every illustration at once.

const ink = {
  stroke: 'var(--forest)',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const tones = {
  forest: 'var(--forest)',
  sage: 'var(--sage)',
  moss: 'var(--moss)',
  honey: 'var(--honey)',
  cream: 'var(--cream)',
  paper: 'var(--paper)',
}

// A single leaf, drawn pointing up from its base at (0, 0), about 43 units tall.
// `x`, `y`, `rotate` and `scale` place it inside a larger drawing.
function LeafShape({ tone = 'sage', x = 0, y = 0, rotate = 0, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path
        d="M0 0 C-15 -8 -17 -29 1 -43 C17 -30 14 -9 0 0Z"
        style={{ ...ink, fill: tones[tone], fillOpacity: 0.88 }}
      />
      <path d="M0 -1 C1 -14 1 -27 1 -39" style={{ ...ink, fill: 'none', strokeWidth: 1.1 }} />
      <path
        d="M1 -13 L-6 -19 M1 -22 L7 -28"
        style={{ ...ink, fill: 'none', strokeWidth: 1 }}
      />
    </g>
  )
}

// A five-petal flower centred on (0, 0).
function BlossomShape({ petal = 'honey', x = 0, y = 0, scale = 1, rotate = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <ellipse
          key={angle}
          cx={i % 2 ? 0.8 : -0.6}
          cy={-10.5}
          rx={6.6}
          ry={10.5}
          transform={`rotate(${angle})`}
          style={{ ...ink, strokeWidth: 1.4, fill: tones[petal] }}
        />
      ))}
      <circle r={4.6} style={{ ...ink, strokeWidth: 1.3, fill: 'var(--cream)' }} />
      <circle cx={-1.2} cy={-1} r={0.9} style={{ fill: 'var(--forest)' }} />
      <circle cx={1.4} cy={0.8} r={0.9} style={{ fill: 'var(--forest)' }} />
      <circle cx={0.2} cy={1.6} r={0.7} style={{ fill: 'var(--forest)' }} />
    </g>
  )
}

// A closed bud on a short stalk.
function BudShape({ x = 0, y = 0, rotate = 0, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path d="M0 0 C-1 -6 1 -10 0 -14" style={{ ...ink, fill: 'none' }} />
      <path
        d="M0 -12 C-8 -17 -7 -27 0 -31 C8 -26 7 -17 0 -12Z"
        style={{ ...ink, fill: 'var(--honey)' }}
      />
      <path
        d="M-5 -13 C-4 -18 4 -18 5 -13"
        style={{ ...ink, fill: 'var(--sage)', fillOpacity: 0.9 }}
      />
    </g>
  )
}

// The flowering branch, drawn in a 330 x 210 box. Shared by the hero
// branch and the garden window so the drawing exists in one place only.
function BranchShape() {
  return (
    <g>
      <path
        d="M4 196 C60 176 96 150 140 126 C190 98 236 92 322 50"
        style={{ ...ink, fill: 'none', strokeWidth: 2.2 }}
      />
      <path d="M96 152 C104 128 118 112 130 104" style={{ ...ink, fill: 'none' }} />
      <path d="M196 106 C204 128 222 142 246 148" style={{ ...ink, fill: 'none' }} />
      <LeafShape tone="sage" x={40} y={186} rotate={-24} scale={1.1} />
      <LeafShape tone="moss" x={62} y={176} rotate={56} scale={1.1} />
      <LeafShape tone="moss" x={92} y={158} rotate={-36} scale={1.15} />
      <LeafShape tone="sage" x={122} y={140} rotate={50} scale={1.15} />
      <LeafShape tone="sage" x={160} y={116} rotate={-20} scale={1.1} />
      <LeafShape tone="moss" x={216} y={96} rotate={64} scale={1.1} />
      <LeafShape tone="sage" x={256} y={76} rotate={-14} scale={1} />
      <LeafShape tone="moss" x={290} y={62} rotate={52} scale={0.9} />
      <LeafShape tone="sage" x={232} y={144} rotate={150} scale={0.9} />
      <BlossomShape petal="honey" x={132} y={100} scale={1.05} rotate={12} />
      <BlossomShape petal="cream" x={248} y={150} scale={0.85} rotate={-20} />
      <BlossomShape petal="honey" x={198} y={86} scale={0.7} rotate={30} />
      <BudShape x={272} y={66} rotate={-28} scale={0.9} />
      <BudShape x={74} y={168} rotate={-72} scale={0.8} />
    </g>
  )
}

// The teacup, drawn in a 180 x 170 box. Shared by Teacup and GardenWindow.
function TeacupShape() {
  return (
    <g>
      <path
        d="M70 52 C60 38 80 30 70 16 M96 56 C86 40 108 32 96 14"
        style={{ ...ink, fill: 'none', strokeWidth: 1.5 }}
      />
      <LeafShape tone="moss" x={126} y={50} rotate={34} scale={0.62} />
      <path
        d="M142 84 C168 82 168 118 138 116"
        style={{ ...ink, fill: 'none', strokeWidth: 2 }}
      />
      <path
        d="M34 72 C34 120 52 136 88 136 C124 136 142 120 142 72"
        style={{ ...ink, fill: 'var(--paper)' }}
      />
      <ellipse
        cx={88}
        cy={72}
        rx={54}
        ry={10}
        style={{ ...ink, fill: 'var(--moss)', fillOpacity: 0.6 }}
      />
      <path
        d="M38 96 C60 105 116 105 138 96"
        style={{ ...ink, fill: 'none', strokeWidth: 1.2, strokeDasharray: '1 5' }}
      />
      <BlossomShape petal="honey" x={66} y={116} scale={0.46} rotate={14} />
      <LeafShape tone="sage" x={86} y={124} rotate={64} scale={0.32} />
      <LeafShape tone="sage" x={104} y={122} rotate={-60} scale={0.3} />
      <path
        d="M18 142 C44 156 134 156 160 142 C150 150 30 150 18 142Z"
        style={{ ...ink, fill: 'var(--moss)' }}
      />
    </g>
  )
}

// Wrapper that decides whether an illustration is decorative or meaningful.
// With a `title` it is announced to screen readers; without one it is hidden
// from them, so purely decorative art never adds noise.
function Svg({ viewBox, className, title, children }) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {children}
    </svg>
  )
}

export function Leaf({ tone = 'sage', className, title }) {
  return (
    <Svg viewBox="-22 -48 44 52" className={className} title={title}>
      <LeafShape tone={tone} />
    </Svg>
  )
}

export function Blossom({ petal = 'honey', className, title }) {
  return (
    <Svg viewBox="-24 -24 48 48" className={className} title={title}>
      <BlossomShape petal={petal} />
    </Svg>
  )
}

// A leafy stem, good for dividers and page edges.
export function Sprig({ className, title }) {
  return (
    <Svg viewBox="0 -14 120 224" className={className} title={title}>
      <path
        d="M58 204 C50 160 70 122 57 78 C52 58 58 38 68 20"
        style={{ ...ink, fill: 'none', strokeWidth: 2 }}
      />
      <LeafShape tone="sage" x={56} y={160} rotate={-58} scale={1.05} />
      <LeafShape tone="moss" x={61} y={142} rotate={62} scale={1.05} />
      <LeafShape tone="sage" x={56} y={118} rotate={-52} scale={1} />
      <LeafShape tone="moss" x={63} y={98} rotate={58} scale={0.98} />
      <LeafShape tone="sage" x={56} y={78} rotate={-44} scale={0.9} />
      <LeafShape tone="moss" x={60} y={60} rotate={50} scale={0.82} />
      <LeafShape tone="sage" x={68} y={20} rotate={14} scale={0.7} />
    </Svg>
  )
}

export function FlowerBranch({ className, title }) {
  return (
    <Svg viewBox="0 0 330 210" className={className} title={title}>
      <BranchShape />
    </Svg>
  )
}

// A vine that hugs the top-left corner of a card. Mirror it into other
// corners with CSS (transform: scaleX(-1) and so on).
export function VineCorner({ className }) {
  return (
    <Svg viewBox="-16 -14 176 176" className={className}>
      <path
        d="M6 144 C4 96 10 56 34 32 C54 12 92 8 144 6"
        style={{ ...ink, fill: 'none', strokeWidth: 1.8 }}
      />
      <path d="M34 32 C28 44 30 56 38 62" style={{ ...ink, fill: 'none', strokeWidth: 1.2 }} />
      <LeafShape tone="sage" x={7} y={110} rotate={70} scale={0.62} />
      <LeafShape tone="moss" x={9} y={76} rotate={-60} scale={0.6} />
      <LeafShape tone="sage" x={24} y={44} rotate={52} scale={0.62} />
      <LeafShape tone="moss" x={52} y={20} rotate={-40} scale={0.6} />
      <LeafShape tone="sage" x={88} y={10} rotate={46} scale={0.58} />
      <BlossomShape petal="honey" x={36} y={30} scale={0.55} rotate={20} />
      <BudShape x={118} y={8} rotate={80} scale={0.55} />
    </Svg>
  )
}

// A whimsical teacup with a curl of steam and a drifting leaf.
export function Teacup({ className, title }) {
  return (
    <Svg viewBox="0 0 180 170" className={className} title={title}>
      <TeacupShape />
    </Svg>
  )
}

// The sign-in scene: an arched garden window with hills, a sun,
// a flowering branch and a cup on the sill.
export function GardenWindow({ className, title }) {
  return (
    <Svg viewBox="0 70 380 384" className={className} title={title}>
      <defs>
        <clipPath id="garden-arch">
          <path d="M50 430 V190 C50 60 330 60 330 190 V430 Z" />
        </clipPath>
      </defs>

      <g clipPath="url(#garden-arch)">
        <rect x="40" y="40" width="300" height="400" style={{ fill: 'var(--cream)' }} />
        <circle cx="116" cy="214" r="30" style={{ ...ink, fill: 'var(--honey)' }} />
        <path
          d="M40 300 C100 250 160 270 220 290 C270 304 310 280 340 262 V440 H40Z"
          style={{ ...ink, fill: 'var(--moss)' }}
        />
        <path
          d="M40 350 C110 310 170 340 230 350 C280 358 316 336 340 322 V440 H40Z"
          style={{ ...ink, fill: 'var(--sage)' }}
        />
        <path
          d="M40 400 C100 376 170 392 240 396 C290 398 320 388 340 380 V440 H40Z"
          style={{ ...ink, fill: 'var(--forest)' }}
        />
        {[100, 150, 210, 270].map((x, i) => (
          <g key={x}>
            <path
              d={`M${x} ${352 + (i % 2) * 6} V${326 + (i % 2) * 6}`}
              style={{ ...ink, fill: 'none', strokeWidth: 1.3 }}
            />
            <BlossomShape
              petal={i % 2 ? 'cream' : 'honey'}
              x={x}
              y={322 + (i % 2) * 6}
              scale={0.38}
              rotate={i * 20}
            />
          </g>
        ))}
        <g transform="translate(332 128) scale(-0.62 0.62)">
          <BranchShape />
        </g>
      </g>

      <path
        d="M50 430 V190 C50 60 330 60 330 190 V430"
        style={{ ...ink, fill: 'none', strokeWidth: 3.2 }}
      />
      <path
        d="M62 424 V192 C62 76 318 76 318 192 V424"
        style={{ ...ink, fill: 'none', strokeWidth: 1.2, strokeDasharray: '2 6' }}
      />

      <rect
        x="26"
        y="426"
        width="328"
        height="16"
        rx="8"
        style={{ ...ink, fill: 'var(--honey)' }}
      />
      <g transform="translate(118 300) scale(0.82)">
        <TeacupShape />
      </g>

      <LeafShape tone="sage" x={34} y={430} rotate={-30} scale={1.25} />
      <LeafShape tone="moss" x={40} y={430} rotate={12} scale={1.1} />
      <LeafShape tone="sage" x={30} y={430} rotate={-62} scale={0.9} />
      <LeafShape tone="sage" x={346} y={430} rotate={30} scale={1.25} />
      <LeafShape tone="moss" x={340} y={430} rotate={-12} scale={1.1} />
      <LeafShape tone="sage" x={350} y={430} rotate={62} scale={0.9} />
    </Svg>
  )
}
