"use client"
import MedicalEqiupment from '@/components/common/medical-eqiupment'
import Progress from '@/components/progress/progress';
import PyschicalEqiupment from '@/components/common/pyschical-eqiupment'
import SideBar from '@/components/common/sideBar';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import "./layout.scss";


const initialAmbulance = {
    pyschical: {
      fuelType: "",
      tractionType: "",
      ambulanceType: "",
      vehicleType: "",
      extraFeatures: [],
    },
    medical: {
      mainStretcher: "",
      foldableStretcher: "",
      firstAidKit: "",
      oxygenSystem: "",
      portableOxygenSystem: "",
      defibrillator: "",
      bluetoothTransmission: "",
      portableSuctionUnit: "",
      manualSuctionUnit: "",
      spineBoard: "",
      headImmobilizer: "",
      scoopStretcher: "",
      vacuumMattress: "",
      glucometer: "",
      portableVentilator: "",
      portablePatientMonitor: "",
      suctionAspiration: "",
    },
    prices: {
      fuelType: 0,
      tractionType: 0,
      ambulanceType:0,
      vehicleType: 0,
      mainStretcher: 0,
      foldableStretcher: 0,
      firstAidKit: 0,
      oxygenSystem: 0,
      portableOxygenSystem: 0,
      defibrillator: 0,
      bluetoothTransmission: 0,
      portableSuctionUnit:0,
      manualSuctionUnit: 0,
      spineBoard: 0,
      headImmobilizer: 0,
      scoopStretcher: 0,
      vacuumMattress: 0,
      glucometer: 0,
      portableVentilator: 0,
      portablePatientMonitor: 0,
      suctionAspiration: 0,
    },
    totalPrice: 0,
  };
  
  
  const ConfigComp = ({ dict}) => {
    const [previousTotalPrice, setPreviousTotalPrice] = useState(initialAmbulance.totalPrice);
    const [section, setSection] = useState("pyschical");
    const [step, setStep] = useState(5);
    const [active, setActive] = useState(1);
    const [generally, setGenerally] = useState(() => {
      // Sayfa yüklendiğinde local storage'dan veri al
      const savedData = localStorage.getItem("ambulanceData");
      return savedData ? JSON.parse(savedData) : initialAmbulance;
    });
    
    
  
    const {configurationPage,buttons,initAmbulance}=dict;
    const { pyschalEquipment,medicalEquipment } = configurationPage;
  
    const handleId = (id) => {
      setSection(id);
      if (id === "pyschical" || id=== "medical") {
        setActive(1);
      }
    };
  
    const handleReset = () => {
      // Local storage'ı temizle ve generally durumunu sıfırla
      localStorage.removeItem("ambulanceData");
      setGenerally(initialAmbulance);
      localStorage.setItem("ambulanceData", JSON.stringify(initialAmbulance));
    };
  
    useEffect(() => {
      const newStep =
        section === "pyschical" ? 5 : section === "medical" ? 17 : 1;
      setStep(newStep);
  
      console.log("active", active, "step", newStep, "section", section);
    }, [section, active]);
  
    useEffect(() => {
      // generally durumu değiştiğinde local storage'a kaydet
      localStorage.setItem("ambulanceData", JSON.stringify(generally));
    }, [generally]);
  
    const handleRemove = (section, key) => {
      console.log("total", generally.totalPrice, "price", generally.prices[key]);
  
      
      const newGenerally = {
        ...generally,
        totalPrice: key==="extraFeatures"? generally.totalPrice : generally.totalPrice - generally.prices[key],
      };
      
  
      if (section === 'pyschical') {
     
          delete newGenerally.pyschical[key];
      } else if (section === 'medical') {
      
          delete newGenerally.medical[key];
      }
  
    
  
  
      localStorage.setItem("ambulanceData", JSON.stringify(newGenerally));
      
  
      setGenerally(newGenerally);
  
  
  
  };
   
    return (
      <Row style={{paddingRight: "0px", height: "100%" }}>
        <Col md={9}>
          <div className="btn-group">
            <button
              id="pyschical"
              className="btn btn-primary"
              onClick={() => handleId("pyschical")}
            >
              {pyschalEquipment.title}
            </button>
            <button
              id="medical"
              className="btn btn-primary"
              onClick={() => handleId("medical")}
            >
              {medicalEquipment.title}
            </button>
          </div>
          <Progress step={step} active={active} setActive={setActive} />
          {section && section === "pyschical" && (
            <PyschicalEqiupment
              setActive={setActive}
              active={active}
              setSection={setSection}
              section={section}
              generally={generally}
              setGenerally={setGenerally}
              dict={pyschalEquipment}
              buttons={buttons}
            />
          )}
          {section && section === "medical" && (
            <MedicalEqiupment
              setActive={setActive}
              active={active}
              setSection={setSection}
              section={section}
              generally={generally}
              setGenerally={setGenerally}
              handleReset={handleReset}
              dict={medicalEquipment}
              buttons={buttons}
            
            />
          )}
        </Col>
        <Col md={3}>
          <SideBar handleReset={handleReset} handleRemove={handleRemove} generally={generally} setGenerally={setGenerally} dict={initAmbulance} />
        </Col>
      </Row>
    );
  };
  
  export default ConfigComp;
  