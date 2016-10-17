var fs = require('fs');
var readline = require('readline');
var rstream = fs.createReadStream('output.txt');
var ip_stream = fs.createWriteStream('ip.txt');
var host_stream = fs.createWriteStream('hosts.txt');
var line = readline.createInterface(rstream, ip_stream);

function main () {

    line.on('line', function (line) {
        var ssg_obj= {};
        ssg_obj.ip = line.substr(0, 20).trim();
        ssg_obj.end_index = line.search(/ all/);

        line = line.replace(/ all/, '');
        line = line.replace(/[\(\)&]/g, '');

        ssg_obj.host_name = line.substr(20, ssg_obj.end_index).trim();

        try {
            ip_stream.write(ssg_obj.ip + '\r\n');
            host_stream.write(ssg_obj.host_name + '\r\n');
        } catch (err) {
            console.log('Error parsing: \n' + err);
            return 1;
        }
    });
    console.log('Parsed nodes successfully.');
}

main();