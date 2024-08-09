"use client";
import { useEffect, useState } from "react";
import { getAllInformation } from "@/services/api";
import Image from "next/image";
import SelectButton from "../common/select-button"; // SelectButton bileşenini import ediyoruz
import Label from "../common/label";
import OptionButton from "../common/option-button";

const Glucometer = ({ setActive, generally, setGenerally, name, buttons }) => {
  const [selectedGlucometer, setSelectedGlucometer] = useState("");
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

  const handleSelect = (glucometer) => {
    // Yeni seçilen glukometre fiyatını al
    const newPrice = parseFloat(glucometer.price.replace("$", ""));

    // Eğer bir glukometre daha önce seçilmişse, eski glukometrenin fiyatını çıkart
    let oldPrice = 0;
    if (
      generally.medical.glucometer &&
      generally.medical.glucometer !== glucometer.name
    ) {
      const oldGlucometer = vehicleData[18].glucometer.find(
        (g) => g.name === generally.medical.glucometer
      );
      if (oldGlucometer) {
        oldPrice = parseFloat(oldGlucometer.price.replace("$", ""));
      }
    }

    // `selectedGlucometer`'ı güncelle
    setSelectedGlucometer(glucometer.name);
    setPrice(newPrice);

    // `totalPrice` hesapla ve güncelle
    setGenerally((prev) => ({
      ...prev,
      totalPrice: prev.totalPrice - oldPrice + newPrice,
      medical: {
        ...prev.medical,
        glucometer: glucometer.name,
      },
      prices: {
        ...prev.prices,
        glucometer: newPrice,
      },
    }));
    console.log("generally", generally);
  };


  return (
    <div>
      <Label title={name} />
      <Image
        width={300}
        height={250}
        src={vehicleData[18].image_url}
        alt="Glucometer"
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
        {vehicleData[18].glucometer.map((glucometer, index) => (
          <SelectButton
            key={index}
            value={glucometer.price}
            handleSelect={() => handleSelect(glucometer)}
            option={glucometer.name}
            price={glucometer.price}
            disabled={generally.medical.glucometer === glucometer.name}
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

export default Glucometer;
