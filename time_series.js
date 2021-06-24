fetch('owid-covid-data.csv')
    .then(function (response) {
        return response.text();
    })
    .then(function (text) {
        let series = create_time_series(text);
        create_chart(series);
    })
    .catch(function (error) {
        console.log(error);
    });

function create_time_series(text) {
    const total_cases_ = 'total_cases';
    let dataAsJson = JSC.csv2Json(text);
    let poland_ = [], ukraine_ = [];
    dataAsJson.forEach(function (row) {
        if (row.continent === 'Europe') {
            if (row.location === 'Poland') {
                poland_.push({ x: row.date, y: row[total_cases_] });
            }
            else if (row.location === 'Ukraine') {
                ukraine_.push({ x: row.date, y: row[total_cases_] });
            }
        }
    });
    console.log([poland_, ukraine_]);
    return [
        { name: 'Poland', points: poland_},
        { name: 'Ukraine', points: ukraine_}

    ];

}
function create_chart(series) {
    JSC.Chart('chartDiv', {
        series: series
    });
}
