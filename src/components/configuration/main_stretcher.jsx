"use client";
import { useEffect, useState } from 'react';
import { getAllInformation } from '@/services/api';
import Image from 'next/image';
import SelectButton from '../common/select-button';
import Label from '..common/label';
import OptionButton from '../common/option-button';

const MainStretcher = ({ setActive, generally, setGenerally,setSection,name,buttons }) => {
    const [selectedStretcher, setSelectedStretcher] = useState('');
    const [price, setPrice] = useState(100);
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
    }

    const handleBack = () => {
        setActive(5);
        setSection("pyschical");
    }

    if (!vehicleData) {
        return <div>Yükleniyor...</div>;
    }

    const handleSelect = (stretcher) => {

      // Yeni seçilen stretcher'ın fiyatını al
      console.log("generally", generally);
      let newPrice = 0;
      switch (stretcher) {
        case "Stryker":
          newPrice = parseFloat(
            vehicleData[5].main_stretcher[0].price.replace("$", "")
          );
          break;
        case "Ferno":
          newPrice = parseFloat(
            vehicleData[5].main_stretcher[1].price.replace("$", "")
          );
          break;
        case "Spencer":
          newPrice = parseFloat(
            vehicleData[5].main_stretcher[2].price.replace("$", "")
          );
          break;
        default:
          newPrice = 0;
      }

      // Eğer bir stretcher daha önce seçilmişse, eski stretcher'ın fiyatını çıkart
      let oldPrice = 0;
      if (
        generally.medical.mainStretcher &&
        generally.medical.mainStretcher !== stretcher
      ) {
        switch (generally.medical.mainStretcher) {
          case "Stryker":
            oldPrice = parseFloat(
              vehicleData[5].main_stretcher[0].price.replace("$", "")
            );
            break;
          case "Ferno":
            oldPrice = parseFloat(
              vehicleData[5].main_stretcher[1].price.replace("$", "")
            );
            break;
          case "Spencer":
            oldPrice = parseFloat(
              vehicleData[5].main_stretcher[2].price.replace("$", "")
            );
            break;
          default:
            oldPrice = 0;
        }
      }

      // `selectedStretcher`'ı güncelle
      setSelectedStretcher(stretcher);
      setPrice(newPrice);

      // `totalPrice` hesapla ve güncelle
      setGenerally((prev) => ({
        ...prev,
        totalPrice: prev.totalPrice - oldPrice + newPrice,
        medical: {
          ...prev.medical,
          mainStretcher: stretcher,
        },
        prices: {
          ...prev.prices,
          mainStretcher: newPrice, // prev.prices.mainStretcher yerine newPrice kullanarak fiyatı doğrudan setleyin
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
          src={vehicleData[5].image_url}
          alt={vehicleData[5].main_stretcher[0].name}
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
          {vehicleData[5].main_stretcher.map((type) => (
            <SelectButton
              key={type.name}
              value={type.price}
              handleSelect={handleSelect}
              option={type.name}
              price={type.price}
              disabled={generally.medical.mainStretcher === type.name}
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

export default MainStretcher;
