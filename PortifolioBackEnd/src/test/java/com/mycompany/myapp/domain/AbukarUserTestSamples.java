package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class AbukarUserTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static AbukarUser getAbukarUserSample1() {
        return new AbukarUser()
            .id(1L)
            .login("login1")
            .passwordHash("passwordHash1")
            .email("email1")
            .langKey("langKey1")
            .imageUrl("imageUrl1")
            .activationKey("activationKey1")
            .resetKey("resetKey1");
    }

    public static AbukarUser getAbukarUserSample2() {
        return new AbukarUser()
            .id(2L)
            .login("login2")
            .passwordHash("passwordHash2")
            .email("email2")
            .langKey("langKey2")
            .imageUrl("imageUrl2")
            .activationKey("activationKey2")
            .resetKey("resetKey2");
    }

    public static AbukarUser getAbukarUserRandomSampleGenerator() {
        return new AbukarUser()
            .id(longCount.incrementAndGet())
            .login(UUID.randomUUID().toString())
            .passwordHash(UUID.randomUUID().toString())
            .email(UUID.randomUUID().toString())
            .langKey(UUID.randomUUID().toString())
            .imageUrl(UUID.randomUUID().toString())
            .activationKey(UUID.randomUUID().toString())
            .resetKey(UUID.randomUUID().toString());
    }
}
