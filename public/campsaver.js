const saveCampsiteForm = document.getElementById('saveCampsiteForm');

saveCampsiteForm.addEventListener('submit' , event => {
    event.preventDefault();

    let campSiteName = event.target.campSiteName.value;

    let body = {
        name: campSiteName
    }

    fetch('/api/savecampSite', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(data => {
        const plansList = document.getElementById('plansList');
        const anchor = document.createElement('a');
        const paragraph = document.createElement('p');

        anchor.innerText = data.name;
        paragraph.append(anchor);
        plansList.append(paragraph);
    });
})