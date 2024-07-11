package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Video;
import com.mycompany.myapp.repository.VideoRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Video}.
 */
@Service
@Transactional
public class VideoService {

    private final Logger log = LoggerFactory.getLogger(VideoService.class);

    private final VideoRepository videoRepository;

    public VideoService(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    /**
     * Save a video.
     *
     * @param video the entity to save.
     * @return the persisted entity.
     */
    public Video save(Video video) {
        log.debug("Request to save Video : {}", video);
        return videoRepository.save(video);
    }

    /**
     * Update a video.
     *
     * @param video the entity to save.
     * @return the persisted entity.
     */
    public Video update(Video video) {
        log.debug("Request to update Video : {}", video);
        return videoRepository.save(video);
    }

    /**
     * Partially update a video.
     *
     * @param video the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Video> partialUpdate(Video video) {
        log.debug("Request to partially update Video : {}", video);

        return videoRepository
            .findById(video.getId())
            .map(existingVideo -> {
                if (video.getTitle() != null) {
                    existingVideo.setTitle(video.getTitle());
                }
                if (video.getUrl() != null) {
                    existingVideo.setUrl(video.getUrl());
                }
                if (video.getDate() != null) {
                    existingVideo.setDate(video.getDate());
                }

                return existingVideo;
            })
            .map(videoRepository::save);
    }

    /**
     * Get all the videos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Video> findAll(Pageable pageable) {
        log.debug("Request to get all Videos");
        return videoRepository.findAll(pageable);
    }

    /**
     * Get all the videos with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Video> findAllWithEagerRelationships(Pageable pageable) {
        return videoRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one video by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Video> findOne(Long id) {
        log.debug("Request to get Video : {}", id);
        return videoRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the video by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Video : {}", id);
        videoRepository.deleteById(id);
    }
}
