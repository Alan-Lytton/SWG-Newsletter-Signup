package com.swg.newslettersignup;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class SwgNewsletterSignupApplication {
    public static void main(String[] args) {
        SpringApplication.run(SwgNewsletterSignupApplication.class, args);
    }
}
