import React from "react";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";

/* IMPORTACIÓN DE PÁGINAS */
import Bienvenido from "./pages/Bienvenido";
import Menu from "./pages/Menu";
import InformacionMascota from "./pages/InformacionMascota";
import AgregarMascota from "./pages/AgregarMascota";
import EditarMascota from "./pages/EditarMascota";
import Contactanos from "./pages/Contactanos";
import HistorialVeterinario from "./pages/HistorialVeterinario";



/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* ⭐ RUTA DE BIENVENIDO */}
          <Route exact path="/bienvenido">
            <Bienvenido />
          </Route>

          {/* ⭐ RUTA DE MENU */}
          <Route exact path="/menu">
            <Menu />
          </Route>

          {/* ⭐ RUTA INFORMACIÓN MASCOTA */}
          <Route exact path="/informacion-mascota">
            <InformacionMascota />
          </Route>

          {/* ⭐ RUTA AGREGAR MASCOTA */}
          <Route exact path="/agregar-mascota">
            <AgregarMascota />
          </Route>

          {/* ⭐ RUTA EDITAR MASCOTA */}
         <Route exact path="/editar-mascota/:index">
          <EditarMascota />
         </Route>


          {/* ⭐ RUTA HISTORIAL VETERINARIO */}
          <Route exact path="/historial/:index">
           <HistorialVeterinario />
          </Route>

          
          {/* ⭐ RUTA CONTÁCTANOS */}
          <Route exact path="/contactanos">
            <Contactanos />
          </Route>

          {/* ⭐ REDIRECCIÓN INICIAL */}
          <Route exact path="/">
            <Redirect to="/bienvenido" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
