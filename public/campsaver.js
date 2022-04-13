const saveCampsiteForm = document.getElementById('saveCampsiteForm');

saveCampsiteForm.addEventListener('submit' , event => {
    event.preventDefault();

    // let user_id = e.
    let campSiteName = event.target.campSiteName.value

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
        console.log(data)

        // location.href = "/dashboard"
    })
})