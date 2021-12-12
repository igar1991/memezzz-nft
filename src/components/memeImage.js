import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

export const MemeImage = ({ src, w , h }) => {
    let [image] = useImage(src, 'Anonymous');
    return <Image image={image}  width={w} height={h} />;
};