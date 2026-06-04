import { riskRegister, segmentVelocity, stageFunnel, summary, verification } from "./pipelineService";

const productTitle = "Pipeline Velocity Dash";
const domain = "http://velocity.kineticgain.com";

const KG_FAVICON_DATA_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="Kinetic Gain"><rect width="64" height="64" rx="15" fill="#0D0F12"/><g transform="translate(10 22.79) scale(0.25581)"><rect x="0" y="0" width="14" height="72" fill="#475B6B"/><polygon points="32,0 83,0 77,18 26,18" fill="#F5F2EB"/><polygon points="32,27 127,27 121,45 26,45" fill="#F5F2EB"/><polygon points="32,54 172,54 166,72 26,72" fill="#F5F2EB"/></g></svg>`
  );

const KG_MARK_SVG = `<svg class="kg-mark" viewBox="-8 -8 188 88" aria-hidden="true"><rect class="anchor" x="0" y="0" width="14" height="72"/><polygon class="bar" points="32,0 83,0 77,18 26,18"/><polygon class="bar" points="32,27 127,27 121,45 26,45"/><polygon class="bar" points="32,54 172,54 166,72 26,72"/></svg>`;

const BASE_CSS = `:root{--onyx:#0D0F12;--cream:#F5F2EB;--bluegray:#475B6B;--bluegray-bright:#6E879A;--radius:18px;--maxw:1180px;--ease:cubic-bezier(.22,.61,.36,1);--font:"Geist",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--mono:"Geist Mono","SFMono-Regular",Consolas,monospace;--a-emerald:#34D399;--a-cyan:#22D3EE;--a-violet:#A78BFA;--a-amber:#FBBF24;--a-blue:#60A5FA;--a-coral:#FB7185}html[data-theme="dark"]{--ground:#0A0B11;--ink:var(--cream);--ink-dim:#9AA1AD;--ink-faint:#565C68;--surface:rgba(255,255,255,.025);--surface-2:rgba(255,255,255,.045);--line:rgba(255,255,255,.08);--line-soft:rgba(255,255,255,.05);--signal:var(--bluegray-bright);--glow:1}html[data-theme="light"]{--ground:var(--cream);--ink:var(--onyx);--ink-dim:#5A5E63;--ink-faint:#A8A59C;--surface:rgba(13,15,18,.02);--surface-2:rgba(13,15,18,.04);--line:#E2DDD1;--line-soft:#EBE7DC;--signal:var(--bluegray);--glow:0}*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{background:var(--ground);color:var(--ink);font-family:var(--font);line-height:1.5;letter-spacing:-.011em;-webkit-font-smoothing:antialiased;overflow-x:hidden;position:relative;transition:background .5s var(--ease),color .5s var(--ease)}body::after{content:"";position:fixed;inset:0;z-index:0;pointer-events:none;opacity:var(--glow);transition:opacity .5s var(--ease);background:radial-gradient(900px 600px at 12% -5%,rgba(124,92,232,.16),transparent 60%),radial-gradient(800px 600px at 92% 8%,rgba(34,211,238,.10),transparent 55%),radial-gradient(1000px 700px at 70% 100%,rgba(71,91,107,.18),transparent 60%),linear-gradient(180deg,#0A0B11 0%,#0C0E16 55%,#0A0C13 100%)}body::before{content:"";position:fixed;inset:0;pointer-events:none;z-index:1;opacity:.02;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}::selection{background:var(--a-violet);color:#0A0B11}a{color:inherit}.wrap{max-width:var(--maxw);margin:0 auto;padding:0 28px}.kg-logo{display:flex;align-items:center;gap:11px;text-decoration:none;color:var(--ink)}.kg-mark{height:22px;width:auto;display:block;flex:none}.kg-mark .anchor{fill:var(--signal)}.kg-mark .bar{fill:var(--ink)}.kg-word{font-weight:600;font-size:18px;letter-spacing:-.035em;color:var(--ink);white-space:nowrap}.eyebrow{font-family:var(--mono);font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-faint)}header{position:sticky;top:0;z-index:50;background:color-mix(in srgb,var(--ground) 72%,transparent);backdrop-filter:blur(16px) saturate(150%);border-bottom:1px solid var(--line-soft)}.nav{display:flex;align-items:center;justify-content:space-between;height:68px;position:relative;z-index:2}.nav-links{display:flex;align-items:center;gap:22px;flex-wrap:wrap}.nav-links a{font-family:var(--mono);font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-dim);text-decoration:none;transition:color .25s var(--ease)}.nav-links a:hover,.nav-links a.active{color:var(--ink)}.nav-links a.active{border-bottom:1px solid var(--a-cyan);padding-bottom:2px}.nav-right{display:flex;align-items:center;gap:14px}.theme-btn,.menu-btn{width:34px;height:34px;border:1px solid var(--line);border-radius:9px;background:transparent;color:var(--ink-dim);cursor:pointer;display:grid;place-items:center;transition:all .25s var(--ease)}.menu-btn{display:none;color:var(--ink)}.theme-btn:hover,.menu-btn:hover{color:var(--ink);border-color:var(--a-violet)}.theme-btn svg,.menu-btn svg{width:15px;height:15px}.shell{max-width:var(--maxw);margin:0 auto;padding:0 28px 60px;position:relative;z-index:2}.hero{padding:82px 0 40px}.hero-panel{position:relative;overflow:hidden;background:var(--surface);border:1px solid var(--line);border-radius:24px;padding:36px 36px 28px}.hero-panel::before{content:"";position:absolute;left:0;right:0;top:0;height:3px;background:linear-gradient(90deg,var(--a-violet),var(--a-cyan),var(--a-emerald))}.hero-grid{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(300px,.65fr);gap:28px;align-items:start}.hero-copy{min-width:0}.hero .eyebrow{margin-bottom:18px;display:inline-flex;align-items:center;gap:10px}.hero .eyebrow .dot{width:8px;height:8px;border-radius:50%;background:linear-gradient(135deg,var(--a-violet),var(--a-cyan));box-shadow:0 0 14px rgba(34,211,238,.55)}.hero h1{font-size:clamp(38px,5.4vw,76px);font-weight:600;line-height:1.02;letter-spacing:-.045em;max-width:14ch;text-wrap:balance}.hero p{margin-top:20px;max-width:62ch;font-size:clamp(15px,1.35vw,17px);line-height:1.65;color:var(--ink-dim)}.hero-nav{display:flex;gap:10px;flex-wrap:wrap;margin-top:26px}.hero-nav a{padding:10px 14px;border:1px solid var(--line);border-radius:999px;color:var(--ink-dim);font-family:var(--mono);font-size:11px;letter-spacing:.04em;text-decoration:none;transition:border-color .2s var(--ease),color .2s var(--ease)}.hero-nav a:hover,.hero-nav a.active{color:var(--ink);border-color:var(--a-cyan)}.hero-aside{display:grid;gap:14px}.acard,.card{position:relative;background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:22px;overflow:hidden}.acard::before,.card::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:var(--accent,linear-gradient(90deg,var(--a-violet),var(--a-cyan)));opacity:.9}.metric-chip{display:inline-flex;align-items:center;gap:7px;padding:6px 11px;border-radius:999px;border:1px solid var(--line);color:var(--ink-faint);font-family:var(--mono);font-size:10.5px;letter-spacing:.08em;text-transform:uppercase}.metric-chip::before{content:"";width:7px;height:7px;border-radius:50%;background:linear-gradient(135deg,var(--a-violet),var(--a-cyan))}.hero-aside h3,.card h3{font-size:18px;font-weight:600;line-height:1.25;margin:12px 0 8px}.hero-aside p,.card p{margin:0;color:var(--ink-dim);font-size:13.5px;line-height:1.6}.hero-mini-list{display:grid;gap:10px;list-style:none}.hero-mini-list li{padding:12px 0;border-top:1px solid var(--line-soft)}.hero-mini-list li:first-child{border-top:0;padding-top:0}.hero-mini-list strong{display:block;color:var(--ink);font-size:14px;line-height:1.35;margin-bottom:4px}.hero-mini-list span{display:block;color:var(--ink-dim);font-size:12.5px;line-height:1.55}.stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:26px}.stat{padding:18px 20px;background:var(--surface-2);border:1px solid var(--line);border-radius:14px}.stat label{display:block;font-family:var(--mono);font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--a-emerald);margin-bottom:10px}.stat strong{display:block;font-size:clamp(30px,3.5vw,44px);font-weight:600;letter-spacing:-.04em;line-height:1}.stat span{display:block;margin-top:9px;color:var(--ink-dim);font-size:13px;line-height:1.55}.sec{padding:70px 0;border-top:1px solid var(--line-soft)}.sec-head{display:flex;gap:18px;align-items:baseline;margin-bottom:34px;flex-wrap:wrap}.sec-num{font-family:var(--mono);font-size:12px;letter-spacing:.1em;background:linear-gradient(120deg,var(--a-violet),var(--a-cyan));-webkit-background-clip:text;background-clip:text;color:transparent}.sec-title{font-size:clamp(24px,3vw,38px);font-weight:600;letter-spacing:-.03em;line-height:1.08}.sec-lead{color:var(--ink-dim);max-width:58ch;font-size:16px;line-height:1.6;margin-top:6px}.card-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.lane-card{display:flex;flex-direction:column;gap:12px;min-height:100%}.lane-card h3{font-size:18px;font-weight:600;line-height:1.2}.lane-meta{display:grid;gap:6px}.lane-meta p{margin:0;color:var(--ink-dim);font-size:13.5px;line-height:1.55}.lane-meta strong{color:var(--ink)}.lane-copy{margin-top:2px;color:var(--ink-dim);font-size:14px;line-height:1.6}.tag{display:inline-flex;align-items:center;padding:5px 10px;border-radius:999px;font-family:var(--mono);font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;border:1px solid var(--line);width:max-content}.tag.healthy{color:var(--a-emerald);border-color:color-mix(in srgb,var(--a-emerald) 38%,transparent);background:color-mix(in srgb,var(--a-emerald) 12%,transparent)}.tag.watch{color:var(--a-amber);border-color:color-mix(in srgb,var(--a-amber) 38%,transparent);background:color-mix(in srgb,var(--a-amber) 12%,transparent)}.tag.critical{color:var(--a-coral);border-color:color-mix(in srgb,var(--a-coral) 38%,transparent);background:color-mix(in srgb,var(--a-coral) 12%,transparent)}.table-wrap{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:18px 20px 20px;position:relative;overflow:hidden}.table-wrap::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--a-cyan),var(--a-violet));opacity:.9}table{width:100%;border-collapse:collapse;font:13.5px/1.55 var(--font)}th,td{text-align:left;padding:12px 10px;border-bottom:1px solid var(--line-soft);vertical-align:top;color:var(--ink)}th{font-family:var(--mono);font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-faint)}tbody tr:last-child td{border-bottom:0}tbody tr:hover{background:var(--surface-2)}td strong{color:var(--ink)}.route-list{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}.route-list span{font-family:var(--mono);font-size:11px;letter-spacing:.04em;color:var(--a-cyan);border:1px solid color-mix(in srgb,var(--a-cyan) 30%,transparent);background:color-mix(in srgb,var(--a-cyan) 8%,transparent);border-radius:999px;padding:7px 11px}.verification-list{display:grid;gap:12px;list-style:none}.verification-list li{padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:var(--surface-2);color:var(--ink-dim);line-height:1.6}.code-block{margin-top:18px;white-space:pre-wrap;overflow-wrap:anywhere;color:var(--ink-dim);background:rgba(7,17,29,.75);border:1px solid rgba(125,196,255,.12);border-radius:18px;padding:18px;font-family:var(--mono);font-size:12.5px;line-height:1.65}.foot-tag{max-width:38ch;color:var(--ink-dim);font-size:14.5px;line-height:1.6;margin-top:14px}.foot-cols{display:flex;gap:48px;flex-wrap:wrap}.foot-col h4{font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-faint);margin-bottom:14px}.foot-col a{display:block;color:var(--ink-dim);text-decoration:none;font-size:13.5px;margin-bottom:8px}.foot-bot{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;padding-top:22px;border-top:1px solid var(--line-soft);font-family:var(--mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-faint)}footer{border-top:1px solid var(--line-soft);padding:44px 0 32px;position:relative;z-index:2;margin-top:48px}.foot-top{display:flex;justify-content:space-between;align-items:flex-start;gap:32px;flex-wrap:wrap;margin-bottom:32px}@media(max-width:1080px){.hero-grid{grid-template-columns:1fr}.card-grid{grid-template-columns:repeat(2,1fr)}.stat-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:880px){.menu-btn{display:grid}.nav-links{position:absolute;top:68px;left:0;right:0;flex-direction:column;align-items:flex-start;background:var(--ground);border-bottom:1px solid var(--line);padding:20px 28px;gap:18px;display:none}.nav-links.open{display:flex}}@media(max-width:760px){.hero h1{max-width:100%;font-size:clamp(34px,11vw,56px)}.card-grid{grid-template-columns:1fr}.stat-grid{grid-template-columns:1fr}.shell{padding:0 18px 46px}.wrap{padding:0 18px}}`;

const THEME_JS = `(function(){var key='kg-theme';var saved=null;try{saved=localStorage.getItem(key)}catch(e){}var t=saved||'dark';document.documentElement.setAttribute('data-theme',t);document.addEventListener('DOMContentLoaded',function(){var btn=document.getElementById('themeBtn');if(btn){btn.addEventListener('click',function(){var cur=document.documentElement.getAttribute('data-theme');var n=cur==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',n);try{localStorage.setItem(key,n)}catch(e){}})}var m=document.getElementById('menuBtn');if(m){m.addEventListener('click',function(){var nl=document.querySelector('.nav-links');if(nl){nl.classList.toggle('open')}})}})})();`;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function navLink(href: string, label: string, activePath: string) {
  return `<a${href === activePath ? ' class="active"' : ""} href="${href}">${label}</a>`;
}

function routeNav(activePath: string) {
  return [
    ["/", "Overview"],
    ["/stage-funnel", "Stage funnel"],
    ["/segment-velocity", "Segment velocity"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => navLink(href, label, activePath))
    .join("");
}

function pageFrame(title: string, description: string, activePath: string, body: string) {
  const canonical = activePath === "/" ? `${domain}/` : `${domain}${activePath}/`;
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${escapeHtml(title)} · Kinetic Gain</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="theme-color" content="#0A0B11" />
  <meta name="referrer" content="strict-origin-when-cross-origin" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests" />
  <link rel="canonical" href="${canonical}" />
  <link rel="icon" type="image/svg+xml" href="${KG_FAVICON_DATA_URI}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Kinetic Gain" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <style>${BASE_CSS}</style>
</head>
<body>
  <header>
    <div class="wrap nav">
      <a class="kg-logo" href="/" aria-label="Kinetic Gain — Pipeline Velocity Dash">
        ${KG_MARK_SVG}
        <span class="kg-word">Kinetic Gain</span>
      </a>
      <nav class="nav-links" id="primaryNav">${routeNav(activePath)}</nav>
      <div class="nav-right">
        <button class="theme-btn" id="themeBtn" aria-label="Toggle theme">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
        </button>
        <button class="menu-btn" id="menuBtn" aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
  </header>
  <main class="shell">${body}</main>
  <footer>
    <div class="wrap">
      <div class="foot-top">
        <div>
          <a class="kg-logo" href="/" aria-label="Kinetic Gain">${KG_MARK_SVG}<span class="kg-word">Kinetic Gain</span></a>
          <p class="foot-tag">Pipeline Velocity Dash keeps stage conversion, segment speed, and revenue drag visible in one board-readable revenue operations surface. Static demo data only.</p>
        </div>
        <div class="foot-cols">
          <div class="foot-col">
            <h4>Surface</h4>
            <a href="${domain}/">Overview</a>
            <a href="${domain}/stage-funnel/">Stage funnel</a>
            <a href="${domain}/segment-velocity/">Segment velocity</a>
          </div>
          <div class="foot-col">
            <h4>Links</h4>
            <a href="${domain}/">${domain.replace("http://", "")}</a>
            <a href="https://github.com/mizcausevic-dev/pipeline-velocity-dash">GitHub repo</a>
            <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
            <a href="https://kineticgain.com/">Kinetic Gain</a>
          </div>
        </div>
      </div>
      <div class="foot-bot">
        <span>${productTitle}</span>
        <span>Style01 · revenue momentum visibility</span>
      </div>
    </div>
  </footer>
  <script>${THEME_JS}</script>
</body>
</html>`;
}

function healthTag(health: string) {
  return health.toLowerCase();
}

export function renderOverview() {
  const stats = summary();
  const risks = riskRegister();
  const segments = segmentVelocity();

  return pageFrame(
    productTitle,
    "Board-ready revenue operations surface for pipeline conversion, stage drag, segment-level speed, and forecast confidence pressure.",
    "/",
    `<section class="hero">
      <div class="hero-panel">
        <div class="hero-grid">
          <div class="hero-copy">
            <span class="eyebrow"><span class="dot"></span>Revenue operations</span>
            <h1>Where is pipeline velocity slowing enough to threaten forecast confidence?</h1>
            <p>Pipeline Velocity Dash keeps stage conversion, segment yield, and operational drag on one control plane so Growth, RevOps, and commercial leadership can see where revenue momentum is weakening before the quarter explains it for them.</p>
            <div class="hero-nav">${routeNav("/")}</div>
            <div class="stat-grid">
              <div class="stat"><label>Stages tracked</label><strong>${stats.stageCount}</strong><span>Modeled stages in the current commercial funnel.</span></div>
              <div class="stat"><label>Total pipeline</label><strong>$${stats.totalPipelineUsd.toLocaleString()}</strong><span>Combined sourced and influenced pipeline in view.</span></div>
              <div class="stat"><label>Healthy segments</label><strong>${stats.healthySegments}</strong><span>Segments currently moving at target speed and win rate.</span></div>
              <div class="stat"><label>Critical lanes</label><strong>${stats.criticalLanes}</strong><span>Lanes where drag is already compressing revenue quality.</span></div>
            </div>
          </div>
          <aside class="hero-aside">
            <div class="acard">
              <span class="metric-chip">Board takeaway</span>
              <h3>What leadership should act on first</h3>
              <p>${escapeHtml(stats.recommendation)}</p>
            </div>
            <div class="acard">
              <span class="metric-chip">Critical pressure</span>
              <ul class="hero-mini-list">
                ${risks
                  .map(
                    (risk) =>
                      `<li><strong>${escapeHtml(risk.lane)}</strong><span>${escapeHtml(risk.health)} · $${risk.impactedPipelineUsd.toLocaleString()} impacted · ${escapeHtml(risk.explanation)}</span></li>`
                  )
                  .join("")}
              </ul>
            </div>
            <div class="acard">
              <span class="metric-chip">Best segment</span>
              <h3>${escapeHtml(segments.find((segment) => segment.health === "healthy")?.segment ?? segments[0].segment)}</h3>
              <p>${escapeHtml(segments.find((segment) => segment.health === "healthy")?.explanation ?? segments[0].explanation)}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
    <section class="sec">
      <div class="sec-head">
        <span class="sec-num">01</span>
        <div>
          <h2 class="sec-title">Segment posture</h2>
          <p class="sec-lead">Use the segment readout to separate healthy demand from volume that is only creating dashboard optimism.</p>
        </div>
      </div>
      <div class="card-grid">
        ${segments
          .map(
            (segment) => `<article class="acard lane-card">
              <span class="tag ${healthTag(segment.health)}">${escapeHtml(segment.health)}</span>
              <h3>${escapeHtml(segment.segment)}</h3>
              <div class="lane-meta">
                <p><strong>Sourced:</strong> $${segment.sourcedPipelineUsd.toLocaleString()}</p>
                <p><strong>Influenced:</strong> $${segment.influencedPipelineUsd.toLocaleString()}</p>
                <p><strong>Win rate:</strong> ${segment.winRatePct}%</p>
                <p><strong>Cycle:</strong> ${segment.averageSalesCycleDays} days</p>
              </div>
              <p class="lane-copy">${escapeHtml(segment.explanation)}</p>
            </article>`
          )
          .join("")}
      </div>
    </section>
    <section class="sec">
      <div class="acard">
        <div class="sec-head">
          <span class="sec-num">02</span>
          <div>
            <h2 class="sec-title">Revenue drag register</h2>
            <p class="sec-lead">This is the board-readable risk layer tying funnel slowdowns to actual commercial exposure.</p>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Lane</th><th>Health</th><th>Impacted pipeline</th><th>Explanation</th></tr></thead>
            <tbody>
              ${risks
                .map(
                  (risk) => `<tr><td><strong>${escapeHtml(risk.lane)}</strong></td><td><span class="tag ${healthTag(risk.health)}">${escapeHtml(risk.health)}</span></td><td>$${risk.impactedPipelineUsd.toLocaleString()}</td><td>${escapeHtml(risk.explanation)}</td></tr>`
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    </section>`
  );
}

export function renderStageFunnel() {
  const stages = stageFunnel();
  return pageFrame(
    `${productTitle} — Stage Funnel`,
    "Stage-by-stage view of count, conversion, average days, and drop-off pressure across the revenue funnel.",
    "/stage-funnel",
    `<section class="hero">
      <div class="hero-panel">
        <div class="hero-grid">
          <div class="hero-copy">
            <span class="eyebrow"><span class="dot"></span>Stage funnel</span>
            <h1>Where is deal flow leaking speed, confidence, or conversion?</h1>
            <p>Stage metrics are where top-of-funnel optimism either matures into credible revenue motion or quietly breaks under handoff loss and proposal aging.</p>
            <div class="hero-nav">${routeNav("/stage-funnel")}</div>
          </div>
          <aside class="hero-aside">
            <div class="acard">
              <span class="metric-chip">Slowest stage</span>
              <h3>${escapeHtml([...stages].sort((a, b) => b.averageDays - a.averageDays)[0].stage)}</h3>
              <p>${[...stages].sort((a, b) => b.averageDays - a.averageDays)[0].averageDays} average days in stage.</p>
            </div>
            <div class="acard">
              <span class="metric-chip">Highest drop-off</span>
              <h3>${escapeHtml([...stages].sort((a, b) => b.dropOffPct - a.dropOffPct)[0].stage)}</h3>
              <p>${[...stages].sort((a, b) => b.dropOffPct - a.dropOffPct)[0].dropOffPct}% drop-off pressure.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
    <section class="sec">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Stage</th><th>Count</th><th>Conversion</th><th>Avg days</th><th>Drop-off</th></tr></thead>
          <tbody>
            ${stages
              .map(
                (stage) => `<tr><td><strong>${escapeHtml(stage.stage)}</strong></td><td>${stage.count}</td><td>${stage.conversionPct}%</td><td>${stage.averageDays}</td><td>${stage.dropOffPct}%</td></tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>`
  );
}

export function renderSegmentVelocity() {
  const segments = segmentVelocity();
  return pageFrame(
    `${productTitle} — Segment Velocity`,
    "Compare sourced pipeline, influenced pipeline, win rate, cycle time, and health across commercial segments.",
    "/segment-velocity",
    `<section class="hero">
      <div class="hero-panel">
        <div class="hero-grid">
          <div class="hero-copy">
            <span class="eyebrow"><span class="dot"></span>Segment velocity</span>
            <h1>Which segments are truly scaling, and which ones are only creating volume?</h1>
            <p>Segment velocity separates healthy commercial motion from channels or cohorts that are entering the funnel without enough downstream quality.</p>
            <div class="hero-nav">${routeNav("/segment-velocity")}</div>
          </div>
          <aside class="hero-aside">
            <div class="acard">
              <span class="metric-chip">Fastest segment</span>
              <h3>${escapeHtml([...segments].sort((a, b) => a.averageSalesCycleDays - b.averageSalesCycleDays)[0].segment)}</h3>
              <p>${[...segments].sort((a, b) => a.averageSalesCycleDays - b.averageSalesCycleDays)[0].averageSalesCycleDays} cycle days.</p>
            </div>
            <div class="acard">
              <span class="metric-chip">Weakest yield</span>
              <h3>${escapeHtml([...segments].sort((a, b) => a.winRatePct - b.winRatePct)[0].segment)}</h3>
              <p>${[...segments].sort((a, b) => a.winRatePct - b.winRatePct)[0].winRatePct}% win rate.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
    <section class="sec">
      <div class="card-grid">
        ${segments
          .map(
            (segment) => `<article class="acard lane-card">
              <span class="tag ${healthTag(segment.health)}">${escapeHtml(segment.health)}</span>
              <h3>${escapeHtml(segment.segment)}</h3>
              <div class="lane-meta">
                <p><strong>Sourced pipeline:</strong> $${segment.sourcedPipelineUsd.toLocaleString()}</p>
                <p><strong>Influenced pipeline:</strong> $${segment.influencedPipelineUsd.toLocaleString()}</p>
                <p><strong>Win rate:</strong> ${segment.winRatePct}%</p>
                <p><strong>Sales cycle:</strong> ${segment.averageSalesCycleDays} days</p>
              </div>
              <p class="lane-copy">${escapeHtml(segment.explanation)}</p>
            </article>`
          )
          .join("")}
      </div>
    </section>
    <section class="sec">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Segment</th><th>Sourced</th><th>Influenced</th><th>Win rate</th><th>Cycle</th><th>Health</th></tr></thead>
          <tbody>
            ${segments
              .map(
                (segment) => `<tr><td><strong>${escapeHtml(segment.segment)}</strong></td><td>$${segment.sourcedPipelineUsd.toLocaleString()}</td><td>$${segment.influencedPipelineUsd.toLocaleString()}</td><td>${segment.winRatePct}%</td><td>${segment.averageSalesCycleDays} days</td><td><span class="tag ${healthTag(segment.health)}">${escapeHtml(segment.health)}</span></td></tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>`
  );
}

export function renderVerification() {
  return pageFrame(
    `${productTitle} — Verification`,
    "Verification surface for modeled pipeline stage metrics, segment velocity, and revenue-risk outputs.",
    "/verification",
    `<section class="hero">
      <div class="hero-panel">
        <div class="hero-grid">
          <div class="hero-copy">
            <span class="eyebrow"><span class="dot"></span>Verification</span>
            <h1>This build proves pipeline velocity should be measured in commercial and operational terms together.</h1>
            <p>The surface is useful because it ties stage drag, segment quality, and revenue exposure into one decision-ready operating view.</p>
          </div>
          <aside class="hero-aside">
            <div class="acard">
              <span class="metric-chip">Checks</span>
              <p>Build, test, demo, smoke, prerender, and screenshot rails should all stay green.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
    <section class="sec">
      <div class="section-stack">
        <ul class="verification-list">
          ${verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </div>
    </section>`
  );
}

export function renderDocs() {
  const commands = ["npm install", "npm run verify", "npm run prerender", "npm run render:assets"];
  return pageFrame(
    `${productTitle} — Docs`,
    "Routes, API outputs, and validation commands for Pipeline Velocity Dash.",
    "/docs",
    `<section class="hero">
      <div class="hero-panel">
        <div class="hero-grid">
          <div class="hero-copy">
            <span class="eyebrow"><span class="dot"></span>Docs</span>
            <h1>One surface for stage conversion, segment speed, and revenue drag.</h1>
            <p>Pipeline Velocity Dash packages the funnel view, segment velocity, and revenue-risk layer into a reusable operator surface for Growth and RevOps.</p>
          </div>
          <aside class="hero-aside">
            <div class="acard">
              <span class="metric-chip">Routes</span>
              <div class="route-list"><span>/</span><span>/stage-funnel</span><span>/segment-velocity</span><span>/verification</span><span>/docs</span></div>
            </div>
          </aside>
        </div>
      </div>
    </section>
    <section class="sec">
      <div class="card-grid">
        <article class="acard lane-card">
          <h3>UI routes</h3>
          <p class="lane-copy">Overview, stage funnel, segment velocity, verification, and docs are published as standalone static routes.</p>
        </article>
        <article class="acard lane-card">
          <h3>API outputs</h3>
          <p class="lane-copy"><code>/api/dashboard/summary</code>, <code>/api/stage-funnel</code>, <code>/api/segment-velocity</code>, <code>/api/risks</code>, <code>/api/verification</code>, and <code>/api/sample</code>.</p>
        </article>
        <article class="acard lane-card">
          <h3>Validation</h3>
          <p class="lane-copy">The repo ships only when the same local build, test, demo, smoke, and prerender rails pass together.</p>
        </article>
      </div>
      <div class="code-block">${commands.join("\n")}</div>
    </section>`
  );
}
