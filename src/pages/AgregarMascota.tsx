import React, { useRef, useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonInput,
  IonIcon,
  useIonAlert,
  useIonViewWillEnter
} from "@ionic/react";
import { arrowBack, call, helpCircle } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./AgregarMascota.css";

const AgregarMascota: React.FC = () => {
  const history = useHistory();
  const [presentAlert] = useIonAlert();

  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");
  const [raza, setRaza] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [foto, setFoto] = useState<string | null>(null);
  const [cambiosPendientes, setCambiosPendientes] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* 🔥 Se ejecuta SIEMPRE que entras a esta pantalla */
  useIonViewWillEnter(() => {
    resetForm();
  });

  const resetForm = () => {
    setNombre("");
    setEspecie("");
    setRaza("");
    setFechaNacimiento("");
    setFoto(null);
    setCambiosPendientes(false);
  };

  const detectarCambio = () => setCambiosPendientes(true);

  const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFoto(reader.result as string);
        detectarCambio();
      };
      reader.readAsDataURL(file);
    }
  };

    const guardar = () => {
    console.log("🔹 Click en GUARDAR");

    if (!nombre.trim() || !especie.trim() || !raza.trim()) {
      presentAlert({
        header: "Campos incompletos",
        message: "Por favor completa todos los campos.",
        buttons: ["OK"],
      });
      return;
    }

    try {
      let existentes: any[] = [];
      const raw = localStorage.getItem("mascotas");

      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          existentes = Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          console.warn("⚠️ Valor corrupto en 'mascotas', se reinicia la lista.", e);
          existentes = [];
        }
      }

      console.log("ANTES de guardar:", existentes);

      const nuevaMascota = {
        nombre,
        especie,
        raza,
        fechaNacimiento,
        foto: foto || "assets/foto-default.png",
      };

      existentes.push(nuevaMascota);

      localStorage.setItem("mascotas", JSON.stringify(existentes));
      console.log(
        "DESPUÉS de guardar:",
        JSON.parse(localStorage.getItem("mascotas") || "[]")
      );

      setCambiosPendientes(false);

      presentAlert({
        header: "Éxito",
        message: "Mascota guardada correctamente.",
        buttons: [
          {
            text: "OK",
            handler: () => history.push("/informacion-mascota"),
          },
        ],
      });
    } catch (error) {
      console.error("❌ Error guardando en localStorage:", error);
      presentAlert({
        header: "Error",
        message: "Ocurrió un error guardando los datos.",
        buttons: ["OK"],
      });
    }
  };


  const regresar = () => {
    if (cambiosPendientes) {
      presentAlert({
        header: "¿Deseas guardar?",
        message: "Hay cambios sin guardar.",
        buttons: [
          {
            text: "No guardar",
            role: "cancel",
            handler: () => history.push("/informacion-mascota")
          },
          { text: "Guardar", handler: guardar }
        ]
      });
    } else {
      history.push("/informacion-mascota");
    }
  };

  const irAContactanos = () => history.push("/contactanos");

  return (
    <IonPage>
      <IonContent fullscreen className="fondo">
        
        {/* 🔵 Franja superior */}
        <div className="franja-gruesa-superior">
          <IonIcon icon={arrowBack} className="back-icon" onClick={regresar} />
          <h1 className="titulo-editar">Agregar Mascota</h1>
        </div>

        {/* 🐶 Contenido */}
        <div className="contenedor">

          {/* Foto */}
          <div className="foto-container">
            <div className="foto-cuadro" onClick={() => fileInputRef.current?.click()}>
              {foto ? <img src={foto} alt="Foto de mascota" /> : <span>Sin foto</span>}
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={onFileSelected}
              hidden
            />

            <IonButton color="primary" onClick={() => fileInputRef.current?.click()}>
              Examinar
            </IonButton>
          </div>

          {/* Formulario */}
          <div className="formulario">

            <div className="campo">
              <label>Nombre</label>
              <IonInput
                placeholder="Ej. Luna"
                value={nombre}
                onIonChange={(e) => {
                  setNombre(e.detail.value || "");
                  detectarCambio();
                }}
              />
            </div>

            <div className="campo">
              <label>Especie</label>
              <IonInput
                placeholder="Ej. Perro"
                value={especie}
                onIonChange={(e) => {
                  setEspecie(e.detail.value || "");
                  detectarCambio();
                }}
              />
            </div>

            <div className="campo">
              <label>Raza</label>
              <IonInput
                placeholder="Ej. Labrador"
                value={raza}
                onIonChange={(e) => {
                  setRaza(e.detail.value || "");
                  detectarCambio();
                }}
              />
            </div>

            <div className="campo">
              <label>Fecha de nacimiento</label>
              <IonInput
                type="date"
                value={fechaNacimiento}
                onIonChange={(e) => {
                  setFechaNacimiento(e.detail.value || "");
                  detectarCambio();
                }}
              />
            </div>

          </div>

          {/* Guardar */}
          <IonButton expand="block" color="primary" onClick={guardar}>
            Guardar
          </IonButton>

        </div>

        {/* 🔵 Footer */}
        <div className="franja-gruesa-inferior">
          <div className="footer-icons">
            <IonIcon icon={call} className="footer-icon" onClick={irAContactanos} />
            <IonIcon icon={helpCircle} className="footer-icon" onClick={irAContactanos} />
          </div>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default AgregarMascota;
