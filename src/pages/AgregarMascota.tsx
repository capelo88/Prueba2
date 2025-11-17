import React, { useEffect, useRef, useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonIcon,
  useIonAlert,
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

  const detectarCambio = () => setCambiosPendientes(true);

  const resetForm = () => {
    setNombre("");
    setEspecie("");
    setRaza("");
    setFechaNacimiento("");
    setFoto(null);
    setCambiosPendientes(false);
  };

  // ionViewWillEnter -> al montar el componente
  useEffect(() => {
    resetForm();
  }, []);

  const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFoto(reader.result as string);
        setCambiosPendientes(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const guardar = async () => {
    if (!nombre.trim() || !especie.trim() || !raza.trim()) {
      presentAlert({
        header: "Campos incompletos",
        message: "Por favor, completa todos los campos obligatorios.",
        buttons: ["OK"],
      });
      return;
    }

    const existentes: any[] = JSON.parse(
      localStorage.getItem("mascotas") || "[]"
    );

    existentes.push({
      nombre,
      especie,
      raza,
      fechaNacimiento,
      foto: foto || "assets/foto-default.png",
    });

    localStorage.setItem("mascotas", JSON.stringify(existentes));

    resetForm();

    presentAlert({
      header: "Éxito",
      message: "Mascota guardada correctamente.",
      buttons: [
        {
          text: "OK",
          handler: () => {
            history.push("/informacion-mascota");
          },
        },
      ],
    });
  };

  const regresar = () => {
    if (cambiosPendientes) {
      presentAlert({
        header: "¿Deseas guardar los cambios?",
        message: "Tienes datos sin guardar.",
        buttons: [
          {
            text: "No guardar",
            role: "cancel",
            handler: () => history.push("/informacion-mascota"),
          },
          {
            text: "Guardar",
            handler: () => {
              guardar();
            },
          },
        ],
      });
    } else {
      history.push("/informacion-mascota");
    }
  };

  const irAContactanos = () => {
    history.push("/contactanos");
  };

  return (
    <IonPage>
      <IonContent fullscreen className="fondo">
        {/* Franja superior con flecha y título */}
        <div className="franja-gruesa-superior">
          <IonIcon
            icon={arrowBack}
            className="back-icon"
            onClick={regresar}
          />
          <h1 className="titulo">Agregar Mascota</h1>
        </div>

        {/* Contenido principal */}
        <div className="contenedor">
          {/* Cuadro de foto */}
          <div className="foto-container">
            <label className="foto-cuadro">
              {foto ? (
                <img src={foto} alt="Foto de la mascota" />
              ) : (
                <span>Sin foto</span>
              )}
            </label>

            {/* Input file oculto */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={onFileSelected}
              hidden
            />

            <IonButton
              expand="block"
              color="primary"
              onClick={() => fileInputRef.current?.click()}
            >
              Examinar
            </IonButton>
          </div>

          {/* Campos de texto */}
          <IonItem>
            <IonLabel position="stacked">Nombre</IonLabel>
            <IonInput
              value={nombre}
              placeholder="Ej. Luna"
              onIonChange={(e) => {
                setNombre(e.detail.value || "");
                detectarCambio();
              }}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Especie</IonLabel>
            <IonInput
              value={especie}
              placeholder="Ej. Perro"
              onIonChange={(e) => {
                setEspecie(e.detail.value || "");
                detectarCambio();
              }}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Raza</IonLabel>
            <IonInput
              value={raza}
              placeholder="Ej. Labrador"
              onIonChange={(e) => {
                setRaza(e.detail.value || "");
                detectarCambio();
              }}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Fecha de nacimiento</IonLabel>
            <IonInput
              type="date"
              value={fechaNacimiento}
              onIonChange={(e) => {
                setFechaNacimiento(e.detail.value || "");
                detectarCambio();
              }}
            />
          </IonItem>

          {/* Botón Guardar */}
          <div className="button-container">
            <IonButton expand="block" color="primary" onClick={guardar}>
              guardar
            </IonButton>
          </div>
        </div>

        {/* Franja inferior con iconos */}
        <div className="franja-gruesa-inferior">
          <div className="footer-icons">
            <IonIcon
              icon={call}
              className="footer-icon"
              onClick={irAContactanos}
            />
            <IonIcon
              icon={helpCircle}
              className="footer-icon"
              onClick={irAContactanos}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AgregarMascota;
