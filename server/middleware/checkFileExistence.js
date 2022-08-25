const fs = require('fs')
const path = require('path')


const checkFileExistence = (dirPath, file) => {
    const dir = path.join(__dirname, dirPath)
    console.log(dir);
    let returnData = null

    fs.readdir(dir, (err, res) => {
        if (err) {
            return console.error(err);
        }

       const d =  res.map((data) => {
            if(fs.readFileSync(dir + "/" + data, {encoding: 'utf-8', flag: 'r'}) === fs.readFileSync(dir + "/" + file, {encoding: 'utf-8', flag: 'r'})){
                return dir + "/" + data
            }
        })

        console.log(d);
    })

    return returnData

}

module.exports = checkFileExistence
