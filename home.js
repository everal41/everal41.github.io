document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.faction-tab');
  const quests = document.querySelectorAll('.quest-compact');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const faction = tab.dataset.faction;
      quests.forEach(q => {
        if (faction === 'all') {
          q.classList.remove('hidden');
        } else {
          const qFaction = q.dataset.faction;
          q.classList.toggle('hidden', qFaction !== faction && qFaction !== 'any');
        }
      });
    });
  });

  const copyBtn = document.getElementById('copyNickBtn');
  const nickEl = document.getElementById('gameNick');
  if (copyBtn && nickEl) {
    copyBtn.addEventListener('click', async () => {
      const nick = nickEl.textContent.trim();
      const icon = copyBtn.querySelector('i');
      try {
        await navigator.clipboard.writeText(nick);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = nick;
        ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      icon.className = 'fa-solid fa-check';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        icon.className = 'fa-regular fa-copy';
        copyBtn.classList.remove('copied');
      }, 2000);
    });
  }
});
