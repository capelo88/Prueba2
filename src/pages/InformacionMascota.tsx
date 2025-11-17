import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonToolbar,
  IonHeader,
  IonButtons,
  IonBackButton,
  useIonAlert,
  useIonViewWillEnter    //
} from "@ionic/react";
import { createOutline, trashOutline, helpCircleSharp, callSharp } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./InformacionMascota.css";

const InformacionMascota: React.FC = () => {
  const [mascotas, setMascotas] = useState<any[]>([]);
  const [presentAlert] = useIonAlert();
  const history = useHistory();


  /* === Cargar mascotas al entrar === */
   useIonViewWillEnter(() => {
  cargarMascotas();   // ⭐ SE EJECUTA SIEMPRE QUE REGRESAS
  });

  const cargarMascotas = () => {
    const data = JSON.parse(localStorage.getItem("mascotas") || "[]");
    setMascotas(data);
  };

  /* === Confirmar eliminar === */
  const confirmarEliminar = (index: number) => {
    presentAlert({
      header: "Eliminar mascota",
      message: "¿Estás seguro de eliminar esta mascota?",
      buttons: [
        { text: "Cancelar", role: "cancel" },
        {
          text: "Eliminar",
          handler: () => eliminarMascota(index),
        },
      ],
    });
  };

  const eliminarMascota = (index: number) => {
    const nuevas = [...mascotas];
    nuevas.splice(index, 1);
    localStorage.setItem("mascotas", JSON.stringify(nuevas));
    setMascotas(nuevas);
  };




  /* === Editar === */
 const editarMascota = (index: number) => {
  history.push(`/editar-mascota/${index}`);
};



  /* === Ver historial veterinario === */
  const verHistorial = (index: number) => {
    history.push(`/historial/${index}`);
  };

  /* === Agregar Mascota === */
  const agregarMascota = () => {
    history.push("/agregar-mascota");
  };

  /* === Ir a Contactanos === */
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
          <h2 style={{ color: "#fff", marginLeft: "10px" }}>Información de la Mascota</h2>
        </IonToolbar>
      </IonHeader>

      {/* CONTENT */}
      <IonContent fullscreen className="fondo">

        {mascotas.map((mascota, i) => (
          <div key={i} className="pet-card">

            {/* Foto */}
            <div className="pet-photo">
              <img
                src={mascota.foto || "assets/foto-default.png"}
                alt={mascota.nombre}
              />
            </div>

            {/* Datos */}
            <div className="pet-info">
              <p><strong>Nombre:</strong> {mascota.nombre}</p>
              <p><strong>Especie:</strong> {mascota.especie}</p>
              <p><strong>Raza:</strong> {mascota.raza}</p>
              <p><strong>Fecha de nacimiento:</strong> {mascota.fechaNacimiento}</p>
            </div>

            {/* Acciones */}
            <div className="pet-actions">

              <IonButton size="small" fill="outline" onClick={() => verHistorial(i)}>
                Historia
              </IonButton>

              <IonIcon
                icon={createOutline}
                className="edit-icon"
                onClick={() => editarMascota(i)}
              />

              <IonIcon
                icon={trashOutline}
                className="delete-icon"
                onClick={() => confirmarEliminar(i)}
              />
            </div>
          </div>
        ))}

        {/* BOTÓN AGREGAR */}
        <div className="button-container">
          <IonButton expand="block" color="primary" onClick={agregarMascota}>
            Agregar Mascota
          </IonButton>
        </div>
      </IonContent>

      {/* FOOTER */}
      <div className="franja-gruesa-inferior">
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
      </div>
    </IonPage>
  );
};

export default InformacionMascota;
