# NEST JS GROUP 2
Dokumentasi Nestjs kelompok 2, udah terdiri dari folder controller dan servis yang sudah dipisah - pisah persetiap module-nya

## Instalation
Untuk instalasi awal pada folder Nest.js ini yang pertama dilakukan setelah git pull maka lakukan perintah ini

```
cd Nestjs
npm install
```

Apabila instalasi semua package pada package.json sudah dibuat maka Anda bisa membuat file dengan ekstensi .env, Dengan format default sebagai berikut:
```
PORT = 4000
DATABASE_PORT = 5432
HOST = localhost

DATABASE = (nama_db_realta)
DATABASE_USER = postgres
DATABASE_PASSWORD = (password_postgres)
SECRET_KEY = (secret_password)
```

Apabila .env kalian sudah dibuat maka kalian bisa jalankan perintah ini di terminal
```
npm start
```

Atau

```
npm start:dev
```
## Warn
Pada folder ini kalian tidak perlu menginstal entity atau model dari database, karena sudah tersedia dan kalian hanya perlu koneksi database kalian menggunakan .env seperti yang diatas.

## Generate code
Dokumentasi generate code
```ts
generateCode(currentCode:string) {
    //Ambil Tanggal Sekarang  
    const date = new Date();
    //Ubah Format Tanggal ke YYYYMMDD
    const currentDate =
      date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2);
    //Deklarasi Counting
    let count = 0;
    //Split Kode Jadi 2 array [TRB] [YYYYMMDD-0000]
    let delHashtag = currentCode.split("#");
    //Split Kode Jadi 2 array [YYYYMMDD] [0000]
    let delDash = delHashtag[1].split("-");
    
    //Ambil last date dari last code yang diinput
    let lastDate = delDash[0]
    //Ambil last counting dari last code yang diinput
    let lastCount = parseInt(delDash[1])
  
    //Cek tanggal sekarang dengan last date, Kalau tidak sama countnya di reset dari 1
    if (currentDate != lastDate) {
      count = 1;
    } else {
      //kalau sama countnya di lanjut dari last count yang diinput
      count = lastCount
      count++
    }
    //Set count tadi ke string dan tambahkan 0 didepan nya (Maks 4 digit)
    let newCounting = count.toString().padStart(4, "0");
    //Set code baru
    let newCode = `TRB#${currentDate}-${newCounting}`
    return newCode
  }
```