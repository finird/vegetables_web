const sharp = require('sharp');
const { v4 } = require('uuid');
const path = require('path');

class Resize {
  constructor(folder, size = { width: 300, height: 300 }) {
    this.folder = folder;
    this.size = size;
  }

  async save(buffer) {
    const filename = Resize.filename();
    const filepath = this.filepath(filename);

    await sharp(buffer)
      .resize(this.size.width, this.size.height, {
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
      .toFile(filepath);
    return filename;
  }

  static filename() {
    return `${v4()}.png`;
  }

  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`);
  }
}
module.exports = Resize;
