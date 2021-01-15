/**
 * @Author: Guillermo
 * @Date:   2020-08-25T19:14:45-05:00
 * @Email:  g.correa@kimeras-studio.com
 * @Project: Juguetilandia API REST
 * @Last modified by:   memo
 * @Last modified time: 2020-10-12T13:10:48-05:00
 * @License: MIT
 */
 module.exports =  {

  SUCCESS : {
               code: "0000",
               message: "Operación exitosa."
             },

  SUCCES_UPDATE : {
              code: "0000",
              message: "Su registro fue actualizado exitosamente."
            },


  SUCCESS_VIDEO: {
               code: "0000",
               message: "Gracias, tu carta ha sido leída por Santa."
             },

 SUCCESS_DELETE  : {
   code: "0000",
   message: "El registro fue eliminado exitosamente."
 },

 NAME_REQUIRED  : {
         code: "5000",
         message: "Tu nombre es requerido."
      },


  INVALID_DATA:{
        code: "1000",
        message: "Usuario o contraseña inválidos. Revise su información."
  },


  INVALID_DATA_1:{
        code: "1001",
        message: "Nombre, correo, número telefónico y contraseña del usuario son datos requeridos."
  },

  INVALID_DATA_2:{
        code: "1002",
        message: "El nombre de la carpeta contenedora es requerido."
  },

  INVALID_DATA_3:{
    code: "1003",
    message: "Los parametros siguientes son requeridos: nombre, descripción, SKU, marca y url de compra."
  },

  INVALID_DATA_4:{
    code: "1004",
    message: "Los parametros siguientes son requeridos: email, contraseña."
  },

  INVALID_DATA_5:{
    code: "1004",
    message: "El email es requerido."
  },

  ID_INVALID3:{
        code: "1005",
        message: "Formato de archivo inválido."
  },

  ID_INVALID_GENERIC_001:{
        code: "1006",
        message: "El valor del identificador es requerido."
  },

  ID_INVALID_GENERIC_002:{
        code: "1007",
        message: "Ningún registro fue eliminado, revise sus datos."
  },

  ID_INVALID_VIDEO_001:{
        code: "1008",
        message: "Los identificadores de usuario y video son requeridos."
  },

  ID_INVALID_VIDEO_002:{
        code: "1009",
        message: "Las imágenes son requeridas para procesar el video."
  },

  ID_INVALID_STEP_MOTION_001:{
        code: "1010",
        message: "Las fechas de búsqueda deben ser exclusivas (greaterDate&&lowerDate OR date)."
  },

  ID_INVALID_STEP_MOTION_002:{
        code: "1011",
        message: "La imagen y el nombre de la carpeta contenedora son requeridos."
  },

  EMAIL_EXISTS:{
    code: "1012",
    // message: "Ya existe un usuario asociado a este email."
    message:" El usuario está registrado previamente, confirme su código de verificación."
  },

  ID_INVALID_CREATE_CHAT:{
        code: "1013",
        message: "Es requerido un identificador de evento válido."
  },

  ID_INVALID_CREATE_COMMENT:{
    code: "1014",
    message: "El comentario y el usuario es requerido."
  },

  ID_INVALID_VIEW_CATALOG:{
    code: "1015",
    message: "El email, enum de catalogo y su valor son requeridos."
  },

  ID_INVALID_VIEW_CATALOG_001:{
    code: "1016",
    message: "El identificador del juego y su marcador son requeridos."
  },

  ID_INVALID_CREATE_CARD:{
    code: "1017",
    message: "El id del usuario es requerido."
  },

  ID_INVALID_PATCH_CARD:{
    code: "1018",
    message: "El id del usuario es requerido."
  },

  ID_INVALID_VIEW_SECTION:{
    code: "1019",
    message: "El nombre de la sección visitada es requerido."
  },

  DUPLICATE_DATA:{
    code: "1020",
    message: "El nombre ya está dado de alta previamente."
  },

  DUPLICATE_DATA:{
    code: "1021",
    message: "El sku del producto ya está dado de alta previamente."
  },


  ERROR_SERVER  : {
          code: "5000",
          message: "Error al procesar su información en el servidor. "
  },

  ERROR_SERVER_001  : {
          code: "5000",
          message: "Datos inválidos."
  },

}
