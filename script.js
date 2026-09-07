// Interactive Matrix Canvas Background
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const letters = '01100101010110001010101010101010101010101';
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawCanvas() {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#6366f1';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(drawCanvas, 33);

// Interactive Terminal Functionality
const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');
const terminalSend = document.getElementById('terminal-send');

const COMMANDS = {
    'ai-stack': `[AI Stack & Agentic Tools]
- Model Context Protocol (MCP) integrations
- Quantized Local LLMs (GGUF via Llama.cpp on Apple Silicon M-series, 24GB RAM)
- Autonomous Agentic Workflows & Tool Callings
- RAG Systems, Claude API, OpenAI Integration
- Cursor IDE & Antigravity Tooling`,

    'projects-list': `[Master Project Catalog (20 Projects)]
A. AI ERA: TalkndhealAI, Voca Telecom Engine, VegFrooto, Agentic MCP Integrations
B. MATELLIO: Leman Health, Phoenix Technology, Muferral Marketplace, Accu-Image, Credit360, Wadhwas, Juzmarried, Steel Cart, JCHSPFA/HKPFA, Allegro/HKMC
C. CG TECHNOSOFT: Support Leaf, Judaísmo a fondo, Orderstay
D. EARLY CAREER: Mobile Pandit, Mybag, Martgram, Raydaar, Localgenii, MCA Portal`,

    'contact': `[Contact Details]
- Email: swtumadan@gmail.com
- Phone: +91 7737333527
- Address: Jaipur, 303338 Rajasthan, India`,

    'summary': `Results-driven Senior Full-Stack Engineer & Mobile Architect with over 10 years of experience. Transitioning from high-scale mobile ecosystem leadership (iOS, Swift, SwiftUI, React Native) to an autonomous IC in the AI Agentic Era.`,

    'help': `Available commands: ai-stack, projects-list, contact, summary, clear`
};

function runCommand(cmd) {
    const cleanCmd = cmd.trim().toLowerCase();
    
    // Echo user input
    const userLine = document.createElement('div');
    userLine.className = 'text-slate-400';
    userLine.textContent = `$ ${cmd}`;
    terminalOutput.appendChild(userLine);

    if (cleanCmd === 'clear') {
        terminalOutput.innerHTML = '';
        return;
    }

    const response = COMMANDS[cleanCmd] || `Command not recognized: '${cmd}'. Type 'help' for available commands.`;
    
    const responseLine = document.createElement('div');
    responseLine.className = 'text-emerald-400 whitespace-pre-wrap';
    responseLine.textContent = response;
    terminalOutput.appendChild(responseLine);

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

terminalSend?.addEventListener('click', () => {
    if (terminalInput.value) {
        runCommand(terminalInput.value);
        terminalInput.value = '';
    }
});

terminalInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && terminalInput.value) {
        runCommand(terminalInput.value);
        terminalInput.value = '';
    }
});

// Project Filtering Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
