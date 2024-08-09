"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // useRouter yerine useNavigation import ediliyor
import { getAllInformation } from "@/services/api";
import Image from "next/image";
import SelectButton from "../common/select-button";
import Label from "../common/label";
import OptionButton from "../common/option-button";

const PortablePatientMonitor = ({ setActive, generally, setGenerally,handleReset,name, buttons }) => {
  const [selectedMonitor, setSelectedMonitor] = useState("");
  const [price, setPrice] = useState(0);
  const [vehicleData, setVehicleData] = useState(null);
  const [shouldNavigate, setShouldNavigate] = useState(false); // Yönlendirme durumu için state ekliyoruz
  const router = useRouter();

  

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

  useEffect(() => {
    if (shouldNavigate) {
      router.push(`contact`); // shouldNavigate true olduğunda yönlendiriyoruz
    }
  }, [shouldNavigate, router]);

  const handleNext = () => {
    setShouldNavigate(true); // shouldNavigate'ı true yaparak yönlendirme başlatıyoruz
  };

  const handleBack = () => {
    setActive((prev) => prev - 1);
  };

  if (!vehicleData) {
    return <div>Yükleniyor...</div>;
  }

  const handleSelect = (monitor) => {
    const newPrice = parseFloat(monitor.price.replace("$", ""));
    let oldPrice = 0;
    if (
      generally.medical.portablePatientMonitor &&
      generally.medical.portablePatientMonitor !== monitor.name
    ) {
      const oldMonitor = vehicleData[20].portable_patient_monitor.find(
        (m) => m.name === generally.medical.portablePatientMonitor
      );
      if (oldMonitor) {
        oldPrice = parseFloat(oldMonitor.price.replace("$", ""));
      }
    }

    setSelectedMonitor(monitor.name);
    setPrice(newPrice);

    setGenerally((prev) => ({
      ...prev,
      totalPrice: prev.totalPrice - oldPrice + newPrice,
      medical: {
        ...prev.medical,
        portablePatientMonitor: monitor.name,
      },
      prices: {
        ...prev.prices,
        portablePatientMonitor: newPrice,
      },
    }));
  };

  
  return (
    <div>
      <Label title={name} />
      <Image
        width={300}
        height={250}
        src={vehicleData[20].image_url}
        alt="Portable Patient Monitor"
        style={{ objectFit: "cover", display: "block", margin: "0 auto" }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {vehicleData[20].portable_patient_monitor.map((monitor, index) => (
          <SelectButton
            key={index}
            value={monitor.price}
            handleSelect={() => handleSelect(monitor)}
            option={monitor.name}
            price={monitor.price}
            disabled={generally.medical.portablePatientMonitor === monitor.name}
          />
        ))}
      </div>
      <div style={{ width: "70%",margin: "0 auto" }}>
      <OptionButton handleNext={handleNext} handleBack={handleBack} finish={buttons.finish} back={buttons.back}  handleReset={handleReset} />

      </div>
        
    </div>
  );
};

export default PortablePatientMonitor;
