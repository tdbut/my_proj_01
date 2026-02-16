import { test, expect } from '../fixtures/ui.fixtures.js';
import { UIDataGenerator } from '../src/helpers/ui.data.generator.js';

test.describe('DemoWebShop - UI тесты', () => {
    let userData;

    test.beforeEach('Регистрация и авторизация', async ({ registerPage }) => {
        userData = UIDataGenerator.getRandomUserData();
        await registerPage.register(userData);
        
        console.log(`User logged in: ${userData.email}`);
    });

    test(
        'Проверка элементов хедера',
        { tag: ['@ui', '@components', '@header'] },
        async ({ basePage }) => {
            await basePage.goto('/');
            
            const logo = await basePage.verifyHeaderLogo();
            await expect(logo.logo).toBeVisible();
            await expect(logo.logo).toHaveAttribute('alt', /Tricentis Demo Web Shop/i);
            
            const searchBox = await basePage.verifySearchBox();
            await expect(searchBox.searchBox).toBeVisible();
            await expect(searchBox.searchBox).toBeEnabled();
            await expect(searchBox.searchBox).toHaveAttribute('value', /Search store/i);
            
            const searchBtn = await basePage.verifySearchButton();
            await expect(searchBtn.button).toBeVisible();
            await expect(searchBtn.button).toHaveAttribute('type', 'submit');
            
            await expect(basePage.header.cartLink).toBeVisible();
            await expect(basePage.header.cartLink).toContainText('Shopping cart');
            
            await expect(basePage.header.logoutLink).toBeVisible();
            await expect(basePage.header.logoutLink).toContainText('Log out');
            
            console.log('Header components verified');
        }
    );

    test(
        'Проверка элементов страницы товара',
        { tag: ['@ui', '@components', '@product'] },
        async ({ basePage, productPage }) => {
           
            await basePage.goto('/blue-and-green-sneaker');
            await basePage.page.waitForLoadState('domcontentloaded');
            
            const name = await productPage.verifyProductName();
            await expect(name.locator).toBeVisible();
            expect(name.hasText).toBeTruthy();
            
            const price = await productPage.verifyProductPrice();
            await expect(price.locator).toBeVisible();
            expect(price.hasValidFormat).toBeTruthy();
            
            const cartBtn = await productPage.verifyAddToCartButton();
            await expect(cartBtn.locator).toBeVisible();
            await expect(cartBtn.locator).toBeEnabled();
            await expect(cartBtn.locator).toHaveAttribute('type', 'button');
            expect(cartBtn.text).toContain('Add to cart');
            
            const wishlistBtn = await productPage.verifyAddToWishlistButton();
            await expect(wishlistBtn.locator).toBeVisible();
            await expect(wishlistBtn.locator).toBeEnabled();
            expect(wishlistBtn.text).toContain('Add to wishlist');
            
            console.log('Product page components verified');
        }
    );

    test(
        'Проверка элементов корзины',
        { tag: ['@ui', '@components', '@cart'] },
        async ({ basePage, productPage, cartPage }) => {
           
            await basePage.goto('/books');
            await basePage.page.locator('.product-item .product-title a').first().click();
            await basePage.page.waitForLoadState('domcontentloaded');
            await productPage.addToCart();
            
            await cartPage.goto('/cart');
            
            const title = await cartPage.verifyPageTitle();
            await expect(title.locator).toBeVisible();
            expect(title.text).toContain('Shopping cart');
            
            const table = await cartPage.verifyCartTable();
            await expect(table.locator).toBeVisible();
            
            const headers = await cartPage.verifyTableHeaders();
            expect(headers.some(h => h.text.includes('Product'))).toBeTruthy();
            expect(headers.some(h => h.text.includes('Price'))).toBeTruthy();
            expect(headers.some(h => h.text.includes('Qty'))).toBeTruthy();
            expect(headers.some(h => h.text.includes('Total'))).toBeTruthy();
            
            const checkbox = await cartPage.verifyRemoveCheckbox();
            await expect(checkbox.locator).toBeVisible();
            await expect(checkbox.locator).toBeEnabled();
            
            const updateBtn = await cartPage.verifyUpdateButton();
            await expect(updateBtn.locator).toBeVisible();
            await expect(updateBtn.locator).toBeEnabled();
            await expect(updateBtn.locator).toHaveAttribute('name', 'updatecart');
            expect(updateBtn.text).toContain('Update shopping cart');
            
            await expect(cartPage.termsCheckbox).toBeVisible();
            
            const checkoutBtn = await cartPage.verifyCheckoutButton();
            await expect(checkoutBtn.locator).toBeVisible();
            await expect(checkoutBtn.locator).toHaveAttribute('type', 'submit');
            
            console.log('Cart components verified');
        }
    );

    test(
        'Проверка элементов навигации по категориям',
        { tag: ['@ui', '@components', '@navigation'] },
        async ({ basePage }) => {
            await basePage.goto('/');
            
            await expect(basePage.navigation.topMenu).toBeVisible();
            
            const categories = basePage.getCategoryLinks();
            
            for (const category of categories) {
                await expect(category.locator).toBeVisible();
                await expect(category.locator).toContainText(category.name);
                await expect(category.locator).toHaveAttribute('href', category.href);
            }
            
            console.log(`Verified ${categories.length} navigation categories`);
        }
    );

    test(
        'Проверка футера и его элементов',
        { tag: ['@ui', '@components', '@footer'] },
        async ({ basePage }) => {
            await basePage.goto('/');
            
            await expect(basePage.footer.container).toBeVisible();
            
            await expect(basePage.footer.informationBlock).toBeVisible();
            await expect(
                basePage.footer.informationBlock.getByRole('heading', { name: 'Information', level: 3 })
            ).toBeVisible();
            
            const footerLinks = basePage.getFooterLinks();
            
            for (const link of footerLinks.information) {
                const element = basePage.footer.container.locator(`a[href="${link.href}"]`);
                await expect(element).toBeVisible();
                await expect(element).toContainText(link.text);
            }
            
            await expect(basePage.footer.customerServiceBlock).toBeVisible();
            await expect(
                basePage.footer.customerServiceBlock.getByRole('heading', { name: 'Customer service', level: 3 })
            ).toBeVisible();
            
            await expect(basePage.footer.myAccountBlock).toBeVisible();
            await expect(
                basePage.footer.myAccountBlock.getByRole('heading', { name: 'My account', level: 3 })
            ).toBeVisible();
            
            await expect(basePage.footer.followUsBlock).toBeVisible();
            await expect(
                basePage.footer.followUsBlock.getByRole('heading', { name: 'Follow us', level: 3 })
            ).toBeVisible();
            
            const socialCount = await basePage.footer.socialLinks.count();
            expect(socialCount).toBeGreaterThan(0);
            
            console.log('Footer components verified');
        }
    );
});
