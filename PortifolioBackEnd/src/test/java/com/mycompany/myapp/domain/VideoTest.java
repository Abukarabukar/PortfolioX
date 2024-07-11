package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.AbukarUserTestSamples.*;
import static com.mycompany.myapp.domain.VideoTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class VideoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Video.class);
        Video video1 = getVideoSample1();
        Video video2 = new Video();
        assertThat(video1).isNotEqualTo(video2);

        video2.setId(video1.getId());
        assertThat(video1).isEqualTo(video2);

        video2 = getVideoSample2();
        assertThat(video1).isNotEqualTo(video2);
    }

    @Test
    void abukarUserTest() {
        Video video = getVideoRandomSampleGenerator();
        AbukarUser abukarUserBack = getAbukarUserRandomSampleGenerator();

        video.setAbukarUser(abukarUserBack);
        assertThat(video.getAbukarUser()).isEqualTo(abukarUserBack);

        video.abukarUser(null);
        assertThat(video.getAbukarUser()).isNull();
    }
}
