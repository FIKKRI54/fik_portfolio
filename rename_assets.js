const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../sequence');
const targetDir = path.join(__dirname, 'public/sequence');

if (!fs.existsSync(targetDir)){
    fs.mkdirSync(targetDir, { recursive: true });
}

fs.readdir(sourceDir, (err, files) => {
    if (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
    }

    files.forEach((file, index) => {
        if (file.endsWith('.jpg')) {
            // Extract number
            const match = file.match(/ezgif-frame-(\d+).jpg/);
            if (match) {
                const num = match[1];
                const newName = `cyber-frame-${num}.jpg`;
                const oldPath = path.join(sourceDir, file);
                const newPath = path.join(targetDir, newName);

                fs.copyFile(oldPath, newPath, (err) => {
                    if (err) throw err;
                    console.log(`${file} -> ${newName}`);
                });
            }
        }
    });
});
