export function setupToggleLogs() {
    const logSection = document.getElementById('logs');
    const showLogButton = document.getElementById('btnToggleLogs');
    let showLogs = false;

    showLogButton.addEventListener('click', () => {
        showLogs = !showLogs;
        logSection.style.display = showLogs? 'block' : 'none';
        showLogButton.textContent = showLogs ? 'Ocultar últimos eventos' : 'Mostrar últimos eventos';
    });
}