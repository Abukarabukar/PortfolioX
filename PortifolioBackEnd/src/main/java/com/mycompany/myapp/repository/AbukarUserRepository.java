package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.AbukarUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the AbukarUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AbukarUserRepository extends JpaRepository<AbukarUser, Long> {}
