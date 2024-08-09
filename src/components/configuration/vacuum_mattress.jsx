"use client";
import { useEffect, useState } from "react";
import { getAllInformation } from "@/services/api";
import Image from "next/image";
import SelectButton from "../common/select-button";
import Label from "../common/label";
import OptionButton from "../common/option-button";

const VacuumMattress = ({ setActive, generally, setGenerally, name, buttons }) => {
  const [selectedMattress, setSelectedMattress] = useState("");
  const [price, setPrice] = useState(0);
  const [vehicleData, setVehicleData] = useState(null);

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

  const handleNext = () => {
    setActive((prev) => prev + 1);
  };

  const handleBack = () => {
    setActive((prev) => prev - 1);
  };

  if (!vehicleData) {
    return <div>Yükleniyor...</div>;
  }

  const handleSelect = (mattress) => {
    // Yeni seçilen yatağın fiyatını al
    const newPrice = parseFloat(mattress.price.replace("$", ""));

    // Eğer bir yatak daha önce seçilmişse, eski yatağın fiyatını çıkart
    let oldPrice = 0;
    if (
      generally.medical.vacuumMattress &&
      generally.medical.vacuumMattress !== mattress.name
    ) {
      const oldMattress = vehicleData[17].vacuum_mattress.find(
        (m) => m.name === generally.medical.vacuumMattress
      );
      if (oldMattress) {
        oldPrice = parseFloat(oldMattress.price.replace("$", ""));
      }
    }

    // `selectedMattress`'ı güncelle
    setSelectedMattress(mattress.name);
    setPrice(newPrice);

    // `totalPrice` hesapla ve güncelle
    setGenerally((prev) => ({
      ...prev,
      totalPrice: prev.totalPrice - oldPrice + newPrice,
      medical: {
        ...prev.medical,
        vacuumMattress: mattress.name,
      },
      prices: {
        ...prev.prices,
        vacuumMattress: newPrice,
      },
    }));
  };


  return (
    <div>
      <Label title={name} />
      <Image
        width={300}
        height={250}
        src={vehicleData[17].image_url} // Varsayılan olarak ilk vakum yatak görselini gösteriyoruz
        alt="Vacuum Mattress"
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
        {vehicleData[17].vacuum_mattress.map((mattress, index) => (
          <SelectButton
            key={index}
            value={mattress.price}
            handleSelect={() => handleSelect(mattress)}
            option={mattress.name}
            price={mattress.price}
            disabled={generally.medical.vacuumMattress === mattress.name}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
      <OptionButton handleBack={handleBack} back={buttons.back} />
      <OptionButton handleNext={handleNext} next={buttons.next} />
      </div>
    </div>
  );
};

export default VacuumMattress;
