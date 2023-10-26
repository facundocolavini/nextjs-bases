/** Database  
- Trabaja con la conexion a la base de datos utilizando mongoose
- Creamos modelos y grabamos y leemos
- yarn add mongoose
**/

import mongoose from "mongoose";
/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 **/
const mongooConnection = {
  isConnected: 0,
};

export const connectDB = async () => {
  if (mongooConnection.isConnected) {
    console.log("Already connected");
    return;
  }
  // Si hay alguna conexion abierta, la cerramos
  if (mongoose.connections.length > 0) {
    mongooConnection.isConnected = mongoose.connections[0].readyState;
    if (mongooConnection.isConnected === 1) {
      console.log("Use previous connection");
      return;
    }
    // Evitamos otras conexiones
    await disconnect();
  }

  await mongoose.connect(process.env.MONGO_URL || '');
  mongooConnection.isConnected = 1;
  console.log("Connected to  mongo DB", process.env.MONGO_URL )
};

// Cerramos la conexion
export const disconnect = async () => {
  if(process.env.NODE_ENV === 'development') return; // Evitar desconecciones en desarrollo
  if (mongooConnection.isConnected === 0) return;
  await mongoose.disconnect();
  console.log("Disconnected from mongo DB");
};
