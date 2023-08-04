import {useState, useRef, useEffect, useMemo} from "react";
import React from "react";
import {MdOutlineCancel} from "react-icons/md";

import "./main.css";
import {getDepartments, getFacultyList} from "../../utils/util";
import axios from "axios";

const MainPage = () => {
  // State variables to store selected values
  const [result, setResult] = useState();
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [fileName, setFileName] = useState("");
  const [facultyOptions, setFacultyOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);

  // Arrays containing options for faculty and department labels
  // const facultyOptions = ["Select your faculty", "Art", "Technology", "Music"];

  const inputRef = useRef(null);
  // Event handlers for changing selections
  const handleFacultyChange = (event) => {
    setSelectedFaculty(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
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
    console.log({selectedFaculty});
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
        // setData(jsonData);
        // setLoading(false);
        setFacultyOptions(faculty.map((d) => d.trim()));
      } catch (err) {
        console.log(err);
        // setError(err);
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  const downloadDocument = async () => {
    alert(1);
    try {
      if (selectedDepartment) {
        const response = await axios.post(
          "https://items-excel.onrender.com/api/department/generate-csv",
          {department: selectedDepartment}
        );
        console.log({response});
        // YOU WILL GET THE LINK TO DOWNLOAD IT FROM HERE
        // if (!response.ok) {
        //   throw new Error("Network response was not ok");
        // }
        const jsonData = await response.json();
        console.log(jsonData);
      } else {
        alert("select a department");
      }
    } catch (err) {
      console.log(err);
      // setError(err);
      // setLoading(false);
    }
  };

  const onDelete = () => {
    setSelectedFile("");
  };

  return (
    <div className="Container">
      <div className="section-A">
        <h1>ITeMS Query 1</h1>
        <div className="faculty-select-row">
          <select onChange={handleFacultyChange} value={selectedFaculty}>
            {facultyOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select onChange={handleDepartmentChange} value={selectedDepartment}>
            {departmentOptions.map((option, index) => (
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

          {/* {selectedFile ? (
            <img
              style={{ width: "100%", height: "100%" }}
              src={URL.createObjectURL(selectedFile)}
              alt="school-logo"
            />
          ) : (
            <img
              style={{ width: "100%", height: "100%" }}
              src={URL.createObjectURL(selectedFile)}
              alt="school-logo"
            />
          )} */}

          {selectedFile ? (
            // <img
            //   style={{ width: "100%", height: "100%" }}
            //   src={URL.createObjectURL(selectedFile)}
            //   alt="school-logo"
            // />
            <p>{fileName}</p>
          ) : (
            // <img
            //   style={{ width: "100%", height: "100%" }}
            //   src={URL.createObjectURL(selectedFile)}
            //   alt="school-logo"
            // />
            <div className="file-upload-title">
              <p>Add a file</p>
            </div>
          )}
        </div>
        <div className="button-class">
          <div className="download-class">
            <button onClick={downloadDocument}>Download Document</button>
          </div>
          <div className="upload-btn">
            <button onClick={handleUpload} onChange={handleFileChange}>
              Upload Document
            </button>
            <input type="file" ref={inputRef} style={{display: "none"}} />
          </div>
        </div>
      </div>

      <div className="divider" />

      <div className="section-B">
        <h1>ITeMS Query 2</h1>
        <div className="faculty-select-row">
          <select>
            {facultyOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select>
            {departmentOptions.map((option, index) => (
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
          {/* {selectedFile ? (
            <img
              style={{ width: "100%", height: "100%" }}
              src={URL.createObjectURL(selectedFile)}
              alt="school-logo"
            />
          ) : (
            <img
              style={{ width: "100%", height: "100%" }}
              src={URL.createObjectURL(selectedFile)}
              alt="school-logo"
            />
          )} */}

          {selectedFile ? (
            // <img
            //   style={{ width: "100%", height: "100%" }}
            //   src={URL.createObjectURL(selectedFile)}
            //   alt="school-logo"
            // />
            <p>{fileName}</p>
          ) : (
            // <img
            //   style={{ width: "100%", height: "100%" }}
            //   src={URL.createObjectURL(selectedFile)}
            //   alt="school-logo"
            // />
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
              style={{display: "none"}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
