'use client'
import styles from "@/styles/components/common/sideBar.module.scss";
import { useEffect, useState } from "react";
import { AiOutlineCaretRight } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaTrash } from "react-icons/fa6";

const SideBar = ({handleReset,handleRemove, setGenerally,generally,dict }) => {
  const [vehicleData, setVehicleData] = useState(null);

  const { pyschical, medical } = dict;

  useEffect (()=>{

  },[generally])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllInformation();
        setVehicleData(data);
      } catch (error) {
        console.error("Araç verilerini alırken hata oluştu:", error);
      }
    };
    fetchData();
  }, []);
 
  

  const renderSection = (section, sectionName) => {
    return (
      <div>
        <p className="border-bottom mt-3">{sectionName}</p>
        {Object.keys(section).map((key, index) => {
          const value = section[key];
          if (Array.isArray(value) && value.length > 0) {
            return (
              <div key={index}>
                <h3>{key}:</h3>
                {value.map((item, i) => (
                  <h4 key={i}>
                    <AiOutlineCaretRight />
                    {item}
                  </h4>
                ))}
              </div>
            );
          } else if (value && typeof value === 'string') {
            return (
              <div key={index}>
                <h3>{key}:</h3>
                <h4>{value}</h4>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  };

  return (
    <div className={styles.sideBar}>
      <h2>{dict.yourAmbulance}</h2>
      <div className="ps-2  text-start">
        <div className="d-flex justify-content-between align-items-center">
        <p className=" border-bottom mt-3">{dict.vehicleProperties}</p>
        <FaTrash onClick={handleReset} className={`${styles.rstIcon} me-1`}/>
        </div>


        {generally.pyschical.fuelType ? (
          <div>
            <h3>
              {pyschical.fuelType}{" "}
              <AiOutlineCloseCircle
                onClick={() => handleRemove("pyschical", "fuelType")}
                className={`${styles.hvr} hvr ms-4 text-black fs-4`}
              />
            </h3>
            <h4>{generally.pyschical.fuelType}</h4>
          </div>
        ) : null}

        {generally.pyschical.tractionType ? (
          <>
            <h3>
              {pyschical.tractionType}{" "}
              <AiOutlineCloseCircle
                onClick={() => handleRemove("pyschical", "tractionType")}
                className={`${styles.hvr} hvr ms-4 text-black fs-4`}
              />
            </h3>
            <h4>{generally.pyschical.tractionType}</h4>
          </>
        ) : null}

        {generally.pyschical.ambulanceType ? (
          <>
            <h3>
              {pyschical.ambulanceType}{" "}
              <AiOutlineCloseCircle
                onClick={() => handleRemove("pyschical", "ambulanceType")}
                className={`${styles.hvr} hvr ms-4 text-black fs-4`}
              />
            </h3>
            <h4>{generally.pyschical.ambulanceType}</h4>
          </>
        ) : null}

        {generally.pyschical.vehicleType ? (
          <>
            <h3>
              {pyschical.vehicleType}{" "}
              <AiOutlineCloseCircle
                onClick={() => handleRemove("pyschical", "vehicleType")}
                className={`${styles.hvr} hvr ms-4 text-black fs-4`}
              />
            </h3>
            <h4>{generally.pyschical.vehicleType}</h4>
          </>
        ) : null}

        {generally.pyschical?.extraFeatures?.length > 0 ? (
          
          <div>
            <div className="d-flex">
            <h3>{pyschical.extraFeatures}</h3>
            <AiOutlineCloseCircle
                onClick={() => handleRemove("pyschical", "extraFeatures")}
                className={`${styles.hvr} hvr ms-4 text-black fs-4`}
              />
            </div>
            

            {generally.pyschical.extraFeatures.map((feature, index) => (
              <h4 key={index}>
                <AiOutlineCaretRight />
                {feature}
              </h4>
            ))}
          </div>
        ) : null}

        {generally.medical.mainStretcher ? (
          <>
            <h3>
              {medical.mainStretcher}{" "}
              <AiOutlineCloseCircle
                onClick={() => handleRemove("medical", "mainStretcher")}
                className={`${styles.hvr} hvr ms-4 text-black fs-4`}
              />
            </h3>
            <h4>{generally.medical.mainStretcher}</h4>
          </>
        ) : null}

        {generally.medical.foldableStretcher ? (
          <>
            <h3>
              {medical.foldableStretcher}
              <AiOutlineCloseCircle
                onClick={() => handleRemove("medical", "foldableStretcher")}
                className={`${styles.hvr} hvr ms-4 text-black fs-4`}
              />
            </h3>
            <h4>{generally.medical.foldableStretcher}</h4>
          </>
        ) : null}

        {generally.medical.firstAidKit ? (
          <>
            <h3>
              {medical.firstAidKit}
              <AiOutlineCloseCircle
                onClick={() => handleRemove("medical", "firstAidKit")}
                className={`${styles.hvr} hvr ms-4 text-black fs-4`}
              />
            </h3>
            <h4>{generally.medical.firstAidKit}</h4>
          </>
        ) : null}

        {generally.medical.oxygenSystem ? (
          <>
            <h3>
              {medical.oxygenSystem}
              <AiOutlineCloseCircle
                onClick={() => handleRemove("medical", "oxygenSystem")}
                className={`${styles.hvr} hvr ms-4 text-black fs-4`}
              />
            </h3>
            <h4>{generally.medical.oxygenSystem}</h4>
          </>
        ) : null}

        {generally.medical.portableOxygenSystem ? (
          <>
            <h3>
              {medical.portableOxygenSystem}
              <AiOutlineCloseCircle
                onClick={() => handleRemove("medical", "portableOxygenSystem")}
                className={`${styles.hvr} hvr ms-4 text-black fs-4`}
              />
            </h3>
            <h4>{generally.medical.portableOxygenSystem}</h4>
          </>
        ) : null}

        {generally.medical.defibrillator ? (
          <>
            <h3>
              {medical.defibrillator}
              <AiOutlineCloseCircle
                onClick={() => handleRemove("medical", "defibrillator")}
                className={`${styles.hvr} hvr ms-4 text-black fs-4`}
              />
            </h3>
            <h4> {generally.medical.defibrillator}</h4>
          </>
        ) : null}

        {generally.medical.bluetoothTransmission ? (
          <>
            <h3>
              {medical.bluetoothTransmission}
              <AiOutlineCloseCircle
                onClick={() => handleRemove("medical", "bluetoothTransmission")}
                className={`${styles.hvr} hvr ms-4 text-black fs-4`}
              />
            </h3>
            <h4>{generally.medical.bluetoothTransmission}</h4>
          </>
        ) : null}

        {generally.medical.portableSuctionUnit ? (
          <>
            <h3>
              {medical.portableSuctionUnit}
              <AiOutlineCloseCircle
                onClick={() => handleRemove("medical", "portableSuctionUnit")}
                className={`${styles.hvr} hvr ms-4 text-black fs-4`}
              />
            </h3>
            <h4>{generally.medical.portableSuctionUnit}</h4>
          </>
        ) : null}

        {generally.medical.manualSuctionUnit ? (
          <>
            <h3>
              {medical.manualSuctionUnit}
              <AiOutlineCloseCircle
                onClick={() => handleRemove("medical", "manualSuctionUnit")}
                className={`${styles.hvr} hvr ms-4 text-black fs-4`}
              />
            </h3>
            <h4>{generally.medical.manualSuctionUnit}</h4>
          </>
        ) : null}

        {generally.medical.spineBoard ? (
          <>
            <h3>
              {medical.spineBoard}
              <AiOutlineCloseCircle
                onClick={() => handleRemove("medical", "spineBoard")}
                className={`${styles.hvr} hvr ms-4 text-black fs-4`}
              />
            </h3>
            <h4>{generally.medical.spineBoard}</h4>
          </>
        ) : null}

        {generally.medical.headImmobilizer ? (
          <>
            <h3>
              {medical.headImmobilizer}
              <AiOutlineCloseCircle
                onClick={() => handleRemove("medical", "headImmobilizer")}
                className={`${styles.hvr} hvr ms-4 text-black fs-4`}
              />
            </h3>
            <h4>{generally.medical.headImmobilizer}</h4>
          </>
        ) : null}

        {generally.medical.scoopStretcher ? (
          <>
            <h3>
              {medical.scoopStretcher}
              <AiOutlineCloseCircle
                onClick={() => handleRemove("medical", "scoopStretcher")}
                className={`${styles.hvr} hvr ms-4 text-black fs-4`}
              />
            </h3>
            <h4>{generally.medical.scoopStretcher}</h4>
          </>
        ) : null}

        {generally.medical.vacuumMattress ? (
          <>
            <h3>
              {medical.vacuumMattress}
              <AiOutlineCloseCircle
                onClick={() => handleRemove("medical", "vacuumMattress")}
                className={`${styles.hvr} hvr ms-4 text-black fs-4`}
              />
            </h3>
            <h4>{generally.medical.vacuumMattress}</h4>
          </>
        ) : null}

        {generally.medical.glucometer ? (
          <>
            <h3>
              {medical.glucometer}
              <AiOutlineCloseCircle
                onClick={() => handleRemove("medical", "glucometer")}
                className={`${styles.hvr} hvr ms-4 text-black fs-4`}
              />
            </h3>
            <h4>{generally.medical.glucometer}</h4>
          </>
        ) : null}

        {generally.medical.portableVentilator ? (
          <>
            <h3>
              {medical.portableVentilator}
              <AiOutlineCloseCircle
                onClick={() => handleRemove("medical", "portableVentilator")}
                className={`${styles.hvr} hvr ms-4 text-black fs-4`}
              />
            </h3>
            <h4>{generally.medical.portableVentilator}</h4>
          </>
        ) : null}

        {generally.medical.portablePatientMonitor ? (
          <>
            <h3>
              {medical.portablePatientMonitor}
              <AiOutlineCloseCircle
                onClick={() =>
                  handleRemove("medical", "portablePatientMonitor")
                }
                className={`${styles.hvr} hvr ms-4 text-black fs-4`}
              />
            </h3>
            <h4>{generally.medical.portablePatientMonitor}</h4>
          </>
        ) : null}

        {generally.medical.suctionAspiration ? (
          <>
            <h3>
              {medical.suctionAspiration}
              <AiOutlineCloseCircle
                onClick={() => handleRemove("medical", "suctionAspiration")}
                className={`${styles.hvr} hvr ms-4 text-black fs-4`}
              />
            </h3>
            <h4>{generally.medical.suctionAspiration}</h4>
          </>
        ) : null}

        <h2 className={styles.total}>
          {dict.totalPrice}
          {":"}
          {generally.totalPrice}$
        </h2>
      </div>
    </div>
  );
};

export default SideBar;
