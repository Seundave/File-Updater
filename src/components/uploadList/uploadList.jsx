import {React, useEffect, useState} from "react";
import "./upload.css";

const uploadList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://items-excel.onrender.com/api/department/upload/all"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log(response);
        const listData = await response.json();
        // const uploadData = data.push(jsonData)
        console.log({listData, response});
        setData(listData.document);
        console.log(listData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <nav className="navbar">
        <img src="./UILogo.jpg" alt="Logo" className="navbar-logo" />
        <h1 className="navbar-title">UI DATA EDIT</h1>
      </nav>
      <div className="upload-container">
        {data.length > 0 ? (
          <table style={{margin: "20px auto", width: "95%"}}>
            <thead>
              <tr>
                <th>Department</th>
                <th>Date uploaded</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.department}</td>
                  <td>
                    {item.created_at.split("T")[0]}{" "}
                    {item.created_at.split("T")[1].split(".")[0]}
                  </td>
                  <td>
                    <a href={item.secure_url} download>
                      Download document
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No upload yet</p>
        )}
      </div>
    </div>
  );
};

export default uploadList;
