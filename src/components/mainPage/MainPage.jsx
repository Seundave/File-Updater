import { useState, useRef } from "react";
import React from "react";
import { MdOutlineCancel } from "react-icons/md";

import "./main.css";

const MainPage = () => {
  // State variables to store selected values
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [fileName, setFileName] = useState("");

  // Arrays containing options for faculty and department labels
  const facultyOptions = ["Select your faculty", "Art", "Technology", "Music"];
  const departmentOptions = [
    "Select your department",
    "Music",
    "Science",
    "Electrical Engineering",
  ];

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
    // if (selectedFile){
    //     console.log("File selected:", selectedFile);
    // }else{
    //     console.log("Please select a file");
    // }
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
            <a href="icon.pdf" download={fileName}>
              <button>Download Document</button>
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
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
