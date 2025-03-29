const bun = 'Краторная булка N-200i';
const main = 'Биокотлета из марсианской Магнолии';
const sauce = 'Соус Spicy-X';

describe('список ингредиентов', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000/');
    cy.viewport(1920, 1080);
  });

  it('добавление булок в конструктор бургера', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-top]').contains(bun).should('exist');
    cy.get('[data-cy=constructor-bun-bottom]').contains(bun).should('exist');
  });

  it('добавление ингредиентов в конструктор бургера', () => {
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-ingredients]').contains(main).should('exist');
    cy.get('[data-cy=constructor-ingredients]').contains(sauce).should('exist');
  });
});

describe('модальное окно ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000/');
    cy.viewport(1920, 1080);
  });

  it('открытие модального окна ингредиента', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains(bun).click();
    cy.contains('Детали ингредиента').should('exist');
  });

  it('закрытие модального окна ингредиента по крестику', () => {
    cy.contains(main).click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=close-modal]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('закрытие модального окна ингредиента по нажатию на оверлей', () => {
    cy.contains(sauce).click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=close-modal-overlay]').click({ force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('модальное окно заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.visit('http://localhost:4000/');
    cy.viewport(1920, 1080);
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('создание заказа бургера', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=order-button]').click();

    cy.get('[data-cy=order-number]').contains(12345).should('exist');
    cy.get('[data-cy=close-modal]').click();
    cy.get('[data-cy=order-number]').should('not.exist');

    cy.get('[data-cy=order-constructor]').contains(bun).should('not.exist');
    cy.get('[data-cy=order-constructor]').contains(main).should('not.exist');
    cy.get('[data-cy=order-constructor]').contains(sauce).should('not.exist');
  });
});
