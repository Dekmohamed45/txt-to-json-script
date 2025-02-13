const fs = require('fs');
const path = require('path');

function processData() {
  const filePath = path.join(__dirname, 'data', 'testformat1_2025-02-12.txt');  // reading info from this txt file
  const outputFile = path.join(__dirname, 'output', 'testformat1_2025-02-12.ndjson'); // saving to this file


  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log('Error reading the file:', err);
      return;
    }

    const lines = data.split('\n');  
    const results = [];  // This will store our final results

    // Loop over each line in the file
    for (let line of lines) {
      line = line.trim();  
      if (!line) continue; 

      const parts = line.split(/\s+/);  // Split by spaces (this assumes only one space or multiple spaces)

      // we need three parts : name, value, and count
      if (parts.length === 3) {
        const name = parts[0];
        let value = parts[1] === '1';  // Convert 1 to true, 0 for false

        const count = parseInt(parts[2], 10);
        const countValue = isNaN(count) ? null : count; 

        // Create an object and push it to the results array
        const obj = {
          name: name,
          value: value,  
          count: countValue 
        };

        results.push(obj);  // Add the object to the new results array being created for the output file
      } else {
        console.log('Invalid format:', line);  // debugging purposes
      }
    }

    // take that array of results and save it into a file
    fs.writeFile(outputFile, results.map(item => JSON.stringify(item)).join('\n'), (err) => {
      if (err) {
        console.log('Error writing the output file:', err);
      } else {
        console.log('Data processed and saved to', outputFile); // giving you a completed message
      }
    });
  });
}

processData();
