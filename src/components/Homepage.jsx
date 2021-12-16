import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from '../components';

const {Title} = Typography;

const Homepage = () => {

    const { data, isFetching } = useGetCryptosQuery(10);

    console.log(data);

    const globalStats = data?.data?.stats;

    if(isFetching) return 'Loading...'

    return (
        <>
            <Title level={2} className='heading'>Estadísticas criptográficas Globales</Title>
            <Row>
                <Col span={12}>
                    <Statistic title='Criptomonedas totales' value={globalStats.total} />
                </Col>
                <Col span={12}>
                    <Statistic title='Intercambios totales' value={millify(globalStats.totalExchanges)} />
                </Col>
                <Col span={12}>
                    <Statistic title='Market cap total' value={millify(globalStats.totalMarketCap)} />
                </Col>
                <Col span={12}>
                    <Statistic title='Volumen total 24h' value={millify(globalStats.total24hVolume)}/>
                </Col>
                <Col span={12}>
                    <Statistic title='Mercados totales' value={millify(globalStats.totalMarkets)} />
                </Col>
            </Row>
            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Top 10 Criptomonedas en el Mundo</Title>
                <Title level={3} className='show-more'>
                    <Link to='/cryptocurrencies'>Mostrar más</Link>
                </Title>
            </div>
            <Cryptocurrencies simplified />
            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Últimas noticias</Title>
                <Title level={3} className='show-more'>
                    <Link to='/news'>Mostrar más</Link>
                </Title>
            </div>
            <News simplified />
        </>
    )
}

export default Homepage;
