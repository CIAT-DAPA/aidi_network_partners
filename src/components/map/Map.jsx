import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  LayersControl,
  Tooltip,
  Polygon,
  GeoJSON	
} from "react-leaflet";
import "./map.css";
import { useState, useEffect,useRef, useLayoutEffect} from "react";
import Papa from "papaparse";
import { geo } from "../../data/geo";

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
        "https://raw.githubusercontent.com/CIAT-DAPA/aidi_network_partners/main/src/data/zambia%20-%20Copy.csv",
        {
            download: true,
            header: true,
            delimiter: ";",
            dynamicTyping: true,
            complete: function (results) {
                const data = results.data.map((row) => {
                    const othersArray = row.others ? row.others.split(";") : [];
                    return { ...row, others: othersArray };
                });
                setZambia(data);
            },
        }
    );
}, []);

useEffect(() => {
  Papa.parse(
      "https://raw.githubusercontent.com/CIAT-DAPA/aidi_network_partners/main/src/data/malawii.csv",
      {
          download: true,
          header: true,
          delimiter: ";",
          dynamicTyping: true,
          complete: function (results) {
              const data = results.data.map((row) => {
                  const othersArray = row.others ? row.others.split(";") : [];
                  return { ...row, others: othersArray };
              });
              setMalawi(data);
          },
      }
  );
}, []);

useEffect(() => {
  Papa.parse(
      "https://raw.githubusercontent.com/CIAT-DAPA/aidi_network_partners/main/src/data/tanzania.csv",
      {
          download: true,
          header: true,
          delimiter: ";",
          dynamicTyping: true,
          complete: function (results) {
              const data = results.data.map((row) => {
                  const othersArray = row.others ? row.others.split(";") : [];
                  return { ...row, others: othersArray };
              });
              setTanania(data);
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
        whenReady={(map) => {
          map.target.on("click", function (e) {
            console.log("hice click", e);
          });
        }}
      >

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {checkMalawi &&
        <>
        <GeoJSON data={geo.features[3].geometry} />
        {malawi.map((dat, index) => (
            <>
              
              <Marker index={index} position={[dat.latitude, dat.longitude]}>
                <Tooltip direction="top" offset={[0, -30]}>
                  Name: {dat.name} <br />
                  Ohers: {dat.others}
                  <br />
                  <br />
                </Tooltip>
              </Marker>
            </>
          ))}
        </>

          }
        {checkTanzania &&
        <>
        <GeoJSON data={geo.features[5].geometry} />
        {tanzania.map((dato, index) => (
          <Marker key={index} position={[dato.latitude, dato.longitude]}>
            <Tooltip direction="top" offset={[0, -30]}>
              <div>
                <h3>{dato.name}</h3>

                {dato.others.length > 0 && (
                  <p>{dato.others.map((other) => `${other} `)}</p>
                )}
                {dato.__parsed_extra?.length > 0 && (
                  <p>{dato.__parsed_extra.map((extra) => `${extra} `)}</p>
                )}
              </div>
            </Tooltip>
          </Marker>
        ))}
        </>

          }
        
        {checkZambia &&
        <>
        <GeoJSON data={geo.features[14].geometry} />
        {zambia.map((dato, index) => (
          <Marker key={index} position={[dato.latitude, dato.longitude]}>
            <Tooltip direction="top" offset={[0, -30]}>
              <div>
                <h3>{dato.name}</h3>

                {dato.others.length > 0 && (
                  <p>{dato.others.map((other) => `${other} `)}</p>
                )}
                {dato.__parsed_extra?.length > 0 && (
                  <p>{dato.__parsed_extra.map((extra) => `${extra} `)}</p>
                )}
              </div>
            </Tooltip>
          </Marker>
        ))}
        </>

          }
        <LayersControl position="topright" className="mt-5">
          <LayersControl.Overlay name="Zambia">
            <TileLayer
              url=""
              eventHandlers={{
                add: (e) => {
                  console.log("Added Layer:", e.target);
                  console.log("added zambia");
                  setCheckZambia(true);
                  map.current.flyToBounds(
                    [
                      [-18.0701, 21.9999],
                      [-13.4551, 33.7049],
                    ],
                    { padding: [150, 150] }
                  );
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
                  map.current.flyToBounds(
                    [
                      [-11.7453, 29.3326],
                      [-0.99, 40.4676],
                    ],
                    { padding: [150, 150] }
                  );
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
                  map.current.flyToBounds(
                    [
                      [-17.135, 32.6733],
                      [-9.3681, 35.922],
                    ],
                    { padding: [150, 150] }
                  );
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
