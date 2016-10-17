var fs = require('fs');
var readline = require('readline');
var rstream = fs.createReadStream('output.txt');
var ip_stream = fs.createWriteStream('ip.txt');
var host_stream = fs.createWriteStream('hosts.txt');
var line = readline.createInterface(rstream, ip_stream);


function main () {
    line.on('line', function (line) {
        var ip = line.substr(0, 20);
        ip = ip.trim();
        var end_index = line.search(/all/);
        line = line.replace(/ all/, '');
        line = line.replace(/[\(\)&]/g, '');
        var hostname = line.substr(20, end_index);
        try {
            ip_stream.write(ip.trim() + '\r\n');
            host_stream.write(hostname + '\r\n');
        } catch (err) {
            console.log(err);
            return 1;
        }
    });
}
main();