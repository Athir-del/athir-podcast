async function loadMatches() {
    try {
        const response = await fetch('./matches.json');
        const data = await response.json();
        
        const container = document.getElementById('matches-container');
        if(!container) return;
        
        container.innerHTML = ''; 

        data.matches.forEach(match => {
            const div = document.createElement('div');
            div.className = 'match-card';
            div.innerHTML = `
                <div style="border: 1px solid #ccc; margin: 10px; padding: 10px; border-radius: 8px;">
                    <p><strong>${match.competition.name}</strong></p>
                    <p>${match.homeTeam.name} VS ${match.awayTeam.name}</p>
                    <p>النتيجة: ${match.score.fullTime.home ?? 0} - ${match.score.fullTime.away ?? 0}</p>
                </div>
            `;
            container.appendChild(div);
        });
    } catch (e) {
        console.error("خطأ في جلب البيانات:", e);
    }
}
loadMatches();
