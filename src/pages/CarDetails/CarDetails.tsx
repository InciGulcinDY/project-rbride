import React, { useEffect, useState } from 'react'
import { CarModel } from '../../models/response/CarModel';
import CarService from '../../services/CarService';
import { useParams } from 'react-router-dom';
import '../../components/CarDetailsCards/CarDetails.css'
import { CarDetailsCard } from '../../components/CarDetailsCards/CarDetailsCard';
import { PaymentDetailsCard } from '../../components/CarDetailsCards/PaymentDetailsCard';
import { FooterCard } from '../../components/CarDetailsCards/FooterCard';

type Props = {}

export const CarDetails = (props: Props) => {

    const [car, setCar] = useState<CarModel>();
    const params = useParams<{id:string}>();
    const [screenWidth, setScreenWidth] = useState(false);

    useEffect(() => {
      fetchCar();

      setScreenWidth(window.innerWidth >= 992)

      const handleResize = () => {
          setScreenWidth(window.innerWidth >= 992)
      }

      window.addEventListener('resize', handleResize);

    }, []);
  
    const fetchCar = () => {
        if (params.id) {
            CarService.getById(parseInt(params.id)).then(response => {
                setCar(response.data);
            });
        }
    };
    
  return (
    <div>
        {/* BODY */}
        <div className='row d-flex justify-content-center'>
            {/* CAR DETAILS */}
            <div id='car-details'className='col-lg-8 col-md-12  d-flex align-items-center' >
                <CarDetailsCard car={car} />
            </div>
            {/* PAYMENT DETAILS */}
            <div id='payment-details' className='col-lg-4 col-md-12 d-flex align-items-center'>
                <PaymentDetailsCard car={car} screenWidth={screenWidth} />
            </div>
        </div >
        {/* FOOTER */}
        <FooterCard />
    </div>
    )
}