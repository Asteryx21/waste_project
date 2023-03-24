import React, {useState} from 'react';
import {MapContainer,GeoJSON} from 'react-leaflet';
import {countries} from './data'; //countries geojson borders: https://ec.europa.eu/eurostat/web/gisco/geodata/reference-data/administrative-units-statistical-units/countries
import './Map.css';
import Legend from "./Legend";

const center = [49.51539930407464, 12.65064714500086]

// const legends = ['Energy', 'Waste', 'Recycle']
const colors = ['red', 'orange', 'green','#525452'];
const labels = ['0-20%',  '20-40%', '40-100%', 'No data'];

export default function Map({onOpen, setSelectedCountry, setSelectedFeature}) {

    const [selectedValue, setSelectedValue] = useState('Renewable energy consumption');
    
    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const onEachFeature = (feature, layer) => {
        layer.options.fillColor = 'green'
        layer.options.fillOpacity = 1
        layer.options.weight=2
        layer.options.opacity = 1
        layer.options.dashArray = 3
        layer.options.color='white'

        const value = selectedValue;

        if (value==='Renewable energy consumption'){
            if (feature.properties.RENEW_ENERGY==null || feature.properties.RENEW_ENERGY===''){    
                layer.options.fillColor = '#525452';
            }else{
                if (feature.properties.RENEW_ENERGY >= 40){
                    layer.options.fillOpacity = 1
                } else if (feature.properties.RENEW_ENERGY <= 20){
                    layer.options.fillColor = 'red'
                } else if (feature.properties.RENEW_ENERGY <= 40){
                    layer.options.fillColor = 'orange'
                }
            }
        } else if (value==='Waste generation per capita'){
            if (feature.properties.TRASH_PER_CAPITA==null || feature.properties.TRASH_PER_CAPITA===''){    
                layer.options.fillColor = '#525452';
            }else{
                if (feature.properties.TRASH_PER_CAPITA <= 3000){
                    layer.options.fillOpacity = 1
                } else if (feature.properties.TRASH_PER_CAPITA <= 7000){
                    layer.options.fillColor = 'orange'
                } else if (feature.properties.TRASH_PER_CAPITA >= 7000){
                    layer.options.fillColor = 'red'
                } 
            }
        } else if (value==='Recycling rate of municipal waste'){
            if (feature.properties.RECYCLE==null || feature.properties.RECYCLE===''){    
                layer.options.fillColor = '#525452';
            }else{
                if (feature.properties.RECYCLE >= 50){
                    layer.options.fillOpacity = 1
                } else if (feature.properties.RECYCLE >= 45){
                    layer.options.fillColor = 'lightgreen'
                } else if (feature.properties.RECYCLE >= 20){
                    layer.options.fillColor = 'orange'
                } else if (feature.properties.RECYCLE >= 0){
                    layer.options.fillColor = 'red'
                } 
            }
        }
        layer.on({
            click: (e) => {
                const countryName = e.target.feature.properties;
                setSelectedCountry(countryName);
                setSelectedFeature(value);
                onOpen();
            },
        });
    };

    return (
      <>
        <MapContainer center={center} zoomControl={false} zoom={5} className='MapContainer'>
            <GeoJSON 
            key={selectedValue}
            data={countries.features}
            onEachFeature={onEachFeature}/>
            <Legend colors={colors} labels={labels} legends={selectedValue}/>
                <select className='Test' value={selectedValue} onChange={handleSelectChange}>
                    <option value="Renewable energy consumption">Renewable energy consumption</option>
                    <option value="Waste generation per capita">Waste generation per capita</option>
                    <option value="Recycling rate of municipal waste">Recycling rate of municipal waste</option>
                </select>
        </MapContainer>    
      </>
    )
}