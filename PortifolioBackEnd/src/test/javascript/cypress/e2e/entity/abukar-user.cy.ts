import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('AbukarUser e2e test', () => {
  const abukarUserPageUrl = '/abukar-user';
  const abukarUserPageUrlPattern = new RegExp('/abukar-user(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const abukarUserSample = { login: 'consequently gosh furiously', passwordHash: 'pitch beggar unimpressively', email: 'G@j`AS.Pa:(' };

  let abukarUser;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/abukar-users+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/abukar-users').as('postEntityRequest');
    cy.intercept('DELETE', '/api/abukar-users/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (abukarUser) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/abukar-users/${abukarUser.id}`,
      }).then(() => {
        abukarUser = undefined;
      });
    }
  });

  it('AbukarUsers menu should load AbukarUsers page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('abukar-user');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('AbukarUser').should('exist');
    cy.url().should('match', abukarUserPageUrlPattern);
  });

  describe('AbukarUser page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(abukarUserPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create AbukarUser page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/abukar-user/new$'));
        cy.getEntityCreateUpdateHeading('AbukarUser');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', abukarUserPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/abukar-users',
          body: abukarUserSample,
        }).then(({ body }) => {
          abukarUser = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/abukar-users+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [abukarUser],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(abukarUserPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details AbukarUser page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('abukarUser');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', abukarUserPageUrlPattern);
      });

      it('edit button click should load edit AbukarUser page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('AbukarUser');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', abukarUserPageUrlPattern);
      });

      it('edit button click should load edit AbukarUser page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('AbukarUser');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', abukarUserPageUrlPattern);
      });

      it('last delete button click should delete instance of AbukarUser', () => {
        cy.intercept('GET', '/api/abukar-users/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('abukarUser').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', abukarUserPageUrlPattern);

        abukarUser = undefined;
      });
    });
  });

  describe('new AbukarUser page', () => {
    beforeEach(() => {
      cy.visit(`${abukarUserPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('AbukarUser');
    });

    it('should create an instance of AbukarUser', () => {
      cy.get(`[data-cy="login"]`).type('peppery beyond virtual');
      cy.get(`[data-cy="login"]`).should('have.value', 'peppery beyond virtual');

      cy.get(`[data-cy="passwordHash"]`).type('afore grant');
      cy.get(`[data-cy="passwordHash"]`).should('have.value', 'afore grant');

      cy.get(`[data-cy="email"]`).type('iFal]@v6hR6.TLEbp');
      cy.get(`[data-cy="email"]`).should('have.value', 'iFal]@v6hR6.TLEbp');

      cy.get(`[data-cy="activated"]`).should('not.be.checked');
      cy.get(`[data-cy="activated"]`).click();
      cy.get(`[data-cy="activated"]`).should('be.checked');

      cy.get(`[data-cy="langKey"]`).type('queue upright provided');
      cy.get(`[data-cy="langKey"]`).should('have.value', 'queue upright provided');

      cy.get(`[data-cy="imageUrl"]`).type('yahoo who');
      cy.get(`[data-cy="imageUrl"]`).should('have.value', 'yahoo who');

      cy.get(`[data-cy="activationKey"]`).type('abaft');
      cy.get(`[data-cy="activationKey"]`).should('have.value', 'abaft');

      cy.get(`[data-cy="resetKey"]`).type('where');
      cy.get(`[data-cy="resetKey"]`).should('have.value', 'where');

      cy.get(`[data-cy="resetDate"]`).type('2024-07-11T00:04');
      cy.get(`[data-cy="resetDate"]`).blur();
      cy.get(`[data-cy="resetDate"]`).should('have.value', '2024-07-11T00:04');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        abukarUser = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', abukarUserPageUrlPattern);
    });
  });
});
