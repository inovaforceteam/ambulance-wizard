"use client";
import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import styles from"@/styles/components/common/modalComp.module.scss";
import { useRouter } from "next/navigation";
import { VscDebugStart } from "react-icons/vsc";
import { MdOutlineQuestionMark } from "react-icons/md";
import ModalComp from "./modalComp";



function ModalButton({ dict,lang }) {
  const [modalShow, setModalShow] = useState(false);
  const btn1 = useRef(null);
  const btn2 = useRef(null);
  const router=useRouter();

  const handleStart = () => {
  router.push(`${lang}/configuration`)
  };

  return (
    <div className={styles.modalDiv}>
      <ModalComp 
        dict={dict}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div className={styles.helpButton}>
        <Button
          ref={btn1}
          //  className={`${styles.helpButton1} ${styles.helpButton} btn-primary`}
          onClick={() => setModalShow(true)}
          
        >
          <div className={styles.icon}><MdOutlineQuestionMark /></div>
         
        </Button>

        <Button
          ref={btn2}
          //   className={`${styles.helpButton2} ${styles.helpButton} btn-primary`}
          onClick={handleStart}
        >
          <div className={styles.icon}><VscDebugStart /></div>
          
        </Button>
      </div>
    </div>
  );
}

export default ModalButton;
