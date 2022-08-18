export class BookModel {
    public id: string;
    public name: string;
    public author: string;
    public price: number;
    public stock: number;

    public constructor(
        name: string,
        author: string,
        price: number,
        stock: number
    ) {
        this.name = name;
        this.author = author;
        this.price = price;
        this.stock = stock;
    }

    public setName(name: string) {
        this.name = name;
        return this;
    }

    public setAuthor(author: string) {
        this.author = author;
        return this;
    }

    public setStock(stock: number) {
        this.stock = stock;
        return this;
    }

    public setPrice(price: number) {
        this.price = price;
        return this;
    }

    public build(): BookModel | Error {
        if (!this.name || !this.author || !this.price || !this.stock) {
            return new Error('Invalid book data');
        }

        return this;
    }

    public builder(): BookModel {
        return new BookModel('', '', 0, 0);
    }
}
