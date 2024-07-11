package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.AbukarUserTestSamples.*;
import static com.mycompany.myapp.domain.ProjectTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ProjectTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Project.class);
        Project project1 = getProjectSample1();
        Project project2 = new Project();
        assertThat(project1).isNotEqualTo(project2);

        project2.setId(project1.getId());
        assertThat(project1).isEqualTo(project2);

        project2 = getProjectSample2();
        assertThat(project1).isNotEqualTo(project2);
    }

    @Test
    void abukarUserTest() {
        Project project = getProjectRandomSampleGenerator();
        AbukarUser abukarUserBack = getAbukarUserRandomSampleGenerator();

        project.setAbukarUser(abukarUserBack);
        assertThat(project.getAbukarUser()).isEqualTo(abukarUserBack);

        project.abukarUser(null);
        assertThat(project.getAbukarUser()).isNull();
    }
}
