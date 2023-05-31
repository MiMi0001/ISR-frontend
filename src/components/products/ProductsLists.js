import React, {useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';
import Container from "react-bootstrap/Container";
import {Badge, Button, Carousel, Col, Row} from "react-bootstrap";
import {fetchISR} from "../../utils/fetchISR";


export function ProductsList() {
    const [ascDesc, setAscDesc] = useState("ASC");
    const [orderBy, setOrderBy] = useState("fast_code");
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(products[0]);

    useEffect(() => {
        fetchISR("/products/all/", "POST", {
            "orderby": orderBy,
            "ascdesc": ascDesc})
            .then((result) => result.json())
            .then((data)=> setProducts(data));
        console.log(products);
    }, [orderBy, ascDesc])

    function productOnClick(e, product) {
        e.preventDefault();
        console.log(`Details of product with id: ${product.id}`);
        setCurrentProduct(product)
    }

    function ascDescButtonOnClick(e) {
        setAscDesc(ascDesc === "ASC" ? "DESC" : "ASC");
        console.log("Ascending / Descending order: " + ascDesc);
    }

    function orderByButtonsOnClick(e) {
        console.log("order by: " + e.target.id);
        setOrderBy(e.target.id);
    }

    function ProductsListTable(props) {
        return <div>
            {ascDesc === "ASC"
                ? <Button variant="warning" size="sm" onClick={(e) => ascDescButtonOnClick(e)}>↓ Növekvő rendezés
                    ↓</Button>
                : <Button variant="warning" size="sm" onClick={(e) => ascDescButtonOnClick(e)}>↑ Csökkenő rendezés
                    ↑</Button>
            }
            <Table striped bordered hover size="sm" className="w-50">
                <thead>
                <tr>
                    <th><Button id="fast_code" size="sm" variant={orderBy === "fast_code" ? "danger" : "warning"}
                                onClick={(e) => {
                                    orderByButtonsOnClick(e);
                                }}>Gyors kód</Button></th>
                    <th><Button id="name" size="sm" variant={orderBy === "name" ? "danger" : "warning"}
                                onClick={(e) => {
                                    orderByButtonsOnClick(e);
                                }}>Termék neve</Button></th>
                </tr>
                </thead>
                <tbody>
                {props.products === null
                    ? <tr></tr>
                    : props.products.map((product) => (
                        <tr key={product.id}>
                            <td> {product.fast_code}</td>
                            <td><a href={""} onClick={(e) => productOnClick(e, product)}> {product.name} </a></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    }

    function ProductDetails(props) {
        return <Carousel variant="dark" interval={null}>
            <Carousel.Item>
                <h6> Termék neve:</h6>
                <h4><Badge bg="info"> {props.product.name} </Badge></h4>
                <h6>Kód: {props.product.id}</h6>
                <h6>Gyors kód: {props.product.fast_code} </h6>

                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=Second slide&bg=282c34"
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=Third slide&bg=20232a"
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    }

    return <Container>
        <Row>
            <Col>
                <ProductsListTable products={products}/>
            </Col>
            <Col>{
                currentProduct === undefined
                    ? <div></div>
                    : <ProductDetails product={currentProduct}/>
            }
            </Col>
        </Row>
    </Container>
}
