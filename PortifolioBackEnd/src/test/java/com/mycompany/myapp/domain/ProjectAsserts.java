package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class ProjectAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertProjectAllPropertiesEquals(Project expected, Project actual) {
        assertProjectAutoGeneratedPropertiesEquals(expected, actual);
        assertProjectAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertProjectAllUpdatablePropertiesEquals(Project expected, Project actual) {
        assertProjectUpdatableFieldsEquals(expected, actual);
        assertProjectUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertProjectAutoGeneratedPropertiesEquals(Project expected, Project actual) {
        assertThat(expected)
            .as("Verify Project auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertProjectUpdatableFieldsEquals(Project expected, Project actual) {
        assertThat(expected)
            .as("Verify Project relevant properties")
            .satisfies(e -> assertThat(e.getTitle()).as("check title").isEqualTo(actual.getTitle()))
            .satisfies(e -> assertThat(e.getDescription()).as("check description").isEqualTo(actual.getDescription()))
            .satisfies(e -> assertThat(e.getDate()).as("check date").isEqualTo(actual.getDate()))
            .satisfies(e -> assertThat(e.getUrl()).as("check url").isEqualTo(actual.getUrl()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertProjectUpdatableRelationshipsEquals(Project expected, Project actual) {
        assertThat(expected)
            .as("Verify Project relationships")
            .satisfies(e -> assertThat(e.getAbukarUser()).as("check abukarUser").isEqualTo(actual.getAbukarUser()));
    }
}