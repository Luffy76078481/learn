
var glob = require("glob")
var fs = require("fs");

function readFile(path) {
    return fs.readFileSync(path).toString();
}
function writeFile(path, content) {
    fs.writeFileSync(path, content, {encoding:"utf8",flag:"w"});
}


function readConfig() {
    var configContent = readFile("config/config.js");
    var i = configContent.indexOf("{");
    configContent = configContent.substring(i);
    return JSON.parse(configContent);
}
var config = readConfig();
const startTag = "//__start";
const endTag = "//__end";
function replaceVariables(content) {
    var tag = false;
    var ret = "";
    var off = 0;
    while (true) {
        var i = content.indexOf(startTag, off);
        if (i < 0) {
            if (tag) {
                ret += content.substring(off);
                return ret;
            } else {
                return false;
            }
        } else {
            tag = true;
        }

        var j = content.indexOf("\n", i + startTag.length)
        var tem = content.substring(i + startTag.length, j).trim();
        tem = tem.replace("#{spec}", config.spec);
        var k = content.indexOf(endTag, j);

        ret += content.substring(off, j) + "\n";
        ret += tem + "\n";
        off = k;
    }
}
glob("src/**/*.js", {}, function (er, files) {
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var content = readFile(file);
        content = replaceVariables(content);
        if (content) {
            console.log("prebuild中文的" + file);
            // console.log(content);
            writeFile(file, content);
        }
    }
});