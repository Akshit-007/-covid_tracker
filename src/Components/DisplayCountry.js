import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';
import "../Styles/DisplayCountry.css";
import Heading from './Heading.js';

function DisplayCountry() {

    const [countryData, setCountryData] = React.useState(null);
    const [available, setAvailable] = React.useState(false);
    const [country, setCountry] = React.useState("");
    const [confirmedCase, setConfirmedCase] = React.useState(0);
    const [deathCase, setDeathCase] = React.useState(0);
    const [activeCase, setActiveCase] = React.useState(0);
    const [chartData, setChartData] = React.useState(null);
    const [recovered, setRecovered] = React.useState(0);;




    React.useEffect(() => {
        setCountry(localStorage.getItem("country"));
        let a = localStorage.getItem("country");

        const countryURL = `https://api.covid19api.com/total/country/${a}`;
        axios.get(countryURL).then((response) => {

            setAvailable(true);
            setCountryData(response.data);
            // console.log(countryData)
            // console.log(countryData[countryData.length - 1].Confirmed);
        }).catch(e => { setAvailable(false) })
    }, [available]);

    React.useEffect(() => {
        if (countryData != null) {
            setConfirmedCase(countryData[countryData.length - 1].Confirmed);
            setDeathCase(countryData[countryData.length - 1].Deaths);
            setActiveCase(countryData[countryData.length - 1].Active);
            setRecovered(countryData[countryData.length - 1].Recovered)
            // console.log(countryData[countryData.length - 1].Confirmed);
            // console.log(countryData.slice(-10).map((data) => data.Confirmed));
            setChartData({
                labels: countryData.slice(-10).map((data) => data.Date),
                datasets: [
                    {
                        label: "Active",
                        data: countryData.slice(-10).map((data) => data.Active),
                        backgroundColor: ["blue"]
                    },
                    {
                        label: "Recovered",
                        data: countryData.slice(-10).map((data) => data.Recovered),
                        backgroundColor: ["green"]
                    },
                    {
                        label: "Death",
                        data: countryData.slice(-10).map((data) => data.Deaths),
                        backgroundColor: ["red"]
                    }
                ],
            });
        }

    }, [countryData]);



    return (


        <div>

            <Heading />
            {countryData !== null ? <>

                <div className="country_heading" >{country}</div>
                <br />
                <br />
                <div className="country_data">
                    <div className="country_card">
                        Total Confirmed<br />
                        {confirmedCase}

                        <br />

                    </div>
                    <div className="country_card">
                        Total Death<br />
                        {deathCase}


                    </div>
                    <div className="country_card">
                        Total Active<br />
                        {activeCase}

                    </div>
                    <div className="country_card">
                        Total Active<br />
                        {recovered}

                    </div>
                </div>

                <br />
                <br />
                <br />

                <div className="instruction"> NOTE : It displays data of past 10 days</div>

                <br />
                <br />
                {chartData !== null ? <div className="Bar_style"><Bar data={chartData} /></div> : <>Fetching</>}



            </> : <>
                No Such Country Exist .
            </>}

        </div>
    );
}

export default DisplayCountry;