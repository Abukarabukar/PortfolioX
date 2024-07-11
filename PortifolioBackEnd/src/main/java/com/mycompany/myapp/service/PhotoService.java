package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Photo;
import com.mycompany.myapp.repository.PhotoRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Photo}.
 */
@Service
@Transactional
public class PhotoService {

    private final Logger log = LoggerFactory.getLogger(PhotoService.class);

    private final PhotoRepository photoRepository;

    public PhotoService(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
    }

    /**
     * Save a photo.
     *
     * @param photo the entity to save.
     * @return the persisted entity.
     */
    public Photo save(Photo photo) {
        log.debug("Request to save Photo : {}", photo);
        return photoRepository.save(photo);
    }

    /**
     * Update a photo.
     *
     * @param photo the entity to save.
     * @return the persisted entity.
     */
    public Photo update(Photo photo) {
        log.debug("Request to update Photo : {}", photo);
        return photoRepository.save(photo);
    }

    /**
     * Partially update a photo.
     *
     * @param photo the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Photo> partialUpdate(Photo photo) {
        log.debug("Request to partially update Photo : {}", photo);

        return photoRepository
            .findById(photo.getId())
            .map(existingPhoto -> {
                if (photo.getTitle() != null) {
                    existingPhoto.setTitle(photo.getTitle());
                }
                if (photo.getUrl() != null) {
                    existingPhoto.setUrl(photo.getUrl());
                }
                if (photo.getDate() != null) {
                    existingPhoto.setDate(photo.getDate());
                }

                return existingPhoto;
            })
            .map(photoRepository::save);
    }

    /**
     * Get all the photos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Photo> findAll(Pageable pageable) {
        log.debug("Request to get all Photos");
        return photoRepository.findAll(pageable);
    }

    /**
     * Get all the photos with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Photo> findAllWithEagerRelationships(Pageable pageable) {
        return photoRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one photo by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Photo> findOne(Long id) {
        log.debug("Request to get Photo : {}", id);
        return photoRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the photo by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Photo : {}", id);
        photoRepository.deleteById(id);
    }
}
