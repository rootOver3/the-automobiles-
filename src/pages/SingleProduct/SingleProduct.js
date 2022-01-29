import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Layout from '../../components/shared/layout/Layout';
import useCart from '../../hooks/useCart';


const SingleProduct = () => {
    const [singleData, setSingleData] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const {setToCart} = useCart();

    useEffect(()=> {
        // let url = `${process.env.REACT_APP_API_URI}/products?id=${id}`;
        let url = `https://theautomobile.herokuapp.com/products?id=${id}`;

        fetch(url)
        .then(res=> res.json())
        .then(data=> setSingleData(data[0]))
        .catch(err=> console.log('Single Product: ', err));
        
        console.log('productData: ', singleData);
        setLoading(false);
    }, []);

    return (
        <>
        {loading && (<Layout><Container className="py-5"><p>Loading...</p></Container></Layout>)}
        {!loading && (
            <Layout className="as_page_single_product" >
                <section className=''>
                    <Container className='mt-5 pb-5'>
                        <h1>{singleData.title}</h1>
                        <Row>
                            {/* Thumbnail */}
                            <Col lg={5} md={5} sm={12} xs={12}>
                                <div className=''>
                                    <img className='w-100' src={singleData.image} alt=''/>
                                </div>
                            </Col>

                            {/* Details */}
                            <Col lg={7} md={7} sm={12} xs={12}>
                                <div className=''>
                                    <Stack direction='horizontal' gap={3}>
                                        {singleData.price.special && (
                                            <p className='fs-3 mb-1 text-muted'>
                                                <del>{singleData.price.reguler}</del>
                                            </p>
                                        )}
                                        
                                        <p className='fs-3 mb-1 text-primary'>
                                            {singleData.price.special?singleData.price.special:singleData.price.reguler}
                                        </p>
                                    </Stack>

                                    {singleData.price.special && (
                                        <p className='fs-5'>You have saved ${ (singleData.price.reguler - singleData.price.special).toFixed(2) }</p>
                                    )}

                                    <p>{SingleProduct?.description}</p>

                                    <Button 
                                    onClick={() => setToCart(
                                        singleData._id, 
                                        singleData.title, 
                                        singleData.price.special?singleData.price.special:singleData.price.reguler
                                        )
                                    }
                                    >
                                        ADD TO CART
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Layout>
        )}
        </>
    );
};

export default SingleProduct;
