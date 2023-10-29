/** Database  
- Trabaja con la conexion a la base de datos utilizando mongoose
- Creamos modelos y grabamos y leemos
- yarn add mongoose
**/

import mongoose, { mongo } from "mongoose";
/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 **/
const mongoConnection = {
  isConnected: 0,
};

export const connectDB = async () => {
  if (mongoConnection.isConnected) {
    console.log("Already connected");
    return;
  }
  // Si hay alguna conexion abierta, la cerramos
  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;
    if (mongoConnection.isConnected === 1) {
      console.log("Use previous connection");
      return;
    }
    // Evitamos otras conexiones
    await disconnect();
  }

  await mongoose.connect(process.env.MONGO_URL || '');
  mongoConnection.isConnected = 1;
  console.log("Connected to  mongo DB", process.env.MONGO_URL )
};

// Cerramos la conexion
export const disconnect = async () => {
  if(process.env.NODE_ENV === 'development') return; // Evitar desconecciones en desarrollo
  if (mongoConnection.isConnected === 0) return;
  await mongoose.disconnect();
  mongoConnection.isConnected = 0;
  console.log("Disconnected from mongo DB");
};

export const  db = {	
  connectDB,
  disconnect,
};