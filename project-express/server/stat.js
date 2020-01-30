const fs = require('fs');
const statsFile = './server/db/stats.json';


const stat = (product, action) => {

    let now = new Date();

    let newRecord = {
        time: now,
        action: action,
        product: product,
    };



    fs.readFile(statsFile, 'utf-8', (err, data) => {
        if (err) {
            console.log(`Ошибка чтения файла ${statsFile}`);
        } else {
            try {
                let objData = JSON.parse(data);
                objData.numberOfRecords = objData.records.push(newRecord);

                const newStats = JSON.stringify(objData, null, 4);

                fs.writeFile(statsFile, newStats, (err) => {
                    if (err) {
                        console.log(`Ошибка записи обновленной статистики в файл ${statsFile}`);
                    }
                })

            } catch (e) {
                console.log(`Ошибка обработки json-строки из файла ${statsFile}`);
            }
        }
    });
};


module.exports = stat;