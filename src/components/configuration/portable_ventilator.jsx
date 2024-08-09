"use client";
import { useEffect, useState } from "react";
import { getAllInformation } from "@/services/api";
import Image from "next/image";
import SelectButton from "../common/select-button"; // SelectButton bileşenini import ediyoruz
import Label from "..common/label";
import OptionButton from "../common/option-button";

const PortableVentilator = ({ setActive, generally, setGenerally, name, buttons }) => {
  const [selectedVentilator, setSelectedVentilator] = useState("");
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

  const handleSelect = (ventilator) => {
    // Yeni seçilen ventilatörün fiyatını al
    const newPrice = parseFloat(ventilator.price.replace("$", ""));

    // Eğer bir ventilatör daha önce seçilmişse, eski ventilatörün fiyatını çıkart
    let oldPrice = 0;
    if (
      generally.medical.portableVentilator &&
      generally.medical.portableVentilator !== ventilator.name
    ) {
      const oldVentilator = vehicleData[19].portable_ventilator.find(
        (v) => v.name === generally.medical.portableVentilator
      );
      if (oldVentilator) {
        oldPrice = parseFloat(oldVentilator.price.replace("$", ""));
      }
    }

    // `selectedVentilator`'ı güncelle
    setSelectedVentilator(ventilator.name);
    setPrice(newPrice);

    // `totalPrice` hesapla ve güncelle
    setGenerally((prev) => ({
      ...prev,
      totalPrice: prev.totalPrice - oldPrice + newPrice,
      medical: {
        ...prev.medical,
        portableVentilator: ventilator.name,
      },
      prices: {
        ...prev.prices,
        portableVentilator: newPrice,
      },
    }));
  };


  return (
    <div>
      <Label title={name} />
      <Image
        width={300}
        height={250}
        src={vehicleData[19].image_url}
        alt="Portable Ventilator"
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
        {vehicleData[19].portable_ventilator.map((ventilator, index) => (
          <SelectButton
            key={index}
            value={ventilator.price}
            handleSelect={() => handleSelect(ventilator)}
            option={ventilator.name}
            price={ventilator.price}
            disabled={generally.medical.portableVentilator === ventilator.name}
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

export default PortableVentilator;
