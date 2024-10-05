const express = require('express');
const { exec } = require('child_process');  
const cors = require('cors');
const app = express();
const PORT = 3000;
app.use(cors())

app.use(express.json());


app.post('/execute', (req, res) => {
  const { code } = req.body;

  
  const fs = require('fs');
  const tempFilePath = './temp_user_code.js';
  fs.writeFileSync(tempFilePath, code);

  
  exec(`node ${tempFilePath}`, (error, stdout, stderr) => {
    
    fs.unlinkSync(tempFilePath);

    if (error || stderr) {
      return res.json({ output: stderr || error.message });
    }

    
    return res.json({ output: stdout });
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
