const siteList = document.getElementById('site-list');
const today = new Date().toDateString();


function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
}


for (let i = 0; i < localStorage.length; i++) {
    const key =localStorage.key(i);
    try {
        const data = JSON.parse(localStorage.getItem(key));
        if ( data.date === today  && typeof data.time === "number" ) {
            const listItem = document.createElement('li');
            listItem.textContent = `${key} - ${formatTime(data.time)}`;
            siteList.appendChild(listItem);
        }
    }
    catch (error) {
       continue;
    }
}