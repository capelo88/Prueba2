import React, { useEffect, useRef, useState } from "react";
import {
  IonPage,
  IonContent,
  IonIcon,
  IonButton,
  IonInput,
  useIonAlert
} from "@ionic/react";
import { arrowBack, helpCircleOutline, callOutline } from "ionicons/icons";
import { useHistory, useParams } from "react-router-dom";
import "./EditarMascota.css";

const EditarMascota: React.FC = () => {
  const history = useHistory();
  const [presentAlert] = useIonAlert();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ⭐ PARAMETRO CORRECTO DESDE LA URL
  const { index } = useParams<{ index: string }>();
  const mascotaIndex = Number(index);

  // 🟦 CAMPOS
  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");
  const [raza, setRaza] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [foto, setFoto] = useState<string | null>(null);

  // 🟦 CARGAR DATOS CORRECTAMENTE
  useEffect(() => {
    const mascotas = JSON.parse(localStorage.getItem("mascotas") || "[]");

    if (!mascotas[mascotaIndex]) {
      history.replace("/informacion-mascota");
      return;
    }

    const mascota = mascotas[mascotaIndex];

    setNombre(mascota.nombre);
    setEspecie(mascota.especie);
    setRaza(mascota.raza);
    setFechaNacimiento(mascota.fechaNacimiento);
    setFoto(mascota.foto || null);
  }, [mascotaIndex, history]);

  // 🟦 SUBIR FOTO
  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setFoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  // 🟦 GUARDAR DATOS
  const guardarCambios = async () => {
    const mascotas = JSON.parse(localStorage.getItem("mascotas") || "[]");

    mascotas[mascotaIndex] = {
      nombre,
      especie,
      raza,
      fechaNacimiento,
      foto: foto || "assets/foto-default.png"
    };

    localStorage.setItem("mascotas", JSON.stringify(mascotas));

    await presentAlert({
      header: "Éxito",
      message: "Los cambios se han guardado correctamente.",
      buttons: ["OK"]
    });

    history.push("/informacion-mascota");
  };

  const regresar = () => history.goBack();
  const irContacto = () => history.push("/contactanos");

  return (
    <IonPage>
      <IonContent className="fondo">

        {/* 🔷 Franja superior */}
        <div className="franja-gruesa-superior">
          <IonIcon icon={arrowBack} className="back-icon" onClick={regresar} />
          <h1 className="titulo">Editar Mascota</h1>
        </div>

        {/* 🔷 Contenido */}
        <div className="contenedor">

          {/* Foto */}
          <div className="foto-container">
            <div className="foto-cuadro" onClick={() => fileInputRef.current?.click()}>
              {foto ? (
                <img src={foto} alt="foto mascota" />
              ) : (
                <span>Seleccionar foto</span>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              hidden
              accept="image/*"
              onChange={onFileSelected}
            />
          </div>

          {/* Formulario */}
          <div className="formulario">
            <div className="campo">
              <label><strong>Nombre:</strong></label>
              <IonInput value={nombre} onIonChange={(e) => setNombre(e.detail.value!)} />
            </div>

            <div className="campo">
              <label><strong>Especie:</strong></label>
              <IonInput value={especie} onIonChange={(e) => setEspecie(e.detail.value!)} />
            </div>

            <div className="campo">
              <label><strong>Raza:</strong></label>
              <IonInput value={raza} onIonChange={(e) => setRaza(e.detail.value!)} />
            </div>

            <div className="campo">
              <label><strong>Fecha de nacimiento:</strong></label>
              <IonInput type="date" value={fechaNacimiento} onIonChange={(e) => setFechaNacimiento(e.detail.value!)} />
            </div>
          </div>

          <div className="button-container">
            <IonButton expand="block" color="primary" onClick={guardarCambios}>
              Guardar Cambios
            </IonButton>
          </div>

        </div>

        <div className="franja-gruesa-inferior">
          <div className="footer-icons">
            <IonIcon icon={helpCircleOutline} className="footer-icon" onClick={irContacto} />
            <IonIcon icon={callOutline} className="footer-icon" onClick={irContacto} />
          </div>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default EditarMascota;
