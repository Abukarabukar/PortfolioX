package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.AbukarUserTestSamples.*;
import static com.mycompany.myapp.domain.PhotoTestSamples.*;
import static com.mycompany.myapp.domain.PostTestSamples.*;
import static com.mycompany.myapp.domain.ProjectTestSamples.*;
import static com.mycompany.myapp.domain.VideoTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class AbukarUserTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AbukarUser.class);
        AbukarUser abukarUser1 = getAbukarUserSample1();
        AbukarUser abukarUser2 = new AbukarUser();
        assertThat(abukarUser1).isNotEqualTo(abukarUser2);

        abukarUser2.setId(abukarUser1.getId());
        assertThat(abukarUser1).isEqualTo(abukarUser2);

        abukarUser2 = getAbukarUserSample2();
        assertThat(abukarUser1).isNotEqualTo(abukarUser2);
    }

    @Test
    void projectTest() {
        AbukarUser abukarUser = getAbukarUserRandomSampleGenerator();
        Project projectBack = getProjectRandomSampleGenerator();

        abukarUser.addProject(projectBack);
        assertThat(abukarUser.getProjects()).containsOnly(projectBack);
        assertThat(projectBack.getAbukarUser()).isEqualTo(abukarUser);

        abukarUser.removeProject(projectBack);
        assertThat(abukarUser.getProjects()).doesNotContain(projectBack);
        assertThat(projectBack.getAbukarUser()).isNull();

        abukarUser.projects(new HashSet<>(Set.of(projectBack)));
        assertThat(abukarUser.getProjects()).containsOnly(projectBack);
        assertThat(projectBack.getAbukarUser()).isEqualTo(abukarUser);

        abukarUser.setProjects(new HashSet<>());
        assertThat(abukarUser.getProjects()).doesNotContain(projectBack);
        assertThat(projectBack.getAbukarUser()).isNull();
    }

    @Test
    void postTest() {
        AbukarUser abukarUser = getAbukarUserRandomSampleGenerator();
        Post postBack = getPostRandomSampleGenerator();

        abukarUser.addPost(postBack);
        assertThat(abukarUser.getPosts()).containsOnly(postBack);
        assertThat(postBack.getAbukarUser()).isEqualTo(abukarUser);

        abukarUser.removePost(postBack);
        assertThat(abukarUser.getPosts()).doesNotContain(postBack);
        assertThat(postBack.getAbukarUser()).isNull();

        abukarUser.posts(new HashSet<>(Set.of(postBack)));
        assertThat(abukarUser.getPosts()).containsOnly(postBack);
        assertThat(postBack.getAbukarUser()).isEqualTo(abukarUser);

        abukarUser.setPosts(new HashSet<>());
        assertThat(abukarUser.getPosts()).doesNotContain(postBack);
        assertThat(postBack.getAbukarUser()).isNull();
    }

    @Test
    void photoTest() {
        AbukarUser abukarUser = getAbukarUserRandomSampleGenerator();
        Photo photoBack = getPhotoRandomSampleGenerator();

        abukarUser.addPhoto(photoBack);
        assertThat(abukarUser.getPhotos()).containsOnly(photoBack);
        assertThat(photoBack.getAbukarUser()).isEqualTo(abukarUser);

        abukarUser.removePhoto(photoBack);
        assertThat(abukarUser.getPhotos()).doesNotContain(photoBack);
        assertThat(photoBack.getAbukarUser()).isNull();

        abukarUser.photos(new HashSet<>(Set.of(photoBack)));
        assertThat(abukarUser.getPhotos()).containsOnly(photoBack);
        assertThat(photoBack.getAbukarUser()).isEqualTo(abukarUser);

        abukarUser.setPhotos(new HashSet<>());
        assertThat(abukarUser.getPhotos()).doesNotContain(photoBack);
        assertThat(photoBack.getAbukarUser()).isNull();
    }

    @Test
    void videoTest() {
        AbukarUser abukarUser = getAbukarUserRandomSampleGenerator();
        Video videoBack = getVideoRandomSampleGenerator();

        abukarUser.addVideo(videoBack);
        assertThat(abukarUser.getVideos()).containsOnly(videoBack);
        assertThat(videoBack.getAbukarUser()).isEqualTo(abukarUser);

        abukarUser.removeVideo(videoBack);
        assertThat(abukarUser.getVideos()).doesNotContain(videoBack);
        assertThat(videoBack.getAbukarUser()).isNull();

        abukarUser.videos(new HashSet<>(Set.of(videoBack)));
        assertThat(abukarUser.getVideos()).containsOnly(videoBack);
        assertThat(videoBack.getAbukarUser()).isEqualTo(abukarUser);

        abukarUser.setVideos(new HashSet<>());
        assertThat(abukarUser.getVideos()).doesNotContain(videoBack);
        assertThat(videoBack.getAbukarUser()).isNull();
    }
}
