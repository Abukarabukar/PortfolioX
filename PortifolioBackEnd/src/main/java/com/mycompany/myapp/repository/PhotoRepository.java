package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Photo;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Photo entity.
 */
@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {
    default Optional<Photo> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Photo> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Photo> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(value = "select photo from Photo photo left join fetch photo.abukarUser", countQuery = "select count(photo) from Photo photo")
    Page<Photo> findAllWithToOneRelationships(Pageable pageable);

    @Query("select photo from Photo photo left join fetch photo.abukarUser")
    List<Photo> findAllWithToOneRelationships();

    @Query("select photo from Photo photo left join fetch photo.abukarUser where photo.id =:id")
    Optional<Photo> findOneWithToOneRelationships(@Param("id") Long id);
}
