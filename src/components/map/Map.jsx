import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  LayersControl,
  Tooltip,
} from "react-leaflet";
import "./map.css";
import { useState, useEffect,useRef, useLayoutEffect} from "react";
import Papa from "papaparse";
import { click } from "@testing-library/user-event/dist/click";

function Map() {
  const map = useRef(null);
  const [malawi, setMalawi] = useState([]);
  const [zambia, setZambia] = useState([]);
  const [tanzania, setTanania] = useState([]);
  const [checkZambia, setCheckZambia] = useState(false);
  const [checkTanzania, setCheckTanzania] = useState(false);
  const [checkMalawi, setCheckMalawi] = useState(false);

  useEffect(() => {
    Papa.parse(
      "https://raw.githubusercontent.com/CarlosNasayo/AppAfrica/main/src/data/malawii.csv",
      {
        download: true,
        header: true,
        complete: function (results) {
          setMalawi(results.data);
        },
      }
    );
  }, []);
  useEffect(() => {
    Papa.parse(
      "https://raw.githubusercontent.com/CarlosNasayo/AppAfrica/main/src/data/zambia.csv",
      {
        download: true,
        header: true,
        complete: function (results) {
          setZambia(results.data);
        },
      }
    );
  }, []);
  useEffect(() => {
    Papa.parse(
      "https://raw.githubusercontent.com/CarlosNasayo/AppAfrica/main/src/data/tanzania.csv",
      {
        download: true,
        header: true,
        complete: function (results) {
          setTanania(results.data);
        },
      }
    );
  }, []);

  const [markers, setMarkers] = useState([]);


  useEffect(() => {
    Papa.parse(
      "https://raw.githubusercontent.com/CIAT-DAPA/aidi_network_partners/main/src/data/zambia%20-%20Copy.csv",
      {
        download: true,
        header: true,
        complete: function (results) {
          console.log(results)
          /* const markers = results.data.map((row) => {
            const { name, latitude, longitude, others } = row;
            return {
              name,
              position: [Number(latitude), Number(longitude)],
              others: others.length > 0 ? others : null,
            };
          }); */
        },
      }
    );
  }, []);
 
  return (
    <>
    
     <MapContainer 
      ref={map}
      id="mapid"
      center={[0, 20]}
      zoom={3.5}
      zoomSnap={0.25}
     /*  maxBounds={[
        [[ -18.0701, 21.9999], [-13.4551, 33.7049]],
      ]} */
      scrollWheelZoom={true}
      style={{
        height: "100%",
        width: "100%",
        position: "fixed",
      }}
      zoomControl={false}
      whenReady={(map)=>{map.target.on('click',function (e){console.log('hice click',e)})}}
    >
      
      
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {checkMalawi &&
        malawi.map((dat, index) => (
          <Marker position={[dat.latitude, dat.longitude]}>
            <Tooltip direction="top" offset={[0, -30]}>
              Name: {dat.name} <br />
              Ohers: {dat.others}
              <br />
              <br />
            </Tooltip>
          </Marker>
        ))}
      {checkTanzania &&
        tanzania.map((dat, index) => (
          <Marker position={[dat.latitude, dat.longitude]}>
            <Tooltip direction="top" offset={[0, -30]}>
              {dat.name} <br />
              {dat.others}
            </Tooltip>
          </Marker>
        ))}
      {checkZambia &&
        zambia.map((dat, index) => (
          <Marker position={[dat.latitude, dat.longitude]}>
            <Tooltip direction="top" offset={[0, -30]}>
             {dat.name} <br />
             {dat.others}
            </Tooltip>
          </Marker>
        ))}
      <LayersControl position="topright" className="mt-5">
        
        <LayersControl.Overlay name="Zambia">
          
          <TileLayer
            url=""
            eventHandlers={{
              add: (e) => {
                console.log("Added Layer:", e.target);
                console.log("added zambia");
                setCheckZambia(true);
                map.current.flyToBounds([[ -18.0701, 21.9999], [-13.4551, 33.7049]], { padding: [150, 150] });
              },
              remove: (e) => {
                console.log("Removed layer:", e.target);
                console.log("removed zambia");
                setCheckZambia(false);
              },
            }}
          />
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Tanzania">
          <TileLayer
            url=""
            eventHandlers={{
              add: (e) => {
                console.log("Added Layer:", e.target);
                console.log("added tanzania");
                setCheckTanzania(true);
                map.current.flyToBounds([[-11.7453, 29.3326], [-0.9900, 40.4676]], { padding: [150, 150] });

              },
              remove: (e) => {
                console.log("Removed layer:", e.target);
                console.log("removed tanzania");
                setCheckTanzania(false);
              },
            }}
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Malawi">
          <TileLayer
            url=""
            eventHandlers={{
              add: (e) => {
                console.log("Added Layer:", e.target);
                console.log("added malawi");
                setCheckMalawi(true);
                map.current.flyToBounds([[-17.1350, 32.6733], [-9.3681, 35.9220]], { padding: [150, 150] });

              },
              remove: (e) => {
                console.log("Removed layer:", e.target);
                console.log("removed malawi");
                setCheckMalawi(false);
              },
            }}
          />
        </LayersControl.Overlay>
      </LayersControl>
      //{" "}
    </MapContainer>
    
    </>
   
  );
}
export default Map;
