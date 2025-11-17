import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonButton
} from "@ionic/react";
import { createOutline, trashOutline, helpCircleSharp, callSharp } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./InformacionMascota.css";

const InformacionMascota: React.FC = () => {
  const history = useHistory();
  const [mascotas, setMascotas] = useState<any[]>([]);

  /* === Cargar mascotas al entrar === */
  useEffect(() => {
    cargarMascotas();
  }, []);

  const cargarMascotas = () => {
    const data = JSON.parse(localStorage.getItem("mascotas") || "[]");
    setMascotas(data);
  };

  const eliminarMascota = (index: number) => {
    const nuevas = [...mascotas];
    nuevas.splice(index, 1);
    setMascotas(nuevas);
    localStorage.setItem("mascotas", JSON.stringify(nuevas));
  };

  const editarMascota = (index: number) => {
  history.push("/editar-mascota", { index }); // SIN /0 en la URL
};


  const agregarMascota = () => {
    history.push("/agregar-mascota");
  };

  const irAContactanos = () => {
    history.push("/contactanos");
  };

  return (
    <IonPage>
      {/* HEADER */}
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/menu" />
          </IonButtons>
          <IonTitle>Información de la Mascota</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* CONTENIDO */}
      <IonContent fullscreen className="fondo">

        {/* LISTA DE MASCOTAS */}
        {mascotas.map((mascota, i) => (
          <div key={i} className="pet-card">

            <div className="pet-info">
              <div className="pet-photo">
                <img
                  src={mascota.foto || "assets/foto-default.png"}
                  alt={mascota.nombre}
                />
              </div>

              <p><strong>Nombre:</strong> {mascota.nombre}</p>
              <p><strong>Especie:</strong> {mascota.especie}</p>
              <p><strong>Raza:</strong> {mascota.raza}</p>
              <p><strong>Fecha de nacimiento:</strong> {mascota.fechaNacimiento}</p>
            </div>

            <div className="pet-actions">
              <IonIcon
                icon={createOutline}
                className="edit-icon"
                onClick={() => editarMascota(i)}
              />
              <IonIcon
                icon={trashOutline}
                className="delete-icon"
                onClick={() => eliminarMascota(i)}
              />
            </div>
          </div>
        ))}

        {/* BOTÓN AGREGAR */}
        <div className="button-container">
          <IonButton expand="block" color="primary" onClick={agregarMascota}>
            Agregar mascota
          </IonButton>
        </div>
      </IonContent>

      {/* FOOTER */}
      <IonToolbar className="footer-bar" color="primary">
        <div className="footer-icons">
          <IonIcon
            icon={helpCircleSharp}
            className="footer-icon"
            onClick={irAContactanos}
          />
          <IonIcon
            icon={callSharp}
            className="footer-icon"
            onClick={irAContactanos}
          />
        </div>
      </IonToolbar>
    </IonPage>
  );
};

export default InformacionMascota;
