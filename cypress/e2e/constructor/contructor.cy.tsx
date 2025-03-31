const bun = 'Краторная булка N-200i';
const main = 'Биокотлета из марсианской Магнолии';
const sauce = 'Соус Spicy-X';

const selectors = {
  bunIngredients: '[data-cy=bun-ingredients]',
  mainsIngredients: '[data-cy=mains-ingredients]',
  saucesIngredients: '[data-cy=sauces-ingredients]',
  constructorBunTop: '[data-cy=constructor-bun-top]',
  constructorBunBottom: '[data-cy=constructor-bun-bottom]',
  constructorIngredients: '[data-cy=constructor-ingredients]',
  closeModal: '[data-cy=close-modal]',
  closeModalOverlay: '[data-cy=close-modal-overlay]',
  orderButton: '[data-cy=order-button]',
  orderNumber: '[data-cy=order-number]',
  orderConstructor: '[data-cy=order-constructor]'
};

beforeEach(() => {
  cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
  cy.visit('/');
  cy.viewport(1920, 1080);
});

describe('список ингредиентов', () => {
  it('добавление булок в конструктор бургера', () => {
    cy.get(selectors.bunIngredients).contains('Добавить').click();
    cy.get(selectors.constructorBunTop).contains(bun).should('exist');
    cy.get(selectors.constructorBunBottom).contains(bun).should('exist');
  });

  it('добавление ингредиентов в конструктор бургера', () => {
    cy.get(selectors.mainsIngredients).contains('Добавить').click();
    cy.get(selectors.saucesIngredients).contains('Добавить').click();
    cy.get(selectors.constructorIngredients).contains(main).should('exist');
    cy.get(selectors.constructorIngredients).contains(sauce).should('exist');
  });
});

describe('модальное окно ингредиента', () => {
  it('открытие модального окна ингредиента', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains(bun).click();
    cy.contains('Детали ингредиента').should('exist');
  });

  it('закрытие модального окна ингредиента по крестику', () => {
    cy.contains(main).click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get(selectors.closeModal).click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('закрытие модального окна ингредиента по нажатию на оверлей', () => {
    cy.contains(sauce).click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get(selectors.closeModalOverlay).click({ force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('модальное окно заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('создание заказа бургера', () => {
    cy.get(selectors.bunIngredients).contains('Добавить').click();
    cy.get(selectors.mainsIngredients).contains('Добавить').click();
    cy.get(selectors.saucesIngredients).contains('Добавить').click();
    cy.get(selectors.orderButton).click();

    cy.get(selectors.orderNumber).contains(12345).should('exist');
    cy.get(selectors.closeModal).click();
    cy.get(selectors.orderNumber).should('not.exist');

    cy.get(selectors.orderConstructor).contains(bun).should('not.exist');
    cy.get(selectors.orderConstructor).contains(main).should('not.exist');
    cy.get(selectors.orderConstructor).contains(sauce).should('not.exist');
  });
});
