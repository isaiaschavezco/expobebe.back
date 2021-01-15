/**
 * @Author: memo
 * @Date:   2020-09-23T14:45:14-05:00
 * @Last modified by:   memo
 * @Last modified time: 2020-09-23T14:47:59-05:00
 */
 class JuguetilandiaError extends Error {
   constructor(message) {
     super(message);
     this.name = this.constructor.name;
     Error.captureStackTrace(this, this.constructor);
   }
 }

 class DuplicateDataError extends JuguetilandiaError {
   constructor(resource) {
     super(`El dato  ${resource} ya habia sido agregado a la base.`);
     this.data = { resource };
   }
 }

 class InternalError extends JuguetilandiaError {
   constructor(error) {
     super(error.message);
     this.data = { error };
   }
 }

 module.exports = {
   DuplicateDataError,
   InternalError,
 };
