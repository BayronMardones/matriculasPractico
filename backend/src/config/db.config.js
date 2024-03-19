import { connect } from "mongoose";

// La configuracion de las variables de entorno se encuentra en el archivo .env
// y se cargan en el archivo env.config.js
import { DB_URL } from "./env.config.js";

// Funcion que crea la conexion a la base de datos
export async function setupDB() {
	try {
		await connect(DB_URL);
		console.log("=> Conexion a la base de datos exitosa");
	} catch (error) {
		console.error(
			"=> Ocurrio un error al intentar conectar a la base de datos"
		);
		console.error(error);
	}
}
