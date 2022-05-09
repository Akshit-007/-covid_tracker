import React, { useState, useEffect } from 'react';
import axios from "axios";
import "../Styles/Display.css";
import { useNavigate } from 'react-router';
import Heading from './Heading.js';

const baseURL = "https://api.covid19api.com/summary";

function Display() {

    const [data, setData] = React.useState(null);
    const [globalData, setGlobaldata] = React.useState(null);
    const [country, setCountry] = React.useState("");

    let navigate = useNavigate();

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            // console.log(response.data.Countries);
            setData(response.data.Countries);
            setGlobaldata(response.data.Global);

        });


    }, []);
    const handleCountryChange = (e) => {
        setCountry(e.target.value);
    }
    const searchCountry = () => {
        const str = country;

        const arr = str.split(" ");

        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

        }

        const str2 = arr.join(" ");
        setCountry(str2);
        localStorage.setItem("country", country);
        navigate(`/display/country`);

    }

    return (
        <div className="display_body">


            <br />
            <div className="search_country">
                <input type="text" value={country} onChange={handleCountryChange} placeholder="Country" className="input_val" />
                &nbsp; &nbsp;
                <span type="button" onClick={searchCountry} className="btn_search">Search</span>
            </div>

            {globalData !== null ? <>
                <div className="table_heading" >Global Data</div>
                <div className="global_data">
                    <div className="data_card">
                        Total Confirmed<br />
                        {globalData.TotalConfirmed}

                        <br />
                        <br />
                        New Confirmed<br />
                        {globalData.NewConfirmed}
                    </div>
                    <div className="data_card">
                        Total Recovered<br />
                        {globalData.TotalRecovered}

                        <br />
                        <br />
                        New Recovered<br />
                        {globalData.NewRecovered}
                    </div>
                    <div className="data_card">
                        Total Confirmed<br />
                        {globalData.TotalConfirmed}

                        <br />
                        <br />
                        New Confirmed<br />
                        {globalData.NewConfirmed}
                    </div>
                </div>

            </> : <>Loading</>}


            <div>
                {data !== null ? <>
                    <div className="table_heading">Country Data</div>
                    <table className="table_main">
                        <tr >
                            <th className="table_head_row">Country</th>
                            <th className="table_head_row">Confirmed</th>
                            <th className="table_head_row">Recovered</th>
                            <th className="table_head_row">Deceased</th>
                        </tr>
                        {data.map((country_data, index) => {
                            return (


                                <tr key={index} >
                                    <td className="table_row">{country_data.Country}</td>
                                    <td className="table_row">{country_data.TotalConfirmed}</td>
                                    <td className="table_row">{country_data.TotalRecovered}</td>
                                    <td className="table_row">{country_data.TotalDeaths}</td>

                                </tr>




                            )
                        })}
                    </table>
                </> : <>Loading</>}

            </div>
        </div>
    );
}

export default Display;