import React from 'react'
import Carousel, {arrowsPlugin} from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

const Result = (props) => {
    return (
        <Carousel
            plugins={[
                {
                    resolve: arrowsPlugin,
                },
            ]}
        >
            {props.images.map(image => {
                return (
                    <img src={image} />
                );
            })}
        </Carousel>
    );
}

export default Result;
