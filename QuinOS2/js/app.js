/**
 * Quin OS 2 Showcase & Documentation Interactive Engine
 * Inbora Studio | Dr Chamyoung (Alok)
 */

document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initAccentPicker();
  initSimulator();
  initDocsSearch();
  initScrollSpy();
  initCodeCopy();
});

/* ── Live QWM 100 Hz Simulated Clock ──────────────────────────────────────── */
function initClock() {
  const clockEl = document.getElementById('os-dock-clock');
  if (!clockEl) return;

  let ticks = 10000; // Simulated starting ticks
  setInterval(() => {
    ticks += 100;
    const totalSecs = Math.floor(ticks / 100);
    const hrs = String(Math.floor(totalSecs / 3600) % 24).padStart(2, '0');
    const mins = String(Math.floor((totalSecs % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSecs % 60).padStart(2, '0');
    clockEl.textContent = `${hrs}:${mins}:${secs}`;
  }, 1000);
}

/* ── Accent Color Switcher ────────────────────────────────────────────────── */
const ACCENT_PRESETS = {
  blue:   { hue: 212, sat: '100%', light: '50%' },
  green:  { hue: 160, sat: '84%',  light: '40%' },
  purple: { hue: 265, sat: '90%',  light: '66%' },
  orange: { hue: 38,  sat: '92%',  light: '50%' },
  red:    { hue: 350, sat: '85%',  light: '60%' }
};

function initAccentPicker() {
  const pickerButtons = document.querySelectorAll('.accent-btn');
  pickerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      pickerButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const color = btn.dataset.color;
      if (ACCENT_PRESETS[color]) {
        const root = document.documentElement;
        root.style.setProperty('--accent-hue', ACCENT_PRESETS[color].hue);
        root.style.setProperty('--accent-sat', ACCENT_PRESETS[color].sat);
        root.style.setProperty('--accent-light', ACCENT_PRESETS[color].light);
        showToast(`Theme Accent: ${color.toUpperCase()}`);
      }
    });
  });
}

/* ── OS Simulator & Interactive CLI ───────────────────────────────────────── */
const CLI_COMMANDS = {
  'uname -a': `QuinOS 2.1.0-beta QuinKernel #1 SMP PREEMPT x86_64 AMD64 GNU/musl QuinOS`,
  'sysinfo': `CPU: x86_64 Dual-Core SMP (ACPI MADT INIT-SIPI-SIPI)\nRAM: 42.4 MB Used / 2048.0 MB Total (PMM Buddy Orders 0-10)\nResolution: 2560x1440x32 (VirtIO-GPU QDS Double-Buffered)\nCompositor: QWM (Floating Window Manager, 32 windows, 7px resize)\nAuthor: Dr Chamyoung (Alok) | Studio: Inbora Studio`,
  'meminfo': `MemTotal:       2097152 kB\nMemFree:        2053724 kB\nMemAvailable:   2053724 kB\nSlabCaches:     8 pools (32B to 4096B)\nCoW Refcounts:  Active (32-bit atomic counters)\nHHDM Base:      0xFFFF800000000000`,
  'netstat': `Interface: virtio-net0 (MAC: 52:54:00:12:34:56)\nIPv4 Address: 10.0.2.15 / 255.255.255.0\nGateway: 10.0.2.2 | DNS: 10.0.2.3\nNTP Sync: pool.ntp.org (RFC 4330 active)\nTCP State: ESTABLISHED (RFC 793 sliding window, RTO active)`,
  'apps': `Built-in GUI: Calculator, Clock, Notepad, File Manager, Paint, Snake, Settings, SysMon, CuteCraft 3D, World3D\nRing-3 Ports: Browser (litehtml+QuickJS), Video (MPEG-1/MP2), Chipmunk2D Physics, Stockfish, DOOM, Quake, QuinDev (TCC)`,
  'help': `Available simulator commands:\n  uname -a    — Display kernel version and architecture\n  sysinfo     — Overview of CPU, RAM, display, and authorship\n  meminfo     — Physical & Virtual Memory status\n  netstat     — Network configuration & RFC 793 socket stats\n  apps        — List active desktop applications and ported engines\n  clear       — Clear the terminal buffer`
};

function initSimulator() {
  const terminalOut = document.getElementById('cli-output');
  const tagButtons = document.querySelectorAll('.os-cli-tag');
  const tabButtons = document.querySelectorAll('.os-tab-btn');
  const windowBody = document.getElementById('os-window-body');
  const windowFrame = document.querySelector('.os-window');

  // Traffic lights
  const dotRed = document.querySelector('.os-dot-red');
  const dotYellow = document.querySelector('.os-dot-yellow');
  const dotGreen = document.querySelector('.os-dot-green');

  if (dotRed) {
    dotRed.addEventListener('click', () => {
      windowFrame.style.transform = 'scale(0.95)';
      windowFrame.style.opacity = '0.6';
      setTimeout(() => {
        windowFrame.style.transform = 'scale(1)';
        windowFrame.style.opacity = '1';
        showToast('QWM: Window close event intercepted');
      }, 400);
    });
  }

  if (dotYellow) {
    dotYellow.addEventListener('click', () => {
      showToast('QWM: Window minimized to dock');
    });
  }

  if (dotGreen) {
    dotGreen.addEventListener('click', () => {
      windowFrame.classList.toggle('maximized');
      showToast('QWM: Maximize toggle (2560x1440 canvas)');
    });
  }

  // Window Tab Switching
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const view = btn.dataset.view;
      switchSimulatorView(view);
    });
  });

  // CLI Tag Click
  tagButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.dataset.cmd;
      executeCommand(cmd);
    });
  });
}

function switchSimulatorView(view) {
  const innerCard = document.getElementById('os-inner-card');
  const innerTitle = document.getElementById('os-inner-title');
  const innerContent = document.getElementById('os-inner-content');

  if (view === 'terminal') {
    innerTitle.textContent = 'qsh — Quin Shell (Ring-3 musl)';
    innerContent.innerHTML = `
      <div id="cli-output">
<span class="cyan">quin-os-2 login:</span> root (uid=0)
<span class="green">Welcome to Quin OS 2 (64-bit x86_64)</span>
* Freestanding monolithic kernel + Ring-3 isolated userspace
* Type or click any command below to probe kernel internals.
      </div>
      <div class="os-cli-input-row">
        <span class="os-cli-prompt">root@quin:~#</span>
        <div class="os-cli-btn-group">
          <button class="os-cli-tag" data-cmd="uname -a">uname -a</button>
          <button class="os-cli-tag" data-cmd="sysinfo">sysinfo</button>
          <button class="os-cli-tag" data-cmd="meminfo">meminfo</button>
          <button class="os-cli-tag" data-cmd="netstat">netstat</button>
          <button class="os-cli-tag" data-cmd="apps">apps</button>
        </div>
      </div>
    `;
    // Rebind newly added buttons
    document.querySelectorAll('.os-cli-tag').forEach(b => {
      b.addEventListener('click', () => executeCommand(b.dataset.cmd));
    });
  } else if (view === 'browser') {
    innerTitle.textContent = 'Quin Browser (litehtml + QuickJS)';
    innerContent.innerHTML = `
      <div style="background:#FFF; color:#111; border-radius:6px; padding:1.0rem; font-family:sans-serif;">
        <div style="display:flex; align-items:center; gap:0.5rem; border-bottom:1px solid #DDD; padding-bottom:0.5rem; margin-bottom:0.75rem;">
          <span style="color:#0284C7; font-weight:bold;">https://inborastudio.github.io/</span>
          <span style="background:#E0F2FE; color:#0369A1; font-size:0.7rem; padding:0.1rem 0.4rem; border-radius:4px;">TLS 1.3 Verified</span>
        </div>
        <h3 style="color:#0F172A; font-size:1.1rem; margin-bottom:0.25rem;">Inbora Studio — Systems & Research</h3>
        <p style="color:#475569; font-size:0.85rem; line-height:1.4;">
          Rendering live through ported <strong>litehtml</strong> layout engine with full CSS box-model, DOM nodes, and <strong>QuickJS-ng</strong> ES2020 JavaScript execution running directly on Quin OS 2 bare-metal TCP stack.
        </p>
      </div>
    `;
  } else if (view === 'editor') {
    innerTitle.textContent = 'QuinDev IDE — main.c (TCC in-tree compiler)';
    innerContent.innerHTML = `
      <pre style="background:none; border:none; padding:0; font-size:0.82rem; color:#E2E8F0;"><span class="purple">#include</span> <span class="green">&lt;stdio.h&gt;</span>
<span class="purple">#include</span> <span class="green">&lt;quin/syscall.h&gt;</span>

<span class="yellow">int</span> <span class="cyan">main</span>(<span class="yellow">int</span> argc, <span class="yellow">char</span> **argv) {
    <span class="cyan">printf</span>(<span class="green">"Hello from inside Quin OS 2 Ring-3!\\n"</span>);
    <span class="cyan">printf</span>(<span class="green">"Compiled with in-OS TinyCC (tcc -o demo demo.c)\\n"</span>);
    <span class="yellow">return</span> <span class="purple">0</span>;
}</pre>
    `;
  } else if (view === 'sysmon') {
    innerTitle.textContent = 'System Monitor — Task Activity & Cores';
    innerContent.innerHTML = `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; font-size:0.78rem;">
        <div style="background:rgba(255,255,255,0.04); padding:0.75rem; border-radius:6px;">
          <div style="color:var(--accent); font-weight:bold; margin-bottom:0.25rem;">CPU Core 0 (BSP)</div>
          <div>State: RUNNING | Load: 4%</div>
          <div>Current Thread: qwm_compositor (TID 2)</div>
        </div>
        <div style="background:rgba(255,255,255,0.04); padding:0.75rem; border-radius:6px;">
          <div style="color:var(--accent); font-weight:bold; margin-bottom:0.25rem;">CPU Core 1 (AP 1)</div>
          <div>State: RUNNING | Load: 12%</div>
          <div>Current Thread: net_poll_thread (TID 5)</div>
        </div>
      </div>
      <div style="margin-top:0.75rem; color:#94A3B8; font-size:0.75rem;">
        Total Active Threads: 18 | Scheduler: Preemptive Round-Robin | Memory: 42.4 MB / 2048 MB
      </div>
    `;
  }
}

function executeCommand(cmd) {
  const terminalOut = document.getElementById('cli-output');
  if (!terminalOut) return;

  if (cmd === 'clear') {
    terminalOut.innerHTML = '';
    return;
  }

  const result = CLI_COMMANDS[cmd] || `qsh: command not found: ${cmd}`;
  const block = document.createElement('div');
  block.style.marginTop = '0.5rem';
  block.innerHTML = `
    <div><span class="os-cli-prompt">root@quin:~#</span> ${cmd}</div>
    <div style="color:#9CA3AF; white-space:pre-wrap; margin-top:0.2rem;">${result}</div>
  `;
  terminalOut.appendChild(block);
  terminalOut.scrollTop = terminalOut.scrollHeight;
}

/* ── Live In-Browser Search Engine for Documentation ──────────────────────── */
function initDocsSearch() {
  const searchInput = document.getElementById('docs-search');
  const docBlocks = document.querySelectorAll('.doc-block');
  const navItems = document.querySelectorAll('.docs-nav-item');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    docBlocks.forEach(block => {
      const text = block.textContent.toLowerCase();
      if (text.includes(query) || query === '') {
        block.style.display = 'block';
      } else {
        block.style.display = 'none';
      }
    });

    navItems.forEach(item => {
      const link = item.querySelector('a');
      const targetId = link.getAttribute('href').replace('#', '');
      const targetBlock = document.getElementById(targetId);

      if (targetBlock && targetBlock.style.display === 'none') {
        item.style.display = 'none';
      } else {
        item.style.display = 'block';
      }
    });
  });
}

/* ── Scroll Spy for Sticky Documentation Sidebar ──────────────────────────── */
function initScrollSpy() {
  const links = document.querySelectorAll('.docs-nav-item a');
  const blocks = document.querySelectorAll('.doc-block');

  window.addEventListener('scroll', () => {
    let currentId = '';
    blocks.forEach(block => {
      const top = block.offsetTop - 120;
      if (window.scrollY >= top) {
        currentId = block.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ── Code Copy Button with Toast ──────────────────────────────────────────── */
function initCodeCopy() {
  const copyButtons = document.querySelectorAll('.code-copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const targetPre = document.getElementById(targetId);
      if (targetPre) {
        const text = targetPre.innerText;
        navigator.clipboard.writeText(text).then(() => {
          showToast('Code copied to clipboard!');
        });
      }
    });
  });
}

/* ── Toast Alert Helper ───────────────────────────────────────────────────── */
function showToast(message) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}
