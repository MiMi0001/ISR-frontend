import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import {useState} from "react";
import {useContext} from 'react';

import {fetchISR, loginToBackend} from "../utils/fetchISR";
import {UserContext} from "./context/UserContext";
import {useNavigate} from "react-router-dom";


export function Login() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    let [userContext, setUserContext]= useContext(UserContext);
    const navigate = useNavigate();

    function onChangeUserName(event){
        setUserName(event.target.value);
    }

    function onChangePassword(event) {
        setPassword(event.target.value);
    }

    async function onClickButton(event) {
        event.preventDefault();

        console.log("Proceeding with login...");
        const user = {
            "username": userName,
            "password": password
        };

        let tokens = await loginToBackend(user);
        localStorage.clear();
        localStorage.setItem("accessToken", tokens.access);
        localStorage.setItem("refreshToken", tokens.refresh);

        let response = await fetchISR("/userdata/", "GET");
        let userData = await response.json();


        setUserContext({"username":userData.username, "email":userData.email, "firstName":userData.first_name, "lastName":userData.last_name});

        navigate("/");
    }

    return (
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-primary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase ">Bejelentkezés</h2>
                                    <p className=" mb-5">Adja meg felhasználónevét és jelszavát!</p>
                                    <div className="mb-3">
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Felhasználónév
                                                </Form.Label>
                                                <Form.Control value={userName} onChange={onChangeUserName} type="text" placeholder="Felhasználónév" />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Jelszó</Form.Label>
                                                <Form.Control value={password} onChange={onChangePassword} type="password" placeholder="Jelszó" />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicCheckbox"
                                            >
                                                <p className="small">
                                                    <a className="text-primary" href="#!">
                                                        Elfelejtette jelszavát?
                                                    </a>
                                                </p>
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button variant="primary" type="submit" onClick={onClickButton}>
                                                    Bejelentkezés
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Nincs még regisztrálva?
                                                {/*<a href="{''}" className="text-primary fw-bold">*/}
                                                {/*    Sign Up*/}
                                                {/*</a>*/}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
