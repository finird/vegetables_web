const sharp = require('sharp');
const { v4 } = require('uuid');
const path = require('path');

class Resize {
  constructor(
    folder,
    size = { width: 300, height: 300 },
    mimetype = 'image/jpeg'
  ) {
    this.folder = folder;
    this.mimetype = mimetype;
    this.size = size;
  }

  async save(buffer) {
    const filename = this.createFilename();
    const filepath = this.filepath(filename);

    if (this.mimetype === 'image/png') {
      await sharp(buffer)
        .resize(this.size.width, this.size.height, {
          fit: sharp.fit.inside,
          withoutEnlargement: true
        })
        .png()
        .toFile(filepath);
    } else {
      await sharp(buffer)
        .resize(this.size.width, this.size.height, {
          fit: sharp.fit.inside,
          withoutEnlargement: true
        })
        .jpeg()
        .toFile(filepath);
    }
    return filename;
  }

  createFilename() {
    console.log(this.mimetype);
    return `${v4()}.${this.mimetype.split('/')[1]}`;
  }

  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`);
  }
}
module.exports = Resize;
