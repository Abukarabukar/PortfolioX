package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.AbukarUser;
import com.mycompany.myapp.repository.AbukarUserRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.AbukarUser}.
 */
@Service
@Transactional
public class AbukarUserService {

    private final Logger log = LoggerFactory.getLogger(AbukarUserService.class);

    private final AbukarUserRepository abukarUserRepository;

    public AbukarUserService(AbukarUserRepository abukarUserRepository) {
        this.abukarUserRepository = abukarUserRepository;
    }

    /**
     * Save a abukarUser.
     *
     * @param abukarUser the entity to save.
     * @return the persisted entity.
     */
    public AbukarUser save(AbukarUser abukarUser) {
        log.debug("Request to save AbukarUser : {}", abukarUser);
        return abukarUserRepository.save(abukarUser);
    }

    /**
     * Update a abukarUser.
     *
     * @param abukarUser the entity to save.
     * @return the persisted entity.
     */
    public AbukarUser update(AbukarUser abukarUser) {
        log.debug("Request to update AbukarUser : {}", abukarUser);
        return abukarUserRepository.save(abukarUser);
    }

    /**
     * Partially update a abukarUser.
     *
     * @param abukarUser the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<AbukarUser> partialUpdate(AbukarUser abukarUser) {
        log.debug("Request to partially update AbukarUser : {}", abukarUser);

        return abukarUserRepository
            .findById(abukarUser.getId())
            .map(existingAbukarUser -> {
                if (abukarUser.getLogin() != null) {
                    existingAbukarUser.setLogin(abukarUser.getLogin());
                }
                if (abukarUser.getPasswordHash() != null) {
                    existingAbukarUser.setPasswordHash(abukarUser.getPasswordHash());
                }
                if (abukarUser.getEmail() != null) {
                    existingAbukarUser.setEmail(abukarUser.getEmail());
                }
                if (abukarUser.getActivated() != null) {
                    existingAbukarUser.setActivated(abukarUser.getActivated());
                }
                if (abukarUser.getLangKey() != null) {
                    existingAbukarUser.setLangKey(abukarUser.getLangKey());
                }
                if (abukarUser.getImageUrl() != null) {
                    existingAbukarUser.setImageUrl(abukarUser.getImageUrl());
                }
                if (abukarUser.getActivationKey() != null) {
                    existingAbukarUser.setActivationKey(abukarUser.getActivationKey());
                }
                if (abukarUser.getResetKey() != null) {
                    existingAbukarUser.setResetKey(abukarUser.getResetKey());
                }
                if (abukarUser.getResetDate() != null) {
                    existingAbukarUser.setResetDate(abukarUser.getResetDate());
                }

                return existingAbukarUser;
            })
            .map(abukarUserRepository::save);
    }

    /**
     * Get all the abukarUsers.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<AbukarUser> findAll() {
        log.debug("Request to get all AbukarUsers");
        return abukarUserRepository.findAll();
    }

    /**
     * Get one abukarUser by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<AbukarUser> findOne(Long id) {
        log.debug("Request to get AbukarUser : {}", id);
        return abukarUserRepository.findById(id);
    }

    /**
     * Delete the abukarUser by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete AbukarUser : {}", id);
        abukarUserRepository.deleteById(id);
    }
}
