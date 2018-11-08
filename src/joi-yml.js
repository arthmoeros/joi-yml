const fs = require('fs');
const path = require('path');
const jsYaml = require('js-yaml');
const builder = require('joi-json').builder();

function parseYml(ymlFile){
    let currentPath = path.resolve(ymlFile);
    currentPath = path.dirname(currentPath);
    if(!fs.existsSync(ymlFile)){
        throw new Error(`Yaml file ${ymlFile} not found`);
    }
    let yaml = jsYaml.load(fs.readFileSync(ymlFile).toString());

    searchNode(yaml, currentPath);

    return yaml;
}

function searchNode(node, currentPath){
    for(let key in node){
        if(typeof(node[key]) === 'string' && node[key].startsWith('object:')){
            let required = node[key].endsWith('required');
            let refPath = required ? 
                path.join(currentPath,node[key].substring(7, node[key].length - 9))
                : path.join(currentPath,node[key].substring(7));
            node[key] = parseYml(refPath);
            if(required){
                node[key]['@required'] = true;
            }
        }else if(typeof(node[key]) === 'object'){
            searchNode(node[key], currentPath);
        }
    }
}

function getBuilt(ymlFile){
    return builder.build(parseYml(ymlFile) || {});
}

module.exports.parseYml = parseYml;
module.exports.getBuilt = getBuilt;