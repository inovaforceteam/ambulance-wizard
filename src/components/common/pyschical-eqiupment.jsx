
import React from "react";
import FuelTypeSelector from "../configuration/fuel-type";
import TractionTypeSelector from "../configuration/traction_type";
import AmbulanceType from "../configuration/ambulance-type";
import VehicleTypeSelector from "../configuration/vehicle_type";
import ExtraFeaturesSelector from "../configuration/extra_features";

const PyschicalEqiupment = ({ setActive, active, setSection, section,generally,setGenerally, dict,buttons }) => {
  return (
    <>
      {active === 1 && section === "pyschical" && (
        <FuelTypeSelector
          setActive={setActive}
          generally={generally}
          setGenerally={setGenerally}
          name={dict.chooseFuelType}
          buttons={buttons}
        />
      )}
      {active === 2 && section === "pyschical" && (
        <TractionTypeSelector
          setActive={setActive}
          generally={generally}
          setGenerally={setGenerally}
          name={dict.chooseTractionType}
          buttons={buttons}
        />
      )}
      {active === 3 && section === "pyschical" && (
        <AmbulanceType
          setActive={setActive}
          generally={generally}
          setGenerally={setGenerally}
          name={dict.chooseAmbulanceType}
          buttons={buttons}
        />
      )}
      {active === 4 && section === "pyschical" && (
        <VehicleTypeSelector
          setActive={setActive}
          generally={generally}
          setGenerally={setGenerally}
          name={dict.chooseVehicleType}
          buttons={buttons}
        />
      )}
      {active === 5 && section === "pyschical" && (
        <ExtraFeaturesSelector
          setActive={setActive}
          setSection={setSection}
          generally={generally}
          setGenerally={setGenerally}
          name={dict.chooseExtraFeatures}
          buttons={buttons}
        />
      )}
    </>
  );
};

export default PyschicalEqiupment;
