export class UserBuilder {
    constructor() {
        const id = Date.now();
        this._name = `User${id}`;
        this._email = `user${id}@test.com`;
        this._password = 'Pass12345!';
    }

    withName(name) {
        this._name = name;
        return this;
    }

    withEmail(email) {
        this._email = email;
        return this;
    }

    withPassword(password) {
        this._password = password;
        return this;
    }

    build() {
        return {
            name: this._name,
            email: this._email,
            password: this._password,
        };
    }
}

export class UIUserBuilder {
    constructor() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000);
        this._firstName = `First${timestamp}`;
        this._lastName = `Last${timestamp}`;
        this._email = `testuser${timestamp}${random}@example.com`;
        this._password = UIUserBuilder._generatePassword();
        this._gender = 'M';
    }

    static _generatePassword(length = 10) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }

    withFirstName(name) {
        this._firstName = name;
        return this;
    }

    withLastName(name) {
        this._lastName = name;
        return this;
    }

    withEmail(email) {
        this._email = email;
        return this;
    }

    withPassword(password) {
        this._password = password;
        return this;
    }

    withGender(gender) {
        this._gender = gender;
        return this;
    }

    build() {
        return {
            firstName: this._firstName,
            lastName: this._lastName,
            email: this._email,
            password: this._password,
            gender: this._gender,
        };
    }
}