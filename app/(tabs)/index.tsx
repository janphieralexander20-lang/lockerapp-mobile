import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  // Aquí guardamos temporalmente lo que el usuario escribe
  const [correo, setCorreo] = useState("");
  const [pin, setPin] = useState("");

  // Nueva función que se conecta al servidor real
  const intentarAbrir = async () => {
    // 1. Reemplaza la IP por la Dirección IPv4 de tu computadora
    const url_del_servidor =
      "https://unswooning-aldo-pseudochemical.ngrok-free.dev/api/abrir";
    try {
      // Le enviamos los datos al servidor con el PASE VIP de Ngrok
      const respuesta = await fetch(url_del_servidor, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true", // <--- ESTE ES EL PASE VIP
        },
        body: JSON.stringify({
          correo: correo,
          pin: pin,
        }),
      });

      // Leemos lo que nos responde el servidor
      const datos = await respuesta.json();

      if (respuesta.ok) {
        Alert.alert("✅ ¡Éxito!", datos.mensaje);
      } else {
        Alert.alert("❌ Error", datos.mensaje);
      }
    } catch (error) {
      Alert.alert(
        "📶 Sin conexión",
        "No se pudo conectar al servidor. Revisa tu Wi-Fi y la IP.",
      );
    }
  };
  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <Text style={styles.titulo}>lockerApp</Text>
      <Text style={styles.subtitulo}>Acceso seguro a tu casillero</Text>

      {/* Caja para el correo */}
      <TextInput
        style={styles.input}
        placeholder="Correo institucional"
        keyboardType="email-address"
        autoCapitalize="none"
        value={correo}
        onChangeText={setCorreo}
      />

      {/* Caja para el PIN (Oculta los números con puntitos) */}
      <TextInput
        style={styles.input}
        placeholder="PIN de seguridad"
        keyboardType="numeric"
        secureTextEntry={true} // Esto hace que se vea como contraseña
        maxLength={4}
        value={pin}
        onChangeText={setPin}
      />

      {/* Botón principal */}
      <TouchableOpacity style={styles.boton} onPress={intentarAbrir}>
        <Text style={styles.textoBoton}>ABRIR CASILLERO</Text>
      </TouchableOpacity>
    </View>
  );
}

// Aquí le damos estilo y color profesional a todo (CSS para móviles)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 55,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#dcdde1",
    fontSize: 16,
  },
  boton: {
    width: "100%",
    height: 55,
    backgroundColor: "#2980b9", // Un azul profesional
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    elevation: 3, // Le da una pequeña sombra en Android
  },
  textoBoton: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
