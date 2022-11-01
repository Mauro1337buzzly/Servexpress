const fs = require('fs')
class contenedor {
    constructor(fileName){
        this.nameFile = fileName
    }

        async save(object) {
            let helpArray = []
            try {
                const datos = await fs.promises.readFile(this.nameFile, "utf-8")
                helpArray = JSON.parse(datos)
                let idAr = helpArray.map(item => item.id)
                let idMax = Math.max(...idAr)
                object.id = idMax + 1;
                helpArray.push(object);
                fs.writeFileSync(this.nameFile, JSON.stringify(helpArray))
            }

            catch{ 
                object.id = 0;
                helpArray.push(object);
                fs.writeFileSync(this.nameFile, JSON.stringify(helpArray))
            }
            return object.id
        }
            async getById(number) {
                try { 
                    const datos = await fs.promises.readFile(this.nameFile, "utf-8")
                    let helpArray = JSON.parse(datos)
                    const object = helpArray.find(item => item.id === number)
                    return(object)
                }
                catch { 
                    return null
                }
            }
                async getAll() { 
                    try {
                        const datos = await fs.promises.readFile(this.nameFile, "utf-8")
                        const helpArray = JSON.parse(datos)
                        return helpArray
                    }
                    catch {
                        return null
                    }
                }

                    async deleteById (number) {
                        try {
                            const datos = await fs.readFile(this.nameFile, "utf-8")
                            const helpArray = JSON.parse(datos)
                            const newAr = helpArray.filter (item => item.id !== number)
                            fs.writeFileSync(this.nameFile, JSON.stringify(newAr))
                        }
                        catch {
                            return "No hay objetos"
                        }
                    }

                    deleteAll() {
                        fs.writeFileSync(this.nameFile, "")
                    }
                }

module.exports = contenedor                

const newFile = new contenedor("./productos.txt")    

newFile.save({tittle: "Champagne Chandon", price: 2800, thumbnail:"chandon.jpeg" }).then(resolve => console.log(resolve));
newFile.save({tittle: "Champagne MUM", price: 3500, thumbnail:"mumm.jpeg" }).then(resolve => console.log(resolve));
newFile.save({tittle: "Vino Rutini", price: 4000, thumbnail:"rutini.png" }).then(resolve => console.log(resolve));
newFile.getById(1).then(resolve => console.log(resolve));
newFile.getAll().then(resolve => console.log(resolve));
newFile.deleteById(2);
newFile.deleteAll();

