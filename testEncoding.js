/**
 * @Author: memo
 * @Date:   2020-10-06T17:07:42-05:00
 * @Last modified by:   memo
 * @Last modified time: 2020-10-06T17:16:35-05:00
 */
 var assert = require('assert');
 var crypto = require('crypto');

 var algorithm = 'aes-256-cbc';
 var inputEncoding = 'utf8';
 var outputEncoding = 'hex';

 // var key = 'R42';
 var key = 'aquivamiclavedeencriptacion';

 var text = 'g.correa@kimera-studio.com';

 console.log('Ciphering "%s" with key "%s" using %s', text, key, algorithm);

 var cipher = crypto.createCipher(algorithm, key);
 var ciphered = cipher.update(text, inputEncoding, outputEncoding);
 ciphered += cipher.final(outputEncoding);

 console.log('Result in %s is "%s"', outputEncoding, ciphered);

 var decipher = crypto.createDecipher(algorithm, key);
 var deciphered = decipher.update(ciphered, outputEncoding, inputEncoding);
 deciphered += decipher.final(inputEncoding);

 console.log("deciphered:"+deciphered);
 assert.equal(deciphered, text, 'Deciphered text does not match!');
