import React from "react";
import { IonPage, IonContent, IonIcon } from "@ionic/react";
import { helpCircle, call } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./Menu.css";

const Menu: React.FC = () => {
  const history = useHistory();

  const irAContactanos = () => {
    history.push("/contactanos");
  };

  const irAInformacionMascota = () => {
    history.push("/informacion-mascota");
  };

  return (
    <IonPage>
      <IonContent fullscreen className="fondo">

        {/* Franja azul superior */}
        <div className="franja-gruesa-superior"></div>

        {/* Contenido principal */}
        <div className="contenedor">

          <h1 className="titulo">📋 Menú Principal</h1>
            <p className="frase-menu">
            "Las mascotas son parte de nuestra familia, cuidemos de ellas ❤️"
          </p>
          <div className="menu-item-centro">
            <img
              src="assets/img/info_mascota.png"
              alt="Información Mascota"
              onClick={irAInformacionMascota}
            />
            <p
              className="menu-texto"
              onClick={irAInformacionMascota}
            >
              Información de Mascota
            </p>
          </div>

         
        </div>

        {/* Franja inferior con iconos */}
        <div className="franja-gruesa-inferior">
          <div className="iconos-inferiores">
            <IonIcon
              className="btn-icon grande"
              icon={helpCircle}
              onClick={irAContactanos}
            />
            <IonIcon
              className="btn-icon grande"
              icon={call}
              onClick={irAContactanos}
            />
          </div>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Menu;
