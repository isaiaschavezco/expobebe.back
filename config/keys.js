/**
 * @Author: Guillermo
 * @Date:   2020-08-25T18:30:47-05:00
 * @Email:  g.correa@kimeras-studio.com
 * @Project: Juguetilandia API REST
 * @Last modified by:   memo
 * @Last modified time: 2020-10-22T10:01:50-05:00
 * @License: MIT
 */
 module.exports = {
 	//DEV
 	// mongoURI:"mongodb+srv://walmart:juguetilandia2021@cluster0.dms68.mongodb.net/Juguetilandia?retryWrites=true&w=majority",
   mongoURI:"mongodb+srv://inmersys:UVbY0OXyN73cZQx5@cluster0.oq8ay.mongodb.net/expobebe?retryWrites=true&w=majority",
   //PROD
  //  mongoURI:"mongodb+srv://inmersys:#Y0u4r31n@cluster0.oq8ay.mongodb.net/expobebe?retryWrites=true&w=majority",
  //HOST 
  //mongoURI:"mongodb://localhost/juguetilandia",
  secretOrKey: "mys3cr3tp455w0rd2compl3t3th3r3qu35t",
  RES_PER_PAGE:1000,
  SPACES_KEY:"ZM73SY223CQUVBKMPSDQ",
  SPACE_ENDPOINT:"sfo2.digitaloceanspaces.com",
  SPACES_SECRET:"svQzcBcaBoe8v5m2RIrMBXUvTa0i28R1F+PkRZS1Yoo",
  BUCKET_NAME:"juguetilandia.media",
  CRYPTP_KEY:'aquivamiclavedeencriptacion',
  INPUT_ENCODING:'utf8',
  OUTPUT_ENCODING:'hex',
  CRYPTP_ALGORITHM:'aes-256-cbc'
}
