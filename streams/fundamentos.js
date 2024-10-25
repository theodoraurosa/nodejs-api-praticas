// netflix & spotify
// importacaco de clientes via csv(excel)
// 1gb - 1.000.000
// POST/ upload import.csv
// 10mb/s - 100s
// 100s => insercao no banco de dados

// 10mb/s => 10.000
// Readable streams / writable streams


// streams =>

//process.stdin
//.pipe(process.stdout)

import { Readable, Transform, Writable } from 'node:stream'

class OneToHundredStrean extends Readable {
  index = 1
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))

        this.push(buf)
      }

    }, 100)


  }
}



class MultiplyByStream extends Writable {

}


new OneToHundredStrean()
  .pipe(process.stdout)
