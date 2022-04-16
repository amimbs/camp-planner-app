const campplan = document.

campplan.addEventListener('click', event => {
    event.preventDefault();
    console.log(event)
    let campSiteName = document.getElementById('camp_site').value;
    console.log(campSiteName)
    let body = {
        name: campSiteName, grocery_list: grocery_list_arr, gear_list: gear_list_arr
    };
    console.log(body)
    fetch('/api/loadCampPlans', {
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
});