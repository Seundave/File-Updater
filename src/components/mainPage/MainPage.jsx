import {useState, useRef, useEffect, useMemo} from "react";
import React from "react";
import UploadList from "../uploadList/uploadList";
import {MdOutlineCancel} from "react-icons/md";
import Spinner from "../spinner/Spinner";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./main.css";
import {getDepartments, getFacultyList} from "../../utils/util";
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
    setDownloadLink(null);
    setSelectedDepartment(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const handleFileUpload = async () => {
    console.log({selectedFile});
    if (selectedFile && selectedDepartment) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const fileName = `${selectedFile.name.split(".")[0]}_${Date.now()}`;
      formData.append("public_id", fileName);
      formData.append("upload_preset", "dev_setups"); // Replace with your upload preset name
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/fakod29/raw/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        console.log({data});

        if (data.secure_url) {
          const uploadData = {
            department: selectedDepartment,
            secure_url: data.secure_url,
            original_filename: data.original_filename,
            public_id: data.public_id,
            created_at: data.created_at,
          };
          await axios.post(
            "https://items-excel.onrender.com/api/department/upload/update",
            uploadData
          );
          setLoading(false);

          setSelectedDepartment("");
          setSelectedFaculty("");
          alert("Thank you, data successfully uploaded ");
        }

        // setUploadedFile(data.secure_url);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      alert("please select a file and  depart you are uploading for");
    }
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
        setFacultyOptions(faculty.map((d) => d.trim()));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const downloadDocument = async () => {
    try {
      if (selectedDepartment) {
        setLoading(true);
        const response = await axios.post(
          "https://items-excel.onrender.com/api/department/generate-csv",
          {department: selectedDepartment}
        );
        console.log({response});
        setDownloadLink(response.data.secure_url);
        setFileName(response.data.public_id);
        downloadFile(response.data.secure_url);
      } else {
        alert("select a department");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const downloadFile = (downloadLink) => {
    // Create a hidden download link
    const link = document.createElement("a");
    link.href = downloadLink;
    link.target = "_self"; // Open in a new tab
    link.download = downloadLink; // Set the desired file name

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger the click event to initiate the download
    link.click();

    // Clean up - remove the link from the document
    document.body.removeChild(link);
    setLoading(false);
    alert("successfully downloaded the document");
    setDownloadLink("");
  };

  const onDelete = () => {
    setFileName("");
    setDownloadLink(null);
  };

  return (
    <div>
      <nav className="navbar">
        <img src="./UILogo.jpg" alt="Logo" className="navbar-logo" />
        <h1 className="navbar-title">UI DATA EDIT</h1>
      </nav>
      <div className="Container">
        <div className="section-A">
          <h1>DEPARTMENT EDIT</h1>
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
            <select
              defaultValue="placeholder"
              onChange={handleDepartmentChange}
            >
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
          {selectedDepartment && (
            <div style={{marginBottom: "30px"}}>
              <div className="download-class">
                <a href={downloadLink} download>
                  <button onClick={downloadDocument}>Download Document</button>
                </a>
              </div>
            </div>
          )}

          {loading ? (
            <Spinner />
          ) : (
            <div className="document-display">
              <span className="delete-icon" onClick={onDelete}>
                <MdOutlineCancel className="delete-button" />
              </span>

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
            <div className="select-btn">
              <button onClick={handleUpload}>Select Document</button>
              <input
                type="file"
                ref={inputRef}
                onChange={handleFileChange}
                style={{display: "none"}}
              />
            </div>
            <div className="upload-btn">
              <button
                onClick={handleFileUpload}
                disabled={selectedFile === null ? true : false}
              >
                Upload Document
              </button>
            </div>
          </div>
        </div>

        <div className="divider" />

        {/* <div className="section-B">
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
                style={{display: "none"}}
              />
            </div>
          </div>
        </div> */}
      </div>

      {/* <ToastContainer /> */}
    </div>
  );
};

export default MainPage;
