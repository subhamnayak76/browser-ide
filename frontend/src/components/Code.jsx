import React, { useState } from "react";

const Code = () => {
  const [code, setCode] = useState('console.log("Hello World")');
  const [output, setOutput] = useState("");

  
  const sendCode = async () => {
    try {
      const response = await fetch("http://localhost:3000/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),  // Send code to backend
      });

      const result = await response.json();
      setOutput(result.output);  
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Online Code Executor</h1>
      
      
      <textarea
        id="code"
        rows="10"
        cols="50"
        value={code}
        onChange={(e) => setCode(e.target.value)}  
      />
      <br />

      
      <button onClick={sendCode}>Run Code</button>

      
      <pre id="output">{output}</pre>
    </div>
  );
};

export default Code;
