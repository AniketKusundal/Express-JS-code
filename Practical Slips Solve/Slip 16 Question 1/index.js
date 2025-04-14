
const os = require('os')


const OsPlatfrom = os.platform()
console.log(OsPlatfrom)

const temp = os.tmpdir()
console.log("Temparary Files " , temp)