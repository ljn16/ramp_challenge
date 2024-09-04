import "./styles.css";
import React, { useState, useEffect } from "react";

const FlagComponent = () => {
  const [flag, setFlag] = useState(""); // Store the flag from the server
  const [loading, setLoading] = useState(true); // Track loading state
  const [displayFlag, setDisplayFlag] = useState(""); // Track flag with typewriter effect
  // const [myFlag, setMyFlag] = useState("");
  let myFlag = "";

  /* Fetch the flag from the URL */
  useEffect(() => {
    const fetchFlag = async () => {
      try {
        const URL =
          "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/646973";
        const response = await fetch(URL);
        const data = await response.text();

        myFlag = data;
        console.log(myFlag);
        setFlag(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flag:", error);
      }
    };

    fetchFlag();
  }, []);

  /* Simulate typewriter effect after flag is loaded */
  useEffect(() => {
    if (!loading && flag) {
      let index = 0;
      const intervalId = setInterval(() => {
        setDisplayFlag((prev) => prev + flag[index]);
        index++;
        if (index === flag.length) {
          clearInterval(intervalId);
        }
      }, 500); // 0.5 second delay between each character
    }
  }, [flag, loading]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {[...displayFlag].map((char, idx) => (
            <li key={idx}>{char}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FlagComponent;

/* ***SCRIPT TO FIND URL:***
  function extractIValues() {
    const applicableIElements = document.querySelectorAll('code > div > span > i');  // select all <i> elements that are nested as: <code><div><span><i>
    let values = [];  // store the extracted values
    
    applicableIElements.forEach(applicableIElements => {
      values.push(applicableIElements.getAttribute('value'));  // iterate over the selected elements and push their value into the array
    });
    
    return values.join('');  // return the values array
  }

  extractIValues();  // invoke the function
*/
