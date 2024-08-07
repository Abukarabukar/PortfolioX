package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class AbukarUserAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertAbukarUserAllPropertiesEquals(AbukarUser expected, AbukarUser actual) {
        assertAbukarUserAutoGeneratedPropertiesEquals(expected, actual);
        assertAbukarUserAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertAbukarUserAllUpdatablePropertiesEquals(AbukarUser expected, AbukarUser actual) {
        assertAbukarUserUpdatableFieldsEquals(expected, actual);
        assertAbukarUserUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertAbukarUserAutoGeneratedPropertiesEquals(AbukarUser expected, AbukarUser actual) {
        assertThat(expected)
            .as("Verify AbukarUser auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertAbukarUserUpdatableFieldsEquals(AbukarUser expected, AbukarUser actual) {
        assertThat(expected)
            .as("Verify AbukarUser relevant properties")
            .satisfies(e -> assertThat(e.getLogin()).as("check login").isEqualTo(actual.getLogin()))
            .satisfies(e -> assertThat(e.getPasswordHash()).as("check passwordHash").isEqualTo(actual.getPasswordHash()))
            .satisfies(e -> assertThat(e.getEmail()).as("check email").isEqualTo(actual.getEmail()))
            .satisfies(e -> assertThat(e.getActivated()).as("check activated").isEqualTo(actual.getActivated()))
            .satisfies(e -> assertThat(e.getLangKey()).as("check langKey").isEqualTo(actual.getLangKey()))
            .satisfies(e -> assertThat(e.getImageUrl()).as("check imageUrl").isEqualTo(actual.getImageUrl()))
            .satisfies(e -> assertThat(e.getActivationKey()).as("check activationKey").isEqualTo(actual.getActivationKey()))
            .satisfies(e -> assertThat(e.getResetKey()).as("check resetKey").isEqualTo(actual.getResetKey()))
            .satisfies(e -> assertThat(e.getResetDate()).as("check resetDate").isEqualTo(actual.getResetDate()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertAbukarUserUpdatableRelationshipsEquals(AbukarUser expected, AbukarUser actual) {}
}
