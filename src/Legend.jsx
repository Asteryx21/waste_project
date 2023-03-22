import React, { useState, useEffect } from 'react';
import './Legend.css';


function Legend({ colors, labels, legends }) {
    const [selectedLegend, setSelectedLegend] = useState(legends);
    const [selectedColors, setSelectedColors] = useState(colors.slice(0, 4));
    const [selectedLabels, setSelectedLabels] = useState(labels.slice(0, 4));
    useEffect(() => {
      // Update selectedLegend when legends prop changes
      setSelectedLegend(legends);
      
      // Update selectedLabels based on the selectedLegend
      if (selectedLegend === "Renewable energy consumption") {
        setSelectedLabels(["0-20%", "20-40%", "40-100%", "No data"]);
        setSelectedColors(['red', 'orange', 'green','#525452']);
      } else if (selectedLegend === "Waste generation per capita") {
        setSelectedLabels(["0 - 3000 kg", "3000 - 7000 kg", ">=7000 kg", "No data"]);
        setSelectedColors(['red', 'orange', 'green','#525452']);
      } else if (selectedLegend === "Recycling rate of municipal waste") {
        setSelectedLabels(["0-20%", "20-45%", "45-50%", "50-100%", "No data"]);
        setSelectedColors(['red', 'orange', "lightgreen",'green','#525452']);
      }
    }, [legends, selectedLegend]);
  
    return (
      <div className="legend">
        <p><b>{selectedLegend}</b></p>
        {selectedLabels.map((label, i) => (
          <div key={i} className="legend-item">
            <div className="legend-color" style={{ backgroundColor: selectedColors[i] }}></div>
            <div className="legend-label">{label}</div>
          </div>
        ))}
      </div>
    );
}
  
export default Legend;

  
  
  
  
  