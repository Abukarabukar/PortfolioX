package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.AbukarUser;
import com.mycompany.myapp.repository.AbukarUserRepository;
import com.mycompany.myapp.service.AbukarUserService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.AbukarUser}.
 */
@RestController
@RequestMapping("/api/abukar-users")
public class AbukarUserResource {

    private final Logger log = LoggerFactory.getLogger(AbukarUserResource.class);

    private static final String ENTITY_NAME = "abukarUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AbukarUserService abukarUserService;

    private final AbukarUserRepository abukarUserRepository;

    public AbukarUserResource(AbukarUserService abukarUserService, AbukarUserRepository abukarUserRepository) {
        this.abukarUserService = abukarUserService;
        this.abukarUserRepository = abukarUserRepository;
    }

    /**
     * {@code POST  /abukar-users} : Create a new abukarUser.
     *
     * @param abukarUser the abukarUser to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new abukarUser, or with status {@code 400 (Bad Request)} if the abukarUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<AbukarUser> createAbukarUser(@Valid @RequestBody AbukarUser abukarUser) throws URISyntaxException {
        log.debug("REST request to save AbukarUser : {}", abukarUser);
        if (abukarUser.getId() != null) {
            throw new BadRequestAlertException("A new abukarUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        abukarUser = abukarUserService.save(abukarUser);
        return ResponseEntity.created(new URI("/api/abukar-users/" + abukarUser.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, abukarUser.getId().toString()))
            .body(abukarUser);
    }

    /**
     * {@code PUT  /abukar-users/:id} : Updates an existing abukarUser.
     *
     * @param id the id of the abukarUser to save.
     * @param abukarUser the abukarUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated abukarUser,
     * or with status {@code 400 (Bad Request)} if the abukarUser is not valid,
     * or with status {@code 500 (Internal Server Error)} if the abukarUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<AbukarUser> updateAbukarUser(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody AbukarUser abukarUser
    ) throws URISyntaxException {
        log.debug("REST request to update AbukarUser : {}, {}", id, abukarUser);
        if (abukarUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, abukarUser.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!abukarUserRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        abukarUser = abukarUserService.update(abukarUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, abukarUser.getId().toString()))
            .body(abukarUser);
    }

    /**
     * {@code PATCH  /abukar-users/:id} : Partial updates given fields of an existing abukarUser, field will ignore if it is null
     *
     * @param id the id of the abukarUser to save.
     * @param abukarUser the abukarUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated abukarUser,
     * or with status {@code 400 (Bad Request)} if the abukarUser is not valid,
     * or with status {@code 404 (Not Found)} if the abukarUser is not found,
     * or with status {@code 500 (Internal Server Error)} if the abukarUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AbukarUser> partialUpdateAbukarUser(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody AbukarUser abukarUser
    ) throws URISyntaxException {
        log.debug("REST request to partial update AbukarUser partially : {}, {}", id, abukarUser);
        if (abukarUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, abukarUser.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!abukarUserRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AbukarUser> result = abukarUserService.partialUpdate(abukarUser);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, abukarUser.getId().toString())
        );
    }

    /**
     * {@code GET  /abukar-users} : get all the abukarUsers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of abukarUsers in body.
     */
    @GetMapping("")
    public List<AbukarUser> getAllAbukarUsers() {
        log.debug("REST request to get all AbukarUsers");
        return abukarUserService.findAll();
    }

    /**
     * {@code GET  /abukar-users/:id} : get the "id" abukarUser.
     *
     * @param id the id of the abukarUser to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the abukarUser, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<AbukarUser> getAbukarUser(@PathVariable("id") Long id) {
        log.debug("REST request to get AbukarUser : {}", id);
        Optional<AbukarUser> abukarUser = abukarUserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(abukarUser);
    }

    /**
     * {@code DELETE  /abukar-users/:id} : delete the "id" abukarUser.
     *
     * @param id the id of the abukarUser to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAbukarUser(@PathVariable("id") Long id) {
        log.debug("REST request to delete AbukarUser : {}", id);
        abukarUserService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
