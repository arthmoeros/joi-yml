const joiYml = require('./src/joi-yml');

console.log('================= Parsed YML');
console.log(joiYml.parseYml('./test/main.yml'));
console.log('============================');
console.log('================= Built YML using parser and joi-json');
console.log(joiYml.getBuilt('./test/main.yml'));
console.log('============================');