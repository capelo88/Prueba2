import React from "react";
import {
  IonPage,
  IonContent,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { arrowBack, mail, call, home } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./Contactanos.css";

const Contactanos: React.FC = () => {
  const history = useHistory();

  const regresar = () => {
    history.goBack();
  };

  const irAMenu = () => {
    history.push("/menu");
  };

  return (
    <IonPage>
      <IonContent fullscreen className="fondo">
        {/* Franja superior con flecha y título */}
        <div className="franja-gruesa-superior">
          <IonButton fill="clear" onClick={regresar}>
            <IonIcon icon={arrowBack} />
          </IonButton>
          <h1 className="titulo-contacto">Contáctanos</h1>
        </div>

        {/* Contenido principal */}
        <div className="contenedor">
          <p className="info nota">
            Escríbenos por cualquier medio y despeja tus dudas.
          </p>
          <p className="info nota">Horario de atención:</p>
          <p className="info nota">
            Lunes a viernes de 08:00 AM a 04:00 PM
          </p>

          {/* Correo */}
          <div className="contacto">
            <IonIcon icon={mail} className="icono" />
            <span>travesurassanas@gmail.com</span>
          </div>

          {/* Teléfono */}
          <div className="contacto">
            <IonIcon icon={call} className="icono" />
            <span>3209646532</span>
          </div>
        </div>

        {/* Franja inferior con casita */}
        <div className="franja-gruesa-inferior">
          <div className="iconos-inferiores">
            <IonIcon
              className="casita"
              icon={home}
              onClick={irAMenu}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Contactanos;
