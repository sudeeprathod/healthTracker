var fs = require('fs');
const mapper = [{
        BMICatogories: "underWeight",
        BMIHealthRisk: "Malnutrition",
        rangeFrom: 0,
        rangeTo: 18.4
    },
    {
        BMICatogories: "Normal weight",
        BMIHealthRisk: "Low risk",
        rangeFrom: 18.5,
        rangeTo: 25
    },
    {
        BMICatogories: "Overweight",
        BMIHealthRisk: "Enhanced risk",
        rangeFrom: 25,
        rangeTo: 30
    }, {
        BMICatogories: "Moderately obese",
        BMIHealthRisk: "Medium risk",
        rangeFrom: 30,
        rangeTo: 35
    }, {
        BMICatogories: "Severely obese",
        BMIHealthRisk: "high risk",
        rangeFrom: 35,
        rangeTo: 40
    }, {
        BMICatogories: "Very severely obese",
        BMIHealthRisk: "Very high risk",
        rangeFrom: 40,
        rangeTo: 100
    },
]
let data = ''
var readStream = fs.createReadStream('./data.json', {
    encoding: 'utf8'
});

readStream.on('data', function (chunk) {
    let chunkData = JSON.parse(chunk)
    for (let i = 0; i < chunkData.length; i++) {
        const element = chunkData[i];
        let data = (element.WeightKg / (element.HeightCm / 100) ^ 2)
        let mainData = mapper.filter(ele => {
            return (data >= ele.rangeFrom && data <= ele.rangeTo)
        })
        element.BMICatogories = mainData[0].BMICatogories,
            element.BMIHealthRisk = mainData[0].BMIHealthRisk
    }
    data += JSON.stringify(chunkData);

}).on('end', function () {
    fs.open('./result.json', 'a', (err, fd) => {
        if (err) throw err;
        fs.appendFile(fd, data, 'utf8', (err) => {
            fs.close(fd, (err) => {
                if (err) throw err;
            });
            if (err) throw err;
        });
    });
});