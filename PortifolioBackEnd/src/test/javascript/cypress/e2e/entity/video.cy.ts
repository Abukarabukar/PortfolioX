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

describe('Video e2e test', () => {
  const videoPageUrl = '/video';
  const videoPageUrlPattern = new RegExp('/video(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const videoSample = { title: 'pish', url: 'https://whimsical-pup.biz', date: '2024-07-10T21:41:51.913Z' };

  let video;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/videos+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/videos').as('postEntityRequest');
    cy.intercept('DELETE', '/api/videos/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (video) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/videos/${video.id}`,
      }).then(() => {
        video = undefined;
      });
    }
  });

  it('Videos menu should load Videos page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('video');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Video').should('exist');
    cy.url().should('match', videoPageUrlPattern);
  });

  describe('Video page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(videoPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Video page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/video/new$'));
        cy.getEntityCreateUpdateHeading('Video');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', videoPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/videos',
          body: videoSample,
        }).then(({ body }) => {
          video = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/videos+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/videos?page=0&size=20>; rel="last",<http://localhost/api/videos?page=0&size=20>; rel="first"',
              },
              body: [video],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(videoPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Video page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('video');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', videoPageUrlPattern);
      });

      it('edit button click should load edit Video page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Video');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', videoPageUrlPattern);
      });

      it('edit button click should load edit Video page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Video');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', videoPageUrlPattern);
      });

      it('last delete button click should delete instance of Video', () => {
        cy.intercept('GET', '/api/videos/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('video').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', videoPageUrlPattern);

        video = undefined;
      });
    });
  });

  describe('new Video page', () => {
    beforeEach(() => {
      cy.visit(`${videoPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Video');
    });

    it('should create an instance of Video', () => {
      cy.get(`[data-cy="title"]`).type('aw');
      cy.get(`[data-cy="title"]`).should('have.value', 'aw');

      cy.get(`[data-cy="url"]`).type('https://adept-expansion.info');
      cy.get(`[data-cy="url"]`).should('have.value', 'https://adept-expansion.info');

      cy.get(`[data-cy="date"]`).type('2024-07-11T17:54');
      cy.get(`[data-cy="date"]`).blur();
      cy.get(`[data-cy="date"]`).should('have.value', '2024-07-11T17:54');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        video = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', videoPageUrlPattern);
    });
  });
});
