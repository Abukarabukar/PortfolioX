package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.AbukarUserTestSamples.*;
import static com.mycompany.myapp.domain.PostTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PostTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Post.class);
        Post post1 = getPostSample1();
        Post post2 = new Post();
        assertThat(post1).isNotEqualTo(post2);

        post2.setId(post1.getId());
        assertThat(post1).isEqualTo(post2);

        post2 = getPostSample2();
        assertThat(post1).isNotEqualTo(post2);
    }

    @Test
    void abukarUserTest() {
        Post post = getPostRandomSampleGenerator();
        AbukarUser abukarUserBack = getAbukarUserRandomSampleGenerator();

        post.setAbukarUser(abukarUserBack);
        assertThat(post.getAbukarUser()).isEqualTo(abukarUserBack);

        post.abukarUser(null);
        assertThat(post.getAbukarUser()).isNull();
    }
}
