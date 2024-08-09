import React from "react";
import MainStretcher from "../configuration/main_stretcher";
import FoldableStretcherSelector from "../configuration/foldable_stretcher";
import FirstAidKit from "../configuration/first_aid_kit";
import OxygenSystem from "../configuration/oxygen_system";
import PortableOxygenSystem from "../configuration/portable_oxygen_system";
import Defibrillator from "../configuration/defibrillator";
import BluetoothTransmissionSelector from "../configuration/bluetooth_transmission";
import PortableSuctionUnitSelector from "../configuration/portable_suction_unit";
import ManualSuctionUnit from "../configuration/manual_suction_unit";
import SpineBoard from "../configuration/spine_board";
import HeadImmobilizer from "../configuration/head_immobilizer";
import ScoopStretcher from "../configuration/scoop_stretcher";
import VacuumMattress from "../configuration/vacuum_mattress";
import Glucometer from "../configuration/glucometer";
import PortableVentilator from "../configuration/portable_ventilator";
import PortablePatientMonitor from "../configuration/portable_patient_monior";
import SuctionAspiration from "../configuration/suction_aspiration";

const MedicalEqiupment = ({ setActive, active, setSection, section , generally, setGenerally,handleReset,dict,buttons}) => {
    console.log("active-medical", active);
  
  return (
    <>
      {active === 1 && section === "medical" && (
        <MainStretcher
          setActive={setActive}
          generally={generally}
          setGenerally={setGenerally}
          setSection={setSection}
          name={dict.mainStretcher}
          buttons={buttons}
        />
      )}
      {active === 2 && section === "medical" && (
        <FoldableStretcherSelector
          setActive={setActive}
          generally={generally}
          setGenerally={setGenerally}
          name={dict.foldableStretcher}
          buttons={buttons}
        />
      )}
      {active === 3 && section === "medical" && (
        <FirstAidKit
          setActive={setActive}
          generally={generally}
          setGenerally={setGenerally}
          name={dict.firstAidKit}
          buttons={buttons}
        />
      )}
      {active === 4 && section === "medical" && (
        <OxygenSystem
          setActive={setActive}
          generally={generally}
          setGenerally={setGenerally}
          name={dict.oxygenSystem}
          buttons={buttons}
        />
      )}
      {active === 5 && section === "medical" && (
        <PortableOxygenSystem
          setActive={setActive}
          generally={generally}
          setGenerally={setGenerally}
          name={dict.portableOxygenSystem}
          buttons={buttons}
        />
      )}
      {active === 6 && section === "medical" && (
        <SuctionAspiration
          setActive={setActive}
          generally={generally}
          setGenerally={setGenerally}
          name={dict.suctionAspiration}
          buttons={buttons}
        />
      )}
      {active === 7 && section === "medical" && (
        <Defibrillator
          setActive={setActive}
          generally={generally}
          setGenerally={setGenerally}
          name={dict.defibrillator}
          buttons={buttons}
        />
      )}
      {active === 8 && section === "medical" && (
        <BluetoothTransmissionSelector
          setActive={setActive}
          generally={generally}
          setGenerally={setGenerally}
          name={dict.bluetoothTransmissionSystem}
          buttons={buttons}
        />
      )}
      {active === 9 && section === "medical" && (
        <PortableSuctionUnitSelector
          setActive={setActive}
          generally={generally}
          setGenerally={setGenerally}
          name={dict.portableSuctionUnit}
          buttons={buttons}
        />
      )}
      {active === 10 && section === "medical" && (
        <ManualSuctionUnit
          setActive={setActive}
          generally={generally}
          setGenerally={setGenerally}
          name={dict.manualSuctionUnit}
          buttons={buttons}
        />
      )}
      {active === 11 && section === "medical" && (
        <SpineBoard
          setActive={setActive}
          generally={generally}
          setGenerally={setGenerally}
          name={dict.spineBoard}
          buttons={buttons}
        />
      )}
      {active === 12 && section === "medical" && (
        <HeadImmobilizer
          setActive={setActive}
          generally={generally}
          setGenerally={setGenerally}
          name={dict.headImmobilizer}
          buttons={buttons}
        />
      )}
      {active === 13 && section === "medical" && (
        <ScoopStretcher
          setActive={setActive}
          generally={generally}
          setGenerally={setGenerally}
          name={dict.scoopStretcher}
          buttons={buttons}
        />
      )}
      {active === 14 && section === "medical" && (
        <VacuumMattress
          setActive={setActive}
          generally={generally}
          setGenerally={setGenerally}
          name={dict.vacuumMattress}
          buttons={buttons}
        />
      )}
      {active === 15 && section === "medical" && (
        <Glucometer
          setActive={setActive}
          generally={generally}
          setGenerally={setGenerally}
          name={dict.glucometer}
          buttons={buttons}
        />
      )}
      {active === 16 && section === "medical" && (
        <PortableVentilator
          setActive={setActive}
          generally={generally}
          setGenerally={setGenerally}
          name={dict.portableVentilator}
          buttons={buttons}
        />
      )}
      {active === 17 && section === "medical" && (
        <PortablePatientMonitor
          setActive={setActive}
          generally={generally}
          setGenerally={setGenerally}
          handleReset={handleReset}
          name={dict.portablePatientMonitor}
          buttons={buttons}
  
        />
      )}
    </>
  );
};

export default MedicalEqiupment;
