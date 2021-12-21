import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import LineChart from './LineChart';

const { Text, Title } = Typography;
const { Option } = Select; 

const CryptoDetails = () => {

    const { coinId } = useParams();
    
    const [ timePeriod, setTimePeriod ] = useState('7d');

    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const cryptoDetails = data?.data?.coin;

    if (isFetching) return 'Loading...';

    const stats = [
      { title: 'Precio a dólares', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
      { title: 'Ranking', value: cryptoDetails.rank, icon: <NumberOutlined /> },
      { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
      { title: 'Capitalización del mercado', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
      { title: 'Máximo histórico(promedio diario)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ];
  
    const genericStats = [
      { title: 'Número de mercados', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
      { title: 'Número de intercambios', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
      { title: 'Oferta aprovada', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
      { title: 'Oferta total', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
      { title: 'Oferta circulante', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
    ];

    return (
        <Col className='coin-detail-container'>
            <Col className='coin-heading-container'>
                <Title className='coin-name' level={2}>
                <span style={{ color: `${cryptoDetails.color}` }}>{cryptoDetails.name}</span> ({cryptoDetails.slug}) Precio
                </Title>
                <p>
                    Precio actual del {cryptoDetails.name} en dólares.
                    Ver estadísticas de valor, capitalización de mercado y oferta
                </p>
            </Col>
            <Select 
                defaultValue='7d' 
                className='select-timeperiod' 
                placeholder='Selecciona período de tiempo' 
                onChange={(value) => setTimePeriod(value)}
            >
                {time.map((date) => (
                    <Option key={date}>
                        {date}
                    </Option>
                ))}
            </Select>
            <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} /> 
            <Col className='stats-container'>
                <Col className='coin-value-statistics'>
                    <Col className='coin-value-statistics-heading'>
                        <Title level={3} className='coin-details-heading'>
                            Estadísticas de valor del {cryptoDetails.name}.
                        </Title>
                        <p>
                            Una descripción general de las estadísticas del {cryptoDetails.name}.
                        </p>
                    </Col>
                    {stats.map(({icon, title, value}) => (
                        <Col className='coin-stats'>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>
            <Col className='other-stats-info'>
                <Col className='coin-value-statistics'>
                    <Col className='coin-value-statistics-heading'>
                        <Title level={3} className='coin-details-heading'>
                            Otras estadísticas.
                        </Title>
                        <p>
                            Una descripción general de las estadísticas de las criptomonedas.
                        </p>
                    </Col>
                    {genericStats.map(({icon, title, value}) => (
                        <Col className='coin-stats'>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>
            <Col className='coin-desc-link'>
                <Row className='coin-desc'>
                    <Title level={3} className='coin-details-heading'>
                        ¿Qué es {cryptoDetails.name}?
                        {HTMLReactParser(cryptoDetails.description)}
                    </Title>
                </Row>
                <Col className='coin-links'>
                    <Title level={3} className='coin-details-heading'>
                        {cryptoDetails.name} Links.
                    </Title>
                    {cryptoDetails.links.map((link) => (
                        <Row className='coin-link' key={link.name}>
                            <Title level={5} className='link-name'>
                                {link.type}
                            </Title>
                            <a href={link.url} target='_blank' rel='noreferrer'>
                                {link.name}
                            </a>
                        </Row>
                    ))}
                </Col>
            </Col>
        </Col>      
    )
}

export default CryptoDetails;
