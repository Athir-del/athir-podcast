async function loadMatches() {
    try {
        const response = await fetch('./matches.json');
        const data = await response.json();
        const container = document.getElementById('matches-container');
        if(!container) return;
        
        container.innerHTML = ''; 

        data.matches.forEach(match => {
            const card = document.createElement('div');
            card.className = 'match-card';
            
            const homeScore = match.score.fullTime.home ?? '-';
            const awayScore = match.score.fullTime.away ?? '-';
            
            card.innerHTML = `
                <span class="league">${match.competition.name}</span>
                <div class="teams">
                    <span>${match.homeTeam.shortName || match.homeTeam.name}</span>
                    <span class="score">${homeScore} : ${awayScore}</span>
                    <span>${match.awayTeam.shortName || match.awayTeam.name}</span>
                </div>
                <div class="status">${match.status === 'IN_PLAY' ? '🔴 مباشر' : '🕒 ' + match.status}</div>
            `;
            container.appendChild(card);
        });
    } catch (e) {
        console.error("خطأ:", e);
        document.getElementById('matches-container').innerHTML = "تعذر تحميل النتائج حالياً.";
    }
}
loadMatches();
