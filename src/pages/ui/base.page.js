export class BasePage {
    constructor(page) {
        this.page = page;
        this.baseURL = 'https://demowebshop.tricentis.com';

        this.header = {
            container: page.locator('.header'),
            logo: page.locator('.header-logo a img'),
            logoLink: page.locator('.header-logo a'),
            searchBox: page.locator('#small-searchterms'),
            searchButton: page.locator('.search-box-button'),
            cartLink: page.locator('.header-links a[href="/cart"]'),
            wishlistLink: page.locator('.header-links a[href="/wishlist"]'),
            logoutLink: page.locator('.header-links a[href="/logout"]'),
            accountLink: page.locator('.header-links .account'),
        };

        this.navigation = {
            topMenu: page.locator('.top-menu'),
            categories: page.locator('.top-menu > li > a'),
        };

        this.footer = {
            container: page.locator('.footer'),
            informationBlock: page.locator('.footer .column').filter({
                has: page.getByRole('heading', { name: 'Information', level: 3 }),
            }),
            customerServiceBlock: page.locator('.footer .column').filter({
                has: page.getByRole('heading', { name: 'Customer service', level: 3 }),
            }),
            myAccountBlock: page.locator('.footer .column').filter({
                has: page.getByRole('heading', { name: 'My account', level: 3 }),
            }),
            followUsBlock: page.locator('.footer .column').filter({
                has: page.getByRole('heading', { name: 'Follow us', level: 3 }),
            }),
            socialLinks: page.locator('.footer .column').filter({
                has: page.getByRole('heading', { name: 'Follow us', level: 3 }),
            }).locator('li a'),
        };
    }

    async goto(path = '/') {
        await this.page.goto(`${this.baseURL}${path}`);
    }

    async verifyHeaderLogo() {
        const logo = this.header.logo;
        return {
            logo,
            isVisible: await logo.isVisible(),
        };
    }

    async verifySearchBox() {
        const searchBox = this.header.searchBox;
        return {
            searchBox,
            isVisible: await searchBox.isVisible(),
        };
    }

    async verifySearchButton() {
        const button = this.header.searchButton;
        return {
            button,
            isVisible: await button.isVisible(),
        };
    }

    getCategoryLinks() {
        const categories = [
            { name: 'Books', href: '/books' },
            { name: 'Computers', href: '/computers' },
            { name: 'Electronics', href: '/electronics' },
            { name: 'Apparel & Shoes', href: '/apparel-shoes' },
            { name: 'Digital downloads', href: '/digital-downloads' },
            { name: 'Jewelry', href: '/jewelry' },
            { name: 'Gift Cards', href: '/gift-cards' },
        ];

        return categories.map((cat) => ({
            name: cat.name,
            href: cat.href,
            locator: this.navigation.topMenu.locator(`a[href="${cat.href}"]`),
        }));
    }

    getFooterLinks() {
        return {
            information: [
                { text: 'Sitemap', href: '/sitemap' },
                { text: 'Shipping & Returns', href: '/shipping-returns' },
                { text: 'Privacy Notice', href: '/privacy-policy' },
                { text: 'Conditions of Use', href: '/conditions-of-use' },
                { text: 'About us', href: '/about-us' },
                { text: 'Contact us', href: '/contactus' },
            ],
            customerService: [
                { text: 'Search', href: '/search' },
                { text: 'News', href: '/news' },
                { text: 'Blog', href: '/blog' },
                { text: 'Recently viewed products', href: '/recentlyviewedproducts' },
                { text: 'Compare products list', href: '/compareproducts' },
                { text: 'New products', href: '/newproducts' },
            ],
            myAccount: [
                { text: 'My account', href: '/customer/info' },
                { text: 'Orders', href: '/customer/orders' },
                { text: 'Addresses', href: '/customer/addresses' },
                { text: 'Shopping cart', href: '/cart' },
                { text: 'Wishlist', href: '/wishlist' },
            ],
        };
    }
}
