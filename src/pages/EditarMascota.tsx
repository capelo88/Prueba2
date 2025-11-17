import React, { useEffect, useRef, useState } from "react";
import {
  IonPage,
  IonContent,
  IonIcon,
  IonButton,
  IonInput,
  useIonAlert,
} from "@ionic/react";
import { arrowBack, helpCircleOutline, callOutline } from "ionicons/icons";
import { useHistory, useLocation } from "react-router-dom";
import "./EditarMascota.css";

interface LocationState {
  index?: number;
}

const EditarMascota: React.FC = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const [presentAlert] = useIonAlert();

  // 👇 Índice recibido desde la navegación (state)
  const mascotaIndex = location.state?.index ?? 0;

  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");
  const [raza, setRaza] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [foto, setFoto] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* === Cargar datos al entrar === */
  useEffect(() => {
    const mascotas = JSON.parse(localStorage.getItem("mascotas") || "[]");
    const mascota = mascotas[mascotaIndex];

    if (mascota) {
      setNombre(mascota.nombre);
      setEspecie(mascota.especie);
      setRaza(mascota.raza);
      setFechaNacimiento(mascota.fechaNacimiento);
      setFoto(mascota.foto);
    }
  }, [mascotaIndex]);

  /* === Subir foto === */
  const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setFoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  /* === Guardar cambios === */
  const guardarCambios = async () => {
    let mascotas = JSON.parse(localStorage.getItem("mascotas") || "[]");

    mascotas[mascotaIndex] = {
      nombre,
      especie,
      raza,
      fechaNacimiento,
      foto: foto || "assets/foto-default.png",
    };

    localStorage.setItem("mascotas", JSON.stringify(mascotas));

    await presentAlert({
      header: "Éxito",
      message: "Los cambios se han guardado correctamente.",
      buttons: ["OK"],
    });

    history.push("/informacion-mascota");
  };

  /* regresar */
  const regresar = () => {
    history.goBack();
  };

  const irContacto = () => {
    history.push("/contactanos");
  };

  return (
    <IonPage>
      <IonContent className="fondo">
        {/* Franja superior */}
        <div className="franja-gruesa-superior">
          <IonIcon
            icon={arrowBack}
            className="back-icon"
            onClick={regresar}
          />
          <h1 className="titulo">Editar Mascota</h1>
        </div>

        {/* Formulario */}
        <div className="contenedor">
          {/* FOTO */}
          <div className="foto-container">
            <div
              className="foto-cuadro"
              onClick={() => fileInputRef.current?.click()}
            >
              {foto ? (
                <img src={foto} alt="Foto de mascota" />
              ) : (
                <span>Seleccionar foto</span>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={onFileSelected}
            />
          </div>

          <div className="formulario">
            <div className="campo">
              <label>
                <strong>Nombre:</strong>
              </label>
              <IonInput
                value={nombre}
                onIonChange={(e) => setNombre(e.detail.value || "")}
              />
            </div>

            <div className="campo">
              <label>
                <strong>Especie:</strong>
              </label>
              <IonInput
                value={especie}
                onIonChange={(e) => setEspecie(e.detail.value || "")}
              />
            </div>

            <div className="campo">
              <label>
                <strong>Raza:</strong>
              </label>
              <IonInput
                value={raza}
                onIonChange={(e) => setRaza(e.detail.value || "")}
              />
            </div>

            <div className="campo">
              <label>
                <strong>Fecha de nacimiento:</strong>
              </label>
              <IonInput
                type="date"
                value={fechaNacimiento}
                onIonChange={(e) =>
                  setFechaNacimiento(e.detail.value || "")
                }
              />
            </div>
          </div>

          {/* botón guardar */}
          <div className="button-container">
            <IonButton expand="block" color="primary" onClick={guardarCambios}>
              Guardar Cambios
            </IonButton>
          </div>
        </div>

        {/* Footer */}
        <div className="franja-gruesa-inferior">
          <div className="footer-icons">
            <IonIcon
              icon={helpCircleOutline}
              className="footer-icon"
              onClick={irContacto}
            />
            <IonIcon
              icon={callOutline}
              className="footer-icon"
              onClick={irContacto}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EditarMascota;
