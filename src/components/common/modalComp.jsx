"use client";
import styles from "@/styles/components/common/language.module.scss";
import { Button, Modal } from "react-bootstrap";

const ModalComp = ({ dict, show, onHide }) => {
 
  const { home } = dict;
  const { title, overview, howToUse, keyFeatures, summary } = home;

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modulhg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          How am I use this tool?
        </Modal.Title>
      </Modal.Header>

      <Modal.Body >
        <div className={styles.container}>
          <h2 className={styles.title}>{title}</h2>
          <h3>
            <u>{overview.title}</u>
          </h3>
          <p>{overview.description}</p>
          <h3>
            <u>{howToUse.title}</u>
          </h3>
          <ol>
            {Object.entries(howToUse).map(([stepKey, step]) => (
              <li key={stepKey}>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
          <h3>
            <u>{keyFeatures.title}</u>
          </h3>
          <dl>
            {Object.entries(keyFeatures).map(([featureKey, feature]) => (
              <div key={featureKey}>
                <dt>{feature.title}</dt>
                <dd>{feature.description}</dd>
              </div>
            ))}
          </dl>
          <p>{summary}</p>
        </div>

        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Button
            style={{ width: "100%", margin: "auto" }}
            className="text-center outline-danger"
            onClick={onHide}
          >
            Close
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalComp;

