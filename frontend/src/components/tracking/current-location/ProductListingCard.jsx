import React, { useState } from "react";
import Chart from "react-apexcharts";
import "./productListingCard.scss";

const ProductListingCard = () => {
  const [radialBarOptions, setRadialBarOptions] = useState({
    options: {
      stroke: {
        lineCap: "round",
      },
      colors: ["#FF872B"],
      plotOptions: {
        radialBar: {
          size: 50,
          inverseOrder: false,
          startAngle: -180,
          endAngle: 180,
          offsetX: 0,
          offsetY: 0,

          track: {
            show: true,
            startAngle: undefined,
            endAngle: undefined,
            background: "#eee",
            strokeWidth: "60%",
            opacity: 1,
            margin: 5,

            dropShadow: {
              enabled: false,
              top: 0,
              left: 0,
              blur: 3,
              opacity: 0.5,
            },
          },
          dataLabels: {
            show: true,
            name: {
              show: false,
              fontSize: "10px",
              fontFamily: undefined,
              color: undefined,
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: "12px",
              fontFamily: undefined,
              color: undefined,
              offsetY: 5,
              formatter: function (val) {
                return val + " (PAC)";
              },
            },
          },
        },
      },
    },

    series: [50],
    fill: {
      colors: "#eeeeee",
      opacity: 0.9,
      type: "solid",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: "#eeeeee",
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 100],
        colorStops: [],
      },
    },
  });

  return (
    <div className="mi-flex productlisting-card-container">
      <ul className="f-col product-listing-unordered-list ml-2">
        <li className="product-listing-item mb-2">
          <div className="mi-flex-ac">
            <i className="fa-solid fa-prescription-bottle-medical color-green"></i>
            <div className="ml-1">Product Name</div>
          </div>
          <div className="color-blue">Biopolio</div>
        </li>
        <li className="product-listing-item mb-2">
          <div className="mi-flex-ac">
            <i className="fa-solid fa-building color-green"></i>
            <div className="ml-1">Manufacturer</div>
          </div>
          <div className="color-blue">Bharath Biotech</div>
        </li>
        <li className="product-listing-item mb-2">
          <div className="mi-flex-ac">
            <i className="fa-solid fa-clipboard-list color-green"></i>
            <div className="ml-1">Batch No</div>
          </div>
          <div className="color-blue">BJS2456</div>
        </li>
        <li className="product-listing-item mb-2">
          <div className="mi-flex-ac">
            <i className="fa-solid fa-tag color-green"></i>
            <div className="ml-1">Label Code</div>
          </div>
          <div className="color-blue">LB124</div>
        </li>
      </ul>

      <div className="mi-flex">
        <div>
          <Chart
            options={radialBarOptions.options}
            series={radialBarOptions.series}
            type="radialBar"
            width="160"
          />
          <div className="mi-flex-jc mi-input-xs">
            <i className="fa-solid fa-truck-moving mr-1 color-green"></i>
            Quantity Sent
          </div>
        </div>
        <div>
          <Chart
            options={radialBarOptions.options}
            series={radialBarOptions.series}
            type="radialBar"
            width="160"
          />
          <div className="mi-flex-jc mi-input-xs">
            <i className="fa-solid fa-truck-moving mr-1 color-green"></i>
            Quantity Received
          </div>
        </div>
      </div>
      <div className="mi-flex f-col">
        <button className="mi-btn f-col mi-blue-btn mi-btn-sm mb-2">
          <div>
            <i class="fa-solid fa-calendar-days"></i> Mfg Date
          </div>
          <div>12/08/2018</div>
        </button>
        <button className="mi-btn f-col mi-blue-btn mi-btn-sm mb-2">
          <div>
            <i class="fa-solid fa-calendar-days"></i> Mfg Date
          </div>
          <div>12/08/2018</div>
        </button>
      </div>
    </div>
  );
};

export default ProductListingCard;
