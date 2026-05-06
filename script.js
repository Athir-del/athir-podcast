async function loadMatches() {
    try {
        // إضافة رقم عشوائي لمنع المتصفح من تخزين نسخة قديمة
        const response = await fetch('./matches.json?v=' + Math.random());
        if (!response.ok) throw new Error("File not found");
        
        const data = await response.json();
        const container = document.getElementById('matches-container');
        if(!container) return;
        
        container.innerHTML = ''; 

        if (!data.matches || data.matches.length === 0) {
            container.innerHTML = "<p>📅 لا توجد مباريات حالياً</p>";
            return;
        }

        data.matches.forEach(match => {
            const card = document.createElement('div');
            card.className = 'match-card';
            const homeScore = match.score.fullTime.home ?? '-';
            const awayScore = match.score.fullTime.away ?? '-';
            
            card.innerHTML = `
                <span class="league">${match.competition.name}</span>
                <div class="teams">
                    <span>${match.homeTeam.name}</span>
                    <span class="score">${homeScore} : ${awayScore}</span>
                    <span>${match.awayTeam.name}</span>
                </div>
                <div class="status">${match.status}</div>
            `;
            container.appendChild(card);
        });
    } catch (e) {
        console.error(e);
        document.getElementById('matches-container').innerHTML = "⚠️ تأكد من تشغيل ./up.sh ورفع الملف";
    }
}
loadMatches();
