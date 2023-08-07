import { React, useEffect, useState } from "react";
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
        const listData = await response.json();
        // const uploadData = data.push(jsonData)
        setData(listData);
        console.log(listData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="upload-container">
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Department</th>
              <th>Date uploaded</th>
              <th>Download button</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.department}</td>
                <td>{item.date}</td>
                <td>
                  <a href={item.file} download>
                    Download
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
  );
};

export default uploadList;
