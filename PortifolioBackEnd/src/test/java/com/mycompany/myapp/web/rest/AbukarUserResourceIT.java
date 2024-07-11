package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.AbukarUserAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.AbukarUser;
import com.mycompany.myapp.repository.AbukarUserRepository;
import jakarta.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link AbukarUserResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AbukarUserResourceIT {

    private static final String DEFAULT_LOGIN = "AAAAAAAAAA";
    private static final String UPDATED_LOGIN = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD_HASH = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD_HASH = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "zr@0n/.9";
    private static final String UPDATED_EMAIL = "9@~/r.O";

    private static final Boolean DEFAULT_ACTIVATED = false;
    private static final Boolean UPDATED_ACTIVATED = true;

    private static final String DEFAULT_LANG_KEY = "AAAAAAAAAA";
    private static final String UPDATED_LANG_KEY = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE_URL = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_URL = "BBBBBBBBBB";

    private static final String DEFAULT_ACTIVATION_KEY = "AAAAAAAAAA";
    private static final String UPDATED_ACTIVATION_KEY = "BBBBBBBBBB";

    private static final String DEFAULT_RESET_KEY = "AAAAAAAAAA";
    private static final String UPDATED_RESET_KEY = "BBBBBBBBBB";

    private static final Instant DEFAULT_RESET_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_RESET_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/abukar-users";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private AbukarUserRepository abukarUserRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAbukarUserMockMvc;

    private AbukarUser abukarUser;

    private AbukarUser insertedAbukarUser;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AbukarUser createEntity(EntityManager em) {
        AbukarUser abukarUser = new AbukarUser()
            .login(DEFAULT_LOGIN)
            .passwordHash(DEFAULT_PASSWORD_HASH)
            .email(DEFAULT_EMAIL)
            .activated(DEFAULT_ACTIVATED)
            .langKey(DEFAULT_LANG_KEY)
            .imageUrl(DEFAULT_IMAGE_URL)
            .activationKey(DEFAULT_ACTIVATION_KEY)
            .resetKey(DEFAULT_RESET_KEY)
            .resetDate(DEFAULT_RESET_DATE);
        return abukarUser;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AbukarUser createUpdatedEntity(EntityManager em) {
        AbukarUser abukarUser = new AbukarUser()
            .login(UPDATED_LOGIN)
            .passwordHash(UPDATED_PASSWORD_HASH)
            .email(UPDATED_EMAIL)
            .activated(UPDATED_ACTIVATED)
            .langKey(UPDATED_LANG_KEY)
            .imageUrl(UPDATED_IMAGE_URL)
            .activationKey(UPDATED_ACTIVATION_KEY)
            .resetKey(UPDATED_RESET_KEY)
            .resetDate(UPDATED_RESET_DATE);
        return abukarUser;
    }

    @BeforeEach
    public void initTest() {
        abukarUser = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedAbukarUser != null) {
            abukarUserRepository.delete(insertedAbukarUser);
            insertedAbukarUser = null;
        }
    }

    @Test
    @Transactional
    void createAbukarUser() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the AbukarUser
        var returnedAbukarUser = om.readValue(
            restAbukarUserMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(abukarUser)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            AbukarUser.class
        );

        // Validate the AbukarUser in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertAbukarUserUpdatableFieldsEquals(returnedAbukarUser, getPersistedAbukarUser(returnedAbukarUser));

        insertedAbukarUser = returnedAbukarUser;
    }

    @Test
    @Transactional
    void createAbukarUserWithExistingId() throws Exception {
        // Create the AbukarUser with an existing ID
        abukarUser.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAbukarUserMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(abukarUser)))
            .andExpect(status().isBadRequest());

        // Validate the AbukarUser in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkLoginIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        abukarUser.setLogin(null);

        // Create the AbukarUser, which fails.

        restAbukarUserMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(abukarUser)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPasswordHashIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        abukarUser.setPasswordHash(null);

        // Create the AbukarUser, which fails.

        restAbukarUserMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(abukarUser)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkEmailIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        abukarUser.setEmail(null);

        // Create the AbukarUser, which fails.

        restAbukarUserMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(abukarUser)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllAbukarUsers() throws Exception {
        // Initialize the database
        insertedAbukarUser = abukarUserRepository.saveAndFlush(abukarUser);

        // Get all the abukarUserList
        restAbukarUserMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(abukarUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].login").value(hasItem(DEFAULT_LOGIN)))
            .andExpect(jsonPath("$.[*].passwordHash").value(hasItem(DEFAULT_PASSWORD_HASH)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].activated").value(hasItem(DEFAULT_ACTIVATED.booleanValue())))
            .andExpect(jsonPath("$.[*].langKey").value(hasItem(DEFAULT_LANG_KEY)))
            .andExpect(jsonPath("$.[*].imageUrl").value(hasItem(DEFAULT_IMAGE_URL)))
            .andExpect(jsonPath("$.[*].activationKey").value(hasItem(DEFAULT_ACTIVATION_KEY)))
            .andExpect(jsonPath("$.[*].resetKey").value(hasItem(DEFAULT_RESET_KEY)))
            .andExpect(jsonPath("$.[*].resetDate").value(hasItem(DEFAULT_RESET_DATE.toString())));
    }

    @Test
    @Transactional
    void getAbukarUser() throws Exception {
        // Initialize the database
        insertedAbukarUser = abukarUserRepository.saveAndFlush(abukarUser);

        // Get the abukarUser
        restAbukarUserMockMvc
            .perform(get(ENTITY_API_URL_ID, abukarUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(abukarUser.getId().intValue()))
            .andExpect(jsonPath("$.login").value(DEFAULT_LOGIN))
            .andExpect(jsonPath("$.passwordHash").value(DEFAULT_PASSWORD_HASH))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.activated").value(DEFAULT_ACTIVATED.booleanValue()))
            .andExpect(jsonPath("$.langKey").value(DEFAULT_LANG_KEY))
            .andExpect(jsonPath("$.imageUrl").value(DEFAULT_IMAGE_URL))
            .andExpect(jsonPath("$.activationKey").value(DEFAULT_ACTIVATION_KEY))
            .andExpect(jsonPath("$.resetKey").value(DEFAULT_RESET_KEY))
            .andExpect(jsonPath("$.resetDate").value(DEFAULT_RESET_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingAbukarUser() throws Exception {
        // Get the abukarUser
        restAbukarUserMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAbukarUser() throws Exception {
        // Initialize the database
        insertedAbukarUser = abukarUserRepository.saveAndFlush(abukarUser);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the abukarUser
        AbukarUser updatedAbukarUser = abukarUserRepository.findById(abukarUser.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedAbukarUser are not directly saved in db
        em.detach(updatedAbukarUser);
        updatedAbukarUser
            .login(UPDATED_LOGIN)
            .passwordHash(UPDATED_PASSWORD_HASH)
            .email(UPDATED_EMAIL)
            .activated(UPDATED_ACTIVATED)
            .langKey(UPDATED_LANG_KEY)
            .imageUrl(UPDATED_IMAGE_URL)
            .activationKey(UPDATED_ACTIVATION_KEY)
            .resetKey(UPDATED_RESET_KEY)
            .resetDate(UPDATED_RESET_DATE);

        restAbukarUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedAbukarUser.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedAbukarUser))
            )
            .andExpect(status().isOk());

        // Validate the AbukarUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedAbukarUserToMatchAllProperties(updatedAbukarUser);
    }

    @Test
    @Transactional
    void putNonExistingAbukarUser() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        abukarUser.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAbukarUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, abukarUser.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(abukarUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the AbukarUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAbukarUser() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        abukarUser.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAbukarUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(abukarUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the AbukarUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAbukarUser() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        abukarUser.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAbukarUserMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(abukarUser)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the AbukarUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAbukarUserWithPatch() throws Exception {
        // Initialize the database
        insertedAbukarUser = abukarUserRepository.saveAndFlush(abukarUser);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the abukarUser using partial update
        AbukarUser partialUpdatedAbukarUser = new AbukarUser();
        partialUpdatedAbukarUser.setId(abukarUser.getId());

        partialUpdatedAbukarUser
            .login(UPDATED_LOGIN)
            .email(UPDATED_EMAIL)
            .activated(UPDATED_ACTIVATED)
            .langKey(UPDATED_LANG_KEY)
            .imageUrl(UPDATED_IMAGE_URL)
            .activationKey(UPDATED_ACTIVATION_KEY)
            .resetKey(UPDATED_RESET_KEY);

        restAbukarUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAbukarUser.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAbukarUser))
            )
            .andExpect(status().isOk());

        // Validate the AbukarUser in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAbukarUserUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedAbukarUser, abukarUser),
            getPersistedAbukarUser(abukarUser)
        );
    }

    @Test
    @Transactional
    void fullUpdateAbukarUserWithPatch() throws Exception {
        // Initialize the database
        insertedAbukarUser = abukarUserRepository.saveAndFlush(abukarUser);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the abukarUser using partial update
        AbukarUser partialUpdatedAbukarUser = new AbukarUser();
        partialUpdatedAbukarUser.setId(abukarUser.getId());

        partialUpdatedAbukarUser
            .login(UPDATED_LOGIN)
            .passwordHash(UPDATED_PASSWORD_HASH)
            .email(UPDATED_EMAIL)
            .activated(UPDATED_ACTIVATED)
            .langKey(UPDATED_LANG_KEY)
            .imageUrl(UPDATED_IMAGE_URL)
            .activationKey(UPDATED_ACTIVATION_KEY)
            .resetKey(UPDATED_RESET_KEY)
            .resetDate(UPDATED_RESET_DATE);

        restAbukarUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAbukarUser.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAbukarUser))
            )
            .andExpect(status().isOk());

        // Validate the AbukarUser in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAbukarUserUpdatableFieldsEquals(partialUpdatedAbukarUser, getPersistedAbukarUser(partialUpdatedAbukarUser));
    }

    @Test
    @Transactional
    void patchNonExistingAbukarUser() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        abukarUser.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAbukarUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, abukarUser.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(abukarUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the AbukarUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAbukarUser() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        abukarUser.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAbukarUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(abukarUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the AbukarUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAbukarUser() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        abukarUser.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAbukarUserMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(abukarUser)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the AbukarUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAbukarUser() throws Exception {
        // Initialize the database
        insertedAbukarUser = abukarUserRepository.saveAndFlush(abukarUser);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the abukarUser
        restAbukarUserMockMvc
            .perform(delete(ENTITY_API_URL_ID, abukarUser.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return abukarUserRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected AbukarUser getPersistedAbukarUser(AbukarUser abukarUser) {
        return abukarUserRepository.findById(abukarUser.getId()).orElseThrow();
    }

    protected void assertPersistedAbukarUserToMatchAllProperties(AbukarUser expectedAbukarUser) {
        assertAbukarUserAllPropertiesEquals(expectedAbukarUser, getPersistedAbukarUser(expectedAbukarUser));
    }

    protected void assertPersistedAbukarUserToMatchUpdatableProperties(AbukarUser expectedAbukarUser) {
        assertAbukarUserAllUpdatablePropertiesEquals(expectedAbukarUser, getPersistedAbukarUser(expectedAbukarUser));
    }
}
