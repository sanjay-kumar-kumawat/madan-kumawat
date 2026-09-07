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
    'ai-stack': `[AI Stack Details]
- Model Context Protocol (MCP) integrations
- Quantized Local LLMs (GGUF via Llama.cpp on Apple Silicon M-series, 24GB RAM)
- RAG Systems, Claude API, OpenAI SDK
- Cursor IDE & Antigravity Workflows`,

    'flagship-projects': `[AI Flagships]
1. TalkndhealAI -> Mental Wellness & Therapeutic AI App
2. Voca Telecom Engine -> Sub-second latency call-answering AI assistant
3. Agentic MCP Tools -> Contextual repository execution tools`,

    'contact': `[Contact Coordinates]
- Email: swtumadan@gmail.com
- Phone: +91 7737333527
- Location: Jaipur, 303338 Rajasthan, India`,

    'summary': `Senior Full-Stack & Mobile Architect transitioning to an autonomous high-impact IC in the AI Agentic Era. Over 10+ years of tech leadership experience.`,

    'help': `Available commands: ai-stack, flagship-projects, contact, summary, clear`
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
