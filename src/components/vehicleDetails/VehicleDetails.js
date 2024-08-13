import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './VehicleDetails.css';
import { FaShoppingCart, FaRegBookmark, FaStar, FaFireAlt } from 'react-icons/fa';

function VehicleDetails() {
   
    const location = useLocation();
    const vehicle = location.state?.vehicleDetails;
    const navigate = useNavigate();

    if (!vehicle) {
        return <div>Error: Vehicle details not available!</div>;
    }

    function capitalizeFirstLetter(string) {
        if (typeof string !== 'string') {
            return string;
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const goBack = () => {
        navigate(-1);
    };
    
    return(
        <>
        <div className="siteTitle">
        <IconButton onClick={goBack} style={{ marginRight: '20px' }}>
            <ArrowBackIcon />
        </IconButton>
            Vehicle Details {'>'} {vehicle.id}
        </div>
        <div className='vehicleList'>
            <div key={vehicle.id} className='vehicleCard'>
                <FaRegBookmark className={"vehicleCard__wishlist"} />
                <FaFireAlt className={"vehicleCard__fastSelling"} />
                <img src={`https://loremflickr.com/320/240/${vehicle.year},${vehicle.make},${vehicle.model}/all`} alt='vehicle-img' className='vehicleImage'></img>

                <div className='vehicleCard__content'>
                    <h3 className='vehicleName'>{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                    <div className='displayStack__1'>
                        <div className='vehiclePrice'>{vehicle.id}</div>
                        <div className='vehicleTime'>{capitalizeFirstLetter(vehicle.make)}</div>
                    </div>
                    <div className='displayStack__2'>
                        <div className='vehicleRating'>
                            <FaStar id={5} key={5} />
                            <FaStar id={5} key={4} />
                            <FaStar id={5} key={3} />
                            <FaStar id={5} key={2} />
                            <FaStar id={5} key={1} />
                        </div>
                        <div className='vehicleTime'>{vehicle.location}</div>
                    </div>
                </div>
                <div className='vehicleCard__content'>
                    <h3 className='vehicleName'>+ info:</h3>
                    <div className='infoColumns'>
                        <div className='infoColumn'>
                            <div className='vehicleInfoItem'>
                                <div className='vehicleInfoTitle'>Class:</div>
                                <div className='vehicleInfoValue'>{capitalizeFirstLetter(vehicle.class)}</div>
                            </div>
                            <div className='vehicleInfoItem'>
                                <div className='vehicleInfoTitle'>Drive:</div>
                                <div className='vehicleInfoValue'>{capitalizeFirstLetter(vehicle.drive)}</div>
                            </div>
                            <div className='vehicleInfoItem'>
                                <div className='vehicleInfoTitle'>Fuel Type:</div>
                                <div className='vehicleInfoValue'>{capitalizeFirstLetter(vehicle.fuel_type)}</div>
                            </div>
                        </div>
                        <div className='infoColumn'>
                            <div className='vehicleInfoItem'>
                                <div className='vehicleInfoTitle'>Transmission:</div>
                                <div className='vehicleInfoValue'>{capitalizeFirstLetter(vehicle.transmission)}</div>
                            </div>
                            <div className='vehicleInfoItem'>
                                <div className='vehicleInfoTitle'>Displacement:</div>
                                <div className='vehicleInfoValue'>{capitalizeFirstLetter(vehicle.displacement)} L</div>
                            </div>
                            <div className='vehicleInfoItem'>
                                <div className='vehicleInfoTitle'>Cylinders:</div>
                                <div className='vehicleInfoValue'>{capitalizeFirstLetter(vehicle.cylinders)}</div>
                            </div>                  
                        </div>
                        <div className='infoColumn'>
                            <div className='vehicleInfoItem'>
                                <div className='vehicleInfoTitle'>City MPG:</div>
                                <div className='vehicleInfoValue'>{capitalizeFirstLetter(vehicle.city_mpg)} MPG</div>
                            </div>
                            <div className='vehicleInfoItem'>
                                <div className='vehicleInfoTitle'>Highsway MPG:</div>
                                <div className='vehicleInfoValue'>{capitalizeFirstLetter(vehicle.highway_mpg)} MPG</div>
                            </div>
                            <div className='vehicleInfoItem'>
                                <div className='vehicleInfoTitle'>Combination MPG:</div>
                                <div className='vehicleInfoValue'>{capitalizeFirstLetter(vehicle.combination_mpg)} MPG</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default VehicleDetails;