"use client";
import { useState } from "react";
import { sendContactForm } from "@/lib/api";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styles from "@/components/contact/contact-form-.module.scss";

const initValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const initState = { loading: false, error: "", values: initValues };

const FirmContactForm = ({ dict }) => {
  const [state, setState] = useState(initState);
  const [touched, setTouched] = useState({});

  const { values, loading, error } = state;

  const onBlur = ({ target }) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const handleChange = ({ target }) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  const onSubmit = async (e) => {
    e.preventDefault(); 
    console.log(values);
    setState((prev) => ({
      ...prev,
      loading: true,
    }));
    try {
      await sendContactForm(values);
      setTouched({});
      setState(initState);
      alert("Your message has been sent successfully");
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    }
  };

  return (
    <div>
      <Container className={styles.container}>
        <h1>{dict.buttons.contact}</h1>
        {error && <p>{error}</p>}
        <Form className={styles.contactForm} onSubmit={onSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Control
                  className="my-2 input-text"
                  name="name"
                  type="text"
                  placeholder={dict.contact.namePlaceholder}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={onBlur}
                  isInvalid={touched.name && !values.name}
                />
                <Form.Control.Feedback type="invalid">
                {touched.name && !values.name && dict?.contact?.requiredName && `${dict.contact.requiredName}`}

                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Control
                  className="my-2 input-text"
                  name="email"
                  type="email"
                  placeholder={dict.contact.emailPlaceholder}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={onBlur}
                  isInvalid={touched.email && !values.email}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.email &&
                    !values.email &&
                    dict?.conttact?.requiredEmail && `${dict.contact.requiredEmail}`}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group className="mb-3" size="lg">
                <Form.Control
                  className="my-2 input-text"
                  as="textarea"
                  placeholder={dict.contact.messagePlaceholder}
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={handleChange}
                  onBlur={onBlur}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.message &&
                    !values.message &&
                    `dict?.contact?.requiredMessage && ${dict.contact.requiredMessage}`}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Button
            className="firm-btn-primary"
            variant="primary"
            type="submit"
            disabled={
              loading || !values.name || !values.email || !values.message
            }
          >
            {loading ? "Sending..." : `${dict.buttons.send}`}
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default FirmContactForm;
