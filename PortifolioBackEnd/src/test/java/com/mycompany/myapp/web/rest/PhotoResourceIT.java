package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.PhotoAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Photo;
import com.mycompany.myapp.repository.PhotoRepository;
import com.mycompany.myapp.service.PhotoService;
import jakarta.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link PhotoResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class PhotoResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/photos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private PhotoRepository photoRepository;

    @Mock
    private PhotoRepository photoRepositoryMock;

    @Mock
    private PhotoService photoServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPhotoMockMvc;

    private Photo photo;

    private Photo insertedPhoto;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Photo createEntity(EntityManager em) {
        Photo photo = new Photo().title(DEFAULT_TITLE).url(DEFAULT_URL).date(DEFAULT_DATE);
        return photo;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Photo createUpdatedEntity(EntityManager em) {
        Photo photo = new Photo().title(UPDATED_TITLE).url(UPDATED_URL).date(UPDATED_DATE);
        return photo;
    }

    @BeforeEach
    public void initTest() {
        photo = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedPhoto != null) {
            photoRepository.delete(insertedPhoto);
            insertedPhoto = null;
        }
    }

    @Test
    @Transactional
    void createPhoto() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Photo
        var returnedPhoto = om.readValue(
            restPhotoMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(photo)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            Photo.class
        );

        // Validate the Photo in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertPhotoUpdatableFieldsEquals(returnedPhoto, getPersistedPhoto(returnedPhoto));

        insertedPhoto = returnedPhoto;
    }

    @Test
    @Transactional
    void createPhotoWithExistingId() throws Exception {
        // Create the Photo with an existing ID
        photo.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPhotoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(photo)))
            .andExpect(status().isBadRequest());

        // Validate the Photo in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkTitleIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        photo.setTitle(null);

        // Create the Photo, which fails.

        restPhotoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(photo)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkUrlIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        photo.setUrl(null);

        // Create the Photo, which fails.

        restPhotoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(photo)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        photo.setDate(null);

        // Create the Photo, which fails.

        restPhotoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(photo)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPhotos() throws Exception {
        // Initialize the database
        insertedPhoto = photoRepository.saveAndFlush(photo);

        // Get all the photoList
        restPhotoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(photo.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPhotosWithEagerRelationshipsIsEnabled() throws Exception {
        when(photoServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPhotoMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(photoServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPhotosWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(photoServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPhotoMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(photoRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getPhoto() throws Exception {
        // Initialize the database
        insertedPhoto = photoRepository.saveAndFlush(photo);

        // Get the photo
        restPhotoMockMvc
            .perform(get(ENTITY_API_URL_ID, photo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(photo.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingPhoto() throws Exception {
        // Get the photo
        restPhotoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingPhoto() throws Exception {
        // Initialize the database
        insertedPhoto = photoRepository.saveAndFlush(photo);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the photo
        Photo updatedPhoto = photoRepository.findById(photo.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedPhoto are not directly saved in db
        em.detach(updatedPhoto);
        updatedPhoto.title(UPDATED_TITLE).url(UPDATED_URL).date(UPDATED_DATE);

        restPhotoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPhoto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedPhoto))
            )
            .andExpect(status().isOk());

        // Validate the Photo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedPhotoToMatchAllProperties(updatedPhoto);
    }

    @Test
    @Transactional
    void putNonExistingPhoto() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        photo.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPhotoMockMvc
            .perform(put(ENTITY_API_URL_ID, photo.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(photo)))
            .andExpect(status().isBadRequest());

        // Validate the Photo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPhoto() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        photo.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPhotoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(photo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Photo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPhoto() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        photo.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPhotoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(photo)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Photo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePhotoWithPatch() throws Exception {
        // Initialize the database
        insertedPhoto = photoRepository.saveAndFlush(photo);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the photo using partial update
        Photo partialUpdatedPhoto = new Photo();
        partialUpdatedPhoto.setId(photo.getId());

        partialUpdatedPhoto.title(UPDATED_TITLE).date(UPDATED_DATE);

        restPhotoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPhoto.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedPhoto))
            )
            .andExpect(status().isOk());

        // Validate the Photo in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPhotoUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedPhoto, photo), getPersistedPhoto(photo));
    }

    @Test
    @Transactional
    void fullUpdatePhotoWithPatch() throws Exception {
        // Initialize the database
        insertedPhoto = photoRepository.saveAndFlush(photo);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the photo using partial update
        Photo partialUpdatedPhoto = new Photo();
        partialUpdatedPhoto.setId(photo.getId());

        partialUpdatedPhoto.title(UPDATED_TITLE).url(UPDATED_URL).date(UPDATED_DATE);

        restPhotoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPhoto.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedPhoto))
            )
            .andExpect(status().isOk());

        // Validate the Photo in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPhotoUpdatableFieldsEquals(partialUpdatedPhoto, getPersistedPhoto(partialUpdatedPhoto));
    }

    @Test
    @Transactional
    void patchNonExistingPhoto() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        photo.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPhotoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, photo.getId()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(photo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Photo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPhoto() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        photo.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPhotoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(photo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Photo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPhoto() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        photo.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPhotoMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(photo)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Photo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePhoto() throws Exception {
        // Initialize the database
        insertedPhoto = photoRepository.saveAndFlush(photo);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the photo
        restPhotoMockMvc
            .perform(delete(ENTITY_API_URL_ID, photo.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return photoRepository.count();
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

    protected Photo getPersistedPhoto(Photo photo) {
        return photoRepository.findById(photo.getId()).orElseThrow();
    }

    protected void assertPersistedPhotoToMatchAllProperties(Photo expectedPhoto) {
        assertPhotoAllPropertiesEquals(expectedPhoto, getPersistedPhoto(expectedPhoto));
    }

    protected void assertPersistedPhotoToMatchUpdatableProperties(Photo expectedPhoto) {
        assertPhotoAllUpdatablePropertiesEquals(expectedPhoto, getPersistedPhoto(expectedPhoto));
    }
}
