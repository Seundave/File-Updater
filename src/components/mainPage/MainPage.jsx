import { useState, useRef, useEffect, useMemo } from "react";
import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import Spinner from "../spinner/Spinner";

import "./main.css";
import { getDepartments, getFacultyList } from "../../utils/util";
import axios from "axios";

const MainPage = () => {
  // State variables to store selected values
  const [result, setResult] = useState();
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [fileName, setFileName] = useState("");
  const [facultyOptions, setFacultyOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [downloadLink, setDownloadLink] = useState(null);

  const inputRef = useRef(null);
  // Event handlers for changing selections
  const handleFacultyChange = (event) => {
    setSelectedFaculty(event.target.value);
    setDownloadLink(null);
  };

  const handleDepartmentChange = async (event) => {
    setLoading(true);
    setDownloadLink(null);
    try {
      if (event.target.value) {
        const response = await axios.post(
          "https://items-excel.onrender.com/api/department/generate-csv",
          { department: event.target.value }
        );
        console.log(response.data);

        setDownloadLink(response.data.secure_url);
        setFileName(response.data.public_id);
        setLoading(false);
      } else {
        alert("select a department");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    console.log(event);
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const handleUpload = () => {
    inputRef.current.click();
  };
  useMemo(() => {
    console.log({ selectedFaculty });
    if (selectedFaculty) {
      const departments = getDepartments(selectedFaculty, result);
      setDepartmentOptions(departments.map((d) => d.trim()));
    }
  }, [selectedFaculty]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://items-excel.onrender.com/api/department/all"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setResult(jsonData.departments);
        const faculty = getFacultyList(jsonData.departments);
        setFacultyOptions(faculty.map((d) => d.trim()));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const onDelete = () => {
    setFileName("");
    setDownloadLink(null);
  };

  return (
    <div className="Container">
      <div className="section-A">
        <h1>ITeMS Query 1</h1>
        <div className="faculty-select-row">
          <select defaultValue="placeholder" onChange={handleFacultyChange}>
            <option value="placeholder" disabled>
              {" "}
              Enter your Faculty
            </option>
            {facultyOptions?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select defaultValue="placeholder" onChange={handleDepartmentChange}>
            <option value="placeholder" disabled>
              Enter your Department
            </option>
            {departmentOptions?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className="document-display">
            <span className="delete-icon" onClick={onDelete}>
              <MdOutlineCancel className="delete-button" />
            </span>

            <p>{fileName}</p>

            {selectedFile ? (
              <p>{fileName}</p>
            ) : (
              !fileName && (
                <div className="file-upload-title">
                  <p>Add a file</p>
                </div>
              )
            )}
          </div>
        )}

        <div className="button-class">
          <div className="download-class">
            <a href={downloadLink} download>
              <button disabled={downloadLink === null ? true : false}>
                Download Document
              </button>
            </a>
          </div>
          <div className="upload-btn">
            <button onClick={handleUpload} onChange={handleFileChange}>
              Upload Document
            </button>
            <input type="file" ref={inputRef} style={{ display: "none" }} />
          </div>
        </div>
      </div>

      <div className="divider" />

      <div className="section-B">
        <h1>ITeMS Query 2</h1>
        <div className="faculty-select-row">
          <select defaultValue="placeholder">
            <option value="placeholder" disabled>
              Enter your Faculty
            </option>
            {facultyOptions?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select defaultValue="placeholder">
            <option value="placeholder" disabled>
              Enter your department
            </option>
            {departmentOptions?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="document-display">
          <span className="delete-icon" onClick={onDelete}>
            <MdOutlineCancel className="delete-button" />
          </span>
          {selectedFile ? (
            <p>{fileName}</p>
          ) : (
            <div className="file-upload-title">
              <p>Add a file</p>
            </div>
          )}
        </div>
        <div className="button-class">
          <div className="download-class">
            <button>Download Document</button>
          </div>
          <div className="upload-btn">
            <button onClick={handleUpload}>Upload Document</button>
            <input
              type="file"
              ref={inputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
