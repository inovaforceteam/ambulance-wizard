
export const convertGenerallyToAmbulanceData = (initAmbulance, generally) => { 

const translatedData = {
  pyschical: {
    [initAmbulance.pyschical.fuelType]: generally.pyschical.fuelType,
    [initAmbulance.pyschical.tractionType]: generally.pyschical.tractionType,
    [initAmbulance.pyschical.ambulanceType]: generally.pyschical.ambulanceType,
    [initAmbulance.pyschical.vehicleType]: generally.pyschical.vehicleType,
    [initAmbulance.pyschical.extraFeatures]: generally.pyschical.extraFeatures,
  },
  medical: {
    [initAmbulance.medical.mainStretcher]: generally.medical.mainStretcher,
    [initAmbulance.medical.foldableStretcher]:
      generally.medical.foldableStretcher,
    [initAmbulance.medical.firstAidKit]: generally.medical.firstAidKit,
    [initAmbulance.medical.oxygenSystem]: generally.medical.oxygenSystem,
    [initAmbulance.medical.portableOxygenSystem]:
      generally.medical.portableOxygenSystem,
    [initAmbulance.medical.defibrillator]: generally.medical.defibrillator,
    [initAmbulance.medical.bluetoothTransmission]:
      generally.medical.bluetoothTransmission,
    [initAmbulance.medical.portableSuctionUnit]:
      generally.medical.portableSuctionUnit,
    [initAmbulance.medical.manualSuctionUnit]:
      generally.medical.manualSuctionUnit,
    [initAmbulance.medical.spineBoard]: generally.medical.spineBoard,
    [initAmbulance.medical.headImmobilizer]: generally.medical.headImmobilizer,
    [initAmbulance.medical.scoopStretcher]: generally.medical.scoopStretcher,
    [initAmbulance.medical.vacuumMattress]: generally.medical.vacuumMattress,
    [initAmbulance.medical.glucometer]: generally.medical.glucometer,
    [initAmbulance.medical.portableVentilator]:
      generally.medical.portableVentilator,
    [initAmbulance.medical.portablePatientMonitor]:
      generally.medical.portablePatientMonitor,
    [initAmbulance.medical.suctionAspiration]:
      generally.medical.suctionAspiration,
  },
  totalPrice: generally.totalPrice,
};

    return translatedData;
}

export const convertAmbulanceDataToInitAmbulance = (parsedData, dict) => {
  const translatedData = {
    pyschical: {
      fuelType: parsedData.pyschical[dict.initAmbulance.pyschical.fuelType],
      tractionType:
        parsedData.pyschical[dict.initAmbulance.pyschical.tractionType],
      ambulanceType:
        parsedData.pyschical[dict.initAmbulance.pyschical.ambulanceType],
      vehicleType:
        parsedData.pyschical[dict.initAmbulance.pyschical.vehicleType],
      extraFeatures:
        parsedData.pyschical[dict.initAmbulance.pyschical.extraFeatures],
    },
    medical: {
      mainStretcher:
        parsedData.medical[dict.initAmbulance.medical.mainStretcher],
      foldableStretcher:
        parsedData.medical[dict.initAmbulance.medical.foldableStretcher],
      firstAidKit: parsedData.medical[dict.initAmbulance.medical.firstAidKit],
      oxygenSystem: parsedData.medical[dict.initAmbulance.medical.oxygenSystem],
      portableOxygenSystem:
        parsedData.medical[dict.initAmbulance.medical.portableOxygenSystem],
      defibrillator:
        parsedData.medical[dict.initAmbulance.medical.defibrillator],
      bluetoothTransmission:
        parsedData.medical[dict.initAmbulance.medical.bluetoothTransmission],
      portableSuctionUnit:
        parsedData.medical[dict.initAmbulance.medical.portableSuctionUnit],
      manualSuctionUnit:
        parsedData.medical[dict.initAmbulance.medical.manualSuctionUnit],
      spineBoard: parsedData.medical[dict.initAmbulance.medical.spineBoard],
      headImmobilizer:
        parsedData.medical[dict.initAmbulance.medical.headImmobilizer],
      scoopStretcher:
        parsedData.medical[dict.initAmbulance.medical.scoopStretcher],
      vacuumMattress:
        parsedData.medical[dict.initAmbulance.medical.vacuumMattress],
      glucometer: parsedData.medical[dict.initAmbulance.medical.glucometer],
      portableVentilator:
        parsedData.medical[dict.initAmbulance.medical.portableVentilator],
      portablePatientMonitor:
        parsedData.medical[dict.initAmbulance.medical.portablePatientMonitor],
      suctionAspiration:
        parsedData.medical[dict.initAmbulance.medical.suctionAspiration],
    },
    totalPrice: parsedData.totalPrice,
  };

  return translatedData;
};
