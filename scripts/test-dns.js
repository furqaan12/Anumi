const dns = require('dns');
const url = 'ep-patient-firefly-a11ycgdw-pooler.ap-southeast-1.aws.neon.tech';

dns.resolve4(url, (err, addresses) => {
    if (err) console.error('IPv4 Error:', err);
    else console.log('IPv4:', addresses);
});

dns.resolve6(url, (err, addresses) => {
    if (err) console.error('IPv6 Error:', err);
    else console.log('IPv6:', addresses);
});
