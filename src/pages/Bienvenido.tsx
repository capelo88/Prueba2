import React from 'react';
import { IonPage, IonContent, IonIcon } from '@ionic/react';
import { helpCircle, call } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Bienvenido.css';

const Bienvenido: React.FC = () => {
  const history = useHistory();

  const irAlMenu = () => {
    history.push('/menu');
  };

  const irAContactanos = () => {
    history.push('/contactanos');
  };

  return (
    <IonPage>
      <IonContent fullscreen className="fondo">
        {/* Franja superior */}
        <div className="franja-gruesa" aria-hidden="true"></div>

        {/* Contenedor principal */}
        <div className="contenedor">
          <h1 onClick={irAlMenu}>
            🐾 Bienvenido a <br />
            <span>Travesuras Sanas</span>
          </h1>

          <img
            src="assets/img/Bienvenido1.png"
            alt="huellitas"
            className="huellas"
          />
        </div>

        {/* Franja inferior con íconos */}
        <div className="franja-gruesa-inferior">
          <div className="iconos-inferiores">
            {/* Signo de pregunta */}
            <IonIcon
              className="btn-icon grande"
              icon={helpCircle}
              onClick={irAContactanos}
            />
            {/* Teléfono */}
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

export default Bienvenido;
