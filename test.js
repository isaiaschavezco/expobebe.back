/**
 * @Author: memo
 * @Date:   2020-10-22T09:56:14-05:00
 * @Last modified by:   memo
 * @Last modified time: 2020-10-22T09:59:08-05:00
 */
 var verificationCode = (Math.random().toString(36).slice(2)).toUpperCase().replace(/'.'/g, '9').substring(0,4)
console.log("verificationCode:", verificationCode)
